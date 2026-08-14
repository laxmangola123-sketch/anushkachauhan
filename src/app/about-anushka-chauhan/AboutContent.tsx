"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Elegant Floral Divider Component
const FloralDivider = () => (
  <div className="flex items-center justify-center gap-3 w-full my-6 text-[#aa9775]">
    <div className="h-[0.5px] bg-[#aa9775]/40 w-16" />
    <span className="text-[10px]">&#10048;</span>
    <div className="h-[0.5px] bg-[#aa9775]/40 w-16" />
  </div>
);

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export default function AboutContent() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "Are your pieces ready-to-wear?",
      answer: "Our collections may include ready-to-wear, made-to-order and couture pieces. The product page will clearly mention the applicable category."
    },
    {
      question: "Do you offer customisation?",
      answer: "Yes. Selected pieces may be customised for colour, embroidery, measurements or occasion, subject to design feasibility."
    },
    {
      question: "Do you offer bridal couture?",
      answer: "Yes. Bridal and couture appointments can be arranged privately with our team."
    },
    {
      question: "How long does embroidery take?",
      answer: "The time varies depending on the complexity of the piece and the handwork involved. A detailed timeline will be shared for made-to-order pieces."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we do international shipping. Please contact our team for availability and shipping details."
    },
    {
      question: "Can I request a different colour?",
      answer: "Selected designs can be recreated or customised in alternate colour palettes, subject to fabric and embroidery availability."
    },
    {
      question: "How do I choose my size?",
      answer: "Please refer to our size guide on the product page. For couture pieces, our team can assist with measurements."
    },
    {
      question: "Can I book a private appointment?",
      answer: "Absolutely. Contact us for a private couture or bridal consultation."
    },
    {
      question: "How can I contact customer care?",
      answer: (
        <span>
          Email us at{" "}
          <a href="mailto:care@anushkachauhan.in" className="underline hover:text-[#aa9775] transition-colors duration-300 font-semibold">
            care@anushkachauhan.in
          </a>{" "}
          or reach us on WhatsApp at{" "}
          <a
            href="https://wa.me/919041588678"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#aa9775] transition-colors duration-300 font-semibold"
          >
            +91-9041588678
          </a>
          .
        </span>
      )
    }
  ];

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-16 text-[#1c1813]">
        
        {/* Section 1: ABOUT US (Header Card & Hero Portrait) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#c5a880]/20 bg-[#eedec8]/5 rounded-sm overflow-hidden mb-24">
          {/* Brand Intro Card */}
          <div className="flex flex-col justify-center items-center p-8 sm:p-12 md:p-16 text-center bg-[#fdfaf4]/30 relative border-b lg:border-b-0 lg:border-r border-[#c5a880]/10 min-h-[450px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-col items-center"
            >
              {/* Increased About Page Logo size to w-28 h-28 */}
              <img
                src="/logo.jpg"
                alt="Anushka Chauhan Logo"
                className="w-28 h-28 rounded-full border border-[#aa9775]/25 object-cover mb-4 shadow-md transition-transform duration-700 hover:scale-105"
              />
              
              {/* Increased font sizes here */}
              <h2 className="font-editorial text-2xl tracking-[0.25em] text-[#1c1813] uppercase font-bold mt-3">
                ANUSHKA CHAUHAN
              </h2>
              <span className="text-[10px] tracking-[0.45em] text-[#aa9775] font-bold uppercase mt-1.5">
                HERITAGE COUTURE
              </span>

              <FloralDivider />

              {/* Increased ABOUT US title to text-6xl / sm:text-7xl */}
              <h1 className="font-editorial text-6xl sm:text-7xl tracking-[0.1em] text-[#1c1813] font-bold mb-4">
                ABOUT US
              </h1>

              {/* Increased Hindi poetical text size to text-xl / sm:text-2xl */}
              <div className="space-y-2 mt-2">
                <p className="font-editorial text-xl sm:text-2xl text-[#aa9775] tracking-wide leading-relaxed font-semibold">
                  भारत की विरासत से प्रेरित,
                </p>
                <p className="font-editorial text-xl sm:text-2xl text-[#aa9775] tracking-wide leading-relaxed font-semibold">
                  आज की स्त्री के लिए रचा गया।
                </p>
              </div>

              <FloralDivider />
            </motion.div>
          </div>

          {/* Hero Portrait */}
          <div className="relative aspect-[2/3] lg:aspect-auto lg:h-full min-h-[450px] overflow-hidden group">
            <img
              src="/about_hero_woman.jpg"
              alt="Model in Luxury Ivory Heritage Couture"
              className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-[2.5s] ease-out brightness-[0.98]"
            />
            <div className="absolute inset-0 bg-[#aa9775]/5 pointer-events-none" />
          </div>
        </div>

        {/* Section 2: ROOTED IN HERITAGE (Text & 3 Portrait Images Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:col-span-5 space-y-6 text-[#1c1813]/90"
          >
            {/* Increased Section 2 Header size to text-3xl / sm:text-4xl */}
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1813] font-bold tracking-wide leading-snug">
              ROOTED IN HERITAGE.<br />
              REIMAGINED FOR TODAY.
            </h2>
            
            {/* Increased paragraph text sizes from text-xs/sm to text-sm/base */}
            <div className="space-y-4 text-sm sm:text-base font-light leading-relaxed text-[#1c1813]/80">
              <p>
                Anushka Chauhan is an Indian couture label inspired by the richness of India&apos;s artistic heritage, royal architecture and generations of craftsmanship.
              </p>
              <p>
                We believe clothing should carry more than beauty—it should carry a story.
              </p>
              <p>
                Our collections draw inspiration from India&apos;s palaces, jharokhas, traditional motifs, nature and the intricate visual language of our cultural history. These elements are thoughtfully translated into contemporary silhouettes, rich embroideries and timeless Indian occasionwear.
              </p>
              <p>
                From the first sketch to the final hand stitch, every piece is created with an appreciation for detail, patience and craftsmanship.
              </p>
            </div>
          </motion.div>

          {/* 3 Portrait Images Side-by-Side */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: "/about_craft_hands.jpg", alt: "Artisan Hands Embroidery" },
              { src: "/about_craft_window.jpg", alt: "Mughal Jharokha Window" },
              { src: "/about_craft_embroidery.jpg", alt: "Embroidery Detail close up" }
            ].map((img, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                key={idx}
                className="border border-[#c5a880]/15 p-1 sm:p-1.5 bg-[#fcf9f2] shadow-sm rounded-sm aspect-[3/4] overflow-hidden group"
              >
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.8s] ease-out brightness-95"
                  />
                  <div className="absolute inset-0 bg-[#aa9775]/5 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: THE ART OF CRAFT (Mannequin, Card, Sketches) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch mb-24">
          {/* Mannequin Lehenga */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="md:col-span-4 border border-[#c5a880]/15 p-1.5 bg-[#fcf9f2] shadow-sm rounded-sm flex flex-col aspect-[3/4] overflow-hidden group justify-between"
          >
            <div className="w-full h-full overflow-hidden relative">
              <img
                src="/about_mannequin.jpg"
                alt="Bridal Lehenga Mannequin Setup"
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.8s] ease-out brightness-95"
              />
              <div className="absolute inset-0 bg-[#aa9775]/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* Central Philosophy Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="md:col-span-4 border border-[#c5a880]/15 p-8 flex flex-col justify-center items-center text-center bg-[#fdfbf7] shadow-sm rounded-sm relative"
          >
            {/* Increased title to text-2xl */}
            <h3 className="font-editorial text-2xl text-[#1c1813] font-bold tracking-[0.15em] uppercase">
              THE ART OF CRAFT
            </h3>
            
            <FloralDivider />
            
            {/* Increased text size from text-xs/sm to text-sm/base */}
            <p className="text-sm sm:text-base font-light text-[#1c1813]/80 leading-relaxed max-w-xs">
              At the heart of Anushka Chauhan is the belief that true luxury lies in the hands that create it. Our embroideries bring together traditional handwork, resham, zardozi, cutdana, sequins and intricate surface techniques, carefully composed to preserve the character of Indian craftsmanship while giving it a modern expression.
            </p>
          </motion.div>

          {/* Sketches in Studio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="md:col-span-4 border border-[#c5a880]/15 p-1.5 bg-[#fcf9f2] shadow-sm rounded-sm flex flex-col aspect-[3/4] overflow-hidden group justify-between"
          >
            <div className="w-full h-full overflow-hidden relative">
              <img
                src="/about_sketches.jpg"
                alt="Luxury Couture Sketches and Swatches"
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.8s] ease-out brightness-95"
              />
              <div className="absolute inset-0 bg-[#aa9775]/5 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Section 4: OUR PHILOSOPHY (Embroidery Swatch, Philosophy Card, Mogra Bowl) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-24">
          {/* Detailed Swatch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="md:col-span-3 border border-[#c5a880]/15 p-1.5 bg-[#fcf9f2] shadow-sm rounded-sm aspect-[3/4] overflow-hidden group"
          >
            <div className="w-full h-full overflow-hidden relative">
              <img
                src="/about_embroidery_detail.jpg"
                alt="Luxury Floral Gold Embroidery Close Up"
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.8s] ease-out brightness-95"
              />
              <div className="absolute inset-0 bg-[#aa9775]/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* Central Philosophy text */}
          <div className="md:col-span-6 flex flex-col justify-center items-center text-center px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-col items-center"
            >
              {/* Increased title size to text-2xl */}
              <h3 className="font-editorial text-2xl text-[#1c1813] font-bold tracking-[0.2em] uppercase">
                OUR PHILOSOPHY
              </h3>

              <FloralDivider />

              {/* Increased quote and paragraph text sizes */}
              <div className="space-y-4 max-w-md">
                <p className="font-editorial text-base sm:text-lg italic text-[#aa9775] leading-relaxed">
                  Heritage is not something we simply preserve. It is something we continue to create.
                </p>
                <p className="text-sm sm:text-base font-light text-[#1c1813]/85 leading-relaxed">
                  Anushka Chauhan is for the woman who appreciates where she comes from, yet chooses to express it in her own way.
                </p>
              </div>

              <FloralDivider />

              {/* Increased footer note text to text-xs / sm:text-sm */}
              <div className="text-xs sm:text-sm tracking-[0.3em] font-bold text-[#aa9775]/90 space-y-1.5 mt-2">
                <p>MADE IN INDIA.</p>
                <p>INSPIRED BY ITS HERITAGE.</p>
                <p>CREATED FOR GENERATIONS TO COME.</p>
              </div>
            </motion.div>
          </div>

          {/* Mogra Bowl */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="md:col-span-3 border border-[#c5a880]/15 p-1.5 bg-[#fcf9f2] shadow-sm rounded-sm aspect-[3/4] overflow-hidden group"
          >
            <div className="w-full h-full overflow-hidden relative">
              <img
                src="/about_mogra.jpg"
                alt="White Mogra Flowers in Brass Bowl next to Banarasi Silk"
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.8s] ease-out brightness-95"
              />
              <div className="absolute inset-0 bg-[#aa9775]/5 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Section 5: FAQs (Frequently Asked Questions Accordion) */}
        <div className="border-t border-[#c5a880]/20 pt-20 mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Increased FAQ main title size to text-4xl/5xl */}
            <h2 className="font-editorial text-4xl sm:text-5xl tracking-[0.15em] text-[#1c1813] font-bold uppercase">
              FAQs
            </h2>
            {/* Increased FAQ subtitle size to text-xs */}
            <span className="text-xs uppercase tracking-[0.35em] text-[#aa9775] font-bold mt-2 block">
              Frequently Asked Questions
            </span>
            <div className="flex justify-center mt-4">
              <div className="h-[0.5px] bg-[#aa9775]/30 w-16" />
            </div>
          </div>

          <div className="border-t border-[#c5a880]/15">
            {faqData.map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div key={index} className="border-b border-[#c5a880]/15 py-5">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  >
                    {/* Increased FAQ question size to text-lg/xl */}
                    <span className="font-editorial text-lg sm:text-xl text-[#1c1813] group-hover:text-[#aa9775] transition-colors duration-300 pr-4 font-semibold">
                      {faq.question}
                    </span>
                    <span className="relative w-4 h-4 flex items-center justify-center shrink-0">
                      <span className="absolute w-4 h-[1px] bg-[#aa9775] transition-transform duration-300" />
                      <span
                        className={`absolute w-4 h-[1px] bg-[#aa9775] transition-transform duration-300 ${
                          isOpen ? "rotate-0" : "rotate-90"
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {/* Increased FAQ answer size to text-sm/base */}
                        <p className="mt-3 text-sm sm:text-base font-light text-[#1c1813]/80 leading-relaxed pl-1 pr-6 max-w-3xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Re-designed Consultation Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-24 p-8 md:p-12 border border-[#c5a880]/20 bg-[#eedec8]/10 text-center space-y-6 rounded-sm"
        >
          {/* Increased Consultation CTA title to text-3xl/4xl */}
          <h3 className="font-editorial text-3xl sm:text-4xl text-[#1c1813] tracking-wide font-bold">
            Begin Your Bridal Consultation
          </h3>
          {/* Increased Consultation CTA description to text-sm/base */}
          <p className="text-sm sm:text-base font-light text-[#1c1813]/75 max-w-xl mx-auto leading-relaxed">
            Let our design studio assist you in crafting the perfect bespoke outfit. We offer customisable designs for bridal lehengas, occasion sarees, and custom festive collections.
          </p>
          {/* Increased button font size to text-sm */}
          <div className="pt-2">
            <Link
              href="/pages/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#1c1813] hover:border-[#aa9775] bg-[#1c1813] hover:bg-[#aa9775] text-[#f5ebd9] transition-all text-sm uppercase tracking-[0.25em] font-bold rounded-sm cursor-pointer shadow-md"
            >
              Contact Our Studio <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

      </div>
    </PageShell>
  );
}
