"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Heritage from "@/components/Heritage";
import Collections from "@/components/Collections";
import Featured from "@/components/Featured";
import Craftsmanship from "@/components/Craftsmanship";
import ArtisanStories from "@/components/ArtisanStories";
import NewArrivals from "@/components/NewArrivals";
import Instagram from "@/components/Instagram";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import LehengasSection from "@/components/LehengasSection";
import AtelierCurations from "@/components/AtelierCurations";
import RoyalCollections from "@/components/RoyalCollections";
import ShopAll from "@/components/ShopAll";
import CartDrawer from "@/components/CartDrawer";
import AICombinator from "@/components/AICombinator";
import { useCart } from "@/components/CartContext";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { openAIStylist } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5ebd9] text-[#f6f3eb] font-sans selection:bg-gold selection:text-[#f5ebd9]">
      {/* Floating Global Header */}
      <Header />

      <main className="flex-grow">
        {/* 1. Full-screen Autoplay Hero Video */}
        <Hero />

        {/* Shop All — Full product catalog with click-to-order */}
        <ShopAll />

        {/* 2. Heritage Story */}
        <Heritage />

        {/* 3. Signature Collections */}
        <Collections />

        {/* 4. Featured Collection */}
        <Featured />

        {/* Royal Collections - 4 signature categories */}
        <RoyalCollections />

        {/* Dedicated Lehenga Atelier Section */}
        <LehengasSection />

        {/* Curated Capsule Collections Tab Section */}
        <AtelierCurations />

        {/* 5. Craftsmanship Cinematic Section */}
        <Craftsmanship />

        {/* 6. Artisan Stories */}
        <ArtisanStories />

        {/* 7. New Arrivals Slider */}
        <NewArrivals />

        {/* 8. Instagram Masonry Grid */}
        <Instagram />

        {/* 9. Customer Testimonials */}
        <Testimonials />

        {/* 10. Newsletter Signup */}
        <Newsletter />
      </main>

      {/* 11. Luxury Footer */}
      <Footer />

      {/* Floating AI Style Advisor Button */}
      <button
        onClick={() => openAIStylist(null)}
        className="fixed bottom-6 right-6 z-[99] bg-[#d4af37] text-[#1d032e] hover:bg-[#f5ebd9] hover:text-[#1d032e] hover:scale-105 transition-all duration-500 rounded-full shadow-2xl px-5 py-3.5 flex items-center gap-2.5 font-light tracking-[0.2em] text-[10px] uppercase border border-[#d4af37] group cursor-pointer"
      >
        <span className="w-5 h-5 rounded-full bg-[#1d032e] flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#1d032e] transition-all duration-500">
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
