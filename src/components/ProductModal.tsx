"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, Ruler, Star, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
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
    const [step, setStep] = useState<"product" | "form" | "payment" | "success">("product");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [form, setForm] = useState<OrderForm>(emptyForm);
    const [errors, setErrors] = useState<Partial<OrderForm>>({});

    // Payment States
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking" | "qr">("card");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [cardName, setCardName] = useState("");
    const [upiId, setUpiId] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [qrCountdown, setQrCountdown] = useState(5);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [orderId, setOrderId] = useState("");

    const { addItem, openAIStylist } = useCart();

    const handleAddToCart = () => {
        if (!product) return;
        if (!selectedSize) {
            alert("Please select a size first.");
            return;
        }
        addItem(product, selectedSize, quantity);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            onClose();
        }, 1200);
    };

    const handleOrderViaWhatsApp = () => {
        if (!product) return;
        if (!selectedSize) {
            alert("Please select a size first.");
            return;
        }
        const message = `Hello, I would like to order the following piece:

Product: ${product.name}
Price: ${product.price}
Size: ${selectedSize}
Quantity: ${quantity}

Please let me know how to proceed. Thank you!`;
        
        const whatsappUrl = `https://wa.me/919041588678?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
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
        setStep("payment");
    };

    const handleCompletePayment = async (methodName: string) => {
        if (!product) return;
        setIsPaymentProcessing(true);
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: {
                        name: form.name,
                        phone: form.phone,
                        email: form.email || "no-email@anushkachauhan.in",
                        houseNo: form.houseNo,
                        address: form.address,
                        landmark: form.landmark,
                        city: form.city,
                        state: form.state,
                        pincode: form.pincode,
                        note: form.note
                    },
                    item: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        size: selectedSize,
                        quantity: quantity
                    },
                    payment: {
                        method: methodName,
                        status: "Paid"
                    }
                })
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setOrderId(result.data.id);
                setStep("success");
            } else {
                alert(result.error || "Payment verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment API Error:", error);
            alert("A network error occurred while processing payment.");
        } finally {
            setIsPaymentProcessing(false);
        }
    };

    const handleSubmitCardPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (cardNumber.replace(/\s/g, "").length !== 16) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            alert("Please enter a valid expiry date (MM/YY).");
            return;
        }
        if (cardCvv.length !== 3) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }
        if (!cardName.trim()) {
            alert("Please enter cardholder name.");
            return;
        }
        handleCompletePayment("Credit/Debit Card");
    };

    const handleSubmitUpiPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!upiId.includes("@")) {
            alert("Please enter a valid UPI ID (e.g., name@upi).");
            return;
        }
        handleCompletePayment(`UPI Pay (${upiId})`);
    };

    const handleSubmitNetbankingPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBank) {
            alert("Please select your bank.");
            return;
        }
        handleCompletePayment(`Net Banking (${selectedBank})`);
    };

    // QR Code payment simulated timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === "payment" && paymentMethod === "qr" && qrCountdown > 0 && !isPaymentProcessing) {
            timer = setTimeout(() => {
                setQrCountdown(prev => prev - 1);
            }, 1000);
        } else if (step === "payment" && paymentMethod === "qr" && qrCountdown === 0 && !isPaymentProcessing) {
            handleCompletePayment("QR Code Scan");
        }
        return () => clearTimeout(timer);
    }, [step, paymentMethod, qrCountdown, isPaymentProcessing]);

    const handleCloseModal = () => {
        onClose();
        // Reset states after modal finishes exiting
        setTimeout(() => {
            setStep("product");
            setSelectedSize("");
            setQuantity(1);
            setForm(emptyForm);
            setErrors({});
            // Reset payment states
            setPaymentMethod("card");
            setCardNumber("");
            setCardExpiry("");
            setCardCvv("");
            setCardName("");
            setUpiId("");
            setSelectedBank("");
            setQrCountdown(5);
            setOrderId("");
        }, 300);
    };

    const inputClass = (field: keyof OrderForm) =>
        `w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border ${
            errors[field] ? "border-red-400" : "border-[#cca09d]/40"
        } text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#cca09d] transition-colors duration-300 font-semibold tracking-wide`;

    if (!product) return null;

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
                            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border border-[#cca09d]/30 hover:border-[#cca09d] transition-all duration-300 bg-[#f5ebd9]"
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
                                    <div className="absolute top-6 left-6 text-[8px] uppercase tracking-[0.4em] px-3 py-1.5 bg-[#cca09d] text-[#f5ebd9] font-bold">
                                        {product.tag}
                                    </div>
                                )}

                                {/* Subtle Overlay showing active cart total on Success/Form steps */}
                                {step !== "product" && (
                                    <div className="absolute inset-0 bg-[#35020c]/85 backdrop-blur-xs flex flex-col justify-end p-8 md:p-12 text-[#f5eedc]">
                                        <p className="text-[9px] uppercase tracking-[0.45em] text-[#e8d6b3] font-semibold mb-2">Order summary</p>
                                        <h3 className="font-editorial text-xl font-bold uppercase tracking-wider mb-1">{product.name}</h3>
                                        <p className="text-xs uppercase tracking-widest text-[#f5eedc]/80 font-semibold mb-4">Size: {selectedSize}</p>
                                        <div className="w-12 h-[1px] bg-[#e8d6b3]/30 mb-4" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] uppercase tracking-widest text-[#f5eedc]/70 font-semibold">Total Price</span>
                                            <span className="text-2xl font-bold tracking-wide text-[#e8d6b3]">{product.price}</span>
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
                                            <p className="text-[9px] uppercase tracking-[0.6em] text-[#9c6d68] font-bold mb-3">
                                                Anushka Chauhan — {product.category}
                                            </p>

                                            <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl text-[#1c1813] tracking-wide uppercase leading-tight mb-2 font-bold">
                                                {product.name}
                                            </h2>

                                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9c6d68] font-semibold mb-4">
                                                {product.type} · {product.fabric}
                                            </p>

                                            {product.rating && (
                                                <div className="flex items-center gap-2 mb-5">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={11}
                                                            className={i < Math.floor(product.rating!) ? "fill-[#9c6d68] text-[#9c6d68]" : "text-[#9c6d68]/30"}
                                                        />
                                                    ))}
                                                    <span className="text-[9px] text-[#1c1813]/80 uppercase tracking-widest font-semibold">
                                                        {product.reviews} reviews
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-baseline gap-3 mb-6">
                                                <span className="text-2xl md:text-3xl text-[#1c1813] font-bold tracking-wide">
                                                    {product.price}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-[#1c1813]/60 line-through font-semibold">{product.originalPrice}</span>
                                                )}
                                            </div>

                                            <div className="w-12 h-[1px] bg-[#cca09d]/40 mb-6" />

                                            <p className="text-[#1c1813]/80 text-xs leading-relaxed font-medium mb-7">
                                                {product.description}
                                            </p>

                                            <ul className="space-y-2 mb-8">
                                                {product.details.map((d, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-[9.5px] uppercase tracking-[0.2em] text-[#1c1813]/85 font-semibold">
                                                        <span className="text-[#9c6d68] mt-[2px]">—</span>
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mb-8">
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-[9px] uppercase tracking-[0.4em] text-[#1c1813]/75 font-semibold">
                                                        Select Size
                                                    </p>
                                                    <button className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-[#9c6d68] font-semibold">
                                                        <Ruler size={10} /> Size Guide
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.sizes.map((size) => (
                                                        <button
                                                            key={size}
                                                            onClick={() => setSelectedSize(size)}
                                                            className={`px-4 py-2 text-[9px] uppercase tracking-[0.3em] border transition-all duration-300 font-semibold cursor-pointer ${selectedSize === size
                                                                ? "border-[#9c6d68] bg-[#9c6d68]/10 text-[#1c1813]"
                                                                : "border-[#cca09d]/25 text-[#1c1813]/70 hover:border-[#9c6d68]/60"
                                                                }`}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Quantity Selector */}
                                            <div className="mb-8">
                                                <p className="text-[9px] uppercase tracking-[0.4em] text-[#1c1813]/75 font-semibold mb-3">
                                                    Quantity
                                                </p>
                                                <div className="flex items-center border border-[#1c1813] w-32 justify-between">
                                                    <button
                                                        type="button"
                                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                        className="px-4 py-2 text-xs text-[#1c1813] hover:bg-[#1c1813]/5 transition-colors cursor-pointer font-bold select-none bg-transparent border-none"
                                                    >
                                                        —
                                                    </button>
                                                    <span className="text-xs text-[#1c1813] font-bold select-none">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setQuantity(prev => prev + 1)}
                                                        className="px-4 py-2 text-xs text-[#1c1813] hover:bg-[#1c1813]/5 transition-colors cursor-pointer font-bold select-none bg-transparent border-none"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            {/* ADD TO CART Button */}
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleAddToCart}
                                                className={`w-full py-4 text-[9.5px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 transition-all duration-500 border cursor-pointer ${added
                                                    ? "bg-[#5a7a5a] text-white border-[#5a7a5a]"
                                                    : "bg-[#1c1813] text-[#f5ebd9] border-[#1c1813] hover:bg-[#9c6d68] hover:text-[#1c1813]"
                                                }`}
                                            >
                                                <ShoppingBag size={13} />
                                                {added ? "Added ✓" : "Add to Cart"}
                                            </motion.button>

                                            {/* ORDER VIA WHATSAPP Button */}
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleOrderViaWhatsApp}
                                                className="w-full py-4 bg-white text-[#1c1813] border border-[#1c1813] hover:bg-[#1c1813]/5 text-[9.5px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-500 shadow-sm"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4 text-[#25D366] fill-[#25D366]/10 shrink-0"
                                                >
                                                    <path d="M22 11.57a9 9 0 0 1-9 9 8.9 8.9 0 0 1-4.47-1.18L3 21l1.62-4.83A9 9 0 0 1 3.5 11.57a9 9 0 0 1 18 0Z" />
                                                    <path d="M9 8.5c.19-.29.45-.39.73-.39.28 0 .54.1.73.39l.81 1.22c.2.3.15.71-.11.96l-.32.31a.48.48 0 0 0-.1.49c.19.43.49.83.87 1.21.38.38.78.68 1.21.87.18.08.39.02.49-.1l.31-.32c.25-.26.66-.31.96-.11l1.22.81c.29.19.39.45.39.73 0 .28-.1.54-.39.73l-.53.53c-.45.45-1.13.56-1.7.27a8.3 8.3 0 0 1-4.22-4.22c-.29-.57-.18-1.25.27-1.7l.53-.53Z" />
                                                </svg>
                                                Order via WhatsApp
                                            </motion.button>
                                            
                                            {/* Secondary Actions Row */}
                                            <div className="flex gap-2.5 mt-1">
                                                <motion.button
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleProceedToOrder}
                                                    className="flex-grow py-3 border border-[#1c1813]/25 text-[#1c1813]/85 hover:bg-[#cca09d]/10 text-[9px] uppercase tracking-[0.25em] font-bold cursor-pointer transition-all duration-300"
                                                >
                                                    Direct Checkout
                                                </motion.button>
                                                
                                                <motion.button
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        onClose();
                                                        openAIStylist(product);
                                                    }}
                                                    className="flex-grow py-3 border border-[#9c6d68] text-[#9c6d68] text-[9px] uppercase tracking-[0.25em] font-bold hover:bg-[#9c6d68] hover:text-[#1c1813] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    ✨ Anushka&apos;s Atelier
                                                </motion.button>

                                                <button className="px-4 py-3 border border-[#cca09d]/30 flex items-center justify-center hover:border-[#cca09d] hover:bg-[#cca09d]/10 transition-all duration-300">
                                                    <Heart size={13} className="text-[#9c6d68]" />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-[9.5px] uppercase tracking-[0.3em] text-[#1c1813]/60 font-semibold mt-6 text-center">
                                            Free shipping across India · Custom sizing available
                                        </p>
                                    </div>
                                )}

                                {/* STEP 2: Custom Checkout Details Form */}
                                {step === "form" && (
                                    <form onSubmit={handlePlaceDirectOrder} className="flex-grow flex flex-col justify-between">
                                        <div>
                                            {/* Subheader */}
                                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#cca09d]/20">
                                                <button 
                                                    type="button"
                                                    onClick={() => setStep("product")}
                                                    className="text-[9px] uppercase tracking-[0.2em] text-[#9c6d68] hover:text-[#1c1813] transition-colors font-bold"
                                                >
                                                    &larr; Back to Details
                                                </button>
                                                <div className="text-right">
                                                    <span className="text-[7.5px] uppercase tracking-widest text-[#1c1813]/60 block font-semibold">Selected Size</span>
                                                    <span className="text-[10px] uppercase font-bold text-[#1c1813] tracking-widest">{selectedSize}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-editorial text-xl text-[#1c1813] uppercase tracking-wider mb-6 font-bold">Delivery Details</h3>
                                            
                                            {/* Scrollable Form Fields */}
                                            <div className="space-y-4 max-h-[calc(100vh-22rem)] overflow-y-auto pr-2 custom-scrollbar">
                                                {/* Full Name */}
                                                <div>
                                                    <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Full Name *</label>
                                                    <input 
                                                        className={inputClass("name")} 
                                                        placeholder="e.g. Anushka Sharma" 
                                                        value={form.name} 
                                                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                                                    />
                                                    {errors.name && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.name}</p>}
                                                </div>

                                                {/* Mobile Number & Email */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Mobile Number *</label>
                                                        <input 
                                                            className={inputClass("phone")} 
                                                            placeholder="10-digit number" 
                                                            value={form.phone} 
                                                            onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                                                            maxLength={10} 
                                                        />
                                                        {errors.phone && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.phone}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Email Address</label>
                                                        <input 
                                                            className={inputClass("email")} 
                                                            placeholder="your@email.com" 
                                                            value={form.email} 
                                                            onChange={(e) => setForm({ ...form, email: e.target.value })} 
                                                        />
                                                        {errors.email && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.email}</p>}
                                                    </div>
                                                </div>

                                                {/* House No & Colony / Location */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    <div className="sm:col-span-1">
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">House / Flat No *</label>
                                                        <input 
                                                            className={inputClass("houseNo")} 
                                                            placeholder="e.g. Flat 302, A Block" 
                                                            value={form.houseNo} 
                                                            onChange={(e) => setForm({ ...form, houseNo: e.target.value })} 
                                                        />
                                                        {errors.houseNo && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.houseNo}</p>}
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Colony / Street / Location *</label>
                                                        <input 
                                                            className={inputClass("address")} 
                                                            placeholder="e.g. Sector 70, Noida" 
                                                            value={form.address} 
                                                            onChange={(e) => setForm({ ...form, address: e.target.value })} 
                                                        />
                                                        {errors.address && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.address}</p>}
                                                    </div>
                                                </div>

                                                {/* Landmark & City */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Landmark</label>
                                                        <input 
                                                            className={inputClass("landmark")} 
                                                            placeholder="e.g. Near Heritage Park" 
                                                            value={form.landmark} 
                                                            onChange={(e) => setForm({ ...form, landmark: e.target.value })} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">City / Town *</label>
                                                        <input 
                                                            className={inputClass("city")} 
                                                            placeholder="e.g. Noida / Delhi" 
                                                            value={form.city} 
                                                            onChange={(e) => setForm({ ...form, city: e.target.value })} 
                                                        />
                                                        {errors.city && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.city}</p>}
                                                    </div>
                                                </div>

                                                {/* State & Pincode */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">State *</label>
                                                        <select 
                                                            className={`${inputClass("state")} appearance-none`}
                                                            value={form.state} 
                                                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                                                        >
                                                            <option value="">Select State</option>
                                                            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                                        </select>
                                                        {errors.state && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.state}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Pincode *</label>
                                                        <input 
                                                            className={inputClass("pincode")} 
                                                            placeholder="6-digit PIN" 
                                                            value={form.pincode} 
                                                            onChange={(e) => setForm({ ...form, pincode: e.target.value })} 
                                                            maxLength={6} 
                                                        />
                                                        {errors.pincode && <p className="text-[8px] text-red-500 mt-1 font-semibold uppercase tracking-wider">{errors.pincode}</p>}
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Customization Requests / Notes</label>
                                                    <textarea 
                                                        className="w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border border-[#cca09d]/30 text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#cca09d] transition-colors resize-none font-medium tracking-wide" 
                                                        rows={2} 
                                                        placeholder="Specify height adjustments, custom necklines or sleeve requests..." 
                                                        value={form.note} 
                                                        onChange={(e) => setForm({ ...form, note: e.target.value })} 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-[#cca09d]/15 mt-4">
                                            <button
                                                type="submit"
                                                className="w-full py-4 bg-[#1c1813] text-[#f5ebd9] hover:bg-[#9c6d68] hover:text-[#1c1813] text-[9.5px] uppercase tracking-[0.5em] font-bold transition-all duration-500 cursor-pointer shadow-lg"
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
                                            <CheckCircle size={56} className="text-[#9c6d68] mb-6" />
                                        </motion.div>

                                        <p className="text-[8.5px] uppercase tracking-[0.6em] text-[#9c6d68] font-bold mb-3">Order Received</p>
                                        
                                        <h3 className="font-editorial text-xl sm:text-2xl text-[#1c1813] uppercase tracking-wider mb-4 font-bold">
                                            Thank You, {form.name.split(" ")[0]}!
                                        </h3>
                                        
                                        <div className="w-10 h-[1px] bg-[#cca09d]/50 mb-5" />
                                        
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#1c1813]/70 font-semibold leading-relaxed mb-4 max-w-sm">
                                            Your bespoke order for **{product.name}** (Size **{selectedSize}**) has been successfully placed. Order ID is <strong className="text-[#9c6d68] font-bold tracking-wider">{orderId}</strong>.
                                        </p>
                                        
                                        <p className="text-[9.5px] text-[#1c1813]/70 font-medium mb-1.5">
                                            Our concierge team will call you at <strong className="text-[#1c1813] font-bold">{form.phone}</strong> within 24 hours to confirm your custom measurements and delivery schedule.
                                        </p>
                                        
                                        <div className="bg-[#9c6d68]/10 border border-[#9c6d68]/35 rounded-sm p-4 w-full text-center space-y-1 my-5">
                                            <p className="text-[9.5px] uppercase tracking-[0.25em] text-[#9c6d68] font-bold">Important Notice</p>
                                            <p className="text-[11px] text-[#1c1813] font-medium leading-relaxed">
                                                Every Anushka Chauhan piece is handcrafted with exceptional care. Your order will take approximately <strong className="font-bold">45 days</strong> for delivery.
                                            </p>
                                        </div>
                                        
                                        <div className="bg-[#ece2ce]/40 border border-[#cca09d]/15 p-4 rounded-sm text-left w-full mt-6 space-y-1.5">
                                            <p className="text-[8px] uppercase tracking-[0.3em] text-[#9c6d68] font-bold">Delivery Address</p>
                                            <p className="text-[10px] text-[#1c1813] font-semibold leading-relaxed">
                                                {form.houseNo}, {form.address}<br />
                                                {form.landmark && `Landmark: ${form.landmark}`}<br />
                                                {form.city}, {form.state} — {form.pincode}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2.5 w-full mt-8">
                                            <a
                                                href={`/pages/track-order?id=${orderId}`}
                                                onClick={handleCloseModal}
                                                className="w-full py-4 bg-[#9c6d68] text-[#1c1813] hover:bg-[#1c1813] hover:text-[#f5ebd9] text-[9.5px] uppercase tracking-[0.4em] font-bold transition-all duration-500 shadow-md text-center inline-block"
                                            >
                                                Track Your Live Order
                                            </a>
                                            <button 
                                                onClick={handleCloseModal}
                                                className="w-full py-4 border border-[#1c1813] hover:bg-[#1c1813]/5 text-[9.5px] uppercase tracking-[0.4em] font-bold transition-all duration-500 cursor-pointer text-center bg-transparent"
                                            >
                                                Continue Curation
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2.5: Immersive Payment Step */}
                                {step === "payment" && (
                                    <div className="flex-grow flex-col justify-between flex">
                                        <div>
                                            {/* Subheader */}
                                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#cca09d]/20">
                                                <button 
                                                    type="button"
                                                    onClick={() => setStep("form")}
                                                    className="text-[9px] uppercase tracking-[0.2em] text-[#9c6d68] hover:text-[#1c1813] transition-colors font-bold bg-transparent border-none cursor-pointer"
                                                >
                                                    &larr; Back to Shipping
                                                </button>
                                                <div className="text-right">
                                                    <span className="text-[7.5px] uppercase tracking-widest text-[#1c1813]/60 block font-semibold">Total Price</span>
                                                    <span className="text-xs font-bold text-[#9c6d68] tracking-widest">{product.price}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-editorial text-xl text-[#1c1813] uppercase tracking-wider mb-6 font-bold">Select Payment Method</h3>
                                            
                                            {/* Tab Selectors */}
                                            <div className="grid grid-cols-4 gap-1 mb-6">
                                                {(["card", "upi", "netbanking", "qr"] as const).map((method) => (
                                                    <button
                                                        key={method}
                                                        type="button"
                                                        onClick={() => {
                                                            setPaymentMethod(method);
                                                            if (method === "qr") setQrCountdown(5); // Reset countdown
                                                        }}
                                                        className={`py-2 px-1 text-[8px] sm:text-[9px] uppercase tracking-wider border font-bold transition-all duration-300 cursor-pointer ${
                                                            paymentMethod === method
                                                                ? "border-[#9c6d68] bg-[#9c6d68]/10 text-[#1c1813]"
                                                                : "border-[#cca09d]/25 text-[#1c1813]/70 hover:border-[#9c6d68]/50 bg-transparent"
                                                        }`}
                                                    >
                                                        {method === "card" && "Card"}
                                                        {method === "upi" && "UPI"}
                                                        {method === "netbanking" && "Net Banking"}
                                                        {method === "qr" && "QR Code"}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* TAB CONTENT: CARD */}
                                            {paymentMethod === "card" && (
                                                <form onSubmit={handleSubmitCardPayment} className="space-y-4">
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Cardholder Name</label>
                                                        <input
                                                            required
                                                            className="w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border border-[#cca09d]/40 text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#cca09d] font-semibold tracking-wide"
                                                            placeholder="Anushka Chauhan"
                                                            value={cardName}
                                                            onChange={(e) => setCardName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Card Number</label>
                                                        <input
                                                            required
                                                            className="w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border border-[#cca09d]/40 text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#cca09d] font-semibold tracking-wide"
                                                            placeholder="1234 5678 1234 5678"
                                                            value={cardNumber}
                                                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Expiry Date</label>
                                                            <input
                                                                required
                                                                className="w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border border-[#cca09d]/40 text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#cca09d] font-semibold tracking-wide"
                                                                placeholder="MM/YY"
                                                                value={cardExpiry}
                                                                onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">CVV</label>
                                                            <input
                                                                required
                                                                type="password"
                                                                className="w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border border-[#cca09d]/40 text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#cca09d] font-semibold tracking-wide"
                                                                placeholder="123"
                                                                value={cardCvv}
                                                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={isPaymentProcessing}
                                                        className="w-full mt-6 py-4 bg-[#1c1813] text-[#f5ebd9] hover:bg-[#9c6d68] hover:text-[#1c1813] text-[9.5px] uppercase tracking-[0.5em] font-bold transition-all duration-500 cursor-pointer shadow-lg disabled:opacity-50"
                                                    >
                                                        {isPaymentProcessing ? "Processing..." : `Pay ${product.price}`}
                                                    </button>
                                                </form>
                                            )}

                                            {/* TAB CONTENT: UPI */}
                                            {paymentMethod === "upi" && (
                                                <form onSubmit={handleSubmitUpiPayment} className="space-y-4">
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Enter Virtual Payment Address (UPI ID)</label>
                                                        <input
                                                            required
                                                            className="w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border border-[#cca09d]/40 text-[#f5ebd9] placeholder:text-[#f5ebd9]/30 focus:outline-none focus:border-[#cca09d] font-semibold tracking-wide"
                                                            placeholder="username@upi"
                                                            value={upiId}
                                                            onChange={(e) => setUpiId(e.target.value)}
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={isPaymentProcessing}
                                                        className="w-full mt-6 py-4 bg-[#1c1813] text-[#f5ebd9] hover:bg-[#9c6d68] hover:text-[#1c1813] text-[9.5px] uppercase tracking-[0.5em] font-bold transition-all duration-500 cursor-pointer shadow-lg disabled:opacity-50"
                                                    >
                                                        {isPaymentProcessing ? "Processing..." : `Pay ${product.price} via UPI`}
                                                    </button>
                                                </form>
                                            )}

                                            {/* TAB CONTENT: NET BANKING */}
                                            {paymentMethod === "netbanking" && (
                                                <form onSubmit={handleSubmitNetbankingPayment} className="space-y-4">
                                                    <div>
                                                        <label className="text-[8.5px] uppercase tracking-[0.3em] text-[#1c1813]/80 font-bold block mb-1.5">Select Bank</label>
                                                        <select
                                                            required
                                                            className="w-full px-3.5 py-2.5 text-xs bg-[#2c1619]/40 border border-[#cca09d]/40 text-[#f5ebd9] focus:outline-none focus:border-[#cca09d] font-semibold tracking-wide"
                                                            value={selectedBank}
                                                            onChange={(e) => setSelectedBank(e.target.value)}
                                                        >
                                                            <option value="">-- Choose Your Bank --</option>
                                                            <option value="SBI">State Bank of India</option>
                                                            <option value="HDFC">HDFC Bank</option>
                                                            <option value="ICICI">ICICI Bank</option>
                                                            <option value="Axis">Axis Bank</option>
                                                            <option value="Kotak">Kotak Mahindra Bank</option>
                                                        </select>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={isPaymentProcessing}
                                                        className="w-full mt-6 py-4 bg-[#1c1813] text-[#f5ebd9] hover:bg-[#9c6d68] hover:text-[#1c1813] text-[9.5px] uppercase tracking-[0.5em] font-bold transition-all duration-500 cursor-pointer shadow-lg disabled:opacity-50"
                                                    >
                                                        {isPaymentProcessing ? "Processing..." : `Pay ${product.price} via Net Banking`}
                                                    </button>
                                                </form>
                                            )}

                                            {/* TAB CONTENT: QR CODE */}
                                            {paymentMethod === "qr" && (
                                                <div className="flex flex-col items-center py-4 space-y-4 text-center">
                                                    <p className="text-[10px] uppercase tracking-wider text-[#1c1813]/70 font-semibold max-w-xs leading-normal">
                                                        Scan this QR code with your phone using any UPI app (GPay, PhonePe, Paytm) to complete payment.
                                                    </p>
                                                    {/* Mock QR Code UI */}
                                                    <div className="w-40 h-40 border border-[#cca09d]/40 bg-white p-3 flex items-center justify-center rounded-sm relative shadow-md">
                                                        <img
                                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=business@anushkachauhan%26pn=Anushka%20Chauhan%20Couture%26am=${product.price.replace(/[^0-9.]/g, "")}`}
                                                            alt="Payment QR Code Mockup"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="text-[10px] uppercase tracking-widest text-[#9c6d68] font-bold flex items-center gap-2 animate-pulse mt-2">
                                                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-ping" />
                                                        Detecting payment automatically... {qrCountdown}s
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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
