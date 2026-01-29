"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export default function ThreeDCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isAutoSpin, setIsAutoSpin] = useState(true);
    const [dimensions, setDimensions] = useState({ radius: 250, width: 320, height: 450, perspective: 1200 }); // Mobile-first defaults
    const [mounted, setMounted] = useState(false);
    const dragX = useRef(0);

    const projectCount = projects.length;
    const rotateStep = 360 / projectCount;

    // Dynamic Scaling Engine
    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            const w = window.innerWidth;
            if (w < 640) { // Mobile
                setDimensions({ radius: 160, width: 340, height: 260, perspective: 1000 });
            } else if (w < 1024) { // Tablet
                setDimensions({ radius: 250, width: 450, height: 280, perspective: 1200 });
            } else { // Desktop
                setDimensions({ radius: 400, width: 620, height: 320, perspective: 1500 });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNext = () => {
        setIsAutoSpin(false);
        const newRotation = rotation - rotateStep;
        setRotation(newRotation);
        setActiveIndex((prev) => (prev + 1) % projectCount);
    };

    const handlePrev = () => {
        setIsAutoSpin(false);
        const newRotation = rotation + rotateStep;
        setRotation(newRotation);
        setActiveIndex((prev) => (prev - 1 + projectCount) % projectCount);
    };

    // Swipe Physics Engine
    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { velocity: { x: number }; offset: { x: number } }) => {
        const threshold = 50;
        const velocity = info.velocity.x;
        const offset = info.offset.x;

        if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
            if (velocity > 0 || offset > threshold) {
                handlePrev();
            } else {
                handleNext();
            }
        }
    };

    // Auto-spin logic
    useEffect(() => {
        if (!isAutoSpin) return;
        const interval = setInterval(() => {
            setRotation((prev) => prev - rotateStep);
            setActiveIndex((prev) => (prev + 1) % projectCount);
        }, 8000);
        return () => clearInterval(interval);
    }, [isAutoSpin, rotateStep, projectCount]);

    if (!mounted) return <div className="h-[500px] md:h-[650px]" />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 300, rotateX: 45, rotateY: -720 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="relative w-full h-[380px] md:h-[480px] flex items-center justify-center perspective overflow-visible select-none touch-none"
            style={{ perspective: dimensions.perspective }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsAutoSpin(false)}
            onDragEnd={onDragEnd}
        >
            {/* --- The Spatial Stage --- */}
            <div className="relative w-full h-full flex items-center justify-center p-2 md:p-10 preserve-3d">

                {/* 3D Rotor Wrapper */}
                <motion.div
                    className="relative w-full h-full preserve-3d"
                    animate={{ rotateY: rotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 20, mass: 1 }}
                >
                    {projects.map((project, index) => {
                        const itemRotation = index * rotateStep;
                        // Calculate face visibility based on current state
                        const currentFacingIndex = (Math.round(-rotation / rotateStep) % projectCount + projectCount) % projectCount;
                        const isActive = currentFacingIndex === index;

                        return (
                            <motion.div
                                key={project.id}
                                className="absolute top-1/2 left-1/2 preserve-3d"
                                style={{
                                    width: dimensions.width,
                                    height: dimensions.height,
                                    marginTop: -(dimensions.height / 2),
                                    marginLeft: -(dimensions.width / 2),
                                    transform: `rotateY(${itemRotation}deg) translateZ(${dimensions.radius}px)`,
                                    backfaceVisibility: "hidden"
                                }}
                            >
                                {/* The "Card" Structure */}
                                <motion.div
                                    className={`relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border transition-all duration-[1500ms] ${isActive ? 'border-cyan-400/50 shadow-[0_0_120px_rgba(34,211,238,0.25)] scale-100 opacity-100' : 'border-white/5 opacity-40 scale-75 md:scale-90 grayscale shadow-2xl'}`}
                                >
                                    {/* Authentic Screenshot Render */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top hover:scale-110 transition-transform duration-[8000ms]"
                                        priority={index === 0}
                                    />

                                    {/* Cinematic Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent transition-opacity duration-1000 ${isActive ? 'opacity-80' : 'opacity-40'}`} />

                                    {/* Top-Level Tags (Architectural Badge) */}
                                    <div className={`absolute top-6 left-6 right-6 md:top-10 md:left-10 md:right-10 flex justify-between items-start transition-all duration-1000 ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`}>
                                        <div className="flex flex-col gap-1 md:gap-2">
                                            <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-cyan-400/20 backdrop-blur-xl border border-cyan-400/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 w-fit shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                                                Protocol {index + 1}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-cyan-400 animate-pulse outline outline-4 outline-cyan-400/20" />
                                                <span className="text-[7px] md:text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{project.tags[0]} Infrastructure</span>
                                            </div>
                                        </div>
                                        <div className="px-3 py-2 md:px-5 md:py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/5 text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.3em] leading-none">
                                            {project.year}
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className={`absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 transition-all duration-1000 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                                            <Link
                                                href={`/portfolio/${project.id}`}
                                                className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] hover:bg-cyan-400 hover:text-white transition-all shadow-2xl shadow-cyan-400/20 active:scale-95 text-center"
                                            >
                                                Initialize Build
                                            </Link>
                                            <a
                                                href={project.netlifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-cyan-400 transition-colors group/link pb-1 border-b border-transparent hover:border-cyan-400/50"
                                            >
                                                Live Intel <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* --- Radial Navigation Control --- */}
            <div className="absolute -bottom-12 md:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-16 z-50">
                <button
                    onClick={handlePrev}
                    className="group w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all active:scale-90"
                >
                    <ArrowLeft className="w-5 h-5 md:w-8 md:h-8 group-hover:-translate-x-2 transition-transform" />
                </button>

                <div className="flex items-center gap-3 md:gap-6">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setIsAutoSpin(false);
                                // Find shortest path for manual navigation
                                let diff = i - activeIndex;
                                if (diff > projectCount / 2) diff -= projectCount;
                                if (diff < -projectCount / 2) diff += projectCount;
                                setRotation(rotation - diff * rotateStep);
                                setActiveIndex(i);
                            }}
                            className={`h-1 md:h-1.5 rounded-full transition-all duration-1000 ${activeIndex === i ? 'w-12 md:w-24 bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.6)]' : 'w-3 md:w-6 bg-white/10 hover:bg-white/40'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="group w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all active:scale-90"
                >
                    <ArrowRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>

            {/* Global Perspective Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none -z-20 opacity-25">
                <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-cyan-400/10 to-transparent blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-cyan-400/5 rounded-full" />
            </div>
        </motion.div>
    );
}
