import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Internal queries/mutations for the sequence processor
// These live in a separate file because "use node" files can only export actions

export const getEnrollmentDetails = internalQuery({
  args: { enrollmentId: v.id("sequenceEnrollments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.enrollmentId);
  },
});

export const getStepForEnrollment = internalQuery({
  args: {
    sequenceId: v.id("sequences"),
    stepNumber: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("sequenceSteps")
      .withIndex("by_sequence_step", q =>
        q.eq("sequenceId", args.sequenceId).eq("stepNumber", args.stepNumber)
      )
      .first();
  },
});

export const completeEnrollment = internalMutation({
  args: { enrollmentId: v.id("sequenceEnrollments") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.enrollmentId, {
      status: "completed",
      completedAt: Date.now(),
      nextStepAt: undefined,
    });
  },
});

export const advanceStep = internalMutation({
  args: {
    enrollmentId: v.id("sequenceEnrollments"),
    nextStepNumber: v.number(),
    sequenceId: v.id("sequences"),
  },
  handler: async (ctx, args) => {
    // Get the next step to calculate delay
    const nextStep = await ctx.db.query("sequenceSteps")
      .withIndex("by_sequence_step", q =>
        q.eq("sequenceId", args.sequenceId).eq("stepNumber", args.nextStepNumber)
      )
      .first();

    const now = Date.now();

    if (!nextStep) {
      // No more steps
      await ctx.db.patch(args.enrollmentId, {
        currentStep: args.nextStepNumber - 1,
        lastStepAt: now,
        status: "completed",
        completedAt: now,
        nextStepAt: undefined,
      });
    } else {
      await ctx.db.patch(args.enrollmentId, {
        currentStep: args.nextStepNumber - 1,
        lastStepAt: now,
        nextStepAt: now + nextStep.delayDays * 24 * 60 * 60 * 1000,
      });
    }
  },
});
