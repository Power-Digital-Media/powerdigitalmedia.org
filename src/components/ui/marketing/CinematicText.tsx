"use client";

import { motion, Variants } from "framer-motion";

interface CinematicTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

export default function CinematicText({ text, className = "", delay = 0, stagger = 0.05 }: CinematicTextProps) {
    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: 60,
        },
    };

    return (
        <motion.div
            style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", perspective: "1000px" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={className}
        >
            {words.map((word, index) => (
                <span key={index} style={{ marginRight: "0.25em", display: "inline-block", overflow: "hidden" }}>
                    <motion.span variants={child} style={{ display: "inline-block", transformStyle: "preserve-3d" }}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.div>
    );
}
