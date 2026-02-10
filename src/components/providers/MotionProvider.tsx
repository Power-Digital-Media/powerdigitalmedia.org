"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

/**
 * LazyMotion wrapper for optimized Framer Motion bundle size
 * Use this instead of importing motion directly
 * Reduces Framer Motion bundle from ~60KB to ~25KB
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={domAnimation} strict>
            {children}
        </LazyMotion>
    );
}

// Re-export motion components for convenience
export { m as motion, AnimatePresence } from "framer-motion";
