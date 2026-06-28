"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function EventDetails() {
  const cards = [
    {
      icon: <Calendar className="w-6 h-6 text-[#cba358]" />,
      title: "Date",
      value: "Friday, 03 July 2026",
      desc: "Mark your calendar for our special day"
    },
    {
      icon: <Clock className="w-6 h-6 text-[#cba358]" />,
      title: "Time",
      value: invitationConfig.event.time,
      desc: "Join us on time as ceremonies begin"
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#cba358]" />,
      title: "Venue",
      value: invitationConfig.event.venueName,
      desc: invitationConfig.event.venueAddress
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15
      }
    }
  } as const;

  return (
    <section className="relative py-24 bg-[#0a0705] overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.04)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] mb-3 uppercase">
          Ceremony Schedule
        </span>
        <h2 className="font-cinzel text-2xl md:text-3xl text-[#ebd8c1] tracking-widest uppercase mb-4 text-center">
          EVENT DETAILS
        </h2>
        <div className="w-12 h-[1px] bg-[#cba358]/40 mb-12" />

        {/* Details Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`flex flex-col p-6 rounded-xl border border-[#cba358]/15 glass-card relative overflow-hidden group ${
                idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Gold Ornament Background on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#cba358]/2 rounded-bl-full translate-x-6 -translate-y-6 group-hover:scale-125 transition-transform duration-500" />
              
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg border border-[#cba358]/35 flex items-center justify-center bg-[#0d0906] mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                {card.icon}
              </div>

              {/* Text */}
              <h3 className="font-cinzel text-xs tracking-widest text-[#ebd8c1]/50 uppercase mb-2">
                {card.title}
              </h3>
              
              <h4 className={`font-cinzel text-[#ebd8c1] font-semibold tracking-wide mb-3 leading-relaxed ${
                card.title === "Date" ? "text-lg md:text-xl text-gold-gradient font-bold" : "text-sm"
              }`}>
                {card.value}
              </h4>
              
              <p className="font-sans text-xs text-[#ebd8c1]/60 tracking-wider leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
