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
      liveUrl: "https://www.bornagainroofing.com/",
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
      liveUrl: "https://www.msdirt.com/",
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
      liveUrl: "https://www.bornagainroofing.com/",
    },
    faqs: [
      {
        q: "Can you help our company win both residential and commercial work in Ridgeland?",
        a: "Yes. We structure separate, high-converting service silos for Highland Colony / commercial property managers and 39157 homeowners so each audience sees relevant proof and quote forms.",
      },
      {
        q: "Do you integrate CRM and automated follow-up for Ridgeland offices?",
        a: "Yes—we connect Capsule CRM, interactive quote calculators, and automated Transpond follow-up sequences so online inquiries are logged and engaged immediately.",
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
      liveUrl: "https://www.bornagainroofing.com/",
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
  {
    slug: "flora-ms",
    city: "Flora",
    county: "Madison County",
    zipCodes: ["39071"],
    coordinates: {
      lat: 32.5482,
      lng: -90.3095,
      display: "32.5482° N, 90.3095° W",
    },
    distanceFromHQ: "18 Minutes North via Highway 49",
    heroTagline:
      "Hometown Madison County Web Engineering, Local Map Pack SEO & Field Apps for Flora.",
    marketSummary:
      "Flora sits at the heart of western Madison County's Highway 49 corridor—connecting historic Main Street retailers and trusted community staples like Corner Pharmacy with acreage estates, Kearney Park homes, and fast-growing rural builds toward Bentonia and Gluckstadt. We build fast, hometown-proud digital infrastructure that helps Flora businesses and contractors stand out across Google Maps and AI search.",
    corridors: [
      "Highway 49 North & South Corridor",
      "Historic Main Street & Downtown Flora",
      "Kearney Park Rd & Cox Ferry Rd",
      "Highway 22 West Madison / Gluckstadt Connector",
    ],
    neighborhoods: [
      "Downtown Flora",
      "Kearney Park",
      "Cox Ferry & Big Black Corridor",
      "Pocahontas & Hwy 49 South",
      "Livingston / Hwy 22 Corridor",
      "Acreage & Estate Properties (39071)",
    ],
    topTrades: [
      "Land Clearing, Dirt Work, Ponds & House Pads",
      "Estate Lawn Care, Turf & Pine Straw Routes",
      "Residential Roofing, HVAC & Generator Installs",
      "Hometown Healthcare, Pharmacy, Retail & Ministry",
    ],
    featuredProof: {
      clientName: "Corner Pharmacy & Lungrin's Lawncare (Flora, MS)",
      category: "Trusted Flora, MS Client Partners",
      summary:
        "From supporting hometown healthcare staples like Corner Pharmacy in Flora to engineering sub-second Next.js + PinDrop™ route-density growth for Lungrin's Lawncare across Flora and Pocahontas, we build right in your backyard.",
      metric: "99/100 Mobile Speed • Hometown 39071 Proof",
      portfolioHref: "/portfolio/lungrins-lawncare",
      liveUrl: "https://lungrinslawncare.com",
    },
    faqs: [
      {
        q: "Do you already work with local businesses right here in Flora, MS?",
        a: "Yes! We proudly serve Flora businesses including Corner Pharmacy and Lungrin's Lawncare, and our studio at 2914 Cynthia Rd is right down Highway 49—less than 20 minutes away.",
      },
      {
        q: "How can a Flora contractor pull jobs from Madison, Gluckstadt, and Clinton too?",
        a: "We pair dedicated city service hubs with PDM PinDrop™ GPS check-ins so every completed project in Flora, Kearney Park, Madison, or Clinton publishes verified local authority in that exact area.",
      },
      {
        q: "Will PinCam™ work out on rural 39071 acreage where cell service drops?",
        a: "Yes. PinCam™ captures Ghost-aligned before/after photos, measurements, and inspection notes offline on the crew's phone and syncs automatically once signal returns.",
      },
    ],
  },
  {
    slug: "pearl-ms",
    city: "Pearl",
    county: "Rankin County",
    zipCodes: ["39208"],
    coordinates: {
      lat: 32.2746,
      lng: -90.132,
      display: "32.2746° N, 90.1320° W",
    },
    distanceFromHQ: "15 Minutes Southeast via I-20",
    heroTagline:
      "Built for Pearl's Hardest-Working Trade Crews, Fleet Shops & Commercial Operators.",
    marketSummary:
      "Anchored by the I-20, Highway 80, and Airport Road commercial spine, Pearl is Central Mississippi's powerhouse hub for roofing, HVAC, electrical, plumbing, fleet service, and residential trades. When 39208 homeowners or facility managers search Google Maps on their phone, sub-second load speed and verified neighborhood proof separate booked crews from page-two competitors.",
    corridors: [
      "Highway 80 Commercial & Trade Spine",
      "I-20 Industrial, Retail & Bass Pro District",
      "Airport Rd & Flowood Connector",
      "Pearson Rd & Old Brandon Rd",
    ],
    neighborhoods: [
      "North Pearl / Old Brandon Rd",
      "Pearson Rd Residential Corridor",
      "McLaurin Heights",
      "Country Place",
      "Grandview & South Pearson",
      "Richland / Hwy 49 South Border",
    ],
    topTrades: [
      "Residential & Commercial Roof Repair & Tear-Offs",
      "Emergency HVAC, Plumbing & Electrical Service",
      "Concrete, Fencing, Gutters & Exterior Remodeling",
      "Commercial Fleet, Industrial Supply & Local Dining",
    ],
    featuredProof: {
      clientName: "Born Again Roofing & Rankin County Crews",
      category: "39208 Google Map Pack & PinDrop™ Proof",
      summary:
        "Active GPS-verified roofing and exterior project pins across Pearl, Pearson Road, and Old Brandon Road—compounding Google Map Pack visibility and 5-star homeowner reviews.",
      metric: "Verified 39208 Pins • 98/100 Mobile Speed",
      portfolioHref: "/portfolio/born-again-roofing",
      liveUrl: "https://www.bornagainroofing.com/",
    },
    faqs: [
      {
        q: "How do Pearl trade companies win calls across both Pearl (39208) and Brandon/Flowood?",
        a: "Many Rankin County shops are based along Highway 80 or I-20 in Pearl while running trucks into Flowood and Brandon daily. PinDrop™ maps every completed job across all three ZIP zones so Google sees real work across your entire territory.",
      },
      {
        q: "Do your contractor websites include interactive estimate calculators?",
        a: "Yes. Every custom Next.js build includes fast mobile quote capture or interactive trade calculators wired straight into Capsule CRM and automated Transpond follow-ups.",
      },
      {
        q: "How quickly can we get a ballpark scope for our Pearl business?",
        a: "Use our interactive Scope Estimator at powerdigitalmedia.org/estimate or call/text Damein directly at (601) 446-2393.",
      },
    ],
  },
  {
    slug: "canton-ms",
    city: "Canton",
    county: "Madison County",
    zipCodes: ["39046"],
    coordinates: {
      lat: 32.6126,
      lng: -90.0368,
      display: "32.6126° N, 90.0368° W",
    },
    distanceFromHQ: "28 Minutes North via I-55",
    heroTagline:
      "Modern Web Design, Google Maps Visibility & Field Software for Canton Businesses & Contractors.",
    marketSummary:
      "From the iconic Historic Courthouse Square and Highway 51 storefronts to the Nissan Parkway industrial corridor and surrounding Madison County land developments, Canton blends deep heritage with major commercial and residential demand. We engineer fast custom websites, 0%-fee ordering, and GPS field proof so 39046 businesses capture high-intent searchers.",
    corridors: [
      "Historic Canton Courthouse Square & Peace St",
      "Nissan Parkway & I-55 Industrial Corridor",
      "Highway 51 & Gluckstadt Connector",
      "Highway 22 & Highway 16 East/West Corridors",
    ],
    neighborhoods: [
      "Historic Downtown Canton",
      "Deerfield",
      "Harvey Crossing",
      "Twin Cedars & Country Club Area",
      "Virlilia & Hwy 22 West",
      "South Canton / Gluckstadt Border",
    ],
    topTrades: [
      "Land Clearing, Excavation, Pads & Agricultural Services",
      "Residential & Commercial Roofing & HVAC",
      "Industrial Facility Maintenance & Electrical",
      "Courthouse Square Dining, Catering & Retail",
    ],
    featuredProof: {
      clientName: "Madison County Contractors & Local Operators",
      category: "Northern Madison County Speed & SEO",
      summary:
        "Sub-second Next.js websites, Google Map Pack optimization, and GEO/AEO structured schema engineered to capture searches from Canton Courthouse Square to Gluckstadt.",
      metric: "0.8s Architecture • 24/7 Watchtower",
      portfolioHref: "/portfolio/geaux-pro-outdoors",
      liveUrl: "https://www.msdirt.com/",
    },
    faqs: [
      {
        q: "Can a Canton business capture customers searching in Gluckstadt and Madison too?",
        a: "Yes. We build dedicated service-area silos for Canton (39046), Gluckstadt, and Madison backed by structured LocalBusiness JSON-LD and real PinDrop™ project check-ins.",
      },
      {
        q: "Can Canton restaurants and caterers accept online orders without paying 30% app commissions?",
        a: "Yes! Just like our build for T'Beaux's Seafood & Catering, we integrate native Square Web SDK checkout directly on your own domain with 0% third-party marketplace fees.",
      },
      {
        q: "Who manages our website security and uptime after launch?",
        a: "Every managed client site is protected 24/7 by PDM Site Intelligence™—checking uptime every 5 minutes, tracking Google Search Console growth, and giving you direct cell access to Damein Donald.",
      },
    ],
  },
  {
    slug: "byram-ms",
    city: "Byram",
    county: "Hinds County",
    zipCodes: ["39272"],
    coordinates: {
      lat: 32.1793,
      lng: -90.2448,
      display: "32.1793° N, 90.2448° W",
    },
    distanceFromHQ: "18 Minutes South via I-55 / Siwell Rd",
    heroTagline:
      "Capture High-Intent Residential & Commercial Calls Across Byram & the I-55 South Corridor.",
    marketSummary:
      "Byram is South Hinds County's fastest-moving residential and retail market—anchoring neighborhoods along Siwell Road, Terry Road, and Davis Road while serving homeowners commuting into Jackson and Terry. Most competitors in 39272 still rely on outdated Facebook pages or slow template sites, making Google Map Pack optimization a massive advantage.",
    corridors: [
      "Siwell Rd Commercial & Retail Hub",
      "I-55 South Frontage & Exit Corridors",
      "Terry Rd North/South Residential Spine",
      "Davis Rd & Henderson Rd Subdivisions",
    ],
    neighborhoods: [
      "Lakeshore Estates",
      "Country Woods",
      "Timberidge & Siwell Subdivisions",
      "Barrington & Davis Rd Estates",
      "North Byram / Oak Forest Border",
      "Terry & Raymond Road Corridor",
    ],
    topTrades: [
      "Storm Roof Inspections, Shingles & Gutters",
      "Residential AC Repair, Heating & Plumbing",
      "Lawn Care, Privacy Fencing, Concrete & Tree Work",
      "Local Dining, Healthcare, Auto & Faith Communities",
    ],
    featuredProof: {
      clientName: "Born Again Roofing & Hinds County Pros",
      category: "South Metro & 39272 Local Search",
      summary:
        "Fast mobile quote flows, verified GPS neighborhood pins, and automated 5-star review requests turning completed South Jackson and Byram jobs into steady homeowner phone calls.",
      metric: "Sub-Second Mobile UX • 5.0★ Review Flow",
      portfolioHref: "/portfolio/born-again-roofing",
      liveUrl: "https://www.bornagainroofing.com/",
    },
    faqs: [
      {
        q: "Why is Byram (39272) such a strong Google Map Pack opportunity right now?",
        a: "Homeowners in Byram and Terry search specifically for south-corridor pros who can respond quickly without fighting cross-town traffic, yet very few local contractors have dedicated 39272 schema or verified neighborhood job pages.",
      },
      {
        q: "Can we also target Terry, Raymond, and South Jackson from one website?",
        a: "Yes. We architect clean city and service hubs across Byram, Terry, Raymond, Clinton, and Jackson—and PinDrop™ adds real GPS project proof wherever your trucks roll.",
      },
      {
        q: "How do we check our current Google rankings in Byram?",
        a: "Request a free 5-minute video audit at powerdigitalmedia.org/free-audit or text Damein directly at (601) 446-2393.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): CityLocationData | undefined {
  return CENTRAL_MS_LOCATIONS.find((loc) => loc.slug === slug);
}
