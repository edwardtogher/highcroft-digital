import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get the next pending task (ordered by priority, then creation time)
export const getNext = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("scoutQueue")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();

    if (tasks.length === 0) return null;

    // Sort by priority (lower = higher priority), then by createdAt
    tasks.sort((a, b) => {
      const pa = a.priority ?? 999;
      const pb = b.priority ?? 999;
      if (pa !== pb) return pa - pb;
      return a.createdAt - b.createdAt;
    });

    return tasks[0];
  },
});

// Mark a task as in_progress
export const markInProgress = mutation({
  args: {
    taskId: v.id("scoutQueue"),
    batchName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      status: "in_progress",
      batchName: args.batchName ?? null,
    });
  },
});

// Mark a task as done with results
export const markDone = mutation({
  args: {
    taskId: v.id("scoutQueue"),
    leadsFound: v.optional(v.number()),
    leadsWithMobile: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      status: "done",
      leadsFound: args.leadsFound ?? null,
      leadsWithMobile: args.leadsWithMobile ?? null,
      scrapedAt: Date.now(),
    });
  },
});

// Create a new queue task
export const create = mutation({
  args: {
    searchTerm: v.string(),
    area: v.string(),
    priority: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("scoutQueue", {
      searchTerm: args.searchTerm,
      area: args.area,
      status: "pending",
      priority: args.priority ?? 10,
      notes: args.notes ?? null,
      createdAt: Date.now(),
    });
  },
});

// Count contacts by status (used by scout-queue-next to check buffer)
export const countByStatus = query({
  args: { contactStatus: v.string() },
  handler: async (ctx, args) => {
    const contacts = await ctx.db
      .query("contacts")
      .withIndex("by_contactStatus", (q) => q.eq("contactStatus", args.contactStatus as any))
      .collect();
    return contacts.length;
  },
});
