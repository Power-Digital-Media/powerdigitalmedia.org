export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    client: string;
    year: string;
    objective: string;
    engineering: string[];
    protocol: string[];
    link?: string;
    netlifyUrl?: string;
}

export const projects: Project[] = [
    {
        id: "all-things-new",
        title: "All Things New",
        description: "Restoration Begins Here. A cinematic faith-based ecosystem building a legacy of restoration in Central Mississippi.",
        image: "/portfolio/all-things-new-real.webp",
        tags: ["Architecture", "Media Hub", "Church"],
        client: "All Things New Ministries",
        year: "2026",
        objective: "Redefine ministry digital scaling through cinematic storytelling and community architecture.",
        engineering: ["Next.js 14 Core", "Cinematic Media Optimization", "Global CDN Distribution"],
        protocol: ["Tesla-Level Minimalism", "Glassmorphic Depth", "Gold-Tier Typography"],
        netlifyUrl: "https://allthingsnewpreview.netlify.app"
    },
    {
        id: "corner-pharmacy",
        title: "Corner Pharmacy",
        description: "The Pharmacy Reimagined. Modern healthcare meets old-fashioned care with free same-day delivery and clinical precision.",
        image: "/portfolio/corner-pharmacy-real.webp",
        tags: ["Healthcare", "E-Commerce", "Local Business"],
        client: "Corner Pharmacy Group",
        year: "2026",
        objective: "Bridge the gap between local clinical trust and high-end digital efficiency.",
        engineering: ["Secure HIPAA-Compliant Layer", "Rapid-Interaction Engine", "Semantic SEO Protocol"],
        protocol: ["Clinical Precision UI", "Teal-Accented Authority", "Clean Architectural Grids"],
        netlifyUrl: "https://corner-pharmacy-flora.netlify.app"
    },
    {
        id: "simmons-memorial",
        title: "Simmons Memorial",
        description: "Grace & Purpose. A modern faith community gateway dedicated to discovering God-given destiny in Flora, MS.",
        image: "/portfolio/simmons-memorial-real.webp",
        tags: ["Community", "Legacy", "Architecture"],
        client: "Simmons Memorial Baptist Church",
        year: "2026",
        objective: "Preserve legacy through a modern, high-tier digital gateway for the community.",
        engineering: ["High-Accessibility Protocol", "Content Management System", "Event Synchronization Layer"],
        protocol: ["Dignified Navy Palette", "Serene Background Depth", "Authoritative Typography"],
        netlifyUrl: "https://simmons-preview.netlify.app"
    },
    {
        id: "growth-engine",
        title: "Growth Engine",
        description: "Engineered Dominance. Multi-Model Growth Systems systematically scale winners and eliminate losers.",
        image: "/portfolio/growth-engine-real.webp",
        tags: ["Engineering", "SaaS", "Dashboard"],
        client: "Internal Protocol",
        year: "2026",
        objective: "Provide real-time architectural health and high-velocity conversion metrics.",
        engineering: ["Cyber-Grid Data Layer", "Real-Time Analytic Sync", "Next-Gen Edge Deployment"],
        protocol: ["Futuristic Cyan Accents", "Technical Data Visualization", "High-Authority Dashboard UI"],
        netlifyUrl: "https://powerdigitalgrowth.netlify.app" // Assuming this will fix to this
    }
];
