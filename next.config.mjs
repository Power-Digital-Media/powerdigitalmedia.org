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
      // 1. Retired Services, Showroom & Equipment Pages
      {
        source: '/podcasting',
        destination: '/',
        permanent: true,
      },
      {
        source: '/podcasting/:path*',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/production',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/production/:path*',
        destination: '/marketing',
        permanent: true,
      },
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
      {
        source: '/gear',
        destination: '/',
        permanent: true,
      },
      {
        source: '/gear/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/equipment',
        destination: '/',
        permanent: true,
      },
      {
        source: '/equipment/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pc',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pc/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/studio',
        destination: '/',
        permanent: true,
      },
      {
        source: '/studio/:path*',
        destination: '/',
        permanent: true,
      },

      // 2. High-Traffic Shorthands & Navigation Aliases
      {
        source: '/portfolio',
        destination: '/our-work',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/our-work',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/our-work',
        permanent: true,
      },
      {
        source: '/case-study',
        destination: '/our-work',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/free-audit',
        permanent: true,
      },
      {
        source: '/audit',
        destination: '/free-audit',
        permanent: true,
      },
      {
        source: '/schedule',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/consult',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/consultation',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/websites',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/web-development',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/apps',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/custom-apps',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/pindrop-app',
        destination: '/pindrop',
        permanent: true,
      },
      {
        source: '/phones',
        destination: '/business-phones',
        permanent: true,
      },
      {
        source: '/telephony',
        destination: '/business-phones',
        permanent: true,
      },
      {
        source: '/voip',
        destination: '/business-phones',
        permanent: true,
      },

      // 3. Portfolio Slug Alias Redirects
      {
        source: '/portfolio/born-again',
        destination: '/portfolio/born-again-roofing',
        permanent: true,
      },
      {
        source: '/portfolio/geaux-pro',
        destination: '/portfolio/geaux-pro-outdoors',
        permanent: true,
      },
      {
        source: '/portfolio/msdirt',
        destination: '/portfolio/geaux-pro-outdoors',
        permanent: true,
      },
      {
        source: '/portfolio/church-244',
        destination: '/portfolio/simmons-memorial',
        permanent: true,
      },
      {
        source: '/portfolio/church244',
        destination: '/portfolio/simmons-memorial',
        permanent: true,
      },
      {
        source: '/portfolio/blacksheep',
        destination: '/portfolio/blacksheep-recovery',
        permanent: true,
      },
      {
        source: '/portfolio/blacksheeprecovery',
        destination: '/portfolio/blacksheep-recovery',
        permanent: true,
      },
      {
        source: '/portfolio/blacksheeprecoverywarfare',
        destination: '/portfolio/blacksheep-recovery',
        permanent: true,
      },
      {
        source: '/portfolio/tbeauxs',
        destination: '/portfolio/tbeaux',
        permanent: true,
      },
      {
        source: '/portfolio/t-beauxs',
        destination: '/portfolio/tbeaux',
        permanent: true,
      },
      {
        source: '/portfolio/lungrin',
        destination: '/portfolio/lungrins-lawncare',
        permanent: true,
      },
      {
        source: '/portfolio/lungrins',
        destination: '/portfolio/lungrins-lawncare',
        permanent: true,
      },
      {
        source: '/portfolio/inhisgrip',
        destination: '/portfolio/in-his-grip',
        permanent: true,
      },
      {
        source: '/portfolio/thelocalguide',
        destination: '/portfolio/the-local-guide-ms',
        permanent: true,
      },
      {
        source: '/portfolio/local-guide',
        destination: '/portfolio/the-local-guide-ms',
        permanent: true,
      },

      // 4. Duplicate Legal & Canonical Paths
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/terms',
        permanent: true,
      },

      // 5. GSC 404 Redirect Fixes
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

      // 6. Soft 404 Renamed Blog Redirects
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
