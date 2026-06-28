"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // YYYY-MM-DD
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      // Event date is set at 2:00 PM of target date (Arrival time)
      const difference = +new Date(`${targetDate}T14:00:00+05:30`) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isClient) return null;

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Title */}
      <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#cba358] mb-6 uppercase">
        COUNTDOWN TO THE CELEBRATION
      </span>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-md w-full px-4">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 md:p-5 rounded-lg border border-[#cba358]/20 glass-panel-light shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            {/* Value */}
            <span className="font-cinzel text-2xl md:text-4xl text-gold-gradient font-bold tracking-widest">
              {String(block.value).padStart(2, "0")}
            </span>
            
            {/* Label */}
            <span className="mt-1 font-sans text-[8px] md:text-[10px] tracking-widest text-[#ebd8c1]/60 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
