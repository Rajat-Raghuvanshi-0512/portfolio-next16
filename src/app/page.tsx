"use client";

import { ReactLenis } from "lenis/react";
import {
  Hero,
  About,
  Projects,
  Navbar,
  CustomCursor,
  WorkExperience,
  Testimonials,
  Contact,
} from "@/components";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <ReactLenis root>
      <CustomCursor />
      <Navbar />
      <Toaster position="top-center" richColors />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <WorkExperience />
        <Testimonials />
        <Contact />
      </main>
    </ReactLenis>
  );
}
