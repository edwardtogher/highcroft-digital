"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

// ── Red flag keywords (any match → adCopyScore = 0) ──
const RED_FLAGS = [
  "course",
  "training",
  "passive income",
  "investment opportunity",
  "mentorship",
  "coaching",
  "masterclass",
  "webinar",
  "free guide",
  "wealth",
  "financial freedom",
  "work from home",
  "property investment course",
  "rent to rent",
  "deal sourcing",
];

// ── Green flag keywords (each match adds points, capped at 25) ──
const GREEN_FLAGS = [
  "valuation",
  "for sale",
  "to let",
  "sstc",
  "new instruction",
  "book a viewing",
  "market appraisal",
  "property for sale",
  "houses for sale",
  "letting",
  "sold",
  "under offer",
  "exchange",
  "completion",
];

// ── Known portals / non-agents ──
const PORTAL_NAMES = [
  "rightmove",
  "zoopla",
  "onthemarket",
  "purplebricks",
  "openrent",
  "spareroom",
  "movewise",
  "strike",
  "yopa",
];

// ── Location + estate keywords for legitimacy ──
const ESTATE_KEYWORDS = ["estate", "lettings", "property", "letting", "homes"];

// ── Layer 1: Rule-based scoring ──

function computeSpendScore(spendRange: string | undefined): number {
  if (!spendRange) return 0;
  const parts = spendRange.split("-");
  const lower = parseInt(parts[0], 10);
  if (isNaN(lower)) return 0;
  if (lower >= 2000) return 25;
  if (lower >= 500) return 18;
  if (lower >= 100) return 10;
  return 0;
}

function computeAdCopyScore(sampleAdBodies: string[]): number {
  if (sampleAdBodies.length === 0) return 0;
  const combined = sampleAdBodies.join(" ").toLowerCase();

  for (const flag of RED_FLAGS) {
    if (combined.includes(flag)) return 0;
  }

  let points = 0;
  for (const flag of GREEN_FLAGS) {
    if (combined.includes(flag)) points += 5;
  }
  return Math.min(points, 25);
}

function computeLegitimacyScore(pageName: string): { score: number; isPortal: boolean } {
  const lower = pageName.toLowerCase();

  for (const portal of PORTAL_NAMES) {
    if (lower.includes(portal)) {
      return { score: 0, isPortal: true };
    }
  }

  const words = lower.split(/\s+/);
  const hasEstateKeyword = ESTATE_KEYWORDS.some((kw) => lower.includes(kw));
  if (words.length >= 2 && hasEstateKeyword) {
    return { score: 15, isPortal: false };
  }

  if (words.length < 2 || lower.includes("uk property") || lower.includes("best homes")) {
    return { score: 5, isPortal: false };
  }

  return { score: 12, isPortal: false };
}

function computeLongevityScore(firstAdStartDate: string | undefined): number {
  if (!firstAdStartDate) return 8;

  const start = new Date(firstAdStartDate);
  if (isNaN(start.getTime())) return 8;

  const now = new Date();
  const daysDiff = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  if (daysDiff >= 90) return 25;
  if (daysDiff >= 30) return 18;
  if (daysDiff >= 7) return 10;
  return 3;
}

interface QualitySignals {
  spendScore: number;
  adCopyScore: number;
  legitimacyScore: number;
  longevityScore: number;
}

function runRuleBasedScoring(lead: {
  spendRange?: string;
  sampleAdBodies: string[];
  pageName: string;
  firstAdStartDate?: string;
}): { score: number; signals: QualitySignals; isPortal: boolean } {
  const spendScore = computeSpendScore(lead.spendRange);
  const adCopyScore = computeAdCopyScore(lead.sampleAdBodies);
  const { score: legitimacyScore, isPortal } = computeLegitimacyScore(lead.pageName);
  const longevityScore = computeLongevityScore(lead.firstAdStartDate);

  return {
    score: spendScore + adCopyScore + legitimacyScore + longevityScore,
    signals: { spendScore, adCopyScore, legitimacyScore, longevityScore },
    isPortal,
  };
}

// ── Main qualification action ──

export const qualifyLead = internalAction({
  args: { leadId: v.id("adLibraryLeads") },
  handler: async (ctx, args) => {
    const lead = await ctx.runQuery(internal.adLibraryLeads.getById, { leadId: args.leadId });
    if (!lead) throw new Error("Lead not found");

    // Layer 1: Rule-based scoring
    const { score: ruleScore, signals, isPortal } = runRuleBasedScoring({
      spendRange: lead.spendRange ?? undefined,
      sampleAdBodies: lead.sampleAdBodies,
      pageName: lead.pageName,
      firstAdStartDate: lead.firstAdStartDate ?? undefined,
    });

    // Auto-reject portals immediately
    if (isPortal) {
      await ctx.runMutation(internal.leadQualificationHelpers.updateQualification, {
        leadId: args.leadId,
        qualityScore: ruleScore,
        qualitySignals: signals,
        qualificationStatus: "auto_rejected",
        rejectionReason: "Known property portal or non-agent platform",
        qualifiedAt: Date.now(),
      });
      return { status: "auto_rejected", score: ruleScore };
    }

    // Clear pass: score >= 65
    if (ruleScore >= 65) {
      await ctx.runMutation(internal.leadQualificationHelpers.updateQualification, {
        leadId: args.leadId,
        qualityScore: ruleScore,
        qualitySignals: signals,
        qualificationStatus: "qualified",
        qualifiedAt: Date.now(),
      });
      return { status: "qualified", score: ruleScore };
    }

    // Clear reject: score <= 25
    if (ruleScore <= 25) {
      const reasons: string[] = [];
      if (signals.spendScore === 0) reasons.push("low/no ad spend");
      if (signals.adCopyScore === 0) reasons.push("red flag ad copy or no green flags");
      if (signals.legitimacyScore <= 5) reasons.push("generic or unrecognised page name");
      if (signals.longevityScore <= 3) reasons.push("very new advertiser");

      await ctx.runMutation(internal.leadQualificationHelpers.updateQualification, {
        leadId: args.leadId,
        qualityScore: ruleScore,
        qualitySignals: signals,
        qualificationStatus: "auto_rejected",
        rejectionReason: reasons.join("; "),
        qualifiedAt: Date.now(),
      });
      return { status: "auto_rejected", score: ruleScore };
    }

    // Borderline (26-64): flag for manual review
    await ctx.runMutation(internal.leadQualificationHelpers.updateQualification, {
      leadId: args.leadId,
      qualityScore: ruleScore,
      qualitySignals: signals,
      qualificationStatus: "manual_review",
      qualifiedAt: Date.now(),
    });
    return { status: "manual_review", score: ruleScore };
  },
});

// ── Batch qualify all unqualified leads (efficient: no sub-actions) ──

export const batchQualifyNewLeads = internalAction({
  args: {},
  handler: async (ctx) => {
    const pendingLeads: Array<{
      _id: any;
      pageName: string;
      spendRange?: string | null;
      sampleAdBodies: string[];
      firstAdStartDate?: string | null;
    }> = await ctx.runQuery(
      internal.leadQualificationHelpers.getUnqualifiedLeadsWithData,
      {}
    );

    const BATCH_SIZE = 100;
    let qualified = 0;
    let autoRejected = 0;
    let manualReview = 0;

    // Score all leads in-memory
    const updates: Array<{
      leadId: any;
      qualityScore: number;
      qualitySignals: QualitySignals;
      qualificationStatus: "qualified" | "auto_rejected" | "manual_review";
      rejectionReason?: string;
    }> = [];

    for (const lead of pendingLeads) {
      const { score, signals, isPortal } = runRuleBasedScoring({
        spendRange: lead.spendRange ?? undefined,
        sampleAdBodies: lead.sampleAdBodies ?? [],
        pageName: lead.pageName,
        firstAdStartDate: lead.firstAdStartDate ?? undefined,
      });

      let status: "qualified" | "auto_rejected" | "manual_review";
      let rejectionReason: string | undefined;

      if (isPortal) {
        status = "auto_rejected";
        rejectionReason = "Known property portal or non-agent platform";
        autoRejected++;
      } else if (score >= 65) {
        status = "qualified";
        qualified++;
      } else if (score <= 25) {
        status = "auto_rejected";
        const reasons: string[] = [];
        if (signals.spendScore === 0) reasons.push("low/no ad spend");
        if (signals.adCopyScore === 0) reasons.push("red flag ad copy or no green flags");
        if (signals.legitimacyScore <= 5) reasons.push("generic or unrecognised page name");
        if (signals.longevityScore <= 3) reasons.push("very new advertiser");
        rejectionReason = reasons.join("; ");
        autoRejected++;
      } else {
        status = "manual_review";
        manualReview++;
      }

      updates.push({
        leadId: lead._id,
        qualityScore: score,
        qualitySignals: signals,
        qualificationStatus: status,
        rejectionReason,
      });
    }

    // Write in batches of BATCH_SIZE
    for (let i = 0; i < updates.length; i += BATCH_SIZE) {
      const batch = updates.slice(i, i + BATCH_SIZE);
      await ctx.runMutation(
        internal.leadQualificationHelpers.batchUpdateQualifications,
        { updates: batch }
      );
    }

    return {
      total: pendingLeads.length,
      qualified,
      autoRejected,
      manualReview,
    };
  },
});

// ── Manual trigger (auth required) ──

export const runQualification = action({
  args: {},
  handler: async (ctx) => {
    await ctx.scheduler.runAfter(0, internal.leadQualification.batchQualifyNewLeads, {});
    return { scheduled: true };
  },
});
