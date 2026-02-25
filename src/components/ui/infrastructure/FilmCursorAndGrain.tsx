"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function FilmCursorAndGrain() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // Fluid trailing cursor logic
        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            // The follower trails with more latency and a fluid Expo ease
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: "expo.out",
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <>
            {/* Custom Fluid Cursor — only after hydration */}
            {mounted && (
                <>
                    <div
                        ref={cursorRef}
                        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
                    />
                    <div
                        ref={followerRef}
                        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
                    />
                </>
            )}

            {/* Subtle Film Grain (Pure SVG Noise - No external assets) */}
            <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.04] mix-blend-overlay">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.6"
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>
        </>
    );
}
