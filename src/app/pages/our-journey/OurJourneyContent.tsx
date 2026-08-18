"use client";

import PageShell from "@/components/PageShell";
import { motion } from "framer-motion";

export default function OurJourneyContent() {
  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-[#1c1813]">
        {/* Editorial Watermark Header */}
        <div className="text-center mb-16 relative">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#9c6d68] font-semibold mb-3 block"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-wide leading-tight text-[#1c1813] mb-4"
          >
            Our Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-editorial italic text-lg sm:text-xl text-[#9c6d68] tracking-wide"
          >
            A Story Still Being Written
          </motion.p>
          
          <div className="flex items-center justify-center gap-2 w-full mt-6">
            <div className="h-[1px] bg-[#cca09d]/30 w-16" />
            <span className="text-[#cca09d] text-[8px]">&#10047;</span>
            <div className="h-[1px] bg-[#cca09d]/30 w-16" />
          </div>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-6 text-sm sm:text-base font-light leading-relaxed text-[#1c1813]/85 text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-editorial text-xl sm:text-2xl text-[#1c1813] leading-normal font-semibold">
            Every couture label begins with an idea. <br />
            Anushka Chauhan began with a question.
          </p>
          <p className="italic text-base text-[#9c6d68] font-editorial max-w-xl mx-auto border-l-2 border-[#cca09d]/30 pl-4 py-1 text-left my-6">
            Can India’s heritage be more than a memory? Can it be a living language — one that we can interpret, refine, and carry forward for the woman of today?
          </p>
          <p>
            Our journey is built on that belief. At the intersection of heritage and contemporary design.
          </p>
        </motion.div>

        {/* Section 1: The Beginning */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-10 border-t border-[#cca09d]/15">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-6 space-y-4"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9c6d68] font-semibold block">
              The Beginning
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1c1813] tracking-wide">
              Heritage as a Living Language
            </h2>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1c1813]/80">
              Anushka Chauhan was founded with a desire to look at India’s rich cultural past not as something distant, but as an endless source of inspiration for modern luxury.
            </p>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1c1813]/80">
              We started with observation. Researching the carved jharokhas of royal palaces, the geometry of Mughal jaalis, the softness of miniature paintings, and the poetry of traditional Indian motifs.
            </p>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1c1813]/80">
              This research became our design language — where every thread, every silhouette, and every piece of hand embroidery tells a story of India, reimagined for the global Indian woman.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-6"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#cca09d]/20 shadow-lg bg-[#ece2ce]">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
                alt="Heritage craft inspiration"
                className="w-full h-full object-cover brightness-[0.85] hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-[#9c6d68]/5 mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Section 2: Chapter I - Veerangana */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-12 border-t border-[#cca09d]/15">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-6 order-last md:order-first"
          >
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden border border-[#cca09d]/20 shadow-lg bg-[#ece2ce]">
              <img
                src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=800&auto=format&fit=crop"
                alt="Veerangana collection handcrafted embroidery"
                className="w-full h-full object-cover brightness-[0.85] hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-[#9c6d68]/5 mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-6 space-y-4"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9c6d68] font-semibold block">
              Debut Collection
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1c1813] tracking-wide">
              Chapter I — Veerangana: Where It All Begins
            </h2>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1c1813]/80">
              Every great story needs a powerful first chapter. Ours is Veerangana.
            </p>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1c1813]/80">
              Veerangana is more than our debut collection; it is the foundation of Anushka Chauhan. Inspired by the strength, grace, and quiet courage of Indian women, the collection translates architectural details, heritage motifs, and intricate hand embroidery into luxury bridal lehengas, handcrafted sarees, and festive couture.
            </p>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1c1813]/80">
              From carefully considered silhouettes to authentic resham, zardozi, cutdana, and sequin work — Veerangana marks the beginning of our commitment to slow, meaningful couture that is Made in India and made to last for generations.
            </p>
          </motion.div>
        </div>

        {/* Outro */}
        <div className="py-12 border-t border-[#cca09d]/15 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-4 max-w-xl mx-auto"
          >
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1c1813]/80">
              This is only the first chapter. Our journey has just begun. With each collection, we will continue to explore India’s heritage, honour its artisans, and create timeless occasionwear for the modern heirloom.
            </p>
            <div className="text-[9px] uppercase tracking-[0.25em] text-[#9c6d68] font-bold">
              Made in India. Inspired by its heritage. <br />
              Created for generations to come.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="pt-6 border-t border-[#cca09d]/10 flex flex-col items-center"
          >
            <span className="font-editorial text-lg tracking-[0.2em] text-[#1c1813] uppercase font-bold">
              ANUSHKA CHAUHAN
            </span>
            <span className="text-[8px] tracking-[0.45em] text-[#9c6d68] uppercase mt-1">
              Heritage Couture
            </span>
            
            <p className="font-editorial text-sm sm:text-base text-[#1c1813]/70 font-light mt-6 italic">
              “भारत की विरासत से प्रेरित, आज की स्त्री के लिए रचा गया।”
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
