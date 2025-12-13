"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

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
  const formRef = useRef<HTMLFormElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Heading entrance
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      // Form entrance
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
        opacity: 0,
        y: 80,
      });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Animate button
    const button = e.currentTarget.querySelector("button[type='submit']");
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success toast with animation
    toast.success("Message sent successfully!", {
      description: "Thanks for reaching out! I'll get back to you soon. 🚀",
      duration: 5000,
    });

    // Confetti effect
    const colors = ["#8b5cf6", "#ec4899", "#f97316"];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: 50%;
        top: 50%;
        opacity: 1;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(confetti);

      gsap.to(confetti, {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => confetti.remove(),
      });
    }

    // Reset form
    e.currentTarget.reset();
    setIsSubmitting(false);

    console.log("Form data:", data);
  };

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
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light">
              Have a project in mind? Let&apos;s work together to create
              something amazing!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 overflow-hidden">
                {/* Gradient glow */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5" />

                <div className="relative z-10 space-y-6">
                  {/* Name Field */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-semibold rounded-lg overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-pink-600 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </form>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Get in Touch
                  </h3>

                  {/* Email */}
                  <div className="flex items-start gap-4 group cursor-pointer">
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
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      📍
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Location</p>
                      <p className="text-white font-medium">India</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-start gap-4">
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
              <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 overflow-hidden">
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
                        className="group relative p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-105"
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
