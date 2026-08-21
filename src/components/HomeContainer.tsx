"use client";

import React, { useState, useEffect, useRef } from "react";
import { useVeloura, Product } from "@/context/VelouraContext";
import Header from "./Header";
import Hero from "./Hero";
import BentoGrid from "./BentoGrid";
import LookbookSection from "./LookbookSection";
import JournalSection from "./JournalSection";
import InstagramGallery from "./InstagramGallery";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import SearchOverlay from "./SearchOverlay";
import StyleAssistant from "./StyleAssistant";
import { Sparkles, ArrowRight, Filter, SlidersHorizontal, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HomeContainerProps {
  initialProducts: Product[];
  initialArticles: any[];
}

export default function HomeContainer({ initialProducts, initialArticles }: HomeContainerProps) {
  const { setProductsList, openQuickView } = useVeloura();
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  // Synchronize initial products with client context cache on mount
  useEffect(() => {
    setProductsList(initialProducts);
  }, [initialProducts, setProductsList]);

  // Perform reactive in-memory filtering and sorting for instant luxury feedback
  useEffect(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (category !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => b.isNew ? 1 : -1);
    } else if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // "featured": signature first
      result.sort((a, b) => (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [category, sortBy, initialProducts]);

  // Scroll to anchor sections smoothly
  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Asymmetric Signature Highlight details
  const signatureProducts = initialProducts.filter((p) => p.isSignature).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#FCFBF8] overflow-x-hidden flex flex-col justify-between">
      {/* Shared sticky header */}
      <Header
        onCategoryChange={(cat) => setCategory(cat)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Hero section */}
      <Hero
        onDiscoverClick={() => handleNavigateToSection("shop-section")}
        onNewArrivalsClick={() => {
          setCategory("all");
          setSortBy("newest");
          handleNavigateToSection("shop-section");
        }}
      />

      {/* MAIN PRODUCTS SECTION */}
      <main id="shop-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-soft-beige/25 pb-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">
              THE SEASONAL EDIT
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-deep-charcoal tracking-widest font-serif uppercase">
              THE NEW SILHOUETTES
            </h2>
            <p className="max-w-md text-xs sm:text-sm text-espresso/70 leading-relaxed font-serif italic">
              "A considered collection of architectural shapes, fluid drapes, and timeless luxury proportions designed to endure."
            </p>
          </div>

          {/* Interactive filter controls */}
          <div className="flex flex-wrap items-center gap-4 select-none">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 text-[10px] tracking-widest font-bold uppercase">
              {["all", "dresses", "tailoring", "essentials", "accessories"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-2 transition-all duration-300 rounded-xs ${
                    category === cat
                      ? "bg-deep-charcoal text-white"
                      : "bg-white text-taupe border border-soft-beige/40 hover:text-deep-charcoal hover:border-deep-charcoal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 border border-soft-beige/50 bg-white px-3 py-1.5 rounded-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-taupe" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[10px] font-bold tracking-widest uppercase text-deep-charcoal border-none focus:outline-none cursor-pointer pr-1"
                aria-label="Sort products dropdown"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">New Arrivals First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic products grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xs border border-soft-beige/25 space-y-4 select-none">
            <p className="text-sm font-bold text-deep-charcoal tracking-widest uppercase">
              No matching pieces found
            </p>
            <button
              onClick={() => setCategory("all")}
              className="px-6 py-2.5 bg-deep-charcoal text-white text-xs tracking-widest font-bold uppercase rounded-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* EDITORIAL CAMPAIGN SECTION */}
      <section 
        id="campaign-section" 
        className="relative py-24 sm:py-32 bg-espresso text-white overflow-hidden border-y border-white/5"
      >
        {/* Parallax background overlay image */}
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.pexels.com/photos/11826093/pexels-photo-11826093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1200"
            alt="Wool close up campaign texture"
            className="w-full h-full object-cover object-center scale-105"
            loading="lazy"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8 select-none">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-taupe uppercase block">
            THE AUTUMN CAMPAIGN
          </span>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.1em] uppercase font-serif leading-none">
            THE ART OF LESS
          </h2>

          <div className="w-16 h-[1.5px] bg-taupe/60 mx-auto" />

          <p className="text-base sm:text-lg md:text-xl text-[#F4EFEA] font-light max-w-xl mx-auto leading-relaxed font-serif italic">
            "Luxury is not excess. It is absolute intention. It resides in the courage to strip away the superfluous, leaving behind only the perfect line."
          </p>

          <button
            onClick={() => {
              setCategory("all");
              handleNavigateToSection("shop-section");
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-deep-charcoal text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-champagne transition-all duration-300 rounded-xs cursor-pointer shadow-md"
          >
            DISCOVER THE EDIT <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SIGNATURE ASYMMETRIC HIGHLIGHT */}
      <section id="signature-section" className="py-20 lg:py-28 bg-white border-b border-soft-beige/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-left space-y-3 select-none">
            <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">Exclusive Capsule</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-deep-charcoal tracking-widest font-serif uppercase">
              THE SIGNATURE LINE
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-espresso/70 leading-relaxed font-serif italic">
              "A premium curation featuring asymmetric tailoring, structured shoulders, and pure silk crepe de chine."
            </p>
          </div>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left large product (span 7) */}
            {signatureProducts[0] && (
              <div className="lg:col-span-7 space-y-6">
                <div 
                  className="relative aspect-[4/3] bg-champagne/10 rounded-xs overflow-hidden cursor-pointer group"
                  onClick={() => openQuickView(signatureProducts[0])}
                  data-cursor="explore"
                >
                  <img
                    src={signatureProducts[0].secondaryImage || signatureProducts[0].primaryImage}
                    alt={signatureProducts[0].name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />
                  
                  <div className="absolute bottom-6 left-6 text-white text-left space-y-1.5 select-none">
                    <span className="bg-white/90 text-deep-charcoal text-[8px] font-bold tracking-[0.3em] px-2.5 py-1 uppercase rounded-xs">
                      SIGNATURE CAPSTONE
                    </span>
                    <h3 className="text-xl sm:text-3xl font-light tracking-widest uppercase font-serif">
                      {signatureProducts[0].name}
                    </h3>
                  </div>

                  <button 
                    className="absolute bottom-6 right-6 p-3 bg-white/95 hover:bg-deep-charcoal hover:text-white rounded-full shadow-lg transition-all"
                    title="Quick Explore"
                  >
                    <Eye className="w-4 h-4 text-deep-charcoal hover:text-white" />
                  </button>
                </div>

                <div className="text-left max-w-xl space-y-2 select-none">
                  <h4 className="text-xs font-bold tracking-widest uppercase text-deep-charcoal">
                    {signatureProducts[0].name} — {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(signatureProducts[0].price)}
                  </h4>
                  <p className="text-xs text-espresso/80 font-sans font-light leading-relaxed">
                    {signatureProducts[0].description} Designed with single-needle French seams and structured silk reinforcement. Crafted over 12 labor hours.
                  </p>
                </div>
              </div>
            )}

            {/* Right stack of smaller items (span 5) */}
            <div className="lg:col-span-5 space-y-8 select-none">
              {signatureProducts.slice(1, 3).map((prod, index) => (
                <div 
                  key={prod.id}
                  className="flex gap-4 p-4 border border-soft-beige/25 bg-[#FCFBF8] rounded-xs items-center group cursor-pointer"
                  onClick={() => openQuickView(prod)}
                >
                  <div className="w-24 aspect-3/4 bg-champagne/10 relative overflow-hidden rounded-xs flex-shrink-0">
                    <img 
                      src={prod.primaryImage} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="flex-grow text-left space-y-1">
                    <span className="text-[8px] tracking-widest text-taupe uppercase font-bold block">Atelier Batch 0{index + 2}</span>
                    <h4 className="text-xs font-bold tracking-widest text-deep-charcoal uppercase group-hover:text-muted-wine transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-espresso/70 line-clamp-2 font-serif italic leading-relaxed">
                      {prod.description}
                    </p>
                    <div className="text-xs font-bold text-deep-charcoal pt-1">
                      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(prod.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid layout */}
      <BentoGrid />

      {/* Lookbook section */}
      <div id="lookbook-section">
        <LookbookSection />
      </div>

      {/* ABOUT THE BRAND SECTION */}
      <section 
        id="about-section" 
        className="py-20 lg:py-28 bg-white border-b border-soft-beige/20 px-4 sm:px-6 lg:px-8 text-left"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info (span 6) */}
          <div className="lg:col-span-6 space-y-8 select-none">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">OUR PHILOSOPHY</span>
              <h2 className="text-4xl sm:text-5xl font-light tracking-wide text-deep-charcoal font-serif uppercase leading-tight">
                WE BELIEVE IN LESS, BETTER.
              </h2>
            </div>

            <div className="w-12 h-[1px] bg-taupe" />

            <div className="space-y-4 text-xs sm:text-sm text-espresso/80 leading-relaxed font-sans font-light">
              <p>
                Founded upon a singular principle of structural perfection, Veloura modernizes classic silhouettes with contemporary feminine confidence. We stand at the convergence of architectural symmetry and natural fluid motion.
              </p>
              <p>
                We collaborate exclusively with certified eco-conscious textile mills in North Italy and hand-finishing guilds across North India. By manufacturing strictly in limited curations, we eliminate inventory waste and safeguard exquisite, historic craft secrets.
              </p>
              <p className="italic font-serif text-[13px]">
                "Every drape, every thread, every horn button is curated with private care and absolute integrity. That is the Veloura promise."
              </p>
            </div>
          </div>

          {/* Right campaign image (span 6) */}
          <div className="lg:col-span-6 h-[400px] sm:h-[500px] relative overflow-hidden rounded-xs shadow-md select-none">
            <img
              src="https://images.pexels.com/photos/28452456/pexels-photo-28452456.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
              alt="Veloura craftsmanship models"
              className="w-full h-full object-cover object-[center_30%] hover:scale-105 transition-transform duration-[2s]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-6 text-white text-left">
              <p className="text-[9px] tracking-widest uppercase font-bold text-white/80">Veloura Atelier</p>
              <h4 className="text-xl font-light tracking-widest uppercase font-serif">Hand-Crafted Intention</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Journal section */}
      <div id="journal-section">
        <JournalSection initialArticles={initialArticles} />
      </div>

      {/* Social grid */}
      <InstagramGallery />

      {/* Shared footer */}
      <Footer />

      {/* GLOBAL LIVE DRAWER & MODAL OVERLAYS */}
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <StyleAssistant />
    </div>
  );
}
