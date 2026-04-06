import { query, mutation, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    niche: v.optional(v.string()),
    status: v.optional(v.string()),
    qualificationStatus: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q;

    if (args.qualificationStatus) {
      q = ctx.db
        .query("adLibraryLeads")
        .withIndex("by_qualificationStatus", (q) =>
          q.eq(
            "qualificationStatus",
            args.qualificationStatus as
              | "pending"
              | "qualified"
              | "auto_rejected"
              | "manual_review"
          )
        );
    } else if (args.status) {
      q = ctx.db
        .query("adLibraryLeads")
        .withIndex("by_status", (q) =>
          q.eq(
            "status",
            args.status as
              | "new"
              | "reviewed"
              | "qualified"
              | "rejected"
              | "contacted"
          )
        );
    } else {
      q = ctx.db.query("adLibraryLeads").withIndex("by_scrapedAt");
    }

    const leads = await q.order("desc").collect();

    // Client-side niche filter (can't stack index filters in Convex)
    if (args.niche) {
      return leads.filter((l) => l.niche === args.niche);
    }

    return leads;
  },
});

export const getByPageId = query({
  args: { pageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("adLibraryLeads")
      .withIndex("by_pageId", (q) => q.eq("pageId", args.pageId))
      .first();
  },
});

export const upsertFromScrape = internalMutation({
  args: {
    pageId: v.string(),
    pageName: v.string(),
    adCount: v.number(),
    spendRange: v.optional(v.string()),
    impressionsRange: v.optional(v.string()),
    platforms: v.array(v.string()),
    sampleAdBodies: v.array(v.string()),
    adSnapshotUrls: v.array(v.string()),
    firstAdStartDate: v.optional(v.string()),
    searchTerm: v.string(),
    niche: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("adLibraryLeads")
      .withIndex("by_pageId", (q) => q.eq("pageId", args.pageId))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        pageName: args.pageName,
        adCount: args.adCount,
        spendRange: args.spendRange,
        impressionsRange: args.impressionsRange,
        platforms: args.platforms,
        sampleAdBodies: args.sampleAdBodies,
        adSnapshotUrls: args.adSnapshotUrls,
        firstAdStartDate: args.firstAdStartDate,
        lastSeenAt: now,
      });
      return { isNew: false, id: existing._id };
    }

    const id = await ctx.db.insert("adLibraryLeads", {
      pageId: args.pageId,
      pageName: args.pageName,
      adCount: args.adCount,
      spendRange: args.spendRange,
      impressionsRange: args.impressionsRange,
      platforms: args.platforms,
      sampleAdBodies: args.sampleAdBodies,
      adSnapshotUrls: args.adSnapshotUrls,
      firstAdStartDate: args.firstAdStartDate,
      searchTerm: args.searchTerm,
      niche: args.niche,
      status: "new",
      qualificationStatus: "pending",
      scrapedAt: now,
      lastSeenAt: now,
    });

    return { isNew: true, id };
  },
});

export const updateStatus = mutation({
  args: {
    leadId: v.id("adLibraryLeads"),
    status: v.union(
      v.literal("new"),
      v.literal("reviewed"),
      v.literal("qualified"),
      v.literal("rejected"),
      v.literal("contacted")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, { status: args.status });
  },
});

export const updateNotes = mutation({
  args: {
    leadId: v.id("adLibraryLeads"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, { notes: args.notes });
  },
});

export const getById = internalQuery({
  args: { leadId: v.id("adLibraryLeads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.leadId);
  },
});

export const updateEnrichment = internalMutation({
  args: {
    leadId: v.id("adLibraryLeads"),
    website: v.optional(v.union(v.string(), v.null())),
    phone: v.optional(v.union(v.string(), v.null())),
    phoneSource: v.optional(v.union(v.literal("facebook"), v.literal("website_scrape"), v.null())),
    contactPerson: v.optional(v.union(v.string(), v.null())),
    contactPersonTitle: v.optional(v.union(v.string(), v.null())),
    location: v.optional(v.union(v.string(), v.null())),
    enrichmentStatus: v.optional(v.union(
      v.literal("pending"),
      v.literal("enriched"),
      v.literal("no_phone_found"),
      v.literal("failed")
    )),
    enrichmentError: v.optional(v.union(v.string(), v.null())),
    enrichedAt: v.optional(v.union(v.number(), v.null())),
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

export const promoteToContact = mutation({
  args: {
    leadId: v.id("adLibraryLeads"),
  },
  handler: async (ctx, args) => {
    const lead = await ctx.db.get(args.leadId);
    if (!lead) throw new Error("Lead not found");

    // Create a contact from the lead using enriched data
    const contactId = await ctx.db.insert("contacts", {
      phone: lead.phone ?? "",
      name: lead.pageName,
      company: lead.pageName,
      email: "",
      notes: `Promoted from Ad Library lead. ${lead.adCount} active ads. Page ID: ${lead.pageId}`,
      optInStatus: "pending" as const,
      source: "scraper" as const,
      contactStatus: "new" as const,
      templatesSent: 0,
      website: lead.website ?? `https://facebook.com/${lead.pageId}`,
      contactPerson: lead.contactPerson ?? null,
      contactPersonTitle: lead.contactPersonTitle ?? null,
    });

    await ctx.db.patch(args.leadId, { status: "contacted" });

    return contactId;
  },
});
