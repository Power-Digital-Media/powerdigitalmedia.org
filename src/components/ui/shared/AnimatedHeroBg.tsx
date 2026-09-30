import React from "react";

interface AnimatedHeroBgProps {
    variant: "home" | "web-design" | "custom-applications" | "marketing";
}

export default function AnimatedHeroBg({ variant }: AnimatedHeroBgProps) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* GPU-accelerated CSS floating ambient light orbs - zero JS main-thread execution */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none animate-pulse-slow will-change-transform"
                style={{ top: "10%", left: "20%", transform: "translateZ(0)" }}
            />
            <div
                className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none animate-pulse-slower will-change-transform"
                style={{ top: "25%", right: "15%", transform: "translateZ(0)" }}
            />
        </div>
    );
}
