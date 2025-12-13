"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // Smooth cursor follow with magnetic effect
  useGSAP(() => {
    if (!cursorRef.current || !cursorDotRef.current || !lensRef.current) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const lens = lensRef.current;

    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      let targetX = e.clientX;
      let targetY = e.clientY;

      // Magnetic effect for buttons
      const hoveredButton = document.elementFromPoint(e.clientX, e.clientY);
      if (
        hoveredButton &&
        (hoveredButton.tagName === "BUTTON" || hoveredButton.closest("button"))
      ) {
        const button = (
          hoveredButton.tagName === "BUTTON"
            ? hoveredButton
            : hoveredButton.closest("button")
        ) as HTMLElement;
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        // Pull cursor slightly towards button center
        const pullStrength = 0.3;
        targetX += (buttonCenterX - e.clientX) * pullStrength;
        targetY += (buttonCenterY - e.clientY) * pullStrength;
      }

      gsap.to(cursor, {
        x: targetX,
        y: targetY,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });

      // Lens follows with slight delay for depth effect
      gsap.to(lens, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  });

  // Handle hover states
  useEffect(() => {
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;

      // Check for specific elements
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("cursor-pointer") ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("skill-card") ||
        target.closest(".skill-card")
      ) {
        setIsPointer(true);
      }
    };

    const handleMouseLeave = () => {
      setIsPointer(false);
    };

    // Add listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .cursor-pointer, .project-card, .skill-card"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Handle cursor visibility
    const handleMouseEnterWindow = () => setIsHidden(false);
    const handleMouseLeaveWindow = () => setIsHidden(true);

    document.addEventListener("mouseenter", handleMouseEnterWindow);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, []);

  // Animate cursor and lens state changes
  useGSAP(() => {
    if (!cursorRef.current || !lensRef.current) return;

    // Main cursor becomes smaller when hovering
    gsap.to(cursorRef.current, {
      scale: isPointer ? 0.3 : 1,
      opacity: isPointer ? 0.5 : 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Magnifying lens appears when hovering with bounce effect
    gsap.to(lensRef.current, {
      scale: isPointer ? 1 : 0,
      opacity: isPointer ? 1 : 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, [isPointer]);

  useGSAP(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      opacity: isHidden ? 0 : 1,
      duration: 0.2,
    });
  }, [isHidden]);

  // Don't show on mobile/touch devices
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      // eslint-disable-next-line
      setIsHidden(true);
    }
  }, []);

  return (
    <>
      {/* Main Cursor Circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-9999 mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer glow */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
            isPointer
              ? "border-white bg-white/20"
              : "border-white/50 bg-transparent"
          }`}
        />
      </div>

      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-9999 mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>

      {/* Magnifying Lens with Spotlight Effect */}
      <div
        ref={lensRef}
        className="fixed top-0 left-0 w-28 h-28 pointer-events-none z-9998"
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        }}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-orange-500 opacity-60 blur-xl animate-pulse-slow" />

          {/* Ring border */}
          <div className="absolute inset-2 rounded-full border-4 border-white/40 shadow-2xl" />
        </div>

        {/* Magnification area with backdrop effects */}
        <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          {/* Actual magnification layer using backdrop-filter */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backdropFilter: "brightness(1.5) contrast(1.2) saturate(1.3)",
              WebkitBackdropFilter:
                "brightness(1.5) contrast(1.2) saturate(1.3)",
            }}
          />

          {/* Glass overlay for lens effect */}
          <div className="absolute inset-0 bg-white/10" />

          {/* Light reflection spots */}
          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white/40 blur-md" />
          <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-white/30 blur-sm" />

          {/* Cross-hair indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-12">
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/30" />
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 w-px h-full bg-white/30" />
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/50" />
            </div>
          </div>

          {/* Rotating scan line */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-rotate-slow"
              style={{ width: "200%", height: "2px", left: "-50%", top: "50%" }}
            />
          </div>
        </div>

        {/* Corner brackets for focus effect */}
        <div className="absolute inset-3">
          {/* Top-left */}
          <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-white/60 rounded-tl-lg" />
          {/* Top-right */}
          <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-white/60 rounded-tr-lg" />
          {/* Bottom-left */}
          <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-white/60 rounded-bl-lg" />
          {/* Bottom-right */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-white/60 rounded-br-lg" />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 8s linear infinite;
        }
      `}</style>
    </>
  );
}
