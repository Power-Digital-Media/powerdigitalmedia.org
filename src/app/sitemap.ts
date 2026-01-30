import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { GEAR_COLLECTION } from '@/data/gear';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://powerdigitalmedia.org';

    // Base Routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/contact',
        '/our-work',
        '/podcasting',
        '/showroom',
        '/web-design',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog Routes
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Showroom Products are dynamic, but we can't easily slugify them here without a slug field
    // For now, we prioritize the main showroom page.

    return [...routes, ...blogRoutes];
}
