"use client";

import { motion } from "framer-motion";

interface CollectionItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  href: string;
}

export default function Collections() {
  const items: CollectionItem[] = [
    {
      title: "Wedding",
      subtitle: "Bridal Couture & Royal Regalia",
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      href: "#wedding",
    },
    {
      title: "Festive",
      subtitle: "Opulent Silks & Contemporary Fits",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
      href: "#festive",
    },
    {
      title: "Luxury Sarees",
      subtitle: "Hand-spun Banarasi & Kanchipuram Weaves",
      imageUrl: "/saree_luxury.jpg",
      href: "#sarees",
    },
    {
      title: "Lehengas",
      subtitle: "Intricate Zardozi & Hand-painted Silks",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
      href: "#lehengas",
    },
    {
      title: "Jewellery",
      subtitle: "Heritage Kundan & Fine Polki Art",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
      href: "#jewellery",
    },
  ];

  return (
    <section
      id="collections"
      className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12 border-b border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-light mb-4 block">
              Curated Silhouettes
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-cream tracking-wide uppercase leading-tight">
              Signature Collections
            </h2>
          </div>
          <p className="text-cream/50 text-xs md:text-sm uppercase tracking-[0.2em] mt-4 md:mt-0 font-light max-w-xs">
            Timeless craft meets global luxury aesthetic.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={item.title}
              className="relative aspect-[3/4] group overflow-hidden border border-[#c5a880]/10 cursor-pointer"
            >
              {/* Zoom-on-hover Image */}
              <div className="absolute inset-0">
                <img
                  src={item.imageUrl}
                  alt={`${item.title} Collection`}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter brightness-[0.75] group-hover:brightness-[0.6]"
                />
              </div>

              {/* Gold Luxury Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f5ebd9] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Border framing on hover */}
              <div className="absolute inset-4 border border-[#c5a880]/0 group-hover:border-[#c5a880]/20 transition-all duration-700 pointer-events-none" />

              {/* Title & Metadata */}
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-light mb-2 block transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  {item.subtitle}
                </span>
                <h3 className="font-editorial text-2xl md:text-3xl text-cream tracking-wider uppercase mb-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                <div className="w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-700 ease-out" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-cream/0 group-hover:text-cream/80 transition-all duration-700 delay-100 mt-3 inline-block">
                  Discover Collection →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
