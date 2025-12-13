"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIndicator } from "./ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      // Parallax effect on background overlay
      gsap.to(overlayRef.current, {
        opacity: 0.3,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade out content as you scroll - individual animations for better control
      [
        titleRef.current,
        subtitleRef.current,
        ctaRef.current,
        descriptionRef.current,
      ].forEach((element) => {
        if (element) {
          gsap.to(element, {
            opacity: 0,
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });
    },
    { scope: heroRef }
  );

  // Initial entrance animations
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Split title into characters for stagger animation
        const titleChars = titleRef.current?.querySelectorAll(".char");

        const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Animate title characters
        if (titleChars && titleChars.length > 0) {
          entranceTl.from(titleChars, {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.03,
            duration: 1,
          });
        }

        // Animate subtitle
        if (subtitleRef.current) {
          entranceTl.from(
            subtitleRef.current,
            {
              opacity: 0,
              y: 30,
              duration: 0.8,
            },
            "-=0.5"
          );
        }

        // Animate description
        if (descriptionRef.current) {
          entranceTl.from(
            descriptionRef.current,
            {
              opacity: 0,
              y: 30,
              duration: 0.6,
            },
            "-=0.4"
          );
        }

        // Animate CTA
        if (ctaRef.current) {
          entranceTl.from(
            ctaRef.current,
            {
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
            },
            "-=0.3"
          );
        }
      }, heroRef);

      return () => ctx.revert();
    },
    { scope: heroRef }
  );

  const splitText = (text: string, isGradient = false) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`char inline-block ${isGradient ? "gradient-char" : ""}`}
        style={{
          display: "inline-block",
          ...(isGradient && {
            background:
              "linear-gradient(to right, rgb(192, 132, 252), rgb(147, 197, 253), rgb(216, 180, 254))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }),
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
        {/* Animated overlay for depth */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-linear-to-tr from-purple-950/30 via-blue-950/20 to-slate-950/50"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Gradient orbs for elegance */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-12">
        <div className="max-w-5xl text-center">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="mb-6 text-6xl font-extrabold leading-tight tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ perspective: "1000px" }}
          >
            <span className="first-name">{splitText("Rajat", false)}</span>
            <br />
            <span className="last-name bg-linear-to-r from-purple-400 via-blue-400 to-purple-300 bg-clip-text">
              {splitText("Raghuvanshi", true)}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mb-4 text-xl text-slate-300 sm:text-2xl md:text-3xl font-medium tracking-wide"
          >
            Software Developer
          </p>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="mb-12 text-base text-slate-400 sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Crafting high-performing, user-centric applications with 4+ years of
            experience in Full-stack, React Native, and Blockchain development
          </p>
          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-8 py-4 bg-white text-slate-900 font-semibold text-base rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10 tracking-wide">View My Work</span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="px-8 py-4 border-2 border-slate-400 text-slate-200 font-semibold text-base rounded-lg transition-all duration-300 hover:border-white hover:text-white hover:scale-105 hover:shadow-xl hover:shadow-slate-700/50 tracking-wide">
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
