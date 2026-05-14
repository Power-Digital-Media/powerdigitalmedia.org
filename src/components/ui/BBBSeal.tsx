"use client";

import { useState } from "react";

const BBB_PROFILE_URL =
  "https://www.bbb.org/us/ms/jackson/profile/web-design/power-digital-media-llc-0523-235907954";

interface BBBSealProps {
  variant?: "badge" | "inline";
  className?: string;
}

/**
 * BBB Accredited Business Seal
 * Custom-designed to match the Power Digital dark glassmorphism aesthetic.
 * Links to the live BBB profile page for verification.
 */
export default function BBBSeal({ variant = "badge", className = "" }: BBBSealProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "inline") {
    return (
      <a
        href={BBB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="BBB Accredited Business — Power Digital Media LLC"
        className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all duration-300 ${className}`}
      >
        <BBBIcon size={18} />
        <span className="text-xs font-bold tracking-widest uppercase text-white/70 group-hover:text-cyan-400 transition-colors">
          BBB Accredited
        </span>
      </a>
    );
  }

  // Default "badge" variant — used in footer
  return (
    <a
      href={BBB_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="BBB Accredited Business — Power Digital Media LLC"
      className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-cyan-500/30 hover:bg-cyan-950/15 transition-all duration-500 w-fit ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex items-center gap-3">
        <BBBIcon size={32} glowing={isHovered} />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-white/70 transition-colors">
            Accredited Business
          </span>
          <span className="text-sm font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            BBB Rating: A+
          </span>
        </div>
      </div>

      <span className="text-[9px] font-medium tracking-widest uppercase text-white/30 group-hover:text-white/50 transition-colors">
        Click to verify →
      </span>
    </a>
  );
}

/**
 * Custom SVG BBB torch icon — matches the official BBB brand mark
 * while fitting the dark theme with optional glow animation.
 */
function BBBIcon({ size = 24, glowing = false }: { size?: number; glowing?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-500 ${glowing ? "drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : ""}`}
    >
      {/* BBB Torch / Shield shape */}
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="8"
        className={`transition-all duration-500 ${glowing ? "fill-cyan-950/60 stroke-cyan-400/60" : "fill-white/5 stroke-white/20"}`}
        strokeWidth="1.5"
      />
      {/* Torch flame */}
      <path
        d="M24 8c-2 3-4 5-4 8 0 3 2 5 4 5s4-2 4-5c0-3-2-5-4-8z"
        className={`transition-all duration-500 ${glowing ? "fill-cyan-400" : "fill-white/40"}`}
      />
      {/* Torch handle */}
      <rect
        x="22"
        y="20"
        width="4"
        height="10"
        rx="1"
        className={`transition-all duration-500 ${glowing ? "fill-cyan-400/80" : "fill-white/30"}`}
      />
      {/* BBB text */}
      <text
        x="24"
        y="40"
        textAnchor="middle"
        className={`font-black text-[8px] transition-all duration-500 ${glowing ? "fill-cyan-400" : "fill-white/60"}`}
        style={{ fontFamily: "system-ui, sans-serif", fontWeight: 900, letterSpacing: "0.15em" }}
      >
        BBB
      </text>
    </svg>
  );
}
