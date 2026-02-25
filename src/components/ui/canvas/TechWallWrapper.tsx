"use client";

import dynamic from "next/dynamic";

const TechWallCanvas = dynamic(() => import("./TechWallCanvas"), { ssr: false });

export default function TechWallWrapper() {
    return (
        <div className="fixed inset-0 pointer-events-none w-full h-full" style={{ zIndex: -10 }}>
            <TechWallCanvas />
        </div>
    );
}
