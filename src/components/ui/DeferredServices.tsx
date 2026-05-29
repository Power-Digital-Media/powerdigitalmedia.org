"use client";

import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/components/sections/Services"), { ssr: false });

export default function DeferredServices() {
  return <Services />;
}
