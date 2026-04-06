import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tags")
      .withIndex("by_name")
      .collect();
  },
});

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("tags")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existing) {
      throw new Error(`Tag "${args.name}" already exists`);
    }

    return await ctx.db.insert("tags", { name: args.name });
  },
});

export const update = mutation({
  args: {
    id: v.id("tags"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("tags")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existing && existing._id !== args.id) {
      throw new Error(`Tag "${args.name}" already exists`);
    }

    await ctx.db.patch(args.id, { name: args.name });
  },
});

export const remove = mutation({
  args: { id: v.id("tags") },
  handler: async (ctx, args) => {
    const contactTags = await ctx.db
      .query("contactTags")
      .withIndex("by_tag", (q) => q.eq("tagId", args.id))
      .collect();

    for (const ct of contactTags) {
      await ctx.db.delete(ct._id);
    }

    await ctx.db.delete(args.id);
  },
});

