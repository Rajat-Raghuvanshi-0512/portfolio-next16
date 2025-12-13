"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const cards = cardsContainerRef.current.querySelectorAll(".project-card");

      // Heading entrance
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          end: "top 60%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.8,
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
        scale: 0.8,
      });

      // Set initial state for all cards
      gsap.set(cards, {
        opacity: 1,
        scale: 1,
        rotateY: 0,
      });

      // Horizontal scroll effect - pin section and scroll cards horizontally
      const horizontalScroll = gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + cardsContainerRef.current!.offsetWidth * 2,
        },
      });

      // Individual card zoom and rotation animations
      cards.forEach((card) => {
        // Zoom in as card enters center
        gsap.fromTo(
          card,
          {
            scale: 0.85,
            opacity: 0.6,
          },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: "left right",
              end: "center center",
              scrub: 1,
            },
          }
        );

        // Zoom out as card exits center
        gsap.fromTo(
          card,
          {
            scale: 1,
            opacity: 1,
          },
          {
            scale: 0.85,
            opacity: 0.6,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: "center center",
              end: "right left",
              scrub: 1,
            },
          }
        );
      });

      // Traveling element - progress tracker
      if (trackerRef.current) {
        gsap.to(trackerRef.current, {
          width: "100%",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top top",
            end: () => "+=" + cardsContainerRef.current!.offsetWidth * 2,
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-900"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Section Heading */}
      <div className="relative z-10 pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
          >
            My{" "}
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light mt-4 md:mt-10"
          >
            Following projects showcase my skills through real-world examples.
            Click cards to flip and see details!
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Cards Container */}
      <div
        ref={cardsContainerRef}
        className="relative h-screen flex items-center"
      >
        <div className="flex gap-8 px-6 md:px-12">
          {projects.map((project) => {
            const isFlipped = hoveredCard === project.id;

            return (
              <div
                key={project.id}
                className="project-card shrink-0 w-[85vw] md:w-125 group"
                style={{
                  perspective: "2000px",
                }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* 3D Flip Card Container */}
                <div
                  className="relative w-full h-150 transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT of Card */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-slate-950 border-2 border-slate-800 overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      pointerEvents: isFlipped ? "none" : "auto",
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-blue-600/20" />

                    {/* Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {/* Category Badge */}
                      <div className="mb-6">
                        <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
                          {project.category}
                        </span>
                      </div>

                      {/* Emoji Icon */}
                      <div className="text-8xl mb-6 text-center">
                        {project.image}
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-300 text-base leading-relaxed mb-6 grow font-light">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-lg text-sm font-medium border border-slate-700"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>

                      {/* Flip Indicator */}
                      <div className="text-center text-slate-500 text-sm font-medium mt-auto">
                        Hover to see details →
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent" />
                    </div>
                  </div>

                  {/* BACK of Card */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-slate-950 border-2 border-purple-500 overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      pointerEvents: isFlipped ? "auto" : "none",
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-purple-600/30 via-pink-600/20 to-orange-600/30" />

                    {/* Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                          <span className="font-medium">
                            {project.details.role}
                          </span>
                          <span className="w-1 h-1 bg-slate-600 rounded-full" />
                          <span>{project.details.year}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6 grow">
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {project.details.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-slate-300 font-light"
                            >
                              <span className="text-purple-400 mr-2 mt-1">
                                ✓
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-lg text-sm font-medium border border-purple-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <a
                          href={project.websiteLink || "#"}
                          target={project.websiteLink ? "_blank" : "_self"}
                          rel={
                            project.websiteLink
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors duration-300 text-center block"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!project.websiteLink) {
                              e.preventDefault();
                            }
                          }}
                        >
                          View Live
                        </a>
                        <a
                          href={project.codeLink || "#"}
                          target={project.codeLink ? "_blank" : "_self"}
                          rel={
                            project.codeLink ? "noopener noreferrer" : undefined
                          }
                          className="flex-1 px-4 py-3 border-2 border-purple-500 hover:border-purple-400 text-purple-300 hover:text-purple-200 font-semibold rounded-lg transition-colors duration-300 text-center block"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!project.codeLink) {
                              e.preventDefault();
                            }
                          }}
                        >
                          View Code
                        </a>
                      </div>

                      {/* Flip back indicator */}
                      <div className="text-center text-slate-500 text-sm font-medium mt-4">
                        Move away to flip back
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End spacer */}
          <div className="shrink-0 w-[10vw]" />
        </div>
      </div>
    </section>
  );
}
