"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Heritage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax values for editorial layout
  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="heritage"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 bg-[#f5ebd9] flex flex-col justify-center overflow-hidden border-b border-[#c5a880]/10"
    >
      {/* Editorial Watermark background */}
      <div className="absolute top-10 left-10 text-[10vw] font-editorial text-[#1a1713]/10 pointer-events-none select-none uppercase tracking-widest leading-none">
        HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
        {/* Left Editorial Text Column */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-light mb-4 block">
              The Legacy
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-cream tracking-wide leading-tight mb-8">
              A Symphony of <br />
              Thread and Time
            </h2>
          </motion.div>

          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="space-y-6 text-cream/70 text-sm md:text-base font-light leading-relaxed max-w-xl"
          >
            <p className="font-editorial italic text-gold text-lg md:text-xl border-l border-gold/30 pl-4 py-1">
              &quot;We do not merely create clothes; we preserve the beating heart of Indian textile art.&quot;
            </p>
            <p>
              Anushka Chauhan was born out of a profound reverence for India&apos;s rich artisanal lineage. Inspired by the quiet luxury of global fashion houses and the raw, magnificent depth of indigenous Indian crafts, each silhouette is a masterpiece of modern luxury.
            </p>
            <p>
              By combining real gold and silver zari metallic embroidery, hand-spun silk, and age-old vegetable dyeing methods, our master artisans spend hundreds of hours weaving stories of royal heritage into modern, timeless attire.
            </p>
          </motion.div>
        </div>

        {/* Right Asymmetrical Parallax Image Column */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          {/* Main Editorial Image Card */}
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden border border-[#c5a880]/20 shadow-2xl group">
            <motion.div style={{ y: imageY }} className="absolute -inset-y-16 inset-x-0">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury Indian handloom gold weave detail"
                className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
            {/* Elegant glassmorphism border shadow inside */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f5ebd9]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Secondary Overlapping Small Card (Classic Magazine Styling) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute -bottom-8 -left-4 sm:left-4 md:-left-8 w-2/5 aspect-[3/4] overflow-hidden border border-[#c5a880]/30 shadow-2xl hidden sm:block bg-[#ece2ce]"
          >
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan hands embroidery details"
              className="w-full h-full object-cover brightness-75 hover:scale-110 transition-transform duration-[1.5s]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
