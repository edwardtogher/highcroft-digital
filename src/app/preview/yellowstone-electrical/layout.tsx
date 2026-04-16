import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yellowstone Electrical — NAPIT Certified EV & Smart Home Electricians | Derby",
  description: "Derby's trusted electricians. NAPIT certified, Loxone Silver Partner, and OZEV-approved EV charger specialists. Rewires, EICR reports, smart home systems and more. Call 07305 784337.",
  openGraph: {
    title: "Yellowstone Electrical — EV & Smart Home Electricians Derby",
    description: "NAPIT certified electricians in Derby. EV chargers, Loxone smart home, rewires, EICR reports. Free quotes, fully guaranteed.",
    url: "https://highcroftdigital.com/preview/yellowstone-electrical",
    type: "website",
  },
};

export default function YellowstoneElectricalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ background: "#111111", minHeight: "100vh" }}>{children}</div>;
}
