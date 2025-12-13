"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import sendMail from "@/lib/utils";

// Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must be less than 100 characters" }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters" })
    .max(100, { message: "Subject must be less than 100 characters" })
    .trim(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" })
    .trim(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  useGSAP(() => {
    // Form entrance
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 60%",
        end: "top 30%",
        scrub: 1,
      },
      opacity: 0,
      y: 80,
    });
  });

  const triggerConfetti = () => {
    const colors = ["#8b5cf6", "#ec4899", "#f97316"];
    for (let i = 0; i < 30; i++) {
      // Pre-compute random values - safe to use Math.random() in event handlers
      // eslint-disable-next-line
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      // eslint-disable-next-line
      const randomX = (Math.random() - 0.5) * 400;
      // eslint-disable-next-line
      const randomY = (Math.random() - 0.5) * 400;
      // eslint-disable-next-line
      const randomRotation = Math.random() * 360;

      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${randomColor};
        left: 50%;
        top: 50%;
        opacity: 1;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(confetti);

      gsap.to(confetti, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => confetti.remove(),
      });
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    // Animate button
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    // Simulate API call
    await sendMail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    // Confetti effect
    triggerConfetti();

    // Reset form
    form.reset();

    console.log("Form data:", data);
  };
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 overflow-hidden h-full">
          {/* Gradient glow */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5" />
          <div className="relative z-10 space-y-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Me</h2>
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-300">
                    Your Name
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-300">
                    Your Email
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-300">
                    Subject
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-300">
                    Your Message
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full px-8 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-semibold rounded-lg overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {form.formState.isSubmitting ? (
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
    </Form>
  );
};

export default ContactForm;
