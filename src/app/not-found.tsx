import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";

export default function NotFound() {
    return (
        <main className="relative flex flex-col min-h-screen bg-[#020617] text-white">
            <Navbar />

            <section className="relative flex-1 flex flex-col items-center justify-center pt-40 pb-24 px-4 text-center">
                {/* Ambient glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                    HTTP 404 • Resource Not Found
                </div>

                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-4">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold uppercase text-slate-200 mb-6 max-w-lg">
                    This Page Has Moved Or Does Not Exist
                </h2>

                <p className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed mb-10">
                    The requested URL could not be found on Power Digital Media. Browse our verified service solutions or head back to the homepage.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/"
                        className="px-8 py-4 rounded-full bg-cyan-400 text-slate-950 font-black uppercase tracking-wider text-xs hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                    >
                        <Home className="w-4 h-4" /> Back to Homepage
                    </Link>
                    <Link
                        href="/blog"
                        className="px-8 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <Search className="w-4 h-4" /> Explore Insights
                    </Link>
                </div>
            </section>

            <DeferredFooterSections />
        </main>
    );
}
