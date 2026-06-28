"use client";

import { useEffect, useRef } from "react";

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vy: number;
  color: string;
  exploded: boolean;
}

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 360;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: FireworkParticle[] = [];
    const rockets: Rocket[] = [];

    const colors = ["#faf7ed", "#ebd7a3", "#cba358", "#e67389"];

    const launchRocket = () => {
      if (rockets.length > 3) return; // limit active rockets

      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const tx = x + (Math.random() - 0.5) * 100;
      const ty = Math.random() * 120 + 40; // explosion height
      const color = colors[Math.floor(Math.random() * colors.length)];

      rockets.push({
        x,
        y,
        tx,
        ty,
        vy: -(Math.random() * 3.5 + 4.5),
        color,
        exploded: false
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 35;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2 + 1
        });
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(10, 7, 5, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Launch rocket occasionally
      if (Math.random() < 0.03) {
        launchRocket();
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        
        // Slight drift
        r.x += (r.tx - r.x) * 0.05;

        // Draw rocket sparkler
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = r.color;
        ctx.fill();

        // Check if reached explosion point
        if (r.y <= r.ty) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.alpha -= 0.015; // fade out

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      // Restore opacity context
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <footer className="relative bg-[#0a0705] border-t border-[#cba358]/10 overflow-hidden flex flex-col items-center justify-center pt-24 pb-16">
      {/* Celebration Fireworks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-65" />

      {/* Decorative floral motif top */}
      <div className="flex items-center justify-center gap-1.5 mb-6 z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ebd7a3]" />
        <div className="w-2.5 h-[1px] bg-[#cba358]" />
        <div className="w-3 h-3 rounded-full border border-[#cba358] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#cba358]" />
        </div>
        <div className="w-2.5 h-[1px] bg-[#cba358]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#ebd7a3]" />
      </div>

      <div className="relative z-10 text-center max-w-md px-6">
        <h2 className="font-cinzel text-xl md:text-2xl text-[#ebd8c1] tracking-[0.25em] mb-4">
          THANK YOU
        </h2>

        <p className="font-cursive text-5xl text-gold-gradient py-2 mb-6">
          See You Soon
        </p>

        <p className="font-cinzel text-[10px] tracking-[0.3em] text-[#ebd8c1]/40 uppercase mb-8">
          WITH LOVE
        </p>

        <p className="font-cinzel text-[9px] tracking-widest text-[#ebd8c1]/30 uppercase">
          © 2026 Ashindra & Himanshi. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
