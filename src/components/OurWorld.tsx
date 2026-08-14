"use client";

import { motion } from "framer-motion";

const LotusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10 text-[#aa9775] mb-4">
    <path d="M12 3c-1.5 3-4.5 4.5-4.5 7.5 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-3-3-4.5-4.5-7.5z" />
    <path d="M12 7c-1 2-2.5 3-2.5 5 0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5c0-2-1.5-3-2.5-5z" />
    <path d="M7.5 10.5c-2 1-3.5 2.5-3.5 4.5 0 2 1.5 3.5 3.5 3.5.8 0 1.5-.2 2.1-.6" />
    <path d="M16.5 10.5c2 1 3.5 2.5 3.5 4.5 0 2-1.5 3.5-3.5 3.5-.8 0-1.5-.2-2.1-.6" />
    <path d="M12 15v5" />
    <path d="M9 20h6" />
  </svg>
);

const HandHeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10 text-[#aa9775] mb-4">
    <path d="M12 13c-1-1.5-2-1.5-3-1-1 1-1 2 0 3l3 3 3-3c1-1 1-2 0-3-1-.5-2-.5-3 1z" />
    <path d="M6 18c-1.5-1.5-3-1-3 0s1.5 2 3.5 1.5c1.5-.4 2.5-1.5 4-1.5s2 1.5 3.5 1.5 2.5-1.5 3-2.5c.5-1-1-2.5-2-2" />
    <path d="M12 13V8" />
  </svg>
);

const FlowerStarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10 text-[#aa9775] mb-4">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
    <circle cx="12" cy="12" r="7" strokeDasharray="2,2" />
  </svg>
);

const DomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10 text-[#aa9775] mb-4">
    <path d="M6 20V12c0-3.3 2.7-6 6-6s6 2.7 6 6v8" />
    <path d="M12 2v4" />
    <path d="M4 20h16" />
    <path d="M9 12a3 3 0 0 1 6 0" />
  </svg>
);

export default function OurWorld() {
  const pillars = [
    {
      title: "HERITAGE INSPIRED",
      description: "Rooted in India's regal heritage and timeless art.",
      Icon: LotusIcon,
    },
    {
      title: "HANDCRAFTED",
      description: "Each piece is delicately handmade by skilled artisans.",
      Icon: HandHeartIcon,
    },
    {
      title: "LIMITED EDITIONS",
      description: "Thoughtfully made in limited numbers.",
      Icon: FlowerStarIcon,
    },
    {
      title: "MADE IN INDIA",
      description: "Proudly designed and crafted in India.",
      Icon: DomeIcon,
    },
  ];

  return (
    <section
      id="our-world"
      className="bg-[#f5ebd9] py-20 md:py-28 px-6 md:px-12 border-b border-[#c5a880]/10 text-[#1c1813]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-xs uppercase tracking-[0.4em] text-[#aa9775] font-semibold mb-3">
            OUR WORLD
          </h2>
          <div className="flex items-center gap-2 w-full max-w-[120px]">
            <div className="h-[1px] bg-[#c5a880]/40 flex-1" />
            <span className="text-[#c5a880] text-[8px]">&#10047;</span>
            <div className="h-[1px] bg-[#c5a880]/40 flex-1" />
          </div>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.Icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                key={pillar.title}
                className="flex flex-col items-center px-4"
              >
                <Icon />
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#aa9775] font-semibold mb-3">
                  {pillar.title}
                </h3>
                <p className="font-editorial text-xs sm:text-sm text-[#1c1813] leading-relaxed font-semibold">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
