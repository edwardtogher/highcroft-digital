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
  Gauge,
  Activity,
  Lock,
  Key,
  Zap,
  Car,
  Wrench,
  TrendingUp,
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

const NAV_LINKS = ["Services", "Why Us", "Reviews", "FAQ", "Contact"];

const TRUST_ITEMS = [
  {
    icon: Car,
    title: "Mobile Service",
    desc: "We come to you. Home, work, or garage — across Leicester and surrounding areas.",
  },
  {
    icon: Wrench,
    title: "Dealer-Level Kit",
    desc: "Same diagnostic equipment as main dealerships. Workshop prices, not dealership prices.",
  },
  {
    icon: Star,
    title: "5-Star Rated",
    desc: "Trusted by drivers across Leicester for honest advice and quality workmanship.",
  },
  {
    icon: Shield,
    title: "Fully Guaranteed",
    desc: "Every remap, diagnostic, and installation backed by our workmanship guarantee.",
  },
];

const STATS = [
  { value: "Mobile", label: "Service" },
  { value: "5.0", label: "Rated" },
  { value: "Dealer", label: "Diagnostics" },
  { value: "LE", label: "Leicester Based" },
];

const SERVICES = [
  {
    icon: TrendingUp,
    title: "ECU Remapping",
    desc: "Custom engine remap for more horsepower, torque and better fuel economy. Tuned to your exact vehicle.",
    tag: "Performance",
  },
  {
    icon: Activity,
    title: "Vehicle Diagnostics",
    desc: "Pinpoint fault-finding with dealer-level diagnostic kit. Know exactly what's wrong before you pay to fix it.",
    tag: "Fault-finding",
  },
  {
    icon: Lock,
    title: "CAN-Phantom Immobiliser",
    desc: "Professional installation of the CAN-Phantom anti-theft device. Guard against keyless theft and relay attacks.",
    tag: "Security",
  },
  {
    icon: Gauge,
    title: "Mileage Correction",
    desc: "Legal digital mileage recalibration after instrument cluster repair or replacement. Fully auditable.",
    tag: "Recalibration",
  },
  {
    icon: Key,
    title: "Key Programming",
    desc: "Spare key programming, lost key replacement, and transponder coding — without a trip to the main dealer.",
    tag: "Keys",
  },
  {
    icon: Zap,
    title: "Adblue & DPF",
    desc: "Adblue issues, DPF regeneration, and emission-related fault codes sorted by specialists who know diesel.",
    tag: "Emissions",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Call or Message",
    desc: "Ring 07873 300 553 with your make, model and what's going on. We'll give you straight advice.",
  },
  {
    step: 2,
    title: "Mobile Booking",
    desc: "We come to you at a time that suits. Home, workplace, or independent garage — no dealership queues.",
  },
  {
    step: 3,
    title: "Work Done Right",
    desc: "Specialist equipment, specialist knowledge. Remaps, diagnostics, and installs done properly first time.",
  },
  {
    step: 4,
    title: "Aftercare",
    desc: "Full guarantee on every job. Any issue after, we come back. That's how we've earned 5 stars.",
  },
];

const REVIEWS = [
  {
    text: "Brilliant job on my Audi A4 remap. Noticeable difference in power and the MPG has actually gone up. Arrived when he said, fair price, really knows his stuff.",
    name: "Dan R.",
    location: "Leicester",
  },
  {
    text: "Had an engine fault light I couldn't get to the bottom of. Came to my work, plugged in, diagnosed it in 20 mins. Saved me a fortune on unnecessary repairs.",
    name: "Sophie L.",
    location: "Oadby",
  },
  {
    text: "Fitted a CAN-Phantom to my Golf R after a scare on my street. Fast, tidy install, walked me through how it works. Peace of mind is worth every penny.",
    name: "Tom B.",
    location: "Wigston",
  },
];

const FAQS = [
  {
    q: "Is ECU remapping legal and safe for my car?",
    a: "Yes — we use vehicle-specific maps built for your exact engine and gearbox. All remaps are reversible and we keep a backup of your original file. Your warranty situation depends on your manufacturer, so we'll discuss that upfront.",
  },
  {
    q: "Will a remap affect my insurance?",
    a: "Most insurers treat a remap as a modification, so you should declare it. We can supply a certificate confirming the work done. Plenty of mainstream insurers are fine with remaps — we can point you in the right direction.",
  },
  {
    q: "Do I need to come to you, or do you come to me?",
    a: "We're a mobile-first service. We come to your home, workplace, or chosen garage anywhere across Leicester and surrounding areas. Makes life easy — no need to take a day off work.",
  },
  {
    q: "How much does diagnostics cost?",
    a: "Call us on 07873 300 553 with your vehicle details and the fault you're seeing — we'll give you a clear price before we start. No hidden fees, no call-out surprise charges.",
  },
];

const AREAS = [
  "Leicester",
  "Oadby",
  "Wigston",
  "Loughborough",
  "Hinckley",
  "Melton Mowbray",
  "Coalville",
  "Market Harborough",
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function MileageControlPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div data-theme="mileage-control" className="min-h-screen bg-background text-foreground antialiased font-[family-name:var(--font-oswald)]">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <Link href="#" className="flex items-center gap-2.5">
            <div className="size-9 rounded-md bg-primary flex items-center justify-center">
              <Gauge className="size-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-foreground tracking-tight uppercase">Mileage Control</span>
              <span className="text-[10px] font-semibold text-[#DD0E09] tracking-[0.25em] uppercase">Leicester</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="tel:07873300553" className="hidden sm:block">
              <Button size="sm" className="bg-[#DD0E09] hover:bg-[#b50b07] text-white h-10 px-4 font-bold uppercase tracking-wide text-xs">
                <Phone className="size-3.5" />
                07873 300 553
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
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileNav(false)}
                className="block py-3 text-sm font-semibold tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <Link href="tel:07873300553" className="block pt-3">
              <Button size="lg" className="w-full bg-[#DD0E09] hover:bg-[#b50b07] text-white font-bold uppercase tracking-wide">
                <Phone className="size-4" /> Call 07873 300 553
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
            <Badge className="bg-[#DD0E09]/10 text-[#DD0E09] border-[#DD0E09]/30 hover:bg-[#DD0E09]/15 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
              <Car className="size-3 mr-1" />
              Mobile Service Across Leicester
            </Badge>
          </div>

          {/* Middle: headline + subtitle */}
          <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
            <h1 className="text-[3rem] sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight uppercase leading-[1] sm:leading-[0.95]">
              More Power.
              <br />
              <span className="text-primary">Better Economy. </span>
              <span className="text-[#DD0E09]">Leicester.</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Mobile ECU remapping, dealer-level diagnostics and CAN-Phantom immobilisers. <span className="font-bold text-foreground">We come to you</span> — no dealership queues, no inflated prices.
            </p>
          </div>

          {/* Bottom: buttons + trust badges */}
          <div className="flex flex-col gap-5 sm:gap-7">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full sm:w-auto">
              <Link href="tel:07873300553" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-[#DD0E09] hover:bg-[#b50b07] text-white font-bold uppercase tracking-wide">
                  <Phone className="size-5" /> Call 07873 300 553
                </Button>
              </Link>
              <Link href="#services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-wide border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Our Services <ChevronRight className="size-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-muted-foreground">
              <span className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> Mobile Service</span>
              <span className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> Dealer-Level Kit</span>
              <span className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="size-3.5 sm:size-4 text-primary" /> Fully Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────────────────── */}
      <section id="why-us" className="bg-primary text-primary-foreground px-5 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-start gap-3">
                <div className="size-12 flex items-center justify-center rounded-md bg-[#DD0E09]">
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
              <div className="text-3xl sm:text-4xl font-bold text-primary uppercase">
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#DD0E09] block mb-4">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight uppercase leading-[1]">
              Specialist work,<br />done properly.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              From performance remaps to security installs — one specialist, dealer-level equipment, mobile service. Everything done right first time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group hover:border-primary/40 transition-colors duration-300 border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="size-11 flex items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary transition-colors">
                        <Icon className="size-5 text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={2} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#DD0E09]">
                        {service.tag}
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#DD0E09] block mb-4">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight uppercase leading-[1]">
              From call to<br />sorted.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-bold text-[#DD0E09]/20 leading-none mb-3 font-[family-name:var(--font-oswald)]">
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
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#DD0E09] block mb-4">
                What Drivers Say
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight uppercase leading-[1]">
                Trusted by<br />Leicester drivers.
              </h2>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5" style={{ fill: "#d4a74a", color: "#d4a74a" }} />
                ))}
              </div>
              <span className="text-foreground text-base font-bold">5.0</span>
              <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Rated</span>
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#DD0E09] block mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight uppercase leading-[1]">
              Common<br />questions.
            </h2>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
              Something else you want to know? Give us a ring on 07873 300 553 — happy to talk it through.
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
          <Badge className="bg-[#DD0E09]/20 text-[#DD0E09] border-[#DD0E09]/40 hover:bg-[#DD0E09]/25 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Car className="size-3 mr-1" />
            Book Mobile Service
          </Badge>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight uppercase">
            Ready to<br />get started?
          </h2>

          <p className="mt-6 text-primary-foreground/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Free honest advice over the phone. Straight pricing before any work starts. Mobile across Leicester and surrounding areas.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="tel:07873300553" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-16 px-8 text-base bg-[#DD0E09] hover:bg-[#b50b07] text-white font-bold uppercase tracking-wide">
                <Phone className="size-5" /> 07873 300 553
              </Button>
            </Link>
            <Link href="mailto:info@mileagecontrol.co.uk" className="w-full sm:w-auto">
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
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-primary-foreground/80">
              {AREAS.map((area, i) => (
                <span key={area} className="flex items-center gap-5">
                  {area}
                  {i < AREAS.length - 1 && <span className="text-primary-foreground/30">·</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center justify-center gap-2">
              <Clock className="size-4" /> Mon - Sat, flexible hours
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin className="size-4" /> 75 Skelton Dr, Leicester LE2 6JQ
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-background border-t border-border py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.15em] uppercase">
            &copy; 2026 H M Autos T/A Mileage Control Leicester
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
        href="tel:07873300553"
        className="fixed bottom-5 right-5 z-50 md:hidden"
        aria-label="Call Mileage Control"
      >
        <Button size="icon" className="size-16 rounded-full shadow-lg bg-[#DD0E09] hover:bg-[#b50b07] text-white">
          <Phone className="size-6" />
        </Button>
      </Link>
    </div>
  );
}
