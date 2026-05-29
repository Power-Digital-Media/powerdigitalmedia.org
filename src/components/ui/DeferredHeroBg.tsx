"use client";

import StaticHeroBg from "./shared/StaticHeroBg";
import dynamic from "next/dynamic";

const AnimatedHeroBg = dynamic(() => import("./shared/AnimatedHeroBg"), { ssr: false });

interface DeferredHeroBgProps {
    variant: "home" | "web-design" | "custom-applications" | "marketing";
}

export default function DeferredHeroBg({ variant }: DeferredHeroBgProps) {
    return (
        <>
            <StaticHeroBg variant={variant} />
            <AnimatedHeroBg variant={variant} />
        </>
    );
}

