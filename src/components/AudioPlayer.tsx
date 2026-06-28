"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Pause } from "lucide-react";
import { invitationConfig } from "@/config/invitation";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Instantiate Audio
    const audio = new Audio(invitationConfig.musicUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Listen for global play trigger (e.g. from envelope open)
    const handleGlobalPlay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setError(false);
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked or failed:", err);
          setError(true);
        });
    };

    const handleGlobalPause = () => {
      audio.pause();
      setIsPlaying(false);
    };

    window.addEventListener("play-invitation-music", handleGlobalPlay);
    window.addEventListener("pause-invitation-music", handleGlobalPause);

    return () => {
      audio.pause();
      window.removeEventListener("play-invitation-music", handleGlobalPlay);
      window.removeEventListener("pause-invitation-music", handleGlobalPause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Error playing audio:", err);
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-3">
      {/* Audio Action Button */}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center glass-panel border border-[#cba358]/30 transition-all duration-500 group overflow-hidden ${
          isPlaying ? "shadow-[0_0_15px_rgba(203,163,88,0.4)] animate-spin-slow" : "hover:border-[#cba358]/60"
        }`}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-[#cba358] group-hover:scale-110 transition-transform" />
        ) : (
          <Music className="w-5 h-5 text-[#cba358] group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full flex items-center justify-center glass-panel border border-[#cba358]/20 transition-all duration-300 hover:border-[#cba358]/50"
        aria-label="Toggle mute"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#cba358]/70" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#cba358]" />
        )}
      </button>

      {/* Floating Audio Waves Visualizer */}
      {isPlaying && !isMuted && (
        <div className="flex items-end gap-[3px] h-4 px-2">
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
