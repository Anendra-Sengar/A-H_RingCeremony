"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { playTempleBellFallback } from "@/utils/audio";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const hasClickedRef = useRef(false);
  const welcomePlayedRef = useRef(false);

  const handleEnter = () => {
    if (hasClickedRef.current) return;
    hasClickedRef.current = true;
    setIsEntering(true);

    // Play bell sound
    playTempleBellFallback();

    // Play welcome audio if not already played
    if (!welcomePlayedRef.current) {
      welcomePlayedRef.current = true;
      try {
        const welcome = new Audio("/assets/audio/welcome.wav");
        welcome.volume = 0.6;
        welcome.play().catch((e) => console.warn("Welcome audio blocked in click handler:", e));
      } catch (e) {
        console.warn("Welcome audio play failed:", e);
      }
    }

    // Synchronously dispatch sound trigger to bypass browser autoplay restrictions
    window.dispatchEvent(new CustomEvent("play-invitation-music"));

    // Fade out and invoke parent callback
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  useEffect(() => {
    let welcomeAudio: HTMLAudioElement | null = new Audio("/assets/audio/welcome.wav");
    welcomeAudio.volume = 0.6;

    const tryPlay = () => {
      if (welcomePlayedRef.current || !welcomeAudio) return;
      welcomeAudio.play()
        .then(() => {
          welcomePlayedRef.current = true;
          cleanup();
        })
        .catch(() => {
          // Silent catch if still blocked
        });
    };

    const cleanup = () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };

    // Try playing immediately
    tryPlay();

    // Also listen for first interaction to play if blocked initially
    window.addEventListener("click", tryPlay);
    window.addEventListener("touchstart", tryPlay);

    // Show the button after 1.5 seconds to allow logo animation to play
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      cleanup();
      welcomeAudio = null;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle class for luxury background swirls
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      angle: number;
      angularSpeed: number;
      distance: number;
      alpha: number;
      w: number;
      h: number;

      constructor(width: number, height: number) {
        this.w = width;
        this.h = height;
        this.x = width / 2;
        this.y = height / 2;
        this.radius = Math.random() * 2 + 1;
        this.color = ["#faf7ed", "#ebd7a3", "#cba358", "#fbe6e9"][
          Math.floor(Math.random() * 4)
        ];
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.015;
        this.distance = Math.random() * (Math.max(width, height) / 2) + 20;
        this.speed = Math.random() * 0.5 + 0.2;
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.angle += this.angularSpeed;
        this.distance -= this.speed;
        if (this.distance < 10) {
          this.distance = Math.random() * (Math.max(this.w, this.h) / 2) + 20;
          this.angle = Math.random() * Math.PI * 2;
        }

        const centerX = this.w / 2;
        const centerY = this.h / 2;
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.shadowBlur = 4;
        c.shadowColor = this.color;
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = Array.from(
      { length: 80 },
      () => new Particle(canvas.width, canvas.height)
    );

    const animate = () => {
      ctx.fillStyle = "rgba(10, 7, 5, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0705] overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Luxury Overlay Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.15)_0%,transparent_70%)] z-10 pointer-events-none" />

      <AnimatePresence>
        {!isEntering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="flex flex-col items-center z-20 text-center px-4"
          >
            {/* AH Monogram Badge */}
            <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
              {/* Outer Glowing Golden Circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#cba358]/40 border-dashed rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-[#cba358]/20 rounded-full"
              />
              {/* Gold Ornament Frame */}
              <svg className="absolute w-40 h-44 text-[#cba358]" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 2 C23.5 2 2 23.5 2 50 C2 76.5 23.5 98 50 98 C76.5 98 98 76.5 98 50 C98 23.5 76.5 2 L50 2 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>

              {/* Logo Image */}
              <div className="relative w-28 h-28 select-none pointer-events-none filter drop-shadow-[0_0_8px_rgba(203,163,88,0.35)] animate-pulse-slow">
                <Image
                  src="/assets/image/logo.png"
                  alt="Logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Glowing Text */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="font-cinzel text-xs tracking-[0.3em] text-[#ebd8c1]/70 mb-2 uppercase"
            >
              The Ring Ceremony
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#cba358] to-transparent mb-8"
            />

            {/* Enter Button with Autoplay permission bypass */}
            {showButton && (
              <div className="relative">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      "0 0 0px rgba(203,163,88,0.2)",
                      "0 0 25px rgba(203,163,88,0.7)",
                      "0 0 0px rgba(203,163,88,0.2)"
                    ]
                  }}
                  transition={{
                    opacity: { duration: 0.8 },
                    y: { duration: 0.8 },
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }}
                  onClick={handleEnter}
                  className="relative px-8 py-3.5 font-sans text-base font-bold tracking-[0.1em] text-[#ebd8c1] overflow-hidden border-2 border-[#cba358] rounded-lg transition-all group duration-300 active:scale-95 bg-[#0b0805]/80 hover:bg-[#cba358] hover:text-[#0b0805] shadow-[0_0_15px_rgba(203,163,88,0.3)] cursor-pointer"
                >
                  {/* Button background shimmer */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#cba358]/0 via-[#cba358]/20 to-[#cba358]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  निमंत्रण खोलें
                </motion.button>

                {/* Animated Finger Tap Gesture Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.45, 0.85, 0.45],
                    scale: [1, 0.85, 1],
                    y: ["0%", "8%", "0%"],
                    x: ["-50%", "-50%", "-50%"]
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-[-10] left-1/2 pointer-events-none z-20 flex flex-col items-center"
                >
                  {/* Tapping hand index finger */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-[#cba358]/80 filter drop-shadow-[0_0_6px_rgba(203,163,88,0.6)]"
                  >
                    <path d="M10 13V5a1.5 1.5 0 0 1 3 0v8" />
                    <path d="M13 8.5a1.5 1.5 0 0 1 3 0v4.5" />
                    <path d="M16 10a1.5 1.5 0 0 1 3 0v3" />
                    <path d="M7 11.5a1.5 1.5 0 0 1 3 0" />
                    <path d="M6 15a4 4 0 0 0 8 0" />
                  </svg>

                  {/* Tap ripple circle at the fingertip */}
                  <motion.div
                    animate={{
                      scale: [0.6, 1.8, 0.6],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute top-0.5 left-[10px] w-3.5 h-3.5 border border-[#cba358]/70 rounded-full"
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
