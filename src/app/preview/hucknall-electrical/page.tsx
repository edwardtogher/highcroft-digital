"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Zap,
  Sun,
  Shield,
  Menu,
  X,
  Mail,
  MapPin,
  CheckCircle,
  Layers,
  Users,
  CreditCard,
  Clock,
  Send,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Zap,
    title: "Rewiring",
    desc: "Full and partial rewiring for domestic and commercial properties. We ensure your electrical systems conform to all Part P regulations using the best equipment and techniques.",
  },
  {
    icon: Sun,
    title: "Lighting",
    desc: "Interior and exterior lighting solutions including down lights, spotlights, security lighting, and emergency lighting systems. Expertly sourced, installed, and maintained.",
  },
  {
    icon: Shield,
    title: "Alarms & Security",
    desc: "Fire alarms, smoke alarms, burglar alarms, CCTV, motion detectors, door access control and intercom systems to keep your property safe and compliant.",
  },
];

const OTHER_SERVICES = [
  "Consumer Unit Upgrades",
  "Inspection & Testing",
  "PAT Testing",
  "Fault Finding",
  "Showers",
  "Smoke Alarms",
  "LED Lighting",
];

const WHY_US = [
  { icon: CheckCircle, title: "NICEIC Approved", desc: "All our work is backed by the National Inspection Council for Electrical Installation Contracting - your guarantee of quality." },
  { icon: Layers, title: "Fully Qualified", desc: "City & Guilds certified, Part P compliant and CHAS accredited. Every technician is trained to the highest standard." },
  { icon: Users, title: "Personal Service", desc: "Run personally by Alan Richardson since 2006. You'll always deal with the same trusted team who know your property." },
  { icon: CreditCard, title: "Fair & Transparent", desc: "Free no-obligation quotations, competitive pricing, and no hidden costs. We give you an honest price and stick to it." },
  { icon: Shield, title: "Fully Insured", desc: "Complete public liability insurance and all work covered by extensive warranties and guarantees for your peace of mind." },
  { icon: Clock, title: "Fast Response", desc: "Quick turnaround on quotes and emergency callouts. When you need an electrician, we're there - often the same day." },
];

const TESTIMONIALS = [
  { name: "Mr Goodall", initials: "MG", rating: "10/10", job: "Fuse board replacement", text: "Alan and his team were brilliant replacing my 20 year old fuse board and adding a new external fuse board. Quick responses to emails and a competitive quote. The work took about 3 hours and has been done to a very high standard." },
  { name: "Mr & Mrs Cook", initials: "MC", rating: "10/10", job: "Emergency RCCB repair", text: "Quick response to a Friday night call out. Alan resolved an issue with an RCCB that kept tripping and leaving us without socket power. Very professional and answered all my extra questions. Will use again!" },
  { name: "Mrs Glover", initials: "MG", rating: "10/10", job: "Immersion tank repair", text: "Replied to my post within minutes. They were prompt and identified the issue very quickly. The problem was explained to me and the work was carried out with no mess. Both electricians were polite and friendly." },
  { name: "Mrs Ecclcyshaw", initials: "ME", rating: "10/10", job: "Emergency fault callout", text: "I needed a callout as a fuse was tripping and I couldn't identify the cause. They arrived within an hour, quickly identified the fault and resolved it. No mess at all, and they explained the problem at all points." },
  { name: "Mr Ayre", initials: "MA", rating: "9.5/10", job: "Fault identification", text: "An electrical fault was tripping the fuse for the kitchen sockets. The guys were very diligent and managed to find the cause, make it safe, and made a change so a trip wouldn't be as disruptive. Very happy with the service." },
];

const GALLERY = [
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image16-300x225.png", alt: "Tidy up" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image2-225x300.png", alt: "Fuse board swap" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image3-225x300.png", alt: "Additions" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image4-225x300.png", alt: "Rewire" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image5-225x300.png", alt: "Socket upgrade" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image6-196x300.png", alt: "New outdoor light" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image7-225x300.png", alt: "New fuse board" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/image9-300x225.png", alt: "Fuse board swap" },
];

const ACCREDITATIONS = [
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/10/niceic-logo.png", alt: "NICEIC Approved" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/06/City_and_guilds-1.jpg", alt: "City & Guilds" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/10/Part-p.png", alt: "Part P Certified" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/10/ChasLogo_png.png", alt: "CHAS Accredited" },
  { src: "https://hucknallelectrical.co.uk/wp-content/uploads/2022/10/Checkatrade_blk1.png", alt: "Checkatrade" },
];

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL HOOK                                                 */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "reveal", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, decimal, suffix, freeText }: { target?: number; decimal?: boolean; suffix?: string; freeText?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const [display, setDisplay] = useState(freeText || "0");

  useEffect(() => {
    const el = ref.current;
    if (!el || freeText) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current && target != null) {
          animated.current = true;
          const t = target;
          const duration = 2000;
          const start = performance.now();
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = t * eased;
            setDisplay((decimal ? current.toFixed(1) : Math.floor(current).toString()) + (suffix || ""));
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay((decimal ? t.toFixed(1) : t.toString()) + (suffix || ""));
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, decimal, suffix, freeText]);

  return <div ref={ref} className="stat-number">{display}</div>;
}

/* ------------------------------------------------------------------ */
/*  STAR SVG                                                           */
/* ------------------------------------------------------------------ */

function Star() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="var(--yellow)" stroke="var(--yellow)">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function HucknallElectricalPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <style>{`
        :root {
          --red: #D10A10;
          --red-dark: #A80810;
          --red-glow: rgba(209, 10, 16, 0.3);
          --yellow: #FFED00;
          --yellow-soft: #FFF176;
          --navy: #0E2B5C;
          --navy-deep: #091D3E;
          --black: #0A0A0A;
          --white: #FFFFFF;
          --grey-50: #F8F9FA;
          --grey-100: #F1F3F5;
          --grey-200: #E9ECEF;
          --grey-400: #ADB5BD;
          --grey-600: #6C757D;
          --grey-800: #343A40;
          --radius: 16px;
          --radius-sm: 10px;
          --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .he-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: var(--grey-800); line-height: 1.6; -webkit-font-smoothing: antialiased; }
        .he-page img { max-width: 100%; height: auto; display: block; }
        .he-page a { text-decoration: none; color: inherit; }

        /* Scroll animations */
        .reveal, .reveal-left, .reveal-right, .reveal-scale { opacity: 0; transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal { transform: translateY(40px); }
        .reveal-left { transform: translateX(-60px); }
        .reveal-right { transform: translateX(60px); }
        .reveal-scale { transform: scale(0.9); }
        .visible { opacity: 1 !important; transform: translateY(0) translateX(0) scale(1) !important; }

        /* Stat number */
        .stat-number { font-size: 2.8rem; font-weight: 900; color: var(--red); letter-spacing: -0.03em; line-height: 1; margin-bottom: 8px; }
        @media (max-width: 480px) { .stat-number { font-size: 2.2rem; } }
      `}</style>

      <div className="he-page" style={{ overflowX: "hidden" }}>

        {/* ==================== HEADER ==================== */}
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
          boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.3)" : "none",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: scrolled ? "10px 24px" : "16px 24px",
            maxWidth: 1200, margin: "0 auto", transition: "padding 0.3s ease",
          }}>
            <a href="#">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://hucknallelectrical.co.uk/wp-content/uploads/2022/05/cropped-HE_Logo.png"
                alt="Hucknall Electrical"
                style={{ height: scrolled ? 36 : 48, width: "auto", transition: "height 0.3s ease" }}
              />
            </a>

            {/* Desktop nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: 8 }} className="he-desktop-nav">
              <style>{`.he-desktop-nav { display: flex !important; } @media (max-width: 768px) { .he-desktop-nav { display: none !important; } }`}</style>
              {["about", "services", "testimonials", "gallery", "contact"].map(id => (
                <button key={id} onClick={() => scrollTo(id)} style={{
                  background: "none", border: "none", color: "white", fontSize: "0.9rem", fontWeight: 500,
                  padding: "8px 16px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit",
                  transition: "background 0.3s ease", letterSpacing: "-0.01em", textTransform: "capitalize",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  {id === "testimonials" ? "Reviews" : id}
                </button>
              ))}
              <a href="tel:01159565550" style={{
                background: "var(--red)", color: "white", fontWeight: 600, padding: "10px 24px",
                borderRadius: 100, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8,
              }}>
                <Phone size={14} /> 0115 956 5550
              </a>
            </nav>

            {/* Mobile toggle */}
            <button onClick={() => setMenuOpen(true)} className="he-mobile-toggle" aria-label="Open menu" style={{
              background: "none", border: "none", color: "white", padding: 8, cursor: "pointer", display: "none",
            }}>
              <style>{`@media (max-width: 768px) { .he-mobile-toggle { display: block !important; } }`}</style>
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* ==================== MOBILE NAV ==================== */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          opacity: menuOpen ? 1 : 0, visibility: menuOpen ? "visible" : "hidden", pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.35s ease, visibility 0.35s ease",
        }}>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{
            position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "white",
            width: 48, height: 48, cursor: "pointer", zIndex: 10000, display: "flex", alignItems: "center",
            justifyContent: "center", borderRadius: 12,
          }}>
            <X size={24} />
          </button>
          {["about", "services", "testimonials", "gallery", "contact"].map((id, i) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", color: "white", fontSize: "1.4rem", fontWeight: 600,
              padding: "12px 32px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit",
              textTransform: "capitalize", opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`,
            }}>
              {id === "testimonials" ? "Reviews" : id}
            </button>
          ))}
          <a href="tel:01159565550" style={{
            color: "var(--red)", fontSize: "1.4rem", fontWeight: 600, marginTop: 16,
            opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s",
          }}>
            0115 956 5550
          </a>
        </div>

        {/* ==================== HERO ==================== */}
        <section style={{
          position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
          background: "var(--black)", overflow: "hidden",
        }}>
          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(209,10,16,0.15), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(14,43,92,0.2), transparent)",
            zIndex: 1,
          }} />
          {/* Lightning bolt bg */}
          <div style={{
            position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
            zIndex: 2, opacity: 0.06, fontSize: "28vw", color: "var(--yellow)", lineHeight: 1,
            userSelect: "none", pointerEvents: "none",
          }} className="he-hero-bolt">
            <style>{`@media (max-width: 768px) { .he-hero-bolt { display: none; } }`}</style>
            &#9889;
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
            <div style={{ maxWidth: 720 }}>
              <Reveal>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,237,0,0.1)", border: "1px solid rgba(255,237,0,0.2)",
                  color: "var(--yellow)", fontSize: "0.85rem", fontWeight: 600, padding: "8px 16px",
                  borderRadius: 100, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 28,
                }}>
                  <Layers size={16} /> NICEIC Approved &bull; Est. 2006
                </span>
              </Reveal>
              <Reveal>
                <h1 style={{
                  fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, color: "white",
                  lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24,
                }}>
                  Nottingham&apos;s Most <span style={{ color: "var(--red)" }}>Trusted</span> Electricians
                </h1>
              </Reveal>
              <Reveal>
                <p style={{
                  fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7, marginBottom: 40, maxWidth: 560,
                }}>
                  From a plug to a full rewire &mdash; qualified, insured, and backed by 20 years of experience. Every job guaranteed by the NICEIC governing body.
                </p>
              </Reveal>
              <Reveal>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="he-hero-actions">
                  <style>{`@media (max-width: 480px) { .he-hero-actions { flex-direction: column; } .he-hero-actions a { width: 100%; justify-content: center; } }`}</style>
                  <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }} style={{
                    display: "inline-flex", alignItems: "center", gap: 10, fontSize: "1rem", fontWeight: 600,
                    padding: "16px 32px", borderRadius: 100, background: "var(--red)", color: "white",
                    boxShadow: "0 4px 20px var(--red-glow)", transition: "all 0.3s ease",
                  }}>
                    Get a Free Quote <ArrowRight size={18} />
                  </a>
                  <a href="tel:07947589929" style={{
                    display: "inline-flex", alignItems: "center", gap: 10, fontSize: "1rem", fontWeight: 600,
                    padding: "16px 32px", borderRadius: 100, background: "transparent", color: "white",
                    border: "2px solid rgba(255,255,255,0.25)", transition: "all 0.3s ease",
                  }}>
                    <Phone size={18} /> Call Alan Direct
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== TRUST BAR ==================== */}
        <div style={{
          background: "var(--grey-50)", borderBottom: "1px solid var(--grey-200)", padding: "28px 0", overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap", padding: "0 24px" }}>
            {ACCREDITATIONS.map(a => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={a.alt} src={a.src} alt={a.alt} style={{
                height: 44, width: "auto", filter: "grayscale(100%)", opacity: 0.5,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(100%)"; e.currentTarget.style.opacity = "0.5"; }}
              />
            ))}
          </div>
        </div>

        {/* ==================== ABOUT ==================== */}
        <section id="about" style={{ padding: "100px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>
                <span style={{ width: 24, height: 2, background: "var(--red)", borderRadius: 2, display: "inline-block" }} /> About Us
              </div>
            </Reveal>
            <Reveal>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
                Your Local Electrician<br />Since 2006
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginTop: 60 }} className="he-about-grid">
              <style>{`@media (max-width: 768px) { .he-about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>

              <Reveal className="reveal-left">
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--grey-600)", marginBottom: 32 }}>
                  Established in 2006, Hucknall Electrical is expertly run by Alan Richardson, an industry professional with over 20 years of experience in electrical work. Based in Hucknall, our team of highly qualified technicians carry out affordable services across Nottingham and the surrounding areas.
                </p>
                <div style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "20px 24px",
                  background: "rgba(209,10,16,0.05)", borderLeft: "3px solid var(--red)",
                  borderRadius: "0 10px 10px 0", marginBottom: 32,
                }}>
                  <div style={{
                    width: 44, height: 44, minWidth: 44, background: "var(--red)", borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                  }}>
                    <Shield size={22} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--grey-800)", lineHeight: 1.5 }}>
                    Fully City &amp; Guilds qualified. All work backed by NICEIC and our extensive guarantees.
                  </div>
                </div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--grey-600)", marginBottom: 32 }}>
                  It is important to keep the electrics in your home safe, so when it comes to updating, repairing and surveying you need a company you can trust. We are fully insured and dedicated to the strictest health and safety standards.
                </p>
                <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }} style={{
                  display: "inline-flex", alignItems: "center", gap: 10, fontSize: "1rem", fontWeight: 600,
                  padding: "16px 32px", borderRadius: 100, background: "var(--red)", color: "white",
                  boxShadow: "0 4px 20px var(--red-glow)",
                }}>
                  Request a Free Quote <ArrowRight size={18} />
                </a>
              </Reveal>

              <Reveal className="reveal-right">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {[
                    { target: 20, label: "Years Experience" },
                    { target: 9.8, decimal: true, label: "Checkatrade Rating" },
                    { target: 100, suffix: "%", label: "NICEIC Backed" },
                    { freeText: "FREE", label: "No-obligation Quotes" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      background: "white", border: "1px solid var(--grey-200)", borderRadius: 16,
                      padding: "32px 28px", textAlign: "center", transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                    >
                      <AnimatedCounter target={s.target} decimal={s.decimal} suffix={s.suffix} freeText={s.freeText} />
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--grey-600)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== SERVICES ==================== */}
        <section id="services" style={{ padding: "100px 0", background: "var(--grey-50)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>
                <span style={{ width: 24, height: 2, background: "var(--red)", borderRadius: 2, display: "inline-block" }} /> Our Services
              </div>
            </Reveal>
            <Reveal>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
                Expert Electrical Solutions
              </h2>
            </Reveal>
            <Reveal>
              <p style={{ fontSize: "1.1rem", color: "var(--grey-600)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
                From full property rewires to security lighting installations &mdash; no job is too big or small for our qualified team.
              </p>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 60 }} className="he-services-grid">
              <style>{`@media (max-width: 1024px) { .he-services-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 768px) { .he-services-grid { grid-template-columns: 1fr !important; } }`}</style>
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} style={{ "--i": i } as React.CSSProperties}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div style={{ marginTop: 48, textAlign: "center" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--grey-400)", marginBottom: 20 }}>
                  We also specialise in
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                  {OTHER_SERVICES.map(s => (
                    <span key={s} style={{
                      background: "white", border: "1px solid var(--grey-200)", padding: "10px 20px",
                      borderRadius: 100, fontSize: "0.9rem", fontWeight: 500, color: "var(--grey-800)",
                      transition: "all 0.3s ease", cursor: "default",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "var(--red)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--grey-800)"; e.currentTarget.style.borderColor = "var(--grey-200)"; }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================== WHY CHOOSE US ==================== */}
        <section style={{ padding: "100px 0", background: "var(--black)", color: "white" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 16 }}>
                <span style={{ width: 24, height: 2, background: "var(--yellow)", borderRadius: 2, display: "inline-block" }} /> Why Choose Us
              </div>
            </Reveal>
            <Reveal>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20, color: "white" }}>
                Built on Trust, Backed by Qualifications
              </h2>
            </Reveal>
            <Reveal>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
                There are plenty of electricians out there. Here&apos;s why Nottingham homeowners keep coming back to us.
              </p>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 60 }} className="he-why-grid">
              <style>{`@media (max-width: 1024px) { .he-why-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 768px) { .he-why-grid { grid-template-columns: 1fr !important; } }`}</style>
              {WHY_US.map((w, i) => (
                <Reveal key={w.title} style={{ "--i": i } as React.CSSProperties}>
                  <div style={{ textAlign: "center", padding: "40px 24px" }}>
                    <div style={{
                      width: 72, height: 72, margin: "0 auto 24px", background: "rgba(255,237,0,0.1)",
                      borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--yellow)", transition: "all 0.3s ease",
                    }}>
                      <w.icon size={32} />
                    </div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 12 }}>{w.title}</h3>
                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{w.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== TESTIMONIALS ==================== */}
        <section id="testimonials" style={{ padding: "100px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>
                <span style={{ width: 24, height: 2, background: "var(--red)", borderRadius: 2, display: "inline-block" }} /> Testimonials
              </div>
            </Reveal>
            <Reveal><h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>What Our Customers Say</h2></Reveal>
            <Reveal><p style={{ fontSize: "1.1rem", color: "var(--grey-600)", maxWidth: 600, lineHeight: 1.7 }}>Rated 9.5+ on Checkatrade. Don&apos;t just take our word for it.</p></Reveal>

            <div style={{
              display: "flex", gap: 24, marginTop: 60, overflowX: "auto", scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch", paddingBottom: 16, msOverflowStyle: "none", scrollbarWidth: "none",
            }}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{
                  minWidth: 380, maxWidth: 380, scrollSnapAlign: "start",
                  background: "white", border: "1px solid var(--grey-200)", borderRadius: 16,
                  padding: "36px 32px", position: "relative", transition: "all 0.3s ease", flexShrink: 0,
                }} className="he-testimonial-card">
                  <style>{`@media (max-width: 768px) { .he-testimonial-card { min-width: 300px !important; max-width: 300px !important; } } @media (max-width: 480px) { .he-testimonial-card { min-width: 280px !important; max-width: 280px !important; } }`}</style>
                  <span style={{
                    position: "absolute", top: 20, right: 24, background: "rgba(209,10,16,0.08)",
                    color: "var(--red)", fontWeight: 800, fontSize: "0.85rem", padding: "6px 12px", borderRadius: 100,
                  }}>{t.rating}</span>
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} />)}
                  </div>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--grey-600)", marginBottom: 24, fontStyle: "italic" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid var(--grey-100)" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: "var(--red)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontWeight: 700, fontSize: "0.9rem",
                    }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--grey-400)" }}>{t.job}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== GALLERY ==================== */}
        <section id="gallery" style={{ padding: "100px 0", background: "var(--grey-50)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>
                <span style={{ width: 24, height: 2, background: "var(--red)", borderRadius: 2, display: "inline-block" }} /> Our Work
              </div>
            </Reveal>
            <Reveal><h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>Recent Projects</h2></Reveal>
            <Reveal><p style={{ fontSize: "1.1rem", color: "var(--grey-600)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>A selection of completed jobs across Nottingham. From fuse board upgrades to full rewires.</p></Reveal>

            <Reveal className="reveal-scale">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 60 }} className="he-gallery-grid">
                <style>{`@media (max-width: 1024px) { .he-gallery-grid { grid-template-columns: repeat(3, 1fr) !important; } } @media (max-width: 768px) { .he-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
                {GALLERY.map((g, i) => (
                  <div key={i} style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "1", position: "relative", cursor: "pointer" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.src} alt={g.alt} loading="lazy" style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================== CTA BANNER ==================== */}
        <section style={{
          background: "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 50%, var(--navy-deep) 100%)",
          padding: "100px 0", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <Reveal><h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: 16 }}>Ready to Get Started?</h2></Reveal>
            <Reveal><p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.8)", marginBottom: 40, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>From a plug to a rewire &mdash; get your free, no-obligation quote today.</p></Reveal>
            <Reveal>
              <a href="tel:07947589929" style={{
                display: "inline-flex", alignItems: "center", gap: 10, fontSize: "1.1rem", fontWeight: 600,
                padding: "18px 40px", borderRadius: 100, background: "white", color: "var(--red)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
              }}>
                <Phone size={20} /> Call 07947 589 929
              </a>
            </Reveal>
          </div>
        </section>

        {/* ==================== CONTACT ==================== */}
        <section id="contact" style={{ padding: "100px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>
                <span style={{ width: 24, height: 2, background: "var(--red)", borderRadius: 2, display: "inline-block" }} /> Get in Touch
              </div>
            </Reveal>
            <Reveal><h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>Contact Hucknall Electrical</h2></Reveal>
            <Reveal><p style={{ fontSize: "1.1rem", color: "var(--grey-600)", maxWidth: 600, lineHeight: 1.7 }}>Drop us a message or give us a call for a free, no-obligation quotation.</p></Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 60 }} className="he-contact-grid">
              <style>{`@media (max-width: 768px) { .he-contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>

              <Reveal className="reveal-left">
                {[
                  { icon: Phone, title: "Phone", content: <><a href="tel:01159565550" style={{ color: "var(--red)", fontWeight: 500 }}>0115 956 5550</a> (landline)<br /><a href="tel:07947589929" style={{ color: "var(--red)", fontWeight: 500 }}>07947 589 929</a> (mobile)</> },
                  { icon: Mail, title: "Email", content: <a href="mailto:info@hucknallelectrical.co.uk" style={{ color: "var(--red)", fontWeight: 500 }}>info@hucknallelectrical.co.uk</a> },
                  { icon: MapPin, title: "Address", content: <>216 Papplewick Lane<br />Hucknall, Nottingham<br />NG15 8EH</> },
                  { icon: Shield, title: "Accreditations", content: "NICEIC Approved \u2022 City & Guilds \u2022 Part P \u2022 CHAS" },
                ].map(c => (
                  <div key={c.title} style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                    <div style={{
                      width: 52, height: 52, minWidth: 52, background: "rgba(209,10,16,0.08)",
                      borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red)",
                    }}>
                      <c.icon size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 4 }}>{c.title}</h4>
                      <p style={{ fontSize: "0.95rem", color: "var(--grey-600)", lineHeight: 1.6 }}>{c.content}</p>
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal className="reveal-right">
                <form onSubmit={e => { e.preventDefault(); setFormSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="he-form-row">
                    <style>{`@media (max-width: 768px) { .he-form-row { grid-template-columns: 1fr !important; } }`}</style>
                    <input type="text" placeholder="Your Name" required style={inputStyle} onFocus={e => focusInput(e.currentTarget)} onBlur={e => blurInput(e.currentTarget)} />
                    <input type="email" placeholder="Your Email" required style={inputStyle} onFocus={e => focusInput(e.currentTarget)} onBlur={e => blurInput(e.currentTarget)} />
                  </div>
                  <input type="text" placeholder="Subject" style={inputStyle} onFocus={e => focusInput(e.currentTarget)} onBlur={e => blurInput(e.currentTarget)} />
                  <textarea placeholder="Tell us about your project..." rows={5} style={{ ...inputStyle, resize: "vertical" as const, minHeight: 140 }} onFocus={e => focusInput(e.currentTarget)} onBlur={e => blurInput(e.currentTarget)} />
                  <button type="submit" style={{
                    display: "inline-flex", alignItems: "center", gap: 10, fontSize: "1rem", fontWeight: 600,
                    padding: "16px 32px", borderRadius: 100, border: "none", cursor: "pointer", fontFamily: "inherit",
                    background: formSent ? "#16a34a" : "var(--red)", color: "white",
                    boxShadow: "0 4px 20px var(--red-glow)", alignSelf: "flex-start",
                  }}>
                    {formSent ? "Message Sent!" : <><span>Send Message</span> <Send size={18} /></>}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer style={{ background: "var(--black)", color: "rgba(255,255,255,0.5)", padding: "60px 0 28px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 48 }} className="he-footer-grid">
              <style>{`@media (max-width: 768px) { .he-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>

              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://hucknallelectrical.co.uk/wp-content/uploads/2022/05/cropped-HE_Logo.png" alt="Hucknall Electrical" style={{ height: 40, marginBottom: 16 }} />
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 360, marginBottom: 24 }}>
                  Established in 2006, Hucknall Electrical is expertly run by Alan Richardson. Providing reliable, high-quality electrical services across Nottingham and surrounding areas.
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href="https://www.facebook.com/HucknallElectrical/" target="_blank" rel="noopener noreferrer" style={socialStyle} aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/hucknallelectrical/" target="_blank" rel="noopener noreferrer" style={socialStyle} aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 style={{ color: "white", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Services</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Rewiring", "Lighting", "Alarms & Security", "Consumer Units", "Inspection & Testing", "PAT Testing"].map(s => (
                    <a key={s} href="#services" onClick={e => { e.preventDefault(); scrollTo("services"); }} style={{ fontSize: "0.9rem", transition: "color 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "")}
                    >{s}</a>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ color: "white", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Contact</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem" }}>
                  <a href="tel:01159565550">0115 956 5550</a>
                  <a href="tel:07947589929">07947 589 929</a>
                  <a href="mailto:info@hucknallelectrical.co.uk">info@hucknallelectrical.co.uk</a>
                  <span>216 Papplewick Lane</span>
                  <span>Hucknall, NG15 8EH</span>
                </div>
              </div>
            </div>

            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28,
              display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem",
              flexWrap: "wrap", gap: 8,
            }}>
              <span>Hucknall Electrical Ltd (Co. 12516919) &bull; VAT 374869048</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>Registered: 4 Cross Street, Beeston, Nottingham, NG9 2NX</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE CARD                                                       */
/* ------------------------------------------------------------------ */

function ServiceCard({ service }: { service: typeof SERVICES[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white", border: "1px solid var(--grey-200)", borderRadius: 16,
        padding: "40px 32px", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        position: "relative", overflow: "hidden", textAlign: "left",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.15)" : "none",
        borderColor: hovered ? "transparent" : "var(--grey-200)",
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, var(--red), var(--yellow))",
        transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }} />
      <div style={{
        width: 56, height: 56, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24, transition: "all 0.3s ease",
        background: hovered ? "var(--red)" : "rgba(209,10,16,0.08)",
        color: hovered ? "white" : "var(--red)",
      }}>
        <service.icon size={26} />
      </div>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>{service.title}</h3>
      <p style={{ fontSize: "0.95rem", color: "var(--grey-600)", lineHeight: 1.7 }}>{service.desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED STYLES                                                      */
/* ------------------------------------------------------------------ */

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "16px 20px", border: "1.5px solid var(--grey-200)",
  borderRadius: 10, fontFamily: "inherit", fontSize: "0.95rem",
  transition: "all 0.3s ease", background: "var(--grey-50)",
  outline: "none",
};

function focusInput(el: HTMLElement) {
  el.style.borderColor = "var(--red)";
  el.style.background = "white";
  el.style.boxShadow = "0 0 0 4px var(--red-glow)";
}
function blurInput(el: HTMLElement) {
  el.style.borderColor = "var(--grey-200)";
  el.style.background = "var(--grey-50)";
  el.style.boxShadow = "none";
}

const socialStyle: React.CSSProperties = {
  width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.06)",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "rgba(255,255,255,0.5)", transition: "all 0.3s ease",
};
