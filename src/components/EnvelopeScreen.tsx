"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

interface EnvelopeScreenProps {
  onOpenComplete: () => void;
}

export default function EnvelopeScreen({ onOpenComplete }: EnvelopeScreenProps) {
  const [sealState, setSealState] = useState<"intact" | "breaking" | "broken">("intact");
  const [envelopeState, setEnvelopeState] = useState<"closed" | "opening" | "open">("closed");
  const [cardState, setCardState] = useState<"inside" | "sliding" | "out">("inside");
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    // 1. Auto break seal and open envelope after 1.2 seconds
    const sealTimer = setTimeout(() => {
      handleSealClick();
    }, 1200);

    return () => {
      clearTimeout(sealTimer);
    };
  }, []);

  useEffect(() => {
    // 2. Auto enter invitation once card slides out fully
    if (cardState === "out") {
      const enterTimer = setTimeout(() => {
        handleEnterInvitation();
      }, 1200);
      return () => clearTimeout(enterTimer);
    }
  }, [cardState]);

  const handleSealClick = () => {
    if (sealState !== "intact") return;

    // Phase 1: Break Seal
    setSealState("breaking");
    // Play a short vibration or clicking sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (_) {}

    setTimeout(() => {
      setSealState("broken");
      // Phase 2: Open Flap
      setEnvelopeState("opening");
      
      setTimeout(() => {
        setEnvelopeState("open");
        // Phase 3: Card slides out
        setCardState("sliding");
        
        // Play click effect audio
        try {
          const audio = new Audio("/assets/audio/click effect.wav");
          audio.volume = 0.8;
          audio.play().catch((err) => console.warn("Click effect autoplay blocked:", err));
        } catch (e) {
          console.warn("Click effect audio failed:", e);
        }
        
        setTimeout(() => {
          setCardState("out");
        }, 1200);
      }, 1000);
    }, 600);
  };

  const handleEnterInvitation = () => {
    setZooming(true);
    // Ensure background music starts playing
    window.dispatchEvent(new CustomEvent("play-invitation-music"));
    setTimeout(() => {
      onOpenComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0906] overflow-hidden px-4">
      {/* Royal Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.08)_0%,transparent_80%)] pointer-events-none" />

      {/* Main Envelope Zoom Wrapper */}
      <motion.div
        animate={zooming ? { scale: 2.2, y: 150, opacity: 0, filter: "blur(8px)" } : { scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center"
      >
        {/* Envelope Body */}
        <div className="relative w-full h-full shadow-[0_30px_70px_rgba(0,0,0,0.8)] rounded-lg overflow-visible">
          
          {/* 1. Envelope Back Flap / Shell (Bottom Layer) */}
          <div className="absolute inset-0 bg-[#ebd8c1] border border-[#cba358]/20 rounded-lg bg-paper-texture overflow-hidden">
            {/* Elegant internal floral border print */}
            <div className="absolute inset-4 border border-[#cba358]/10 rounded" />
          </div>

          {/* 2. Invitation Card (Middle Layer, slides out) */}
          <motion.div
            initial={{ y: 0, scale: 0.96 }}
            animate={
              cardState === "sliding" || cardState === "out"
                ? { y: "-55%", scale: 1, zIndex: 10 }
                : { y: 0, scale: 0.96, zIndex: 1 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[3%] right-[3%] bottom-[3%] top-[3%] rounded bg-[#0b0805] border-2 border-[#cba358]/40 shadow-inner flex flex-col items-center justify-between p-6 overflow-hidden z-[5]"
          >
            {/* Card Gold Trim Border */}
            <div className="absolute inset-2 border border-[#cba358]/20 rounded pointer-events-none" />
            <div className="absolute inset-3 border border-[#cba358]/5 rounded pointer-events-none" />

            {/* Floral corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#cba358]/40" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#cba358]/40" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#cba358]/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#cba358]/40" />

            {/* Inner Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-4">
              <span className="font-cinzel text-[10px] tracking-[0.3em] text-[#cba358] mb-1">
                ROYAL INVITATION
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#cba358]/40 to-transparent mb-4" />
              
              <h2 className="font-cinzel text-xl tracking-[0.1em] text-[#ebd8c1] mb-2">
                RING CEREMONY
              </h2>
              
              <p className="font-cursive text-3xl text-gold-gradient mb-1">
                {invitationConfig.couple.groom.name}
              </p>
              <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#ebd8c1]/40 mb-1">
                AND
              </p>
              <p className="font-cursive text-3xl text-gold-gradient mb-4">
                {invitationConfig.couple.bride.name}
              </p>

              <p className="font-cinzel text-[9px] tracking-[0.15em] text-[#ebd8c1]/60 max-w-[280px] leading-relaxed">
                JOIN US IN CELEBRATING THIS HEAVENLY UNION OF LOVE AND BLESSINGS
              </p>
            </div>

            {/* Slideout Reveal Button */}
            {cardState === "out" && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleEnterInvitation}
                className="z-20 px-6 py-2 border border-[#cba358] text-xs font-cinzel text-[#cba358] tracking-widest hover:bg-[#cba358] hover:text-[#0b0805] transition-all duration-300 rounded shadow-[0_0_10px_rgba(203,163,88,0.2)]"
              >
                OPEN INVITATION
              </motion.button>
            )}
          </motion.div>

          {/* 3. Left/Right/Bottom Flaps of Envelope (Top Layer) */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg">
            {/* Bottom Flap */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[50%] bg-[#ebd8c1] bg-paper-texture border-t border-[#cba358]/10"
              style={{
                clipPath: "polygon(0 100%, 50% 35%, 100% 100%)",
                boxShadow: "0 -4px 15px rgba(0,0,0,0.15)"
              }}
            />
            {/* Left Flap */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-[55%] bg-[#e3d1ba] bg-paper-texture border-r border-[#cba358]/10"
              style={{
                clipPath: "polygon(0 0, 92% 50%, 0 100%)"
              }}
            />
            {/* Right Flap */}
            <div 
              className="absolute top-0 bottom-0 right-0 w-[55%] bg-[#e3d1ba] bg-paper-texture border-l border-[#cba358]/10"
              style={{
                clipPath: "polygon(100% 0, 8% 50%, 100% 100%)"
              }}
            />
          </div>

          {/* 4. Top Flap (Rotates open) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={
              envelopeState === "opening" || envelopeState === "open"
                ? { rotateX: 180, zIndex: 0 }
                : { rotateX: 0, zIndex: 12 }
            }
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 50% 60%, 100% 0)",
            }}
            className="absolute top-0 left-0 right-0 h-[75%] bg-[#ecdac3] bg-paper-texture shadow-md border-b border-[#cba358]/20"
          />

          {/* 5. Wax Seal & AH Logo (Front center) */}
          <AnimatePresence>
            {sealState !== "broken" && (
              <motion.div
                initial={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
                className="absolute top-[48%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-20 flex flex-col items-center cursor-pointer group"
                onClick={handleSealClick}
              >
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-[#cba358]/20 rounded-full blur-md group-hover:scale-125 transition-transform duration-500" />
                
                {/* Seal Body (Burgundy/Crimson Royal Wax style) */}
                <motion.div
                  animate={sealState === "breaking" ? { rotate: [0, -10, 10, -5, 5, 0], scale: 0.95 } : {}}
                  transition={{ duration: 0.5 }}
                  className="relative w-16 h-16 rounded-full bg-[#8c1d27] border-2 border-[#b02c38] shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex items-center justify-center active:scale-95 transition-transform"
                >
                  {/* Wax Seal Outer Rims */}
                  <div className="absolute inset-1 rounded-full border border-[#8c1d27]/40 border-dashed" />
                  <div className="absolute inset-2 rounded-full border border-[#b02c38]/40" />

                  {/* Monogram / Logo on Seal */}
                  <div className="relative w-10 h-10 select-none pointer-events-none filter brightness-110 contrast-125">
                    <Image
                      src="/assets/image/logo.png"
                      alt="Logo"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                
                {/* Hint Text */}
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: [0.6, 1, 0.6], y: 0 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-3 font-cinzel text-[8px] tracking-[0.25em] text-[#ebd8c1]/60 uppercase whitespace-nowrap bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm"
                >
                  Tap seal to break
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
