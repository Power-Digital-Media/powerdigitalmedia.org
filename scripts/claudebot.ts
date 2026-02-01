import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

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
    const systemPrompt = `You are the ClaudeBot Intelligence Agent for Power Digital Media. Tone: High-velocity, technical, and premium. Structure: Single H2 title on first line, then H3 subsections. Bold products and brands. End with a horizontal rule and "🛡️ Deploy the Protocol" section. Focus on early 2026 releases.`;
    const userPrompt = `Vertical: ${vertical.name}\nResearch Context:\n${context}\n\nTask: Draft a daily intel brief.`;

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

    // Fallback to Gemini
    if (!content && genAI) {
        const geminiModels = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-2.0-flash", "gemini-1.5-pro"];
        for (const modelName of geminiModels) {
            try {
                console.log(`   🛡️ Resiliency: Engaging ${modelName} Protocol...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
                content = await result.response.text();
                providerUsed = modelName;
                if (content) break;
            } catch (error: any) {
                console.warn(`   ⚠️ ${modelName} Pulse Interrupted: ${error.message}`);
            }
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
