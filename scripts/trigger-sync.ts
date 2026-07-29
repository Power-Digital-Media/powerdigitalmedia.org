import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { syncActiveClientsToTranspond } from "../src/lib/crm-sync";
import fs from "fs";
import path from "path";

async function main() {
    const dbPath = path.join(process.cwd(), "src", "data", "nexus-db.json");
    if (!fs.existsSync(dbPath)) {
        console.error("Database file not found!");
        process.exit(1);
    }
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    
    console.log("Triggering updated Transpond sync...");
    await syncActiveClientsToTranspond(db);
    console.log("Finished updated sync!");
    process.exit(0);
}

main().catch(err => {
    console.error("Sync failed:", err);
    process.exit(1);
});
