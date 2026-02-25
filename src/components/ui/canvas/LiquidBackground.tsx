"use client";

import { useEffect, useRef } from "react";

interface SpotlightRevealProps {
    backgroundImage?: string;
}

/**
 * SpotlightReveal: A pure CSS mask-image approach.
 * No canvas, no WebGL. A radial gradient mask follows the mouse,
 * revealing the spatial background image behind the dark overlay.
 */
export default function SpotlightReveal({ // v3 — CSS mask, no canvas
    backgroundImage = "/images/Spatial_background_ (1).png"
}: SpotlightRevealProps) {
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = revealRef.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y}px`);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-[#02020a] pointer-events-none">
            {/* Background image layer, revealed only under the mouse spotlight */}
            <div
                ref={revealRef}
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    // CSS mask: only show image where this radial gradient is white
                    WebkitMaskImage: "radial-gradient(circle 400px at var(--mx, 50%) var(--my, 50%), white 0%, white 30%, rgba(255,255,255,0.4) 60%, transparent 100%)",
                    maskImage: "radial-gradient(circle 400px at var(--mx, 50%) var(--my, 50%), white 0%, white 30%, rgba(255,255,255,0.4) 60%, transparent 100%)",
                    opacity: 0.85,
                    transition: "background-image 0.6s ease",
                }}
            />

            {/* Subtle vignette on top */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20vw_rgba(0,0,0,0.85)]" />

            {/* Film grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay">
                <svg width="100%" height="100%">
                    <filter id="grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#grain)" />
                </svg>
            </div>
        </div>
    );
}
