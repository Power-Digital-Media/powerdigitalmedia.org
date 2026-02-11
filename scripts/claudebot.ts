import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GEAR_COLLECTION } from '../src/data/gear';

// 🛡️ Ignite Authority Protocols
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config();

/**
 * 🤖 CLAUDEBOT: RESILIENT MULTI-DOMAIN AUTHORITY ENGINE
 * Built for Power Digital Media
 */

const VERTICALS = [
    { id: 'gear', name: 'Studio Tech', category: 'Daily Intel', keywords: ['studio hardware', 'microphones', 'audio interfaces', 'cameras', 'lighting', 'production gear'] },
    { id: 'compute', name: 'Compute Core', category: 'Hardware', keywords: ['NVIDIA RTX 50-series', 'AMD Ryzen 9000', 'Intel Arrow Lake', 'GPU benchmarks', 'CPU architecture'] },
    { id: 'creative', name: 'Software Ecosystem', category: 'Software', keywords: ['DaVinci Resolve update', 'Adobe Premiere Pro features', 'Final Cut Pro AI', 'logic pro updates', 'video editing software'] },
    { id: 'ai', name: 'AI Intelligence', category: 'AI Tech', keywords: ['GPT-5.3 Codex', 'Gemini 3 Pro', 'Claude 3.5 Opus', 'LLM benchmarks', 'AI video generation tools'] },
    { id: 'workflow', name: 'Creative Velocity', category: 'Strategy', keywords: ['production workflow 2026', 'digital asset management', 'studio storage solutions', 'rendering pipeline optimization'] }
];

// Initialize Providers
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
// const genAI = process.env.GOOGLE_AI_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY) : null; // Unused for now

function getDynamicQuery(vertical: any): string {
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const randomKeyword = vertical.keywords[Math.floor(Math.random() * vertical.keywords.length)];
    return `latest news ${vertical.name} ${randomKeyword} ${dayOfWeek} Feb 2026`;
}

async function generateImage(title: string, vertical: string, slug: string) {
    // Fallback images by category
    const fallbacks: Record<string, string> = {
        'Studio Tech': "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
        'Compute Core': "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80",
        'Software Ecosystem': "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
        'AI Intelligence': "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        'Creative Velocity': "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
    };

    const fallbackUrl = fallbacks[vertical] || fallbacks['Creative Velocity'];

    if (!openai) return fallbackUrl;

    try {
        console.log(`   🎨 Visuals: Generating high-prestige asset for "${title}"...`);
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
        console.log(`   📥 Visuals: Downloading image for permanent storage...`);
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

        console.log(`   ✅ Visuals: Image saved permanently to /blog-images/${filename}`);
        return `/blog-images/${filename}`;

    } catch (error: any) {
        console.warn(`   ⚠️ Visuals: Generation failed (${error.message}). Using specific fallback.`);
        return fallbackUrl;
    }
}

async function runResearch(vertical: any) {
    const dynamicQuery = getDynamicQuery(vertical);
    console.log(`📡 [${vertical.name.toUpperCase()}] Researching: "${dynamicQuery}"...`);

    let context = "";
    let score = 5; // Base score
    const fcKey = process.env.FIRECRAWL_API_KEY;

    if (fcKey && fcKey.startsWith('fc-')) {
        try {
            const resp = await fetch('https://api.firecrawl.dev/v1/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fcKey}` },
                body: JSON.stringify({ query: dynamicQuery, limit: 3 }),
                signal: AbortSignal.timeout(15000)
            });
            const data = await resp.json() as any;
            if (data.success && data.data) {
                context = data.data.map((d: any) => `Source: ${d.url}\n${d.markdown?.slice(0, 1000)}`).join("\n\n---\n\n");

                // Scoring Logic
                if (context.toLowerCase().includes('announce') || context.toLowerCase().includes('launch')) score += 2;
                if (context.toLowerCase().includes('benchmark') || context.toLowerCase().includes('spec')) score += 1;
                console.log(`   ✅ Research Complete. Relevance Score: ${score}/10`);
            }
        } catch (e) {
            console.warn(`   ⚠️ Research interrupted. Score: ${score}/10`);
        }
    }

    return { context, score };
}

async function generatePost(vertical: any, context: string) {
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const showroomContext = GEAR_COLLECTION.slice(0, 10).map(item =>
        `- ${item.name} (${item.brand}) [${item.category}]: ${item.description}. LINK: /showroom/${item.category.toLowerCase()}/${item.id}`
    ).join('\n');

    const systemPrompt = `You are the Lead Content Strategist at Power Digital Media, a premium production studio in Jackson, Mississippi.
    
    STRICT DATE PROTOCOL: Today is ${currentDate}. You must NOT treat future dates as past. All content must be anchored to the current moment in time.

    TEMPORAL AWARENESS (CRITICAL): As of February 2026, the AI industry is dominated by GPT-5.3 Codex (OpenAI), Gemini 3 Pro (Google), and Claude 3.5 Opus (Anthropic). Legacy models like ChatGPT-4o and Gemini 1.5 Pro are deprecated. All analysis must reflect this 2026 landscape.

    === ENHANCED EDITORIAL PROTOCOL ===
    1. ANSWER BLOCK (MANDATORY): Start with a 40-60 word "Quick Take" summary answering the core question.
    2. LEAD WITH DATA: Start with specific metrics (TFLOPS, IPC), no generic openers.
    3. STUDIO PERSPECTIVE: Write as Power Digital Media in Jackson, MS.
    4. INTERNAL LINKING: Link to /showroom products (3-5 links minimum).
    5. HEADINGS: Use question-based H3s optimized for featured snippets.
    6. E-E-A-T: Cite sources, use real names, cross-reference 2026 specs.
    7. CHECKLIST: Ensure 900+ words of deep technical analysis.

    INTERNAL SHOWROOM INVENTORY (for reference):
${showroomContext}

    Based on the research context below, write a comprehensive, technically authoritative blog post.`;

    const userPrompt = `Vertical: ${vertical.name}\n\nSearch Context:\n${context}\n\nTask: Draft a deep-dive daily intel brief.`;

    let content = "";
    if (openai) {
        try {
            console.log(`   ✍️ Writing: Engaging OpenAI for ${vertical.name}...`);
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
                temperature: 0.6
            });
            content = response.choices[0].message.content || "";
        } catch (error: any) {
            console.warn(`   ⚠️ Writing failed: ${error.message}`);
        }
    }

    if (!content) throw new Error("Content generation failed");

    const lines = content.split('\n');
    const firstLine = lines.find(l => l.trim().length > 0 && !l.startsWith('#')) || `Daily Intel: ${vertical.name}`;
    const title = firstLine.replace(/#{1,3}\s?/, '').replace(/\*/g, '').trim();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-');

    const imageUrl = await generateImage(title, vertical.name, slug);

    return {
        slug, title,
        excerpt: content.split('\n').find(l => l.length > 50 && !l.startsWith('#'))?.slice(0, 180).trim() + "...",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: vertical.category,
        image: imageUrl,
        author: { name: "Power Digital Media", role: "Editorial Intelligence" },
        content
    };
}

async function main() {
    console.log("🚀 CLAUDEBOT: Initiating 'Top Two' Protocol...");

    // 1. Research Phase
    const candidates = [];
    for (const vertical of VERTICALS) {
        const { context, score } = await runResearch(vertical);
        candidates.push({ vertical, context, score });
    }

    // 2. Selection Phase (Top 2)
    const topStories = candidates
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);

    console.log(`🏆 Top Stories Selected: ${topStories.map(s => s.vertical.name).join(', ')}`);

    // 3. Generation Phase
    const newPosts = [];
    for (const story of topStories) {
        try {
            const post = await generatePost(story.vertical, story.context);
            if (post) newPosts.push(post);
        } catch (e) {
            console.error(`Failed to generate post for ${story.vertical.name}:`, e);
        }
    }

    if (newPosts.length > 0) {
        // Read existing posts
        const postsFile = path.join(process.cwd(), 'src/data/blogPosts.ts');
        const fileContent = fs.readFileSync(postsFile, 'utf-8');

        // Find insertion point (start of array)
        const arrayStart = fileContent.indexOf('export const blogPosts: BlogPost[] = [');
        if (arrayStart === -1) throw new Error("Could not find blogPosts array");

        const insertionPoint = fileContent.indexOf('[', arrayStart) + 1;

        // Format new posts
        const newPostsString = newPosts.map(post => `
    {
        slug: "${post.slug}",
        title: "${post.title.replace(/"/g, '\\"')}",
        excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
        date: "${post.date}",
        category: "${post.category}",
        image: "${post.image}",
        author: {
            name: "${post.author.name}",
            role: "${post.author.role}"
        },
        content: \`
${post.content.replace(/`/g, '\\`')}
        \`
    },`).join('');

        // Write back
        const newContent = fileContent.slice(0, insertionPoint) + newPostsString + fileContent.slice(insertionPoint);
        fs.writeFileSync(postsFile, newContent);
        console.log(`✅ Successfully added ${newPosts.length} new posts.`);
    } else {
        console.log("⚠️ No new posts generated.");
    }
}

main().catch(console.error);
