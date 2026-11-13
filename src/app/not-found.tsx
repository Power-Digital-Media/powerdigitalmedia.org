import Link from "next/link";
import { Home, Hammer, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";

export default function NotFound() {
  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />

      <section className="relative flex-1 flex flex-col items-center justify-center pt-36 pb-24 px-4 text-center z-10">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-amber-500/[0.07] rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-6">
          404 • Page Not Found
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-4 text-amber-400">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-4 max-w-lg">
          This Page Moved or Doesn&apos;t Exist.
        </h2>

        <p className="text-slate-300 max-w-md text-sm md:text-base leading-relaxed mb-10">
          Let&apos;s get you back to our live contractor growth systems, field apps, or a free 5-minute Google Maps rank check.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(245,158,11,0.3)]"
          >
            <Home className="w-4 h-4" /> Back to Homepage
          </Link>
          <Link
            href="/contractors"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0b0c10] border border-white/15 text-white font-bold uppercase tracking-wider text-xs hover:border-amber-400/50 transition-all flex items-center justify-center gap-2"
          >
            <Hammer className="w-4 h-4 text-amber-400" /> Contractor Growth Systems
          </Link>
          <Link
            href="/free-audit"
            className="w-full sm:w-auto px-7 py-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 font-bold uppercase tracking-wider text-xs hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            Free Rank Check <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <DeferredFooterSections />
    </main>
  );
}
