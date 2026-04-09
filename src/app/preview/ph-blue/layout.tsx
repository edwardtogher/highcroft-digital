import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PH Blue — Professional Plumbers & Heating Engineers | Cardiff",
  description:
    "Cardiff's trusted plumbers & heating engineers. Gas Safe registered. Emergency boiler repairs, installations, plumbing & central heating. 24/7 callout.",
  openGraph: {
    title: "PH Blue — Your New Site",
    description:
      "Cardiff's trusted plumbers & heating engineers. Gas Safe registered, Checkatrade approved. 24/7 emergency callouts.",
    url: "https://highcroftdigital.com/preview/ph-blue",
    type: "website",
  },
};

export default function PHBlueLayout({
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
