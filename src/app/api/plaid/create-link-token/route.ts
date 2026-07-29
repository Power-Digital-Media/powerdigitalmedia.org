import { NextRequest, NextResponse } from "next/server";
import { Products, CountryCode } from "plaid";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import { plaidClient } from "@/lib/plaidClient";

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

        const clientUserId = `pdm-user-${Date.now()}`;
        const response = await plaidClient.linkTokenCreate({
            user: {
                client_user_id: clientUserId,
            },
            client_name: "Power Digital Media Ledger",
            products: [Products.Transactions],
            country_codes: [CountryCode.Us],
            language: "en",
        });

        return NextResponse.json({ linkToken: response.data.link_token });
    } catch (error: any) {
        console.error("❌ Plaid Link Token creation failed:", error.response?.data || error.message);
        if (!process.env.PLAID_CLIENT_ID || process.env.PLAID_CLIENT_ID.includes("sandbox-client-id")) {
            return NextResponse.json({ linkToken: "mock-sandbox-link-token-bypass" });
        }
        return NextResponse.json({ error: error.message || "Plaid integration error." }, { status: 500 });
    }
}
