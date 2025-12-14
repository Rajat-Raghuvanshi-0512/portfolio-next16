"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/constants";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function WorkExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const cards =
        cardsContainerRef.current.querySelectorAll(".experience-card");
      const dots = cardsContainerRef.current.querySelectorAll(".timeline-dot");
      const mm = gsap.matchMedia();

      // Mobile: Simple animations without timeline effects
      mm.add("(max-width: 767px)", () => {
        // Simple heading entrance
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });

        // Simple description entrance
        gsap.from(descriptionRef.current, {
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });

        // Simple card animations without side movements
        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
          });

          // Animate card content
          const company = card.querySelector(".experience-company");
          const role = card.querySelector(".experience-role");
          const period = card.querySelector(".experience-period");
          const listItems = card.querySelectorAll(".li-item");

          const contentTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });

          contentTimeline
            .from(company, { opacity: 0, y: 20, duration: 0.4 })
            .from(role, { opacity: 0, y: 20, duration: 0.4 }, "-=0.2")
            .from(period, { opacity: 0, y: 20, duration: 0.3 }, "-=0.2")
            .from(
              listItems,
              { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 },
              "-=0.1"
            );
        });
      });

      // Desktop: Complex animations with timeline
      mm.add("(min-width: 768px)", () => {
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

        // Timeline line draws progressively as user scrolls
        if (timelineLineRef.current) {
          gsap.fromTo(
            timelineLineRef.current,
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
              transformOrigin: "top",
              ease: "none",
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1,
              },
            }
          );
        }

        // Each card animates independently as it comes into view
        cards.forEach((card, index) => {
          const side = experiences[index].side;
          const dot = dots[index];

          // Create a timeline for each card
          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          });

          // Card entrance
          cardTimeline.from(card, {
            opacity: 0,
            x: side === "left" ? -200 : 200,
            rotateY: side === "left" ? -30 : 30,
            duration: 0.8,
            ease: "power3.out",
          });

          // Dot pulse animation
          cardTimeline.from(
            dot,
            {
              scale: 0,
              duration: 0.4,
              ease: "back.out(2)",
            },
            "-=0.6"
          );

          // Sequential animation: Company -> Role -> Period -> Description
          const company = card.querySelector(".experience-company");
          const role = card.querySelector(".experience-role");
          const period = card.querySelector(".experience-period");
          const listItems = card.querySelectorAll(".li-item");

          // Company name appears first
          cardTimeline.from(
            company,
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.5"
          );

          // Role appears after company
          cardTimeline.from(
            role,
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          );

          // Period appears after role
          cardTimeline.from(
            period,
            {
              opacity: 0,
              y: 20,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.3"
          );

          // List items (description) stagger after period
          cardTimeline.from(
            listItems,
            {
              opacity: 0,
              x: side === "left" ? -30 : 30,
              stagger: 0.15,
              duration: 0.5,
            },
            "-=0.2"
          );
        });

        // Individual card hover animations
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-slate-900 py-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6">
        <div className="max-w-7xl w-full mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-20">
            <h2
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
            >
              Work{" "}
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light"
            >
              My professional journey through amazing companies and projects
            </p>
          </div>

          {/* Timeline Container */}
          <div ref={cardsContainerRef} className="relative">
            {/* Center Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block">
              <div
                ref={timelineLineRef}
                className="w-full h-full bg-linear-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
              />
            </div>

            {/* Experience Cards */}
            <div className="space-y-16 md:space-y-24">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="relative"
                  style={{ perspective: "1000px" }}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot absolute left-1/2 top-8 -translate-x-1/2 z-20 hidden md:block">
                    <div className="relative">
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 w-8 h-8 rounded-full bg-white/20 animate-ping" />
                      {/* Solid dot */}
                      <div
                        className={`w-8 h-8 rounded-full bg-linear-to-br ${exp.color} border-4 border-slate-900 flex items-center justify-center text-lg shadow-lg`}
                      >
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={20}
                          height={20}
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`experience-card relative md:w-[45%] ${
                      exp.side === "left"
                        ? "md:mr-auto md:pr-12"
                        : "md:ml-auto md:pl-12"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card */}
                    <div className="relative group ml-0">
                      <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-6 md:p-8 overflow-hidden transition-all duration-300">
                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="experience-company text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                {exp.company}
                              </h3>
                              <p
                                className={`experience-role text-lg font-semibold bg-linear-to-r ${exp.color} bg-clip-text text-transparent mb-2`}
                              >
                                {exp.role}
                              </p>
                              <div className="experience-period flex items-center gap-2 text-slate-400 text-sm">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span className="font-medium">
                                  {exp.period}
                                </span>
                              </div>
                            </div>

                            {/* Company Logo Badge */}
                            <div
                              className={`w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg overflow-hidden p-2 border border-slate-700`}
                            >
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>

                          {/* Description */}
                          <ul className="space-y-3 mt-6">
                            {exp.description.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-slate-300 font-light leading-relaxed li-item"
                              >
                                <span
                                  className={`text-transparent bg-linear-to-r ${exp.color} bg-clip-text mr-3 mt-1 shrink-0 font-bold`}
                                >
                                  ▸
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline End Marker */}
          <div className="flex justify-center mt-16 md:-mt-1">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg border-4 border-slate-900">
              🚀
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
