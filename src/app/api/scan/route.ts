import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // 1. Format the URL correctly
        let targetUrl = url;
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = `https://${targetUrl}`;
        }

        const results = {
            url: targetUrl,
            seoScore: null as number | null,
            schemaScore: 0 as number,
            hasLlmsTxt: false,
            schemaTypesFound: [] as string[],
            error: null as string | null
        };

        // 2. Check for AI Readiness (llms.txt)
        try {
            const urlObj = new URL(targetUrl);
            const llmsUrl = `${urlObj.origin}/llms.txt`;
            const llmsResponse = await fetch(llmsUrl, { method: 'HEAD', headers: { 'User-Agent': 'PowerDigital-Scanner/1.0' } });
            results.hasLlmsTxt = llmsResponse.ok;
        } catch (e) {
            console.error("LLMs check failed:", e);
        }

        // 3. Check for Schema Markup (LD+JSON)
        try {
            const htmlResponse = await fetch(targetUrl, { headers: { 'User-Agent': 'PowerDigital-Scanner/1.0' } });
            if (htmlResponse.ok) {
                const htmlStr = await htmlResponse.text();
                const $ = cheerio.load(htmlStr);

                $('script[type="application/ld+json"]').each((i, el) => {
                    try {
                        const schemaContent = $(el).html();
                        if (schemaContent) {
                            const parsed = JSON.parse(schemaContent);
                            // It could be an array of schemas or a single object
                            const extractType = (obj: any) => {
                                if (obj && obj['@type']) {
                                    results.schemaTypesFound.push(typeof obj['@type'] === 'string' ? obj['@type'] : JSON.stringify(obj['@type']));
                                }
                            };

                            if (Array.isArray(parsed)) {
                                parsed.forEach(extractType);
                            } else {
                                extractType(parsed);
                            }
                        }
                    } catch (e) { } // Ignore malformed JSON in scripts
                });

                // Simple Schema scoring: 100 if they have 2+ schemas (e.g. Org, Breadcrumb), 50 if they have 1, 0 if null.
                if (results.schemaTypesFound.length >= 2) results.schemaScore = 100;
                else if (results.schemaTypesFound.length === 1) results.schemaScore = 50;
                else results.schemaScore = 0;

                // Basic SEO scoring via DOM markers
                let sScore = 0;
                if ($('title').text().trim().length > 0) sScore += 30; // Has title = 30
                if ($('meta[name="description"]').attr('content')?.trim()) sScore += 30; // Has meta description = 30
                if ($('h1').length > 0) sScore += 20; // Has standard H1 = 20
                if ($('meta[name="viewport"]').length > 0 || $('link[rel="canonical"]').length > 0) sScore += 20; // Has responsive viewport/canonical = 20

                results.seoScore = sScore;

            } else {
                results.error = "Target URL returned an error or is unreachable.";
            }
        } catch (e) {
            console.error("HTML fetch/parse check failed:", e);
            if (!results.error) results.error = "Failed to completely scan infrastructure.";
        }

        return NextResponse.json(results);
    } catch (error) {
        console.error("Scan API Error:", error);
        return NextResponse.json({ error: 'Internal server error processing scan' }, { status: 500 });
    }
}
