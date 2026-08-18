"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  imageDefault: string;
  imageHover: string;
  details: string[];
}

export default function Featured() {
  const products: Product[] = [
    {
      id: "prod-1",
      name: "The Banarasi Royal Zari Saree",
      category: "Luxury Sarees",
      price: "₹1,85,000",
      imageDefault: "/saree_banarasi_def.jpg",
      imageHover: "/saree_banarasi_hov.jpg",
      details: ["100% Pure Katan Silk", "Real gold zari threadwork", "Handwoven over 180 hours"],
    },
    {
      id: "prod-2",
      name: "The Mughal Garden Bridal Lehenga",
      category: "Lehengas",
      price: "₹4,20,000",
      imageDefault: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      imageHover: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
      details: ["Hand-dyed velvet & silk base", "Intricate dabka and nakshi work", "Stitched with semi-precious stones"],
    },
    {
      id: "prod-3",
      name: "The Mayur Chandrika Choker",
      category: "Fine Jewellery",
      price: "₹2,40,000",
      imageDefault: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
      imageHover: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
      details: ["22k Yellow Gold base", "Uncut polki diamonds", "Peacock blue hand-enameling"],
    },
    {
      id: "prod-4",
      name: "The Gilded Royal Potli",
      category: "Accessories",
      price: "₹45,000",
      imageDefault: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop",
      imageHover: "https://images.unsplash.com/photo-1598532187856-32724af97ccb?q=80&w=600&auto=format&fit=crop",
      details: ["Velvet overlay", "Pure silk lining", "Handmade gold pearls handle"],
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="featured-collection"
      className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12 border-b border-[#cca09d]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.45em] text-gold font-light mb-4 block">
            Crafted for Royalty
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-cream tracking-wider uppercase mb-6">
            Featured Masterpieces
          </h2>
          <div className="w-12 h-[1px] bg-gold/50 mx-auto mb-6" />
          <p className="text-cream/60 text-xs md:text-sm uppercase tracking-[0.2em] font-light leading-relaxed">
            A hand-picked selection of our most exquisite silhouettes, representing hundreds of hours of ancestral embroidery and weave.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              key={product.id}
              className="group flex flex-col bg-[#ece2ce]/30 border border-[#cca09d]/10 overflow-hidden relative"
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container with Double Image Fade */}
              <div className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer">
                {/* Default Image */}
                <img
                  src={product.imageDefault}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-1000 ease-in-out filter brightness-[0.8] ${
                    hoveredCard === product.id ? "opacity-0 scale-105" : "opacity-100 scale-100"
                  }`}
                />

                {/* Hover Image */}
                <img
                  src={product.imageHover}
                  alt={`${product.name} Detail`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out filter brightness-[0.6] ${
                    hoveredCard === product.id ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />

                {/* Luxury Hover Action overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#f5ebd9]/30 backdrop-blur-[2px]">
                  <div className="flex space-x-4">
                    <button
                      className="p-3.5 bg-cream text-[#f5ebd9] hover:bg-gold hover:text-cream rounded-full transition-colors duration-300 shadow-xl"
                      title="Quick View"
                    >
                      <Eye size={18} strokeWidth={1.5} />
                    </button>
                    <button
                      className="p-3.5 bg-gold text-[#f5ebd9] hover:bg-cream hover:text-gold rounded-full transition-colors duration-300 shadow-xl"
                      title="Add to Bag"
                    >
                      <ShoppingBag size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Left Tag */}
                <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.25em] bg-gold text-[#f5ebd9] px-2.5 py-1 font-medium">
                  Couture
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow justify-between border-t border-[#cca09d]/15">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-light mb-1 block">
                    {product.category}
                  </span>
                  <h3 className="font-editorial text-lg text-cream tracking-wide uppercase group-hover:text-gold transition-colors duration-500 line-clamp-1 mb-2">
                    {product.name}
                  </h3>
                  {/* Detailed specs list */}
                  <ul className="space-y-1 my-3">
                    {product.details.map((detail, index) => (
                      <li key={index} className="text-[10px] text-cream/45 tracking-wide flex items-center">
                        <span className="w-1.5 h-1.5 bg-gold/20 rounded-full mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-[#cca09d]/10 pt-4 mt-2">
                  <span className="font-editorial text-cream/90 text-md tracking-wider font-semibold">
                    {product.price}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gold group-hover:translate-x-1.5 transition-transform duration-300 cursor-pointer">
                    Request Fit →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
