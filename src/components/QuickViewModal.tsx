"use client";

import React, { useState, useEffect } from "react";
import { useVeloura } from "@/context/VelouraContext";
import { X, ShoppingBag, Heart, ShieldCheck, HelpCircle, Star, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickViewModal() {
  const {
    isQuickViewOpen,
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useVeloura();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Sync state on product change
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedSize(quickViewProduct.sizes[0]);
      setSelectedColor(quickViewProduct.colorVariants[0].name);
      setQuantity(1);
      setActiveAccordion(null);
    }
  }, [quickViewProduct]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    if (isQuickViewOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isQuickViewOpen, closeQuickView]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  // Format currency in INR
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAddToBag = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    closeQuickView();
  };

  const toggleAccordion = (name: string) => {
    setActiveAccordion((prev) => (prev === name ? null : name));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="absolute inset-0 bg-deep-charcoal/40 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-5xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl rounded-xs flex flex-col md:flex-row z-10 text-left border border-soft-beige/20 scrollbar-none"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 p-2 text-deep-charcoal hover:text-taupe transition-colors z-20 bg-white/80 backdrop-blur-xs rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Images Gallery */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col gap-4">
            <div className="relative aspect-3/4 bg-champagne/10 overflow-hidden rounded-xs">
              <img
                src={product.images[activeImageIndex] || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto py-1 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-3/4 flex-shrink-0 bg-champagne/10 rounded-xs overflow-hidden border transition-all duration-300 ${
                      activeImageIndex === idx 
                        ? "border-espresso ring-1 ring-espresso" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details Panel */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-soft-beige/30">
            <div className="space-y-6">
              {/* Category, Status & Star rating */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] uppercase text-taupe font-bold">
                  {product.category} LABEL
                </span>
                
                <div className="flex items-center gap-1.5 text-xs text-espresso">
                  <Star className="w-3.5 h-3.5 fill-current text-espresso" />
                  <span className="font-semibold">{product.rating || "4.8"}</span>
                  <span className="text-taupe">(12 Reviews)</span>
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-light text-deep-charcoal tracking-widest font-serif uppercase">
                  {product.name}
                </h2>
                <p className="text-xl sm:text-2xl font-bold text-deep-charcoal">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Sizing & Material details */}
              <p className="text-sm text-espresso/80 leading-relaxed font-serif italic">
                {product.description}
              </p>

              {/* Color variant Selector */}
              <div className="space-y-2.5">
                <span className="text-[10px] tracking-[0.25em] uppercase text-taupe font-bold block">
                  Select Color: <span className="text-deep-charcoal">{selectedColor}</span>
                </span>
                <div className="flex space-x-2">
                  {product.colorVariants.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(col.name)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor === col.name
                          ? "ring-1 ring-deep-charcoal scale-105"
                          : "border-black/10 hover:scale-105"
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size variant selector */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-[10px] tracking-[0.25em] uppercase text-taupe font-bold">
                  <span>Select Size</span>
                  <span className="underline cursor-pointer hover:text-deep-charcoal">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border text-[11px] tracking-widest font-semibold uppercase transition-all rounded-xs ${
                        selectedSize === size
                          ? "bg-deep-charcoal text-white border-deep-charcoal"
                          : "border-soft-beige/60 text-deep-charcoal hover:border-deep-charcoal"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="space-y-2.5">
                <span className="text-[10px] tracking-[0.25em] uppercase text-taupe font-bold block">
                  Quantity
                </span>
                <div className="flex items-center w-28 border border-soft-beige/80 rounded-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-espresso hover:text-taupe focus:outline-none"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-grow text-center text-xs font-bold text-deep-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-espresso hover:text-taupe focus:outline-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Interactive Accordion Details */}
              <div className="border-t border-soft-beige/30 pt-4 space-y-3 text-xs text-deep-charcoal font-medium select-none">
                {/* Accordion 1: Material */}
                <div className="border-b border-soft-beige/20 pb-3">
                  <button
                    onClick={() => toggleAccordion("material")}
                    className="w-full flex justify-between items-center text-left hover:text-taupe font-sans tracking-widest text-[10px] uppercase font-bold"
                  >
                    <span>Fabric Composition</span>
                    <span>{activeAccordion === "material" ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {activeAccordion === "material" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden text-[12px] font-normal leading-relaxed text-espresso/80 mt-2 pl-1 space-y-1"
                      >
                        <p><strong>Primary:</strong> {product.material}</p>
                        <ul className="list-disc pl-4 space-y-1 mt-1">
                          {product.details.map((detail, dIdx) => (
                            <li key={dIdx}>{detail}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: Care */}
                <div className="border-b border-soft-beige/20 pb-3">
                  <button
                    onClick={() => toggleAccordion("care")}
                    className="w-full flex justify-between items-center text-left hover:text-taupe font-sans tracking-widest text-[10px] uppercase font-bold"
                  >
                    <span>Care Instructions</span>
                    <span>{activeAccordion === "care" ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {activeAccordion === "care" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden text-[12px] font-normal leading-relaxed text-espresso/80 mt-2 pl-1"
                      >
                        <p>{product.care}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 3: Delivery */}
                <div className="border-b border-soft-beige/20 pb-3">
                  <button
                    onClick={() => toggleAccordion("delivery")}
                    className="w-full flex justify-between items-center text-left hover:text-taupe font-sans tracking-widest text-[10px] uppercase font-bold"
                  >
                    <span>Complimentary Shipping & Returns</span>
                    <span>{activeAccordion === "delivery" ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {activeAccordion === "delivery" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden text-[11px] font-normal leading-relaxed text-espresso/80 mt-2 pl-1 space-y-1.5"
                      >
                        <p>We provide global standard delivery completely free of cost on all purchases above ₹5,000. Orders dispatch within 24-48 business hours from our central Indian atelier.</p>
                        <p>Enjoy a hassle-free 14 days returns/exchange cycle for all unworn articles containing intact tags.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="pt-6 mt-6 border-t border-soft-beige/30 flex gap-4">
              <button
                onClick={handleAddToBag}
                className="flex-1 py-4 bg-deep-charcoal text-white hover:bg-espresso text-xs font-bold tracking-[0.25em] uppercase rounded-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO BAG • {formatPrice(product.price * quantity)}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 border rounded-xs transition-colors flex items-center justify-center active:scale-95 ${
                  isWishlisted 
                    ? "bg-muted-wine text-white border-muted-wine" 
                    : "border-soft-beige hover:border-deep-charcoal text-deep-charcoal"
                }`}
                title={isWishlisted ? "Remove Saved Edit" : "Save to Curated Edit"}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
