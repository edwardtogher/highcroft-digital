/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as adLibraryLeads from "../adLibraryLeads.js";
import type * as adLibraryScraper from "../adLibraryScraper.js";
import type * as auth from "../auth.js";
import type * as campaignProcessor from "../campaignProcessor.js";
import type * as campaignRecipients from "../campaignRecipients.js";
import type * as campaigns from "../campaigns.js";
import type * as contacts from "../contacts.js";
import type * as conversations from "../conversations.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as googlePlaces from "../googlePlaces.js";
import type * as googlePlacesHelpers from "../googlePlacesHelpers.js";
import type * as http from "../http.js";
import type * as leadApi from "../leadApi.js";
import type * as leadEnrichment from "../leadEnrichment.js";
import type * as leadQualification from "../leadQualification.js";
import type * as leadQualificationHelpers from "../leadQualificationHelpers.js";
import type * as lists from "../lists.js";
import type * as messages from "../messages.js";
import type * as push from "../push.js";
import type * as reply from "../reply.js";
import type * as scoutQueue from "../scoutQueue.js";
import type * as sendMessage from "../sendMessage.js";
import type * as sequenceProcessor from "../sequenceProcessor.js";
import type * as sequenceProcessorHelpers from "../sequenceProcessorHelpers.js";
import type * as sequences from "../sequences.js";
import type * as tags from "../tags.js";
import type * as users from "../users.js";
import type * as whatsapp from "../whatsapp.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  adLibraryLeads: typeof adLibraryLeads;
  adLibraryScraper: typeof adLibraryScraper;
  auth: typeof auth;
  campaignProcessor: typeof campaignProcessor;
  campaignRecipients: typeof campaignRecipients;
  campaigns: typeof campaigns;
  contacts: typeof contacts;
  conversations: typeof conversations;
  crons: typeof crons;
  dashboard: typeof dashboard;
  googlePlaces: typeof googlePlaces;
  googlePlacesHelpers: typeof googlePlacesHelpers;
  http: typeof http;
  leadApi: typeof leadApi;
  leadEnrichment: typeof leadEnrichment;
  leadQualification: typeof leadQualification;
  leadQualificationHelpers: typeof leadQualificationHelpers;
  lists: typeof lists;
  messages: typeof messages;
  push: typeof push;
  reply: typeof reply;
  scoutQueue: typeof scoutQueue;
  sendMessage: typeof sendMessage;
  sequenceProcessor: typeof sequenceProcessor;
  sequenceProcessorHelpers: typeof sequenceProcessorHelpers;
  sequences: typeof sequences;
  tags: typeof tags;
  users: typeof users;
  whatsapp: typeof whatsapp;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
