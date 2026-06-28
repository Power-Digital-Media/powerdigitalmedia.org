import { NextResponse } from "next/server";
import { UltatelClient, UltatelCallEvent } from "@/lib/ultatel";

export async function POST(req: Request) {
    try {
        const body: UltatelCallEvent = await req.json();
        console.log(`[Telephony API] Received webhook event: ${body.eventType} for Call ID: ${body.data?.callId}`);

        const client = new UltatelClient();

        // Verify the event type
        if (body.eventType === "ai.analysis_complete" || body.eventType === "call.end") {
            const callId = body.data.callId;
            const phone = body.data.callerId;
            const direction = body.data.direction;
            const duration = body.data.duration || 0;

            if (!phone) {
                return NextResponse.json({ success: false, message: "Missing callerId" }, { status: 400 });
            }

            // Fetch the AI transcript, summary, and sentiment from Ultatel
            console.log(`[Telephony API] Fetching AI analysis for Call ID: ${callId}...`);
            const aiData = await client.getCallAISummary(callId);

            // Log the call details directly into Transpond/Capsule CRM
            console.log(`[Telephony API] Logging call for ${phone} to CRM...`);
            await client.logCallToCRM({
                phone: phone,
                direction: direction,
                duration: duration,
                summary: aiData.summary,
                transcript: aiData.transcript,
                sentiment: aiData.sentiment
            });

            return NextResponse.json({ success: true, message: "Call event processed and logged to CRM" });
        }

        // Return 200 for other events to acknowledge receipt
        return NextResponse.json({ success: true, message: `Event ${body.eventType} received` });
    } catch (error: any) {
        console.error("[Telephony API] Webhook processing failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
