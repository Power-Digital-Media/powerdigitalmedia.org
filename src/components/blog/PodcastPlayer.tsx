"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Download, Headphones } from "lucide-react";

interface PodcastPlayerProps {
  audioUrl: string;
  title: string;
}

const WAVEFORM_HEIGHTS = [
  14, 22, 18, 28, 12, 26, 20, 30, 16, 24, 14, 29, 19, 25, 13, 27, 21, 17, 28, 15,
  23, 31, 18, 24, 14, 26, 20, 28, 16, 22, 15, 29, 19, 24, 12, 27, 21, 18, 25, 16,
];

export default function PodcastPlayer({ audioUrl, title }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress(current / duration);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10">
      <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
          <Headphones className="w-7 h-7 text-amber-400" />
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-3 gap-3">
            <div>
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 mb-0.5">
                Audio Article Summary
              </h4>
              <p className="text-sm font-bold text-white line-clamp-1">{title}</p>
            </div>
            <a
              href={audioUrl}
              download
              aria-label="Download audio summary"
              className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause audio summary" : "Play audio summary"}
              className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <div className="flex-1 h-8 flex items-center gap-[3px]">
              {WAVEFORM_HEIGHTS.map((height, i) => {
                const active = i / WAVEFORM_HEIGHTS.length < progress;
                return (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-colors ${
                      active ? "bg-amber-400" : "bg-white/15"
                    }`}
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </div>
    </div>
  );
}
