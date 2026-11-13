import { BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterForm from "@/components/ui/NewsletterForm";
import BlogExplorerClient from "@/components/blog/BlogExplorerClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor SEO, Web Design & Growth Guides | Power Digital Media Blog",
  description:
    "Actionable playbooks on Google Map Pack rankings, custom Next.js web design, PDM PinDrop™ & PinCam™ field apps, and CRM automation for Mississippi businesses.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/blog",
  },
  openGraph: {
    title: "Contractor SEO, Web Design & Growth Guides | Power Digital Media",
    description:
      "Actionable playbooks on Google Map Pack rankings, custom Next.js web design, PDM PinDrop™ & PinCam™ field apps, and CRM automation for Mississippi businesses.",
    url: "https://powerdigitalmedia.org/blog",
  },
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      category: p.category,
      image: p.image,
    }));

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://powerdigitalmedia.org/" },
          { name: "Guides & Insights", url: "https://powerdigitalmedia.org/blog" },
        ]}
      />
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-amber-500/[0.06] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero + Interactive Explorer */}
      <section className="relative pt-32 pb-20 md:pt-40">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Field-Tested Local Growth Playbooks
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-5 leading-[1.03]">
              Web Speed, Map Pack SEO &amp;{" "}
              <span className="text-amber-400">Contractor Systems.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Practical guides written in Jackson, Mississippi for roofers, HVAC pros, dirt-work operators, and local business owners who want their website to actually generate calls.
            </p>
          </div>

          <BlogExplorerClient posts={sortedPosts} />
        </div>
      </section>

      {/* Free Audit + Newsletter Strip */}
      <section className="py-20 bg-[#0b0c10] border-t border-white/10 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-5xl">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 items-center p-5 sm:p-10 rounded-3xl bg-[#12141c] border border-white/10">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                Want Us to Check Your Site?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Get a Free 5-Minute Rank &amp; Speed Video
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Damein will record a custom screen-share showing where you rank in the Google Map Pack across Central MS—and the exact fixes that will get your phone ringing.
              </p>
              <Link
                href="/free-audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-black uppercase tracking-wider text-xs hover:bg-amber-300 transition-colors"
              >
                Request Free Rank Check <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#0b0c10] border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white">Get New Playbooks by Email</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero spam—just actionable breakdowns on Google Maps rankings, jobsite SEO, and website conversions.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
