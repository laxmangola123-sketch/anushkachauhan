"use client";

import { motion } from "framer-motion";
import { Crown, Star, Gem, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import ProductModal, { Product } from "./ProductModal";
import { allProducts } from "./productCatalog";

interface CollectionItem {
    id: string;
    name: string;
    type: string;
    fabric: string;
    price: string;
    imageUrl: string;
    tag?: string;
}

interface CollectionSection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    accentColor: string;
    bgColor: string;
    items: CollectionItem[];
}

const collections: CollectionSection[] = [
    {
        id: "noir-prestige",
        title: "Noir Prestige",
        subtitle: "Midnight Luxury",
        description: "Draped in obsidian darkness — where every thread whispers of forbidden elegance and timeless power.",
        icon: <Gem size={18} />,
        accentColor: "#c5a880",
        bgColor: "#0d0a07",
        items: [
            { id: "sar-2", name: "Midnight Velvet Saree", type: "Saree", fabric: "Black Silk Velvet", price: "₹1,85,000", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop" },
            { id: "leh-3", name: "Neelambari Lehenga", type: "Lehenga", fabric: "Midnight Indigo Raw Silk", price: "₹3,40,000", imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop" },
            { id: "top-3", name: "Velvet Jacket Kurta", type: "Kurta", fabric: "Wine Velvet", price: "₹1,10,000", imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" },
            { id: "plz-3", name: "Violet Organza Gharara", type: "Gharara", fabric: "Organza with Gold Zari", price: "₹1,85,000", imageUrl: "/violet_gharara.jpg" },
        ],
    },
    {
        id: "executive-edit",
        title: "The Executive Edit",
        subtitle: "Power Dressing Redefined",
        description: "Couture meets boardroom authority. For women who lead with grace and command every room they enter.",
        icon: <Crown size={18} />,
        accentColor: "#8B6914",
        bgColor: "#0f0c08",
        items: [
            {
                id: "ee-1",
                name: "Heritage Silk Blazer Set",
                type: "Co-ord Set",
                fabric: "Ivory Silk Dupion",
                price: "₹1,20,000",
                imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
            },
            {
                id: "ee-2",
                name: "Structured Anarkali Top",
                type: "Top",
                fabric: "Cream Chanderi Silk",
                price: "₹65,000",
                imageUrl: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=600&auto=format&fit=crop",
            },
            {
                id: "ee-3",
                name: "Power Palazzo Set",
                type: "Pants Set",
                fabric: "Sand Linen Blend",
                price: "₹78,000",
                imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=600&auto=format&fit=crop",
            },
            {
                id: "ee-4",
                name: "Editorial Saree",
                type: "Saree",
                fabric: "Structured Georgette",
                price: "₹98,000",
                imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
            },
        ],
    },
    {
        id: "crimson-heritage",
        title: "Crimson Heritage",
        subtitle: "⭐ Signature Collection",
        description: "Born from the sacred red of Indian brides — rooted in ritual, soaked in centuries of artisanal devotion.",
        icon: <Star size={18} />,
        accentColor: "#c0392b",
        bgColor: "#120403",
        items: [
            { id: "leh-1", name: "Mughal Vriksh Lehenga", type: "Bridal Lehenga", fabric: "Crimson Silk Velvet", price: "₹4,80,000", tag: "Bestseller", imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop" },
            { id: "sar-1", name: "Scarlet Zardozi Saree", type: "Saree", fabric: "Red Katan Silk", price: "₹2,45,000", tag: "Heritage", imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" },
            { id: "leh-4", name: "Rani Pink Lehenga", type: "Festive Lehenga", fabric: "Hot Pink Georgette", price: "₹1,65,000", imageUrl: "/lehenga_pink.jpg" },
            { id: "plz-4", name: "Embroidered Sharara Set", type: "Sharara", fabric: "Emerald Green Georgette", price: "₹1,20,000", imageUrl: "/sharara_emerald.jpg" },
        ],
    },
    {
        id: "royal-drape",
        title: "Royal Drape",
        subtitle: "Imperial Silhouettes",
        description: "The language of kings spoken through fabric — where draping is not styling, it is sculpture.",
        icon: <Sparkles size={18} />,
        accentColor: "#7b5ea7",
        bgColor: "#0a0710",
        items: [
            { id: "sar-4", name: "Imperial Amethyst Saree", type: "Saree", fabric: "Purple Kanjivaram Silk", price: "₹3,10,000", imageUrl: "https://images.unsplash.com/photo-1609972584232-e79cebe27c4a?q=80&w=600&auto=format&fit=crop" },
            { id: "leh-2", name: "Basant Utsav Lehenga", type: "Festive Lehenga", fabric: "Marigold Banarasi Silk", price: "₹2,65,000", tag: "Royal Pick", imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" },
            { id: "top-3", name: "Majestic Jacket Kurta", type: "Jacket Kurta", fabric: "Wine Velvet", price: "₹1,10,000", imageUrl: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=600&auto=format&fit=crop" },
            { id: "plz-3", name: "Violet Organza Gharara", type: "Gharara", fabric: "Violet Organza Silk", price: "₹1,85,000", imageUrl: "/violet_gharara.jpg" },
        ],
    },
];

export default function RoyalCollections() {
    const [activeCollection, setActiveCollection] = useState("noir-prestige");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleItemClick = (itemId: string) => {
        const product = allProducts.find((p) => p.id === itemId);
        if (product) setSelectedProduct(product);
    };

    const active = collections.find((c) => c.id === activeCollection)!;

    return (
        <>
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <section
                id="royal-collections"
                className="relative py-24 md:py-36 overflow-hidden"
                style={{
                    background:
                        "radial-gradient(ellipse at 20% 50%, #1a0d02 0%, #0d0704 40%, #06030a 100%)",
                }}
            >
                {/* Royal background pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath d='M80 15 L87 55 L125 55 L95 78 L107 118 L80 95 L53 118 L65 78 L35 55 L73 55 Z' fill='%23c5a880' fill-opacity='1'/%3E%3Ccircle cx='80' cy='80' r='60' fill='none' stroke='%23c5a880' stroke-width='0.5' stroke-opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: "160px 160px",
                    }}
                />

                {/* Top gold border */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(90deg, transparent, #c5a880 30%, #c5a88080 70%, transparent)" }}
                />
                <div
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(90deg, transparent, #c5a880 30%, #c5a88080 70%, transparent)" }}
                />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16 md:mb-20"
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] text-[#c5a880] font-light mb-4 block">
                            The Royal Edit
                        </span>
                        <h2
                            className="font-editorial text-4xl sm:text-5xl md:text-7xl uppercase tracking-wider mb-4"
                            style={{ color: "#f0e6d3" }}
                        >
                            Explore Collections
                        </h2>
                        <div className="w-20 h-[1px] mx-auto mb-6" style={{ background: "#c5a880" }} />
                        <p className="text-[#c5a880]/60 text-xs uppercase tracking-[0.3em] max-w-xl mx-auto font-light">
                            Four worlds of couture — each a universe of heritage, craft, and uncompromising luxury
                        </p>
                    </motion.div>

                    {/* Collection Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
                        {collections.map((col, idx) => (
                            <motion.button
                                key={col.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                onClick={() => setActiveCollection(col.id)}
                                className={`group relative px-5 md:px-8 py-3 md:py-4 text-[9px] md:text-[10px] uppercase tracking-[0.35em] font-light transition-all duration-500 flex items-center gap-2 border ${activeCollection === col.id
                                    ? "border-[#c5a880] text-[#f0e6d3] bg-[#c5a880]/10"
                                    : "border-[#c5a880]/20 text-[#c5a880]/50 hover:border-[#c5a880]/50 hover:text-[#c5a880]/80"
                                    }`}
                            >
                                <span
                                    className="transition-colors duration-500"
                                    style={{ color: activeCollection === col.id ? col.accentColor : undefined }}
                                >
                                    {col.icon}
                                </span>
                                {col.title}
                                {col.id === "crimson-heritage" && (
                                    <span className="text-[8px] text-amber-400">⭐</span>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Active Collection Display */}
                    <motion.div
                        key={activeCollection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Collection Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <p
                                    className="text-[9px] uppercase tracking-[0.5em] font-light mb-2"
                                    style={{ color: active.accentColor }}
                                >
                                    {active.subtitle}
                                </p>
                                <h3
                                    className="font-editorial text-3xl md:text-5xl uppercase tracking-wider"
                                    style={{ color: "#f0e6d3" }}
                                >
                                    {active.title}
                                </h3>
                            </div>
                            <p className="text-[#c5a880]/50 text-xs uppercase tracking-[0.2em] font-light max-w-sm leading-relaxed">
                                {active.description}
                            </p>
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {active.items.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    className="group relative cursor-pointer"
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden mb-4">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter brightness-[0.6] group-hover:brightness-[0.75] saturate-[0.85]"
                                        />
                                        {/* Overlay */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                                            style={{ background: `radial-gradient(circle at center, ${active.accentColor}, transparent 70%)` }}
                                        />
                                        {/* Gold frame */}
                                        <div
                                            className="absolute inset-3 border opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
                                            style={{ borderColor: active.accentColor }}
                                        />
                                        {/* Tag */}
                                        {item.tag && (
                                            <div
                                                className="absolute top-4 left-4 text-[7px] uppercase tracking-[0.3em] px-2 py-1 font-light"
                                                style={{
                                                    background: `${active.accentColor}22`,
                                                    border: `1px solid ${active.accentColor}60`,
                                                    color: active.accentColor,
                                                }}
                                            >
                                                {item.tag}
                                            </div>
                                        )}
                                        {/* Type badge */}
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-[7px] uppercase tracking-[0.3em] text-[#f0e6d3]/70 font-light">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="px-1">
                                        <p className="text-[8px] uppercase tracking-[0.3em] mb-1 font-light" style={{ color: active.accentColor }}>
                                            {item.type}
                                        </p>
                                        <h4 className="text-[#f0e6d3]/80 text-xs md:text-sm font-light tracking-wide mb-2 leading-snug">
                                            {item.name}
                                        </h4>
                                        <p className="text-[8px] text-[#c5a880]/40 uppercase tracking-[0.2em] mb-3 font-light">
                                            {item.fabric}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs md:text-sm font-light tracking-wide" style={{ color: active.accentColor }}>
                                                {item.price}
                                            </span>
                                            <button className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                                                <ArrowRight size={12} style={{ color: active.accentColor }} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* View All CTA */}
                        <div className="flex justify-center mt-14">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 text-[9px] uppercase tracking-[0.5em] font-light border transition-all duration-500 group flex items-center gap-4"
                                style={{
                                    borderColor: `${active.accentColor}40`,
                                    color: active.accentColor,
                                }}
                            >
                                View All {active.title}
                                <ArrowRight
                                    size={12}
                                    className="transition-transform duration-500 group-hover:translate-x-2"
                                />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

