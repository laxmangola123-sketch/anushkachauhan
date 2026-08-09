"use client";

import { Mail, Phone, MapPin } from "lucide-react";

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

const Youtube = ({ size = 18, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
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
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#f5ebd9] border-t border-[#c5a880]/15 pt-20 pb-10 px-6 md:px-12 text-cream/70">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#c5a880]/10">
        {/* Column 1: Brand Intro */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="/logo.jpg"
              alt="Anushka Chauhan Logo"
              className="h-16 w-auto rounded-full border border-gold/20 object-cover"
            />
            <div className="flex flex-col">
              <span className="font-editorial text-xl tracking-[0.1em] text-cream uppercase">
                Anushka Chauhan
              </span>
              <span className="text-[10px] tracking-[0.05em] text-gold mt-1">
                भारत की विरासत से प्रेरित
              </span>
            </div>
          </div>
          <p className="text-xs text-cream/50 leading-relaxed font-light max-w-sm">
            Preserving the legacy of Indian craftsmanship and ancestral handloom techniques, Anushka Chauhan Couture weaves royal history and gold threads into modern luxury.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a href="https://www.instagram.com/anushkachauhanlabel?igsh=dmZuNGU2bml0eWNq" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold transition-colors duration-300">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="https://facebook.com" className="text-cream/50 hover:text-gold transition-colors duration-300">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href="https://youtube.com" className="text-cream/50 hover:text-gold transition-colors duration-300">
              <Youtube size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Column 2: Collections */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-light mb-2">
            Collections
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <a href="#wedding" className="hover:text-gold transition-colors duration-300">
                Wedding Couture
              </a>
            </li>
            <li>
              <a href="#festive" className="hover:text-gold transition-colors duration-300">
                Festive Edit
              </a>
            </li>
            <li>
              <a href="#sarees" className="hover:text-gold transition-colors duration-300">
                Luxury Sarees
              </a>
            </li>
            <li>
              <a href="#lehengas" className="hover:text-gold transition-colors duration-300">
                Lehengas
              </a>
            </li>
            <li>
              <a href="#jewellery" className="hover:text-gold transition-colors duration-300">
                Fine Jewellery
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Brand */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-light mb-2">
            The Brand
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <a href="#heritage" className="hover:text-gold transition-colors duration-300">
                Heritage Story
              </a>
            </li>
            <li>
              <a href="#stories" className="hover:text-gold transition-colors duration-300">
                Artisan Stories
              </a>
            </li>
            <li>
              <a href="#craftsmanship" className="hover:text-gold transition-colors duration-300">
                Craftsmanship
              </a>
            </li>
            <li>
              <a href="#sustainability" className="hover:text-gold transition-colors duration-300">
                Sustainability
              </a>
            </li>
            <li>
              <a href="#careers" className="hover:text-gold transition-colors duration-300">
                Atelier Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Appointments */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-light mb-2">
            Contact & Service
          </h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-gold" />
              <a href="mailto:Sandysahu1111@gmail.com" className="hover:text-gold transition-colors">
                Sandysahu1111@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-gold" />
              <a href="tel:+917303359055" className="hover:text-gold transition-colors">
                +91 73033 59055
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="text-gold mt-0.5" />
              <span className="text-cream/55">
                A-87, A Block, Sector 70, <br />
                Noida 201301 Delhi (NCR) India
              </span>
            </li>
          </ul>
          <div className="pt-2">
            <a
              href="#appointment"
              className="inline-block px-5 py-2.5 border border-[#c5a880]/30 hover:border-gold hover:text-gold transition-all text-[9px] uppercase tracking-[0.25em]"
            >
              Request Private Fit
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] text-cream/40 uppercase tracking-widest font-light gap-4 text-center md:text-left">
        <div>
          <span>© 2026 Anushka Chauhan Couture. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap justify-center space-x-6">
          <a href="#privacy" className="hover:text-gold transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-gold transition-colors">
            Terms & Conditions
          </a>
          <a href="#sitemap" className="hover:text-gold transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
