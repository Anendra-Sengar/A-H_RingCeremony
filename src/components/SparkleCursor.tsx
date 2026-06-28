"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    // Resize canvas to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // List of premium gold colors
    const colors = [
      "#faf7ed", // soft ivory/light gold
      "#ebd7a3", // pale gold
      "#cba358", // pure gold
      "#aa813e", // dark gold
      "#fbe6e9"  // soft pink glow
    ];

    // Helper to draw a 4-pointed star
    const drawStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(rotation);
      c.beginPath();
      
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.moveTo(0, -outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }

      c.lineTo(0, -outerRadius);
      c.closePath();
      c.fillStyle = color;
      c.globalAlpha = alpha;
      c.shadowBlur = 8;
      c.shadowColor = color;
      c.fill();
      c.restore();
    };

    // Create a particle
    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      const size = Math.random() * 6 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // slight upward drift
        alpha: 1,
        size,
        color,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.05
      });
    };

    // Track mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Spawn 1-2 particles per move
      for (let i = 0; i < 2; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    // Track touches (Mobile support)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
        
        for (let i = 0; i < 2; i++) {
          createParticle(touch.clientX, touch.clientY);
        }
      }
    };

    // Add pointer events
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015; // subtle gravity
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.015; // fade out

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle as a 4-pointed golden sparkle star
        drawStar(
          ctx,
          p.x,
          p.y,
          4,
          p.size * p.alpha,
          (p.size / 2.5) * p.alpha,
          p.color,
          p.alpha,
          p.rotation
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
