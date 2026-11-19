import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { projects } from "@/data/projects";
import { CENTRAL_MS_LOCATIONS } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://powerdigitalmedia.org";

  // Canonical Core, Product, Service, Proof, Campaign & Legal Routes
  const routes = [
    "",
    "/estimate",
    "/contractors",
    "/pindrop",
    "/pincam",
    "/site-intelligence",
    "/web-design",
    "/local-seo",
    "/custom-applications",
    "/marketing",
    "/our-work",
    "/reviews",
    "/about",
    "/free-audit",
    "/book",
    "/contact",
    "/blog",
    "/site-manager",
    "/lead-leak-check",
    "/business-solutions",
    "/founders100",
    "/community",
    "/privacy",
    "/terms",
    "/refund-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority:
      route === ""
        ? 1.0
        : [
            "/estimate",
            "/contractors",
            "/pindrop",
            "/pincam",
            "/site-intelligence",
            "/web-design",
            "/local-seo",
            "/free-audit",
          ].includes(route)
        ? 0.9
        : ["/privacy", "/terms", "/refund-policy"].includes(route)
        ? 0.4
        : 0.8,
  }));

  // Central MS City Service-Area Routes
  const locationRoutes = CENTRAL_MS_LOCATIONS.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Live Client Case Study Routes
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Editorial Blog Routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...locationRoutes, ...projectRoutes, ...blogRoutes];
}
