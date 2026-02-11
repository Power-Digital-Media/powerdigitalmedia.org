
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { blogPosts } from '../src/data/blogPosts';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

async function generateImage(title: string, category: string, slug: string) {
    // Fallback images (same as claudebot.ts)
    const fallbacks: Record<string, string> = {
        'Studio Tech': "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
        'Compute Core': "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80",
        'Software Ecosystem': "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
        'AI Intelligence': "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        'Creative Velocity': "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
    };

    const fallbackUrl = fallbacks[category] || fallbacks['Creative Velocity'];

    if (!openai) {
        console.warn("⚠️ No OpenAI API key found. Using fallback.");
        return fallbackUrl;
    }

    try {
        console.log(`   🎨 Visuals: Generating asset for "${title}"...`);
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Cinematic top-down photography, dark moody studio lighting with cyan and deep blue accents, 
            shallow depth of field, professional tech-noir aesthetic of ${title} related to ${category}. 
            The image must feel like a native part of a high-end hardware showroom environment. 
            8k resolution, photorealistic, technological excellence, no text.`,
            n: 1,
            size: "1024x1024",
            quality: "hd"
        });

        const dalleUrl = response.data?.[0]?.url;
        if (!dalleUrl) throw new Error("No URL returned from DALL-E");

        // Download the image
        console.log(`   📥 Visuals: Downloading image...`);
        const imageResponse = await fetch(dalleUrl);
        if (!imageResponse.ok) throw new Error(`Failed to download image: ${imageResponse.statusText}`);

        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create blog-images directory if it doesn't exist
        const blogImagesDir = path.join(process.cwd(), 'public', 'blog-images');
        if (!fs.existsSync(blogImagesDir)) {
            fs.mkdirSync(blogImagesDir, { recursive: true });
        }

        // Save with unique filename
        const filename = `${slug}-${Date.now()}.png`;
        const filepath = path.join(blogImagesDir, filename);
        fs.writeFileSync(filepath, buffer);

        console.log(`   ✅ Visuals: Saved to /blog-images/${filename}`);
        return `/blog-images/${filename}`;

    } catch (error: any) {
        console.warn(`   ⚠️ Visuals: Generation failed (${error.message}). Using fallback.`);
        return fallbackUrl;
    }
}

async function main() {
    console.log("🚀 Starting Blog Image Restoration (Jan 10 - Feb 9, 2026)...");

    const startDate = new Date("2026-01-10");
    const endDate = new Date("2026-02-09");

    // Filter posts
    const targetPosts = blogPosts.filter(post => {
        const postDate = new Date(post.date);
        return postDate >= startDate && postDate <= endDate;
    });

    console.log(`Found ${targetPosts.length} posts to process.`);

    const postsFile = path.join(process.cwd(), 'src/data/blogPosts.ts');
    let fileContent = fs.readFileSync(postsFile, 'utf-8');

    for (const post of targetPosts) {
        console.log(`Processing: [${post.date}] ${post.title}`);

        // Generate new image
        const newImage = await generateImage(post.title, post.category, post.slug);

        // Update file content
        // We use a specific regex to replace the image field for this exact slug to avoid replacing wrong lines
        // Matches: slug: "the-slug", ... (any content) ... image: "old-value"
        // This is tricky with regex. Better to replace the specific string if unique.
        // Actually, we can regenerate the whole file content from the updated object, but that risks losing comments/formatting.
        // Let's replace the image line for this specific block.

        // Find the post block in the file content by slug
        const slugIndex = fileContent.indexOf(`slug: "${post.slug}"`);
        if (slugIndex === -1) {
            console.error(`Could not find slug in file: ${post.slug}`);
            continue;
        }

        // Find the image field following this slug
        const imageLabel = 'image: "';
        const imageIndex = fileContent.indexOf(imageLabel, slugIndex);
        if (imageIndex === -1) {
            console.error(`Could not find image field for slug: ${post.slug}`);
            continue;
        }

        const imageStart = imageIndex + imageLabel.length;
        const imageEnd = fileContent.indexOf('"', imageStart);
        const oldImage = fileContent.substring(imageStart, imageEnd);

        // Replace only if different (though we know it's likely different/broken)
        if (oldImage !== newImage) {
            // We need to be careful not to replace global occurrences, just this one.
            // String replacement by index is safer.
            fileContent = fileContent.substring(0, imageStart) + newImage + fileContent.substring(imageEnd);
        }

        // Wait a bit to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    fs.writeFileSync(postsFile, fileContent);
    console.log("✅ Restoration Complete. blogPosts.ts updated.");
}

main().catch(console.error);
