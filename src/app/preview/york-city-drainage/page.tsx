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
  Mail,
  Clock,
  Shield,
  CheckCircle2,
  Droplets,
  Wrench,
  Video,
  Trash2,
  Zap,
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
    title: "Rapid Response",
    desc: "Same-day call outs across York and surrounding areas. We know a blocked drain can't wait.",
  },
  {
    icon: BadgePoundSterling,
    title: "From Just £45",
    desc: "Transparent pricing. No call-out fee. Free, no-obligation estimate before we start any work.",
  },
  {
    icon: Shield,
    title: "Fully Guaranteed",
    desc: "Every job backed by our full workmanship guarantee. Fully trained, fully insured engineers.",
  },
  {
    icon: CheckCircle2,
    title: "Domestic & Commercial",
    desc: "From household blockages to commercial drainage systems — one trusted team for every property.",
  },
];

const STATS = [
  { value: "£45", label: "Starting Price" },
  { value: "24/7", label: "Emergency Calls" },
  { value: "100%", label: "Guaranteed" },
  { value: "York", label: "& Surrounding Areas" },
];

const SERVICES = [
  {
    icon: Droplets,
    title: "Blocked Drain Unblocking",
    desc: "Fast, effective clearance of blocked drains using high-pressure jetting and rodding. Domestic and commercial.",
    price: "From £45",
  },
  {
    icon: Wrench,
    title: "Drain Excavation & Repairs",
    desc: "Structural drain repairs including collapsed pipes, root damage, and re-lining. Full reinstatement included.",
    price: "Free Quote",
  },
  {
    icon: Video,
    title: "CCTV Drain Surveys",
    desc: "High-definition drain inspections to pinpoint blockages, damage, and misconnections. Full video report provided.",
    price: "Free Quote",
  },
  {
    icon: Wrench,
    title: "Sewer & Toilet Unblocking",
    desc: "Specialist equipment for sewers and toilets. Clean, fast, and fully deodorised after every job.",
    price: "From £45",
  },
  {
    icon: Trash2,
    title: "Septic Tank Emptying",
    desc: "Scheduled or emergency septic tank emptying. Licensed waste carriers — all waste disposed of legally.",
    price: "Free Quote",
  },
  {
    icon: Zap,
    title: "24/7 Emergency Call Out",
    desc: "Out of hours service available for genuine drainage emergencies. Response within the hour.",
    price: "Call Now",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Call Us",
    desc: "Ring 01904 339 434 and tell us what's blocked. We'll give you honest advice straight away.",
  },
  {
    step: 2,
    title: "Free Estimate",
    desc: "We'll give you a clear, no-obligation quote before any work starts — no call-out fee either.",
  },
  {
    step: 3,
    title: "Fast Fix",
    desc: "Fully trained engineer arrives with the right kit. Most jobs cleared same-day.",
  },
  {
    step: 4,
    title: "All Clear",
    desc: "Job finished, site left clean and tidy. Full workmanship guarantee on every job.",
  },
];

const REVIEWS = [
  {
    text: "Absolute lifesavers. Called them at 8am with a blocked drain, they were here by 10 and sorted in under an hour. Price was exactly what they quoted.",
    name: "Sarah J.",
    location: "York",
  },
  {
    text: "Had a nightmare with our septic tank — rang York City Drainage and they came out the same day. Professional, tidy, and really reasonably priced.",
    name: "Mark W.",
    location: "Acomb",
  },
  {
    text: "CCTV survey and then the excavation a week later. Kept us informed at every step, cleaned up after themselves, and the work is guaranteed. Top team.",
    name: "Rachel T.",
    location: "Copmanthorpe",
  },
];

const FAQS = [
  {
    q: "How much does it cost to unblock a drain?",
    a: "Most blocked drain jobs start from £45. We'll always give you a clear, no-obligation quote before we start any work. There's no call-out fee.",
  },
  {
    q: "Do you work 24/7?",
    a: "Yes, we offer a 24/7 emergency call-out service across York and surrounding areas. For genuine drainage emergencies, we aim to be with you within the hour.",
  },
  {
    q: "What areas do you cover?",
    a: "We cover York and all surrounding areas including Acomb, Copmanthorpe, Fulford, Heslington, Haxby, Strensall, and out to Selby and beyond.",
  },
  {
    q: "Are your engineers qualified?",
    a: "Yes, all our engineers are fully trained, fully insured, and have years of experience with domestic and commercial drainage systems. Every job is covered by our workmanship guarantee.",
  },
];

const AREAS = [
  "York City",
  "Acomb",
  "Clifton",
  "Fulford",
  "Heslington",
  "Copmanthorpe",
  "Haxby",
  "Strensall",
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function YorkCityDrainagePage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div data-theme="york-city-drainage" className="min-h-screen bg-background text-foreground antialiased font-[family-name:var(--font-barlow)]">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <Link href="#" className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
              <Droplets className="size-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-foreground tracking-tight uppercase">York City</span>
              <span className="text-[10px] font-semibold text-primary tracking-[0.2em] uppercase">Drainage</span>
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
            <Link href="tel:01904339434" className="hidden sm:block">
              <Button size="sm" className="bg-[#f07800] hover:bg-[#d66a00] text-white h-10 px-4 font-bold uppercase tracking-wide text-xs">
                <Phone className="size-3.5" />
                01904 339 434
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
            <Link href="tel:01904339434" className="block pt-3">
              <Button size="lg" className="w-full bg-[#f07800] hover:bg-[#d66a00] text-white font-bold uppercase tracking-wide">
                <Phone className="size-4" /> Call 01904 339 434
              </Button>
            </Link>
          </nav>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-5 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="bg-[#f07800]/10 text-[#f07800] border-[#f07800]/30 hover:bg-[#f07800]/15 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Zap className="size-3 mr-1" />
            Rapid Response Across York
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight uppercase leading-[0.95]">
            Blocked Drain?
            <br />
            <span className="text-primary">We&apos;ll Clear It</span>
            <br />
            <span className="text-[#f07800]">Today.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            York&apos;s trusted drainage specialists. Fully guaranteed work, transparent pricing from just <span className="font-bold text-foreground">£45</span>, and a free no-obligation estimate on every call.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 max-w-lg sm:max-w-none mx-auto">
            <Link href="tel:01904339434" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-[#f07800] hover:bg-[#d66a00] text-white font-bold uppercase tracking-wide">
                <Phone className="size-5" /> Call 01904 339 434
              </Button>
            </Link>
            <Link href="#services" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-wide border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Our Services <ChevronRight className="size-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> No Call-Out Fee</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Fully Guaranteed</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> 24/7 Emergency</span>
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
                <div className="size-12 flex items-center justify-center rounded-lg bg-[#f07800]">
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f07800] block mb-4">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Every drainage job,<br />sorted properly.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              From emergency blockages to full drain excavations — one trusted team, fully guaranteed work, clear pricing from the start.
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
                      <span className="text-xs font-bold tracking-wide uppercase text-[#f07800]">
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f07800] block mb-4">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              From call to clear<br />in 4 simple steps.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-black text-[#f07800]/20 leading-none mb-3">
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
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f07800] block mb-4">
                What York Says
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
                Trusted by<br />hundreds of homes<br />across York.
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#f07800] block mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Common<br />questions.
            </h2>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Give us a call on 01904 339 434 — we&apos;re happy to help.
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
          <Badge className="bg-[#f07800]/20 text-[#f07800] border-[#f07800]/40 hover:bg-[#f07800]/25 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Zap className="size-3 mr-1" />
            Emergency? Call Now
          </Badge>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tight uppercase">
            Blocked drain?<br />Call us.
          </h2>

          <p className="mt-6 text-primary-foreground/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Free, no-obligation estimate. No call-out fee. Most jobs cleared same-day across York and surrounding areas.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="tel:01904339434" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-16 px-8 text-base bg-[#f07800] hover:bg-[#d66a00] text-white font-bold uppercase tracking-wide">
                <Phone className="size-5" /> 01904 339 434
              </Button>
            </Link>
            <Link href="tel:07877977437" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-8 text-base border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-bold uppercase tracking-wide">
                <Phone className="size-5" /> 07877 977 437
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
              <Clock className="size-4" /> 24/7 Emergency Call Out
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin className="size-4" /> York, YO24 3LW
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-background border-t border-border py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.15em] uppercase">
            &copy; 2026 York City Drainage &middot; York, YO24 3LW
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
        href="tel:01904339434"
        className="fixed bottom-5 right-5 z-50 md:hidden"
        aria-label="Call York City Drainage"
      >
        <Button size="icon" className="size-16 rounded-full shadow-lg bg-[#f07800] hover:bg-[#d66a00] text-white">
          <Phone className="size-6" />
        </Button>
      </Link>
    </div>
  );
}
