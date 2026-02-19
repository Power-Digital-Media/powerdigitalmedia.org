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
    const sources: string[] = [];

    if (fcKey && fcKey.startsWith('fc-')) {
        try {
            const resp = await fetch('https://api.firecrawl.dev/v1/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fcKey}` },
                body: JSON.stringify({
                    query: query,
                    limit: 4, // Increased limit to find more data
                    scrapeOptions: { formats: ['markdown'] }
                }),
                signal: AbortSignal.timeout(20000) // Increased timeout
            });

            const data = await resp.json() as any;

            if (data.success && data.data) {
                context = data.data.map((d: any, i: number) => {
                    sources.push(d.url);
                    return `SOURCE [${i + 1}]: ${d.url}\nTITLE: ${d.title || 'Unknown'}\nCONTENT:\n${d.markdown?.slice(0, 1500)}...`;
                }).join("\n\n---\n\n");

                // Scoring Logic
                if (context.toLowerCase().includes('announce') || context.toLowerCase().includes('launch')) score += 2;
                if (context.toLowerCase().includes('benchmark') || context.toLowerCase().includes('spec')) score += 1;
                console.log(`   ✅ Research Complete. Found ${sources.length} sources. Relevance Score: ${score}/10`);
            }
        } catch (e) {
            console.warn(`   ⚠️ Research interrupted. Score: ${score}/10`, e);
        }
    }

    return { context, score, mission, sources };
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

    const systemPrompt = `MASTER SYSTEM PROMPT V2.3 FOR ANTIGRAVITY
Power Digital Media — Unified Research + Writing Execution Engine

ROLE
You are the fully autonomous dual-agent content engine for Power Digital Media, combining:
1) Gemini Research Protocol (Data Intelligence Unit)
2) GPT Writing Protocol (Narrative Execution Unit)

Your mission: Produce the highest-quality, most authoritative, wealth-generating content that requires ZERO rewriting.

-----------------------------------------
RELATED GEAR SELECTION (MANDATORY)
-----------------------------------------
At the very end of your response, provide exactly 4 Gear IDs from the provided "Showroom Gear Context" list that are most relevant to the article content.
Format: RELATED_GEAR_IDS: ["id1", "id2", "id3", "id4"]
IMPORTANT: Use ONLY the IDs provided in the context. Do not invent IDs.

-----------------------------------------
GLOBAL OBJECTIVES
-----------------------------------------
• Create the BEST resource on the internet for the target keyword.
• Wealth Generation: Content must focus on ROI, competitive leverage, and business growth.
• Use long-tail keywords naturally (No keyword stuffing).
• Visual Value: Include at least one Markdown Table or data chart per post.
• External Utility: Link to specific 3rd-party tools (calculators, checkers) that provide real value.

-----------------------------------------
STRICT SEO & FOOTPRINT CONSTRAINTS
-----------------------------------------
• SEO Title: 50–60 characters ONLY.
• Meta Description: 150–160 characters ONLY.
• Footprint Killer: Start with a shocking stat, direct answer, or controversial stance. NO generic AI intros.
• Banned Phrases: delve, tapestry, landscape, navigate, unlock, game-changer, in conclusion.

-----------------------------------------
PERSONA CONFLICT FRAMEWORK (MANDATORY)
-----------------------------------------
Merge three distinct voices without "neutralizing" them:
1. THE STRATEGIST: Focus on ROI, money, and market dominance.
2. THE ENGINEER: Focus on specs, latency, security, and "the catch."
3. THE CREATIVE: Focus on user experience and human narrative.
Visible conflict is required (e.g., "The Strategist sees profit, but the Engineer warns of technical debt").

-----------------------------------------
CITATION & HYPERLINK PROTOCOL (CRITICAL)
-----------------------------------------
• INLINE ONLY: You MUST hyperlink the source name directly within the sentence (e.g., [Gartner](URL) reports...).
• NO LISTS: Do not create a "References" section or put links at the end of paragraphs.
• FRESHNESS: Use sources from the last 6-12 months.
• UTILITY LINKS: Link to actual tools like [Qualys SSL Labs](https://www.ssllabs.com/) or [AWS Calculators](https://calculator.aws/).

-----------------------------------------
LOCAL AUTHORITY SIGNAL
-----------------------------------------
Integrate the perspective of a high-end production studio based in Jackson, Mississippi. Reference real-world studio implications (e.g., network reliability, local production workflows, or regional business scaling).

-----------------------------------------
JSON-LD STRUCTURED DATA
-----------------------------------------
At the end of every post, generate a valid <script type="application/ld+json"> block including:
• Article Schema
• FAQ Schema (based on the 3 PAA questions)
• Product Schema (if gear is mentioned)

-----------------------------------------
INTERNAL QUALITY CONTROL CHECKLIST (MANDATORY)
-----------------------------------------
Before outputting, verify:
1. [ ] Title & Meta within character limits?
2. [ ] First citation hyperlinked INLINE?
3. [ ] NO "References" list at the bottom?
4. [ ] At least one Markdown Table included?
5. [ ] Jackson, MS perspective integrated?
6. [ ] 3 PAA H3 Headings present?
7. [ ] "Short Answer" block present?
8. [ ] Persona conflict visible?
9. [ ] 4 Gear IDs included?
10. [ ] JSON-LD script included?
11. [ ] Banned phrases avoided?
12. [ ] Long-tail keywords integrated naturally?

FINAL OUTPUT FORMAT:
1. SEO Title/Meta
2. HTML Body (with Inline Links & Table)
3. RELATED_GEAR_IDS
4. JSON-LD Block`;

    const userPrompt = `Vertical: ${vertical.name}\nMission: ${mission.name}\n\nSearch Context:\n${context}\n\nShowroom Gear Context (Use these IDs for Related Gear):\n${showroomContext}\n\nTask: Draft a deep-dive daily intel brief.`;

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

    // --- METADATA EXTRACTION LAYER ---
    let seoTitle = "";
    let metaDescription = "";
    const cleanLines: string[] = [];

    content.split('\n').forEach(line => {
        const trimmed = line.trim();
        // Regex handles: "SEO Title:", "**SEO Title:**", "## SEO Title:", "### **SEO Title:**"
        if (trimmed.match(/^[\#\*]*\s*SEO Title:?[\*]*\s*/i)) {
            seoTitle = trimmed.replace(/^[\#\*]*\s*SEO Title:?[\*]*\s*/i, '').trim();
        } else if (trimmed.match(/^[\#\*]*\s*Meta Description:?[\*]*\s*/i)) {
            metaDescription = trimmed.replace(/^[\#\*]*\s*Meta Description:?[\*]*\s*/i, '').trim();
        } else {
            cleanLines.push(line);
        }
    });
    content = cleanLines.join('\n').trim();

    // --- JSON-LD EXTRACTION LAYER ---
    let structuredData = null;

    // Strategy 1: Look for <script> tags (Preferred)
    let jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

    // Strategy 2: Look for markdown code blocks containing schema.org
    if (!jsonLdMatch) {
        const codeBlockMatch = content.match(/```json\s*(\{[\s\S]*?"@context"\s*:\s*"https?:\/\/schema\.org"[\s\S]*?\})\s*```/);
        if (codeBlockMatch) {
            jsonLdMatch = codeBlockMatch; // structuredData is in group 1
        }
    }

    if (jsonLdMatch) {
        try {
            structuredData = JSON.parse(jsonLdMatch[1]);
            console.log(`   🧩 JSON-LD Extracted successfully.`);
            content = content.replace(jsonLdMatch[0], '').trim();
        } catch (e) {
            console.warn(`   ⚠️ JSON-LD Parse Failed:`, e);
        }
    }

    // --- AI FIREWALL SANITIZATION LAYER ---
    const bannedPhrases = [
        /in today's fast-paced world/i,
        /in conclusion/i,
        /ultimately/i,
        /delve/i,
        /unlock/i,
        /game(?:-| )changer/i,
        /leverage/i,
        /whether you're a beginner or expert/i,
        /tapestry/i,
        /landscape/i,
        /navigate/i,
        /paradigm shift/i,
        /important to note/i,
        /in summary/i
    ];

    // 1. Scrub banned phrases
    bannedPhrases.forEach(regex => {
        content = content.replace(regex, (match) => {
            console.warn(`🔥 AI Firewall: Scrubbed banned phrase "${match}"`);
            return "critical innovation"; // Context-aware fallback/filler or just remove
        });
    });

    const lines = content.split('\n');

    // 2. Enforce Quick Take Length (< 150 chars)
    let quickTakeLine = lines.find(l => l.includes("Quick Take:"));
    if (quickTakeLine) {
        const originalQT = quickTakeLine.replace(/\*\*Quick Take:\*\*/, '').replace(/Quick Take:/, '').trim();
        if (originalQT.length > 150) {
            console.warn(`📏 AI Firewall: Truncating Quick Take (${originalQT.length} chars)`);
            const truncatedQT = originalQT.slice(0, 147) + "...";
            content = content.replace(originalQT, truncatedQT);
        }
    }

    // --- END SANITIZATION ---

    const processedLines = content.split('\n');
    let titleLine = processedLines.find(l => l.trim().startsWith('# '));
    let title = titleLine ? titleLine.replace(/^#+\s*/, '').replace(/\*/g, '').trim() : seoTitle;

    if (!title) {
        titleLine = processedLines.find(l => l.trim().length > 5 && l.trim().length < 100) || `Daily Intel: ${vertical.name}`;
        title = titleLine ? titleLine.replace(/^#+\s*/, '').replace(/\*/g, '').trim() : `Daily Intel: ${vertical.name}`;
    }

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-').slice(0, 100);

    const imageUrl = await generateImage(title, vertical.name, slug);

    return {
        slug, title: title || seoTitle,
        seoTitle,
        metaDescription,
        structuredData,
        excerpt: content.split('\n').find(l => l.length > 50 && !l.startsWith('#'))?.slice(0, 180).trim() + "...",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: vertical.category,
        image: imageUrl,
        author: { name: persona.role, role: "Power Digital Media" },
        relatedGearIds: content.match(/RELATED_GEAR_IDS:\s*\[(.*?)\]/)?.[1].split(',').map(s => s.trim().replace(/['"]+/g, '')) || [],
        content: content.split('\n')
            .filter(line => !line.trim().startsWith('# ') && !line.includes('RELATED_GEAR_IDS:'))
            .join('\n').trim()
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
        seoTitle: "${(post.seoTitle || post.title).replace(/"/g, '\\"')}",
        metaDescription: "${(post.metaDescription || '').replace(/"/g, '\\"')}",
        excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
        date: "${post.date}",
        category: "${post.category}",
        image: "${post.image}",
        author: {
            name: "${post.author.name}",
            role: "${post.author.role}"
        },
        relatedGearIds: ${JSON.stringify(post.relatedGearIds)},
        structuredData: ${JSON.stringify(post.structuredData)},
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
