"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  icon: string;
  description: string[];
  side: "left" | "right";
  color: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Hcode Technologies",
    role: "Associate Software Developer",
    period: "Dec 2023 - Present",
    startDate: "Dec 2023",
    endDate: "Present",
    icon: "💻",
    description: [
      "Currently maintaining a native mobile application with over 200,000 users",
      "Majorly working on bug fixes and code optimisations",
      "Resolving user's query in minimal time",
    ],
    side: "right",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    company: "Pixy Square",
    role: "Fullstack Developer",
    period: "May 2023 - Nov 2023",
    startDate: "May 2023",
    endDate: "Nov 2023",
    icon: "🎨",
    description: [
      "Fulfilling the demands of clients of new Startup applications",
      "Developing figma designs into responsive web applications",
      "Ensuring cross-browser compatibility",
      "Using various optimization and SEO enhancing techniques",
    ],
    side: "left",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    company: "Duckcart",
    role: "NodeJs Developer",
    period: "Nov 2022 - May 2023",
    startDate: "Nov 2022",
    endDate: "May 2023",
    icon: "🚀",
    description: [
      "Managing the backend of a new Startup application",
      "Creating new APIs and adding new features",
      "Managing a team of Interns",
      "Keeping track of changes and new features",
    ],
    side: "right",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    company: "Qwings",
    role: "Frontend Developer Intern",
    period: "Mar 2022 - Jul 2022",
    startDate: "Mar 2022",
    endDate: "Jul 2022",
    icon: "⚛️",
    description: [
      "Developing web applications using React.js",
      "Collaborating with cross-functional teams",
      "Participating in code reviews",
      "Creating high-quality products",
    ],
    side: "left",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    company: "Avada",
    role: "Web Developer Intern",
    period: "Mar 2021 - Aug 2021",
    startDate: "Mar 2021",
    endDate: "Aug 2021",
    icon: "🌐",
    description: [
      "Worked as a senior web developer",
      "Lead a team of 8 people",
      "Maintained the main website of the company",
      "Taught colleagues good code practices",
    ],
    side: "right",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    company: "Skill Vertex",
    role: "MERN Stack Developer Intern",
    period: "Oct 2020 - Dec 2020",
    startDate: "Oct 2020",
    endDate: "Dec 2020",
    icon: "📚",
    description: [
      "Developing web applications using MERN stack",
      "Created E-commerce and Food delivery apps",
      "Implementing responsive design",
      "Ensuring cross-browser compatibility",
    ],
    side: "left",
    color: "from-yellow-500 to-orange-500",
  },
];

export function WorkExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const cards = cardsContainerRef.current.querySelectorAll(".experience-card");
      const dots = cardsContainerRef.current.querySelectorAll(".timeline-dot");

      // Main pinned timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Stage 1: Heading entrance
      mainTimeline.from(headingRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 0.5,
      });

      // Stage 2: Timeline line draws from top to bottom
      if (timelineLineRef.current) {
        mainTimeline.from(
          timelineLineRef.current,
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1,
          },
          "+=0.2"
        );
      }

      // Stage 3: Cards and dots appear one by one with stagger
      cards.forEach((card, index) => {
        const side = experiences[index].side;

        // Card entrance
        mainTimeline.from(
          card,
          {
            opacity: 0,
            x: side === "left" ? -200 : 200,
            rotateY: side === "left" ? -30 : 30,
            duration: 0.8,
            ease: "power3.out",
          },
          `card-${index}`
        );

        // Dot pulse animation
        mainTimeline.from(
          dots[index],
          {
            scale: 0,
            duration: 0.4,
            ease: "back.out(2)",
          },
          `card-${index}+=0.2`
        );

        // List items stagger
        const listItems = card.querySelectorAll(".list-item");
        mainTimeline.from(
          listItems,
          {
            opacity: 0,
            x: side === "left" ? -30 : 30,
            stagger: 0.1,
            duration: 0.4,
          },
          `card-${index}+=0.4`
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
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-900"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full">
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
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light">
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
              {experiences.map((exp, index) => (
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
                      <div className={`w-8 h-8 rounded-full bg-linear-to-br ${exp.color} border-4 border-slate-900 flex items-center justify-center text-lg shadow-lg`}>
                        {exp.icon}
                      </div>
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`experience-card relative md:w-[45%] ${
                      exp.side === "left" ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Connecting Line (Mobile) */}
                    <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-pink-500" />

                    {/* Card */}
                    <div className="relative group ml-16 md:ml-0">
                      {/* Mobile Dot */}
                      <div className="absolute -left-[4.5rem] top-6 md:hidden">
                        <div className={`w-8 h-8 rounded-full bg-linear-to-br ${exp.color} border-4 border-slate-900 flex items-center justify-center text-lg`}>
                          {exp.icon}
                        </div>
                      </div>

                      <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-6 md:p-8 overflow-hidden transition-all duration-300">
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-linear-to-br ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                {exp.company}
                              </h3>
                              <p className={`text-lg font-semibold bg-linear-to-r ${exp.color} bg-clip-text text-transparent mb-2`}>
                                {exp.role}
                              </p>
                              <div className="flex items-center gap-2 text-slate-400 text-sm">
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
                                <span className="font-medium">{exp.period}</span>
                              </div>
                            </div>

                            {/* Icon Badge */}
                            <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${exp.color} flex items-center justify-center text-3xl shadow-lg`}>
                              {exp.icon}
                            </div>
                          </div>

                          {/* Description */}
                          <ul className="space-y-3 mt-6">
                            {exp.description.map((item, idx) => (
                              <li
                                key={idx}
                                className="list-item flex items-start text-slate-300 font-light leading-relaxed"
                              >
                                <span className={`text-transparent bg-linear-to-r ${exp.color} bg-clip-text mr-3 mt-1 flex-shrink-0 font-bold`}>
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
          <div className="flex justify-center mt-16">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg border-4 border-slate-900">
              🚀
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

