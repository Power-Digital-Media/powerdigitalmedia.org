"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import MobileCompactConversionBanner from "@/components/ui/MobileCompactConversionBanner";

const LeadArchitect = dynamic(() => import("@/components/sections/LeadArchitect"), { ssr: false });
const AuditCTA = dynamic(() => import("@/components/sections/AuditCTA"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

interface DeferredFooterSectionsProps {
  /**
   * "full" (default on Homepage): Mobile shows LeadArchitect + AuditCTA; Desktop shows LeadArchitect + AuditCTA + Contact.
   * "inner" (Service/App/City pages): Mobile shows a crisp 1-card conversion strip instead of repeating 1,780px of forms; Desktop unchanged.
   * "tool" (/estimate & /scanner): Mobile shows a 1-card booking strip; Desktop shows LeadArchitect without stacking a duplicate form.
   */
  mode?: "full" | "inner" | "tool";
}

export default function DeferredFooterSections({ mode = "full" }: DeferredFooterSectionsProps) {
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
      {mode === "inner" && <MobileCompactConversionBanner variant="audit" />}
      {mode === "tool" && <MobileCompactConversionBanner variant="book" />}

      {shouldLoadForms ? (
        mode === "full" ? (
          <>
            <LeadArchitect />
            <AuditCTA />
            {/* Desktop keeps both AuditCTA and Contact; Mobile uses the unified AuditCTA + Direct Dock */}
            <div className="hidden lg:block">
              <Contact />
            </div>
          </>
        ) : mode === "inner" ? (
          <div className="hidden lg:block">
            <LeadArchitect />
            <AuditCTA />
          </div>
        ) : (
          <div className="hidden lg:block">
            <LeadArchitect />
          </div>
        )
      ) : (
        <div
          ref={sentinelRef}
          className={mode === "full" ? "" : "hidden lg:block"}
          style={{ minHeight: "240px" }}
          aria-hidden="true"
        />
      )}
      <Footer />
    </>
  );
}
