import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

import OpenAI from 'openai';

export async function POST(request: Request) {
    try {
        const { topic, channelInfo } = await request.json();

        // Ensure you named it GOOGLE_AI_KEY in the .env.local file
        const apiKey = process.env.GOOGLE_AI_KEY;
        const openAiKey = process.env.OPENAI_API_KEY;

        if (!apiKey || apiKey.length < 20) {
            console.error("AI Protocol Error: Google Gemini API Key is missing or invalid.");
            return NextResponse.json({ error: 'AI Protocol Offline: Missing API Key. Check .env.local' }, { status: 500 });
        }

        // Initialize Official SDKs
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const openai = new OpenAI({ apiKey: openAiKey });

        let targetString = "a YouTube video";
        let contextString = "";

        if (channelInfo && channelInfo.trim() !== "") {
            targetString = `the YouTube channel: ${channelInfo}`;
            contextString = `CRITICAL ASSIGNMENT: The user has provided their specific channel: '${channelInfo}'. You must analyze the typical aesthetic, tone, and audience of this channel (or a similar one if it's a niche topic). Generate a heavily tailored thumbnail prompt that perfectly matches the typical visual style that resonates with them.`;
        }

        const systemPrompt = `You are a world-class YouTube strategist and growth engineer. 
Your goal is to provide triple-intelligence for ${targetString}:
1. VIRAL HOOKS: 5 scroll-stopping viral hook ideas for social clips.
2. SEARCH INTELLIGENCE: 3 critical questions people are actually searching for (Answer the Public style).
3. YOUTUBE TITLE: 1 highly clickable, high CTR title for YouTube.
4. VISUAL PROTOCOL: 1 detailed, high-fidelity image description for a YouTube thumbnail. It must be strictly an image prompt, containing no other commentary, maximum 1000 characters.

${contextString}

Format the output in clear sections. Keep the YOUTUBE TITLE and VISUAL PROTOCOL sections separate at the very bottom. 
Start the title with 'YOUTUBE_TITLE:'
Start the visual prompt with 'PROMPT:'
Do not wrap them in quotes.`;

        // Using standard non-streaming generate content call
        const response = await ai.models.generateContent({
            // You can use 'gemini-2.5-flash' for very fast responses, or 'gemini-2.5-pro' for higher reasoning
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: "user",
                    parts: [{ text: `${systemPrompt}\n\nTopic: ${topic}` }]
                }
            ],
            config: {
                temperature: 0.8,
            }
        });

        const fullContent = response.text || "";

        // Extract the title
        let titlePart = "The Elite Creator Strategy";
        let rest1 = fullContent;
        if (fullContent.includes('YOUTUBE_TITLE:')) {
            const parts = fullContent.split('YOUTUBE_TITLE:');
            rest1 = parts[0];
            titlePart = parts[1].split('PROMPT:')[0].trim();
        }

        // Extract the visual prompt
        let promptPart = "";
        let textPart = rest1;
        if (fullContent.includes('PROMPT:')) {
            const parts = fullContent.split('PROMPT:');
            promptPart = parts[1].trim();
            // In case PROMPT came before TITLE (unlikely but possible), cleanup
            if (!fullContent.includes('YOUTUBE_TITLE:')) {
                textPart = parts[0];
            }
        }

        let openAiImageUrl = "";

        // Generate image if prompt exists and OpenAI Key exists
        if (promptPart && openAiKey) {
            try {
                const imageResponse = await openai.images.generate({
                    model: "dall-e-3",
                    prompt: promptPart.substring(0, 1000), // DALL-E 3 limit
                    n: 1,
                    size: "1792x1024",
                });
                if (imageResponse.data && imageResponse.data[0]) {
                    openAiImageUrl = imageResponse.data[0].url || "";
                }
            } catch (imgErr) {
                console.error("DALL-E Image Generation Error:", imgErr);
            }
        }

        return NextResponse.json({
            hooks: textPart.trim(),
            podcastTitle: titlePart,
            thumbnailUrl: openAiImageUrl,
            thumbnailPrompt: promptPart
        });
    } catch (error) {
        console.error("AI Protocol Breach:", error);
        return NextResponse.json({ error: 'AI Logic Failure: ' + (error as Error).message }, { status: 500 });
    }
}
