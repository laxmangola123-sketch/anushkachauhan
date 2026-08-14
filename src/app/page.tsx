"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import OurWorld from "@/components/OurWorld";
import InfoBanner from "@/components/InfoBanner";
import Footer from "@/components/Footer";
import ShopAll from "@/components/ShopAll";
import CartDrawer from "@/components/CartDrawer";
import AICombinator from "@/components/AICombinator";
import { useCart } from "@/components/CartContext";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { openAIStylist } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5ebd9] text-[#1c1813] font-sans selection:bg-[#aa9775] selection:text-[#f5ebd9]">
      {/* Floating Global Header */}
      <Header />

      <main className="flex-grow">
        {/* 1. Editorial Image Hero */}
        <Hero />

        {/* 2. Our Collections (5 Columns) */}
        <Collections />

        {/* 2.5. Shop All (Product Grid) */}
        <ShopAll />

        {/* 3. Our World (Brand Pillars) */}
        <OurWorld />

        {/* 4. Bottom Info Banner */}
        <InfoBanner />
      </main>

      {/* 5. Luxury Footer */}
      <Footer />

      {/* Floating Anushka's Atelier Button */}
      <button
        onClick={() => openAIStylist(null)}
        className="fixed bottom-6 right-6 z-[99] bg-[#aa9775] text-[#f5ebd9] hover:bg-[#1c1813] hover:text-[#f5ebd9] hover:scale-105 transition-all duration-500 rounded-full shadow-2xl px-3.5 py-2 flex items-center gap-2.5 border border-[#aa9775] group cursor-pointer text-left"
      >
        <div className="relative w-8 h-8 rounded-full border border-[#1c1813]/25 overflow-hidden shrink-0 shadow-md">
          <img
            src="/couture-assistant.jpg"
            alt="Anushka's Atelier Stylist Avatar"
            className="w-full h-full object-cover scale-105"
          />
          {/* Green active dot */}
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-[#aa9775] rounded-full" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-bold tracking-[0.18em] text-[8.5px] uppercase text-[#1c1813] group-hover:text-[#f5ebd9] transition-colors duration-500">
            Anushka&apos;s Atelier
          </div>
          <span className="text-[6.5px] tracking-[0.05em] text-[#1c1813]/70 group-hover:text-[#f5ebd9]/70 font-semibold uppercase font-sans mt-0.5 transition-colors duration-500">
            Couture Assistant
          </span>
        </div>
      </button>

      {/* Drawers and Modals */}
      <CartDrawer />
      <AICombinator />
    </div>
  );
}
