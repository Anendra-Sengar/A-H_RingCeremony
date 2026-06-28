"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

export default function PhotoGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  const images = invitationConfig.gallery;
  const displayedImages = showAll ? images : images.slice(0, 4);

  // Slideshow interval handler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activeIdx !== null) {
      interval = setInterval(() => {
        setActiveIdx((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % images.length;
        });
      }, 3000); // changes every 3s
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeIdx, images.length]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + images.length) % images.length);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    const threshold = 50; // swipe delta threshold in px

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    touchStartRef.current = null;
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative py-24 bg-[#0d0906] overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.05)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] mb-3 uppercase">
          Memories
        </span>
        <h2 className="font-cinzel text-2xl md:text-3xl text-[#ebd8c1] tracking-widest uppercase mb-4 text-center">
          MOMENTS GALLERY
        </h2>
        <div className="w-12 h-[1px] bg-[#cba358]/40 mb-12" />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <AnimatePresence mode="popLayout">
            {displayedImages.map((img, idx) => (
              <motion.div
                key={img.url}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden rounded-lg border border-[#cba358]/10 cursor-pointer shadow-lg group bg-[#0a0705] aspect-square"
                onClick={() => {
                  const absoluteIdx = images.findIndex(item => item.url === img.url);
                  setActiveIdx(absoluteIdx !== -1 ? absoluteIdx : idx);
                  setIsPlaying(false);
                }}
              >
                {/* Photo Image */}
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Cover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10" />

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-cinzel text-[10px] tracking-widest text-[#cba358] uppercase">
                    {img.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More / View Less Toggle Button */}
        {images.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border border-[#cba358]/40 hover:border-[#cba358] text-[#cba358] text-xs font-cinzel tracking-[0.2em] rounded bg-black/40 hover:bg-[#cba358] hover:text-[#0b0805] active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
            >
              {showAll ? "VIEW LESS" : "VIEW MORE MOMENTS"}
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/98 flex items-center justify-center p-4 touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Dark background close click */}
            <div className="absolute inset-0" onClick={() => setActiveIdx(null)} />

            {/* Close Button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 hover:border-white text-white flex items-center justify-center bg-black/50 transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slideshow Controller */}
            <button
              onClick={togglePlay}
              className="absolute top-6 left-6 px-4 py-2 rounded-full border border-[#cba358]/40 hover:border-[#cba358] text-[#cba358] flex items-center gap-2 bg-black/50 text-xs font-cinzel tracking-widest transition-all z-20"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "PAUSE SLIDESHOW" : "PLAY SLIDESHOW"}
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-4 w-12 h-12 rounded-full border border-[#cba358]/20 hover:border-[#cba358] text-[#ebd8c1] flex items-center justify-center bg-black/40 z-10 hover:bg-[#cba358] hover:text-[#0b0805] transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Content Image Box */}
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-2xl max-h-[70vh] aspect-[4/5] md:aspect-video rounded-lg overflow-hidden border border-[#cba358]/30 bg-black z-0 shadow-[0_0_50px_rgba(203,163,88,0.2)]"
            >
              <Image
                src={images[activeIdx].url}
                alt={images[activeIdx].caption}
                fill
                className="object-contain"
              />
              
              {/* Caption Box */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                <span className="font-cinzel text-xs tracking-[0.2em] text-[#cba358] uppercase">
                  {images[activeIdx].caption}
                </span>
              </div>
            </motion.div>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-4 w-12 h-12 rounded-full border border-[#cba358]/20 hover:border-[#cba358] text-[#ebd8c1] flex items-center justify-center bg-black/40 z-10 hover:bg-[#cba358] hover:text-[#0b0805] transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
