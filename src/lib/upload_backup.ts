import dotenv from 'dotenv';
import path from 'path';

// Load .env.local explicitly before importing firebase-admin
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Map GOOGLE_SERVICE_ACCOUNT_KEY to expected env var if present
if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY && !process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
}

import { adminDb } from './firebase-admin';
import fs from 'fs';

async function main() {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'nexus-db.json');
    if (!fs.existsSync(dbPath)) {
        console.error("File not found:", dbPath);
        process.exit(1);
    }
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    
    try {
        await adminDb.collection("nexus_registry").doc("database").set(dbData);
        console.log("Successfully uploaded local nexus-db.json to Firestore cloud backup!");
        process.exit(0);
    } catch (err) {
        console.error("Failed to upload to Firestore:", err);
        process.exit(1);
    }
}

main();
