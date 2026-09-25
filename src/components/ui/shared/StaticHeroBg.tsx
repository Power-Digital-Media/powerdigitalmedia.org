import React from "react";

interface StaticHeroBgProps {
    variant: "home" | "web-design" | "custom-applications" | "marketing";
}

export default function StaticHeroBg({ variant }: StaticHeroBgProps) {
    const getThemeDetails = () => {
        switch (variant) {
            case "marketing":
                return {
                    glowTop: "bg-blue-600/10",
                    glowBottom: "bg-purple-600/10",
                    accentGlow: "bg-amber-500/5",
                };
            case "custom-applications":
                return {
                    glowTop: "bg-cyan-500/10",
                    glowBottom: "bg-indigo-600/10",
                    accentGlow: "bg-emerald-500/5",
                };
            case "home":
                return {
                    glowTop: "bg-amber-500/10",
                    glowBottom: "bg-cyan-500/10",
                    accentGlow: "bg-blue-500/5",
                };
            case "web-design":
            default:
                return {
                    glowTop: "bg-amber-500/10",
                    glowBottom: "bg-cyan-500/10",
                    accentGlow: "bg-indigo-500/5",
                };
        }
    };

    const theme = getThemeDetails();

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#070c18]">
            {/* Deep Warm Ambient Illumination */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] h-[60vh] max-w-[1100px] ${theme.glowTop} rounded-full blur-[140px] pointer-events-none opacity-80`} />
            <div className={`absolute top-1/3 right-[-10%] w-[55vw] h-[55vw] max-w-[700px] ${theme.glowBottom} rounded-full blur-[140px] pointer-events-none opacity-60`} />
            <div className={`absolute bottom-0 left-[-10%] w-[50vw] h-[50vw] max-w-[600px] ${theme.accentGlow} rounded-full blur-[130px] pointer-events-none opacity-50`} />

            {/* Subtle soft gradient fade at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
    );
}
