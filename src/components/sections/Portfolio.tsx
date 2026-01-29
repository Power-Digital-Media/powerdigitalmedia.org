"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mainProjects = [
    {
        title: "The Holy Spirit Power Podcast",
        episode: "When God Turns Your Story Around",
        description: "A flagship production showcasing our broadcast audio chain and multi-cam visual systems. Delivering high-impact ministry to thousands.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop",
        link: "https://www.youtube.com/@hsp-podcast",
        external: true
    },
    {
        title: "The Growth Engine",
        episode: "Digital Distribution Strategy",
        description: "Where production meets performance. We integrate world-class media with the marketing systems at Power Digital Growth to ensure your message reaches the right audience at the right time.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        link: "https://powerdigitalgrowth.org",
        external: true
    }
];

export default function Portfolio() {
    return (
        <section id="portfolio" className="relative py-32 bg-background">
            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-4xl mb-24">
                    <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Archive of Excellence</span>
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">Proven Content.</h2>
                    <p className="text-xl text-foreground/70 max-w-2xl leading-relaxed">
                        We don&apos;t just make media. We build high-prestige content that moves people and drives measurable engagement.
                    </p>
                </div>

                <div className="space-y-32">
                    {mainProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative"
                        >
                            <div className="relative h-[600px] md:h-[700px] w-full rounded-[40px] overflow-hidden glass-card">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-70"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                                <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end items-start text-left">
                                    <div className="max-w-2xl transition-all duration-700 group-hover:translate-x-4">
                                        <h3 className="text-sm font-bold tracking-widest text-accent uppercase mb-4">{project.episode}</h3>
                                        <h4 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight line-clamp-2 md:line-clamp-none">
                                            {project.title}
                                        </h4>
                                        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl leading-relaxed">
                                            {project.description}
                                        </p>
                                        <Link
                                            href={project.link}
                                            target={project.external ? "_blank" : undefined}
                                            rel={project.external ? "noopener noreferrer" : undefined}
                                            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-accent hover:text-white transition-all group/btn active:scale-95"
                                        >
                                            Interact With Project <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="absolute top-12 right-12 w-20 h-20 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 border border-accent/20">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <Link href="/our-work" className="text-xl font-bold text-foreground/60 hover:text-accent transition-colors flex items-center justify-center gap-3 group">
                        Enter Full Portfolio <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
        </section>
    );
}
