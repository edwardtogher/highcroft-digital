"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  label: string;
}

interface HorizontalGalleryProps {
  images: GalleryImage[];
}

export function HorizontalGallery({ images }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="overflow-hidden h-screen flex items-center">
      <div
        ref={trackRef}
        className="flex gap-5 pl-4 sm:pl-6 will-change-transform"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 w-[80vw] sm:w-[50vw] lg:w-[35vw] aspect-[4/3] overflow-hidden group"
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-7">
              <span className="text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase font-heading-oswald">
                {img.label}
              </span>
            </div>
          </div>
        ))}
        {/* Extra padding at end */}
        <div className="shrink-0 w-[10vw]" />
      </div>
    </div>
  );
}
