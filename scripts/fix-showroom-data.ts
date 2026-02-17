import fs from 'fs';
import path from 'path';
import { GEAR_COLLECTION } from '../src/data/gear';

const gearFilePath = path.join(process.cwd(), 'src/data/gear.ts');
const backupPath = path.join(process.cwd(), 'src/data/gear.ts.datafix.bak');

async function fixShowroomData() {
    console.log("🛠️  ANTI-GRAVITY DATA FIX: Initiating Showroom Restoration...");

    // 1. Create Backup
    fs.copyFileSync(gearFilePath, backupPath);
    console.log(`📁 Backup created at: ${backupPath}`);

    // 2. Load and Transform
    const updatedCollection = GEAR_COLLECTION.map(item => {
        const newItem = { ...item };

        // Fix Broken Image Paths
        if (newItem.id === 'amd-ryzen-9-9950x3d') {
            newItem.image = '/images/gear/amd_ryzen_9_9950x3d.png';
        }
        if (newItem.id === 'nzxt-kraken-elite-360-2026') {
            newItem.image = '/images/gear/nzxt_kraken_elite_2026.png';
        }

        // Generate Cinematic Tactical SEO Tags if missing
        if (!newItem.seoTags || newItem.seoTags.length === 0) {
            const tags = [
                newItem.name,
                newItem.brand,
                `${newItem.brand} ${newItem.category}`,
                `${newItem.useCase || 'Professional'} ${newItem.category}`,
                "Power Digital Media Showroom",
                "Cinematic Tactical Gear",
                "High Authority Hardware"
            ];

            // Add category specific tags
            if (newItem.category === 'PC') tags.push('PC Building', 'Workstation Hardware', 'Gaming Tech');
            if (newItem.category === 'Audio') tags.push('Pro Audio', 'Studio Gear', 'Podcasting Equipment');
            if (newItem.category === 'Visual') tags.push('Photography', 'Video Production', 'Content Creation');

            newItem.seoTags = [...new Set(tags)];
            console.log(`✨ Generated SEO tags for: ${newItem.id}`);
        }

        return newItem;
    });

    // 3. Safety Check
    if (updatedCollection.length < 50) {
        console.error("❌ CRITICAL ERROR: Collection size is below safety threshold. Aborting fix.");
        process.exit(1);
    }

    // 4. Write back to file with interface preservation
    const fileContent = `export interface GearItem {
    id: string;
    asin?: string;
    name: string;
    brand: string;
    category: 'Audio' | 'PC' | 'Visual' | 'Lighting' | 'Build Kits' | 'Monitors' | 'Essentials';
    useCase?: 'Streaming' | 'Editing' | 'Podcasting' | 'All-in-One' | 'Gaming';
    level?: 'Entry' | 'Pro' | 'Elite';
    description: string;
    longDescription?: string;
    features?: string[];
    technicalSpecs: string[];
    priceRange: string;
    image: string;
    amazonLink: string;
    subCategory?: string;
    isFeatured?: boolean;
    whatIsInTheBox?: string[];
    ourTake?: string;
    seoTags?: string[];
    pros?: string[];
    cons?: string[];
    deploymentScenario?: string;
    technicalDossier?: string;
}

export const GEAR_COLLECTION: GearItem[] = ${JSON.stringify(updatedCollection, null, 4)};
`;

    fs.writeFileSync(gearFilePath, fileContent);
    console.log("✅ DATA FIX COMPLETE: gear.ts updated successfully.");
}

fixShowroomData().catch(err => {
    console.error("❌ FIX ERROR:", err);
    process.exit(1);
});
