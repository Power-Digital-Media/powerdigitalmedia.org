"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import BookingModal from "../ui/BookingModal";
import { projects } from "@/data/projects";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    // Ignore mobile browser UI bar collapsing/expanding to prevent massive pin layout jumps
    ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function Portfolio({ titleAs: Title = "h1" }: { titleAs?: "h1" | "h2" }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // CRITICAL: Ensure GSAP recalculates after custom fonts and layout shifts resolve
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.fonts.ready.then(() => {
                ScrollTrigger.refresh();
            });
            // Fallback refresh loop just in case LCP image loaders shift the DOM later
            const timer = setTimeout(() => ScrollTrigger.refresh(), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    useGSAP(() => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // Calculate how far to move the track
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        // Use GSAP native pinning instead of CSS sticky to perfectly control document flow
        const scrollTween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            force3D: true, // Force GPU acceleration
            scrollTrigger: {
                trigger: section,
                pin: true,
                start: "top top",
                end: () => `+=${track.scrollWidth - window.innerWidth}`,
                scrub: true, // strict 1:1 scrub prevents disjointed moving after pin releases
                invalidateOnRefresh: true, // Recalculate on resize
            }
        });

        // Glow intersections for cards
        const cards = gsap.utils.toArray(".portfolio-card");
        cards.forEach((card: any, i) => {
            // Parallax on image inside the card
            const img = card.querySelector(".portfolio-img");
            if (img) {
                gsap.to(img, {
                    x: "15%",
                    ease: "none",
                    force3D: true, // Prevent jitter on parallax
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "left right", // Parallax triggers when card enters the viewport horizontally
                        end: "right left",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            }

            // Glow logic on center intersection using Opacity on a separate layer
            const glowLayer = card.querySelector(".device-glow");
            if (glowLayer) {
                // 1. Fade IN as it approaches the center
                gsap.fromTo(glowLayer,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: "left center+=15%", // Start fading in as left edge nears center
                            end: "center center", // Max opacity at absolute center
                            scrub: true,
                        }
                    }
                );

                // 2. Fade OUT as it leaves the center
                gsap.fromTo(glowLayer,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        immediateRender: false,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: "center center", // Start fading out past center
                            end: "right center-=15%", // Fully transparent when right edge leaves center
                            scrub: true,
                        }
                    }
                );
            }
        });
    }, { scope: sectionRef });

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="relative bg-[#020617] w-full overflow-hidden"
        >
            <div className="relative w-full h-[100vh] flex flex-col justify-center">

                {/* Header Area (Pinned Absolute Globally) */}
                <div className="absolute top-0 left-0 w-full z-30 pt-16 md:pt-24 px-4 md:px-12 pointer-events-none shrink-0 flex flex-col justify-start">
                    <div className="max-w-[1400px] mx-auto flex justify-between items-end w-full">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1px] w-8 bg-cyan-400"></div>
                                <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase">Our Portfolio</span>
                            </div>
                            <Title className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase text-glow-cyan leading-none drop-shadow-md">
                                Beautiful & Responsive<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Websites</span>
                            </Title>
                        </div>
                    </div>
                </div>

                {/* The Track Container moving horizontally inside the Sticky Frame */}
                <div className="relative flex h-full w-full items-center pl-4 md:px-0 py-0 bg-transparent">
                    <div ref={trackRef} className="relative flex gap-6 md:gap-16 w-max items-center h-full pt-20 md:pt-[150px] pb-16 md:pb-24 px-0 md:px-12">
                        {/* Initial padding so the first card isn't overlapping text */}
                        <div className="block w-[5vw] md:w-[10vw] shrink-0" />

                        {projects.map((project, index) => {
                            const glowRGB = project.glowColor || "34, 197, 94";

                            return (
                                <div
                                    key={project.id}
                                    className="portfolio-card relative shrink-0 w-[85vw] max-w-[400px] md:max-w-none md:w-[70vw] lg:w-[60vw] aspect-[9/16] md:aspect-auto md:h-[65vh] max-h-[850px] snap-center flex items-center justify-center group animate-float transform-gpu"
                                    style={{
                                        animationDelay: `${index * 0.4}s`,
                                        WebkitBackfaceVisibility: 'hidden', // iOS Safari composite fix
                                        backfaceVisibility: 'hidden',
                                        WebkitTransformStyle: 'preserve-3d', // Force GPU layer
                                        transformStyle: 'preserve-3d',
                                        willChange: 'transform' // Pre-allocate VRAM
                                    }}
                                >
                                    {/* Main Structural Frame */}
                                    <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-black/50 backdrop-blur-sm border border-white/5 shadow-2xl flex flex-col justify-end transform-gpu"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >

                                        {/* Fallback Static Border (visible until center glow hits) */}
                                        <div
                                            className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] pointer-events-none z-30 border-[1px] md:border-[2px] transition-opacity duration-1000 group-hover:opacity-0"
                                            style={{
                                                borderColor: 'rgba(255,255,255,0.05)',
                                            }}
                                        />

                                        {/* Mobile native clickable entire-card hit surface */}
                                        <Link
                                            href={`/portfolio/${project.id}`}
                                            className="absolute inset-0 z-40 md:hidden"
                                            aria-label={`View ${project.title} details`}
                                        />

                                        {/* Image Container (Needs extra width for parallax on desktop, exact fit on mobile) */}
                                        <div className="absolute inset-0 w-full md:w-[115%] h-full left-0 md:-left-[7.5%] overflow-hidden bg-black pointer-events-none">
                                            {/* Desktop Aspect Ratio */}
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="hidden md:block portfolio-img object-cover object-top opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                                                sizes="(min-width: 768px) 70vw, 100vw"
                                                priority={index < 2}
                                            />

                                            {/* Mobile 9x16 Aspect Ratio */}
                                            <Image
                                                src={project.mobileImage || project.image}
                                                alt={`${project.title} Mobile View`}
                                                fill
                                                className="block md:hidden portfolio-img object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-1000 transform-gpu"
                                                style={{ backfaceVisibility: 'hidden' }}
                                                sizes="100vw"
                                                priority={index < 2}
                                                loading={index < 2 ? "eager" : "lazy"} // Force eager load for above-fold cards to stop layout glitches
                                            />

                                            {/* Mobile Inner Screen Glow */}
                                            <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(34,211,238,0.3)] pointer-events-none md:hidden z-20" />

                                            {/* Gradient Masking */}
                                            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 md:via-black/40 to-transparent group-hover:from-black/80 group-hover:via-black/20 transition-colors duration-700" />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="hidden md:flex absolute inset-0 z-20 p-6 md:p-10 flex-col justify-end pointer-events-none">

                                            <div className="flex flex-wrap items-center gap-3 mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                                                    <span className="text-[10px] font-black text-cyan-50 uppercase tracking-[0.25em] leading-none mt-0.5">
                                                        {project.tags[0]}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase mb-4 text-glow-cyan transform group-hover:scale-[1.02] origin-left transition-all duration-500 leading-none">
                                                {project.title}
                                            </h3>

                                            <p className="text-white/70 text-sm md:text-lg leading-relaxed mb-8 max-w-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 line-clamp-3">
                                                {project.description}
                                            </p>

                                            {/* Desktop Actions */}
                                            <div className="hidden md:flex items-center gap-4 pointer-events-auto transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 pb-2">
                                                <Link
                                                    href={`/portfolio/${project.id}`}
                                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-white transition-colors duration-300"
                                                    aria-label={`View full architecture for ${project.title}`}
                                                >
                                                    Analyze Build
                                                </Link>
                                                <a
                                                    href={project.netlifyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center px-6 py-4 rounded-xl border border-white/20 text-xs font-black uppercase tracking-widest text-white hover:text-cyan-400 hover:border-cyan-400 transition-all bg-black/50 backdrop-blur-md hover:bg-white/5"
                                                    aria-label={`Open ${project.title} live interface`}
                                                >
                                                    Live Intel <ExternalLink className="w-4 h-4 ml-2" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Mobile Actions (Always visible for structure, but entire card is clickable) */}
                                        <div className="flex md:hidden absolute inset-0 z-20 flex-col justify-end p-6 pb-8 pointer-events-none">
                                            <h3 className="text-3xl font-black text-white tracking-tight uppercase mb-6 leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center justify-between gap-3 pointer-events-none w-full">
                                                <span
                                                    className="flex-1 text-center py-4 bg-white text-black text-sm font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                                >
                                                    Analyze Build
                                                </span>
                                                <span
                                                    className="flex items-center justify-center w-14 h-14 rounded-xl border-2 border-white/30 text-white bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
                                                >
                                                    <ExternalLink className="w-6 h-6 ml-0.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Glow Layer mapped to GSAP opacity - Displayed on top for sharp border definition */}
                                    <div
                                        className="device-glow absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] pointer-events-none z-30 border-[1px] md:border-[2px]"
                                        style={{
                                            boxShadow: `0 0 30px 2px rgba(${glowRGB}, 0.7), 0 0 100px 15px rgba(${glowRGB}, 0.25), inset 0 0 20px 2px rgba(${glowRGB}, 0.5)`,
                                            borderColor: `rgba(${glowRGB}, 1)`,
                                            opacity: 0
                                        }}
                                    />
                                </div>
                            )
                        })}
                        {/* Trailing space block (mirrors the initial pl-4 + 5vw left space) */}
                        <div className="block w-[calc(5vw+1rem)] md:w-[10vw] shrink-0" />
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section >
    );
}
