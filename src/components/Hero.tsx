"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0); // 0 = Video, 1 = Image
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const handleNext = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000); // Auto slide every 8s
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

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
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-[#1c0d0e]">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.6 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {activeSlide === 0 ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-[1.3] saturate-[0.85]"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
            ) : (
              <img
                src="/hero_veerangana.jpg"
                alt="Veerangana Collection Background"
                className="w-full h-full object-cover scale-105 filter brightness-[0.55] contrast-[1.1] saturate-[0.9]"
              />
            )}
          </motion.div>
        </AnimatePresence>
        {/* Deep dark elegant gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Text Box on the Left */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-16 md:mt-24 pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md md:max-w-lg flex flex-col items-start text-left pointer-events-auto"
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

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-[#e8d6b3]/30 hover:border-[#e8d6b3] text-[#e8d6b3] hover:text-white rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer bg-black/20 backdrop-blur-xs hover:scale-105 shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-[#e8d6b3]/30 hover:border-[#e8d6b3] text-[#e8d6b3] hover:text-white rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer bg-black/20 backdrop-blur-xs hover:scale-105 shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {[0, 1].map((idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > activeSlide ? 1 : -1);
              setActiveSlide(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
              activeSlide === idx ? "bg-[#e8d6b3] scale-125" : "bg-[#e8d6b3]/30 hover:bg-[#e8d6b3]/60"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
