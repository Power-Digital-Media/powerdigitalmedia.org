import { ImageResponse } from 'next/og';
import { blogPosts } from '@/data/blogPosts';

export const runtime = 'edge';

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);
    const title = post?.title || 'Power Digital Media Insights';
    const category = post?.category || 'Daily Intel';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #050505, #0a0a0a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background Accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-200px',
                        right: '-200px',
                        width: '600px',
                        height: '600px',
                        background: '#4ade80',
                        opacity: '0.1',
                        filter: 'blur(100px)',
                        borderRadius: '50%',
                    }}
                />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'auto'
                }}>
                    <div style={{
                        fontSize: 24,
                        background: 'rgba(74, 222, 128, 0.1)',
                        color: '#4ade80',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        border: '1px solid rgba(74, 222, 128, 0.2)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600
                    }}>
                        {category}
                    </div>
                    <div style={{ fontSize: 24, color: '#666', fontWeight: 600 }}>
                        POWER DIGITAL MEDIA
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <div style={{
                        fontSize: 70,
                        fontWeight: 800,
                        color: 'white',
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        {title}
                    </div>
                </div>

                <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '40px'
                }}>
                    <div style={{ fontSize: 24, color: '#999' }}>
                        Read the full analysis at powerdigitalmedia.org
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
