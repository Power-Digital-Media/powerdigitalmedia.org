"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    calLink?: string;
}

export default function BookingModal({ isOpen, onClose, calLink = "damein-powerdigitalmedia.org" }: BookingModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl h-[80vh] bg-slate-950 border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden glass-card"
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 border-b border-white/5 bg-slate-950/50 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Secure Protocol Sync</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/50 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cal.com Embed */}
                        <div className="w-full h-full pt-16">
                            <iframe
                                src={`https://cal.com/${calLink}?embed=true`}
                                className="w-full h-full border-none"
                                title="Schedule a call"
                            />
                        </div>

                        {/* Ambient Glow */}
                        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
