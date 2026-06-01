export interface LiveSite {
    id: string;
    title: string;
    domain: string;
    url: string;
    deployType: 'Next.js' | 'Standard HTML/JS';
    category: 'Local Business' | 'E-Commerce' | 'Faith & Community' | 'Agency';
    publishedAt: string;
    description: string;
    techStack: string[];
    performanceScore: number;
    accessibilityScore: number;
    seoScore: number;
    bestPracticesScore: number;
    glowColor: string; // Tailwind glow RGB values
    image?: string; // Optional screenshot path
}

export const liveSites: LiveSite[] = [
    {
        id: "all-things-new",
        title: "All Things New",
        domain: "allthingsnewpreview.netlify.app",
        url: "https://allthingsnewpreview.netlify.app",
        deployType: "Next.js",
        category: "Faith & Community",
        publishedAt: "May 2026",
        description: "A cinematic, responsive faith-based platform engineered to scale outreach and community restoration through video, podcast, and media hubs.",
        techStack: ["Next.js", "Tailwind CSS", "GSAP Cinematic", "Netlify Edge"],
        performanceScore: 98,
        accessibilityScore: 99,
        seoScore: 100,
        bestPracticesScore: 98,
        glowColor: "34, 197, 94", // Neon Green
        image: "/portfolio/all-things-new-real.webp"
    },
    {
        id: "ms-dirt",
        title: "MS Dirt & Gravel",
        domain: "www.msdirt.com",
        url: "https://www.msdirt.com",
        deployType: "Next.js",
        category: "Local Business",
        publishedAt: "Published 2 hours ago",
        description: "Blazing-fast commercial landing application for dirt, gravel, and heavy equipment logistics. Features frictionless click-to-quote conversion funnels.",
        techStack: ["Next.js", "Tailwind CSS", "Netlify Serverless", "Lighthouse Optimized"],
        performanceScore: 97,
        accessibilityScore: 98,
        seoScore: 100,
        bestPracticesScore: 97,
        glowColor: "234, 179, 8" // Yellow / Amber
    },
    {
        id: "tbeauxs",
        title: "Tbeaux's Crawfish",
        domain: "tbeauxs.com",
        url: "https://tbeauxs.com",
        deployType: "Standard HTML/JS",
        category: "Local Business",
        publishedAt: "Published 19 hours ago",
        description: "High-visibility B2B local business portal and consumer menu gallery for central Mississippi's premium seafood catering client.",
        techStack: ["HTML5", "CSS3 Grid", "Vanilla JS", "Netlify Hosting"],
        performanceScore: 98,
        accessibilityScore: 96,
        seoScore: 98,
        bestPracticesScore: 96,
        glowColor: "239, 68, 68" // Bright Red
    },
    {
        id: "powered-by-peptides",
        title: "Powered By Peptides",
        domain: "poweredbypeptides.store",
        url: "https://poweredbypeptides.store",
        deployType: "Next.js",
        category: "E-Commerce",
        publishedAt: "Published 2 months ago",
        description: "Fast-loading, product-focused supplement showroom built with structured search integrations and fluid transaction-focused flows.",
        techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Secure Checkout"],
        performanceScore: 96,
        accessibilityScore: 98,
        seoScore: 99,
        bestPracticesScore: 96,
        glowColor: "168, 85, 247" // Purple
    },
    {
        id: "pastors-provision",
        title: "Pastor's Provision",
        domain: "pastorsprovision.com",
        url: "https://pastorsprovision.com",
        deployType: "Next.js",
        category: "Faith & Community",
        publishedAt: "Published 6 days ago",
        description: "Modern gateway for regional pastoral care programs, featuring clean donation pathways, resource indexing, and high accessibility compliance.",
        techStack: ["Next.js", "Tailwind CSS", "Semantic Schema", "Fluid Typography"],
        performanceScore: 99,
        accessibilityScore: 100,
        seoScore: 98,
        bestPracticesScore: 99,
        glowColor: "59, 130, 246" // Vibrant Blue
    },
    {
        id: "in-his-grip",
        title: "In His Grip Ministries",
        domain: "in-his-grip.com",
        url: "https://in-his-grip.com",
        deployType: "Standard HTML/JS",
        category: "Faith & Community",
        publishedAt: "Published on May 26",
        description: "High-performance ministry homepage designed to maximize outreach and coordinate localized faith events in central Mississippi.",
        techStack: ["HTML5", "Tailwind CSS", "Vanilla JS", "Netlify Speed Hosting"],
        performanceScore: 99,
        accessibilityScore: 98,
        seoScore: 100,
        bestPracticesScore: 98,
        glowColor: "34, 197, 94" // Green
    },
    {
        id: "church-244",
        title: "Church 244",
        domain: "church244.com",
        url: "https://church244.com",
        deployType: "Standard HTML/JS",
        category: "Faith & Community",
        publishedAt: "Published on Apr 15",
        description: "Streamlined faith portal designed for rapid mobile interaction, enabling seamless congregation check-ins, sermon playback, and updates.",
        techStack: ["HTML5", "Vanilla JS", "Tailwind CSS", "Netlify Edge"],
        performanceScore: 97,
        accessibilityScore: 99,
        seoScore: 98,
        bestPracticesScore: 97,
        glowColor: "6, 182, 212" // Cyan
    },
    {
        id: "blacksheep-recovery",
        title: "Black Sheep Recovery",
        domain: "blacksheeprecoverywarfare.com",
        url: "https://blacksheeprecoverywarfare.com",
        deployType: "Standard HTML/JS",
        category: "Faith & Community",
        publishedAt: "Published on Mar 12",
        description: "Tactical B2B/outreach system designed for rapid loading under low bandwidth. Intercepts local crisis searches with semantic entity architecture.",
        techStack: ["HTML5", "Tailwind CSS", "SEO Entity Schema", "Responsive Grid"],
        performanceScore: 99,
        accessibilityScore: 98,
        seoScore: 100,
        bestPracticesScore: 99,
        glowColor: "249, 115, 22", // Orange
        image: "/portfolio/Black_Sheep_Recovery_Warfare.webp"
    },
    {
        id: "simmons-memorial",
        title: "Simmons Memorial",
        domain: "simmonsmemorial.org",
        url: "https://simmonsmemorial.org",
        deployType: "Standard HTML/JS",
        category: "Faith & Community",
        publishedAt: "Published on Feb 8",
        description: "Elegant, highly accessible faith community landing page preserving historic legacy and presenting clean informational paths.",
        techStack: ["HTML5", "CSS3 Flexbox", "Vanilla JS", "A11y Compliant"],
        performanceScore: 98,
        accessibilityScore: 99,
        seoScore: 98,
        bestPracticesScore: 98,
        glowColor: "99, 102, 241", // Indigo
        image: "/portfolio/simmons-memorial-real.webp"
    },
    {
        id: "power-digital-media",
        title: "Power Digital Media",
        domain: "powerdigitalmedia.org",
        url: "https://powerdigitalmedia.org",
        deployType: "Next.js",
        category: "Agency",
        publishedAt: "Published 16 minutes ago",
        description: "Blistering-fast agency portal representing Power Digital's core Next.js architecture, digital marketing integrations, and local SEO dominance.",
        techStack: ["Next.js 16", "Tailwind CSS v4", "Lucide React", "Capsule CRM Sync"],
        performanceScore: 99,
        accessibilityScore: 100,
        seoScore: 100,
        bestPracticesScore: 99,
        glowColor: "6, 182, 212", // Cyan
        image: "/portfolio/growth-engine-real.webp"
    }
];
