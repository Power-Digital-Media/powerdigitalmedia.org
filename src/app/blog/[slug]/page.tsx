import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import { GEAR_COLLECTION } from "@/data/gear";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/blog/ShareButtons";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import PodcastPlayer from "@/components/blog/PodcastPlayer";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Post Not Found | Power Digital Media",
        };
    }

    const title = post.seoTitle || `${post.title} | Power Digital Media`;
    const description = post.metaDescription || post.excerpt;

    return {
        title: title,
        description: description,
        keywords: post.keywords?.join(", "),
        openGraph: {
            title: title,
            description: description,
            type: "article",
            url: `https://powerdigitalmedia.org/blog/${post.slug}`,
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: new Date(post.date).toISOString(),
            authors: [post.author.name],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [post.image],
        },
    };
}

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
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

    const breadcrumbItems = [
        { name: "Blog", path: "/blog" },
        { name: post.category, path: `/blog?category=${post.category.toLowerCase()}` },
        { name: post.title, path: `/blog/${post.slug}` }
    ];

    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(),
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
                "url": "https://powerdigitalmedia.org/power-logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://powerdigitalmedia.org/blog/${post.slug}`
        }
    };

    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <BreadcrumbSchema items={breadcrumbItems} />
            <Navbar />

            {/* Structured Data (GEO & SEO Optimization) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(post.structuredData || defaultSchema)
                }}
            />

            <article className="pt-32 pb-24 overflow-hidden">
                {/* Post Header */}
                <section className="container px-4 mx-auto mb-16">
                    <div className="max-w-4xl mx-auto">
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

                        <h1 className="text-3xl font-bold tracking-tight md:text-5xl mb-12 leading-[1.2]">
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
                        </div>

                        {/* Social Share Buttons */}
                        <ShareButtons title={post.title} slug={post.slug} category={post.category} />





                    </div>
                </section>

                {/* Hero Image Section */}
                <section className="container px-4 mx-auto mb-24 lg:px-8">
                    <div className="relative w-full max-w-5xl mx-auto rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-white/10 bg-white/5">
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </section>

                {/* Content Body */}
                <section className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        {/* AI Podcast Player */}
                        {post.audioUrl && (
                            <div className="mb-12">
                                <PodcastPlayer audioUrl={post.audioUrl} title={post.title} />
                            </div>
                        )}

                        <div className="prose prose-invert prose-blue max-w-none">
                            <ReactMarkdown
                                components={{
                                    h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-20 mb-8 tracking-tight" {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-2xl font-bold mt-12 mb-6 tracking-tight" {...props} />,
                                    p: ({ ...props }) => <p className="text-xl text-foreground/80 leading-[1.8] mb-10" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc pl-8 mb-10 space-y-4 text-xl text-foreground/70" {...props} />,
                                    li: ({ ...props }) => <li className="pl-2" {...props} />,
                                    em: ({ ...props }) => <em className="text-accent italic font-medium" {...props} />,
                                    blockquote: ({ ...props }) => (
                                        <blockquote className="border-l-4 border-accent bg-accent/5 p-8 my-12 rounded-2xl italic text-2xl" {...props} />
                                    ),
                                    a: ({ ...props }) => (
                                        <a
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
                                    table: ({ ...props }) => (
                                        <div className="overflow-x-auto my-12 rounded-xl border border-white/10 bg-white/5 shadow-2xl">
                                            <table className="w-full text-left border-collapse" {...props} />
                                        </div>
                                    ),
                                    thead: ({ ...props }) => (
                                        <thead className="bg-white/10 text-accent font-bold uppercase tracking-wider text-xs border-b border-white/10" {...props} />
                                    ),
                                    tbody: ({ ...props }) => (
                                        <tbody className="text-sm font-medium text-foreground/80 divide-y divide-white/5" {...props} />
                                    ),
                                    tr: ({ ...props }) => (
                                        <tr className="hover:bg-white/5 transition-colors duration-200" {...props} />
                                    ),
                                    th: ({ ...props }) => (
                                        <th className="px-6 py-4 border-r border-white/5 last:border-r-0" {...props} />
                                    ),
                                    td: ({ ...props }) => (
                                        <td className="px-6 py-4 border-r border-white/5 last:border-r-0 font-mono text-xs tracking-tight" {...props} />
                                    ),
                                }}
                                remarkPlugins={[remarkGfm]}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </section>

                {/* Related Equipment Protocol — Before CTA */}
                {post.relatedGearIds && post.relatedGearIds.length > 0 && (
                    <section className="container px-4 mx-auto mt-24 pt-20 border-t border-white/5">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-accent/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Discovery Protocol</h3>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white">Related Equipment</h2>
                                </div>
                                <Link
                                    href="/showroom"
                                    className="group flex items-center gap-3 text-white/50 hover:text-accent font-bold uppercase tracking-widest text-[10px] transition-colors"
                                >
                                    Expansion Protocol
                                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {post.relatedGearIds.map((id) => {
                                    const item = GEAR_COLLECTION.find(g => g.id === id);
                                    if (!item) return null;
                                    return (
                                        <a
                                            key={item.id}
                                            href={`/showroom/${item.category.toLowerCase()}/${item.id}`}
                                            className="group relative flex flex-col p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/40 transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 block"
                                        >
                                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/5">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <div className={`px-2 py-1 rounded-md border text-[8px] font-black uppercase tracking-widest ${item.level === 'Elite' ? 'bg-white/10 border-white/20' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'}`}>
                                                        {item.level}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-[9px] font-bold text-accent uppercase tracking-widest mb-1">{item.brand}</div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors leading-tight line-clamp-2">
                                                {item.name}
                                            </h4>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="mt-40 pt-24 border-t border-white/5 text-center">
                            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Ready to grow?</span>
                            <h4 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">Begin Your Digital Legacy.</h4>
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
