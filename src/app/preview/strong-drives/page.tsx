"use client";

import { useState } from "react";
import Image from "next/image";
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
  CreditCard,
  CheckCircle2,
  Hammer,
  Droplets,
  Layers,
  TreePine,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ------------------------------------------------------------------ */
/*  LOGO                                                               */
/* ------------------------------------------------------------------ */

function StrongDrivesLogo({ className = "", size = "default" }: { className?: string; size?: "default" | "large" }) {
  const isLarge = size === "large";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon — abstract house + driveway lines */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className={isLarge ? "size-12" : "size-8"}
      >
        {/* House shape */}
        <path
          d="M20 4L4 18h4v16h24V18h4L20 4z"
          fill="none"
          stroke="#D4A039"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Driveway perspective lines */}
        <path d="M14 34L18 24h4l4 10" fill="none" stroke="#D4A039" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Center paving line */}
        <line x1="20" y1="24" x2="20" y2="34" stroke="#D4A039" strokeWidth="1" opacity="0.5" />
      </svg>
      {/* Text */}
      <div className="leading-none">
        <div className={`font-bold tracking-[0.15em] uppercase text-white ${isLarge ? "text-2xl" : "text-sm"}`}>
          Strong<span className="text-[#D4A039]"> Drives</span>
        </div>
        {isLarge && (
          <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mt-1">
            Specialist in Driveways & Landscapes
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA — from the original strongdrivesleicester.co.uk               */
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
/*  ACCENT                                                             */
/* ------------------------------------------------------------------ */

const AMBER = "#D4A039";

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function StrongDrivesPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-neutral-400 antialiased">

      {/* ── NAV ───────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
          <a href="#">
            <StrongDrivesLogo />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 hover:text-[#D4A039] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:07535687080" className="hidden sm:block">
              <Button
                variant="outline"
                className="h-9 px-5 rounded-none border-[#D4A039]/30 bg-transparent text-[#D4A039] text-[11px] tracking-[0.2em] uppercase hover:bg-[#D4A039] hover:text-black cursor-pointer transition-all duration-300"
              >
                <Phone className="size-3.5 mr-2" />
                07535 687080
              </Button>
            </a>
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
          <nav className="md:hidden bg-[#0F0F0F] border-t border-white/[0.04] px-5 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileNav(false)}
                className="block py-3 text-sm tracking-[0.2em] uppercase text-neutral-400 hover:text-[#D4A039] transition-colors"
              >
                {link}
              </a>
            ))}
            <a href="tel:07535687080" className="block pt-3">
              <Button className="w-full h-12 rounded-none bg-[#D4A039] text-black text-sm font-bold tracking-widest uppercase hover:bg-[#c4922e] cursor-pointer">
                <Phone className="size-4 mr-2" /> Call Now
              </Button>
            </a>
          </nav>
        )}
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-20 sm:pb-28">
        <Image
          src="/strong-drives-hero.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
          {/* Large logo */}
          <StrongDrivesLogo size="large" className="mb-10" />

          <h1 className="text-[clamp(2.4rem,7vw,5.5rem)] font-bold text-white leading-[0.92] tracking-tight font-[family-name:var(--font-oswald)] uppercase">
            Transform Your
            <br />
            Outdoor Space
          </h1>

          <p className="mt-5 text-neutral-400 text-base sm:text-lg max-w-md leading-relaxed">
            Over 20 years of expert craftsmanship in driveways and landscapes
            across Leicester & Leicestershire. Finance options available.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:07535687080">
              <Button className="h-13 px-8 rounded-none bg-[#D4A039] text-black text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#e5b04a] cursor-pointer transition-all duration-300">
                <Phone className="size-4 mr-2" /> Get a Free Quote
              </Button>
            </a>
            <a href="#gallery">
              <Button
                variant="outline"
                className="h-13 px-8 rounded-none border-white/10 bg-white/[0.03] text-white text-sm font-bold tracking-[0.15em] uppercase hover:bg-white/[0.08] cursor-pointer transition-all duration-300"
              >
                View Our Work <ChevronRight className="size-4 ml-1" />
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-500">
            <span className="flex items-center gap-2">
              <Shield className="size-3.5 text-[#D4A039]/60" /> 20+ Years Experience
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-[#D4A039]/60" /> VUBAR Registered
            </span>
            <span className="flex items-center gap-2">
              <CreditCard className="size-3.5 text-[#D4A039]/60" /> Finance Available
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {[
            { value: "20+", label: "Years Experience" },
            { value: "5.0", label: "Google Rating" },
            { value: "500+", label: "Driveways Built" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-10 px-5 sm:px-8 ${i > 0 ? "border-l border-white/[0.04]" : ""}`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#D4A039] font-[family-name:var(--font-oswald)]">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A039]/70 block mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-oswald)] uppercase mb-14">
            Everything from block paving
            <br className="hidden sm:block" /> to complete landscaping
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="bg-[#0F0F0F] border-0 rounded-none group hover:bg-[#141414] transition-colors duration-300"
                >
                  <CardContent className="p-7 sm:p-8">
                    <div className="size-10 flex items-center justify-center border border-[#D4A039]/20 mb-5 group-hover:border-[#D4A039]/40 transition-colors">
                      <Icon className="size-5 text-[#D4A039]" />
                    </div>
                    <h3 className="text-white text-base font-bold tracking-wide uppercase mb-2 font-[family-name:var(--font-oswald)]">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}

            {/* Finance card */}
            <Card className="bg-[#D4A039]/[0.06] border-0 rounded-none">
              <CardContent className="p-7 sm:p-8 flex flex-col justify-center h-full">
                <div className="size-10 flex items-center justify-center border border-[#D4A039]/30 mb-5">
                  <CreditCard className="size-5 text-[#D4A039]" />
                </div>
                <h3 className="text-[#D4A039] text-base font-bold tracking-wide uppercase mb-2 font-[family-name:var(--font-oswald)]">
                  Finance Available
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Flexible finance options to spread the cost. Ask us for details when you get your free quote.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────── */}
      <section id="gallery" className="pb-20 sm:pb-28 px-5">
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A039]/70 block mb-4">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-oswald)] uppercase mb-14">
            Recent Projects
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white text-xs font-bold tracking-[0.15em] uppercase">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / MISSION ───────────────────────────────────── */}
      <section className="bg-[#0F0F0F] py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A039]/70 block mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-oswald)] uppercase mb-6">
              Beautiful & Functional
              <br />Outdoor Spaces
            </h2>
            <p className="text-neutral-400 text-sm leading-[1.8] mb-6">
              At Strong Drives, our mission is to create beautiful and functional outdoor spaces.
              With over 20 years of experience, our team of highly skilled professionals are
              passionate about delivering the highest quality driveways and landscapes across
              Leicester and Leicestershire.
            </p>
            <p className="text-neutral-400 text-sm leading-[1.8]">
              We offer a wide range of services including Concrete Cobblecrete, Resin, Tarmac
              and Block Paving. As registered VUBAR installers, we guarantee a premium finish
              on every project.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { title: "Our Mission", text: "To create beautiful and functional outdoor spaces with premium materials and expert craftsmanship that stands the test of time." },
              { title: "Our Team", text: "Highly skilled and experienced professionals who are passionate about what they do. Every member of our team takes pride in delivering exceptional results." },
              { title: "Our Promise", text: "We stay in constant communication with our customers until the job is done. Every project comes with a written guarantee." },
            ].map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-[#D4A039]/30 pl-6"
              >
                <h3 className="text-white text-sm font-bold tracking-[0.1em] uppercase mb-2 font-[family-name:var(--font-oswald)]">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <section id="reviews" className="py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
            <div>
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A039]/70 block mb-4">
                Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-oswald)] uppercase">
                See Why Our Clients
                <br />Love Strong Drives
              </h2>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-[#D4A039] text-[#D4A039]" />
                ))}
              </div>
              <span className="text-white text-sm font-bold">5.0</span>
              <span className="text-neutral-600 text-xs tracking-wide">on Google</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-white/[0.04]">
            {REVIEWS.map((review) => (
              <Card
                key={review.name}
                className="bg-[#0F0F0F] border-0 rounded-none"
              >
                <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3 fill-[#D4A039] text-[#D4A039]" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-sm leading-[1.8] flex-1 mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <Separator className="bg-white/[0.04] mb-4" />
                  <div>
                    <div className="text-white text-xs font-bold tracking-[0.15em] uppercase">
                      {review.name}
                    </div>
                    <div className="text-neutral-600 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                      {review.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section className="bg-[#0F0F0F] py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A039]/70 block mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-oswald)] uppercase mb-14">
            Four Simple Steps
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.04]">
            {[
              { step: "01", title: "Get in Touch", desc: "Call, text, or email for a free no-obligation quote." },
              { step: "02", title: "Site Visit", desc: "We visit your property and discuss your vision in detail." },
              { step: "03", title: "Installation", desc: "Our experienced team transforms your space." },
              { step: "04", title: "Enjoy", desc: "Sit back and enjoy your brand new driveway." },
            ].map((item) => (
              <div key={item.step} className="p-8 lg:first:pl-0 lg:last:pr-0">
                <span className="text-[#D4A039]/20 text-5xl font-bold leading-none font-[family-name:var(--font-oswald)]">
                  {item.step}
                </span>
                <h3 className="text-white text-sm font-bold tracking-[0.1em] uppercase mt-4 mb-2 font-[family-name:var(--font-oswald)]">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A039]/70 block mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-oswald)] uppercase">
              Common
              <br />Questions
            </h2>
            <p className="mt-4 text-neutral-500 text-sm leading-relaxed">
              Can&apos;t find what you&apos;re looking for?
              Give us a call and we&apos;ll be happy to help.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-white/[0.04] first:border-t"
              >
                <AccordionTrigger className="text-white text-sm font-semibold tracking-tight hover:no-underline py-6 hover:text-[#D4A039] transition-colors [&>svg]:text-neutral-600 [&>svg]:size-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-sm leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA / CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="bg-[#0F0F0F] py-20 sm:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A039]/70 block mb-4">
            Get Started
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-[0.95] tracking-tight font-[family-name:var(--font-oswald)] uppercase">
            Ready to transform
            <br />your driveway?
          </h2>

          <Separator className="bg-white/[0.04] my-10 max-w-xl" />

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <a
                href="tel:07535687080"
                className="text-[clamp(1.4rem,3.5vw,2.5rem)] font-bold text-[#D4A039] tracking-tight hover:text-[#e5b04a] transition-colors font-[family-name:var(--font-oswald)]"
              >
                07535 687080
              </a>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="mailto:strongdrive55@gmail.com"
                  className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors flex items-center gap-2"
                >
                  <Mail className="size-3.5" /> strongdrive55@gmail.com
                </a>
                <span className="text-neutral-500 text-sm flex items-center gap-2">
                  <Clock className="size-3.5" /> Mon - Fri, 9:00 - 17:00
                </span>
              </div>
            </div>

            <div className="flex items-end">
              <a href="tel:07535687080">
                <Button className="h-13 px-10 rounded-none bg-[#D4A039] text-black text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#e5b04a] cursor-pointer transition-all duration-300">
                  <Phone className="size-4 mr-2" /> Call Now
                </Button>
              </a>
            </div>
          </div>

          <p className="mt-12 text-neutral-600 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
            <MapPin className="size-3" /> Newtown Linford Lane, Groby &middot; Leicester &middot; Leicestershire
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] py-6 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-neutral-700 text-[10px] tracking-[0.15em] uppercase">
            &copy; 2025 Strong Drives &middot; Newtown Linford Lane, Groby LE6 0EA
          </span>
          <span className="text-neutral-800 text-[10px] tracking-[0.15em]">
            Site by{" "}
            <a
              href="https://highcroftdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-500 transition-colors"
            >
              Highcroft Digital
            </a>
          </span>
        </div>
      </footer>

      {/* ── FLOATING CALL (mobile) ────────────────────────────── */}
      <a
        href="tel:07535687080"
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center bg-[#D4A039] text-black shadow-[0_4px_24px_rgba(212,160,57,0.3)] hover:scale-105 active:scale-95 transition-transform md:hidden"
        aria-label="Call Strong Drives"
      >
        <Phone className="size-5" />
      </a>
    </div>
  );
}
