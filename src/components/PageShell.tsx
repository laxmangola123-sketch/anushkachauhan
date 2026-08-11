"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AICombinator from "@/components/AICombinator";
import { useCart } from "@/components/CartContext";
import { Sparkles } from "lucide-react";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const { openAIStylist } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5ebd9] text-[#1c1813] font-sans selection:bg-[#aa9775] selection:text-[#f5ebd9]">
      {/* Floating Global Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-grow pt-28 pb-16">
        {children}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Anushka's Atelier Button */}
      <button
        onClick={() => openAIStylist(null)}
        className="fixed bottom-6 right-6 z-[99] bg-[#aa9775] text-[#f5ebd9] hover:bg-[#1c1813] hover:text-[#f5ebd9] hover:scale-105 transition-all duration-500 rounded-full shadow-2xl px-5 py-3 flex items-center gap-3.5 border border-[#aa9775] group cursor-pointer text-left"
      >
        <div className="relative w-11 h-11 rounded-full border border-[#1c1813]/25 overflow-hidden shrink-0 shadow-md">
          <img
            src="/couture-assistant.jpg"
            alt="Anushka's Atelier Stylist Avatar"
            className="w-full h-full object-cover scale-105"
          />
          {/* Green active dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-[#aa9775] rounded-full" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-light tracking-[0.2em] text-[10px] uppercase font-bold text-[#1c1813] group-hover:text-[#f5ebd9] transition-colors duration-500">
            Anushka&apos;s Atelier
          </div>
          <span className="text-[7.5px] tracking-[0.05em] text-[#1c1813]/60 group-hover:text-[#f5ebd9]/60 font-semibold uppercase font-sans mt-0.5 transition-colors duration-500">
            Your Personal Couture Assistant
          </span>
        </div>
      </button>

      {/* Drawers and Modals */}
      <CartDrawer />
      <AICombinator />
    </div>
  );
}
