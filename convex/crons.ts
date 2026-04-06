import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "process active campaigns",
  { minutes: 5 },
  internal.campaignProcessor.processActiveCampaigns,
);

crons.interval(
  "process sequences",
  { minutes: 15 },
  internal.sequenceProcessor.processSequences,
);

export default crons;
