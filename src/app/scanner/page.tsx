import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import AllInOneSiteScanner from "@/components/scanner/AllInOneSiteScanner";
import DeferredFooterSections from "@/components/ui/DeferredFooterSections";
import { Bot, Code2, Gauge } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Live Website, SEO & AI Scanner | Power Digital Media",
  description:
    "Run a free live audit on any website: Google Mobile Lighthouse speed, CrUX vitals, Schema.org JSON-LD validation, /llms.txt AI readiness, and local SEO.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/scanner",
  },
  openGraph: {
    title:
      "PDM All-In-One Live Site, Schema, llms.txt & Google Speed Scanner",
    description:
      "Instant live technical SEO, JSON-LD schema, AI crawler (/llms.txt), and Google Mobile Lighthouse audit—engineered in Jackson, MS.",
    url: "https://powerdigitalmedia.org/scanner",
    images: ["/images/og-image.png"],
  },
};

export default function ScannerPage() {
  const baseUrl = "https://powerdigitalmedia.org";

  return (
    <main className="relative flex flex-col min-h-screen bg-[#06080f] text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/` },
          {
            name: "Free Live Site Scanner",
            url: `${baseUrl}/scanner`,
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${baseUrl}/scanner#webapp`,
            name: "PDM All-In-One Live Site, SEO, Schema & AI Visibility Scanner",
            url: `${baseUrl}/scanner`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            browserRequirements: "Requires modern web browser",
            description:
              "Real-time website diagnostic engine testing HTTP/SSL security, Schema.org JSON-LD validity, /llms.txt & AI search crawler permissions, local city signal alignment, Chrome UX Report vitals, and Google Mobile Lighthouse speed.",
            creator: {
              "@id": `${baseUrl}/#organization`,
            },
          }),
        }}
      />

      <Navbar />

      <AllInOneSiteScanner isStandalonePage />

      {/* Educational Value Strip Beneath Scanner */}
      <section className="py-16 px-4 sm:px-6 bg-[#080c16] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#06080f] border border-white/10 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/12 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black uppercase text-white">
              GEO, AEO &amp; /llms.txt Readiness
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Homeowners increasingly ask ChatGPT, Gemini, and Perplexity who to hire in Jackson, Madison, and Brandon. Our scanner verifies live AI crawler permissions (`GPTBot`, `ClaudeBot`, `PerplexityBot`) and spec-compliant `/llms.txt` indexes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#06080f] border border-white/10 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/12 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black uppercase text-white">
              Live Schema.org &amp; Map Pack Signals
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Most agency WordPress templates ship zero trade-specific JSON-LD or malformed script tags. We parse every `&lt;script type=&quot;application/ld+json&quot;&gt;` block live and check 6 local ranking zones for your target city.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#06080f] border border-white/10 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/12 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Gauge className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black uppercase text-white">
              Real Google Lighthouse &amp; CrUX Data
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every mobile performance metric comes directly from Google&apos;s official PageSpeed Insights v5 &amp; Chrome UX Report APIs—benchmarked side-by-side against PDM&apos;s `0.8s` custom Next.js 16 standard.
            </p>
          </div>
        </div>
      </section>

      <DeferredFooterSections />
    </main>
  );
}
