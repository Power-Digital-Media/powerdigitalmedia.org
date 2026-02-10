"use client";

import { motion } from "@/components/providers/MotionProvider";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: any) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className="relative px-6 py-3 rounded-full overflow-hidden transition-all group"
                >
                    {/* Background State */}
                    <div className={`absolute inset-0 transition-colors duration-300 ${activeCategory === category ? 'bg-accent opacity-100' : 'bg-white/5 opacity-100 group-hover:bg-white/10'}`} />

                    {/* Text */}
                    <span className={`relative z-10 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${activeCategory === category ? 'text-slate-950' : 'text-white/60 group-hover:text-white'}`}>
                        {category}
                    </span>

                    {/* Active Indicator Glow */}
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-white/20 blur-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
