"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  Droplets,
  Flame,
  ShieldCheck,
  ChefHat,
  Wrench,
  Zap,
  Menu,
  X,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Award,
  Users,
  ThumbsUp,
  CreditCard,
  MessageCircle,
  Hammer,
  Star,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const SERVICES = [
  { icon: Droplets, title: "Plumbing", desc: "From leaky taps to complete bathroom installations. Kitchens, burst pipes, water tanks, showers -- no job too large or small.", color: "#006CB0" },
  { icon: Flame, title: "Heating", desc: "Full central heating systems, high-efficiency boiler installs, repairs and servicing. Approved installers for all major manufacturers.", color: "#E12524" },
  { icon: ShieldCheck, title: "Gas Safety", desc: "Gas Safe registered for all domestic gas work. Safety checks, landlord inspections, pipework, flue flow tests and certifications.", color: "#006CB0" },
  { icon: ChefHat, title: "Commercial & Catering", desc: "Commercial catering gas and plumbing services. Personal service, product knowledge, on time and within budget.", color: "#E12524" },
  { icon: Hammer, title: "Property Maintenance", desc: "Working with homeowners, landlords and businesses. Full renovations, tiling, guttering, decking -- all by qualified tradesmen.", color: "#006CB0" },
  { icon: Zap, title: "Electrical", desc: "Domestic and commercial electrical services. Rewiring, lighting, fire alarms, security systems and full installations.", color: "#E12524" },
];

const TESTIMONIALS = [
  { name: "Graham Campbell", text: "Incredible service, had a cancellation and came within the hour. Fixed multiple problems in less than an hour with a very reasonable price. Highly recommended!" },
  { name: "Louise Henke", text: "Fast, friendly, and efficient service. Just what we needed when our kitchen pipes began gushing water." },
  { name: "DLMiller", text: "Mo has done several plumbing jobs for us over the past few years, and his work is always excellent. Highly recommended -- knowledgeable, competent, a good problem-solver and easy to work with." },
  { name: "WilliamH4", text: "Emergency after a bedroom radiator fell off the wall. 1st Choice were round within the hour and stopped the leak. Very professional throughout and I would not hesitate to recommend." },
  { name: "Jenn Celine Coyle", text: "Amazing! My bath was leaking and the pipe had come undone -- managed to get new parts and fix it all up within 24 hours. Can't recommend them enough." },
  { name: "RowanFlint", text: "After a string of terrible engineers it was a relief to find 1st Choice. They are reliable and always let you know 30 minutes in advance when they will arrive." },
  { name: "Rayha Uk", text: "We initially called at 11.30pm and they were with us at 9am the following morning. The boiler is now up and running. Cheers Mo." },
  { name: "Russell Ventilla", text: "Extremely happy with the service. The response and repair time was outstanding and at a very reasonable price. Really pleasant guys!" },
];

const GALLERY = [
  { src: "https://www.1stchoiceplumbingandheating.co.uk/img/domestic/domestic1.jpg", alt: "Bathroom Installation" },
  { src: "https://www.1stchoiceplumbingandheating.co.uk/img/heating/3.jpg", alt: "Boiler Installation" },
  { src: "https://www.1stchoiceplumbingandheating.co.uk/img/domestic/domestic6.jpg", alt: "Kitchen Fitting" },
  { src: "https://www.1stchoiceplumbingandheating.co.uk/img/property4.jpg", alt: "Bathroom Renovation" },
  { src: "https://www.1stchoiceplumbingandheating.co.uk/img/heating/1.jpg", alt: "Radiator Installation" },
  { src: "https://www.1stchoiceplumbingandheating.co.uk/img/domestic/domestic4.jpg", alt: "Plumbing Work" },
];

const AREAS = ["Glasgow", "Airdrie", "Kilmarnock", "Lanark", "Stirling", "Strathaven", "Johnstone", "Darvel"];

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL HOOK                                                 */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  COUNTER COMPONENT                                                  */
/* ------------------------------------------------------------------ */

function Counter({ end, suffix, duration = 1800 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function FirstChoicePlumbingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Section reveal refs
  const trustReveal = useReveal();
  const servicesReveal = useReveal();
  const aboutReveal = useReveal();
  const testimonialsReveal = useReveal();
  const galleryReveal = useReveal();
  const contactReveal = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        html, body { margin: 0; padding: 0; }
        *, *::before, *::after { box-sizing: border-box; }

        .fc {
          font-family: 'Inter', system-ui, sans-serif;
          color: #334155;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        .fc img { max-width: 100%; display: block; }
        .fc a { text-decoration: none; color: inherit; }

        /* ---- REVEAL ANIMATIONS ---- */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-child > * {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-child.visible > *:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: 0ms; }
        .reveal-child.visible > *:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: 80ms; }
        .reveal-child.visible > *:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: 160ms; }
        .reveal-child.visible > *:nth-child(4) { opacity: 1; transform: translateY(0); transition-delay: 240ms; }
        .reveal-child.visible > *:nth-child(5) { opacity: 1; transform: translateY(0); transition-delay: 320ms; }
        .reveal-child.visible > *:nth-child(6) { opacity: 1; transform: translateY(0); transition-delay: 400ms; }
        .reveal-child.visible > *:nth-child(7) { opacity: 1; transform: translateY(0); transition-delay: 480ms; }
        .reveal-child.visible > *:nth-child(8) { opacity: 1; transform: translateY(0); transition-delay: 560ms; }

        /* ---- HEADER ---- */
        .fc-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fc-header.clear { padding: 20px 28px; background: transparent; }
        .fc-header.solid {
          padding: 12px 28px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04);
        }
        .fc-desktop-nav { display: flex; align-items: center; gap: 4px; }
        .fc-hamburger { display: none; }
        @media (max-width: 768px) {
          .fc-desktop-nav { display: none !important; }
          .fc-hamburger { display: flex !important; }
        }

        /* ---- HERO ---- */
        .fc-hero {
          position: relative; min-height: 100vh; min-height: 100svh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          background: linear-gradient(160deg, #071221 0%, #0c1f3a 30%, #0a3a6b 70%, #006CB0 100%);
        }
        .fc-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,108,176,0.15), transparent),
                      radial-gradient(ellipse 50% 50% at 20% 80%, rgba(225,37,36,0.08), transparent);
        }
        .fc-hero::after {
          content: ''; position: absolute; inset: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23fff'/%3E%3C/svg%3E");
        }

        /* Floating accent shapes */
        .fc-hero .accent-1 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(225,37,36,0.06), transparent 70%);
          top: -10%; right: -5%; animation: float1 20s ease-in-out infinite;
        }
        .fc-hero .accent-2 {
          position: absolute; width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,108,176,0.08), transparent 70%);
          bottom: -5%; left: -5%; animation: float2 25s ease-in-out infinite;
        }
        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,20px) scale(1.1); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-30px) scale(1.05); } }

        .fc-hero-content {
          position: relative; text-align: center; padding: 140px 24px 100px; max-width: 860px;
          animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroFadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .fc-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          padding: 10px 22px; border-radius: 100px;
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9);
          margin-bottom: 32px; backdrop-filter: blur(8px);
          animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .fc-pulse { width: 8px; height: 8px; border-radius: 50%; background: #34D399; animation: pulse 2s ease infinite; }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }

        .fc-hero h1 {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 800;
          color: #fff; line-height: 1.08; margin: 0 0 24px;
          letter-spacing: -0.03em;
          animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .fc-hero h1 .accent { color: #E12524; }
        .fc-hero h1 .accent-blue {
          background: linear-gradient(135deg, #4da6e0, #7cc4f0);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fc-hero-sub {
          font-size: clamp(1rem, 2.2vw, 1.15rem); color: rgba(255,255,255,0.6);
          max-width: 560px; margin: 0 auto 40px; line-height: 1.75;
          animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
        }

        .fc-hero-btns {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
          animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #E12524; color: #fff; padding: 16px 36px;
          border-radius: 14px; font-weight: 700; font-size: 16px;
          border: none; cursor: pointer;
          box-shadow: 0 4px 24px rgba(225,37,36,0.35), 0 0 0 0 rgba(225,37,36,0);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(225,37,36,0.4), 0 0 0 4px rgba(225,37,36,0.1); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          background: #fff; color: #006CB0;
          padding: 16px 36px; border-radius: 14px;
          font-weight: 700; font-size: 16px;
          border: none; cursor: pointer;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-ghost:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }

        .fc-scroll-hint {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          z-index: 10;
          animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
        }
        .fc-scroll-hint span {
          font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); font-weight: 600;
        }
        .fc-bounce { animation: bounce 2s ease-in-out infinite; }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* ---- TRUST BAR ---- */
        .fc-trust { background: #fff; padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }
        .fc-trust-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: center;
          gap: 36px; flex-wrap: wrap;
        }
        .fc-trust-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 600; color: #475569;
        }
        .fc-trust-ico {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        /* ---- STATS ---- */
        .fc-stats {
          background: linear-gradient(135deg, #071221, #0c1f3a 50%, #0a3a6b);
          padding: 56px 24px; position: relative; overflow: hidden;
        }
        .fc-stats::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }
        .fc-stats-grid {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center;
        }
        .fc-stat-num {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3rem); font-weight: 800;
          color: #fff; line-height: 1;
        }
        .fc-stat-num .red { color: #E12524; }
        .fc-stat-label { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); margin-top: 6px; letter-spacing: 0.03em; }

        /* ---- SECTIONS ---- */
        .fc-section { padding: 96px 24px; max-width: 1140px; margin: 0 auto; }
        .fc-section-full { padding: 96px 24px; }
        .fc-section-label {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: #006CB0; margin-bottom: 12px;
        }
        .fc-section-label::before { content: ''; width: 20px; height: 2px; background: #006CB0; border-radius: 2px; }
        .fc-section-title {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800;
          color: #0f172a; line-height: 1.12; margin: 0 0 14px; letter-spacing: -0.025em;
        }
        .fc-section-desc { font-size: 1rem; color: #64748b; max-width: 540px; margin: 0 0 48px; line-height: 1.7; }

        /* ---- SERVICES ---- */
        .fc-srv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .fc-srv {
          background: #fff; border: 1px solid #f1f5f9; border-radius: 20px;
          padding: 32px 28px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden;
        }
        .fc-srv::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--srv-color), transparent);
          transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fc-srv:hover::before { transform: scaleX(1); }
        .fc-srv:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.06); border-color: transparent; }
        .fc-srv-ico {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
          transition: transform 0.3s;
        }
        .fc-srv:hover .fc-srv-ico { transform: scale(1.08); }
        .fc-srv h3 { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0 0 10px; }
        .fc-srv p { font-size: 0.88rem; color: #64748b; margin: 0; line-height: 1.7; }

        /* ---- ABOUT ---- */
        .fc-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .fc-about-text h2 {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 800;
          color: #0f172a; line-height: 1.12; margin: 0 0 20px; letter-spacing: -0.02em;
        }
        .fc-about-text p { font-size: 0.95rem; color: #64748b; margin: 0 0 16px; line-height: 1.75; }
        .fc-checks { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .fc-check {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.9rem; font-weight: 500; color: #334155;
        }
        .fc-check svg { flex-shrink: 0; }
        .fc-about-img {
          border-radius: 24px; width: 100%; height: 420px; object-fit: cover;
          box-shadow: 0 24px 64px rgba(0,0,0,0.08);
        }

        /* ---- TESTIMONIALS ---- */
        .fc-test-bg { background: linear-gradient(180deg, #f8fafc, #f1f5f9); }
        .fc-test-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .fc-test {
          background: #fff; border: 1px solid #e8ecf1; border-radius: 20px;
          padding: 28px; transition: all 0.3s;
        }
        .fc-test:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.05); border-color: transparent; }
        .fc-test-stars { display: flex; gap: 2px; margin-bottom: 16px; }
        .fc-test-stars svg { fill: #F59E0B; color: #F59E0B; }
        .fc-test p { font-size: 0.9rem; color: #475569; line-height: 1.7; margin: 0 0 20px; font-style: italic; }
        .fc-test-footer { display: flex; align-items: center; gap: 12px; padding-top: 16px; border-top: 1px solid #f4f6f8; }
        .fc-test-avatar {
          width: 40px; height: 40px; border-radius: 12px;
          background: linear-gradient(135deg, #006CB0, #0a3a6b);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 14px; flex-shrink: 0;
        }
        .fc-test-name { font-weight: 600; font-size: 0.88rem; color: #0f172a; }

        /* ---- GALLERY ---- */
        .fc-gal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .fc-gal-item {
          border-radius: 20px; overflow: hidden; aspect-ratio: 4/3; position: relative; cursor: pointer;
        }
        .fc-gal-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .fc-gal-item:hover img { transform: scale(1.06); }
        .fc-gal-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%);
          opacity: 0; transition: opacity 0.4s;
          display: flex; align-items: flex-end; padding: 18px;
        }
        .fc-gal-item:hover .fc-gal-overlay { opacity: 1; }
        .fc-gal-overlay span { color: #fff; font-size: 13px; font-weight: 600; letter-spacing: 0.02em; }

        /* ---- AREAS ---- */
        .fc-areas { background: #fff; padding: 64px 24px; border-top: 1px solid #f1f5f9; }
        .fc-areas-inner { max-width: 1140px; margin: 0 auto; text-align: center; }
        .fc-areas-chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 24px; }
        .fc-area-chip {
          padding: 10px 22px; background: #f8fafc; border: 1px solid #e8ecf1;
          border-radius: 100px; font-size: 14px; font-weight: 500; color: #475569;
          transition: all 0.3s;
        }
        .fc-area-chip:hover { background: #006CB0; color: #fff; border-color: #006CB0; transform: translateY(-2px); }

        /* ---- CTA BANNER ---- */
        .fc-cta {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #E12524 0%, #c41e1e 50%, #9b1616 100%);
          padding: 80px 24px; text-align: center;
        }
        .fc-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 30% 50%, rgba(255,255,255,0.06), transparent);
        }
        .fc-cta h2 {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; color: #fff;
          margin: 0 0 12px; position: relative; letter-spacing: -0.02em;
        }
        .fc-cta p { font-size: 1.05rem; color: rgba(255,255,255,0.8); margin: 0 0 32px; position: relative; }
        .fc-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-white {
          display: inline-flex; align-items: center; gap: 10px;
          background: #fff; color: #E12524; padding: 16px 36px;
          border-radius: 14px; font-weight: 700; font-size: 16px;
          cursor: pointer; border: none;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-white:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.2); }
        .btn-outline-white {
          display: inline-flex; align-items: center; gap: 10px;
          color: #fff; padding: 16px 36px; border-radius: 14px;
          font-weight: 600; font-size: 16px; cursor: pointer;
          border: 2px solid rgba(255,255,255,0.25); background: transparent;
          transition: all 0.3s;
        }
        .btn-outline-white:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.5); }

        /* ---- CONTACT ---- */
        .fc-contact-bg { background: #f8fafc; }
        .fc-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        .fc-cinfo { display: flex; flex-direction: column; gap: 14px; }
        .fc-cicard {
          display: flex; align-items: flex-start; gap: 16px; padding: 20px;
          background: #fff; border: 1px solid #e8ecf1; border-radius: 16px;
          transition: all 0.3s;
        }
        .fc-cicard:hover { border-color: #006CB0; box-shadow: 0 4px 20px rgba(0,108,176,0.1); transform: translateY(-2px); }
        .fc-ciico {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .fc-cicard h4 { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 4px; }
        .fc-cicard .cip { font-size: 0.92rem; font-weight: 600; color: #0f172a; margin: 0; }
        .fc-cicard .cis { font-size: 0.8rem; color: #94a3b8; margin: 3px 0 0; }

        .fc-form { background: #fff; border: 1px solid #e8ecf1; border-radius: 24px; padding: 36px; }
        .fc-form h3 { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 24px; }
        .fc-frow { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .fc-fg { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .fc-fg label { font-size: 13px; font-weight: 600; color: #334155; }
        .fc-fg input, .fc-fg textarea, .fc-fg select {
          padding: 13px 16px; border: 1.5px solid #e8ecf1; border-radius: 12px;
          font-size: 14px; font-family: inherit; color: #0f172a;
          background: #fafbfc; outline: none; width: 100%;
          transition: all 0.2s;
        }
        .fc-fg input:focus, .fc-fg textarea:focus, .fc-fg select:focus {
          border-color: #006CB0; box-shadow: 0 0 0 4px rgba(0,108,176,0.08); background: #fff;
        }
        .fc-fg textarea { resize: vertical; min-height: 110px; }
        .fc-submit {
          width: 100%; padding: 15px; background: #006CB0; color: #fff;
          border: none; border-radius: 14px; font-size: 15px; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,108,176,0.2);
        }
        .fc-submit:hover { background: #005690; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,108,176,0.25); }
        .fc-fok { text-align: center; padding: 40px 16px; }
        .fc-fok svg { color: #34D399; margin-bottom: 14px; }
        .fc-fok h3 { color: #0f172a; margin: 0 0 8px; font-weight: 700; }
        .fc-fok p { color: #64748b; margin: 0; }

        /* ---- FOOTER ---- */
        .fc-footer { background: #071221; color: rgba(255,255,255,0.55); padding: 56px 24px 32px; }
        .fc-footer-grid { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; }
        .fc-footer-brand p { font-size: 0.88rem; line-height: 1.7; margin: 14px 0 0; }
        .fc-footer h4 { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px; }
        .fc-footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .fc-footer-links a { font-size: 0.88rem; cursor: pointer; transition: color 0.2s; }
        .fc-footer-links a:hover { color: #fff; }
        .fc-footer-bottom {
          max-width: 1140px; margin: 32px auto 0; padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.75rem; color: rgba(255,255,255,0.25);
        }

        /* ---- FLOATING PHONE ---- */
        .fc-float {
          position: fixed; bottom: 24px; right: 24px; z-index: 900;
          width: 64px; height: 64px; border-radius: 20px;
          background: #E12524; color: #fff; border: none; cursor: pointer;
          box-shadow: 0 8px 32px rgba(225,37,36,0.35);
          display: none; align-items: center; justify-content: center;
          transition: all 0.3s; animation: floatPulse 3s ease infinite;
        }
        .fc-float:hover { transform: scale(1.08); }
        @keyframes floatPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(225,37,36,0.35); }
          50% { box-shadow: 0 8px 32px rgba(225,37,36,0.35), 0 0 0 12px rgba(225,37,36,0.08); }
        }
        @media (max-width: 768px) { .fc-float { display: flex; } }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 1024px) {
          .fc-srv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .fc-section { padding: 72px 20px; }
          .fc-section-full { padding: 72px 20px; }
          .fc-srv-grid, .fc-test-grid { grid-template-columns: 1fr; }
          .fc-gal-grid { grid-template-columns: repeat(2, 1fr); }
          .fc-about-grid, .fc-contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .fc-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .fc-frow { grid-template-columns: 1fr; }
          .fc-footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .fc-footer-bottom { flex-direction: column; gap: 6px; text-align: center; }
          .fc-hero-btns { flex-direction: column; align-items: stretch; padding: 0 12px; }
          .btn-primary, .btn-ghost { justify-content: center; }
          .fc-cta-btns { flex-direction: column; align-items: stretch; padding: 0 12px; }
          .btn-white, .btn-outline-white { justify-content: center; }
          .fc-about-img { height: 280px; }
          .fc-trust-inner { gap: 20px; }
          .fc-trust-item { font-size: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal-child > * { opacity: 1; transform: none; transition: none; }
          .fc-hero-content, .fc-badge, .fc-hero h1, .fc-hero-sub, .fc-hero-btns, .fc-hero-logos, .fc-scroll-hint { animation: none; opacity: 1; transform: none; }
          .accent-1, .accent-2 { animation: none; }
        }
      `}</style>

      <div className="fc">
        {/* ═══════════════════ HEADER ═══════════════════ */}
        <header className={`fc-header ${scrolled ? "solid" : "clear"}`}>
          <img
            src="https://www.1stchoiceplumbingandheating.co.uk/img/1st-choice-logo.png"
            alt="1st Choice Plumbing & Heating"
            style={{
              height: scrolled ? 34 : 42,
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              filter: scrolled ? "none" : "brightness(0) invert(1)",
            }}
          />
          <nav className="fc-desktop-nav">
            {["services", "about", "reviews", "gallery", "contact"].map((id) => (
              <a key={id} onClick={() => go(id)} style={{
                fontSize: 14, fontWeight: 500, padding: "8px 16px", borderRadius: 10,
                cursor: "pointer", color: scrolled ? "#334155" : "rgba(255,255,255,0.85)",
                transition: "all 0.2s",
              }}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
            ))}
            <a href="tel:07968692870" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14, borderRadius: 10, marginLeft: 8 }}>
              <Phone size={15} /> Call Now
            </a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="fc-hamburger" style={{
            background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 1001,
            color: scrolled ? "#0f172a" : "#fff",
          }}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </header>

        {/* ═══════════════════ MOBILE NAV ═══════════════════ */}
        {menuOpen && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            padding: "110px 28px 32px",
            display: "flex", flexDirection: "column", gap: 2,
          }}>
            {["services", "about", "reviews", "gallery", "contact"].map((id) => (
              <a key={id} onClick={() => go(id)} style={{
                fontSize: 20, fontWeight: 700, padding: "18px 20px", borderRadius: 14,
                color: "#0f172a", cursor: "pointer", display: "block",
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              }}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
            ))}
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="tel:07968692870" className="btn-primary" style={{ justifyContent: "center", fontSize: 16, padding: "18px 32px" }}>
                <Phone size={18} /> 07968 692 870
              </a>
              <a onClick={() => go("contact")} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: 18, borderRadius: 14, fontWeight: 700, fontSize: 16,
                background: "#006CB0", color: "#fff", cursor: "pointer",
              }}><Mail size={18} /> Get a Free Quote</a>
            </div>
          </div>
        )}

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="fc-hero">
          <div className="accent-1" />
          <div className="accent-2" />
          <div className="fc-hero-content">
            <div className="fc-badge"><div className="fc-pulse" /> Gas Safe Registered &middot; 20+ Years Serving Glasgow</div>
            <h1>Glasgow&apos;s Most <span className="accent">Trusted</span> Plumbing & Heating Experts</h1>
            <p className="fc-hero-sub">
              From emergency repairs to full installations -- over 20 years of reliable, professional
              service. Fully insured, 100% satisfaction guaranteed.
            </p>
            <div className="fc-hero-btns">
              <a href="tel:07968692870" className="btn-primary"><Phone size={18} /> 07968 692 870</a>
              <a onClick={() => go("contact")} className="btn-ghost" style={{ cursor: "pointer" }}><Mail size={18} /> Free Quote</a>
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: 32, left: 0, right: 0,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            zIndex: 10,
          }}>
            <span style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Scroll</span>
            <ChevronDown size={22} color="rgba(255,255,255,0.6)" className="fc-bounce" />
          </div>
        </section>

        {/* ═══════════════════ TRUST BAR ═══════════════════ */}
        <div ref={trustReveal.ref} className={`fc-trust reveal ${trustReveal.visible ? "visible" : ""}`}>
          <div className="fc-trust-inner">
            <div className="fc-trust-item">
              <div className="fc-trust-ico" style={{ background: "#e8f4fd", color: "#006CB0" }}><ShieldCheck size={17} /></div>
              Gas Safe Registered
            </div>
            <div className="fc-trust-item">
              <div className="fc-trust-ico" style={{ background: "#f3e8ff", color: "#7c3aed" }}><Award size={17} /></div>
              CIPHE Member
            </div>
            <div className="fc-trust-item">
              <div className="fc-trust-ico" style={{ background: "#e8f4fd", color: "#006CB0" }}><Droplets size={17} /></div>
              Water Safe Approved
            </div>
            <div className="fc-trust-item">
              <div className="fc-trust-ico" style={{ background: "#d1fae5", color: "#059669" }}><CheckCircle size={17} /></div>
              Fully Insured
            </div>
            <div className="fc-trust-item">
              <div className="fc-trust-ico" style={{ background: "#fee2e2", color: "#E12524" }}><CreditCard size={17} /></div>
              Cards Accepted
            </div>
          </div>
        </div>

        {/* ═══════════════════ STATS ═══════════════════ */}
        <section className="fc-stats">
          <div className="fc-stats-grid">
            <div><div className="fc-stat-num"><Counter end={20} suffix="" /><span className="red">+</span></div><div className="fc-stat-label">Years Experience</div></div>
            <div><div className="fc-stat-num"><Counter end={500} suffix="" /><span className="red">+</span></div><div className="fc-stat-label">Happy Customers</div></div>
            <div><div className="fc-stat-num"><Counter end={100} suffix="" /><span className="red">%</span></div><div className="fc-stat-label">Satisfaction Rate</div></div>
            <div><div className="fc-stat-num"><Counter end={24} suffix="" /><span className="red">/7</span></div><div className="fc-stat-label">Emergency Callouts</div></div>
          </div>
        </section>

        {/* ═══════════════════ SERVICES ═══════════════════ */}
        <section className="fc-section" id="services">
          <div className="fc-section-label">Our Services</div>
          <h2 className="fc-section-title">Everything Plumbing,<br />Heating & Beyond</h2>
          <p className="fc-section-desc">Your one-stop solution for plumbing, heating, electrical, bathroom and kitchen installations. All work carried out to the highest standards, at competitive prices.</p>
          <div ref={servicesReveal.ref} className={`fc-srv-grid reveal-child ${servicesReveal.visible ? "visible" : ""}`}>
            {SERVICES.map((s, i) => (
              <div className="fc-srv" key={i} style={{ "--srv-color": s.color } as React.CSSProperties}>
                <div className="fc-srv-ico" style={{ background: `${s.color}10`, color: s.color }}>
                  <s.icon size={24} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ ABOUT ═══════════════════ */}
        <section className="fc-section" id="about" style={{ background: "#fff", maxWidth: "none" }}>
          <div ref={aboutReveal.ref} className={`reveal ${aboutReveal.visible ? "visible" : ""}`} style={{ maxWidth: 1140, margin: "0 auto" }}>
            <div className="fc-about-grid">
              <div className="fc-about-text">
                <div className="fc-section-label">About Us</div>
                <h2>Honest, Reliable Plumbing -- Since Day One</h2>
                <p>
                  At 1st Choice Plumbing & Heating Ltd we pride ourselves on providing an efficient
                  and friendly service at all times. We strive to achieve 100% customer satisfaction
                  -- a testament to this are the hundreds of reviews from our customers.
                </p>
                <p>
                  Gas Safe Registered and fully insured with over 20 years&apos; experience.
                  We&apos;ve gained an enviable reputation for honesty and value for money, carrying
                  out work for clients including TV presenter Carol Smiley and photographer Ian McNicol.
                </p>
                <div className="fc-checks">
                  {[
                    "Gas Safe Registered & Fully Insured",
                    "All Jobs -- Large and Small",
                    "Free No-Obligation Quotations",
                    "Domestic & Commercial Work",
                    "Landlord Services & Gas Safety Certs",
                  ].map((t, i) => (
                    <div className="fc-check" key={i}><CheckCircle size={18} color="#006CB0" /> {t}</div>
                  ))}
                </div>
              </div>
              <img
                className="fc-about-img"
                src="https://www.1stchoiceplumbingandheating.co.uk/img/domestic/domestic1.jpg"
                alt="Professional bathroom installation"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
        <section className="fc-section-full fc-test-bg" id="reviews">
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="fc-section-label" style={{ justifyContent: "center" }}>Customer Reviews</div>
              <h2 className="fc-section-title">Trusted by Hundreds<br />Across Glasgow</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 15 }}>5.0</span>
                <span style={{ color: "#94a3b8", fontSize: 13 }}>from verified reviews</span>
              </div>
            </div>
            <div ref={testimonialsReveal.ref} className={`fc-test-grid reveal-child ${testimonialsReveal.visible ? "visible" : ""}`}>
              {TESTIMONIALS.map((t, i) => (
                <div className="fc-test" key={i}>
                  <div className="fc-test-stars">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <div className="fc-test-footer">
                    <div className="fc-test-avatar">{t.name[0]}</div>
                    <div className="fc-test-name">{t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ GALLERY ═══════════════════ */}
        <section className="fc-section" id="gallery">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="fc-section-label" style={{ justifyContent: "center" }}>Our Work</div>
            <h2 className="fc-section-title">Recent Projects</h2>
          </div>
          <div ref={galleryReveal.ref} className={`fc-gal-grid reveal-child ${galleryReveal.visible ? "visible" : ""}`}>
            {GALLERY.map((g, i) => (
              <div className="fc-gal-item" key={i}>
                <img src={g.src} alt={g.alt} loading="lazy" />
                <div className="fc-gal-overlay"><span>{g.alt}</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ AREAS ═══════════════════ */}
        <div className="fc-areas">
          <div className="fc-areas-inner">
            <div className="fc-section-label" style={{ justifyContent: "center" }}>Coverage</div>
            <h2 className="fc-section-title">Serving Glasgow & Beyond</h2>
            <div className="fc-areas-chips">
              {AREAS.map((a) => <span className="fc-area-chip" key={a}>{a}</span>)}
            </div>
          </div>
        </div>

        {/* ═══════════════════ CTA BANNER ═══════════════════ */}
        <section className="fc-cta">
          <h2>Need a Plumber? We&apos;re Ready.</h2>
          <p>Emergency or planned work -- call now for fast, friendly service.</p>
          <div className="fc-cta-btns">
            <a href="tel:07968692870" className="btn-white"><Phone size={18} /> 07968 692 870</a>
            <a onClick={() => go("contact")} className="btn-outline-white" style={{ cursor: "pointer" }}><Mail size={18} /> Request a Free Quote</a>
          </div>
        </section>

        {/* ═══════════════════ CONTACT ═══════════════════ */}
        <section className="fc-section-full fc-contact-bg" id="contact">
          <div ref={contactReveal.ref} className={`reveal ${contactReveal.visible ? "visible" : ""}`} style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
            <div className="fc-section-label">Get in Touch</div>
            <h2 className="fc-section-title">Free Quotations -- No Obligation</h2>
            <p className="fc-section-desc">Whether you need an emergency repair, a new boiler, or a full bathroom installation -- we&apos;re here to help.</p>
            <div className="fc-contact-grid">
              <div className="fc-cinfo">
                <a href="tel:07968692870" className="fc-cicard">
                  <div className="fc-ciico" style={{ background: "#fee2e2", color: "#E12524" }}><Phone size={20} /></div>
                  <div><h4>Phone</h4><p className="cip">07968 692 870</p><p className="cis">Also: 07790 190 627 / 0141 560 3297</p></div>
                </a>
                <a href="mailto:info@1stchoiceplumbingandheating.co.uk" className="fc-cicard">
                  <div className="fc-ciico" style={{ background: "#e8f4fd", color: "#006CB0" }}><Mail size={20} /></div>
                  <div><h4>Email</h4><p className="cip">info@1stchoiceplumbingandheating.co.uk</p></div>
                </a>
                <div className="fc-cicard">
                  <div className="fc-ciico" style={{ background: "#e8f4fd", color: "#006CB0" }}><MapPin size={20} /></div>
                  <div><h4>Location</h4><p className="cip">600 Pollokshaws Road, Glasgow, G41 2PJ</p></div>
                </div>
                <div className="fc-cicard">
                  <div className="fc-ciico" style={{ background: "#fef3c7", color: "#d97706" }}><Clock size={20} /></div>
                  <div><h4>Availability</h4><p className="cip">Emergency callouts 7 days a week</p></div>
                </div>
                <a href="https://wa.me/447968692870" target="_blank" rel="noopener noreferrer" className="fc-cicard">
                  <div className="fc-ciico" style={{ background: "#dcfce7", color: "#16a34a" }}><MessageCircle size={20} /></div>
                  <div><h4>WhatsApp</h4><p className="cip">Message us on WhatsApp</p></div>
                </a>
              </div>
              <div className="fc-form">
                {formSent ? (
                  <div className="fc-fok">
                    <CheckCircle size={48} />
                    <h3>Message Sent!</h3>
                    <p>We&apos;ll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <>
                    <h3>Request a Free Quote</h3>
                    <div className="fc-frow">
                      <div className="fc-fg"><label>Name</label><input type="text" placeholder="Your full name" /></div>
                      <div className="fc-fg"><label>Phone</label><input type="tel" placeholder="Your phone number" /></div>
                    </div>
                    <div className="fc-fg"><label>Email</label><input type="email" placeholder="your@email.com" /></div>
                    <div className="fc-fg">
                      <label>Service Required</label>
                      <select defaultValue="">
                        <option value="" disabled>Select a service...</option>
                        <option>Plumbing</option>
                        <option>Heating / Boiler</option>
                        <option>Gas Safety</option>
                        <option>Bathroom Installation</option>
                        <option>Kitchen Installation</option>
                        <option>Emergency Repair</option>
                        <option>Commercial / Catering</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="fc-fg"><label>Message</label><textarea placeholder="Tell us about your project or issue..." /></div>
                    <button className="fc-submit" onClick={(e) => { e.preventDefault(); setFormSent(true); }}>
                      <Send size={16} /> Send Message
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer className="fc-footer">
          <div className="fc-footer-grid">
            <div className="fc-footer-brand">
              <img
                src="https://www.1stchoiceplumbingandheating.co.uk/img/1st-choice-logo.png"
                alt="1st Choice Plumbing & Heating"
                style={{ height: 40, filter: "brightness(0) invert(1)" }}
              />
              <p>Glasgow&apos;s trusted plumbing and heating company. Gas Safe registered and fully insured with over 20 years&apos; experience.</p>
            </div>
            <div>
              <h4>Services</h4>
              <ul className="fc-footer-links">
                <li><a onClick={() => go("services")}>Plumbing</a></li>
                <li><a onClick={() => go("services")}>Heating</a></li>
                <li><a onClick={() => go("services")}>Gas Safety</a></li>
                <li><a onClick={() => go("services")}>Commercial</a></li>
                <li><a onClick={() => go("services")}>Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className="fc-footer-links">
                <li><a href="tel:07968692870">07968 692 870</a></li>
                <li><a href="tel:07790190627">07790 190 627</a></li>
                <li><a href="tel:01415603297">0141 560 3297</a></li>
                <li><a href="mailto:info@1stchoiceplumbingandheating.co.uk">Email Us</a></li>
                <li><a href="https://wa.me/447968692870" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="fc-footer-bottom">
            <span>&copy; {new Date().getFullYear()} 1st Choice Plumbing & Heating Ltd</span>
            <span>
              Site by{" "}
              <a href="https://highcroftdigital.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>
                Highcroft Digital
              </a>
            </span>
          </div>
        </footer>

        {/* ═══════════════════ FLOATING PHONE BUTTON ═══════════════════ */}
        <a href="tel:07968692870" className="fc-float" aria-label="Call 1st Choice Plumbing">
          <Phone size={26} />
        </a>
      </div>
    </>
  );
}
