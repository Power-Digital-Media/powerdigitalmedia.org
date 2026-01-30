import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
    try {
        const { topic } = await request.json();
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey || apiKey.length < 20) {
            console.error("AI Protocol Error: OpenAI API Key is missing or invalid.");
            return NextResponse.json({ error: 'AI Protocol Offline: Missing API Key. Please restart your server.' }, { status: 500 });
        }

        const openai = new OpenAI({ apiKey });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a world-class podcast strategist and growth engineer. 
                    Your goal is to provide dual-intelligence for a podcast topic:
                    1. VIRAL HOOKS: 5 scroll-stopping viral hook ideas for social clips.
                    2. SEARCH INTELLIGENCE: 3 critical questions people are actually searching for (Answer the Public style).
                    3. VISUAL PROTOCOL: 1 detailed, high-fidelity image description for a YouTube thumbnail.
                    
                    Format the output in three clear sections with emojis and bold headers. Keep the VISUAL PROTOCOL section separate at the bottom. Start the visual prompt with 'PROMPT:' for easy extraction.`
                },
                {
                    role: "user",
                    content: `Topic: ${topic}`
                }
            ],
            temperature: 0.8,
        });

        const fullContent = completion.choices[0].message.content || "";
        const [textPart, promptPart] = fullContent.split('PROMPT:');

        return NextResponse.json({
            hooks: textPart.trim(),
            thumbnailPrompt: promptPart ? promptPart.trim() : ""
        });
    } catch (error) {
        console.error("AI Protocol Breach:", error);
        return NextResponse.json({ error: 'AI Logic Failure' }, { status: 500 });
    }
}
