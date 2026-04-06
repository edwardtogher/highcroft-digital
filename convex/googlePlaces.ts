"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

// --- Phone normalization ---

function normalizeUkPhone(phone: string | null): string | null {
  if (!phone) return null;
  let digits = phone.replace(/[^\d+]/g, "");

  if (digits.startsWith("+44")) digits = "0" + digits.slice(3);
  else if (digits.startsWith("44") && digits.length > 10)
    digits = "0" + digits.slice(2);
  else if (digits.startsWith("0044")) digits = "0" + digits.slice(4);

  if (!digits.startsWith("0") || digits.length !== 11) return null;
  return digits;
}

function toE164(local: string): string {
  return "+44" + local.slice(1);
}

function isMobile(phone: string): boolean {
  return phone.startsWith("07");
}

// --- Website analysis patterns ---

const BOOKING_PATTERNS = [
  /calendly\.com/i, /cliniko\.com/i, /fresha\.com/i,
  /jane\.app|janeapp\.com/i, /acuityscheduling\.com/i,
  /booksy\.com/i, /setmore\.com/i, /simplybook\.me/i,
  /gettimely\.com/i, /mindbodyonline\.com|mindbody\.io/i,
  /nookal\.com/i, /pabau\.com/i,
];

const CHAT_PATTERNS = [
  /tidio\.co|tidiochat/i, /intercom\.io|intercomcdn/i,
  /crisp\.chat/i, /tawk\.to/i, /livechatinc\.com/i,
  /drift\.com/i, /zopim|zendesk/i, /hubspot\.com.*chat|hs-scripts/i,
];

function analyzeWebsite(html: string) {
  const hasBooking = BOOKING_PATTERNS.some((p) => p.test(html));
  const hasChat = CHAT_PATTERNS.some((p) => p.test(html));
  const hasForm =
    /<form[\s\S]*?(contact|enquir|message|get.in.touch|book|appointment)/i.test(html) ||
    (/type=["']email["']/i.test(html) && /<form/i.test(html)) ||
    /contact-form|wpcf7|wpforms|gravity-form|formspree|netlify.*form|typeform/i.test(html);
  return { hasBooking, hasChat, hasForm };
}

// --- Lead scoring ---

function scoreLead(opts: {
  hasMobile: boolean;
  hasWebsite: boolean;
  hasBooking: boolean;
  hasChat: boolean;
  hasForm: boolean;
  reviewCount: number;
}): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (!opts.hasBooking) { score += 3; reasons.push("+3:no_booking"); }
  if (!opts.hasForm && !opts.hasChat) { score += 2; reasons.push("+2:phone_only"); }
  else if (!opts.hasForm) { score += 1; reasons.push("+1:no_form"); }
  if (opts.hasMobile) { score += 1; reasons.push("+1:mobile"); }
  if (opts.hasWebsite) { score += 1; reasons.push("+1:has_website"); }
  if (opts.reviewCount >= 50) { score += 1; reasons.push("+1:busy"); }
  if (opts.reviewCount < 50) { score += 2; reasons.push("+2:small_business"); }

  return { score, reasons };
}

function scoreToTier(score: number): number {
  if (score >= 8) return 1;
  if (score >= 6) return 2;
  if (score >= 4) return 3;
  return 4;
}

// --- Google Places API ---

const FIELD_MASK = [
  "places.displayName", "places.formattedAddress",
  "places.nationalPhoneNumber", "places.internationalPhoneNumber",
  "places.websiteUri", "places.regularOpeningHours",
  "places.rating", "places.userRatingCount",
  "places.googleMapsUri", "places.businessStatus",
  "nextPageToken",
].join(",");

interface PlaceResult {
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  businessStatus?: string;
}

// --- Scrape + Import action ---

export const scrapeAndImport = internalAction({
  args: {
    searchTerm: v.string(),
    area: v.string(),
    niche: v.string(),
  },
  handler: async (ctx, args) => {
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    if (!API_KEY) throw new Error("GOOGLE_PLACES_API_KEY not set in Convex env");

    const query = `${args.searchTerm} ${args.area}`;

    // 1. SCRAPE
    const allPlaces: PlaceResult[] = [];
    let pageToken: string | null = null;
    let page = 0;

    do {
      page++;
      const body: Record<string, string> = { textQuery: query };
      if (pageToken) body.pageToken = pageToken;

      const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.error(`Google Places API error (${res.status}): ${await res.text()}`);
        break;
      }

      const data = await res.json();
      allPlaces.push(...(data.places || []));
      pageToken = data.nextPageToken || null;

      if (pageToken) await new Promise((r) => setTimeout(r, 2000));
    } while (pageToken && page < 5);

    // 2. FILTER, NORMALIZE, IMPORT
    const seen = new Set<string>();
    let created = 0;
    let skippedDupe = 0;
    let skippedNotUk = 0;
    let noMobile = 0;

    for (const place of allPlaces) {
      const address = place.formattedAddress || "";
      const isUk =
        /\bUK\b|\bUnited Kingdom\b/i.test(address) ||
        /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i.test(address);

      if (!isUk) { skippedNotUk++; continue; }

      const rawPhone = place.nationalPhoneNumber || place.internationalPhoneNumber || null;
      const localPhone = normalizeUkPhone(rawPhone);

      if (localPhone && seen.has(localPhone)) { skippedDupe++; continue; }
      if (localPhone) seen.add(localPhone);

      const mobile = localPhone ? isMobile(localPhone) : false;
      const e164 = localPhone ? toE164(localPhone) : null;

      const town = address.replace(/,?\s*UK\s*$/i, "").split(",").slice(-2, -1)[0]?.trim() || "";
      const reviewCount = place.userRatingCount || 0;
      const rating = place.rating || null;
      const hours = place.regularOpeningHours?.weekdayDescriptions?.join(" | ") || null;

      const noteParts: string[] = [];
      if (rating) noteParts.push(`google_rating:${rating}`);
      if (reviewCount) noteParts.push(`google_reviews:${reviewCount}`);
      if (hours) noteParts.push(`hours:${hours}`);

      let contactStatus: "new" | "no_mobile" = "new";
      if (!mobile || !e164) { contactStatus = "no_mobile"; noMobile++; }

      try {
        await ctx.runMutation(internal.googlePlacesHelpers.upsertContact, {
          phone: e164 || `no_phone_${Date.now()}_${created}`,
          name: place.displayName?.text || "Unknown",
          website: place.websiteUri || null,
          niche: args.niche,
          town,
          notes: noteParts.join(" | "),
          contactStatus,
          reviewCount,
        });
        created++;
      } catch (e) {
        console.warn(`Failed to upsert ${place.displayName?.text}:`, e);
      }
    }

    // 3. Schedule enrichment
    await ctx.scheduler.runAfter(0, internal.googlePlaces.enrichAndQualifyBatch, {});

    return { query, totalResults: allPlaces.length, created, skippedDupe, skippedNotUk, noMobile };
  },
});

// --- Enrich & qualify ---

export const enrichAndQualifyBatch = internalAction({
  args: {},
  handler: async (ctx) => {
    const newContacts: Array<{
      _id: string;
      phone: string;
      name: string;
      website: string | null;
      notes: string;
    }> = await ctx.runQuery(internal.googlePlacesHelpers.getNewContacts, {});

    let enriched = 0;
    let qualified = 0;

    for (const contact of newContacts) {
      let hasBooking = false;
      let hasChat = false;
      let hasForm = false;

      if (contact.website) {
        try {
          const res = await fetch(contact.website, {
            headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15" },
            signal: AbortSignal.timeout(15000),
            redirect: "follow",
          });
          if (res.ok) {
            const html = await res.text();
            const analysis = analyzeWebsite(html);
            hasBooking = analysis.hasBooking;
            hasChat = analysis.hasChat;
            hasForm = analysis.hasForm;
            enriched++;
          }
        } catch {
          // Website unreachable
        }
      }

      const reviewMatch = contact.notes.match(/google_reviews:(\d+)/);
      const reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : 0;
      const hasMobile = contact.phone.startsWith("+447") && parseInt(contact.phone[4]) >= 3;

      const { score, reasons } = scoreLead({
        hasMobile, hasWebsite: !!contact.website,
        hasBooking, hasChat, hasForm, reviewCount,
      });
      const tier = scoreToTier(score);

      let newStatus: string;
      if (score >= 5 && hasMobile) { newStatus = "ready"; qualified++; }
      else if (!hasMobile) { newStatus = "no_mobile"; }
      else { newStatus = "new"; }

      const enrichNotes = `${contact.notes} | enriched:true | score:${score} | tier:${tier} | signals:[${reasons.join(",")}] | booking:${hasBooking} | form:${hasForm} | chat:${hasChat}`;

      await ctx.runMutation(internal.googlePlacesHelpers.updateContactEnrichment, {
        contactId: contact._id as any,
        notes: enrichNotes,
        tier,
        contactStatus: newStatus,
      });

      await new Promise((r) => setTimeout(r, 1500));
    }

    return { processed: newContacts.length, enriched, qualified };
  },
});

// --- Public triggers ---

export const runPipeline = action({
  args: { searchTerm: v.string(), area: v.string(), niche: v.string() },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(0, internal.googlePlaces.scrapeAndImport, args);
    return { scheduled: true, query: `${args.searchTerm} ${args.area}` };
  },
});

export const runBatchPipeline = action({
  args: {
    searches: v.array(v.object({
      searchTerm: v.string(), area: v.string(), niche: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    for (let i = 0; i < args.searches.length; i++) {
      await ctx.scheduler.runAfter(i * 30000, internal.googlePlaces.scrapeAndImport, args.searches[i]);
    }
    return { scheduled: args.searches.length };
  },
});
