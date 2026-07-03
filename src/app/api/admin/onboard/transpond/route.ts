import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import { getClientSetup, updateClientSetup } from "@/lib/client-setup";

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
        const { onboardingId } = await req.json();
        if (!onboardingId) {
            return NextResponse.json({ error: "Missing onboardingId." }, { status: 400 });
        }

        const client = await getClientSetup(onboardingId);
        if (!client) {
            return NextResponse.json({ error: "Client setup record not found." }, { status: 404 });
        }

        if (client.transpondApiKey) {
            return NextResponse.json({
                success: true,
                message: "Transpond integration already provisioned.",
                apiKey: client.transpondApiKey,
                accountMasterId: client.transpondAccountMasterId,
                accountUserId: client.transpondAccountUserId,
            });
        }

        if (!client.transpondEmail || !client.transpondPassword) {
            return NextResponse.json({ error: "Onboarding record does not contain Transpond email or password." }, { status: 400 });
        }

        // 3. Configure Transpond API Request
        console.log(`[Transpond Provisioning] Sending registration request for ${client.companyName}...`);

        const transpondPayload = {
            accountName: client.companyName,
            emailAddress: client.transpondEmail,
            password: client.transpondPassword,
            firstName: client.contactFirst,
            lastName: client.contactLast,
            url: "app.Transpond.io",
            userLanguage: "en"
        };

        const response = await fetch("https://api.transpond.io/register", {
            method: "POST",
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/json",
                "x-access-token": ""
            },
            body: JSON.stringify(transpondPayload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Transpond registration failed: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        console.log(`[Transpond Provisioning] Registration successful! Account Master ID: ${data.accountMasterId}`);

        // 4. Update Firestore Client Record
        // We also mask the plaintext password for security.
        await updateClientSetup(onboardingId, {
            transpondAccountMasterId: data.accountMasterId?.toString() || "",
            transpondAccountUserId: data.accountUserId?.toString() || "",
            transpondApiKey: data.apiKey || "",
            transpondPassword: "[PROVISIONED]", // secure replacement
            status: !client.services.ultatel ? "completed" : "syncing"
        });

        return NextResponse.json({
            success: true,
            message: "Transpond account successfully provisioned.",
            accountMasterId: data.accountMasterId,
            accountUserId: data.accountUserId,
            apiKey: data.apiKey
        });

    } catch (error: any) {
        console.error("[Transpond Setup API] Provisioning failed:", error);
        return NextResponse.json({ error: error.message || "Failed to provision Transpond account." }, { status: 500 });
    }
}
