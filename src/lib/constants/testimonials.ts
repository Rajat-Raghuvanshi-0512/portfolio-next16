export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Lokesh Chauhan",
    role: "Founder",
    company: "Pixy Square",
    testimonial:
      "Rajat developed our website exactly like we wanted it, and even better to be honest. His web development expertise has given us great digital products! Working with him was an absolute pleasure. He's not just technically skilled but also understands business needs perfectly.",
    avatar: "👨‍💼",
    image: "/feedbacks/lokesh.jpeg",
    rating: 5,
  },
  {
    id: 2,
    name: "Kamal Pratap",
    role: "Project Manager",
    company: "Duckcart",
    testimonial:
      "After Rajat optimized our website, our traffic increased by 30%. We can't thank you enough! His attention to detail and performance optimization skills are outstanding. He delivered beyond our expectations and on time.",
    avatar: "🚀",
    image:
      "https://res.cloudinary.com/rajat0512/image/upload/v1642447946/E-commerce/avatar_gehm7u.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Abhijit",
    role: "HR Manager",
    company: "Skill Vertex",
    testimonial:
      "I've never met a web developer who truly cares about their client's success like Rajat does. Truly a great person and an exceptional developer. His commitment to quality and client satisfaction is unmatched in the industry.",
    avatar: "💼",
    image:
      "https://res.cloudinary.com/rajat0512/image/upload/v1642447946/E-commerce/avatar_gehm7u.jpg",
    rating: 5,
  },
];
