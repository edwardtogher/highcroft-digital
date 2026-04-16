import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3A Electrical LTD | Qualified Electricians in Wolverhampton",
  description:
    "Fully qualified electricians based in Wolverhampton. Domestic rewiring, consumer unit upgrades, EICR certificates, commercial electrical work. Free quotes. 35+ years experience.",
  openGraph: {
    title: "3A Electrical LTD | Qualified Electricians in Wolverhampton",
    description:
      "Domestic, commercial and industrial electrical work. Free estimates, certified workmanship. Covering Wolverhampton and the West Midlands.",
    url: "https://highcroftdigital.com/preview/3a-electrical",
    type: "website",
  },
};

export default function ThreeAElectricalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
