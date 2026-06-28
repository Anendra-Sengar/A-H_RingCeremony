"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

function Diya() {
  return (
    <div className="relative w-12 h-12 flex flex-col items-center">
      {/* Flame */}
      <div className="absolute top-1 w-3 h-5 bg-gradient-to-t from-[#cba358] via-[#e67389] to-[#fff] rounded-full blur-[0.5px] animate-diya-flame transform origin-bottom" />
      {/* Flame Glow */}
      <div className="absolute top-0 w-5 h-6 bg-[#cba358]/30 rounded-full blur-md animate-pulse" />
      
      {/* Diya Clay Base */}
      <svg className="absolute bottom-2 w-10 h-6 text-[#88622c]" viewBox="0 0 100 60" fill="currentColor">
        <path d="M5 25 C10 45, 90 45, 95 25 C80 20, 20 20, 5 25 Z" />
        <path d="M45 20 C48 10, 52 10, 55 20 Z" fill="#aa813e" />
      </svg>

      {/* Styled animation for Diya flame flicker */}
      <style jsx global>{`
        @keyframes flame-flicker {
          0%, 100% {
            transform: scale(1) rotate(-1deg);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.15) rotate(1.5deg);
            opacity: 1;
          }
          75% {
            transform: scale(0.95) rotate(-0.5deg);
            opacity: 0.95;
          }
        }
        .animate-diya-flame {
          animation: flame-flicker 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function ParentsSection() {
  const parentsData = [
    {
      title: "Groom's Parents",
      father: invitationConfig.couple.groom.father,
      mother: invitationConfig.couple.groom.mother,
      photo: invitationConfig.couple.groom.photo,
      blurb: "With warm hearts and blessings for their son's new journey."
    },
    {
      title: "Bride's Parents",
      father: invitationConfig.couple.bride.father,
      mother: invitationConfig.couple.bride.mother,
      photo: invitationConfig.couple.bride.photo,
      blurb: "With pure grace and love, sending their daughter to her new home."
    }
  ];

  return (
    <section className="relative py-24 bg-[#0d0906] overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.05)_0%,transparent_75%)] pointer-events-none" />

      {/* Garland Hanging from Top */}
      <div className="absolute top-0 left-0 right-0 h-4 flex justify-around pointer-events-none opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8c1d27]" />
            <div className="w-1 h-3 bg-[#cba358]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ebd7a3]" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] mb-3 uppercase">
          Elders Blessings
        </span>
        <h2 className="font-cinzel text-2xl md:text-3xl text-[#ebd8c1] tracking-widest uppercase mb-12 text-center">
          OUR BELOVED PARENTS
        </h2>

        {/* Parents Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
          {parentsData.map((parent, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center p-6 border border-[#cba358]/20 rounded-xl glass-panel relative"
            >
              {/* Animated Diyas at Frame Bottom Corners */}
              <div className="absolute -bottom-3 left-6">
                <Diya />
              </div>
              <div className="absolute -bottom-3 right-6">
                <Diya />
              </div>

              {/* Photo Frame Container */}
              <div className="relative w-44 h-44 rounded-full p-2 border-2 border-[#cba358]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden bg-[#0a0705] mb-6 group">
                <div className="absolute inset-0 rounded-full border border-[#cba358]/10 z-10 pointer-events-none" />
                
                {/* Photo */}
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={parent.photo}
                    alt={parent.title}
                    fill
                    sizes="176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Parent Names */}
              <h3 className="font-cinzel text-xs tracking-[0.2em] text-[#cba358] mb-4 uppercase">
                {parent.title}
              </h3>
              
              <div className="space-y-1">
                <p className="font-cinzel text-base text-[#ebd8c1] font-medium tracking-wide">
                  {parent.mother}
                </p>
                <p className="font-sans text-xs text-[#ebd8c1]/40 tracking-wider">
                  &
                </p>
                <p className="font-cinzel text-base text-[#ebd8c1] font-medium tracking-wide">
                  {parent.father}
                </p>
              </div>

              {/* Garland motif divider */}
              <div className="flex items-center gap-1.5 my-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8c1d27]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#cba358]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#8c1d27]" />
              </div>

              <p className="font-sans text-xs italic text-[#ebd8c1]/60 max-w-xs leading-relaxed">
                {parent.blurb}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
