import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1st Choice Plumbing & Heating — Glasgow's Trusted Plumbers for Over 20 Years",
  description:
    "Gas Safe registered plumbing and heating services in Glasgow. Boiler installs, repairs, gas safety, bathrooms & more. Free quotes. Call 07968 692 870.",
  openGraph: {
    title: "1st Choice Plumbing & Heating — Your New Site",
    description:
      "Gas Safe registered plumbing and heating services in Glasgow and surrounding areas. Over 20 years experience.",
    url: "https://highcroftdigital.com/preview/1st-choice-plumbing",
    type: "website",
  },
};

export default function FirstChoicePlumbingLayout({
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
