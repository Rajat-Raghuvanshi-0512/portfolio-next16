"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/constants";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsRef.current) return;

      // Heading entrance
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          end: "top 70%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      // Description entrance
      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
      });

      // Cards entrance with 3D effect
      const cards = cardsRef.current.querySelectorAll(".testimonial-card");

      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
          opacity: 0,
          y: 100,
          rotateX: -45,
          scale: 0.8,
        });
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Auto-rotate testimonials
  useGSAP(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-950"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
            >
              What Others{" "}
              <span className="bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light"
            >
              Don&apos;t just take my word for it - hear from people I&apos;ve
              worked with
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div ref={cardsRef} className="relative">
            {/* Cards Container */}
            <div className="relative h-150 md:h-125 flex items-center justify-center perspective-[2000px]">
              {testimonials.map((testimonial, index) => {
                const offset = index - activeIndex;
                const absOffset = Math.abs(offset);

                return (
                  <div
                    key={testimonial.id}
                    className="testimonial-card absolute w-full max-w-4xl transition-all duration-700 ease-out"
                    style={{
                      transform: `
                        translateX(${offset * 100}%)
                        translateZ(${-absOffset * 200}px)
                        scale(${1 - absOffset * 0.2})
                        rotateY(${offset * 15}deg)
                      `,
                      opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.5,
                      zIndex: testimonials.length - absOffset,
                      pointerEvents: offset === 0 ? "auto" : "none",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Card */}
                    <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-12 overflow-hidden">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10" />

                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 text-6xl text-purple-500/20">
                        &#34;
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-6 h-6 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8 font-light italic">
                          &#34;{testimonial.testimonial}&#34;
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 p-1 shrink-0">
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                              <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Details */}
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">
                              {testimonial.name}
                            </h4>
                            <p className="text-slate-400 font-medium">
                              {testimonial.role} • {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-110"
                data-cursor="Previous"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-purple-500"
                        : "w-2 bg-slate-700 hover:bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-110"
                data-cursor="Next"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
