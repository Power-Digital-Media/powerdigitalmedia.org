"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareProtocol() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="p-4 rounded-full glass-card border-white/5 hover:border-accent/40 text-white/40 hover:text-accent transition-all group relative"
            title="Copy Protocol Link"
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <Check className="w-5 h-5 text-green-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="share"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </motion.div>
                )}
            </AnimatePresence>

            {copied && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-accent text-[8px] font-bold uppercase tracking-widest text-white animate-bounce">
                    Copied
                </span>
            )}
        </button>
    );
}
