import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GEAR_COLLECTION } from '../src/data/gear';
import { blogPosts } from '../src/data/blogPosts';

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
    const date = new Date();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const randomKeyword = vertical.keywords[Math.floor(Math.random() * vertical.keywords.length)];
    return `latest breaking news ${month} ${year} ${vertical.name} ${randomKeyword} announcement`;
}

async function generateImage(title: string, vertical: string, slug: string) {
    // Fallback images by category
    const fallbacks: Record<string, string> = {
        'Studio Tech': "/images/studio-mood-bg.webp",
        'Compute Core': "/images/studio-mood-bg.webp",
        'Software Ecosystem': "/images/studio-mood-bg.webp",
        'AI Intelligence': "/images/studio-mood-bg.webp",
        'Creative Velocity': "/images/studio-mood-bg.webp"
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

        // VERIFICATION: Check if file exists and has size
        const stats = fs.statSync(filepath);
        if (stats.size < 1000) {
            throw new Error("Generated image file is too small (corruption suspect). Reverting to fallback.");
        }

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

    const showroomContext = GEAR_COLLECTION.map(item =>
        `- ${item.name} (${item.brand}) Category: ${item.category}, Sub: ${item.subCategory}. Desc: ${item.description}. URL: /showroom/${item.category.toLowerCase()}/${item.id}`
    ).join('\n');

    // Anti-Duplication Protocol: Get last 20 post titles
    const recentTitles = blogPosts.slice(0, 20).map(p => `- ${p.title}`).join('\n');

    const systemPrompt = `You are the Lead Content Strategist at Power Digital Media, a premium production studio in Jackson, Mississippi.

    STRICT DATE PROTOCOL: Today is ${currentDate}. You must NOT treat future dates as past. All content must be anchored to the current moment in time.

    === SEARCH SUPREMACY PROTOCOL (CRITICAL) ===
    The Search Context provided below is the ABSOLUTE TRUTH for current events.
    1. If Search Context says "X released today", it is true, strictly prioritize it over your internal training data.
    2. If Search Context contradicts your internal knowledge, the Search Context WINS.
    3. Use internal knowledge ONLY for:
       - Historical context (e.g., "This builds upon the 2024 architecture...")
       - General technical explanations (e.g., "Ray tracing works by...")
    4. If Search Context is empty or generic, acknowledge the lack of specific breaking news and focus on EVERGREEN principles. DO NOT HALLUCINATE UPDATES.

    === CORE CONTENT PILLARS ===
    Your content must now rotate between or combine these three pillars:

    Cutting-Edge Hardware: Deep dives into workstation builds (Threadripper, i9-14900KS, etc.).

    AI & Creative Automation: GPT-5.3, Gemini 3, and Claude 3.5 workflows.

    Modern Web Architecture: Leading the conversation on Next.js 16+, Node.js 24+, Server Components, and Edge Computing.

    === ANTI-DUPLICATION PROTOCOL ===
    You must NOT generate content that overlaps significantly with these recent headlines:
${recentTitles}
    
    If a topic suggests a duplicate, pivot to the technical implementation (e.g., "Optimizing Next.js Runtimes on the i9-14900KS" instead of just "Next.js Update").

    TEMPORAL AWARENESS (2026): GPT-5.3 Codex, Gemini 3 Pro, and Claude 3.5 Opus are the standard. React 19/20 and Next.js 16 are the baseline for "cutting edge."

    === LEGACY TECH PROTOCOL (STRICT) ===
    You must treat the following technologies as "Previous Generation" or "Legacy". refer to them ONLY for comparison:
    - GPT-4 / GPT-4o (Two years old)
    - RTX 3090 / 4090 (Previous Gen)
    - Ryzen 7000 / 8000 (Old Architecture)
    - Midjourney v6 (We are on v7/v8)
    - DaVinci Resolve 18/19 (We are on 20.3.2)
    
    If your search context mentions these as "new", you must contextualize them as "the foundation for the current [2026 Tech]". Do NOT hype them as cutting edge.

    === ENHANCED EDITORIAL PROTOCOL ===
    1. ANSWER BLOCK (MANDATORY): Start with a 40-60 word "Quick Take" summary answering the core question.
    2. LEAD WITH DATA: Start with specific metrics (TTFB, LCP, TFLOPS, IPC), no generic openers.
    3. STUDIO PERSPECTIVE: Write as Power Digital Media in Jackson, MS. Emphasize that we don't just write about tech; we build the systems that run it.
    4. DEVELOPER-HARDWARE SYNERGY: When discussing web design (Next.js/Node.js), mention the hardware required for local LLM integration, fast builds, and containerization.
    5. INTERNAL LINKING: Link to /showroom products (3-5 links minimum). New Requirement: Link hardware to dev use-cases (e.g., "The Samsung 990 Pro is essential for rapid npm install cycles and heavy Node_Modules management").
    6. HEADINGS: Use question-based H3s optimized for featured snippets.
    7. E-E-A-T & CITATIONS (CRITICAL): Include at least 3 outbound do-follow links to reputable industry sources (e.g., Vercel Blog, Node.js Foundation, Wired) to validate your claims. Hyperlink the specific data points or quotes.
    8. CHECKLIST: Ensure 900+ words of deep technical analysis.
    9. FORMATTING: The very first line of your response MUST be the title, starting with a single #.

    REQUIRED OUTPUT FORMAT:
    # [Short, Punchy Title (Max 10 Words)]

    ## Quick Take
    [Your summary here...]

    ## [H2: The Technical Deep Dive]
    [Focus on specific metrics, code-level insights, or hardware specs...]

    ### [H3: Question-based heading for SEO?]
    [Content...]

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
    // Find the title line (starts with #) or fallback to first non-empty line
    const titleLine = lines.find(l => l.trim().startsWith('# ')) || lines.find(l => l.trim().length > 0 && l.trim().length < 100) || `Daily Intel: ${vertical.name}`;
    const title = titleLine.replace(/^#+\s*/, '').replace(/\*/g, '').trim();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-').slice(0, 100);

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

        const match = fileContent.match(/export const blogPosts:\s*BlogPost\[\]\s*=\s*\[/);
        if (!match) {
            console.error("❌ CRITICAL ERROR: Could not find 'blogPosts' array definition.");
            console.error("   File start check:", fileContent.slice(0, 200));
            throw new Error("Could not find blogPosts array");
        }
        const arrayStart = match.index!;

        const insertionPoint = match.index! + match[0].length;

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
        // Write back
        const newContent = fileContent.slice(0, insertionPoint) + newPostsString + fileContent.slice(insertionPoint);
        fs.writeFileSync(postsFile, newContent);
        console.log(`✅ Successfully added ${newPosts.length} new posts.`);
    } else {
        console.log("⚠️ No new posts generated.");
    }
}

main().catch(console.error);
