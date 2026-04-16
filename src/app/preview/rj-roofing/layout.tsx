import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "R & J Roofing Specialists | Roofers in Southampton & Hampshire",
  description:
    "Family-run roofers covering Southampton, Totton, New Forest and Hampshire. Roof replacements, repairs, flat roofing, soffits & fascias. Checkatrade 5-star rated. Free quotes.",
  openGraph: {
    title: "R & J Roofing Specialists | Roofers in Southampton & Hampshire",
    description:
      "Family-run roofers covering Southampton, Totton, New Forest and Hampshire. Free quotes. All work guaranteed.",
    url: "https://highcroftdigital.com/preview/rj-roofing",
    type: "website",
  },
};

export default function RJRoofingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
