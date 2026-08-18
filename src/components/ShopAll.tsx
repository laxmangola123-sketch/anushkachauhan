"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { allProducts } from "./productCatalog";
import ProductModal, { Product } from "./ProductModal";

const categories = ["All", "Lehengas", "Sarees", "Tops", "Plazo"];

export default function ShopAll() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filtered: Product[] = [];

    return (
        <>
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

            <section id="shop" className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-14"
                    >
                        <span className="text-[9px] uppercase tracking-[0.6em] text-[#cca09d] font-light mb-4 block">
                            Anushka Chauhan
                        </span>
                        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1c1813] tracking-wider uppercase mb-4">
                            Shop All Pieces
                        </h2>
                        <div className="w-16 h-[1px] bg-[#cca09d]/50 mx-auto mb-5" />
                        <p className="text-[#1c1813]/50 text-xs uppercase tracking-[0.3em] font-light max-w-md mx-auto">
                            Click any piece to explore full details and place your order
                        </p>
                    </motion.div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-14">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 text-[9px] uppercase tracking-[0.4em] border transition-all duration-400 font-semibold ${activeCategory === cat
                                        ? "border-[#1c1813] bg-[#1c1813] text-[#f5ebd9]"
                                        : "border-[#cca09d]/30 text-[#1c1813]/80 hover:border-[#cca09d] hover:text-[#1c1813]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                        {filtered.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
                                onClick={() => setSelectedProduct(product)}
                                className="group cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative aspect-[3/4] overflow-hidden mb-4 border border-[#cca09d]/15">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-[0.9] group-hover:brightness-[0.75]"
                                    />
                                    {/* Gold frame */}
                                    <div className="absolute inset-3 border border-[#cca09d]/0 group-hover:border-[#cca09d]/30 transition-all duration-700 pointer-events-none" />
                                    {/* Tag */}
                                    {product.tag && (
                                        <div className="absolute top-3 left-3 text-[7.5px] uppercase tracking-[0.3em] px-2 py-1 bg-[#f5ebd9]/95 text-[#9c6d68] border border-[#cca09d]/30 font-semibold">
                                            {product.tag}
                                        </div>
                                    )}
                                    {/* View Details overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="bg-[#f5ebd9]/95 px-4 py-2 flex items-center gap-2 text-[8px] uppercase tracking-[0.4em] text-[#1c1813] font-semibold">
                                            <ShoppingBag size={10} />
                                            View & Order
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div>
                                    <p className="text-[8.5px] uppercase tracking-[0.3em] text-[#9c6d68] font-semibold mb-1">{product.type}</p>
                                    <h3 className="text-[#1c1813] text-xs md:text-sm font-bold tracking-wide mb-1 leading-snug group-hover:text-[#9c6d68] transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    {/* Rating */}
                                    {product.rating && (
                                        <div className="flex items-center gap-1 mb-1.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={8}
                                                    className={i < product.rating! ? "fill-[#9c6d68] text-[#9c6d68]" : "text-[#9c6d68]/25"}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#1c1813] text-sm font-bold tracking-wide">{product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-[9px] text-[#1c1813]/60 font-semibold line-through">{product.originalPrice}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
