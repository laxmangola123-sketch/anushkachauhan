"use client";

import { motion } from "framer-motion";
import { Sparkles, Hourglass, ArrowRight } from "lucide-react";

interface LehengaItem {
  id: string;
  name: string;
  fabric: string;
  price: string;
  hours: string;
  description: string;
  imageUrl: string;
}

export default function LehengasSection() {
  const lehengas: LehengaItem[] = [
    {
      id: "leh-1",
      name: "The Mughal Vriksh Lehenga",
      fabric: "Crimson Silk Velvet & Organza",
      price: "₹4,80,000",
      hours: "320 Embroidery Hours",
      description: "Adorned with ancient dabka needlework, seed pearls, and real gold wire zardozi work. The skirt features a continuous tapestry of Mughal tree-of-life arches.",
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "leh-2",
      name: "The Basant Utsav Lehenga",
      fabric: "Marigold Yellow Banarasi Silk",
      price: "₹2,65,000",
      hours: "140 Handloom Hours",
      description: "Handwoven in Varanasi using raw katan silk and floral buttis spun with pure gold metallic threads. Features a lightweight, fluid border that flows with movement.",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "leh-3",
      name: "The Neelambari Lehenga",
      fabric: "Midnight Indigo Raw Silk",
      price: "₹3,40,000",
      hours: "240 Needlework Hours",
      description: "Intricate silver and white gold zardozi borders mimicking constellations, paired with a matching tissue dupatta and hand-spun Banarasi brocade blouse.",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="lehengas"
      className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12 border-b border-[#c5a880]/10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <span className="text-xs uppercase tracking-[0.5em] text-gold font-light mb-4 block">
            The Lehenga Atelier
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-cream tracking-wider uppercase mb-6">
            Handcrafted Lehengas
          </h2>
          <div className="w-16 h-[1px] bg-gold/50 mb-6" />
          <p className="text-cream/60 text-xs md:text-sm uppercase tracking-[0.2em] font-light max-w-2xl leading-relaxed">
            Preserving historical imperial tailoring. Each lehenga skirt represents a custom canvas woven, dyed, and embroidered entirely by hand.
          </p>
        </div>

        {/* Lehengas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
          {lehengas.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              key={item.id}
              className="group flex flex-col bg-[#ece2ce]/15 border border-[#c5a880]/10 overflow-hidden relative"
            >
              {/* Product Frame Image */}
              <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-[0.75] group-hover:brightness-[0.65]"
                />
                
                {/* Gold Frame overlay */}
                <div className="absolute inset-4 border border-[#c5a880]/10 group-hover:border-[#c5a880]/30 transition-all duration-[1s] pointer-events-none" />

                {/* Handcrafted Tag */}
                <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-[#f5ebd9]/80 backdrop-blur-sm border border-gold/20 px-3 py-1 text-[8px] uppercase tracking-widest text-gold">
                  <Sparkles size={8} className="text-gold" />
                  Couture
                </div>
              </div>

              {/* Product Content Details */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between border-t border-[#c5a880]/15">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-gold">
                    <Hourglass size={12} className="opacity-85" />
                    <span className="text-[10px] uppercase tracking-widest font-light font-sans">
                      {item.hours}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-cream tracking-wide uppercase group-hover:text-gold transition-colors duration-500 mb-1">
                    {item.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40 mb-4 block italic font-light">
                    {item.fabric}
                  </span>

                  <p className="text-cream/70 text-xs md:text-sm font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-[#c5a880]/10 pt-5 mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-cream/40 mb-0.5">
                      Acquisition Value
                    </span>
                    <span className="font-editorial text-lg text-gold font-semibold tracking-wider">
                      {item.price}
                    </span>
                  </div>

                  <button className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-cream group-hover:text-gold transition-colors duration-300">
                    Atelier Booking <ArrowRight size={10} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Subtle outer gold glow border */}
              <div className="absolute inset-2 border border-[#c5a880]/0 group-hover:border-[#c5a880]/5 transition-all duration-[1s] pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
