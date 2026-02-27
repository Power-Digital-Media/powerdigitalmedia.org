"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/ui/BookingModal";
import { projects } from "@/data/projects";
import { GEAR_COLLECTION } from "@/data/gear";
import { blogPosts } from "@/data/blogPosts";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FEATURED_GEAR = GEAR_COLLECTION.filter((g) => g.isFeatured).slice(0, 6);
const RECENT_POSTS = blogPosts.slice(0, 6);

// ─── PODCAST EPISODES ─────────────────────────────────────────────────────────
// Thumbnails live in /public/images/Thumbnail Cards SVG/
// Update `url` for each episode with the real YouTube/podcast link.
const PODCAST_EPISODES: { title: string; thumb: string; url: string }[] = [
    { title: "Amber Norsworthy", thumb: "/images/Thumbnail Cards SVG/Amber Norsworthy Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
    { title: "Clean Slate", thumb: "/images/Thumbnail Cards SVG/Clean Slate Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
    { title: "DJ Winn", thumb: "/images/Thumbnail Cards SVG/DJ Winn Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
    { title: "Jimmy Hunt", thumb: "/images/Thumbnail Cards SVG/Jimmy Hunt Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
    { title: "Jimmy Nichols", thumb: "/images/Thumbnail Cards SVG/Jimmy Nichols Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
    { title: "John Gallaghar", thumb: "/images/Thumbnail Cards SVG/John Gallaghar Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
    { title: "Kyle Rayborn", thumb: "/images/Thumbnail Cards SVG/Kyle Rayborn Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
    { title: "Michelle Adcock", thumb: "/images/Thumbnail Cards SVG/Michelle Adcock Thumbnail.svg", url: "https://www.youtube.com/@HSPpodcast" },
];

// ─── CANVAS SCENES ────────────────────────────────────────────────────────────
const SCENES = [
    { id: "I", label: "IGNITION", cx: 0.0, cy: 0.0, travel: "↓", bgIdx: 0 },
    { id: "II", label: "ARCHITECTURE", cx: 0.0, cy: 1.0, travel: "→", bgIdx: 0 },
    { id: "III", label: "ARMORY", cx: 1.4, cy: 1.0, travel: "↓", bgIdx: 1 },
    { id: "IV", label: "FREQUENCY", cx: 1.4, cy: 2.2, travel: "↓", bgIdx: 1 },
    { id: "V", label: "VELOCITY", cx: 1.4, cy: 3.4, travel: "←", bgIdx: 1 },
    { id: "VI", label: "INTEL", cx: 0.0, cy: 3.4, travel: "←", bgIdx: 2 },
    { id: "VII", label: "VISION", cx: -1.2, cy: 3.4, travel: "↓", bgIdx: 2 },
    { id: "VIII", label: "TERMINAL", cx: -1.2, cy: 4.6, travel: "·", bgIdx: 2 },
];
const N = SCENES.length;
const SLOT = 1 / N;

// ─── TOTAL PAGE HEIGHT ────────────────────────────────────────────────────────
// 1600vh ÷ 8 scenes = 200vh per scene.
// First 65% (130vh) = content animation window.
// Last 35% (70vh)   = camera travels to next scene — quick, not 5-minute marathon.
const TOTAL_VH = 1600;

// ─── CAMERA TARGET ────────────────────────────────────────────────────────────
function getTargetCam(globalP: number): { x: number; y: number } {
    const raw = globalP / SLOT;
    const fromI = Math.min(Math.floor(raw), N - 1);
    const toI = Math.min(fromI + 1, N - 1);
    const localP = raw - fromI;
    // Scene I:   camera starts at 8%  — immediate animation feedback on first scroll.
    // Scene IV:  camera starts at 78%  — the Frequency scene gets extra dwell time so
    //            all 5 podcast cards can fully unfurl before the camera leaves.
    // All others: 62% (124vh content dwell, 76vh travel).
    const startAt = fromI === 0 ? 0.08 : fromI === 3 ? 0.78 : 0.62;
    const moveP = Math.max(0, (localP - startAt) / (1 - startAt));
    const t = moveP * moveP * (3 - 2 * moveP); // smooth-step
    const from = SCENES[fromI];
    const to = SCENES[toI];
    return {
        x: from.cx + (to.cx - from.cx) * t,
        y: from.cy + (to.cy - from.cy) * t,
    };
}

function getActiveScene(globalP: number): number {
    const raw = globalP / SLOT;
    return Math.min(Math.floor(raw), N - 1);
}

// ─── CONTENT FADE — fades in, holds, fades out ────────────────────────────────
// localP spans 0..1 across the scene's scroll slot.
function holdFade(localP: number): number {
    if (localP < 0.15) return localP / 0.15;
    if (localP > 0.80) return 1 - (localP - 0.80) / 0.20;
    return 1;
}

// ─── HUD ──────────────────────────────────────────────────────────────────────
function HUD({ sceneIdx, progress }: { sceneIdx: number; progress: number }) {
    const s = SCENES[sceneIdx];
    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
            <div className="absolute left-4 top-20 rounded-2xl px-4 py-3 font-mono text-[10px] text-white/50 leading-loose min-w-[155px]"
                style={{ background: "rgba(4,4,20,0.65)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
                <div className="text-blue-400 font-black uppercase tracking-widest mb-0.5"
                    style={{ textShadow: "0 0 12px rgba(59,130,246,0.8)" }}>
                    {s.id} — {s.label}
                </div>
                <div className="text-white/20 text-[9px] mt-0.5">NEXT {s.travel}</div>
            </div>
            <div className="absolute right-4 top-20 rounded-2xl px-4 py-3 min-w-[160px]"
                style={{ background: "rgba(4,4,20,0.65)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
                <div className="font-mono text-[9px] text-white/25 uppercase tracking-widest mb-2">Trajectory</div>
                <div className="flex gap-0.5">
                    {SCENES.map((_, i) => (
                        <div key={i} className="flex-1 h-1 rounded-sm transition-all duration-500"
                            style={{ background: i <= sceneIdx ? "rgba(59,130,246,0.85)" : "rgba(255,255,255,0.06)" }} />
                    ))}
                </div>
                <div className="mt-2 text-[9px] font-mono text-white/20">{sceneIdx + 1} / {N}</div>
            </div>
        </div>
    );
}

// ─── GHOST WATERMARK ──────────────────────────────────────────────────────────
function Ghost({ text, color = "rgba(59,130,246,0.04)" }: { text: string; color?: string }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-black uppercase tracking-tighter leading-none"
                style={{ fontSize: "clamp(8rem,22vw,22rem)", color }}>{text}</span>
        </div>
    );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
const IMG_MAP: Record<string, string> = {
    "all-things-new": "/portfolio/all-things-new-hero.webp",
    "corner-pharmacy": "/portfolio/corner-pharmacy-hero.webp",
    "simmons-memorial": "/portfolio/simmons-hero.webp",
    "growth-engine": "/portfolio/blacksheep-hero.webp",
    "black-sheep": "/portfolio/blacksheep-hero.webp",
};

function ProjectCard({ project, index, localP, total }: {
    project: any; index: number; localP: number; total: number;
}) {
    // Each card starts at 0%, 22%, 44%, 66% of localP
    // → gives every card ~20% of "spotlight" before the next slides in
    const arrival = (index / total) * 0.66;
    const raw = Math.max(0, Math.min((localP - arrival) / 0.20, 1));
    // Smooth-step: slow start → accelerates → decelerates into landing
    const t = raw * raw * (3 - 2 * raw);
    const fade = t < 1 ? t : holdFade(localP);
    // 120vw travel — card sweeps in fully from off-screen left or right
    const dir = index % 2 === 0 ? -1 : 1;
    const tx = `${(dir * (1 - t) * 120).toFixed(2)}vw`;

    if (fade < 0.01) return null;
    return (
        <div className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: fade, transform: `translate(${tx}, 0)`, pointerEvents: fade > 0.3 ? "auto" : "none", zIndex: 20 + index, willChange: "transform, opacity" }}>
            <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#06061a] max-w-5xl w-[82vw] aspect-video shadow-[0_24px_80px_rgba(0,0,0,0.85)]">
                    <div className="flex items-center gap-2 px-5 py-3 bg-[#0d0d26] border-b border-white/[0.07]">
                        <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="ml-3 bg-[#16163a] rounded-md py-1.5 px-4 text-[10px] text-white/25 font-mono truncate max-w-xs">
                            {project.netlifyUrl?.replace("https://", "") ?? "powerdigitalmedia.com"}
                        </div>
                    </div>
                    <div className="relative w-full" style={{ height: "calc(100% - 44px)" }}>
                        <Image src={IMG_MAP[project.id] ?? "/portfolio/blacksheep-hero.webp"} alt={project.title} fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="82vw" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)" }}>
                            <span className="text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase mb-3">{project.tags[0]}</span>
                            <h3 className="text-4xl font-black text-white mb-3 uppercase tracking-tighter">{project.title}</h3>
                            <p className="text-white/50 max-w-lg mb-6 text-sm leading-relaxed">{project.description}</p>
                            {project.netlifyUrl && (
                                <a href={project.netlifyUrl} target="_blank" rel="noopener noreferrer"
                                    className="px-10 py-3 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full hover:bg-blue-500 hover:text-white transition-all">
                                    Launch →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase">{project.client} · {project.year}</span>
                </div>
            </div>
        </div>
    );
}

// ─── GEAR CARD ────────────────────────────────────────────────────────────────
const GEAR_COLORS: Record<string, string> = {
    Audio: "#3b82f6", PC: "#a855f7", Visual: "#22c55e",
    Lighting: "#f59e0b", "Build Kits": "#ef4444", Monitors: "#06b6d4", Essentials: "#f97316",
};

function GearCard({ item, index, localP }: { item: any; index: number; localP: number }) {
    const stagger = 0.04 + (index / FEATURED_GEAR.length) * 0.45;
    const raw = Math.max(0, Math.min((localP - stagger) / 0.2, 1));
    const fade = raw < 1 ? raw * raw : holdFade(localP);
    const color = GEAR_COLORS[item.category] ?? "#3b82f6";
    const col = index % 3;
    const row = Math.floor(index / 3);
    const tx = (index % 2 === 0 ? -40 : 40) * (1 - raw);
    const ty = (row === 0 ? -20 : 20) * (1 - raw);
    if (fade < 0.01) return null;
    return (
        <div className="absolute" style={{ left: `${14 + col * 28}%`, top: `${row === 0 ? 22 : 55}%`, width: "24%", opacity: fade, transform: `translate(${tx}px, ${ty}px)`, zIndex: 30 + index, pointerEvents: fade > 0.4 ? "auto" : "none", willChange: "transform, opacity" }}>
            <Link href="/showroom" className="block group rounded-2xl border border-white/[0.07] bg-black/40 overflow-hidden hover:border-blue-400/30 transition-colors duration-500"
                style={{ boxShadow: `0 0 40px ${color}12`, backdropFilter: "blur(16px)" }}>
                <div className="relative w-full aspect-square overflow-hidden" style={{ background: "#08081c" }}>
                    <Image src={item.image} alt={item.name} fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-110" sizes="24vw" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest"
                        style={{ background: `${color}22`, color, border: `1px solid ${color}35` }}>
                        {item.category}
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60" style={{ color }}>{item.brand}</div>
                    <h3 className="text-[11px] font-black text-white leading-snug line-clamp-2 mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-white/30 tracking-widest text-[10px] font-bold">{item.priceRange}</span>
                        <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest group-hover:translate-x-0.5 transition-transform">View →</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

// ─── BLOG CARD ────────────────────────────────────────────────────────────────
const BLOG_COLORS: Record<string, string> = {
    "AI Marketing": "#a855f7", "Web Engineering": "#3b82f6", Podcasting: "#22c55e",
    Video: "#f59e0b", SEO: "#ef4444", Tech: "#06b6d4",
};

function BlogCard({ post, index, localP }: { post: any; index: number; localP: number }) {
    const stagger = 0.04 + (index / RECENT_POSTS.length) * 0.45;
    const raw = Math.max(0, Math.min((localP - stagger) / 0.2, 1));
    const fade = raw < 1 ? raw * raw : holdFade(localP);
    const color = BLOG_COLORS[post.category] ?? "#3b82f6";
    const col = index % 3;
    const row = Math.floor(index / 3);
    const tx = 50 * (1 - raw);
    const ty = (row === 0 ? -20 : 20) * (1 - raw);
    if (fade < 0.01) return null;
    return (
        <div className="absolute" style={{ left: `${14 + col * 28}%`, top: `${row === 0 ? 22 : 55}%`, width: "24%", opacity: fade, transform: `translate(${tx}px, ${ty}px)`, zIndex: 30 + index, pointerEvents: fade > 0.4 ? "auto" : "none", willChange: "transform, opacity" }}>
            <Link href={`/blog/${post.slug}`} className="block group rounded-2xl border border-white/[0.07] bg-black/40 overflow-hidden hover:border-purple-400/25 transition-colors duration-500"
                style={{ backdropFilter: "blur(16px)" }}>
                <div className="relative w-full aspect-[16/9] overflow-hidden" style={{ background: "#08081c" }}>
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="24vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest"
                        style={{ background: `${color}28`, color, border: `1px solid ${color}35` }}>
                        {post.category}
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-[9px] text-white/25 font-mono mb-1">{post.date}</p>
                    <h3 className="text-[11px] font-black text-white leading-snug line-clamp-3 mb-3">{post.title}</h3>
                    <span className="text-[9px] text-purple-400 font-black uppercase tracking-widest group-hover:translate-x-0.5 transition-transform inline-block">Read Intel →</span>
                </div>
            </Link>
        </div>
    );
}

// ─── AUDIO WAVEFORM ───────────────────────────────────────────────────────────
function AudioWaveform({ active }: { active: boolean }) {
    return (
        <svg viewBox="0 0 1200 160" preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 w-full pointer-events-none h-36"
            style={{ opacity: active ? 0.18 : 0, transition: "opacity 1.5s" }}>
            {Array.from({ length: 60 }, (_, i) => {
                const h = Math.max(4, 20 + Math.sin(i * 0.8) * 50 + Math.cos(i * 1.4) * 30);
                return (
                    <rect key={i} x={(i / 60) * 1200} y={80 - h / 2} width={11} height={h} rx={3} fill="#3b82f6"
                        style={{ animation: active ? `waveBar 1.4s ease-in-out ${i * 0.04}s infinite alternate` : "none" }} />
                );
            })}
        </svg>
    );
}

// ─── METRICS ──────────────────────────────────────────────────────────────────
const METRICS = [
    { label: "Organic Traffic", value: "↑ 312%", color: "#22c55e" },
    { label: "Conv. Rate", value: "↑ 8.4%", color: "#3b82f6" },
    { label: "Bounce Rate", value: "↓ 41%", color: "#f59e0b" },
    { label: "Domain Auth.", value: "74 DA", color: "#a855f7" },
    { label: "Page Speed", value: "98/100", color: "#22c55e" },
    { label: "Backlinks", value: "+2,400", color: "#3b82f6" },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function OurWorkPage() {
    const [sceneIdx, setSceneIdx] = useState(0);
    const [localP, setLocalP] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

    const worldRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const camRef = useRef({ x: 0, y: 0 });
    const scrollPRef = useRef(0);

    useEffect(() => {
        // ── Scroll handler ────────────────────────────────────────────────────────
        const onScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const globalP = Math.min(maxScroll > 0 ? window.scrollY / maxScroll : 0, 1);
            scrollPRef.current = globalP;

            const si = getActiveScene(globalP);
            const lp = (globalP / SLOT) - si;

            setProgress(globalP);
            setSceneIdx(si);
            setLocalP(lp);
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        // ── RAF loop — lerp camera ────────────────────────────────────────────────
        let rafId: number;
        const loop = () => {
            const target = getTargetCam(scrollPRef.current);
            const cam = camRef.current;
            cam.x += (target.x - cam.x) * 0.055;
            cam.y += (target.y - cam.y) * 0.055;

            if (worldRef.current) {
                worldRef.current.style.transform = `translate(${-cam.x * 100}vw, ${-cam.y * 100}vh)`;
            }
            if (bgRef.current) {
                bgRef.current.style.backgroundPosition = `calc(50% + ${cam.x * 18}vw) calc(50% + ${cam.y * 18}vh)`;
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        // ── Cursor ────────────────────────────────────────────────────────────────
        const onMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };
        window.addEventListener("mousemove", onMove);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Architecture push-in: scale 0.80 → 1.0 over first 62% of scene dwell
    const archScale = sceneIdx === 1
        ? (0.80 + Math.min(localP / 0.62, 1) * 0.20).toFixed(4)
        : "1";

    // Metrics bars (scene 4 = VELOCITY)
    const metricsP = sceneIdx === 4 ? localP : 0;

    return (
        <>
            <style>{`
        @keyframes waveBar  { from { transform: scaleY(0.25); } to { transform: scaleY(1); } }
        /* Hero entrance — rushes in from behind the camera */
        @keyframes heroRush {
          0%   { transform: scale(0.04) translateY(40px); opacity: 0; filter: blur(24px); }
          55%  { opacity: 1; filter: blur(0); }
          100% { transform: scale(1)    translateY(0);    opacity: 1; filter: blur(0); }
        }
        @keyframes heroFadeUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        /* Podcast card float — 12px Y travel, per-card offset via animation-delay */
        @keyframes podFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        *, *::before, *::after { cursor: none !important; }
      `}</style>

            {/* Cursor */}
            <div ref={cursorDotRef}
                className="fixed top-0 left-0 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 pointer-events-none mix-blend-difference"
                style={{ zIndex: 99999, willChange: "transform" }} />
            <div className="fixed top-0 left-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/50 pointer-events-none"
                style={{ zIndex: 99998, transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`, transition: "transform 0.15s ease-out" }} />

            <HUD sceneIdx={sceneIdx} progress={progress} />

            {/* ── PARALLAX BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
                {["/images/spatial-bg-1.webp", "/images/spatial-bg-2.webp", "/images/spatial-bg-3.webp"].map((src, bi) => {
                    const inAt = bi === 0 ? 0 : bi === 1 ? 0.25 : 0.60;
                    const outAt = bi === 0 ? 0.35 : bi === 1 ? 0.70 : 1.10;
                    const peakAt = (inAt + outAt) / 2;
                    let op = 0;
                    if (progress >= inAt && progress <= peakAt) op = (progress - inAt) / (peakAt - inAt);
                    else if (progress > peakAt && progress <= outAt) op = 1 - (progress - peakAt) / (outAt - peakAt);
                    op = Math.max(0, Math.min(1, op));
                    return (
                        <div key={src}
                            ref={bi === 0 ? bgRef : undefined}
                            className="absolute inset-[-20%]"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%",
                                backgroundRepeat: "no-repeat",
                                opacity: op,
                                transition: "opacity 1.8s cubic-bezier(0.4,0,0.2,1)",
                            }} />
                    );
                })}
                <div className="absolute inset-0 bg-black/52" />
            </div>

            {/* ── SCROLL PROXY — gives the browser the correct page height ── */}
            <div style={{ height: `${TOTAL_VH}vh` }}>
                <Navbar />

                {/* ── CAMERA VIEWPORT ── */}
                <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 1, pointerEvents: "none" }}>

                    {/* ── CANVAS WORLD ── */}
                    <div ref={worldRef} className="absolute"
                        style={{ top: 0, left: 0, width: "500vw", height: "700vh", willChange: "transform" }}>

                        {/* ── SCENE I — IGNITION ── */}
                        <div className="absolute" style={{ left: `${SCENES[0].cx * 100}vw`, top: `${SCENES[0].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <Ghost text="Impact" color="rgba(59,130,246,0.035)" />
                            <div className="absolute inset-0 pointer-events-none"
                                style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ pointerEvents: "auto" }}>
                                {/* Subtitle fades up 0.3s after page open */}
                                <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase mb-8 opacity-0"
                                    style={{ animation: "heroFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s forwards" }}>
                                    Work &amp; Portfolio
                                </span>
                                {/* Main title rushes in from behind the camera */}
                                <h1 className="font-black text-center leading-[0.85] tracking-tighter"
                                    style={{ fontSize: "clamp(3.5rem,12vw,9rem)", animation: "heroRush 1.1s cubic-bezier(0.22,1,0.36,1) 0s both" }}>
                                    IMPACT<br />
                                    <span className="bg-gradient-to-r from-white via-white/80 to-white/30 bg-clip-text text-transparent italic">ENGINEERED.</span>
                                </h1>
                                {/* Scroll prompt appears last */}
                                <div className="mt-14 flex flex-col items-center gap-2 py-5 px-10 border border-white/10 rounded-full bg-white/[0.02] opacity-0"
                                    style={{ pointerEvents: "auto", animation: "heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.9s forwards" }}>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/25 animate-pulse">Scroll to Begin</p>
                                    <div className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* ── SCENE II — ARCHITECTURE — push-in ── */}
                        <div className="absolute" style={{ left: `${SCENES[1].cx * 100}vw`, top: `${SCENES[1].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <div style={{ position: "absolute", inset: 0, transform: `scale(${archScale})`, transformOrigin: "center center", transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
                                <Ghost text="Build" color="rgba(59,130,246,0.04)" />
                                <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center pointer-events-none" style={{ zIndex: 5 }}>
                                    <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase">Scene II — Architecture</span>
                                    <h2 className="font-black uppercase tracking-tighter mt-1" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
                                        Built to <span className="italic text-blue-400">dominate.</span>
                                    </h2>
                                </div>
                                {projects.map((p, i) => (
                                    <ProjectCard key={p.id} project={p} index={i}
                                        localP={sceneIdx === 1 ? localP : 0}
                                        total={projects.length} />
                                ))}
                            </div>
                        </div>

                        {/* ── SCENE III — ARMORY ── */}
                        <div className="absolute" style={{ left: `${SCENES[2].cx * 100}vw`, top: `${SCENES[2].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <Ghost text="Gear" color="rgba(245,158,11,0.04)" />
                            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center pointer-events-none" style={{ zIndex: 5 }}>
                                <span className="text-[10px] font-black tracking-[0.5em] text-amber-400 uppercase">Scene III — Armory</span>
                                <h2 className="font-black uppercase tracking-tighter mt-1" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
                                    The <span className="italic text-amber-400">Arsenal.</span>
                                </h2>
                                <p className="text-white/25 text-xs mt-2">We only recommend gear we actually use.</p>
                            </div>
                            <div className="absolute inset-0" style={{ pointerEvents: "auto" }}>
                                {FEATURED_GEAR.map((item, i) => <GearCard key={item.id} item={item} index={i} localP={sceneIdx === 2 ? localP : 0} />)}
                            </div>
                            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2"
                                style={{ zIndex: 40, opacity: holdFade(localP) * Math.min(1, Math.max(0, (localP - 0.55) / 0.15)), pointerEvents: "auto" }}>
                                <Link href="/showroom" className="px-10 py-4 bg-amber-500/10 border border-amber-500/40 text-amber-400 font-black uppercase tracking-[0.25em] text-xs rounded-full hover:bg-amber-500 hover:text-black transition-all block">
                                    Enter The Armory →
                                </Link>
                            </div>
                        </div>

                        {/* ── SCENE IV — FREQUENCY ── */}
                        <div className="absolute" style={{ left: `${SCENES[3].cx * 100}vw`, top: `${SCENES[3].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <Ghost text="Sound" color="rgba(59,130,246,0.04)" />

                            {/* ── Title — exactly as original, full size, centered ── */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <AudioWaveform active={sceneIdx === 3} />
                                <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase mb-5 relative z-10">Scene IV — Frequency</span>
                                <h2 className="font-black uppercase tracking-tighter text-center relative z-10" style={{ fontSize: "clamp(2.5rem,9vw,7rem)" }}>
                                    Hear The<br /><span className="italic text-white/50">Authority.</span>
                                </h2>
                                <p className="mt-6 text-white/35 text-sm max-w-md text-center relative z-10 leading-relaxed">
                                    We engineer narrative authority through strategic podcasting — turning your voice into a marketing weapon.
                                </p>
                            </div>

                            {/* ── 8-card array emerging from center & raining into Scene V ── */}
                            {(() => {
                                const p45 = Math.max(0, (progress - 3 * SLOT) / SLOT);
                                if (p45 === 0 || p45 > 2.5) return null;

                                const ARC = [
                                    { left: 6, top: 82, rot: -28, ep: 0 },
                                    { left: 18, top: 58, rot: -20, ep: 1 },
                                    { left: 32, top: 38, rot: -12, ep: 2 },
                                    { left: 45, top: 26, rot: -4, ep: 3 },
                                    { left: 55, top: 26, rot: 4, ep: 4 },
                                    { left: 68, top: 38, rot: 12, ep: 5 },
                                    { left: 82, top: 58, rot: 20, ep: 6 },
                                    { left: 94, top: 82, rot: 28, ep: 7 },
                                ];

                                return ARC.map((arc, i) => {
                                    const ep = PODCAST_EPISODES[arc.ep];

                                    // Vanguard formation around center (indices 3 and 4)
                                    const distFromCenter = Math.abs(3.5 - i); // 0.5, 1.5, 2.5, 3.5
                                    const rank = Math.floor(distFromCenter); // 0, 1, 2, 3

                                    // Emergence animation (0..1)
                                    const emergeThreshold = 0.04 + rank * 0.04;
                                    const emergeRaw = Math.max(0, Math.min((p45 - emergeThreshold) / 0.45, 1));
                                    const ease = emergeRaw * emergeRaw * emergeRaw * (emergeRaw * (emergeRaw * 6 - 15) + 10);

                                    if (ease < 0.001) return null;

                                    // Falling animation: Outer edge cards fall away first for organic peeling effect
                                    const fallStartRanked = 0.74 + (3 - rank) * 0.02;
                                    const fallT = Math.max(0, p45 - fallStartRanked);

                                    // Raining/Gravity math
                                    const fallDy = 2200 * fallT * fallT; // Rapid downward acceleration
                                    const fallDx = (i - 3.5) * 55 * fallT; // Organic spread out
                                    const fallRot = (i - 3.5) * 45 * Math.pow(fallT, 1.2); // Tumble outwards

                                    // Composite final transforms
                                    const dx = (50 - arc.left) * (1 - ease) + fallDx;
                                    const dy = (50 - arc.top) * (1 - ease) + fallDy;
                                    const tx = `${dx.toFixed(2)}vw`;
                                    const ty = `${dy.toFixed(2)}vh`;

                                    // Base scale & rotation
                                    const scale = 0.15 + 0.85 * ease;
                                    const rot = arc.rot * ease + fallRot;

                                    // Opacities
                                    const appearOp = Math.min(ease * 3, 1);
                                    const fallFade = Math.max(0, 1 - Math.min(1, fallT * 2.5)); // Fades completely before 2.0
                                    const op = appearOp * fallFade;

                                    const col = '59,130,246'; // Unified cinematic blue
                                    // Keep outer cards tucked underneath
                                    const stackZ = 25 - rank;

                                    return (
                                        <a key={i} href={ep?.url ?? '#'} target="_blank" rel="noopener noreferrer"
                                            className="group absolute block"
                                            style={{
                                                left: `${arc.left}%`,
                                                top: `${arc.top}%`,
                                                zIndex: stackZ,
                                                opacity: op,
                                                transform: `translate(-50%, -50%) translate(${tx}, ${ty}) scale(${scale}) rotate(${rot}deg)`,
                                                pointerEvents: ease > 0.8 && fallT < 0.1 ? 'auto' : 'none',
                                                willChange: 'transform, opacity',
                                            }}>
                                            {/* Float — independent oscillation per card */}
                                            <div style={{ animation: `podFloat 5.5s ease-in-out ${-i * 0.55}s infinite`, willChange: 'transform' }}>
                                                {/* 16:9 card — premium blue glow */}
                                                <div className="relative overflow-hidden"
                                                    style={{
                                                        width: 'clamp(170px, 18vw, 290px)',
                                                        aspectRatio: '16 / 9',
                                                        borderRadius: '14px',
                                                        border: `1px solid rgba(${col},${0.25 + 0.35 * ease})`,
                                                        background: 'rgba(4,8,26,0.62)',
                                                        backdropFilter: 'blur(12px)',
                                                        filter: `drop-shadow(0 20px 48px rgba(0,0,0,0.88)) drop-shadow(0 0 ${15 + 20 * ease}px rgba(${col},${0.2 + 0.4 * ease}))`,
                                                        transition: 'filter 0.4s ease, transform 0.4s ease',
                                                    }}
                                                    onMouseEnter={e => {
                                                        (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 24px 58px rgba(0,0,0,0.93)) drop-shadow(0 0 35px rgba(${col},0.85))`;
                                                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 20px 48px rgba(0,0,0,0.88)) drop-shadow(0 0 35px rgba(${col},0.6))`;
                                                        (e.currentTarget as HTMLElement).style.transform = '';
                                                    }}>
                                                    <Image src={ep?.thumb ?? ''} alt={ep?.title ?? ''} fill
                                                        className="object-cover" sizes="290px" />
                                                    {/* Color tint overlay on hover */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        style={{ background: `linear-gradient(135deg,rgba(${col},0.22),transparent)` }} />
                                                    {/* Play button */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="w-11 h-11 rounded-full flex items-center justify-center"
                                                            style={{ background: `rgba(${col},0.92)`, boxShadow: `0 0 24px rgba(${col},0.75)` }}>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Episode name */}
                                                <p className="mt-1.5 text-[8px] font-black uppercase tracking-widest text-center text-blue-400"
                                                    style={{ width: 'clamp(170px,18vw,290px)', opacity: 0.65 + 0.35 * ease }}>
                                                    {ep?.title ?? ''}
                                                </p>
                                            </div>
                                        </a>
                                    );
                                });
                            })()}
                        </div>

                        {/* ── SCENE V — VELOCITY ── */}
                        <div className="absolute" style={{ left: `${SCENES[4].cx * 100}vw`, top: `${SCENES[4].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <Ghost text="Growth" color="rgba(34,197,94,0.03)" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                                style={{ opacity: holdFade(metricsP), transform: `scale(${0.94 + metricsP * 0.06})` }}>
                                <span className="text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase mb-3">Scene V — Velocity</span>
                                <h2 className="font-black tracking-tighter uppercase text-center mb-8" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
                                    Growth<br /><span className="italic text-blue-400">Engineered.</span>
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl px-6">
                                    {METRICS.map((m, i) => (
                                        <div key={i} className="bg-black/35 border border-white/[0.08] rounded-2xl p-4 flex flex-col gap-1.5"
                                            style={{ boxShadow: `0 0 24px ${m.color}18`, borderColor: `${m.color}25` }}>
                                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.color }}>{m.label}</span>
                                            <span className="text-3xl font-black text-white">{m.value}</span>
                                            <div className="h-1 bg-white/[0.07] rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-[2500ms] ease-out"
                                                    style={{ width: `${metricsP * 100}%`, background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── SCENE VI — INTEL ── */}
                        <div className="absolute" style={{ left: `${SCENES[5].cx * 100}vw`, top: `${SCENES[5].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <Ghost text="Knowledge" color="rgba(168,85,247,0.04)" />
                            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center pointer-events-none" style={{ zIndex: 5 }}>
                                <span className="text-[10px] font-black tracking-[0.5em] text-purple-400 uppercase">Scene VI — Intel</span>
                                <h2 className="font-black uppercase tracking-tighter mt-1" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
                                    The <span className="italic text-purple-400">Knowledge Vault.</span>
                                </h2>
                                <p className="text-white/25 text-xs mt-2">AI, SEO, web &amp; digital warfare — decoded.</p>
                            </div>
                            <div className="absolute inset-0" style={{ pointerEvents: "auto" }}>
                                {RECENT_POSTS.map((post, i) => <BlogCard key={post.slug} post={post} index={i} localP={sceneIdx === 5 ? localP : 0} />)}
                            </div>
                            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2"
                                style={{ zIndex: 40, opacity: holdFade(localP) * Math.min(1, Math.max(0, (localP - 0.55) / 0.15)), pointerEvents: "auto" }}>
                                <Link href="/blog" className="px-10 py-4 bg-purple-500/10 border border-purple-500/40 text-purple-400 font-black uppercase tracking-[0.25em] text-xs rounded-full hover:bg-purple-500 hover:text-black transition-all block">
                                    Read The Intel →
                                </Link>
                            </div>
                        </div>

                        {/* ── SCENE VII — VISION ── */}
                        <div className="absolute" style={{ left: `${SCENES[6].cx * 100}vw`, top: `${SCENES[6].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <Ghost text="Vision" color="rgba(59,130,246,0.04)" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase mb-6">Scene VII — Vision</span>
                                <div className="relative w-[84vw] max-w-5xl aspect-video rounded-3xl overflow-hidden pointer-events-auto"
                                    style={{ boxShadow: "0 0 80px rgba(59,130,246,0.1), 0 40px 100px rgba(0,0,0,0.7)" }}>
                                    <iframe className="absolute inset-0 w-full h-full border-0"
                                        src="https://www.youtube.com/embed/MhlTopnX68g?autoplay=1&mute=1&controls=0&loop=1&playlist=MhlTopnX68g"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
                                    <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black to-transparent pointer-events-none" />
                                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#04040f] to-transparent pointer-events-none" />
                                    <div className="absolute bottom-7 left-10 right-10 flex justify-between items-end pointer-events-none">
                                        <div>
                                            <span className="text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase block mb-1">Streaming Now</span>
                                            <h3 className="text-2xl font-black uppercase tracking-tighter">HSP Podcast</h3>
                                        </div>
                                        <a href="https://youtu.be/MhlTopnX68g" target="_blank" rel="noopener noreferrer"
                                            className="px-7 py-3 bg-blue-500 text-black font-black uppercase text-xs tracking-widest rounded-full pointer-events-auto hover:scale-105 transition-transform">
                                            Watch →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── SCENE VIII — TERMINAL ── */}
                        <div className="absolute" style={{ left: `${SCENES[7].cx * 100}vw`, top: `${SCENES[7].cy * 100}vh`, width: "100vw", height: "100vh" }}>
                            <Ghost text="Terminal" color="rgba(59,130,246,0.04)" />
                            {(() => {
                                // Animate the entire scene out beautifully when scrolling into the footer
                                // Scene 8 occupies the final standard time slot (124vh)
                                // Beyond this, the user is scrolling purely into the footer space.
                                const isFooter = Math.max(0, (progress - 7 * SLOT) / SLOT);
                                // The footer comes up rapidly at the very end
                                const exitT = Math.max(0, (isFooter - 0.75) / 0.25);

                                // Text elements fade and scale up to disappear gracefully
                                const textScale = 1 - exitT * 0.15; // Gently scale down into the background
                                const textOp = Math.max(0, 1 - exitT * 2.5); // Fade out quickly
                                const textTy = -exitT * 30; // Drift up slightly

                                // Button pushes down gently by 35vh off its normal block-level position 
                                // as the footer comes up, resulting in it perfectly straddling the line between the page and footer.
                                const btnTy = exitT * 35;

                                return (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none">
                                        <div className="absolute inset-0 pointer-events-none" style={{ opacity: textOp, background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />

                                        {/* Main container — keeps items safely stacked */}
                                        <div className="flex flex-col items-center max-w-3xl text-center relative z-10 pointer-events-auto">

                                            {/* Text group */}
                                            <div style={{ opacity: textOp, transform: `scale(${textScale}) translateY(${textTy}px)`, willChange: "transform, opacity", pointerEvents: "none" }}>
                                                <span className="text-blue-400 text-[10px] font-black tracking-[0.6em] uppercase mb-7 opacity-60 block">Scene VIII — Terminal</span>
                                                <h2 className="font-black mb-6 tracking-tighter leading-[0.88] uppercase" style={{ fontSize: "clamp(3rem,8vw,6.5rem)" }}>
                                                    Accelerate Your<br />
                                                    <span className="italic bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Vision.</span>
                                                </h2>
                                                <p className="text-white/35 text-base mb-12 max-w-xl leading-relaxed mx-auto">
                                                    We don&apos;t build websites. We engineer high-velocity growth systems for visionaries who demand results.
                                                </p>
                                            </div>

                                            {/* Button group — stays glued in the DOM flow but drops down as footer comes up */}
                                            <div style={{ transform: `translateY(${btnTy}vh)`, zIndex: 90, willChange: "transform" }} className="flex flex-col items-center mt-6">
                                                <button onClick={() => setIsBookingOpen(true)}
                                                    className="px-16 py-6 bg-blue-500 text-black font-black uppercase tracking-[0.25em] text-sm rounded-full hover:scale-105 active:scale-95 transition-all"
                                                    style={{ boxShadow: "0 0 80px rgba(59,130,246,0.5), 0 20px 40px rgba(0,0,0,0.8)" }}>
                                                    Book Strategy Session
                                                </button>
                                                <span className="mt-5 text-white/15 text-[10px] font-mono tracking-widest uppercase transition-opacity"
                                                    style={{ opacity: textOp }}>
                                                    No obligation · Free 30-min discovery
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                    </div>{/* end world */}
                </div>{/* end camera viewport */}

                {/* Footer lives below the scroll proxy — reachable on last scene */}
                <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 10, pointerEvents: "auto" }}>
                    <Footer />
                </div>
            </div >

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
