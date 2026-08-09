import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { CartProvider } from "@/components/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anushka Chauhan | Handcrafted Luxury Couture India",
  description: "Experience timeless Indian heritage and luxury handcrafted couture by Anushka Chauhan. Discover our custom sarees, bridal lehengas, and hand-embroidered wedding wear.",
  keywords: "Anushka Chauhan, Luxury Saree, Bridal Lehenga, Indian Handloom, Handcrafted Couture, Heritage Fashion",
  openGraph: {
    title: "Anushka Chauhan | Handcrafted Luxury Couture India",
    description: "Experience timeless Indian heritage and luxury handcrafted couture by Anushka Chauhan.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased dark`}
    >
      <body className="bg-[#070707] text-[#f6f3eb] min-h-full flex flex-col font-sans">
        <CartProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
