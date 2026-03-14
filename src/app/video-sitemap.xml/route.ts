import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = 'https://powerdigitalmedia.org';

    const videos = [
        {
            url: `${baseUrl}/our-work`,
            title: 'All Things New Podcast - Power Digital Media',
            description: 'A cinematic faith-based ecosystem building a legacy of restoration in Central Mississippi.',
            thumbnail: 'https://i.ytimg.com/vi/8qHbfb0aKek/hqdefault.webp',
            uploadDate: '2026-01-15T08:00:00+00:00',
            duration: '3600'
        },
        {
            url: `${baseUrl}/production`,
            title: 'A Fool N His Folly - Power Digital Media',
            description: 'Urban Culture narrative shot in HDR Cinematic Multi-Cam.',
            thumbnail: 'https://i.ytimg.com/vi/rS5QkPtAfzU/hqdefault.webp',
            uploadDate: '2026-02-10T08:00:00+00:00',
            duration: '2400'
        },
        {
            url: `${baseUrl}/marketing`,
            title: 'HSP PodCast - Power Digital Media',
            description: 'Business and Strategy podcast built with a Multi-Cam Array for maximum conversion.',
            thumbnail: 'https://img.youtube.com/vi/MhlTopnX68g/maxresdefault.webp',
            uploadDate: '2026-03-01T08:00:00+00:00',
            duration: '4200'
        }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos.map(video => `    <url>
        <loc>${video.url}</loc>
        <video:video>
            <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
            <video:title>${video.title}</video:title>
            <video:description>${video.description}</video:description>
            <video:publication_date>${video.uploadDate}</video:publication_date>
            <video:duration>${video.duration}</video:duration>
            <video:family_friendly>yes</video:family_friendly>
        </video:video>
    </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate'
        }
    });
}
