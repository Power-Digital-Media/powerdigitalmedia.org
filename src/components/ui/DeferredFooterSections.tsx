"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";

const LeadArchitect = dynamic(() => import("@/components/sections/LeadArchitect"), { ssr: false });
const AuditCTA = dynamic(() => import("@/components/sections/AuditCTA"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

export default function DeferredFooterSections() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldLoadForms, setShouldLoadForms] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || shouldLoadForms) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadForms(true);
          obs.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldLoadForms]);

  return (
    <>
      {shouldLoadForms ? (
        <>
          <LeadArchitect />
          <AuditCTA />
          <Contact />
        </>
      ) : (
        <div ref={sentinelRef} style={{ minHeight: "240px" }} aria-hidden="true" />
      )}
      <Footer />
    </>
  );
}
