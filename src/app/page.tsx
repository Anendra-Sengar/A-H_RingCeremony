"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import EnvelopeScreen from "@/components/EnvelopeScreen";
import SparkleCursor from "@/components/SparkleCursor";
import AudioPlayer from "@/components/AudioPlayer";
import WelcomeSection from "@/components/WelcomeSection";
import ScratchCardSection from "@/components/ScratchCardSection";
import CoupleSection from "@/components/CoupleSection";
import ParentsSection from "@/components/ParentsSection";
import EventDetails from "@/components/EventDetails";
import VenueSection from "@/components/VenueSection";
import InvitationVideo from "@/components/InvitationVideo";
import PhotoGallery from "@/components/PhotoGallery";
import Timeline from "@/components/Timeline";
import RSVPAndActions from "@/components/RSVPAndActions";
import Footer from "@/components/Footer";
import StickyFooter from "@/components/StickyFooter";

import { invitationConfig } from "@/config/invitation";

export default function Home() {
  const [loadingState, setLoadingState] = useState<"loading" | "envelope" | "invitation">("loading");
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hasManuallyScrolled, setHasManuallyScrolled] = useState(false);
  const autoScrollActiveRef = useRef(false);

  useEffect(() => {
    if (loadingState !== "invitation" || hasManuallyScrolled) return;

    const handleUserInteraction = (e: Event) => {
      // If we are currently auto-scrolling, ignore the scroll event
      if (e.type === "scroll" && autoScrollActiveRef.current) {
        return;
      }

      // User performed manual interaction/scroll
      setHasManuallyScrolled(true);
      setShowScrollIndicator(false);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("mousedown", handleUserInteraction);
    };

    window.addEventListener("scroll", handleUserInteraction);
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });
    window.addEventListener("mousedown", handleUserInteraction, { passive: true });

    // Wait 5 seconds, then perform auto-scroll
    const timer = setTimeout(() => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll === 0) {
        autoScrollActiveRef.current = true;

        window.scrollTo({
          top: 220,
          behavior: "smooth"
        });

        // Show the indicator
        setShowScrollIndicator(true);

        // Deactivate the auto-scroll flag after the smooth scroll completes
        setTimeout(() => {
          autoScrollActiveRef.current = false;
        }, 1200);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [loadingState, hasManuallyScrolled]);

  return (
    <main className="relative min-h-screen bg-[#0a0705] text-[#ebd8c1] overflow-x-hidden font-sans pb-16">
      {/* 1. Golden Sparkle Cursor (Rendered everywhere for luxury feedback) */}
      <SparkleCursor />

      {/* 2. Floating Audio Player (Active from load to bypass autoplay blockers) */}
      <AudioPlayer />

      {/* 3. Slim Sticky Footer with Calling & Navigation shortcuts */}
      {loadingState === "invitation" && <StickyFooter />}

      <AnimatePresence mode="wait">
        {/* Step A: Loading Screen */}
        {loadingState === "loading" && (
          <motion.div key="loading" exit={{ opacity: 0 }}>
            <LoadingScreen onComplete={() => setLoadingState("envelope")} />
          </motion.div>
        )}

        {/* Step B: Envelope Opening */}
        {loadingState === "envelope" && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <EnvelopeScreen onOpenComplete={() => setLoadingState("invitation")} />
          </motion.div>
        )}

        {/* Step C: Full Invitation Website */}
        {loadingState === "invitation" && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full"
          >
            {/* Elegant Floral top page header ornament */}
            <div className="w-full flex justify-center py-8 bg-[#0a0705]">
              <div className="flex items-center gap-2 text-[#cba358]">
                <div className="w-8 h-[1px] bg-current" />
                <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase">
                  {invitationConfig.couple.groom.name} & {invitationConfig.couple.bride.name}
                </span>
                <div className="w-8 h-[1px] bg-current" />
              </div>
            </div>

            <WelcomeSection />
            <ScratchCardSection />
            <CoupleSection />
            <ParentsSection />
            <EventDetails />
            <VenueSection />
            <InvitationVideo />
            <PhotoGallery />
            <Timeline />
            <RSVPAndActions />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator overlay */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.4 } }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[998] flex flex-col items-center pointer-events-none select-none text-center"
          >
            {/* Gesture Visual: Upward Arrow + Swiping Finger */}
            <div className="relative mb-3 flex flex-col items-center">
              {/* Upward pulsing arrow/chevron */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[#cba358]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-5 h-5 filter drop-shadow-[0_0_5px_rgba(203,163,88,0.5)]"
                >
                  <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* Realistic hand/finger swipe icon */}
              <motion.div
                animate={{
                  y: [12, -12, 12],
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-9 h-9 text-[#cba358] filter drop-shadow-[0_0_8px_rgba(203,163,88,0.6)]"
                >
                  {/* Pointing index finger */}
                  <path d="M10 13V5a1.5 1.5 0 0 1 3 0v8" />
                  {/* Folded middle finger */}
                  <path d="M13 8.5a1.5 1.5 0 0 1 3 0v4.5" />
                  {/* Folded ring finger */}
                  <path d="M16 10a1.5 1.5 0 0 1 3 0v3" />
                  {/* Thumb */}
                  <path d="M7 11.5a1.5 1.5 0 0 1 3 0" />
                  {/* Palm bottom base */}
                  <path d="M6 15a4 4 0 0 0 8 0" />
                </svg>
              </motion.div>
            </div>

            {/* Instruction Text */}
            <div className="bg-black/35 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#cba358]/25 shadow-[0_12px_30px_rgba(0,0,0,0.6),inset_0_0_12px_rgba(203,163,88,0.1)] flex flex-col items-center">
              <span className="font-sans text-[13px] font-bold text-[#ebd8c1] tracking-wide filter drop-shadow-[0_0_6px_rgba(203,163,88,0.4)]">
                👇 नीचे स्क्रॉल करें
              </span>
              <span className="font-sans text-[11px] font-semibold text-[#ebd8c1]/90 tracking-wider mt-0.5">
                पूरा निमंत्रण देखने के लिए
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
