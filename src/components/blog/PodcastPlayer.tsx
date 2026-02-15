"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Download, Disc } from "lucide-react";

interface PodcastPlayerProps {
    audioUrl: string;
    title: string;
}

export default function PodcastPlayer({ audioUrl, title }: PodcastPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Simulated Waveform Bars
    const bars = Array.from({ length: 40 }, (_, i) => ({
        height: Math.random() * 24 + 8, // Random height between 8px and 32px
        active: i < progress * 40,
    }));

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
        <div className="w-full max-w-4xl mx-auto my-12 relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-white/10 to-accent/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">

                {/* Album Art / Icon */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <div className={`absolute inset-0 rounded-full border-2 border-accent/30 border-t-accent animate-spin-slow ${isPlaying ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`} />
                    <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center border border-white/10">
                        <Disc className={`w-10 h-10 text-accent ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-black/50 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-white px-2 py-1 rounded-full border border-white/10">
                        Studio Brief
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-1">Listen to the Deep Dive</h4>
                            <h3 className="text-sm font-bold text-white line-clamp-1">{title}</h3>
                        </div>
                        {/* Download Button */}
                        <a href={audioUrl} download className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                            <Download className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Controls & Waveform */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-accent/20"
                        >
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                        </button>

                        {/* Waveform Visualization */}
                        <div className="flex-1 h-8 flex items-center gap-[2px] opacity-80">
                            {bars.map((bar, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 rounded-full transition-all duration-300 ${i / 40 < progress ? 'bg-accent h-full' : 'bg-white/10 hover:bg-white/20'}`}
                                    style={{ height: i / 40 < progress ? '100%' : `${bar.height}px` }}
                                />
                            ))}
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
