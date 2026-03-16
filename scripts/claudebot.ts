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

// =============================================
// NUCLEAR BLOG POST V3.2 — VALIDATION ENGINE
// =============================================

const VALID_GEAR_IDS = new Set(GEAR_COLLECTION.map(g => g.id));

// Tier 1: Forbidden Phrases (always removed)
// Tier 3: Hedging Language (always removed)
const BANNED_PHRASES: { regex: RegExp; replacement: string }[] = [
    // --- TIER 1: Forbidden Phrases ---
    { regex: /in today's (?:rapidly evolving |fast-paced )?(?:digital )?(?:landscape|world),?\s*/gi, replacement: '' },
    { regex: /in the ever-changing world of\s*/gi, replacement: '' },
    { regex: /\bdelve(?:s|d)?\s+(?:into|deeper)?\s*/gi, replacement: 'examine ' },
    { regex: /\bdive(?:s|d)?\s+into\s*/gi, replacement: 'explore ' },
    { regex: /\bunlock(?:s|ing)?\s+(?:the\s+)?(?:potential|power|secrets)\s*/gi, replacement: '' },
    { regex: /\bharness(?:es|ing)?\s+the\s+power\s+of\s*/gi, replacement: 'use ' },
    { regex: /\bleverage\s+the\s+power\s+of\s*/gi, replacement: 'use ' },
    { regex: /\bleverage\b/gi, replacement: 'use' },
    { regex: /\bnavigate\s+the\s+complexities\s+of\s*/gi, replacement: 'work through ' },
    { regex: /\bnavigate\b(?=\s+(?:the|this|these|complex))/gi, replacement: 'work through' },
    { regex: /the (?:world|realm) of \[?\w+\]?\s*/gi, replacement: '' },
    { regex: /\ba tapestry of\b/gi, replacement: 'a mix of' },
    { regex: /\btapestry\b/gi, replacement: 'ecosystem' },
    { regex: /\bbustling landscape\b/gi, replacement: 'active market' },
    { regex: /\blandscape\b(?=\s+(?:of|is|has|continues))/gi, replacement: 'market' },
    { regex: /\bbeacon of\b/gi, replacement: 'example of' },
    { regex: /\bgame[- ]changer\b/gi, replacement: 'major advancement' },
    { regex: /\bcutting[- ]edge solution\b/gi, replacement: 'modern approach' },
    { regex: /\brevolutionary approach\b/gi, replacement: 'new method' },
    { regex: /\bin conclusion,?\s*/gi, replacement: '' },
    { regex: /\bultimately,?\s*/gi, replacement: '' },
    { regex: /\bin summary,?\s*/gi, replacement: '' },
    { regex: /\bparadigm shift\b/gi, replacement: 'fundamental change' },
    { regex: /(?:it(?:'s| is) )?important to note(?:\s+that)?/gi, replacement: '' },
    { regex: /whether you're a beginner or (?:an )?expert,?\s*/gi, replacement: '' },
    // --- TIER 3: Hedging Language ---
    { regex: /\bcan help improve\b/gi, replacement: 'improves' },
    { regex: /\bmay help improve\b/gi, replacement: 'improves' },
    { regex: /\bmight result in\b/gi, replacement: 'results in' },
    { regex: /\bcould potentially\b/gi, replacement: 'will' },
    { regex: /\bis designed to\b/gi, replacement: '' },
    { regex: /\bis intended to\b/gi, replacement: '' },
    { regex: /\bhas the potential to\b/gi, replacement: 'can' },
];

interface ValidationResult {
    passed: boolean;
    failures: string[];
    score: number;
}

interface PostData {
    slug: string;
    title: string;
    seoTitle: string;
    metaDescription: string;
    structuredData: any;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    author: { name: string; role: string };
    relatedGearIds: string[];
    content: string;
}

function scrubBannedPhrases(text: string): { cleaned: string; removed: string[] } {
    const removed: string[] = [];
    let cleaned = text;
    for (const { regex, replacement } of BANNED_PHRASES) {
        const matches = cleaned.match(regex);
        if (matches) {
            removed.push(...matches.map(m => m.trim()));
            cleaned = cleaned.replace(regex, replacement);
        }
    }
    // Clean up double spaces and orphaned punctuation
    cleaned = cleaned.replace(/  +/g, ' ').replace(/^\s*,\s*/gm, '').replace(/\n{3,}/g, '\n\n');
    return { cleaned, removed };
}

function validatePost(post: PostData): ValidationResult {
    const failures: string[] = [];

    // 1. SEO Title length (50-60 chars)
    const titleLen = (post.seoTitle || post.title).length;
    if (titleLen < 50 || titleLen > 60) {
        failures.push(`SEO Title is ${titleLen} chars (need 50-60)`);
    }

    // 2. Meta Description length (150-160 chars)
    const metaLen = (post.metaDescription || '').length;
    if (metaLen < 150 || metaLen > 160) {
        failures.push(`Meta Description is ${metaLen} chars (need 150-160)`);
    }

    // 3. TL;DR / Direct Answer block present (within first 250 words)
    const first250Words = post.content.split(/\s+/).slice(0, 250).join(' ');
    const hasTLDR = /tl;?\s*dr|direct answer|short answer/i.test(first250Words) || /^>\s*\*\*/m.test(first250Words);
    if (!hasTLDR) {
        failures.push('No TL;DR or Direct Answer block found within first 250 words');
    }

    // 4. 3+ Retrieval chunks (standalone H2 sections with question/definition patterns)
    const h2Sections = (post.content.match(/^##\s+.+$/gm) || []);
    const retrievalH2s = h2Sections.filter(h =>
        /what is|how does|how do|how to|why does|why do|when should|which|where/i.test(h)
    ).length;
    if (retrievalH2s < 3) {
        failures.push(`Only ${retrievalH2s} retrieval-chunk H2s (need 3+ with What/How/Why patterns)`);
    }

    // 5. 3-5 AI citation anchors (short declarative sentences < 25 words, no hedging)
    const sentences = post.content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const declaratives = sentences.filter(s => {
        const wordCount = s.trim().split(/\s+/).length;
        return wordCount >= 8 && wordCount <= 25 &&
            /\bis\b|\bare\b|\bwas\b|\bwere\b|\bprovides\b|\benables\b|\bensures\b/.test(s) &&
            !/can help|may help|might|could|should|would/i.test(s);
    }).length;
    if (declaratives < 3) {
        failures.push(`Only ${declaratives} AI citation-anchor sentences (need 3-5 short declaratives)`);
    }

    // 6. Entity graph block present
    const hasEntityGraph = /primary entity|related entit|key concepts?|concept block/i.test(post.content);
    if (!hasEntityGraph) {
        failures.push('No Entity Graph block found (need "Primary Entity" or "Key Concepts" section)');
    }

    // 7. GEO signals (Jackson/Mississippi regional references)
    const hasGeo = /jackson|mississippi|central miss|rankin county|madison county/i.test(post.content);
    if (!hasGeo) {
        failures.push('No GEO signal found (need Jackson/Mississippi regional reference)');
    }

    // 8. Structured formatting (numbered list, checklist, or comparison table)
    const hasNumberedList = /^\d+\.\s+/m.test(post.content);
    const hasChecklist = /^-\s*\[[ x]\]/m.test(post.content);
    const hasTable = post.content.includes('|---|');
    if (!hasNumberedList && !hasChecklist && !hasTable) {
        failures.push('No structured formatting found (need numbered list, checklist, or table)');
    }

    // 9. At least one statistic / quantified claim
    const hasStatistic = /\d+%|\d+x\s|increased by \d|\$\d|billion|million|\d+\s*(?:times|percent)/i.test(post.content);
    if (!hasStatistic) {
        failures.push('No quantified claim or statistic found (need at least one number/percentage)');
    }

    // 10. Authority / experience signal
    const hasAuthority = /we (?:audited|tested|built|implemented|deployed|measured|observed)|our team|our studio|our clients?|case (?:study|example)|real-world|hands-on/i.test(post.content);
    if (!hasAuthority) {
        failures.push('No authority signal found (need "we tested", case example, or experience reference)');
    }

    // 11. Inline research citations in first half (Section 4.5 — minimum 2)
    const contentLines = post.content.split('\n');
    const halfIndex = Math.floor(contentLines.length / 2);
    const firstHalf = contentLines.slice(0, halfIndex).join('\n');
    const trustLinks = (firstHalf.match(/\[.+?\]\(https?:\/\/.+?\)/g) || []).length;
    const parenCitations = (firstHalf.match(/\((?:Google Search Central|Schema\.org|OpenAI|Anthropic|Microsoft|according to|research from)[^)]*\)/gi) || []).length;
    const totalCitations = trustLinks + parenCitations;
    if (totalCitations < 2) {
        failures.push(`Only ${totalCitations} inline citation(s) in first half (need 2+ per Section 4.5)`);
    }

    // 12. Internal links (6+ — check for relative links or domain links)
    const internalLinks = (post.content.match(/\[.+?\]\(\/[^)]+\)/g) || []).length;
    const domainLinks = (post.content.match(/\[.+?\]\(https?:\/\/(?:www\.)?powerdigitalmedia\.org[^)]*\)/g) || []).length;
    const totalInternal = internalLinks + domainLinks;
    if (totalInternal < 6) {
        failures.push(`Only ${totalInternal} internal links found (need 6+)`);
    }

    // 13. FAQ section present
    const hasFAQ = /^#{2,3}\s*(?:FAQ|frequently asked)/im.test(post.content);
    if (!hasFAQ) {
        failures.push('No FAQ section heading found');
    }

    // 14. JSON-LD parseable
    if (!post.structuredData) {
        failures.push('No JSON-LD structured data extracted or parsed');
    }

    // 15. Freshness stamp
    const hasFreshness = /updated (?:for|in) 202|as of (?:january|february|march|april|may|june|july|august|september|october|november|december|q[1-4]) 202/i.test(post.content);
    if (!hasFreshness) {
        failures.push('No freshness stamp found (need "Updated for 202X" or similar)');
    }

    // 16. Banned phrases absent (Tier 1)
    for (const { regex } of BANNED_PHRASES.slice(0, 25)) { // Tier 1 entries
        if (regex.test(post.content)) {
            failures.push(`Banned phrase still present: ${regex.source}`);
        }
        regex.lastIndex = 0;
    }

    // 17. Hedging language absent (Tier 3)
    for (const { regex } of BANNED_PHRASES.slice(25)) { // Tier 3 entries
        if (regex.test(post.content)) {
            failures.push(`Hedging language still present: ${regex.source}`);
        }
        regex.lastIndex = 0;
    }

    // 18. Sentence length variance
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length).filter(l => l > 3);
    if (sentenceLengths.length >= 5) {
        const avg = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
        const variance = sentenceLengths.reduce((sum, l) => sum + Math.pow(l - avg, 2), 0) / sentenceLengths.length;
        const stdDev = Math.sqrt(variance);
        if (stdDev < 4) {
            failures.push(`Sentence length variance too low (stdDev: ${stdDev.toFixed(1)}, need > 4). Robotic cadence detected.`);
        }
    }

    // 19. Paragraphs ≤ 3 sentences
    const paragraphs = post.content.split(/\n\s*\n/).filter(p => p.trim().length > 20 && !p.trim().startsWith('|') && !p.trim().startsWith('#'));
    const longParagraphs = paragraphs.filter(p => {
        const sentenceCount = p.split(/[.!?]+/).filter(s => s.trim().length > 5).length;
        return sentenceCount > 4; // Allow small grace (spec says 3, we flag at >4)
    }).length;
    if (longParagraphs > 2) {
        failures.push(`${longParagraphs} paragraphs exceed 4 sentences (max 3 per spec, 2+ violations)`);
    }

    // 20. No references list at bottom
    const lastLines = post.content.split('\n').slice(-20).join('\n');
    if (/^#+\s*(?:references|sources|bibliography|works cited)/mi.test(lastLines)) {
        failures.push('"References" or "Sources" list detected at bottom — must use inline citations only');
    }

    return {
        passed: failures.length === 0,
        failures,
        score: 20 - failures.length
    };
}

function logResult(post: PostData, validation: ValidationResult, attempt: number) {
    const logPath = path.join(process.cwd(), 'claudebot.log');
    const logEntry = [
        `\n=== ${new Date().toISOString()} | Attempt ${attempt} ===`,
        `Title: ${post.title}`,
        `Score: ${validation.score}/20`,
        `Passed: ${validation.passed}`,
        validation.failures.length > 0 ? `Failures:\n  - ${validation.failures.join('\n  - ')}` : 'All checks passed ✅',
        `---`
    ].join('\n');
    fs.appendFileSync(logPath, logEntry + '\n');
}

const MISSIONS = [
    { id: 'deep_scrape', name: 'The Deep Scrape', prompt: 'Find a specific quote from a developer on a Reddit thread or forum regarding [KEYWORD] and build the post around reacting to that quote.' },
    { id: 'benchmark_war', name: 'The Benchmark War', prompt: 'Find two competing pieces of hardware or software related to [KEYWORD] and write a "Real-World Performance" report based on latest 2026 data.' },
    { id: 'futurist', name: 'The Futurist', prompt: 'Look at [KEYWORD] today and write about what will replace it by 2028.' },
    { id: 'news', name: 'Standard Intel', prompt: 'Find the latest breaking news about [KEYWORD].' },
    { id: 'authority', name: 'The Authority Deep Dive', prompt: 'Find the most authoritative technical documentation or research paper about [KEYWORD] and write an expert-level analysis.' }
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
    if (mission.id === 'authority') query = `site:developer.google.com OR site:arxiv.org OR site:developer.nvidia.com OR site:docs.anthropic.com "${randomKeyword}" 2026`;

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

// S-Tier authority domains for research scoring
const S_TIER_DOMAINS = [
    'developer.google.com', 'blog.google', 'ai.google.dev',
    'developer.nvidia.com', 'nvidia.com/blog',
    'anthropic.com', 'docs.anthropic.com',
    'openai.com', 'platform.openai.com',
    'arxiv.org', 'ieee.org', 'acm.org',
    'microsoft.com/en-us/research', 'devblogs.microsoft.com'
];

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
                    limit: 6,
                    scrapeOptions: { formats: ['markdown'] }
                }),
                signal: AbortSignal.timeout(30000)
            });

            const data = await resp.json() as any;

            if (data.success && data.data) {
                // Deduplicate by domain
                const seenDomains = new Set<string>();
                const dedupedResults = data.data.filter((d: any) => {
                    try {
                        const domain = new URL(d.url).hostname.replace('www.', '');
                        if (seenDomains.has(domain)) return false;
                        seenDomains.add(domain);
                        return true;
                    } catch { return true; }
                });

                context = dedupedResults.map((d: any, i: number) => {
                    sources.push(d.url);
                    return `SOURCE [${i + 1}]: ${d.url}\nTITLE: ${d.title || 'Unknown'}\nCONTENT:\n${d.markdown?.slice(0, 2500)}...`;
                }).join("\n\n---\n\n");

                // --- Enhanced Scoring Logic ---
                const contextLower = context.toLowerCase();

                // Content relevance signals
                if (contextLower.includes('announce') || contextLower.includes('launch')) score += 2;
                if (contextLower.includes('benchmark') || contextLower.includes('spec')) score += 1;

                // Recency bonus: +2 if sources mention current year/month
                const currentYear = new Date().getFullYear().toString();
                const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
                if (contextLower.includes(currentYear) || contextLower.includes(currentMonth)) score += 2;

                // Authority bonus: +2 if any source is from an S-Tier domain
                const hasSTier = sources.some(url => {
                    try {
                        const hostname = new URL(url).hostname.replace('www.', '');
                        return S_TIER_DOMAINS.some(d => hostname.includes(d) || d.includes(hostname));
                    } catch { return false; }
                });
                if (hasSTier) score += 2;

                // Diversity penalty: -1 if all results from the same domain
                if (seenDomains.size === 1 && dedupedResults.length > 1) {
                    score -= 1;
                    console.warn(`   ⚠️ Low source diversity — all results from same domain`);
                }

                console.log(`   ✅ Research Complete. Found ${sources.length} sources (${seenDomains.size} unique domains). Relevance Score: ${score}/10`);
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

    const systemPrompt = `MASTER SYSTEM PROMPT V3.2 FOR ANTIGRAVITY
Power Digital Media — Nuclear Blog Post Execution Engine

ROLE
You are the fully autonomous content engine for Power Digital Media.
Your mission: Produce the single best answer on the internet for the target keyword — a page that both human readers AND AI retrieval systems treat as canonical.

-----------------------------------------
CONTENT ARCHITECTURE: RETRIEVAL-CHUNK FORMAT
-----------------------------------------
Every post MUST follow this structure:

1. OPENING (first 200 words)
   • TL;DR or "Direct Answer" block — a bold blockquote (> **...**) that answers the H1 in 2-3 sentences.
   • A shocking stat, direct answer, or contrarian stance. NO generic intros.

2. BODY — built from 3+ RETRIEVAL CHUNKS
   Each chunk is an H2 section whose heading contains a question or definition keyword:
   "What Is…", "How Does…", "How to…", "Why Is…", "When Should…", "Which…"
   These H2s are designed to be individually retrievable by AI search engines.

3. AI CITATION ANCHORS (3-5 per post)
   Short declarative sentences (8-25 words, no hedging) that state facts with a copula verb (is/are/was/were/provides/enables).
   Example: "HDMI 2.1 supports 4K at 120Hz with variable refresh rate."

4. ENTITY GRAPH BLOCK
   Include a section (can be inline or as a sidebar) titled "Key Concepts" or "Primary Entity" that defines the main topic and 3-5 related entities.

5. STRUCTURED FORMATTING
   Every post must include at least one: numbered list, checklist (- [ ]), or Markdown comparison table (|---|).

6. FAQ SECTION
   Include an ## FAQ or ## Frequently Asked Questions section with 3+ Q&A pairs.

-----------------------------------------
SEO CONSTRAINTS
-----------------------------------------
• SEO Title: 50–60 characters ONLY.
• Meta Description: 150–160 characters ONLY.
• Freshness Stamp: Include "Updated for [Month Year]" or "As of Q[N] [Year]" naturally in the text.
• Long-tail keywords integrated naturally (no stuffing).

-----------------------------------------
BANNED PHRASES (TIER 1 — AUTO-FAIL)
-----------------------------------------
NEVER use: delve, tapestry, landscape (as metaphor), navigate (as metaphor), unlock the potential, harness the power, game-changer, paradigm shift, in conclusion, ultimately, in summary, it's important to note, whether you're a beginner or expert, in today's fast-paced world, cutting-edge solution, revolutionary approach, dive into, bustling landscape, beacon of, the world of, the realm of, in the ever-changing world of.

-----------------------------------------
HEDGING BAN (TIER 3 — AUTO-FAIL)
-----------------------------------------
Replace all hedging: "can help improve" → "improves", "may help" → (cut), "could potentially" → "will", "is designed to" → (cut), "has the potential to" → "can".

-----------------------------------------
AUTHORITY & TRUST SIGNALS
-----------------------------------------
• First-person experience: Use "we audited", "our team tested", "our studio deployed", "our clients", or "first-hand production experience" at least once.
• E-E-A-T experience signal: When possible, tie claims to direct studio experience. Example: "From our production studio in Jackson, Mississippi, we've tested…"
• Include at least one quantified claim (percentage, dollar amount, or X-times improvement).
• Trust sources: Place at least one [Source](URL) link in the FIRST HALF of the article.
• Source verification: When citing a statistic, name the originating organization and year.
  BAD: "Studies show 73% of developers prefer…"
  GOOD: "Stack Overflow's 2025 Developer Survey found 73% of developers prefer…"
• Dead link prevention: Only cite URLs from the provided research context. Do NOT fabricate URLs.

-----------------------------------------
INLINE RESEARCH CITATION RULE (Section 4.5)
-----------------------------------------
Every post must include 2-5 inline citations tied directly to factual claims or statistics.

Preferred authoritative sources:
• Google Search Central
• Schema.org documentation
• OpenAI / Anthropic / Microsoft developer docs
• Academic research papers, government data sources, reputable industry reports

NEVER cite: low-authority blogs, generic marketing sites, AI-generated articles.

Format: Natural inline references — "According to Google Search Central…", "Research from OpenAI indicates…"
NOT: [1] Source

At least one authoritative citation must appear in the FIRST HALF of the article.
Pillar articles should include one primary-source citation (Google docs, academic paper, or government report).

-----------------------------------------
RESEARCH METHODOLOGY (Section 4.7)
-----------------------------------------

You are receiving live research context from Firecrawl search API.
Your job is to SYNTHESIZE this research into original analysis — NOT regurgitate it.

SOURCE HIERARCHY (Use in this priority order):
| Tier | Source Type | Examples | Trust Level |
|------|-----------|----------|-------------|
| S-Tier | Primary technical docs | Google Dev Blog, Anthropic docs, NVIDIA developer, RFC specs | Cite directly |
| A-Tier | Industry research | Gartner, Forrester, IEEE, ACM, arXiv papers | Cite with context |
| B-Tier | Vetted journalism | The Verge, Ars Technica, TechCrunch, Wired | Cite if corroborated |
| C-Tier | Community discourse | Reddit threads, HN comments, Discord logs | Attribute as opinion, never as fact |
| REJECT | Marketing content | Vendor press releases, sponsored posts, SEO farms | Never cite |

RESEARCH SYNTHESIS RULES:
1. Cross-reference requirement: Any factual claim must be supported by research context OR flagged as editorial opinion ("In our experience…", "Our take:").
2. Recency gate: Prefer sources from the last 6 months. Flag anything older than 12 months as "[historical context]".
3. Contradiction protocol: If sources disagree, present both positions and state which you find more credible and why.
4. No fabrication rule: If the research context doesn't contain enough data to support a claim, write "based on available data" and keep the scope narrow. NEVER invent statistics, quotes, or benchmarks.
5. Quote attribution: Direct quotes from research must use the exact source name. Never attribute a quote to a different source.
6. Source diversity rule: Do not rely on a single source for the article's main claim when multiple sources are available. Support major claims with at least two independent sources whenever possible.
7. Interpretation integrity rule: Do not exaggerate or misrepresent a source's conclusions. If a source includes limitations, uncertainty, or conditional results, include that context in the explanation.

RESEARCH-TO-CONTENT PIPELINE:
Step 1: SCAN the provided research context for:
  - Breaking announcements (product launches, version releases)
  - Performance data (benchmarks, comparisons, before/after metrics)
  - Expert opinions or direct quotes
  - Contradictions or controversies

Step 2: IDENTIFY the single strongest angle — the claim that is:
  - Most surprising OR most actionable
  - Supported by at least one S-Tier or A-Tier source
  - Not already covered in recent posts (see Anti-Duplication list below)
  - Prefer insights that contradict common assumptions or reveal a non-obvious implication of the research

Step 3: STRUCTURE the article around that angle using the Retrieval Chunk format:
  - Lead with the strongest finding
  - Support with secondary sources
  - Close with an opinionated Power Digital Media take

Step 4: VERIFY before output:
  - Every statistic traces to a named source in the research context
  - No source is cited for something it doesn't actually say
  - The article adds original analysis beyond what sources provide
  - Major claims are supported by more than one source when possible

-----------------------------------------
CITATION & HYPERLINK PROTOCOL
-----------------------------------------
• INLINE ONLY: Hyperlink source names within sentences (e.g., [Gartner](URL) reports...).
• 6+ internal links: Use relative paths (/blog/..., /showroom/...) or powerdigitalmedia.org domain links.
• NO "References" or "Sources" section at the bottom.
• FRESHNESS: Use sources from the last 6-12 months.

-----------------------------------------
LOCAL AUTHORITY SIGNAL (GEO)
-----------------------------------------
Reference the perspective of a high-end production studio based in Jackson, Mississippi. Mention "Jackson", "Mississippi", or regional context at least once.

-----------------------------------------
JSON-LD STRUCTURED DATA
-----------------------------------------
At the end, generate a valid <script type="application/ld+json"> block:
• Article Schema
• FAQ Schema (based on the FAQ section)
• Product Schema (if gear is mentioned)

-----------------------------------------
PARAGRAPH & SENTENCE CADENCE
-----------------------------------------
• Paragraphs: MAX 3 sentences per paragraph.
• Sentence length: Vary from short punchy (8 words) to long analytical (30+ words). Monotone cadence = auto-fail.

-----------------------------------------
RELATED GEAR SELECTION (MANDATORY)
-----------------------------------------
At the very end, provide exactly 4 Gear IDs from the "Showroom Gear Context" list.
Format: RELATED_GEAR_IDS: ["id1", "id2", "id3", "id4"]
IMPORTANT: Use ONLY the IDs provided in the context.

-----------------------------------------
SELF-AUDIT CHECKLIST (20 CHECKS)
-----------------------------------------
Before outputting, verify ALL pass:
1.  [ ] SEO Title 50-60 chars?
2.  [ ] Meta Description 150-160 chars?
3.  [ ] TL;DR / Direct Answer in first 250 words?
4.  [ ] 3+ Retrieval-chunk H2s (What/How/Why)?
5.  [ ] 3-5 AI citation-anchor sentences?
6.  [ ] Entity Graph / Key Concepts block?
7.  [ ] Jackson/Mississippi GEO signal?
8.  [ ] Numbered list, checklist, or table?
9.  [ ] At least one statistic / quantified claim?
10. [ ] Authority signal (we tested / our clients)?
11. [ ] Trust source link in first half?
12. [ ] 6+ internal links?
13. [ ] FAQ section?
14. [ ] JSON-LD included?
15. [ ] Freshness stamp (Updated for 202X)?
16. [ ] Zero Tier 1 banned phrases?
17. [ ] Zero Tier 3 hedging language?
18. [ ] Sentence length variance (mix short + long)?
19. [ ] Paragraphs ≤ 3 sentences?
20. [ ] No References list at bottom?

FINAL OUTPUT FORMAT:
1. SEO Title/Meta
2. Article Body (Retrieval Chunks, Anchors, Entity Graph, FAQ)
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
                temperature: 0.6,
                max_tokens: 4500
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
    // Uses top-level BANNED_PHRASES constant with intelligent replacements
    // 1. Scrub banned phrases — REMOVE them
    const { cleaned: scrubbedContent, removed: removedPhrases } = scrubBannedPhrases(content);
    content = scrubbedContent;
    if (removedPhrases.length > 0) {
        console.warn(`🔥 AI Firewall: Removed ${removedPhrases.length} banned phrases: ${removedPhrases.join(', ')}`);
    }

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

    // Extract gear IDs and cross-validate against catalog
    let extractedGearIds = content.match(/RELATED_GEAR_IDS:\s*\[(.*?)\]/)?.[1]
        .split(',').map(s => s.trim().replace(/['"]+/g, '')) || [];

    // Replace invalid gear IDs with random valid ones
    const gearIdArray = Array.from(VALID_GEAR_IDS);
    extractedGearIds = extractedGearIds.map(id => {
        if (VALID_GEAR_IDS.has(id)) return id;
        console.warn(`   ⚠️ Invalid gear ID "${id}" — replacing with valid alternative`);
        return gearIdArray[Math.floor(Math.random() * gearIdArray.length)];
    });
    // Ensure exactly 4 unique IDs
    const uniqueIds = [...new Set(extractedGearIds)];
    while (uniqueIds.length < 4) {
        const candidate = gearIdArray[Math.floor(Math.random() * gearIdArray.length)];
        if (!uniqueIds.includes(candidate)) uniqueIds.push(candidate);
    }
    extractedGearIds = uniqueIds.slice(0, 4);

    // Better excerpt: skip metadata, header, and short lines
    const excerptLine = content.split('\n').find(l => {
        const t = l.trim();
        return t.length > 50 &&
            !t.startsWith('#') &&
            !t.startsWith('**SEO') &&
            !t.startsWith('**Meta') &&
            !t.startsWith('|') &&
            !t.startsWith('>') &&
            !t.startsWith('RELATED_GEAR');
    });
    const excerpt = excerptLine ? excerptLine.slice(0, 180).trim() + '...' : `Latest ${vertical.name} analysis from Power Digital Media.`;

    return {
        slug, title: title || seoTitle,
        seoTitle,
        metaDescription,
        structuredData,
        excerpt,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: vertical.category,
        image: imageUrl,
        author: { name: persona.role, role: "Power Digital Media" },
        relatedGearIds: extractedGearIds,
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

    // 3. Generation + Validation Phase (with retry loop)
    const MAX_RETRIES = 2;
    const newPosts: PostData[] = [];
    for (const story of topStories) {
        let attempt = 0;
        let lastValidation: ValidationResult | null = null;
        while (attempt <= MAX_RETRIES) {
            attempt++;
            try {
                console.log(`\n📝 Generation attempt ${attempt}/${MAX_RETRIES + 1} for ${story.vertical.name}`);
                const post = await generatePost(story.vertical, story.context, story.mission);
                if (!post) break;

                // Run validation
                const validation = validatePost(post);
                lastValidation = validation;
                logResult(post, validation, attempt);
                console.log(`   📊 Validation: ${validation.score}/20 checks passed`);

                if (validation.passed) {
                    console.log(`   ✅ Post PASSED all 20 Nuclear V3.2 checks`);
                    newPosts.push(post);
                    break;
                }

                if (attempt > MAX_RETRIES) {
                    // Accept best-effort post if score >= 16
                    if (validation.score >= 16) {
                        console.warn(`   ⚠️ Post scored ${validation.score}/20 after ${MAX_RETRIES + 1} attempts — accepting (threshold: 16)`);
                        newPosts.push(post);
                    } else {
                        console.error(`   ❌ Post REJECTED after ${MAX_RETRIES + 1} attempts (score: ${validation.score}/20). Failures:`);
                        validation.failures.forEach(f => console.error(`      - ${f}`));
                    }
                    break;
                }

                // Log failures and retry
                console.warn(`   🔄 Retrying... Failures:`);
                validation.failures.forEach(f => console.warn(`      - ${f}`));

            } catch (e) {
                console.error(`Failed to generate post for ${story.vertical.name} (attempt ${attempt}):`, e);
                if (attempt > MAX_RETRIES) break;
            }
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
