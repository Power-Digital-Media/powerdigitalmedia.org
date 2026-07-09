import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { isAdmin } from "@/lib/auth-constants";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "nexus-db.json");

async function getDbData() {
    if (!fs.existsSync(dbPath)) {
        try {
            console.log("⚠️ Local database file not found. Restoring from Firestore...");
            const doc = await adminDb.collection("nexus_registry").doc("database").get();
            if (doc.exists) {
                const data = doc.data();
                // Re-create the local file to caching it
                fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
                return data;
            }
        } catch (err) {
            console.error("❌ Failed to restore database from Firestore:", err);
        }
        return { clients: [], services: [], payments: [], tasks: [], platforms: [], domainsHosting: [], salesPipeline: [], notes: [] };
    }
    const raw = fs.readFileSync(dbPath, "utf-8");
    try {
        return JSON.parse(raw);
    } catch (err) {
        console.error("❌ Failed to parse local JSON. Falling back to Firestore:", err);
        try {
            const doc = await adminDb.collection("nexus_registry").doc("database").get();
            if (doc.exists) {
                return doc.data();
            }
        } catch (cErr) {
            console.error("❌ Cloud fallback recovery failed:", cErr);
        }
        return { clients: [], services: [], payments: [], tasks: [], platforms: [], domainsHosting: [], salesPipeline: [], notes: [] };
    }
}

async function writeDbData(data: any) {
    // 1. Write locally
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");

    // 2. Backup to Firestore cloud
    try {
        await adminDb.collection("nexus_registry").doc("database").set(data);
        console.log("☁️ Firestore cloud backup committed successfully.");
    } catch (err) {
        console.error("❌ Firestore cloud backup write failed:", err);
    }
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

        const data = await getDbData();
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

        // Write the data to local file and Firestore cloud
        await writeDbData(body);

        return NextResponse.json({ success: true, message: "Database saved and backed up to cloud." });
    } catch (error: any) {
        console.error("[Admin Nexus API] POST failed:", error);
        return NextResponse.json({ error: error.message || "Failed to write database." }, { status: 500 });
    }
}
