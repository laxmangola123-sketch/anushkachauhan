"use client";

import React, { useState, useEffect, useRef } from "react";
import PageShell from "@/components/PageShell";
import { 
  Lock, 
  User, 
  Database, 
  MapPin, 
  ClipboardList, 
  Bell, 
  Play, 
  CheckCircle,
  Truck,
  Package,
  Clock
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

export default function StaffPortalContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Status values in the portal
  const [editStatus, setEditStatus] = useState<{ [orderId: string]: Order["status"] }>({});
  const [editLocation, setEditLocation] = useState<{ [orderId: string]: string }>({});

  // Notifications State
  const [notification, setNotification] = useState<{ message: string; orderId: string } | null>(null);
  const ordersRef = useRef<Order[]>([]);

  // Sound Synthesizer double-beep
  const playRoyalChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Note 1 (C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);
      
      // Note 2 (E5) after 150ms delay
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(659.25, ctx.currentTime);
        gain2.gain.setValueAtTime(0.12, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.45);
      }, 150);
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "atelier_staff" && password === "couture_heritage") {
      setIsAuthenticated(true);
      setLoginError("");
      // Trigger chime on successful login to activate audio context permission
      setTimeout(() => playRoyalChime(), 100);
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  // Fetch orders initially
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setOrders(result.data);
          ordersRef.current = result.data;
          
          // Prepopulate states
          const initialStatuses: { [id: string]: Order["status"] } = {};
          const initialLocations: { [id: string]: string } = {};
          result.data.forEach((o: Order) => {
            initialStatuses[o.id] = o.status;
            initialLocations[o.id] = o.location;
          });
          setEditStatus(initialStatuses);
          setEditLocation(initialLocations);
        }
      }
    } catch (e) {
      console.error("Failed to load orders", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  // Poll for new orders and trigger sound/banner notifications
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            const currentCount = ordersRef.current.length;
            const newCount = result.data.length;

            if (newCount > currentCount) {
              // Find the new order (the first item)
              const newOrder = result.data[0];
              playRoyalChime();
              setNotification({
                message: `New Order Confirmed: ${newOrder.item.name} (${newOrder.id})`,
                orderId: newOrder.id
              });

              // Update state lists
              setOrders(result.data);
              ordersRef.current = result.data;
              
              setEditStatus(prev => ({ ...prev, [newOrder.id]: newOrder.status }));
              setEditLocation(prev => ({ ...prev, [newOrder.id]: newOrder.location }));
            }
          }
        }
      } catch (err) {
        console.error("Polling orders failed in portal", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleUpdateOrder = async (orderId: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          status: editStatus[orderId],
          location: editLocation[orderId]
        })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          // Update local state list
          setOrders(prev => prev.map(o => o.id === orderId ? result.data : o));
          ordersRef.current = ordersRef.current.map(o => o.id === orderId ? result.data : o);
          alert("Order details updated successfully.");
        }
      }
    } catch (e) {
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <PageShell>
        <div className="min-h-screen bg-[#1c1813] text-[#f5ebd9] flex items-center justify-center pt-32 pb-24 px-4">
          <div className="w-full max-w-md bg-[#1d032e] border border-[#d4af37]/30 p-8 rounded-sm shadow-2xl relative">
            {/* Corner styling */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]" />

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full border border-[#d4af37]/45 flex items-center justify-center mx-auto mb-4 bg-[#d4af37]/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <Lock className="text-[#d4af37]" size={20} />
              </div>
              <h2 className="font-editorial text-2xl tracking-wider text-[#f5ebd9] uppercase font-bold">Atelier Staff Portal</h2>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/80 mt-1 font-semibold">Authorized Personnel Only</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-[8px] uppercase tracking-[0.3em] text-[#aa9775] font-bold block mb-1.5">Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aa9775]" size={14} />
                  <input
                    required
                    type="text"
                    placeholder="Enter Staff Username"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#12011b]/80 border border-[#c5a880]/30 text-[#f5ebd9] placeholder:text-[#f5ebd9]/35 focus:outline-none focus:border-[#d4af37] font-semibold tracking-wider"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-[0.3em] text-[#aa9775] font-bold block mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aa9775]" size={14} />
                  <input
                    required
                    type="password"
                    placeholder="Enter Staff Password"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#12011b]/80 border border-[#c5a880]/30 text-[#f5ebd9] placeholder:text-[#f5ebd9]/35 focus:outline-none focus:border-[#d4af37] font-semibold tracking-wider"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {loginError && <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider text-center">{loginError}</p>}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#aa9775] text-[#1c1813] hover:bg-[#f5ebd9] hover:text-[#1c1813] text-[9.5px] uppercase tracking-[0.4em] font-bold transition-all duration-500 cursor-pointer shadow-lg mt-6"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="min-h-screen bg-[#1c1813] text-[#f5ebd9] pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Toast Notification Alert */}
          {notification && (
            <div className="bg-[#aa9775] text-[#1c1813] border border-[#d4af37] p-4 rounded-sm flex items-center justify-between shadow-2xl animate-bounce">
              <div className="flex items-center gap-3">
                <Bell className="animate-swing shrink-0" size={18} />
                <p className="text-xs font-bold uppercase tracking-wider">{notification.message}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const el = document.getElementById(notification.orderId);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setNotification(null);
                  }}
                  className="px-4 py-1.5 bg-[#1c1813] text-[#f5ebd9] hover:bg-white hover:text-[#1c1813] text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => setNotification(null)}
                  className="px-3 py-1.5 border border-[#1c1813] hover:bg-[#1c1813]/10 text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#c5a880]/20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#aa9775] font-bold">COUTURE STUDIO MANAGEMENT</p>
              <h1 className="font-editorial text-2xl md:text-3xl text-[#f5ebd9] uppercase tracking-wider mt-1">Staff Order Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="px-5 py-2.5 border border-[#aa9775]/40 hover:border-[#aa9775] text-[#aa9775] text-[9.5px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Database size={12} />
                {loading ? "Syncing..." : "Sync Orders"}
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setUsername("");
                  setPassword("");
                }}
                className="px-5 py-2.5 bg-red-950/40 border border-red-800/40 hover:bg-red-900/40 text-red-400 text-[9.5px] uppercase tracking-[0.2em] font-bold transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Orders Counter stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#12011b]/20 border border-[#c5a880]/15 p-4 rounded-sm">
              <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">Total Couture Orders</span>
              <strong className="text-xl font-bold tracking-widest text-[#f5ebd9] font-mono block mt-1">{orders.length}</strong>
            </div>
            <div className="bg-[#12011b]/20 border border-[#c5a880]/15 p-4 rounded-sm">
              <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">In Tailoring / Crafting</span>
              <strong className="text-xl font-bold tracking-widest text-[#f5ebd9] font-mono block mt-1">
                {orders.filter(o => o.status === "Tailoring").length}
              </strong>
            </div>
            <div className="bg-[#12011b]/20 border border-[#c5a880]/15 p-4 rounded-sm">
              <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">Dispatched / Shipped</span>
              <strong className="text-xl font-bold tracking-widest text-[#f5ebd9] font-mono block mt-1">
                {orders.filter(o => o.status === "Shipped").length}
              </strong>
            </div>
            <div className="bg-[#12011b]/20 border border-[#c5a880]/15 p-4 rounded-sm">
              <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">Delivered Completed</span>
              <strong className="text-xl font-bold tracking-widest text-[#f5ebd9] font-mono block mt-1">
                {orders.filter(o => o.status === "Delivered").length}
              </strong>
            </div>
          </div>

          {/* Orders Registry List */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#aa9775] font-bold flex items-center gap-2">
              <ClipboardList size={14} />
              Bespoke Order Registry
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#12011b]/10 border border-[#c5a880]/10 rounded-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#f5ebd9]/60 font-semibold">
                  No orders have been received yet. Keep this window open; new orders trigger sound chimes in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((o) => (
                  <div 
                    key={o.id}
                    id={o.id}
                    className="bg-[#12011b]/35 border border-[#c5a880]/20 rounded-sm p-6 relative overflow-hidden transition-all duration-300 hover:border-[#aa9775]"
                  >
                    {/* Unique Highlight for Confirmed step */}
                    {o.status === "Confirmed" && (
                      <div className="absolute top-0 right-0 bg-[#aa9775] text-[#1c1813] text-[7.5px] uppercase tracking-widest font-bold px-3 py-1 rounded-bl-sm">
                        New Order
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left: Product & Payment info */}
                      <div className="lg:col-span-3 flex items-center gap-4">
                        <div className="w-16 h-20 bg-[#1c1813] border border-[#c5a880]/15 overflow-hidden shrink-0">
                          <img
                            src={o.item.imageUrl}
                            alt={o.item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-mono font-bold">{o.id}</span>
                          <h3 className="font-editorial text-sm text-[#f5ebd9] font-bold leading-tight mt-1">{o.item.name}</h3>
                          <p className="text-[9px] uppercase tracking-wider text-[#f5ebd9]/60 mt-0.5 font-semibold">Size: {o.item.size} | Qty: {o.item.quantity}</p>
                          <p className="text-[9.5px] text-[#aa9775]/90 font-bold mt-1">{o.item.price}</p>
                        </div>
                      </div>

                      {/* Middle Left: Customer Details */}
                      <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#c5a880]/10 pt-4 lg:pt-0 lg:pl-6 space-y-1">
                        <span className="text-[8.5px] uppercase tracking-widest text-[#aa9775] block font-bold">Delivery Address</span>
                        <p className="text-[10px] text-[#f5ebd9] font-semibold leading-relaxed">
                          <strong className="text-white block">{o.customer.name} (Ph: {o.customer.phone})</strong>
                          {o.customer.houseNo}, {o.customer.address}<br />
                          {o.customer.landmark && `Landmark: ${o.customer.landmark}`}<br />
                          {o.customer.city}, {o.customer.state} — {o.customer.pincode}
                        </p>
                        {o.customer.note && (
                          <div className="bg-[#2d123e]/50 border border-[#c5a880]/10 p-2 rounded-sm mt-2 text-[9px] text-[#aa9775] leading-relaxed italic font-medium">
                            Note: {o.customer.note}
                          </div>
                        )}
                      </div>

                      {/* Middle Right: Payment */}
                      <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-[#c5a880]/10 pt-4 lg:pt-0 lg:pl-6 space-y-2">
                        <div>
                          <span className="text-[8.5px] uppercase tracking-widest text-[#aa9775] block font-bold font-semibold">Payment</span>
                          <span className="text-[10px] text-green-400 font-bold tracking-wider block mt-1 uppercase">
                            Paid via {o.payment.method}
                          </span>
                          <span className="text-[8px] text-[#f5ebd9]/55 font-mono block mt-0.5">
                            {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({new Date(o.createdAt).toLocaleDateString()})
                          </span>
                        </div>
                      </div>

                      {/* Right: Update Controls */}
                      <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#c5a880]/10 pt-4 lg:pt-0 lg:pl-6 space-y-4">
                        <span className="text-[8.5px] uppercase tracking-widest text-[#aa9775] block font-bold">Transit Controls</span>
                        
                        <div className="space-y-3">
                          {/* Dropdown status update */}
                          <div>
                            <label className="text-[7.5px] uppercase tracking-widest text-[#f5ebd9]/75 block mb-1">Update Status</label>
                            <select
                              className="w-full bg-[#1c1813] border border-[#c5a880]/30 text-xs px-2.5 py-1.5 text-[#f5ebd9] focus:outline-none focus:border-[#aa9775] font-semibold"
                              value={editStatus[o.id] || o.status}
                              onChange={(e) => setEditStatus({ ...editStatus, [o.id]: e.target.value as Order["status"] })}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Tailoring">Tailoring</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>

                          {/* Location text input */}
                          <div>
                            <label className="text-[7.5px] uppercase tracking-widest text-[#f5ebd9]/75 block mb-1">Current Courier Hub Location</label>
                            <div className="relative">
                              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#aa9775]" size={11} />
                              <input
                                type="text"
                                className="w-full bg-[#1c1813] border border-[#c5a880]/30 text-xs pl-8 pr-2 py-1.5 text-[#f5ebd9] focus:outline-none focus:border-[#aa9775] font-semibold tracking-wide"
                                placeholder="e.g. Atelier Studio Noida"
                                value={editLocation[o.id] !== undefined ? editLocation[o.id] : o.location}
                                onChange={(e) => setEditLocation({ ...editLocation, [o.id]: e.target.value })}
                              />
                            </div>
                          </div>

                          {/* Submit button */}
                          <button
                            onClick={() => handleUpdateOrder(o.id)}
                            disabled={updatingId === o.id}
                            className="w-full py-2 bg-[#aa9775] text-[#1c1813] hover:bg-[#f5ebd9] hover:text-[#1c1813] text-[9px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer shadow-md disabled:opacity-50"
                          >
                            {updatingId === o.id ? "Updating..." : "Save Updates"}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </PageShell>
  );
}
