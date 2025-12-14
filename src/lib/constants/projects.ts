export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  codeLink: string;
  websiteLink: string;
  isComplete?: boolean;
  details: {
    features: string[];
    role: string;
    year: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Jira Clone",
    category: "Next.js",
    description:
      "Project management and task tracking platform inspired by Jira. Monitor all your tasks and projects in one place with workspace organization and team collaboration features.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "📋",
    codeLink: "https://github.com/Rajat-Raghuvanshi-0512/jira-clone",
    websiteLink:
      "https://jira-clone-gold-seven.vercel.app/workspaces/6935c8530023df57a4d2",
    isComplete: false,
    details: {
      features: [
        "Task and project management",
        "Workspace organization",
        "Team collaboration tools",
        "Progress tracking dashboard",
      ],
      role: "Full-stack Developer",
      year: "2025",
    },
  },
  {
    id: 2,
    title: "Duolingo Clone",
    category: "Next.js",
    description:
      "Interactive language learning platform inspired by Duolingo. Learn, practice and master new languages with gamified lessons and progress tracking.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "🦜",
    codeLink: "https://github.com/Rajat-Raghuvanshi-0512/duolingo-clone",
    websiteLink: "https://duolingo-clone-dusky.vercel.app/",
    details: {
      features: [
        "Interactive language lessons",
        "Progress tracking system",
        "Gamified learning experience",
        "Multiple language support",
      ],
      role: "Full-stack Developer",
      year: "2025",
    },
  },
  {
    id: 3,
    title: "Pare India",
    category: "Next.js",
    description:
      "Corporate website with modern design and optimal performance, hosted on Hostinger with excellent SEO.",
    tech: ["Next.js", "Tailwind CSS", "Hostinger"],
    image: "🏢",
    codeLink: "https://github.com/Rajat-Raghuvanshi-0512/pare-india-next-app",
    websiteLink: "https://pareindia.com/",
    details: {
      features: [
        "SEO optimized",
        "Fast loading times",
        "Contact management",
        "Service showcase",
      ],
      role: "Full-stack Developer",
      year: "2023",
    },
  },
  {
    id: 4,
    title: "Timmy's Mowing",
    category: "Next.js",
    description:
      "Modern lawn care service platform with beautiful UI and seamless booking experience for customers.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "🌿",
    codeLink: "https://github.com/Rajat-Raghuvanshi-0512/timmy-mowing",
    websiteLink: "https://timmy-mowing.vercel.app/",
    details: {
      features: [
        "Online booking system",
        "Service scheduling",
        "Customer reviews",
        "Responsive design",
      ],
      role: "Frontend Developer",
      year: "2023",
    },
  },
  {
    id: 5,
    title: "Mother's Kitchen",
    category: "React.js",
    description:
      "A beautiful food ordering platform bringing home-cooked meals to customers with love and care.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    image: "🍽️",
    codeLink: "https://github.com/Rajat-Raghuvanshi-0512/mother-kitchen",
    websiteLink: "https://motherskitchen.co.in/",
    details: {
      features: [
        "Menu management",
        "Order tracking",
        "User authentication",
        "Real-time updates",
      ],
      role: "Frontend Developer",
      year: "2022",
    },
  },
  {
    id: 6,
    title: "Krypt",
    category: "Web 3.0",
    description:
      "Web 3.0 has the potential to change the internet as we know it. This is a blockchain cryptocurrency app with smart contracts.",
    tech: ["React", "Solidity", "Hardhat", "Ethereum"],
    image: "⛓️",
    codeLink: "https://github.com/Rajat-Raghuvanshi-0512/web3.0-blockchain-app",
    websiteLink: "https://krypt-georli.netlify.app/",
    details: {
      features: [
        "Crypto transactions",
        "Smart contracts",
        "Wallet integration",
        "Transaction history",
      ],
      role: "Blockchain Developer",
      year: "2022",
    },
  },
  {
    id: 4,
    title: "Voyage Tours",
    category: "Next.js",
    description:
      "With Voyage, businesses may save money and offer convenience to their clients. Also, 'community chat' has been added for the user to find a travel companion.",
    tech: ["React.js", "Heroku", "Node.js", "Socket.io"],
    image: "✈️",
    codeLink:
      "https://github.com/Rajat-Raghuvanshi-0512/voyage-tours-and-travels",
    websiteLink: "https://voyage-tours.netlify.app/",
    details: {
      features: [
        "Real-time community chat",
        "Tour booking system",
        "Travel companion matching",
        "Interactive destination explorer",
      ],
      role: "Lead Developer",
      year: "2021",
    },
  },
];
