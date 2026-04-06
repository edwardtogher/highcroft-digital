"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

function formatTime(ts: number) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(ts: number) {
  if (!ts) return "";
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Message {
  _id: string;
  body: string;
  direction: "inbound" | "outbound";
  status: string;
  createdAt?: number;
  _creationTime: number;
}

function groupByDate(messages: Message[]) {
  const groups: Array<{ type: "date"; label: string } | ({ type: "message" } & Message)> = [];
  let currentDate: string | null = null;
  for (const msg of messages) {
    const ts = msg.createdAt || msg._creationTime;
    const date = formatDate(ts);
    if (date !== currentDate) {
      currentDate = date;
      groups.push({ type: "date", label: date });
    }
    groups.push({ type: "message", ...msg });
  }
  return groups;
}

interface ChatProps {
  conversation: {
    _id: string;
    phone: string;
    businessName: string;
    unreadCount: number;
    contactStatus?: string;
  };
  onBack: () => void;
}

export default function Chat({ conversation, onBack }: ChatProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messages = useQuery(api.messages.getByConversation, {
    conversationId: conversation._id as Id<"conversations">,
  });
  const sendMessage = useAction(api.sendMessage.send);
  const markRead = useMutation(api.conversations.markRead);

  useEffect(() => {
    if (conversation.unreadCount > 0) {
      markRead({ conversationId: conversation._id as Id<"conversations"> });
    }
  }, [conversation._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  const handleSend = async () => {
    const msg = text.trim();
    if (!msg || sending) return;

    setSending(true);
    setText("");
    try {
      await sendMessage({ phone: conversation.phone, message: msg });
    } catch (err) {
      console.error("Send failed:", err);
      setText(msg);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const items = messages ? groupByDate(messages as Message[]) : [];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-2 py-3 flex items-center gap-2 shrink-0">
        <button
          onClick={onBack}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-primary">
            {(conversation.businessName || "?")[0].toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">
            {conversation.businessName || conversation.phone}
          </div>
          <div className="text-[11px] text-muted-foreground font-mono">
            {conversation.phone}
          </div>
        </div>
        {conversation.contactStatus && (
          <span className="text-[11px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-md shrink-0">
            {conversation.contactStatus}
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-background">
        {!messages && (
          <div className="text-center text-muted-foreground mt-10 text-sm">
            Loading...
          </div>
        )}
        {items.map((item, i) => {
          if (item.type === "date") {
            return (
              <div key={`date-${i}`} className="flex justify-center my-4">
                <span className="bg-card border border-border text-muted-foreground text-[11px] font-mono px-3 py-1 rounded-full">
                  {item.label}
                </span>
              </div>
            );
          }

          const isOutbound = item.direction === "outbound";
          const ts = item.createdAt || item._creationTime;

          return (
            <div
              key={item._id}
              className={`flex mb-2 ${isOutbound ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm shadow-sm ${
                  isOutbound
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap break-words leading-relaxed">
                  {item.body}
                </p>
                <div
                  className={`flex items-center gap-1.5 mt-1 ${isOutbound ? "justify-end" : ""}`}
                >
                  <span
                    className={`text-[10px] ${isOutbound ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                  >
                    {formatTime(ts)}
                  </span>
                  {isOutbound && item.status && (
                    <span
                      className={`text-[10px] ${item.status === "read" ? "text-primary-foreground/80" : "text-primary-foreground/50"}`}
                    >
                      {item.status === "read"
                        ? "Read"
                        : item.status === "delivered"
                          ? "Delivered"
                          : item.status === "sent"
                            ? "Sent"
                            : item.status === "failed"
                              ? "Failed"
                              : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-3 flex items-end gap-3 shrink-0">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 bg-secondary text-foreground rounded-xl px-4 py-2.5 text-sm resize-none outline-none placeholder-muted-foreground focus:ring-2 focus:ring-primary/30 max-h-32 transition-shadow"
          style={{ minHeight: "42px" }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-30 shrink-0 hover:bg-primary/90 active:bg-primary/80 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
