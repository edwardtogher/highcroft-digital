import { action } from "./_generated/server";
import { v } from "convex/values";

export const send = action({
  args: {
    phone: v.string(),
    message: v.string(),
  },
  handler: async (_ctx, { phone, message }) => {
    const VPS_URL = process.env.VPS_SEND_URL || "https://orbit.speaktoeva.com/send";
    const SECRET = process.env.ORBIT_SECRET || "scout-orbit-sync-2026";

    const res = await fetch(VPS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-orbit-secret": SECRET,
      },
      body: JSON.stringify({ phone, message }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Send failed (${res.status}): ${text}`);
    }

    return await res.json();
  },
});
