"use client";

import { Globe, Lock, Mail, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function InfoBanner() {
  const items = [
    {
      title: "WORLDWIDE SHIPPING",
      description: "Delivering elegance across the globe.",
      Icon: Globe,
    },
    {
      title: "SECURE PAYMENTS",
      description: "Safe, seamless & trusted checkout.",
      Icon: Lock,
    },
    {
      title: "EXCLUSIVE ACCESS",
      description: "Be the first to know about new drops.",
      Icon: Mail,
    },
    {
      title: "CUSTOMER CARE",
      description: "Here to help, always.",
      Icon: Headphones,
    },
  ];

  return (
    <section className="bg-[#f5ebd9] border-t border-b border-[#c5a880]/15 py-10 text-[#1c1813]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#c5a880]/20">
          {items.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={item.title}
                className="flex items-center gap-4 lg:justify-center lg:px-6"
              >
                <div className="w-10 h-10 rounded-full border border-[#c5a880]/30 flex items-center justify-center text-[#aa9775] shrink-0">
                  <Icon size={18} strokeWidth={1.2} />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#aa9775] mb-0.5">
                    {item.title}
                  </h4>
                  <p className="font-editorial text-[11px] sm:text-xs text-[#1c1813]/70 font-light tracking-wide">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
