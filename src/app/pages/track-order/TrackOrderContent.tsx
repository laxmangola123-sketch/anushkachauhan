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
  Compass,
  Scissors,
  Sparkles,
  Award,
  Gift,
  Calendar,
  Layers,
  Heart,
  Mail,
  Pencil
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

// Custom Luxury SVGs for Stepper
const EmbroideryIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
    <line x1="8" y1="16" x2="16" y2="8" strokeWidth="2" />
    <path d="M16 8 C18 6, 20 8, 17 11 C15 13, 13 14, 11 14" />
  </svg>
);

const SewingMachineIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18h16M5 18V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10" />
    <circle cx="9" cy="10" r="1.5" />
    <line x1="17" y1="10" x2="20" y2="10" />
    <line x1="17" y1="14" x2="20" y2="14" />
    <path d="M15 14h-3v4" />
  </svg>
);

// Custom Atelier Live Cartoon Animations Sub-component
function CoutureStageAnimation({ stageIndex }: { stageIndex: number }) {
  switch (stageIndex) {
    case 0: // Designing
      return (
        <div className="relative w-full h-full bg-[#fdfbf7] flex flex-col items-center justify-center p-6 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#ebdcc6]">
          {/* Sketch Background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          <div className="relative w-32 h-40 flex items-center justify-center border border-[#ebdcc6] bg-white p-4 shadow-inner rounded-sm overflow-hidden">
            {/* Lehenga silhouette sketch outline */}
            <svg width="80" height="100" viewBox="0 0 100 120" fill="none" stroke="#aa9775" strokeWidth="1.2" className="opacity-80">
              <path d="M40 20 L60 20 L65 35 L35 35 Z" />
              <rect x="33" y="38" width="34" height="4" rx="1" fill="#aa9775"/ >
              <path d="M35 42 L15 100 L85 100 L65 42 Z" strokeDasharray="3 3" />
              <path d="M25 70 C 40 73, 60 73, 75 70" strokeDasharray="2 2" strokeWidth="0.8" />
              <path d="M20 85 C 40 88, 60 88, 80 85" strokeDasharray="2 2" strokeWidth="0.8" />
            </svg>
            
            {/* Animated pencil icon */}
            <div className="absolute top-1/4 left-1/4 animate-[pencil-draw_5s_infinite_ease-in-out] pointer-events-none">
              <Pencil size={18} className="text-[#aa9775] drop-shadow-sm" strokeWidth={1.5} />
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#aa9775] font-bold mt-4 animate-pulse">Drafting Couture Sketches...</span>
        </div>
      );
    case 1: // Embroidery
      return (
        <div className="relative w-full h-full bg-[#fdfbf7] flex flex-col items-center justify-center p-6 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#ebdcc6]">
          {/* Hoop outline */}
          <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-4 border-[#ebdcc6] bg-white shadow-md">
            <div className="absolute -top-3 w-5 h-2.5 bg-[#ebdcc6] border border-[#aa9775] rounded-sm" />
            <div className="absolute inset-2 rounded-full bg-[radial-gradient(#c5a880_0.75px,transparent_0.75px)] [background-size:8px_8px] opacity-15" />
            
            {/* Floral embroidery outline drawing */}
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none" stroke="#aa9775" strokeWidth="1.5">
              <path d="M50 80 C50 60, 30 50, 30 35 C30 20, 50 20, 50 35" className="animate-pulse" />
              <path d="M50 80 C50 60, 70 50, 70 35 C70 20, 50 20, 50 35" className="animate-pulse" />
              <circle cx="50" cy="35" r="4" fill="#aa9775" />
            </svg>

            {/* Needles bobs */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 animate-[needle-bob_1.2s_infinite_ease-in-out]">
              <svg width="8" height="50" viewBox="0 0 10 60" fill="none">
                <ellipse cx="5" cy="15" rx="1.5" ry="5" stroke="#aa9775" strokeWidth="1" />
                <line x1="5" y1="15" x2="5" y2="55" stroke="#aa9775" strokeWidth="1.5" />
                <path d="M5 15 C 5 5, 20 8, 22 -5" stroke="#d4af37" strokeWidth="0.8" />
              </svg>
            </div>
            
            <div className="absolute top-16 left-12 animate-ping">
              <Sparkles size={8} className="text-[#d4af37]" />
            </div>
            <div className="absolute top-20 right-10 animate-[ping_2s_infinite]">
              <Sparkles size={10} className="text-[#d4af37]" />
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#aa9775] font-bold mt-4 animate-pulse">Embroidery in Progress...</span>
        </div>
      );
    case 2: // Stitching
      return (
        <div className="relative w-full h-full bg-[#fdfbf7] flex flex-col items-center justify-center p-6 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#ebdcc6]">
          <div className="relative w-40 h-32 flex items-center justify-center border border-[#ebdcc6] bg-white p-4 shadow-sm rounded-sm overflow-hidden">
            <svg width="100" height="75" viewBox="0 0 120 90" fill="none" stroke="#ebdcc6" strokeWidth="1.5" className="opacity-80">
              <path d="M15 80 h90 M25 80 V25 h40 V45 h20 V80" />
            </svg>

            {/* Sliding fabric panel */}
            <div className="absolute bottom-[20px] left-0 right-0 h-3.5 bg-[#aa9775]/10 border-t border-b border-[#aa9775]/35 overflow-hidden">
              <div className="w-full h-full border-t border-dashed border-[#aa9775]/60 animate-[fabric-slide_2s_infinite_linear]" />
            </div>

            {/* Rapid bobbing stitching needle */}
            <div className="absolute bottom-[22px] left-[65px] animate-[needle-bob_0.35s_infinite_linear]">
              <div className="w-[1.5px] h-10 bg-[#aa9775] relative">
                <div className="absolute bottom-1 w-[2px] h-[2px] bg-[#d4af37] rounded-full" />
              </div>
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#aa9775] font-bold mt-4 animate-pulse">Master Tailoring & Assembly...</span>
        </div>
      );
    case 3: // Finishing
      return (
        <div className="relative w-full h-full bg-[#fdfbf7] flex flex-col items-center justify-center p-6 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#ebdcc6]">
          <div className="relative w-36 h-36 flex items-center justify-center overflow-hidden bg-white border border-[#ebdcc6] rounded-sm">
            <svg width="80" height="100" viewBox="0 0 100 120" fill="none" stroke="#aa9775" strokeWidth="1.2">
              <path d="M50 15 L50 40 M38 40 L62 40 L65 55 L35 55 Z" />
              <path d="M35 57 L15 105 L85 105 L65 57 Z" />
              <path d="M50 105 L50 115 M35 115 L65 115" stroke="#aa9775" strokeWidth="1.5" />
            </svg>

            {/* Steamer nozzle and rising steam */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-6 h-1.5 bg-[#ebdcc6] border border-[#aa9775] rounded-full" />
              <div className="absolute top-1.5 w-3.5 h-3.5 bg-slate-100 rounded-full blur-[2px] animate-[steam-rise_1.5s_infinite_ease-out]" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1.5 w-4 h-4 bg-slate-100 rounded-full blur-[3px] animate-[steam-rise_1.5s_infinite_ease-out]" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1.5 w-2.5 h-2.5 bg-slate-100 rounded-full blur-[2px] animate-[steam-rise_1.5s_infinite_ease-out]" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="absolute bottom-6 left-8 animate-ping">
              <Sparkles size={8} className="text-[#d4af37]" />
            </div>
            <div className="absolute bottom-10 right-8 animate-[ping_1.6s_infinite]">
              <Sparkles size={10} className="text-[#d4af37]" />
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#aa9775] font-bold mt-4 animate-pulse">Deep Steam Press & QC Check...</span>
        </div>
      );
    case 4: // Packing
      return (
        <div className="relative w-full h-full bg-[#fdfbf7] flex flex-col items-center justify-center p-6 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#ebdcc6]">
          <div className="relative w-36 h-36 flex flex-col items-center justify-center bg-white border border-[#ebdcc6] rounded-sm">
            {/* Box trunk */}
            <div className="relative w-24 h-16 border-2 border-[#aa9775] bg-[#faf6ef] rounded-sm flex items-center justify-center shadow-inner">
              <div className="absolute inset-0.5 border border-dashed border-[#aa9775]/40 flex items-center justify-center">
                <Gift size={16} className="text-[#aa9775]/40" />
              </div>
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-[#aa9775]" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-[#aa9775]" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-[#aa9775]" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-[#aa9775]" />
            </div>
            {/* Box lid bobs */}
            <div className="absolute top-[82px] w-24 h-3.5 border border-[#aa9775] bg-[#faf6ef] rounded-t-sm animate-[box-lid_1.8s_infinite_ease-in-out]" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#aa9775] font-bold mt-4 animate-pulse">Signature Keepsake Packing...</span>
        </div>
      );
    case 5: // Shipped
      return (
        <div className="relative w-full h-full bg-[#fdfbf7] flex flex-col items-center justify-center p-6 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#ebdcc6]">
          <div className="relative w-36 h-36 flex flex-col items-center justify-center bg-white border border-[#ebdcc6] rounded-sm overflow-hidden">
            {/* Dashed road lines sliding */}
            <div className="absolute bottom-10 left-0 right-0 h-[1.5px] bg-[#ebdcc6] flex justify-around">
              <div className="w-3 h-full bg-[#aa9775]/50 animate-[fabric-slide_1.2s_infinite_linear]" />
              <div className="w-3 h-full bg-[#aa9775]/50 animate-[fabric-slide_1.2s_infinite_linear]" style={{ animationDelay: '0.4s' }} />
              <div className="w-3 h-full bg-[#aa9775]/50 animate-[fabric-slide_1.2s_infinite_linear]" style={{ animationDelay: '0.8s' }} />
            </div>

            {/* Bouncing delivery truck */}
            <div className="animate-[truck-drive_2s_infinite_ease-in-out]">
              <Truck size={36} className="text-[#aa9775]" strokeWidth={1.3} />
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#aa9775] font-bold mt-4 animate-pulse">On Its Way to You...</span>
        </div>
      );
    default:
      return null;
  }
}

export default function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlId = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(urlId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Custom Lehenga Journey state
  const [simulatedDays, setSimulatedDays] = useState<number | null>(null);
  const [selectedStageTab, setSelectedStageTab] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

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
          // Set initial tab to active stage
          const isLehenga = found.item.name.toLowerCase().includes("lehenga");
          if (isLehenga) {
            const createdDate = new Date(found.createdAt);
            const diffTime = Math.abs(Date.now() - createdDate.getTime());
            const realElapsedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
            const activeStage = getLehengaJourneyProgress(realElapsedDays, found.status).stageIndex;
            setSelectedStageTab(activeStage);
          }
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
      ctx.strokeStyle = "rgba(170, 151, 117, 0.08)";
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

      // Draw Delhi NCR map contour
      ctx.strokeStyle = "rgba(170, 151, 117, 0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(200, 110, 90, 0, Math.PI * 2);
      ctx.stroke();

      // Noida Atelier Studio
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

      // Destination (Customer Address City)
      ctx.fillStyle = "#1c1813";
      ctx.beginPath();
      ctx.arc(endX, endY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(28, 24, 19, 0.15)";
      ctx.beginPath();
      ctx.arc(endX, endY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1c1813";
      ctx.fillText(`DELIVERY POINT (${order.customer.city.toUpperCase()})`, endX - 40, endY - 15);

      // Dashed transit line path
      ctx.strokeStyle = "rgba(170, 151, 117, 0.4)";
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

      if (statusFactor > 0 && statusFactor < 1.0) {
        const pulse = Math.abs(Math.sin(Date.now() / 400)) * 6;
        ctx.fillStyle = "#aa9775";
        ctx.beginPath();
        ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(170, 151, 117, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6 + pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#aa9775";
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

  // ─── YOUR LEHENGA JOURNEY LOGIC ───────────────────────────────────────────
  const getLehengaJourneyProgress = (days: number, orderStatus: string) => {
    if (orderStatus === "Shipped" || orderStatus === "Out for Delivery" || orderStatus === "Delivered") {
      return { stageIndex: 5, percentage: 100 };
    }
    if (days <= 4) {
      const percentage = Math.max(10, Math.round((days / 4) * 15));
      return { stageIndex: 0, percentage };
    } else if (days <= 20) {
      const percentage = Math.round(16 + ((days - 5) / 15) * 44);
      return { stageIndex: 1, percentage };
    } else if (days <= 30) {
      const percentage = Math.round(61 + ((days - 21) / 9) * 19);
      return { stageIndex: 2, percentage };
    } else if (days <= 34) {
      const percentage = Math.round(81 + ((days - 31) / 3) * 11);
      return { stageIndex: 3, percentage };
    } else if (days <= 37) {
      const percentage = Math.round(93 + ((days - 35) / 2) * 5);
      return { stageIndex: 4, percentage };
    } else {
      return { stageIndex: 5, percentage: 100 };
    }
  };

  const lehengaStages = [
    {
      title: "Designing",
      subtitle: "Sketches & Fabrics",
      desc: "Our design team has finalized your custom measurements, drafted the silhouette sketches, and selected the finest silk and organza fabrics.",
      hours: 15,
      message: "Our design team has finalized the sketches and selected the finest silk for your piece.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop",
      icon: Pencil
    },
    {
      title: "Embroidery",
      subtitle: "Artisan Handwork",
      desc: "Our artisans are handcrafting the intricate embroidery and embellishments on your lehenga with the finest materials. This step requires great care and attention to detail.",
      hours: 120,
      message: "Our artisans are handcrafting the intricate embroidery and embellishments on your lehenga with the finest materials.",
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=800&auto=format&fit=crop",
      icon: EmbroideryIcon
    },
    {
      title: "Stitching",
      subtitle: "Tailoring & Assembly",
      desc: "The embroidered panels are custom-cut and meticulously assembled. Inner lining, can-can structures, and custom fit adjustments are tailored by our master drapers.",
      hours: 240,
      message: "Your bridal piece is now being carefully stitched.",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop",
      icon: SewingMachineIcon
    },
    {
      title: "Finishing",
      subtitle: "Detailing & Pressing",
      desc: "Adding custom latkans (tassels), hand-finished borders, and deep steam pressing. The garment passes a 3-tier quality inspection to check every embroidery line.",
      hours: 280,
      message: "Final finishing is underway before dispatch.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
      icon: Sparkles
    },
    {
      title: "Packing",
      subtitle: "Keepsake Boxing",
      desc: "Your lehenga is wrapped in acid-free tissue paper and carefully placed in our signature moisture-controlled wooden keepsake chest, preserving the gold weave for generations.",
      hours: 290,
      message: "Your outfit is being hand-packed in our signature keepsake box.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      icon: Gift
    },
    {
      title: "Shipped",
      subtitle: "At Your Doorstep",
      desc: "Your order is dispatched via fully insured luxury express courier and is on its way to you.",
      hours: 320,
      message: "Your lehenga is on its way to you.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      icon: Truck
    }
  ];

  // Helper variables for Lehenga Order
  const isLehenga = order ? order.item.name.toLowerCase().includes("lehenga") : false;

  // Calculate elapsed days
  const getElapsedDays = () => {
    if (!order) return 0;
    if (simulatedDays !== null) return simulatedDays;
    const createdDate = new Date(order.createdAt);
    const diffTime = Math.abs(Date.now() - createdDate.getTime());
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const elapsedDays = getElapsedDays();
  const journey = order ? getLehengaJourneyProgress(elapsedDays, order.status) : { stageIndex: 0, percentage: 0 };

  // Date calculation
  const getEstimatedDeliveryDate = () => {
    if (!order) return "";
    const createdDate = new Date(order.createdAt);
    const estDate = new Date(createdDate.getTime() + 40 * 24 * 60 * 60 * 1000);
    return estDate.toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <PageShell>
      <div className="min-h-screen bg-[#faf6ef] text-[#1c1813] pt-32 pb-24 px-4 sm:px-6 font-sans selection:bg-[#aa9775]/25">
        
        {/* Inject CSS keyframes for custom animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pencil-draw {
            0% { transform: translate(0, 0) rotate(45deg); }
            25% { transform: translate(25px, 35px) rotate(45deg); }
            50% { transform: translate(45px, 5px) rotate(45deg); }
            75% { transform: translate(15px, 20px) rotate(45deg); }
            100% { transform: translate(0, 0) rotate(45deg); }
          }
          @keyframes needle-bob {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, 15px); }
          }
          @keyframes fabric-slide {
            0% { transform: translateX(-40px); }
            100% { transform: translateX(40px); }
          }
          @keyframes steam-rise {
            0% { transform: translateY(12px) scale(0.6); opacity: 0; }
            45% { opacity: 0.6; }
            90% { opacity: 0; }
            100% { transform: translateY(-20px) scale(1.4); opacity: 0; }
          }
          @keyframes box-lid {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes truck-drive {
            0%, 100% { transform: translateX(0) translateY(0); }
            20% { transform: translateX(3px) translateY(-1px); }
            40% { transform: translateX(0) translateY(0); }
            60% { transform: translateX(-3px) translateY(1.5px); }
            80% { transform: translateX(1.5px) translateY(-0.5px); }
          }
        `}} />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#aa9775] font-bold mb-3">CONCIERGE SERVICES</p>
            <h1 className="font-editorial text-3xl md:text-4xl text-[#1c1813] uppercase tracking-wider">Live Couture Tracker</h1>
            <div className="w-12 h-[1px] bg-[#aa9775] mx-auto mt-4" />
          </div>

          {/* Search Box */}
          <div className="bg-[#fdfbf7] border border-[#c5a880]/30 p-6 rounded-sm mb-10 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aa9775]" size={15} />
                <input
                  required
                  type="text"
                  placeholder="Enter Order ID (e.g. AC-48201)"
                  className="w-full pl-11 pr-4 py-3 text-xs bg-white border border-[#c5a880]/30 text-[#1c1813] placeholder:text-[#1c1813]/40 focus:outline-none focus:border-[#aa9775] font-semibold tracking-widest uppercase"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#1c1813] text-[#faf6ef] hover:bg-[#aa9775] hover:text-[#faf6ef] text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {loading ? "Searching..." : "Track Status"}
              </button>
            </form>
            {error && <p className="text-xs text-red-500 mt-3 font-semibold uppercase tracking-wider text-center">{error}</p>}
          </div>

          {/* Track Details */}
          {order ? (
            <div className="space-y-8">
              {/* Row 1: Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#fdfbf7] border border-[#c5a880]/20 p-6 rounded-sm shadow-sm">
                <div className="md:col-span-4 flex items-center gap-4">
                  <div className="w-20 h-24 bg-white border border-[#c5a880]/15 overflow-hidden shrink-0">
                    <img
                      src={order.item.imageUrl}
                      alt={order.item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-editorial text-base text-[#1c1813] font-bold leading-snug">{order.item.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-[#aa9775] mt-1 font-semibold">Size: {order.item.size} | Qty: {order.item.quantity}</p>
                    <p className="text-xs font-bold text-[#1c1813]/80 mt-1">{order.item.price}</p>
                  </div>
                </div>

                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#c5a880]/10 pt-4 md:pt-0 md:pl-6 space-y-2">
                  <p className="text-[8.5px] uppercase tracking-widest text-[#aa9775] font-bold">Shipping Destination</p>
                  <p className="text-[11px] text-[#1c1813]/85 font-medium leading-relaxed">
                    <strong className="text-[#1c1813] font-bold block">{order.customer.name}</strong>
                    {order.customer.houseNo}, {order.customer.address}<br />
                    {order.customer.city}, {order.customer.state} — {order.customer.pincode}
                  </p>
                </div>

                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#c5a880]/10 pt-4 md:pt-0 md:pl-6 space-y-2 flex flex-col justify-between">
                  <div>
                    <p className="text-[8.5px] uppercase tracking-widest text-[#aa9775] font-bold">Transaction Details</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <CreditCard size={12} className="text-[#aa9775]" />
                      <span className="text-[10px] tracking-wider text-[#1c1813]/80 font-bold">{order.payment.method} ({order.payment.status})</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-[8.5px] uppercase tracking-widest text-[#aa9775] block font-bold">Order ID</span>
                    <span className="text-sm font-bold tracking-widest text-[#1c1813] font-mono">{order.id}</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Premium "Your Lehenga Journey" Experience (If Lehenga) */}
              {isLehenga ? (
                <div className="bg-[#fdfaf4] border border-[#ebdcc6] rounded-sm p-6 md:p-10 space-y-10 relative overflow-hidden shadow-sm">
                  
                  {/* Title & Subtitle */}
                  <div className="text-center">
                    <h2 className="font-editorial text-3xl text-[#1c1813] uppercase tracking-[0.1em] font-medium">Your Lehenga Journey</h2>
                    <p className="text-xs text-[#1c1813]/60 font-light mt-2 tracking-wider">
                      Every piece is handcrafted with love, just for you.
                    </p>
                  </div>

                  {/* Horizontal Scrollable/Flex Timeline Nodes */}
                  <div className="w-full overflow-x-auto pb-4 md:pb-0 scrollbar-none">
                    <div className="flex items-center justify-between min-w-[700px] md:min-w-0 px-2 relative z-10">
                      
                      {lehengaStages.map((stage, idx) => {
                        const Icon = stage.icon;
                        const isCompleted = idx < journey.stageIndex;
                        const isActive = idx === journey.stageIndex;
                        
                        return (
                          <React.Fragment key={idx}>
                            <div className="flex flex-col items-center text-center">
                              {/* Step circle */}
                              <div 
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-700 ${
                                  isCompleted || isActive
                                    ? "bg-white border-[#aa9775] text-[#aa9775] shadow-[0_0_10px_rgba(170,151,117,0.15)]"
                                    : "bg-white border-[#ebdcc6] text-[#ebdcc6]"
                                }`}
                              >
                                <Icon size={18} />
                              </div>
                              {/* Labels */}
                              <span className={`text-[9.5px] uppercase tracking-widest font-bold block mt-3 ${isCompleted || isActive ? "text-[#aa9775]" : "text-[#1c1813]/40"}`}>
                                {stage.title}
                              </span>
                              <span className={`text-[9px] font-medium block mt-0.5 ${isActive ? "text-[#aa9775] font-bold" : "text-[#1c1813]/45"}`}>
                                {isActive ? "IN PROGRESS" : isCompleted ? "Completed" : "Upcoming"}
                              </span>
                            </div>

                            {/* Connecting Line with Arrow */}
                            {idx < lehengaStages.length - 1 && (
                              <div className="flex-grow h-[1px] relative mx-2 bg-[#ebdcc6]">
                                <div 
                                  className="h-full bg-[#aa9775] transition-all duration-1000 origin-left"
                                  style={{ width: idx < journey.stageIndex ? "100%" : idx === journey.stageIndex ? "50%" : "0%" }}
                                />
                                {idx === journey.stageIndex && (
                                  <div 
                                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#aa9775] rotate-45 transition-all duration-1000"
                                    style={{ left: "50%" }}
                                  />
                                )}
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Card Grid with Toggled Cartoon Animation Mode */}
                  <div className="border border-[#ebdcc6] rounded-sm bg-white overflow-hidden flex flex-col md:flex-row shadow-sm">
                    {/* Left Column: Image or Live Animation Cartoon */}
                    <div className="w-full md:w-[50%] aspect-video md:aspect-auto md:min-h-[300px] overflow-hidden relative flex">
                      {showAnimation ? (
                        <CoutureStageAnimation stageIndex={journey.stageIndex} />
                      ) : (
                        <img 
                          src={lehengaStages[journey.stageIndex].image} 
                          alt={lehengaStages[journey.stageIndex].title}
                          className="w-full h-full object-cover filter brightness-[0.95] transition-all duration-700 hover:scale-105"
                        />
                      )}
                      
                      {/* View mode toggle button */}
                      <button 
                        onClick={() => setShowAnimation(!showAnimation)}
                        className="absolute bottom-3 right-3 bg-white/95 border border-[#ebdcc6] hover:bg-[#faf6ef] text-[#aa9775] text-[8.5px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm shadow-md transition-all flex items-center gap-1.5 z-20 cursor-pointer"
                      >
                        {showAnimation ? (
                          <>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            View Photo
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4 12H2M22 12h-4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></svg>
                            Atelier Live
                          </>
                        )}
                      </button>
                    </div>

                    {/* Right Column: Current Status Details */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                      <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#aa9775]/80 font-bold block mb-1">Current Status</span>
                      <h3 className="font-editorial text-2xl text-[#aa9775] uppercase tracking-wider font-semibold">
                        {lehengaStages[journey.stageIndex].title} in Progress
                      </h3>
                      
                      <div className="w-10 h-[1.5px] bg-[#aa9775]/40 my-3" />
                      
                      <p className="text-xs md:text-sm font-light text-[#1c1813]/85 leading-relaxed mb-5">
                        {lehengaStages[journey.stageIndex].desc}
                      </p>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-4">
                        <div className="h-1.5 bg-[#ebdcc6]/50 rounded-full flex-grow overflow-hidden">
                          <div 
                            className="h-full bg-[#aa9775] rounded-full transition-all duration-1000"
                            style={{ width: `${journey.percentage}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#aa9775] shrink-0">{journey.percentage}% Completed</span>
                      </div>

                      {/* Infobox */}
                      <div className="bg-[#fcfaf7] border border-[#ebdcc6]/50 p-3.5 rounded-sm flex items-center gap-3.5 mt-5">
                        <div className="w-8 h-8 rounded-full bg-[#aa9775]/5 flex items-center justify-center text-[#aa9775] shrink-0">
                          <Heart size={14} className="fill-[#aa9775]/10" strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#1c1813] block">
                            ~{lehengaStages[journey.stageIndex].hours} Hours of Handcrafting
                          </span>
                          <span className="text-[9.5px] text-[#1c1813]/55 font-medium block mt-0.5">
                            Your piece is taking shape with love and dedication.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Estimated Completion Bar */}
                  <div className="border border-[#ebdcc6] bg-white rounded-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <div className="flex items-center gap-3.5">
                      <Calendar size={18} className="text-[#aa9775]" strokeWidth={1.5} />
                      <div>
                        <span className="text-[8.5px] uppercase tracking-wider text-[#aa9775] block font-bold">Estimated Completion</span>
                        <span className="text-xs font-bold text-[#1c1813] block mt-0.5">{getEstimatedDeliveryDate()}</span>
                      </div>
                    </div>
                    
                    <div className="h-[30px] w-[1px] bg-[#ebdcc6] hidden md:block" />

                    <div className="flex items-center gap-3.5">
                      <Mail size={18} className="text-[#aa9775]" strokeWidth={1.5} />
                      <div>
                        <span className="text-xs font-bold text-[#1c1813] block">We will notify you at every step</span>
                        <span className="text-[9.5px] text-[#1c1813]/65 font-medium block mt-0.5">
                          You will receive updates via email & WhatsApp
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Centered Thank You Note */}
                  <div className="text-center pt-2">
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#aa9775] flex items-center justify-center gap-1.5">
                      Thank you for trusting us with your special moments. 
                      <span className="text-xs inline-block">🤍</span>
                    </p>
                  </div>

                  {/* Crafting Journey Simulator widget (Demo preview helper) */}
                  <div className="bg-[#fdfbf7] border border-[#aa9775]/20 p-4 rounded-sm relative mt-4">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#aa9775]/40" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#aa9775]/40" />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#aa9775] font-bold block mb-1">Couture Journey Simulator</span>
                        <p className="text-[10px] text-[#1c1813]/70 leading-relaxed">
                          Slide below to simulate how the real-time lehenga craftsmanship tracking updates across the 40-day waiting period.
                        </p>
                      </div>
                      {simulatedDays !== null && (
                        <button 
                          onClick={() => setSimulatedDays(null)}
                          className="px-3 py-1 bg-[#aa9775]/10 hover:bg-[#aa9775]/20 text-[#aa9775] border border-[#aa9775]/35 text-[8.5px] uppercase tracking-widest font-bold transition-all rounded-sm shrink-0 cursor-pointer font-sans"
                        >
                          Reset Real Time
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3.5 w-full">
                      <span className="text-[9px] uppercase font-bold text-[#aa9775] shrink-0">Day 1</span>
                      <input 
                        type="range"
                        min="1"
                        max="40"
                        value={simulatedDays || 1}
                        onChange={(e) => setSimulatedDays(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#aa9775]/25 appearance-none cursor-pointer rounded-full accent-[#aa9775] focus:outline-none"
                      />
                      <span className="text-[9px] uppercase font-bold text-[#aa9775] shrink-0">Day 40</span>
                    </div>
                    <p className="text-center text-[9px] uppercase tracking-widest font-bold text-[#aa9775] mt-2">
                      Viewing Simulation: Day {elapsedDays} of 40 Crafting Days
                    </p>
                  </div>
                </div>
              ) : (
                /* Standard Stepper Progress Bar (For non-lehenga items) */
                <div className="bg-[#fdfbf7] border border-[#c5a880]/20 p-6 md:p-8 rounded-sm shadow-sm">
                  <h2 className="text-xs uppercase tracking-[0.3em] text-[#aa9775] font-bold mb-8 flex items-center gap-2">
                    <Compass size={14} className="animate-spin" />
                    Couture Timeline
                  </h2>
                  
                  <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
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
                          <div 
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0 ${
                              isCompleted 
                                ? "bg-[#aa9775] border-[#aa9775] text-[#1c1813]" 
                                : "bg-white border-[#c5a880]/30 text-[#c5a880]/45"
                            } ${isActive ? "shadow-[0_0_15px_rgba(170,151,117,0.25)] animate-pulse border-[#aa9775]" : ""}`}
                          >
                            <Icon size={14} />
                          </div>
                          <div className="flex flex-col md:items-center text-left md:text-center">
                            <h4 className={`text-[10px] uppercase tracking-[0.25em] font-bold ${isCompleted ? "text-[#1c1813]" : "text-[#1c1813]/45"}`}>
                              {step.label}
                            </h4>
                            <p className="text-[9px] text-[#1c1813]/55 font-medium mt-0.5 leading-tight md:max-w-[120px]">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Row 3: Live Transit Location Map */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 bg-[#fdfbf7] border border-[#c5a880]/20 p-5 rounded-sm flex flex-col justify-between overflow-hidden shadow-sm">
                  <h3 className="text-[10px] uppercase tracking-[0.35em] text-[#aa9775] font-bold mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#aa9775] rounded-full inline-block animate-ping" />
                    Live Courier Transit Map
                  </h3>
                  
                  {/* Canvas / Placeholder container */}
                  <div className="w-full aspect-[16/9] border border-[#ebdcc6] rounded-sm bg-[#faf6ef]/50 flex items-center justify-center relative">
                    {order.status === "Shipped" || order.status === "Out for Delivery" || order.status === "Delivered" ? (
                      <canvas 
                        ref={canvasRef} 
                        width={400} 
                        height={225} 
                        className="w-full h-full max-h-[300px]"
                      />
                    ) : (
                      <div className="p-6 text-center space-y-3.5 max-w-sm">
                        <Compass size={28} className="text-[#aa9775]/50 mx-auto animate-pulse" />
                        <h4 className="font-editorial text-sm text-[#1c1813] uppercase tracking-widest font-semibold">Atelier Crafting Phase</h4>
                        <p className="text-[10px] text-[#1c1813]/65 leading-relaxed">
                          Your lehenga is currently at our main tailoring studio in Noida. The live courier transit map will activate once the package is dispatched.
                        </p>
                        <span className="inline-block text-[8px] uppercase tracking-widest px-2.5 py-1 bg-[#aa9775]/10 text-[#aa9775] border border-[#aa9775]/20 font-bold rounded-sm mt-1">
                          Location: Noida Atelier Studio
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-4 bg-[#fdfbf7] border border-[#c5a880]/20 p-6 rounded-sm flex flex-col justify-between shadow-sm">
                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#aa9775] font-bold">Transit Status</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">Current Location</span>
                        <strong className="text-sm text-[#1c1813] tracking-wider block mt-0.5 uppercase font-mono">{order.location}</strong>
                      </div>
                      
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#aa9775] block font-bold">Transit Milestone</span>
                        <strong className="text-xs text-[#1c1813]/90 font-semibold block mt-0.5 uppercase font-sans">
                          {order.status === "Tailoring" && isLehenga ? `${lehengaStages[journey.stageIndex].title} (${journey.percentage}% Done)` : order.status}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#c5a880]/10 mt-6 space-y-3">
                    <p className="text-[9px] text-[#1c1813]/65 leading-relaxed">
                      Custom bridal outfits are handcrafted and go through individual sanitization and quality checks before dispatch.
                    </p>
                    <a
                      href="https://wa.me/919041588678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 border border-[#aa9775]/50 hover:border-[#aa9775] text-[#aa9775] hover:bg-[#aa9775]/5 text-[8.5px] uppercase tracking-[0.25em] font-bold transition-all duration-300 text-center inline-block cursor-pointer"
                    >
                      Connect Studio Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-[#fdfbf7] border border-[#c5a880]/25 rounded-sm shadow-sm">
              <Compass size={40} className="text-[#aa9775]/45 mx-auto mb-4 animate-pulse" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#1c1813]/60 font-semibold">
                Please enter a valid Order ID above to track your order details.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
