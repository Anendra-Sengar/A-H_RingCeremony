"use client";

import { Phone, MapPin } from "lucide-react";

export default function StickyFooter() {
  const handleCallClick = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMapClick = () => {
    window.open("https://maps.app.goo.gl/WY5hQGtZEuMjEP2Z8", "_blank");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] h-16 bg-black/85 backdrop-blur-md border-t border-[#cba358]/20 flex items-center justify-between px-4 md:px-8 text-[#ebd8c1] select-none shadow-[0_-5px_25px_rgba(0,0,0,0.6)]">
      {/* Left side: Slim copyright & developer info */}
      <div className="flex items-center gap-1.5 md:gap-3">
        <span className="font-sans text-[8.5px] md:text-[11px] tracking-wider opacity-50 uppercase">
          © 2026 Ashindra & Himanshi
        </span>
        <span className="hidden md:inline text-[11px] opacity-20">|</span>
        <span className="font-sans text-[8.5px] md:text-[11px] tracking-wider opacity-50 uppercase font-medium">
          Designed & Developed by{" "}
          <span className="text-[#cba358] opacity-100 font-semibold">
            Anendra Sengar
          </span>
        </span>
      </div>

      {/* Right side: Calling & Navigation quick buttons */}
      <div className="flex items-center gap-2">
        {/* Call Hosts Button */}
        <button
          onClick={handleCallClick}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#cba358]/50 hover:border-[#cba358] rounded text-[9.5px] md:text-[11px] font-cinzel font-bold tracking-widest text-[#ebd8c1] hover:bg-[#cba358] hover:text-[#0b0805] bg-black/40 shadow-md active:scale-95 transition-all duration-300"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>CALL</span>
        </button>

        {/* View Map Button */}
        <button
          onClick={handleMapClick}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#cba358]/50 hover:border-[#cba358] rounded text-[9.5px] md:text-[11px] font-cinzel font-bold tracking-widest text-[#ebd8c1] hover:bg-[#cba358] hover:text-[#0b0805] bg-black/40 shadow-md active:scale-95 transition-all duration-300"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>MAP</span>
        </button>
      </div>
    </div>
  );
}
