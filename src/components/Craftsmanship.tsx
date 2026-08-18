"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Craftsmanship() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Slow text shifting on scroll (parallax)
  const textY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const videoY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Cinematic video of a weaver working in detail
  const videoUrl = "https://player.vimeo.com/external/498425114.sd.mp4?s=d0016eef2deca3c1d916cc69970868f0cb6471d4&profile_id=165&oauth2_token_id=57447761";

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-[#f5ebd9]"
    >
      {/* Background Video with Parallax shift */}
      <motion.div style={{ y: videoY }} className="absolute -inset-y-24 inset-x-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.65]"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Soft gold wash over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5ebd9] via-transparent to-[#f5ebd9] opacity-80" />
      </motion.div>

      {/* Cinematic Text Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div style={{ y: textY }} className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.6em] text-gold font-light mb-4 md:mb-6">
            The Art of Handloom
          </span>
          
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-8xl text-cream tracking-[0.05em] uppercase leading-tight mb-6">
            Every piece <br className="sm:hidden" />
            tells a story.
          </h2>

          <div className="w-16 h-[1px] bg-gold/50 mb-6 md:mb-8" />
          
          <p className="text-cream/60 text-xs md:text-sm uppercase tracking-[0.25em] font-light max-w-lg mx-auto">
            Stitched by hand. Curated for time. Preserving centuries of heritage.
          </p>
        </motion.div>
      </div>

      {/* Minimal Gold Border framing */}
      <div className="absolute inset-6 border border-[#cca09d]/15 pointer-events-none z-10" />
    </section>
  );
}
