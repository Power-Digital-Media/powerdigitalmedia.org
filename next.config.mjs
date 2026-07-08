/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/podcasting',
        destination: '/',
        permanent: true,
      },
      {
        source: '/production',
        destination: '/marketing',
        permanent: true,
      },
      // GSC 404 Redirect Fixes
      {
        source: '/video-first-podcasting-2026',
        destination: '/blog/video-first-podcasting-2026',
        permanent: true,
      },
      {
        source: '/evaluating-llm-benchmarks-insights-from-benchmark2',
        destination: '/blog/evaluating-llm-benchmarks-insights-from-benchmark2',
        permanent: true,
      },
      {
        source: '/evaluating-llm-benchmarks-insights-from-benchmark2/',
        destination: '/blog/evaluating-llm-benchmarks-insights-from-benchmark2',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },

      // Soft 404 Renamed Blog Redirects
      {
        source: '/blog/the-truth-about-the-2026-benchmark-war-sovereign-clouds-role',
        destination: '/blog/sovereign-cloud-2026-control-compliance-performance',
        permanent: true,
      },
      {
        source: '/blog/mastering-modern-studio-tech-february-2026-insights',
        destination: '/blog/studio-tech-advancements-february-2026-insights',
        permanent: true,
      },
      {
        source: '/blog/accelerating-creative-velocity-ai-and-automation-in-2026',
        destination: '/blog/creative-workflow-management-maximizing-creative-velocity-in-2026',
        permanent: true,
      },
      // Showroom Retirement Catch-All Redirects
      {
        source: '/showroom',
        destination: '/',
        permanent: true,
      },
      {
        source: '/showroom/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Target modern browsers only (no legacy JavaScript polyfills per PageSpeed Insights)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    nextScriptWorkers: true,
    optimizeCss: true,
  },
  // Use modern browserslist
};

export default nextConfig;
