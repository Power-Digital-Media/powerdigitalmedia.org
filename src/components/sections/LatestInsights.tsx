"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function LatestInsights() {
    // Get the 3 most recent posts
    const recentPosts = blogPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div>
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Market Intelligence</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Intel.</span>
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-accent transition-colors pb-2 border-b border-transparent hover:border-accent"
                    >
                        View All Transmissions
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group relative flex flex-col"
                        >
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-white/10 group-hover:border-accent/40 transition-colors">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <div className="px-3 py-1.5 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white/80">
                                        {post.category}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3 h-3 text-accent" />
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                {post.title}
                            </h3>

                            <p className="text-sm text-foreground/50 line-clamp-2 mb-4 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                Read Protocol <ArrowRight className="w-3 h-3 ml-2" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
