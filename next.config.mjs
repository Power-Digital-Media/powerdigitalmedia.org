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

      // 6. Pruned / Deleted Blog Posts (80 Articles Redirected to Relevant Service Hubs & Authority Posts)
      {
        source: '/blog/evaluating-llm-benchmarks-insights-from-benchmark2',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/the-micro-content-conversion-engine-2026',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/audio-reengineering-for-video-stages-2026',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/the-fall-of-audio-only-podcasting-2026',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/combating-mfa-podcasting-2026',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/multi-cam-podcast-architecture',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/video-first-podcasting-2026',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/ai-executable-websites-2026',
        destination: '/blog/why-nextjs-beats-wordpress-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/2026-marketing-intelligence-hub',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/anti-ai-slop-content-strategy',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/agentic-commerce-b2a-2026',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/generative-engine-optimization-geo-2026',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/the-2026-ai-power-shift-is-breaking-seo-and-video',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/the-2026-domination-playbook-how-top-marketing-agencies-are-redefining-ux',
        destination: '/blog/how-central-ms-contractors-dominate-google-pindrop',
        permanent: true,
      },
      {
        source: '/blog/the-2026-web-design-pivot-building-for-humans-and-executing-for-agents',
        destination: '/blog/why-nextjs-beats-wordpress-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/sovereign-cloud-vs-hyperscalers-the-seo-trust-shift',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/rtx-6060-vs-intel-celestial-the-2026-gpu-benchmark',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/the-2026-ai-agent-showdown-vertex-vs-operator',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/modern-web-design-jackson-ms-nextjs-edge',
        destination: '/blog/why-nextjs-beats-wordpress-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/the-benchmark-war-google-gemini-3-vs-openai-gpt-52',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/the-benchmark-war-landing-pages-vs-benchmarkone-in-2026',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/blog/mid-market-leaders-focus-on-cost-talent-tech-in-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/multi-agent-orchestration-ais-next-frontier',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/top-landing-page-builders-for-2026',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/blog/intels-market-dynamics-challenges-and-opportunities',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/seo-title-healthcare-cybersecurity-website-features-2026',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/seo-title-ai-intelligence-the-deep-scrape-explained',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/ryzen-vs-intel-2026-production-benchmarks',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/sovereign-cloud-2026-control-compliance-performance',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/ambient-intelligence-2026-uses-risks-business-impact',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/gpt-vs-gemini-multi-model-ai-architecture-2026',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/ai-llm-forecasting-the-future-of-search-intelligence-2026',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/nextjs-nodejs-vs-react-vite-the-2026-architectural-guide',
        destination: '/blog/nextjs-vs-react-vite-2026-which-architecture-actually-wins',
        permanent: true,
      },
      {
        source: '/blog/the-2026-benchmark-war-studio-techs-ultimate-showdown',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/the-benchmark-war-seo-vs-ppc-for-law-firms-in-2026',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/the-benchmark-war-core-ultra-9-285k-vs-ryzen-9-9950x3d',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/the-sennheiser-ew-100-g3-outdated-or-opportunity',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/february-2026-studio-tech-daily-intel-brief',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-software-ecosystem-february-2026-insights',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/amds-2026-innovations-unpacking-the-future-of-compute',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/deep-dive-davinci-resolve-20-3-2-comprehensive-breakdown',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/studio-tech-advancements-february-2026-insights',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/special-edition-deep-dive-davinci-resolve-february-2026-update',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/unveiling-the-future-cutting-edge-studio-tech-in-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/intels-gpu-ambitions-in-2026-a-strategic-deep-dive',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/recent-reports-highlight-failures-in-amds-ryzen-9000-cpus-on-asrocks-am5-motherboards-prompting-conc',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/in-2026-creative-teams-leveraging-ai-tools-like-gpt-53-codex-gemini-3-pro-and-claude-35-opus-are-ach',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/daily-intel-january-31-software-surge',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/daily-intel-january-2026-gear-drop',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/mastering-rodecaster-pro-ii',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/why-digital-strategy-matters',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/multi-cam-podcasting-tips',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/direct-neural-intelligence-briefing-studio-tech-innovations-and-integration',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/direct-neural-intelligence-briefing-studio-tech-innovations',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/studio-tech-trends-and-innovations-february-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/ai-model-showdown-gpt-5-3-vs-gemini-3-2026',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/studio-tech-2026-fixing-latency-production-workflows',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/compute-core-intel-brief-february-9-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/the-evolution-of-ai-powered-video-editing-tools-in-2026',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/the-clash-of-titans-gpt-53-codex-vs-gemini-3-pro',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/creative-workflow-management-maximizing-creative-velocity-in-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/the-latest-studio-tech-releases-and-innovations-of-february-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/intel-arrow-lake-refresh-what-to-expect-in-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/the-rise-of-ai-powered-video-editing-tools-in-2026',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/gpt-53-codex-vs-gemini-3-pro-a-deep-dive-into-ai-titans',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/mastering-creative-workflow-automation-in-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/immersive-spatial-ux-3d-required',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/blog/agentic-seo-machine-readable-web-2026',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/high-performance-css-interop-2026',
        destination: '/blog/nextjs-vs-react-vite-2026-which-architecture-actually-wins',
        permanent: true,
      },
      {
        source: '/blog/localized-eeat-2026',
        destination: '/blog/how-central-ms-contractors-dominate-google-pindrop',
        permanent: true,
      },
      {
        source: '/blog/designing-for-humans-and-machines-2026',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/blog/agent-navigable-architecture',
        destination: '/custom-applications',
        permanent: true,
      },
      {
        source: '/blog/operational-seo-vs-traditional-seo',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/elite-audio-protocol-podcasting-gear-jackson',
        destination: '/marketing',
        permanent: true,
      },
      {
        source: '/blog/vram-bottleneck-protocol-rtx-5090-deployment',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/tactile-control-protocol-stream-deck-plus',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/gamma-ai-website-pages-smart-layouts',
        destination: '/web-design',
        permanent: true,
      },
      {
        source: '/blog/webmcp-agentic-seo-machine-readable-infrastructure',
        destination: '/blog/google-business-profile-map-pack-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/nextjs-16-ai-coding-agents',
        destination: '/blog/why-nextjs-beats-wordpress-jackson-ms',
        permanent: true,
      },
      {
        source: '/blog/production-ai-orchestration-multi-model-workflows',
        destination: '/custom-applications',
        permanent: true,
      },

      // 7. Soft 404 Renamed Blog Redirects
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
