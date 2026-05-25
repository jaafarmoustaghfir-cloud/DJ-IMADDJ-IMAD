import React, { useEffect, useRef, useState } from 'react';

interface EqualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

export const Equalizer: React.FC<EqualizerProps> = ({ analyser, isPlaying }) => {
  const [heights, setHeights] = useState<number[]>(Array(18).fill(10));
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let fallbackPhase = 0;

    const updateBars = () => {
      if (isPlaying && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        // Map frequencies to 18 bars
        const newHeights = Array.from({ length: 18 }).map((_, i) => {
          // Average some bins
          const binIndex = Math.floor((i / 18) * dataArray.length * 0.7);
          const rawValue = dataArray[binIndex] || 0;
          // Scale to max height (percentage)
          return Math.max(10, Math.min(100, (rawValue / 255) * 100));
        });
        setHeights(newHeights);
      } else {
        // Fallback smooth waving for standby mode
        fallbackPhase += 0.05;
        const newHeights = Array.from({ length: 18 }).map((_, i) => {
          const sine = Math.sin(fallbackPhase + i * 0.4);
          const base = 25 + sine * 15 + Math.random() * 5;
          return Math.max(8, base);
        });
        setHeights(newHeights);
      }
      animationRef.current = requestAnimationFrame(updateBars);
    };

    updateBars();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser, isPlaying]);

  return (
    <div className="flex items-end justify-center gap-1.5 h-32 px-4 rounded-2xl glass-panel border border-purple-500/10 shadow-inner relative overflow-hidden group w-full max-w-sm mx-auto">
      {/* Visual background atmospheric flare */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-blue-500/5 to-transparent pointer-events-none" />
      
      {/* Equalizer Bars */}
      <div className="flex items-end justify-between w-full h-24 relative z-10">
        {heights.map((height, i) => {
          // Dynamic color gradient per bar index
          let barBg = "bg-gradient-to-t from-purple-600 via-pink-500 to-yellow-400";
          if (i < 5) {
            barBg = "bg-gradient-to-t from-purple-600 via-blue-500 to-pink-500";
          } else if (i > 13) {
            barBg = "bg-gradient-to-t from-purple-600 via-pink-400 to-gold-400";
          }

          return (
            <div
              key={i}
              className={`w-1.5 xs:w-2 rounded-t-full transition-all duration-75 origin-bottom relative ${barBg}`}
              style={{ 
                height: `${height}%`,
                boxShadow: isPlaying ? '0 0 10px rgba(168, 85, 247, 0.4)' : 'none'
              }}
            >
              {/* Hot glow dot on top of bars */}
              {height > 60 && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
