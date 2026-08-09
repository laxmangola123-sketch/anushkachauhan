"use client";

import { motion } from "framer-motion";

interface Artisan {
  name: string;
  role: string;
  location: string;
  experience: string;
  story: string;
  quote: string;
  imageUrl: string;
}

export default function ArtisanStories() {
  const artisans: Artisan[] = [
    {
      name: "Devendra Prasad",
      role: "Master Banarasi Weaver",
      location: "Varanasi, Uttar Pradesh",
      experience: "42 Years on the Loom",
      story: "Devendra is a fifth-generation master weaver. He holds the rare knowledge of translating complex heritage Mughal floral designs into raw silk warps, using real silver thread coated with pure gold (zari). Each saree he creates takes up to 4 months of silent concentration.",
      quote: "The handloom is not just static wood; it breathes. Every knot is a syllable, and every saree is an epic poem written in silk and gold.",
      imageUrl: "/artisan_devendra.jpg",
    },
    {
      name: "Shanti Devi",
      role: "Zardozi Guild Leader",
      location: "Lucknow, Uttar Pradesh",
      experience: "28 Years of Embroidery",
      story: "Shanti leads a local co-operative of eighteen women artisans specializing in zardozi (gold wire embroidery). Her masterwork involves 'aari' work and needle-point seed pearls mapping. Her guidance helps preserve ancestral needlework secrets that date back to royal courts.",
      quote: "When my needle pierces the velvet, I feel connected to the women who sat in courtyards three hundred years ago. We are stitching our souls into these fabrics.",
      imageUrl: "/artisan_shanti.jpg",
    },
  ];

  return (
    <section
      id="stories"
      className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12 border-b border-[#c5a880]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-20 md:mb-28 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.45em] text-gold font-light mb-4 block">
            Guardian of Crafts
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-cream tracking-wider uppercase mb-6">
            Artisan Stories
          </h2>
          <div className="w-12 h-[1px] bg-gold/50 mx-auto mb-6" />
          <p className="text-cream/50 text-xs md:text-sm uppercase tracking-[0.2em] font-light leading-relaxed">
            Meet the hands that spin the silk, thread the gold, and forge the soul of Anushka Chauhan Couture.
          </p>
        </div>

        {/* Stories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {artisans.map((artisan, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              key={artisan.name}
              className={`flex flex-col ${
                idx % 2 === 1 ? "lg:mt-16" : ""
              } bg-[#ece2ce]/20 border border-[#c5a880]/10 p-6 md:p-10 relative overflow-hidden group`}
            >
              {/* Gold light effect on hover */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              {/* Top Details */}
              <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
                {/* Portrait Image */}
                <div className="w-full md:w-44 aspect-[3/4] overflow-hidden border border-[#c5a880]/20 flex-shrink-0 relative">
                  <img
                    src={artisan.imageUrl}
                    alt={artisan.name}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-[#c5a880]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
                </div>

                {/* Artisan Identity */}
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-light mb-1">
                    {artisan.role}
                  </span>
                  <h3 className="font-editorial text-2xl md:text-3xl text-cream tracking-wide uppercase mb-2">
                    {artisan.name}
                  </h3>
                  <div className="w-12 h-[1px] bg-gold/30 my-2" />
                  <p className="text-xs text-cream/50 tracking-wider uppercase mb-1">
                    {artisan.location}
                  </p>
                  <p className="text-[10px] text-gold/80 tracking-widest uppercase italic font-light">
                    {artisan.experience}
                  </p>
                </div>
              </div>

              {/* Story & Quote */}
              <div className="space-y-6 flex-grow flex flex-col justify-between">
                <p className="text-cream/70 text-sm font-light leading-relaxed">
                  {artisan.story}
                </p>
                
                <div className="border-t border-[#c5a880]/15 pt-6 mt-4">
                  <p className="font-editorial italic text-gold text-base md:text-lg leading-relaxed pl-4 border-l border-gold/30">
                    &quot;{artisan.quote}&quot;
                  </p>
                </div>
              </div>

              {/* Editorial Frame Border */}
              <div className="absolute inset-3 border border-[#c5a880]/0 group-hover:border-[#c5a880]/10 transition-all duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
