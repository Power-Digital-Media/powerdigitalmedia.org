import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import { getClientSetup, updateClientSetup } from "@/lib/client-setup";
import { UltatelClient } from "@/lib/ultatel";

export async function POST(req: NextRequest) {
    try {
        // 1. Check admin authorization
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized access — missing token." }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        let decodedToken;
        try {
            decodedToken = await adminAuth.verifyIdToken(idToken);
        } catch (err) {
            return NextResponse.json({ error: "Invalid or expired session token." }, { status: 401 });
        }

        if (!isAdmin(decodedToken.email)) {
            return NextResponse.json({ error: "Forbidden — admin clearance required." }, { status: 403 });
        }

        // 2. Load payload
        const { onboardingId, ultatelApiKey } = await req.json();
        if (!onboardingId || !ultatelApiKey) {
            return NextResponse.json({ error: "Missing onboardingId or ultatelApiKey." }, { status: 400 });
        }

        const clientRecord = await getClientSetup(onboardingId);
        if (!clientRecord) {
            return NextResponse.json({ error: "Client setup record not found." }, { status: 404 });
        }

        // 3. Test Connectivity & Register Webhook
        console.log(`[Ultatel Provisioning] Testing connection for ${clientRecord.companyName}...`);
        
        // Instantiate the client with the provided api key
        const ultatelClient = new UltatelClient(ultatelApiKey);
        
        // Test connection
        const connectionTest = await ultatelClient.testConnection();
        if (!connectionTest.success) {
            return NextResponse.json({ 
                error: `Ultatel API Connection failed: ${connectionTest.message}` 
            }, { status: 400 });
        }

        console.log(`[Ultatel Provisioning] Connection successful! PBX ID: ${connectionTest.pbxId}`);

        // Register Webhook dynamically using the requesting origin
        const origin = new URL(req.url).origin;
        const webhookUrl = `${origin}/api/telephony`;
        console.log(`[Ultatel Provisioning] Registering webhook endpoint: ${webhookUrl}`);

        const webhookId = await ultatelClient.registerWebhook(webhookUrl);
        console.log(`[Ultatel Provisioning] Registered! Subscription ID: ${webhookId}`);

        // 4. Update Firestore Client Record
        await updateClientSetup(onboardingId, {
            ultatelApiKey: ultatelApiKey,
            ultatelPbxId: connectionTest.pbxId || "",
            ultatelWebhookId: webhookId,
            status: "completed"
        });

        return NextResponse.json({
            success: true,
            message: "Ultatel Cloud PBX successfully integrated and verified.",
            webhookId,
            pbxId: connectionTest.pbxId
        });

    } catch (error: any) {
        console.error("[Ultatel Setup API] Provisioning failed:", error);
        return NextResponse.json({ error: error.message || "Failed to configure Ultatel integration." }, { status: 500 });
    }
}
