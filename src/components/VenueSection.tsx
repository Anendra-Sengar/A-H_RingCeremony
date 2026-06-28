"use client";

import { motion } from "framer-motion";
import { Map, Navigation } from "lucide-react";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation";

export default function VenueSection() {
  return (
    <section id="venue" className="relative py-24 bg-[#0d0906] overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.05)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <span className="font-cinzel text-xs tracking-[0.3em] text-[#cba358] mb-3 uppercase">
          Location
        </span>
        <h2 className="font-cinzel text-2xl md:text-3xl text-[#ebd8c1] tracking-widest uppercase mb-12 text-center">
          THE CELEBRATION VENUE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-stretch">
          {/* Left Column: Guest House Image / Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="relative flex flex-col justify-between p-6 border border-[#cba358]/20 rounded-xl glass-panel"
          >
            {/* Header */}
            <div>
              <h3 className="font-cinzel text-lg text-gold-gradient tracking-wider mb-2 uppercase">
                {invitationConfig.event.venueName}
              </h3>
              <p className="font-sans text-xs text-[#ebd8c1]/70 tracking-wide mb-6 leading-relaxed">
                {invitationConfig.event.venueAddress}
              </p>
            </div>

            {/* Premium Framed Venue Image/Video */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-[#cba358]/35 mb-6 group">
              <video
                src="/assets/video/venue.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.8]"
              />
              <Image
                src="/assets/image/venue.jpeg"
                alt="Venue Guest House"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0705]/60 to-transparent pointer-events-none z-10" />
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a
                href={invitationConfig.event.googleMapsDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-[#cba358]/40 hover:border-[#cba358] text-xs font-cinzel tracking-widest text-[#ebd8c1] rounded hover:bg-[#cba358] hover:text-[#0b0805] transition-all duration-300"
              >
                <Map className="w-4 h-4" />
                OPEN LOCATION
              </a>
              
              <a
                href={invitationConfig.event.googleMapsDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#cba358] text-[#0b0805] text-xs font-cinzel tracking-widest font-bold rounded hover:bg-white hover:text-black transition-all duration-300 shadow-[0_4px_15px_rgba(203,163,88,0.2)]"
              >
                <Navigation className="w-4 h-4 animate-bounce" />
                GET DIRECTIONS
              </a>
            </div>
          </motion.div>

          {/* Right Column: Google Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="relative p-2 border border-[#cba358]/20 rounded-xl glass-panel flex flex-col h-full min-h-[350px]"
          >
            <div className="absolute inset-4 border border-[#cba358]/10 rounded pointer-events-none" />
            
            {/* Interactive Map Iframe */}
            <iframe
              src={invitationConfig.event.googleMapsEmbedUrl}
              className="w-full h-full rounded-lg min-h-[320px] grayscale brightness-90 hover:grayscale-0 transition-all duration-500 border-none"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Venue Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
