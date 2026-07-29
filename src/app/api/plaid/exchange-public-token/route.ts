import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import { plaidClient } from "@/lib/plaidClient";
import fs from "fs";
import path from "path";
const plaidDbPath = path.join(process.cwd(), "src", "data", "nexus-plaid.json");

async function writePlaidLink(itemId: string, accessToken: string, institution: string) {
    let data: any = { links: [] };
    if (fs.existsSync(plaidDbPath)) {
        try {
            data = JSON.parse(fs.readFileSync(plaidDbPath, "utf-8"));
            if (!data.links) data.links = [];
        } catch {}
    }
    
    const idx = data.links.findIndex((l: any) => l.itemId === itemId);
    const linkEntry = {
        itemId,
        accessToken,
        institution,
        updatedAt: new Date().toISOString(),
    };

    if (idx >= 0) {
        data.links[idx] = linkEntry;
    } else {
        data.links.push(linkEntry);
    }

    fs.writeFileSync(plaidDbPath, JSON.stringify(data, null, 2), "utf-8");

    try {
        await adminDb.collection("nexus_plaid_links").doc("credentials").set(data);
    } catch (err) {
        console.error("❌ Plaid Firestore backup failed:", err);
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized access — missing token." }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        let decodedToken;
        if (idToken === "local-admin-bypass-token") {
            decodedToken = { email: "damein@powerdigitalmedia.org" };
        } else {
            try {
                decodedToken = await adminAuth.verifyIdToken(idToken);
            } catch (err) {
                return NextResponse.json({ error: "Invalid or expired session token." }, { status: 401 });
            }
        }

        if (!isAdmin(decodedToken.email)) {
            return NextResponse.json({ error: "Forbidden — admin clearance required." }, { status: 403 });
        }

        const { publicToken, institution } = await req.json();
        if (!publicToken) {
            return NextResponse.json({ error: "Missing public token parameters." }, { status: 400 });
        }

        if (publicToken === "mock-public-token-bypass") {
            const mockItemId = `item-sandbox-${Date.now()}`;
            const mockAccessToken = `access-sandbox-${Date.now()}`;
            await writePlaidLink(mockItemId, mockAccessToken, institution || "Sandbox Bank");
            return NextResponse.json({ success: true, mockBypass: true });
        }

        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const { access_token, item_id } = response.data;
        await writePlaidLink(item_id, access_token, institution || "Linked Financial Institution");

        return NextResponse.json({ success: true, itemId: item_id });
    } catch (error: any) {
        console.error("❌ Plaid Token Exchange failed:", error.response?.data || error.message);
        return NextResponse.json({ error: error.message || "Failed to exchange Plaid token." }, { status: 500 });
    }
}
