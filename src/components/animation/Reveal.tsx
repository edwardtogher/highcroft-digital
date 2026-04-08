"use client";

import { motion, useReducedMotion } from "motion/react";

const presets = {
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -40 },
    whileInView: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -80 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 80 },
    whileInView: { opacity: 1, x: 0 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.85 },
    whileInView: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
} as const;

type PresetKey = keyof typeof presets;

interface RevealProps {
  animation?: PresetKey;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export function Reveal({
  animation = "fadeUp",
  delay = 0,
  duration = 0.7,
  children,
  className,
  once = true,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const preset = presets[animation];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={preset.initial}
      whileInView={preset.whileInView}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
