import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import dotenv from "dotenv";
import { PDM_CANONICAL_GBP_PROFILE } from "../src/data/gbp-profile";

dotenv.config({ path: ".env.local" });
dotenv.config();

const LOCAL_TOKEN_FILE = path.join(process.cwd(), ".gbp-oauth.local.json");
const DEFAULT_CALLBACK_PORT = Number(process.env.GBP_OAUTH_PORT || 3847);
const DEFAULT_REDIRECT_URI =
  process.env.GBP_REDIRECT_URI || `http://localhost:${DEFAULT_CALLBACK_PORT}/oauth2callback`;

const GBP_SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
  "openid",
  "email",
];

interface StoredGbpOAuth {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  redirectUri: string;
  authorizedEmail?: string;
  accountName?: string;
  locationName?: string;
  updatedAt: string;
}

function readEnvFileMap(filePath: string): Record<string, string> {
  const map: Record<string, string> = {};
  if (!fs.existsSync(filePath)) return map;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const idx = line.indexOf("=");
    if (idx > 0 && !line.trimStart().startsWith("#")) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      map[k] = v;
    }
  }
  return map;
}

function resolveClientCredentials(): { clientId: string; clientSecret: string } {
  if (fs.existsSync(LOCAL_TOKEN_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(LOCAL_TOKEN_FILE, "utf8")) as Partial<StoredGbpOAuth>;
      if (saved.clientId && saved.clientSecret) {
        return { clientId: saved.clientId, clientSecret: saved.clientSecret };
      }
    } catch {
      // fall through
    }
  }

  const envClientId = process.env.GOOGLE_GBP_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const envClientSecret = process.env.GOOGLE_GBP_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
  if (envClientId && envClientSecret) {
    return { clientId: envClientId, clientSecret: envClientSecret };
  }

  // Fallback to sibling pindrop-saas .env.local if present on Damein's workstation
  const siblingEnv = readEnvFileMap(path.resolve(process.cwd(), "..", "pindrop-saas", ".env.local"));
  if (siblingEnv.GOOGLE_CLIENT_ID && siblingEnv.GOOGLE_CLIENT_SECRET) {
    return {
      clientId: siblingEnv.GOOGLE_CLIENT_ID,
      clientSecret: siblingEnv.GOOGLE_CLIENT_SECRET,
    };
  }

  throw new Error(
    "Missing GOOGLE_GBP_CLIENT_ID / GOOGLE_GBP_CLIENT_SECRET in .env.local. Add an OAuth 2.0 Client ID from your Google Cloud project."
  );
}

function loadSavedAuth(): StoredGbpOAuth {
  if (!fs.existsSync(LOCAL_TOKEN_FILE)) {
    throw new Error(
      "No authorized GBP OAuth token found (.gbp-oauth.local.json). Run `npm run gbp:auth` first."
    );
  }
  return JSON.parse(fs.readFileSync(LOCAL_TOKEN_FILE, "utf8")) as StoredGbpOAuth;
}

function saveAuth(payload: StoredGbpOAuth) {
  fs.writeFileSync(LOCAL_TOKEN_FILE, JSON.stringify(payload, null, 2), { mode: 0o600 });
}

async function getAccessToken(saved: StoredGbpOAuth): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: saved.clientId,
      client_secret: saved.clientSecret,
      refresh_token: saved.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OAuth token refresh failed (${res.status}): ${err}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function explainQuotaOrApiError(status: number, bodyText: string): string {
  if (
    status === 429 ||
    bodyText.includes("RATE_LIMIT_EXCEEDED") ||
    bodyText.includes("quota_limit_value\":\"0\"")
  ) {
    return [
      "⚠️  GOOGLE GBP API QUOTA IS CURRENTLY 0 QPM ON THIS GOOGLE CLOUD PROJECT.",
      "   Your OAuth login succeeded, and your permanent refresh token is saved!",
      "   Google requires a one-time manual approval on the Google Cloud project before raising GBP API quota from 0 -> 300 QPM:",
      "   1. Submit Google's Basic API Access Form: https://support.google.com/business/contact/api_default",
      "      (Reference guide: https://developers.google.com/my-business/content/prereqs)",
      "   2. Enable in Google Cloud Console -> APIs & Services -> Library:",
      "      - My Business Account Management API (mybusinessaccountmanagement.googleapis.com)",
      "      - My Business Business Information API (mybusinessbusinessinformation.googleapis.com)",
      "      - Business Profile Performance API (businessprofileperformance.googleapis.com)",
      "      - My Business Verifications API (mybusinessverifications.googleapis.com)",
      "   As soon as Google sends the approval email, `npm run gbp:audit` and `npm run gbp:push -- --apply` will work automatically with zero re-login!",
    ].join("\n");
  }
  if (status === 403 && bodyText.includes("has not been used in project")) {
    return [
      "⚠️  REQUIRED GBP API NOT YET ENABLED IN GOOGLE CLOUD CONSOLE:",
      `   ${bodyText}`,
      "   Enable My Business Account Management API & My Business Business Information API in Google Cloud Console, then re-run `npm run gbp:audit`.",
    ].join("\n");
  }
  return `GBP API error (${status}): ${bodyText}`;
}

async function resolvePrimaryLocation(accessToken: string, saved: StoredGbpOAuth) {
  const accRes = await fetch("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!accRes.ok) {
    const txt = await accRes.text();
    throw new Error(explainQuotaOrApiError(accRes.status, txt));
  }

  const accData = (await accRes.json()) as {
    accounts?: Array<{ name: string; accountName: string; type: string }>;
  };
  const accounts = accData.accounts || [];
  if (accounts.length === 0) {
    throw new Error("No Google Business Profile accounts found on the signed-in Google user.");
  }

  console.log("\n📋 Discovered GBP Accounts:");
  for (const a of accounts) {
    console.log(`  - ${a.accountName} (${a.name}) [${a.type}]`);
  }

  const readMask = [
    "name",
    "title",
    "websiteUri",
    "phoneNumbers",
    "categories",
    "storefrontAddress",
    "serviceArea",
    "regularHours",
    "profile",
    "metadata",
    "serviceItems",
  ].join(",");

  for (const acc of accounts) {
    const locRes = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${acc.name}/locations?readMask=${readMask}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!locRes.ok) {
      const txt = await locRes.text();
      throw new Error(explainQuotaOrApiError(locRes.status, txt));
    }
    const locData = (await locRes.json()) as { locations?: Array<Record<string, any>> };
    const locations = locData.locations || [];
    for (const loc of locations) {
      console.log(`  📍 Location: ${loc.title} (${loc.name})`);
    }
    const match =
      locations.find((l) => String(l.title || "").toLowerCase().includes("power digital")) ||
      locations[0];
    if (match) {
      saved.accountName = acc.name;
      saved.locationName = match.name;
      saved.updatedAt = new Date().toISOString();
      saveAuth(saved);
      return { accountName: acc.name, location: match };
    }
  }

  throw new Error("No GBP business locations returned across discovered accounts.");
}

async function runOAuthFlow() {
  const { clientId, clientSecret } = resolveClientCredentials();
  const redirectUri = DEFAULT_REDIRECT_URI;
  const parsedUrl = new URL(redirectUri);
  const port = Number(parsedUrl.port || DEFAULT_CALLBACK_PORT);

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", GBP_SCOPES.join(" "));
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("\n================================================================================");
  console.log("🔐 POWER DIGITAL MEDIA — PERMANENT GOOGLE BUSINESS PROFILE OAUTH SETUP");
  console.log("================================================================================");
  console.log(`OAuth Client Project Prefix : ${clientId.split("-")[0]}`);
  console.log(`Authorized Redirect URI     : ${redirectUri}`);
  console.log("  (Ensure this exact Redirect URI is added under Authorized redirect URIs");
  console.log("   in Google Cloud Console -> APIs & Services -> Credentials for this Client ID)");
  console.log("\n👉 Open this link in Chrome (signed into your GBP Owner Google Account):\n");
  console.log(authUrl.toString());
  console.log("\n⏳ Waiting for Google OAuth callback on localhost:" + port + "...\n");

  await new Promise<void>((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        if (!req.url) return;
        const reqUrl = new URL(req.url, `http://localhost:${port}`);
        if (reqUrl.pathname !== parsedUrl.pathname) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }

        const err = reqUrl.searchParams.get("error");
        const code = reqUrl.searchParams.get("code");
        if (err || !code) {
          res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
          res.end(`<h2>Authorization cancelled or failed: ${err || "missing code"}</h2>`);
          server.close();
          reject(new Error(`OAuth failed: ${err || "missing code"}`));
          return;
        }

        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
          }),
        });

        if (!tokenRes.ok) {
          const txt = await tokenRes.text();
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(`Token exchange failed: ${txt}`);
          server.close();
          reject(new Error(`Token exchange failed: ${txt}`));
          return;
        }

        const tokenJson = (await tokenRes.json()) as {
          access_token: string;
          refresh_token?: string;
        };

        if (!tokenJson.refresh_token) {
          throw new Error(
            "Google did not return a refresh_token. Re-run with prompt=consent after revoking prior grant if needed."
          );
        }

        let email = "";
        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${tokenJson.access_token}` },
        });
        if (userRes.ok) {
          const u = (await userRes.json()) as { email?: string };
          email = u.email || "";
        }

        const payload: StoredGbpOAuth = {
          clientId,
          clientSecret,
          refreshToken: tokenJson.refresh_token,
          redirectUri,
          authorizedEmail: email,
          updatedAt: new Date().toISOString(),
        };
        saveAuth(payload);

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          `<body style="background:#06080f;color:#f8fafc;font-family:system-ui;padding:48px;text-align:center;">
            <h1 style="color:#fbbf24;">Power Digital Media GBP Connected ✓</h1>
            <p>Permanent OAuth refresh token saved locally for <strong>${email || "your GBP account"}</strong>.</p>
            <p style="color:#94a3b8;">You can close this tab and return to Antigravity.</p>
          </body>`
        );

        console.log(`✅ Permanent GBP refresh token saved to .gbp-oauth.local.json (${email})!`);
        server.close();

        // Immediately probe GBP API readiness
        try {
          await resolvePrimaryLocation(tokenJson.access_token, payload);
          console.log("🎉 GBP API QUOTA IS LIVE AND ACTIVE! Run `npm run gbp:audit` next.");
        } catch (probeErr: any) {
          console.log("\n" + (probeErr?.message || String(probeErr)));
        }

        resolve();
      } catch (e) {
        server.close();
        reject(e);
      }
    });

    server.listen(port);
  });
}

async function runAudit() {
  const saved = loadSavedAuth();
  const accessToken = await getAccessToken(saved);
  const { location } = await resolvePrimaryLocation(accessToken, saved);

  console.log("\n================================================================================");
  console.log("🔎 LIVE GOOGLE BUSINESS PROFILE vs. CANONICAL WEBSITE ALIGNMENT AUDIT");
  console.log("================================================================================");

  const liveTitle = location.title || "(unset)";
  const liveWebsite = location.websiteUri || "(unset)";
  const livePhone = location.phoneNumbers?.primaryPhone || "(unset)";
  const livePrimaryCat = location.categories?.primaryCategory?.displayName || "(unset)";
  const liveAddCats = (location.categories?.additionalCategories || [])
    .map((c: any) => c.displayName)
    .join(", ");
  const liveDesc = location.profile?.description || "(unset)";

  const rows = [
    ["Business Name", liveTitle, PDM_CANONICAL_GBP_PROFILE.businessName],
    ["Primary Phone", livePhone, PDM_CANONICAL_GBP_PROFILE.primaryPhone],
    ["Website URI", liveWebsite, PDM_CANONICAL_GBP_PROFILE.websiteUri],
    ["Primary Category", livePrimaryCat, PDM_CANONICAL_GBP_PROFILE.primaryCategory.displayName],
    [
      "Additional Categories",
      liveAddCats || "(none)",
      PDM_CANONICAL_GBP_PROFILE.additionalCategories.map((c) => c.displayName).join(", "),
    ],
    [
      "Description Length",
      `${liveDesc === "(unset)" ? 0 : liveDesc.length} chars`,
      `${PDM_CANONICAL_GBP_PROFILE.description.length} chars`,
    ],
  ];

  for (const [label, liveVal, targetVal] of rows) {
    const aligned = String(liveVal).trim() === String(targetVal).trim();
    console.log(`\n• ${label}: ${aligned ? "✅ ALIGNED" : "⚠️  DRIFT DETECTED"}`);
    console.log(`    Live GBP : ${liveVal}`);
    console.log(`    Target   : ${targetVal}`);
  }

  console.log("\n• Live Description:");
  console.log(`    ${liveDesc}`);
}

async function runPush(applyChanges: boolean) {
  const saved = loadSavedAuth();
  const accessToken = await getAccessToken(saved);
  const { location } = await resolvePrimaryLocation(accessToken, saved);

  const patchBody = {
    websiteUri: PDM_CANONICAL_GBP_PROFILE.websiteUri,
    regularHours: PDM_CANONICAL_GBP_PROFILE.regularHours,
    profile: {
      description: PDM_CANONICAL_GBP_PROFILE.description,
    },
    categories: {
      primaryCategory: { name: PDM_CANONICAL_GBP_PROFILE.primaryCategory.name },
      additionalCategories: PDM_CANONICAL_GBP_PROFILE.additionalCategories.map((c) => ({
        name: c.name,
      })),
    },
    serviceArea: {
      businessType: PDM_CANONICAL_GBP_PROFILE.businessType,
      places: {
        placeInfos: PDM_CANONICAL_GBP_PROFILE.serviceAreaPlaces.map((placeName) => ({
          placeName,
        })),
      },
    },
    serviceItems: PDM_CANONICAL_GBP_PROFILE.services.map((s) => ({
      freeFormServiceItem: {
        category: s.categoryId,
        label: {
          displayName: s.displayName,
          description: s.description,
          languageCode: "en-US",
        },
      },
    })),
  };

  const includeTerritory = process.argv.includes("--include-service-area");
  const updateMask = [
    "websiteUri",
    "regularHours",
    "profile.description",
    "categories",
    "serviceItems",
    ...(includeTerritory ? ["serviceArea"] : []),
  ].join(",");

  if (!applyChanges) {
    console.log("\n🧪 DRY RUN (`npm run gbp:push` without `-- --apply`):");
    console.log(`Target Location: ${location.name} (${location.title})`);
    console.log(`Update Mask    : ${updateMask}`);
    console.log(JSON.stringify(patchBody, null, 2));
    console.log("\n👉 Run `npm run gbp:push -- --apply` to write these exact fields to Google Business Profile.");
    return;
  }

  const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${location.name}?updateMask=${encodeURIComponent(
    updateMask
  )}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchBody),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(explainQuotaOrApiError(res.status, txt));
  }

  const updated = await res.json();
  console.log("✅ Successfully synced canonical website profile to Google Business Profile!");
  console.log(`   Updated Location: ${updated.title} (${updated.name})`);
}

async function runPost(summary: string, actionUrl: string) {
  const saved = loadSavedAuth();
  const accessToken = await getAccessToken(saved);
  const { accountName, location } = await resolvePrimaryLocation(accessToken, saved);

  const postUrl = `https://mybusiness.googleapis.com/v4/${accountName}/${location.name}/localPosts`;
  const payload = {
    languageCode: "en-US",
    summary,
    topicType: "STANDARD",
    callToAction: {
      actionType: "LEARN_MORE",
      url: actionUrl || PDM_CANONICAL_GBP_PROFILE.auditUri,
    },
  };

  const res = await fetch(postUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(explainQuotaOrApiError(res.status, txt));
  }

  const created = await res.json();
  console.log("✅ Published live Google Business Profile update:", created.searchUrl || created.name);
}

async function main() {
  const cmd = process.argv[2] || "audit";
  const args = process.argv.slice(3);

  if (cmd === "auth") {
    await runOAuthFlow();
    return;
  }
  if (cmd === "audit" || cmd === "status") {
    await runAudit();
    return;
  }
  if (cmd === "push") {
    const apply = args.includes("--apply");
    await runPush(apply);
    return;
  }
  if (cmd === "post") {
    const summaryIdx = args.indexOf("--summary");
    const urlIdx = args.indexOf("--url");
    const summary = summaryIdx >= 0 ? args[summaryIdx + 1] : "";
    const url = urlIdx >= 0 ? args[urlIdx + 1] : PDM_CANONICAL_GBP_PROFILE.auditUri;
    if (!summary) {
      throw new Error('Usage: npm run gbp:post -- --summary "Your Google update text" [--url https://...]');
    }
    await runPost(summary, url);
    return;
  }

  console.log("Available commands: auth | audit | push [--apply] | post --summary \"...\"");
}

main().catch((err) => {
  console.error("\n❌", err?.message || err);
  process.exit(1);
});
