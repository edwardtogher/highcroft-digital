"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/animation/SmoothScroll";
import StrongDrivesLogo, { type LogoRefs } from "@/components/StrongDrivesLogo";

gsap.registerPlugin(ScrollTrigger);

export default function SDV4() {
  const heroRef = useRef<HTMLElement>(null);
  const logoRefs = useRef<LogoRefs>(null);
  const logoWrap = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // Phase 1: Driveway reveals
    tl.fromTo(logoRefs.current!.driveway as gsap.TweenTarget,
      { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 2 },
      0
    );

    // Phase 2: Title
    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.5);

    // Phase 3: Hold
    tl.to({}, { duration: 0.5 });

    // Phase 4: The whole logo ROTATES — the diagonal driveway perspective
    // rotates to vertical, like the page is being viewed from a different angle
    tl.to(logoWrap.current, {
      rotation: -65,
      scale: 1.5,
      duration: 2.5,
      ease: "power2.inOut",
    }, 3);

    // Title fades during rotation
    tl.to(titleRef.current, { opacity: 0, duration: 1 }, 3.5);

    // Phase 5: Continue rotating and stretching vertically
    tl.to(logoWrap.current, {
      rotation: -90,
      scaleY: 3,
      scaleX: 0.4,
      y: 200,
      duration: 1.5,
      ease: "power2.in",
    }, 5);

    // Phase 6: Fade
    tl.to(logoWrap.current, { opacity: 0, duration: 0.8 }, 6);
  }, { scope: heroRef });

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0a0a] font-heading-oswald text-white antialiased">
        <section ref={heroRef} className="h-screen flex items-center justify-center overflow-hidden">
          <div ref={logoWrap} className="w-full max-w-3xl px-8 will-change-transform">
            <StrongDrivesLogo ref={logoRefs} />
            <div ref={titleRef} className="text-center -mt-4 opacity-0">
              <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold tracking-[0.12em] leading-none">
                <span className="text-white italic">STRONG </span>
                <span className="italic" style={{ color: "transparent", WebkitTextStroke: "1.5px white" }}>DRIVES</span>
              </h1>
              <p className="text-white/35 text-[clamp(0.5rem,1.2vw,0.7rem)] tracking-[0.35em] mt-3 font-light">
                SPECIALIST IN DRIVEWAYS &amp; LANDSCAPES
              </p>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">V4 — The Rotate</p>
            <h2 className="text-4xl font-bold tracking-tight text-white/90 mb-4">Driveways built to last</h2>
            <p className="text-white/40 text-lg max-w-md mx-auto">The logo rotates from its diagonal angle to vertical — like the driveway is turning into a road that extends down the page.</p>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
