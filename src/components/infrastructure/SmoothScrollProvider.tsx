"use client";

import { ReactNode, useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const [enableLenis, setEnableLenis] = useState(false);

    useEffect(() => {
        // Only enable smooth inertial scroll on desktop screens with fine pointer (mouse/trackpad)
        // Never hijack main thread on touch/mobile devices which have native hardware-accelerated momentum scroll
        const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
        if (isDesktop) {
            // Defer Lenis activation until idle to ensure 0 main-thread contention during initial load
            if ("requestIdleCallback" in window) {
                const idleId = window.requestIdleCallback(() => setEnableLenis(true), { timeout: 2000 });
                return () => window.cancelIdleCallback(idleId);
            } else {
                const timer = setTimeout(() => setEnableLenis(true), 1000);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    if (!enableLenis) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
