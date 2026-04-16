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
  Award,
  Plug,
  Sun,
  BatteryCharging,
  ClipboardCheck,
  SearchCode,
  Wrench,
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

const NAV_LINKS = ["Services", "Process", "Reviews", "FAQ", "Contact"];

const TRUST_ITEMS = [
  {
    icon: SearchCode,
    title: "Fault-Finding Specialists",
    desc: "The problems other engineers walk away from — from intermittent faults to commercial plant issues — are what we solve every day.",
  },
  {
    icon: Sun,
    title: "MCS-Compliant Solar",
    desc: "Full MCS-compliant solar PV and battery installations. Eligible for grant funding and Smart Export Guarantee tariffs.",
  },
  {
    icon: Shield,
    title: "Fully Qualified Electricians",
    desc: "Time-served, fully qualified and insured. Every job done to current 18th Edition wiring regulations.",
  },
  {
    icon: Zap,
    title: "EV, Solar & Commercial",
    desc: "One team for the lot — EV charger installs, solar and battery, landlord EICRs, and commercial plant diagnostics.",
  },
];

const STATS = [
  { value: "£140", label: "EICR From" },
  { value: "MCS", label: "Certified Solar" },
  { value: "18th", label: "Edition Qualified" },
  { value: "Portsmouth", label: "& Southern England" },
];

const SERVICES = [
  {
    icon: Plug,
    title: "EV Charger Installation",
    desc: "Home and workplace EV chargers installed and commissioned. OZEV-grant compatible installs, with load balancing on bigger sites.",
    tag: "Home & Commercial",
  },
  {
    icon: Sun,
    title: "Solar PV Systems",
    desc: "MCS-compliant solar PV design and installation. Roof or ground-mounted, grid-tied with full monitoring and SEG registration.",
    tag: "MCS Certified",
  },
  {
    icon: BatteryCharging,
    title: "Battery Storage",
    desc: "Store the solar you generate and cut your bills further. Paired with PV or retrofitted, sized to your usage and property.",
    tag: "Pair With Solar",
  },
  {
    icon: ClipboardCheck,
    title: "EICR Landlord Reports",
    desc: "Electrical Installation Condition Reports to meet the 2020 Private Rented Sector regulations. Fixed pricing from £140.",
    tag: "From £140",
  },
  {
    icon: SearchCode,
    title: "Commercial Fault-Finding",
    desc: "Specialist diagnostics on air handling, heat pumps, boilers, AHUs, fan coils, inverters, pumps and valves when nothing else makes sense.",
    tag: "Specialist",
  },
  {
    icon: Wrench,
    title: "General Electrical Works",
    desc: "Rewiring, consumer unit upgrades, lighting design, fault repair. Domestic and light commercial work across Portsmouth.",
    tag: "Domestic & Commercial",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Call Us",
    desc: "Ring 07842 833267 and talk to the engineer. No gatekeepers, no forms — tell us what you need and we'll be honest about the job.",
  },
  {
    step: 2,
    title: "Visit & Diagnose",
    desc: "Site visit to scope the work. For faults, we bring the kit to find the cause first time — no guessing, no part-swapping.",
  },
  {
    step: 3,
    title: "Clear Quote",
    desc: "Fixed pricing wherever possible. You get the full scope, timings and cost before we touch a single cable.",
  },
  {
    step: 4,
    title: "Done Properly",
    desc: "Installed, tested and certified. Paperwork sorted — EIC, EICR or MCS certificate — and the site left tidy.",
  },
];

const REVIEWS = [
  {
    text: "Three electricians had been out and couldn't find the fault on our office lighting. Crescent turned up, traced it in under an hour and had it sorted the same day. Exactly the people you want on a difficult job.",
    name: "Facilities Manager",
    location: "Portsmouth",
  },
  {
    text: "EV charger fitted at the house. Neat install, tidied up properly, and they took the time to walk me through the app. Already had the neighbour on the phone asking for their number.",
    name: "Matt R.",
    location: "Southsea",
  },
  {
    text: "We needed EICRs on six rental properties ahead of the new regs. Crescent Power did all six in a week, sent the certificates through the same day each time. Fair price and no fuss.",
    name: "Landlord",
    location: "Havant",
  },
];

const FAQS = [
  {
    q: "Do you install EV chargers at home and at work?",
    a: "Yes — domestic and commercial EV charger installations across Portsmouth and the south. We handle single chargers at home through to multi-point workplace installs with load balancing and back-office setup.",
  },
  {
    q: "Are you MCS-certified for solar PV and batteries?",
    a: "Yes. Our solar installations are MCS-compliant so you're eligible for the Smart Export Guarantee and any current grant schemes. We design, install, commission and register the system end to end.",
  },
  {
    q: "How much does an EICR cost?",
    a: "EICRs start at £140, plus £15 per circuit. That covers the full test, the written report and any remedial quote. Fixed pricing, no surprises — ideal for landlords ahead of the PRS regulations.",
  },
  {
    q: "Can you diagnose a fault other electricians couldn't?",
    a: "That's where we come in. We specialise in commercial plant fault-finding — heating, heat pumps, AHUs, fan coils, inverters, pumps and valves — and complex domestic faults too. Call us first or call us last, the result's the same.",
  },
];

const AREAS = [
  "Portsmouth",
  "Southsea",
  "Cosham",
  "Havant",
  "Gosport",
  "Fareham",
  "Waterlooville",
  "Chichester",
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function CrescentPowerPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div
      data-theme="crescent-power"
      className="min-h-screen bg-background text-foreground antialiased font-[family-name:var(--font-plus-jakarta)]"
    >
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <Link href="#" className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
              <Zap
                className="size-5 text-[#f5b820]"
                strokeWidth={2.5}
                fill="#f5b820"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-foreground tracking-tight uppercase">
                Crescent
              </span>
              <span className="text-[10px] font-semibold text-primary tracking-[0.25em] uppercase">
                Power Ltd
              </span>
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
            <Link href="tel:07842833267" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-[#f5b820] hover:bg-[#dba416] text-[#0a1240] h-10 px-4 font-bold uppercase tracking-wide text-xs"
              >
                <Phone className="size-3.5" />
                07842 833267
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
            <Link href="tel:07842833267" className="block pt-3">
              <Button
                size="lg"
                className="w-full bg-[#f5b820] hover:bg-[#dba416] text-[#0a1240] font-bold uppercase tracking-wide"
              >
                <Phone className="size-4" /> Call 07842 833267
              </Button>
            </Link>
          </nav>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="min-h-[100svh] sm:min-h-0 flex flex-col pt-20 pb-6 sm:pt-32 sm:pb-20 px-5 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-5xl mx-auto text-center flex flex-col flex-1 w-full">
          {/* Top: badge */}
          <div className="pt-4 sm:pt-0">
            <Badge className="bg-[#f5b820]/15 text-[#9a6a00] border-[#f5b820]/40 hover:bg-[#f5b820]/20 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
              <Zap className="size-3 mr-1" />
              EV · Solar · Fault-Finding
            </Badge>
          </div>

          {/* Middle: headline + subtitle */}
          <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight uppercase leading-[1] sm:leading-[0.95]">
              Portsmouth&apos;s
              <br />
              <span className="text-primary">Specialist </span>
              <span className="text-[#f5b820]">Electricians.</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              EV charging, solar PV, battery storage, landlord EICRs and the{" "}
              <span className="font-bold text-foreground">
                commercial fault-finding
              </span>{" "}
              nobody else wants to touch. One fully qualified team, clear pricing, done properly.
            </p>
          </div>

          {/* Bottom: buttons + trust checkmarks */}
          <div className="flex flex-col gap-5 sm:gap-7">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full sm:w-auto">
              <Link href="tel:07842833267" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base bg-[#f5b820] hover:bg-[#dba416] text-[#0a1240] font-bold uppercase tracking-wide"
                >
                  <Phone className="size-5" /> Call 07842 833267
                </Button>
              </Link>
              <Link href="#services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-wide border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Our Services <ChevronRight className="size-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-muted-foreground">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> Fully Qualified
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> MCS Certified
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> No-Obligation Quote
              </span>
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
                <div className="size-12 flex items-center justify-center rounded-lg bg-[#f5b820]">
                  <Icon className="size-6 text-[#0a1240]" strokeWidth={2} />
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
              className={`py-10 px-5 sm:px-8 text-center ${
                i > 0 ? "border-l border-border" : ""
              }`}
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c89000] block mb-4">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Power, plus the jobs
              <br />
              nobody else will take.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              From a domestic EV charger to a commercial plant diagnosis at 2am — one qualified team, honest pricing, and the expertise to finish what others couldn&apos;t start.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group hover:border-primary/40 transition-colors duration-300 border-2"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="size-11 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                        <Icon
                          className="size-5 text-primary group-hover:text-primary-foreground transition-colors"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="text-xs font-bold tracking-wide uppercase text-[#c89000]">
                        {service.tag}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold tracking-wide uppercase">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {service.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section id="process" className="bg-muted px-5 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c89000] block mb-4">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              From call to
              <br />
              certificate.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-black text-[#f5b820]/30 leading-none mb-3">
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
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c89000] block mb-4">
                What Clients Say
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
                Trusted across
                <br />
                the south coast.
              </h2>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-5"
                    style={{ fill: "#d4a74a", color: "#d4a74a" }}
                  />
                ))}
              </div>
              <span className="text-foreground text-base font-bold">5.0</span>
              <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Client Rated
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {REVIEWS.map((review) => (
              <Card key={review.name + review.location} className="border-2">
                <CardHeader>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5"
                        style={{ fill: "#d4a74a", color: "#d4a74a" }}
                      />
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c89000] block mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Common
              <br />
              questions.
            </h2>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
              Can&apos;t see what you&apos;re after? Give us a call on 07842 833267 — happy to talk it through.
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
      <section
        id="contact"
        className="bg-primary text-primary-foreground px-5 py-24"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#f5b820]/20 text-[#f5b820] border-[#f5b820]/40 hover:bg-[#f5b820]/25 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Zap className="size-3 mr-1" />
            Ready To Talk?
          </Badge>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tight uppercase">
            Need it doing
            <br />
            properly?
          </h2>

          <p className="mt-6 text-primary-foreground/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Call the engineer direct. No gatekeepers. Free, no-obligation quote on every enquiry across Portsmouth and the south coast.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="tel:07842833267" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-16 px-8 text-base bg-[#f5b820] hover:bg-[#dba416] text-[#0a1240] font-bold uppercase tracking-wide"
              >
                <Phone className="size-5" /> 07842 833267
              </Button>
            </Link>
            <Link
              href="mailto:mrcrescentpower@gmail.com"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-16 px-8 text-base border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-bold uppercase tracking-wide"
              >
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
                  {i < AREAS.length - 1 && (
                    <span className="text-primary-foreground/30">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center justify-center gap-2">
              <Clock className="size-4" /> Mon–Fri, Call-Outs by Arrangement
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin className="size-4" /> 378 Copnor Rd, Portsmouth PO3 5EN
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-background border-t border-border py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.15em] uppercase">
            &copy; 2026 Crescent Power Ltd &middot; 378 Copnor Rd, Portsmouth PO3 5EN
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
        href="tel:07842833267"
        className="fixed bottom-5 right-5 z-50 md:hidden"
        aria-label="Call Crescent Power"
      >
        <Button
          size="icon"
          className="size-16 rounded-full shadow-lg bg-[#f5b820] hover:bg-[#dba416] text-[#0a1240]"
        >
          <Phone className="size-6" />
        </Button>
      </Link>

      {/* ── JSON-LD ───────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Electrician",
            name: "Crescent Power Ltd",
            telephone: "+44 7842 833267",
            email: "mrcrescentpower@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "378 Copnor Rd",
              addressLocality: "Portsmouth",
              postalCode: "PO3 5EN",
              addressCountry: "GB",
            },
            url: "https://crescentpower.co.uk/",
            areaServed: AREAS,
            serviceType: [
              "EV Charger Installation",
              "Solar PV Installation",
              "Battery Storage",
              "EICR Landlord Reports",
              "Commercial Electrical Fault-Finding",
            ],
          }),
        }}
      />
    </div>
  );
}
