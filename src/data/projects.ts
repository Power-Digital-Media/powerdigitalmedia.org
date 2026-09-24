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
}

export const projects: Project[] = [
    {
        id: "born-again-roofing",
        title: "Born Again Roofing",
        description: "A fast, modern website built for a top-rated Brandon roofer. Features our proprietary PinDrop™ app so their crew can drop job site pins, upload before/after photos, and automatically collect 5-star Google reviews from customers.",
        image: "/portfolio/born-again-roofing.jpg",
        tags: ["Roofing & Remodeling", "PinDrop™ Field App", "Google Maps SEO"],
        client: "Born Again Remodeling & Roofing LLC",
        year: "2026",
        objective: "Turn completed roofing jobs into automated Google search rankings and inbound phone calls.",
        features: ["Sub-second mobile loading", "Live PinDrop™ project map", "Automated 5-star review requests"],
        netlifyUrl: "https://bornagainroofing.com",
        glowColor: "234, 179, 8"
    },
    {
        id: "tbeaux",
        title: "T'Beaux's Seafood & Catering",
        description: "A high-traffic restaurant and catering website for Clinton's favorite Cajun spot. Includes a live daily crawfish boil price tracker, digital menus, and an interactive catering feast calculator.",
        image: "/portfolio/tbeauxs.webp",
        tags: ["Restaurant & Catering", "Live Price Tracker", "Catering Calculator"],
        client: "T'Beaux's 54 Crawfish & Catering LLC",
        year: "2026",
        objective: "Streamline daily crawfish price updates and capture high-volume catering bookings online.",
        features: ["Live crawfish price updater", "Interactive catering planner", "1-tap phone ordering & Google Maps directions"],
        netlifyUrl: "https://tbeauxs.com",
        glowColor: "239, 68, 68"
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
        glowColor: "6, 182, 212"
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
        glowColor: "212, 175, 55"
    },
    {
        id: "lungrins-lawncare",
        title: "Lungrin's Lawncare",
        description: "A crisp, mobile-first website for a premier property maintenance service in Flora and Pocahontas. Highlights precision mowing, pine straw installation, and seasonal yard cleanups.",
        image: "/portfolio/lungrins-lawncare.jpg",
        tags: ["Lawn Care & Property Maintenance", "Flora & Pocahontas MS", "Fast Quote Forms"],
        client: "Lungrin's Lawncare LLC",
        year: "2026",
        objective: "Make it effortless for homeowners and commercial properties to request instant maintenance quotes.",
        features: ["Clean mobile quote form", "Local neighborhood coverage map", "Direct click-to-call phone button"],
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
        glowColor: "59, 130, 246"
    }
];
