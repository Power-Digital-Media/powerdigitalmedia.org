"use client";

import { motion } from "@/components/providers/MotionProvider";
import { ShieldCheck, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LifecycleCard from "@/components/ui/billing/LifecycleCard";

export default function BespokeBillingPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
            <Navbar />

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

            <section className="relative pt-40 pb-24">
                <div className="container px-6 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-8">
                            <ShieldCheck className="w-4 h-4 text-accent" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Private Engagement Link</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                            Bespoke <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Architecture.</span>
                        </h1>
                        <p className="text-xl text-foreground/60 leading-relaxed font-light text-balance mb-12">
                            Secure installment-based deployment for specialized high-authority projects.
                        </p>

                        <div className="max-w-4xl mx-auto text-left">
                            <LifecycleCard
                                title="Project: Full Estate Architecture"
                                subtitle="Bespoke website build paired with managed growth engineering. Authorized for private partner deployment."
                                installmentPrice={250}
                                installmentPriceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_INSTALLMENT_BESPOKE || "price_installment_placeholder"}
                                recurringPrice={250}
                                recurringPriceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_RECURRING_BESPOKE || "price_recurring_placeholder"}
                                installmentsCount={4}
                                features={[
                                    "Advanced 3D Architecture",
                                    "SEO Domain Dominance",
                                    "Weekly Sync Calls",
                                    "Technical Maintenance",
                                    "YouTube Optimization",
                                    "Stripe Tax Compliance"
                                ]}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
