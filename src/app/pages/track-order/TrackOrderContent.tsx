"use client";

import React, { useState, useEffect, useRef } from "react";
import PageShell from "@/components/PageShell";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Package, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Search, 
  Compass
} from "lucide-react";

interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    houseNo: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    note: string;
  };
  item: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    size: string;
    quantity: number;
  };
  payment: {
    method: string;
    status: string;
    timestamp: string;
  };
  status: "Pending" | "Confirmed" | "Tailoring" | "Shipped" | "Out for Delivery" | "Delivered";
  location: string;
  createdAt: string;
}

export default function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlId = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(urlId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fetch order details
  const fetchOrder = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to connect to server");
      const result = await res.json();
      if (result.success) {
        const found = result.data.find((o: Order) => o.id.toLowerCase() === id.trim().toLowerCase());
        if (found) {
          setOrder(found);
        } else {
          setOrder(null);
          setError("No order found with this ID. Please double check.");
        }
      }
    } catch (err) {
      setError("Unable to connect to order server.");
    } finally {
      setLoading(false);
    }
  };

  // Poll for updates if an order is active
  useEffect(() => {
    if (urlId) {
      fetchOrder(urlId);
      setSearchId(urlId);
    }
  }, [urlId]);

  useEffect(() => {
    if (!order) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/orders");
        const result = await res.json();
        if (result.success) {
          const found = result.data.find((o: Order) => o.id === order.id);
          if (found) {
            setOrder(found);
          }
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [order?.id]);

  // Canvas map drawing
  useEffect(() => {
    if (!order || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let progress = 0;
    
    // Nodes coordinate setup
    const startX = 60;
    const startY = 140;
    const endX = 340;
    const endY = 80;

    const drawMap = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid styling (luxury blueprint look)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw stylized Delhi NCR map contour
      ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(200, 110, 90, 0, Math.PI * 2);
      ctx.stroke();

      // Label Noida Atelier Studio
      ctx.fillStyle = "#aa9775";
      ctx.beginPath();
      ctx.arc(startX, startY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(170, 151, 117, 0.2)";
      ctx.beginPath();
      ctx.arc(startX, startY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#aa9775";
      ctx.font = "bold 8px Courier New";
      ctx.fillText("ATELIER NOIDA (A-87)", startX - 10, startY + 22);

      // Label Destination (Customer Address City)
      ctx.fillStyle = "#f5ebd9";
      ctx.beginPath();
      ctx.arc(endX, endY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(245, 235, 217, 0.15)";
      ctx.beginPath();
      ctx.arc(endX, endY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f5ebd9";
      ctx.fillText(`DELIVERY POINT (${order.customer.city.toUpperCase()})`, endX - 40, endY - 15);

      // Draw dashed transit line path
      ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(200, 180, endX, endY);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Calculate courier location coordinate based on transit status
      let statusFactor = 0;
      switch (order.status) {
        case "Confirmed":
          statusFactor = 0;
          break;
        case "Tailoring":
          statusFactor = 0.15;
          break;
        case "Shipped":
          statusFactor = 0.55;
          break;
        case "Out for Delivery":
          statusFactor = 0.85;
          break;
        case "Delivered":
          statusFactor = 1.0;
          break;
        default:
          statusFactor = 0;
      }

      // Smooth pulsing effect for courier pin
      progress = statusFactor;
      const t = progress;
      const currentX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * 200 + t * t * endX;
      const currentY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * 180 + t * t * endY;

      // Draw courier status point
      if (statusFactor > 0 && statusFactor < 1.0) {
        const pulse = Math.abs(Math.sin(Date.now() / 400)) * 6;
        ctx.fillStyle = "#25D366";
        ctx.beginPath();
        ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(37, 211, 102, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6 + pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#25D366";
        ctx.font = "bold 7.5px sans-serif";
        ctx.fillText("COURIER TRANSIT", currentX - 35, currentY - 12);
      }

      animationFrameId = requestAnimationFrame(drawMap);
    };

    drawMap();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [order]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      router.push(`/pages/track-order?id=${searchId.trim()}`);
    }
  };

  const getStatusIndex = (status: string) => {
    const sequence = ["Pending", "Confirmed", "Tailoring", "Shipped", "Out for Delivery", "Delivered"];
    return sequence.indexOf(status);
  };

  const currentStatusIdx = order ? getStatusIndex(order.status) : 0;

  const steps = [
    { label: "Confirmed", desc: "Bespoke order approved", icon: CheckCircle2 },
    { label: "Tailoring", desc: "Artisan handcrafting", icon: Clock },
    { label: "Shipped", desc: "Dispatched from Studio", icon: Truck },
    { label: "Out for Delivery", desc: "Arrived at destination hub", icon: MapPin },
    { label: "Delivered", desc: "Received at doorstep", icon: Package }
  ];

  return (
    <PageShell>
      <div className="min-h-screen bg-[#1c1813] text-[#f5ebd9] pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#aa9775] font-bold mb-3">CONCIERGE SERVICES</p>
            <h1 className="font-editorial text-3xl md:text-4xl text-[#f5ebd9] uppercase tracking-wider">Live Couture Tracker</h1>
            <div className="w-12 h-[1px] bg-[#aa9775] mx-auto mt-4" />
          </div>

          {/* Search Box */}
          <div className="bg-[#12011b]/35 border border-[#aa9775]/25 p-6 rounded-sm mb-10 shadow-lg">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aa9775]" size={15} />
                <input
                  required
                  type="text"
                  placeholder="Enter Order ID (e.g. AC-48201)"
                  className="w-full pl-11 pr-4 py-3 text-xs bg-[#1c1813]/80 border border-[#c5a880]/30 text-[#f5ebd9] placeholder:text-[#f5ebd9]/45 focus:outline-none focus:border-[#aa9775] font-semibold tracking-widest uppercase"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#aa9775] text-[#1c1813] hover:bg-[#f5ebd9] hover:text-[#1c1813] text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 cursor-pointer shadow-md disabled:opacity-50"
              >
                {loading ? "Searching..." : "Track Status"}
              </button>
            </form>
            {error && <p className="text-xs text-red-400 mt-3 font-semibold uppercase tracking-wider text-center">{error}</p>}
          </div>

          {/* Track Details */}
          {order ? (
            <div className="space-y-8">
              {/* Row 1: Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#12011b]/20 border border-[#c5a880]/15 p-6 rounded-sm">
                <div className="md:col-span-4 flex items-center gap-4">
                  <div className="w-20 h-24 bg-[#1c1813] border border-[#c5a880]/15 overflow-hidden shrink-0">
                    <img
                      src={order.item.imageUrl}
                      alt={order.item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-editorial text-base text-[#f5ebd9] font-bold leading-snug">{order.item.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-[#aa9775] mt-1 font-semibold">Size: {order.item.size} | Qty: {order.item.quantity}</p>
                    <p className="text-xs font-bold text-[#f5ebd9]/80 mt-1">{order.item.price}</p>
                  </div>
                </div>

                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#c5a880]/10 pt-4 md:pt-0 md:pl-6 space-y-2">
                  <p className="text-[8.5px] uppercase tracking-widest text-[#aa9775] font-bold">Shipping Destination</p>
                  <p className="text-[11px] text-[#f5ebd9]/85 font-medium leading-relaxed">
                    <strong className="text-[#f5ebd9] font-bold block">{order.customer.name}</strong>
                    {order.customer.houseNo}, {order.customer.address}<br />
                    {order.customer.city}, {order.customer.state} — {order.customer.pincode}
                  </p>
                </div>

                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#c5a880]/10 pt-4 md:pt-0 md:pl-6 space-y-2 flex flex-col justify-between">
                  <div>
                    <p className="text-[8.5px] uppercase tracking-widest text-[#aa9775] font-bold">Transaction Details</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <CreditCard size={12} className="text-[#aa9775]" />
                      <span className="text-[10px] tracking-wider text-[#f5ebd9]/80 font-bold">{order.payment.method} ({order.payment.status})</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-[8.5px] uppercase tracking-widest text-[#aa9775] block font-bold">Order ID</span>
                    <span className="text-sm font-bold tracking-widest text-[#f5ebd9] font-mono">{order.id}</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Visual Stepper Progress Bar */}
              <div className="bg-[#12011b]/20 border border-[#c5a880]/15 p-6 md:p-8 rounded-sm">
                <h2 className="text-xs uppercase tracking-[0.3em] text-[#aa9775] font-bold mb-8 flex items-center gap-2">
                  <Compass size={14} className="animate-spin" />
                  Couture Timeline
                </h2>
                
                {/* Stepper connecting line */}
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                  {/* Connecting line */}
                  <div className="absolute left-[15px] md:left-0 top-0 md:top-[15px] h-full md:h-[2px] w-[2px] md:w-full bg-[#c5a880]/15 -z-10" />
                  <div 
                    className="absolute left-[15px] md:left-0 top-0 md:top-[15px] h-full md:h-[2px] w-[2px] md:w-full bg-[#aa9775] transition-all duration-1000 origin-top md:origin-left -z-10" 
                    style={{
                      transform: `scaleX(${
                        currentStatusIdx <= 0 ? 0 : currentStatusIdx / (steps.length - 1)
                      })`
                    }}
                  />

                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isCompleted = idx <= currentStatusIdx;
                    const isActive = idx === currentStatusIdx;
                    
                    return (
                      <div key={idx} className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 flex-1 w-full">
                        {/* Step Circle */}
                        <div 
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0 ${
                            isCompleted 
                              ? "bg-[#aa9775] border-[#aa9775] text-[#1c1813]" 
                              : "bg-[#1c1813] border-[#c5a880]/30 text-[#c5a880]/45"
                          } ${isActive ? "shadow-[0_0_15px_rgba(170,151,117,0.4)] animate-pulse border-[#f5ebd9]" : ""}`}
                        >
                          <Icon size={14} />
                        </div>
                        {/* Step Labels */}
                        <div className="flex flex-col md:items-center text-left md:text-center">
                          <h4 className={`text-[10px] uppercase tracking-[0.25em] font-bold ${isCompleted ? "text-[#f5ebd9]" : "text-[#f5ebd9]/45"}`}>
                            {step.label}
                          </h4>
                          <p className="text-[9px] text-[#f5ebd9]/55 font-medium mt-0.5 leading-tight md:max-w-[120px]">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Live Transit Location Map (Canvas) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 bg-[#12011b]/35 border border-[#aa9775]/25 p-5 rounded-sm flex flex-col justify-between overflow-hidden">
                  <h3 className="text-[10px] uppercase tracking-[0.35em] text-[#aa9775] font-bold mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-ping" />
                    Live Courier Transit Map
                  </h3>
                  
                  {/* Canvas container */}
                  <div className="w-full aspect-[16/9] border border-[#c5a880]/15 rounded-sm bg-[#12011b]/60 flex items-center justify-center">
                    <canvas 
                      ref={canvasRef} 
                      width={400} 
                      height={225} 
                      className="w-full h-full max-h-[300px]"
                    />
                  </div>
                </div>

                <div className="md:col-span-4 bg-[#12011b]/20 border border-[#c5a880]/15 p-6 rounded-sm flex flex-col justify-between">
                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#aa9775] font-bold">Transit Status</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">Current Location</span>
                        <strong className="text-sm text-[#f5ebd9] tracking-wider block mt-0.5 uppercase font-mono">{order.location}</strong>
                      </div>
                      
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">Transit Milestone</span>
                        <strong className="text-xs text-[#f5ebd9]/90 font-semibold block mt-0.5 uppercase">{order.status}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#c5a880]/10 mt-6 space-y-3">
                    <p className="text-[9px] text-[#f5ebd9]/65 leading-relaxed">
                      Custom bridal outfits are handcrafted and go through individual sanitization and quality checks before dispatch.
                    </p>
                    <a
                      href="https://wa.me/919041588678"
                      target="_blank"
                      className="w-full py-2.5 border border-[#aa9775]/50 hover:border-[#aa9775] text-[#aa9775] hover:bg-[#aa9775]/5 text-[8.5px] uppercase tracking-[0.25em] font-bold transition-all duration-300 text-center inline-block cursor-pointer"
                    >
                      Connect Studio Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-[#12011b]/10 border border-[#c5a880]/10 rounded-sm">
              <Compass size={40} className="text-[#aa9775]/45 mx-auto mb-4 animate-pulse" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#f5ebd9]/60 font-semibold">
                Please enter a valid Order ID above to track your order details.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
