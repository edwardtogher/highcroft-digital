"use node";

import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Called by cron -- find and process due follow-ups
export const processSequences = internalAction({
  args: {},
  handler: async (ctx) => {
    // Get due enrollments
    const due = await ctx.runQuery(internal.sequences.getDueFollowUps);
    if (due.length === 0) return;

    for (const enrollment of due) {
      try {
        await ctx.runAction(internal.sequenceProcessor.sendFollowUp, {
          enrollmentId: enrollment._id,
        });
      } catch (err) {
        console.error(`Sequence processor error for enrollment ${enrollment._id}:`, err);
      }
    }
  },
});

export const sendFollowUp = internalAction({
  args: { enrollmentId: v.id("sequenceEnrollments") },
  handler: async (ctx, args) => {
    // Get enrollment details
    const enrollment = await ctx.runQuery(internal.sequenceProcessorHelpers.getEnrollmentDetails, {
      enrollmentId: args.enrollmentId,
    });
    if (!enrollment || enrollment.status !== "active") return;

    // Get the step to send
    const step = await ctx.runQuery(internal.sequenceProcessorHelpers.getStepForEnrollment, {
      sequenceId: enrollment.sequenceId,
      stepNumber: enrollment.currentStep + 1,
    });

    if (!step) {
      // No more steps -- mark as completed
      await ctx.runMutation(internal.sequenceProcessorHelpers.completeEnrollment, {
        enrollmentId: args.enrollmentId,
      });
      return;
    }

    if (!step.isActive) {
      // Step is disabled -- skip to next
      await ctx.runMutation(internal.sequenceProcessorHelpers.advanceStep, {
        enrollmentId: args.enrollmentId,
        nextStepNumber: enrollment.currentStep + 2,
        sequenceId: enrollment.sequenceId,
      });
      return;
    }

    // Send the message via Orbit
    const orbitUrl = "https://orbit.speaktoeva.com";
    const secret = "scout-orbit-sync-2026";

    const res = await fetch(`${orbitUrl}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-orbit-secret": secret,
      },
      body: JSON.stringify({
        phone: enrollment.phone,
        message: step.messageBody,
      }),
    });

    if (!res.ok) {
      console.error(`Failed to send follow-up to ${enrollment.phone}: ${await res.text()}`);
      return;
    }

    // Advance to next step
    await ctx.runMutation(internal.sequenceProcessorHelpers.advanceStep, {
      enrollmentId: args.enrollmentId,
      nextStepNumber: enrollment.currentStep + 2,
      sequenceId: enrollment.sequenceId,
    });
  },
});
