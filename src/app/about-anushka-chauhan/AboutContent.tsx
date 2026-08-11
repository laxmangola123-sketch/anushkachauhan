"use client";

import PageShell from "@/components/PageShell";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutContent() {
  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 text-[#1c1813]">
        {/* Editorial Watermark Header */}
        <div className="text-center mb-16 relative">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#aa9775] font-semibold mb-3 block"
          >
            The Atelier
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-wide leading-tight text-[#1c1813] mb-4"
          >
            About Anushka Chauhan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-editorial italic text-lg sm:text-xl text-[#aa9775] tracking-wide"
          >
            Luxury Indian Heritage Couture
          </motion.p>
          
          <div className="flex items-center justify-center gap-2 w-full mt-6">
            <div className="h-[1px] bg-[#c5a880]/30 w-16" />
            <span className="text-[#c5a880] text-[8px]">&#10047;</span>
            <div className="h-[1px] bg-[#c5a880]/30 w-16" />
          </div>
        </div>

        {/* Intro Section with Visual Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 space-y-6 text-sm sm:text-base font-light leading-relaxed text-[#1c1813]/85"
          >
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1c1813] font-semibold leading-snug">
              Rooted in heritage, reimagined for the modern woman.
            </h2>
            <p>
              Anushka Chauhan is a luxury Indian heritage couture label dedicated to creating timeless bridal lehengas, designer sarees, and Indian festive wear. Our design philosophy lies at the delicate intersection of ancestral craftsmanship and contemporary silhouettes.
            </p>
            <p>
              Born out of a deep passion for preserving India’s rich textile legacy, we look to the grand architecture of ancient royal palaces, the geometric poetry of Mughal jaalis, and traditional motifs as our infinite canvas. 
            </p>
            <p>
              Every garment we create is an ode to slow fashion—an heirloom piece designed to carry stories of luxury, art, and identity across generations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-[#c5a880]/20 shadow-2xl bg-[#ece2ce]">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Couture Threadwork"
                className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-[2.5s]"
              />
              <div className="absolute inset-0 bg-[#aa9775]/5 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Brand Pillars / Craftsmanship Focus */}
        <div className="py-16 border-t border-[#c5a880]/15">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#aa9775] font-semibold">Our Couture Pillars</span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#1c1813] mt-2">The Art of Handcrafting</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-3 p-6 border border-[#c5a880]/10 bg-[#f5ebd9]/40 rounded-sm"
            >
              <h4 className="font-editorial text-xl text-[#aa9775] font-bold">I. Authentic Embroidery</h4>
              <p className="text-xs sm:text-sm font-light text-[#1c1813]/85 leading-relaxed">
                We celebrate the unmatched depth of traditional Indian needlework. Each of our outfits features genuine zardozi (metallic gold wire), resham (silk threads), cutdana, and sequin hand embroidery, meticulously stitched onto premium silks, velvets, and organzas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3 p-6 border border-[#c5a880]/10 bg-[#f5ebd9]/40 rounded-sm"
            >
              <h4 className="font-editorial text-xl text-[#aa9775] font-bold">II. Empowering Artisans</h4>
              <p className="text-xs sm:text-sm font-light text-[#1c1813]/85 leading-relaxed">
                Behind every stitch is a master artisan. We work closely with highly skilled traditional karigars in India, honoring their centuries-old legacy, providing sustainable livelihoods, and ensuring that the heritage crafts remain a vibrant, living language.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 p-6 border border-[#c5a880]/10 bg-[#f5ebd9]/40 rounded-sm"
            >
              <h4 className="font-editorial text-xl text-[#aa9775] font-bold">III. Bespoke Tailoring</h4>
              <p className="text-xs sm:text-sm font-light text-[#1c1813]/85 leading-relaxed">
                Luxury lies in the personal touch. Our design studio offers custom bridal and occasion consultations, letting brides adapt silhouettes, sleeve designs, necklines, and embroidery patterns to capture their unique style and fit perfectly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-3 p-6 border border-[#c5a880]/10 bg-[#f5ebd9]/40 rounded-sm"
            >
              <h4 className="font-editorial text-xl text-[#aa9775] font-bold">IV. Handcrafted in India</h4>
              <p className="text-xs sm:text-sm font-light text-[#1c1813]/85 leading-relaxed">
                From initial hand sketch to the final master stitch, every part of our creation process takes place in India. We combine local heritage sourcing with global luxury standards to construct garments that represent the absolute best of Indian couture.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Call to Action for Consultation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 p-8 md:p-12 border border-[#c5a880]/20 bg-[#ece2ce]/30 text-center space-y-6 rounded-sm"
        >
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#1c1813] tracking-wide">
            Begin Your Bridal Consultation
          </h3>
          <p className="text-xs sm:text-sm font-light text-[#1c1813]/75 max-w-xl mx-auto leading-relaxed">
            Let our design studio assist you in crafting the perfect bespoke outfit. We offer customizable designs for bridal lehengas, occasion sarees, and custom festive collections.
          </p>
          <div className="pt-2">
            <Link
              href="/pages/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#1c1813] hover:border-[#aa9775] bg-[#1c1813] hover:bg-[#aa9775] text-[#f5ebd9] transition-all text-xs uppercase tracking-[0.25em] font-semibold rounded-sm cursor-pointer shadow-md"
            >
              Contact Our Studio <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
