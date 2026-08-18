"use client";

import { motion } from "framer-motion";

interface CollectionItem {
  title: string;
  imageUrl: string;
  href: string;
}

export default function Collections() {
  const items: CollectionItem[] = [
    {
      title: "Kurtas",
      imageUrl: "/col_kurtas.jpg",
      href: "#collections",
    },
    {
      title: "Anarkalis",
      imageUrl: "/col_anarkalis.jpg",
      href: "#collections",
    },
    {
      title: "Lehengas",
      imageUrl: "/col_lehengas.jpg",
      href: "#collections",
    },
    {
      title: "Sarees",
      imageUrl: "/col_sarees.jpg",
      href: "#collections",
    },
    {
      title: "Kaftans",
      imageUrl: "/col_kaftans.jpg",
      href: "#collections",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="collections"
      className="bg-[#f5ebd9] py-20 md:py-28 px-6 md:px-12 border-b border-[#cca09d]/10 text-[#1c1813]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="text-center mb-14 md:mb-18 flex flex-col items-center">
          <h2 className="text-xs uppercase tracking-[0.4em] text-[#9c6d68] font-semibold mb-2">
            OUR COLLECTIONS
          </h2>
          <p className="font-editorial text-lg md:text-xl text-[#1c1813]/70 italic font-light">
            Timeless pieces. Thoughtfully created.
          </p>
        </div>

        {/* 5-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-16"
        >
          {items.map((item, idx) => (
            <motion.a
              href={item.href}
              variants={cardVariants}
              key={item.title}
              className="group flex flex-col relative aspect-[2/3] overflow-hidden bg-[#e8d6b3]/10 shadow-sm border border-[#cca09d]/15"
            >
              {/* Category Image */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={`${item.title} Category`}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-[0.85]"
                />
                
                {/* Subtle border framing on hover */}
                <div className="absolute inset-3 border border-[#cca09d]/0 group-hover:border-[#cca09d]/20 transition-all duration-700 pointer-events-none" />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1813]/60 via-transparent to-transparent opacity-80" />

                {/* Bottom Centered Title */}
                <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                  <h3 className="font-editorial text-sm sm:text-base text-[#f5ebd9] tracking-[0.2em] uppercase font-medium">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Button */}
        <div className="text-center">
          <a
            href="#collections"
            className="inline-block px-8 py-3.5 border border-[#1c1813]/40 hover:border-[#1c1813] text-[#1c1813] hover:text-[#9c6d68] text-[9px] uppercase tracking-[0.3em] font-medium transition-all duration-500 bg-transparent"
          >
            View All Collections
          </a>
        </div>
      </div>
    </section>
  );
}
