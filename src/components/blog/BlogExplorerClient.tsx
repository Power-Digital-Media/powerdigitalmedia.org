"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Search, X } from "lucide-react";

interface BlogCardItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export default function BlogExplorerClient({ posts }: { posts: BlogCardItem[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...unique];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div>
      {/* Search + Category Filter Bar */}
      <div className="max-w-4xl mx-auto mb-14 space-y-5">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides on Local SEO, Next.js speed, CRM, or contractors..."
            aria-label="Search blog articles"
            className="w-full pl-12 pr-11 py-4 rounded-2xl bg-[#0b0c10] border border-white/15 focus:border-amber-400 outline-none transition-colors text-sm text-white placeholder:text-slate-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? "bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : "bg-[#0b0c10] border border-white/10 text-slate-300 hover:border-amber-400/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid */}
      {filteredPosts.length === 0 ? (
        <div className="max-w-xl mx-auto p-10 rounded-3xl bg-[#0b0c10] border border-white/10 text-center space-y-4">
          <p className="text-lg font-bold text-white">No articles matched &ldquo;{query}&rdquo;.</p>
          <p className="text-sm text-slate-400">
            Try clearing your search or choosing another topic category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            Show All Articles
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="group h-full">
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="flex flex-col h-full rounded-3xl bg-[#0b0c10] border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-amber-400/45 group-hover:-translate-y-1 shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
                  <div className="aspect-video relative overflow-hidden bg-[#12141c]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={post.image.includes("oaidalleapiprodscus")}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#06080f]/85 backdrop-blur-md border border-amber-400/35 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> {post.date}
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-white line-clamp-2 group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider pt-4 border-t border-white/10">
                      Read Guide{" "}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
