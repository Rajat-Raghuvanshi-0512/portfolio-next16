export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  codeLink: string;
  websiteLink: string;
  details: {
    features: string[];
    role: string;
    year: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Shop Buddy",
    category: "MERN Stack",
    description:
      "Shop Buddy is an attempt to serve the people of India with unique designs on apparels. E-commerce is revolutionising the way we all shop in India.",
    tech: ["React", "MongoDB", "Node.js", "Express"],
    image: "🛍️",
    codeLink: "https://github.com/Rajat-Raghuvanshi-0512/MERN-Ecommerce",
    websiteLink: "https://shop-buddy.onrender.com/",
    details: {
      features: [
        "Full-featured shopping cart",
        "Product reviews and ratings",
        "Admin panel for product management",
        "Payment gateway integration",
      ],
      role: "Full-stack Developer",
      year: "2023",
    },
  },
  {
    id: 2,
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
      year: "2023",
    },
  },
  {
    id: 3,
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
      year: "2024",
    },
  },
  {
    id: 4,
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
      year: "2023",
    },
  },
];
