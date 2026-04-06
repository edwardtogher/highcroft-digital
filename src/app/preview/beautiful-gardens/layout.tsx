import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beautiful Gardens - Coventry & Warwickshire Landscaping Since 1969",
  description:
    "Over 55 years of landscaping excellence. Garden design, block paving, patios, fencing, decking and water features across Coventry and Warwickshire.",
  openGraph: {
    title: "Beautiful Gardens - Coventry & Warwickshire Landscaping Since 1969",
    description:
      "Over 55 years of landscaping excellence. Garden design, block paving, patios, fencing, decking and water features across Coventry and Warwickshire.",
    type: "website",
  },
};

export default function BeautifulGardensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
