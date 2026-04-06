import { query, mutation, action, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";

// ── Sequence CRUD ──────────────────────────────────────────────────────────

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sequences").collect();
  },
});

export const getById = query({
  args: { id: v.id("sequences") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    initialTemplate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("sequences", {
      name: args.name,
      description: args.description,
      isActive: false,
      initialTemplate: args.initialTemplate,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("sequences"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    initialTemplate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, { ...filtered, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("sequences") },
  handler: async (ctx, args) => {
    // Delete all steps
    const steps = await ctx.db.query("sequenceSteps")
      .withIndex("by_sequence", (q) => q.eq("sequenceId", args.id))
      .collect();
    for (const s of steps) await ctx.db.delete(s._id);
    // Delete all enrollments
    const enrollments = await ctx.db.query("sequenceEnrollments")
      .withIndex("by_sequence", (q) => q.eq("sequenceId", args.id))
      .collect();
    for (const e of enrollments) await ctx.db.delete(e._id);
    // Delete sequence
    await ctx.db.delete(args.id);
  },
});

// ── Steps CRUD ─────────────────────────────────────────────────────────────

export const getSteps = query({
  args: { sequenceId: v.id("sequences") },
  handler: async (ctx, args) => {
    return await ctx.db.query("sequenceSteps")
      .withIndex("by_sequence", (q) => q.eq("sequenceId", args.sequenceId))
      .collect()
      .then((steps) => steps.sort((a, b) => a.stepNumber - b.stepNumber));
  },
});

export const addStep = mutation({
  args: {
    sequenceId: v.id("sequences"),
    stepNumber: v.number(),
    delayDays: v.number(),
    messageBody: v.string(),
    requireStatus: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sequenceSteps", {
      sequenceId: args.sequenceId,
      stepNumber: args.stepNumber,
      delayDays: args.delayDays,
      messageBody: args.messageBody,
      requireStatus: args.requireStatus,
      isActive: true,
    });
  },
});

export const updateStep = mutation({
  args: {
    id: v.id("sequenceSteps"),
    delayDays: v.optional(v.number()),
    messageBody: v.optional(v.string()),
    requireStatus: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filtered);
  },
});

export const removeStep = mutation({
  args: { id: v.id("sequenceSteps") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ── Enrollment ─────────────────────────────────────────────────────────────

export const enroll = mutation({
  args: {
    sequenceId: v.id("sequences"),
    contactId: v.id("contacts"),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.contactId);
    if (!contact) throw new Error("Contact not found");

    // Check not already enrolled in this sequence
    const existing = await ctx.db.query("sequenceEnrollments")
      .withIndex("by_contact", (q) => q.eq("contactId", args.contactId))
      .collect();
    const alreadyEnrolled = existing.find(
      (e) => e.sequenceId === args.sequenceId && e.status === "active"
    );
    if (alreadyEnrolled) return alreadyEnrolled._id;

    // Get first step to calculate nextStepAt
    const steps = await ctx.db.query("sequenceSteps")
      .withIndex("by_sequence_step", (q) => q.eq("sequenceId", args.sequenceId))
      .collect();
    const firstStep = steps.sort((a, b) => a.stepNumber - b.stepNumber)[0];

    const now = Date.now();
    const nextStepAt = firstStep
      ? now + firstStep.delayDays * 24 * 60 * 60 * 1000
      : undefined;

    return await ctx.db.insert("sequenceEnrollments", {
      sequenceId: args.sequenceId,
      contactId: args.contactId,
      phone: contact.phone,
      currentStep: 0,
      status: "active",
      enrolledAt: now,
      lastStepAt: now,
      nextStepAt,
    });
  },
});

export const unenroll = mutation({
  args: { id: v.id("sequenceEnrollments") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "paused" });
  },
});

// Mark as replied -- called when an inbound message is received for an enrolled contact
export const markReplied = mutation({
  args: { contactId: v.id("contacts") },
  handler: async (ctx, args) => {
    const enrollments = await ctx.db.query("sequenceEnrollments")
      .withIndex("by_contact", (q) => q.eq("contactId", args.contactId))
      .collect();
    for (const e of enrollments) {
      if (e.status === "active") {
        await ctx.db.patch(e._id, {
          status: "replied",
          completedAt: Date.now(),
        });
      }
    }
  },
});

// ── Enrollment queries ─────────────────────────────────────────────────────

export const getEnrollments = query({
  args: { sequenceId: v.id("sequences") },
  handler: async (ctx, args) => {
    const enrollments = await ctx.db.query("sequenceEnrollments")
      .withIndex("by_sequence", (q) => q.eq("sequenceId", args.sequenceId))
      .collect();
    // Fetch contact info for each
    const results = await Promise.all(
      enrollments.map(async (e) => {
        const contact = await ctx.db.get(e.contactId);
        return { ...e, contact };
      })
    );
    return results;
  },
});

export const getDueFollowUps = internalQuery({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    // Find enrollments where nextStepAt <= now and status is active
    const due = await ctx.db.query("sequenceEnrollments")
      .withIndex("by_next_step", (q) => q.eq("status", "active"))
      .collect();
    return due.filter((e) => e.nextStepAt && e.nextStepAt <= now);
  },
});

// ── Stats ──────────────────────────────────────────────────────────────────

export const getStats = query({
  args: { sequenceId: v.id("sequences") },
  handler: async (ctx, args) => {
    const enrollments = await ctx.db.query("sequenceEnrollments")
      .withIndex("by_sequence", (q) => q.eq("sequenceId", args.sequenceId))
      .collect();
    return {
      total: enrollments.length,
      active: enrollments.filter((e) => e.status === "active").length,
      replied: enrollments.filter((e) => e.status === "replied").length,
      completed: enrollments.filter((e) => e.status === "completed").length,
      paused: enrollments.filter((e) => e.status === "paused").length,
      optedOut: enrollments.filter((e) => e.status === "opted_out").length,
    };
  },
});
