import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/blog/ShareButtons";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import PodcastPlayer from "@/components/blog/PodcastPlayer";
import "../../typography.css";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const title = post.seoTitle || `${post.title} | Power Digital Media`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    keywords: post.keywords?.join(", "),
    alternates: {
      canonical: `https://powerdigitalmedia.org/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://powerdigitalmedia.org/blog/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.ogImage || post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.ogImage || post.image],
    },
  };
}

export default async function BlogPostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const baseUrl = "https://powerdigitalmedia.org";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Guides & Insights", url: `${baseUrl}/blog` },
    { name: post.title, url: `${baseUrl}/blog/${post.slug}` },
  ];

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Power Digital Media LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://powerdigitalmedia.org/power-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://powerdigitalmedia.org/blog/${post.slug}`,
    },
  };

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData || defaultSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `https://powerdigitalmedia.org/blog/${post.slug}#webpage`,
            url: `https://powerdigitalmedia.org/blog/${post.slug}`,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "h2"],
            },
          }),
        }}
      />

      <article className="relative z-10 pt-32 pb-24 md:pt-40">
        {/* Post Header */}
        <section className="container px-4 sm:px-6 mx-auto mb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-7 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Guides
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-xs font-mono font-bold text-amber-300 border border-amber-500/30">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> {post.date}
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-8 leading-[1.12] text-white">
              {post.title}
            </h1>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-base text-white">{post.author.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{post.author.role}</p>
                </div>
              </div>
            </div>

            <ShareButtons title={post.title} slug={post.slug} category={post.category} />
          </div>
        </section>

        {/* Hero Image */}
        <section className="container px-4 sm:px-6 mx-auto mb-16 max-w-5xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b0c10]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              unoptimized={post.image.includes("oaidalleapiprodscus")}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080f]/70 via-transparent to-transparent" />
          </div>
        </section>

        {/* Content Body */}
        <section className="container px-4 sm:px-6 mx-auto">
          <div className="max-w-3xl mx-auto">
            {post.audioUrl && (
              <div className="mb-10">
                <PodcastPlayer audioUrl={post.audioUrl} title={post.title} />
              </div>
            )}

            {post.videoUrl && (
              <div className="mb-14">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b0c10]">
                  <iframe
                    src={post.videoUrl}
                    title={`${post.title} — Video Walkthrough`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-xs text-slate-400 mt-3 font-mono">
                  Video Walkthrough — <span className="text-amber-400 font-bold">{post.title}</span>
                </p>
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ ...props }) => (
                    <h2 className="text-2xl sm:text-3xl font-black mt-14 mb-5 tracking-tight text-white" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-xl sm:text-2xl font-bold mt-10 mb-4 tracking-tight text-white" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="text-base sm:text-lg text-slate-200 leading-[1.8] mb-7" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-6 mb-8 space-y-3 text-base sm:text-lg text-slate-300" {...props} />
                  ),
                  li: ({ ...props }) => <li className="pl-1" {...props} />,
                  em: ({ ...props }) => <em className="text-amber-300 italic font-medium" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-amber-400 bg-[#0b0c10] p-6 sm:p-8 my-10 rounded-2xl italic text-lg sm:text-xl text-slate-200"
                      {...props}
                    />
                  ),
                  a: ({ ...props }) => (
                    <a
                      href={props.href || "#"}
                      target={props.href?.startsWith("http") ? "_blank" : undefined}
                      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-amber-400 hover:text-amber-300 underline decoration-amber-400/40 hover:decoration-amber-300 transition-colors underline-offset-4 font-bold"
                      {...props}
                    />
                  ),
                  img: ({ ...props }) => (
                    <span className="block my-12">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full rounded-2xl border border-white/10 shadow-xl"
                        alt={props.alt || ""}
                        {...props}
                      />
                      {props.alt && (
                        <span className="block text-center text-xs text-slate-400 mt-3 font-medium">
                          {props.alt}
                        </span>
                      )}
                    </span>
                  ),
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto my-10 rounded-2xl border border-white/10 bg-[#0b0c10]">
                      <table className="w-full text-left border-collapse" {...props} />
                    </div>
                  ),
                  thead: ({ ...props }) => (
                    <thead
                      className="bg-[#12141c] text-amber-400 font-bold uppercase tracking-wider text-xs border-b border-white/10"
                      {...props}
                    />
                  ),
                  tbody: ({ ...props }) => (
                    <tbody className="text-sm text-slate-200 divide-y divide-white/10" {...props} />
                  ),
                  tr: ({ ...props }) => (
                    <tr className="hover:bg-white/[0.03] transition-colors" {...props} />
                  ),
                  th: ({ ...props }) => (
                    <th className="px-5 py-3.5 border-r border-white/5 last:border-r-0" {...props} />
                  ),
                  td: ({ ...props }) => (
                    <td className="px-5 py-3.5 border-r border-white/5 last:border-r-0 font-mono text-xs" {...props} />
                  ),
                }}
                remarkPlugins={[remarkGfm]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* Bottom Conversion Card */}
        <section className="container px-4 sm:px-6 mx-auto mt-20">
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0b0c10] border border-amber-400/35 text-center space-y-5 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
            <span className="text-amber-400 font-mono font-bold tracking-widest uppercase text-xs block">
              Put This Into Action for Your Business
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Want Us to Audit Your Rankings &amp; Website?
            </h2>
            <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Get a free 5-minute personalized video from Damein Donald showing how your business stacks up in Google Maps and mobile speed across Central Mississippi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/free-audit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs hover:brightness-110 transition-all shadow-[0_0_28px_rgba(245,158,11,0.3)]"
              >
                Get Free 5-Min Rank Check <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#12141c] border border-white/15 hover:border-amber-400/50 text-white font-bold rounded-xl uppercase tracking-wider text-xs transition-colors"
              >
                Book a 15-Min Strategy Call
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
