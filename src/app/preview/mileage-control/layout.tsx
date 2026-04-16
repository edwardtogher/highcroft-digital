import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mileage Control Leicester — ECU Remapping, Diagnostics & Immobilisers",
  description: "Leicester's mobile ECU remapping and diagnostics specialists. More power, better economy, fault-finding with dealer-level kit. Call 07873 300 553.",
  openGraph: {
    title: "Mileage Control Leicester — ECU Remapping & Diagnostics",
    description: "Mobile performance tuning and dealer-level diagnostics across Leicester.",
    url: "https://highcroftdigital.com/preview/mileage-control",
    type: "website",
  },
};

export default function MileageControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ background: "#ffffff", minHeight: "100vh" }}>{children}</div>;
}
