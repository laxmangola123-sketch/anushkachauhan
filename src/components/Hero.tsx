"use client";

import { motion } from "framer-motion";
import { useCart } from "./CartContext";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-[#12011b]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-[1.3] saturate-[0.85]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Deep dark elegant gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />
      </div>

      {/* Hero Text Box on the Left */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-16 md:mt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md md:max-w-lg flex flex-col items-start text-left"
        >
          {/* Chapter Header */}
          <motion.span
            variants={itemVariants}
            className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#e8d6b3] font-bold mb-2"
          >
            CHAPTER I
          </motion.span>

          {/* Collection Title */}
          <motion.h1
            variants={itemVariants}
            className="font-editorial text-4xl sm:text-6xl md:text-7xl text-white tracking-[0.1em] uppercase leading-none font-bold mb-4"
          >
            VEERANGANA
          </motion.h1>

          {/* Elegant Gold Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 w-full max-w-xs mb-6"
          >
            <div className="h-[1px] bg-[#e8d6b3]/40 flex-1" />
            <span className="text-[#e8d6b3] text-[8px] sm:text-[10px]">&#10047;</span>
            <div className="h-[1px] bg-[#e8d6b3]/40 flex-1" />
          </motion.div>

          {/* Poetic Description */}
          <motion.div
            variants={itemVariants}
            className="space-y-1.5 text-xs sm:text-sm md:text-base text-white/85 font-semibold tracking-wide mb-8"
          >
            <p>A tribute to the royal bloodline.</p>
            <p>Crafted with legacy.</p>
            <p>Worn with pride.</p>
          </motion.div>

          {/* Explore Collection Button */}
          <motion.a
            variants={itemVariants}
            href="#collections"
            className="inline-block px-7 py-3.5 bg-[#e8d6b3] hover:bg-white text-[#1c1813] hover:text-[#1c1813] text-[9.5px] uppercase tracking-[0.3em] font-bold transition-all duration-500 shadow-md hover:shadow-lg"
          >
            Explore Collection
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
