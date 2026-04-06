import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono, Space_Grotesk, DM_Sans, DM_Serif_Display, Oswald } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Highcroft Digital | Websites, AI Agents & Automation for UK Businesses",
  description:
    "Software studio in Surrey, UK. Custom websites, AI voice agents, and automation systems for businesses. No templates -- real code, built to perform.",
  metadataBase: new URL("https://highcroftdigital.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Highcroft Digital | Websites, AI Agents & Automation for UK Businesses",
    description:
      "Software studio in Surrey, UK. Custom websites, AI voice agents, and automation systems for businesses. No templates -- real code, built to perform.",
    url: "https://highcroftdigital.com",
    images: [
      {
        url: "https://highcroftdigital.com/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Highcroft Digital | Websites, AI Agents & Automation for UK Businesses",
    description:
      "Software studio in Surrey, UK. Custom websites, AI voice agents, and automation systems for businesses. No templates -- real code, built to perform.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Highcroft Digital",
  description:
    "Software studio in Surrey, UK. Custom websites, AI voice agents, and automation systems for businesses. No templates -- real code, built to perform.",
  url: "https://highcroftdigital.com",
  telephone: "+447752502379",
  email: "ed@highcroftdigital.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surrey",
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  serviceType: [
    "Website Design",
    "AI Voice Agents",
    "Lead Automation",
    "Custom AI Solutions",
  ],
  foundingDate: "2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${dmSerifDisplay.variable} ${oswald.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* PWA manifest for Scout Chat (/crm) */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Scout" />
        <link rel="apple-touch-icon" href="/scout-icon-192.svg" />
        <meta name="theme-color" content="#225095" />
      </head>
      <body>{children}</body>
    </html>
  );
}
