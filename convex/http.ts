import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

// Orbit POSTs inbound WhatsApp messages here
http.route({
  path: "/orbit/inbound",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const messageId = await ctx.runMutation(api.messages.addInbound, {
      phone: body.phone,
      metaMessageId: body.metaMessageId || undefined,
      fromNumber: body.fromNumber,
      toNumber: body.toNumber,
      body: body.body,
      timestamp: body.timestamp,
      contactName: body.contactName || undefined,
    });
    return Response.json({ ok: true, messageId });
  }),
});

// Orbit POSTs outbound messages (Eva/Echo replies) here
http.route({
  path: "/orbit/outbound",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const messageId = await ctx.runMutation(api.messages.addOutbound, {
      phone: body.phone,
      metaMessageId: body.metaMessageId || undefined,
      fromNumber: body.fromNumber || "orbit",
      toNumber: body.toNumber || body.phone,
      body: body.body,
      timestamp: body.timestamp || Date.now(),
      messageType: body.messageType || "text",
      templateName: body.templateName || undefined,
    });
    return Response.json({ ok: true, messageId });
  }),
});

// Orbit POSTs delivery status updates here
http.route({
  path: "/orbit/status",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const messageId = await ctx.runMutation(api.messages.updateStatus, {
      metaMessageId: body.metaMessageId,
      status: body.status,
      errorMessage: body.errorMessage || undefined,
      timestamp: body.timestamp,
    });
    return Response.json({ ok: true, messageId });
  }),
});

// Echo context: returns contact + messages + conversation for a phone
http.route({
  path: "/orbit/echo-context",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const contact = await ctx.runQuery(api.contacts.getByPhone, { phone: body.phone });
    const messages = await ctx.runQuery(api.messages.getByPhone, { phone: body.phone });
    const conversation = await ctx.runQuery(api.conversations.getByPhone, { phone: body.phone });
    return Response.json({ ok: true, contact, messages, conversation });
  }),
});

// Update contact fields by phone. Used by Echo, send-templates, enrich, qualify.
http.route({
  path: "/orbit/contact-update",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const result = await ctx.runMutation(api.contacts.updateByPhone, body);
    return Response.json({ ok: true, contactId: result });
  }),
});

// Bulk import contacts from scout pipeline
http.route({
  path: "/orbit/contact-import",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const result = await ctx.runMutation(api.contacts.bulkUpsertScout, {
      contacts: body.contacts,
    });
    return Response.json({ ok: true, ...result });
  }),
});

// Scout queue operations
http.route({
  path: "/orbit/scout-queue",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const action = body.action;

    if (action === "next") {
      const task = await ctx.runQuery(api.scoutQueue.getNext, {});
      return Response.json({ ok: true, task });
    } else if (action === "in_progress") {
      await ctx.runMutation(api.scoutQueue.markInProgress, {
        taskId: body.taskId,
        batchName: body.batchName,
      });
      return Response.json({ ok: true });
    } else if (action === "done") {
      await ctx.runMutation(api.scoutQueue.markDone, {
        taskId: body.taskId,
        leadsFound: body.leadsFound,
        leadsWithMobile: body.leadsWithMobile,
      });
      return Response.json({ ok: true });
    } else if (action === "create") {
      const id = await ctx.runMutation(api.scoutQueue.create, {
        searchTerm: body.searchTerm,
        area: body.area,
        priority: body.priority,
        notes: body.notes,
      });
      return Response.json({ ok: true, taskId: id });
    } else if (action === "count") {
      const count = await ctx.runQuery(api.scoutQueue.countByStatus, {
        contactStatus: body.contactStatus ?? "ready",
      });
      return Response.json({ ok: true, count });
    } else {
      return Response.json({ ok: false, error: "Unknown action" }, { status: 400 });
    }
  }),
});

// Query contacts by status with optional filters
http.route({
  path: "/orbit/leads-query",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const contacts = await ctx.runQuery(api.contacts.queryByStatus, {
      contactStatus: body.contactStatus,
      batch: body.batch,
      type: body.type,
      limit: body.limit,
    });
    return Response.json({ ok: true, contacts });
  }),
});

// Get all phone numbers for dedup
http.route({
  path: "/orbit/phones-for-dedup",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const header = request.headers.get("x-orbit-secret");
    if (header !== "scout-orbit-sync-2026") {
      return new Response("Unauthorized", { status: 401 });
    }
    const phones = await ctx.runQuery(api.contacts.allPhones, {});
    return Response.json({ ok: true, phones });
  }),
});

export default http;
