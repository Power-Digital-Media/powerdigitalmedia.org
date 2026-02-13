import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GEAR_COLLECTION } from '../src/data/gear';
import { blogPosts } from '../src/data/blogPosts';

// 🛡️ Ignite Authority Protocols
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// --- CONFIGURATION ---
const TOPIC = "DaVinci Resolve Studio 2026 Update";
const SEARCH_QUERY = "DaVinci Resolve update February 2026 new features specs benchmarks";
const VERTICAL = { name: "Software Ecosystem", category: "Software" };

async function getResearch() {
    console.log(`📡 [SPECIAL] Researching: "${SEARCH_QUERY}"...`);
    let context = "";
    const fcKey = process.env.FIRECRAWL_API_KEY;

    if (fcKey && fcKey.startsWith('fc-')) {
        try {
            const resp = await fetch('https://api.firecrawl.dev/v1/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fcKey}` },
                body: JSON.stringify({ query: SEARCH_QUERY, limit: 4 }),
                signal: AbortSignal.timeout(20000)
            });
            const data = await resp.json() as any;
            if (data.success && data.data) {
                context = data.data.map((d: any) => `Source: ${d.url}\n${d.markdown?.slice(0, 1500)}`).join("\n\n---\n\n");
                console.log(`   ✅ Research Complete.`);
            }
        } catch (e: any) {
            console.warn(`   ⚠️ Research interrupted: ${e.message}`);
        }
    }
    return context;
}

async function generateImage(title: string, vertical: string, slug: string) {
    if (!openai) return "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";

    try {
        console.log(`   🎨 Visuals: Generating SPECIAL asset for "${title}"...`);
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Cinematic editorial photography of a high-end color grading suite running DaVinci Resolve 2026. 
            Dark environment, moody lighting with signature Blackmagic Design orange and teal accents. 
            Focus on the software interface on a reference monitor and a DaVinci resolve advanced panel.
            Photorealistic, 8k, tech-noir aesthetic, no text.`,
            n: 1,
            size: "1024x1024",
            quality: "hd"
        });

        const dalleUrl = response.data?.[0]?.url;
        if (!dalleUrl) throw new Error("No URL returned from DALL-E");

        const imageResponse = await fetch(dalleUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const blogImagesDir = path.join(process.cwd(), 'public', 'blog-images');
        if (!fs.existsSync(blogImagesDir)) fs.mkdirSync(blogImagesDir, { recursive: true });

        const filename = `${slug}-${Date.now()}.png`;
        const filepath = path.join(blogImagesDir, filename);
        fs.writeFileSync(filepath, buffer);

        console.log(`   ✅ Visuals: Saved to /blog-images/${filename}`);
        return `/blog-images/${filename}`;

    } catch (error: any) {
        console.warn(`   ⚠️ Visuals failed: ${error.message}`);
        return "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";
    }
}

async function generatePost(context: string) {
    console.log(`   ✍️ Writing: Engaging OpenAI for Special Dispatch...`);

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const showroomContext = GEAR_COLLECTION.map(item =>
        `- ${item.name} (${item.brand}) Category: ${item.category}. Desc: ${item.description}. URL: /showroom/${item.category.toLowerCase()}/${item.id}`
    ).join('\n');

    const systemPrompt = `You are the Lead Content Strategist at Power Digital Media in Jackson, MS.
    Today is ${currentDate}.

    TASK: Write a "Special Edition" Deep Dive on the latest DaVinci Resolve update (Feb 2026).
    
    CRITICAL REQUIREMENTS:
    1. **The Update**: Analyze the new features in DaVinci Resolve (likely version 20 or 19.5 update). Focus on AI Color, Cloud Workflows, or Neural Engine improvements.
    2. **Historical Context**: Briefly explain DaVinci's dominance from hardware-only systems to the full software suite (Edit, Color, VFX, Audio).
    3. **Hardware Synergy**: Explain EXACTLY what hardware is needed to run this efficiently. Mention "Threadripper PRO", "RTX 5090", "Fast NVMe Storage".
    4. **Studio Perspective**: We use this daily. It's the industry standard.
    
    ESSENTIALS:
    - **Citations**: Include 3+ outbound do-follow links to Blackmagic Design, Puja, Editors Guild, or reputable tech sites.
    - **Internal Links**: Link to 3-5 specific showroom items (GPUs, Storage, Monitors).
    - **Length**: 1200+ words. Comprehensive guide.

    FORMAT:
    # [Title]
    ## Quick Take
    [Summary]
    ## [Sections...]
    
    INTERNAL INVENTORY:
    ${showroomContext}
    
    CONTEXT from Search:
    ${context}
    `;

    const response = await openai!.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: `Write the DaVinci Resolve Feature Post.` }],
        temperature: 0.5
    });

    const content = response.choices[0].message.content || "";
    const lines = content.split('\n');
    const titleLine = lines.find(l => l.trim().startsWith('# ')) || `Deep Dive: DaVinci Resolve 2026 Update`;
    const title = titleLine.replace(/^#+\s*/, '').replace(/\*/g, '').trim();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-').slice(0, 100);

    const imageUrl = await generateImage(title, VERTICAL.name, slug);

    return {
        slug, title,
        excerpt: content.split('\n').find(l => l.length > 50 && !l.startsWith('#'))?.slice(0, 180).trim() + "...",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: VERTICAL.category,
        image: imageUrl,
        author: { name: "Power Digital Media", role: "Senior Editor" },
        content
    };
}

async function main() {
    console.log("🚀 SPECIAL DISPATCH: Initiating DaVinci Protocol...");

    const context = await getResearch();
    const post = await generatePost(context);

    if (post) {
        // SAVE TO FILE
        const postsFile = path.join(process.cwd(), 'src/data/blogPosts.ts');
        const fileContent = fs.readFileSync(postsFile, 'utf-8');
        const match = fileContent.match(/export const blogPosts:\s*BlogPost\[\]\s*=\s*\[/);

        if (match) {
            const insertionPoint = match.index! + match[0].length;
            const newPostString = `
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
    },`;
            const newContent = fileContent.slice(0, insertionPoint) + newPostString + fileContent.slice(insertionPoint);
            fs.writeFileSync(postsFile, newContent);
            console.log(`✅ Special Feature Published: "${post.title}"`);
        }
    }
}

main().catch(console.error);
