export interface SkillCard {
  title: string;
  icon: string;
  image: string;
  description: string;
  color: string;
}

export const skills: SkillCard[] = [
  {
    title: "Frontend Development",
    icon: "⚛️",
    image: "/about/frontend.png",
    description: "React, Next.js, TypeScript, Tailwind CSS",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    icon: "🚀",
    image: "/about/backend.png",
    description: "Node.js, Express, MongoDB, PostgreSQL",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "React Native",
    icon: "📱",
    image: "/about/native.png",
    description: "Cross-platform mobile apps with 200k+ users",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Blockchain",
    icon: "⛓️",
    image: "/about/creator.png",
    description: "Web3, Solidity, Smart Contracts, DApps",
    color: "from-orange-500 to-red-500",
  },
];

