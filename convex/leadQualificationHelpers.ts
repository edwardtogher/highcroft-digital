import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";

// ── Internal mutation to update qualification fields ──

export const updateQualification = internalMutation({
  args: {
    leadId: v.id("adLibraryLeads"),
    qualityScore: v.number(),
    qualitySignals: v.object({
      spendScore: v.number(),
      adCopyScore: v.number(),
      legitimacyScore: v.number(),
      longevityScore: v.number(),
    }),
    qualificationStatus: v.union(
      v.literal("pending"),
      v.literal("qualified"),
      v.literal("auto_rejected"),
      v.literal("manual_review")
    ),
    rejectionReason: v.optional(v.string()),
    qualifiedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { leadId, ...fields } = args;
    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }
    await ctx.db.patch(leadId, patch);
  },
});

// ── Internal query to find unqualified leads ──

export const getUnqualifiedLeads = internalQuery({
  args: {},
  handler: async (ctx) => {
    const allLeads = await ctx.db.query("adLibraryLeads").collect();
    return allLeads
      .filter(
        (l) =>
          l.qualificationStatus === undefined || l.qualificationStatus === "pending"
      )
      .map((l) => ({ _id: l._id }));
  },
});

// ── Internal query: unqualified leads with scoring data ──

export const getUnqualifiedLeadsWithData = internalQuery({
  args: {},
  handler: async (ctx) => {
    const allLeads = await ctx.db.query("adLibraryLeads").collect();
    return allLeads
      .filter(
        (l) =>
          l.qualificationStatus === undefined || l.qualificationStatus === "pending"
      )
      .map((l) => ({
        _id: l._id,
        pageName: l.pageName,
        spendRange: l.spendRange,
        sampleAdBodies: l.sampleAdBodies,
        firstAdStartDate: l.firstAdStartDate,
      }));
  },
});

// ── Internal mutation: batch update qualifications ──

export const batchUpdateQualifications = internalMutation({
  args: {
    updates: v.array(
      v.object({
        leadId: v.id("adLibraryLeads"),
        qualityScore: v.number(),
        qualitySignals: v.object({
          spendScore: v.number(),
          adCopyScore: v.number(),
          legitimacyScore: v.number(),
          longevityScore: v.number(),
        }),
        qualificationStatus: v.union(
          v.literal("pending"),
          v.literal("qualified"),
          v.literal("auto_rejected"),
          v.literal("manual_review")
        ),
        rejectionReason: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const u of args.updates) {
      const patch: Record<string, unknown> = {
        qualificationStatus: u.qualificationStatus,
        qualityScore: u.qualityScore,
        qualitySignals: u.qualitySignals,
        qualifiedAt: Date.now(),
      };
      if (u.rejectionReason !== undefined) {
        patch.rejectionReason = u.rejectionReason;
      }
      await ctx.db.patch(u.leadId, patch);
    }
  },
});

// ── Stats query ──

export const getQualificationStats = query({
  args: {},
  handler: async (ctx) => {
    const allLeads = await ctx.db.query("adLibraryLeads").collect();

    let total = 0;
    let qualified = 0;
    let autoRejected = 0;
    let manualReview = 0;
    let pending = 0;

    for (const lead of allLeads) {
      total++;
      switch (lead.qualificationStatus) {
        case "qualified":
          qualified++;
          break;
        case "auto_rejected":
          autoRejected++;
          break;
        case "manual_review":
          manualReview++;
          break;
        default:
          pending++;
          break;
      }
    }

    return { total, qualified, autoRejected, manualReview, pending };
  },
});
