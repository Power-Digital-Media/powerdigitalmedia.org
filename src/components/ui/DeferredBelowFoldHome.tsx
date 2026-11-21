"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const JobsitePipelineStory = dynamic(
  () => import("@/components/sections/JobsitePipelineStory"),
  { ssr: false }
);
const GoogleReviewsSection = dynamic(
  () => import("@/components/sections/GoogleReviewsSection"),
  { ssr: false }
);
const ConnectedArchitecture = dynamic(
  () => import("@/components/sections/ConnectedArchitecture"),
  { ssr: false }
);
const GrowthScopeEstimator = dynamic(
  () => import("@/components/sections/GrowthScopeEstimator"),
  { ssr: false }
);
const SpeedComparisonCard = dynamic(
  () => import("@/components/ui/SpeedComparisonCard"),
  { ssr: false }
);

export default function DeferredBelowFoldHome() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || shouldRender) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          obs.disconnect();
        }
      },
      { rootMargin: "550px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldRender]);

  if (!shouldRender) {
    return (
      <div
        ref={sentinelRef}
        style={{ minHeight: "360px" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <JobsitePipelineStory />
      <GoogleReviewsSection />
      <ConnectedArchitecture />
      <GrowthScopeEstimator />
      <SpeedComparisonCard />
    </>
  );
}
