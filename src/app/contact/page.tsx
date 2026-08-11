import type { Metadata } from "next";
import ContactContent from "../pages/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Anushka Chauhan Heritage Couture",
  description: "Contact Anushka Chauhan Couture for customer care, bespoke bridal appointments, and custom orders. Available via email and WhatsApp.",
  keywords: "contact Anushka Chauhan, custom order inquiry, bridal appointment, Indian couture contact, customer support",
  openGraph: {
    title: "Contact Us | Anushka Chauhan Heritage Couture",
    description: "Contact Anushka Chauhan Couture for customer care, bespoke bridal appointments, and custom orders.",
    type: "website",
    locale: "en_IN",
  },
};

export default function ContactRoutePage() {
  return <ContactContent />;
}
