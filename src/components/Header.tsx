"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "#shop" },
    { name: "Collections", href: "#collections" },
    { name: "Lehengas", href: "#lehengas" },
    { name: "Stories", href: "#stories" },
    { name: "New Arrivals", href: "#new-arrivals" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled
          ? "bg-[#f5ebd9]/80 backdrop-blur-md py-4 border-b border-[#c5a880]/15"
          : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-cream hover:text-gold transition-colors duration-300"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-cream/70 hover:text-gold transition-colors duration-500 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Luxury Logo */}
          <div className="text-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <a href="#" className="flex items-center gap-3 group py-1">
              <img
                src="/logo.jpg"
                alt="Anushka Chauhan Logo"
                className="h-10 md:h-12 w-auto rounded-full border border-gold/15 object-cover transition-all duration-500 group-hover:border-gold/50"
              />
              <div className="flex flex-col items-start text-left">
                <span className="font-editorial text-sm md:text-lg tracking-[0.15em] text-white uppercase transition-colors duration-500 group-hover:text-gold font-semibold">
                  ANUSHKA CHAUHAN
                </span>
                <span className="text-[8px] tracking-[0.05em] text-gold/80 font-light mt-0.5">
                  भारत की विरासत से प्रेरित
                </span>
              </div>
            </a>
          </div>

          {/* Icons Bar */}
          <div className="flex items-center space-x-6">
            <button
              className="text-cream hover:text-gold transition-colors duration-300 hidden sm:block"
              aria-label="Search collection"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              className="text-cream hover:text-gold transition-colors duration-300 relative"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-gold text-[#f5ebd9] text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="text-cream hover:text-gold transition-colors duration-300 relative"
              aria-label="Shopping Bag"
              onClick={openCart}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-gold text-[#f5ebd9] text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#f5ebd9]/98 z-50 flex flex-col justify-between p-8 md:hidden"
          >
            {/* Header in Overlay */}
            <div className="flex items-center justify-between border-b border-[#c5a880]/15 pb-4 w-full">
              <img
                src="/logo.jpg"
                alt="Anushka Chauhan Logo"
                className="h-10 w-auto rounded-full border border-gold/20 object-cover"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-cream hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-6 my-auto items-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-[0.3em] font-editorial text-cream hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Footer in Overlay */}
            <div className="text-center border-t border-[#c5a880]/15 pt-6 flex flex-col items-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-cream/50 mb-1">
                Anushka Chauhan Couture
              </p>
              <p className="text-[8px] uppercase tracking-[0.5em] text-gold">
                Handcrafted in India
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
