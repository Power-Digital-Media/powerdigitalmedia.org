"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function GodModeEffects() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mousePosition.x, springConfig);
    const springY = useSpring(mousePosition.y, springConfig);

    useEffect(() => {
        springX.set(mousePosition.x);
        springY.set(mousePosition.y);
    }, [mousePosition, springX, springY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block mix-blend-screen">
            <motion.div
                className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    x: springX,
                    y: springY,
                }}
            />
            <motion.div
                className="absolute w-[200px] h-[200px] bg-blue-400/20 rounded-full blur-[40px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
            />
        </div>
    );
}
