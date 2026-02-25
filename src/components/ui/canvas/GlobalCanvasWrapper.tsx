"use client";

import dynamic from "next/dynamic";

// Dynamically import the actual Three.js Canvas component with ssr: false
// We have to do it in a "use client" wrapper component so layout.tsx (a Server Component)
// doesn't complain about ssr: false.
const CanvasComponent = dynamic(() => import("./GlobalCanvas"), { ssr: false });

export default function GlobalCanvasWrapper() {
    return <CanvasComponent />;
}
