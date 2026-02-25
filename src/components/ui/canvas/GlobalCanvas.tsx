"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Scene from "./Scene";
import { Suspense } from "react";

export default function GlobalCanvas() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-transparent">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]} // Support high-DPI displays
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            >
                <Suspense fallback={null}>
                    <Scene />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
