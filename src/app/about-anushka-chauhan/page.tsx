import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Anushka Chauhan | Luxury Indian Heritage Couture Label",
  description: "Anushka Chauhan is a luxury Indian couture label for bridal lehengas, handcrafted sarees & festive wear. Rooted in heritage, reimagined for the modern woman.",
  keywords: "luxury Indian couture, Indian heritage couture, bridal lehenga designer India, handcrafted sarees India, zardozi lehenga, luxury Indian occasion wear",
  openGraph: {
    title: "About Anushka Chauhan | Luxury Indian Heritage Couture Label",
    description: "Anushka Chauhan is a luxury Indian couture label for bridal lehengas, handcrafted sarees & festive wear. Rooted in heritage, reimagined for the modern woman.",
    type: "website",
    locale: "en_IN",
  },
};

export default function AboutAnushkaChauhanPage() {
  return <AboutContent />;
}
