"use client";

import React, { useState, useEffect } from "react";
import { useVeloura } from "@/context/VelouraContext";
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HeaderProps {
  onCategoryChange?: (category: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export default function Header({ onCategoryChange, onNavigateToSection }: HeaderProps) {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAssistantOpen,
  } = useVeloura();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Calculate cart count
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (category: string) => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    // Scroll to products list section automatically
    if (onNavigateToSection) {
      onNavigateToSection("shop-section");
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-panel py-3 shadow-xs border-b border-soft-beige/30"
            : "bg-transparent py-5 lg:py-6"
        }`}
      >
        {/* Subtle Announcement Bar (Pre-header) */}
        {!isScrolled && (
          <div className="w-full text-center text-[10px] tracking-[0.2em] text-taupe uppercase pb-3 border-b border-soft-beige/20 hidden md:block select-none">
            Complimentary shipping on orders over ₹5,000 • Crafted for Modern Elegance
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-1 md:mt-2">
          {/* Mobile menu hamburger (left on mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-deep-charcoal p-1.5 hover:text-taupe transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-medium tracking-[0.25em] text-deep-charcoal select-none">
            <button
              onClick={() => handleNavClick("all")}
              className="hover:text-taupe transition-colors duration-300 cursor-pointer editorial-underline"
            >
              NEW IN
            </button>
            
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveMegaMenu("women")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                className="hover:text-taupe transition-colors duration-300 cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                WOMEN <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              
              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeMegaMenu === "women" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full -left-20 w-[600px] glass-panel p-6 shadow-xl border border-soft-beige/40 flex gap-8 z-50 rounded-xs text-left"
                  >
                    <div className="flex-1">
                      <p className="text-[10px] tracking-widest text-taupe uppercase font-semibold mb-3 border-b border-soft-beige/30 pb-1">Categories</p>
                      <ul className="space-y-2 text-[12px] text-deep-charcoal font-normal tracking-wide">
                        <li>
                          <button onClick={() => handleNavClick("all")} className="hover:text-muted-wine transition-colors py-1 block w-full text-left">All Women</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("dresses")} className="hover:text-muted-wine transition-colors py-1 block w-full text-left">Dresses & Silk Slips</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("tailoring")} className="hover:text-muted-wine transition-colors py-1 block w-full text-left">Tailoring & Coats</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("essentials")} className="hover:text-muted-wine transition-colors py-1 block w-full text-left">Elevated Essentials</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("accessories")} className="hover:text-muted-wine transition-colors py-1 block w-full text-left">Accessories & Jewellery</button>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] tracking-widest text-taupe uppercase font-semibold mb-3 border-b border-soft-beige/30 pb-1">Curated Edits</p>
                      <ul className="space-y-2 text-[12px] text-deep-charcoal font-normal tracking-wide">
                        <li>
                          <button onClick={() => handleScrollToSection("campaign-section")} className="hover:text-muted-wine transition-colors py-1 block">A/W 2026 Campaign</button>
                        </li>
                        <li>
                          <button onClick={() => handleScrollToSection("lookbook-section")} className="hover:text-muted-wine transition-colors py-1 block text-left">The Lookbook Spreads</button>
                        </li>
                        <li>
                          <button onClick={() => handleScrollToSection("signature-section")} className="hover:text-muted-wine transition-colors py-1 block text-left">Asymmetric Signatures</button>
                        </li>
                      </ul>
                    </div>
                    <div className="w-[180px] h-[160px] relative overflow-hidden rounded-xs">
                      <img 
                        src="https://images.pexels.com/photos/20578707/pexels-photo-20578707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=200" 
                        alt="Campaign Model" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-end p-2">
                        <span className="text-[10px] tracking-widest text-white uppercase font-medium">Quiet Luxury</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleScrollToSection("lookbook-section")}
              className="hover:text-taupe transition-colors duration-300 cursor-pointer editorial-underline"
            >
              LOOKBOOK
            </button>
            <button
              onClick={() => handleScrollToSection("journal-section")}
              className="hover:text-taupe transition-colors duration-300 cursor-pointer editorial-underline"
            >
              JOURNAL
            </button>
            <button
              onClick={() => handleScrollToSection("about-section")}
              className="hover:text-taupe transition-colors duration-300 cursor-pointer editorial-underline"
            >
              ABOUT
            </button>
          </nav>

          {/* Elegant branding center */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl lg:text-3xl tracking-[0.35em] font-light text-deep-charcoal hover:opacity-85 transition-opacity"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            VELOURA
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-deep-charcoal">
            {/* Style Assistant Trigger */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="p-1.5 rounded-full hover:bg-champagne/40 transition-colors flex items-center gap-1.5 border border-muted-wine/10 bg-champagne/10 relative text-muted-wine group"
              title="Veloura AI Style Assistant"
            >
              <Sparkles className="w-4 h-4 text-muted-wine group-hover:rotate-12 transition-transform" />
              <span className="hidden md:inline text-[9px] font-bold tracking-widest uppercase">Style AI</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-taupe transition-colors"
              aria-label="Search items"
            >
              <Search className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 hover:text-taupe transition-colors relative"
              aria-label="View Saved Edits"
            >
              <Heart className="w-4 sm:w-5 h-4 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-muted-wine text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:text-taupe transition-colors relative"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-deep-charcoal text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-deep-charcoal/30 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 w-4/5 max-w-sm h-full bg-ivory shadow-2xl flex flex-col justify-between p-6"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-soft-beige/30">
                  <span className="text-xl tracking-[0.3em] font-light text-deep-charcoal font-editorial">
                    VELOURA
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-deep-charcoal hover:text-taupe"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Drawer Menu Links */}
                <nav className="mt-8 space-y-6 text-sm tracking-[0.2em] text-deep-charcoal font-medium">
                  <div>
                    <p className="text-[10px] tracking-widest text-taupe uppercase mb-3">Shop Collections</p>
                    <div className="space-y-4 pl-2">
                      <button
                        onClick={() => handleNavClick("all")}
                        className="block w-full text-left py-1 hover:text-muted-wine transition-colors"
                      >
                        NEW IN
                      </button>
                      <button
                        onClick={() => handleNavClick("dresses")}
                        className="block w-full text-left py-1 hover:text-muted-wine transition-colors"
                      >
                        DRESSES & SILKS
                      </button>
                      <button
                        onClick={() => handleNavClick("tailoring")}
                        className="block w-full text-left py-1 hover:text-muted-wine transition-colors"
                      >
                        TAILORING & COATS
                      </button>
                      <button
                        onClick={() => handleNavClick("essentials")}
                        className="block w-full text-left py-1 hover:text-muted-wine transition-colors"
                      >
                        ELEVATED ESSENTIALS
                      </button>
                      <button
                        onClick={() => handleNavClick("accessories")}
                        className="block w-full text-left py-1 hover:text-muted-wine transition-colors"
                      >
                        ACCESSORIES
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-soft-beige/20">
                    <p className="text-[10px] tracking-widest text-taupe uppercase mb-3">Editorial</p>
                    <div className="space-y-4 pl-2">
                      <button
                        onClick={() => handleScrollToSection("lookbook-section")}
                        className="block w-full text-left py-1 hover:text-taupe"
                      >
                        SEASONAL LOOKBOOK
                      </button>
                      <button
                        onClick={() => handleScrollToSection("journal-section")}
                        className="block w-full text-left py-1 hover:text-taupe"
                      >
                        VELOURA JOURNAL
                      </button>
                      <button
                        onClick={() => handleScrollToSection("about-section")}
                        className="block w-full text-left py-1 hover:text-taupe"
                      >
                        ABOUT THE LABEL
                      </button>
                    </div>
                  </div>
                </nav>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="pt-6 border-t border-soft-beige/30 space-y-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAssistantOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-deep-charcoal text-white text-xs tracking-widest py-3 hover:bg-espresso transition-colors font-semibold uppercase rounded-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  ASK STYLE ASSISTANT
                </button>
                <div className="text-center text-[10px] text-taupe tracking-wider">
                  © 2026 VELOURA Contemporary
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
