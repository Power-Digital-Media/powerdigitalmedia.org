"use client";

import { useState } from "react";
import { GEAR_COLLECTION } from "@/data/gear";
import type { GearItem } from "@/data/gear";
import GearCard from "@/components/ui/showroom/GearCard";
import CategoryFilter from "@/components/ui/showroom/CategoryFilter";
import { m, AnimatePresence } from "framer-motion";

interface ShowroomClientProps {
    initialGear: GearItem[];
}

export default function ShowroomClient({ initialGear }: ShowroomClientProps) {
    const categories = ["All", "Audio", "PC", "Visual", "Monitors", "Chassis", "Computing", "Storage", "Power", "Cooling", "Lighting", "Build Kits", "Essentials"];
    const levels = ["All", "Elite", "Pro", "Entry"];
    const useCases = ["All", "Streaming", "Editing", "Podcasting", "Gaming"];

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSubCategory, setActiveSubCategory] = useState("All");
    const [activeLevel, setActiveLevel] = useState("All");
    const [activeUseCase, setActiveUseCase] = useState("All");

    // Get unique subcategories for the active category
    const availableSubCategories = ["All", ...Array.from(new Set(
        initialGear
            .filter(item => activeCategory === "All" || item.category === activeCategory)
            .map(item => item.subCategory)
            .filter((sub): sub is string => !!sub)
    ))];


    const filteredGear = initialGear.filter(item => {
        const categoryMatch = activeCategory === "All" || item.category === activeCategory;
        const subCategoryMatch = activeSubCategory === "All" || item.subCategory === activeSubCategory;
        const levelMatch = activeLevel === "All" || item.level === activeLevel;
        const useCaseMatch = activeUseCase === "All" || item.useCase === activeUseCase;
        return categoryMatch && subCategoryMatch && levelMatch && useCaseMatch;
    });

    return (
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
                        <m.div
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
                        </m.div>
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
                <m.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredGear.map((item) => (
                            <GearCard key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </m.div>

                {/* Empty State */}
                {filteredGear.length === 0 && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-32 text-center rounded-[3rem] border border-dashed border-white/10"
                    >
                        <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">
                            No hardware detected in this protocol.
                        </p>
                    </m.div>
                )}
            </div>
        </section>
    );
}
