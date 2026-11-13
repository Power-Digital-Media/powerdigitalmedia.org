"use client";

import { m, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, MapPin, Phone } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";

const SUPPRESSED_ROUTES = new Set([
  "/free-audit",
  "/contact",
  "/book",
  "/login",
  "/lead-leak-check",
  "/founders100",
]);

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname &&
      (SUPPRESSED_ROUTES.has(pathname) ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/dashboard") ||
        pathname.endsWith("/discovery"))
    ) {
      setIsOpen(false);
      return;
    }

    try {
      const hasConverted = localStorage.getItem("audit_converted") === "true";
      const hasDismissed = sessionStorage.getItem("audit_dismissed") === "true";
      if (hasConverted || hasDismissed) return;
    } catch {
      // Storage unavailable
    }

    // Desktop-only exit intent after 15s on page so mobile users aren't interrupted
    let armed = false;
    const armTimer = setTimeout(() => {
      armed = true;
    }, 15000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!armed || window.innerWidth < 1024) return;
      if (e.clientY > 16) return;
      const active = document.activeElement;
      if (active && (Boolean(active.closest("form")) || ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName))) {
        return;
      }
      try {
        if (sessionStorage.getItem("audit_dismissed") === "true" || localStorage.getItem("audit_converted") === "true") {
          return;
        }
      } catch {
        // Ignore storage error
      }
      setIsOpen(true);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathname]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("audit_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource: "website-audit-request",
        formData: data,
      });

      if (ok) {
        setStatus("success");
        try {
          localStorage.setItem("audit_converted", "true");
        } catch {
          // Ignore
        }
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Popup lead capture error:", err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-[90] w-full max-w-[410px]">
          <m.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative overflow-hidden rounded-3xl border border-amber-500/35 p-7 bg-[#0b0c10]/95 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 blur-[45px] pointer-events-none" />

            <button
              onClick={handleDismiss}
              disabled={status === "submitting"}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            {status === "success" ? (
              <m.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-4 space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-white">
                  Breakdown Queued!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Damein will personally record your 5-minute Google Maps &amp; website review and send it over within 1 business day.
                </p>
                <button
                  onClick={handleDismiss}
                  className="mt-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </m.div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  Free 5-Minute Local Rank Check
                </div>

                <div className="space-y-1.5 pr-4">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
                    Want to See Why Competitors Outrank You?
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Drop your business name or website and Damein will send a custom <strong className="text-amber-300">5-minute screen-share video</strong> showing how to pull more calls in your city.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <FormSecurityFields />
                  <input
                    type="text"
                    name="website_url"
                    required
                    disabled={status === "submitting"}
                    placeholder="Business Name or Website (e.g. Ace Roofing, Brandon MS)"
                    className="w-full px-3.5 py-3 text-xs bg-[#12141c] border border-white/15 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white"
                  />
                  <input
                    type="text"
                    name="email"
                    required
                    disabled={status === "submitting"}
                    placeholder="Best Email or Cell # to Text Your Video"
                    className="w-full px-3.5 py-3 text-xs bg-[#12141c] border border-white/15 focus:border-amber-400 rounded-xl outline-none transition-all placeholder:text-slate-500 text-white"
                  />

                  {status === "error" && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Couldn&apos;t send—call or text (601) 446-2393 directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.3)] cursor-pointer disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Send My Free 5-Min Video</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-2 border-t border-white/[0.07] flex items-center justify-between text-[11px] text-slate-400">
                  <span>No spam • Recorded in Jackson, MS</span>
                  <a href="tel:6014462393" className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    (601) 446-2393
                  </a>
                </div>
              </div>
            )}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
