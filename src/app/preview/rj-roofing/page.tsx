"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Star,
  MapPin,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Clock,
  Shield,
  CheckCircle2,
  Home,
  Wrench,
  Layers,
  Droplets,
  Wind,
  Flame,
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

const NAV_LINKS = ["Services", "Reviews", "FAQ", "Contact"];

const SERVICES = [
  {
    icon: Home,
    title: "Roof Replacement",
    desc: "Full roof replacements using quality materials. We assess your roof and recommend the best solution for your budget.",
  },
  {
    icon: Wrench,
    title: "Roof Repairs",
    desc: "Fast, reliable repairs to fix leaks, storm damage, or general wear before small issues become big problems.",
  },
  {
    icon: Layers,
    title: "Flat Roofing",
    desc: "GRP, felt, and bituminous flat roof solutions. Long-lasting, weatherproof finishes for all flat roof types.",
  },
  {
    icon: Wind,
    title: "Soffits & Fascias",
    desc: "UPVC replacement soffits and fascias that look great, require zero maintenance, and last for decades.",
  },
  {
    icon: Droplets,
    title: "Guttering & Downpipes",
    desc: "New guttering and downpipe installations or repairs. Prevent water damage with properly flowing gutters.",
  },
  {
    icon: Flame,
    title: "Chimney & Lead Work",
    desc: "Chimney repointing, flashing, and lead work for valleys and roof junctions. Done properly, built to last.",
  },
];

const REVIEWS = [
  {
    text: "Very polite and professional, did a great job!",
    name: "S. Hobbs",
    location: "Cadnam",
  },
  {
    text: "Highly recommended. Very reliable and trustworthy.",
    name: "K. Reynolds",
    location: "New Forest",
  },
  {
    text: "I contacted Mike and he came out the very next day. Very friendly and helpful. We are very happy with his work.",
    name: "L. Fraser",
    location: "Ringwood",
  },
];

const FAQS = [
  {
    q: "What areas do you cover?",
    a: "We cover Totton, Southampton, New Forest, Romsey, Ringwood, Hythe, Winchester, and surrounding Hampshire areas.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes, all quotations are completely free and come with no obligation. We visit the property to assess the work first.",
  },
  {
    q: "Is your work guaranteed?",
    a: "Yes, all our work comes with a guarantee. We are fully insured and Checkatrade-approved so you can book with confidence.",
  },
  {
    q: "How long will my roof work take?",
    a: "Most repairs are completed in a single day. Full roof replacements typically take 2-5 days depending on size and materials.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function RJRoofingPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <div
      data-theme="rj-roofing"
      className="min-h-screen bg-background text-foreground antialiased"
    >
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <Link href="#" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://randjroofingspecialists.co.uk/wp-content/uploads/2021/03/cropped-R-and-J-Roofing-Specialists-logo.png"
              alt="R & J Roofing Specialists"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="tel:07999795230" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="size-3.5" />
                07999 795230
              </Button>
            </Link>
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileNav ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileNav && (
          <nav className="absolute top-full left-0 right-0 md:hidden bg-background border-t border-border px-5 py-4 space-y-1 shadow-lg">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileNav(false)}
                className="block py-3 text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
            <Link href="tel:07999795230" className="block pt-3">
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="size-4" /> Call Now
              </Button>
            </Link>
          </nav>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-5 bg-background">
        <div className="max-w-6xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Checkatrade 5-Star Rated
          </Badge>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-foreground leading-[1.05] tracking-tight font-[family-name:var(--font-manrope)]">
            Roof repairs &amp; replacements
            <br className="hidden sm:block" />
            across Southampton &amp; Hampshire
          </h1>
          <p className="mt-6 text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
            Family-run roofers covering Totton, Southampton, New Forest and
            surrounding areas. Quality workmanship, honest pricing, every job
            guaranteed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="tel:07999795230">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="size-5" /> Get a Free Quote
              </Button>
            </Link>
            <Link href="#services">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-border text-foreground hover:bg-muted"
              >
                Our Services <ChevronRight className="size-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-muted-foreground text-sm">
            Free quotations &middot; Fully insured &middot; All work guaranteed
          </p>
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────────────────── */}
      <section className="border-y border-border bg-card">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { icon: Star, label: "Checkatrade Approved", sub: "5-Star Rated" },
            { icon: Shield, label: "Fully Insured", sub: "Public liability" },
            {
              icon: CheckCircle2,
              label: "Work Guaranteed",
              sub: "Written guarantee",
            },
            { icon: Phone, label: "Free Quotations", sub: "No obligation" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 py-5 px-5 ${i > 0 ? "border-l border-border" : ""}`}
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-foreground tracking-wide">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {item.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {[
            { value: "5★", label: "Checkatrade" },
            { value: "100%", label: "Satisfaction" },
            { value: "Free", label: "Quotations" },
            { value: "Hampshire", label: "Wide Coverage" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 px-6 text-center ${i > 0 ? "border-l border-primary-foreground/20" : ""}`}
            >
              <div className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-manrope)]">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="py-24 px-5 bg-background">
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-primary block mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-manrope)] mb-16">
            Everything your roof needs,
            <br className="hidden sm:block" /> done properly
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllServices ? SERVICES : SERVICES.slice(0, 3)).map(
              (service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.title}
                    className="group hover:shadow-md transition-shadow duration-200"
                  >
                    <CardHeader>
                      <div className="size-10 flex items-center justify-center rounded-lg bg-primary/10 mb-1">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-semibold font-[family-name:var(--font-manrope)]">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {service.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              }
            )}
          </div>

          {!showAllServices && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllServices(true)}
                className="text-foreground text-xs font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity inline-flex items-center gap-2"
              >
                View All Services <ChevronDown className="size-4" />
              </button>
            </div>
          )}

          <div className="text-center mt-16">
            <p className="text-muted-foreground text-sm mb-6">
              Not sure what you need? Give us a call and we&apos;ll take a
              look.
            </p>
            <Link href="tel:07999795230">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="size-5" /> Call 07999 795230
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section className="py-24 px-5 bg-muted">
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-primary block mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-manrope)] mb-16">
            Simple from start to finish
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Call Us",
                desc: "Give us a call and describe what you need. We arrange a convenient time to visit.",
              },
              {
                step: 2,
                title: "Free Quote",
                desc: "We inspect your roof and give you a clear, honest quote with no hidden extras.",
              },
              {
                step: 3,
                title: "We Get It Done",
                desc: "Our team carries out the work to a high standard, cleaning up fully when done.",
              },
              {
                step: 4,
                title: "Guaranteed",
                desc: "Every job comes with a written guarantee. If anything is not right, we will fix it.",
              },
            ].map((s) => (
              <div key={s.step}>
                <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-4 font-[family-name:var(--font-manrope)]">
                  {s.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2 font-[family-name:var(--font-manrope)]">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <section id="reviews" className="py-24 px-5 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-[11px] tracking-[0.3em] uppercase text-primary block mb-4">
                Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-manrope)]">
                What our customers say
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-[#d4a74a] text-[#d4a74a]"
                  />
                ))}
              </div>
              <span className="text-foreground text-sm font-bold">5.0</span>
              <span className="text-muted-foreground text-xs">Checkatrade</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {REVIEWS.map((review) => (
              <Card key={review.name}>
                <CardHeader>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-3 fill-[#d4a74a] text-[#d4a74a]"
                      />
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
                  <div className="text-foreground text-xs font-bold tracking-[0.1em] uppercase font-[family-name:var(--font-manrope)]">
                    {review.name}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="size-3 text-muted-foreground" />
                    <div className="text-muted-foreground text-[10px]">
                      {review.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-5 bg-card">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-primary block mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-manrope)]">
              Common
              <br />
              Questions
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Give us a call and
              we&apos;ll be happy to help.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-foreground hover:no-underline font-[family-name:var(--font-manrope)]">
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

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 px-5 bg-primary text-primary-foreground"
      >
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-primary-foreground/50 block mb-4">
            Get Started
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-primary-foreground leading-tight tracking-tight font-[family-name:var(--font-manrope)]">
            Ready for a roof
            <br />
            you can rely on?
          </h2>
          <p className="mt-6 text-primary-foreground/70 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Free, no-obligation quotes. We cover Southampton, New Forest, Romsey,
            Ringwood, Hythe, Winchester, and all of Hampshire.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="tel:07999795230">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Phone className="size-5" /> Call 07999 795230
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-primary-foreground/50 text-sm">
            <span className="flex items-center justify-center gap-2">
              <Clock className="size-4" /> Mon - Sat, 8:00 - 18:00
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin className="size-4" /> Totton, Southampton
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-foreground border-t border-border/10 py-6 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-background/40 text-[10px] tracking-[0.15em] uppercase">
            &copy; 2025 R &amp; J Roofing Specialists &middot; Totton,
            Southampton SO40 8EJ
          </span>
          <span className="text-background/30 text-[10px] tracking-[0.15em]">
            Site by{" "}
            <Link
              href="https://highcroftdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background/60 transition-colors"
            >
              Highcroft Digital
            </Link>
          </span>
        </div>
      </footer>

      {/* ── FLOATING CALL (mobile) ────────────────────────────── */}
      <Link
        href="tel:07999795230"
        className="fixed bottom-5 right-5 z-50 md:hidden"
        aria-label="Call R & J Roofing Specialists"
      >
        <Button
          size="icon"
          className="size-16 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Phone className="size-6" />
        </Button>
      </Link>
    </div>
  );
}
