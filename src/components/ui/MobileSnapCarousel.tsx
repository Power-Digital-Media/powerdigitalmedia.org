"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileSnapCarouselProps {
  children: React.ReactNode;
  itemCount: number;
  ariaLabel: string;
  desktopGridClass: string;
  breakpoint?: "md" | "lg";
  contained?: boolean;
  compactCards?: boolean;
  itemLabel?: string;
  resetKey?: string;
  activeIndexOverride?: number | null;
  onSwipeIndexChange?: (index: number) => void;
}

export default function MobileSnapCarousel({
  children,
  itemCount,
  ariaLabel,
  desktopGridClass,
  breakpoint = "md",
  contained = false,
  compactCards = false,
  itemLabel = "cards",
  resetKey,
  activeIndexOverride,
  onSwipeIndexChange,
}: MobileSnapCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [resetKey]);

  useEffect(() => {
    if (
      typeof activeIndexOverride === "number" &&
      activeIndexOverride >= 0 &&
      activeIndexOverride < itemCount &&
      trackRef.current &&
      trackRef.current.children.length > activeIndexOverride
    ) {
      const targetEl = trackRef.current.children[activeIndexOverride] as HTMLElement;
      if (targetEl) {
        trackRef.current.scrollTo({
          left: Math.max(0, targetEl.offsetLeft - 8),
          behavior: "smooth",
        });
        setActiveIndex(activeIndexOverride);
      }
    }
  }, [activeIndexOverride, itemCount]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const firstChild = el.children[0] as HTMLElement;
    const step = firstChild.offsetWidth + 14;
    if (step <= 0) return;
    const idx = Math.min(
      itemCount - 1,
      Math.max(0, Math.round(el.scrollLeft / step))
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      onSwipeIndexChange?.(idx);
    }
  };

  const scrollByStep = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const firstChild = el.children[0] as HTMLElement;
    const step = firstChild.offsetWidth + 14;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const snapClass =
    breakpoint === "lg" ? "pdm-snap-track-lg" : "pdm-snap-track-md";
  const hideNavClass = breakpoint === "lg" ? "lg:hidden" : "md:hidden";

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        aria-label={ariaLabel}
        className={`${desktopGridClass} ${snapClass} ${
          contained ? "pdm-snap-contained" : ""
        } ${compactCards ? "pdm-snap-compact" : ""}`}
      >
        {children}
      </div>

      {itemCount > 1 && (
        <div
          className={`${hideNavClass} mt-2.5 flex items-center justify-between gap-3 px-0.5`}
        >
          <span className="text-[11px] font-mono text-slate-400">
            Swipe {itemLabel} •{" "}
            <strong className="text-amber-400 font-bold">
              {Math.min(activeIndex + 1, itemCount)}
            </strong>{" "}
            of <strong className="text-white font-bold">{itemCount}</strong>
          </span>

          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              aria-label={`Previous ${itemLabel}`}
              disabled={activeIndex <= 0}
              onClick={() => scrollByStep(-1)}
              className="w-8 h-8 rounded-full border border-white/15 bg-[#0b0f1b] text-white flex items-center justify-center hover:border-amber-400/60 hover:text-amber-300 disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label={`Next ${itemLabel}`}
              disabled={activeIndex >= itemCount - 1}
              onClick={() => scrollByStep(1)}
              className="w-8 h-8 rounded-full border border-white/15 bg-[#0b0f1b] text-white flex items-center justify-center hover:border-amber-400/60 hover:text-amber-300 disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
