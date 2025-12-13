"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillCard {
  title: string;
  icon: string;
  description: string;
  color: string;
}

const skills: SkillCard[] = [
  {
    title: "Frontend Development",
    icon: "⚛️",
    description: "React, Next.js, TypeScript, Tailwind CSS",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    icon: "🚀",
    description: "Node.js, Express, MongoDB, PostgreSQL",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "React Native",
    icon: "📱",
    description: "Cross-platform mobile apps with 200k+ users",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Blockchain",
    icon: "⛓️",
    description: "Web3, Solidity, Smart Contracts, DApps",
    color: "from-orange-500 to-red-500",
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = cardsContainerRef.current?.querySelectorAll(".skill-card");

      // Main timeline with pinning - starts earlier for smooth transition
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Stage 1: Fade in heading
      mainTl.from(headingRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1,
      });

      // Stage 2: Description slides in
      mainTl.from(
        descriptionRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
        },
        "+=0.3"
      );

      // Stage 3: Stats counter animation
      mainTl.from(
        statsRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 1,
        },
        "+=0.3"
      );

      // Stage 4: 3D cards entrance
      if (cards && cards.length > 0) {
        mainTl.from(
          cards,
          {
            opacity: 0,
            y: 200,
            rotateX: -90,
            stagger: 0.2,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "+=0.5"
        );

        // Stage 5: Rotate cards for 3D effect
        mainTl.to(
          cards,
          {
            rotateY: 360,
            stagger: 0.15,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "+=0.3"
        );
      }

      // Animate number counter
      const yearsElement = document.querySelector(".years-count");
      if (yearsElement) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.from(yearsElement, {
              textContent: 0,
              duration: 2,
              ease: "power1.inOut",
              snap: { textContent: 1 },
              onUpdate: function () {
                if (yearsElement instanceof HTMLElement) {
                  yearsElement.textContent = Math.ceil(
                    parseFloat(yearsElement.textContent || "0")
                  ).toString();
                }
              },
            });
          },
          once: true,
        });
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Individual card hover animations
  useGSAP(
    () => {
      const cards = cardsContainerRef.current?.querySelectorAll(".skill-card");

      cards?.forEach((card) => {
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            rotateY: 5,
            rotateX: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    },
    { scope: cardsContainerRef, dependencies: [] }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-950"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20 md:px-12">
        <div className="max-w-7xl w-full">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              About{" "}
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Experienced web developer skilled in crafting, enhancing, and
              sustaining high-performing, user-centric applications. Proficient
              in modern technologies and adheres to best design practices.
            </p>
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            className="flex justify-center items-center gap-12 mb-20"
          >
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                <span className="years-count">4</span>+
              </div>
              <p className="text-slate-400 text-lg font-medium">
                Years Experience
              </p>
            </div>
            <div className="h-20 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                200K+
              </div>
              <p className="text-slate-400 text-lg font-medium">Active Users</p>
            </div>
          </div>

          {/* 3D Skill Cards */}
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ perspective: "1000px" }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card relative group"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card */}
                <div className="relative h-64 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 overflow-hidden transition-all duration-300">
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Icon */}
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-slate-400 font-light leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
