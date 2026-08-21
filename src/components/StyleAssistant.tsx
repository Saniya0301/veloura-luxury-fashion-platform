"use client";

import React, { useState, useEffect, useRef } from "react";
import { useVeloura, Product } from "@/context/VelouraContext";
import { X, Sparkles, Send, Star, HelpCircle, ArrowRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "user" | "stylist";
  text: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

export default function StyleAssistant() {
  const { isAssistantOpen, setIsAssistantOpen, productsList, openQuickView } = useVeloura();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Initialize with a welcome message from the chief stylist
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "stylist",
          text: "Welcome to Veloura. I am your personal digital curator. It would be my utmost pleasure to build you a bespoke wardrobe capsule. Tell me about an upcoming occasion, or describe your personal style aesthetic.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isAssistantOpen) return null;

  // Process the request with intelligent luxury stylist keywords
  const processStylingQuery = (prompt: string): { text: string; recommendations: Product[] } => {
    const q = prompt.toLowerCase();
    
    // Find products by categories
    const dressProducts = productsList.filter(p => p.category === "dresses");
    const tailoringProducts = productsList.filter(p => p.category === "tailoring");
    const essentials = productsList.filter(p => p.category === "essentials");
    const accessories = productsList.filter(p => p.category === "accessories");

    let text = "";
    let recommendations: Product[] = [];

    if (q.includes("date") || q.includes("dinner") || q.includes("wedding") || q.includes("evening") || q.includes("party")) {
      const dress1 = dressProducts.find(p => p.slug === "veloura-satin-dress");
      const accessory1 = accessories.find(p => p.slug === "amara-gold-accent-chain");
      const dress2 = dressProducts.find(p => p.slug === "silk-evening-couture-dress");
      
      if (dress1) recommendations.push(dress1);
      if (dress2) recommendations.push(dress2);
      if (accessory1) recommendations.push(accessory1);

      text = "For an elegant evening affair, I highly recommend building around a fluid bias-cut drape. The Veloura Satin Dress or the Couture Silk Evening Dress is spectacular—both capture light beautifully and flow with liquid grace. Pair either piece with the minimalist 18k Gold Amara Chain to highlight the neckline with quiet confidence.";
    } 
    else if (q.includes("office") || q.includes("work") || q.includes("blazer") || q.includes("corporate") || q.includes("meeting") || q.includes("tailor")) {
      const blazer = tailoringProducts.find(p => p.slug === "noir-structured-blazer");
      const blouse = essentials.find(p => p.slug === "celine-silk-blouse");
      const coat = tailoringProducts.find(p => p.slug === "aurelia-tailored-coat");

      if (blazer) recommendations.push(blazer);
      if (blouse) recommendations.push(blouse);
      if (coat) recommendations.push(coat);

      text = "To project effortless boardroom authority, structural shoulders are paramount. Our Noir Structured Blazer paired with the 100% heavy silk Celine Blouse forms an impeccable, sharp core silhouette. Should the climate require layering, the Aurelia Cashmere-Wool Coat delivers architectural protection and refinement.";
    } 
    else if (q.includes("airport") || q.includes("comfort") || q.includes("travel") || q.includes("casual") || q.includes("cozy") || q.includes("everyday")) {
      const knit = essentials.find(p => p.slug === "evelyn-merino-turtleneck");
      const bag = accessories.find(p => p.slug === "elara-leather-bag");
      const blouse = essentials.find(p => p.slug === "celine-silk-blouse");

      if (knit) recommendations.push(knit);
      if (bag) recommendations.push(bag);
      if (blouse) recommendations.push(blouse);

      text = "Travel and everyday luxury require exceptional breathability and soft drapes. I recommend starting with our seamless Evelyn Turtleneck knit from ultra-fine Italian Merino wool—it behaves like a second skin. Combine it with the spacious, sculptural Elara Leather Bag to hold all your travel essentials beautifully.";
    } 
    else if (q.includes("bag") || q.includes("accessory") || q.includes("accessories") || q.includes("jewel") || q.includes("gold")) {
      const bag = accessories.find(p => p.slug === "elara-leather-bag");
      const gold = accessories.find(p => p.slug === "amara-gold-accent-chain");

      if (bag) recommendations.push(bag);
      if (gold) recommendations.push(gold);

      text = "The finishing touch is never secondary; it defines the visual punctuation of your look. Our Elara Handbag is sculpted from premium split-suede calfskin to catch the eye with timeless curves. For metallic accents, the Amara Gold Interlocking Link Necklace adds an exquisite whisper of luxury.";
    } 
    else {
      // General fallbacks
      const sign1 = productsList.find(p => p.isSignature);
      const new1 = productsList.find(p => p.isNew);
      const essential1 = essentials[0];

      if (sign1) recommendations.push(sign1);
      if (new1) recommendations.push(new1);
      if (essential1) recommendations.push(essential1);

      text = "A perfect capsule wardrobe begins with a dialogue between structure and drape. I have handpicked a few signature Veloura pieces that represent our design ethos: tailored lines, timeless neutrals, and liquid silks.";
    }

    return { text, recommendations };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate luxury slow reply
    setTimeout(() => {
      const { text: replyText, recommendations } = processStylingQuery(text);
      const stylistMsg: ChatMessage = {
        id: `stylist-${Date.now()}`,
        sender: "stylist",
        text: replyText,
        recommendedProducts: recommendations,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, stylistMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const presetScenarios = [
    { title: "Elegant Dinner Date", prompt: "I need an elegant outfit suggestion for a romantic dinner date." },
    { title: "Minimalist Office Wardrobe", prompt: "Suggest some key luxury pieces for a sophisticated workplace office look." },
    { title: "Sleek Airport Travel", prompt: "Help me assemble a comfortable yet premium travel look for a long flight." },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAssistantOpen(false)}
          className="absolute inset-0 bg-deep-charcoal/20 backdrop-blur-md"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="relative w-full max-w-lg h-full bg-[#FAF9F6] shadow-2xl flex flex-col justify-between z-10 border-l border-soft-beige/30"
        >
          {/* Header */}
          <div className="p-5 border-b border-soft-beige/30 flex items-center justify-between bg-white select-none">
            <div className="flex items-center gap-2">
              <div className="bg-espresso/5 p-1 rounded-full text-espresso">
                <Sparkles className="w-4 h-4 text-espresso" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-widest text-deep-charcoal uppercase">Veloura Personal Stylist</h3>
                <p className="text-[9px] text-taupe tracking-wider font-bold uppercase">AI CURATED SERVICES</p>
              </div>
            </div>

            <button
              onClick={() => setIsAssistantOpen(false)}
              className="p-1.5 text-deep-charcoal hover:text-taupe transition-colors rounded-full hover:bg-champagne/40"
              aria-label="Close assistant panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log area */}
          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-5 space-y-6 scrollbar-none"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-2 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Meta details */}
                <div className="flex items-center gap-1.5 text-[9px] text-taupe font-bold uppercase tracking-widest select-none">
                  {msg.sender === "user" ? (
                    <>
                      <span>You</span>
                      <User className="w-2.5 h-2.5" />
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-2.5 h-2.5 text-espresso" />
                      <span>ATELIER CURATOR</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message bubble */}
                <div
                  className={`p-4 rounded-xs max-w-[85%] text-[13px] leading-relaxed tracking-wide font-sans shadow-xs text-left ${
                    msg.sender === "user"
                      ? "bg-deep-charcoal text-white"
                      : "bg-white text-espresso border border-soft-beige/20 font-serif italic"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Recommended Product Cards directly clickable inside chat! */}
                {msg.sender === "stylist" && msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full grid grid-cols-2 gap-3 pt-2"
                  >
                    {msg.recommendedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => openQuickView(prod)}
                        className="bg-white p-2.5 border border-soft-beige/35 hover:border-espresso rounded-xs cursor-pointer transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="aspect-3/4 w-full bg-champagne/10 relative overflow-hidden rounded-xs">
                          <img src={prod.primaryImage} alt={prod.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="mt-2 text-left">
                          <h4 className="text-[10px] font-bold tracking-widest text-deep-charcoal uppercase truncate group-hover:text-muted-wine">
                            {prod.name}
                          </h4>
                          <div className="flex items-center justify-between text-[9px] mt-0.5 font-bold">
                            <span className="text-taupe uppercase">{prod.category}</span>
                            <span className="text-deep-charcoal">
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                              }).format(prod.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Stylist Typing bubble */}
            {isTyping && (
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center gap-1.5 text-[9px] text-taupe font-bold uppercase tracking-widest">
                  <Sparkles className="w-2.5 h-2.5 text-espresso" />
                  <span>Curation in progress...</span>
                </div>
                <div className="bg-white px-4 py-3 rounded-xs border border-soft-beige/20 flex space-x-1.5 items-center">
                  <div className="w-2 h-2 bg-taupe rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-taupe rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-taupe rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Buttons (only shown if chat is empty/short) */}
          {messages.length < 3 && (
            <div className="px-5 py-3 border-t border-soft-beige/10 space-y-2 select-none text-left">
              <span className="text-[9px] tracking-[0.25em] text-taupe uppercase font-bold block">
                Occasions Ideas:
              </span>
              <div className="flex flex-col gap-1.5">
                {presetScenarios.map((sc, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(sc.prompt)}
                    className="text-left px-3 py-2 border border-soft-beige/50 hover:border-espresso hover:bg-white text-xs text-deep-charcoal tracking-wide transition-colors duration-200 rounded-xs flex items-center justify-between group focus:outline-none"
                  >
                    <span>{sc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-taupe group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stylist input box */}
          <div className="p-4 border-t border-soft-beige/30 bg-white select-none">
            <div className="relative border border-soft-beige hover:border-taupe bg-[#FCFBF8] rounded-xs flex items-center pr-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(inputValue);
                }}
                placeholder="Ask the Veloura Curators..."
                className="w-full bg-transparent border-none py-3 px-4 text-xs text-deep-charcoal tracking-wide placeholder-taupe/60 focus:outline-none"
              />
              <button
                onClick={() => handleSend(inputValue)}
                className="p-1.5 text-deep-charcoal hover:text-muted-wine transition-colors focus:outline-none"
                aria-label="Submit query"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[8px] text-center text-taupe tracking-widest uppercase mt-3">
              Veloura style algorithms are purely client-focused.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
