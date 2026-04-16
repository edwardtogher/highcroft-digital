import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A.T Heating & Plumbing | Gas Safe Engineers in Cardiff",
  description:
    "Family-run Gas Safe registered heating and plumbing engineers in Cardiff. Approved Baxi boiler installers. Boiler installation, servicing, repairs, central heating, landlord gas safety certificates.",
  openGraph: {
    title: "A.T Heating & Plumbing | Gas Safe Engineers in Cardiff",
    description:
      "Approved Baxi boiler installers. Gas Safe registered. Covering Cardiff and surrounding areas. Free quotes.",
    url: "https://highcroftdigital.com/preview/at-heating-plumbing",
    type: "website",
  },
};

export default function ATHeatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
