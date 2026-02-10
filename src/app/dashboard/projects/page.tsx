"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Circle, Clock, MoreVertical, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

const projects = [
    {
        id: "PRJ-921",
        name: "Flagship Website Architecture",
        type: "Web Design",
        status: "Engineering",
        progress: 45,
        milestones: [
            { name: "Initial Consultation", status: "completed" },
            { name: "UI/UX Architecture", status: "completed" },
            { name: "Core Engineering", status: "current" },
            { name: "Asset Integration", status: "pending" },
            { name: "Global Deployment", status: "pending" },
        ],
        updated: "2 hours ago"
    },
    {
        id: "PRJ-842",
        name: "Quarterly Production Cycle",
        type: "Podcasting",
        status: "Acquisition",
        progress: 15,
        milestones: [
            { name: "Set Preparation", status: "completed" },
            { name: "Session 01: Capture", status: "current" },
            { name: "Social Extraction", status: "pending" },
            { name: "Distribution Sync", status: "pending" },
        ],
        updated: "1 day ago"
    }
];

export default function ProjectsPage() {
    const [view, setView] = useState<"grid" | "list">("grid");

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Project <span className="text-accent">Protocols.</span></h1>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-2 italic">Active technical engagements and milestone tracking.</p>
                </div>

                <div className="flex items-center gap-2 p-1 rounded-xl glass-card border-white/5 bg-white/[0.01]">
                    <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-accent text-slate-950" : "text-white/20 hover:text-white"}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-accent text-slate-950" : "text-white/20 hover:text-white"}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Project Cards */}
            <div className={`grid gap-8 ${view === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 rounded-[3rem] glass-card border-white/5 bg-white/[0.01] flex flex-col justify-between group hover:border-accent/20 transition-all"
                    >
                        <div className="space-y-8">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-4 h-4 text-accent" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{project.id} // {project.type}</span>
                                    </div>
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">{project.name}</h2>
                                </div>
                                <button className="p-2 text-white/20 hover:text-white transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                                    <span className="text-accent">{project.status} Phase</span>
                                    <span className="text-white/40">{project.progress}% Complete</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.progress}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-accent"
                                    />
                                </div>
                            </div>

                            {/* Milestones */}
                            <div className="space-y-4 pt-4">
                                {project.milestones.map((milestone) => (
                                    <div key={milestone.name} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-4">
                                            {milestone.status === "completed" ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : milestone.status === "current" ? (
                                                <Clock className="w-4 h-4 text-accent animate-pulse" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-white/10" />
                                            )}
                                            <span className={milestone.status === "pending" ? "text-white/20" : "text-white"}>{milestone.name}</span>
                                        </div>
                                        {milestone.status === "current" && <span className="text-[8px] px-2 py-1 bg-accent/10 text-accent rounded-full border border-accent/20">Active</span>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest italic">Last Synced: {project.updated}</span>
                            <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-colors">
                                Open Asset Vault
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
