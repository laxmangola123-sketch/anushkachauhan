import type { Metadata } from "next";
import OurJourneyContent from "./OurJourneyContent";

export const metadata: Metadata = {
  title: "Our Journey | The Story of Anushka Chauhan Heritage Couture",
  description: "The journey of Anushka Chauhan - a luxury Indian heritage couture label reimagining India's royal architecture & craftsmanship into modern bridal couture. Chapter I: Veerangana.",
  keywords: "Anushka Chauhan journey, Indian couture brand story, Veerangana collection, heritage couture India, luxury bridal wear story",
  openGraph: {
    title: "Our Journey | The Story of Anushka Chauhan Heritage Couture",
    description: "The journey of Anushka Chauhan - a luxury Indian heritage couture label reimagining India's royal architecture & craftsmanship into modern bridal couture. Chapter I: Veerangana.",
    type: "website",
    locale: "en_IN",
  },
};

export default function OurJourneyPage() {
  return <OurJourneyContent />;
}
