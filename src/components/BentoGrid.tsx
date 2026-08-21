"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Feather } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="py-20 lg:py-28 bg-white border-y border-soft-beige/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="text-left space-y-3">
          <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">Atelier Ethos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-deep-charcoal tracking-widest font-serif uppercase">
            THE ART OF THE ATELIER
          </h2>
          <p className="max-w-xl text-xs sm:text-sm text-espresso/70 leading-relaxed font-serif italic">
            "We believe in less, but infinitely better. True sustainability resides in the lifetime persistence of beautiful structures and pure fibers."
          </p>
        </div>

        {/* Bento Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Philosophy (span 6) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-7 bg-[#FCFBF8] p-8 sm:p-10 border border-soft-beige/30 rounded-xs flex flex-col justify-between text-left space-y-8 group"
          >
            <div className="space-y-4">
              <Compass className="w-6 h-6 text-taupe group-hover:rotate-45 transition-transform duration-700" />
              <h3 className="text-2xl font-light text-deep-charcoal tracking-widest font-serif uppercase">
                Quiet luxury is not a statement. It is a dialogue.
              </h3>
              <p className="text-xs sm:text-sm text-espresso/80 leading-relaxed font-sans font-light">
                We craft garments that do not cry for attention. Our sophistication resides in the hidden parameters: the precise drape of silk-satin bias, the structural resilience of hand-fused canvas shoulders, and neutral tone cohesion that makes daily pairing an effortless joy.
              </p>
            </div>
            
            <div className="pt-6 border-t border-soft-beige/25 flex justify-between items-center text-[10px] tracking-widest font-bold text-taupe uppercase">
              <span>01 / ATELIER STANDARDS</span>
              <span className="text-espresso">EST. 2026</span>
            </div>
          </motion.div>

          {/* Card 2: Aesthetic Image (span 5) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-5 h-[320px] md:h-auto relative overflow-hidden rounded-xs group"
          >
            <img
              src="https://images.pexels.com/photos/22912103/pexels-photo-22912103.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400"
              alt="Silk fabric fold"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6 text-left" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <span className="text-[9px] tracking-widest uppercase font-bold text-white/80">Seasonal Campaign</span>
              <h4 className="text-lg font-light tracking-widest uppercase font-serif">THE BIAS-CUT FLOW</h4>
            </div>
          </motion.div>

          {/* Card 3: Fabric Details (span 4) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-4 bg-[#FCFBF8] p-8 border border-soft-beige/30 rounded-xs text-left flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <Feather className="w-5 h-5 text-taupe group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-lg font-medium tracking-widest text-deep-charcoal uppercase">
                MULBERRY SILK
              </h3>
              <p className="text-xs text-espresso/85 leading-relaxed font-serif italic">
                "Our signature 19-momme fluid silk is imported from sustainable historic mills. Cold-processed, hand-measured, and bias-cut to trace your contours with lightweight, breathable perfection."
              </p>
            </div>
            
            <span className="text-[9px] tracking-[0.2em] font-bold text-taupe uppercase pt-4 block border-t border-soft-beige/15">
              100% PURE BIOLOGICAL FIBERS
            </span>
          </motion.div>

          {/* Card 4: Cashmere details (span 4) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-4 bg-[#FAF9F6] p-8 border border-soft-beige/30 rounded-xs text-left flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <Sparkles className="w-5 h-5 text-taupe group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-medium tracking-widest text-deep-charcoal uppercase">
                VIRGIN WOOL COATS
              </h3>
              <p className="text-xs text-espresso/85 leading-relaxed font-sans font-light">
                Double-woven wool blended with premium Grade-A cashmere. It creates an insulating pocket of absolute temperature comfort while preserving an architectural, heavy-weight fall that maintains crisp lines.
              </p>
            </div>
            
            <span className="text-[9px] tracking-[0.2em] font-bold text-taupe uppercase pt-4 block border-t border-soft-beige/15">
              ITALIAN APENNINE TEXTILES
            </span>
          </motion.div>

          {/* Card 5: Sustainable statement (span 4) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="md:col-span-4 bg-espresso text-white p-8 rounded-xs text-left flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <span className="text-[8px] font-bold tracking-[0.3em] text-white/60 uppercase">COMMITMENT</span>
              <h3 className="text-xl font-light tracking-widest uppercase font-serif">
                THE SLOW FASHION MOVEMENT
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-sans font-light">
                We design with small production scales to prevent wasteful overstocks. Every article has logged craftsmanship batches in our central registry, assuring you of fair wages and conscious manufacturing.
              </p>
            </div>
            
            <span className="text-[9px] tracking-[0.2em] font-bold text-taupe uppercase pt-4 block border-t border-white/10">
              ZERO OVER-PRODUCTION TARGETS
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
