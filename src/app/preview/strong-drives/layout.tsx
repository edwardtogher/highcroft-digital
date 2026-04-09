import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strong Drives — Driveways Built to Last | Leicester",
  description:
    "Leicester's 5-star rated driveway specialists. Block paving, resin bound, tarmac, and cobblecrete. Over 20 years experience.",
  openGraph: {
    title: "Strong Drives — Your New Site",
    description:
      "Leicester's 5-star rated driveway specialists. Block paving, resin bound, tarmac, and cobblecrete. Over 20 years experience.",
    url: "https://highcroftdigital.com/preview/strong-drives",
    type: "website",
  },
};

export default function StrongDrivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
