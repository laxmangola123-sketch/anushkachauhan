import { Metadata } from "next";
import { Suspense } from "react";
import TrackOrderContent from "./TrackOrderContent";

export const metadata: Metadata = {
  title: "Live Order Tracking | Anushka Chauhan Heritage Couture",
  description: "Track your bespoke luxury order in real-time. View production stages, shipping milestones, and courier transit location updates for your garments.",
  keywords: "track order, live order tracking, Anushka Chauhan order status, custom bridal wear track, luxury couture tracking"
};

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1c1813] text-[#f5ebd9] flex items-center justify-center pt-32">
        <p className="text-xs uppercase tracking-widest text-[#aa9775] font-bold animate-pulse">Loading Tracking Systems...</p>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
