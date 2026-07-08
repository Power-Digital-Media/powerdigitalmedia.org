import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://powerdigitalmedia.org';

    // Base Routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/contact',
        '/our-work',
        '/web-design',
        '/business-phones',
        '/custom-applications',
        '/free-audit',
        '/business-solutions',
        '/founders100',
        '/lead-leak-check',
        '/marketing',
        '/privacy',
        '/terms',
        '/privacy-policy',
        '/terms-and-conditions',
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

    return [...routes, ...blogRoutes];
}
