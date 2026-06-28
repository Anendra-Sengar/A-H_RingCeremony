"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";

export default function Timeline() {
  const timelineItems = invitationConfig.timeline;

  return (
    <section className="relative py-24 bg-[#0a0705] overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.04)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] mb-3 uppercase">
          Journey Details
        </span>
        <h2 className="font-sans text-2xl md:text-4xl text-gold-gradient tracking-wide mb-4 text-center font-bold">
          आपके आगमन की प्रतीक्षा में
        </h2>
        <div className="w-12 h-[1px] bg-[#cba358]/40 mb-16" />

        {/* Timeline Path Container */}
        <div className="relative w-full">
          {/* Central Vertical Line (hidden/shifted on mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#cba358]/10 via-[#cba358] to-[#cba358]/10 transform -translate-x-1/2 pointer-events-none" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative items-start ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-[#0b0805] border-2 border-[#cba358] shadow-[0_0_10px_rgba(203,163,88,0.6)] transform -translate-x-1/2 z-10" />

                  {/* Card content container */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                    className={`w-full md:w-[45%] ml-10 md:ml-0 p-6 rounded-xl border border-[#cba358]/15 glass-panel relative ${
                      isEven ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {/* Timestamp Badge */}
                    <span className="font-cinzel text-[10px] tracking-widest text-[#cba358] font-bold block mb-2">
                      {item.time}
                    </span>

                    {/* Title */}
                    <h3 className="font-cinzel text-base text-[#ebd8c1] font-semibold tracking-wider mb-3 uppercase">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs text-[#ebd8c1]/60 tracking-wider leading-relaxed">
                      {item.description}
                    </p>

                    {/* Maps URL Button */}
                    {item.mapsUrl && (
                      <a
                        href={item.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 border border-[#cba358]/40 hover:border-[#cba358] text-[10px] font-cinzel tracking-widest text-[#ebd8c1] rounded hover:bg-[#cba358] hover:text-[#0b0805] transition-all duration-300"
                      >
                        VIEW LOCATION
                      </a>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
