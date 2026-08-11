import { Metadata } from "next";
import StaffPortalContent from "./StaffPortalContent";

export const metadata: Metadata = {
  title: "Atelier Studio Staff Portal | Anushka Chauhan Heritage Couture",
  description: "Bespoke orders control panel for studio staff to process details, update status, and manage real-time courier dispatch locations.",
  keywords: "staff portal, studio management, order tracker control, couture operations"
};

export default function StaffPortalPage() {
  return <StaffPortalContent />;
}
