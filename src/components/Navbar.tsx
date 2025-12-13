"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Work", href: "#work" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const progressRef = useRef<HTMLDivElement>(null);

  // Progress bar animation
  useGSAP(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: "left",
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "max",
        scrub: 0.3,
      },
    });
  });
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/50 backdrop-blur-sm z-100">
        <div
          ref={progressRef}
          className="h-full bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 origin-left scale-x-0"
        />
      </div>
    </>
  );
}
