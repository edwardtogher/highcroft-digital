"use client";

import { useState } from "react";
import Image from "next/image";
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
  Home,
  Flame,
  Settings,
  Wifi,
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

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "NAPIT Certified",
    desc: "Fully registered NAPIT electricians. All work certified to BS7671 wiring regulations and notified to your local authority.",
  },
  {
    icon: Zap,
    title: "EV Charger Specialists",
    desc: "OZEV approved EV charger installers for home and business. All major brands supplied and professionally fitted.",
  },
  {
    icon: Wifi,
    title: "Loxone Smart Home Partner",
    desc: "Loxone Silver certified partner. Lighting, heating, blinds, and security — all automated and controlled from one app.",
  },
  {
    icon: CheckCircle2,
    title: "Fully Insured & DBS Checked",
    desc: "Full public and professional indemnity insurance. DBS checked for complete peace of mind on every job in your home.",
  },
];

const STATS = [
  { value: "9+", label: "Years Experience" },
  { value: "NAPIT", label: "Certified" },
  { value: "Derby", label: "& Derbyshire" },
  { value: "TrustMark", label: "Registered" },
];

const SERVICES = [
  {
    icon: Zap,
    title: "EV Charger Installation",
    desc: "Home and commercial EV charging points installed by OZEV-approved specialists. All major brands — Ohme, Zappi, Pod Point, Andersen — supplied and fully commissioned.",
    badge: "Most Popular",
  },
  {
    icon: Wifi,
    title: "Smart Home Automation",
    desc: "Loxone Silver Partner. Full home automation covering lighting, heating, blinds, security, and energy monitoring — one system, one app, everything connected.",
    badge: "Specialist",
  },
  {
    icon: Wrench,
    title: "Rewires & New Installs",
    desc: "Full and partial rewires for homes and commercial premises. New circuit installations, consumer unit upgrades, and outbuilding electrics.",
    badge: "Free Quote",
  },
  {
    icon: Shield,
    title: "EICR & Landlord Checks",
    desc: "Electrical Installation Condition Reports for landlords, homeowners, and businesses. Compliant, fast turnaround, and fully documented.",
    badge: "From £150",
  },
  {
    icon: Flame,
    title: "Fire & Smoke Systems",
    desc: "Fire alarm installation, maintenance, and testing for domestic and commercial properties. Emergency lighting supplied and fitted.",
    badge: "Free Quote",
  },
  {
    icon: Settings,
    title: "PAT Testing & Fault Finding",
    desc: "Portable appliance testing for businesses, landlords, and schools. Expert fault finding and repairs on all electrical systems.",
    badge: "From £60",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Free Quote",
    desc: "Call or message Jat for a no-obligation estimate. Clear price before any work begins — no hidden costs.",
  },
  {
    step: 2,
    title: "Survey & Plan",
    desc: "We assess the job, advise on the best approach, and plan the installation to minimise disruption.",
  },
  {
    step: 3,
    title: "Professional Install",
    desc: "Clean, methodical work to BS7671 standards. Tidy worksite. No shortcuts, no surprises.",
  },
  {
    step: 4,
    title: "Certified & Clear",
    desc: "All work notified, certified, and signed off. Full documentation handed over. Job done right.",
  },
];

const REVIEWS = [
  {
    text: "From the onset to handover, nothing could have gone smoother. I am genuinely impressed by their quality and caring nature — no corners cut, ever.",
    name: "R. Clarke",
    location: "Derby",
  },
  {
    text: "Called Jatinder after having no working upstairs lights for a week. He arrived the next morning and had everything sorted very quickly. Brilliant service.",
    name: "S. Hewitt",
    location: "Mickleover",
  },
  {
    text: "Jat's customer service is a whole level above anything I've experienced with an electrician before. Honest, thorough, and excellent value.",
    name: "P. Walsh",
    location: "Allestree",
  },
];

const FAQS = [
  {
    q: "Are you NAPIT certified?",
    a: "Yes — we are fully registered NAPIT electricians. All work is certified to current BS7671 wiring regulations and notified to your local authority. You receive full certification documentation on every job.",
  },
  {
    q: "What areas do you cover?",
    a: "We cover Derby City and all surrounding areas including Allestree, Mickleover, Littleover, Spondon, Chaddesden, and Alvaston, plus wider Derbyshire and Nottinghamshire. Not sure if we cover you? Just call.",
  },
  {
    q: "Can you install my EV charger?",
    a: "Absolutely — EV charger installation is one of our specialities. We are OZEV approved and can supply and install all major brands including Ohme, Zappi, Pod Point, and Andersen. We also handle any necessary consumer unit upgrades.",
  },
  {
    q: "Do you install smart home systems?",
    a: "Yes — we are a Loxone Silver Partner, trained and certified to design and install full smart home systems. Lighting, heating, blinds, access control, CCTV, and energy monitoring — all managed from your phone.",
  },
];

const AREAS = [
  "Derby",
  "Allestree",
  "Mickleover",
  "Littleover",
  "Spondon",
  "Chaddesden",
  "Alvaston",
  "Derbyshire",
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function YellowstoneElectricalPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div
      data-theme="yellowstone-electrical"
      className="min-h-screen bg-background text-foreground antialiased font-[family-name:var(--font-space-grotesk)]"
    >
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <Link href="#" className="flex items-center">
            <Image
              src="/yellowstone-electrical-logo.png"
              alt="Yellowstone Electrical"
              width={160}
              height={128}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-[#eab308] transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="tel:07305784337" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-[#eab308] hover:bg-[#ca8a04] text-[#111111] h-10 px-4 font-bold uppercase tracking-wide text-xs"
              >
                <Phone className="size-3.5" />
                07305 784337
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
                className="block py-3 text-sm font-semibold tracking-[0.15em] uppercase text-foreground hover:text-[#eab308] transition-colors"
              >
                {link}
              </a>
            ))}
            <Link href="tel:07305784337" className="block pt-3">
              <Button
                size="lg"
                className="w-full bg-[#eab308] hover:bg-[#ca8a04] text-[#111111] font-bold uppercase tracking-wide"
              >
                <Phone className="size-4" /> Call 07305 784337
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
            <Badge className="bg-[#eab308]/10 text-[#eab308] border-[#eab308]/30 hover:bg-[#eab308]/15 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
              <Zap className="size-3 mr-1" />
              NAPIT Certified — Derby & Derbyshire
            </Badge>
          </div>

          {/* Middle: headline + subtitle */}
          <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
            <h1 className="text-[3rem] sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight uppercase leading-[1] sm:leading-[0.95]">
              Derby&apos;s
              <br />
              <span className="text-[#eab308]">EV & Smart </span>
              <span className="text-foreground">Electricians.</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              NAPIT certified electricians covering Derby and Derbyshire. EV charger
              installations, Loxone smart home systems, rewires, EICR reports — all work
              certified and fully guaranteed.
            </p>
          </div>

          {/* Bottom: buttons + trust (thumb zone) */}
          <div className="flex flex-col gap-5 sm:gap-7">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full sm:w-auto">
              <Link href="tel:07305784337" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base bg-[#eab308] hover:bg-[#ca8a04] text-[#111111] font-bold uppercase tracking-wide"
                >
                  <Phone className="size-5" /> Call 07305 784337
                </Button>
              </Link>
              <Link href="#services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-wide border-2 border-[#eab308] text-[#eab308] hover:bg-[#eab308] hover:text-[#111111]"
                >
                  Our Services <ChevronRight className="size-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-muted-foreground">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="size-3.5 sm:size-4 text-[#eab308]" /> NAPIT Certified
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="size-3.5 sm:size-4 text-[#eab308]" /> Loxone Silver Partner
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="size-3.5 sm:size-4 text-[#eab308]" /> Fully Insured
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────────────────── */}
      <section className="bg-[#eab308] px-5 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-start gap-3">
                <div className="size-12 flex items-center justify-center rounded-lg bg-[#111111]">
                  <Icon className="size-6 text-[#eab308]" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wide text-[#111111]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#111111]/75 leading-relaxed">{item.desc}</p>
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
              <div className="text-3xl sm:text-4xl font-black text-[#eab308] uppercase">
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#eab308] block mb-4">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              From your fuse box<br />to your EV charger.
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              Domestic, commercial, and smart home electrical work across Derby and
              Derbyshire. Every job certified, guaranteed, and done right.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group hover:border-[#eab308]/40 transition-colors duration-300 border-2"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="size-11 flex items-center justify-center rounded-lg bg-[#eab308]/10 group-hover:bg-[#eab308] transition-colors">
                        <Icon
                          className="size-5 text-[#eab308] group-hover:text-[#111111] transition-colors"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="text-xs font-bold tracking-wide uppercase text-[#eab308]">
                        {service.badge}
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#eab308] block mb-4">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Simple process.<br />Professional results.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-black text-[#eab308]/20 leading-none mb-3">
                  {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
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
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#eab308] block mb-4">
                What Customers Say
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
                Trusted by<br />homes across<br />Derby.
              </h2>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5" style={{ fill: "#d4a74a", color: "#d4a74a" }} />
                ))}
              </div>
              <span className="text-foreground text-base font-bold">5.0</span>
              <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Checkatrade
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {REVIEWS.map((review) => (
              <Card key={review.name} className="border-2">
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
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#eab308] block mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight uppercase leading-[1]">
              Common<br />questions.
            </h2>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Give us a call on 07305 784337
              — we&apos;re happy to help.
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
      <section id="contact" className="bg-[#eab308] px-5 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#111111]/10 text-[#111111] border-[#111111]/20 hover:bg-[#111111]/15 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Zap className="size-3 mr-1" />
            Free Quote — No Obligation
          </Badge>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tight uppercase text-[#111111]">
            Get a free<br />quote today.
          </h2>
          <p className="mt-6 text-[#111111]/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            EV chargers, smart home automation, rewires, EICR reports and more. Call Jat
            directly for honest advice and a clear, no-obligation price.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="tel:07305784337" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-16 px-8 text-base bg-[#111111] hover:bg-[#222222] text-[#eab308] font-bold uppercase tracking-wide"
              >
                <Phone className="size-5" /> 07305 784337
              </Button>
            </Link>
            <Link href="mailto:Info@yellowstoneelectrical.co.uk" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-16 px-8 text-base border-2 border-[#111111]/30 text-[#111111] bg-transparent hover:bg-[#111111] hover:text-[#eab308] font-bold uppercase tracking-wide"
              >
                <Mail className="size-5" /> Email Us
              </Button>
            </Link>
          </div>

          <Separator className="my-12 bg-[#111111]/20" />

          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#111111]/50 mb-4">
              Areas We Cover
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[#111111]/80">
              {AREAS.map((area, i) => (
                <span key={area} className="flex items-center gap-6">
                  {area}
                  {i < AREAS.length - 1 && (
                    <span className="text-[#111111]/30">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-[#111111]/60 text-sm">
            <span className="flex items-center justify-center gap-2">
              <Clock className="size-4" /> Mon–Sat 7am–7pm
            </span>
            <span className="flex items-center justify-center gap-2">
              <MapPin className="size-4" /> Derby, DE23 1DW
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-background border-t border-border py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.15em] uppercase">
            &copy; 2026 Yellowstone Electrical &middot; Derby, DE23 1DW
          </span>
          <span className="text-muted-foreground/60 text-[11px] tracking-[0.15em]">
            Site by{" "}
            <Link
              href="https://highcroftdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#eab308] transition-colors font-semibold"
            >
              Highcroft Digital
            </Link>
          </span>
        </div>
      </footer>

      {/* ── FLOATING CALL (mobile) ────────────────────────────── */}
      <Link
        href="tel:07305784337"
        className="fixed bottom-5 right-5 z-50 md:hidden"
        aria-label="Call Yellowstone Electrical"
      >
        <Button
          size="icon"
          className="size-16 rounded-full shadow-lg bg-[#eab308] hover:bg-[#ca8a04] text-[#111111]"
        >
          <Phone className="size-6" />
        </Button>
      </Link>
    </div>
  );
}
