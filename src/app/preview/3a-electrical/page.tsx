"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Star,
  MapPin,
  ChevronRight,
  Menu,
  X,
  Mail,
  Clock,
  Shield,
  CheckCircle2,
  Zap,
  Wrench,
  Building2,
  Search,
  Lightbulb,
  ClipboardCheck,
  Award,
  BadgePoundSterling,
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

const NAV_LINKS = ["Services", "Pricing", "Reviews", "FAQ", "Contact"];

const TRUST_ITEMS = [
  {
    icon: Zap,
    title: "Domestic & Commercial",
    desc: "From home rewires to full commercial fit-outs, we handle every scale of electrical work with the same care and expertise.",
  },
  {
    icon: Shield,
    title: "Certified Work",
    desc: "All our electrical work is completed to current regulations and fully certified. Every job comes with the relevant documentation.",
  },
  {
    icon: BadgePoundSterling,
    title: "Free Estimates",
    desc: "We'll visit, assess, and give you a clear honest quote before any work starts. No obligation, no pressure.",
  },
  {
    icon: Award,
    title: "35+ Years Experience",
    desc: "Our team brings over 35 years of combined electrical expertise to every job — domestic, commercial, and industrial.",
  },
];

const STATS = [
  { value: "20+", label: "Years in Business" },
  { value: "35+", label: "Years Experience" },
  { value: "100%", label: "Work Certified" },
  { value: "Free", label: "Quotes & Estimates" },
];

const SERVICES = [
  {
    icon: Wrench,
    title: "Domestic Rewiring",
    desc: "Full and partial rewires for homes. Upgrading old wiring, adding circuits, and extending sockets and lighting to current standards.",
    price: "Free Quote",
  },
  {
    icon: Building2,
    title: "Commercial Electrical",
    desc: "Office fit-outs, retail units, and commercial premises wired and maintained to BS7671 standards. Industrial work also undertaken.",
    price: "Free Quote",
  },
  {
    icon: Zap,
    title: "Consumer Unit Upgrades",
    desc: "Modern consumer units installed, old fuse boards replaced. Essential for safety and often required by insurance companies.",
    price: "Free Quote",
  },
  {
    icon: ClipboardCheck,
    title: "EICR Certificates",
    desc: "Electrical Installation Condition Reports for landlords, buyers, and insurers. Thorough inspection with fast certificate turnaround.",
    price: "From Quote",
  },
  {
    icon: Search,
    title: "Fault Finding & Repairs",
    desc: "Expert diagnosis and repair of electrical faults — from tripping circuits and RCD issues to complete power loss.",
    price: "Call Us",
  },
  {
    icon: Lightbulb,
    title: "Lighting Solutions",
    desc: "New circuits, downlights, security lighting, outdoor and garden lighting. Supply and fit, or install your own fittings.",
    price: "Free Quote",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Call Us",
    desc: "Ring 07973 381 458. Tell us what you need and we'll give you straight, honest advice about the best approach.",
  },
  {
    step: 2,
    title: "Free Quote",
    desc: "We'll come out, assess the job properly, and give you a clear no-obligation price before anything starts.",
  },
  {
    step: 3,
    title: "Qualified Work",
    desc: "Experienced engineers on site with the right kit. Work carried out to current regulations with full attention to detail.",
  },
  {
    step: 4,
    title: "Certified",
    desc: "All work certified and documented. You get the full paperwork — proper compliance and real peace of mind.",
  },
];

const REVIEWS = [
  {
    text: "Had 3A Electrical sort our consumer unit and add a few extra sockets. Arrived on time, professional throughout, and left everything clean. Fair prices too.",
    name: "Paul M.",
    location: "Wolverhampton",
  },
  {
    text: "Used them for our shop rewire — they worked around our trading hours, no fuss, and finished on schedule. EICR certificate came through the same day. Really reliable.",
    name: "Karen T.",
    location: "Bilston",
  },
  {
    text: "Called on a Wednesday for a fault finding job, they were out Thursday morning. Found the problem quickly and had it fixed in the same visit. Brilliant service.",
    name: "David H.",
    location: "Wombourne",
  },
];

const FAQS = [
  {
    q: "Do you carry out both domestic and commercial electrical work?",
    a: "Yes — we work across all sectors. Whether it's your home, your shop, or an industrial unit, we have the expertise and certifications to handle the job properly.",
  },
  {
    q: "Is all your work certified?",
    a: "Yes. All installation work is completed to BS7671 regulations and comes with the relevant certification. EICR reports are available for landlord and property inspections.",
  },
  {
    q: "What areas do you cover?",
    a: "We're based in Wolverhampton and cover the wider West Midlands — including Walsall, Dudley, Bilston, Wednesfield, Tettenhall, Wombourne, and surrounding areas.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes — all quotes are completely free and no-obligation. We'll assess the job properly and give you a clear price before any work starts.",
  },
];

const AREAS = [
  "Wolverhampton",
  "Walsall",
  "Dudley",
  "Bilston",
  "Wednesfield",
  "Tettenhall",
  "Wombourne",
  "Codsall",
  "Stourbridge",
  "Bridgnorth",
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ThreeAElectricalPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div data-theme="3a-electrical" className="min-h-screen bg-background text-foreground antialiased font-[family-name:var(--font-barlow)]">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <Link href="#" className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="size-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-foreground tracking-tight uppercase">3A</span>
              <span className="text-[10px] font-semibold text-primary tracking-[0.2em] uppercase">Electrical</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="tel:07973381458" className="hidden sm:block">
              <Button size="sm" className="bg-primary hover:bg-[#c8002e] text-white h-10 px-4 font-bold uppercase tracking-wide text-xs">
                <Phone className="size-3.5" />
                07973 381 458
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
                className="block py-3 text-sm font-semibold tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <Link href="tel:07973381458" className="block pt-3">
              <Button size="lg" className="w-full bg-primary hover:bg-[#c8002e] text-white font-bold uppercase tracking-wide">
                <Phone className="size-4" /> Call 07973 381 458
              </Button>
            </Link>
          </nav>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="min-h-[100svh] sm:min-h-0 flex flex-col pt-20 pb-6 sm:pt-32 sm:pb-20 px-5 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-5xl mx-auto text-center flex flex-col flex-1 w-full">

          {/* Top: badge */}
          <div className="pt-4 sm:pt-0">
            <Badge className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/15 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
              <Zap className="size-3 mr-1" />
              35+ Years&apos; Electrical Experience
            </Badge>
          </div>

          {/* Middle: headline + subtitle — flex-1 fills available height */}
          <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
            <h1 className="text-[3rem] sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight uppercase leading-[1] sm:leading-[0.95]">
              Wolverhampton&apos;s
              <br />
              <span className="text-primary">Trusted </span>
              <span className="text-[#c8002e]">Electricians.</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fully qualified electricians serving Wolverhampton and the West Midlands. Domestic, commercial, and industrial — all work certified and fully guaranteed.
            </p>
          </div>

          {/* Bottom: buttons + trust checkmarks (thumb zone on mobile) */}
          <div className="flex flex-col gap-5 sm:gap-7">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full sm:w-auto">
              <Link href="tel:07973381458" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-primary hover:bg-[#c8002e] text-white font-bold uppercase tracking-wide">
                  <Phone className="size-5" /> Call 07973 381 458
                </Button>
              </Link>
              <Link href="#services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-wide border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Our Services <ChevronRight className="size-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-muted-foreground">
              <span className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> Free Quotes</span>
              <span className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> Fully Insured</span>
              <span className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> All Work Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground px-5 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-start gap-3">
                <div className="size-12 flex items-center justify-center rounded-lg bg-[#c8002e]">
                  <Icon className="size-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wide text-primary-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-5 sm:px-8 text-center ${i > 0 ? "border-l border-border" : ""}`}
            >
              <div className="text-3xl sm:text-4xl font-black text-primary uppercase">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="px-5 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c8002e] block mb-4">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Every electrical job,<br />done properly.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              From consumer unit upgrades to full commercial rewires — 35 years of experience means we&apos;ve seen it all. All work completed to current standards and fully certified.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group hover:border-primary/40 transition-colors duration-300 border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="size-11 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                        <Icon className="size-5 text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-bold tracking-wide uppercase text-[#c8002e]">
                        {service.price}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold tracking-wide uppercase">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{service.desc}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section className="bg-muted px-5 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c8002e] block mb-4">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Call to certified<br />in 4 simple steps.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-black text-[#c8002e]/20 leading-none mb-3">
                  {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <section id="reviews" className="bg-background px-5 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
            <div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c8002e] block mb-4">
                What Customers Say
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
                Trusted by homes<br />and businesses<br />across Wolverhampton.
              </h2>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5" style={{ fill: "#d4a74a", color: "#d4a74a" }} />
                ))}
              </div>
              <span className="text-foreground text-base font-bold">5.0</span>
              <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Google Rated</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {REVIEWS.map((review) => (
              <Card key={review.name} className="border-2">
                <CardHeader>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3.5" style={{ fill: "#d4a74a", color: "#d4a74a" }} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-card-foreground text-sm leading-[1.75]">
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
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="bg-muted px-5 py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c8002e] block mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Common<br />questions.
            </h2>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
              Can&apos;t find the answer you need? Call us on 07973 381 458 — we&apos;re happy to help.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-foreground font-bold uppercase tracking-wide text-sm hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA / CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="bg-primary text-primary-foreground px-5 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#c8002e]/30 text-white border-white/20 hover:bg-[#c8002e]/40 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Zap className="size-3 mr-1" />
            Free Quotes — No Obligation
          </Badge>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tight uppercase">
            Need an electrician?<br />Call us.
          </h2>

          <p className="mt-6 text-primary-foreground/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Free, no-obligation estimates. All work certified. Covering Wolverhampton and the wider West Midlands.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="tel:07973381458" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-16 px-8 text-base bg-[#c8002e] hover:bg-[#a80025] text-white font-bold uppercase tracking-wide">
                <Phone className="size-5" /> 07973 381 458
              </Button>
            </Link>
            <Link href="mailto:3a-electrical@gmx.co.uk" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-8 text-base border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-bold uppercase tracking-wide">
                <Mail className="size-5" /> Email Us
              </Button>
            </Link>
          </div>

          <Separator className="my-12 bg-primary-foreground/20" />

          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary-foreground/50 mb-4">
              Areas We Cover
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-primary-foreground/80">
              {AREAS.map((area, i) => (
                <span key={area} className="flex items-center gap-6">
                  {area}
                  {i < AREAS.length - 1 && <span className="text-primary-foreground/30">·</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center justify-center gap-2">
              <Clock className="size-4" /> Mon-Fri, Available for Call-Out
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin className="size-4" /> Wolverhampton, WV3 8BE
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-background border-t border-border py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.15em] uppercase">
            &copy; 2026 3A Electrical LTD &middot; Wolverhampton, WV3 8BE
          </span>
          <span className="text-muted-foreground/60 text-[11px] tracking-[0.15em]">
            Site by{" "}
            <Link
              href="https://highcroftdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-semibold"
            >
              Highcroft Digital
            </Link>
          </span>
        </div>
      </footer>

      {/* ── FLOATING CALL (mobile) ────────────────────────────── */}
      <Link
        href="tel:07973381458"
        className="fixed bottom-5 right-5 z-50 md:hidden"
        aria-label="Call 3A Electrical"
      >
        <Button size="icon" className="size-16 rounded-full shadow-lg bg-primary hover:bg-[#c8002e] text-white">
          <Phone className="size-6" />
        </Button>
      </Link>
    </div>
  );
}
