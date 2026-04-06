import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    tagId: v.optional(v.id("tags")),
    unreadOnly: v.optional(v.boolean()),
    windowOpen: v.optional(v.boolean()),
    statusFilter: v.optional(
      v.union(
        v.literal("new"), v.literal("ready"), v.literal("no_mobile"),
        v.literal("sent"), v.literal("interested"), v.literal("not_interested")
      )
    ),
  },
  handler: async (ctx, args) => {
    let conversations = await ctx.db
      .query("conversations")
      .withIndex("by_lastActivity")
      .order("desc")
      .collect();

    if (args.unreadOnly) {
      conversations = conversations.filter((c) => c.unreadCount > 0);
    }

    if (args.windowOpen) {
      const now = Date.now();
      conversations = conversations.filter(
        (c) => c.windowExpiry !== null && c.windowExpiry !== undefined && c.windowExpiry > now
      );
    }

    // Pre-fetch tagged contact IDs if filtering by tag
    let taggedContactIds: Set<string> | null = null;
    if (args.tagId) {
      const contactTags = await ctx.db
        .query("contactTags")
        .withIndex("by_tag", (q) => q.eq("tagId", args.tagId!))
        .collect();
      taggedContactIds = new Set(contactTags.map((ct) => ct.contactId));
    }

    // Only do per-conversation contact lookups when we need statusFilter or tagId filtering
    // Otherwise use denormalized fields
    const needsContactLookup = args.statusFilter || args.tagId;

    // Pre-fetch all contacts for batch lookup (avoids N+1)
    const allContacts = needsContactLookup
      ? await ctx.db.query("contacts").collect()
      : [];
    const contactByPhone = new Map(allContacts.map((c) => [c.phone, c]));

    if (needsContactLookup) {
      const results = conversations.map((conv) => {
          const contact = contactByPhone.get(conv.phone) ?? null;

          if (args.statusFilter && contact?.contactStatus !== args.statusFilter) {
            return null;
          }

          if (taggedContactIds && contact && !taggedContactIds.has(contact._id)) {
            return null;
          }

          if (taggedContactIds && !contact) {
            return null;
          }

          return {
            ...conv,
            lastMessage: conv.lastMessageBody != null
              ? { body: conv.lastMessageBody, direction: conv.lastMessageDirection as "inbound" | "outbound", status: conv.lastMessageStatus ?? "received" }
              : null,
            contactStatus: contact?.contactStatus ?? conv.contactStatus ?? "new",
            contactName: conv.contactName ?? contact?.name ?? null,
          };
        });

      return results.filter((r) => r !== null);
    }

    // Fast path: use denormalized fields, no per-conversation queries
    return conversations.map((conv) => ({
      ...conv,
      lastMessage: conv.lastMessageBody != null
        ? { body: conv.lastMessageBody, direction: conv.lastMessageDirection as "inbound" | "outbound", status: conv.lastMessageStatus ?? "received" }
        : null,
      contactStatus: conv.contactStatus ?? "new",
      contactName: conv.contactName ?? null,
    }));
  },
});

export const getByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();
  },
});

export const getTotalUnread = query({
  args: {},
  handler: async (ctx) => {
    // Only fetch conversations with unread > 0 using index, instead of full table scan
    const unreadConversations = await ctx.db
      .query("conversations")
      .withIndex("by_unread", (q) => q.gt("unreadCount", 0))
      .collect();
    return unreadConversations.reduce((sum, c) => sum + c.unreadCount, 0);
  },
});

export const getOrCreate = mutation({
  args: {
    phone: v.string(),
    businessName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (existing) {
      if (args.businessName && args.businessName !== existing.businessName) {
        await ctx.db.patch(existing._id, { businessName: args.businessName });
      }
      return existing._id;
    }

    return await ctx.db.insert("conversations", {
      phone: args.phone,
      businessName: args.businessName ?? args.phone,
      windowExpiry: null,
      unreadCount: 0,
      lastActivity: Date.now(),
    });
  },
});

export const markRead = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, { unreadCount: 0 });
  },
});

export const markUnread = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, { unreadCount: 1 });
  },
});

export const setUnreadByPhone = mutation({
  args: {
    phone: v.string(),
    unreadCount: v.number(),
  },
  handler: async (ctx, args) => {
    const conv = await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (conv) {
      await ctx.db.patch(conv._id, { unreadCount: args.unreadCount });
    }
  },
});

export const updateContactStatusByPhone = mutation({
  args: {
    phone: v.string(),
    contactStatus: v.union(
      v.literal("new"), v.literal("ready"), v.literal("no_mobile"),
      v.literal("sent"), v.literal("interested"), v.literal("not_interested")
    ),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    // Forward-only guard: silently skip if status would go backwards
    if (contact) {
      const STATUS_RANK: Record<string, number> = {
        new: 0, ready: 1, no_mobile: 1, sent: 2, interested: 3, not_interested: 3,
      };
      const currentRank = STATUS_RANK[contact.contactStatus] ?? -1;
      const nextRank = STATUS_RANK[args.contactStatus] ?? -1;
      if (nextRank <= currentRank) return;

      await ctx.db.patch(contact._id, { contactStatus: args.contactStatus });
    }

    // Keep denormalized contactStatus in sync on conversation
    const conv = await ctx.db
      .query("conversations")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (conv) {
      await ctx.db.patch(conv._id, { contactStatus: args.contactStatus });
    }
  },
});

export const setAutoReplyByPhone = mutation({
  args: {
    phone: v.string(),
    isAutoReply: v.boolean(),
  },
  handler: async (ctx, args) => {
    const recipients = await ctx.db
      .query("campaignRecipients")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .collect();

    if (args.isAutoReply) {
      // Mark all replied recipients as auto-reply
      for (const r of recipients) {
        if (r.repliedAt !== null && r.repliedAt !== undefined) {
          await ctx.db.patch(r._id, { isAutoReply: true });
        }
      }
    } else {
      // Clear auto-reply from all recipients
      for (const r of recipients) {
        await ctx.db.patch(r._id, { isAutoReply: false });
      }
    }
  },
});
