import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  conversations: defineTable({
    phone: v.string(),
    businessName: v.string(),
    windowExpiry: v.optional(v.union(v.number(), v.null())),
    unreadCount: v.number(),
    lastActivity: v.number(),
    // Denormalized fields for avoiding N+1 in conversations.list
    contactName: v.optional(v.string()),
    contactStatus: v.optional(v.string()),
    lastMessageBody: v.optional(v.string()),
    lastMessageDirection: v.optional(v.string()),
    lastMessageStatus: v.optional(v.string()),
    lastMessageTimestamp: v.optional(v.number()),
  })
    .index("by_phone", ["phone"])
    .index("by_lastActivity", ["lastActivity"])
    .index("by_unread", ["unreadCount"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    metaMessageId: v.optional(v.union(v.string(), v.null())),
    direction: v.union(v.literal("inbound"), v.literal("outbound")),
    fromNumber: v.string(),
    toNumber: v.string(),
    body: v.string(),
    messageType: v.union(v.literal("text"), v.literal("template")),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read"),
      v.literal("received"),
      v.literal("failed")
    ),
    templateName: v.optional(v.union(v.string(), v.null())),
    errorMessage: v.optional(v.union(v.string(), v.null())),
    replyToMetaId: v.optional(v.union(v.string(), v.null())),
    createdAt: v.optional(v.number()),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_metaMessageId", ["metaMessageId"]),

  contacts: defineTable({
    phone: v.string(),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    notes: v.string(),
    optInStatus: v.union(
      v.literal("opted_in"),
      v.literal("opted_out"),
      v.literal("pending")
    ),
    optInDate: v.optional(v.union(v.number(), v.null())),
    source: v.union(
      v.literal("manual"),
      v.literal("csv_import"),
      v.literal("webhook"),
      v.literal("scraper")
    ),
    lastContactedAt: v.optional(v.union(v.number(), v.null())),
    conversationId: v.optional(v.union(v.id("conversations"), v.null())),
    originalName: v.optional(v.union(v.string(), v.null())),
    website: v.optional(v.union(v.string(), v.null())),
    contactPerson: v.optional(v.union(v.string(), v.null())),
    contactPersonTitle: v.optional(v.union(v.string(), v.null())),
    niche: v.optional(v.union(v.string(), v.null())),
    town: v.optional(v.union(v.string(), v.null())),
    tier: v.optional(v.union(v.number(), v.null())),
    whatsappSentAt: v.optional(v.union(v.number(), v.null())),
    // Scout pipeline fields
    batch: v.optional(v.union(v.string(), v.null())),
    type: v.optional(v.union(v.string(), v.null())),
    phoneNormalized: v.optional(v.union(v.string(), v.null())),
    phoneLandline: v.optional(v.union(v.string(), v.null())),
    signal: v.optional(v.union(v.string(), v.null())),
    senderAccount: v.optional(v.union(v.string(), v.null())),
    whatsappMessage: v.optional(v.union(v.string(), v.null())),
    whatsappReply: v.optional(v.union(v.string(), v.null())),
    whatsappRepliedAt: v.optional(v.union(v.number(), v.null())),
    whatsappDisposition: v.optional(v.union(v.string(), v.null())),
    contactStatus: v.union(
      v.literal("new"), v.literal("ready"), v.literal("no_mobile"),
      v.literal("sent"), v.literal("interested"), v.literal("not_interested")
    ),
    templatesSent: v.number(),
  })
    .index("by_phone", ["phone"])
    .index("by_contactStatus", ["contactStatus"])
    .searchIndex("search_name", { searchField: "name" }),

  contactLists: defineTable({
    name: v.string(),
    description: v.string(),
    memberCount: v.number(),
  }),

  contactListMembers: defineTable({
    listId: v.id("contactLists"),
    contactId: v.id("contacts"),
  })
    .index("by_list", ["listId"])
    .index("by_contact", ["contactId"])
    .index("by_list_and_contact", ["listId", "contactId"]),

  campaigns: defineTable({
    name: v.string(),
    templateId: v.optional(v.union(v.string(), v.null())),
    templateName: v.optional(v.union(v.string(), v.null())),
    templateLanguage: v.string(),
    templateCategory: v.optional(v.union(v.string(), v.null())),
    templateBody: v.optional(v.union(v.string(), v.null())),
    contactListId: v.optional(v.union(v.id("contactLists"), v.null())),
    templateComponents: v.optional(v.any()),
    sendWindowStart: v.number(),
    sendWindowEnd: v.number(),
    status: v.union(
      v.literal("draft"),
      v.literal("scheduled"),
      v.literal("sending"),
      v.literal("paused"),
      v.literal("completed"),
      v.literal("failed")
    ),
    totalRecipients: v.number(),
    sentCount: v.number(),
    deliveredCount: v.number(),
    readCount: v.number(),
    failedCount: v.number(),
    repliedCount: v.number(),
    pauseAfterBatch: v.optional(v.boolean()),
    dailySendLimit: v.optional(v.number()),
    scheduledAt: v.optional(v.union(v.number(), v.null())),
    startedAt: v.optional(v.union(v.number(), v.null())),
    completedAt: v.optional(v.union(v.number(), v.null())),
  }).index("by_status", ["status"]),

  campaignRecipients: defineTable({
    campaignId: v.id("campaigns"),
    contactId: v.id("contacts"),
    phone: v.string(),
    templateParams: v.optional(v.any()),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("read"),
      v.literal("failed")
    ),
    metaMessageId: v.optional(v.union(v.string(), v.null())),
    errorMessage: v.optional(v.union(v.string(), v.null())),
    sentAt: v.optional(v.union(v.number(), v.null())),
    deliveredAt: v.optional(v.union(v.number(), v.null())),
    readAt: v.optional(v.union(v.number(), v.null())),
    failedAt: v.optional(v.union(v.number(), v.null())),
    repliedAt: v.optional(v.union(v.number(), v.null())),
    isAutoReply: v.boolean(),
    convertedAt: v.optional(v.union(v.number(), v.null())),
    conversionSource: v.optional(v.union(v.string(), v.null())),
  })
    .index("by_campaign_status", ["campaignId", "status"])
    .index("by_metaMessageId", ["metaMessageId"])
    .index("by_phone", ["phone"]),

  tags: defineTable({
    name: v.string(),
  }).index("by_name", ["name"]),

  contactTags: defineTable({
    contactId: v.id("contacts"),
    tagId: v.id("tags"),
  })
    .index("by_contact", ["contactId"])
    .index("by_tag", ["tagId"]),

  pushSubscriptions: defineTable({
    endpoint: v.string(),
    p256dh: v.string(),
    auth: v.string(),
    userAgent: v.string(),
  }).index("by_endpoint", ["endpoint"]),

  adLibraryLeads: defineTable({
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
    status: v.union(
      v.literal("new"),
      v.literal("reviewed"),
      v.literal("qualified"),
      v.literal("rejected"),
      v.literal("contacted")
    ),
    scrapedAt: v.number(),
    lastSeenAt: v.number(),
    notes: v.optional(v.string()),
    // Enrichment fields
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
    // Qualification fields
    qualityScore: v.optional(v.number()),
    qualitySignals: v.optional(v.object({
      spendScore: v.number(),
      adCopyScore: v.number(),
      legitimacyScore: v.number(),
      longevityScore: v.number(),
    })),
    qualificationStatus: v.optional(v.union(
      v.literal("pending"),
      v.literal("qualified"),
      v.literal("auto_rejected"),
      v.literal("manual_review")
    )),
    rejectionReason: v.optional(v.string()),
    qualifiedAt: v.optional(v.number()),
  })
    .index("by_pageId", ["pageId"])
    .index("by_niche", ["niche"])
    .index("by_status", ["status"])
    .index("by_scrapedAt", ["scrapedAt"])
    .index("by_enrichmentStatus", ["enrichmentStatus"])
    .index("by_qualificationStatus", ["qualificationStatus"])
    .index("by_qualityScore", ["qualityScore"]),

  // Follow-up sequences
  sequences: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    isActive: v.boolean(),
    // The initial template to use (e.g., "websites_v3")
    initialTemplate: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  sequenceSteps: defineTable({
    sequenceId: v.id("sequences"),
    stepNumber: v.number(), // 1, 2, 3...
    delayDays: v.number(), // days after previous step (or initial send)
    messageBody: v.string(), // the follow-up text
    // Optional: only send if lead is in certain status
    requireStatus: v.optional(v.string()),
    isActive: v.boolean(),
  })
    .index("by_sequence", ["sequenceId"])
    .index("by_sequence_step", ["sequenceId", "stepNumber"]),

  sequenceEnrollments: defineTable({
    sequenceId: v.id("sequences"),
    contactId: v.id("contacts"),
    phone: v.string(),
    currentStep: v.number(), // which step they're on (0 = initial send done, 1 = first follow-up due, etc.)
    status: v.union(
      v.literal("active"),    // still in sequence
      v.literal("replied"),   // they replied — stop sequence
      v.literal("completed"), // all steps done
      v.literal("paused"),    // manually paused
      v.literal("opted_out")  // unsubscribed
    ),
    enrolledAt: v.number(),
    lastStepAt: v.number(), // when the last step was sent
    nextStepAt: v.optional(v.number()), // when the next step is due
    completedAt: v.optional(v.number()),
  })
    .index("by_sequence", ["sequenceId"])
    .index("by_contact", ["contactId"])
    .index("by_status", ["status"])
    .index("by_next_step", ["status", "nextStepAt"]),

  // Scout scrape queue
  scoutQueue: defineTable({
    searchTerm: v.string(),
    area: v.string(),
    batchName: v.optional(v.union(v.string(), v.null())),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("done"),
      v.literal("failed")
    ),
    priority: v.optional(v.number()),
    notes: v.optional(v.union(v.string(), v.null())),
    leadsFound: v.optional(v.union(v.number(), v.null())),
    leadsWithMobile: v.optional(v.union(v.number(), v.null())),
    createdAt: v.number(),
    scrapedAt: v.optional(v.union(v.number(), v.null())),
  })
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),
});
