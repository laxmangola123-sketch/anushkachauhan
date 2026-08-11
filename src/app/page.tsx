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

      {/* Floating AI Style Advisor Button */}
      <button
        onClick={() => openAIStylist(null)}
        className="fixed bottom-6 right-6 z-[99] bg-[#aa9775] text-[#f5ebd9] hover:bg-[#1c1813] hover:text-[#f5ebd9] hover:scale-105 transition-all duration-500 rounded-full shadow-2xl px-5 py-3.5 flex items-center gap-2.5 font-light tracking-[0.2em] text-[10px] uppercase border border-[#aa9775] group cursor-pointer"
      >
        <span className="w-5 h-5 rounded-full bg-[#1c1813] flex items-center justify-center text-[#aa9775] group-hover:bg-[#aa9775] group-hover:text-[#1c1813] transition-all duration-500">
          <Sparkles size={11} className="animate-pulse" />
        </span>
        AI Style Advisor
      </button>

      {/* Drawers and Modals */}
      <CartDrawer />
      <AICombinator />
    </div>
  );
}
