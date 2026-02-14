import { notFound } from "next/navigation";
import { GEAR_COLLECTION } from "@/data/gear";
import { ExternalLink, CheckCircle2, ShoppingCart, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareProtocol from "@/components/ui/showroom/ShareProtocol";
import { Metadata } from "next";
import { ArrowRight, Info, Check, X, Terminal, Workflow } from "lucide-react";
import * as motion from "framer-motion/client";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

// Force static generation for known paths
export function generateStaticParams() {
    return GEAR_COLLECTION.map((item) => ({
        category: item.category.toLowerCase(),
        id: item.id,
    }));
}

// SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = GEAR_COLLECTION.find((item) => item.id === id);
    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | ${product.level} Protocol`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            type: "website",
            url: `https://powerdigitalmedia.org/showroom/${params.category}/${params.id}`,
            images: [product.image],
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
    // Find product (Server Side)
    const { id } = await params;
    const product = GEAR_COLLECTION.find((item) => item.id === id);

    if (!product) {
        return notFound();
    }

    // Affiliate Logic
    const AFFILIATE_ID = 'powerdigital1-20';
    const smartStaticLink = product.amazonLink?.trim()
        ? product.amazonLink.trim()
        : product.asin
            ? `https://www.amazon.com/dp/${product.asin.trim()}?tag=${AFFILIATE_ID}`
            : `https://www.amazon.com/s?k=${encodeURIComponent(product.name)}&tag=${AFFILIATE_ID}`;

    // Related Protocol Logic
    const relatedItems = GEAR_COLLECTION
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 4);

    // Dynamic Gradient Protocol
    const getLevelGradient = (level: string = 'Entry') => {
        switch (level) {
            case 'Elite': return 'from-white/10 to-white/5';
            case 'Pro': return 'from-cyan-500/10 to-cyan-500/5';
            default: return 'from-green-500/10 to-green-500/5';
        }
    };

    const breadcrumbItems = [
        { name: "Showroom", path: "/showroom" },
        { name: product.category, path: `/showroom?category=${product.category.toLowerCase()}` },
        { name: product.name, path: `/showroom/${product.category.toLowerCase()}/${product.id}` }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-accent selection:text-white">
            <BreadcrumbSchema items={breadcrumbItems} />
            <Navbar />

            {/* Ambient Background Protocol */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] blur-[120px] opacity-20 rounded-full bg-gradient-to-b ${product.level === 'Elite' ? 'from-white/40' : product.level === 'Pro' ? 'from-cyan-500/40' : 'from-green-500/40'} to-transparent`} />
                <div className="absolute inset-0 cyber-grid opacity-10" />
            </div>

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Navigation Protocol */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link
                        href="/showroom"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors mb-12 text-sm uppercase tracking-widest font-bold group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Showroom
                    </Link>
                </motion.div>

                {/* --- HERO SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
                    {/* Visual Capture Protocol (Left/Top) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="lg:col-span-7 relative group"
                    >
                        {/* Ambient Glow Aura */}
                        <div className={`absolute -inset-4 bg-gradient-to-br ${product.level === 'Elite' ? 'from-white/20' : product.level === 'Pro' ? 'from-cyan-500/20' : 'from-green-500/20'} to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                        <div className={`relative aspect-video lg:aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br ${getLevelGradient(product.level)} shadow-2xl transition-all duration-700`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 opacity-80" />
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Protocol Badge Overlay */}
                            <div className="absolute top-10 left-10 z-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className={`px-6 py-3 rounded-full border backdrop-blur-xl text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl ${product.level === 'Elite' ? 'bg-white/10 border-white/20 text-white' :
                                        product.level === 'Pro' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                            'bg-green-500/10 border-green-500/20 text-green-400'
                                        }`}
                                >
                                    {product.level} Protocol
                                </motion.div>
                            </div>
                        </div>

                        {/* --- RELOCATED CTA ROW (Fills gap under image) --- */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            {/* Technical Meta Block */}
                            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md group/meta relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/meta:opacity-20 transition-opacity">
                                    <Terminal className="w-16 h-16" />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-accent font-black text-[9px] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-accent" /> Core Directives
                                    </div>
                                    <div className="space-y-4">
                                        {product.technicalSpecs.slice(0, 3).map((spec, i) => (
                                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                                                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Protocol.{i}</div>
                                                <div className="text-[10px] font-bold text-white/80">{spec}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8 text-[8px] font-mono text-white/20 uppercase tracking-widest relative z-10">SYS_ID // {product.id.substring(0, 8).toUpperCase()}</div>
                            </div>

                            {/* Acquire Action Block */}
                            <div className="p-8 rounded-[2.5rem] bg-accent/10 border border-accent/20 shadow-2xl backdrop-blur-xl relative overflow-hidden group/acquire flex flex-col justify-between">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover/acquire:opacity-100 transition-opacity duration-1000" />

                                <div className="relative z-10">
                                    <div className="flex items-end justify-between mb-8">
                                        <div>
                                            <div className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Investment</div>
                                            <div className="text-5xl font-black text-white">{product.priceRange}</div>
                                        </div>
                                        <div className="text-green-400 font-bold text-[8px] flex items-center gap-2 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20 uppercase tracking-widest shadow-xl shadow-green-400/10">
                                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                                        </div>
                                    </div>

                                    <a
                                        href={smartStaticLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-6 bg-accent text-white rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-4 transition-all hover:bg-white hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-accent/40 group/btn"
                                    >
                                        <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                                        Acquire Equipment
                                    </a>
                                </div>
                                <p className="text-center text-[8px] text-white/30 uppercase tracking-[0.3em] mt-6 relative z-10">Amazon Associates Protocol</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Data Intel Protocol (Right/Top) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col gap-10"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="text-accent font-black tracking-[0.4em] uppercase text-[10px] flex items-center gap-2 group/brand">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    {product.brand} // {product.category}
                                </div>
                                <ShareProtocol />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[1.1] mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                                {product.name}
                            </h1>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {product.technicalSpecs.slice(0, 3).map((spec, i) => (
                                    <div key={i} className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">
                                        DATA_SPEC.{i + 1} // {spec}
                                    </div>
                                ))}
                            </div>
                            <p className="text-base text-white/40 font-medium leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                        </div>

                        {/* Hardware Support Protocol (Fills space on the right) */}
                        <div className="mt-auto pt-10 border-t border-white/5">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <ShieldCheck className="w-6 h-6 text-accent" />
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Elite Security Protocol</div>
                                </div>
                                <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest font-bold">PD_PROTO_AUTO_VETTING // ACTIVE</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* --- DETAILED DATA INFRASTRUCTURE --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
                    {/* Left Column: Deep Context */}
                    <div className="lg:col-span-8 flex flex-col gap-24">

                        {/* The Intel: Long Description */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-12 flex items-center gap-6">
                                <Info className="w-4 h-4" />
                                <span className="h-px flex-1 bg-white/10" />
                                Hardware Intelligence
                            </h3>
                            <div className="prose prose-invert prose-2xl max-w-none text-white/80 font-light leading-relaxed">
                                <p className="text-balance">
                                    {product.longDescription || product.description}
                                </p>
                            </div>
                        </motion.section>

                        {/* The Verdict Section */}
                        {product.ourTake && (
                            <motion.section
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative p-12 rounded-[3rem] bg-accent/5 border border-accent/20 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] -z-10" />
                                <div className="absolute top-8 left-12 bg-accent text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Power Digital Verdict
                                </div>
                                <blockquote className="text-3xl font-bold text-white/90 leading-tight mt-8">
                                    "{product.ourTake}"
                                </blockquote>
                            </motion.section>
                        )}

                        {/* Pros & Cons Protocol */}
                        {(product.pros || product.cons) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {product.pros && (
                                    <div className="p-10 rounded-[2.5rem] bg-green-500/5 border border-green-500/10">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400 mb-8 flex items-center gap-3">
                                            <Check className="w-4 h-4" /> Optimized Pros
                                        </h4>
                                        <ul className="space-y-4">
                                            {product.pros.map((pro, i) => (
                                                <li key={i} className="flex gap-4 text-white/70 leading-relaxed text-sm italic">
                                                    <span className="text-green-500 font-black tracking-widest">+</span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {product.cons && (
                                    <div className="p-10 rounded-[2.5rem] bg-red-500/5 border border-red-500/10">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 mb-8 flex items-center gap-3">
                                            <X className="w-4 h-4" /> Protocol Limits
                                        </h4>
                                        <ul className="space-y-4">
                                            {product.cons.map((con, i) => (
                                                <li key={i} className="flex gap-4 text-white/70 leading-relaxed text-sm italic">
                                                    <span className="text-red-500 font-black tracking-widest">-</span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Creative Deployment Scenario */}
                        {product.deploymentScenario && (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="p-12 rounded-[3rem] bg-white/5 border border-white/10"
                            >
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center gap-4">
                                    <Workflow className="w-4 h-4" /> Creative Deployment Scenario
                                </h3>
                                <p className="text-xl text-white/70 font-light leading-relaxed italic border-l-2 border-accent/30 pl-8">
                                    {product.deploymentScenario}
                                </p>
                            </motion.section>
                        )}
                    </div>

                    {/* Right Column: Technical Specs & Contents */}
                    <div className="lg:col-span-4 flex flex-col gap-12 sticky top-32">

                        {/* The Blueprint: Specs */}
                        <div className="p-10 rounded-[2.5rem] bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-10 flex items-center gap-3">
                                <Terminal className="w-4 h-4" /> Technical Blueprint
                            </h3>
                            <div className="space-y-6">
                                {product.technicalSpecs.map((spec, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 border-b border-white/5 pb-4 group">
                                        <div className="text-[9px] uppercase tracking-widest text-white/20 font-bold group-hover:text-accent transition-colors">OS_LAYER_SPEC_{idx + 1}</div>
                                        <div className="text-md font-bold text-white tracking-tight">{spec}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* In The Box Section */}
                        {product.whatIsInTheBox && (
                            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8">Included components</h3>
                                <ul className="space-y-4">
                                    {product.whatIsInTheBox.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-white/60 font-medium">
                                            <div className="w-1 h-1 rounded-full bg-accent/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Protocol Section */}
                {relatedItems.length > 0 && (
                    <div className="mt-40 pt-20 border-t border-white/10">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Discovery Protocol</h3>
                                <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Related {product.category}</h2>
                            </div>
                            <Link
                                href="/showroom"
                                className="group flex items-center gap-3 text-white/50 hover:text-accent font-bold uppercase tracking-widest text-[10px] transition-colors"
                            >
                                Expansion Protocol
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/showroom/${item.category.toLowerCase()}/${item.id}`}
                                    className="group relative flex flex-col p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/40 transition-all duration-500 hover:bg-white/10 hover:-translate-y-1"
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
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
