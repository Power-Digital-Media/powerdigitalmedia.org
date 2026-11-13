import { Feed } from "feed";
import { blogPosts } from "@/data/blogPosts";

export async function GET() {
  const siteUrl = "https://powerdigitalmedia.org";

  const feed = new Feed({
    title: "Power Digital Media — Contractor Growth, Web Design & Local SEO Insights",
    description:
      "Practical guides on Next.js web design, Google Map Pack rankings, PDM PinDrop™ & PinCam™ field apps, and CRM automation for Mississippi contractors and local businesses.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/power-logo.webp`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Power Digital Media LLC`,
    updated: new Date(),
    generator: "Power Digital Media RSS",
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
    author: {
      name: "Damein Donald — Power Digital Media LLC",
      email: "info@powerdigitalmedia.org",
      link: siteUrl,
    },
  });

  blogPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
      content: post.content,
      author: [
        {
          name: post.author.name,
          email: "info@powerdigitalmedia.org",
          link: `${siteUrl}/blog`,
        },
      ],
      date: new Date(post.date),
      image: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
