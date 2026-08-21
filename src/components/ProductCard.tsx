"use client";

import React, { useState } from "react";
import { Product, useVeloura } from "@/context/VelouraContext";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useVeloura();
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colorVariants[0]);

  const activeWishlisted = isInWishlist(product.id);

  // Format currency in INR
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleQuickAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick Add: default to first available size and first color
    const defaultSize = product.sizes.includes("S") ? "S" : product.sizes[0];
    addToCart(product, 1, defaultSize, selectedColor.name);
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-white border border-soft-beige/20 shadow-xs hover:shadow-md transition-all duration-500 rounded-xs overflow-hidden"
    >
      {/* Product Image Area */}
      <div 
        className="relative aspect-3/4 w-full bg-champagne/30 overflow-hidden cursor-pointer"
        onClick={() => openQuickView(product)}
        data-cursor="view"
      >
        {/* Secondary Image cross-fade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={hovered ? "secondary" : "primary"}
            src={hovered && product.secondaryImage ? product.secondaryImage : product.primaryImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out scale-100 group-hover:scale-[1.04]"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none select-none">
          {product.isSignature && (
            <span className="bg-espresso/90 text-white text-[8px] font-bold tracking-[0.25em] px-2.5 py-1 uppercase rounded-xs">
              SIGNATURE
            </span>
          )}
          {product.isNew && (
            <span className="bg-muted-wine text-white text-[8px] font-bold tracking-[0.25em] px-2.5 py-1 uppercase rounded-xs">
              NEW
            </span>
          )}
        </div>

        {/* Floating Quick Action Overlays on Desktop */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 px-3 gap-2">
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2.5 bg-white/95 text-deep-charcoal hover:bg-deep-charcoal hover:text-white transition-all duration-300 text-[10px] tracking-widest font-bold uppercase rounded-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            title="Quick View Details"
          >
            <Eye className="w-3.5 h-3.5" />
            QUICK VIEW
          </button>

          {/* Quick Add to Bag */}
          <button
            onClick={handleQuickAddToBag}
            className="p-2.5 bg-deep-charcoal text-white hover:bg-muted-wine transition-colors duration-300 rounded-xs shadow-sm active:scale-95"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile touch-indicators (Always visible on hover/touch) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-xs transition-transform active:scale-75 z-20 ${
            activeWishlisted 
              ? "bg-muted-wine text-white" 
              : "bg-white/80 text-deep-charcoal hover:bg-white hover:text-muted-wine"
          }`}
          aria-label={activeWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${activeWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white text-left space-y-2 select-none">
        <div className="space-y-1">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[9px] tracking-[0.2em] uppercase text-taupe font-bold">
            <span>{product.category}</span>
            <span className="text-espresso font-normal">★ {product.rating}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => openQuickView(product)}
            className="text-xs sm:text-[13px] font-semibold text-deep-charcoal tracking-widest uppercase cursor-pointer hover:text-taupe transition-colors font-sans truncate"
          >
            {product.name}
          </h3>

          {/* Product Description snippet */}
          <p className="text-[11px] text-espresso/75 line-clamp-1 font-serif italic">
            {product.description}
          </p>
        </div>

        {/* Price & Color Variant Dots */}
        <div className="flex items-center justify-between pt-1 border-t border-soft-beige/15">
          <span className="text-xs sm:text-[13px] font-bold text-deep-charcoal tracking-wider">
            {formatPrice(product.price)}
          </span>

          {/* Available Color variants */}
          <div className="flex items-center space-x-1.5">
            {product.colorVariants.map((col, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(col);
                }}
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  selectedColor.name === col.name 
                    ? "ring-1 ring-deep-charcoal scale-110" 
                    : "border-black/10 scale-90 hover:scale-100"
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
          </div>
        </div>

        {/* Mobile Call-To-Action (visible below sm screens) */}
        <div className="pt-2 md:hidden">
          <button
            onClick={handleQuickAddToBag}
            className="w-full py-2 bg-deep-charcoal hover:bg-espresso text-white text-[9px] font-bold tracking-widest uppercase rounded-xs flex items-center justify-center gap-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3 h-3" />
            ADD TO BAG
          </button>
        </div>
      </div>
    </motion.div>
  );
}
