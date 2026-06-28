"use client";

import { useEffect, useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate Audio
    const audio = new Audio(invitationConfig.musicUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleGlobalPlay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked or failed:", err);
        });
    };

    const handleGlobalPause = () => {
      audio.pause();
      setIsPlaying(false);
    };

    window.addEventListener("play-invitation-music", handleGlobalPlay);
    window.addEventListener("pause-invitation-music", handleGlobalPause);

    // Global interaction play triggers
    const startMusicOnInteraction = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          cleanupInteraction();
        })
        .catch((err) => {
          console.warn("Interaction play failed:", err);
        });
    };

    const cleanupInteraction = () => {
      document.removeEventListener("click", startMusicOnInteraction);
      document.removeEventListener("touchstart", startMusicOnInteraction);
    };

    document.addEventListener("click", startMusicOnInteraction);
    document.addEventListener("touchstart", startMusicOnInteraction);

    // Try playing immediately just in case browser allows it
    audio.play()
      .then(() => {
        setIsPlaying(true);
        cleanupInteraction();
      })
      .catch(() => {
        // blocked, will wait for interaction
      });

    return () => {
      audio.pause();
      window.removeEventListener("play-invitation-music", handleGlobalPlay);
      window.removeEventListener("pause-invitation-music", handleGlobalPause);
      cleanupInteraction();
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-3">
      {/* Floating Audio Waves Visualizer */}
      {isPlaying && (
        <div className="flex items-end gap-[3px] h-4 px-2 bg-black/40 py-1.5 rounded-full backdrop-blur-sm border border-[#cba358]/20">
          <div className="w-[3px] bg-[#cba358] rounded-full animate-[visualizer-1_1s_ease-in-out_infinite]" style={{ animationDelay: "0.1s" }} />
          <div className="w-[3px] bg-[#ebd7a3] rounded-full animate-[visualizer-2_0.8s_ease-in-out_infinite]" style={{ animationDelay: "0.3s" }} />
          <div className="w-[3px] bg-[#cba358] rounded-full animate-[visualizer-3_1.2s_ease-in-out_infinite]" style={{ animationDelay: "0s" }} />
          <div className="w-[3px] bg-[#ebd7a3] rounded-full animate-[visualizer-1_0.9s_ease-in-out_infinite]" style={{ animationDelay: "0.5s" }} />
        </div>
      )}

      {/* Custom inline keyframes for the simple audio visualizer */}
      <style jsx global>{`
        @keyframes visualizer-1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes visualizer-2 {
          0%, 100% { height: 6px; }
          50% { height: 12px; }
        }
        @keyframes visualizer-3 {
          0%, 100% { height: 3px; }
          50% { height: 18px; }
        }
      `}</style>
    </div>
  );
}
