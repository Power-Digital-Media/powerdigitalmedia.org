import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectShowcaseClient from "@/components/ui/portfolio/ProjectShowcaseClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project) {
        return {
            title: "Project Not Found | Power Digital Media",
        };
    }

    return {
        title: `${project.title} | Power Digital Media`,
        description: project.objective,
        openGraph: {
            title: project.title,
            description: project.objective,
            type: "article",
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.objective,
            images: [project.image],
        },
    };
}

export default async function ProjectShowcase({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project) notFound();

    return <ProjectShowcaseClient project={project} />;
}
