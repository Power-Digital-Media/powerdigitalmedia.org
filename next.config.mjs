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
  // Target modern browsers only (no legacy JavaScript polyfills per PageSpeed Insights)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    nextScriptWorkers: true,
    optimizeCss: true,
    cssChunking: 'strict',
  },
  // Use modern browserslist
};

export default nextConfig;
