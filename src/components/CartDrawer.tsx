"use client";

import React, { useState } from "react";
import { useVeloura } from "@/context/VelouraContext";
import { X, Trash2, Plus, Minus, ShieldCheck, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useVeloura();

  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  if (!isCartOpen) return null;

  // Calculate prices
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingThreshold = 5000;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingRemaining = shippingThreshold - subtotal;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCheckout = () => {
    setCheckoutLoading(true);
    // Simulate premium payment processing
    setTimeout(() => {
      setCheckoutLoading(false);
      setIsCheckoutSuccess(true);
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setIsCheckoutSuccess(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isCheckoutSuccess) setIsCartOpen(false);
          }}
          className="absolute inset-0 bg-deep-charcoal/30 backdrop-blur-md"
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
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-[0.2em] font-bold text-taupe uppercase">Atelier Bag</span>
              <span className="bg-deep-charcoal text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-deep-charcoal hover:text-taupe transition-colors rounded-full hover:bg-champagne/40"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {isCheckoutSuccess ? (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6 select-none bg-white">
              <div className="w-16 h-16 bg-champagne rounded-full flex items-center justify-center text-espresso animate-float">
                <Sparkles className="w-8 h-8 text-espresso" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-light text-deep-charcoal tracking-widest font-serif uppercase">
                  ORDER PLACED
                </h3>
                <p className="text-[11px] tracking-widest text-taupe uppercase font-semibold">
                  Atelier Dispatch Logged
                </p>
              </div>

              <p className="text-sm text-espresso/80 leading-relaxed font-serif italic max-w-sm">
                "Thank you for curating with Veloura. Your personalized fashion order has been reserved in our central database, and our couturiers have begun preparation."
              </p>

              <div className="border border-soft-beige/40 bg-[#FAF9F6] p-4 text-[11px] text-left space-y-1.5 w-full rounded-xs">
                <p className="text-deep-charcoal font-bold">Estimated Dispatch: <span className="font-normal text-espresso">Within 24 Hours</span></p>
                <p className="text-deep-charcoal font-bold">Transaction Reference: <span className="font-normal text-espresso">#VL-{Math.floor(100000 + Math.random() * 900000)}</span></p>
                <p className="text-deep-charcoal font-bold">Total Cleared: <span className="font-normal text-espresso">{formatPrice(subtotal)}</span></p>
              </div>

              <button
                onClick={handleCloseSuccess}
                className="w-full py-4 bg-deep-charcoal text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-espresso transition-colors rounded-xs"
              >
                RETURN TO LABELS
              </button>
            </div>
          ) : (
            <>
              {/* Main Body */}
              <div className="flex-grow overflow-y-auto p-5 space-y-6 scrollbar-none">
                {/* Shipping Free Progress Indicator (Atelier details) */}
                {cart.length > 0 && (
                  <div className="p-4 bg-white border border-soft-beige/25 rounded-xs space-y-2.5 select-none">
                    <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
                      <span className="text-taupe">Shipping Progress</span>
                      <span className="text-deep-charcoal">
                        {isFreeShipping ? "COMPLIMENTARY SECURED" : `ADD ${formatPrice(shippingRemaining)}`}
                      </span>
                    </div>

                    {/* Simple sleek micro-bar */}
                    <div className="h-1 bg-soft-beige/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                        className="h-full bg-espresso"
                        transition={{ duration: 0.6 }}
                      />
                    </div>

                    <p className="text-[11px] text-espresso/70 font-serif italic">
                      {isFreeShipping
                        ? "Your curated edit qualifies for complimentary global premium packaging & secured delivery."
                        : `Complete your collection with ${formatPrice(shippingRemaining)} more to clear free dispatch.`}
                    </p>
                  </div>
                )}

                {/* Carted Items */}
                {cart.length === 0 ? (
                  /* Empty state */
                  <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6 select-none">
                    <Compass className="w-10 h-10 text-taupe/40 animate-spin-slow" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-deep-charcoal tracking-widest uppercase">Your bag is empty</p>
                      <p className="text-[11px] text-taupe uppercase tracking-widest">No garments currently curated</p>
                    </div>
                    <p className="text-xs text-espresso/60 font-serif italic max-w-xs">
                      "A capsule wardrobe starts with a single, considered choice."
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 border border-deep-charcoal text-deep-charcoal hover:bg-deep-charcoal hover:text-white transition-all text-[10px] font-bold tracking-widest uppercase rounded-xs"
                    >
                      BROWSE ALL PRODUCTS
                    </button>
                  </div>
                ) : (
                  /* Listed items */
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-3 bg-white border border-soft-beige/10 rounded-xs items-center select-none"
                      >
                        {/* Image */}
                        <div className="w-20 aspect-3/4 bg-champagne/10 relative overflow-hidden flex-shrink-0 rounded-xs">
                          <img
                            src={item.product.primaryImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Middle Text Details */}
                        <div className="flex-grow text-left space-y-1">
                          <span className="text-[9px] tracking-widest uppercase text-taupe font-bold">
                            {item.product.category}
                          </span>
                          <h4 className="text-[12px] font-semibold tracking-widest uppercase text-deep-charcoal truncate max-w-[200px]">
                            {item.product.name}
                          </h4>
                          
                          <div className="flex gap-3 text-[10px] text-espresso/80 tracking-wider">
                            <span>Size: <strong className="font-bold text-deep-charcoal">{item.size}</strong></span>
                            <span>Color: <strong className="font-bold text-deep-charcoal">{item.color}</strong></span>
                          </div>

                          <div className="text-[12px] font-bold text-deep-charcoal pt-1">
                            {formatPrice(item.product.price)}
                          </div>

                          {/* Plus/minus quantity editing */}
                          <div className="flex items-center w-24 border border-soft-beige/80 rounded-xs mt-1.5 h-7">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="px-2 text-espresso hover:text-taupe focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="flex-grow text-center text-[11px] font-bold text-deep-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="px-2 text-espresso hover:text-taupe focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                        {/* Right side single removal button */}
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.size, item.color)
                          }
                          className="p-2 text-taupe hover:text-muted-wine transition-colors self-start"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Footing */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-soft-beige/30 bg-white space-y-4 select-none">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs tracking-widest text-taupe uppercase">
                      <span>Total Items</span>
                      <span className="font-bold text-deep-charcoal">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs tracking-widest text-taupe uppercase">
                      <span>secured packaging</span>
                      <span className="text-[#34D399] font-bold">FREE</span>
                    </div>

                    <div className="flex justify-between text-sm tracking-[0.2em] text-deep-charcoal uppercase pt-1 border-t border-soft-beige/10">
                      <span>subtotal price</span>
                      <span className="font-bold">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  {/* Security stamp */}
                  <div className="flex items-center gap-1.5 text-[10px] text-taupe justify-center">
                    <ShieldCheck className="w-4 h-4 text-taupe/80" />
                    <span>SSL Encrypted Checkout • Atelier Dispatch secured</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-4 bg-deep-charcoal text-white hover:bg-espresso text-xs font-bold tracking-[0.25em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 disabled:bg-taupe/60 cursor-pointer"
                  >
                    {checkoutLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        PROCESSING SECURED SECRETS...
                      </span>
                    ) : (
                      <>
                        SECURE CHECKOUT • {formatPrice(subtotal)}
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
