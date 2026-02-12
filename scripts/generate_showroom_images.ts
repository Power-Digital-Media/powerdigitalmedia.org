
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

interface Product {
    name: string;
    id: string;
    category: string;
    subCategory: string;
    filename: string;
}

const products: Product[] = [
    { name: 'Intel Core i7-14700K', id: 'intel-i7-14700k', category: 'PC', subCategory: 'Processors', filename: 'intel_i7_14700k.png' },
    { name: 'Intel Core i5-13600K', id: 'intel-i5-13600k', category: 'PC', subCategory: 'Processors', filename: 'intel_i5_13600k.png' },
    { name: 'Samsung 990 PRO 4TB NVMe', id: 'samsung-990-pro-4tb', category: 'PC', subCategory: 'NVMe SSD', filename: 'samsung_990_pro.png' },
    { name: 'WD Black SN850X 2TB NVMe', id: 'wd-black-sn850x', category: 'PC', subCategory: 'NVMe SSD', filename: 'wd_black_sn850x_2tb.png' },
    { name: 'Crucial P3 Plus 1TB NVMe', id: 'crucial-p3-plus', category: 'PC', subCategory: 'NVMe SSD', filename: 'crucial_p3_plus.png' },
    { name: 'MSI MEG Ai1300P PCIE5', id: 'msi-meg-ai1300p', category: 'PC', subCategory: 'Power Supply', filename: 'msi_ai1300p.png' },
    { name: 'Corsair RM1000x Shift', id: 'corsair-rm1000x-shift', category: 'PC', subCategory: 'Power Supply', filename: 'corsair_rm1000x_shift.png' },
    { name: 'Corsair RM750e Fully Modular', id: 'corsair-rm750e', category: 'PC', subCategory: 'Power Supply', filename: 'corsair_rm750e.png' },
    { name: 'Corsair iCUE Link H150i LCD', id: 'corsair-icue-link-h150i', category: 'PC', subCategory: 'Liquid Cooling', filename: 'corsair_h150i_lcd.png' },
    { name: 'Deepcool AK620 Digital', id: 'deepcool-ak620-digital', category: 'PC', subCategory: 'Air Cooling', filename: 'deepcool_ak620.png' },
    { name: 'ASUS ProArt RTX 4080 Super', id: 'asus-proart-4080-super', category: 'PC', subCategory: 'GPUs', filename: 'asus_proart_4080.png' }
];

async function generateProductImage(product: Product) {
    if (!openai) {
        console.error("❌ OpenAI API key missing");
        return;
    }

    try {
        console.log(`🎨 Generating image for: ${product.name}...`);
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Professional product photography of a ${product.name} (${product.subCategory}) in a dark studio setting. 
            The product is centered with sharp highlights and dramatic cyan and magenta RGB accent lighting. 
            Deep black background, high contrast, tech-noir premium aesthetic. 
            8k resolution, photorealistic, no text, square aspect ratio.`,
            n: 1,
            size: "1024x1024",
            quality: "hd"
        });

        if (!response.data || response.data.length === 0) {
            throw new Error("Invalid response structure from OpenAI");
        }

        const url = response.data[0].url;
        if (!url) throw new Error("No URL returned");

        const imageResponse = await fetch(url);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const targetDir = path.join(process.cwd(), 'public', 'images', 'gear');
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

        const targetPath = path.join(targetDir, product.filename);
        fs.writeFileSync(targetPath, buffer);
        console.log(`✅ Saved: ${product.filename}`);

    } catch (error: any) {
        console.error(`❌ Failed ${product.name}: ${error.message}`);
    }
}

async function main() {
    console.log("🚀 Starting Showroom Image Generation...");
    for (const product of products) {
        await generateProductImage(product);
        // Delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    console.log("🏁 All images processed.");
}

main().catch(console.error);
