"use client";

import React from "react";
import { m } from "framer-motion";

interface AnimatedHeroBgProps {
    variant: "home" | "web-design" | "custom-applications" | "marketing";
}

export default function AnimatedHeroBg({ variant }: AnimatedHeroBgProps) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Gentle Warm Floating Ambient Light Orbs */}
            <m.div
                className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"
                style={{ top: "10%", left: "20%" }}
                animate={{
                    x: [0, 25, -20, 0],
                    y: [0, -20, 20, 0],
                    scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <m.div
                className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"
                style={{ top: "25%", right: "15%" }}
                animate={{
                    x: [0, -30, 20, 0],
                    y: [0, 25, -15, 0],
                    scale: [1, 0.95, 1.05, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
