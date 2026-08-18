"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ShoppingBag, Send, Loader2, Camera, ChevronDown } from "lucide-react";
import { useCart } from "./CartContext";
import { Product } from "./ProductModal";
import { allProducts } from "./productCatalog";

interface Combination {
  recommendedProduct: Product;
  stylingAdvice: string;
  accessories: string[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

export default function AICombinator() {
  const { 
    isAIStylistOpen, 
    closeAIStylist, 
    aiPreselectedProduct, 
    addItem 
  } = useCart();

  // Tab State
  const [activeTab, setActiveTab] = useState<"matchmaker" | "chat">("matchmaker");

  // Rules-based Matchmaker States
  const [selectedVibe, setSelectedVibe] = useState("Grand Wedding");
  const [baseProduct, setBaseProduct] = useState<Product | null>(null);
  const [combination, setCombination] = useState<Combination | null>(null);
  const [baseSize, setBaseSize] = useState("");
  const [recSize, setRecSize] = useState("");
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [addedBundle, setAddedBundle] = useState(false);

  // Conversational AI States
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste. Welcome to Anushka's Atelier, your personal couture assistant. Share your occasion, body silhouette, or skin tone preferences, and I will craft the perfect color combinations and couture suggestions for you."
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [selectedProductSizes, setSelectedProductSizes] = useState<{ [productId: string]: string }>({});

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // FAQs State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: "What is Anushka Chauhan known for?",
      a: "Anushka Chauhan is a luxury Indian heritage couture label known for handcrafted bridal lehengas, designer sarees, and Indian festive wear featuring authentic zardozi, resham, cutdana, and sequin embroidery."
    },
    {
      q: "Are Anushka Chauhan outfits handcrafted?",
      a: "Yes. Every piece is 100% handcrafted in India, from sketch to final stitch, by expert artisans using traditional Indian embroidery techniques."
    },
    {
      q: "Do you offer custom bridal couture?",
      a: "Yes, we offer bespoke bridal lehengas and occasion wear. Contact our studio for custom consultations."
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const vibes = [
    { name: "Grand Wedding", desc: "Traditional grandeur & heavy embellishments" },
    { name: "Cocktail Gala", desc: "Contemporary silhouettes & bold statements" },
    { name: "Royal Festive", desc: "Vibrant tones & lighter handlooms" },
    { name: "Executive Couture", desc: "Tailored structures & understated elegance" },
  ];

  const presetPrompts = [
    "What color combination suits a dusky skin tone for an evening reception?",
    "What is the best Lehenga silhouette for a pear-shaped body?",
    "Suggest a modern fusion style matching a structured blazer.",
    "Which fabric and outfit should I pick if I am petite?"
  ];

  // Set the preselected base product or fallback to a default
  useEffect(() => {
    if (isAIStylistOpen) {
      setTimeout(() => {
        if (aiPreselectedProduct) {
          setBaseProduct(aiPreselectedProduct);
          setBaseSize(aiPreselectedProduct.sizes[0] || "M");
          // Also pre-seed the chat if a product is selected
          setChatMessages([
            {
              role: "assistant",
              content: `Greetings. Welcome to Anushka's Atelier. I see you are admiring **${aiPreselectedProduct.name}** (${aiPreselectedProduct.price}). How may I help you style this magnificent piece to suit your body type, or help you match it with the perfect color coordinate?`
            }
          ]);
          setActiveTab("chat"); // Default to chat if styling a specific product
        } else if (!baseProduct) {
          const defaultProduct = allProducts.find(p => p.id === "leh-1") || allProducts[0];
          setBaseProduct(defaultProduct);
          setBaseSize(defaultProduct.sizes[0] || "M");
        }
        setAddedBundle(false);
        setApiError("");
      }, 0);
    }
  }, [isAIStylistOpen, aiPreselectedProduct, baseProduct]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatLoading]);

  // Compute recommendation when base product or vibe changes
  useEffect(() => {
    if (!baseProduct) return;

    let rec: Product | undefined;
    let advice = "";
    let accs: string[] = [];

    const id = baseProduct.id;

    // Rules engine matching products & vibes
    if (baseProduct.category === "Lehengas") {
      if (id === "leh-1") { // Mughal Vriksh (Crimson Silk Velvet)
        if (selectedVibe === "Grand Wedding") {
          rec = allProducts.find(p => p.id === "sar-1"); // Scarlet Zardozi Saree
          advice = "For ultimate imperial presence, double-drape this heavy velvet lehenga with the Scarlet Zardozi Silk Saree. The rich crimson silk velvet is layered beneath the flowing katan silk pallu, creating a magnificent royal court tapestry. Accessorize with vintage uncut polki diamonds and a heavy choker.";
          accs = ["Polki Diamond Choker", "Silk Velvet Potli Bag", "Embroidered Velvet Juttis"];
        } else {
          rec = allProducts.find(p => p.id === "top-3"); // Velvet Jacket Kurta
          advice = "For reception elegance, pair the heavy Mughal Vriksh skirt with the Velvet Jacket Kurta layered open. This keeps the look warm and grand, creating a structured double-velvet winter ensemble. Style with heavy gold temple necklaces.";
          accs = ["Gold Temple Haar", "Zardozi Handband", "Handmade Velvet Mojris"];
        }
      } else if (id === "leh-2") { // Basant Utsav (Marigold Yellow Banarasi)
        if (selectedVibe === "Royal Festive") {
          rec = allProducts.find(p => p.id === "plz-1"); // Gold Print Palazzo Set
          advice = "Perfect for a daytime Mehendi or festive ceremony. Combine the fluid Banarasi silk lehenga with elements from the Gold Print Palazzo Set. The marigold yellow raw silk matches the champagne block-print accents, giving a lighter, breathable styling alternative. Drape with natural marigold hair flowers.";
          accs = ["Jasmine/Marigold Gajra", "Pearl Chandbalis", "Embellished Mojris"];
        } else {
          rec = allProducts.find(p => p.id === "top-1"); // Structured Anarkali Top
          advice = "A festive fusion: pair the Basant Utsav Lehenga skirt with the Structured Anarkali Top. The longline cream Chanderi silk contrasts elegantly against the marigold yellow Banarasi silk, creating a striking double-layer silhouette.";
          accs = ["Polki Drop Earrings", "Raw Silk Clutch", "Beaded Kolhapuris"];
        }
      } else if (id === "leh-3") { // Neelambari (Midnight Indigo)
        if (selectedVibe === "Cocktail Gala") {
          rec = allProducts.find(p => p.id === "plz-3"); // Violet Organza Gharara
          advice = "Inject a modern color-blocking twist. Pair the midnight indigo raw silk Lehenga with elements from the Violet Organza Gharara. The light silver-embroidered violet organza acts as a contrasting dupatta/drape, introducing contemporary jewel tones. Accessorize with sapphire cuffs.";
          accs = ["Sapphire Wristlet Cuff", "Silver Metallic Clutch", "Silver Heel Sandal"];
        } else {
          rec = allProducts.find(p => p.id === "sar-2"); // Midnight Velvet Saree
          advice = "Style this midnight lehenga with the Midnight Velvet Saree used as a dual-texture shoulder drape. The silver zardozi of the lehenga echoes the scatter sequins of the black velvet saree, creating a starry night look.";
          accs = ["Emerald Choker", "Velvet Clutch", "Silver Juttis"];
        }
      } else { // Fallback/Other Lehengas
        rec = allProducts.find(p => p.category === "Sarees") || allProducts[0];
        advice = "A timeless heritage pairing. The lehenga's handcrafted panels are beautifully complemented by the contrasting weave of this pure silk drape. Style with custom matching jewelry.";
        accs = ["Chanderi Potli", "Gold-gilt Bangles"];
      }
    } else if (baseProduct.category === "Sarees") {
      if (id === "sar-1") { // Scarlet Zardozi Saree
        if (selectedVibe === "Grand Wedding") {
          rec = allProducts.find(p => p.id === "top-3"); // Velvet Jacket Kurta
          advice = "A majestic winter drape. Layer the Scarlet Zardozi katan silk saree under the Wine Velvet Jacket Kurta (worn open). The crimson silk borders peeking out from the rich wine-red velvet coat command extreme luxury and warmth. Accessorize with antique gold jhumkas.";
          accs = ["Antique Gold Jhumkas", "Velvet Envelope Clutch", "Zardozi Juttis"];
        } else {
          rec = allProducts.find(p => p.id === "top-1"); // Structured Anarkali Top
          advice = "Style the Scarlet Zardozi saree with the Structured Anarkali Top worn underneath as a longline royal blouse. The cream Chanderi and gold block printing offer a beautiful high-neck collar that frames the red pallu.";
          accs = ["Pearl Drop Choker", "Silk Potli Bag", "Cream Silk Sandals"];
        }
      } else if (id === "sar-2") { // Midnight Velvet Saree
        if (selectedVibe === "Cocktail Gala") {
          rec = allProducts.find(p => p.id === "top-4"); // Heritage Silk Blazer
          advice = "Pure power dressing. Style the dramatic black velvet saree with the structured Ivory Silk Dupion Blazer worn as the outer layer. The hand-embroidered blazer lapels sitting atop the velvet drape present an iconic, high-fashion statement of modern Indian luxury. Finish with sharp emerald studs.";
          accs = ["Emerald Studs", "Metallic Waist Belt", "Black Stilettoes"];
        } else {
          rec = allProducts.find(p => p.id === "plz-3"); // Violet Organza Gharara
          advice = "Vamp up the velvet. Contrast the heavy drape of the black velvet saree with the light, floating sheer violet organza gharara beneath. The silver embroidery links the pieces, forming a captivating dark-gothic festive edit.";
          accs = ["Amethyst Pendant", "Silver Clutch", "Beaded Flats"];
        }
      } else if (id === "sar-3") { // Ivory Kanjivaram Saree
        if (selectedVibe === "Executive Couture") {
          rec = allProducts.find(p => p.id === "top-4"); // Heritage Silk Blazer
          advice = "Modern boardroom grace. Frame the pristine ivory Kanjivaram and gold zari border with the structured Ivory Silk Blazer. This monochrome styling blends handloom purity with tailored authority, ideal for high-level events.";
          accs = ["Minimalist Gold Band", "Leather Document Case", "Ivory Block Heels"];
        } else {
          rec = allProducts.find(p => p.id === "top-1"); // Structured Anarkali Top
          advice = "Style this traditional temple Kanjivaram with the Structured Anarkali Top. The cream Chanderi silk aligns perfectly with the off-white mulberry silk, forming an elegant layered tunic look beneath the drape.";
          accs = ["Kundan Earrings", "Handwoven Silk Potli", "Gold Slip-ons"];
        }
      } else { // Imperial Amethyst / Other Sarees
        rec = allProducts.find(p => p.id === "top-3") || allProducts[0];
        advice = "A tone-on-tone jewel compilation. The deep purple Kanjivaram drape pairs with the rich texture of the velvet outerwear, resulting in an opulent, layered winter look.";
        accs = ["Gold Collar Neckpiece", "Velvet Pouches"];
      }
    } else { // Tops & Plazos (Direct Coordinates)
      if (baseProduct.category === "Tops") {
        if (id === "top-1") { // Structured Anarkali Top
          rec = allProducts.find(p => p.id === "plz-1"); // Gold Print Palazzo Set
          advice = "Curated ensemble for daytime festive events. The structured cream Chanderi bodice flows into the wide-leg champagne block-print palazzo. The matching gold metallic motifs coordinate into a clean, floating look. Add polki earrings.";
          accs = ["Polki Drop Earrings", "Champagne Clutch", "Embroidered Khussa"];
        } else if (id === "top-2") { // Embroidered Silk Kurti
          rec = allProducts.find(p => p.id === "plz-2"); // Power Palazzo Co-ord Set
          advice = "The ultimate boardroom-to-dinner transition. Combine the Mysore silk kurti with the sand linen palazzo pants. The organic linen texture balances the rich sheen of raw silk, with the phulkari embroidered cuffs adding a subtle splash of color.";
          accs = ["Silver Oxidized Kada", "Linen Tote Bag", "Tan Leather Sandals"];
        } else if (id === "top-3") { // Velvet Jacket Kurta
          rec = allProducts.find(p => p.id === "plz-3"); // Violet Organza Gharara
          advice = "A striking contrast of weights and textures. The rich, heavy wine-red velvet jacket is paired with the flared, lightweight violet organza gharara. The silver tilla embroidery ties the outfits together in royal color blocking.";
          accs = ["Ruby Studs", "Wine Velvet Potli", "Silver Heels"];
        } else { // Heritage Silk Blazer
          rec = allProducts.find(p => p.id === "plz-2"); // Power Palazzo Co-ord Set
          advice = "A clean, modern silhouette. The structured ivory dupion blazer pairs beautifully with the sand linen palazzo pants. This look is perfect for executive forums and cultural exhibitions alike, matching structure with ease.";
          accs = ["Minimalist Gold Cuff", "Suede Handbag", "Sand Mules"];
        }
      } else { // Base is Palazzo / Plazo
        if (id === "plz-1") { // Gold Print Palazzo
          rec = allProducts.find(p => p.id === "top-1"); // Structured Anarkali Top
          advice = "A cohesive cream and gold coordinates set. The champagne block-print palazzo pairs naturally with the longline structure of the cream Chanderi Anarkali, keeping the silhouette flowing yet tailored.";
          accs = ["Chandbalis", "Champagne Potli"];
        } else if (id === "plz-2") { // Power Palazzo Set
          rec = allProducts.find(p => p.id === "top-4"); // Heritage Silk Blazer
          advice = "High-fashion executive look. The sand linen palazzo is paired with the structured Ivory Silk Blazer. This pairs a casual heritage fabric (linen) with premium dupion silk structure, showing modern tailoring mastery.";
          accs = ["Gold Ring", "Tan Heels"];
        } else if (id === "plz-3") { // Violet Organza Gharara
          rec = allProducts.find(p => p.id === "top-3"); // Velvet Jacket Kurta
          advice = "A royal velvet-organza outfit. The flared silver-embroidered violet gharara bottom provides breathability and volume underneath the structured wine velvet jacket kurta. Truly majestic.";
          accs = ["Ruby Choker", "Velvet Juttis"];
        } else { // Emerald Sharara
          rec = allProducts.find(p => p.id === "top-2"); // Embroidered Silk Kurti
          advice = "Vibrant emerald green and ivory styling. The dense gold tilla on the green sharara flare matches the delicate hand-embroidered neckline of the ivory Mysore silk kurti. Fresh and regal.";
          accs = ["Emerald Drop Jhumkas", "Beaded Sandals"];
        }
      }
    }

    if (rec) {
      setTimeout(() => {
        setCombination({
          recommendedProduct: rec,
          stylingAdvice: advice,
          accessories: accs,
        });
        setRecSize(rec.sizes[0] || "M");
      }, 0);
    }
  }, [baseProduct, selectedVibe]);

  // Handle typing effect for the styling advice
  useEffect(() => {
    if (!combination) return;
    
    let interval: NodeJS.Timeout;
    
    const timeout = setTimeout(() => {
      setIsTyping(true);
      setTypingText("");
      let index = 0;
      const fullText = combination.stylingAdvice;
      
      interval = setInterval(() => {
        setTypingText((prev) => prev + fullText.charAt(index));
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 6);
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [combination]);

  const handleAddBundle = () => {
    if (!baseProduct || !combination) return;
    addItem(baseProduct, baseSize);
    addItem(combination.recommendedProduct, recSize);
    setAddedBundle(true);
    setTimeout(() => {
      setAddedBundle(false);
      closeAIStylist();
    }, 1500);
  };

  const getBundleTotal = () => {
    if (!baseProduct || !combination) return "₹0";
    
    const parsePrice = (priceStr: string) => {
      return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
    };

    const total = parsePrice(baseProduct.price) + parsePrice(combination.recommendedProduct.price);
    return `₹${total.toLocaleString("en-IN")}`;
  };

  // Conversational AI handlers
  const handleChatSend = async (text: string, imageOverride?: string | null) => {
    const finalImage = imageOverride !== undefined ? imageOverride : selectedImage;
    if (!text.trim() && !finalImage) return;
    if (isChatLoading) return;

    const userMsg: Message = { 
      role: "user", 
      content: text || "Analyze my uploaded style/skin tone preference photo.",
      image: finalImage || undefined 
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsChatLoading(true);
    setApiError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
            image: m.image
          })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setChatMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setApiError(data.error || "Apologies. We are experiencing issues connecting to the styling server.");
      }
    } catch {
      setApiError("A network error occurred. Please verify your connection.");
    } finally {
      setIsChatLoading(false);
    }
  };

  // Extract products mentioned in ChatGPT response to display as quick-action cards
  const getProductsMentioned = (content: string): Product[] => {
    return allProducts.filter((p) => {
      const nameMatch = content.toLowerCase().includes(p.name.toLowerCase());
      const idMatch = content.toLowerCase().includes(p.id.toLowerCase());
      return nameMatch || idMatch;
    });
  };

  return (
    <AnimatePresence>
      {isAIStylistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAIStylist}
            className="fixed inset-0 bg-[#1c0d0e]/80 backdrop-blur-md z-[150]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#2c1619] border-l border-[#d59f9b]/20 z-[151] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-[#d59f9b]/15 flex items-center justify-between bg-[#1c0d0e]/50">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full border border-[#d59f9b]/35 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.15)] bg-[#2c1619]">
                  <img
                    src="/couture-assistant.jpg"
                    alt="Anushka's Atelier Stylist Avatar"
                    className="w-full h-full object-cover scale-105"
                  />
                  {/* Green active dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-[#2c1619] rounded-full" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg tracking-[0.1em] text-[#f5ebd9] uppercase font-bold">
                    Anushka&apos;s Atelier
                  </h3>
                  <p className="text-[8px] tracking-[0.15em] text-[#d59f9b]/80 uppercase font-light">
                    Your Personal Couture Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={closeAIStylist}
                className="w-8 h-8 rounded-full border border-[#d59f9b]/20 hover:border-[#d59f9b] flex items-center justify-center text-[#f5ebd9] transition-all duration-300 hover:bg-[#d59f9b]/10 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex border-b border-[#d59f9b]/10 bg-[#1c0d0e]/20">
              <button
                onClick={() => setActiveTab("matchmaker")}
                className={`flex-1 py-3 text-[9px] uppercase tracking-[0.25em] font-light transition-all duration-300 cursor-pointer ${
                  activeTab === "matchmaker"
                    ? "text-[#d59f9b] border-b border-[#d59f9b] bg-[#d59f9b]/5 font-semibold"
                    : "text-[#f5ebd9]/50 hover:text-[#f5ebd9]"
                }`}
              >
                Ensemble Matchmaker
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 text-[9px] uppercase tracking-[0.25em] font-light transition-all duration-300 cursor-pointer ${
                  activeTab === "chat"
                    ? "text-[#d59f9b] border-b border-[#d59f9b] bg-[#d59f9b]/5 font-semibold"
                    : "text-[#f5ebd9]/50 hover:text-[#f5ebd9]"
                }`}
              >
                Stylist Consult Chat
              </button>
            </div>

            {/* Content Body - MATCHMAKER TAB */}
            {activeTab === "matchmaker" && (
              <div className="flex-grow flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                  {/* Occasion / Vibe Selector */}
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#d59f9b] font-semibold mb-3">
                      Select Style Vibe
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {vibes.map((v) => (
                        <button
                          key={v.name}
                          onClick={() => setSelectedVibe(v.name)}
                          className={`p-3 text-left border rounded-sm transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                            selectedVibe === v.name
                              ? "border-[#d59f9b] bg-[#d59f9b]/10 shadow-[0_0_10px_rgba(212,175,55,0.05)]"
                              : "border-[#d59f9b]/15 hover:border-[#d59f9b]/45 bg-[#3d2124]/30"
                          }`}
                        >
                          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#f5ebd9]">
                            {v.name}
                          </span>
                          <span className="text-[8px] text-[#f5ebd9]/50 font-light mt-1 lowercase leading-tight">
                            {v.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Outfit Combinator Visualizer */}
                  <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#d59f9b] font-semibold">
                      Couture Combination Match
                    </p>

                    {baseProduct && combination && (
                      <div className="grid grid-cols-2 gap-4 relative">
                        {/* Golden sparkles connection line */}
                        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#d59f9b] to-transparent animate-pulse" />
                          <div className="bg-[#2c1619] border border-[#d59f9b]/45 rounded-full px-2 py-1 flex items-center gap-1 shadow-lg backdrop-blur-sm">
                            <Sparkles size={8} className="text-[#d59f9b]" />
                            <span className="text-[6px] tracking-widest uppercase font-light text-[#d59f9b]">curated</span>
                          </div>
                          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#d59f9b] to-transparent animate-pulse" />
                        </div>

                        {/* Primary Garment Card */}
                        <div className="border border-[#d59f9b]/15 bg-[#3d2124]/20 p-3 rounded-sm flex flex-col justify-between group">
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm mb-3">
                            <img
                              src={baseProduct.imageUrl}
                              alt={baseProduct.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-2 left-2 text-[6px] uppercase tracking-widest bg-[#2c1619]/90 text-[#d59f9b] px-2 py-0.5 border border-[#d59f9b]/20 rounded-sm">
                              Base Piece
                            </span>
                          </div>
                          <div>
                            <span className="text-[7px] uppercase tracking-widest text-[#d59f9b]/75 font-light">
                              {baseProduct.category}
                            </span>
                            <h4 className="font-editorial text-xs text-[#f5ebd9] uppercase tracking-wide truncate mt-0.5">
                              {baseProduct.name}
                            </h4>
                            <p className="text-[10px] text-[#f5ebd9]/90 mt-1 font-light">{baseProduct.price}</p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-[#d59f9b]/10 flex items-center justify-between">
                            <span className="text-[8px] uppercase tracking-widest text-[#f5ebd9]/50 font-light">Size</span>
                            <select
                              value={baseSize}
                              onChange={(e) => setBaseSize(e.target.value)}
                              className="bg-[#2c1619] text-[#f5ebd9] text-[8px] uppercase tracking-widest font-light border border-[#d59f9b]/30 rounded-sm px-1.5 py-0.5 focus:outline-none focus:border-[#d59f9b]"
                            >
                              {baseProduct.sizes.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Recommended Coordinate Card */}
                        <div className="border border-[#d59f9b]/15 bg-[#3d2124]/20 p-3 rounded-sm flex flex-col justify-between group">
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm mb-3">
                            <img
                              src={combination.recommendedProduct.imageUrl}
                              alt={combination.recommendedProduct.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-2 left-2 text-[6px] uppercase tracking-widest bg-[#d59f9b] text-[#2c1619] px-2 py-0.5 rounded-sm font-semibold">
                              Recommended Match
                            </span>
                          </div>
                          <div>
                            <span className="text-[7px] uppercase tracking-widest text-[#d59f9b]/75 font-light">
                              {combination.recommendedProduct.category}
                            </span>
                            <h4 className="font-editorial text-xs text-[#f5ebd9] uppercase tracking-wide truncate mt-0.5">
                              {combination.recommendedProduct.name}
                            </h4>
                            <p className="text-[10px] text-[#f5ebd9]/90 mt-1 font-light">{combination.recommendedProduct.price}</p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-[#d59f9b]/10 flex items-center justify-between">
                            <span className="text-[8px] uppercase tracking-widest text-[#f5ebd9]/50 font-light">Size</span>
                            <select
                              value={recSize}
                              onChange={(e) => setRecSize(e.target.value)}
                              className="bg-[#2c1619] text-[#f5ebd9] text-[8px] uppercase tracking-widest font-light border border-[#d59f9b]/30 rounded-sm px-1.5 py-0.5 focus:outline-none focus:border-[#d59f9b]"
                            >
                              {combination.recommendedProduct.sizes.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Stylist Analysis Panel */}
                  {combination && (
                    <div className="bg-[#3d2124]/40 border border-[#d59f9b]/25 p-5 md:p-6 relative rounded-sm shadow-inner min-h-[140px] flex flex-col justify-between">
                      <div className="absolute -top-3 left-4 bg-[#2c1619] px-2.5 py-0.5 border border-[#d59f9b]/20 flex items-center gap-1.5 rounded-sm">
                        <Sparkles size={10} className="text-[#d59f9b]" />
                        <span className="text-[8px] tracking-[0.2em] uppercase font-light text-[#d59f9b]">Atelier Styling Advice</span>
                      </div>
                      
                      <div className="text-xs text-[#f5ebd9]/90 leading-relaxed font-light mt-2 min-h-[80px]">
                        {typingText}
                        {isTyping && <span className="inline-block w-1.5 h-3 bg-[#d59f9b] ml-0.5 animate-pulse" />}
                      </div>

                      {/* Curated accessories */}
                      {combination.accessories.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-[#d59f9b]/15">
                          <p className="text-[8px] uppercase tracking-[0.25em] text-[#d59f9b] font-semibold mb-2">Recommended Accents</p>
                          <div className="flex flex-wrap gap-1.5">
                            {combination.accessories.map((acc, index) => (
                              <span key={index} className="text-[8px] uppercase tracking-wider text-[#f5ebd9]/75 bg-[#2c1619] border border-[#d59f9b]/15 px-2 py-0.5 rounded-sm">
                                {acc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Change Base Product list */}
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-[#d59f9b]/10 pb-2">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#d59f9b] font-semibold">
                        Change Primary Garment
                      </p>
                      <span className="text-[8px] text-[#f5ebd9]/55 font-light">
                        Select base to style
                      </span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                      {allProducts.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setBaseProduct(p);
                            setBaseSize(p.sizes[0] || "M");
                          }}
                          className={`flex-shrink-0 w-24 p-1.5 border rounded-sm transition-all duration-300 ${
                            baseProduct?.id === p.id 
                              ? "border-[#d59f9b] bg-[#d59f9b]/5" 
                              : "border-transparent hover:border-[#d59f9b]/30 bg-[#3d2124]/10"
                          }`}
                        >
                          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm mb-1.5">
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-[8px] uppercase tracking-widest text-[#f5ebd9] truncate text-center">
                            {p.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky Drawer Footer Bundle Checkout */}
                {baseProduct && combination && (
                  <div className="p-6 md:p-8 border-t border-[#d59f9b]/15 bg-[#1c0d0e]/80 backdrop-blur-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[8px] tracking-[0.2em] uppercase text-[#f5ebd9]/50 font-light block">
                          Ensemble Bundle ({baseProduct.name} + {combination.recommendedProduct.name})
                        </span>
                        <span className="text-[10px] uppercase text-[#d59f9b] font-semibold tracking-wider">
                          Special Outfit Curation
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl md:text-2xl text-[#f5ebd9] font-light tracking-wide">
                          {getBundleTotal()}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddBundle}
                      className={`w-full py-4 text-[10px] uppercase tracking-[0.5em] font-light flex items-center justify-center gap-3 transition-all duration-500 rounded-sm cursor-pointer shadow-lg ${
                        addedBundle
                          ? "bg-[#5a7a5a] text-white border border-[#5a7a5a]"
                          : "bg-[#d59f9b] text-[#2c1619] hover:bg-[#f5ebd9] hover:text-[#2c1619]"
                      }`}
                    >
                      <ShoppingBag size={14} />
                      {addedBundle ? "Ensemble Added to Bag ✓" : "Add Royal Ensemble to Bag"}
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            {/* Content Body - CHAT TAB */}
            {activeTab === "chat" && (
              <div className="flex-grow flex flex-col justify-between overflow-hidden">
                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-[#1c0d0e]/20">
                  {chatMessages.map((msg, index) => {
                    const isAssistant = msg.role === "assistant";
                    const mentionedProducts = isAssistant ? getProductsMentioned(msg.content) : [];
                    
                    return (
                      <div
                        key={index}
                        className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                      >
                        {/* Bubble */}
                        <div
                          className={`max-w-[85%] rounded-sm p-4 text-xs leading-relaxed font-light ${
                            isAssistant
                              ? "bg-[#3d2124]/30 border border-[#d59f9b]/20 text-[#f5ebd9] relative"
                              : "bg-[#d59f9b] text-[#2c1619] rounded-tr-none font-normal"
                          }`}
                        >
                          {/* Sparkle icon for AI */}
                          {isAssistant && (
                            <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#2c1619] border border-[#d59f9b]/30 flex items-center justify-center text-[#d59f9b]">
                              <Sparkles size={8} />
                            </div>
                          )}

                          {/* Image rendering inside chat bubble */}
                          {msg.image && (
                            <div className="mb-3 max-w-[200px] overflow-hidden rounded-sm border border-[#d59f9b]/20">
                              <img
                                src={msg.image}
                                alt="User Uploaded Preference"
                                className="w-full h-auto object-contain"
                              />
                            </div>
                          )}
                          
                          {/* Parse markdown bold and newlines simply */}
                          <div className="whitespace-pre-line">
                            {msg.content.split("**").map((part, i) => 
                              i % 2 === 1 ? <strong key={i} className="font-semibold text-[#d59f9b]">{part}</strong> : part
                            )}
                          </div>
                        </div>

                        {/* FAQs Accordion under initial welcome message */}
                        {index === 0 && isAssistant && (
                          <div className="w-full max-w-[85%] mt-3 border border-[#d59f9b]/20 bg-[#3d2124]/30 rounded-sm p-4 text-[#f5ebd9] relative">
                            <h4 className="font-editorial text-xs tracking-[0.1em] text-[#d59f9b] uppercase mb-3 flex items-center gap-2 font-bold">
                              <Sparkles className="text-[#d59f9b]" size={10} /> Why Choose Anushka Chauhan?
                            </h4>
                            <div className="space-y-3 divide-y divide-[#d59f9b]/10">
                              {faqs.map((faq, faqIdx) => {
                                const isOpen = openFaqIndex === faqIdx;
                                return (
                                  <div key={faqIdx} className={faqIdx > 0 ? "pt-3" : ""}>
                                    <button
                                      type="button"
                                      onClick={() => setOpenFaqIndex(isOpen ? null : faqIdx)}
                                      className="w-full flex items-center justify-between text-left text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#f5ebd9] hover:text-[#d59f9b] transition-colors gap-2 cursor-pointer"
                                    >
                                      <span>{faq.q}</span>
                                      <ChevronDown
                                        size={12}
                                        className={`text-[#d59f9b] shrink-0 transition-transform duration-300 ${
                                          isOpen ? "rotate-180" : ""
                                        }`}
                                      />
                                    </button>
                                    <AnimatePresence initial={false}>
                                      {isOpen && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="overflow-hidden"
                                        >
                                          <p className="text-[10.5px] sm:text-xs text-[#f5ebd9]/75 font-light leading-relaxed mt-2 pl-2 border-l border-[#d59f9b]/35 normal-case tracking-normal">
                                            {faq.a}
                                          </p>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Inline Product Cards */}
                        {mentionedProducts.length > 0 && (
                          <div className="w-[85%] mt-3 space-y-2">
                            <p className="text-[7px] uppercase tracking-widest text-[#d59f9b] font-semibold flex items-center gap-1">
                              <Sparkles size={8} /> Products mentioned:
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                              {mentionedProducts.map((p) => {
                                const selectedSize = selectedProductSizes[p.id] || p.sizes[0] || "M";
                                return (
                                  <div
                                    key={p.id}
                                    className="flex items-center gap-3 p-2 bg-[#3d2124]/60 border border-[#d59f9b]/15 rounded-sm"
                                  >
                                    <img
                                      src={p.imageUrl}
                                      alt={p.name}
                                      className="w-12 h-16 object-cover rounded-sm border border-[#d59f9b]/10"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h5 className="text-[10px] uppercase text-[#f5ebd9] font-editorial tracking-wide truncate">
                                        {p.name}
                                      </h5>
                                      <p className="text-[9px] text-[#d59f9b] font-light mt-0.5">{p.price}</p>
                                      
                                      <div className="flex items-center gap-2 mt-1.5">
                                        <select
                                          value={selectedSize}
                                          onChange={(e) => 
                                            setSelectedProductSizes(prev => ({ ...prev, [p.id]: e.target.value }))
                                          }
                                          className="bg-[#2c1619] text-[#f5ebd9] text-[7px] uppercase tracking-widest border border-[#d59f9b]/20 rounded-sm px-1 py-0.5 focus:outline-none"
                                        >
                                          {p.sizes.map(sz => (
                                            <option key={sz} value={sz}>{sz}</option>
                                          ))}
                                        </select>
                                        <button
                                          onClick={() => {
                                            addItem(p, selectedSize);
                                          }}
                                          className="px-2 py-1 bg-[#d59f9b] text-[#2c1619] text-[7px] uppercase tracking-widest hover:bg-[#f5ebd9] transition-all duration-300 rounded-sm flex items-center gap-1"
                                        >
                                          <ShoppingBag size={8} /> Add
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Loading Indicator */}
                  {isChatLoading && (
                    <div className="flex items-start">
                      <div className="bg-[#3d2124]/30 border border-[#d59f9b]/20 text-[#f5ebd9] rounded-sm p-4 text-xs font-light max-w-[80%] flex items-center gap-2 relative">
                        <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#2c1619] border border-[#d59f9b]/30 flex items-center justify-center text-[#d59f9b]">
                          <Sparkles size={8} className="animate-spin" />
                        </div>
                        <Loader2 className="animate-spin text-[#d59f9b]" size={12} />
                        <span>Atelier stylist is curating recommendations...</span>
                      </div>
                    </div>
                  )}

                  {/* API Configuration Error */}
                  {apiError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-200 text-[10px] uppercase tracking-widest rounded-sm text-center">
                      {apiError}
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Prompts & Chat Input Area */}
                <div className="p-4 border-t border-[#d59f9b]/15 bg-[#1c0d0e]/80 space-y-4">
                  {/* Preset chips - only visible when chat is short */}
                  {chatMessages.length <= 2 && !isChatLoading && (
                    <div className="space-y-1.5">
                      <p className="text-[7px] uppercase tracking-widest text-[#d59f9b] font-semibold">Suggested Questions</p>
                      <div className="flex flex-wrap gap-1.5">
                        {presetPrompts.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleChatSend(p, null)}
                            className="text-[8px] uppercase tracking-wider text-[#f5ebd9]/75 bg-[#3d2124]/40 border border-[#d59f9b]/15 hover:border-[#d59f9b] px-2 py-1 rounded-sm text-left transition-all duration-300"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                   {/* Image Preview Box */}
                  {selectedImage && (
                    <div className="relative inline-block bg-[#3d2124]/50 p-1.5 border border-[#d59f9b]/30 rounded-sm">
                      <img src={selectedImage} alt="Preview" className="h-16 w-auto object-contain rounded-sm" />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute -top-1.5 -right-1.5 bg-[#2c1619] border border-[#d59f9b]/45 text-[#d59f9b] hover:text-[#f5ebd9] rounded-full p-0.5 shadow-md cursor-pointer transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  )}

                  {/* Input Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleChatSend(chatInput);
                    }}
                    className="flex gap-2"
                  >
                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {/* Image Upload Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-12 border border-[#d59f9b]/30 hover:border-[#d59f9b] text-[#d59f9b] flex items-center justify-center rounded-sm transition-all duration-300 cursor-pointer bg-transparent hover:bg-[#d59f9b]/10"
                      title="Upload photo"
                    >
                      <Camera size={16} />
                    </button>

                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask styling questions, or upload a photo to analyze..."
                      className="flex-1 bg-[#2c1619] text-[#f5ebd9] border border-[#d59f9b]/20 rounded-sm px-3.5 py-3 text-xs placeholder-[#f5ebd9]/30 focus:outline-none focus:border-[#d59f9b] focus:ring-1 focus:ring-[#d59f9b]"
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || (!chatInput.trim() && !selectedImage)}
                      className="w-12 bg-[#d59f9b] hover:bg-[#f5ebd9] disabled:bg-[#d59f9b]/30 text-[#2c1619] disabled:text-[#2c1619]/40 flex items-center justify-center rounded-sm transition-all duration-300 cursor-pointer"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
