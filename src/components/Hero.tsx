"use client";

import { motion } from "framer-motion";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function Hero() {
  const { openCart } = useCart();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom luxury cubic-bezier ease
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#12011b]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Logo in the background behind the video layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
          <img
            src="/logo.jpg"
            alt="Anushka Chauhan Background Logo"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-gold/25 object-cover opacity-35 filter brightness-[0.6]"
          />
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.65] contrast-[1.1] saturate-[0.9] relative z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Royal deep overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12011b]/95 via-[#1d032e]/45 to-[#12011b]/80 z-10" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12011b]/70 via-transparent to-[#12011b]/70 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm uppercase tracking-[0.5em] text-gold font-light mb-6"
          >
            Handcrafted in India
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-editorial text-5xl sm:text-7xl md:text-9xl text-white tracking-[0.1em] uppercase leading-none mb-4"
          >
            Anushka <br className="sm:hidden" />
            Chauhan
          </motion.h1>

          {/* Hindi Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl tracking-[0.25em] text-gold/90 font-light mb-10"
          >
            भारत की विरासत से प्रेरित
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-16 h-[1px] bg-gold/40 mb-10"
          />

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              variants={itemVariants}
              href="#shop"
              className="px-8 py-4 border border-gold/60 text-gold text-xs uppercase tracking-[0.3em] bg-transparent hover:bg-gold hover:text-[#1c1813] hover:border-gold transition-all duration-700 ease-in-out relative group overflow-hidden"
            >
              <span className="relative z-10">Explore Collection</span>
              <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0" />
            </motion.a>

            <motion.button
              variants={itemVariants}
              onClick={openCart}
              className="px-8 py-4 bg-white text-[#1c1813] text-xs uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-all duration-500 flex items-center gap-3 font-light group"
            >
              <ShoppingBag size={14} className="group-hover:scale-110 transition-transform duration-300" />
              Order Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-cream/50 text-[9px] uppercase tracking-[0.3em] flex flex-col items-center cursor-pointer"
          onClick={() => {
            const nextSec = document.getElementById("heritage");
            nextSec?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Discover More
          <ChevronDown size={14} className="mt-2 text-gold" />
        </motion.span>
      </div>
    </section>
  );
}
