"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, HelpCircle, Mail, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulate premium server registration
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  const FAQS = [
    { q: "What is your shipping policy?", a: "We provide complimentary premium secured shipping on all Indian purchases over ₹5,000. Under ₹5,000, a flat rate of ₹250 applies." },
    { q: "How do returns work?", a: "We offer a seamless 14-day return and exchange cycle for all unworn garments with tags still attached. Simply request a reverse pick-up through our customer desk." },
    { q: "Where are garments manufactured?", a: "All Veloura articles are designed and sculpted in small batches across family-owned boutique workshops in North India, employing certified biological textiles." }
  ];

  return (
    <footer className="bg-deep-charcoal text-warm-white pt-16 pb-8 border-t border-white/5 px-4 sm:px-6 lg:px-8 relative z-10 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Segment: Newsletter & Accordion FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-12">
          {/* Column 1: Newsletter subscription */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">
                ATELIER CORRESPONDENCE
              </span>
              <h3 className="text-3xl font-light tracking-[0.1em] uppercase font-serif">
                THE VELOURA LETTER
              </h3>
              <p className="text-xs sm:text-sm text-taupe/80 max-w-md leading-relaxed font-serif italic">
                "Private previews, new collection drops, and thoughtful editorial stories. Sent with quiet restraint."
              </p>
            </div>

            {/* Newsletter input form */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-taupe/30 bg-[#1F2124] text-left rounded-xs text-xs space-y-1 max-w-md"
                >
                  <p className="font-semibold text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    LITERATURE SYNCED
                  </p>
                  <p className="text-taupe/90 font-serif italic">
                    "We have successfully added your details to our ledger. Welcome to the inner circle."
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="max-w-md space-y-2.5">
                  <div className="flex border-b border-taupe/40 pb-2 items-center hover:border-white transition-colors duration-300">
                    <Mail className="w-4 h-4 text-taupe mr-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="bg-transparent border-none text-xs w-full text-white tracking-widest focus:outline-none placeholder-taupe/45"
                      aria-label="Email address field"
                    />
                    <button
                      type="submit"
                      className="p-1 text-taupe hover:text-white transition-colors focus:outline-none"
                      aria-label="Submit subscription"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold text-left">
                      Please input a valid email address.
                    </p>
                  )}
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Column 2: Minimalist Customer Care Accordion */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">
              CUSTOMER DESK DIRECTORIES
            </span>
            <div className="space-y-2 text-xs">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-white/5 pb-2.5">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left hover:text-taupe uppercase tracking-widest font-bold text-[10px]"
                  >
                    <span>{faq.q}</span>
                    <span>{activeFaq === idx ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden text-taupe text-[12px] font-light leading-relaxed mt-2"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Segment: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-xs pt-4">
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] font-bold text-taupe uppercase">SHOPPING</h4>
            <ul className="space-y-2 text-taupe hover:text-white transition-colors">
              <li><button className="hover:text-white py-0.5 block">New In Arrivals</button></li>
              <li><button className="hover:text-white py-0.5 block">Dresses & Silk Slips</button></li>
              <li><button className="hover:text-white py-0.5 block">Tailoring & Blazers</button></li>
              <li><button className="hover:text-white py-0.5 block">Wool & Cashmere Coats</button></li>
              <li><button className="hover:text-white py-0.5 block">Jewellery & Bags</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] font-bold text-taupe uppercase">COLLECTIONS</h4>
            <ul className="space-y-2 text-taupe">
              <li><button className="hover:text-white py-0.5 block">A/W 2026 Campaign</button></li>
              <li><button className="hover:text-white py-0.5 block">The Seasonal Lookbook</button></li>
              <li><button className="hover:text-white py-0.5 block">Signature Monograms</button></li>
              <li><button className="hover:text-white py-0.5 block">The Art of Less Edit</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] font-bold text-taupe uppercase">LABEL PATHS</h4>
            <ul className="space-y-2 text-taupe">
              <li><button className="hover:text-white py-0.5 block">Our Philosophy</button></li>
              <li><button className="hover:text-white py-0.5 block">The Journal Archive</button></li>
              <li><button className="hover:text-white py-0.5 block">Atelier Craftsmanship</button></li>
              <li><button className="hover:text-white py-0.5 block">Sustainal integrity</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] font-bold text-taupe uppercase">FEEDS</h4>
            <ul className="space-y-2 text-taupe font-bold tracking-widest text-[10px]">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white uppercase block">INSTAGRAM ↗</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-white uppercase block">PINTEREST ↗</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white uppercase block">TIKTOK ↗</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white uppercase block">YOUTUBE ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Segment: Branding & Copyright */}
        <div className="border-t border-white/5 pt-12 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-left">
            <span 
              className="text-3xl tracking-[0.3em] font-light text-white select-none font-serif"
            >
              VELOURA
            </span>
            <div className="hidden md:block w-[1px] h-6 bg-white/10" />
            <p className="text-[10px] text-taupe tracking-widest uppercase">
              PREMIUM FASHION E-COMMERCE • PRIVATE REGISTERED LABEL
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-taupe font-semibold tracking-widest">
            <Globe className="w-3.5 h-3.5" />
            <span>EN (IN) • INR (₹)</span>
            <span>•</span>
            <span>© 2026 VELOURA. INTENTIONAL DESIGN.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
