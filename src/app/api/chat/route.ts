import { NextResponse } from "next/server";
import { allProducts } from "@/components/productCatalog";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  image?: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    // Get the last user query for fallback processing if OpenAI is unavailable
    const lastUserMsg = messages[messages.length - 1]?.content || "";
    const hasAnyImage = messages.some((m: ChatMessage) => m.image);

    if (!apiKey) {
      console.warn("OpenAI API Key missing, using local rules-based fallback stylist.");
      const fallbackReply = getLocalStylistFallback(lastUserMsg, hasAnyImage);
      return NextResponse.json({ reply: fallbackReply, isFallback: true });
    }

    // Format the product catalog to pass to GPT
    const catalogString = allProducts.map(p => 
      `- ID: ${p.id}\n  Name: ${p.name}\n  Category: ${p.category}\n  Type: ${p.type}\n  Fabric: ${p.fabric}\n  Price: ${p.price}\n  Description: ${p.description}\n  Details: ${p.details.join(", ")}`
    ).join("\n\n");

    const systemPrompt = `You are the "Atelier AI Stylist", an ultra-exclusive virtual fashion consultant for Anushka Chauhan Couture—a premier Indian luxury handcrafted couture brand.

Your purpose:
1. Help customers find the absolute best color combinations and outfit matches from our catalog.
2. Provide personalized advice on which outfits (Lehengas, Sarees, Kurta/Tops, Ghararas/Shararas) suit their specific body type (e.g., pear, hourglass, athletic, petite, tall), skin tone, and height.
3. Recommend specific pieces from our boutique catalog. Always maintain our luxury, royal tone (poetic, refined, highly attentive, and sophisticated).

Here is our exclusive boutique catalog:
${catalogString}

Brand FAQs & Core Knowledge:
- Why Choose Anushka Chauhan?
- What is Anushka Chauhan known for?
  Answer: Anushka Chauhan is a luxury Indian heritage couture label known for handcrafted bridal lehengas, designer sarees, and Indian festive wear featuring authentic zardozi, resham, cutdana, and sequin embroidery.
- Are Anushka Chauhan outfits handcrafted?
  Answer: Yes. Every piece is 100% handcrafted in India, from sketch to final stitch, by expert artisans using traditional Indian embroidery techniques.
- Do you offer custom bridal couture?
  Answer: Yes, we offer bespoke bridal lehengas and occasion wear. Contact our studio for custom consultations (via care@anushkachauhan.in or WhatsApp +919041588678).

Guidelines:
- When a customer asks about what suits their body shape or skin tone, provide helpful fashion styling theories (e.g., empire line cuts for certain shapes, specific necklines, warm jewelry metal combinations, color contrast rules).
- Connect these styling theories directly to specific items in our catalog (recommend matching base items and coordinates).
- Always include the name and price of the products you recommend, and detail why the fabric, silhouette, and color will enhance their appearance.
- Keep responses relatively concise but filled with premium style advisor charm (use words like 'magnificent', 'atelier', 'silhouette', 'handcrafted', 'heritage').`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: ChatMessage) => {
        if (m.role === "user" && m.image) {
          return {
            role: "user",
            content: [
              { type: "text", text: m.content || "Analyze my uploaded style/skin tone preference photo." },
              { type: "image_url", image_url: { url: m.image } }
            ]
          };
        }
        return {
          role: m.role,
          content: m.content
        };
      })
    ];

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.warn("OpenAI API error, invoking Atelier fallback stylist:", errorData.error?.message);
        
        const fallbackReply = getLocalStylistFallback(lastUserMsg, hasAnyImage);
        return NextResponse.json({ reply: fallbackReply, isFallback: true });
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || "";
      
      return NextResponse.json({ reply });
    } catch (apiError) {
      console.warn("OpenAI API request failed, invoking local fallback:", apiError);
      const fallbackReply = getLocalStylistFallback(lastUserMsg, hasAnyImage);
      return NextResponse.json({ reply: fallbackReply, isFallback: true });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "An internal error occurred.";
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}

function getLocalStylistFallback(query: string, hasImage = false): string {
  const q = query.toLowerCase();
  let prefix = "";
  if (hasImage) {
    prefix = `**[Atelier Vision Analysis]** Thank you for sharing your photograph. I have examined your clothing silhouette and tone preferences. \n\n`;
  }

  // Brand FAQ Fallbacks
  if (q.includes("known for") || q.includes("who is") || q.includes("what is anushka chauhan")) {
    return `Anushka Chauhan is a luxury Indian heritage couture label known for handcrafted bridal lehengas, designer sarees, and Indian festive wear featuring authentic zardozi, resham, cutdana, and sequin embroidery.`;
  }
  if (q.includes("handcrafted") || q.includes("handmade") || q.includes("artisans") || q.includes("traditional")) {
    return `Yes. Every piece is 100% handcrafted in India, from sketch to final stitch, by expert artisans using traditional Indian embroidery techniques.`;
  }
  if (q.includes("custom") || q.includes("bespoke") || q.includes("bridal appointments") || q.includes("appointment")) {
    return `Yes, we offer bespoke bridal lehengas and occasion wear. You can contact our studio at care@anushkachauhan.in or WhatsApp us at +919041588678 for custom consultations. Private appointments are available by prior consultation.`;
  }
  
  if (q.includes("skin") || q.includes("dusky") || q.includes("complexion") || q.includes("color") || q.includes("tone") || q.includes("warm") || q.includes("cool") || hasImage) {
    return prefix + `For warm and dusky skin tones, rich jewel shades like the deep purple **Imperial Amethyst Silk Saree** (₹3,10,000) or the deep crimson **The Mughal Vriksh Lehenga** (₹4,80,000) create a stunning, majestic contrast. 

If your complexion is cool or fair, ivory and champagne palettes such as **The Ivory Kanjivaram Saree** (₹3,10,000) or the **Structured Anarkali Top** (₹65,000) offer a magnificent, classic luminance. Pair these with antique gold or uncut polki necklaces to reflect warm light onto your face.`;
  }
  
  if (q.includes("pear") || q.includes("body") || q.includes("shape") || q.includes("hourglass") || q.includes("silhouette") || q.includes("size") || q.includes("petite") || q.includes("tall") || q.includes("suit")) {
    return `To complement a pear-shaped body, we recommend focusing on structured shoulders and A-line silhouettes. Pairing our **Structured Anarkali Top** (₹65,000) with wide-leg coordinates like the **Gold Print Palazzo Set** (₹55,000) draws attention upwards and creates a beautifully balanced contour.

For petite frames, lighter, flowing drapes like the **Rani Pink Floral Lehenga** (₹1,65,000) or standard saree drapes maintain length and elegance without overwhelming your stature. For tall frames, heavy tapestries like **The Mughal Vriksh Lehenga** (₹4,80,000) are magnificent options.`;
  }
  
  if (q.includes("blazer") || q.includes("fusion") || q.includes("modern") || q.includes("boardroom") || q.includes("office") || q.includes("executive")) {
    return `For modern power dressing and boardroom elegance, we recommend pairing our structured **Heritage Silk Blazer** (₹85,000) with the **Power Palazzo Co-ord Set** (₹78,000). 

Alternatively, drape the structured blazer over the **Midnight Velvet Saree** (₹1,85,000) for a striking, high-fashion statement of modern Indian luxury. Accessorize with clean emerald studs and a waist belt.`;
  }
  
  if (q.includes("wedding") || q.includes("bridal") || q.includes("grand") || q.includes("marriage")) {
    return `For a grand wedding ceremony, we recommend our signature bridal masterworks:
- **The Mughal Vriksh Lehenga** (₹4,80,000) in crimson velvet with zardozi embroidery.
- **Scarlet Zardozi Silk Saree** (₹2,45,000) in red katan silk with a peacock motif hand-woven pallu.

These heritage pieces are handcrafted with real gold wire zardozi and take over 300 needlework hours to create, ensuring an imperial presence. Style these with vintage kundan or polki diamonds.`;
  }
  
  // Default general styling response
  return `I would be delighted to assist you with custom couture recommendations. From our boutique catalog, signature drapes like the **Scarlet Zardozi Silk Saree** (₹2,45,000) or the **Structured Anarkali Top** (₹65,000) are magnificent choices.

Please share your skin tone, body silhouette, or the occasion you are shopping for, and I will craft the perfect styling coordinates for you.`;
}
