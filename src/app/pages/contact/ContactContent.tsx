"use client";

import PageShell from "@/components/PageShell";
import { motion } from "framer-motion";
import { Mail, Clock, MessageSquare, ShieldCheck } from "lucide-react";

export default function ContactContent() {
  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 text-[#1c1813]">
        {/* Editorial Watermark Header */}
        <div className="text-center mb-16 relative">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#aa9775] font-semibold mb-3 block"
          >
            Customer Support
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-wide leading-tight text-[#1c1813] mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-editorial italic text-lg sm:text-xl text-[#aa9775] tracking-wide"
          >
            We&apos;d Love to Hear From You
          </motion.p>
          
          <div className="flex items-center justify-center gap-2 w-full mt-6">
            <div className="h-[1px] bg-[#c5a880]/30 w-16" />
            <span className="text-[#c5a880] text-[8px]">&#10047;</span>
            <div className="h-[1px] bg-[#c5a880]/30 w-16" />
          </div>
        </div>

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm sm:text-base font-light leading-relaxed text-[#1c1813]/80">
            Whether you are looking for a piece from our latest collection, need assistance with sizing, wish to enquire about a custom order, or simply want to know more about our craftsmanship, our team is here to assist.
          </p>
        </motion.div>

        {/* Two Column Support Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Card 1: Customer Care */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-[#c5a880]/20 bg-[#ece2ce]/20 p-8 rounded-sm flex flex-col justify-between space-y-8 shadow-sm"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#c5a880]/15 pb-4">
                <div className="w-10 h-10 rounded-full border border-[#aa9775]/35 flex items-center justify-center text-[#aa9775]">
                  <ShieldCheck size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-editorial text-lg text-[#1c1813] font-semibold">
                    Customer Care
                  </h3>
                  <p className="text-[8px] uppercase tracking-widest text-[#aa9775] font-light">
                    Sizing, Orders & Operations
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-light text-[#1c1813]/85">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#aa9775] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#aa9775] font-semibold block mb-0.5">Email</span>
                    <a href="mailto:care@anushkachauhan.in" className="hover:text-[#aa9775] transition-colors break-all">
                      care@anushkachauhan.in
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <MessageSquare size={16} className="text-[#aa9775] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#aa9775] font-semibold block mb-0.5">WhatsApp Chat</span>
                    <a
                      href="https://wa.me/919041588678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#aa9775] transition-colors flex items-center gap-1.5"
                    >
                      +91 90415 88678
                      <span className="text-[9px] bg-[#aa9775]/10 text-[#aa9775] border border-[#aa9775]/20 rounded-full px-2 py-0.2 uppercase tracking-widest">Chat Now</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#aa9775] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#aa9775] font-semibold block mb-0.5">Operating Hours</span>
                    <span>Monday – Saturday</span>
                    <span className="block text-[11px] text-[#1c1813]/70 mt-0.5">10:00 AM – 07:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Couture & Custom Enquiries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-[#c5a880]/20 bg-[#ece2ce]/20 p-8 rounded-sm flex flex-col justify-between space-y-8 shadow-sm"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#c5a880]/15 pb-4">
                <div className="w-10 h-10 rounded-full border border-[#aa9775]/35 flex items-center justify-center text-[#aa9775]">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-editorial text-lg text-[#1c1813] font-semibold">
                    Couture Enquiries
                  </h3>
                  <p className="text-[8px] uppercase tracking-widest text-[#aa9775] font-light">
                    Bridal Appointments & Bespoke
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-light text-[#1c1813]/85">
                {/* Intro */}
                <p className="italic text-[#1c1813]/75 font-light text-xs leading-relaxed">
                  For bridal appointments, bespoke creations and special occasion wear design:
                </p>

                {/* Email */}
                <div className="flex items-start gap-3 pt-2">
                  <Mail size={16} className="text-[#aa9775] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#aa9775] font-semibold block mb-0.5">Direct Consultation</span>
                    <a href="mailto:business@anushkachauhan.com" className="hover:text-[#aa9775] transition-colors break-all">
                      business@anushkachauhan.com
                    </a>
                  </div>
                </div>

                {/* Private appointments note */}
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#aa9775] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#aa9775] font-semibold block mb-0.5">Availability</span>
                    <span className="font-editorial italic font-semibold text-[#aa9775]">
                      Private appointments available by prior consultation.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </PageShell>
  );
}
