"use client";

import { useEffect, useRef } from "react";

interface LiquidWakeProps {
    backgroundImage?: string;
}

/**
 * LiquidWake: An autonomous particle drifts slowly across a black canvas,
 * erasing it as it goes to reveal the spatial background beneath.
 * The trail fades out slowly — like a waterbug's wake on still water.
 *
 * No mouse interaction. No canvas compositing conflicts. Pure elegance.
 */
export default function LiquidWake({
    backgroundImage = "/images/Spatial_background_ (1).png"
}: LiquidWakeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // ── Sizing ─────────────────────────────────────────────────────
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Fill with solid black to start
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "#02020a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        // ── Autonomous Particle (waterbug) ────────────────────────────
        let px = canvas.width * 0.5;
        let py = canvas.height * 0.5;

        // Two independent sine oscillators for organic, non-repeating motion
        let t = 0;
        const FREQ_X_1 = 0.00045;
        const FREQ_X_2 = 0.00029;
        const FREQ_Y_1 = 0.00037;
        const FREQ_Y_2 = 0.00053;
        const AMP = () => Math.min(canvas.width, canvas.height) * 0.35;

        // Small velocity for smooth drift
        const SPEED = 1.0; // px/frame — slow and deliberate

        let vx = 0.8;
        let vy = 0.5;

        // ── Render Loop ────────────────────────────────────────────────
        let rafId: number;

        const render = () => {
            const W = canvas.width;
            const H = canvas.height;

            // Step 1: Slowly repaint black, letting the wake fade
            // Very low opacity = long trail; higher = short trail
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(2, 2, 10, 0.018)";
            ctx.fillRect(0, 0, W, H);

            // Step 2: Update particle position using Lissajous-style smooth noise
            t += 1;
            const targetX = W * 0.5 + Math.sin(t * FREQ_X_1 + 1.3) * AMP() * Math.cos(t * FREQ_X_2);
            const targetY = H * 0.5 + Math.sin(t * FREQ_Y_1 + 0.7) * AMP() * Math.sin(t * FREQ_Y_2 + 2.1);

            // Lerp towards target — gives it a fluid, organic feel
            px += (targetX - px) * 0.012;
            py += (targetY - py) * 0.012;

            // Step 3: Erase a very small, soft area to reveal the background
            ctx.globalCompositeOperation = "destination-out";

            // Tiny core erase — the "body" of the waterbug
            const coreGrad = ctx.createRadialGradient(px, py, 0, px, py, 55);
            coreGrad.addColorStop(0, "rgba(0,0,0,0.85)");   // strong reveal at center
            coreGrad.addColorStop(0.35, "rgba(0,0,0,0.5)"); // soft middle
            coreGrad.addColorStop(0.65, "rgba(0,0,0,0.15)");// barely-there edge
            coreGrad.addColorStop(1, "rgba(0,0,0,0)");       // seamless fade-out

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(px, py, 55, 0, Math.PI * 2);
            ctx.fill();

            // A tiny bright center dot — the "body" of the bug
            const dotGrad = ctx.createRadialGradient(px, py, 0, px, py, 12);
            dotGrad.addColorStop(0, "rgba(0,0,0,1)");
            dotGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = dotGrad;
            ctx.beginPath();
            ctx.arc(px, py, 12, 0, Math.PI * 2);
            ctx.fill();

            rafId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafId);
        };
    }, [backgroundImage]);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            {/* Layer 1: Spatial background image — always visible behind the canvas */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Layer 2: Black canvas overlay — erased by the particle to reveal Layer 1 */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            />

            {/* Layer 3: Subtle vignette for depth */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 25vw rgba(0,0,0,0.7)",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
