import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crescent Power — EV, Solar & Specialist Electricians | Portsmouth",
  description: "Portsmouth's specialist electricians for EV charging, solar PV, battery storage, EICRs and commercial plant fault-finding. Qualified, MCS-compliant. Call 07842 833267.",
  openGraph: {
    title: "Crescent Power — EV, Solar & Specialist Electricians",
    description: "Portsmouth's fault-finding specialists. EV, solar, battery storage and commercial diagnostics.",
    url: "https://highcroftdigital.com/preview/crescent-power",
    type: "website",
  },
};

export default function CrescentPowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ background: "#ffffff", minHeight: "100vh" }}>{children}</div>;
}
