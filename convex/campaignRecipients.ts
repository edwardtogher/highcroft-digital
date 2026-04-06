import { query, mutation, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const getByCampaign = query({
  args: {
    campaignId: v.id("campaigns"),
    search: v.optional(v.string()),
    status: v.optional(v.string()),
    replied: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get all recipients for this campaign
    let recipients = await ctx.db
      .query("campaignRecipients")
      .withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId))
      .collect();

    // Filter by status if provided
    if (args.status) {
      recipients = recipients.filter((r) => r.status === args.status);
    }

    // Filter by replied status if provided
    if (args.replied === "yes") {
      recipients = recipients.filter((r) => r.repliedAt !== null && r.repliedAt !== undefined);
    } else if (args.replied === "no") {
      recipients = recipients.filter((r) => r.repliedAt === null || r.repliedAt === undefined);
    }

    // Batch fetch all contacts instead of N+1
    const uniqueContactIds = [...new Set(recipients.map((r) => r.contactId))];
    const contactsArr = await Promise.all(uniqueContactIds.map((id) => ctx.db.get(id)));
    const contactMap = new Map(
      contactsArr.filter(Boolean).map((c) => [c!._id, c!])
    );

    const results = recipients.map((recipient) => {
      const contact = contactMap.get(recipient.contactId);
      return {
        ...recipient,
        contactName: contact?.name ?? null,
        contactCompany: contact?.company ?? null,
        contactEmail: contact?.email ?? null,
      };
    });

    // Filter by search term (matches against contact name, company, email, or phone)
    if (args.search) {
      const term = args.search.toLowerCase();
      return results.filter(
        (r) =>
          r.phone.toLowerCase().includes(term) ||
          (r.contactName && r.contactName.toLowerCase().includes(term)) ||
          (r.contactCompany && r.contactCompany.toLowerCase().includes(term)) ||
          (r.contactEmail && r.contactEmail.toLowerCase().includes(term))
      );
    }

    return results;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("campaignRecipients"),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read"),
      v.literal("failed")
    ),
    metaMessageId: v.optional(v.union(v.string(), v.null())),
    errorMessage: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error(`Campaign recipient ${args.id} not found`);
    }

    const updates: Record<string, unknown> = { status: args.status };

    // Set the appropriate timestamp based on status
    const now = Date.now();
    switch (args.status) {
      case "sent":
        updates.sentAt = now;
        break;
      case "delivered":
        updates.deliveredAt = now;
        break;
      case "read":
        updates.readAt = now;
        break;
      case "failed":
        updates.failedAt = now;
        break;
    }

    if (args.metaMessageId !== undefined) {
      updates.metaMessageId = args.metaMessageId;
    }
    if (args.errorMessage !== undefined) {
      updates.errorMessage = args.errorMessage;
    }

    await ctx.db.patch(args.id, updates);
  },
});

export const markReplied = mutation({
  args: { id: v.id("campaignRecipients") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error(`Campaign recipient ${args.id} not found`);
    }
    await ctx.db.patch(args.id, { repliedAt: Date.now() });
  },
});

// Direct insert for migration — no side effects
export const createDirect = mutation({
  args: {
    campaignId: v.id("campaigns"),
    contactId: v.id("contacts"),
    phone: v.string(),
    templateParams: v.optional(v.any()),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read"),
      v.literal("failed")
    ),
    metaMessageId: v.optional(v.union(v.string(), v.null())),
    errorMessage: v.optional(v.union(v.string(), v.null())),
    sentAt: v.optional(v.union(v.number(), v.null())),
    deliveredAt: v.optional(v.union(v.number(), v.null())),
    readAt: v.optional(v.union(v.number(), v.null())),
    failedAt: v.optional(v.union(v.number(), v.null())),
    repliedAt: v.optional(v.union(v.number(), v.null())),
    isAutoReply: v.boolean(),
    convertedAt: v.optional(v.union(v.number(), v.null())),
    conversionSource: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("campaignRecipients", {
      campaignId: args.campaignId,
      contactId: args.contactId,
      phone: args.phone,
      templateParams: args.templateParams,
      status: args.status,
      metaMessageId: args.metaMessageId ?? null,
      errorMessage: args.errorMessage ?? null,
      sentAt: args.sentAt ?? null,
      deliveredAt: args.deliveredAt ?? null,
      readAt: args.readAt ?? null,
      failedAt: args.failedAt ?? null,
      repliedAt: args.repliedAt ?? null,
      isAutoReply: args.isAutoReply,
      convertedAt: args.convertedAt ?? null,
      conversionSource: args.conversionSource ?? null,
    });
  },
});

export const recalcStats = internalMutation({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) return;

    const recipients = await ctx.db
      .query("campaignRecipients")
      .withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId))
      .collect();

    let sentCount = 0;
    let deliveredCount = 0;
    let readCount = 0;
    let failedCount = 0;
    let repliedCount = 0;
    let pendingCount = 0;

    for (const r of recipients) {
      switch (r.status) {
        case "sent":
          sentCount++;
          break;
        case "delivered":
          deliveredCount++;
          break;
        case "read":
          readCount++;
          break;
        case "failed":
          failedCount++;
          break;
        case "pending":
          pendingCount++;
          break;
      }
      if (r.repliedAt !== null && r.repliedAt !== undefined) {
        repliedCount++;
      }
    }

    const updates: Record<string, unknown> = {
      sentCount,
      deliveredCount,
      readCount,
      failedCount,
      repliedCount,
    };

    // If no pending recipients remain, mark campaign as completed
    if (pendingCount === 0 && recipients.length > 0) {
      updates.status = "completed";
      updates.completedAt = Date.now();
    }

    await ctx.db.patch(args.campaignId, updates);
  },
});

// Count recipients sent today (UK timezone) for daily limit enforcement
export const countSentToday = internalQuery({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    // Get start of today in UK timezone
    const now = new Date();
    const ukDate = new Date(now.toLocaleString("en-GB", { timeZone: "Europe/London" }));
    ukDate.setHours(0, 0, 0, 0);
    const todayStart = ukDate.getTime();

    const recipients = await ctx.db
      .query("campaignRecipients")
      .withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId))
      .collect();

    return recipients.filter(
      (r) => r.status !== "pending" && r.status !== "failed" && r.sentAt && r.sentAt >= todayStart
    ).length;
  },
});

// --- Internal functions used by campaignProcessor ---

export const getPendingBatch = internalQuery({
  args: {
    campaignId: v.id("campaigns"),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("campaignRecipients")
      .withIndex("by_campaign_status", (q) =>
        q.eq("campaignId", args.campaignId).eq("status", "pending")
      )
      .take(args.limit);
  },
});

export const updateStatusInternal = internalMutation({
  args: {
    id: v.id("campaignRecipients"),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read"),
      v.literal("failed")
    ),
    metaMessageId: v.optional(v.union(v.string(), v.null())),
    errorMessage: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, unknown> = { status: args.status };

    const now = Date.now();
    switch (args.status) {
      case "sent":
        updates.sentAt = now;
        break;
      case "delivered":
        updates.deliveredAt = now;
        break;
      case "read":
        updates.readAt = now;
        break;
      case "failed":
        updates.failedAt = now;
        break;
    }

    if (args.metaMessageId !== undefined) {
      updates.metaMessageId = args.metaMessageId;
    }
    if (args.errorMessage !== undefined) {
      updates.errorMessage = args.errorMessage;
    }

    await ctx.db.patch(args.id, updates);
  },
});
