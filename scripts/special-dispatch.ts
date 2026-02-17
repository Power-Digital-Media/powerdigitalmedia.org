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
const TOPIC = "Next.js & Node.js vs React + Vite: The 2026 Architectural Guide";
const SEARCH_QUERY = "Next.js 16 Node.js 24 vs React 20 Vite 6 benchmarks performance SEO 2026";
const VERTICAL = { name: "Web Architecture", category: "Development" };

async function getResearch() {
    console.log(`📡 [SPECIAL] Researching: "${SEARCH_QUERY}"...`);
    let context = "";
    const fcKey = process.env.FIRECRAWL_API_KEY;

    if (fcKey && fcKey.startsWith('fc-')) {
        try {
            const resp = await fetch('https://api.firecrawl.dev/v1/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fcKey}` },
                body: JSON.stringify({ query: SEARCH_QUERY, limit: 5 }),
                signal: AbortSignal.timeout(25000)
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
    if (!openai) return "https://images.unsplash.com/photo-1627398242454-45a1465c2479";

    try {
        console.log(`   🎨 Visuals: Generating SPECIAL asset for "${title}"...`);
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `High-end tech-noir cinematic photography of a dual-monitor developer workstation. 
            One screen shows a complex Next.js server component architecture, the other shows a terminal with fast build metrics. 
            Neon cyan and deep purple accents, moody lighting, professional production studio atmosphere in Jackson MS. 
            Photorealistic, 8k, no text.`,
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
        return "https://images.unsplash.com/photo-1627398242454-45a1465c2479";
    }
}

async function generatePost(context: string) {
    console.log(`   ✍️ Writing: Engaging OpenAI for Reinforced Authority Special Dispatch...`);

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const showroomContext = GEAR_COLLECTION.map(item =>
        `- ${item.name} (${item.brand}) Category: ${item.category}. Desc: ${item.description}. URL: /showroom/${item.category.toLowerCase()}/${item.id}`
    ).join('\n');

    const recentTitles = blogPosts.slice(0, 10).map(p => `- ${p.title}`).join('\n');

    const systemPrompt = `
ROLE: Senior Technical Architect at Power Digital Media in Jackson, MS.
Tone: Opinionated, data-driven, authoritative, non-generic.

MISSION: Produce a deep, ranking-optimized technical intelligence article on ${TOPIC}.

AUTHORITY REINFORCEMENT LAYER (MANDATORY)
1. DATA AUTHORITY RULE: Include measurable data (e.g., LCP, FID, CLS, build times, TTFB, Node.js event pool latency, V8 heap usage).
2. DEPTH REQUIREMENT: Explain WHY the move to Server Components (Next.js) or SPA (Vite) matters for specific business ROI. 1200+ words.
3. E-E-A-T AUTHORITY SIGNAL: Include 3+ natural outbound references to credible sources (Vercel, React Dev, Node working groups).
4. SYSTEM SYNERGY RULE: Connect software performance to hardware (e.g., why a dual-socket Threadripper workstation drastically changes local build cycles for larger monorepos).

FOOTPRINT KILLER LOGIC (CRITICAL)
Variable Openers: Start with a shocking stat or a controversial opinion. NO GENERIC INTROS.

CTR OPTIMIZATION RULE
Titles must be click-maximized. Use Curiosity, Comparison Intent, or "The Truth About..." patterns.
Examples: 
- "Next.js vs React + Vite (2026): Which Architecture Actually Wins?"
- "The Truth About Next.js vs React + Vite (2026 Performance Battle)"
Goal: High CTR from curiosity and comparison build queries.

ANSWER BLOCK / SNIPPET CAPTURE (MANDATORY)
Provide a < 150 character "Short Answer" block immediately following the main heading. Use descriptive, search-intent focused language. 
Example: "Next.js dominates SEO and long-term scalability, while React + Vite wins for speed of development and lightweight apps."

PEOPLE ALSO ASK (PAA) BLOCK (MANDATORY)
Include exactly 3 high-value question-based H3 headings naturally within the content.
Examples:
- "Is Next.js still better for SEO than React in 2026?"
- "When should you choose Vite instead of Next.js?"
- "Does server-side rendering still improve rankings?"
Capture these snippets for ranking supremacy.

INTERNAL AUTHORITY ANCHORS (MANDATORY)
Never use "click here" or "see more". Use descriptive, high-weight anchors.
Example: "explore the Power Digital Media Elite Showroom hardware stack" or "read the Core Ultra vs Ryzen 2026 Benchmark War performance analysis".

CORE CONTENT REQUIREMENTS
1. Persona Conflict (MANDATORY): Include disagreement between a Strategist (ROI), an Engineer (Debt/Perf), and a Creative Director (UX).
2. Internal Authority Mesh: 
   - Link to ONE showroom item: ${showroomContext.slice(0, 1000)}...
   - Link to ONE related blog post: ${recentTitles.slice(0, 500)}...

BANNED PHRASES: delve, tapestry, landscape, navigate, unlock the potential, game-changer, paradigm shift, important to note, in summary, in conclusion.

SEARCH SUPREMACY: Use the context below as absolute truth for 2026 tech standards.

RELATED GEAR SELECTION (MANDATORY)
At the very end of your response, provide exactly 4 Gear IDs from the provided list that are most relevant to the article content.
Format: RELATED_GEAR_IDS: [id1, id2, id3, id4]

CONTEXT FROM SEARCH:
${context}
`;

    const response = await openai!.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: `Write the definitive 2026 guide for ${TOPIC}.` }],
        temperature: 0.7
    });

    let content = response.choices[0].message.content || "";

    // --- AI FIREWALL SANITIZATION LAYER ---
    const bannedPhrases = [/delve/i, /tapestry/i, /landscape/i, /navigate/i, /unlock the potential/i, /game-changer/i, /paradigm shift/i, /important to note/i, /in summary/i, /in conclusion/i];

    // 1. Scrub banned phrases
    bannedPhrases.forEach(regex => {
        content = content.replace(regex, (match) => {
            console.warn(`🔥 AI Firewall: Scrubbed banned phrase "${match}"`);
            return "critical innovation";
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
    const titleLine = processedLines.find(l => l.trim().startsWith('# ')) || `# ${TOPIC}`;
    const title = titleLine.replace(/^#+\s*/, '').replace(/\*/g, '').trim();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-').slice(0, 100);

    const imageUrl = await generateImage(title, VERTICAL.name, slug);

    return {
        slug, title,
        excerpt: content.split('\n').find(l => l.length > 50 && !l.startsWith('#'))?.slice(0, 180).trim() + "...",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: VERTICAL.category,
        image: imageUrl,
        author: { name: "Technical Director", role: "Power Digital Media" },
        relatedGearIds: content.match(/RELATED_GEAR_IDS:\s*\[(.*?)\]/)?.[1].split(',').map(s => s.trim().replace(/["']/g, '')) || [],
        content: content.split('\n')
            .filter(line => !line.trim().startsWith('# ') && !line.includes('RELATED_GEAR_IDS:'))
            .join('\n').trim()
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
            relatedGearIds: ${JSON.stringify(post.relatedGearIds)},
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
