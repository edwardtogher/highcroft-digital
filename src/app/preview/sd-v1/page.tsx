"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/animation/SmoothScroll";
import StrongDrivesLogo, { type LogoRefs } from "@/components/StrongDrivesLogo";

gsap.registerPlugin(ScrollTrigger);

export default function SDV1() {
  const heroRef = useRef<HTMLElement>(null);
  const logoRefs = useRef<LogoRefs>(null);
  const logoWrap = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // Phase 1: Driveway wipes in from house
    tl.fromTo(logoRefs.current!.driveway as gsap.TweenTarget,
      { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 2 },
      0
    );

    // Phase 2: Title appears
    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.5);

    // Phase 3: Hold
    tl.to({}, { duration: 0.5 });

    // Phase 4: Logo flattens — scaleY shrinks, scaleX grows, moves to top
    tl.to(logoWrap.current, {
      scaleX: 1.8,
      scaleY: 0.15,
      y: "-40vh",
      opacity: 0.3,
      duration: 2,
      ease: "power2.inOut",
    });

    // Phase 5: Fade out completely
    tl.to(logoWrap.current, { opacity: 0, duration: 0.5 });
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

        <section ref={contentRef} className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">V1 — The Lay</p>
            <h2 className="text-4xl font-bold tracking-tight text-white/90 mb-4">Driveways built to last</h2>
            <p className="text-white/40 text-lg max-w-md mx-auto">The driveway extends, then flattens and stretches wide — becoming a banner that transitions into the page.</p>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
