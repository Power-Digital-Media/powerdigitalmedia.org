import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GEAR_COLLECTION } from "@/data/gear";
import { ShoppingBag, ChevronRight } from "lucide-react";
import ShowroomClient from "@/components/ui/showroom/ShowroomClient";

export default function ShowroomPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container px-6 mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                            <ShoppingBag className="w-3 h-3" /> The Elite Showroom
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                            Engineered <br />
                            <span className="text-white/40 italic">Gear Gallery.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 font-light max-w-2xl leading-relaxed">
                            Secure the exact hardware we use to engineer high-velocity content. Curated for professionals who demand technical excellence.
                        </p>
                    </div>
                </div>

                {/* Atmospheric Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute -bottom-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* Showroom Interface - Client Component */}
            <ShowroomClient initialGear={GEAR_COLLECTION} />

            {/* Breadcrumb Context (Subtle) */}
            <div className="container px-6 mx-auto pb-12">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/20">
                    <span>Power Digital</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white/40">Ecosystem</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-accent">Elite Showroom</span>
                </div>
            </div>

            <Footer />
        </main>
    );
}
