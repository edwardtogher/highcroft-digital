import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const getByConversation = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .collect();
    return messages.sort(
      (a, b) => (a.createdAt ?? a._creationTime) - (b.createdAt ?? b._creationTime)
    );
  },
});

// Get all messages for a phone number (resolves phone -> conversation -> messages)
export const getByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();
    if (!conversation) return [];
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", conversation._id))
      .collect();
    return messages.sort(
      (a, b) => (a.createdAt ?? a._creationTime) - (b.createdAt ?? b._creationTime)
    );
  },
});

// No auth guard — called from webhook (protected by signature verification)
export const addInbound = mutation({
  args: {
    phone: v.string(),
    metaMessageId: v.optional(v.string()),
    fromNumber: v.string(),
    toNumber: v.string(),
    body: v.string(),
    timestamp: v.number(),
    replyToMetaId: v.optional(v.string()),
    contactName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Idempotency: skip if this metaMessageId already exists
    if (args.metaMessageId) {
      const existing = await ctx.db
        .query("messages")
        .withIndex("by_metaMessageId", (q) => q.eq("metaMessageId", args.metaMessageId!))
        .first();
      if (existing) return existing._id;
    }

    let conversation = await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    // Look up contact name for denormalization
    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    const resolvedContactName = args.contactName ?? contact?.name ?? undefined;

    if (!conversation) {
      const id = await ctx.db.insert("conversations", {
        phone: args.phone,
        businessName: args.contactName ?? args.phone,
        windowExpiry: args.timestamp + 24 * 60 * 60 * 1000,
        unreadCount: 1,
        lastActivity: args.timestamp,
        // Denormalized fields
        contactName: resolvedContactName,
        contactStatus: contact?.contactStatus ?? "new",
        lastMessageBody: args.body,
        lastMessageDirection: "inbound",
        lastMessageStatus: "received",

      });
      conversation = (await ctx.db.get(id))!;
    } else {
      await ctx.db.patch(conversation._id, {
        unreadCount: conversation.unreadCount + 1,
        windowExpiry: args.timestamp + 24 * 60 * 60 * 1000,
        lastActivity: args.timestamp,
        // Denormalized fields
        contactName: resolvedContactName ?? conversation.contactName,
        contactStatus: contact?.contactStatus ?? conversation.contactStatus,
        lastMessageBody: args.body,
        lastMessageDirection: "inbound",
        lastMessageStatus: "received",

      });
    }

    const messageId = await ctx.db.insert("messages", {
      conversationId: conversation._id,
      metaMessageId: args.metaMessageId ?? null,
      direction: "inbound",
      fromNumber: args.fromNumber,
      toNumber: args.toNumber,
      body: args.body,
      messageType: "text",
      status: "received",
      replyToMetaId: args.replyToMetaId ?? null,
      createdAt: args.timestamp,
    });

    if (contact) {
      const patch: Record<string, unknown> = { lastContactedAt: args.timestamp };
      if (args.contactName && args.contactName !== contact.name) {
        patch.name = args.contactName;
      }
      await ctx.db.patch(contact._id, patch);

      // Stop active sequences for this contact (they replied)
      const enrollments = await ctx.db.query("sequenceEnrollments")
        .withIndex("by_contact", q => q.eq("contactId", contact._id))
        .collect();
      for (const e of enrollments) {
        if (e.status === "active") {
          await ctx.db.patch(e._id, {
            status: "replied",
            completedAt: args.timestamp,
            nextStepAt: undefined,
          });
        }
      }
    }

    if (args.replyToMetaId) {
      const recipient = await ctx.db
        .query("campaignRecipients")
        .withIndex("by_metaMessageId", (q) => q.eq("metaMessageId", args.replyToMetaId!))
        .first();

      if (recipient && !recipient.repliedAt) {
        await ctx.db.patch(recipient._id, { repliedAt: args.timestamp });

        const campaign = await ctx.db.get(recipient.campaignId);
        if (campaign) {
          await ctx.db.patch(campaign._id, {
            repliedCount: campaign.repliedCount + 1,
          });
        }
      }
    } else {
      const recipients = await ctx.db
        .query("campaignRecipients")
        .withIndex("by_phone", (q) => q.eq("phone", args.phone))
        .collect();

      const unreplied = recipients.find((r) => !r.repliedAt && r.status !== "failed");
      if (unreplied) {
        await ctx.db.patch(unreplied._id, { repliedAt: args.timestamp });

        const campaign = await ctx.db.get(unreplied.campaignId);
        if (campaign) {
          await ctx.db.patch(campaign._id, {
            repliedCount: campaign.repliedCount + 1,
          });
        }
      }
    }

    return messageId;
  },
});

export const addOutbound = mutation({
  args: {
    phone: v.string(),
    metaMessageId: v.optional(v.string()),
    fromNumber: v.string(),
    toNumber: v.string(),
    body: v.string(),
    timestamp: v.number(),
    messageType: v.union(v.literal("text"), v.literal("template")),
    templateName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let conversation = await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    // Look up contact name for denormalization
    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    // Forward-only guard: only advance to "sent" if current status is lower rank
    const STATUS_RANK: Record<string, number> = {
      new: 0, ready: 1, no_mobile: 1, sent: 2, interested: 3, not_interested: 3,
    };
    const canAdvance = contact
      ? (STATUS_RANK["sent"] ?? -1) > (STATUS_RANK[contact.contactStatus] ?? -1)
      : false;
    const outboundContactStatus = contact
      ? (canAdvance ? "sent" : contact.contactStatus)
      : "new";

    if (!conversation) {
      const id = await ctx.db.insert("conversations", {
        phone: args.phone,
        businessName: args.phone,
        windowExpiry: null,
        unreadCount: 0,
        lastActivity: args.timestamp,
        // Denormalized fields
        contactName: contact?.name,
        contactStatus: outboundContactStatus,
        lastMessageBody: args.body,
        lastMessageDirection: "outbound",
        lastMessageStatus: "pending",

      });
      conversation = (await ctx.db.get(id))!;
    } else {
      await ctx.db.patch(conversation._id, {
        lastActivity: args.timestamp,
        // Denormalized fields
        contactName: contact?.name ?? conversation.contactName,
        contactStatus: outboundContactStatus,
        lastMessageBody: args.body,
        lastMessageDirection: "outbound",
        lastMessageStatus: "pending",

      });
    }

    const messageId = await ctx.db.insert("messages", {
      conversationId: conversation._id,
      metaMessageId: args.metaMessageId ?? null,
      direction: "outbound",
      fromNumber: args.fromNumber,
      toNumber: args.toNumber,
      body: args.body,
      messageType: args.messageType,
      status: "pending",
      templateName: args.templateName ?? null,
      createdAt: args.timestamp,
    });

    if (contact) {
      const patch: Record<string, unknown> = { lastContactedAt: args.timestamp };
      if (canAdvance) {
        patch.contactStatus = "sent";
      }
      if (args.messageType === "template") {
        patch.templatesSent = contact.templatesSent + 1;
      }
      await ctx.db.patch(contact._id, patch);
    }

    return messageId;
  },
});

// No auth guard — called from webhook (protected by signature verification)
export const updateStatus = mutation({
  args: {
    metaMessageId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read"),
      v.literal("received"),
      v.literal("failed")
    ),
    errorMessage: v.optional(v.string()),
    timestamp: v.optional(v.number()),
  },
  handler: async (ctx, args) => {

    const message = await ctx.db
      .query("messages")
      .withIndex("by_metaMessageId", (q) => q.eq("metaMessageId", args.metaMessageId))
      .first();

    if (!message) return null;

    await ctx.db.patch(message._id, {
      status: args.status,
      errorMessage: args.errorMessage ?? message.errorMessage,
    });

    const recipient = await ctx.db
      .query("campaignRecipients")
      .withIndex("by_metaMessageId", (q) => q.eq("metaMessageId", args.metaMessageId))
      .first();

    if (recipient) {
      const now = args.timestamp ?? Date.now();
      const recipientPatch: Record<string, unknown> = { status: args.status };

      if (args.status === "sent" && !recipient.sentAt) {
        recipientPatch.sentAt = now;
      } else if (args.status === "delivered" && !recipient.deliveredAt) {
        recipientPatch.deliveredAt = now;
      } else if (args.status === "read" && !recipient.readAt) {
        recipientPatch.readAt = now;
      } else if (args.status === "failed") {
        recipientPatch.failedAt = now;
        recipientPatch.errorMessage = args.errorMessage ?? null;
      }

      await ctx.db.patch(recipient._id, recipientPatch);

      const campaign = await ctx.db.get(recipient.campaignId);
      if (campaign) {
        const campaignPatch: Record<string, unknown> = {};

        if (args.status === "delivered" && !recipient.deliveredAt) {
          campaignPatch.deliveredCount = campaign.deliveredCount + 1;
        } else if (args.status === "read" && !recipient.readAt) {
          campaignPatch.readCount = campaign.readCount + 1;
        } else if (args.status === "failed" && !recipient.failedAt) {
          campaignPatch.failedCount = campaign.failedCount + 1;
        }

        if (Object.keys(campaignPatch).length > 0) {
          await ctx.db.patch(campaign._id, campaignPatch);
        }
      }
    }

    return message._id;
  },
});

// TEMPORARY — delete a conversation and all its messages
export const deleteConversation = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("messages")
      .withIndex("by_conversation", q => q.eq("conversationId", args.conversationId))
      .collect();
    for (const m of messages) await ctx.db.delete(m._id);
    await ctx.db.delete(args.conversationId);
    return { deleted: messages.length };
  },
});

// Internal mutation used by campaignProcessor to log outbound messages
export const addOutboundInternal = internalMutation({
  args: {
    phone: v.string(),
    metaMessageId: v.string(),
    body: v.string(),
    templateName: v.string(),
  },
  handler: async (ctx, args) => {
    let conversation = await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    const now = Date.now();

    // Look up contact name for denormalization
    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (!conversation) {
      const id = await ctx.db.insert("conversations", {
        phone: args.phone,
        businessName: args.phone,
        windowExpiry: null,
        unreadCount: 0,
        lastActivity: now,
        // Denormalized fields
        contactName: contact?.name,
        contactStatus: contact?.contactStatus ?? "new",
        lastMessageBody: args.body,
        lastMessageDirection: "outbound",
        lastMessageStatus: "sent",

      });
      conversation = (await ctx.db.get(id))!;
    } else {
      await ctx.db.patch(conversation._id, {
        lastActivity: now,
        // Denormalized fields
        contactName: contact?.name ?? conversation.contactName,
        contactStatus: contact?.contactStatus ?? conversation.contactStatus,
        lastMessageBody: args.body,
        lastMessageDirection: "outbound",
        lastMessageStatus: "sent",

      });
    }

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";

    return await ctx.db.insert("messages", {
      conversationId: conversation._id,
      metaMessageId: args.metaMessageId,
      direction: "outbound",
      fromNumber: phoneNumberId,
      toNumber: args.phone,
      body: args.body,
      messageType: "template",
      status: "sent",
      templateName: args.templateName,
      createdAt: now,
    });
  },
});

// TEMPORARY — import historical message + ensure conversation exists
export const importMessage = mutation({
  args: {
    phone: v.string(),
    metaMessageId: v.optional(v.union(v.string(), v.null())),
    direction: v.union(v.literal("inbound"), v.literal("outbound")),
    body: v.string(),
    status: v.union(
      v.literal("pending"), v.literal("sent"), v.literal("delivered"),
      v.literal("read"), v.literal("received"), v.literal("failed")
    ),
    timestamp: v.number(),
    templateName: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    // Idempotency
    if (args.metaMessageId) {
      const existing = await ctx.db.query("messages")
        .withIndex("by_metaMessageId", q => q.eq("metaMessageId", args.metaMessageId))
        .first();
      if (existing) return existing._id;
    }

    // Get or create conversation
    let conversation = await ctx.db.query("conversations")
      .withIndex("by_phone", q => q.eq("phone", args.phone))
      .first();

    if (!conversation) {
      const contact = await ctx.db.query("contacts")
        .withIndex("by_phone", q => q.eq("phone", args.phone))
        .first();

      const id = await ctx.db.insert("conversations", {
        phone: args.phone,
        businessName: contact?.name ?? args.phone,
        windowExpiry: null,
        unreadCount: 0,
        lastActivity: args.timestamp,
        contactName: contact?.name,
        contactStatus: contact?.contactStatus ?? "sent",
        lastMessageBody: args.body,
        lastMessageDirection: args.direction,
        lastMessageStatus: args.status,
      });
      conversation = (await ctx.db.get(id))!;
    } else if (args.timestamp >= (conversation.lastActivity || 0)) {
      // Update conversation with latest message
      await ctx.db.patch(conversation._id, {
        lastActivity: args.timestamp,
        lastMessageBody: args.body,
        lastMessageDirection: args.direction,
        lastMessageStatus: args.status,
      });
    }

    return await ctx.db.insert("messages", {
      conversationId: conversation._id,
      metaMessageId: args.metaMessageId ?? null,
      direction: args.direction,
      fromNumber: args.direction === "inbound" ? args.phone : "orbit",
      toNumber: args.direction === "inbound" ? "orbit" : args.phone,
      body: args.body,
      messageType: args.templateName ? "template" : "text",
      status: args.status,
      templateName: args.templateName ?? null,
      createdAt: args.timestamp,
    });
  },
});

// Temporary — outbound message audit
export const outboundAudit = query({
  args: {},
  handler: async (ctx) => {
    const msgs = await ctx.db.query("messages").collect();
    const outbound = msgs.filter(m => m.direction === "outbound");
    const phones = new Set(outbound.map(m => m.toNumber));
    const wamids = new Set(outbound.filter(m => m.metaMessageId).map(m => m.metaMessageId));
    const statuses: Record<string, number> = {};
    const types: Record<string, number> = {};
    for (const m of outbound) {
      statuses[m.status] = (statuses[m.status] || 0) + 1;
      types[m.messageType] = (types[m.messageType] || 0) + 1;
    }
    return {
      totalOutbound: outbound.length,
      uniquePhones: phones.size,
      uniqueWamids: wamids.size,
      statuses,
      types,
      totalInbound: msgs.filter(m => m.direction === "inbound").length,
    };
  },
});

// Temporary — message timeline audit
export const timelineAudit = query({
  args: {},
  handler: async (ctx) => {
    const msgs = await ctx.db.query("messages").collect();
    
    // Find date range
    const timestamps = msgs.map(m => m.createdAt ?? m._creationTime).filter(Boolean).sort();
    const earliest = timestamps[0];
    const latest = timestamps[timestamps.length - 1];
    
    // Group by day and direction
    const byDay: Record<string, { inbound: number; outbound: number }> = {};
    for (const m of msgs) {
      const ts = m.createdAt ?? m._creationTime;
      if (!ts) continue;
      const day = new Date(ts).toISOString().split("T")[0];
      if (!byDay[day]) byDay[day] = { inbound: 0, outbound: 0 };
      byDay[day][m.direction as "inbound" | "outbound"]++;
    }
    
    // Sort days
    const days = Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0]));
    
    return {
      totalMessages: msgs.length,
      inbound: msgs.filter(m => m.direction === "inbound").length,
      outbound: msgs.filter(m => m.direction === "outbound").length,
      earliestMessage: earliest ? new Date(earliest).toISOString() : null,
      latestMessage: latest ? new Date(latest).toISOString() : null,
      messagesByDay: Object.fromEntries(days),
    };
  },
});

// Temporary — fix message body by metaMessageId
export const fixMessageBody = mutation({
  args: { metaMessageId: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    const msg = await ctx.db.query("messages")
      .withIndex("by_metaMessageId", q => q.eq("metaMessageId", args.metaMessageId))
      .first();
    if (!msg) return null;
    await ctx.db.patch(msg._id, { body: args.body });
    // Also update conversation lastMessageBody if this is the latest
    const conv = await ctx.db.get(msg.conversationId);
    if (conv && conv.lastMessageBody?.includes("{{business_name}}")) {
      await ctx.db.patch(conv._id, { lastMessageBody: args.body });
    }
    return msg._id;
  },
});

// TEMPORARY — delete a single message by ID
export const deleteMessage = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId);
    return { ok: true };
  },
});
