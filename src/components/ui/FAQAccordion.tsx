"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    title?: string;
    eyebrow?: string;
    includeSchema?: boolean;
}

export default function FAQAccordion({
    faqs,
    title = "Frequently Asked Questions",
    eyebrow = "Straight Answers",
    includeSchema = true,
}: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqSchema =
        includeSchema && faqs.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((faq) => ({
                      "@type": "Question",
                      name: faq.question,
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: faq.answer,
                      },
                  })),
              }
            : null;

    return (
        <section className="py-24 bg-[#06080f] border-t border-white/[0.06]">
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="text-center mb-14">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block mb-3">
                        {eyebrow}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                        {title}
                    </h2>
                </div>

                <div className="space-y-3.5">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isOpen
                                        ? "bg-[#12141c] border-amber-500/35 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                                        : "bg-[#0b0c10] border-white/[0.08] hover:border-white/20"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleOpen(index)}
                                    className="w-full flex items-center justify-between p-6 text-left transition-colors"
                                >
                                    <span className="font-bold text-base md:text-lg text-white pr-8">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                                            isOpen
                                                ? "bg-amber-500 border-amber-400 text-[#06080f] rotate-180"
                                                : "bg-white/[0.03] border-white/10 text-amber-400"
                                        }`}
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-1 text-slate-300 text-sm md:text-base leading-relaxed border-t border-white/[0.06]">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
