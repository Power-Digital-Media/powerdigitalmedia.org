# Client Integration Playbook: Ultatel VoIP + Capsule CRM Setup

This playbook contains the reusable, step-by-step process to connect a client's Ultatel Cloud VoIP phone system to Capsule CRM (using Transpond as the sync engine).

> [!IMPORTANT]
> **Antigravity AI Agent Custom Skill:**
> To have your AI agent automatically scaffold and register this telephony sync for a new client project, copy and paste this command into the chat:
> 
> `"Use the telephony-crm-setup skill to connect this client's phone and CRM."`

---

## 1. Setup Checklist & Account Configuration

### Step A: Transpond Configuration (Sync Engine)
Transpond acts as the synchronization bridge that matches phone numbers to CRM records and automatically pipes call transcripts and notes into Capsule CRM.

1. **Get the API Key:**
   * Log into the client's Transpond portal.
   * Go to **Integrations / Developer Tools** and generate a new API token.
2. **Retrieve the Group ID:**
   * Go to **Groups** and locate the sync group connected to their Capsule CRM (e.g., "Inbound Leads" or "Jackson Community Leads").
   * Copy the **6-digit Group ID** from the page URL or settings.

### Step B: Ultatel Configuration
1. **Get the API Token:**
   * Request the Bearer API Key from Ultatel Support during onboarding.
   * The key format is: `ut-<hostname>-<8-hex>.<64-hex>`.
2. **Assign Phone Numbers (DIDs):**
   * Confirm the client's inbound numbers (DIDs) are active in their admin portal.
3. **Optional (Voice AI Routing):**
   * If using a live AI conversational agent, write the prompt rules (what the bot should say and ask for) in the **AI Agent** portal tab.

---

## 2. Environment Variables
Add these key-value pairs to the client's local `.env.local` file and their production hosting variables (e.g., Netlify/Vercel):

```env
TRANSPOND_API_KEY=eyJhbGciOiJIUzI1NiIs... (Your Transpond API key)
TRANSPOND_GROUP_ID=187780 (Your Transpond Group ID)
ULTATEL_API_KEY=ut-acme-a3f9c2e1... (Your Ultatel API key)
```

---

## 3. Integration Codebase Files
Each new client website requires these three files to be present in their Next.js project:

### File 1: API Client Wrapper (`src/lib/ultatel.ts`)
Handles network requests, connectivity checks, webhook subscriptions, and Transpond logging.
*(Refer to your project's `src/lib/ultatel.ts` for the complete implementation).*

### File 2: Webhook Endpoint (`src/app/api/telephony/route.ts`)
Listens for call completions from Ultatel and logs them to Capsule.
*(Refer to your project's `src/app/api/telephony/route.ts` for the complete handler).*

### File 3: Registration Script (`scripts/test-ultatel.ts`)
Run this CLI tool once to link the phones to the website:
```bash
npx tsx scripts/test-ultatel.ts
```

---

## 4. Verification & Testing Protocol
To verify the integration:
1. **Test Echo:** Run the script above. It will print `✅ Connected Successfully!` if the Ultatel key is valid.
2. **Test Inbound Route:** Call the client's business phone.
3. **Verify CRM Note:** Wait 60 seconds after hanging up. Look up the contact in Capsule CRM and confirm a new note appears showing:
   * Call direction and duration
   * AI-generated summary
   * Sentiment analysis
   * Call transcript snippet
