import fs from 'fs';
import path from 'path';
import { GEAR_COLLECTION } from '../src/data/gear';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyShowroom() {
    console.log("🔍 ANTI-GRAVITY SHOWROOM AUDIT: Initiating Health Check...\n");

    const issues = [];
    const totalItems = GEAR_COLLECTION.length;

    console.log(`📊 Catalog Size: ${totalItems} items`);

    if (totalItems < 50) {
        issues.push(`CRITICAL: Catalog size (${totalItems}) is below the safety threshold (50).`);
    }

    for (const item of GEAR_COLLECTION) {
        // 1. Check for Dossier
        if (!item.technicalDossier || item.technicalDossier.length < 100) {
            issues.push(`[${item.id}] Missing or thin technical dossier.`);
        }

        // 2. Check for Images
        const imageRelativePath = item.image.startsWith('/') ? item.image.slice(1) : item.image;
        const imagePath = path.join(__dirname, '../public', imageRelativePath);
        if (!fs.existsSync(imagePath)) {
            issues.push(`[${item.id}] Broken image path: ${item.image}`);
        }

        // 3. Check for Affiliate Links
        if (!item.amazonLink || !item.amazonLink.startsWith('https://')) {
            issues.push(`[${item.id}] Missing or invalid Amazon link.`);
        }

        // 4. Check for SEO Tags
        if (!item.seoTags || item.seoTags.length === 0) {
            issues.push(`[${item.id}] Missing SEO tags.`);
        }
    }

    if (issues.length > 0) {
        console.error("❌ AUDIT FAILED: The following issues were found:");
        issues.forEach(issue => console.error(`  - ${issue}`));
        process.exit(1);
    } else {
        console.log("✅ AUDIT PASSED: All showroom assets are healthy and high-authority.");
    }
}

verifyShowroom().catch(err => {
    console.error("❌ AUDIT ERROR:", err);
    process.exit(1);
});
