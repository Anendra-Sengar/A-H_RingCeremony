"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { playCelebrationSoundFallback } from "@/utils/audio";
import { invitationConfig } from "@/config/invitation";
import Countdown from "./Countdown";

export default function ScratchCardSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set dimensions
    const width = 360;
    const height = 240;
    canvas.width = width;
    canvas.height = height;

    // Draw luxury cover on canvas
    const drawCover = () => {
      // 1. Golden gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#88622c");
      grad.addColorStop(0.3, "#ebd7a3");
      grad.addColorStop(0.5, "#cba358");
      grad.addColorStop(0.7, "#ebd7a3");
      grad.addColorStop(1, "#88622c");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative borders
      ctx.strokeStyle = "rgba(10, 7, 5, 0.4)";
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, width - 20, height - 20);
      
      ctx.strokeStyle = "rgba(10, 7, 5, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(14, 14, width - 28, height - 28);

      // 3. Monogram lettering and ornaments
      ctx.fillStyle = "#0a0705";
      ctx.font = "italic 14px Georgia";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✨ SCRATCH TO REVEAL DATE ✨", width / 2, height / 2 - 20);

      ctx.font = "normal 10px Cinzel, serif";
      ctx.fillText("THE ROYAL CELEBRATION", width / 2, height / 2 + 15);
      
      // Decorative mini mandala in center
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + 35, 6, 0, Math.PI * 2);
      ctx.strokeStyle = "#0a0705";
      ctx.stroke();
    };

    drawCover();

    // Calculate scratched area percentage
    const checkPercentage = () => {
      if (isRevealedRef.current) return;
      
      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      let transparentCount = 0;
      
      // Sample every 16th pixel to save CPU cycles
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }
      
      const totalSampled = pixels.length / 16;
      const percentage = (transparentCount / totalSampled) * 100;
      
      if (percentage > 50) {
        revealCard();
      }
    };

    // Trigger celebration effects
    const revealCard = () => {
      isRevealedRef.current = true;
      setIsRevealed(true);
      
      // Fade out canvas
      canvas.style.transition = "opacity 0.6s ease-out";
      canvas.style.opacity = "0";
      
      // Play celebration sound
      playCelebrationSoundFallback();

      // Trigger Confetti
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        // Red, Gold, Ivory sparks
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#cba358", "#ebd7a3", "#8c1d27"]
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#cba358", "#ebd7a3", "#8c1d27"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    };

    // Get mouse/touch coordinates
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return null;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    // Scratch action
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    };

    // Event handlers
    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (isRevealedRef.current) return;
      const pos = getPos(e);
      if (!pos) return;
      setIsScratching(true);
      scratch(pos.x, pos.y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isRevealedRef.current || !isScratching) return;
      // Prevent scrolling while scratching on mobile
      if (e.cancelable) e.preventDefault();
      
      const pos = getPos(e);
      if (!pos) return;
      scratch(pos.x, pos.y);
    };

    const handleEnd = () => {
      setIsScratching(false);
      checkPercentage();
    };

    // Auto-scratch sequence when component enters viewport
    let observer: IntersectionObserver | null = null;
    let autoScratchInterval: NodeJS.Timeout | null = null;

    const startAutoScratch = () => {
      if (isRevealedRef.current) return;
      
      let step = 0;
      const points: Array<{x: number, y: number}> = [];
      
      // Serpentine path points
      const rows = 8;
      const cols = 20;
      const stepX = width / cols;
      const stepY = height / rows;
      
      for (let r = 0; r <= rows; r++) {
        const y = stepY * r;
        if (r % 2 === 0) {
          for (let c = 0; c <= cols; c++) {
            points.push({ x: stepX * c, y });
          }
        } else {
          for (let c = cols; c >= 0; c--) {
            points.push({ x: stepX * c, y });
          }
        }
      }

      autoScratchInterval = setInterval(() => {
        if (isRevealedRef.current) {
          if (autoScratchInterval) clearInterval(autoScratchInterval);
          return;
        }
        
        if (step >= points.length) {
          revealCard();
          if (autoScratchInterval) clearInterval(autoScratchInterval);
          return;
        }
        
        const pt = points[step];
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        step++;
        
        if (step % 3 === 0) {
          checkPercentage();
        }
      }, 35);
    };

    // Attach events
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    // Auto-scratch detection
    if (typeof window !== "undefined") {
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(startAutoScratch, 1000);
              if (observer && canvas) {
                observer.unobserve(canvas);
              }
            }
          });
        }, { threshold: 0.15 });
        observer.observe(canvas);
      } else {
        setTimeout(startAutoScratch, 2000);
      }
    }

    return () => {
      if (autoScratchInterval) clearInterval(autoScratchInterval);
      if (observer && canvas) observer.unobserve(canvas);
      
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);

      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <section className="relative py-24 flex flex-col items-center justify-center bg-[#0d0906] overflow-hidden px-4">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl w-full mb-10">
        <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] uppercase block mb-3">
          Save The Date
        </span>
        <h2 className="font-cinzel text-2xl md:text-3xl text-[#ebd8c1] tracking-widest uppercase">
          REVEAL THE SACRED DATE
        </h2>
        <p className="mt-4 font-sans text-xs text-[#ebd8c1]/60 tracking-wider max-w-sm mx-auto leading-relaxed">
          Scratch the golden card below with your cursor or finger to unveil the wedding schedule.
        </p>
      </div>

      {/* Scratch Card Outer Wrapper with Gold Frame */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[360px] aspect-[3/2] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-[#cba358]/30 bg-[#0a0705] z-10"
      >
        {/* UNDERLYING INVITATION DETAILS CARD */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0b0805]">
          <div className="absolute inset-2 border border-[#cba358]/20 rounded pointer-events-none" />
          
          {/* Card header */}
          <span className="font-cinzel text-[9px] tracking-[0.3em] text-[#cba358] mb-1">
            SAVE THE DATE
          </span>
          <div className="w-10 h-[1px] bg-[#cba358]/40 mb-3" />

          {/* Bride & Groom names */}
          <h3 className="font-cursive text-3xl text-[#ebd8c1] mb-2">
            {invitationConfig.couple.groom.name} & {invitationConfig.couple.bride.name}
          </h3>

          <div className="space-y-1.5">
            <p className="font-cinzel text-lg md:text-xl text-gold-gradient font-bold tracking-widest">
              FRIDAY, 03 JULY 2026
            </p>
            <p className="font-sans text-xs text-[#ebd8c1]/80 tracking-wider">
              {invitationConfig.event.time}
            </p>
            <div className="h-[1px] w-12 bg-[#ebd8c1]/10 mx-auto my-1" />
            <p className="font-cinzel text-[9px] text-[#ebd8c1]/60 tracking-widest uppercase max-w-[280px] leading-relaxed mx-auto">
              {invitationConfig.event.venueName}
            </p>
          </div>
        </div>

        {/* TOP LAYER CANVAS */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 cursor-crosshair z-20 w-full h-full"
        />
      </div>

      {/* Countdown display - only renders after scratching is complete */}
      <div className="mt-12 w-full max-w-2xl flex flex-col items-center justify-center min-h-[120px]">
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="w-full"
            >
              <Countdown targetDate={invitationConfig.event.date} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
