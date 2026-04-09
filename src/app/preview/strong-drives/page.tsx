"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Star,
  MapPin,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Mail,
  Clock,
  Shield,
  CreditCard,
  CheckCircle2,
  Hammer,
  Droplets,
  Layers,
  TreePine,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = ["Services", "Gallery", "Reviews", "FAQ", "Contact"];

const SERVICES = [
  {
    icon: LayoutGrid,
    title: "Block Paving",
    desc: "Traditional and modern block paving in a wide range of patterns and colours. Durable, versatile, and built to last.",
  },
  {
    icon: Droplets,
    title: "Resin Bound",
    desc: "VUBAR registered installer. Smooth, permeable, and low-maintenance resin bound surfaces. SuDS compliant.",
  },
  {
    icon: Hammer,
    title: "Tarmac",
    desc: "Hard-wearing tarmac for a clean, professional finish. Ideal for larger driveways and commercial areas.",
  },
  {
    icon: Layers,
    title: "Cobblecrete",
    desc: "Pattern imprinted concrete with the look of natural stone. Virtually maintenance-free.",
  },
  {
    icon: TreePine,
    title: "Landscaping",
    desc: "Complete transformations including patios, fencing, turfing, and drainage solutions.",
  },
];

const GALLERY = [
  { src: "https://img1.wsimg.com/isteam/ip/6b1dae52-b14c-4034-b14e-4fcdf6efea56/jay%20photo%20%201%20jpg.jpg", alt: "Resin bound driveway" },
  { src: "https://img1.wsimg.com/isteam/ip/6b1dae52-b14c-4034-b14e-4fcdf6efea56/jay3%20.jpg", alt: "Block paving project" },
  { src: "https://img1.wsimg.com/isteam/ip/6b1dae52-b14c-4034-b14e-4fcdf6efea56/jay4%20-e4db3d8.jpg", alt: "Full driveway transformation" },
  { src: "https://img1.wsimg.com/isteam/ip/6b1dae52-b14c-4034-b14e-4fcdf6efea56/jay%205.JPG", alt: "Driveway and landscaping" },
  { src: "https://img1.wsimg.com/isteam/ip/6b1dae52-b14c-4034-b14e-4fcdf6efea56/jay%206.JPG", alt: "Tarmac finish" },
];

const REVIEWS = [
  {
    text: "Great work, no delays and finished on time. The team were professional from start to finish. Really pleased with how the driveway turned out.",
    name: "James W.",
    location: "Groby",
  },
  {
    text: "Top quality service from reliable tradesmen, look no further! Completely transformed our front garden into a beautiful block paved driveway.",
    name: "Sarah M.",
    location: "Leicester",
  },
  {
    text: "Amazing work from the lads. They kept us informed every step of the way and the finished result exceeded our expectations.",
    name: "David P.",
    location: "Anstey",
  },
];

const FAQS = [
  {
    q: "How long does a new driveway take?",
    a: "Most driveways are completed within 3-5 working days, depending on size and materials. We always agree a timeline before starting work.",
  },
  {
    q: "Do you offer finance?",
    a: "Yes, we offer flexible finance options to spread the cost. Ask us for details when you get your free quote.",
  },
  {
    q: "What areas do you cover?",
    a: "We are based in Groby and cover all of Leicester, Leicestershire, and surrounding areas including Anstey, Ratby, Markfield, and beyond.",
  },
  {
    q: "Are your driveways guaranteed?",
    a: "Yes, all our work comes with a written guarantee. We use premium materials and our team has over 20 years of experience.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function StrongDrivesPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);

  return (
    <div data-theme="strong-drives" className="min-h-screen bg-background text-muted-foreground antialiased">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <Link href="#">
            <Image
              src="/strong-drives-logo-t.png"
              alt="Strong Drives"
              width={160}
              height={58}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="tel:07535687080" className="hidden sm:block">
              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white hover:text-black" style={{ color: '#ffffff' }}>
                <Phone className="size-3.5" />
                07535 687080
              </Button>
            </Link>
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {mobileNav ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileNav && (
          <nav className="absolute top-full left-0 right-0 md:hidden bg-[#0a0a0a] border-t border-white/[0.06] px-5 py-4 space-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" style={{ color: '#ffffff' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileNav(false)}
                className="block py-3 text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
                style={{ color: '#ffffff' }}
              >
                {link}
              </a>
            ))}
            <Link href="tel:07535687080" className="block pt-3">
              <Button size="lg" className="w-full bg-white text-black hover:bg-white/90">
                <Phone className="size-4" /> Call Now
              </Button>
            </Link>
          </nav>
        )}
      </header>

      {/* ── HERO (sticky — content scrolls over it) ─────────── */}
      <div className="h-screen" /> {/* spacer so content starts after hero */}
      <section className="fixed inset-0 z-0 flex flex-col items-center justify-between text-center bg-[#0a0a0a] pt-16">
        {/* Logo + services — centred */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-8">
          <Image
            src="/strong-drives-logo-t.png"
            alt="Strong Drives"
            width={688}
            height={250}
            className="h-36 sm:h-48 md:h-56 w-auto"
            priority
          />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/40">
            <span>Block Paving</span>
            <span className="text-white/15">|</span>
            <span>Resin Bound</span>
            <span className="text-white/15">|</span>
            <span>Tarmac</span>
            <span className="text-white/15">|</span>
            <span>Landscaping</span>
          </div>
        </div>

        {/* Buttons + scroll arrow — pinned to bottom */}
        <div className="w-full px-5 pb-10 flex flex-col items-center gap-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link href="tel:07535687080" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-black hover:bg-white/90">
                <Phone className="size-5" /> Get a Free Quote
              </Button>
            </Link>
            <Link href="#gallery" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-black hover:bg-white/90">
                View Our Work <ChevronRight className="size-5" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
            <ChevronDown className="size-7 text-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── CONTENT (scrolls over hero) ─────────────────────── */}
      <div className="relative z-10 bg-background rounded-t-3xl -mt-8 shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {[
            { value: "20+", label: "Years Experience" },
            { value: "5.0", label: "Google Rating" },
            { value: "500+", label: "Driveways Built" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-10 px-5 sm:px-8 ${i > 0 ? "border-l border-border" : ""}`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-foreground font-[family-name:var(--font-oswald)]">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" style={{ paddingTop: 120, paddingBottom: 120 }} className="px-5">
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground block" style={{ marginBottom: 16 }}>
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-oswald)] uppercase" style={{ marginBottom: 60 }}>
            Everything from block paving
            <br className="hidden sm:block" /> to complete landscaping
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllServices ? SERVICES : SERVICES.slice(0, 3)).map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group hover:bg-accent transition-colors duration-300">
                  <CardHeader>
                    <div className="size-10 flex items-center justify-center rounded-lg border border-border mb-1 group-hover:border-foreground/20 transition-colors">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <CardTitle className="text-sm tracking-wide uppercase font-[family-name:var(--font-oswald)]">
                      {service.title}
                    </CardTitle>
                    <CardDescription>{service.desc}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}

            {showAllServices && (
              <Card className="bg-accent">
                <CardHeader>
                  <div className="size-10 flex items-center justify-center rounded-lg border border-border mb-1">
                    <CreditCard className="size-5 text-foreground" />
                  </div>
                  <CardTitle className="text-sm tracking-wide uppercase font-[family-name:var(--font-oswald)]">
                    Finance Available
                  </CardTitle>
                  <CardDescription>
                    Flexible finance options to spread the cost. Ask us for details when you get your free quote.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>

          {!showAllServices && (
            <div className="text-center" style={{ marginTop: 32 }}>
              <button
                onClick={() => setShowAllServices(true)}
                className="text-foreground text-xs font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity inline-flex items-center gap-2"
              >
                View All Services <ChevronDown className="size-4" />
              </button>
            </div>
          )}

          <div className="text-center" style={{ marginTop: 100 }}>
            <p className="text-muted-foreground text-sm" style={{ marginBottom: 24 }}>Not sure which option is right for you? We&apos;ll help you choose.</p>
            <Link href="tel:07535687080">
              <Button size="lg" className="h-14 px-8 text-base bg-black text-white hover:bg-black/85">
                <Phone className="size-5" /> Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section id="gallery" className="bg-[#0a0a0a] px-5" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 block" style={{ marginBottom: 16 }}>
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-oswald)] uppercase" style={{ marginBottom: 48 }}>
            Recent Projects
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(showAllGallery ? GALLERY : GALLERY.slice(0, 3)).map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl group ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <div className={`relative w-full ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white text-xs font-bold tracking-[0.15em] uppercase">{img.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showAllGallery && (
            <div className="text-center" style={{ marginTop: 32 }}>
              <button
                onClick={() => setShowAllGallery(true)}
                className="text-white/60 text-xs font-bold tracking-[0.15em] uppercase hover:text-white transition-colors inline-flex items-center gap-2"
              >
                View More Projects <ChevronDown className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <section id="reviews" className="bg-background px-5" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8" style={{ marginBottom: 48 }}>
            <div>
              <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground block" style={{ marginBottom: 16 }}>
                Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-oswald)] uppercase">
                See Why Our Clients
                <br />Love Strong Drives
              </h2>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-foreground text-foreground" />
                ))}
              </div>
              <span className="text-foreground text-sm font-bold">5.0</span>
              <span className="text-muted-foreground text-xs">on Google</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {REVIEWS.map((review) => (
              <Card key={review.name}>
                <CardHeader>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3 fill-foreground text-foreground" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-card-foreground text-sm leading-[1.8]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </CardContent>
                <CardContent>
                  <Separator className="mb-4" />
                  <div className="text-foreground text-xs font-bold tracking-[0.15em] uppercase">
                    {review.name}
                  </div>
                  <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase mt-0.5">
                    {review.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 80 }}>
            <p className="text-muted-foreground text-sm" style={{ marginBottom: 24 }}>Join hundreds of happy customers across Leicester.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:07535687080">
                <Button size="lg" className="h-14 px-8 text-base bg-black text-white hover:bg-black/85">
                  <Phone className="size-5" /> Call Us Today
                </Button>
              </Link>
              <Link href="mailto:strongdrive55@gmail.com">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base border-black/20 text-black hover:bg-black/5">
                  <Mail className="size-5" /> Email for a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="bg-card px-5" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground block" style={{ marginBottom: 16 }}>
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-oswald)] uppercase">
              Common
              <br />Questions
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Can&apos;t find what you&apos;re looking for?
              Give us a call and we&apos;ll be happy to help.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA / CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="sticky top-0 bg-[#0a0a0a] text-white rounded-t-3xl px-5 shadow-[0_-20px_60px_rgba(0,0,0,0.4)]" style={{ paddingTop: 100, paddingBottom: 100, zIndex: 2 }}>
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 block mb-4">
            Get Started
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-[0.95] tracking-tight font-[family-name:var(--font-oswald)] uppercase">
            Ready to transform
            <br />your driveway?
          </h2>

          <p className="mt-6 text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Get in touch for a free, no-obligation quote. We cover all of Leicester and Leicestershire.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="tel:07535687080" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-black hover:bg-white/90">
                <Phone className="size-5" /> Call 07535 687080
              </Button>
            </Link>
            <Link href="mailto:strongdrive55@gmail.com" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base border-white/20 hover:bg-white/10" style={{ color: '#ffffff' }}>
                <Mail className="size-5" /> Email Us
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 text-white/40 text-sm">
            <span className="flex items-center justify-center gap-2">
              <Clock className="size-4" /> Mon - Fri, 9:00 - 17:00
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin className="size-4" /> Groby, Leicester
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-[#0a0a0a] border-t border-white/[0.06] py-6 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-white/30 text-[10px] tracking-[0.15em] uppercase">
            &copy; 2025 Strong Drives &middot; Newtown Linford Lane, Groby LE6 0EA
          </span>
          <span className="text-white/20 text-[10px] tracking-[0.15em]">
            Site by{" "}
            <Link
              href="https://highcroftdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Highcroft Digital
            </Link>
          </span>
        </div>
      </footer>

      </div> {/* end content wrapper */}

      {/* ── FLOATING CALL (mobile) ────────────────────────────── */}
      <Link
        href="tel:07535687080"
        className="fixed bottom-5 right-5 z-50 md:hidden"
        aria-label="Call Strong Drives"
      >
        <Button size="icon" className="size-16 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-black text-white hover:bg-black/85">
          <Phone className="size-6" />
        </Button>
      </Link>
    </div>
  );
}
