"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section
      id="newsletter"
      className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12 border-b border-[#c5a880]/10 flex items-center justify-center"
    >
      <div className="max-w-xl w-full text-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs uppercase tracking-[0.45em] text-gold font-light mb-4 block">
                Privé List
              </span>
              <h2 className="font-editorial text-4xl md:text-5xl text-cream tracking-wider uppercase mb-6">
                Join the Atelier
              </h2>
              <p className="text-cream/60 text-xs md:text-sm uppercase tracking-[0.15em] font-light leading-relaxed mb-10 max-w-md">
                Subscribe to receive private invitations to showcase viewings, preview new collections, and learn artisan craftsmanship secrets.
              </p>

              <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-6 items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  required
                  className="flex-grow bg-transparent border-b border-[#c5a880]/30 py-3 text-cream placeholder-cream/30 text-xs uppercase tracking-widest focus:outline-none focus:border-[#c5a880] transition-colors duration-500 rounded-none"
                />
                <button
                  type="submit"
                  className="px-8 py-3 border border-gold bg-gold text-[#f5ebd9] hover:bg-transparent hover:text-gold transition-colors duration-500 text-xs uppercase tracking-[0.3em] font-medium shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 flex flex-col items-center"
            >
              <span className="w-12 h-[1px] bg-gold mb-6" />
              <h3 className="font-editorial text-2xl md:text-3xl text-gold tracking-widest uppercase mb-4">
                Welcome to the Atelier
              </h3>
              <p className="text-cream/70 text-xs md:text-sm uppercase tracking-[0.2em] font-light leading-relaxed max-w-sm">
                Thank you for joining. A welcome note containing private details has been dispatched to your inbox.
              </p>
              <span className="w-12 h-[1px] bg-gold mt-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
