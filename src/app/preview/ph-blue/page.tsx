"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import {
  Phone,
  Star,
  MapPin,
  Mail,
  Clock,
  Shield,
  Flame,
  Wrench,
  Droplets,
  Thermometer,
  Zap,
  Award,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ------------------------------------------------------------------ */
/*  FONTS                                                              */
/* ------------------------------------------------------------------ */

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-mont",
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Droplets,
    title: "Plumbing Repairs",
    desc: "Leaks, burst pipes, taps, toilets, and drains",
  },
  {
    icon: Flame,
    title: "Boiler Installation",
    desc: "New A-rated boilers with up to 10-year warranty",
  },
  {
    icon: Wrench,
    title: "Boiler Repair & Servicing",
    desc: "Breakdowns fixed, annual servicing, landlord certs",
  },
  {
    icon: Thermometer,
    title: "Central Heating",
    desc: "Radiators, powerflushing, underfloor heating",
  },
  {
    icon: Shield,
    title: "Gas Work",
    desc: "Gas Safe registered for all gas appliance work",
  },
  {
    icon: Zap,
    title: "Electrical",
    desc: "Part P certified, rewires, consumer units, EV chargers",
  },
];

const REVIEWS = [
  {
    text: "Knows what he\u2019s doing. Does what he says he\u2019ll do. Charges what he says he\u2019ll charge.",
    name: "Mike S.",
    location: "Cardiff",
  },
  {
    text: "Called on a freezing January evening. Nigel was the only plumber who answered. He was here within the hour.",
    name: "Ruth H.",
    location: "Roath",
  },
  {
    text: "Fantastic communication, no hidden costs, and our new boiler is working brilliantly.",
    name: "Fflur G.",
    location: "Canton",
  },
];

const FAQS = [
  {
    q: "Do you offer emergency callouts?",
    a: "Yes, we offer 24/7 emergency callouts across Cardiff and South Wales. If your boiler breaks down or you have a plumbing emergency, call us any time and we\u2019ll get to you as quickly as possible.",
  },
  {
    q: "Are your engineers Gas Safe registered?",
    a: "Absolutely. All our engineers are Gas Safe registered and fully qualified. We\u2019re also Checkatrade approved and fully insured for your peace of mind.",
  },
  {
    q: "What areas do you cover?",
    a: "We cover all of Cardiff and CF postcodes, including Roath, Rhiwbina, Canton, Cyncoed, Cathays, Pontprennau, Llandaff, Whitchurch, Penarth, and surrounding areas across South Wales.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes, we provide free, no-obligation quotes for all work. We believe in transparent, fixed pricing with no hidden costs. We also offer flexible finance options to help spread the cost.",
  },
  {
    q: "What boiler brands do you install?",
    a: "We install all major brands including Worcester Bosch, Vaillant, Ideal, Baxi, Glow-worm, Viessmann, and more. All installations come with up to a 10-year manufacturer warranty.",
  },
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return { count, ref };
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("ph-visible");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".ph-animate")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function PHBluePage() {
  const counter = useCounter(72);
  const [quoteOpen, setQuoteOpen] = useState(false);
  useReveal();

  return (
    <div
      className={mont.variable}
      style={{
        backgroundColor: "#FAFBFC",
        color: "#1A1A2E",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── STICKY HEADER ─────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md"
        style={{ borderBottom: "1px solid #F0F0F0", height: 56 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between h-full px-5">
          <span
            className="font-extrabold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-mont)", color: "#1976D2" }}
          >
            PHBLUE
          </span>

          <div
            className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "#94A3B8" }}
          >
            <a href="#services" className="hover:text-[#1976D2] transition-colors">Services</a>
            <a href="#reviews" className="hover:text-[#1976D2] transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-[#1976D2] transition-colors">Contact</a>
          </div>

          <Link href="tel:07545125168" className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>
              07545 125168
            </span>
          </Link>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-between text-center px-5 relative overflow-hidden"
        style={{ backgroundColor: "#ffffff", paddingTop: 72 }}
      >
        {/* Soft blue radial glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(25,118,210,0.06) 0%, transparent 60%)" }}
        />

        {/* Main content — vertically centred */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 gap-6">
          {/* Emergency badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(25, 118, 210, 0.15)",
              border: "1px solid rgba(25, 118, 210, 0.3)",
            }}
          >
            <Clock className="size-3.5" style={{ color: "#1976D2" }} />
            <span
              className="text-xs font-semibold tracking-[0.15em] uppercase"
              style={{ color: "#1976D2" }}
            >
              24/7 Emergency Callout
            </span>
          </div>

          {/* Logo — big and centred */}
          <h1
            className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight leading-none"
            style={{ fontFamily: "var(--font-mont)", color: "#1976D2" }}
          >
            PHBLUE
          </h1>

          <p
            className="text-base sm:text-lg max-w-md leading-relaxed"
            style={{ color: "#94A3B8" }}
          >
            Professional plumbing, heating & gas engineers
            <br />
            serving Cardiff and South Wales
          </p>

          {/* Stars */}
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm" style={{ color: "#94A3B8" }}>
              72 Five-Star Reviews
            </span>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex gap-3 mt-2">
            <Link href="tel:07545125168">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-bold rounded-lg border-0"
                style={{ backgroundColor: "#1976D2", color: "#ffffff" }}
              >
                <Phone className="size-5" /> Call 07545 125168
              </Button>
            </Link>
            <button onClick={() => setQuoteOpen(true)}>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold rounded-lg"
                style={{ borderColor: "#E5E7EB", color: "#1A1A2E" }}
              >
                Get a Free Quote <ChevronRight className="size-5" />
              </Button>
            </button>
          </div>
        </div>

        {/* Bottom — trust strip + scroll hint */}
        <div className="w-full pb-32 md:pb-8 relative z-10 flex flex-col items-center gap-6">
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-medium"
            style={{ color: "#B0BEC5" }}
          >
            <span className="flex items-center gap-2">
              <Shield className="size-4" style={{ color: "#1976D2" }} />
              Gas Safe Registered
            </span>
            <span className="flex items-center gap-2">
              <Award className="size-4" style={{ color: "#1976D2" }} />
              Checkatrade Approved
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4" style={{ color: "#1976D2" }} />
              15+ Years Experience
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "#CBD5E1" }}
            >
              Scroll
            </span>
            <ChevronRight
              className="size-5 rotate-90 animate-bounce"
              style={{ color: "#CBD5E1" }}
            />
          </div>
        </div>
      </section>

      {/* ── WHAT WE FIX ───────────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-20 px-5" style={{ backgroundColor: "#FAFBFC" }}>
        <div className="max-w-5xl mx-auto">
          <div className="ph-animate mb-12">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: "#1976D2" }}
            >
              What We Fix
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-mont)" }}
            >
              Six core services,
              <br />
              one phone call
            </h2>
          </div>

          <div className="ph-animate">
            <Accordion type="single" collapsible className="w-full">
              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <AccordionItem
                    key={s.title}
                    value={`svc-${i}`}
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <AccordionTrigger className="hover:no-underline py-5 gap-4">
                      <div className="flex items-center gap-4 text-left">
                        <div
                          className="size-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "#E3F2FD" }}
                        >
                          <Icon className="size-5" style={{ color: "#1976D2" }} />
                        </div>
                        <span
                          className="font-bold text-base"
                          style={{ fontFamily: "var(--font-mont)", color: "#1A1A2E" }}
                        >
                          {s.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p
                        className="text-sm leading-relaxed pl-14"
                        style={{ color: "#64748B" }}
                      >
                        {s.desc}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          <div className="text-center mt-10 ph-animate">
            <button onClick={() => setQuoteOpen(true)}>
              <Button
                className="h-12 px-8 font-bold rounded-lg border-0"
                style={{ backgroundColor: "#1976D2", color: "#ffffff" }}
              >
                <Phone className="size-4" /> Get a Free Quote
              </Button>
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST WALL ────────────────────────────────────────── */}
      <section id="reviews" style={{ backgroundColor: "#E3F2FD" }}>
        {/* Credentials */}
        <div className="py-8 sm:py-10 px-5" style={{ borderBottom: "1px solid rgba(25,118,210,0.1)" }}>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-3">
            {["Gas Safe Registered", "Checkatrade Approved", "Part P Certified", "Fully Insured"].map((c) => (
              <span
                key={c}
                className="ph-animate inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide text-white"
                style={{ backgroundColor: "#0D1B2A" }}
              >
                <Shield className="size-3.5" /> {c}
              </span>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div
          ref={counter.ref}
          className="py-14 sm:py-16 px-5 text-center"
          style={{ borderBottom: "1px solid rgba(25,118,210,0.1)" }}
        >
          <div
            className="text-7xl sm:text-8xl lg:text-9xl font-extrabold leading-none mb-3"
            style={{ color: "#1976D2", fontFamily: "var(--font-mont)" }}
          >
            {counter.count}
          </div>
          <div className="text-base font-medium mb-3" style={{ color: "#1A1A2E" }}>
            five-star reviews on Google
          </div>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="py-14 sm:py-16 px-5">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                className="ph-animate bg-white rounded-2xl p-7 sm:p-8"
                data-delay={i + 1}
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-[1.8] mb-5 italic" style={{ color: "#4B5563" }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="font-bold text-sm">{r.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                  {r.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET NIGEL ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-5" style={{ backgroundColor: "#FAFBFC" }}>
        <div className="max-w-3xl mx-auto text-center ph-animate">
          <div
            className="size-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: "#1976D2", fontFamily: "var(--font-mont)" }}
          >
            N
          </div>
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
            style={{ color: "#1976D2" }}
          >
            Meet Your Plumber
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-mont)" }}
          >
            Meet Nigel
          </h2>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "#64748B" }}>
            With over 15 years in the trade, Nigel started PH Blue with a
            simple promise: show up when you say you will, charge what you
            quoted, and leave the job cleaner than you found it. Based at
            Llandough Industrial Estate, PH Blue covers all of Cardiff and
            the surrounding CF postcode areas.
          </p>
        </div>
      </section>

      {/* ── NO SURPRISES ──────────────────────────────────────── */}
      <section className="py-14 sm:py-16 px-5" style={{ backgroundColor: "#0D1B2A" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4 ph-animate"
            style={{ fontFamily: "var(--font-mont)" }}
          >
            No surprises. Ever.
          </h2>
          <p className="text-base leading-relaxed mb-3 ph-animate" style={{ color: "rgba(255,255,255,0.5)" }}>
            Fixed price quotes. No hidden costs. No call-out fees for standard jobs.
          </p>
          <p className="text-sm ph-animate" style={{ color: "rgba(255,255,255,0.3)" }}>
            Finance options available on boiler installations.{" "}
            <button
              onClick={() => setQuoteOpen(true)}
              className="underline underline-offset-2 hover:text-white/50 transition-colors"
            >
              Ask us
            </button>
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 sm:py-20 px-5" style={{ backgroundColor: "#FAFBFC" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 ph-animate">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: "#1976D2" }}
            >
              FAQ
            </span>
            <h2
              className="text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-mont)" }}
            >
              Common questions
            </h2>
          </div>
          <div className="ph-animate">
            <Accordion type="single" collapsible>
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} style={{ borderColor: "#E5E7EB" }}>
                  <AccordionTrigger
                    className="hover:no-underline text-left font-semibold"
                    style={{ fontFamily: "var(--font-mont)", color: "#1A1A2E" }}
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent style={{ color: "#64748B" }}>
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CONTACT + FOOTER (unified dark section) ─────────── */}
      <section id="contact" className="px-5" style={{ backgroundColor: "#0D1B2A" }}>
        {/* Heading */}
        <div className="pt-20 sm:pt-24 pb-10 text-center ph-animate">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
            style={{ color: "#1976D2" }}
          >
            Get In Touch
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]"
            style={{ fontFamily: "var(--font-mont)" }}
          >
            Ready when
            <br />
            you are
          </h2>
          <p className="text-base max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            Free quotes. Fixed prices. Available 24/7 for emergencies.
          </p>
        </div>

        {/* Big phone number */}
        <div className="text-center pb-12 ph-animate">
          <Link
            href="tel:07545125168"
            className="inline-flex items-center gap-3 group"
          >
            <div
              className="size-14 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
              style={{ backgroundColor: "#1976D2" }}
            >
              <Phone className="size-6 text-white" />
            </div>
            <span
              className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-[#64B5F6] transition-colors"
              style={{ fontFamily: "var(--font-mont)" }}
            >
              07545 125168
            </span>
          </Link>
        </div>

        {/* Form card */}
        <div className="max-w-md mx-auto pb-14 ph-animate">
          <div
            className="bg-white rounded-2xl p-7 sm:p-8"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}
          >
            <h3
              className="font-extrabold text-lg mb-1"
              style={{ fontFamily: "var(--font-mont)", color: "#1A1A2E" }}
            >
              Request a callback
            </h3>
            <p className="text-sm mb-5" style={{ color: "#94A3B8" }}>
              Leave your details and we&apos;ll get back to you.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full h-12 px-4 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1976D2]"
                style={{ border: "1px solid #E5E7EB", backgroundColor: "#FAFBFC" }}
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full h-12 px-4 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1976D2]"
                style={{ border: "1px solid #E5E7EB", backgroundColor: "#FAFBFC" }}
              />
              <textarea
                rows={3}
                placeholder="What do you need help with?"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-[#1976D2]"
                style={{ border: "1px solid #E5E7EB", backgroundColor: "#FAFBFC" }}
              />
              <Button
                className="w-full h-12 text-sm font-bold rounded-lg border-0"
                style={{ backgroundColor: "#1976D2", color: "#ffffff" }}
              >
                Request Callback
              </Button>
            </div>
          </div>
        </div>

        {/* Contact details row */}
        <div
          className="max-w-3xl mx-auto pb-14 ph-animate"
        >
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <Link href="tel:07545125168" className="group">
              <Phone className="size-5 mx-auto mb-2" style={{ color: "#1976D2" }} />
              <div className="font-semibold text-sm text-white group-hover:text-[#64B5F6] transition-colors">
                07545 125168
              </div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                24/7 for emergencies
              </div>
            </Link>
            <Link href="mailto:info@phblue.co.uk" className="group">
              <Mail className="size-5 mx-auto mb-2" style={{ color: "#1976D2" }} />
              <div className="font-semibold text-sm text-white group-hover:text-[#64B5F6] transition-colors">
                info@phblue.co.uk
              </div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                We reply within a few hours
              </div>
            </Link>
            <div>
              <MapPin className="size-5 mx-auto mb-2" style={{ color: "#1976D2" }} />
              <div className="font-semibold text-sm text-white">
                Llandough Industrial Estate
              </div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Cardiff CF11 8RR
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="py-6 pb-28 md:pb-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span
                className="font-extrabold text-base"
                style={{ fontFamily: "var(--font-mont)", color: "#1976D2" }}
              >
                PHBLUE
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                Plumbing & Heating &middot; Cardiff
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                &copy; 2026 PH Blue
              </span>
              <Link
                href="https://highcroftdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.15em] uppercase hover:text-white/40 transition-colors"
                style={{ color: "rgba(255,255,255,0.1)" }}
              >
                Site by Highcroft Digital
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE BOTTOM BAR ─────────────────────────────────── */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 md:hidden px-4 py-3 bg-white/95 backdrop-blur-md"
        style={{ borderTop: "1px solid #E5E7EB", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}
      >
        <div className="flex gap-3">
          <Link href="tel:07545125168" className="flex-1">
            <Button
              className="w-full h-12 rounded-lg font-bold text-sm border-0"
              style={{ backgroundColor: "#ffffff", color: "#1976D2", border: "2px solid #1976D2" }}
            >
              <Phone className="size-4" /> Call Now
            </Button>
          </Link>
          <button onClick={() => setQuoteOpen(true)} className="flex-1">
            <Button
              className="w-full h-12 rounded-lg font-bold text-sm border-0"
              style={{ backgroundColor: "#ffffff", color: "#1976D2", border: "2px solid #1976D2" }}
            >
              Free Quote
            </Button>
          </button>
        </div>
      </div>

      {/* ── QUOTE SHEET (iOS style) ───────────────────────────── */}
      {quoteOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-5">
          {/* Backdrop */}
          <div
            className="absolute inset-0 ph-fade-in"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
            onClick={() => setQuoteOpen(false)}
          />
          {/* Card */}
          <div
            className="relative bg-white w-full max-w-md rounded-2xl p-7 sm:p-8 ph-slide-up"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
          >
            <button
              onClick={() => setQuoteOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              style={{ color: "#94A3B8" }}
            >
              <X className="size-5" />
            </button>

            <h3
              className="font-extrabold text-xl mb-1"
              style={{ fontFamily: "var(--font-mont)" }}
            >
              Get a Free Quote
            </h3>
            <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
              Tell us what you need and we&apos;ll call you back.
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full h-12 px-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1976D2]"
                style={{ border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full h-12 px-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1976D2]"
                style={{ border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
              />
              <textarea
                rows={3}
                placeholder="What do you need help with?"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-[#1976D2]"
                style={{ border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
              />
              <Button
                className="w-full h-12 text-sm font-bold rounded-xl border-0"
                style={{ backgroundColor: "#1976D2", color: "#ffffff" }}
              >
                Request Callback
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs" style={{ color: "#94A3B8" }}>
                Or call us directly:{" "}
                <Link href="tel:07545125168" className="font-bold" style={{ color: "#1976D2" }}>
                  07545 125168
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
