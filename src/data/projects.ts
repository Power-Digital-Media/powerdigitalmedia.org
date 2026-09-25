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
    embedBlocked?: boolean;
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
        title: "Born Again Roofing & Remodeling",
        description: "A high-velocity digital platform and mobile field engine built for a top-rated Brandon roofer. Replaced a slow legacy site with our proprietary PinDrop™ GPS system, letting field crews drop project pins right from job sites to automatically boost Google rankings, sync leads to Capsule CRM, and capture 5-star customer reviews.",
        image: "/portfolio/bornagain-hero-16-10.webp",
        tags: ["Roofing & Remodeling", "PinDrop™ Field App", "Capsule CRM", "Google Maps SEO", "Transpond SMS"],
        client: "Born Again Remodeling & Roofing LLC",
        year: "2026",
        objective: "Turn completed roofing jobs into automated Google search rankings, inbound quote requests, and instant 5-star social proof.",
        features: [
            "Fast mobile loading (< 2–3s on 4G/5G)",
            "Proprietary PinDrop™ live GPS job pin mapping",
            "Instant roof inspection & damage estimate form",
            "Automated post-job SMS 5-star review workflow"
        ],
        netlifyUrl: "https://bornagainroofing.com",
        glowColor: "234, 179, 8",
        metricBadge: "99+ Live Job Pins",
        integrations: [
            {
                title: "PinDrop™ Field App & Interactive Job Map",
                description: "Crews drop real-time geotagged pins directly from field trucks, instantly updating the public website map with completed jobs and neighborhood social proof.",
                badge: "Proprietary GPS Field Tech",
                image: "/portfolio/bornagain-pindrop-map.webp"
            },
            {
                title: "Instant Roof Inspection & CRM Ingestion",
                description: "High-converting multi-step quote form that captures customer address and storm damage details, automatically routing leads into Capsule CRM stages.",
                badge: "Capsule CRM Telemetry",
                image: "/portfolio/bornagain-quote-form.webp"
            },
            {
                title: "Automated 5-Star Review & Warranty Flow",
                description: "Multi-stage automated workflow sending post-completion warranty documents and requesting 5-star Google reviews via automated SMS.",
                badge: "Transpond Automation",
                image: "/portfolio/bornagain-reviews.webp"
            },
            {
                title: "Rank #1 Local Service Schema Engine",
                description: "Structured JSON-LD coordinates for Jackson, Brandon, Pearl, and Madison capturing local search authority across Central Mississippi.",
                badge: "Google Local Maps Pack",
                image: "/portfolio/bornagain-service-areas.webp"
            }
        ]
    },
    {
        id: "tbeaux",
        title: "T'Beaux's Seafood & Catering",
        description: "A high-traffic restaurant, catering, and online ordering website for Clinton's favorite Cajun spot. Features a custom menu with direct Square SDK payment processing (zero redirect), live daily crawfish boil price tracker, and an interactive catering feast calculator.",
        image: "/portfolio/tbeauxs-hero.webp",
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
                title: "Square SDK In-App Checkout & Instant Payment",
                description: "Built a fully tailored checkout flow directly integrated with Square SDK. Customers customize orders, choose pickup times, and pay securely on tbeauxs.com without ever being redirected to a generic third-party store.",
                badge: "Square SDK In-App Ordering",
                image: "/portfolio/tbeauxs-checkout-user-v2.webp"
            },
            {
                title: "Custom Interactive Cajun Menu Engine",
                description: "Custom digital menu with platters, baskets, and fixin's. Customers can pick sizes, customize sides, and calculate totals in real time.",
                badge: "Custom Menu Engine",
                image: "/portfolio/tbeauxs-menu-user-v2.webp"
            },
            {
                title: "The Cajun Feast Catering Calculation Engine",
                description: "An interactive guest planning engine that calculates accurate crawfish poundage, jumbo shrimp, smoked sausage, and corn/potato requirements for corporate events and backyard boils.",
                badge: "Custom Event Logic",
                image: "/portfolio/tbeauxs-planner-user-v2.webp"
            },
            {
                title: "DoorDash Fleet Delivery Dispatch",
                description: "Seamless delivery routing directly integrated into local fleet logistics for fast hot seafood delivery straight to Clinton customers.",
                badge: "Fleet Dispatch",
                image: "/portfolio/tbeauxs-delivery-user-v2.webp"
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
        description: "Warm, welcoming digital portals engineered for Central Mississippi ministries. Features frictionless online giving, mobile-friendly livestreaming, youth ministry hubs, and dynamic community event calendars.",
        image: "/portfolio/church244-hero.webp",
        tags: ["Faith & Community", "Mobile Online Giving", "Sermon Livestreams", "Church Center Sync", "Youth Ministry"],
        client: "Church 244 & Simmons Memorial",
        year: "2026",
        objective: "Help local ministries connect with their members, livestream messages, and accept online donations effortlessly on mobile devices.",
        features: [
            "1-tap secure online giving",
            "YouTube Live sermon streaming archive",
            "Church Center community event calendar",
            "Dedicated youth ministry hub (Ages 13–19)"
        ],
        netlifyUrl: "https://church244.com",
        embedBlocked: true,
        glowColor: "59, 130, 246",
        metricBadge: "Online Giving & Streaming",
        testimonial: {
            quote: "Power Digital Media is my go to company for all of my media needs, including our church website. He was very attentive to detail and met or surpassed every single request. Also, after the site was built, every update or change I needed, he was on top of it very quickly and with excellence. I highly recommend Power Digital Media for any and all your media needs.",
            author: "Josh Watts",
            role: "Pastor, Church 244 (Jackson, MS)",
            stars: 5,
            source: "Facebook"
        },
        integrations: [
            {
                title: "Sermon Livestream Archive (YouTube Live)",
                description: "Integrated broadcast video archive allowing members to stream Sunday messages and series without intrusive ads or buffering.",
                badge: "High-Definition Video",
                image: "/portfolio/church244-sermons-user-v2.webp"
            },
            {
                title: "Community Calendar (Church Center Sync)",
                description: "Live event calendar integrated with Church Center for seamless registration for Youth Nights, Sunday worship, and weekly Bible studies.",
                badge: "Church Center Sync",
                image: "/portfolio/church244-events-user-v2.webp"
            },
            {
                title: "Church 244 Youth Ministry Hub",
                description: "Dedicated teen ministry hub featuring weekly Thursday 6:30 PM worship schedules, Bible study groups, and community social sync.",
                badge: "Ages 13–19 Community",
                image: "/portfolio/church244-youth-user-v2.webp"
            },
            {
                title: "1-Tap Secure Online Giving Gateway",
                description: "Frictionless tithe and donation processing engineered for rapid smartphone giving during services with instant receipts.",
                badge: "Secure Giving Gateway",
                image: "/portfolio/church244-giving.webp"
            }
        ]
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
    },
    {
        id: "blacksheep-recovery",
        title: "Black Sheep Recovery Warfare",
        description: "A high-impact media, podcast, and faith recovery platform built for a bold outreach ministry. Engineered with a custom video/audio episode player, integrated apparel & tactical merch store, direct recurring donation processing, and an emergency crisis resource directory.",
        image: "/portfolio/blacksheep-hero.webp",
        tags: ["Faith & Recovery", "Podcast Streaming Engine", "Custom Merch Store", "Direct Donor Portal", "Crisis Resources"],
        client: "Black Sheep Recovery Warfare",
        year: "2026",
        objective: "Provide a raw, authentic digital battleground for addiction recovery, podcast broadcasting, and community support.",
        features: [
            "Episode streaming player with Apple/Spotify sync",
            "Custom tactical merch and apparel store",
            "Frictionless recurring donation & sponsorship system",
            "Mississippi addiction crisis resource directory"
        ],
        netlifyUrl: "https://blacksheeprecoverywarfare.com",
        glowColor: "249, 115, 22",
        metricBadge: "Podcast & Merch Ecosystem",
        integrations: [
            {
                title: "Podcast Broadcasting & Episode Archive",
                description: "Seamless video/audio episode library with detailed show notes, timestamps, and one-tap streaming across Spotify, Apple Podcasts, and YouTube.",
                badge: "Media & Podcast Engine",
                image: "/portfolio/blacksheep-episodes.webp"
            },
            {
                title: "Custom Tactical Merch & Apparel Store",
                description: "Direct e-commerce storefront supporting size selection, product showcases, secure in-app checkout, and inventory fulfillment.",
                badge: "Custom E-Commerce",
                image: "/portfolio/blacksheep-merch.webp"
            },
            {
                title: "Direct Donation & Ministry Sponsorship Gateway",
                description: "Frictionless recurring and one-time donor portal designed to fund recovery outreach, community rallies, and crisis aid without high processing overhead.",
                badge: "Direct Giving Gateway",
                image: "/portfolio/blacksheep-donate.webp"
            },
            {
                title: "Emergency Crisis & Recovery Resource Directory",
                description: "Instant-access helpline directory and vetted recovery center roadmaps connecting individuals in active addiction to immediate help.",
                badge: "Crisis Support Network",
                image: "/portfolio/blacksheep-resources.webp"
            }
        ]
    }
];
