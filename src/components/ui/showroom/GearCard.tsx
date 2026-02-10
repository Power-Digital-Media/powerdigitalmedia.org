"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/components/providers/MotionProvider";
import { ExternalLink, CheckCircle2, ShoppingCart, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GearItem } from "@/data/gear";

interface GearCardProps {
    item: GearItem;
}

export default function GearCard({ item }: GearCardProps) {
    const [livePrice, setLivePrice] = useState<string | null>(null);
    const [liveLink, setLiveLink] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [imgSrc, setImgSrc] = useState(item.image);

    const AFFILIATE_ID = 'powerdigital1-20';

    // Manual Override Protocol (V9): 
    // Absolute priority to the user's manual link.
    const smartStaticLink = item.amazonLink?.trim()
        ? item.amazonLink.trim()
        : item.asin
            ? `https://www.amazon.com/dp/${item.asin.trim()}?tag=${AFFILIATE_ID}`
            : `https://www.amazon.com/s?k=${encodeURIComponent(item.name)}&tag=${AFFILIATE_ID}`;

    const finalLink = liveLink || smartStaticLink;

    useEffect(() => {
        // Enforce state sync when props change
        setImgSrc(item.image);
    }, [item.image]);

    /*
    useEffect(() => {
        const fetchProductData = async () => {
            if (!item.asin) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/amazon/product?asin=${item.asin}`);
                if (!response.ok) throw new Error('API Sync Failed');
                const data = await response.json();

                if (data.price && data.price !== 'N/A') {
                    setLivePrice(data.price);
                }

                if (data.liveLink && data.liveLink.startsWith('http')) {
                    setLiveLink(data.liveLink.trim());
                }
            } catch (error) {
                // Silently fail to static link (Hibernate Mode)
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        // API DISABLED BY USER REQUEST (Netlify Stabilization)
        // fetchProductData(); 
    }, [item.asin]);
    */

    // Handle image errors with a fallback to the brand's primary mic image
    const handleImageError = () => {
        if (imgSrc !== '/images/gear/shure_sm7b.webp') {
            setImgSrc('/images/gear/shure_sm7b.webp');
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -10 }}
            className="group relative glass-card rounded-[2.5rem] overflow-hidden border-white/5 bg-slate-900/40 backdrop-blur-3xl flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Link href={`/showroom/${item.category.toLowerCase()}/${item.id}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-60" />
                    <img
                        src={imgSrc}
                        alt={item.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-alias"
                    />
                </Link>

                {/* Tags Section */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md text-accent text-[9px] font-bold uppercase tracking-widest">
                        {item.brand}
                    </div>
                    {item.level && (
                        <div className={`px-3 py-1 rounded-full border backdrop-blur-md text-[8px] font-black uppercase tracking-[0.2em] shadow-lg ${item.level === 'Elite' ? 'bg-white/10 border-white/20 text-white' :
                            item.level === 'Pro' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                'bg-green-500/10 border-green-500/20 text-green-400'
                            }`}>
                            {item.level} Protocol
                        </div>
                    )}
                </div>

                {/* Use Case Indicator */}
                {item.useCase && (
                    <div className="absolute bottom-6 left-6 z-20">
                        <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/5 backdrop-blur-sm text-[8px] font-medium text-white/40 uppercase tracking-[0.3em]">
                            Optimum for: <span className="text-white">{item.useCase}</span>
                        </div>
                    </div>
                )}

                {/* Price Indicator */}
                <div className="absolute top-6 right-6 z-20">
                    <motion.div
                        initial={false}
                        animate={isLoading ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                        transition={isLoading ? { repeat: Infinity, duration: 1.5 } : {}}
                        className={`min-w-[40px] px-3 py-2 rounded-full backdrop-blur-md border flex items-center justify-center text-xs font-black shadow-2xl transition-colors duration-500 ${livePrice ? 'bg-accent/20 border-accent/30 text-accent' : 'bg-white/10 border-white/20 text-white/50'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : livePrice ? (
                            livePrice
                        ) : (
                            item.priceRange
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                    <Link href={`/showroom/${item.category.toLowerCase()}/${item.id}`}>
                        <h3 className="text-2xl font-black tracking-tighter uppercase leading-none mb-2 hover:text-accent transition-colors cursor-pointer">
                            {item.name}
                        </h3>
                    </Link>
                    <p className="text-foreground/40 text-xs font-light leading-relaxed">
                        {item.description}
                    </p>
                </div>

                {/* Tech Specs */}
                <div className="space-y-2 mb-8 flex-grow">
                    {item.technicalSpecs.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] text-foreground/60 uppercase tracking-wider font-medium">
                            <CheckCircle2 className="w-3 h-3 text-accent" />
                            {spec}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <a
                        href={finalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 transition-all hover:bg-accent hover:scale-[1.02] active:scale-[0.98] border-glow shadow-xl group/btn cursor-pointer"
                    >
                        <ShoppingCart className="w-3 h-3 transition-transform group-hover/btn:-translate-y-0.5" />
                        Acquire on Amazon
                        <ExternalLink className="w-3 h-3 opacity-30" />
                    </a>

                    <Link
                        href={`/showroom/${item.category.toLowerCase()}/${item.id}`}
                        className="w-full py-3 bg-white/5 text-white/60 rounded-xl font-bold uppercase tracking-[0.2em] text-[9px] flex items-center justify-center gap-2 border border-white/10 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
                    >
                        Learn More
                        <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-accent/5 blur-[100px] pointer-events-none -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}
