import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// --- Pipeline status helpers ---

const STATUS_RANK: Record<string, number> = {
  new: 0, ready: 1, no_mobile: 1, sent: 2, interested: 3, not_interested: 3,
};

function canAdvanceStatus(current: string, next: string): boolean {
  const currentRank = STATUS_RANK[current] ?? -1;
  const nextRank = STATUS_RANK[next] ?? -1;
  return nextRank > currentRank;
}

const STATUS_COMPAT: Record<string, string> = {
  talking: "interested",
  positive: "interested",
  negative: "not_interested",
  auto_reply: "sent",
  dead: "not_interested",
  no_website: "not_interested",
};

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

export const withTags = query({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").order("desc").collect();

    // Batch: fetch ALL tags once
    const allTags = await ctx.db.query("tags").collect();
    const tagMap = new Map(allTags.map((t) => [t._id, t]));

    // Batch: fetch ALL contactTag mappings once
    const allContactTags = await ctx.db.query("contactTags").collect();

    // Group contactTags by contactId
    const contactTagMap = new Map<string, Array<{ _id: string; name: string }>>();
    for (const ct of allContactTags) {
      const tag = tagMap.get(ct.tagId);
      if (tag) {
        const existing = contactTagMap.get(ct.contactId) ?? [];
        existing.push({ _id: tag._id, name: tag.name });
        contactTagMap.set(ct.contactId, existing);
      }
    }

    return contacts.map((contact) => ({
      ...contact,
      tags: contactTagMap.get(contact._id) ?? [],
    }));
  },
});

export const withLists = query({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").order("desc").collect();

    // Batch: fetch ALL contactLists once
    const allLists = await ctx.db.query("contactLists").collect();
    const listMap = new Map(allLists.map((l) => [l._id, l]));

    // Batch: fetch ALL contactListMembers once
    const allMemberships = await ctx.db.query("contactListMembers").collect();

    // Group memberships by contactId
    const contactListMap = new Map<string, Array<{ _id: string; name: string }>>();
    for (const m of allMemberships) {
      const list = listMap.get(m.listId);
      if (list) {
        const existing = contactListMap.get(m.contactId) ?? [];
        existing.push({ _id: list._id, name: list.name });
        contactListMap.set(m.contactId, existing);
      }
    }

    return contacts.map((contact) => ({
      ...contact,
      lists: contactListMap.get(contact._id) ?? [],
    }));
  },
});

export const create = mutation({
  args: {
    phone: v.string(),
    name: v.string(),
    company: v.optional(v.string()),
    email: v.optional(v.string()),
    notes: v.optional(v.string()),
    optInStatus: v.optional(
      v.union(v.literal("opted_in"), v.literal("opted_out"), v.literal("pending"))
    ),
    source: v.optional(
      v.union(v.literal("manual"), v.literal("csv_import"), v.literal("webhook"), v.literal("scraper"))
    ),
    website: v.optional(v.string()),
    contactPerson: v.optional(v.string()),
    contactPersonTitle: v.optional(v.string()),
    // Migration fields — optional overrides for imported data
    contactStatus: v.optional(
      v.union(
        v.literal("new"), v.literal("ready"), v.literal("no_mobile"),
        v.literal("sent"), v.literal("interested"), v.literal("not_interested")
      )
    ),
    templatesSent: v.optional(v.number()),
    lastContactedAt: v.optional(v.union(v.number(), v.null())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", {
      phone: args.phone,
      name: args.name,
      company: args.company ?? "",
      email: args.email ?? "",
      notes: args.notes ?? "",
      optInStatus: args.optInStatus ?? "pending",
      source: args.source ?? "manual",
      contactStatus: args.contactStatus ?? "new",
      templatesSent: args.templatesSent ?? 0,
      lastContactedAt: args.lastContactedAt ?? null,
      website: args.website ?? null,
      contactPerson: args.contactPerson ?? null,
      contactPersonTitle: args.contactPersonTitle ?? null,
    });
  },
});

export const update = mutation({
  args: {
    contactId: v.id("contacts"),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    email: v.optional(v.string()),
    notes: v.optional(v.string()),
    phone: v.optional(v.string()),
    optInStatus: v.optional(
      v.union(v.literal("opted_in"), v.literal("opted_out"), v.literal("pending"))
    ),
    contactStatus: v.optional(
      v.union(
        v.literal("new"), v.literal("ready"), v.literal("no_mobile"),
        v.literal("sent"), v.literal("interested"), v.literal("not_interested")
      )
    ),
    website: v.optional(v.string()),
    contactPerson: v.optional(v.string()),
    contactPersonTitle: v.optional(v.string()),
    conversationId: v.optional(v.union(v.id("conversations"), v.null())),
  },
  handler: async (ctx, args) => {
    const { contactId, ...fields } = args;
    const patch: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    // Forward-only guard: silently drop status if it would go backwards
    if (patch.contactStatus) {
      const contact = await ctx.db.get(contactId);
      if (contact && !canAdvanceStatus(contact.contactStatus, patch.contactStatus as string)) {
        delete patch.contactStatus;
      }
    }

    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(contactId, patch);

      // Sync denormalized fields to the conversation if name or contactStatus changed
      if (args.name !== undefined || patch.contactStatus !== undefined) {
        const contact = await ctx.db.get(contactId);
        if (contact) {
          const conv = await ctx.db
            .query("conversations")
            .withIndex("by_phone", (q) => q.eq("phone", contact.phone))
            .first();
          if (conv) {
            const convPatch: Record<string, unknown> = {};
            if (args.name !== undefined) convPatch.contactName = args.name;
            if (patch.contactStatus !== undefined) convPatch.contactStatus = patch.contactStatus;
            await ctx.db.patch(conv._id, convPatch);
          }
        }
      }
    }
  },
});

export const remove = mutation({
  args: { contactId: v.id("contacts") },
  handler: async (ctx, args) => {
    const contactTags = await ctx.db
      .query("contactTags")
      .withIndex("by_contact", (q) => q.eq("contactId", args.contactId))
      .collect();

    for (const ct of contactTags) {
      await ctx.db.delete(ct._id);
    }

    const memberships = await ctx.db
      .query("contactListMembers")
      .withIndex("by_contact", (q) => q.eq("contactId", args.contactId))
      .collect();

    for (const m of memberships) {
      await ctx.db.delete(m._id);
    }

    await ctx.db.delete(args.contactId);
  },
});

export const bulkUpsert = mutation({
  args: {
    contacts: v.array(
      v.object({
        phone: v.string(),
        name: v.optional(v.string()),
        company: v.optional(v.string()),
        email: v.optional(v.string()),
        notes: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    if (args.contacts.length > 500) {
      throw new Error(`Batch size ${args.contacts.length} exceeds maximum of 500`);
    }

    let created = 0;
    let updated = 0;

    for (const row of args.contacts) {
      const existing = await ctx.db
        .query("contacts")
        .withIndex("by_phone", (q) => q.eq("phone", row.phone))
        .first();

      if (existing) {
        const patch: Record<string, unknown> = {};
        if (row.name !== undefined) patch.name = row.name;
        if (row.company !== undefined) patch.company = row.company;
        if (row.email !== undefined) patch.email = row.email;
        if (row.notes !== undefined) patch.notes = row.notes;

        if (Object.keys(patch).length > 0) {
          await ctx.db.patch(existing._id, patch);
        }
        updated++;
      } else {
        await ctx.db.insert("contacts", {
          phone: row.phone,
          name: row.name ?? "",
          company: row.company ?? "",
          email: row.email ?? "",
          notes: row.notes ?? "",
          optInStatus: "pending",
          source: "csv_import",
          contactStatus: "new",
          templatesSent: 0,
        });
        created++;
      }
    }

    return { created, updated };
  },
});

// --- Orbit HTTP endpoint mutations/queries ---

export const getByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();
  },
});

const contactStatusValues = v.union(
  v.literal("new"), v.literal("ready"), v.literal("no_mobile"),
  v.literal("sent"), v.literal("interested"), v.literal("not_interested")
);

// Update any contact fields by phone lookup. Used by Echo, send-templates, enrich, qualify.
export const updateByPhone = mutation({
  args: {
    phone: v.string(),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    email: v.optional(v.string()),
    notes: v.optional(v.string()),
    contactStatus: v.optional(contactStatusValues),
    website: v.optional(v.string()),
    contactPerson: v.optional(v.string()),
    contactPersonTitle: v.optional(v.string()),
    niche: v.optional(v.string()),
    town: v.optional(v.string()),
    tier: v.optional(v.union(v.number(), v.null())),
    batch: v.optional(v.union(v.string(), v.null())),
    type: v.optional(v.union(v.string(), v.null())),
    signal: v.optional(v.union(v.string(), v.null())),
    senderAccount: v.optional(v.union(v.string(), v.null())),
    whatsappMessage: v.optional(v.union(v.string(), v.null())),
    whatsappReply: v.optional(v.union(v.string(), v.null())),
    whatsappRepliedAt: v.optional(v.union(v.number(), v.null())),
    whatsappSentAt: v.optional(v.union(v.number(), v.null())),
    whatsappDisposition: v.optional(v.union(v.string(), v.null())),
    templatesSent: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (!contact) return null;

    const { phone, ...fields } = args;
    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    // Compatibility mapping: translate old status names to new ones
    if (typeof patch.contactStatus === "string" && STATUS_COMPAT[patch.contactStatus]) {
      patch.contactStatus = STATUS_COMPAT[patch.contactStatus];
    }

    // Forward-only guard: silently drop status if it would go backwards
    if (patch.contactStatus) {
      if (!canAdvanceStatus(contact.contactStatus, patch.contactStatus as string)) {
        delete patch.contactStatus;
      }
    }

    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(contact._id, patch);

      // Sync denormalized fields to conversation
      if (fields.name !== undefined || patch.contactStatus !== undefined) {
        const conv = await ctx.db
          .query("conversations")
          .withIndex("by_phone", (q) => q.eq("phone", phone))
          .first();
        if (conv) {
          const convPatch: Record<string, unknown> = {};
          if (fields.name !== undefined) convPatch.contactName = fields.name;
          if (patch.contactStatus !== undefined) convPatch.contactStatus = patch.contactStatus;
          await ctx.db.patch(conv._id, convPatch);
        }
      }
    }

    return contact._id;
  },
});

// Bulk upsert with all scout fields. Used by scout-import.mjs.
export const bulkUpsertScout = mutation({
  args: {
    contacts: v.array(
      v.object({
        phone: v.string(),
        name: v.optional(v.string()),
        company: v.optional(v.string()),
        notes: v.optional(v.string()),
        website: v.optional(v.union(v.string(), v.null())),
        niche: v.optional(v.union(v.string(), v.null())),
        town: v.optional(v.union(v.string(), v.null())),
        tier: v.optional(v.union(v.number(), v.null())),
        batch: v.optional(v.union(v.string(), v.null())),
        type: v.optional(v.union(v.string(), v.null())),
        phoneNormalized: v.optional(v.union(v.string(), v.null())),
        phoneLandline: v.optional(v.union(v.string(), v.null())),
        signal: v.optional(v.union(v.string(), v.null())),
        contactStatus: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    if (args.contacts.length > 500) {
      throw new Error(`Batch size ${args.contacts.length} exceeds maximum of 500`);
    }

    let created = 0;
    let updated = 0;

    for (const row of args.contacts) {
      const existing = await ctx.db
        .query("contacts")
        .withIndex("by_phone", (q) => q.eq("phone", row.phone))
        .first();

      if (existing) {
        const patch: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(row)) {
          if (key !== "phone" && value !== undefined) {
            patch[key] = value;
          }
        }
        // Forward-only guard: silently drop status if it would go backwards
        if (patch.contactStatus) {
          if (!canAdvanceStatus(existing.contactStatus, patch.contactStatus as string)) {
            delete patch.contactStatus;
          }
        }
        if (Object.keys(patch).length > 0) {
          await ctx.db.patch(existing._id, patch);
        }
        updated++;
      } else {
        await ctx.db.insert("contacts", {
          phone: row.phone,
          name: row.name ?? "",
          company: row.company ?? "",
          email: "",
          notes: row.notes ?? "",
          optInStatus: "pending" as const,
          source: "scraper" as const,
          contactStatus: (row.contactStatus as any) ?? "new",
          templatesSent: 0,
          website: row.website ?? null,
          niche: row.niche ?? null,
          town: row.town ?? null,
          tier: row.tier ?? null,
          batch: row.batch ?? null,
          type: row.type ?? null,
          phoneNormalized: row.phoneNormalized ?? null,
          phoneLandline: row.phoneLandline ?? null,
          signal: row.signal ?? null,
        });
        created++;
      }
    }

    return { created, updated };
  },
});

// Query contacts by status with optional filters. Used by VPS scripts.
export const queryByStatus = query({
  args: {
    contactStatus: v.string(),
    batch: v.optional(v.string()),
    type: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let contacts = await ctx.db
      .query("contacts")
      .withIndex("by_contactStatus", (q) => q.eq("contactStatus", args.contactStatus as any))
      .collect();

    if (args.batch) {
      contacts = contacts.filter((c) => c.batch === args.batch);
    }
    if (args.type) {
      contacts = contacts.filter((c) => c.type === args.type);
    }
    if (args.limit) {
      contacts = contacts.slice(0, args.limit);
    }

    return contacts;
  },
});

// Return all phone numbers for dedup. Used by scout-import.mjs.
export const allPhones = query({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").collect();
    return contacts.map((c) => c.phone).filter(Boolean);
  },
});

// No auth guard — called from webhook handler (protected by webhook signature verification)
export const optOut = mutation({
  args: { phone: v.string() },
  handler: async (ctx, args) => {

    const contact = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (!contact) return null;

    // Opt-out always wins — BYPASS forward-only guard
    await ctx.db.patch(contact._id, {
      optInStatus: "opted_out",
      contactStatus: "not_interested",
    });

    return contact._id;
  },
});

// Temporary stats query — remove after audit
export const stats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("contacts").collect();
    const byStatus: Record<string, number> = {};
    for (const c of all) {
      const s = c.contactStatus ?? "unknown";
      byStatus[s] = (byStatus[s] || 0) + 1;
    }
    const convos = await ctx.db.query("conversations").collect();
    const msgs = await ctx.db.query("messages").collect();
    return {
      totalContacts: all.length,
      totalConversations: convos.length,
      totalMessages: msgs.length,
      byStatus,
    };
  },
});


// Temporary — get phones by status for comparison
export const phonesByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("contacts").collect();
    return all
      .filter(c => c.contactStatus === args.status)
      .map(c => c.phone);
  },
});

// Temporary — bulk fix contact statuses by phone
export const bulkFixStatus = mutation({
  args: {
    updates: v.array(v.object({
      phone: v.string(),
      contactStatus: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    let fixed = 0;
    let notFound = 0;
    for (const u of args.updates) {
      const contact = await ctx.db.query("contacts")
        .withIndex("by_phone", q => q.eq("phone", u.phone))
        .first();
      if (contact) {
        await ctx.db.patch(contact._id, { contactStatus: u.contactStatus as any });
        const conv = await ctx.db.query("conversations")
          .withIndex("by_phone", q => q.eq("phone", u.phone))
          .first();
        if (conv) {
          await ctx.db.patch(conv._id, { contactStatus: u.contactStatus });
        }
        fixed++;
      } else {
        notFound++;
      }
    }
    return { fixed, notFound };
  },
});

// Temporary — check if any "ready" contacts have outbound messages
export const readySafetyCheck = query({
  args: {},
  handler: async (ctx) => {
    const ready = await ctx.db.query("contacts").collect();
    const readyContacts = ready.filter(c => c.contactStatus === "ready");
    
    let alreadyMessaged = 0;
    let safe = 0;
    const problems: string[] = [];
    
    for (const c of readyContacts) {
      const conv = await ctx.db.query("conversations")
        .withIndex("by_phone", q => q.eq("phone", c.phone))
        .first();
      
      if (conv) {
        const msgs = await ctx.db.query("messages")
          .withIndex("by_conversation", q => q.eq("conversationId", conv._id))
          .collect();
        const outbound = msgs.filter(m => m.direction === "outbound");
        if (outbound.length > 0) {
          alreadyMessaged++;
          if (problems.length < 10) {
            problems.push(`${c.name} (${c.phone}) - ${outbound.length} outbound msgs, status still "ready"`);
          }
        } else {
          safe++;
        }
      } else {
        safe++;
      }
    }
    
    return {
      totalReady: readyContacts.length,
      safe,
      alreadyMessaged,
      sampleProblems: problems,
    };
  },
});

// Clean up business names for template readability
export const cleanReadyNames = mutation({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db
      .query("contacts")
      .withIndex("by_contactStatus", (q) => q.eq("contactStatus", "ready"))
      .collect();

    function toTitleCase(str: string): string {
      return str.toLowerCase().replace(/(?:^|\s|[-/&])\S/g, (c) => c.toUpperCase());
    }

    function cleanName(name: string): string {
      let cleaned = name;
      // Strip everything after pipe
      if (cleaned.includes("|")) cleaned = cleaned.split("|")[0].trim();
      // Strip parenthesised suffixes (but keep if it's the whole name)
      const withoutParens = cleaned.replace(/\s*\([^)]+\)\s*$/, "").trim();
      if (withoutParens.length > 3) cleaned = withoutParens;
      // Title case if ALL_CAPS or all lowercase
      if (cleaned === cleaned.toUpperCase() && cleaned.length > 5) cleaned = toTitleCase(cleaned);
      if (cleaned === cleaned.toLowerCase() && cleaned.length > 3) cleaned = toTitleCase(cleaned);
      // Truncate overly long names at a natural break
      if (cleaned.length > 60) {
        const dash = cleaned.indexOf(" - ");
        const comma = cleaned.indexOf(",");
        const cutPoint = dash > 15 ? dash : comma > 15 ? comma : 60;
        cleaned = cleaned.slice(0, cutPoint).trim();
      }
      return cleaned;
    }

    let fixed = 0;
    const changes: Array<{ from: string; to: string }> = [];

    for (const c of contacts) {
      const cleaned = cleanName(c.name);
      if (cleaned !== c.name) {
        await ctx.db.patch(c._id, { name: cleaned });
        if (changes.length < 50) changes.push({ from: c.name, to: cleaned });
        fixed++;
      }
    }

    return { total: contacts.length, fixed, samples: changes };
  },
});

// Check ready contact names for template issues
export const readyNameCheck = query({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db
      .query("contacts")
      .withIndex("by_contactStatus", (q) => q.eq("contactStatus", "ready"))
      .collect();

    const problems: Array<{ name: string; phone: string; flags: string[] }> = [];
    let longCount = 0;
    let pipeCount = 0;
    let parensCount = 0;
    let lowercaseCount = 0;
    let allCapsCount = 0;
    let emptyCount = 0;

    for (const c of contacts) {
      const name = c.name;
      const flags: string[] = [];
      if (name.length > 60) { flags.push("LONG"); longCount++; }
      if (name.includes("|")) { flags.push("PIPE"); pipeCount++; }
      if (name.includes("(")) { flags.push("PARENS"); parensCount++; }
      if (!name) { flags.push("EMPTY"); emptyCount++; }
      if (name === name.toLowerCase() && name.length > 3) { flags.push("lowercase"); lowercaseCount++; }
      if (name === name.toUpperCase() && name.length > 5) { flags.push("ALL_CAPS"); allCapsCount++; }
      if (flags.length > 0) {
        problems.push({ name: name.slice(0, 80), phone: c.phone, flags });
      }
    }

    return {
      total: contacts.length,
      clean: contacts.length - problems.length,
      issues: problems.length,
      breakdown: { longCount, pipeCount, parensCount, lowercaseCount, allCapsCount, emptyCount },
      samples: problems.slice(0, 50),
    };
  },
});

// Temporary — breakdown of ready leads by type/niche/batch
export const readyBreakdown = query({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts")
      .withIndex("by_contactStatus", q => q.eq("contactStatus", "ready"))
      .collect();
    
    const byType: Record<string, number> = {};
    const byNiche: Record<string, number> = {};
    const byBatch: Record<string, number> = {};
    let withWebsite = 0;
    let noWebsite = 0;
    
    for (const c of contacts) {
      const t = c.type || "no_type";
      const n = c.niche || "no_niche";
      const b = c.batch || "no_batch";
      byType[t] = (byType[t] || 0) + 1;
      byNiche[n] = (byNiche[n] || 0) + 1;
      byBatch[b] = (byBatch[b] || 0) + 1;
      if (c.website) withWebsite++;
      else noWebsite++;
    }
    
    return { total: contacts.length, withWebsite, noWebsite, byType, byNiche, byBatch };
  },
});

// Internal — mark a contact as sent (used by campaignProcessor)
export const markSentInternal = internalMutation({
  args: {
    contactId: v.id("contacts"),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.contactId);
    if (!contact) return;
    const patch: Record<string, unknown> = { whatsappSentAt: Date.now() };
    // Forward-only guard: only set "sent" if it advances the pipeline
    if (canAdvanceStatus(contact.contactStatus, "sent")) {
      patch.contactStatus = "sent";
    }
    await ctx.db.patch(args.contactId, patch);
  },
});

// --- Migration: simplify pipeline statuses ---
// Run via: npx convex run contacts:migrateStatuses --prod
export const migrateStatuses = mutation({
  args: {},
  handler: async (ctx) => {
    const MIGRATION_MAP: Record<string, string> = {
      talking: "interested",
      positive: "interested",
      negative: "not_interested",
      auto_reply: "sent",
      no_website: "not_interested",
      dead: "not_interested",
      never_contacted: "new",
      first_message: "sent",
      follow_up: "sent",
      offered: "interested",
      website_collected: "interested",
      building: "interested",
      demo_sent: "interested",
      paid: "interested",
    };

    const contacts = await ctx.db.query("contacts").collect();
    const counts: Record<string, number> = {};

    for (const contact of contacts) {
      const oldStatus = contact.contactStatus;
      const newStatus = MIGRATION_MAP[oldStatus];
      if (!newStatus) continue; // already on a new status

      counts[oldStatus] = (counts[oldStatus] || 0) + 1;
      await ctx.db.patch(contact._id, { contactStatus: newStatus as any });

      // Also update denormalized conversation contactStatus
      const conv = await ctx.db
        .query("conversations")
        .withIndex("by_phone", (q) => q.eq("phone", contact.phone))
        .first();
      if (conv) {
        await ctx.db.patch(conv._id, { contactStatus: newStatus });
      }
    }

    return counts;
  },
});
