import { Feed } from "feed";
import { blogPosts } from "@/data/blogPosts";

export async function GET() {
    const siteUrl = "https://powerdigitalmedia.org";

    const feed = new Feed({
        title: "Power Digital Media Tech News",
        description: "Latest insights on AI, video production, and digital strategy.",
        id: siteUrl,
        link: siteUrl,
        language: "en",
        image: `${siteUrl}/icon.png`,
        favicon: `${siteUrl}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}, Power Digital Media`,
        updated: new Date(),
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${siteUrl}/rss.xml`,
        },
        author: {
            name: "Power Digital Media",
            email: "donna@simmonsmemorial.org",
            link: "https://powerdigitalmedia.org",
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
                    email: "donna@simmonsmemorial.org",
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
