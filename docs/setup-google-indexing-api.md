# Client Integration Playbook: Google Indexing API & IndexNow Setup

This playbook contains the reusable, step-by-step process to configure real-time search engine indexing (Google + Bing + Yahoo) on Next.js website deployments. This ensures new blog posts, services, and changes get crawled and index-updated within minutes of going live.

---

## 1. Setup Checklist & Configurations

### Step A: Google Cloud Console Setup (Indexing API)
1. **Create a Google Cloud Project:**
   * Go to the [Google Cloud Console](https://console.cloud.google.com).
   * Create a new project named after the client (e.g., `client-seo-project`).
2. **Enable the Indexing API:**
   * Go to **API & Services > Library**.
   * Search for **Web Search Indexing API** and click **Enable**.
3. **Generate a Service Account Key:**
   * Go to **IAM & Admin > Service Accounts**.
   * Click **Create Service Account**. Give it a name (e.g., `seo-indexer`) and click **Create and Continue**.
   * Do not assign permissions (click **Done**).
   * Click on the newly created Service Account email address, go to the **Keys** tab, click **Add Key > Create New Key**, select **JSON**, and download the file.

### Step B: Google Search Console Verification
Google requires the service account email to be authorized to request indexing for the website.
1. Log into [Google Search Console](https://search.google.com/search-console).
2. Select the client's verified domain property.
3. Go to **Settings > Users and Associations**.
4. Click **Add User**, paste the Service Account email address (e.g., `seo-indexer@...gserviceaccount.com`), set their permission to **Owner** (Owner permission is required by Google to use the Indexing API), and click **Add**.

### Step C: Bing / Yahoo IndexNow Setup
IndexNow is supported natively by Bing, Yandex, and other search engines.
1. Generate an IndexNow Key (a random 32-character hex string).
2. Create a static text file in your public directory: `/public/[your-key].txt` containing the key string itself. This allows Bing to verify ownership.

---

## 2. Environment Variables
Add these key-value pairs to the client's local `.env.local` file and their production environment variables (e.g., Netlify/Vercel):

```env
# IndexNow configuration
INDEXNOW_KEY=93f2ea70d65b4c10a8ef18cd301e52ba

# Google Service Account JSON Key (must be single-line stringified JSON)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3...\n-----END PRIVATE KEY-----\n","client_email":"seo-indexer@..."}
```

---

## 3. Automation Scripts
The codebase uses a post-build script to trigger the indexing ping automatically after Netlify completes compilation.

### The Ping Script (`scripts/ping-search-engines.ts`)
* Reads environment variables.
* Packages all site URLs (static + blogs + showroom).
* Sends a `POST` request to `api.indexnow.org`.
* Performs a signed JWT authentication to Google and submits the URL payload to the Indexing API endpoint: `https://indexing.googleapis.com/v3/urlNotifications:publish`.

---

## 4. Verification & Testing
To manually test or verify the search engine indexing:
1. Set the environment variables locally.
2. Run the script:
   ```bash
   npx tsx scripts/ping-search-engines.ts
   ```
3. Check the console output:
   * `✅ IndexNow Response Status: 200`
   * `✅ Google Indexing API: URL submitted successfully`
