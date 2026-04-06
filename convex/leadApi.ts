import { v } from "convex/values";
import { internalQuery, internalMutation } from "./_generated/server";

// ── Internal API for lead access (not exposed to clients) ──

export const getLeadsForReview = internalQuery({
  args: {},
  handler: async (ctx) => {
    // Get leads explicitly marked as manual_review
    const manualReview = await ctx.db
      .query("adLibraryLeads")
      .withIndex("by_qualificationStatus", (q) =>
        q.eq("qualificationStatus", "manual_review")
      )
      .collect();

    // Get leads with no qualificationStatus set (undefined)
    const allLeads = await ctx.db.query("adLibraryLeads").collect();
    const unqualified = allLeads.filter(
      (l) => l.qualificationStatus === undefined
    );

    const combined = [...manualReview, ...unqualified].slice(0, 50);

    return combined.map((l) => ({
      _id: l._id,
      pageId: l.pageId,
      pageName: l.pageName,
      adCount: l.adCount,
      spendRange: l.spendRange,
      impressionsRange: l.impressionsRange,
      sampleAdBodies: l.sampleAdBodies,
      platforms: l.platforms,
      firstAdStartDate: l.firstAdStartDate,
      searchTerm: l.searchTerm,
      niche: l.niche,
      qualityScore: l.qualityScore,
      qualitySignals: l.qualitySignals,
      qualificationStatus: l.qualificationStatus,
      website: l.website,
    }));
  },
});

export const setLeadQualification = internalMutation({
  args: {
    leadId: v.id("adLibraryLeads"),
    qualificationStatus: v.union(
      v.literal("qualified"),
      v.literal("auto_rejected"),
      v.literal("manual_review")
    ),
    qualityScore: v.number(),
    rejectionReason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = {
      qualificationStatus: args.qualificationStatus,
      qualityScore: args.qualityScore,
    };

    if (args.rejectionReason !== undefined) {
      patch.rejectionReason = args.rejectionReason;
    }

    if (args.qualificationStatus === "qualified") {
      patch.qualifiedAt = Date.now();
    }

    await ctx.db.patch(args.leadId, patch);
  },
});

export const batchSetLeadQualification = internalMutation({
  args: {
    updates: v.array(
      v.object({
        leadId: v.id("adLibraryLeads"),
        qualificationStatus: v.union(
          v.literal("qualified"),
          v.literal("auto_rejected"),
          v.literal("manual_review")
        ),
        qualityScore: v.number(),
        rejectionReason: v.optional(v.string()),
        spendScore: v.number(),
        adCopyScore: v.number(),
        legitimacyScore: v.number(),
        longevityScore: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    let updated = 0;
    for (const u of args.updates) {
      const patch: Record<string, unknown> = {
        qualificationStatus: u.qualificationStatus,
        qualityScore: u.qualityScore,
        qualitySignals: {
          spendScore: u.spendScore,
          adCopyScore: u.adCopyScore,
          legitimacyScore: u.legitimacyScore,
          longevityScore: u.longevityScore,
        },
      };
      if (u.rejectionReason !== undefined) {
        patch.rejectionReason = u.rejectionReason;
      }
      if (u.qualificationStatus === "qualified") {
        patch.qualifiedAt = Date.now();
      }
      await ctx.db.patch(u.leadId, patch);
      updated++;
    }
    return { updated };
  },
});

export const getLeadsByStatus = internalQuery({
  args: {
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const leads = await ctx.db
      .query("adLibraryLeads")
      .withIndex("by_qualificationStatus", (q) =>
        q.eq(
          "qualificationStatus",
          args.status as
            | "pending"
            | "qualified"
            | "auto_rejected"
            | "manual_review"
        )
      )
      .take(100);

    return leads;
  },
});

export const getLeadStats = internalQuery({
  args: {},
  handler: async (ctx) => {
    const allLeads = await ctx.db.query("adLibraryLeads").collect();

    const stats: Record<string, number> = {
      total: 0,
      qualified: 0,
      auto_rejected: 0,
      manual_review: 0,
      pending: 0,
      unqualified: 0,
    };

    for (const lead of allLeads) {
      stats.total++;
      const status = lead.qualificationStatus;
      if (status === "qualified") {
        stats.qualified++;
      } else if (status === "auto_rejected") {
        stats.auto_rejected++;
      } else if (status === "manual_review") {
        stats.manual_review++;
      } else if (status === "pending") {
        stats.pending++;
      } else {
        stats.unqualified++;
      }
    }

    return stats;
  },
});
