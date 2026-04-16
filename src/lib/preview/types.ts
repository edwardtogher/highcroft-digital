/**
 * SiteConfig — the schema a build subagent fills after scraping a lead's website.
 *
 * Not consumed at runtime. This is documentation for the subagent: after scraping
 * the business website, extracting logo colors, and applying the decision framework,
 * the subagent mentally fills this schema, then writes a standalone page.tsx that
 * hardcodes all values as constants (matching the strong-drives/page.tsx pattern).
 */

export interface SiteConfig {
  // --- Identity ---
  slug: string; // kebab-case URL segment (e.g. "york-city-drainage")
  businessName: string;
  phone: string; // UK format, e.g. "07877 977437"
  email?: string;
  town: string;
  niche: string; // electrician, plumber, roofer, landscaper, etc.

  // --- Brand ---
  logoUrl: string; // direct URL to their logo image
  theme: "light" | "dark";
  font:
    | "sora" // premium / design-conscious
    | "space-grotesk" // fun / playful / bold
    | "manrope" // friendly / community / approachable
    | "plus-jakarta" // professional / corporate / serious
    | "oswald" // bold / blocky / condensed logo
    | "barlow" // industrial / no-nonsense
    | "inter"; // safe default
  colors: {
    primary: string; // main accent hex (from logo extraction)
    primaryHover: string; // ~10% darker
    primarySoft: string; // very light tint for backgrounds
    secondary?: string; // optional second brand color
    background: string; // page background
    foreground: string; // main text color
    card: string; // card background
    cardForeground: string; // card text
    muted: string; // subtle backgrounds
    mutedForeground: string; // subtle text
    stars: string; // review stars — always "#d4a74a" unless brand has gold
  };

  // --- Hero ---
  heroHeadline: string; // e.g. "Driveways Built to Last"
  heroBadge: string; // differentiator badge, e.g. "20+ Years Experience"
  heroSubtitle: string;
  heroCta: string; // primary CTA text, e.g. "Get a Free Quote"

  // --- Content Sections ---
  trustItems: Array<{
    icon: string; // Lucide icon name, e.g. "Shield"
    title: string;
    desc: string;
  }>;

  stats?: Array<{
    value: string; // e.g. "20+"
    label: string; // e.g. "Years Experience"
  }>;

  services: Array<{
    icon: string; // Lucide icon name
    title: string;
    desc: string;
  }>;

  processSteps: Array<{
    step: number;
    title: string;
    desc: string;
  }>;

  reviews: Array<{
    text: string;
    name: string;
    location?: string;
  }>;

  faqs: Array<{
    q: string;
    a: string;
  }>;

  areasServed: string[];

  // --- Optional ---
  accreditations?: Array<{ label: string; icon?: string }>;
  gallery?: Array<{ src: string; alt: string }>;
  yearEstablished?: string;
  googleRating?: string;
  reviewCount?: string;
}
