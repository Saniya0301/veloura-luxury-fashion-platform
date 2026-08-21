"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowRight, X, ChevronRight, Compass } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

interface JournalSectionProps {
  initialArticles: Article[];
}

export default function JournalSection({ initialArticles }: JournalSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white px-4 sm:px-6 lg:px-8 border-b border-soft-beige/20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] text-taupe uppercase font-bold block">The Printed Word</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-deep-charcoal tracking-widest font-serif uppercase">
              THE VELOURA JOURNAL
            </h2>
            <p className="max-w-md text-xs sm:text-sm text-espresso/70 leading-relaxed font-serif italic">
              "A slow-form editorial archive dedicated to textiles, silhouettes, aesthetics, and architectural design principles."
            </p>
          </div>
          
          <div className="w-16 h-[1px] bg-taupe/40 md:hidden" />
        </div>

        {/* Articles List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialArticles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -4 }}
              className="flex flex-col bg-[#FCFBF8] border border-soft-beige/15 rounded-xs overflow-hidden text-left shadow-xs hover:shadow-md transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              {/* Cover Photo */}
              <div className="relative aspect-16/10 overflow-hidden" data-cursor="view">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 bg-[#FAF9F6] text-deep-charcoal text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-xs">
                  {article.category}
                </span>
              </div>

              {/* Text Block */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-[9px] text-taupe font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-light text-deep-charcoal tracking-wide uppercase font-serif leading-snug hover:text-taupe transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-xs text-espresso/80 font-sans font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="pt-4 border-t border-soft-beige/10 w-full text-[9px] font-bold tracking-[0.25em] text-deep-charcoal hover:text-muted-wine transition-colors uppercase flex items-center justify-between focus:outline-none"
                >
                  READ ARTICLE <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Article Reader Slide-out overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-deep-charcoal/20 backdrop-blur-md"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col justify-between z-10 border-l border-soft-beige/30"
            >
              {/* Header */}
              <div className="p-5 border-b border-soft-beige/30 flex items-center justify-between bg-white select-none">
                <span className="text-[10px] tracking-[0.2em] font-bold text-taupe uppercase">
                  Veloura Editorial
                </span>
                
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-deep-charcoal hover:text-taupe rounded-full hover:bg-champagne/40 focus:outline-none"
                  aria-label="Close article reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Reading area */}
              <div className="flex-grow overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-none text-left">
                {/* Meta details */}
                <div className="space-y-3 select-none">
                  <span className="bg-espresso/5 text-espresso text-[9px] font-bold tracking-widest px-3 py-1.5 uppercase rounded-xs">
                    {selectedArticle.category}
                  </span>
                  
                  <h1 className="text-3xl sm:text-4xl font-light text-deep-charcoal tracking-wide leading-tight uppercase font-serif">
                    {selectedArticle.title}
                  </h1>

                  <div className="flex items-center gap-6 text-[10px] text-taupe font-bold uppercase tracking-widest pt-2 border-b border-soft-beige/10 pb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedArticle.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedArticle.readTime}
                    </span>
                    <span>•</span>
                    <span>ATELIER DESK</span>
                  </div>
                </div>

                {/* Hero image inside the story */}
                <div className="aspect-16/9 bg-champagne/10 relative overflow-hidden rounded-xs select-none">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Styled Content Block */}
                <div
                  className="prose prose-stone max-w-none text-sm leading-relaxed text-espresso/95 space-y-6 font-serif italic text-[15px]"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />

                {/* Decorative Separator */}
                <div className="py-8 flex items-center justify-center gap-4 opacity-30 select-none">
                  <div className="w-8 h-[1px] bg-taupe" />
                  <Compass className="w-4 h-4 text-taupe animate-spin-slow" />
                  <div className="w-8 h-[1px] bg-taupe" />
                </div>
              </div>

              {/* Footer action */}
              <div className="p-5 border-t border-soft-beige/30 bg-white select-none">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full py-4 border border-deep-charcoal text-deep-charcoal hover:bg-deep-charcoal hover:text-white text-xs font-bold tracking-widest uppercase rounded-xs transition-colors cursor-pointer"
                >
                  CLOSE JOURNAL READER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
