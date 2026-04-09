import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hucknall Electrical — Nottingham's Trusted Electricians Since 2006",
  description:
    "NICEIC approved electricians in Hucknall, Nottingham. Rewires, lighting, alarms & more. Free quotes. Call 0115 956 5550.",
  openGraph: {
    title: "Hucknall Electrical — Your New Site",
    description:
      "NICEIC approved electricians in Hucknall, Nottingham. Rewires, lighting, alarms & more. Free quotes.",
    url: "https://highcroftdigital.com/preview/hucknall-electrical",
    type: "website",
  },
};

export default function HucknallElectricalLayout({
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
