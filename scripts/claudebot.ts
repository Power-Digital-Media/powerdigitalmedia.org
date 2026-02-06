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
    { id: 'gear', name: 'Studio Tech', category: 'Daily Intel', searchQuery: 'latest studio hardware releases Jan Feb 2026' },
    { id: 'software', name: 'Editing Protocols', category: 'Software', searchQuery: 'DaVinci Resolve 19 Premiere Pro 2026 software news' },
    { id: 'ai', name: 'AI Intelligence', category: 'AI Tech', searchQuery: 'latest AI production tools early 2026' },
    { id: 'design', name: 'Design Strategy', category: 'Web Design', searchQuery: 'modern high-end web design trends 2026' }
];

// Initialize Providers
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const genAI = process.env.GOOGLE_AI_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY) : null;

async function runResearch(vertical: any) {
    console.log(`📡 [${vertical.name.toUpperCase()}] Initiating Research...`);
    let context = "Direct Neural Intelligence Briefing";
    const fcKey = process.env.FIRECRAWL_API_KEY;

    // Phase 1: Research (Firecrawl)
    if (fcKey && fcKey.startsWith('fc-')) {
        try {
            console.log(`   🔍 Research: Scanning the domain arena...`);
            const resp = await fetch('https://api.firecrawl.dev/v1/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fcKey}` },
                body: JSON.stringify({ query: vertical.searchQuery, limit: 3 }),
                signal: AbortSignal.timeout(15000)
            });
            const data = await resp.json() as any;
            if (data.success && data.data) {
                context = data.data.map((d: any) => `Source: ${d.url}\n${d.markdown?.slice(0, 1000)}`).join("\n\n---\n\n");
                console.log(`   ✅ Research: Specialized data acquisition complete.`);
            }
        } catch (e) {
            console.warn(`   ⚠️ Research: Pulse interrupted. Using internal technical data.`);
        }
    }

    // Phase 2: Writing (Multi-Model Fallback)
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Format Showroom for Context
    const showroomContext = GEAR_COLLECTION.slice(0, 50).map(item =>
        `- ${item.name} (${item.brand}) [${item.category}]: ${item.description}. LINK: /showroom/${item.category.toLowerCase()}/${item.id}`
    ).join('\n');

    const systemPrompt = `You are the ClaudeBot Intelligence Agent for Power Digital Media.
    
    STRICT DATE PROTOCOL: Today is ${currentDate}. You must NOT treat future dates as past. All content must be anchored to the current moment in time.

    TONE & DEPTH:
    - High-velocity, technical, and premium.
    - Deep Research Mode: Aim for comprehensive depth (min 600-800 words).
    - Authoritative: Use industry terminology and specific technical specifications.

    CRITICAL REQUIREMENTS:
    1. OUTBOUND AUTHORITY LINKS: You MUST include 2-3 "do-follow" style hyperlinks to external authoritative sources (e.g., The Verge, TechCrunch, Manufacturer Press Releases) that verify your claims.
    2. INTERNAL SHOWROOM SYNERGY: You have access to the "Internal Showroom Inventory" provided in the prompt. You MUST scan this list. If you discuss a product category (e.g. microphones, cameras, GPUs), you MUST explicitly mention our specific product and link to it using the exact internal path provided. THIS IS MANDATORY FOR CONVERSION.

    Structure: Single H2 title on first line, then H3 subsections. Bold products and brands. End with a horizontal rule and "🛡️ Deploy the Protocol" section.`;

    const userPrompt = `Vertical: ${vertical.name}\n\nSearch Context:\n${context}\n\nINTERNAL SHOWROOM INVENTORY (Link to these if relevant):\n${showroomContext}\n\nTask: Draft a deep-dive daily intel brief based on the above research and inventory.`;

    let content = "";
    let providerUsed = "";

    // Try OpenAI First
    if (openai) {
        try {
            console.log(`   ✍️ Writing: Engaging OpenAI (GPT-4o) Protocol...`);
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
                temperature: 0.6
            });
            content = response.choices[0].message.content || "";
            providerUsed = "OpenAI GPT-4o";
        } catch (error: any) {
            console.warn(`   ⚠️ OpenAI Quota Exhausted or Failed: ${error.message}`);
        }
    }

    // Fallback to Gemini (Direct REST API)
    if (!content && process.env.GOOGLE_AI_KEY) {
        try {
            console.log(`   🛡️ Resiliency: Engaging Gemini 1.5 Flash (Direct REST) Protocol...`);

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_AI_KEY}`;
            const response = await fetch(geminiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
                    }]
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Gemini API Error: ${response.status} ${errText}`);
            }

            const data = await response.json() as any;
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts.length > 0) {
                content = data.candidates[0].content.parts[0].text;
                providerUsed = "Gemini 1.5 Flash (REST)";
            }
        } catch (error: any) {
            console.warn(`   ⚠️ Gemini Pulse Interrupted: ${error.message}`);
        }
    }

    if (!content) throw new Error("Intelligence generation failed across all providers.");

    console.log(`   🔥 Content Generated via ${providerUsed}.`);

    const lines = content.split('\n');
    const firstLine = lines.find(l => l.trim().length > 0 && !l.startsWith('`')) || "";
    const title = firstLine.replace(/#{1,3}\s?/, '').replace(/\*/g, '').trim() || `Daily Intel: ${vertical.name}`;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-');

    return {
        slug, title,
        excerpt: content.split('\n').find(l => l.length > 40 && !l.startsWith('#'))?.slice(0, 180).replace(/\*/g, '').trim() + "...",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: vertical.category,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
        author: { name: "ClaudeBot", role: "Autonomous Intelligence" },
        content: content.replace(firstLine, '').trim()
    };
}

async function injectPost(post: any) {
    const filePath = path.join(process.cwd(), 'src/data/blogPosts.ts');
    let fileContent = fs.readFileSync(filePath, 'utf8');

    if (fileContent.includes(`slug: "${post.slug}"`)) {
        console.warn(`   ⚠️ Collision: Intelligence already indexed for ${post.slug}`);
        return;
    }

    const escaped = post.content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const postStr = `    {
        slug: "${post.slug}",
        title: "${post.title}",
        excerpt: "${post.excerpt}",
        date: "${post.date}",
        category: "${post.category}",
        image: "${post.image}",
        author: { name: "${post.author.name}", role: "${post.author.role}" },
        content: \`
${escaped}
    \`
    },`;

    const point = fileContent.lastIndexOf('];');
    const updated = fileContent.slice(0, point) + postStr + '\n' + fileContent.slice(point);
    fs.writeFileSync(filePath, updated);
    console.log(`   🚀 Success: ${post.title} indexed.`);
}

async function main() {
    console.log("-----------------------------------------");
    console.log("🤖 CLAUDEBOT OPERATIONAL PROTOCOL START");
    const verticalId = process.argv[2];
    const targets = verticalId && verticalId !== '--dry-run' ? VERTICALS.filter(v => v.id === verticalId) : VERTICALS;

    for (const v of targets) {
        try {
            const post = await runResearch(v);
            if (process.argv.includes('--dry-run')) {
                console.log(`🧪 [DRY RUN] Brief Generated: ${post.title}`);
                console.log(`\n--- PREVIEW ---\n${post.content.slice(0, 2000)}...\n---------------\n`);
            } else {
                await injectPost(post);
            }
        } catch (error: any) {
            console.error(`❌ FAILURE: ${v.id} | ${error.message}`);
        }
    }
    console.log("🦾 PULSE COMPLETE. ALL SECTORS STABILIZED.");
}

main();
