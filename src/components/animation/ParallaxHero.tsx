"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

interface ParallaxHeroProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export function ParallaxHero({ src, alt, children }: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-sd-bg via-sd-bg/60 to-transparent" />
      <div className="absolute inset-0 bg-sd-bg/30" />

      {/* Content with fade-out on scroll */}
      <motion.div
        className="relative z-10"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {children}
      </motion.div>
    </section>
  );
}
