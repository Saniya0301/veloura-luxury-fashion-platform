"use client";

import React from "react";
import { useVeloura } from "@/context/VelouraContext";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openQuickView,
  } = useVeloura();

  if (!isWishlistOpen) return null;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleMoveToBag = (prod: any) => {
    // Add default size (S) and default color variant to cart
    const defaultSize = prod.sizes.includes("S") ? "S" : prod.sizes[0];
    const defaultColor = prod.colorVariants[0].name;
    addToCart(prod, 1, defaultSize, defaultColor);
    // Remove from wishlist
    toggleWishlist(prod);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="absolute inset-0 bg-deep-charcoal/20 backdrop-blur-md"
        />

        {/* Sliding Drawer Container */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="relative w-full max-w-md h-full bg-ivory shadow-2xl flex flex-col justify-between z-10 border-l border-soft-beige/30"
        >
          {/* Header */}
          <div className="p-5 border-b border-soft-beige/30 flex items-center justify-between bg-white select-none">
            <div className="flex items-center gap-2 text-deep-charcoal">
              <Heart className="w-4 h-4 text-muted-wine fill-current" />
              <span className="text-[11px] tracking-[0.2em] font-bold text-taupe uppercase">Your Curated Edit</span>
              <span className="bg-muted-wine text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            </div>
            
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-deep-charcoal hover:text-taupe transition-colors rounded-full hover:bg-champagne/40"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Body List */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-none select-none">
            {wishlist.length === 0 ? (
              /* Empty state */
              <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
                <Heart className="w-10 h-10 text-taupe/40 animate-pulse" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-deep-charcoal tracking-widest uppercase">YOUR EDIT IS EMPTY</p>
                  <p className="text-[10px] text-taupe uppercase tracking-widest">No saved garments</p>
                </div>
                <p className="text-xs text-espresso/60 font-serif italic max-w-xs">
                  "Curate your ideal wardrobe combinations by saving items to your wishlist for quick access later."
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-3 border border-deep-charcoal text-deep-charcoal hover:bg-deep-charcoal hover:text-white transition-all text-[10px] font-bold tracking-widest uppercase rounded-xs"
                >
                  START CURATING
                </button>
              </div>
            ) : (
              /* Wishlisted list */
              <div className="space-y-4">
                {wishlist.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex gap-4 p-3 bg-white border border-soft-beige/15 rounded-xs items-center"
                  >
                    {/* Image */}
                    <div 
                      className="w-16 aspect-3/4 bg-champagne/10 relative overflow-hidden flex-shrink-0 rounded-xs cursor-pointer"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openQuickView(prod);
                      }}
                    >
                      <img
                        src={prod.primaryImage}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="flex-grow text-left space-y-1">
                      <span className="text-[8px] tracking-widest uppercase text-taupe font-bold">
                        {prod.category}
                      </span>
                      <h4 
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openQuickView(prod);
                        }}
                        className="text-[12px] font-semibold tracking-widest uppercase text-deep-charcoal hover:text-taupe transition-colors cursor-pointer truncate max-w-[150px]"
                      >
                        {prod.name}
                      </h4>
                      <p className="text-[11px] font-bold text-deep-charcoal">
                        {formatPrice(prod.price)}
                      </p>

                      {/* Interactive Add to Bag trigger */}
                      <button
                        onClick={() => handleMoveToBag(prod)}
                        className="text-[9px] tracking-widest font-bold uppercase text-muted-wine flex items-center gap-1 hover:text-deep-charcoal transition-colors pt-2 cursor-pointer focus:outline-none"
                      >
                        ADD TO BAG <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete trigger */}
                    <button
                      onClick={() => toggleWishlist(prod)}
                      className="p-2 text-taupe hover:text-muted-wine transition-colors self-start"
                      title="Remove from saved edits"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer info */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-soft-beige/30 bg-white select-none">
              <button
                onClick={() => {
                  // Add all to bag helper
                  wishlist.forEach((prod) => {
                    const defaultSize = prod.sizes.includes("S") ? "S" : prod.sizes[0];
                    addToCart(prod, 1, defaultSize, prod.colorVariants[0].name);
                  });
                  // Clear wishlist
                  wishlist.forEach(prod => toggleWishlist(prod));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-4 bg-deep-charcoal text-white hover:bg-espresso text-xs font-bold tracking-[0.25em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                MOVE ALL TO BAG
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
