import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import { listClientSetups } from "@/lib/client-setup";

export async function GET(req: NextRequest) {
    try {
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

        const requests = await listClientSetups();
        return NextResponse.json({ success: true, requests });
    } catch (error: any) {
        console.error("[Admin Client Setups API] List failed:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch setups." }, { status: 500 });
    }
}
