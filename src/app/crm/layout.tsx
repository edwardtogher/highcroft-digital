"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useState } from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

function PinGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");

  if (unlocked) return <>{children}</>;

  return (
    <div className="h-dvh bg-background flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pin === "2379") setUnlocked(true);
        }}
        className="flex flex-col items-center gap-4"
      >
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
    <ConvexProvider client={convex}>
      <PinGate>{children}</PinGate>
    </ConvexProvider>
  );
}
