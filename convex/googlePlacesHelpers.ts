import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const upsertContact = internalMutation({
  args: {
    phone: v.string(),
    name: v.string(),
    website: v.union(v.string(), v.null()),
    niche: v.string(),
    town: v.string(),
    notes: v.string(),
    contactStatus: v.union(
      v.literal("new"), v.literal("ready"), v.literal("no_mobile"),
      v.literal("sent"), v.literal("interested"), v.literal("not_interested")
    ),
    reviewCount: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (existing) {
      return { isNew: false, id: existing._id };
    }

    const id = await ctx.db.insert("contacts", {
      phone: args.phone,
      name: args.name,
      company: "",
      email: "",
      notes: args.notes,
      optInStatus: "pending",
      source: "scraper",
      contactStatus: args.contactStatus,
      templatesSent: 0,
      website: args.website,
      niche: args.niche,
      town: args.town,
    });

    return { isNew: true, id };
  },
});

export const getNewContacts = internalQuery({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("contacts").collect();
    return all
      .filter(
        (c) =>
          c.contactStatus === "new" &&
          c.source === "scraper" &&
          !c.notes?.includes("enriched:true")
      )
      .slice(0, 50)
      .map((c) => ({
        _id: c._id,
        phone: c.phone,
        name: c.name,
        website: c.website ?? null,
        notes: c.notes,
      }));
  },
});

export const updateContactEnrichment = internalMutation({
  args: {
    contactId: v.id("contacts"),
    notes: v.string(),
    tier: v.number(),
    contactStatus: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.contactId, {
      notes: args.notes,
      tier: args.tier,
      contactStatus: args.contactStatus as any,
    });
  },
});
