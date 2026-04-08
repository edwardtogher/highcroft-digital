"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function timeAgo(ts: number) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

interface InboxProps {
  onSelect: (convo: any) => void;
}

export default function Inbox({ onSelect }: InboxProps) {
  const [search, setSearch] = useState("");
  const conversations = useQuery(api.conversations.list, {});

  if (!conversations) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  const filtered = search.trim()
    ? conversations.filter((c) => {
        const q = search.toLowerCase();
        return (
          (c.businessName || "").toLowerCase().includes(q) ||
          (c.phone || "").replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
          (c.lastMessageBody || "").toLowerCase().includes(q)
        );
      })
    : conversations;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4 flex items-center justify-between shrink-0">
        <h1 className="text-lg font-semibold text-foreground font-[var(--font-space-grotesk)]">
          Scout Chat
        </h1>
        <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded-md">
          {filtered.length}
        </span>
      </div>

      {/* Search */}
      <div className="border-b border-border bg-card px-4 py-2.5 shrink-0">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, or message..."
          className="w-full bg-secondary text-foreground text-sm rounded-lg px-3.5 py-2 outline-none placeholder-muted-foreground focus:ring-2 focus:ring-primary/30 transition-shadow"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((convo) => {
          const hasUnread = convo.unreadCount > 0;
          return (
            <button
              key={convo._id}
              onClick={() => onSelect(convo)}
              className="w-full flex items-center gap-3 px-5 py-3.5 border-b border-border hover:bg-secondary/50 active:bg-secondary text-left transition-colors"
            >
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {(convo.businessName || "?")[0].toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span
                    className={`text-sm truncate ${hasUnread ? "font-semibold text-foreground" : "font-medium text-foreground"}`}
                  >
                    {convo.businessName || convo.phone}
                  </span>
                  <span
                    className={`text-[11px] ml-2 shrink-0 ${hasUnread ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {timeAgo(convo.lastMessageTimestamp || convo.lastActivity)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p
                    className={`text-[13px] truncate ${hasUnread ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {convo.lastMessageDirection === "outbound" && (
                      <span className="text-muted-foreground">You: </span>
                    )}
                    {convo.lastMessageBody || "No messages yet"}
                  </p>
                  {hasUnread && (
                    <span className="ml-2 bg-primary text-primary-foreground text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                      {convo.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground mt-20 text-sm">
            No conversations
          </div>
        )}
      </div>
    </div>
  );
}
