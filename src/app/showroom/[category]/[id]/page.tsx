import { notFound } from "next/navigation";
import { GEAR_COLLECTION } from "@/data/gear";
import { ExternalLink, CheckCircle2, ShoppingCart, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareProtocol from "@/components/ui/showroom/ShareProtocol";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

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

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-accent selection:text-white">
            <Navbar />

            <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <Link
                    href="/showroom"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors mb-12 text-sm uppercase tracking-widest font-bold group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Showroom
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Visual Protocol: Image Side */}
                    <div className="flex flex-col gap-6 sticky top-32">
                        <div className={`relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br ${getLevelGradient(product.level)} shadow-2xl group transition-all duration-700`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-60" />
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Protocol Badge */}
                            <div className="absolute top-8 left-8 z-20">
                                <div className={`px-4 py-2 rounded-full border backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${product.level === 'Elite' ? 'bg-white/10 border-white/20 text-white' :
                                    product.level === 'Pro' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                        'bg-green-500/10 border-green-500/20 text-green-400'
                                    }`}>
                                    {product.level} Protocol
                                </div>
                            </div>
                        </div>

                        {/* In The Box Section */}
                        {product.whatIsInTheBox && (
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">In The Box</h3>
                                <ul className="space-y-3">
                                    {product.whatIsInTheBox.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Data Protocol: Info Side */}
                    <div className="flex flex-col gap-10 opacity-0 animate-in fade-in slide-in-from-right-8 duration-1000 fill-mode-forwards" style={{ animationDelay: '0.2s' }}>
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-accent font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                                    <Zap className="w-3 h-3" />
                                    {product.brand} / {product.category}
                                </div>
                                <ShareProtocol />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                                {product.name}
                            </h1>

                            {/* "Our Take" Highlight */}
                            {product.ourTake && (
                                <div className="mb-8 p-6 rounded-l-2xl border-l-4 border-accent bg-accent/5 italic text-white/90 leading-relaxed relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -z-10" />
                                    <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                        <ShieldCheck className="w-3 h-3" />
                                        Power Digital Verdict
                                    </div>
                                    "{product.ourTake}"
                                </div>
                            )}

                            {/* Long Description (The Intel) */}
                            <div className="prose prose-invert prose-lg max-w-none text-white/70 font-light leading-relaxed mb-8">
                                <p className="first-letter:text-5xl first-letter:font-black first-letter:text-accent first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                                    {product.longDescription || product.description}
                                </p>
                            </div>
                        </div>

                        {/* Conversion Action */}
                        <div className="flex flex-col gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl relative overflow-hidden group/card">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                            <div className="flex items-end justify-between mb-2 relative z-10">
                                <div>
                                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Investment Class</div>
                                    <div className="text-4xl font-black text-white">{product.priceRange}</div>
                                </div>
                                <div className="text-green-400 font-bold text-sm flex items-center gap-1 justify-end">
                                    <CheckCircle2 className="w-3 h-3" /> In Stock
                                </div>
                            </div>

                            <a
                                href={smartStaticLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-5 bg-white text-slate-950 rounded-xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all hover:bg-accent hover:text-white hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-accent/40 relative z-10"
                            >
                                <ShoppingCart className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                Acquire Equipment
                            </a>
                            <p className="text-center text-[10px] text-white/30 uppercase tracking-widest relative z-10">Secured via Amazon Associates Protocol</p>
                        </div>


                        {/* Features Grid */}
                        {product.features && (
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-4">
                                    <span className="h-px flex-1 bg-white/10" />
                                    Protocol Specifications
                                    <span className="h-px flex-1 bg-white/10" />
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {product.features.map((spec, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors group">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                                            <span className="text-sm font-medium text-white/80 leading-snug">{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technical Specs Compact */}
                        <div className="mt-4 pt-8 border-t border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {product.technicalSpecs.map((spec, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2 hover:border-accent/30 transition-colors">
                                        <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Protocol {idx + 1}</div>
                                        <div className="text-xs font-bold text-white tracking-wide">{spec}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Use Case Badge */}
                        {product.useCase && (
                            <div className="flex justify-center mt-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified for {product.useCase}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Related Protocol Section */}
                {relatedItems.length > 0 && (
                    <div className="mt-40 pt-20 border-t border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards" style={{ animationDelay: '0.4s' }}>
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Discovery Protocol</h3>
                                <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Related {product.category}</h2>
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
