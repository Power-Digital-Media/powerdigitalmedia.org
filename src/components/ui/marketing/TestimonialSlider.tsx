"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { VERIFIED_REVIEWS } from '@/data/reviews';

export default function TestimonialSlider() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % VERIFIED_REVIEWS.length);
    const prev = () => setIndex((prev) => (prev - 1 + VERIFIED_REVIEWS.length) % VERIFIED_REVIEWS.length);

    const current = VERIFIED_REVIEWS[index];

    return (
        <div className="relative max-w-5xl mx-auto px-4 z-10 w-full">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                <Quote className="w-24 h-24 text-amber-400" />
            </div>

            <div className="flex items-center gap-4 md:gap-12">
                <button
                    onClick={prev}
                    className="p-3 md:p-4 rounded-full glass-card border border-white/10 hover:border-amber-400/50 hover:text-amber-400 transition-all z-20 group hidden md:block"
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
                            <div className="p-8 md:p-14 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-xl max-w-3xl mx-auto">
                                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[...Array(current.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                                        {current.source === "Google" && <span className="text-amber-400 font-black">Google</span>}
                                        {current.source === "Facebook" && <span className="text-[#1877F2] font-black">Facebook</span>}
                                        {current.source === "BBB" && <span className="text-blue-400 font-black">BBB</span>}
                                        <span className="text-slate-400 font-normal">Review</span>
                                    </span>
                                </div>
                                <p className="text-lg md:text-2xl font-normal leading-relaxed text-white mb-8 italic">
                                    &ldquo;{current.text}&rdquo;
                                </p>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-amber-400 uppercase tracking-wider text-sm md:text-base">
                                        {current.author}
                                    </h4>
                                    <p className="text-slate-400 uppercase tracking-wider font-semibold text-xs">
                                        {current.roleOrCompany || "Verified Client"} • {current.source} Verified
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={next}
                    className="p-3 md:p-4 rounded-full glass-card border border-white/10 hover:border-amber-400/50 hover:text-amber-400 transition-all z-20 group hidden md:block"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="flex justify-center gap-3 mt-4">
                {VERIFIED_REVIEWS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-10 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'w-3 bg-slate-800'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
