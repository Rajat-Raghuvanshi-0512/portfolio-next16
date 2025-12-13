import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sendMail = async ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: name,
        to_name: "Rajat",
        from_email: email,
        to_email: process.env.NEXT_PUBLIC_EMAIL_ID,
        message,
        subject,
      },
      { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
    );
    toast.success("Message sent successfully!", {
      description: "Thanks for reaching out! I'll get back to you soon.",
      duration: 5000,
    });
  } catch (e) {
    console.log(e);
    toast.error("Error in sending email, Please try again.");
  }
};

export default sendMail;
