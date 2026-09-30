"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () =>
    import("framer-motion").then((res) => res.domAnimation);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={loadFeatures}>
            {children}
        </LazyMotion>
    );
}
