"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Circle, Clock, MoreVertical, LayoutGrid, List, Loader2, FolderOpen } from "lucide-react";
import { useState } from "react";

export default function ProjectsPage() {
    const { projects, profileLoading } = useAuth();
    const [view, setView] = useState<"grid" | "list">("grid");

    if (profileLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Loading Project Data...</p>
                </div>
            </div>
        );
    }

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

            {/* Project Cards — Live Data */}
            {projects.length > 0 ? (
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
                                {project.milestones && project.milestones.length > 0 && (
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
                                )}
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest italic">
                                    Updated: {new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                                <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-colors">
                                    Open Asset Vault
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-16 rounded-[3rem] glass-card border-white/5 bg-white/[0.01] text-center"
                >
                    <FolderOpen className="w-12 h-12 text-white/10 mx-auto mb-6" />
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">No Active Protocols</h2>
                    <p className="text-xs text-white/20 font-bold uppercase tracking-widest max-w-md mx-auto">
                        Your project engagements will appear here once initiated. Contact your account strategist to begin a new architecture.
                    </p>
                </motion.div>
            )}
        </div>
    );
}
