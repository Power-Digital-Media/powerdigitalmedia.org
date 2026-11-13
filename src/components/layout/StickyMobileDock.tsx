"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, Zap } from "lucide-react";

const HIDDEN_PREFIXES = ["/admin", "/dashboard", "/login", "/logout"];

export default function StickyMobileDock() {
  const pathname = usePathname() || "/";
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
        setInputFocused(true);
      }
    };
    const onFocusOut = () => {
      setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active) {
          setInputFocused(false);
          return;
        }
        const tag = active.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT" && !active.isContentEditable) {
          setInputFocused(false);
        }
      }, 80);
    };

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[90] lg:hidden pointer-events-none px-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))] transition-all duration-300 ${
        inputFocused ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
      aria-label="Quick contact actions"
    >
      <div className="pointer-events-auto mx-auto max-w-md rounded-2xl border border-amber-500/25 bg-[#070a12]/95 p-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.75),0_0_24px_rgba(245,158,11,0.12)] backdrop-blur-xl">
        <div className="grid grid-cols-12 gap-1.5 items-center">
          <a
            href="tel:6014462393"
            className="col-span-4 flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 py-3 text-[11px] font-extrabold uppercase tracking-wider text-white active:scale-95 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Call</span>
          </a>
          <a
            href="sms:6014462393?body=Hey%20Damein%2C%20can%20you%20take%20a%20quick%20look%20at%20my%20website%20and%20Google%20ranking%3F"
            className="col-span-3 flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 py-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-200 active:scale-95 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Text</span>
          </a>
          <Link
            href="/free-audit"
            prefetch={false}
            className="col-span-5 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-[11px] font-black uppercase tracking-wider text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.3)] active:scale-95 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950 shrink-0" />
            <span>Free Check</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
