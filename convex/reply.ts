import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const sendReply = action({
  args: {
    to: v.string(),
    message: v.string(),
  },
  handler: async (ctx, { to, message }) => {
    const orbitUrl = "https://orbit.speaktoeva.com";
    const secret = "scout-orbit-sync-2026";

    const res = await fetch(`${orbitUrl}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-orbit-secret": secret,
      },
      body: JSON.stringify({ phone: to, message }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Orbit send failed: ${err}`);
    }

    const result = await res.json();

    // Log outbound to Convex
    await ctx.runMutation(api.messages.addOutbound, {
      phone: to,
      metaMessageId: result.wamid,
      fromNumber: "orbit",
      toNumber: to,
      body: message,
      timestamp: Date.now(),
      messageType: "text",
    });

    return { success: true, wamid: result.wamid };
  },
});
