import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contactLists").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("contactLists") },
  handler: async (ctx, args) => {
    const list = await ctx.db.get(args.id);
    if (!list) return null;

    const memberships = await ctx.db
      .query("contactListMembers")
      .withIndex("by_list", (q) => q.eq("listId", args.id))
      .collect();

    const members = await Promise.all(
      memberships.map(async (m) => {
        const contact = await ctx.db.get(m.contactId);
        if (!contact) return null;
        return {
          membershipId: m._id,
          contactId: contact._id,
          phone: contact.phone,
          name: contact.name,
          company: contact.company,
        };
      })
    );

    return {
      ...list,
      members: members.filter((m) => m !== null),
    };
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactLists", {
      name: args.name,
      description: args.description,
      memberCount: 0,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("contactLists"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, string> = {};
    if (fields.name !== undefined) updates.name = fields.name;
    if (fields.description !== undefined) updates.description = fields.description;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("contactLists") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("contactListMembers")
      .withIndex("by_list", (q) => q.eq("listId", args.id))
      .collect();

    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const addMembers = mutation({
  args: {
    listId: v.id("contactLists"),
    contactIds: v.array(v.id("contacts")),
  },
  handler: async (ctx, args) => {
    let added = 0;

    for (const contactId of args.contactIds) {
      const existing = await ctx.db
        .query("contactListMembers")
        .withIndex("by_list_and_contact", (q) =>
          q.eq("listId", args.listId).eq("contactId", contactId)
        )
        .first();

      if (!existing) {
        await ctx.db.insert("contactListMembers", {
          listId: args.listId,
          contactId,
        });
        added++;
      }
    }

    if (added > 0) {
      const list = await ctx.db.get(args.listId);
      if (list) {
        await ctx.db.patch(args.listId, {
          memberCount: list.memberCount + added,
        });
      }
    }

    return { added };
  },
});

export const removeMembers = mutation({
  args: {
    listId: v.id("contactLists"),
    contactIds: v.array(v.id("contacts")),
  },
  handler: async (ctx, args) => {
    let removed = 0;

    for (const contactId of args.contactIds) {
      const membership = await ctx.db
        .query("contactListMembers")
        .withIndex("by_list_and_contact", (q) =>
          q.eq("listId", args.listId).eq("contactId", contactId)
        )
        .first();

      if (membership) {
        await ctx.db.delete(membership._id);
        removed++;
      }
    }

    if (removed > 0) {
      const list = await ctx.db.get(args.listId);
      if (list) {
        await ctx.db.patch(args.listId, {
          memberCount: Math.max(0, list.memberCount - removed),
        });
      }
    }

    return { removed };
  },
});
