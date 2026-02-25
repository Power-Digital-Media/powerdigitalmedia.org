"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
