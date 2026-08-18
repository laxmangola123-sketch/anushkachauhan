"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductModal, { Product } from "./ProductModal";
import { allProducts } from "./productCatalog";

interface NewProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  status: string;
}

export default function NewArrivals() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const newProducts: NewProduct[] = [
    {
      id: "sar-1",
      name: "Scarlet Zardozi Silk Saree",
      category: "Sarees",
      price: "₹2,45,000",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
      status: "New In",
    },
    {
      id: "leh-4",
      name: "Rani Pink Floral Lehenga",
      category: "Lehengas",
      price: "₹1,65,000",
      imageUrl: "/lehenga_pink.jpg",
      status: "New In",
    },
    {
      id: "top-1",
      name: "Structured Anarkali Top",
      category: "Tops",
      price: "₹65,000",
      imageUrl: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=600&auto=format&fit=crop",
      status: "New In",
    },
    {
      id: "plz-1",
      name: "Gold Print Palazzo Set",
      category: "Plazo",
      price: "₹55,000",
      imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=600&auto=format&fit=crop",
      status: "New In",
    },
    {
      id: "sar-2",
      name: "Midnight Velvet Saree",
      category: "Sarees",
      price: "₹1,85,000",
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      status: "Limited Edition",
    },
    {
      id: "plz-4",
      name: "Embroidered Sharara Set",
      category: "Plazo",
      price: "₹1,20,000",
      imageUrl: "/sharara_emerald.jpg",
      status: "Handcrafted",
    },
  ];

  const handleClick = (id: string) => {
    const product = allProducts.find((p) => p.id === id);
    if (product) setSelectedProduct(product);
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.75
          : scrollLeft + clientWidth * 0.75;

      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <section
        id="new-arrivals"
        className="bg-[#f5ebd9] py-24 md:py-36 pl-6 md:pl-12 overflow-hidden border-b border-[#cca09d]/10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between pr-6 md:pr-12 mb-16">
          {/* Title details */}
          <div>
            <span className="text-xs uppercase tracking-[0.45em] text-gold font-light mb-4 block">
              Just Unveiled
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-cream tracking-wider uppercase">
              New Arrivals
            </h2>
          </div>

          {/* Custom luxury navigation buttons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#cca09d]/20 flex items-center justify-center text-cream hover:bg-gold hover:text-[#f5ebd9] hover:border-gold transition-all duration-500"
              aria-label="Previous items"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-[#cca09d]/20 flex items-center justify-center text-cream hover:bg-gold hover:text-[#f5ebd9] hover:border-gold transition-all duration-500"
              aria-label="Next items"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Slider */}
        <div
          ref={sliderRef}
          className="flex space-x-8 overflow-x-auto scrollbar-none pr-6 md:pr-12 pb-8 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {newProducts.map((product) => (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={product.id}
              className="w-72 sm:w-80 flex-shrink-0 bg-[#ece2ce]/20 border border-[#cca09d]/10 overflow-hidden relative group cursor-pointer"
              onClick={() => handleClick(product.id)}
            >
              {/* Image Box */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-[0.75] group-hover:brightness-[0.65]"
                />

                {/* Status Badge */}
                <span className="absolute top-4 left-4 text-[8px] uppercase tracking-[0.25em] bg-gold text-[#f5ebd9] px-2 py-0.5 font-medium">
                  {product.status}
                </span>
              </div>

              {/* Product Meta */}
              <div className="p-6 border-t border-[#cca09d]/15 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-light mb-1 block">
                    {product.category}
                  </span>
                  <h3 className="font-editorial text-base text-cream tracking-wide uppercase line-clamp-1 mb-2">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between border-t border-[#cca09d]/10 pt-4 mt-2">
                  <span className="font-editorial text-cream/90 text-sm tracking-wider font-semibold">
                    {product.price}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gold group-hover:translate-x-1.5 transition-transform duration-300">
                    Acquire →
                  </span>
                </div>
              </div>

              {/* Luxury overlay borders */}
              <div className="absolute inset-3 border border-[#cca09d]/0 group-hover:border-[#cca09d]/15 transition-all duration-[0.8s] pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
