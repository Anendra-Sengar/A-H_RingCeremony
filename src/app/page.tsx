"use client";

import { useState } from "react";
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
    </main>
  );
}
