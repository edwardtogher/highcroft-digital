"use client";

import { useState } from "react";
import Inbox from "./inbox";
import Chat from "./chat";

type Conversation = {
  _id: string;
  phone: string;
  businessName: string;
  unreadCount: number;
  lastActivity: number;
  lastMessageBody?: string;
  lastMessageDirection?: string;
  lastMessageTimestamp?: number;
  contactStatus?: string;
  windowExpiry?: number | null;
};

export default function CrmPage() {
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);

  return (
    <div className="h-dvh bg-background">
      {activeConvo ? (
        <Chat
          conversation={activeConvo}
          onBack={() => setActiveConvo(null)}
        />
      ) : (
        <Inbox onSelect={setActiveConvo} />
      )}
    </div>
  );
}
