import { NextResponse } from "next/server";
import { blogPosts } from "@/data/blogPosts";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://powerdigitalmedia.org";

  const videoPosts = blogPosts.filter((post) => Boolean(post.videoUrl));

  const entries = videoPosts
    .map((post) => {
      const loc = `${baseUrl}/blog/${post.slug}`;
      const thumb = post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`;
      const pubDate = new Date(post.date).toISOString();
      return `    <url>
        <loc>${escapeXml(loc)}</loc>
        <video:video>
            <video:thumbnail_loc>${escapeXml(thumb)}</video:thumbnail_loc>
            <video:title>${escapeXml(post.title)}</video:title>
            <video:description>${escapeXml(post.excerpt)}</video:description>
            <video:player_loc>${escapeXml(post.videoUrl!)}</video:player_loc>
            <video:publication_date>${pubDate}</video:publication_date>
            <video:family_friendly>yes</video:family_friendly>
        </video:video>
    </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    },
  });
}
