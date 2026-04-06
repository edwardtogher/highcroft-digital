import { query, mutation, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("campaigns").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("campaigns") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    templateId: v.optional(v.union(v.string(), v.null())),
    templateName: v.optional(v.union(v.string(), v.null())),
    templateCategory: v.optional(v.union(v.string(), v.null())),
    templateBody: v.optional(v.union(v.string(), v.null())),
    templateComponents: v.optional(v.any()),
    contactListId: v.optional(v.union(v.id("contactLists"), v.null())),
    sendWindowStart: v.optional(v.number()),
    sendWindowEnd: v.optional(v.number()),
    templateLanguage: v.optional(v.string()),
    scheduledAt: v.optional(v.union(v.number(), v.null())),
    pauseAfterBatch: v.optional(v.boolean()),
    dailySendLimit: v.optional(v.number()),
    // Migration fields — optional overrides for imported data
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("scheduled"),
        v.literal("sending"),
        v.literal("paused"),
        v.literal("completed"),
        v.literal("failed")
      )
    ),
    totalRecipients: v.optional(v.number()),
    sentCount: v.optional(v.number()),
    deliveredCount: v.optional(v.number()),
    readCount: v.optional(v.number()),
    failedCount: v.optional(v.number()),
    repliedCount: v.optional(v.number()),
    startedAt: v.optional(v.union(v.number(), v.null())),
    completedAt: v.optional(v.union(v.number(), v.null())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("campaigns", {
      name: args.name,
      templateId: args.templateId ?? null,
      templateName: args.templateName ?? null,
      templateCategory: args.templateCategory ?? null,
      templateBody: args.templateBody ?? null,
      templateComponents: args.templateComponents,
      contactListId: args.contactListId ?? null,
      templateLanguage: args.templateLanguage ?? "en",
      sendWindowStart: args.sendWindowStart ?? 9,
      sendWindowEnd: args.sendWindowEnd ?? 20,
      status: args.status ?? "draft",
      totalRecipients: args.totalRecipients ?? 0,
      sentCount: args.sentCount ?? 0,
      deliveredCount: args.deliveredCount ?? 0,
      readCount: args.readCount ?? 0,
      failedCount: args.failedCount ?? 0,
      repliedCount: args.repliedCount ?? 0,
      pauseAfterBatch: args.pauseAfterBatch,
      dailySendLimit: args.dailySendLimit,
      scheduledAt: args.scheduledAt ?? null,
      startedAt: args.startedAt ?? null,
      completedAt: args.completedAt ?? null,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("campaigns"),
    name: v.optional(v.string()),
    templateId: v.optional(v.union(v.string(), v.null())),
    templateName: v.optional(v.union(v.string(), v.null())),
    templateLanguage: v.optional(v.string()),
    templateCategory: v.optional(v.union(v.string(), v.null())),
    templateBody: v.optional(v.union(v.string(), v.null())),
    templateComponents: v.optional(v.any()),
    contactListId: v.optional(v.union(v.id("contactLists"), v.null())),
    sendWindowStart: v.optional(v.number()),
    sendWindowEnd: v.optional(v.number()),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("scheduled"),
        v.literal("sending"),
        v.literal("paused"),
        v.literal("completed"),
        v.literal("failed")
      )
    ),
    totalRecipients: v.optional(v.number()),
    sentCount: v.optional(v.number()),
    deliveredCount: v.optional(v.number()),
    readCount: v.optional(v.number()),
    failedCount: v.optional(v.number()),
    repliedCount: v.optional(v.number()),
    pauseAfterBatch: v.optional(v.boolean()),
    dailySendLimit: v.optional(v.number()),
    scheduledAt: v.optional(v.union(v.number(), v.null())),
    startedAt: v.optional(v.union(v.number(), v.null())),
    completedAt: v.optional(v.union(v.number(), v.null())),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Campaign ${id} not found`);
    }
    // Only patch fields that were explicitly provided
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }
    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(id, updates);
    }
  },
});

export const remove = mutation({
  args: { id: v.id("campaigns") },
  handler: async (ctx, args) => {
    // Delete all campaign recipients first
    const recipients = await ctx.db
      .query("campaignRecipients")
      .withIndex("by_campaign_status", (q) => q.eq("campaignId", args.id))
      .collect();

    for (const recipient of recipients) {
      await ctx.db.delete(recipient._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const startSend = mutation({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${args.campaignId} not found`);
    }
    if (!campaign.contactListId) {
      throw new Error("Campaign has no contact list assigned");
    }

    // Get all members of the contact list
    const members = await ctx.db
      .query("contactListMembers")
      .withIndex("by_list", (q) => q.eq("listId", campaign.contactListId!))
      .collect();

    if (members.length === 0) {
      throw new Error("Contact list has no members");
    }

    // Create a campaign recipient for each member
    for (const member of members) {
      const contact = await ctx.db.get(member.contactId);
      if (!contact) continue;

      // Build template params — {{business_name}} for all current templates
      const templateParams = [{
        type: "body",
        parameters: [{ type: "text", text: contact.name, parameter_name: "business_name" }],
      }];

      await ctx.db.insert("campaignRecipients", {
        campaignId: args.campaignId,
        contactId: member.contactId,
        phone: contact.phone,
        templateParams,
        status: "pending",
        isAutoReply: false,
        metaMessageId: null,
        errorMessage: null,
        sentAt: null,
        deliveredAt: null,
        readAt: null,
        failedAt: null,
        repliedAt: null,
        convertedAt: null,
        conversionSource: null,
      });
    }

    // Update campaign status
    await ctx.db.patch(args.campaignId, {
      totalRecipients: members.length,
      status: "sending",
      startedAt: Date.now(),
    });
  },
});

// Create a campaign from all "ready" contacts in one server-side call
export const createFromReady = mutation({
  args: {
    name: v.string(),
    templateName: v.string(),
    templateBody: v.string(),
    templateLanguage: v.optional(v.string()),
    dailySendLimit: v.optional(v.number()),
    sendWindowStart: v.optional(v.number()),
    sendWindowEnd: v.optional(v.number()),
    pauseAfterBatch: v.optional(v.boolean()),
    autoStart: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // 1. Get all ready contacts
    const ready = await ctx.db
      .query("contacts")
      .withIndex("by_contactStatus", (q) => q.eq("contactStatus", "ready"))
      .collect();

    if (ready.length === 0) throw new Error("No ready contacts found");

    // 2. Create contact list
    const listId = await ctx.db.insert("contactLists", {
      name: args.name,
      description: `Auto-created ${new Date().toISOString()}`,
      memberCount: ready.length,
    });

    // 3. Add all ready contacts as members
    for (const contact of ready) {
      await ctx.db.insert("contactListMembers", {
        listId,
        contactId: contact._id,
      });
    }

    // 4. Create campaign
    const campaignId = await ctx.db.insert("campaigns", {
      name: args.name,
      templateName: args.templateName,
      templateBody: args.templateBody,
      templateLanguage: args.templateLanguage ?? "en",
      templateId: null,
      templateCategory: null,
      contactListId: listId,
      sendWindowStart: args.sendWindowStart ?? 9,
      sendWindowEnd: args.sendWindowEnd ?? 17,
      dailySendLimit: args.dailySendLimit,
      pauseAfterBatch: args.pauseAfterBatch,
      status: "draft",
      totalRecipients: 0,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      failedCount: 0,
      repliedCount: 0,
      scheduledAt: null,
      startedAt: null,
      completedAt: null,
    });

    // 5. Create recipients + start if requested
    if (args.autoStart) {
      for (const contact of ready) {
        const templateParams = [{
          type: "body",
          parameters: [{ type: "text", text: contact.name, parameter_name: "business_name" }],
        }];
        await ctx.db.insert("campaignRecipients", {
          campaignId,
          contactId: contact._id,
          phone: contact.phone,
          templateParams,
          status: "pending",
          isAutoReply: false,
          metaMessageId: null,
          errorMessage: null,
          sentAt: null,
          deliveredAt: null,
          readAt: null,
          failedAt: null,
          repliedAt: null,
          convertedAt: null,
          conversionSource: null,
        });
      }

      await ctx.db.patch(campaignId, {
        totalRecipients: ready.length,
        status: "sending",
        startedAt: Date.now(),
      });
    }

    return { campaignId, listId, recipientCount: ready.length };
  },
});

// Create a campaign from ready contacts filtered by type
export const createFromReadyByType = mutation({
  args: {
    name: v.string(),
    templateName: v.string(),
    templateBody: v.string(),
    templateLanguage: v.optional(v.string()),
    dailySendLimit: v.optional(v.number()),
    sendWindowStart: v.optional(v.number()),
    sendWindowEnd: v.optional(v.number()),
    pauseAfterBatch: v.optional(v.boolean()),
    autoStart: v.optional(v.boolean()),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const allReady = await ctx.db
      .query("contacts")
      .withIndex("by_contactStatus", (q) => q.eq("contactStatus", "ready"))
      .collect();

    const ready = allReady.filter((c) => c.type === args.type);
    if (ready.length === 0) throw new Error(`No ready contacts with type "${args.type}"`);

    const listId = await ctx.db.insert("contactLists", {
      name: args.name,
      description: `Auto-created ${new Date().toISOString()} — type: ${args.type}`,
      memberCount: ready.length,
    });

    for (const contact of ready) {
      await ctx.db.insert("contactListMembers", { listId, contactId: contact._id });
    }

    const campaignId = await ctx.db.insert("campaigns", {
      name: args.name,
      templateName: args.templateName,
      templateBody: args.templateBody,
      templateLanguage: args.templateLanguage ?? "en",
      templateId: null,
      templateCategory: null,
      contactListId: listId,
      sendWindowStart: args.sendWindowStart ?? 9,
      sendWindowEnd: args.sendWindowEnd ?? 17,
      dailySendLimit: args.dailySendLimit,
      pauseAfterBatch: args.pauseAfterBatch,
      status: "draft",
      totalRecipients: 0,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      failedCount: 0,
      repliedCount: 0,
      scheduledAt: null,
      startedAt: null,
      completedAt: null,
    });

    if (args.autoStart) {
      for (const contact of ready) {
        await ctx.db.insert("campaignRecipients", {
          campaignId,
          contactId: contact._id,
          phone: contact.phone,
          templateParams: [{
            type: "body",
            parameters: [{ type: "text", text: contact.name, parameter_name: "business_name" }],
          }],
          status: "pending",
          isAutoReply: false,
          metaMessageId: null,
          errorMessage: null,
          sentAt: null,
          deliveredAt: null,
          readAt: null,
          failedAt: null,
          repliedAt: null,
          convertedAt: null,
          conversionSource: null,
        });
      }

      await ctx.db.patch(campaignId, {
        totalRecipients: ready.length,
        status: "sending",
        startedAt: Date.now(),
      });
    }

    return { campaignId, listId, recipientCount: ready.length };
  },
});

// Refresh recipient templateParams from current contact names
export const refreshRecipientNames = mutation({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, args) => {
    const recipients = await ctx.db
      .query("campaignRecipients")
      .withIndex("by_campaign_status", (q) => q.eq("campaignId", args.campaignId))
      .collect();

    let updated = 0;
    for (const r of recipients) {
      if (r.status !== "pending") continue;
      const contact = await ctx.db.get(r.contactId);
      if (!contact) continue;

      const currentName = r.templateParams?.[0]?.parameters?.[0]?.text;
      if (currentName !== contact.name) {
        const templateParams = [{
          type: "body",
          parameters: [{ type: "text", text: contact.name, parameter_name: "business_name" }],
        }];
        await ctx.db.patch(r._id, { templateParams });
        updated++;
      }
    }
    return { checked: recipients.length, updated };
  },
});

// --- Internal functions used by campaignProcessor ---

export const listByStatus = internalQuery({
  args: {
    status: v.union(
      v.literal("draft"),
      v.literal("scheduled"),
      v.literal("sending"),
      v.literal("paused"),
      v.literal("completed"),
      v.literal("failed")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("campaigns")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const getByIdInternal = internalQuery({
  args: { id: v.id("campaigns") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateInternal = internalMutation({
  args: {
    id: v.id("campaigns"),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("scheduled"),
        v.literal("sending"),
        v.literal("paused"),
        v.literal("completed"),
        v.literal("failed")
      )
    ),
    completedAt: v.optional(v.union(v.number(), v.null())),
    startedAt: v.optional(v.union(v.number(), v.null())),
    pauseAfterBatch: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }
    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(id, updates);
    }
  },
});
