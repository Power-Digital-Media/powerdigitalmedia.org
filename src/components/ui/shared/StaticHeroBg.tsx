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
                    gridColor: "rgba(168, 85, 247, 0.05)" // Purple grid
                };
            case "custom-applications":
                return {
                    glowTop: "bg-cyan-500/10",
                    glowBottom: "bg-indigo-600/10",
                    gridColor: "rgba(99, 102, 241, 0.05)" // Indigo grid
                };
            case "home":
                return {
                    glowTop: "bg-cyan-500/10",
                    glowBottom: "bg-indigo-600/10",
                    gridColor: "rgba(6, 182, 212, 0.05)" // Cyan grid
                };
            case "web-design":
            default:
                return {
                    glowTop: "bg-cyan-500/10",
                    glowBottom: "bg-blue-600/10",
                    gridColor: "rgba(34, 211, 238, 0.05)" // Cyan grid
                };
        }
    };

    const theme = getThemeDetails();

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Deep Core Glows */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] ${theme.glowTop} rounded-full blur-[100px] md:blur-[150px] opacity-70 pointer-events-none`} />
            <div className={`absolute bottom-0 right-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] ${theme.glowBottom} rounded-full blur-[120px] opacity-50 pointer-events-none`} />

            {/* The Cyber Grid Platform */}
            <div
                className="absolute inset-x-0 bottom-0 h-[70vh] border-t border-white/5"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, ${theme.gridColor} 1px, transparent 1px),
                        linear-gradient(to top, ${theme.gridColor} 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(100px) scale(2.5)',
                    transformOrigin: 'bottom center',
                    maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
                }}
            />

            {/* Ambient Core Circle (Barely visible behind text overlay) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full border border-white/[0.02] bg-white/[0.002] blur-sm pointer-events-none" />
        </div>
    );
}
