"use client";

import { Mail, Phone } from "lucide-react";

const Instagram = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Whatsapp = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.57a9 9 0 0 1-9 9 8.9 8.9 0 0 1-4.47-1.18L3 21l1.62-4.83A9 9 0 0 1 3.5 11.57a9 9 0 0 1 18 0Z" />
    <path d="M9 8.5c.19-.29.45-.39.73-.39.28 0 .54.1.73.39l.81 1.22c.2.3.15.71-.11.96l-.32.31a.48.48 0 0 0-.1.49c.19.43.49.83.87 1.21.38.38.78.68 1.21.87.18.08.39.02.49-.1l.31-.32c.25-.26.66-.31.96-.11l1.22.81c.29.19.39.45.39.73 0 .28-.1.54-.39.73l-.53.53c-.45.45-1.13.56-1.7.27a8.3 8.3 0 0 1-4.22-4.22c-.29-.57-.18-1.25.27-1.7l.53-.53Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#f5ebd9] border-t border-[#c5a880]/15 pt-20 pb-10 px-6 md:px-12 text-[#1c1813]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#c5a880]/10">
        {/* Column 1: Brand Intro */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="/logo.jpg"
              alt="Anushka Chauhan Logo"
              className="h-16 w-auto rounded-full border border-[#aa9775]/20 object-cover"
            />
            <div className="flex flex-col">
              <span className="font-editorial text-xl tracking-[0.1em] text-[#1c1813] uppercase font-bold">
                Anushka Chauhan
              </span>
              <span className="text-[10px] tracking-[0.05em] text-[#aa9775] mt-1 font-bold">
                भारत की विरासत से प्रेरित
              </span>
            </div>
          </div>
          <p className="text-xs text-[#1c1813] leading-relaxed font-bold max-w-sm">
            Preserving the legacy of Indian craftsmanship and ancestral handloom techniques, Anushka Chauhan Couture weaves royal history and gold threads into modern luxury.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a href="https://www.instagram.com/anushkachauhanlabel?igsh=dmZuNGU2bml0eWNq" target="_blank" rel="noopener noreferrer" className="text-[#1c1813] hover:text-[#aa9775] transition-colors duration-300">
              <Instagram size={18} strokeWidth={2} />
            </a>
            <a href="https://www.facebook.com/share/1K5D4RbUSt/" target="_blank" rel="noopener noreferrer" className="text-[#1c1813] hover:text-[#aa9775] transition-colors duration-300">
              <Facebook size={18} strokeWidth={2} />
            </a>
            <a href="https://wa.me/919041588678" target="_blank" rel="noopener noreferrer" className="text-[#1c1813] hover:text-[#aa9775] transition-colors duration-300">
              <Whatsapp size={18} strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* Column 2: Collections */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#aa9775] font-bold mb-2">
            Collections
          </h4>
          <ul className="space-y-2 text-xs font-bold text-[#1c1813]">
            <li>
              <a href="/#collections" className="hover:text-[#aa9775] transition-colors duration-300">
                Wedding Couture
              </a>
            </li>
            <li>
              <a href="/#collections" className="hover:text-[#aa9775] transition-colors duration-300">
                Festive Edit
              </a>
            </li>
            <li>
              <a href="/#collections" className="hover:text-[#aa9775] transition-colors duration-300">
                Luxury Sarees
              </a>
            </li>
            <li>
              <a href="/#collections" className="hover:text-[#aa9775] transition-colors duration-300">
                Lehengas
              </a>
            </li>
            <li>
              <a href="/#collections" className="hover:text-[#aa9775] transition-colors duration-300">
                Fine Jewellery
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Brand */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#aa9775] font-bold mb-2">
            The Brand
          </h4>
          <ul className="space-y-2 text-xs font-bold text-[#1c1813]">
            <li>
              <a href="/pages/our-journey" className="hover:text-[#aa9775] transition-colors duration-300">
                Heritage Story
              </a>
            </li>
            <li>
              <a href="/#our-world" className="hover:text-[#aa9775] transition-colors duration-300">
                Artisan Stories
              </a>
            </li>
            <li>
              <a href="/#our-world" className="hover:text-[#aa9775] transition-colors duration-300">
                Craftsmanship
              </a>
            </li>
            <li>
              <a href="/#our-world" className="hover:text-[#aa9775] transition-colors duration-300">
                Sustainability
              </a>
            </li>
            <li>
              <a href="/#our-world" className="hover:text-[#aa9775] transition-colors duration-300">
                Atelier Careers
              </a>
            </li>
            <li>
              <a href="/pages/track-order" className="hover:text-[#aa9775] transition-colors duration-300">
                Track Your Order
              </a>
            </li>
            <li>
              <a href="/pages/staff-portal" className="hover:text-[#aa9775] transition-colors duration-300">
                Staff Portal
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Appointments */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#aa9775] font-bold mb-2">
            Contact & Service
          </h4>
          <ul className="space-y-3 text-xs font-bold text-[#1c1813]">
            <li className="flex items-start gap-2.5">
              <Mail size={14} className="text-[#aa9775] mt-0.5" strokeWidth={2} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-[#aa9775] font-semibold mb-0.5">Customer Care</span>
                <a href="mailto:care@anushkachauhan.in" className="hover:text-[#aa9775] transition-colors mb-2 break-all">
                  care@anushkachauhan.in
                </a>
                <span className="text-[9px] uppercase tracking-wider text-[#aa9775] font-semibold mb-0.5">Couture Enquiries</span>
                <a href="mailto:business@anushkachauhan.com" className="hover:text-[#aa9775] transition-colors break-all">
                  business@anushkachauhan.com
                </a>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#aa9775]" strokeWidth={2} />
              <a href="tel:+919041588678" className="hover:text-[#aa9775] transition-colors">
                +91-9041588678
              </a>
            </li>
          </ul>
          <div className="pt-2 flex flex-wrap gap-2">
            <a
              href="/pages/contact"
              className="inline-block px-5 py-2.5 border border-[#1c1813] hover:border-[#aa9775] text-[#f5ebd9] bg-[#1c1813] hover:bg-[#aa9775] hover:text-[#f5ebd9] transition-all text-[9px] uppercase tracking-[0.25em] font-bold"
            >
              Contact Support
            </a>
            <a
              href="/pages/contact"
              className="inline-block px-5 py-2.5 border border-[#1c1813] hover:border-[#aa9775] text-[#1c1813] hover:text-[#aa9775] transition-all text-[9px] uppercase tracking-[0.25em] font-bold"
            >
              Request Private Fit
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] text-[#1c1813] uppercase tracking-widest font-bold gap-4 text-center md:text-left">
        <div>
          <span>© 2026 Anushka Chauhan Couture. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap justify-center space-x-6">
          <a href="#privacy" className="hover:text-[#aa9775] transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-[#aa9775] transition-colors">
            Terms & Conditions
          </a>
          <a href="#sitemap" className="hover:text-[#aa9775] transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
