"use node";

import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

const SEND_DELAY_MS = 3000;
const MAX_PER_BATCH = 80;

function isWithinSendWindow(windowStart: number = 9, windowEnd: number = 20): boolean {
  const ukHour = parseInt(
    new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      hour: "numeric",
      hour12: false,
    }),
    10
  );
  return ukHour >= windowStart && ukHour < windowEnd;
}

export const processActiveCampaigns = internalAction({
  args: {},
  handler: async (ctx) => {
    // Find all campaigns with status "sending"
    const campaigns: Array<{
      _id: string;
      status: string;
    }> = await ctx.runQuery(internal.campaigns.listByStatus, {
      status: "sending",
    });

    for (const campaign of campaigns) {
      await ctx.runAction(internal.campaignProcessor.processNextBatch, {
        campaignId: campaign._id as any,
      });
    }
  },
});

export const processNextBatch = internalAction({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    // 1. Get campaign and check status
    const campaign = await ctx.runQuery(internal.campaigns.getByIdInternal, {
      id: args.campaignId,
    });

    if (!campaign) {
      console.error(`Campaign ${args.campaignId} not found`);
      return;
    }

    if (campaign.status === "paused") {
      console.log(`Campaign ${args.campaignId} is paused, skipping`);
      return;
    }

    if (!campaign.templateName) {
      console.error(`Campaign ${args.campaignId} has no template name`);
      return;
    }

    // 2. Check UK timezone send window
    if (!isWithinSendWindow(campaign.sendWindowStart, campaign.sendWindowEnd)) {
      console.log(`Campaign ${args.campaignId} outside send window, skipping`);
      return;
    }

    // 2b. Check daily send limit
    let batchLimit: number;
    if (campaign.dailySendLimit) {
      const sentToday: number = await ctx.runQuery(
        internal.campaignRecipients.countSentToday,
        { campaignId: args.campaignId }
      );
      if (sentToday >= campaign.dailySendLimit) {
        console.log(
          `Campaign ${args.campaignId} hit daily limit (${sentToday}/${campaign.dailySendLimit}), skipping`
        );
        return;
      }
      // Only send up to the remaining daily allowance
      batchLimit = Math.min(MAX_PER_BATCH, campaign.dailySendLimit - sentToday);
    } else {
      batchLimit = MAX_PER_BATCH;
    }

    // 3. Get next batch of pending recipients
    const recipients = await ctx.runQuery(
      internal.campaignRecipients.getPendingBatch,
      {
        campaignId: args.campaignId,
        limit: batchLimit,
      }
    );

    if (recipients.length === 0) {
      console.log(`Campaign ${args.campaignId} has no pending recipients`);
      // Recalc stats to mark as completed if appropriate
      await ctx.runMutation(internal.campaignRecipients.recalcStats, {
        campaignId: args.campaignId,
      });
      return;
    }

    let processed = 0;

    // 4. Sequential sends with delay
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];

      // Check if campaign was paused mid-batch (every 10 messages)
      if (processed > 0 && processed % 10 === 0) {
        const currentCampaign = await ctx.runQuery(
          internal.campaigns.getByIdInternal,
          { id: args.campaignId }
        );
        if (currentCampaign?.status === "paused") {
          console.log(
            `Campaign ${args.campaignId} paused at ${processed}/${recipients.length}`
          );
          break;
        }
      }

      try {
        // Mark recipient as sent BEFORE calling WhatsApp API to prevent
        // duplicate sends if the action times out after sending
        await ctx.runMutation(internal.campaignRecipients.updateStatusInternal, {
          id: recipient._id,
          status: "sent" as const,
          metaMessageId: null,
        });

        // Send via WhatsApp API
        const result: {
          success: boolean;
          messageId?: string;
          error?: string;
          statusCode?: number;
          errorCode?: number;
        } = await ctx.runAction(internal.whatsapp.sendTemplateMessage, {
          to: recipient.phone,
          templateName: campaign.templateName!,
          language: campaign.templateLanguage || "en",
          components: recipient.templateParams ?? undefined,
        });

        if (result.success && result.messageId) {
          // Update recipient with the actual messageId
          await ctx.runMutation(internal.campaignRecipients.updateStatusInternal, {
            id: recipient._id,
            status: "sent" as const,
            metaMessageId: result.messageId,
          });

          // Mark contact as sent so leads-query won't return them again
          await ctx.runMutation(internal.contacts.markSentInternal, {
            contactId: recipient.contactId,
          });

          // Log outbound message in conversation with rendered body
          try {
            // Extract business name from template params to render the body
            const contactName = recipient.templateParams?.[0]?.parameters?.[0]?.text || "";
            let renderedBody = campaign.templateBody || `[Template: ${campaign.templateName}]`;
            if (contactName) {
              renderedBody = renderedBody.replace(/\{\{business_name\}\}/g, contactName);
              renderedBody = renderedBody.replace(/\{\{1\}\}/g, contactName);
            }
            await ctx.runMutation(internal.messages.addOutboundInternal, {
              phone: recipient.phone,
              metaMessageId: result.messageId,
              body: renderedBody,
              templateName: campaign.templateName!,
            });
          } catch (e) {
            // Don't fail the send if message logging fails
            console.warn(`Failed to log outbound message for ${recipient.phone}:`, e);
          }

          processed++;
        } else {
          // Handle HTTP 429 rate limiting — stop immediately, retry later
          if (result.statusCode === 429) {
            console.warn(
              `Campaign ${args.campaignId}: rate limited at ${processed} sends. Will retry next batch.`
            );
            break;
          }

          // Handle error 131049 (frequency cap) — mark failed but don't count as processed
          const isFrequencyCap = result.errorCode === 131049;

          await ctx.runMutation(internal.campaignRecipients.updateStatusInternal, {
            id: recipient._id,
            status: "failed" as const,
            errorMessage: result.error || "Unknown error",
          });

          if (!isFrequencyCap) {
            processed++;
          }
        }
      } catch (error) {
        console.error(
          `Error sending to ${recipient.phone} in campaign ${args.campaignId}:`,
          error
        );
        await ctx.runMutation(internal.campaignRecipients.updateStatusInternal, {
          id: recipient._id,
          status: "failed" as const,
          errorMessage: error instanceof Error ? error.message : "Unknown error",
        });
        processed++;
      }

      // Rate limiting delay between sends (skip after last message)
      if (i < recipients.length - 1) {
        await new Promise((r) => setTimeout(r, SEND_DELAY_MS));
      }
    }

    // 5. After batch: recalc stats
    await ctx.runMutation(internal.campaignRecipients.recalcStats, {
      campaignId: args.campaignId,
    });

    // Check if we should auto-pause after this batch
    if (campaign.pauseAfterBatch) {
      const updatedCampaign = await ctx.runQuery(
        internal.campaigns.getByIdInternal,
        { id: args.campaignId }
      );
      // Only pause if campaign is still sending (not already completed by recalcStats)
      if (updatedCampaign?.status === "sending") {
        await ctx.runMutation(internal.campaigns.updateInternal, {
          id: args.campaignId,
          status: "paused",
        });
        console.log(
          `Campaign ${args.campaignId} auto-paused after batch (${processed} processed)`
        );
      }
    }

    console.log(`Campaign ${args.campaignId}: batch complete, ${processed} processed`);
  },
});
