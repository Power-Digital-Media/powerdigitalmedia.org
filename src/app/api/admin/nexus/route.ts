import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "nexus-db.json");

function getDbData() {
    if (!fs.existsSync(dbPath)) {
        return { clients: [], overhead: [], payments: [] };
    }
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw);
}

function writeDbData(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

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

        const data = getDbData();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("[Admin Nexus API] GET failed:", error);
        return NextResponse.json({ error: error.message || "Failed to read database." }, { status: 500 });
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
        try {
            decodedToken = await adminAuth.verifyIdToken(idToken);
        } catch (err) {
            return NextResponse.json({ error: "Invalid or expired session token." }, { status: 401 });
        }

        if (!isAdmin(decodedToken.email)) {
            return NextResponse.json({ error: "Forbidden — admin clearance required." }, { status: 403 });
        }

        const body = await req.json();
        if (!body || typeof body !== "object") {
            return NextResponse.json({ error: "Invalid payload body." }, { status: 400 });
        }

        // Write the data to the JSON file
        writeDbData(body);

        return NextResponse.json({ success: true, message: "Database saved successfully." });
    } catch (error: any) {
        console.error("[Admin Nexus API] POST failed:", error);
        return NextResponse.json({ error: error.message || "Failed to write database." }, { status: 500 });
    }
}
