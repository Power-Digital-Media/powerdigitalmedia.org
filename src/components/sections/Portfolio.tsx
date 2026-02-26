"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

const ThreeDCarousel = dynamic(() => import("../ui/ThreeDCarousel"), {
    ssr: false,
    loading: () => <div className="h-[380px] md:h-[480px]" />
});
import BookingModal from "../ui/BookingModal";

import { projects } from "@/data/projects";

export default function Portfolio({ titleAs: Title = "h1" }: { titleAs?: "h1" | "h2" }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section id="portfolio" className="relative flex flex-col items-center justify-center pt-8 pb-4 md:pt-12 md:pb-8 overflow-hidden bg-transparent">

            <div className="container relative z-10 px-4 mx-auto text-center">
                {/* --- The Showpiece --- */}
                <div className="relative z-10 -my-2 md:my-4">
                    <ThreeDCarousel />
                </div>
            </div>

            {/* Global Decorative Lights */}
            {/* Global Decorative Lights - Hidden on mobile for GPU optimization */}
            <div className="hidden md:block absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="hidden md:block absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section>
    );
}
