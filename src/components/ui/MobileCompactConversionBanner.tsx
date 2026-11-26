import Link from "next/link";
import { ArrowRight, Calculator, CalendarCheck, ShieldCheck, Video } from "lucide-react";

interface MobileCompactConversionBannerProps {
  variant?: "audit" | "book";
  eyebrow?: string;
  heading?: string;
}

/**
 * Sleek, mobile-only (< 1024px) contextual next-step card that replaces
 * repeating the 1,780px LeadArchitect + AuditCTA form stack across every inner page.
 * Desktop (>= 1024px) remains 100% untouched.
 */
export default function MobileCompactConversionBanner({
  variant = "audit",
  eyebrow = "Damein Donald • Jackson, MS Studio",
  heading,
}: MobileCompactConversionBannerProps) {
  const resolvedHeading =
    heading ||
    (variant === "book"
      ? "Ready to Lock In Your Custom Gameplan?"
      : "See Why Competitors Outrank You in 5 Minutes.");

  return (
    <section className="lg:hidden py-8 px-4 bg-[#070a13] border-t border-white/10">
      <div className="max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-[#0c111f] via-[#090d18] to-[#06080f] border border-amber-500/35 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.6)] space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            {eyebrow}
          </span>
          <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0">
            5.0★ Verified
          </span>
        </div>

        <h2 className="text-lg font-black uppercase tracking-tight text-white leading-snug">
          {resolvedHeading}
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed">
          {variant === "book"
            ? "Talk directly with founder Damein Donald—zero agency middlemen or long-term lock-ins."
            : "Get a personal 5-minute Google Map Pack & website teardown recorded for your business—free."}
        </p>

        <div className="grid grid-cols-2 gap-2.5 pt-0.5">
          {variant === "book" ? (
            <>
              <Link
                href="/book"
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.28)]"
              >
                <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Book 15-Min Call</span>
              </Link>
              <Link
                href="/free-audit"
                className="py-3 px-3 rounded-xl bg-white/[0.05] border border-white/15 text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Free Rank Video</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/free-audit"
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.28)]"
              >
                <span>Free Rank Video</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
              <Link
                href="/estimate"
                className="py-3 px-3 rounded-xl bg-white/[0.05] border border-white/15 text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Instant Pricing</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
