"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  PenTool,
  Blocks,
  LayoutGrid,
  Fence,
  TreePine,
  Waves,
  Phone,
  Mail,
  Star,
  MapPin,
  Clock,
  Tv,
  Menu,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Metadata (exported from a separate file since this is "use client") */
/* ------------------------------------------------------------------ */

// Metadata is handled via generateMetadata in a layout or a separate file.
// For a "use client" page, we export metadata from a sibling metadata.ts or
// rely on the parent layout. We'll add a <title> via useEffect as a fallback.

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    title: "Garden Design",
    description: "Full garden design service from concept to completion",
    icon: PenTool,
  },
  {
    title: "Block Paving",
    description: "Driveways, paths and patios using premium block paving",
    icon: Blocks,
  },
  {
    title: "Patios & Paving",
    description: "Natural stone, porcelain and concrete patio installations",
    icon: LayoutGrid,
  },
  {
    title: "Fencing",
    description: "Timber fencing, gates and boundary solutions",
    icon: Fence,
  },
  {
    title: "Timber & Decking",
    description: "Bespoke timber structures, decking and pergolas",
    icon: TreePine,
  },
  {
    title: "Ponds & Water Features",
    description:
      "Design and installation of garden ponds and water features",
    icon: Waves,
  },
];

const galleryImages = [
  "http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/DJI_0165.jpg",
  "http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/DJI_0174.jpg",
  "http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/DJI_0148.jpg",
  "http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/20190515_160905.jpg",
  "http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/20190319_154017.jpg",
  "http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/20190404_141816.jpg",
];

const testimonials = [
  {
    text: "The work you did was outstanding. From understanding our concepts and design, to quotation, project start up and delivery, the team were great. Everything we were expecting was delivered and we liked the way you added and adapted to the design as it evolved.",
    author: "Rob & Nikki",
    location: "Earlsdon, Coventry",
  },
  {
    text: "Just a brief note to say thanks for the superb job you made of our patio and pond. We are so pleased with the end result and we have already spent many hours sitting on our new patio. The slabs we chose look amazing and the drainage works beautifully.",
    author: "Martin & Gina Freeman",
    location: "",
  },
  {
    text: "From a pencil drawing on a piece of paper I am now the proud owner of a garden that even Alan Titchmarsh would be proud of. His constant checking and reassuring to the quality is without fail, a fine attribute to the company.",
    author: "Andi Jones",
    location: "",
  },
];

const stats = [
  { value: "55+", label: "Years of Excellence", icon: Clock },
  { value: "Ch4", label: "Channel 4 Featured", icon: Tv },
  { value: "5.0", label: "Google Reviews", icon: Star },
  { value: "Coventry", label: "& Warwickshire", icon: MapPin },
];

/* ------------------------------------------------------------------ */
/*  Scroll reveal hook                                                 */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Reveal wrapper component                                           */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function BeautifulGardensPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    document.title = "Beautiful Gardens - Coventry & Warwickshire Landscaping Since 1969";
  }, []);

  // Sticky nav background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#1a1a1a", color: "#f5f2eb" }}>
      {/* ---- Sticky Nav ---- */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navSolid ? "rgba(26, 26, 26, 0.95)" : "transparent",
          backdropFilter: navSolid ? "blur(12px)" : "none",
          borderBottom: navSolid ? "1px solid rgba(138, 154, 123, 0.15)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <Image
              src="http://beautifulgardensonline.co.uk/wp-content/themes/beautiful-gardens/static/img/logo.png"
              alt="Beautiful Gardens"
              width={160}
              height={40}
              unoptimized
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-wide transition-colors duration-200"
                style={{ color: "#9a958d" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#f5f2eb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#9a958d")
                }
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="rounded-full border-0 px-5 text-sm font-medium"
              style={{ background: "#8a9a7b", color: "#1a1a1a" }}
            >
              <a href="tel:07714693070">
                <Phone className="size-4" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: "#f5f2eb" }}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            className="border-t px-6 pb-6 pt-4 md:hidden"
            style={{
              background: "rgba(26, 26, 26, 0.98)",
              borderColor: "rgba(138, 154, 123, 0.15)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 font-sans text-base"
                style={{ color: "#9a958d" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-4 w-full rounded-full border-0 text-sm font-medium"
              style={{ background: "#8a9a7b", color: "#1a1a1a" }}
            >
              <a href="tel:07714693070">
                <Phone className="size-4" />
                0771 4693 070
              </a>
            </Button>
          </div>
        )}
      </nav>

      {/* ---- Hero ---- */}
      <section className="relative flex min-h-screen flex-col justify-center px-6 pt-24 pb-16 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <Badge
              className="mb-6 rounded-full border px-4 py-1.5 font-sans text-xs font-medium tracking-widest uppercase"
              style={{
                background: "rgba(138, 154, 123, 0.12)",
                borderColor: "rgba(138, 154, 123, 0.3)",
                color: "#a3b294",
              }}
            >
              Est. 1969
            </Badge>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="mb-6 font-serif text-5xl leading-[1.1] font-normal tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ color: "#f5f2eb" }}
            >
              Beautiful
              <br />
              Gardens
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="mb-10 max-w-xl font-sans text-lg leading-relaxed font-light md:text-xl"
              style={{ color: "#9a958d" }}
            >
              Over 55 years of landscaping excellence in Coventry &amp;
              Warwickshire. Established by Des Feighan in 1969, now proudly
              continued by his son Mark.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full border-0 px-8 font-sans text-base font-medium"
                style={{ background: "#8a9a7b", color: "#1a1a1a" }}
              >
                <a href="tel:07714693070">
                  <Phone className="size-5" />
                  0771 4693 070
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-sans text-base font-medium"
                style={{
                  borderColor: "rgba(138, 154, 123, 0.3)",
                  color: "#a3b294",
                  background: "transparent",
                }}
              >
                <a href="#services">View Our Work</a>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Decorative gradient */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(138,154,123,0.4) 0%, transparent 70%)",
          }}
        />
      </section>

      {/* ---- Stats Bar ---- */}
      <section style={{ background: "#242424" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <stat.icon className="mb-1 size-5" style={{ color: "#8a9a7b" }} />
                <span
                  className="font-serif text-3xl font-normal"
                  style={{ color: "#f5f2eb" }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-sans text-sm tracking-wide"
                  style={{ color: "#9a958d" }}
                >
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Services ---- */}
      <section id="services" className="scroll-mt-20 px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p
              className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
              style={{ color: "#8a9a7b" }}
            >
              What We Do
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mb-16 max-w-lg font-serif text-4xl font-normal md:text-5xl"
              style={{ color: "#f5f2eb" }}
            >
              Craftsmanship in Every Detail
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 80}>
                <Card
                  className="group border-0 transition-all duration-300"
                  style={{
                    background: "#242424",
                    borderRadius: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#2a2a2a";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#242424";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <CardContent className="p-8">
                    <div
                      className="mb-5 flex size-12 items-center justify-center rounded-lg"
                      style={{ background: "rgba(138, 154, 123, 0.12)" }}
                    >
                      <service.icon
                        className="size-6"
                        style={{ color: "#8a9a7b" }}
                      />
                    </div>
                    <h3
                      className="mb-2 font-serif text-xl font-normal"
                      style={{ color: "#f5f2eb" }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="font-sans text-sm leading-relaxed font-light"
                      style={{ color: "#9a958d" }}
                    >
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Gallery ---- */}
      <section
        id="gallery"
        className="scroll-mt-20 px-6 py-24 md:px-16 lg:px-24"
        style={{ background: "#242424" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p
              className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
              style={{ color: "#8a9a7b" }}
            >
              Our Work
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mb-16 font-serif text-4xl font-normal md:text-5xl"
              style={{ color: "#f5f2eb" }}
            >
              Recent Projects
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src, i) => (
              <Reveal key={src} delay={i * 80}>
                <div
                  className="group relative overflow-hidden"
                  style={{ borderRadius: "12px", aspectRatio: "4/3" }}
                >
                  <Image
                    src={src}
                    alt={`Beautiful Gardens project ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section id="reviews" className="scroll-mt-20 px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p
              className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
              style={{ color: "#8a9a7b" }}
            >
              What Our Clients Say
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mb-16 font-serif text-4xl font-normal md:text-5xl"
              style={{ color: "#f5f2eb" }}
            >
              5-Star Reviews
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 100}>
                <Card
                  className="h-full border-0"
                  style={{ background: "#242424", borderRadius: "12px" }}
                >
                  <CardContent className="flex h-full flex-col p-8">
                    {/* Stars */}
                    <div className="mb-5 flex gap-1">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          className="size-4"
                          fill="#8a9a7b"
                          style={{ color: "#8a9a7b" }}
                        />
                      ))}
                    </div>
                    <p
                      className="mb-6 flex-1 font-sans text-sm leading-relaxed font-light italic"
                      style={{ color: "#c5d1ba" }}
                    >
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <Separator
                      className="mb-4"
                      style={{ background: "rgba(138, 154, 123, 0.15)" }}
                    />
                    <div>
                      <p
                        className="font-sans text-sm font-medium"
                        style={{ color: "#f5f2eb" }}
                      >
                        {t.author}
                      </p>
                      {t.location && (
                        <p
                          className="font-sans text-xs"
                          style={{ color: "#9a958d" }}
                        >
                          {t.location}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- About ---- */}
      <section
        id="about"
        className="scroll-mt-20 px-6 py-24 md:px-16 lg:px-24"
        style={{ background: "#242424" }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <Reveal>
            <div>
              <p
                className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
                style={{ color: "#8a9a7b" }}
              >
                Our Story
              </p>
              <h2
                className="mb-8 font-serif text-4xl font-normal md:text-5xl"
                style={{ color: "#f5f2eb" }}
              >
                A Family Legacy
              </h2>
              <div className="space-y-5">
                <p
                  className="font-sans text-base leading-relaxed font-light"
                  style={{ color: "#9a958d" }}
                >
                  Beautiful Gardens was established in 1969 by Des Feighan, who
                  built the company&apos;s reputation on quality craftsmanship and
                  genuine care for every project. Today, his son Mark carries that
                  same passion forward.
                </p>
                <p
                  className="font-sans text-base leading-relaxed font-light"
                  style={{ color: "#9a958d" }}
                >
                  With over 55 years of experience and a feature on Channel 4,
                  Beautiful Gardens has become one of Coventry and Warwickshire&apos;s
                  most trusted landscaping companies. From garden design to water
                  features, every project reflects a dedication to excellence
                  passed down through generations.
                </p>
                <p
                  className="font-sans text-base leading-relaxed font-light"
                  style={{ color: "#9a958d" }}
                >
                  We take pride in transforming outdoor spaces into something
                  truly special -- working closely with every client from the
                  first sketch to the final stone.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "12px", aspectRatio: "4/3" }}
            >
              <Image
                src="http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/DJI_0174.jpg"
                alt="Beautiful Gardens aerial view of completed garden project"
                fill
                unoptimized
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(138,154,123,0.15) 0%, transparent 60%)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Contact CTA ---- */}
      <section
        id="contact"
        className="scroll-mt-20 px-6 py-24 md:px-16 lg:px-24"
        style={{
          background: "linear-gradient(135deg, #2a3525 0%, #1a1a1a 50%, #242424 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p
              className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
              style={{ color: "#a3b294" }}
            >
              Get In Touch
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mb-6 font-serif text-4xl font-normal md:text-5xl"
              style={{ color: "#f5f2eb" }}
            >
              Ready to Transform
              <br />
              Your Garden?
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mx-auto mb-10 max-w-lg font-sans text-lg font-light"
              style={{ color: "#9a958d" }}
            >
              Call Mark today for a free consultation and quote. Over 55 years of
              expertise, right on your doorstep.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full border-0 px-10 py-6 font-sans text-lg font-medium"
                style={{ background: "#8a9a7b", color: "#1a1a1a" }}
              >
                <a href="tel:07714693070">
                  <Phone className="size-5" />
                  0771 4693 070
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 py-6 font-sans text-lg font-medium"
                style={{
                  borderColor: "rgba(138, 154, 123, 0.3)",
                  color: "#a3b294",
                  background: "transparent",
                }}
              >
                <a href="mailto:mark@beautifulgardensonline.co.uk">
                  <Mail className="size-5" />
                  Email Us
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer
        className="px-6 py-12 md:px-16 lg:px-24"
        style={{
          background: "#141414",
          borderTop: "1px solid rgba(138, 154, 123, 0.1)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Image
              src="http://beautifulgardensonline.co.uk/wp-content/themes/beautiful-gardens/static/img/logo.png"
              alt="Beautiful Gardens"
              width={120}
              height={30}
              unoptimized
              className="h-6 w-auto opacity-60"
            />
            <p className="font-sans text-xs" style={{ color: "#9a958d" }}>
              &copy; {new Date().getFullYear()} Beautiful Gardens. All rights
              reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <p className="font-sans text-xs" style={{ color: "#9a958d" }}>
              Coventry &amp; Warwickshire &middot; Est. 1969
            </p>
            <p className="font-sans text-xs" style={{ color: "rgba(154, 149, 141, 0.6)" }}>
              Website by{" "}
              <Link
                href="https://highcroftdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:underline"
                style={{ color: "#8a9a7b" }}
              >
                Highcroft Digital
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* ---- Floating phone button (mobile) ---- */}
      <a
        href="tel:07714693070"
        className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-105 md:hidden"
        style={{
          background: "#8a9a7b",
          color: "#1a1a1a",
          boxShadow: "0 4px 24px rgba(138, 154, 123, 0.3)",
        }}
        aria-label="Call Beautiful Gardens"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
