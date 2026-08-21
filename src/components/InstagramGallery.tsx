"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Heart, MessageCircle } from "lucide-react";

export default function InstagramGallery() {
  const GRID_PHOTOS = [
    {
      id: "insta-1",
      url: "https://images.pexels.com/photos/9019050/pexels-photo-9019050.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      likes: "1.2k",
      comments: "42",
    },
    {
      id: "insta-2",
      url: "https://images.pexels.com/photos/18285649/pexels-photo-18285649.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      likes: "890",
      comments: "15",
    },
    {
      id: "insta-3",
      url: "https://images.pexels.com/photos/33370247/pexels-photo-33370247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      likes: "2.4k",
      comments: "86",
    },
    {
      id: "insta-4",
      url: "https://images.pexels.com/photos/9212218/pexels-photo-9212218.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      likes: "650",
      comments: "9",
    },
    {
      id: "insta-5",
      url: "https://images.pexels.com/photos/20578707/pexels-photo-20578707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      likes: "3.1k",
      comments: "104",
    },
    {
      id: "insta-6",
      url: "https://images.pexels.com/photos/8396731/pexels-photo-8396731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
      likes: "1.8k",
      comments: "53",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF8] border-b border-soft-beige/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 select-none">
          <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">INSTAGRAM DIALOGUE</span>
          <h2 className="text-3xl sm:text-4xl font-light text-deep-charcoal tracking-[0.15em] font-serif uppercase">
            @VELOURA
          </h2>
          <p className="max-w-md mx-auto text-xs text-espresso/70 leading-relaxed font-serif italic">
            "Follow our visual ledger for daily notes, textile processes, behind-the-scenes lookbooks, and seasonal updates."
          </p>
        </div>

        {/* Refined Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {GRID_PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ y: -3 }}
              className="relative aspect-square overflow-hidden bg-champagne/10 border border-soft-beige/20 group rounded-xs cursor-pointer select-none"
            >
              {/* Photo */}
              <img
                src={photo.url}
                alt="Instagram Grid Feed"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover stats layer */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-xs font-semibold">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-current text-white" />
                  <span>{photo.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>{photo.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center pt-2 select-none">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-deep-charcoal/80 text-deep-charcoal hover:bg-deep-charcoal hover:text-white transition-all text-[10px] font-bold tracking-[0.25em] uppercase rounded-xs"
          >
            <Camera className="w-4 h-4" />
            FOLLOW VELOURA ON INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
}
