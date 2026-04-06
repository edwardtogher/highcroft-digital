import { query } from "./_generated/server";

export const getHealth = query({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").collect();
    const campaigns = await ctx.db.query("campaigns").collect();
    const conversations = await ctx.db.query("conversations").collect();

    // Contact status breakdown
    const statusCounts: Record<string, number> = {};
    for (const c of contacts) {
      statusCounts[c.contactStatus] = (statusCounts[c.contactStatus] || 0) + 1;
    }

    // Pipeline funnel
    const pipelineStages = ["ready", "sent", "interested", "not_interested"];
    const funnel = pipelineStages.map((stage) => ({
      stage,
      count: statusCounts[stage] || 0,
    }));

    // Reply rate: interested replies out of total sent
    const totalSent = (statusCounts["sent"] || 0) + (statusCounts["interested"] || 0) + (statusCounts["not_interested"] || 0);
    const totalReplied = statusCounts["interested"] || 0;

    // Message volume by period
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const messages = await ctx.db.query("messages").collect();

    function msgStats(since: number) {
      const filtered = messages.filter(
        (m) => (m.createdAt ?? m._creationTime) > since
      );
      return {
        inbound: filtered.filter((m) => m.direction === "inbound").length,
        outbound: filtered.filter((m) => m.direction === "outbound").length,
      };
    }

    // Message volume by day (last 14 days)
    const dailyVolume: { date: string; inbound: number; outbound: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const dayStart = now - (i + 1) * day;
      const dayEnd = now - i * day;
      const dayMsgs = messages.filter((m) => {
        const ts = m.createdAt ?? m._creationTime;
        return ts > dayStart && ts <= dayEnd;
      });
      dailyVolume.push({
        date: new Date(dayEnd).toISOString().split("T")[0],
        inbound: dayMsgs.filter((m) => m.direction === "inbound").length,
        outbound: dayMsgs.filter((m) => m.direction === "outbound").length,
      });
    }

    // Campaign stats
    const campaignStats = campaigns
      .filter((c) => c.sentCount > 0)
      .map((c) => ({
        name: c.name,
        status: c.status,
        sent: c.sentCount,
        delivered: c.deliveredCount,
        read: c.readCount,
        replied: c.repliedCount,
        failed: c.failedCount,
        deliveryRate:
          c.sentCount > 0
            ? Math.round((c.deliveredCount / c.sentCount) * 100)
            : 0,
        readRate:
          c.deliveredCount > 0
            ? Math.round((c.readCount / c.deliveredCount) * 100)
            : 0,
        replyRate:
          c.sentCount > 0
            ? Math.round((c.repliedCount / c.sentCount) * 100)
            : 0,
      }));

    // Open conversations
    const openConversations = conversations.filter(
      (c) => c.unreadCount > 0
    ).length;

    // Exit states
    const notInterested = statusCounts["not_interested"] || 0;
    const noMobile = statusCounts["no_mobile"] || 0;

    return {
      totalContacts: contacts.length,
      statusCounts,
      funnel,
      totalSent,
      totalReplied,
      replyRate:
        totalSent > 0
          ? Math.round((totalReplied / totalSent) * 100)
          : 0,
      messages: {
        total: messages.length,
        last24h: msgStats(now - day),
        last7d: msgStats(now - 7 * day),
      },
      dailyVolume,
      campaignStats,
      openConversations,
      exitStates: { notInterested, noMobile },
    };
  },
});
