export interface CityLocationData {
  slug: string;
  city: string;
  county: string;
  zipCodes: string[];
  coordinates: {
    lat: number;
    lng: number;
    display: string;
  };
  distanceFromHQ: string;
  heroTagline: string;
  marketSummary: string;
  corridors: string[];
  neighborhoods: string[];
  topTrades: string[];
  featuredProof: {
    clientName: string;
    category: string;
    summary: string;
    metric: string;
    portfolioHref: string;
    liveUrl: string;
  };
  faqs: {
    q: string;
    a: string;
  }[];
}

export const CENTRAL_MS_LOCATIONS: CityLocationData[] = [
  {
    slug: "jackson-ms",
    city: "Jackson",
    county: "Hinds County",
    zipCodes: ["39209", "39211", "39202", "39201", "39206", "39212"],
    coordinates: {
      lat: 32.2988,
      lng: -90.1848,
      display: "32.2988° N, 90.1848° W",
    },
    distanceFromHQ: "Headquartered Here • 2914 Cynthia Rd",
    heroTagline:
      "Homegrown Jackson Web Design, Google Map Pack SEO & Contractor Field Apps.",
    marketSummary:
      "Jackson is our home base. From established historic roofs and older HVAC/electrical systems in Fondren, Belhaven, and Eastover to commercial corridors along I-55 and I-20, Jackson buyers search on their phones and call the first trustworthy company in the Google 3-Pack.",
    corridors: [
      "I-55 North & Frontage Corridor",
      "I-20 Commercial & Industrial Belt",
      "Lakeland Dr / Medical District",
      "Cynthia Rd & Highway 49 North",
    ],
    neighborhoods: [
      "Fondren",
      "Belhaven",
      "Eastover",
      "Northeast Jackson",
      "West Jackson",
      "Oak Forest / Byram Border",
    ],
    topTrades: [
      "Storm Roof Repair & Full Replacements",
      "Emergency HVAC, Plumbing & Sewer Line Repair",
      "200A Electrical Panel & Generator Upgrades",
      "Commercial Property Maintenance & Local Commerce",
    ],
    featuredProof: {
      clientName: "Born Again Roofing & Remodeling",
      category: "Jackson Metro Contractor Growth Build",
      summary:
        "Custom sub-2-second Next.js website integrated with PinDrop™—showcasing 99+ verified roofing and exterior remodeling project pins across Jackson and surrounding suburbs.",
      metric: "99+ Live Metro Pins • 98/100 Speed",
      portfolioHref: "/portfolio/born-again-roofing",
      liveUrl: "https://bornagainroofing.com",
    },
    faqs: [
      {
        q: "Where is Power Digital Media located in Jackson, MS?",
        a: "Our headquarters is at 2914 Cynthia Rd, Jackson, MS 39209. When you work with us, you work directly with founder Damein Donald—never an out-of-state agency or call center.",
      },
      {
        q: "How do Jackson contractors beat bigger franchises on Google Maps?",
        a: "By pairing a fast custom Next.js website with real neighborhood proof. Using PinCam™ and PinDrop™, your crews log real jobs in Fondren, Belhaven, Northeast Jackson, and surrounding suburbs, triggering neighborhood schema and 5-star homeowner SMS reviews.",
      },
      {
        q: "Can we meet or talk directly by phone before starting?",
        a: "Absolutely. Call or text Damein directly at (601) 446-2393 or request a free 5-minute video breakdown of your current Google rankings.",
      },
    ],
  },
  {
    slug: "madison-ms",
    city: "Madison",
    county: "Madison County",
    zipCodes: ["39110", "39130"],
    coordinates: {
      lat: 32.4618,
      lng: -90.1154,
      display: "32.4618° N, 90.1154° W",
    },
    distanceFromHQ: "18 Minutes North of Jackson HQ",
    heroTagline:
      "Win High-Ticket Residential & Commercial Jobs Across Madison & Gluckstadt.",
    marketSummary:
      "Madison homeowners in Annandale, Reunion, Lake Caroline, and Gluckstadt expect premium craftsmanship—and they judge your business in two seconds by your website and Google reviews. Generic stock-photo templates lose five-figure roof, HVAC, and outdoor living bids in Madison every week.",
    corridors: [
      "Highway 463 / Main Street",
      "Bozeman Rd & Colony Crossing",
      "Gluckstadt Rd Industrial & Commercial Corridor",
      "I-55 North & Hoy Rd",
    ],
    neighborhoods: [
      "Annandale",
      "Reunion",
      "Lake Caroline",
      "Lost Rabbit",
      "Whisper Lake",
      "Gluckstadt & Flora Corridor",
    ],
    topTrades: [
      "Architectural Roof Replacements & Gutter Systems",
      "High-Efficiency Variable-Speed HVAC Replacements",
      "Outdoor Kitchens, Pools, Grading & Land Clearing",
      "Recurring Estate Lawn Care & Landscape Lighting",
    ],
    featuredProof: {
      clientName: "Geaux Pro Outdoors & Lungrin's Lawncare",
      category: "Madison County & Hwy 49 North Builds",
      summary:
        "We power Madison County and northern corridor contractors—from heavy dirt work, house pads, and land clearing (msdirt.com) to precision residential turf & pine straw routes (lungrinslawncare.com).",
      metric: "Sub-2s Mobile Load • Local Schema",
      portfolioHref: "/portfolio/geaux-pro-outdoors",
      liveUrl: "https://msdirt.com",
    },
    faqs: [
      {
        q: "How do I rank for 'Madison MS' searches if my shop is in Gluckstadt, Jackson, or Ridgeland?",
        a: "We engineer dedicated Madison service hubs reinforced by PinDrop™ GPS check-ins and customer reviews from real jobs completed in 39110 and 39130 subdivisions like Annandale and Reunion.",
      },
      {
        q: "Why does PinCam™ matter so much for Madison homeowners?",
        a: "High-value Madison homeowners love clean documentation. Sending a branded PinCam™ PDF inspection report with aligned before/after photos builds instant trust and closes larger estimates without price haggling.",
      },
      {
        q: "How fast does a new website launch for Madison businesses?",
        a: "Most custom contractor and local business builds go live in 7 to 14 business days.",
      },
    ],
  },
  {
    slug: "ridgeland-ms",
    city: "Ridgeland",
    county: "Madison County",
    zipCodes: ["39157"],
    coordinates: {
      lat: 32.4285,
      lng: -90.1323,
      display: "32.4285° N, 90.1323° W",
    },
    distanceFromHQ: "15 Minutes Northeast of Jackson HQ",
    heroTagline:
      "High-Speed Websites & Map Pack Authority for Ridgeland Contractors & Businesses.",
    marketSummary:
      "Connecting Highland Colony Parkway's corporate corridor with established neighborhoods and Ross Barnett Reservoir properties, Ridgeland blends commercial facility contracts with urgent residential service calls. Ranking in the 39157 Map Pack puts your company in front of both.",
    corridors: [
      "Highland Colony Parkway",
      "Lake Harbour Dr & Reservoir Crossing",
      "Highway 51 & Jackson St District",
      "County Line Rd Commercial Corridor",
    ],
    neighborhoods: [
      "Bridgewater",
      "Dinsmor",
      "Canterbury",
      "Windrush / Reservoir",
      "Old Agency Corridor",
      "Renaissance Area",
    ],
    topTrades: [
      "Commercial & Residential HVAC Maintenance",
      "Roof Leak Diagnostics, Coatings & Shingle Tear-Offs",
      "Kitchen/Bath Remodeling & Custom Exteriors",
      "B2B Facility Services, Medical & Local Retail",
    ],
    featuredProof: {
      clientName: "Born Again Roofing & Metro Service Pros",
      category: "39157 Map Pack & Field Proof",
      summary:
        "Active GPS job pins and neighborhood landing pages capturing residential remodeling, roof repairs, and exterior upgrades across Ridgeland and the Reservoir.",
      metric: "Verified 39157 Pins • 5.0★ Velocity",
      portfolioHref: "/portfolio/born-again-roofing",
      liveUrl: "https://bornagainroofing.com",
    },
    faqs: [
      {
        q: "Can you help our company win both residential and commercial work in Ridgeland?",
        a: "Yes. We structure separate, high-converting service silos for Highland Colony / commercial property managers and 39157 homeowners so each audience sees relevant proof and quote forms.",
      },
      {
        q: "Do you integrate CRM and automated SMS lead follow-up for Ridgeland offices?",
        a: "Yes—we connect Capsule CRM, Transpond automation, and instant SMS lead rescue so online inquiries get an automatic text response in under 20 seconds.",
      },
      {
        q: "How do I see where my business currently ranks in Ridgeland?",
        a: "Request our free 5-minute Rank & Website Breakdown and Damein will show your exact 39157 Google Map Pack positions.",
      },
    ],
  },
  {
    slug: "brandon-ms",
    city: "Brandon",
    county: "Rankin County",
    zipCodes: ["39042", "39047"],
    coordinates: {
      lat: 32.2732,
      lng: -89.9859,
      display: "32.2732° N, 89.9859° W",
    },
    distanceFromHQ: "22 Minutes East Across the Pearl River",
    heroTagline:
      "Rank Across Crossgates, Castlewoods & 39047 Reservoir With Verified Job Proof.",
    marketSummary:
      "Rankin County is booming—spanning both downtown Brandon (39042) and the Reservoir/Lakeland corridor (39047). Because Brandon spans two distinct ZIP zones, generic single-page contractor sites routinely miss half the calls. PinDrop™ maps your real jobs across both.",
    corridors: [
      "Highway 80 & Downtown Brandon Amphitheater District",
      "Spillway Rd & 39047 Reservoir",
      "Grants Ferry Rd Growth Corridor",
      "Crossgates Blvd & I-20 Exits",
    ],
    neighborhoods: [
      "Crossgates",
      "Castlewoods",
      "Eagle Ridge",
      "Shiloh / Pelahatchie Corridor",
      "Grants Ferry Estates & Subdivisions",
      "39047 Reservoir Estates",
    ],
    topTrades: [
      "Hail & Wind Roof Replacements (39042 & 39047)",
      "AC Repair, Heat Pumps & Ductwork Upgrades",
      "Drainage, Grading, Concrete & Privacy Fencing",
      "Plumbing, Water Heaters & Exterior Remodeling",
    ],
    featuredProof: {
      clientName: "Born Again Roofing & Remodeling",
      category: "Rankin County Field Pin Leader",
      summary:
        "Dense cluster of live GPS-verified roofing and remodeling project pins across Brandon, Crossgates, and Reservoir neighborhoods—turning every finished roof into neighbor calls.",
      metric: "Dense 39042 / 39047 Pin Coverage",
      portfolioHref: "/portfolio/born-again-roofing",
      liveUrl: "https://bornagainroofing.com",
    },
    faqs: [
      {
        q: "Why do Brandon contractors struggle to rank in both 39042 and 39047?",
        a: "Google treats downtown Brandon (39042) and the Reservoir/Northwest Rankin area (39047) as miles apart. By logging real PinDrop™ job check-ins in Castlewoods, Grants Ferry, and Crossgates, your site earns organic relevance in both.",
      },
      {
        q: "Will PinCam™ work in newer Rankin County subdivisions with weak cell signal?",
        a: "Yes. PinCam™ stores photos, markups, and voice notes locally on the crew's phone and syncs automatically as soon as 5G or Wi-Fi returns.",
      },
      {
        q: "Do I pay per technician to use PinCam™ and PinDrop™ in Brandon?",
        a: "No. Unlike big-box apps that charge per-tech seat fees, crew access is bundled cleanly into our custom-scoped Contractor Growth Plans.",
      },
    ],
  },
  {
    slug: "flowood-ms",
    city: "Flowood",
    county: "Rankin County",
    zipCodes: ["39232"],
    coordinates: {
      lat: 32.3096,
      lng: -90.1228,
      display: "32.3096° N, 90.1228° W",
    },
    distanceFromHQ: "16 Minutes East via Lakeland Dr",
    heroTagline:
      "High-Converting Web Engineering & Local Search Along Flowood's Lakeland Corridor.",
    marketSummary:
      "Flowood is one of Mississippi's highest-density commercial, medical, hospitality, and residential growth hubs. Whether you service roofs, HVAC units, and build-outs off Lakeland Drive or run a standout local business near Dogwood, speed and Google Map Pack prominence decide who gets the call.",
    corridors: [
      "Lakeland Drive (Hwy 25) Commercial Spine",
      "Dogwood Festival & Market Street",
      "Airport Rd & River Oaks Medical District",
      "Old Fannin Rd Residential Corridor",
    ],
    neighborhoods: [
      "Laurelwood",
      "Kensington",
      "Lakeshore / Old Fannin",
      "River Oaks District",
      "Dogwood Commercial Hub",
      "Pearl / Flowood Industrial Border",
    ],
    topTrades: [
      "Commercial Flat Roofs & Residential Shingle Repair",
      "Commercial & Residential HVAC / Refrigeration",
      "Site Prep, Pad Grading, Concrete & Drainage",
      "Restaurants, Medical Practices & Local Retail",
    ],
    featuredProof: {
      clientName: "Central MS Contractors & Local Commerce",
      category: "Lakeland Corridor Speed & SEO",
      summary:
        "Sub-2-second Next.js websites engineered to dominate 39232 mobile searches—combining instant tap-to-call conversion docks with automated 5-star Google review velocity.",
      metric: "< 2s Mobile Load • Automated CRM",
      portfolioHref: "/our-work",
      liveUrl: "https://powerdigitalmedia.org/our-work",
    },
    faqs: [
      {
        q: "How competitive is the Google Map Pack along Lakeland Drive in Flowood?",
        a: "39232 is one of the highest-value search corridors in Central MS. Outranking competitors here requires fast Core Web Vitals, accurate Google Business Profile categories, steady 5-star review velocity, and real geo-tagged job proof.",
      },
      {
        q: "Do you also build custom websites for Flowood restaurants, clinics, and storefronts?",
        a: "Yes! Alongside our contractor systems, we build bespoke digital storefronts, interactive catering/ordering engines, and booking pipelines for standout local businesses.",
      },
      {
        q: "How do we start?",
        a: "Request your free 5-minute Rank & Website Video Audit or call Damein directly at (601) 446-2393.",
      },
    ],
  },
  {
    slug: "clinton-ms",
    city: "Clinton",
    county: "Hinds County",
    zipCodes: ["39056"],
    coordinates: {
      lat: 32.3415,
      lng: -90.3218,
      display: "32.3415° N, 90.3218° W",
    },
    distanceFromHQ: "8 Minutes West of Our Cynthia Rd HQ",
    heroTagline:
      "Right Next Door to Clinton: Custom Contractor Systems & Local Commerce Flagships.",
    marketSummary:
      "Located just minutes from our Cynthia Road headquarters, Clinton combines proud family neighborhoods, Mississippi College foot traffic, and thriving local businesses. We've already built one of Clinton's fastest, highest-converting digital commerce platforms—and we help 39056 contractors own West Metro search.",
    corridors: [
      "Highway 80 Commercial Spine",
      "Springridge Rd & I-20 Corridor",
      "Olde Towne Clinton & Jefferson St",
      "Pinehaven Dr & Natchez Trace Access",
    ],
    neighborhoods: [
      "Olde Towne Clinton",
      "Lovett",
      "Huntcliff",
      "Terraoca",
      "Shadowood",
      "Northside / Pinehaven",
    ],
    topTrades: [
      "Residential Roofing, Gutters & Siding",
      "HVAC Service, Electrical Panels & Plumbing",
      "Lawn Care, Tree Work & Exterior Fencing",
      "Restaurants, Catering & Local Storefronts",
    ],
    featuredProof: {
      clientName: "T'Beaux's Crawfish & Catering (Clinton, MS)",
      category: "Live Clinton Digital Commerce Case Study",
      summary:
        "Built right for Clinton: we replaced static PDF menus with a lightning-fast Next.js storefront featuring a live interactive Boil Feast Calculator and seamless in-app Square checkout.",
      metric: "Live Square Sync • Interactive Boil Planner",
      portfolioHref: "/portfolio/tbeaux",
      liveUrl: "https://tbeauxs.com",
    },
    faqs: [
      {
        q: "Have you built live websites for businesses right here in Clinton, MS?",
        a: "Yes! T'Beaux's Crawfish & Catering (tbeauxs.com) in Clinton runs on our custom Next.js + Square checkout architecture, and Born Again Roofing has active verified PinDrop™ pins right in 39056.",
      },
      {
        q: "How close is Power Digital Media to Clinton?",
        a: "Our office at 2914 Cynthia Rd is less than 10 minutes from Pinehaven Drive and Olde Towne Clinton—making on-site walkthroughs and crew onboarding effortless.",
      },
      {
        q: "Can Clinton contractors use PinDrop™ to rank in Madison and Brandon too?",
        a: "Yes. Every time your crew completes a job in Clinton, Madison, Raymond, or Brandon, a 30-second PinDrop™ check-in builds ranking authority in that exact town.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): CityLocationData | undefined {
  return CENTRAL_MS_LOCATIONS.find((loc) => loc.slug === slug);
}
