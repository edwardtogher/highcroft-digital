"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/animation/Reveal";
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

const channel4Images = [
  { src: "http://beautifulgardensonline.co.uk/wp-content/uploads/2017/11/Journey-End.jpg", alt: "Channel 4 garden show -- Journey's End finished design" },
  { src: "http://beautifulgardensonline.co.uk/wp-content/uploads/2017/11/Journeys-End.jpg", alt: "Channel 4 garden show -- Journey's End overview" },
  { src: "http://beautifulgardensonline.co.uk/wp-content/uploads/2017/11/Steel-stone-2.jpg", alt: "Channel 4 -- Steel and stone feature garden" },
  { src: "http://beautifulgardensonline.co.uk/wp-content/uploads/2017/11/DSCF3384.jpg", alt: "Channel 4 garden build -- decorative paving" },
  { src: "http://beautifulgardensonline.co.uk/wp-content/uploads/2017/11/DSCF3379.jpg", alt: "Channel 4 garden build -- landscape design" },
  { src: "http://beautifulgardensonline.co.uk/wp-content/uploads/2017/11/DSCF3372.jpg", alt: "Channel 4 garden build -- completed garden" },
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
/*  Text mask reveal                                                   */
/* ------------------------------------------------------------------ */

function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.7,
          delay: delay / 1000,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax image                                                     */
/* ------------------------------------------------------------------ */

function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-[120%] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function BeautifulGardensPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
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
    <div className="min-h-screen" style={{ background: "#f5f2eb", color: "#2a2a2a" }}>
      {/* ---- Sticky Nav ---- */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navSolid ? "rgba(245, 242, 235, 0.95)" : "transparent",
          backdropFilter: navSolid ? "blur(12px)" : "none",
          borderBottom: navSolid ? "1px solid rgba(138, 154, 123, 0.15)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/images/beautiful-gardens-logo-sharp.png"
              alt="Beautiful Gardens"
              width={160}
              height={40}
              className="h-8 w-auto invert"
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-wide transition-colors duration-200"
                style={{ color: "#6b6560" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#2a2a2a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#6b6560")
                }
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="rounded-full border-0 px-5 text-sm font-medium"
              style={{ background: "#5a7a4a", color: "#ffffff" }}
            >
              <a href="tel:07714693070">
                <Phone className="size-4" />
                Call Now
              </a>
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: "#2a2a2a" }}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="border-t px-6 pb-6 pt-4 md:hidden"
            style={{
              background: "rgba(245, 242, 235, 0.98)",
              borderColor: "rgba(138, 154, 123, 0.15)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 font-sans text-base"
                style={{ color: "#6b6560" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-4 w-full rounded-full border-0 text-sm font-medium"
              style={{ background: "#5a7a4a", color: "#ffffff" }}
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
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/beautiful-gardens-hero-watercolour.png"
          alt="Beautiful Gardens Channel 4 project -- watercolour illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,25,15,0.55) 0%, rgba(20,25,15,0.4) 50%, rgba(20,25,15,0.65) 100%)" }} />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <TextReveal delay={200}>
            <p
              className="mb-4 text-sm font-medium tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-elegant)" }}
            >
              Established 1969
            </p>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/beautiful-gardens-logo-sharp.png"
              alt="Beautiful Gardens"
              width={500}
              height={120}
              className="mb-6 h-auto w-64 sm:w-80 md:w-96 lg:w-[28rem]"
            />
          </motion.div>

          <TextReveal delay={700}>
            <p
              className="mb-2 text-lg font-light italic tracking-wide sm:text-xl md:text-2xl"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-elegant)" }}
            >
              Landscaping Excellence in Coventry &amp; Warwickshire
            </p>
          </TextReveal>

          <motion.p
            className="mb-10 max-w-md text-sm font-light"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Over 55 years of craftsmanship. Established by Des Feighan,
            now proudly continued by his son Mark.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full border-0 px-8 text-base font-medium"
              style={{ background: "rgba(255,255,255,0.95)", color: "#2a3a20" }}
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
              className="rounded-full px-8 text-base font-medium"
              style={{
                borderColor: "rgba(255,255,255,0.35)",
                color: "#ffffff",
                background: "transparent",
              }}
            >
              <a href="#services">View Our Work</a>
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-white/50 mx-auto" />
          </div>
        </div>
      </section>

      {/* ---- Stats Bar ---- */}
      <section style={{ background: "#eae7e0" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                <stat.icon className="mb-1 size-5" style={{ color: "#5a7a4a" }} />
                <span
                  className="font-[family-name:var(--font-elegant)] text-3xl font-normal"
                  style={{ color: "#2a2a2a" }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-sans text-sm tracking-wide"
                  style={{ color: "#6b6560" }}
                >
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- As Seen on Channel 4 ---- */}
      <section className="px-6 py-24 md:px-16 lg:px-24" style={{ background: "#2a3a20" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <Reveal>
              <Badge
                className="mb-4 rounded-full border px-4 py-1.5 text-xs font-medium tracking-widest uppercase"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Tv className="mr-1.5 size-3" />
                Featured Project
              </Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mb-4 text-4xl font-light tracking-tight md:text-5xl"
                style={{ color: "#ffffff", fontFamily: "var(--font-elegant)" }}
              >
                As Seen on Channel 4
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                className="mx-auto max-w-2xl text-base font-light leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Beautiful Gardens was selected to design and build a show garden
                for Channel 4 -- a testament to over five decades of landscaping
                excellence. Here is that project from concept to completion.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channel4Images.map((img, i) => (
              <Reveal key={img.src} animation="scaleUp" delay={i * 0.12}>
                <div
                  className="group relative overflow-hidden"
                  style={{ borderRadius: "12px", aspectRatio: "4/3" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(to top, rgba(20,25,15,0.6) 0%, transparent 50%)",
                    }}
                  />
                  <span
                    className="absolute bottom-0 left-0 translate-y-4 p-4 text-sm font-light opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ color: "#ffffff" }}
                  >
                    {img.alt}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section id="services" className="scroll-mt-20 px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p
              className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
              style={{ color: "#5a7a4a" }}
            >
              What We Do
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mb-16 max-w-lg font-[family-name:var(--font-elegant)] text-4xl font-normal md:text-5xl"
              style={{ color: "#2a2a2a" }}
            >
              Craftsmanship in Every Detail
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.08}>
                <Card
                  className="group border-0 transition-all duration-300"
                  style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f5f2eb";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#ffffff";
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
                        style={{ color: "#5a7a4a" }}
                      />
                    </div>
                    <h3
                      className="mb-2 font-[family-name:var(--font-elegant)] text-xl font-normal"
                      style={{ color: "#2a2a2a" }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="font-sans text-sm leading-relaxed font-light"
                      style={{ color: "#6b6560" }}
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
        style={{ background: "#eae7e0" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p
              className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
              style={{ color: "#5a7a4a" }}
            >
              Our Work
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mb-16 font-[family-name:var(--font-elegant)] text-4xl font-normal md:text-5xl"
              style={{ color: "#2a2a2a" }}
            >
              Recent Projects
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
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
              style={{ color: "#5a7a4a" }}
            >
              What Our Clients Say
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mb-16 font-[family-name:var(--font-elegant)] text-4xl font-normal md:text-5xl"
              style={{ color: "#2a2a2a" }}
            >
              5-Star Reviews
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} animation={i % 2 === 0 ? "slideLeft" : "slideRight"} delay={i * 0.15}>
                <Card
                  className="h-full border-0"
                  style={{ background: "#ffffff", borderRadius: "12px" }}
                >
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="mb-5 flex gap-1">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          className="size-4"
                          fill="#d4a74a"
                          style={{ color: "#d4a74a" }}
                        />
                      ))}
                    </div>
                    <p
                      className="mb-6 flex-1 font-sans text-sm leading-relaxed font-light italic"
                      style={{ color: "#4a5a3a" }}
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
                        style={{ color: "#2a2a2a" }}
                      >
                        {t.author}
                      </p>
                      {t.location && (
                        <p
                          className="font-sans text-xs"
                          style={{ color: "#6b6560" }}
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
        style={{ background: "#eae7e0" }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <Reveal>
            <div>
              <p
                className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
                style={{ color: "#5a7a4a" }}
              >
                Our Story
              </p>
              <h2
                className="mb-8 font-[family-name:var(--font-elegant)] text-4xl font-normal md:text-5xl"
                style={{ color: "#2a2a2a" }}
              >
                A Family Legacy
              </h2>
              <div className="space-y-5">
                <p
                  className="font-sans text-base leading-relaxed font-light"
                  style={{ color: "#6b6560" }}
                >
                  Beautiful Gardens was established in 1969 by Des Feighan, who
                  built the company&apos;s reputation on quality craftsmanship and
                  genuine care for every project. Today, his son Mark carries that
                  same passion forward.
                </p>
                <p
                  className="font-sans text-base leading-relaxed font-light"
                  style={{ color: "#6b6560" }}
                >
                  With over 55 years of experience and a feature on Channel 4,
                  Beautiful Gardens has become one of Coventry and Warwickshire&apos;s
                  most trusted landscaping companies. From garden design to water
                  features, every project reflects a dedication to excellence
                  passed down through generations.
                </p>
                <p
                  className="font-sans text-base leading-relaxed font-light"
                  style={{ color: "#6b6560" }}
                >
                  We take pride in transforming outdoor spaces into something
                  truly special -- working closely with every client from the
                  first sketch to the final stone.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal animation="scaleUp" delay={0.15}>
            <div
              className="relative"
              style={{ borderRadius: "12px", aspectRatio: "4/3", overflow: "hidden" }}
            >
              <ParallaxImage
                src="http://beautifulgardensonline.co.uk/wp-content/uploads/2019/06/DJI_0174.jpg"
                alt="Beautiful Gardens aerial view of completed garden project"
                className="absolute inset-0"
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
          background: "linear-gradient(135deg, #4a6a3a 0%, #5a7a4a 50%, #6a8a5a 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p
              className="mb-3 font-sans text-sm font-medium tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Get In Touch
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mb-6 font-[family-name:var(--font-elegant)] text-4xl font-normal md:text-5xl"
              style={{ color: "#ffffff" }}
            >
              Ready to Transform
              <br />
              Your Garden?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className="mx-auto mb-10 max-w-lg font-sans text-lg font-light"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Call Mark today for a free consultation and quote. Over 55 years of
              expertise, right on your doorstep.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full border-0 px-10 py-6 font-sans text-lg font-medium"
                style={{ background: "#ffffff", color: "#4a6a3a" }}
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
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "#ffffff",
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
              src="/images/beautiful-gardens-logo-sharp.png"
              alt="Beautiful Gardens"
              width={120}
              height={30}
              className="h-6 w-auto opacity-60"
            />
            <p className="font-sans text-xs" style={{ color: "#6b6560" }}>
              &copy; {new Date().getFullYear()} Beautiful Gardens. All rights
              reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <p className="font-sans text-xs" style={{ color: "#6b6560" }}>
              Coventry &amp; Warwickshire &middot; Est. 1969
            </p>
            <p className="font-sans text-xs" style={{ color: "rgba(154, 149, 141, 0.6)" }}>
              Website by{" "}
              <Link
                href="https://highcroftdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:underline"
                style={{ color: "#5a7a4a" }}
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
          background: "#5a7a4a",
          color: "#ffffff",
          boxShadow: "0 4px 24px rgba(90, 122, 74, 0.3)",
        }}
        aria-label="Call Beautiful Gardens"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
