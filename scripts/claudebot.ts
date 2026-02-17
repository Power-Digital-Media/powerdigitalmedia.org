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
    { id: 'workflow', name: 'Creative Velocity', category: 'Strategy', keywords: ['production workflow 2026', 'digital asset management', 'studio storage solutions', 'rendering pipeline optimization'] },
    // Phase 22 Expansion
    { id: 'tutorials', name: 'Engineering Labs', category: 'Tutorials', keywords: ['Next.js 16 server components', 'React 19 hooks guide', 'Tailwind CSS v4 tricks', 'Stripe integration tutorial', 'Firebase auth flow', 'PostgreSQL optimization', 'TypeScript strict mode'] },
    { id: 'showcase', name: 'Client Spotlight', category: 'Showcase', keywords: ['e-commerce redesign case study', 'high-performance landing page', 'SaaS dashboard UI', 'medical practice website design', 'law firm SEO strategy'] },
    { id: 'analysis', name: 'Industry Pulse', category: 'Analysis', keywords: ['AI agency trends 2026', 'web design pricing models', 'remote work culture', 'client acquisition strategy', 'software capitalization rules'] },
    // Phase 23 2026 Expansion
    { id: 'sovereign', name: 'Sovereign Cloud', category: 'Infrastructure', keywords: ['local LLM hosting', 'private cloud architecture', 'data sovereignty 2026', 'Ubuntu server AI', 'self-hosted RAG pipelines'] },
    { id: 'orchestration', name: 'Multiagent Orchestration', category: 'AI Intelligence', keywords: ['Gemini 3 Pro agents', 'LangGraph patterns', 'AI swarm intelligence', 'multi-model routing', 'autonomous coding agents'] },
    { id: 'physical', name: 'Physical AI', category: 'Studio Tech', keywords: ['Rodecaster Pro II AI features', 'Blackmagic Neural Engine', 'NVIDIA Jetson projects', 'smart studio automation', 'robotics in creative production'] }
];

const PERSONAS = [
    {
        id: 'strategist',
        role: "Lead Content Strategist",
        tone: "Strategic, High-Level, Business-Focused. You care about ROI, efficiency, and market positioning.",
        opener: "In the high-stakes world of digital production, precision is the only metric that matters."
    },
    {
        id: 'engineer',
        role: "Senior Principal Engineer",
        tone: "Technical, Cynical, Code-Base Obsessed. You care about performance metrics (TTFB, LCP), clean architecture, and avoiding technical debt. You hate marketing fluff.",
        opener: "Let's cut the marketing noise and look at the actual benchmarks."
    },
    {
        id: 'director',
        role: "Executive Creative Director",
        tone: "Visionary, Abstract, Design-First. You care about user experience (UX), emotional resonance, typography, and brand storytelling. You criticize bad kerning.",
        opener: "Design is not just how it looks; it's how it feels to the human on the other side of the glass."
    }
];

// Initialize Providers
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
// const genAI = process.env.GOOGLE_AI_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY) : null; // Unused for now

const MISSIONS = [
    { id: 'deep_scrape', name: 'The Deep Scrape', prompt: 'Find a specific quote from a developer on a Reddit thread or forum regarding [KEYWORD] and build the post around reacting to that quote.' },
    { id: 'benchmark_war', name: 'The Benchmark War', prompt: 'Find two competing pieces of hardware or software related to [KEYWORD] and write a "Real-World Performance" report based on latest 2026 data.' },
    { id: 'futurist', name: 'The Futurist', prompt: 'Look at [KEYWORD] today and write about what will replace it by 2028.' },
    { id: 'news', name: 'Standard Intel', prompt: 'Find the latest breaking news about [KEYWORD].' }
];

function getDynamicQuery(vertical: any): { query: string, mission: any } {
    const date = new Date();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const randomKeyword = vertical.keywords[Math.floor(Math.random() * vertical.keywords.length)];
    const mission = MISSIONS[Math.floor(Math.random() * MISSIONS.length)];

    let query = `latest breaking news ${month} ${year} ${vertical.name} ${randomKeyword}`;

    if (mission.id === 'deep_scrape') query = `site:reddit.com OR site:hackernews.com "${randomKeyword}" 2026 discussion`;
    if (mission.id === 'benchmark_war') query = `${randomKeyword} vs competitor benchmark 2026 review`;
    if (mission.id === 'futurist') query = `future of ${randomKeyword} predictions 2028`;

    return { query, mission };
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
    const { query, mission } = getDynamicQuery(vertical);
    console.log(`📡 [${vertical.name.toUpperCase()}] Mission: "${mission.name}" | Query: "${query}"`);

    let context = "";
    let score = 5; // Base score
    const fcKey = process.env.FIRECRAWL_API_KEY;

    if (fcKey && fcKey.startsWith('fc-')) {
        try {
            const resp = await fetch('https://api.firecrawl.dev/v1/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fcKey}` },
                body: JSON.stringify({ query: query, limit: 3 }),
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

    return { context, score, mission };
}

async function generatePost(vertical: any, context: string, mission: any) {
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Select Persona (Randomly or Specific)
    const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
    console.log(`   🎭 Persona Selected: ${persona.role} (${persona.id})`);

    const showroomContext = GEAR_COLLECTION.map(item =>
        `- ${item.name} (${item.brand}) Category: ${item.category}, Sub: ${item.subCategory}. Desc: ${item.description}. URL: /showroom/${item.category.toLowerCase()}/${item.id}`
    ).join('\n');

    // Anti-Duplication Protocol: Get last 20 post titles
    const recentTitles = blogPosts.slice(0, 20).map(p => `- ${p.title}`).join('\n');

    const systemPrompt = `
ROLE
You are ${persona.role} at Power Digital Media, a premium production and engineering studio in Jackson, Mississippi.
Tone: Opinionated, data-driven, authoritative, non-generic.

MISSION: Produce a deep, ranking-optimized technical intelligence article.

AUTHORITY REINFORCEMENT LAYER (MANDATORY)
1. DATA AUTHORITY RULE: All content must include measurable technical data (TFLOPS, IPC, latency, throughput, bitrate, TTFB, LCP, render time, power draw). Authority is built on real metrics, not opinion.
2. DEPTH REQUIREMENT: Content must explain WHY the technology matters, REAL-WORLD IMPACT, TRADEOFFS and limitations, and PRACTICAL production or engineering implications. Use 1200+ words of analysis.
3. E-E-A-T AUTHORITY SIGNAL: Include 2–3 natural outbound references to credible technical or industry sources.
4. SYSTEM SYNERGY RULE: Connect Hardware performance, AI / automation workflows, and Software / development infrastructure. Explain how these interact in real production environments.
5. STRUCTURAL COHERENCE GUARDRAIL: While anti-pattern variation is required, structure must remain logically organized, readable, and authoritative. Avoid randomness that reduces clarity.

FOOTPRINT KILLER LOGIC (CRITICAL)
Variable Openers — Rotate naturally. Start with ONE of these:
1. A shocking stat related to the topic.
2. A direct answer to a real query.
3. A controversial technical opinion.
Never use a generic intro like "In today's fast-paced world...".

CTR OPTIMIZATION RULE
Titles must be click-optimized but accurate, using:
- Version numbers (DaVinci Resolve 20.x, GPT-5.3, etc.).
- "The Truth About...".
- Specific outcomes / comparisons.
- Real user intent language.
Goal: Improve click-through from Search Console impressions.

ANSWER BLOCK (MANDATORY)
Provide a <150 character Quick Take designed to capture Google Featured Snippets.

CORE CONTENT REQUIREMENTS
1. Persona Conflict Protocol (MANDATORY): Personas must disagree inside the article:
   - Strategist → ROI / efficiency / opportunity.
   - Engineer → risk / flaw / technical debt.
   - Creative Director → UX / workflow / emotional impact.
   Rule: If topic is positive → expose risk. If topic is negative → expose opportunity. No neutral tone.
2. Internal Authority Mesh: 
   - Link to ONE relevant showroom product: ${showroomContext.slice(0, 1000)}...
   - Link to ONE related blog post from the last 10: ${recentTitles}.
   - Strengthen internal topic clusters.
3. Hardware-Software Synergy: Always connect hardware performance to real production workloads (AI/automation/dev infra).
4. Dynamic Structure Rule: Avoid template repetition. Vary paragraph length, mix lists/tables/prose, and use question-based H3 headings for "People Also Ask".

E-E-A-T REQUIREMENTS
- Real metrics (TTFB, LCP, TFLOPS, latency, IPC).
- Real-world implications from a Jackson, MS studio perspective.
- At least 2 natural outbound citations to authoritative external sources.

LONG-TAIL SEARCH INTENT PROTOCOL (MANDATORY)
Incorporate real user search phrasing (Question queries, Version updates, Comparison intent). Use variations and semantic equivalents naturally.

BANNED PHRASES (AI FIREWALL)
Do NOT use: delve, tapestry, landscape, navigate, unlock the potential, game-changer, paradigm shift, important to note.
Avoid generic AI tone.

SEARCH SUPREMACY: If real-time Search Context contradicts internal knowledge, Search Context ALWAYS WINS.

Based on the research context below, write a comprehensive article.`;

    const userPrompt = `Vertical: ${vertical.name}\nMission: ${mission.name}\n\nSearch Context:\n${context}\n\nTask: Draft a deep-dive daily intel brief.`;

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
        author: { name: persona.role, role: "Power Digital Media" },
        content: content.split('\n').filter(line => !line.trim().startsWith('# ')).join('\n').trim()
    };
}

async function main() {
    console.log("🚀 CLAUDEBOT: Initiating 'Top Two' Protocol...");

    // 1. Research Phase
    const candidates = [];
    for (const vertical of VERTICALS) {
        const { context, score, mission } = await runResearch(vertical);
        candidates.push({ vertical, context, score, mission });
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
            const post = await generatePost(story.vertical, story.context, story.mission);
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
