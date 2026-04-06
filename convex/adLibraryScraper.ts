"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

const NICHE_KEYWORDS: Record<string, string[]> = {
  estate_agent: [
    "estate agent",
    "letting agent",
    "property for sale",
    "houses for sale",
    "estate agency",
    "property valuation",
  ],
};

interface AdArchiveResult {
  id: string;
  page_id: string;
  page_name: string;
  ad_creative_bodies?: string[];
  ad_creative_link_titles?: string[];
  ad_snapshot_url?: string;
  spend?: { lower_bound: string; upper_bound: string };
  impressions?: { lower_bound: string; upper_bound: string };
  publisher_platforms?: string[];
  ad_delivery_start_time?: string;
}

interface AdArchiveResponse {
  data: AdArchiveResult[];
  paging?: {
    cursors?: { after: string };
    next?: string;
  };
}

interface PageAggregate {
  pageId: string;
  pageName: string;
  adCount: number;
  spendRanges: string[];
  impressionRanges: string[];
  platforms: Set<string>;
  adBodies: string[];
  snapshotUrls: string[];
  firstStartDate: string | undefined;
}

async function fetchWithBackoff(
  url: string,
  retries = 3
): Promise<AdArchiveResponse> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const response = await fetch(url);

    if (response.status === 429) {
      const delay = Math.pow(2, attempt) * 2000;
      console.log(`Rate limited, waiting ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Ad Library API error ${response.status}: ${errorText}`
      );
    }

    return response.json();
  }

  throw new Error("Max retries exceeded for Ad Library API");
}

function formatSpendRange(
  spend?: { lower_bound: string; upper_bound: string }
): string | undefined {
  if (!spend) return undefined;
  return `${spend.lower_bound}-${spend.upper_bound}`;
}

function formatImpressionsRange(
  impressions?: { lower_bound: string; upper_bound: string }
): string | undefined {
  if (!impressions) return undefined;
  return `${impressions.lower_bound}-${impressions.upper_bound}`;
}

export const scrapeAdLibrary = internalAction({
  args: {
    searchTerm: v.string(),
    niche: v.string(),
  },
  handler: async (ctx, args) => {
    const token = process.env.META_AD_LIBRARY_ACCESS_TOKEN;
    if (!token) {
      throw new Error("META_AD_LIBRARY_ACCESS_TOKEN not set");
    }

    const fields = [
      "id",
      "page_id",
      "page_name",
      "ad_creative_bodies",
      "ad_creative_link_titles",
      "ad_snapshot_url",
      "spend",
      "impressions",
      "publisher_platforms",
      "ad_delivery_start_time",
    ].join(",");

    const params = new URLSearchParams({
      search_terms: args.searchTerm,
      ad_reached_countries: '["GB"]',
      ad_active_status: "ACTIVE",
      ad_type: "ALL",
      fields,
      limit: "500",
      access_token: token,
    });

    const baseUrl = `https://graph.facebook.com/v25.0/ads_archive?${params}`;

    // Collect all ads across pages
    const allAds: AdArchiveResult[] = [];
    let nextUrl: string | undefined = baseUrl;

    while (nextUrl) {
      const data = await fetchWithBackoff(nextUrl);
      allAds.push(...data.data);

      nextUrl = data.paging?.next;

      // Rate limit: 1s delay between pagination requests
      if (nextUrl) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    // Group by page_id
    const pages = new Map<string, PageAggregate>();

    for (const ad of allAds) {
      const existing = pages.get(ad.page_id);

      if (existing) {
        existing.adCount++;
        if (ad.spend) {
          existing.spendRanges.push(formatSpendRange(ad.spend)!);
        }
        if (ad.impressions) {
          existing.impressionRanges.push(formatImpressionsRange(ad.impressions)!);
        }
        if (ad.publisher_platforms) {
          for (const p of ad.publisher_platforms) existing.platforms.add(p);
        }
        if (ad.ad_creative_bodies?.[0] && existing.adBodies.length < 3) {
          existing.adBodies.push(ad.ad_creative_bodies[0]);
        }
        if (ad.ad_snapshot_url && existing.snapshotUrls.length < 3) {
          existing.snapshotUrls.push(ad.ad_snapshot_url);
        }
        if (
          ad.ad_delivery_start_time &&
          (!existing.firstStartDate ||
            ad.ad_delivery_start_time < existing.firstStartDate)
        ) {
          existing.firstStartDate = ad.ad_delivery_start_time;
        }
      } else {
        pages.set(ad.page_id, {
          pageId: ad.page_id,
          pageName: ad.page_name,
          adCount: 1,
          spendRanges: ad.spend ? [formatSpendRange(ad.spend)!] : [],
          impressionRanges: ad.impressions
            ? [formatImpressionsRange(ad.impressions)!]
            : [],
          platforms: new Set(ad.publisher_platforms ?? []),
          adBodies: ad.ad_creative_bodies?.[0]
            ? [ad.ad_creative_bodies[0]]
            : [],
          snapshotUrls: ad.ad_snapshot_url ? [ad.ad_snapshot_url] : [],
          firstStartDate: ad.ad_delivery_start_time,
        });
      }
    }

    // Upsert each page into adLibraryLeads
    let newLeads = 0;
    let updatedLeads = 0;

    for (const page of pages.values()) {
      // Pick the highest spend range as representative
      const spendRange =
        page.spendRanges.length > 0
          ? page.spendRanges.sort().pop()
          : undefined;
      const impressionsRange =
        page.impressionRanges.length > 0
          ? page.impressionRanges.sort().pop()
          : undefined;

      const result = await ctx.runMutation(
        internal.adLibraryLeads.upsertFromScrape,
        {
          pageId: page.pageId,
          pageName: page.pageName,
          adCount: page.adCount,
          spendRange,
          impressionsRange,
          platforms: Array.from(page.platforms),
          sampleAdBodies: page.adBodies,
          adSnapshotUrls: page.snapshotUrls,
          firstAdStartDate: page.firstStartDate,
          searchTerm: args.searchTerm,
          niche: args.niche,
        }
      );

      if (result.isNew) {
        newLeads++;
      } else {
        updatedLeads++;
      }
    }

    // Schedule qualification for any new/unqualified leads
    if (newLeads > 0) {
      await ctx.scheduler.runAfter(0, internal.leadQualification.batchQualifyNewLeads, {});
    }

    return {
      success: true,
      newLeads,
      updatedLeads,
      totalAds: allAds.length,
      uniquePages: pages.size,
    };
  },
});

export const scrapeNiche = internalAction({
  args: {
    niche: v.string(),
  },
  handler: async (ctx, args) => {
    const keywords = NICHE_KEYWORDS[args.niche];
    if (!keywords) {
      throw new Error(`Unknown niche: ${args.niche}`);
    }

    for (const keyword of keywords) {
      await ctx.scheduler.runAfter(0, internal.adLibraryScraper.scrapeAdLibrary, {
        searchTerm: keyword,
        niche: args.niche,
      });
    }

    return {
      success: true,
      scheduledKeywords: keywords.length,
    };
  },
});

export const runScrape = action({
  args: {
    niche: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ success: boolean; scheduledKeywords: number }> => {
    const niche = args.niche ?? "estate_agent";

    const result: { success: boolean; scheduledKeywords: number } = await ctx.runAction(internal.adLibraryScraper.scrapeNiche, {
      niche,
    });

    return result;
  },
});
