"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!indicatorRef.current || !mouseRef.current) return;

    // Animate mouse wheel
    gsap.to(mouseRef.current, {
      y: 8,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Fade out indicator as you scroll
    ScrollTrigger.create({
      start: "top top",
      end: "+=300",
      scrub: true,
      onUpdate: (self) => {
        if (indicatorRef.current) {
          gsap.to(indicatorRef.current, {
            opacity: 1 - self.progress,
            duration: 0.1,
          });
        }
      },
    });
  });

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
    >
      <span className="text-slate-400 text-xs font-medium tracking-widest uppercase">
        Scroll
      </span>

      {/* Mouse Icon */}
      <div className="w-7 h-11 border-2 border-slate-400 rounded-full flex justify-center p-2">
        <div ref={mouseRef} className="w-1.5 h-2 bg-slate-400 rounded-full" />
      </div>
    </div>
  );
}
