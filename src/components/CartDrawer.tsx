"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "./CartContext";

type Step = "cart" | "details" | "success";

interface OrderDetails {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    note: string;
}

const emptyDetails: OrderDetails = {
    name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "", note: "",
};

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal",
];

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQty, totalItems } = useCart();
    const [step, setStep] = useState<Step>("cart");
    const [details, setDetails] = useState<OrderDetails>(emptyDetails);
    const [errors, setErrors] = useState<Partial<OrderDetails>>({});

    const totalPrice = items.reduce((sum, item) => {
        const num = parseInt(item.product.price.replace(/[₹,]/g, ""), 10) || 0;
        return sum + num * item.quantity;
    }, 0);

    const formatPrice = (n: number) =>
        "₹" + n.toLocaleString("en-IN");

    const validate = () => {
        const e: Partial<OrderDetails> = {};
        if (!details.name.trim()) e.name = "Required";
        if (!/^[6-9]\d{9}$/.test(details.phone)) e.phone = "Enter valid 10-digit mobile";
        if (details.email && !/\S+@\S+\.\S+/.test(details.email)) e.email = "Invalid email";
        if (!details.address.trim()) e.address = "Required";
        if (!details.city.trim()) e.city = "Required";
        if (!details.state) e.state = "Required";
        if (!/^\d{6}$/.test(details.pincode)) e.pincode = "Enter valid 6-digit pincode";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validate()) return;
        setStep("success");
    };

    const handleClose = () => {
        closeCart();
        setTimeout(() => { setStep("cart"); setDetails(emptyDetails); setErrors({}); }, 400);
    };

    const inputClass = (field: keyof OrderDetails) =>
        `w-full px-3 py-2.5 text-xs bg-white border ${errors[field] ? "border-red-400" : "border-[#c5a880]/30"} text-[#1c1813] placeholder:text-[#1c1813]/35 focus:outline-none focus:border-[#c5a880] transition-colors duration-300 font-light tracking-wide`;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-[#0d0704]/60 backdrop-blur-sm z-[200]"
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#f5ebd9] z-[201] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c5a880]/20 flex-shrink-0">
                            <div>
                                <p className="text-[8px] uppercase tracking-[0.5em] text-[#c5a880] font-light">Anushka Chauhan</p>
                                <h2 className="text-[#1c1813] text-sm font-light tracking-widest uppercase mt-0.5">
                                    {step === "cart" ? `Your Selection (${totalItems})` : step === "details" ? "Delivery Details" : "Order Confirmed"}
                                </h2>
                            </div>
                            <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center border border-[#c5a880]/30 hover:border-[#c5a880] transition-colors duration-300">
                                <X size={14} className="text-[#1c1813]" />
                            </button>
                        </div>

                        {/* ── STEP 1: Cart Items ── */}
                        {step === "cart" && (
                            <>
                                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                                    {items.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                                            <ShoppingBag size={36} className="text-[#c5a880]/40 mb-4" />
                                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#1c1813]/40 font-light">Your cart is empty</p>
                                            <p className="text-[9px] text-[#1c1813]/30 mt-2 font-light">Browse our collections and add pieces</p>
                                        </div>
                                    ) : (
                                        items.map((item) => (
                                            <div key={`${item.product.id}-${item.size}`} className="flex gap-4 pb-5 border-b border-[#c5a880]/15 last:border-0">
                                                <div className="w-20 h-24 flex-shrink-0 overflow-hidden">
                                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover filter brightness-90" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[8px] uppercase tracking-[0.3em] text-[#c5a880] font-light mb-1">{item.product.type}</p>
                                                    <h4 className="text-[#1c1813] text-xs font-light tracking-wide leading-snug mb-1 line-clamp-2">{item.product.name}</h4>
                                                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#1c1813]/45 font-light mb-2">Size: {item.size}</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#1c1813] text-xs font-light tracking-wide">{item.product.price}</span>
                                                        <div className="flex items-center gap-2">
                                                            <button onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)} className="w-6 h-6 border border-[#c5a880]/30 flex items-center justify-center hover:border-[#c5a880] transition-colors">
                                                                <Minus size={8} className="text-[#1c1813]" />
                                                            </button>
                                                            <span className="text-[10px] text-[#1c1813] w-4 text-center font-light">{item.quantity}</span>
                                                            <button onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)} className="w-6 h-6 border border-[#c5a880]/30 flex items-center justify-center hover:border-[#c5a880] transition-colors">
                                                                <Plus size={8} className="text-[#1c1813]" />
                                                            </button>
                                                            <button onClick={() => removeItem(item.product.id, item.size)} className="w-6 h-6 flex items-center justify-center text-[#c5a880]/50 hover:text-red-400 transition-colors ml-1">
                                                                <Trash2 size={11} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {items.length > 0 && (
                                    <div className="px-6 py-5 border-t border-[#c5a880]/20 flex-shrink-0 space-y-3">
                                        <div className="flex justify-between text-xs font-light tracking-wide">
                                            <span className="text-[#1c1813]/60 uppercase tracking-widest text-[9px]">Subtotal</span>
                                            <span className="text-[#1c1813]">{formatPrice(totalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-light tracking-wide">
                                            <span className="text-[#1c1813]/60 uppercase tracking-widest text-[9px]">Shipping</span>
                                            <span className="text-[#c5a880] text-[9px] uppercase tracking-widest">Free</span>
                                        </div>
                                        <div className="w-full h-[1px] bg-[#c5a880]/20" />
                                        <div className="flex justify-between">
                                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#1c1813] font-light">Total</span>
                                            <span className="text-[#1c1813] text-sm font-light tracking-wide">{formatPrice(totalPrice)}</span>
                                        </div>
                                        <button
                                            onClick={() => setStep("details")}
                                            className="w-full py-4 bg-[#1c1813] text-[#f5ebd9] text-[9px] uppercase tracking-[0.5em] font-light hover:bg-[#c5a880] hover:text-[#1c1813] transition-all duration-500 mt-2"
                                        >
                                            Proceed to Order
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* ── STEP 2: Customer Details ── */}
                        {step === "details" && (
                            <>
                                <div className="flex-1 overflow-y-auto px-6 py-5">
                                    {/* Order summary */}
                                    <div className="bg-[#ece2ce]/40 border border-[#c5a880]/15 p-4 mb-6 space-y-1.5">
                                        <p className="text-[8px] uppercase tracking-[0.4em] text-[#c5a880] font-light mb-2">Order Summary</p>
                                        {items.map((item) => (
                                            <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-[9px] text-[#1c1813]/60 font-light">
                                                <span className="truncate mr-2">{item.product.name} × {item.quantity} <span className="text-[#c5a880]/70">({item.size})</span></span>
                                                <span className="flex-shrink-0">{item.product.price}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-[#c5a880]/20 pt-1.5 flex justify-between text-[10px] text-[#1c1813] font-light tracking-wide">
                                            <span>Total</span><span>{formatPrice(totalPrice)}</span>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="space-y-4">
                                        <p className="text-[8px] uppercase tracking-[0.5em] text-[#c5a880] font-light">Personal Details</p>

                                        <div>
                                            <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">Full Name *</label>
                                            <input className={inputClass("name")} placeholder="e.g. Anushka Sharma" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                                            {errors.name && <p className="text-[8px] text-red-400 mt-1">{errors.name}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">Mobile *</label>
                                                <input className={inputClass("phone")} placeholder="10-digit number" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} maxLength={10} />
                                                {errors.phone && <p className="text-[8px] text-red-400 mt-1">{errors.phone}</p>}
                                            </div>
                                            <div>
                                                <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">Email</label>
                                                <input className={inputClass("email")} placeholder="your@email.com" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                                                {errors.email && <p className="text-[8px] text-red-400 mt-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="border-t border-[#c5a880]/15 pt-4">
                                            <p className="text-[8px] uppercase tracking-[0.5em] text-[#c5a880] font-light mb-3">Delivery Address</p>
                                            <div>
                                                <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">Address *</label>
                                                <textarea className={`${inputClass("address")} resize-none`} rows={3} placeholder="House / Flat No., Street, Area, Landmark" value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} />
                                                {errors.address && <p className="text-[8px] text-red-400 mt-1">{errors.address}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">City *</label>
                                                <input className={inputClass("city")} placeholder="City" value={details.city} onChange={(e) => setDetails({ ...details, city: e.target.value })} />
                                                {errors.city && <p className="text-[8px] text-red-400 mt-1">{errors.city}</p>}
                                            </div>
                                            <div>
                                                <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">Pincode *</label>
                                                <input className={inputClass("pincode")} placeholder="6-digit" value={details.pincode} onChange={(e) => setDetails({ ...details, pincode: e.target.value })} maxLength={6} />
                                                {errors.pincode && <p className="text-[8px] text-red-400 mt-1">{errors.pincode}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">State *</label>
                                            <select className={`${inputClass("state")} appearance-none`} value={details.state} onChange={(e) => setDetails({ ...details, state: e.target.value })}>
                                                <option value="">Select State</option>
                                                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                            {errors.state && <p className="text-[8px] text-red-400 mt-1">{errors.state}</p>}
                                        </div>

                                        <div>
                                            <label className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/50 font-light block mb-1.5">Special Note</label>
                                            <textarea className="w-full px-3 py-2.5 text-xs bg-white border border-[#c5a880]/30 text-[#1c1813] placeholder:text-[#1c1813]/35 focus:outline-none focus:border-[#c5a880] transition-colors resize-none font-light tracking-wide" rows={2} placeholder="Customisation requests, occasion, delivery notes..." value={details.note} onChange={(e) => setDetails({ ...details, note: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-5 border-t border-[#c5a880]/20 flex-shrink-0 space-y-3">
                                    <button onClick={handlePlaceOrder} className="w-full py-4 bg-[#1c1813] text-[#f5ebd9] text-[9px] uppercase tracking-[0.5em] font-light hover:bg-[#c5a880] hover:text-[#1c1813] transition-all duration-500">
                                        Place Order · {formatPrice(totalPrice)}
                                    </button>
                                    <button onClick={() => setStep("cart")} className="w-full py-2.5 border border-[#c5a880]/30 text-[#1c1813]/60 text-[8px] uppercase tracking-[0.4em] font-light hover:border-[#c5a880] transition-colors duration-300">
                                        ← Back to Cart
                                    </button>
                                </div>
                            </>
                        )}

                        {/* ── STEP 3: Success ── */}
                        {step === "success" && (
                            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                                    <CheckCircle size={56} className="text-[#c5a880] mb-6" />
                                </motion.div>
                                <p className="text-[8px] uppercase tracking-[0.6em] text-[#c5a880] font-light mb-3">Order Received</p>
                                <h3 className="font-editorial text-2xl text-[#1c1813] uppercase tracking-wider mb-4">Thank You, {details.name.split(" ")[0]}!</h3>
                                <div className="w-10 h-[1px] bg-[#c5a880]/50 mb-5" />
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1c1813]/55 font-light leading-relaxed mb-2">
                                    Your order for {totalItems} piece{totalItems > 1 ? "s" : ""} totalling {formatPrice(totalPrice)} has been placed.
                                </p>
                                <p className="text-[9px] text-[#1c1813]/40 font-light mb-2">We will call you at <strong className="text-[#1c1813]/60">{details.phone}</strong> within 24 hours to confirm.</p>
                                {details.email && <p className="text-[9px] text-[#1c1813]/40 font-light mb-8">Confirmation email sent to <strong className="text-[#1c1813]/60">{details.email}</strong></p>}
                                <p className="text-[8px] uppercase tracking-[0.3em] text-[#1c1813]/40 font-light mb-8">Delivery to: {details.city}, {details.state} — {details.pincode}</p>
                                <button onClick={handleClose} className="px-8 py-3 bg-[#1c1813] text-[#f5ebd9] text-[9px] uppercase tracking-[0.5em] font-light hover:bg-[#c5a880] hover:text-[#1c1813] transition-all duration-500">
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
