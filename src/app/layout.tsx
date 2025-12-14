import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
  adjustFontFallback: true,
});

const siteConfig = {
  name: "Rajat Raghuvanshi",
  title: "Rajat Raghuvanshi - Full-Stack Developer & Software Engineer",
  description:
    "Experienced Full-Stack Developer with 4+ years specializing in Next.js, React, TypeScript, Node.js, and Blockchain. Building scalable, user-centric web applications with modern technologies and best practices.",
  url: "https://rajat-raghuvanshi.vercel.app",
  ogImage: "https://rajat-raghuvanshi.vercel.app/og-image.png",
  keywords: [
    "Rajat Raghuvanshi",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Blockchain Developer",
    "Web3 Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Portfolio Website",
    "Web Application Development",
    "UI/UX Development",
    "JavaScript Expert",
    "Software Development",
    "Freelance Developer",
  ],
  author: {
    name: "Rajat Raghuvanshi",
    email: "rajat.karnal@gmail.com",
    github: "https://github.com/Rajat-Raghuvanshi-0512",
    linkedin: "https://www.linkedin.com/in/rajat-raghuvanshi-315593201/",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Full-Stack Developer Portfolio`,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google:
      "google-site-verification=dnlE4-DSiupsY6iU57qsyqN3d8UefJfGuUxsNGjBxzE",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    email: siteConfig.author.email,
    jobTitle: "Full-Stack Developer",
    description: siteConfig.description,
    sameAs: [
      siteConfig.author.github,
      siteConfig.author.linkedin,
      "https://stackoverflow.com/users/17933816/rajat-raghuvanshi",
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Blockchain",
      "Web3",
      "Solidity",
      "Tailwind CSS",
      "Full-Stack Development",
      "Software Engineering",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Chandigarh University", // Update this
    },
    worksFor: {
      "@type": "Organization",
      name: "Hcode Technologies", // Update this
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: siteConfig.author.name,
      alternateName: "Rajat",
      description: siteConfig.description,
      image: siteConfig.ogImage,
      sameAs: [
        siteConfig.author.github,
        siteConfig.author.linkedin,
        "https://stackoverflow.com/users/17933816/rajat-raghuvanshi",
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data - JSON-LD */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <Script
          id="profile-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
