"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./forms/ContactForm";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "GitHub",
    icon: "💻",
    href: "https://github.com/rajat-raghuvanshi",
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    href: "https://linkedin.com/in/rajat-raghuvanshi",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Twitter",
    icon: "🐦",
    href: "https://twitter.com/rajat_dev",
    color: "from-sky-400 to-sky-600",
  },
  {
    name: "Email",
    icon: "📧",
    href: "mailto:rajat@example.com",
    color: "from-red-500 to-red-700",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<HTMLDivElement>(null);
  const followMeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

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

      // Get in Touch container entrance
      if (getInTouchRef.current) {
        gsap.from(getInTouchRef.current, {
          scrollTrigger: {
            trigger: getInTouchRef.current,
            start: "top 50%",
            end: "top 30%",
            scrub: 1,
          },
          opacity: 0,
          x: 100,
          scale: 0.95,
        });

        // Animate individual contact items
        const contactItems =
          getInTouchRef.current.querySelectorAll(".contact-item");
        contactItems.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: getInTouchRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: 50,
            delay: index * 0.1,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      }

      // Follow Me container entrance
      if (followMeRef.current) {
        gsap.from(followMeRef.current, {
          scrollTrigger: {
            trigger: followMeRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
          opacity: 0,
          x: 100,
          scale: 0.95,
        });

        // Animate social links with stagger
        const socialItems =
          followMeRef.current.querySelectorAll(".social-item");
        socialItems.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: followMeRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            scale: 0.8,
            rotation: -10,
            delay: index * 0.15,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        });
      }

      // Morph background orb based on mouse position
      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current || !orbRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        gsap.to(orbRef.current, {
          x: (x - 50) * 2,
          y: (y - 50) * 2,
          duration: 2,
          ease: "power2.out",
        });
      };

      sectionRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        {/* Mouse-following orb */}
        <div
          ref={orbRef}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
            >
              Let&apos;s{" "}
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light"
            >
              Have a project in mind? Let&apos;s work together to create
              something amazing!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div
                ref={getInTouchRef}
                className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Get in Touch
                  </h3>

                  {/* Email */}
                  <div className="contact-item flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      📧
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Email</p>
                      <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        rajat@example.com
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="contact-item flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      📍
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Location</p>
                      <p className="text-white font-medium">India</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="contact-item flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl shrink-0">
                      ✅
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        Availability
                      </p>
                      <p className="text-white font-medium">
                        Open for opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div
                ref={followMeRef}
                className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-pink-500/5 via-orange-500/5 to-red-500/5" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Follow Me
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-item group relative p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-105"
                        data-cursor={social.name}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-lg bg-linear-to-br ${social.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                          >
                            {social.icon}
                          </div>
                          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                            {social.name}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
