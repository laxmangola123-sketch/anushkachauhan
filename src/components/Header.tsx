"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
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
    { name: "Shop", href: "/#collections" },
    { name: "About Us", href: "/about-anushka-chauhan" },
    { name: "Track Order", href: "/pages/track-order" },
    { name: "Staff Portal", href: "/pages/staff-portal" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled
          ? "bg-[#f5ebd9]/90 backdrop-blur-md py-4 border-b border-[#c5a880]/15 shadow-sm"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-[#1c1813] hover:text-[#aa9775]" : "text-white hover:text-[#e8d6b3]"
            }`}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 lg:space-x-14">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.25em] transition-colors duration-500 relative group py-2 font-bold ${
                  isScrolled ? "text-[#1c1813]/85 hover:text-[#aa9775]" : "text-white/95 hover:text-[#e8d6b3]"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${
                  isScrolled ? "bg-[#aa9775]" : "bg-[#e8d6b3]"
                }`} />
              </a>
            ))}
          </nav>

          {/* Luxury Logo */}
          <div className="text-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <a href="/" className="flex flex-col items-center group py-1 justify-center">
              <img
                src="/logo.jpg"
                alt="Anushka Chauhan Logo"
                className={`rounded-full border border-[#aa9775]/25 object-cover mb-2 transition-all duration-700 group-hover:scale-105 ${
                  isScrolled ? "h-10 w-10 md:h-12 md:w-12" : "h-16 w-16 md:h-20 md:w-20"
                }`}
              />
              <span className={`font-editorial text-sm md:text-lg tracking-[0.22em] uppercase font-bold transition-colors duration-700 leading-tight ${
                isScrolled ? "text-[#1c1813] group-hover:text-[#aa9775]" : "text-white group-hover:text-[#e8d6b3]"
              }`}>
                ANUSHKA CHAUHAN
              </span>
              <span className={`text-[6px] md:text-[7.5px] tracking-[0.45em] font-bold mt-1 uppercase transition-colors duration-700 ${
                isScrolled ? "text-[#aa9775] group-hover:text-[#1c1813]" : "text-[#e8d6b3] group-hover:text-white"
              }`}>
                HERITAGE COUTURE
              </span>
            </a>
          </div>

          {/* Icons Bar */}
          <div className="flex items-center space-x-6 md:space-x-8">
            <button
              className={`transition-colors duration-300 hidden sm:block ${
                isScrolled ? "text-[#1c1813] hover:text-[#aa9775]" : "text-white hover:text-[#e8d6b3]"
              }`}
              aria-label="Search collection"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>
            <button
              className={`transition-colors duration-300 relative hidden sm:block ${
                isScrolled ? "text-[#1c1813] hover:text-[#aa9775]" : "text-white hover:text-[#e8d6b3]"
              }`}
              aria-label="Profile"
            >
              <User size={18} strokeWidth={1.8} />
            </button>
            <button
              className={`transition-colors duration-300 flex items-center relative ${
                isScrolled ? "text-[#1c1813] hover:text-[#aa9775]" : "text-white hover:text-[#e8d6b3]"
              }`}
              aria-label="Shopping Bag"
              onClick={openCart}
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              <span className={`text-[11px] font-sans font-bold ml-1.5 ${
                isScrolled ? "text-[#1c1813]" : "text-white"
              }`}>
                ({totalItems})
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
            className="fixed inset-0 bg-[#f5ebd9] z-50 flex flex-col justify-between p-8 md:hidden"
          >
            {/* Header in Overlay */}
            <div className="flex items-center justify-between border-b border-[#c5a880]/15 pb-4 w-full">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.jpg"
                  alt="Anushka Chauhan Logo"
                  className="h-8 w-8 rounded-full border border-[#aa9775]/20 object-cover"
                />
                <span className="font-editorial text-sm tracking-[0.2em] text-[#1c1813] uppercase font-semibold">
                  ANUSHKA CHAUHAN
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#1c1813] hover:text-[#aa9775] transition-colors"
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
                  className="text-lg uppercase tracking-[0.3em] font-editorial text-[#1c1813] hover:text-[#aa9775] transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Footer in Overlay */}
            <div className="text-center border-t border-[#c5a880]/15 pt-6 flex flex-col items-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#1c1813]/60 mb-1">
                Anushka Chauhan Couture
              </p>
              <p className="text-[8px] uppercase tracking-[0.5em] text-[#aa9775]">
                Handcrafted in India
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
