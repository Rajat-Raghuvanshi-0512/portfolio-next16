import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  SquareStack,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface SocialLink {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  href: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/Rajat-Raghuvanshi-0512",
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/rajat-raghuvanshi-315593201/",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Stack Overflow",
    icon: SquareStack,
    href: "https://stackoverflow.com/users/17933816/rajat-raghuvanshi",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "Email",
    icon: MailIcon,
    href: "mailto:rajat.karnal@gmail.com",
    color: "from-green-500 to-green-700",
  },
];
