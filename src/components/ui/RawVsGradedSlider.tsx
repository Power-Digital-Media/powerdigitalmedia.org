"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";

export default function RawVsGradedSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) handleMove(e.clientX);
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) handleMove(e.touches[0].clientX);
        };
        const handleEnd = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("mouseup", handleEnd);
            window.addEventListener("touchend", handleEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging]);

    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <div className="container px-4 mx-auto max-w-6xl">

                <div className="text-center mb-16">
                    <span className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] mb-4 block uppercase leading-none">The Color Protocol</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                        Raw Log <span className="text-white/20">vs</span> Final Grade
                    </h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto font-light text-lg">
                        Anybody can buy a camera. Few know how to build a color pipeline. Drag the slider to see the difference between flat sensor data and our proprietary cinematic color science.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="relative aspect-video w-full rounded-2xl overflow-hidden cursor-ew-resize touch-none select-none border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    onMouseDown={(e) => {
                        setIsDragging(true);
                        handleMove(e.clientX);
                    }}
                    onTouchStart={(e) => {
                        setIsDragging(true);
                        handleMove(e.touches[0].clientX);
                    }}
                >
                    {/* Background (Raw/Log Image) */}
                    <div className="absolute inset-0 grayscale contrast-75 brightness-90 sepia-[.30]">
                        <Image
                            src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop"
                            alt="Raw Footage"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute top-6 left-6 px-3 py-1 bg-black/80 border border-white/10 rounded backdrop-blur-md text-[10px] font-mono text-white/50 uppercase tracking-widest">
                            Source: S-Log3 10-Bit
                        </div>
                    </div>

                    {/* Foreground (Color Graded Image) */}
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${sliderPosition}%` }}
                    >
                        <div className="absolute inset-0 w-[100vw] max-w-[1152px] h-full contrast-125 saturate-150 brightness-110"> {/* max-w matches the container conceptually, keeping image fixed */}
                            <Image
                                src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop"
                                alt="Color Graded Footage"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="absolute top-6 right-6 px-3 py-1 bg-cyan-900/80 border border-cyan-400/50 rounded text-[10px] font-mono text-cyan-400 uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            Final: Rec.709 Cinematic
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] z-20"
                        style={{ left: `calc(${sliderPosition}% - 2px)` }}
                    >
                        <div className="w-8 h-12 bg-black border-2 border-cyan-400 rounded flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                        </div>
                    </div>
                </div>

                {/* Sub-features */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    {[
                        { title: "Dynamic Range", desc: "We shoot in 10-bit log formats to preserve absolute highlight and shadow detail." },
                        { title: "Custom LUTs", desc: "Proprietary color profiles built specifically to match your brand's unique visual identity." },
                        { title: "Skin Tone Purity", desc: "Advanced vector grading ensuring human subjects look natural and heroic under any lighting." }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                            <h3 className="font-bold text-white mb-2 tracking-wide">{feature.title}</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
