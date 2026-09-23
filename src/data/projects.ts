export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    mobileImage?: string;
    tags: string[];
    client: string;
    year: string;
    objective: string;
    engineering: string[];
    protocol: string[];
    link?: string;
    netlifyUrl?: string;
    glowColor?: string; // Add brand-matched ambient glow for scroll intersection
}

export const projects: Project[] = [
    {
        id: "born-again-roofing",
        title: "Born Again Roofing",
        description: "Heavy-Duty Contractor Engine. Custom Next.js platform integrated with proprietary PinDrop™ mapping to sync real-time job site pins, storm repairs, and automatic review requests directly to Google.",
        image: "/portfolio/born-again-roofing.jpg",
        tags: ["Contractor", "PinDrop™", "Local SEO"],
        client: "Born Again Remodeling & Roofing LLC",
        year: "2026",
        objective: "Turn completed roofing and remodeling projects into automated Google search authority and inbound calls.",
        engineering: ["Next.js App Router", "PinDrop™ Field Sync", "Dynamic Local Geo-Schema"],
        protocol: ["High-Velocity Load", "Job Site Pin Drops", "Automated SMS Reviews"],
        netlifyUrl: "https://bornagainroofing.com",
        glowColor: "234, 179, 8" // Gold/Amber
    },
    {
        id: "tbeaux",
        title: "T'Beaux's Seafood & Catering",
        description: "Cajun Culinary Command Hub. High-traffic digital restaurant engine featuring live daily crawfish boil price tracking, digital menus, and automated catering feast planning in Clinton, MS.",
        image: "/portfolio/tbeauxs.webp",
        tags: ["Restaurant", "Live Tracker", "Catering Engine"],
        client: "T'Beaux's 54 Crawfish & Catering LLC",
        year: "2026",
        objective: "Streamline daily boil price updates, local search pack dominance, and high-volume catering bookings.",
        engineering: ["Real-time Price Tracker", "Interactive Feast Calculator", "Local 3-Pack Schema"],
        protocol: ["Tactile Cajun Brand", "Instant Phone Routing", "Google Maps Integration"],
        netlifyUrl: "https://tbeauxs.com",
        glowColor: "239, 68, 68" // Crimson Red
    },
    {
        id: "pindrop-saas",
        title: "PinDrop™ Field Engine",
        description: "Proprietary Field-to-Google Automation. The exclusive secret weapon installed for PDM contractor clients: drop a pin on the job site to instantly sync verified photos, exact GPS coordinates, and automated review requests to Google.",
        image: "/portfolio/growth-engine-real.webp",
        mobileImage: "/portfolio/Power_Digial_Growth_mobile.webp",
        tags: ["Proprietary SaaS", "Field Automation", "Google Sync"],
        client: "Power Digital Media Exclusive",
        year: "2026",
        objective: "Automate neighborhood-level SEO dominance and 5-star review acquisition directly from field workers' smartphones.",
        engineering: ["GPS Coordinate Processing", "Live Mapbox/Leaflet Layer", "Automated SMS/Email Gateway"],
        protocol: ["One-Tap Job Submission", "Exif Photo Geotagging", "Real-Time Google Schema"],
        netlifyUrl: "https://pindropsaas.netlify.app",
        glowColor: "6, 182, 212" // Electric Cyan
    },
    {
        id: "geaux-pro-outdoors",
        title: "Geaux Pro Outdoors",
        description: "Excavation & Earthmoving Portal. Commercial land clearing, pond construction, and site preparation platform powered by PinDrop™ job site verification across Central Mississippi & The Delta.",
        image: "/portfolio/geaux-pro-outdoors.webp",
        tags: ["Heavy Machinery", "PinDrop™", "Site Prep"],
        client: "Geaux Pro Outdoors LLC",
        year: "2026",
        objective: "Showcase heavy equipment operations with verified field proofs and high-converting commercial quote funnels.",
        engineering: ["Next.js Architecture", "PinDrop™ Verification Layer", "Service Area Mapping"],
        protocol: ["Industrial Gold Palette", "Equipment Showcase", "High-Converting Quote Funnel"],
        netlifyUrl: "https://msdirt.com",
        glowColor: "212, 175, 55" // Metallic Gold
    },
    {
        id: "the-local-guide-ms",
        title: "The Local Guide MS",
        description: "Mississippi Food & Travel Media Engine. High-definition video storytelling hub and interactive diner guide connecting local food culture, YouTube episodes, and Google Maps Local Guide routes.",
        image: "/portfolio/the-local-guide-ms.webp",
        tags: ["Media Brand", "YouTube Hub", "Interactive Map"],
        client: "The Local Guide MS Media",
        year: "2026",
        objective: "Highlight Mississippi local diners, road trips, and small businesses with immersive media and custom regional maps.",
        engineering: ["YouTube Video Engine", "Interactive Regional Map", "Ray-Ban Meta Media Workflow"],
        protocol: ["Southern Amber Aesthetic", "Community Submission Portal", "High-Engagement UX"],
        netlifyUrl: "https://thelocalguidems.com",
        glowColor: "245, 158, 11" // Warm Amber
    },
    {
        id: "simmons-memorial",
        title: "Simmons Memorial & Church244",
        description: "Faith & Community Gateway. Modern community portals dedicated to spiritual growth, online giving, livestream access, and local outreach in Central Mississippi.",
        image: "/portfolio/simmons-memorial-real.webp",
        mobileImage: "/portfolio/Simmons_Memorial_mobile.webp",
        tags: ["Church Portals", "Online Giving", "Community"],
        client: "Simmons Memorial & Church 244",
        year: "2026",
        objective: "Deliver accessible, modern digital homes for ministries to connect with members and receive donations seamlessly.",
        engineering: ["High-Accessibility Protocol", "Multi-Channel Giving Gateway", "Sermon Media Sync"],
        protocol: ["Dignified Navy Palette", "Mobile-First Livestream", "Community Events Engine"],
        netlifyUrl: "https://church244.com",
        glowColor: "59, 130, 246" // Royal Blue
    }
];
