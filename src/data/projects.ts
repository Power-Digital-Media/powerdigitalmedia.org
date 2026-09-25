export interface ProjectIntegration {
    title: string;
    description: string;
    badge: string;
    image: string;
}

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
    features: string[];
    link?: string;
    netlifyUrl?: string;
    glowColor?: string;
    metricBadge?: string;
    integrations?: ProjectIntegration[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        stars?: number;
        source?: "Google" | "Facebook" | "BBB";
    };
}

export const projects: Project[] = [
    {
        id: "born-again-roofing",
        title: "Born Again Roofing",
        description: "A fast, modern website built for a top-rated Brandon roofer. Features our proprietary PinDrop™ app so their crew can drop job site pins, upload before/after photos, and automatically collect 5-star Google reviews from customers.",
        image: "/portfolio/born-again-roofing.webp",
        tags: ["Roofing & Remodeling", "PinDrop™ Field App", "Google Maps SEO"],
        client: "Born Again Remodeling & Roofing LLC",
        year: "2026",
        objective: "Turn completed roofing jobs into automated Google search rankings and inbound phone calls.",
        features: ["Sub-second mobile loading", "Live PinDrop™ project map", "Automated 5-star review requests"],
        netlifyUrl: "https://bornagainroofing.com",
        glowColor: "234, 179, 8",
        metricBadge: "99+ Live Job Pins"
    },
    {
        id: "tbeaux",
        title: "T'Beaux's Seafood & Catering",
        description: "A high-traffic restaurant, catering, and online ordering website for Clinton's favorite Cajun spot. Features a custom menu with direct Square SDK payment processing (zero redirect), live daily crawfish boil price tracker, and an interactive catering feast calculator.",
        image: "/portfolio/tbeauxs.webp",
        tags: ["Restaurant & Catering", "Square SDK In-App Checkout", "Live Crawfish Price Tracker", "Catering Calculator"],
        client: "T'Beaux's 54 Crawfish & Catering LLC",
        year: "2026",
        objective: "Streamline daily crawfish price updates and enable frictionless in-app mobile ordering powered by the Square SDK without redirecting customers off-site.",
        features: [
            "Native Square SDK in-app ordering (zero external redirects)",
            "Live daily crawfish price & seasonal availability updater",
            "Interactive Cajun Feast catering calculator",
            "1-tap phone ordering & Google Maps directions"
        ],
        netlifyUrl: "https://tbeauxs.com",
        glowColor: "239, 68, 68",
        metricBadge: "Square SDK + Live Price Sync",
        integrations: [
            {
                title: "Custom Interactive Menu & Square SDK In-App Checkout",
                description: "Built a fully tailored Cajun menu with platters, baskets, and fixin's directly integrated into Square SDK. Customers customize orders, choose pickup times, and pay securely on tbeauxs.com without ever being kicked out to a generic third-party Square storefront.",
                badge: "Square SDK In-App Ordering",
                image: "/portfolio/tbeauxs-square-menu.webp"
            },
            {
                title: "The Cajun Feast Catering Calculation Engine",
                description: "An interactive guest planning engine that calculates accurate crawfish poundage, jumbo shrimp, smoked sausage, and corn/potato requirements for corporate events and backyard boils.",
                badge: "Custom Event Logic",
                image: "/portfolio/tbeauxs-feast-planner.webp"
            }
        ]
    },
    {
        id: "pindrop-saas",
        title: "PinDrop™ Contractor Tech",
        description: "Our proprietary mobile tool created exclusively for contractors. Workers take a photo on the job site and drop a GPS pin on their phone. PinDrop™ automatically puts the job on the website map, syncs with Google, and texts the client for a review.",
        image: "/portfolio/growth-engine-real.webp",
        mobileImage: "/portfolio/Power_Digial_Growth_mobile.webp",
        tags: ["Proprietary Tool", "Job Site GPS Pins", "Google Review Automation"],
        client: "Power Digital Media Exclusive",
        year: "2026",
        objective: "Automate neighborhood-level Google ranking and review collection right from field workers' phones.",
        features: ["1-tap phone pin drops", "Geotagged job photos", "Automated SMS review requests"],
        netlifyUrl: "/pindrop",
        glowColor: "6, 182, 212",
        metricBadge: "Automated Google Maps SEO"
    },
    {
        id: "geaux-pro-outdoors",
        title: "Geaux Pro Outdoors",
        description: "A heavy-duty equipment and land clearing site built for commercial excavation, pond construction, and dirt hauling across Central Mississippi and the Delta.",
        image: "/portfolio/geaux-pro-outdoors.webp",
        tags: ["Land Clearing & Hauling", "Dirt Work", "Instant Quote Engine"],
        client: "Geaux Pro Outdoors LLC",
        year: "2026",
        objective: "Showcase heavy equipment capabilities and generate qualified commercial hauling and clearing leads.",
        features: ["Instant hauling quote engine", "Heavy machinery showcases", "PinDrop™ verified job map"],
        netlifyUrl: "https://msdirt.com",
        glowColor: "212, 175, 55",
        metricBadge: "Commercial Hauling Leads",
        testimonial: {
            quote: "Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented. I highly recommend!!!",
            author: "Scott Lowery",
            role: "Owner, Geaux Pro Outdoors (Bentonia, MS)",
            stars: 5,
            source: "Google"
        }
    },
    {
        id: "lungrins-lawncare",
        title: "Lungrin's Lawncare",
        description: "A crisp, mobile-first website for a premier property maintenance service in Flora and Pocahontas. Highlights precision mowing, pine straw installation, and scheduled PinDrop™ project mapping.",
        image: "/portfolio/lungrins-lawncare.webp",
        tags: ["Lawn Care & Property Maintenance", "Flora & Pocahontas MS", "PinDrop™ Field App", "Fast Quote Forms"],
        client: "Lungrin's Lawncare LLC",
        year: "2026",
        objective: "Make it effortless for homeowners and commercial properties to request instant maintenance quotes and showcase completed neighborhood work.",
        features: ["PinDrop™ neighborhood project mapping (Deploying)", "Clean mobile quote form", "Local service area coverage", "Direct click-to-call phone button"],
        metricBadge: "PinDrop™ Deploying",
        netlifyUrl: "https://lungrinslawncare.com",
        glowColor: "16, 185, 129"
    },
    {
        id: "the-local-guide-ms",
        title: "The Local Guide MS",
        description: "A Mississippi food and travel media hub featuring 4K POV video tours recorded with smart glasses, highlighting authentic local diners, backroads, and small businesses.",
        image: "/portfolio/the-local-guide-ms.webp",
        tags: ["Local Food & Travel", "YouTube POV Episodes", "Interactive Diner Map"],
        client: "The Local Guide MS Media",
        year: "2026",
        objective: "Promote Mississippi small businesses and local diners through engaging video storytelling.",
        features: ["4K POV video player", "Interactive Mississippi diner map", "Community suggestion portal"],
        netlifyUrl: "https://thelocalguidems.com",
        glowColor: "245, 158, 11"
    },
    {
        id: "simmons-memorial",
        title: "Church 244 & Simmons Memorial",
        description: "Warm, welcoming digital portals for Central Mississippi ministries. Features frictionless online giving, mobile-friendly livestreaming, and community event calendars.",
        image: "/portfolio/simmons-memorial-real.webp",
        mobileImage: "/portfolio/Simmons_Memorial_mobile.webp",
        tags: ["Faith & Community", "Mobile Online Giving", "Sermon Livestreams"],
        client: "Church 244 & Simmons Memorial",
        year: "2026",
        objective: "Help local ministries connect with their members and accept online donations easily on mobile devices.",
        features: ["1-tap secure online giving", "Sermon streaming archive", "Community event calendar"],
        netlifyUrl: "https://church244.com",
        glowColor: "59, 130, 246",
        metricBadge: "Online Giving & Streaming",
        testimonial: {
            quote: "Power Digital Media is my go to company for all of my media needs, including our church website. He was very attentive to detail and met or surpassed every single request. Also, after the site was built, every update or change I needed, he was on top of it very quickly and with excellence. I highly recommend Power Digital Media for any and all your media needs.",
            author: "Josh Watts",
            role: "Pastor, Church 244 (Jackson, MS)",
            stars: 5,
            source: "Facebook"
        }
    },
    {
        id: "in-his-grip",
        title: "In His Grip Ministries",
        description: "A fast, inspiring outreach portal built to expand faith events, community programs, and local ministry initiatives across Central Mississippi.",
        image: "/portfolio/in-his-grip.webp",
        tags: ["Faith & Community", "Ministry Outreach", "Event Coordination"],
        client: "In His Grip Ministries",
        year: "2026",
        objective: "Build an accessible, high-speed digital hub for ministry outreach and community engagement.",
        features: ["Clean mobile storytelling layout", "Event coordination tools", "Direct outreach inquiry portal"],
        netlifyUrl: "https://in-his-grip.com",
        glowColor: "34, 197, 94",
        metricBadge: "Faith Outreach & Community",
        testimonial: {
            quote: "I met Damein a few weeks ago and had no idea that God was lining me up for us to have a premium website. Damein was made to do this and does everything with a spirit of excellence. He’s professional and reasonable. Looking for a web guy he is him.",
            author: "Jeff Johnson",
            role: "In His Grip Ministries",
            stars: 5,
            source: "Google"
        }
    }
];
