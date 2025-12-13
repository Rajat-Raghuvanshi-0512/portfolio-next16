export interface SocialLink {
  name: string;
  icon: string;
  href: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
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

