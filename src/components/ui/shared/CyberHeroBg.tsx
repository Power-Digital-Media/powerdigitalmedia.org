"use client";

import React from "react";
import StaticHeroBg from "./StaticHeroBg";
import AnimatedHeroBg from "./AnimatedHeroBg";

interface CyberHeroBgProps {
    variant: "home" | "web-design" | "custom-applications" | "marketing";
}

export default function CyberHeroBg({ variant }: CyberHeroBgProps) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#070c18]">
            <StaticHeroBg variant={variant} />
            <AnimatedHeroBg variant={variant} />
        </div>
    );
}
