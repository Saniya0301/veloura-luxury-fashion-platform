"use client";

import React, { useState, useEffect, useRef } from "react";
import { useVeloura, Product } from "@/context/VelouraContext";
import { X, Search, ChevronRight, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, productsList, openQuickView } = useVeloura();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter products in real-time
  const matchedProducts = query.trim() === "" 
    ? [] 
    : productsList.filter((prod) => {
        const q = query.toLowerCase();
        return (
          prod.name.toLowerCase().includes(q) ||
          prod.category.toLowerCase().includes(q) ||
          prod.description.toLowerCase().includes(q) ||
          prod.material.toLowerCase().includes(q)
        );
      });

  const trendingSearches = [
    "Satin Dress",
    "Tailored Coat",
    "Noir Structured",
    "Silk Blouse",
    "Leather Bag",
    "Merino Turtleneck"
  ];

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleProductResultClick = (prod: Product) => {
    setIsSearchOpen(false);
    openQuickView(prod);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-start bg-ivory">
        {/* Fullscreen header section */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 border-b border-soft-beige/30 flex items-center justify-between">
          <span className="text-xl tracking-[0.3em] font-light text-deep-charcoal font-serif">
            VELOURA SEARCH
          </span>

          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-deep-charcoal hover:text-taupe transition-colors rounded-full hover:bg-champagne/40 flex items-center gap-1 focus:outline-none"
            aria-label="Close search overlay"
          >
            <span className="text-[10px] tracking-widest font-bold uppercase hidden sm:inline">CLOSE</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Interface Area */}
        <div className="flex-grow overflow-y-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full select-none">
          <div className="space-y-8">
            {/* Real-time bar */}
            <div className="relative border-b-2 border-deep-charcoal/80 pb-4 flex items-center">
              <Search className="w-6 h-6 text-taupe absolute left-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-none pl-10 pr-4 text-2xl sm:text-4xl md:text-5xl font-light text-deep-charcoal tracking-wide placeholder-taupe/40 focus:outline-none font-serif"
                aria-label="Search inquiry"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-taupe hover:text-deep-charcoal"
                  aria-label="Clear query text"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Trending Quick Tags */}
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.25em] text-taupe uppercase font-bold text-left">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2 text-left">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleTrendingClick(term)}
                    className="px-4 py-2 bg-white hover:bg-deep-charcoal hover:text-white border border-soft-beige/50 hover:border-deep-charcoal text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Matching Live Results */}
            <div className="pt-8 text-left space-y-6">
              {query.trim() !== "" && (
                <div className="flex items-center justify-between text-xs tracking-widest uppercase text-taupe border-b border-soft-beige/20 pb-2">
                  <span>Results for: <strong className="text-deep-charcoal">"{query}"</strong></span>
                  <span>{matchedProducts.length} items matched</span>
                </div>
              )}

              {matchedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductResultClick(prod)}
                      className="flex items-center gap-4 p-3 bg-white hover:bg-[#FAF9F6] border border-soft-beige/20 hover:border-taupe/35 rounded-xs cursor-pointer transition-all duration-300 group"
                    >
                      <div className="w-14 aspect-3/4 bg-champagne/10 relative overflow-hidden rounded-xs flex-shrink-0">
                        <img src={prod.primaryImage} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[8px] tracking-widest text-taupe uppercase font-bold block">{prod.category}</span>
                        <h4 className="text-sm font-semibold tracking-widest text-deep-charcoal uppercase group-hover:text-muted-wine transition-colors">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-espresso font-bold mt-0.5">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format(prod.price)}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-taupe group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              ) : (
                query.trim() !== "" && (
                  <div className="text-center py-12 space-y-3">
                    <Compass className="w-8 h-8 text-taupe/40 mx-auto animate-float" />
                    <p className="text-sm font-semibold text-deep-charcoal tracking-widest uppercase">No garments match your query</p>
                    <p className="text-xs text-espresso/60 font-serif italic max-w-sm mx-auto">
                      "Perhaps explore other collection pathways or double-check spelling."
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
