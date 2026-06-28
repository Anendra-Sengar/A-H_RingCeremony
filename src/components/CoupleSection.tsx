"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

export default function CoupleSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-12%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0px", "0px"] : ["30px", "-30px"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 flex items-center justify-center bg-[#0a0705] overflow-hidden px-4"
    >
      {/* Dynamic Background Video/Ambient Light */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <video
          src="/assets/video/couple regard.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter blur-xl scale-110"
        />
      </div>

      {/* Floating Lights Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(203,163,88,0.08)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(203,163,88,0.06)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Portrait Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex justify-center"
        >
          {/* Outer Premium Frame */}
          <div className="relative w-full max-w-[380px] aspect-[4/5] p-4 rounded-xl border border-[#cba358]/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] glass-panel overflow-hidden group">
            
            {/* Corner Ornaments */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#cba358]/35 z-10 pointer-events-none" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#cba358]/35 z-10 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#cba358]/35 z-10 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#cba358]/35 z-10 pointer-events-none" />

            {/* Inner Frame with hidden overflow for parallax image */}
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#cba358]/10 bg-[#0d0906]">
              
              {/* Parallax Image */}
              <motion.div 
                style={{ y: imgY }}
                className="absolute inset-0 w-full h-[124%] -top-[12%]"
              >
                <Image
                  src={invitationConfig.couple.couplePhoto}
                  alt="Bride and Groom Portrait"
                  fill
                  sizes="(max-width: 480px) 100vw, 380px"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              
              {/* Golden Floating Sparkle Particles */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(203,163,88,0.15),transparent_70%)] animate-pulse-slow" />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Couple Text and Biographies */}
        <motion.div
          style={{ y: textY }}
          className="flex flex-col text-center lg:text-left items-center lg:items-start"
        >
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] mb-3 uppercase">
            Two Hearts, One Soul
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl text-[#ebd8c1] tracking-widest uppercase mb-6">
            THE COUPLE
          </h2>
          <div className="w-16 h-[1px] bg-[#cba358] mb-8" />

          {/* Groom Bio */}
          <div className="mb-6">
            <h3 className="font-cinzel text-lg text-gold-gradient tracking-widest mb-2 uppercase">
              {invitationConfig.couple.groom.fullname}
            </h3>
            <p className="font-sans text-xs text-[#ebd8c1]/70 tracking-wide max-w-md leading-relaxed">
              Son of {invitationConfig.couple.groom.mother} and {invitationConfig.couple.groom.father}. An ambitious soul filled with warmth, integrity, and love, ready to embark on this beautiful path of lifetime companionship.
            </p>
          </div>

          <div className="font-cinzel text-[10px] text-[#cba358]/40 tracking-widest my-4 uppercase">
            — Joined In Love By —
          </div>

          {/* Bride Bio */}
          <div>
            <h3 className="font-cinzel text-lg text-gold-gradient tracking-widest mb-2 uppercase">
              {invitationConfig.couple.bride.fullname}
            </h3>
            <p className="font-sans text-xs text-[#ebd8c1]/70 tracking-wide max-w-md leading-relaxed">
              Daughter of {invitationConfig.couple.bride.mother} and {invitationConfig.couple.bride.father}. A graceful heart bringing laughter and light, stepping forward into this union of mutual trust and endless devotion.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
