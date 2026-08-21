"use client";

import React, { useState } from "react";
import { useVeloura, Product } from "@/context/VelouraContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, X, Star } from "lucide-react";

interface Look {
  id: string;
  number: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  featuredProductSlugs: string[];
}

export default function LookbookSection() {
  const { productsList, openQuickView } = useVeloura();
  const [selectedLook, setSelectedLook] = useState<Look | null>(null);

  const LOOKS: Look[] = [
    {
      id: "look-1",
      number: "LOOK 01",
      name: "The Quiet Nomad",
      tagline: "Autumn Layering Refined",
      image: "https://images.pexels.com/photos/18978249/pexels-photo-18978249.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      description: "A dialogue between insulation and lightness. The structured drape of our cashmere-wool Aurelia Coat layers gracefully over the ultra-breathable Merino Turtleneck.",
      featuredProductSlugs: ["aurelia-tailored-coat", "evelyn-merino-turtleneck", "elara-leather-bag"],
    },
    {
      id: "look-2",
      number: "LOOK 02",
      name: "Satin Solitude",
      tagline: "Fluid Evening Whispers",
      image: "https://images.pexels.com/photos/34896903/pexels-photo-34896903.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      description: "Celebrating romantic contours with a liquid cowl neckline. The Veloura Satin Dress is paired here with our handcrafted Gold Amara interlocking link chain.",
      featuredProductSlugs: ["veloura-satin-dress", "amara-gold-accent-chain"],
    },
    {
      id: "look-3",
      number: "LOOK 03",
      name: "Structured Grace",
      tagline: "Power Tailoring Remastered",
      image: "https://images.pexels.com/photos/27623995/pexels-photo-27623995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      description: "A confident display of clean angles and soft drape. The single-breasted Noir Structured Blazer acts as an empowering coat over our 100% heavy Celine silk blouse.",
      featuredProductSlugs: ["noir-structured-blazer", "celine-silk-blouse"],
    },
  ];

  // Helper to resolve slugs to real Product objects
  const getLookProducts = (slugs: string[]): Product[] => {
    return productsList.filter((prod) => slugs.includes(prod.slug));
  };

  const handleShopLook = (look: Look) => {
    setSelectedLook(look);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF9F6] px-4 sm:px-6 lg:px-8 border-b border-soft-beige/25">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">EDITORIAL INSPIRATION</span>
          <h2 className="text-4xl sm:text-5xl font-light tracking-[0.2em] text-deep-charcoal font-serif uppercase leading-tight">
            VELOURA LOOKBOOK
          </h2>
          <div className="w-12 h-[1.5px] bg-taupe/50 mx-auto" />
          <p className="max-w-md mx-auto text-xs sm:text-sm text-espresso/70 leading-relaxed font-serif italic">
            "A visual diary of modern silhouettes, considered proportions, and quiet power. Click any spread to shop the featured pieces."
          </p>
        </div>

        {/* Looks Editorial Spreads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKS.map((look) => (
            <motion.div
              key={look.id}
              whileHover={{ y: -5 }}
              className="flex flex-col bg-white border border-soft-beige/20 shadow-xs hover:shadow-lg transition-all duration-500 rounded-xs overflow-hidden group"
            >
              {/* Lookbook photo */}
              <div 
                className="relative aspect-3/4 overflow-hidden cursor-pointer"
                onClick={() => handleShopLook(look)}
                data-cursor="explore"
              >
                <img
                  src={look.image}
                  alt={look.name}
                  className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.03]"
                />
                
                {/* Look number bubble */}
                <div className="absolute top-4 left-4 bg-deep-charcoal/90 backdrop-blur-xs text-white text-[9px] font-bold tracking-[0.2em] px-3 py-1 uppercase rounded-xs">
                  {look.number}
                </div>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 px-5 py-3 text-[10px] tracking-widest font-bold uppercase text-deep-charcoal shadow-md rounded-xs">
                    EXPLORE LOOK
                  </span>
                </div>
              </div>

              {/* Look info */}
              <div className="p-6 text-left space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold tracking-widest text-taupe uppercase block">
                    {look.tagline}
                  </span>
                  <h3 className="text-lg font-light text-deep-charcoal tracking-wider uppercase font-serif">
                    {look.name}
                  </h3>
                  <p className="text-xs text-espresso/85 leading-relaxed font-sans font-light">
                    {look.description}
                  </p>
                </div>

                <button
                  onClick={() => handleShopLook(look)}
                  className="pt-4 border-t border-soft-beige/20 w-full text-[10px] font-bold tracking-[0.2em] text-deep-charcoal hover:text-muted-wine transition-colors uppercase flex items-center justify-between cursor-pointer focus:outline-none"
                >
                  SHOP THE LOOK <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide-out / Modal: Shop the Look featured items */}
      <AnimatePresence>
        {selectedLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLook(null)}
              className="absolute inset-0 bg-deep-charcoal/30 backdrop-blur-md"
            />

            {/* Look Product Cards display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 rounded-xs z-10 text-left border border-soft-beige/20 scrollbar-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLook(null)}
                className="absolute top-4 right-4 p-2 text-deep-charcoal hover:text-taupe rounded-full hover:bg-champagne/40 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header details */}
              <div className="border-b border-soft-beige/30 pb-4 mb-6 space-y-1 select-none">
                <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-taupe font-bold uppercase">
                  <Sparkles className="w-3 h-3 text-muted-wine" />
                  <span>Couture Lookbook</span>
                  <span>•</span>
                  <span>{selectedLook.number}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-deep-charcoal tracking-widest uppercase font-serif">
                  SHOP: {selectedLook.name}
                </h3>
                <p className="text-xs text-espresso/70 italic font-serif">
                  "{selectedLook.description}"
                </p>
              </div>

              {/* Products list grid */}
              <div className="space-y-4 select-none">
                {getLookProducts(selectedLook.featuredProductSlugs).length === 0 ? (
                  <p className="text-xs text-taupe">No products loaded.</p>
                ) : (
                  getLookProducts(selectedLook.featuredProductSlugs).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedLook(null);
                        openQuickView(prod);
                      }}
                      className="flex items-center gap-4 p-3 bg-[#FAF9F6] hover:bg-white border border-soft-beige/20 hover:border-espresso rounded-xs cursor-pointer transition-all duration-300 group"
                    >
                      <div className="w-14 aspect-3/4 bg-champagne/10 relative overflow-hidden rounded-xs flex-shrink-0">
                        <img src={prod.primaryImage} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[8px] tracking-widest text-taupe uppercase font-bold block">{prod.category}</span>
                        <h4 className="text-sm font-semibold tracking-widest text-deep-charcoal uppercase group-hover:text-muted-wine transition-colors">
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs font-bold text-deep-charcoal">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            }).format(prod.price)}
                          </span>
                          <span className="text-[10px] text-espresso/60">• ★ {prod.rating}</span>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-deep-charcoal text-white text-[9px] font-bold tracking-widest uppercase rounded-xs group-hover:bg-muted-wine transition-colors">
                        SELECT SIZE
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
