"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Book, Share2, Search } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";

export default function BlogPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-6 flex items-center justify-center gap-2">
                            <BookOpen className="w-4 h-4" /> Your Go-To Resource
                        </h1>
                        <h2 className="text-5xl font-bold tracking-tight md:text-7xl mb-8 leading-[1.1]">
                            Explore Our Dynamic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 text-glow">
                                Collection of Insights.
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-balance">
                            Discover a wealth of information designed to inspire and inform. Join us on this journey and transform your understanding of digital content.
                        </p>
                        <div className="relative max-w-lg mx-auto mb-16">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full px-6 py-4 rounded-full glass-card border-white/10 focus:border-accent/50 outline-none transition-all pr-12"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 relative z-10">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-12 lg:grid-cols-3">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <Link href={`/blog/${post.slug}`} className="block">
                                    <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                                        <div className="aspect-video relative overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-xs font-bold text-accent border border-white/5">
                                                {post.category}
                                            </div>
                                        </div>

                                        <div className="p-8">
                                            <div className="flex items-center gap-2 mb-4 text-xs font-medium text-muted-foreground">
                                                <Calendar className="w-3.5 h-3.5" /> {post.date}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-glow transition-all">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest group/btn">
                                                Read Story <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-24 bg-accent/5 border-t border-white/5">
                <div className="container px-4 mx-auto text-center">
                    <Share2 className="w-12 h-12 text-accent mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">Stay Ahead of the Curve.</h3>
                    <p className="text-muted-foreground mb-8">Join our newsletter for the latest insights in studio tech and digital strategy.</p>
                    <form
                        action="https://formspree.io/f/mdazlovb"
                        method="POST"
                        className="max-w-md mx-auto flex gap-4"
                    >
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="email@example.com"
                            className="flex-1 px-6 py-4 rounded-2xl glass-card border-white/10 outline-none focus:border-accent/40"
                        />
                        <button className="px-8 py-4 font-bold text-white bg-accent rounded-2xl border-glow hover:bg-accent/90">
                            Join
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
