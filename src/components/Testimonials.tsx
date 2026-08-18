"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  occasion: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "The craftsmanship of Anushka Chauhan is absolute poetry. My custom wedding lehenga felt less like clothing and more like a historical heritage piece. The real gold zari work is breathtaking.",
      author: "Meera Sen",
      location: "Paris, France",
      occasion: "Bridal Couture Client",
    },
    {
      quote: "To wear Anushka Chauhan is to experience the grandeur of Indian handloom with a modern silhouette that commands global respect. The luxury sarees are soft, heavy, and timeless.",
      author: "Anjali Sharma",
      location: "New York, USA",
      occasion: "Festive Collection Client",
    },
    {
      quote: "Unparalleled luxury. The custom sherwani is tailored to perfection. You can feel the hundreds of hours of manual handloom embroidery in the weight and drape of the pure silk fabric.",
      author: "Ranveer Malhotra",
      location: "Mumbai, India",
      occasion: "Heritage Groomswear Client",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6s duration per testimonial
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12 overflow-hidden border-b border-[#cca09d]/10 relative"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Quote size={40} strokeWidth={1} className="text-gold/45 mx-auto mb-10" />

        {/* Carousel Content with Fade Animation */}
        <div className="min-h-[220px] sm:min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="space-y-8"
            >
              <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-cream tracking-wide leading-relaxed italic">
                &quot;{testimonials[activeIndex].quote}&quot;
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-gold font-light mb-1">
                  {testimonials[activeIndex].author}
                </h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  {testimonials[activeIndex].occasion} — {testimonials[activeIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1 transition-all duration-500 ${
                activeIndex === index ? "w-8 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative luxury vector lines */}
      <div className="absolute top-1/2 left-0 w-12 h-[1px] bg-gradient-to-r from-gold/30 to-transparent hidden md:block" />
      <div className="absolute top-1/2 right-0 w-12 h-[1px] bg-gradient-to-l from-gold/30 to-transparent hidden md:block" />
    </section>
  );
}
