"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // Smooth cursor follow with magnetic effect
  useGSAP(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

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
        target.closest("a")
      ) {
        setIsPointer(true);

        // Check for specific cursor text
        const cursorLabel = target.getAttribute("data-cursor");
        if (cursorLabel) {
          setCursorText(cursorLabel);
        }
      }

      // Project cards
      if (
        target.classList.contains("project-card") ||
        target.closest(".project-card")
      ) {
        setCursorText("View");
        setIsPointer(true);
      }

      // Skill cards
      if (
        target.classList.contains("skill-card") ||
        target.closest(".skill-card")
      ) {
        setCursorText("Explore");
        setIsPointer(true);
      }
    };

    const handleMouseLeave = () => {
      setIsPointer(false);
      setCursorText("");
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

  // Animate cursor state changes
  useGSAP(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      scale: isPointer ? 1.5 : 1,
      duration: 0.3,
      ease: "power2.out",
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
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 blur-sm" />
        </div>

        {/* Cursor Text */}
        {cursorText && (
          <div
            ref={cursorTextRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold whitespace-nowrap pointer-events-none"
          >
            {cursorText}
          </div>
        )}
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

      {/* Cursor Trail Effect */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
