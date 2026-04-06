"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useState, useEffect } from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const PIN = "2379";
const STORAGE_KEY = "scout-chat-auth";

function PinGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [checking, setChecking] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "1") setUnlocked(true);
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN) {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    }
  };

  if (checking) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="h-dvh bg-background flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
          Scout Chat
        </div>
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          autoFocus
          className="w-32 text-center text-2xl tracking-[0.5em] bg-card border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default function CrmLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* PWA + mobile optimizations for standalone mode */}
      <style>{`
        /* Prevent iOS overscroll bounce */
        html, body { overscroll-behavior: none; }
        /* Safe area insets for notched phones */
        .crm-shell { padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); }
        /* Prevent text selection on UI elements */
        button, [role="button"] { -webkit-user-select: none; user-select: none; }
        /* Smooth touch scrolling */
        .overflow-y-auto { -webkit-overflow-scrolling: touch; }
        /* Prevent double-tap zoom on buttons */
        button { touch-action: manipulation; }
      `}</style>
      <div className="crm-shell h-dvh bg-background">
        <ConvexProvider client={convex}>
          <PinGate>{children}</PinGate>
        </ConvexProvider>
      </div>
    </>
  );
}
