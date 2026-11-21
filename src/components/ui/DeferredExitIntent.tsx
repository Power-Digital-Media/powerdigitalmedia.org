"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup"), {
  ssr: false,
});

export default function DeferredExitIntent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const timer = window.setTimeout(() => {
      setMounted(true);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return <ExitIntentPopup />;
}
