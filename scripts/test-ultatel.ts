import { UltatelClient } from "../src/lib/ultatel";
import * as dotenv from "dotenv";
import * as path from "path";

// Load local environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function run() {
    console.log("==========================================");
    console.log("      ULTATEL CONNECTIVITY TESTER & WEBHOOKS");
    console.log("==========================================\n");

    const client = new UltatelClient();

    console.log("Testing connectivity to platform.ultatel.com...");
    const connResult = await client.testConnection();

    if (!connResult.success) {
        console.error(`❌ Connection Failed: ${connResult.message}`);
        console.log("\nAction Required:");
        console.log("1. Make sure you have added your API Key to .env.local as:");
        console.log("   ULTATEL_API_KEY=ut-<hostname>-<8-hex>.<64-hex>");
        console.log("2. Verify that your key is active and was issued correctly.");
        console.log("==========================================");
        process.exit(1);
    }

    console.log(`✅ Connected Successfully!`);
    console.log(`- PBX ID: ${connResult.pbxId}`);

    // Register Webhook
    const webhookUrl = "https://powerdigitalmedia.org/api/telephony";
    console.log(`\nRegistering webhook subscriber for: ${webhookUrl}...`);

    try {
        const webhookId = await client.registerWebhook(webhookUrl);
        console.log(`✅ Webhook Registered! Subscription ID: ${webhookId}`);
        console.log("\nReady! Your Capsule CRM and Ultatel phone sync is fully active.");
    } catch (err: any) {
        console.error(`❌ Failed to register Webhook: ${err.message}`);
    }

    console.log("==========================================");
}

run();
