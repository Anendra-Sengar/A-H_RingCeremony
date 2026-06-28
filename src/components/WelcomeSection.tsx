"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

export default function WelcomeSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Flower petal particle definition
    class Petal {
      x!: number;
      y!: number;
      size!: number;
      color!: string;
      speedY!: number;
      speedX!: number;
      angle!: number;
      spinSpeed!: number;
      type!: "rose" | "marigold";
      w: number;
      h: number;

      constructor(width: number, height: number) {
        this.w = width;
        this.h = height;
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * this.w;
        this.y = init ? Math.random() * this.h : -20;
        this.size = Math.random() * 8 + 6;
        this.type = Math.random() > 0.5 ? "rose" : "marigold";
        this.color = this.type === "rose" ? "#8c1d27" : "#cba358";
        this.speedY = Math.random() * 1.0 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 30) * 0.3; // subtle sway
        this.angle += this.spinSpeed;

        if (this.y > this.h + 20 || this.x < -20 || this.x > this.w + 20) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);
        c.beginPath();
        
        // Draw standard petal shape (oval/curved teardrop)
        c.moveTo(0, -this.size);
        c.quadraticCurveTo(this.size * 0.6, -this.size * 0.6, this.size * 0.4, this.size * 0.4);
        c.quadraticCurveTo(0, this.size, -this.size * 0.4, this.size * 0.4);
        c.quadraticCurveTo(-this.size * 0.6, -this.size * 0.6, 0, -this.size);

        c.fillStyle = this.color;
        // Shadow/glow for marigold, rich dark shading for rose
        if (this.type === "marigold") {
          c.shadowBlur = 4;
          c.shadowColor = "#ebd7a3";
        }
        c.fill();
        c.restore();
      }
    }

    const petals: Petal[] = Array.from(
      { length: 45 },
      () => new Petal(canvas.width, canvas.height)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 pb-24 bg-[#0a0705]">
      {/* Falling Flower Petals Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />

      {/* Royal Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* Decorative floral backdrops */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-[#cba358]/20 rounded-tl-full pointer-events-none opacity-50" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-[#cba358]/20 rounded-br-full pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
        {/* Sub-header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="flex flex-col items-center"
        >
          {/* Lord Ganesh Image */}
          <div className="relative w-48 h-48 md:w-60 md:h-60 mb-6 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(203,163,88,0.45)] animate-pulse-slow">
            <Image
              src="/assets/image/lord ganesh.png"
              alt="Lord Ganesh"
              fill
              sizes="(max-width: 768px) 192px, 240px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-cinzel text-xs md:text-sm tracking-[0.4em] text-[#cba358] uppercase mb-4">
            Shri Ganesha Namah
          </span>
          <div className="w-10 h-[1px] bg-[#cba358]/40 mb-8" />
        </motion.div>

        {/* Welcome Text */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1.0 }}
          className="font-cinzel text-3xl md:text-5xl font-extralight tracking-widest text-[#ebd8c1] mb-6"
        >
          WELCOME
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-sans text-lg md:text-2xl text-[#ebd8c1]/70 max-w-2xl mb-12 leading-relaxed whitespace-pre-line"
        >
          आप सादर आमंत्रित हैं।{"\n"}
          हमारे शुभ रिंग समारोह में आपकी उपस्थिति हमारे लिए सौभाग्य का विषय होगी।
        </motion.p>

        {/* Couple Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="flex flex-col items-center justify-center gap-2 mb-12"
        >
          <div className="font-cinzel text-sm tracking-[0.3em] text-[#cba358] mb-2 flex items-center gap-2">
            <span>💍</span> <span>RING CEREMONY</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
            <h1 className="font-cursive text-7xl md:text-8xl text-gold-gradient py-2">
              {invitationConfig.couple.groom.fullname}
            </h1>
            <span className="text-3xl md:text-4xl my-2 md:my-0 animate-pulse text-[#b02c38]">
              ❤️
            </span>
            <h1 className="font-cursive text-7xl md:text-8xl text-gold-gradient py-2">
              {invitationConfig.couple.bride.fullname}
            </h1>
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.0 }}
          className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#cba358] to-transparent mb-6"
        />

        {/* Hero date/venue details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 1.0 }}
          className="flex flex-col items-center gap-3 font-cinzel text-[#ebd8c1]"
        >
          <div className="flex items-center gap-2.5 text-lg md:text-2xl font-bold text-gold-gradient tracking-[0.15em] mb-1">
            <span>📅</span>
            <span>03 July 2026</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] opacity-80">
            <span>📍</span>
            <span>Pandav Guest House & Resort, Ragaul</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
