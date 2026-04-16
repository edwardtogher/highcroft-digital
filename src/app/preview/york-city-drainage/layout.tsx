import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "York City Drainage — Rapid Drain Unblocking from £45 | York",
  description: "York's trusted drainage specialists. Blocked drains, CCTV surveys, sewer clearance, and septic tank emptying. Fully guaranteed work. Call 01904 339 434.",
  openGraph: {
    title: "York City Drainage — Rapid Drain Unblocking from £45",
    description: "York's trusted drainage specialists. Rapid response, fully guaranteed, free estimates.",
    url: "https://highcroftdigital.com/preview/york-city-drainage",
    type: "website",
  },
};

export default function YorkCityDrainageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ background: "#ffffff", minHeight: "100vh" }}>{children}</div>;
}
