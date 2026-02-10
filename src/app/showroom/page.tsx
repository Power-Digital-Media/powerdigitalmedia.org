"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GEAR_COLLECTION } from "@/data/gear";
import GearCard from "@/components/ui/showroom/GearCard";
import CategoryFilter from "@/components/ui/showroom/CategoryFilter";
import { motion, AnimatePresence } from "@/components/providers/MotionProvider";
import { ShoppingBag, ChevronRight } from "lucide-react";

export default function ShowroomPage() {
    const categories = ["All", "Audio", "PC", "Visual", "Monitors", "Chassis", "Computing", "Storage", "Power", "Cooling", "Lighting", "Build Kits", "Essentials"];
    const levels = ["All", "Elite", "Pro", "Entry"];
    const useCases = ["All", "Streaming", "Editing", "Podcasting", "Gaming"];

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSubCategory, setActiveSubCategory] = useState("All");
    const [activeLevel, setActiveLevel] = useState("All");
    const [activeUseCase, setActiveUseCase] = useState("All");

    // Get unique subcategories for the active category
    const availableSubCategories = ["All", ...Array.from(new Set(
        GEAR_COLLECTION
            .filter(item => activeCategory === "All" || item.category === activeCategory)
            .map(item => item.subCategory)
            .filter((sub): sub is string => !!sub)
    ))];


    const filteredGear = GEAR_COLLECTION.filter(item => {
        const categoryMatch = activeCategory === "All" || item.category === activeCategory;
        const subCategoryMatch = activeSubCategory === "All" || item.subCategory === activeSubCategory;
        const levelMatch = activeLevel === "All" || item.level === activeLevel;
        const useCaseMatch = activeUseCase === "All" || item.useCase === activeUseCase;
        return categoryMatch && subCategoryMatch && levelMatch && useCaseMatch;
    });


    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container px-6 mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8"
                        >
                            <ShoppingBag className="w-3 h-3" /> The Elite Showroom
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8"
                        >
                            Engineered <br />
                            <span className="text-white/40 italic">Gear Gallery.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-foreground/60 font-light max-w-2xl leading-relaxed"
                        >
                            Secure the exact hardware we use to engineer high-velocity content. Curated for professionals who demand technical excellence.
                        </motion.p>
                    </div>
                </div>

                {/* Atmospheric Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute -bottom-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* Showroom Interface */}
            <section className="pb-32 relative">
                <div className="container px-6 mx-auto">
                    {/* Primary Filters */}
                    <div className="mb-12">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-4 block text-center">Category Protocol</span>
                        <CategoryFilter
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategoryChange={(cat) => {
                                setActiveCategory(cat);
                                setActiveSubCategory("All"); // Reset subcategory on main category change
                            }}
                        />
                    </div>

                    {/* Sub-Category Protocol */}
                    <AnimatePresence>
                        {activeCategory !== "All" && availableSubCategories.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-12 overflow-hidden"
                            >
                                <div className="flex flex-wrap justify-center gap-2">
                                    {availableSubCategories.map(sub => (
                                        <button
                                            key={sub}
                                            onClick={() => setActiveSubCategory(sub)}
                                            className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all border ${activeSubCategory === sub
                                                ? 'bg-accent border-accent text-slate-950'
                                                : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Secondary Filters Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="glass-card p-6 rounded-3xl border-white/5 bg-white/5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-4 block">Shop by Purpose</span>
                            <div className="flex flex-wrap gap-2">
                                {useCases.map(uc => (
                                    <button
                                        key={uc}
                                        onClick={() => setActiveUseCase(uc)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeUseCase === uc ? 'bg-white text-slate-950' : 'bg-white/5 text-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        {uc}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card p-6 rounded-3xl border-white/5 bg-white/5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4 block">Shop by Protocol Level</span>
                            <div className="flex flex-wrap gap-2">
                                {levels.map(lvl => (
                                    <button
                                        key={lvl}
                                        onClick={() => setActiveLevel(lvl)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeLevel === lvl ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Result Grid */}
                    <div className="mb-6 flex justify-center">
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium border border-white/5 px-4 py-2 rounded-full">
                            As an Amazon Associate I earn from qualifying purchases.
                        </p>
                    </div>
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredGear.map((item) => (
                                <GearCard key={item.id} item={item} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredGear.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center rounded-[3rem] border border-dashed border-white/10"
                        >
                            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
                                No hardware detected in this protocol.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

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
