"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Play, Mic2, Tv, Video as VideoIcon } from "lucide-react";

const productions = [
    {
        title: "All Things New Podcast",
        category: "Ministry & Growth",
        thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop",
        link: "https://youtube.com/playlist?list=PLhZ7JXj1xJmTFftL8GVjM0v5aXdJAOaI3",
        stats: "4K RAW EDIT"
    },
    {
        title: "A Fool N His Folly",
        category: "Urban Culture",
        thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
        link: "https://youtube.com/playlist?list=PLhZ7JXj1xJmQlSNvqmaq2h8o9XqhAY3Pr",
        stats: "HDR CINEMATIC"
    },
    {
        title: "HSP PodCast",
        category: "Business & Strategy",
        thumbnail: "https://images.unsplash.com/photo-1559223607-1601d9333550?q=80&w=2070&auto=format&fit=crop",
        link: "https://www.youtube.com/@HSP-PodCast",
        stats: "MULTI-CAM ARRAY"
    }
];

export default function ShowcaseReel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({
        container: containerRef,
    });

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="container px-6 mx-auto mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Production Portfolio</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Kinetic Reel.</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-foreground/50 font-light text-balance md:text-right">
                        Real-world execution using our Elite Protocol. Studio-grade engineering meet high-velocity viral distribution.
                    </p>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-auto pb-12 px-6 no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
            >
                {productions.map((show, index) => (
                    <motion.a
                        key={show.title}
                        href={show.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex-none w-[85vw] md:w-[600px] aspect-[16/9] rounded-[2rem] overflow-hidden group snap-center cursor-none"
                    >
                        {/* Thumbnail */}
                        <Image
                            src={show.thumbnail}
                            alt={show.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                        />

                        {/* Production Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Camera UI Elements */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between border border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-[2rem]">
                            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/50 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    REC [00:42:12:08]
                                </div>
                                <div className="text-[10px] font-mono tracking-widest text-white/50 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md uppercase">
                                    {show.stats}
                                </div>
                            </div>

                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">{show.category}</span>
                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4">{show.title}</h3>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-cyan-400 transition-colors">
                                    Launch Stream <Play className="w-3 h-3 fill-current" />
                                </div>
                            </div>
                        </div>

                        {/* Corner Markers */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                ))}
            </div>

            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] pointer-events-none -z-10" />
        </section>
    );
}
