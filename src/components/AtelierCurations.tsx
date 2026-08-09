"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface CurationItem {
  name: string;
  price: string;
  fabric: string;
  details: string;
  imageUrl: string;
}

interface CurationSection {
  title: string;
  subtitle: string;
  star?: boolean;
  description: string;
  items: CurationItem[];
}

export default function AtelierCurations() {
  const curations: CurationSection[] = [
    {
      title: "The Executive Edit",
      subtitle: "Power Silhouettes & Sharp Tailoring",
      description: "A luxury curation of tailored silk bandhgalas and raw silk blazers, designed for modern statesmanship and high-profile events.",
      items: [
        {
          name: "The Ivory Gilded Bandhgala",
          price: "₹1,95,000",
          fabric: "Pure Handloom Silk",
          details: "Tailored to structural perfection with fine gold metallic embroidery along the collar and cuffs.",
          imageUrl: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=600&auto=format&fit=crop",
        },
        {
          name: "The Handloom Raw Silk Tuxedo",
          price: "₹2,20,000",
          fabric: "Charcoal Textured Raw Silk",
          details: "A modern luxury blazer featuring structured shoulders, satin-silk shawl lapels, and hand-woven texture.",
          imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
        },
      ],
    },
    {
      title: "Noir Prestige",
      subtitle: "Midnight Luxury & Deep Obsidian Tones",
      description: "Exploring the depth of shadows with jet black velvet capes, self-on-self embroidery, and sheer obsidian silk organza.",
      items: [
        {
          name: "The Midnight Velvet Cape Lehenga",
          price: "₹3,85,000",
          fabric: "Obsidian Silk Velvet",
          details: "Heavy floor-length velvet cape paired with a matching embroidered skirt and hand-knotted gold silk tassels.",
          imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
        },
        {
          name: "The Obsidian Organza Saree",
          price: "₹1,45,000",
          fabric: "Sheer Silk Organza",
          details: "Lightweight sheer drape adorned with hand-painted gold highlights and metallic black zari borders.",
          imageUrl: "/obsidian_saree.jpg",
        },
      ],
    },
    {
      title: "Crimson Heritage",
      subtitle: "Majestic Bridal Reds & Zardozi",
      star: true,
      description: "A celebration of traditional vermillions, deep scarlet silks, and real gold metallic zardozi needlework map-weaving.",
      items: [
        {
          name: "The Swarna Rajkumari Lehenga",
          price: "₹5,10,000",
          fabric: "Crimson Silk Satin Base",
          details: "Imperial bridal lehenga skirt featuring peacock motifs woven with real gold wire zardozi threads.",
          imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
        },
        {
          name: "The Sindoori Brocade Saree",
          price: "₹1,85,000",
          fabric: "Pure Katan Silk Banarasi",
          details: "Deep scarlet hand-woven saree featuring complex jaal patterns woven with real gold and silver zari.",
          imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
        },
      ],
    },
    {
      title: "Royal Drape",
      subtitle: "Fluid Silhouettes & Heritage Drapes",
      description: "Timeless structural drapes, pre-pleated luxury satin-silk sarees, and modern asymmetrical Indowestern outlines.",
      items: [
        {
          name: "The Emerald Structural Drape",
          price: "₹2,15,000",
          fabric: "Pre-pleated Silk Satin Saree",
          details: "Structural cocktail drape paired with a hand-embroidered gold-mesh shoulder harness.",
          imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
        },
        {
          name: "The Champagne Silk Anarkali",
          price: "₹1,90,000",
          fabric: "Flowy Champagne Gold Silk",
          details: "Long flowy structural silhouette accented by subtle gold border piping and matching sheer organza stole.",
          imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop",
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="atelier-curations"
      className="bg-dark-bg py-24 md:py-36 px-6 md:px-12 border-b border-gold/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.5em] text-gold font-light mb-4 block">
            The Atelier Collections
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#1c1813] tracking-wider uppercase mb-6">
            Curated Edits
          </h2>
          <div className="w-16 h-[1px] bg-gold/50 mx-auto" />
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 border-b border-gold/15 pb-6">
          {curations.map((curation, idx) => (
            <button
              key={curation.title}
              onClick={() => setActiveTab(idx)}
              className={`text-xs uppercase tracking-[0.25em] py-2 px-4 transition-all duration-500 relative cursor-pointer ${
                activeTab === idx
                  ? "text-[#1c1813] font-medium"
                  : "text-[#1c1813]/55 hover:text-[#1c1813]"
              }`}
            >
              <span className="flex items-center gap-1.5 font-sans">
                {curation.title}
                {curation.star && <span className="text-gold">★</span>}
              </span>
              {activeTab === idx && (
                <motion.div
                  layoutId="activeCurationTabLine"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Curation Details & Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Left description details */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-light block">
                {curations[activeTab].subtitle}
              </span>
              <h3 className="font-editorial text-3xl md:text-4xl text-[#1c1813] uppercase tracking-wide leading-tight">
                {curations[activeTab].title}
                {curations[activeTab].star && <span className="text-gold ml-2">★</span>}
              </h3>
              <p className="text-[#1c1813]/65 text-xs md:text-sm font-light leading-relaxed max-w-sm">
                {curations[activeTab].description}
              </p>
              <div className="pt-4">
                <button className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#1c1813] hover:text-gold transition-colors duration-300 font-sans border-b border-gold/45 pb-1">
                  View Lookbook <ArrowRight size={10} />
                </button>
              </div>
            </div>

            {/* Right items listing */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {curations[activeTab].items.map((item) => (
                <div
                  key={item.name}
                  className="group bg-dark-card/30 border border-gold/10 overflow-hidden relative p-4 flex flex-col justify-between aspect-[3/4.2]"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[3/3.6] w-full overflow-hidden mb-4 border border-gold/10">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-[0.8] group-hover:brightness-[0.7]"
                    />
                    {/* Handcrafted sign */}
                    <div className="absolute top-4 left-4 bg-dark-bg/85 backdrop-blur-sm border border-gold/25 px-2 py-0.5 text-[7px] uppercase tracking-widest text-gold flex items-center gap-1 font-sans">
                      <Sparkles size={6} />
                      Atelier
                    </div>
                  </div>

                  {/* Meta details */}
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-light font-sans block">
                      {item.fabric}
                    </span>
                    <h4 className="font-editorial text-lg text-[#1c1813] uppercase tracking-wide line-clamp-1 group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h4>
                    <p className="text-[#1c1813]/60 text-[10px] leading-relaxed font-light line-clamp-2">
                      {item.details}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gold/10 pt-3 mt-3 font-sans">
                    <span className="font-editorial text-[#1c1813] font-semibold text-sm tracking-wider">
                      {item.price}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gold group-hover:translate-x-1 transition-transform duration-300">
                      Acquire →
                    </span>
                  </div>

                  {/* Frame hover line */}
                  <div className="absolute inset-2 border border-gold/0 group-hover:border-gold/10 transition-all duration-[1s] pointer-events-none" />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
