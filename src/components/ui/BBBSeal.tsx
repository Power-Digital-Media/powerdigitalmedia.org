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
 * Styled for the Power Digital Media Industrial-Luxury dark obsidian & amber aesthetic.
 * Links directly to the live BBB profile page for verification.
 */
export default function BBBSeal({ variant = "badge", className = "" }: BBBSealProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "inline") {
    return (
      <a
        href={BBB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-[#0b0c10] hover:border-amber-400/40 hover:bg-amber-500/10 transition-all duration-300 ${className}`}
      >
        <BBBIcon size={18} />
        <span className="text-xs font-bold tracking-widest uppercase text-slate-300 group-hover:text-amber-300 transition-colors">
          BBB Accredited
        </span>
      </a>
    );
  }

  return (
    <a
      href={BBB_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-[#0b0c10] hover:border-amber-400/35 hover:bg-[#12141c] transition-all duration-500 w-fit ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex items-center gap-3">
        <BBBIcon size={32} glowing={isHovered} />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-slate-200 transition-colors">
            Accredited Business
          </span>
          <span className="text-sm font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
            BBB Rating: A
          </span>
        </div>
      </div>

      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-400 group-hover:text-amber-300/80 transition-colors">
        Click to verify →
      </span>
    </a>
  );
}

function BBBIcon({ size = 24, glowing = false }: { size?: number; glowing?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`transition-all duration-500 ${
        glowing ? "drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" : ""
      }`}
    >
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="8"
        className={`transition-all duration-500 ${
          glowing ? "fill-amber-950/60 stroke-amber-400/60" : "fill-white/5 stroke-white/20"
        }`}
        strokeWidth="1.5"
      />
      <path
        d="M24 8c-2 3-4 5-4 8 0 3 2 5 4 5s4-2 4-5c0-3-2-5-4-8z"
        className={`transition-all duration-500 ${glowing ? "fill-amber-400" : "fill-white/45"}`}
      />
      <rect
        x="22"
        y="20"
        width="4"
        height="10"
        rx="1"
        className={`transition-all duration-500 ${glowing ? "fill-amber-400/80" : "fill-white/35"}`}
      />
      <text
        x="24"
        y="40"
        textAnchor="middle"
        className={`font-black text-[8px] transition-all duration-500 ${
          glowing ? "fill-amber-400" : "fill-white/70"
        }`}
        style={{ fontFamily: "system-ui, sans-serif", fontWeight: 900, letterSpacing: "0.15em" }}
      >
        BBB
      </text>
    </svg>
  );
}
