"use node";

import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const API_VERSION = "v21.0";

function getConfig() {
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
  const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
  const BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID!;
  const BASE_URL = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}`;
  return { PHONE_NUMBER_ID, ACCESS_TOKEN, BUSINESS_ACCOUNT_ID, BASE_URL };
}

export const sendTextMessage = internalAction({
  args: {
    to: v.string(),
    body: v.string(),
  },
  handler: async (_ctx, args) => {
    const { BASE_URL, ACCESS_TOKEN } = getConfig();

    try {
      const response = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: args.to,
          type: "text",
          text: { body: args.body },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message ?? "Unknown error",
        };
      }

      return {
        success: true,
        messageId: data.messages?.[0]?.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

export const sendTemplateMessage = internalAction({
  args: {
    to: v.string(),
    templateName: v.string(),
    language: v.string(),
    components: v.optional(v.any()),
  },
  handler: async (_ctx, args) => {
    const { BASE_URL, ACCESS_TOKEN } = getConfig();
    console.log(`[WhatsApp] template send: token_len=${ACCESS_TOKEN?.length}, token_prefix=${ACCESS_TOKEN?.slice(0, 10)}, phone_id=${process.env.WHATSAPP_PHONE_NUMBER_ID}`);

    const template: Record<string, unknown> = {
      name: args.templateName,
      language: { code: args.language },
    };

    if (args.components) {
      template.components = args.components;
    }

    try {
      console.log(`[WhatsApp] Sending to ${args.to}, template: ${JSON.stringify(template)}`);
      const response = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: args.to,
          type: "template",
          template,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message ?? "Unknown error",
          errorCode: data.error?.code,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        messageId: data.messages?.[0]?.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

export const markMessageRead = internalAction({
  args: { messageId: v.string() },
  handler: async (_ctx, args) => {
    const { BASE_URL, ACCESS_TOKEN } = getConfig();

    try {
      await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          status: "read",
          message_id: args.messageId,
        }),
      });
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  },
});

export const getApprovedTemplates = internalAction({
  args: {},
  handler: async () => {
    const { ACCESS_TOKEN } = getConfig();
    const BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID!;

    const url = `https://graph.facebook.com/${API_VERSION}/${BUSINESS_ACCOUNT_ID}/message_templates?status=APPROVED&limit=100`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message ?? "Failed to fetch templates");
    }

    return data.data ?? [];
  },
});

export const getTemplates = action({
  args: {},
  handler: async (ctx): Promise<unknown[]> => {
    return await ctx.runAction(internal.whatsapp.getApprovedTemplates);
  },
});
