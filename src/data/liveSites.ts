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
        id: "born-again-roofing",
        title: "Born Again Roofing",
        domain: "bornagainroofing.com",
        url: "https://bornagainroofing.com",
        deployType: "Next.js",
        category: "Local Business",
        publishedAt: "Active Client",
        description: "Heavy-duty roofing and remodeling platform with proprietary PinDrop™ field mapping, storm repair workflows, and automated homeowner review routing.",
        techStack: ["Next.js", "Tailwind CSS", "PinDrop™ Engine", "Google Geo-Schema"],
        performanceScore: 98,
        accessibilityScore: 99,
        seoScore: 100,
        bestPracticesScore: 98,
        glowColor: "234, 179, 8", // Gold/Amber
        image: "/portfolio/born-again-roofing.jpg"
    },
    {
        id: "ms-dirt",
        title: "Geaux Pro Outdoors",
        domain: "www.msdirt.com",
        url: "https://www.msdirt.com",
        deployType: "Next.js",
        category: "Local Business",
        publishedAt: "Active Client",
        description: "Blazing-fast commercial site preparation and excavation landing application for Central Mississippi's elite contractor. Features click-to-quote conversion tunnels.",
        techStack: ["Next.js", "Tailwind CSS", "Netlify Serverless", "Lighthouse Optimized"],
        performanceScore: 97,
        accessibilityScore: 98,
        seoScore: 100,
        bestPracticesScore: 97,
        glowColor: "234, 179, 8", // Yellow / Amber
        image: "/portfolio/geaux-pro-outdoors.webp"
    },
    {
        id: "tbeauxs",
        title: "Tbeaux's Crawfish",
        domain: "tbeauxscrawfish.com",
        url: "https://tbeauxscrawfish.com",
        deployType: "Standard HTML/JS",
        category: "Local Business",
        publishedAt: "Active Client",
        description: "High-visibility B2B local business portal and consumer menu gallery with live daily crawfish boil price tracking and feast planning calculator in Clinton, MS.",
        techStack: ["React", "Vite", "CSS3 Grid", "Netlify Hosting"],
        performanceScore: 98,
        accessibilityScore: 96,
        seoScore: 98,
        bestPracticesScore: 96,
        glowColor: "239, 68, 68", // Bright Red
        image: "/portfolio/tbeauxs.webp"
    },
    {
        id: "lungrins-lawncare",
        title: "Lungrin's Lawncare",
        domain: "lungrinslawncare.com",
        url: "https://lungrinslawncare.com",
        deployType: "Next.js",
        category: "Local Business",
        publishedAt: "Active Client",
        description: "Lawn maintenance and landscaping digital presence with real-time PinDrop™ job site verification and neighborhood mapping.",
        techStack: ["Next.js", "Tailwind CSS", "PinDrop™ Layer", "Local SEO Schema"],
        performanceScore: 99,
        accessibilityScore: 98,
        seoScore: 100,
        bestPracticesScore: 98,
        glowColor: "34, 197, 94", // Green
        image: "/portfolio/growth-engine-real.webp"
    },
    {
        id: "the-local-guide-ms",
        title: "The Local Guide MS",
        domain: "thelocalguidems.com",
        url: "https://thelocalguidems.com",
        deployType: "Standard HTML/JS",
        category: "Local Business",
        publishedAt: "Active Media Brand",
        description: "Mississippi food and travel storytelling hub connecting POV diner videos, YouTube episodes, and Google Maps Local Guide routes.",
        techStack: ["HTML5", "Tailwind CSS", "YouTube API", "Interactive Map"],
        performanceScore: 99,
        accessibilityScore: 98,
        seoScore: 100,
        bestPracticesScore: 99,
        glowColor: "245, 158, 11", // Warm Amber
        image: "/portfolio/the-local-guide-ms.png"
    },
    {
        id: "pastors-provision",
        title: "Pastor's Provision",
        domain: "pastorsprovision.com",
        url: "https://pastorsprovision.com",
        deployType: "Next.js",
        category: "Faith & Community",
        publishedAt: "Live Portal",
        description: "Modern gateway for regional pastoral care programs, featuring clean donation pathways, church resource indexing, and high accessibility compliance.",
        techStack: ["Next.js", "Tailwind CSS", "Semantic Schema", "Fluid Typography"],
        performanceScore: 99,
        accessibilityScore: 100,
        seoScore: 98,
        bestPracticesScore: 99,
        glowColor: "59, 130, 246", // Vibrant Blue
        image: "/portfolio/pastors-provision.webp"
    },
    {
        id: "in-his-grip",
        title: "In His Grip Ministries",
        domain: "in-his-grip.com",
        url: "https://in-his-grip.com",
        deployType: "Standard HTML/JS",
        category: "Faith & Community",
        publishedAt: "Active Ministry",
        description: "High-performance ministry homepage designed to maximize outreach and coordinate localized faith events in central Mississippi.",
        techStack: ["HTML5", "Tailwind CSS", "Vanilla JS", "Netlify Speed Hosting"],
        performanceScore: 99,
        accessibilityScore: 98,
        seoScore: 100,
        bestPracticesScore: 98,
        glowColor: "34, 197, 94", // Green
        image: "/portfolio/in-his-grip.webp"
    },
    {
        id: "church-244",
        title: "Church 244",
        domain: "church244.com",
        url: "https://church244.com",
        deployType: "Standard HTML/JS",
        category: "Faith & Community",
        publishedAt: "Active Church",
        description: "Streamlined faith portal designed for rapid mobile interaction, enabling seamless congregation check-ins, sermon playback, and updates.",
        techStack: ["HTML5", "Vanilla JS", "Tailwind CSS", "Netlify Edge"],
        performanceScore: 97,
        accessibilityScore: 99,
        seoScore: 98,
        bestPracticesScore: 97,
        glowColor: "6, 182, 212", // Cyan
        image: "/portfolio/church-244.webp"
    },
    {
        id: "simmons-memorial",
        title: "Simmons Memorial",
        domain: "simmonsmemorial.org",
        url: "https://simmonsmemorial.org",
        deployType: "Standard HTML/JS",
        category: "Faith & Community",
        publishedAt: "Active Church",
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
        publishedAt: "Proprietary Hub",
        description: "Blistering-fast agency portal representing Power Digital's core Next.js architecture, PinDrop™ field automation, and local SEO dominance.",
        techStack: ["Next.js 16", "Tailwind CSS v4", "Lucide React", "Capsule CRM Sync"],
        performanceScore: 99,
        accessibilityScore: 100,
        seoScore: 100,
        bestPracticesScore: 99,
        glowColor: "6, 182, 212", // Cyan
        image: "/portfolio/growth-engine-real.webp"
    }
];
