"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, Ruler, Star, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartContext";

export interface Product {
    id: string;
    name: string;
    category: string;
    type: string;
    fabric: string;
    price: string;
    originalPrice?: string;
    description: string;
    details: string[];
    sizes: string[];
    imageUrl: string;
    tag?: string;
    rating?: number;
    reviews?: number;
}

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

interface OrderForm {
    name: string;
    phone: string;
    email: string;
    houseNo: string;
    address: string; // Colony / Street / Location
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    note: string;
}

const emptyForm: OrderForm = {
    name: "",
    phone: "",
    email: "",
    houseNo: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    note: "",
};

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal",
];

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [step, setStep] = useState<"product" | "form" | "success">("product");
    const [selectedSize, setSelectedSize] = useState("");
    const [added, setAdded] = useState(false);
    const [form, setForm] = useState<OrderForm>(emptyForm);
    const [errors, setErrors] = useState<Partial<OrderForm>>({});

    const { addItem, openAIStylist } = useCart();

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size first.");
            return;
        }
        addItem(product, selectedSize);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            onClose();
        }, 1200);
    };

    const handleProceedToOrder = () => {
        if (!selectedSize) {
            alert("Please select a size before placing an order.");
            return;
        }
        setStep("form");
    };

    const validateForm = () => {
        const tempErrors: Partial<OrderForm> = {};
        if (!form.name.trim()) tempErrors.name = "Full name is required";
        if (!/^[6-9]\d{9}$/.test(form.phone)) tempErrors.phone = "Enter valid 10-digit mobile number";
        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Invalid email format";
        if (!form.houseNo.trim()) tempErrors.houseNo = "House/Flat no is required";
        if (!form.address.trim()) tempErrors.address = "Colony/Street address is required";
        if (!form.city.trim()) tempErrors.city = "City is required";
        if (!form.state) tempErrors.state = "State selection is required";
        if (!/^\d{6}$/.test(form.pincode)) tempErrors.pincode = "Enter valid 6-digit pincode";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handlePlaceDirectOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setStep("success");
    };

    const handleCloseModal = () => {
        onClose();
        // Reset states after modal finishes exiting
        setTimeout(() => {
            setStep("product");
            setSelectedSize("");
            setForm(emptyForm);
            setErrors({});
        }, 300);
    };

    const inputClass = (field: keyof OrderForm) =>
        `w-full px-3.5 py-2.5 text-xs bg-[#1d032e]/40 border ${
            errors[field] ? "border-red-400" : "border-[#c5a880]/30"
        } text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#c5a880] transition-colors duration-300 font-light tracking-wide`;

    return (
        <AnimatePresence>
            {product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                        className="fixed inset-0 bg-[#0d0704]/85 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] flex overflow-hidden bg-[#f5ebd9]"
                        style={{ maxHeight: "calc(100vh - 2rem)" }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border border-[#c5a880]/30 hover:border-[#c5a880] transition-all duration-300 bg-[#f5ebd9]"
                        >
                            <X size={16} className="text-[#1c1813]" />
                        </button>

                        <div className="flex flex-col md:flex-row w-full overflow-y-auto md:overflow-hidden">
                            {/* Left Side: Product Image (Sticky summary if on form step) */}
                            <div className="w-full md:w-[45%] relative overflow-hidden flex-shrink-0 min-h-[300px] md:h-full">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    style={{ minHeight: "300px" }}
                                />
                                {product.tag && (
                                    <div className="absolute top-6 left-6 text-[8px] uppercase tracking-[0.4em] px-3 py-1.5 bg-[#c5a880] text-[#f5ebd9] font-light">
                                        {product.tag}
                                    </div>
                                )}

                                {/* Subtle Overlay showing active cart total on Success/Form steps */}
                                {step !== "product" && (
                                    <div className="absolute inset-0 bg-[#35020c]/85 backdrop-blur-xs flex flex-col justify-end p-8 md:p-12 text-[#f5eedc]">
                                        <p className="text-[9px] uppercase tracking-[0.45em] text-[#e8d6b3] font-light mb-2">Order summary</p>
                                        <h3 className="font-editorial text-xl uppercase tracking-wider mb-1">{product.name}</h3>
                                        <p className="text-xs uppercase tracking-widest text-[#f5eedc]/60 font-light mb-4">Size: {selectedSize}</p>
                                        <div className="w-12 h-[1px] bg-[#e8d6b3]/30 mb-4" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] uppercase tracking-widest text-[#f5eedc]/55 font-light">Total Price</span>
                                            <span className="text-2xl font-light tracking-wide text-[#e8d6b3]">{product.price}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Step Dependent Panels */}
                            <div className="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto flex flex-col justify-between">
                                {/* STEP 1: Product Specifications & Details */}
                                {step === "product" && (
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.6em] text-[#c5a880] font-light mb-3">
                                                Anushka Chauhan — {product.category}
                                            </p>

                                            <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl text-[#1c1813] tracking-wide uppercase leading-tight mb-2">
                                                {product.name}
                                            </h2>

                                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880]/70 font-light mb-4">
                                                {product.type} · {product.fabric}
                                            </p>

                                            {product.rating && (
                                                <div className="flex items-center gap-2 mb-5">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={11}
                                                            className={i < Math.floor(product.rating!) ? "fill-[#c5a880] text-[#c5a880]" : "text-[#c5a880]/30"}
                                                        />
                                                    ))}
                                                    <span className="text-[9px] text-[#1c1813]/55 uppercase tracking-widest">
                                                        {product.reviews} reviews
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-baseline gap-3 mb-6">
                                                <span className="text-2xl md:text-3xl text-[#1c1813] font-light tracking-wide">
                                                    {product.price}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-[#1c1813]/40 line-through">{product.originalPrice}</span>
                                                )}
                                            </div>

                                            <div className="w-12 h-[1px] bg-[#c5a880]/40 mb-6" />

                                            <p className="text-[#1c1813]/65 text-xs leading-relaxed font-light mb-7">
                                                {product.description}
                                            </p>

                                            <ul className="space-y-2 mb-8">
                                                {product.details.map((d, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-[9px] uppercase tracking-[0.2em] text-[#1c1813]/55 font-light">
                                                        <span className="text-[#c5a880] mt-[2px]">—</span>
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mb-8">
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-[9px] uppercase tracking-[0.4em] text-[#1c1813]/60 font-light">
                                                        Select Size
                                                    </p>
                                                    <button className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-[#c5a880] font-light">
                                                        <Ruler size={10} /> Size Guide
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.sizes.map((size) => (
                                                        <button
                                                            key={size}
                                                            onClick={() => setSelectedSize(size)}
                                                            className={`px-4 py-2 text-[9px] uppercase tracking-[0.3em] border transition-all duration-300 font-light cursor-pointer ${selectedSize === size
                                                                ? "border-[#c5a880] bg-[#c5a880]/10 text-[#1c1813]"
                                                                : "border-[#c5a880]/25 text-[#1c1813]/60 hover:border-[#c5a880]/60"
                                                                }`}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                {/* Direct Checkout Order Button */}
                                                <motion.button
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleProceedToOrder}
                                                    className="flex-grow py-4 bg-[#1c1813] text-[#f5ebd9] hover:bg-[#c5a880] hover:text-[#1c1813] border border-[#1c1813] text-[9px] uppercase tracking-[0.5em] font-light flex items-center justify-center gap-2 cursor-pointer transition-all duration-500 shadow-md"
                                                >
                                                    <ShoppingBag size={13} />
                                                    Order Now (Direct Checkout)
                                                </motion.button>
                                                
                                                {/* Add to Cart (Global Drawer) Button */}
                                                <motion.button
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleAddToCart}
                                                    className={`sm:px-6 py-4 text-[9px] uppercase tracking-[0.3em] font-light flex items-center justify-center gap-2 transition-all duration-500 border ${added
                                                        ? "bg-[#5a7a5a] text-white border-[#5a7a5a]"
                                                        : "border-[#c5a880]/30 text-[#1c1813] hover:bg-[#c5a880]/10"
                                                    }`}
                                                >
                                                    {added ? "Added ✓" : "Add to Cart"}
                                                </motion.button>
                                                
                                                <button className="sm:w-14 py-4 border border-[#c5a880]/30 flex items-center justify-center hover:border-[#c5a880] hover:bg-[#c5a880]/10 transition-all duration-300">
                                                    <Heart size={14} className="text-[#c5a880]" />
                                                </button>
                                            </div>
                                            
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    onClose();
                                                    openAIStylist(product);
                                                }}
                                                className="w-full py-3.5 border border-[#c5a880] text-[#c5a880] text-[9px] uppercase tracking-[0.4em] font-light hover:bg-[#c5a880] hover:text-[#1c1813] transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <span className="inline-block animate-pulse">✨</span> Style with AI Combinator
                                            </motion.button>
                                        </div>

                                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#1c1813]/40 font-light mt-6 text-center">
                                            Free shipping across India · Custom sizing available
                                        </p>
                                    </div>
                                )}

                                {/* STEP 2: Custom Checkout Details Form */}
                                {step === "form" && (
                                    <form onSubmit={handlePlaceDirectOrder} className="flex-grow flex flex-col justify-between">
                                        <div>
                                            {/* Subheader */}
                                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#c5a880]/20">
                                                <button 
                                                    type="button"
                                                    onClick={() => setStep("product")}
                                                    className="text-[9px] uppercase tracking-[0.2em] text-[#c5a880] hover:text-[#1c1813] transition-colors"
                                                >
                                                    ← Back to Details
                                                </button>
                                                <div className="text-right">
                                                    <span className="text-[7px] uppercase tracking-widest text-[#1c1813]/50 block">Selected Size</span>
                                                    <span className="text-[10px] uppercase font-semibold text-[#1c1813] tracking-widest">{selectedSize}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-editorial text-xl text-[#1c1813] uppercase tracking-wider mb-6">Delivery Details</h3>
                                            
                                            {/* Scrollable Form Fields */}
                                            <div className="space-y-4 max-h-[calc(100vh-22rem)] overflow-y-auto pr-2 custom-scrollbar">
                                                {/* Full Name */}
                                                <div>
                                                    <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">Full Name *</label>
                                                    <input 
                                                        className={inputClass("name")} 
                                                        placeholder="e.g. Anushka Sharma" 
                                                        value={form.name} 
                                                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                                                    />
                                                    {errors.name && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.name}</p>}
                                                </div>

                                                {/* Mobile Number & Email */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">Mobile Number *</label>
                                                        <input 
                                                            className={inputClass("phone")} 
                                                            placeholder="10-digit number" 
                                                            value={form.phone} 
                                                            onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                                                            maxLength={10} 
                                                        />
                                                        {errors.phone && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.phone}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">Email Address</label>
                                                        <input 
                                                            className={inputClass("email")} 
                                                            placeholder="your@email.com" 
                                                            value={form.email} 
                                                            onChange={(e) => setForm({ ...form, email: e.target.value })} 
                                                        />
                                                        {errors.email && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.email}</p>}
                                                    </div>
                                                </div>

                                                {/* House No & Colony / Location */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    <div className="sm:col-span-1">
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">House / Flat No *</label>
                                                        <input 
                                                            className={inputClass("houseNo")} 
                                                            placeholder="e.g. Flat 302, A Block" 
                                                            value={form.houseNo} 
                                                            onChange={(e) => setForm({ ...form, houseNo: e.target.value })} 
                                                        />
                                                        {errors.houseNo && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.houseNo}</p>}
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">Colony / Street / Location *</label>
                                                        <input 
                                                            className={inputClass("address")} 
                                                            placeholder="e.g. Sector 70, Noida" 
                                                            value={form.address} 
                                                            onChange={(e) => setForm({ ...form, address: e.target.value })} 
                                                        />
                                                        {errors.address && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.address}</p>}
                                                    </div>
                                                </div>

                                                {/* Landmark & City */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">Landmark</label>
                                                        <input 
                                                            className={inputClass("landmark")} 
                                                            placeholder="e.g. Near Heritage Park" 
                                                            value={form.landmark} 
                                                            onChange={(e) => setForm({ ...form, landmark: e.target.value })} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">City / Town *</label>
                                                        <input 
                                                            className={inputClass("city")} 
                                                            placeholder="e.g. Noida / Delhi" 
                                                            value={form.city} 
                                                            onChange={(e) => setForm({ ...form, city: e.target.value })} 
                                                        />
                                                        {errors.city && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.city}</p>}
                                                    </div>
                                                </div>

                                                {/* State & Pincode */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">State *</label>
                                                        <select 
                                                            className={`${inputClass("state")} appearance-none`}
                                                            value={form.state} 
                                                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                                                        >
                                                            <option value="">Select State</option>
                                                            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                                        </select>
                                                        {errors.state && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.state}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">Pincode *</label>
                                                        <input 
                                                            className={inputClass("pincode")} 
                                                            placeholder="6-digit PIN" 
                                                            value={form.pincode} 
                                                            onChange={(e) => setForm({ ...form, pincode: e.target.value })} 
                                                            maxLength={6} 
                                                        />
                                                        {errors.pincode && <p className="text-[8px] text-red-400 mt-1 font-light uppercase tracking-wider">{errors.pincode}</p>}
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-light block mb-1.5">Customization Requests / Notes</label>
                                                    <textarea 
                                                        className="w-full px-3.5 py-2.5 text-xs bg-[#1d032e]/40 border border-[#c5a880]/30 text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#c5a880] transition-colors resize-none font-light tracking-wide" 
                                                        rows={2} 
                                                        placeholder="Specify height adjustments, custom necklines or sleeve requests..." 
                                                        value={form.note} 
                                                        onChange={(e) => setForm({ ...form, note: e.target.value })} 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-[#c5a880]/15 mt-4">
                                            <button
                                                type="submit"
                                                className="w-full py-4 bg-[#1c1813] text-[#f5ebd9] hover:bg-[#c5a880] hover:text-[#1c1813] text-[9px] uppercase tracking-[0.5em] font-light transition-all duration-500 cursor-pointer shadow-lg"
                                            >
                                                Confirm Royal Order
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* STEP 3: Order Completed Success Screen */}
                                {step === "success" && (
                                    <div className="flex-grow flex flex-col items-center justify-center text-center py-10">
                                        <motion.div 
                                            initial={{ scale: 0 }} 
                                            animate={{ scale: 1 }} 
                                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        >
                                            <CheckCircle size={56} className="text-[#c5a880] mb-6" />
                                        </motion.div>

                                        <p className="text-[8px] uppercase tracking-[0.6em] text-[#c5a880] font-light mb-3">Order Received</p>
                                        
                                        <h3 className="font-editorial text-2xl text-[#1c1813] uppercase tracking-wider mb-4">
                                            Thank You, {form.name.split(" ")[0]}!
                                        </h3>
                                        
                                        <div className="w-10 h-[1px] bg-[#c5a880]/50 mb-5" />
                                        
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#1c1813]/60 font-light leading-relaxed mb-4 max-w-sm">
                                            Your bespoke order for the **{product.name}** in size **{selectedSize}** has been successfully placed.
                                        </p>
                                        
                                        <p className="text-[9px] text-[#1c1813]/55 font-light mb-1.5">
                                            Our concierge team will call you at <strong className="text-[#1c1813]/75">{form.phone}</strong> within 24 hours to confirm your custom measurements and delivery schedule.
                                        </p>
                                        
                                        <div className="bg-[#ece2ce]/40 border border-[#c5a880]/15 p-4 rounded-sm text-left w-full mt-6 space-y-1.5">
                                            <p className="text-[8px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold">Delivery Address</p>
                                            <p className="text-[10px] text-[#1c1813] font-light leading-relaxed">
                                                {form.houseNo}, {form.address}<br />
                                                {form.landmark && `Landmark: ${form.landmark}`}<br />
                                                {form.city}, {form.state} — {form.pincode}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={handleCloseModal}
                                            className="px-8 py-3.5 bg-[#1c1813] text-[#f5ebd9] hover:bg-[#c5a880] hover:text-[#1c1813] text-[9px] uppercase tracking-[0.5em] font-light transition-all duration-500 mt-8 shadow-md"
                                        >
                                            Continue Curation
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
