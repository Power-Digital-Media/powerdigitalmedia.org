"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialSlider() {
    const [index, setIndex] = useState(0);
    const testimonials = [
        {
            name: "Marcus Thorne",
            company: "Nexus Realty",
            quote: "The Multi-Model engine transformed our lead flow in weeks. We've seen a 4x ROI since deployment. It's not just marketing; it's engineering.",
            color: "cyan"
        },
        {
            name: "Sarah Chen",
            company: "VitalEdge Health",
            quote: "Ruthless rotation is the secret sauce. Our ad fatigue vanished, replaced by a consistent stream of qualified prospects who actually convert.",
            color: "purple"
        },
        {
            name: "Jason Miller",
            company: "Titan Fitness",
            quote: "Power Digital doesn't just manage ads; they build systems. Their 2026 tech stack is light years ahead of any agency we've worked with.",
            color: "pink"
        },
        {
            name: "Elena Rodriguez",
            company: "Solaris Tech",
            quote: "Testing 20+ hooks a month seemed impossible until we plugged into the Growth Engine. Our cost-per-lead dropped by 65% in the first cycle.",
            color: "blue"
        }
    ];

    const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="relative max-w-5xl mx-auto px-4 z-10 w-full">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                <Quote className="w-24 h-24 text-cyan-400" />
            </div>

            <div className="flex items-center gap-4 md:gap-12">
                <button
                    onClick={prev}
                    className="p-3 md:p-4 rounded-full glass-card border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all z-20 group hidden md:block"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="flex-1 overflow-hidden w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="text-center w-full py-8"
                        >
                            <div className="light-trail-wrapper rounded-[2.5rem] p-[1px] mb-8 inline-block max-w-3xl w-full">
                                <div className={`light-trail-border light-trail-${testimonials[index].color}`}></div>
                                <div className="light-trail-content p-8 md:p-16 rounded-[2.4rem] glass-card">
                                    <p className="text-lg md:text-3xl font-light leading-relaxed text-white mb-10 italic">
                                        "{testimonials[index].quote}"
                                    </p>
                                    <div className="space-y-1">
                                        <h4 className="font-orbitron font-black text-cyan-400 uppercase tracking-[0.2em] text-xs md:text-lg">
                                            {testimonials[index].name}
                                        </h4>
                                        <p className="text-slate-500 uppercase tracking-[0.3em] font-bold text-[8px] md:text-[10px]">
                                            {testimonials[index].company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={next}
                    className="p-3 md:p-4 rounded-full glass-card border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all z-20 group hidden md:block"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="flex justify-center gap-3 mt-4">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-12 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'w-3 bg-slate-800'
                            }`}
                    />
                ))}
            </div>

            {/* Mobile Controls */}
            <div className="flex justify-between mt-8 md:hidden relative z-20">
                <button onClick={prev} className="p-4 rounded-full glass-card border border-white/10 text-slate-400">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={next} className="p-4 rounded-full glass-card border border-white/10 text-slate-400">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
