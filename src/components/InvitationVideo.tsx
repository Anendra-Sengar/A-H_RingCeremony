"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

export default function InvitationVideo() {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => {
    setIsOpen(true);
    window.dispatchEvent(new CustomEvent("pause-invitation-music"));
  };

  const closeVideo = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("play-invitation-music"));
  };

  return (
    <section className="relative py-24 bg-[#0a0705] overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.04)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] mb-3 uppercase">
          E-Invitation
        </span>
        <h2 className="font-cinzel text-2xl md:text-3xl text-[#ebd8c1] tracking-widest uppercase mb-4 text-center">
          INVITATION VIDEO
        </h2>
        <div className="w-12 h-[1px] bg-[#cba358]/40 mb-12" />

        {/* Video Thumbnail/Play Trigger Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="relative w-full aspect-[9/16] max-w-xs md:max-w-sm rounded-xl overflow-hidden border border-[#cba358]/35 shadow-[0_25px_50px_rgba(0,0,0,0.8)] bg-[#0d0906] group cursor-pointer"
          onClick={openVideo}
        >
          {/* Background Video looping silently for premium preview */}
          <video
            src="/assets/invitation video/invitation video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Decorative Corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#cba358]/30 pointer-events-none z-10" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#cba358]/30 pointer-events-none z-10" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#cba358]/30 pointer-events-none z-10" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#cba358]/30 pointer-events-none z-10" />

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex flex-col items-center justify-center gap-4 z-10">
            {/* Pulsing Play Button */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#cba358]/30 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-[#cba358]/10 border border-[#cba358]/20" />
              
              <div className="w-14 h-14 rounded-full bg-[#cba358] flex items-center justify-center shadow-[0_0_20px_rgba(203,163,88,0.6)] group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-[#0b0805] fill-[#0b0805] translate-x-0.5" />
              </div>
            </div>

            <span className="font-cinzel text-xs tracking-[0.25em] text-[#ebd8c1] uppercase select-none">
              Watch Cinematic Invitation
            </span>
          </div>
        </motion.div>
      </div>

      {/* Sleek Lightbox Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Trigger (click anywhere outside) */}
            <div className="absolute inset-0" onClick={closeVideo} />

            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 hover:border-white text-white flex items-center justify-center bg-black/50 transition-all z-20"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Responsive Player Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="relative w-full max-w-xs md:max-w-md aspect-[9/16] max-h-[85vh] border border-[#cba358]/40 rounded-xl overflow-hidden bg-black shadow-[0_0_50px_rgba(203,163,88,0.3)] z-10"
            >
              <video
                src="/assets/invitation video/invitation video.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
