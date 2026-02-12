import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load Environment Variables manually
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

async function generateImage(title: string, vertical: string, filepath: string) {
    if (!openai) {
        console.warn("⚠️ No OpenAI API Key found. Skipping generation.");
        return;
    }

    try {
        console.log(`   🎨 Regenerating asset for "${title}"...`);
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Cinematic top-down photography, dark moody studio lighting with cyan and deep blue accents, 
            shallow depth of field, professional tech-noir aesthetic of ${title} related to ${vertical}. 
            The image must feel like a native part of a high-end hardware showroom environment. 
            8k resolution, photorealistic, technological excellence, no text.`,
            n: 1,
            size: "1024x1024",
            quality: "hd"
        });

        const dalleUrl = response.data?.[0]?.url;
        if (!dalleUrl) throw new Error("No URL returned from DALL-E");

        // Download the image
        console.log(`   📥 Downloading image...`);
        const imageResponse = await fetch(dalleUrl);
        if (!imageResponse.ok) throw new Error(`Failed to download image: ${imageResponse.statusText}`);

        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Ensure directory exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Save file
        fs.writeFileSync(filepath, buffer);
        console.log(`   ✅ Image restored to ${filepath}`);

    } catch (error: any) {
        console.warn(`   ⚠️ Generation failed: ${error.message}`);
    }
}

async function main() {
    console.log("🚀 STARTING IMAGE REHYDRATION PROTOCOL (REGEX MODE)...");

    // Read blogPosts.ts as text
    const blogPostsPath = path.join(process.cwd(), 'src/data/blogPosts.ts');
    if (!fs.existsSync(blogPostsPath)) {
        console.error("❌ Could not find blogPosts.ts");
        return;
    }
    const content = fs.readFileSync(blogPostsPath, 'utf-8');

    // Regex to find posts
    // We look for title and image lines.
    // Simplifying assumption: title comes before image in the object.

    const posts: any[] = [];
    // Split by "start of object" roughly
    const rawObjects = content.split('    {');

    for (const raw of rawObjects) {
        const titleMatch = raw.match(/title:\s*"([^"]+)"/);
        const imageMatch = raw.match(/image:\s*"([^"]+)"/);
        const categoryMatch = raw.match(/category:\s*"([^"]+)"/);

        if (titleMatch && imageMatch) {
            posts.push({
                title: titleMatch[1],
                image: imageMatch[1],
                category: categoryMatch ? categoryMatch[1] : 'Studio Tech'
            });
        }
    }

    console.log(`Found ${posts.length} potential posts.`);

    // Check only the first 10 (which are the newest)
    const recentPosts = posts.slice(0, 10);

    for (const post of recentPosts) {
        if (!post.image.startsWith('/blog-images')) continue;

        const relativePath = post.image;
        const absolutePath = path.join(process.cwd(), 'public', relativePath);

        if (!fs.existsSync(absolutePath)) {
            console.log(`❌ MISSING IMAGE: ${relativePath}`);
            await generateImage(post.title, post.category, absolutePath);
        } else {
            console.log(`   OK: ${relativePath}`);
        }
    }
    console.log("✅ PROTOCOL COMPLETE.");
}

main().catch(console.error);
