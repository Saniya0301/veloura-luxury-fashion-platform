"use client";

import React from "react";
import { motion } from "framer-motion";
import ThreeDMedallion from "./ThreeDMedallion";

interface HeroProps {
  onDiscoverClick?: () => void;
  onNewArrivalsClick?: () => void;
}

export default function Hero({ onDiscoverClick, onNewArrivalsClick }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center bg-[#FCFBF8] pt-24 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background cinematic grid layout */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 pointer-events-none -z-0">
        <div className="lg:col-span-7 h-full w-full relative">
          {/* Subtle ivory to warm white overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-ivory via-ivory/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ivory z-10" />
        </div>
        <div className="lg:col-span-5 h-full w-full relative opacity-45 lg:opacity-100">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <img
              src="https://images.pexels.com/photos/20578707/pexels-photo-20578707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
              alt="Veloura Campaign AW26"
              className="w-full h-full object-cover object-[center_20%]"
              loading="eager"
            />
          </motion.div>
          {/* Subtle gradient to merge the photo on mobile and desktop */}
          <div className="absolute inset-0 bg-linear-to-r from-ivory to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-linear-to-t from-ivory via-ivory/20 to-transparent z-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-taupe uppercase block">
              AUTUMN / WINTER 2026 COLLECTION
            </span>
            <div className="w-16 h-[1px] bg-taupe/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.1em] text-deep-charcoal leading-none font-serif"
          >
            VELOURA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-sm sm:text-base md:text-lg text-espresso/80 font-normal leading-relaxed tracking-wide italic font-serif"
          >
            "A refined expression of contemporary elegance, built upon the masterclass of quiet luxury and architectural drapery."
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <button
              onClick={onDiscoverClick}
              className="px-8 py-4 bg-deep-charcoal text-white text-xs tracking-[0.2em] font-semibold uppercase hover:bg-espresso transition-all duration-300 relative group overflow-hidden shadow-xs hover:shadow-md cursor-pointer text-center"
              data-cursor="explore"
            >
              <span className="relative z-10">DISCOVER THE EDIT</span>
              <span className="absolute inset-0 bg-muted-wine translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>

            <button
              onClick={onNewArrivalsClick}
              className="px-8 py-4 border border-deep-charcoal/40 bg-transparent text-deep-charcoal text-xs tracking-[0.2em] font-semibold uppercase hover:border-deep-charcoal hover:bg-deep-charcoal/5 transition-colors duration-300 cursor-pointer text-center"
            >
              SHOP NEW ARRIVALS
            </button>
          </motion.div>
        </div>

        {/* Right side interactive 3D Medallion component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center pt-8 lg:pt-0"
        >
          <div className="relative p-6 bg-white/10 rounded-full border border-soft-beige/20 backdrop-blur-xs select-none">
            <ThreeDMedallion />
          </div>
          
          <div className="text-center mt-3 space-y-1">
            <p className="text-[10px] tracking-[0.2em] text-taupe uppercase font-semibold">
              The Atelier Signature Emblem
            </p>
            <p className="text-[9px] text-taupe/70 font-sans tracking-wide">
              Move cursor over emblem to tilt & spin 3D
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity pointer-events-auto cursor-pointer z-10 select-none">
        <button
          onClick={onDiscoverClick}
          className="text-[9px] tracking-[0.3em] uppercase text-taupe font-bold focus:outline-none flex flex-col items-center gap-2"
        >
          SCROLL TO EXPLORE
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-taupe"
          />
        </button>
      </div>
    </section>
  );
}
