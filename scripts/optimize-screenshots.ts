import sharp from "sharp";
import path from "path";
import fs from "fs";

const brainDir = "C:\\Users\\User\\.gemini\\antigravity\\brain\\d261b88f-038d-42a1-943e-a4073e54fa86";
const outputDir = "e:\\AntiGravity\\power-digital-media-web\\public\\portfolio";

// Make sure output folder exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const imagesToProcess = [
    {
        src: path.join(brainDir, "media__1780330447313.jpg"),
        dest: path.join(outputDir, "geaux-pro-outdoors.webp"),
        name: "Geaux Pro Outdoors"
    },
    {
        src: path.join(brainDir, "media__1780330471638.png"),
        dest: path.join(outputDir, "tbeauxs.webp"),
        name: "Tbeaux's Crawfish"
    },
    {
        src: path.join(brainDir, "media__1780330498360.png"),
        dest: path.join(outputDir, "powered-by-peptides.webp"),
        name: "Powered by Peptides"
    },
    {
        src: path.join(brainDir, "media__1780330524230.png"),
        dest: path.join(outputDir, "pastors-provision.webp"),
        name: "Pastor's Provision"
    },
    {
        src: path.join(brainDir, "media__1780330554166.png"),
        dest: path.join(outputDir, "church-244.webp"),
        name: "Church 244"
    },
    {
        src: path.join(brainDir, "media__1780330718679.png"),
        dest: path.join(outputDir, "in-his-grip.webp"),
        name: "In His Grip"
    }
];

async function optimizeImages() {
    console.log("🚀 Starting sharp image optimization and WebP conversion...");
    
    for (const img of imagesToProcess) {
        if (!fs.existsSync(img.src)) {
            console.error(`❌ Source file not found: ${img.src}`);
            continue;
        }

        try {
            console.log(`⏳ Optimizing ${img.name}...`);
            const beforeStats = fs.statSync(img.src);
            const beforeSizeKb = (beforeStats.size / 1024).toFixed(1);

            // Using sharp to resize (max width 1200px) and compress to highly optimized webp (quality 82)
            await sharp(img.src)
                .resize({ width: 1200, withoutEnlargement: true })
                .webp({ quality: 82, effort: 6 }) // Max compression effort for tiny file sizes
                .toFile(img.dest);

            const afterStats = fs.statSync(img.dest);
            const afterSizeKb = (afterStats.size / 1024).toFixed(1);
            const savings = (100 - (afterStats.size / beforeStats.size) * 100).toFixed(1);

            console.log(`✅ Success for ${img.name}:`);
            console.log(`   Before: ${beforeSizeKb} KB`);
            console.log(`   After:  ${afterSizeKb} KB (Reduced by ${savings}%)`);
            console.log(`   Saved:  ${img.dest}\n`);
        } catch (err) {
            console.error(`❌ Error processing ${img.name}:`, err);
        }
    }
    console.log("🎉 All image optimizations completed successfully!");
}

optimizeImages();
