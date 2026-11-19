import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectShowcaseClient from "@/components/ui/portfolio/ProjectShowcaseClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const PROJECT_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "born-again-roofing": {
    title: "Born Again Roofing Case Study | Power Digital Media",
    description:
      "See how we built a 0.8s Next.js website, 99+ live PinDrop™ GPS job pins, Capsule CRM routing, and SMS reviews for Born Again Roofing in Brandon, MS.",
  },
  tbeaux: {
    title: "T'Beaux's Seafood Case Study | Power Digital Media",
    description:
      "Custom Next.js digital menu, 0%-fee Square SDK in-app checkout, live crawfish boil price sync, and catering feast calculator in Clinton, Mississippi.",
  },
  "pindrop-saas": {
    title: "PDM PinDrop™ & PinCam™ Case Study | Power Digital",
    description:
      "Inside our proprietary Mississippi contractor field suite: Ghost before/after camera, 1-tap GPS jobsite pins, neighborhood SEO, and automated reviews.",
  },
  "geaux-pro-outdoors": {
    title: "Geaux Pro Outdoors Case Study | Power Digital Media",
    description:
      "Commercial land clearing, pond construction, and dirt-hauling Next.js platform with instant quote calculators and geo-targeted SEO in Central MS.",
  },
  "lungrins-lawncare": {
    title: "Lungrin's Lawncare Case Study | Power Digital Media",
    description:
      "Sub-second mobile website, 1-tap property quote capture, and PinDrop™ route-density local SEO built for Lungrin's Lawncare in Flora & Pocahontas, MS.",
  },
  "the-local-guide-ms": {
    title: "The Local Guide MS Case Study | Power Digital Media",
    description:
      "High-speed Mississippi food and travel media platform featuring 4K POV diner tours, YouTube video sync, and an interactive local restaurant map.",
  },
  "simmons-memorial": {
    title: "Church 244 & Simmons Case Study | Power Digital Media",
    description:
      "Mobile-first ministry portals for Church 244 and Simmons Memorial in Jackson, MS featuring 1-tap online giving, livestream archives, and event sync.",
  },
  "in-his-grip": {
    title: "In His Grip Ministries Case Study | Power Digital",
    description:
      "Sub-second mobile outreach hub built for In His Grip Ministries in Central Mississippi with clean event agendas, community storytelling, and giving.",
  },
  "blacksheep-recovery": {
    title: "Black Sheep Recovery Case Study | Power Digital Media",
    description:
      "Custom Next.js media and outreach platform with unified podcast streaming, direct in-app merch checkout, donor portal, and 24/7 MS crisis resources.",
  },
};

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found | Power Digital Media",
    };
  }

  const canonicalUrl = `https://powerdigitalmedia.org/portfolio/${project.id}`;
  const seo = PROJECT_SEO_OVERRIDES[project.id];
  const title = seo?.title || `${project.title.slice(0, 32)} | Power Digital Media`;
  const description = seo?.description || project.description.slice(0, 150);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectShowcase({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://powerdigitalmedia.org/" },
          { name: "Our Work", url: "https://powerdigitalmedia.org/our-work" },
          {
            name: project.title,
            url: `https://powerdigitalmedia.org/portfolio/${project.id}`,
          },
        ]}
      />
      <ProjectShowcaseClient project={project} />
    </>
  );
}
