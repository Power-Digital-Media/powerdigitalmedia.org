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

        if (client.capsuleOrgId && client.capsuleContactId) {
            return NextResponse.json({
                success: true,
                message: "Capsule CRM integration already provisioned.",
                capsuleOrgId: client.capsuleOrgId,
                capsuleContactId: client.capsuleContactId
            });
        }

        // 3. Configure Capsule REST Headers
        const capsuleToken = process.env.CAPSULE_API_TOKEN;
        const capsuleBase = process.env.CAPSULE_BASE_URL || "https://api.capsulecrm.com";

        if (!capsuleToken) {
            return NextResponse.json({ error: "Server error: CAPSULE_API_TOKEN is not configured." }, { status: 500 });
        }

        const headers = {
            "Authorization": `Bearer ${capsuleToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        console.log(`[Capsule Provisioning] Starting for ${client.companyName}...`);

        // 4. Create Organisation in Capsule
        const orgPayload = {
            party: {
                type: "organisation",
                name: client.companyName,
                websites: [{ address: client.website }],
                phoneNumbers: [{ number: client.phone }]
            }
        };

        const orgRes = await fetch(`${capsuleBase}/api/v2/parties`, {
            method: "POST",
            headers,
            body: JSON.stringify(orgPayload)
        });

        if (!orgRes.ok) {
            const errText = await orgRes.text();
            throw new Error(`Capsule Org creation failed: ${orgRes.status} - ${errText}`);
        }

        const orgData = await orgRes.json();
        const orgId = orgData.party.id;
        console.log(`[Capsule Provisioning] Created Org: ${orgId}`);

        // 5. Create Person in Capsule
        const personPayload = {
            party: {
                type: "person",
                firstName: client.contactFirst,
                lastName: client.contactLast,
                emailAddresses: [{ address: client.contactEmail }],
                phoneNumbers: [{ number: client.contactPhone }],
                organisation: { id: orgId },
                tags: [{ name: "Client Setup" }]
            }
        };

        const personRes = await fetch(`${capsuleBase}/api/v2/parties`, {
            method: "POST",
            headers,
            body: JSON.stringify(personPayload)
        });

        if (!personRes.ok) {
            const errText = await personRes.text();
            throw new Error(`Capsule Person creation failed: ${personRes.status} - ${errText}`);
        }

        const personData = await personRes.json();
        const contactId = personData.party.id;
        console.log(`[Capsule Provisioning] Created Contact: ${contactId}`);

        // 6. Update Firestore record
        await updateClientSetup(onboardingId, {
            capsuleOrgId: orgId.toString(),
            capsuleContactId: contactId.toString(),
            status: (!client.services.transpond && !client.services.ultatel) ? "completed" : "syncing"
        });

        return NextResponse.json({
            success: true,
            message: "Capsule CRM assets successfully created.",
            capsuleOrgId: orgId,
            capsuleContactId: contactId
        });

    } catch (error: any) {
        console.error("[Capsule Onboard API] Provisioning failed:", error);
        return NextResponse.json({ error: error.message || "Failed to provision Capsule assets." }, { status: 500 });
    }
}
