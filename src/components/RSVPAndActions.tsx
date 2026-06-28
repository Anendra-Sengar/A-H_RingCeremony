"use client";

import { motion } from "framer-motion";
import { Phone, Calendar as CalendarIcon, MessageSquare } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function RSVPAndActions() {
  const event = invitationConfig.event;

  // Calendar Link Generators
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Ring Ceremony – Ashindra ❤️ Himanshi");
    const dates = "20260703T083000Z/20260703T143000Z";
    const details = encodeURIComponent("You are cordially invited to celebrate the auspicious Ring Ceremony of Ashindra & Himanshi. Join us for a royal celebration.");
    const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const getOutlookCalendarUrl = () => {
    const title = encodeURIComponent("Ring Ceremony – Ashindra ❤️ Himanshi");
    const start = "2026-07-03T14:00:00+05:30";
    const end = "2026-07-03T20:00:00+05:30";
    const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${start}&enddt=${end}&location=${location}`;
  };

  const getAppleCalendarFileUrl = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "SUMMARY:Ring Ceremony – Ashindra ❤️ Himanshi",
      "DTSTART:20260703T083000Z",
      "DTEND:20260703T143000Z",
      `LOCATION:${event.venueName}, ${event.venueAddress}`,
      "DESCRIPTION:You are cordially invited to celebrate the auspicious Ring Ceremony of Ashindra & Himanshi.",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  return (
    <section id="rsvp" className="relative py-24 bg-[#0d0906] overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,163,88,0.05)_0%,transparent_75%)] pointer-events-none" />

      {/* Main Grid */}
      <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Add to Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 border border-[#cba358]/20 rounded-xl glass-panel w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="w-5 h-5 text-[#cba358]" />
            <h3 className="font-cinzel text-sm text-[#ebd8c1] tracking-widest uppercase">
              ADD TO CALENDAR
            </h3>
          </div>
          
          <p className="font-sans text-[11px] text-[#ebd8c1]/60 tracking-wider mb-6">
            Save a quick reminder to ensure you don&apos;t miss the celebratory event.
          </p>

          <div className="grid grid-cols-3 gap-2">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 border border-[#cba358]/20 text-center rounded text-[10px] font-cinzel tracking-widest text-[#ebd8c1]/80 hover:border-[#cba358] hover:text-[#cba358] transition-all"
            >
              GOOGLE
            </a>
            <a
              href={getAppleCalendarFileUrl()}
              download="ashindra-himanshi-ring-ceremony.ics"
              className="py-2.5 border border-[#cba358]/20 text-center rounded text-[10px] font-cinzel tracking-widest text-[#ebd8c1]/80 hover:border-[#cba358] hover:text-[#cba358] transition-all"
            >
              APPLE
            </a>
            <a
              href={getOutlookCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 border border-[#cba358]/20 text-center rounded text-[10px] font-cinzel tracking-widest text-[#ebd8c1]/80 hover:border-[#cba358] hover:text-[#cba358] transition-all"
            >
              OUTLOOK
            </a>
          </div>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="p-6 border border-[#cba358]/20 rounded-xl glass-panel w-full"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <Phone className="w-4.5 h-4.5 text-[#cba358]" />
            <h4 className="font-cinzel text-xs text-[#ebd8c1] tracking-widest uppercase">
              CONTACT HOSTS
            </h4>
          </div>
          <p className="font-sans text-[10px] text-[#ebd8c1]/50 tracking-wider mb-4 leading-relaxed">
            Need help or have questions regarding the venue route?
          </p>
          
          <div className="space-y-3">
            {invitationConfig.contacts.map((host, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-2 border border-[#cba358]/15 rounded bg-black/10">
                <span className="font-cinzel text-[10px] tracking-wider text-[#ebd8c1]/80 uppercase block">
                  {host.name}
                </span>
                <div className="flex gap-2">
                  <a
                    href={`tel:${host.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-1.5 border border-[#cba358]/35 hover:border-[#cba358] rounded text-[9px] font-cinzel tracking-widest text-[#ebd8c1]/90 transition-all duration-300"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    CALL
                  </a>
                  <a
                    href={`https://wa.me/91${host.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-1.5 border border-[#cba358]/35 hover:border-[#cba358] rounded text-[9px] font-cinzel tracking-widest text-[#ebd8c1]/90 transition-all duration-300"
                  >
                    <MessageSquare className="w-3 h-3" />
                    WHATSAPP
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
