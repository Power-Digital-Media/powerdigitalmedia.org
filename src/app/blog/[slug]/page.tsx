"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function BlogPostDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <main className="relative min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link href="/blog" className="text-accent flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <Navbar />

            {/* BlogPosting Schema.org (GEO Optimization) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.excerpt,
                        "image": post.image,
                        "datePublished": new Date(post.date).toISOString(),
                        "author": {
                            "@type": "Person",
                            "name": post.author.name,
                            "jobTitle": post.author.role
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Power Digital Media",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://powerdigitalmedia.org/images/logo.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://powerdigitalmedia.org/blog/${post.slug}`
                        }
                    })
                }}
            />

            <article className="pt-32 pb-24 overflow-hidden">
                {/* Post Header */}
                <section className="container px-4 mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Insights
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-1.5 rounded-full bg-accent/10 text-xs font-bold text-accent border border-accent/20">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5" /> {post.date}
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight md:text-7xl mb-12 leading-[1.1]">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between border-y border-white/5 py-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                                    <User className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{post.author.name}</p>
                                    <p className="text-sm text-muted-foreground tracking-wide font-medium">{post.author.role}</p>
                                </div>
                            </div>
                            <button className="p-4 rounded-full glass-card border-white/5 hover:border-accent/40 text-muted-foreground hover:text-accent transition-all group">
                                <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* Hero Image */}
                <section className="container px-4 mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover opacity-90"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </motion.div>
                </section>

                {/* Content Body */}
                <section className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-invert prose-blue max-w-none">
                            <ReactMarkdown
                                components={{
                                    h2: ({ ...props }) => <h2 className="text-4xl font-bold mt-20 mb-8 tracking-tight" {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-2xl font-bold mt-12 mb-6 tracking-tight" {...props} />,
                                    p: ({ ...props }) => <p className="text-xl text-foreground/80 leading-[1.8] mb-10" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc pl-8 mb-10 space-y-4 text-xl text-foreground/70" {...props} />,
                                    li: ({ ...props }) => <li className="pl-2" {...props} />,
                                    em: ({ ...props }) => <em className="text-accent italic font-medium" {...props} />,
                                    blockquote: ({ ...props }) => (
                                        <blockquote className="border-l-4 border-accent bg-accent/5 p-8 my-12 rounded-2xl italic text-2xl" {...props} />
                                    ),
                                    a: ({ ...props }) => (
                                        <Link
                                            href={props.href || "#"}
                                            target={props.href?.startsWith("http") ? "_blank" : undefined}
                                            rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="text-accent hover:text-white underline decoration-accent/30 hover:decoration-white transition-all underline-offset-4 font-bold"
                                            {...props}
                                        />
                                    ),
                                    img: ({ ...props }) => (
                                        <div className="my-16 relative">
                                            <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-[3rem] -z-10" />
                                            <img
                                                className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl hover:border-accent/30 transition-all duration-500"
                                                {...props}
                                            />
                                            {props.alt && (
                                                <p className="text-center text-sm text-muted-foreground mt-4 font-medium tracking-wide">
                                                    {props.alt}
                                                </p>
                                            )}
                                        </div>
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        <div className="mt-40 pt-24 border-t border-white/5 text-center">
                            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Ready to grow?</span>
                            <h4 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight">Begin Your Digital Legacy.</h4>
                            <p className="text-xl md:text-2xl text-foreground/70 mb-16 max-w-2xl mx-auto leading-relaxed">Our team is ready to help you implement these strategies and build a brand that lasts.</p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 px-14 py-6 bg-accent text-white font-bold rounded-full border-glow hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 text-lg"
                            >
                                Schedule A Free Consultation
                            </Link>
                        </div>
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
}
