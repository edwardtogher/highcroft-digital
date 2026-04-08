"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface CountUpProps {
  target: string;
  className?: string;
}

export function CountUp({ target, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");

  const match = target.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericTarget);

      setDisplay(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(`${numericTarget}${suffix}`);
      }
    }

    requestAnimationFrame(update);
  }, [isInView, numericTarget, suffix]);

  return (
    <span ref={ref} className={className}>
      {isInView ? display : `0${suffix}`}
    </span>
  );
}
