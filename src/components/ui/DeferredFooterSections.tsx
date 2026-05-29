"use client";

import dynamic from "next/dynamic";

const LatestInsights = dynamic(() => import("@/components/sections/LatestInsights"), { ssr: false });
const LeadArchitect = dynamic(() => import("@/components/sections/LeadArchitect"), { ssr: false });
const AuditCTA = dynamic(() => import("@/components/sections/AuditCTA"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function DeferredFooterSections() {
  return (
    <>
      <LatestInsights />
      <LeadArchitect />
      <AuditCTA />
      <Contact />
      <Footer />
    </>
  );
}
