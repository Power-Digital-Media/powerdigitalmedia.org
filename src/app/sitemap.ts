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
        '/showroom',
        '/web-design',
        '/privacy',
        '/terms',
        '/refund-policy',
        '/client-discovery',
        '/web-design/discovery',
        '/community',
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

    // Showroom Routes (Dynamic Catalog Injection)
    const showroomRoutes = GEAR_COLLECTION.map((item) => ({
        url: `${baseUrl}/showroom/${item.category.toLowerCase()}/${item.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: item.level === 'Elite' ? 0.9 : 0.8,
    }));

    return [...routes, ...blogRoutes, ...showroomRoutes];
}
