export interface GearItem {
    id: string;
    asin?: string;
    name: string;
    brand: string;
    category: 'Audio' | 'PC' | 'Visual' | 'Lighting' | 'Build Kits' | 'Monitors';
    useCase?: 'Streaming' | 'Editing' | 'Podcasting' | 'All-in-One' | 'Gaming';
    level?: 'Entry' | 'Pro' | 'Elite';
    description: string;
    technicalSpecs: string[];
    priceRange: string;
    image: string;
    amazonLink: string;
    isFeatured?: boolean;
}

export const GEAR_COLLECTION: GearItem[] = [
    // --- AUDIO PROTOCOL ---
    {
        id: 'shure-sm7b',
        asin: 'B0002E4Z8M',
        name: 'SM7B Vocal Microphone',
        brand: 'Shure',
        category: 'Audio',
        useCase: 'Podcasting',
        level: 'Elite',
        description: 'The industry standard for broadcast and podcasting. Smooth, flat, wide-range frequency response.',
        technicalSpecs: ['Dynamic Cardioid', 'Flat frequency response', 'Air suspension shock isolation'],
        priceRange: '$$$',
        image: '/images/gear/shure_sm7b.png',
        amazonLink: 'https://amzn.to/3Z6q3Lq',
        isFeatured: true
    },
    {
        id: 'rode-caster-pro-2',
        asin: 'B09Z6M2XZO',
        name: 'Rødecaster Pro II',
        brand: 'Røde',
        category: 'Audio',
        useCase: 'Podcasting',
        level: 'Elite',
        description: 'The ultimate audio production solution for streamers, podcasters, and musicians.',
        technicalSpecs: ['9 assignable channels', 'Revolution Preamps', 'Direct-to-USB recording'],
        priceRange: '$$$$',
        image: '/images/gear/rodecaster_pro_2.png',
        amazonLink: 'https://amzn.to/3V5Uj1v',
        isFeatured: true
    },

    // --- PC COMPONENTS PROTOCOL ---
    {
        id: 'msi-rtx-4090',
        asin: 'B0BG939TRX',
        name: 'MSI Suprim X RTX 4090',
        brand: 'MSI / NVIDIA',
        category: 'PC',
        useCase: 'Editing',
        level: 'Elite',
        description: 'The peak of graphics processing power for 8K rendering and AI-assisted workflows.',
        technicalSpecs: ['24GB GDDR6X', 'DLSS 3.0 Support', 'TORX Fan 5.0 Cooling'],
        priceRange: '$$$$$',
        image: '/images/gear/msi_rtx_4090.png',
        amazonLink: 'https://amzn.to/3X6W7Xq',
        isFeatured: true
    },
    {
        id: 'corsair-dominator-titanium',
        asin: 'B0CBWJ7M8N',
        name: 'Dominator Titanium 64GB',
        brand: 'Corsair',
        category: 'PC',
        useCase: 'Editing',
        level: 'Elite',
        description: 'Ultra-high frequency DDR5 memory optimized for heavy multitasking and video rendering.',
        technicalSpecs: ['DDR5 6600MHz', 'Patented DHX Cooling', 'Customizable RGB'],
        priceRange: '$$$',
        image: '/images/gear/corsair_dominator.png',
        amazonLink: 'https://amzn.to/4fL6G7r',
        isFeatured: false
    },
    {
        id: 'msi-meg-pro-liquid',
        asin: 'B09GDN7M2M',
        name: 'MEG CoreLiquid S360',
        brand: 'MSI',
        category: 'PC',
        useCase: 'All-in-One',
        level: 'Pro',
        description: 'Elite AIO liquid cooler with a built-in IPS display for real-time monitoring.',
        technicalSpecs: ['360mm Radiator', '2.4" IPS Display', 'Silence Fan Protocol'],
        priceRange: '$$',
        image: '/images/gear/msi_liquid_cooler.png',
        amazonLink: 'https://amzn.to/3V9FmYy',
        isFeatured: false
    },

    // --- VISUAL PROTOCOL ---
    {
        id: 'sony-a7siii',
        asin: 'B08DP4NKBD',
        name: 'Sony Alpha 7S III',
        brand: 'Sony',
        category: 'Visual',
        useCase: 'Streaming',
        level: 'Elite',
        description: 'The industry-leading sensor for low-light performance and 4K creator workflows.',
        technicalSpecs: ['12.1MP Exmor R', '4K 120p Video', '15+ Stops Dynamic Range'],
        priceRange: '$$$$$',
        image: '/images/gear/sony_a7siii.png',
        amazonLink: 'https://amzn.to/40H6Y4b',
        isFeatured: true
    },
    {
        id: 'obsbot-tiny-2',
        asin: 'B0C1N9V6T9',
        name: 'Tiny 2 AI webcam',
        brand: 'OBSBOT',
        category: 'Visual',
        useCase: 'Streaming',
        level: 'Pro',
        description: 'AI-powered 4K tracking camera. Gesture controls and high-velocity focus.',
        technicalSpecs: ['4K UHD', 'AI Auto-Tracking', 'Voice Control'],
        priceRange: '$$',
        image: '/images/gear/obsbot_tiny_2.png',
        amazonLink: 'https://amzn.to/3YVfE4X',
        isFeatured: false
    },

    // --- MONITOR PROTOCOL ---
    {
        id: 'samsung-odyssey-g9',
        asin: 'B088HH6LW5',
        name: 'Odyssey G9 49"',
        brand: 'Samsung',
        category: 'Monitors',
        useCase: 'Editing',
        level: 'Elite',
        description: 'Ultra-wide 49-inch curved monitor for maximum editing real estate and immersive workflows.',
        technicalSpecs: ['DQHD Resolution', '240Hz Refresh', '1000R Curvature'],
        priceRange: '$$$$',
        image: '/images/gear/samsung_odyssey_g9.png',
        amazonLink: 'https://amzn.to/4hK9M2z',
        isFeatured: true
    },
    {
        id: 'msi-mag-274upf',
        asin: 'B0C69YV1R5',
        name: 'MAG 274UPF 4K',
        brand: 'MSI',
        category: 'Monitors',
        useCase: 'Gaming',
        level: 'Pro',
        description: 'Rapid IPS 4K monitor designed for high-refresh gaming and accurate color grading.',
        technicalSpecs: ['4K UHD Resolution', '144Hz Refresh', 'Rapid IPS Panel'],
        priceRange: '$$',
        image: '/images/gear/msi_mag_monitor.png',
        amazonLink: 'https://amzn.to/3Z9q9Lp',
        isFeatured: false
    },

    // --- BUDGET / ENTRY PROTOCOL ---
    {
        id: 'msi-mag-b760',
        asin: 'B0BQWWFGPB',
        name: 'MSI MAG B760 Tomahawk',
        brand: 'MSI',
        category: 'PC',
        useCase: 'All-in-One',
        level: 'Entry',
        description: 'The foundation for a solid entry-level creator build. Rock-solid power delivery and thermal design.',
        technicalSpecs: ['LGA 1700 Support', 'Wi-Fi 6E', 'DDR5 Ready'],
        priceRange: '$',
        image: '/images/gear/msi_motherboard.png',
        amazonLink: 'https://amzn.to/3Z8q9Lp',
        isFeatured: false
    },
    {
        id: 'corsair-vengeance-32',
        asin: 'B0B771BL6T',
        name: 'Vengeance RGB 32GB',
        brand: 'Corsair',
        category: 'PC',
        useCase: 'Streaming',
        level: 'Entry',
        description: 'Reliable high-speed DDR5 memory with integrated RGB for the modern creator aesthetic.',
        technicalSpecs: ['32GB DDR5', '6000MHz CL36', 'iCUE Compatible'],
        priceRange: '$',
        image: '/images/gear/corsair_dominator.png',
        amazonLink: 'https://amzn.to/3V8Uj1x',
        isFeatured: false
    },
    {
        id: 'elgato-wave-3',
        asin: 'B088P2KZK1',
        name: 'Wave:3 USB Mic',
        brand: 'Elgato',
        category: 'Audio',
        useCase: 'Streaming',
        level: 'Entry',
        description: 'Professional grade USB microphone with internal clip guard and digital mixer.',
        technicalSpecs: ['Cardioid Condenser', '24-bit / 96kHz', 'Wave Link Software'],
        priceRange: '$',
        image: '/images/gear/elgato_wave_3.png',
        amazonLink: 'https://amzn.to/3CdW6rL',
        isFeatured: false
    },
    {
        id: 'msi-katana-15',
        asin: 'B0BT3BW8G4',
        name: 'Katana 15 Gaming Laptop',
        brand: 'MSI',
        category: 'Build Kits',
        useCase: 'Editing',
        level: 'Entry',
        description: 'A portable editing and streaming powerhouse for creators on the go.',
        technicalSpecs: ['RTX 4050 GPU', 'Intel i7-13620H', '144Hz Display'],
        priceRange: '$$',
        image: '/images/gear/msi_katana_15.png',
        amazonLink: 'https://amzn.to/4fL6G7r',
        isFeatured: false
    },
    // --- BUNDLE PROTOCOLS ---
    {
        id: 'elite-podcasting-bundle',
        asin: 'B0002E4Z8M',
        name: 'Elite Podcasting Bundle',
        brand: 'Power Digital / Elite',
        category: 'Build Kits',
        useCase: 'Podcasting',
        level: 'Elite',
        description: 'The exact workstation we use for high-velocity broadcast. Shure SM7B meets the Rødecaster Pro II.',
        technicalSpecs: ['Shure SM7B Mic', 'Rødecaster Pro II Mixer', 'Cloudlifter CL-1', 'Premium Boom Arm'],
        priceRange: '$$$$$',
        image: '/images/gear/elite_bundle.png',
        amazonLink: 'https://amzn.to/3Z6q3Lq',
        isFeatured: true
    },
    {
        id: 'pro-podcasting-bundle',
        asin: 'B0BVMTCWH5',
        name: 'Pro Podcasting Bundle',
        brand: 'Power Digital / Pro',
        category: 'Build Kits',
        useCase: 'Podcasting',
        level: 'Pro',
        description: 'Professional high-fidelity kit for creators transitioning to premium audio.',
        technicalSpecs: ['Sony A7S III', 'Video Capture Protocol', 'Pro Lighting Kit'],
        priceRange: '$$$',
        image: '/images/gear/sony_a7siii.png',
        amazonLink: 'https://amzn.to/3V5Uj1v',
        isFeatured: false
    },
    {
        id: 'entry-podcasting-bundle',
        asin: 'B088P2KZK1',
        name: 'Entry Podcasting Bundle',
        brand: 'Power Digital / Entry',
        category: 'Build Kits',
        useCase: 'Podcasting',
        level: 'Entry',
        description: 'The foundation for professional streaming and podcasting. Plug and play excellence.',
        technicalSpecs: ['Elgato Wave:3', 'Internal Pop Filter', 'Wave Link Digital Mixer'],
        priceRange: '$$',
        image: '/images/gear/elgato_wave_3.png',
        amazonLink: 'https://amzn.to/3CdW6rL',
        isFeatured: false
    }
];
