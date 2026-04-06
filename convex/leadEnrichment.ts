"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

function normalizeToUKMobile(raw: string): string | null {
  // Strip all non-digit chars except leading +
  let digits = raw.replace(/[^\d+]/g, "");

  // Convert various prefixes to international format
  if (digits.startsWith("+44")) digits = "44" + digits.slice(3);
  else if (digits.startsWith("0044")) digits = "44" + digits.slice(4);
  else if (digits.startsWith("0")) digits = "44" + digits.slice(1);

  // Remove any remaining non-digits
  digits = digits.replace(/\D/g, "");

  // UK mobile: 12 digits starting with 447
  if (digits.length === 12 && digits.startsWith("447")) {
    // Mobile prefixes: 447[3-9] (not 440, 441, 442 etc which are landlines)
    const mobileDigit = parseInt(digits[3]);
    if (mobileDigit >= 3 && mobileDigit <= 9) {
      return digits;
    }
  }

  return null;
}

export const enrichLead = internalAction({
  args: { leadId: v.id("adLibraryLeads") },
  handler: async (ctx, args) => {
    // 1. Fetch lead
    const lead = await ctx.runQuery(internal.adLibraryLeads.getById, { leadId: args.leadId });
    if (!lead) throw new Error("Lead not found");

    // Gate: only enrich qualified or manual_review leads
    if (lead.qualificationStatus === "auto_rejected") {
      return { success: false, error: "Lead auto-rejected by qualification — skipping enrichment" };
    }
    if (lead.qualificationStatus === undefined || lead.qualificationStatus === "pending") {
      return { success: false, error: "Lead not yet qualified — skipping enrichment" };
    }

    // 2. Set pending
    await ctx.runMutation(internal.adLibraryLeads.updateEnrichment, {
      leadId: args.leadId,
      enrichmentStatus: "pending",
    });

    try {
      let website: string | null = null;
      let phone: string | null = null;
      let phoneSource: "facebook" | "website_scrape" | null = null;
      let contactPerson: string | null = null;
      let contactPersonTitle: string | null = null;
      let location: string | null = null;

      // Step 1: Facebook Graph API
      const token = process.env.META_AD_LIBRARY_ACCESS_TOKEN;
      if (token) {
        try {
          const fbUrl = `https://graph.facebook.com/v25.0/${lead.pageId}?fields=website,phone,location,single_line_address`;
          const fbRes = await fetch(fbUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (fbRes.ok) {
            const fbData = await fbRes.json();
            website = fbData.website || null;
            location = fbData.single_line_address || fbData.location?.city || null;

            if (fbData.phone) {
              const normalized = normalizeToUKMobile(fbData.phone);
              if (normalized) {
                phone = normalized;
                phoneSource = "facebook";
              }
            }
          }
        } catch (e) {
          console.log("FB Graph API error (non-fatal):", e);
        }
      }

      // Step 2: Claude web_fetch (only if no mobile found + website exists)
      if (!phone && website) {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (apiKey) {
          try {
            const prompt = `Fetch the website ${website} and look for Contact, About, Team, or similar pages. Extract:
1. A UK mobile phone number (starting with 07, +44 7, or 0044 7)
2. The name and title of the director, owner, manager, or principal

Return ONLY a JSON object like this, with no other text:
{"phone": "07xxx xxx xxx", "contactPerson": "John Smith", "contactPersonTitle": "Director"}

If you cannot find a phone number or contact person, use null for those fields.`;

            const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: {
                "x-api-key": apiKey,
                "content-type": "application/json",
                "anthropic-version": "2024-01-01",
              },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1024,
                tools: [{ type: "web_fetch_20250305", name: "web_fetch" }],
                messages: [{ role: "user", content: prompt }],
              }),
            });

            if (anthropicRes.ok) {
              const result = await anthropicRes.json();

              // Find the text block in the response
              const textBlock = result.content?.find((b: any) => b.type === "text");
              if (textBlock?.text) {
                // Try to parse JSON from the text
                const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  const parsed = JSON.parse(jsonMatch[0]);

                  if (parsed.phone) {
                    const normalized = normalizeToUKMobile(parsed.phone);
                    if (normalized) {
                      phone = normalized;
                      phoneSource = "website_scrape";
                    }
                  }
                  if (parsed.contactPerson) {
                    contactPerson = parsed.contactPerson;
                  }
                  if (parsed.contactPersonTitle) {
                    contactPersonTitle = parsed.contactPersonTitle;
                  }
                }
              }
            }
          } catch (e) {
            console.log("Claude web_fetch error (non-fatal):", e);
          }
        }
      }

      // Update lead with enrichment data
      const finalStatus = phone ? "enriched" : "no_phone_found";
      await ctx.runMutation(internal.adLibraryLeads.updateEnrichment, {
        leadId: args.leadId,
        website,
        phone,
        phoneSource,
        contactPerson,
        contactPersonTitle,
        location,
        enrichmentStatus: finalStatus,
        enrichedAt: Date.now(),
      });

      return { success: true, status: finalStatus };
    } catch (error) {
      await ctx.runMutation(internal.adLibraryLeads.updateEnrichment, {
        leadId: args.leadId,
        enrichmentStatus: "failed",
        enrichmentError: error instanceof Error ? error.message : "Unknown error",
      });
      return { success: false, error: String(error) };
    }
  },
});

export const runEnrichLead = action({
  args: { leadId: v.id("adLibraryLeads") },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(0, internal.leadEnrichment.enrichLead, {
      leadId: args.leadId,
    });
    return { scheduled: true };
  },
});

export const batchEnrichLeads = action({
  args: { leadIds: v.array(v.id("adLibraryLeads")) },
  handler: async (ctx, args) => {
    for (const leadId of args.leadIds) {
      await ctx.scheduler.runAfter(0, internal.leadEnrichment.enrichLead, {
        leadId,
      });
    }
    return { scheduled: args.leadIds.length };
  },
});
