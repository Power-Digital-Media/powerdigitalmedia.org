import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import dotenv from "dotenv";
import { PDM_CANONICAL_GBP_PROFILE } from "../src/data/gbp-profile";
import { PDM_GBP_AUTOPOST_ROTATION, type GbpAutoPostTemplate } from "../src/data/gbp-autoposts";

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
  if (fs.existsSync(LOCAL_TOKEN_FILE)) {
    return JSON.parse(fs.readFileSync(LOCAL_TOKEN_FILE, "utf8")) as StoredGbpOAuth;
  }

  const clientId = process.env.GOOGLE_GBP_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_GBP_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_GBP_REFRESH_TOKEN;
  if (clientId && clientSecret && refreshToken) {
    return {
      clientId,
      clientSecret,
      refreshToken,
      redirectUri: DEFAULT_REDIRECT_URI,
      accountName: process.env.GOOGLE_GBP_ACCOUNT_NAME,
      locationName: process.env.GOOGLE_GBP_LOCATION_NAME,
      updatedAt: new Date().toISOString(),
    };
  }

  throw new Error(
    "No authorized GBP OAuth token found (.gbp-oauth.local.json or GOOGLE_GBP_REFRESH_TOKEN env). Run `npm run gbp:auth` first."
  );
}

function saveAuth(payload: StoredGbpOAuth) {
  if (process.env.CI || process.env.GITHUB_ACTIONS) return;
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
    "openInfo",
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
  const liveBusinessType = location.serviceArea?.businessType || "(unset)";
  const hasPublicStorefront = Boolean(location.storefrontAddress);
  const livePrimaryCat = location.categories?.primaryCategory?.displayName || "(unset)";
  const liveAddCatList: string[] = (location.categories?.additionalCategories || []).map(
    (c: any) => String(c.displayName)
  );
  const targetAddCatList = PDM_CANONICAL_GBP_PROFILE.additionalCategories.map((c) => c.displayName);
  const addCatsAligned =
    liveAddCatList.length === targetAddCatList.length &&
    targetAddCatList.every((c) => liveAddCatList.includes(c));

  const livePlaceList: string[] = (location.serviceArea?.places?.placeInfos || []).map((p: any) =>
    String(p.placeName)
  );
  const liveHoursCount = (location.regularHours?.periods || []).length;
  const targetHoursCount = PDM_CANONICAL_GBP_PROFILE.regularHours.periods.length;

  const liveServiceNames: string[] = (location.serviceItems || [])
    .map((s: any) => s.freeFormServiceItem?.label?.displayName || s.structuredServiceItem?.serviceTypeId)
    .filter(Boolean);
  const targetServiceNames = PDM_CANONICAL_GBP_PROFILE.services.map((s) => s.displayName);
  const servicesAligned =
    liveServiceNames.length === targetServiceNames.length &&
    targetServiceNames.every((n) => liveServiceNames.includes(n));

  const liveDesc = location.profile?.description || "(unset)";
  const descExact = liveDesc.trim() === PDM_CANONICAL_GBP_PROFILE.description.trim();

  const normalizeOriginPath = (u: string) => {
    try {
      const parsed = new URL(u);
      return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
    } catch {
      return u.trim();
    }
  };
  const websiteDomainAligned =
    normalizeOriginPath(liveWebsite) === normalizeOriginPath(PDM_CANONICAL_GBP_PROFILE.websiteUri);
  const websiteHasUtm = liveWebsite.includes("utm_source=google");

  const checks: Array<{ label: string; ok: boolean; liveVal: string; targetVal: string; note?: string }> = [
    {
      label: "Verification & Maps Status",
      ok: Boolean(location.metadata?.hasVoiceOfMerchant) && location.openInfo?.status === "OPEN",
      liveVal: `Verified=${Boolean(location.metadata?.hasVoiceOfMerchant)} | Status=${location.openInfo?.status || "UNKNOWN"} | PlaceID=${location.metadata?.placeId || "n/a"}`,
      targetVal: "Verified=true | Status=OPEN",
    },
    {
      label: "Business Name",
      ok: liveTitle.trim() === PDM_CANONICAL_GBP_PROFILE.businessName,
      liveVal: liveTitle,
      targetVal: PDM_CANONICAL_GBP_PROFILE.businessName,
    },
    {
      label: "SAB Home-Address Privacy Lock",
      ok: liveBusinessType === PDM_CANONICAL_GBP_PROFILE.businessType && !hasPublicStorefront,
      liveVal: `${liveBusinessType} (storefrontAddress=${hasPublicStorefront ? "EXPOSED" : "HIDDEN"})`,
      targetVal: `${PDM_CANONICAL_GBP_PROFILE.businessType} (storefrontAddress=HIDDEN)`,
    },
    {
      label: "Primary Phone",
      ok: livePhone.trim() === PDM_CANONICAL_GBP_PROFILE.primaryPhone,
      liveVal: livePhone,
      targetVal: PDM_CANONICAL_GBP_PROFILE.primaryPhone,
    },
    {
      label: "Website URI",
      ok: websiteDomainAligned,
      liveVal: liveWebsite,
      targetVal: PDM_CANONICAL_GBP_PROFILE.websiteUri,
      note:
        websiteDomainAligned && !websiteHasUtm
          ? "Domain matches 100%; optional UTM attribution query string can be pushed anytime via `npm run gbp:push -- --apply`."
          : undefined,
    },
    {
      label: "Primary Category",
      ok: livePrimaryCat === PDM_CANONICAL_GBP_PROFILE.primaryCategory.displayName,
      liveVal: livePrimaryCat,
      targetVal: PDM_CANONICAL_GBP_PROFILE.primaryCategory.displayName,
    },
    {
      label: "Additional Categories (4)",
      ok: addCatsAligned,
      liveVal: liveAddCatList.join(", ") || "(none)",
      targetVal: targetAddCatList.join(", "),
    },
    {
      label: "Business Hours (Mon–Fri 9–5)",
      ok: liveHoursCount === targetHoursCount,
      liveVal: `${liveHoursCount} weekday periods configured`,
      targetVal: `${targetHoursCount} weekday periods configured`,
    },
    {
      label: "Tri-County Service Areas (11)",
      ok: livePlaceList.length === PDM_CANONICAL_GBP_PROFILE.serviceAreaPlaces.length,
      liveVal: `${livePlaceList.length} places (${livePlaceList.join(" · ")})`,
      targetVal: `${PDM_CANONICAL_GBP_PROFILE.serviceAreaPlaces.length} places`,
    },
    {
      label: "Custom Services & Descriptions (13)",
      ok: servicesAligned,
      liveVal: `${liveServiceNames.length}/${targetServiceNames.length} services matched`,
      targetVal: `${targetServiceNames.length}/${targetServiceNames.length} services matched`,
    },
    {
      label: "Profile Description (Exact Copy)",
      ok: descExact,
      liveVal: `${liveDesc === "(unset)" ? 0 : liveDesc.length} chars (exact match: ${descExact})`,
      targetVal: `${PDM_CANONICAL_GBP_PROFILE.description.length} chars`,
    },
  ];

  for (const c of checks) {
    console.log(`\n• ${c.label}: ${c.ok ? "✅ ALIGNED" : "⚠️  DRIFT DETECTED"}`);
    console.log(`    Live GBP : ${c.liveVal}`);
    console.log(`    Target   : ${c.targetVal}`);
    if (c.note) {
      console.log(`    Note     : ℹ️  ${c.note}`);
    }
  }

  console.log("\n• Live Maps & Review Links:");
  console.log(`    Maps URI       : ${location.metadata?.mapsUri || "n/a"}`);
  console.log(`    New Review URI : ${location.metadata?.newReviewUri || "n/a"}`);
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

async function fetchLivePosts(
  accessToken: string,
  accountName: string,
  locationName: string,
  pageSize = 20
): Promise<Array<Record<string, any>>> {
  const url = `https://mybusiness.googleapis.com/v4/${accountName}/${locationName}/localPosts?pageSize=${pageSize}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(explainQuotaOrApiError(res.status, txt));
  }
  const data = (await res.json()) as { localPosts?: Array<Record<string, any>> };
  return data.localPosts || [];
}

async function runListPosts() {
  const saved = loadSavedAuth();
  const accessToken = await getAccessToken(saved);
  const { accountName, location } = await resolvePrimaryLocation(accessToken, saved);
  const posts = await fetchLivePosts(accessToken, accountName, location.name, 20);

  console.log("\n================================================================================");
  console.log(`📣 LIVE GOOGLE BUSINESS PROFILE POSTS (${posts.length} returned)`);
  console.log("================================================================================");

  for (const p of posts) {
    const hasDollar = /\$[0-9]/.test(String(p.summary || ""));
    console.log(`\n• [${p.state}] ${p.createTime} ${hasDollar ? "⚠️ CONTAINS PUBLIC DOLLAR PRICE" : "✅"}`);
    console.log(`    Resource  : ${p.name}`);
    console.log(`    CTA       : ${p.callToAction ? `${p.callToAction.actionType} -> ${p.callToAction.url}` : "(none)"}`);
    console.log(`    Media     : ${(p.media || []).length} item(s)`);
    console.log(`    SearchURL : ${p.searchUrl || "n/a"}`);
    console.log(`    Summary   : ${String(p.summary || "").replace(/\s+/g, " ").slice(0, 180)}...`);
  }
}

async function runDeletePost(postResourceName: string) {
  const saved = loadSavedAuth();
  const accessToken = await getAccessToken(saved);
  const url = `https://mybusiness.googleapis.com/v4/${postResourceName}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(explainQuotaOrApiError(res.status, txt));
  }
  console.log(`🗑️  Deleted Google Business Profile post: ${postResourceName}`);
}

async function publishLocalPost(
  accessToken: string,
  accountName: string,
  locationName: string,
  options: {
    summary: string;
    actionType: "LEARN_MORE" | "BOOK";
    actionUrl: string;
    mediaUrl?: string;
  }
) {
  const postUrl = `https://mybusiness.googleapis.com/v4/${accountName}/${locationName}/localPosts`;
  const buildBody = (includeMedia: boolean) => ({
    languageCode: "en-US",
    summary: options.summary,
    topicType: "STANDARD",
    callToAction: {
      actionType: options.actionType,
      url: options.actionUrl || PDM_CANONICAL_GBP_PROFILE.auditUri,
    },
    ...(includeMedia && options.mediaUrl
      ? {
          media: [
            {
              mediaFormat: "PHOTO",
              sourceUrl: options.mediaUrl,
            },
          ],
        }
      : {}),
  });

  let res = await fetch(postUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildBody(Boolean(options.mediaUrl))),
  });

  // Graceful fallback if Google's media fetcher hasn't warmed a newly deployed CDN image URL yet
  if (!res.ok && options.mediaUrl) {
    const firstErr = await res.text();
    console.warn(`⚠️  GBP photo attachment skipped (${res.status}: ${firstErr.slice(0, 160)}); publishing text + CTA...`);
    res = await fetch(postUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildBody(false)),
    });
  }

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(explainQuotaOrApiError(res.status, txt));
  }

  return (await res.json()) as Record<string, any>;
}

async function runPost(summary: string, actionUrl: string, mediaUrl?: string) {
  const saved = loadSavedAuth();
  const accessToken = await getAccessToken(saved);
  const { accountName, location } = await resolvePrimaryLocation(accessToken, saved);

  const created = await publishLocalPost(accessToken, accountName, location.name, {
    summary,
    actionType: "LEARN_MORE",
    actionUrl,
    mediaUrl,
  });
  console.log("✅ Published live Google Business Profile update:", created.searchUrl || created.name);
}

function selectNextAutoPost(
  livePosts: Array<Record<string, any>>,
  targetId?: string
): GbpAutoPostTemplate {
  if (targetId) {
    const explicit = PDM_GBP_AUTOPOST_ROTATION.find((t) => t.id === targetId);
    if (!explicit) {
      throw new Error(
        `Unknown post --id "${targetId}". Available IDs: ${PDM_GBP_AUTOPOST_ROTATION.map((t) => t.id).join(", ")}`
      );
    }
    return explicit;
  }

  // Score each template by the index of its most recent appearance in livePosts (-1 = never posted / not in last 20)
  let oldestSeenIdx = -1;
  let fallbackCandidate = PDM_GBP_AUTOPOST_ROTATION[0];

  for (const tpl of PDM_GBP_AUTOPOST_ROTATION) {
    const needle = tpl.signaturePhrase.toLowerCase();
    const matchIdx = livePosts.findIndex((p) =>
      String(p.summary || "").toLowerCase().includes(needle)
    );
    if (matchIdx === -1) {
      return tpl; // Fresh unposted topic!
    }
    if (matchIdx > oldestSeenIdx) {
      oldestSeenIdx = matchIdx;
      fallbackCandidate = tpl;
    }
  }

  return fallbackCandidate;
}

async function runAutoPost(opts: { dryRun: boolean; force: boolean; targetId?: string }) {
  const saved = loadSavedAuth();
  const accessToken = await getAccessToken(saved);
  const { accountName, location } = await resolvePrimaryLocation(accessToken, saved);
  const livePosts = await fetchLivePosts(accessToken, accountName, location.name, 20);

  const cooldownHours = Number(process.env.GBP_AUTOPOST_COOLDOWN_HOURS || 60);
  if (livePosts.length > 0 && !opts.force && !opts.dryRun) {
    const newestTime = Date.parse(String(livePosts[0].createTime || ""));
    if (!Number.isNaN(newestTime)) {
      const hoursSinceLast = (Date.now() - newestTime) / (1000 * 60 * 60);
      if (hoursSinceLast < cooldownHours) {
        console.log(
          `\n⏳ Cooldown active: Most recent GBP post went live ${hoursSinceLast.toFixed(
            1
          )}h ago (< ${cooldownHours}h threshold).`
        );
        console.log("   Pass `-- --force` to publish immediately anyway.");
        return;
      }
    }
  }

  const nextPost = selectNextAutoPost(livePosts, opts.targetId);

  console.log("\n================================================================================");
  console.log(`🚀 GBP AUTOPOST ENGINE ${opts.dryRun ? "(DRY RUN)" : "(LIVE PUBLISH)"}`);
  console.log("================================================================================");
  console.log(`Selected Topic : ${nextPost.title} [${nextPost.id}]`);
  console.log(`CTA            : ${nextPost.actionType} -> ${nextPost.actionUrl}`);
  console.log(`Photo Asset    : ${nextPost.mediaUrl}`);
  console.log(`Summary (${nextPost.summary.length} chars):\n  ${nextPost.summary}\n`);

  if (opts.dryRun) {
    console.log("🧪 Dry run complete — nothing published. Omit `--dry-run` (or add `--force`) to publish live.");
    return;
  }

  const created = await publishLocalPost(accessToken, accountName, location.name, {
    summary: nextPost.summary,
    actionType: nextPost.actionType,
    actionUrl: nextPost.actionUrl,
    mediaUrl: nextPost.mediaUrl,
  });

  console.log("✅ Automated Google Business Profile post is LIVE!");
  console.log(`   Resource  : ${created.name}`);
  console.log(`   SearchURL : ${created.searchUrl || "n/a"}`);
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
  if (cmd === "posts") {
    await runListPosts();
    return;
  }
  if (cmd === "delete-post") {
    const nameIdx = args.indexOf("--name");
    const targetName = nameIdx >= 0 ? args[nameIdx + 1] : "";
    if (!targetName) {
      throw new Error("Usage: npm run gbp:delete-post -- --name accounts/.../locations/.../localPosts/...");
    }
    await runDeletePost(targetName);
    return;
  }
  if (cmd === "autopost") {
    const dryRun = args.includes("--dry-run");
    const force = args.includes("--force");
    const idIdx = args.indexOf("--id");
    const targetId = idIdx >= 0 ? args[idIdx + 1] : undefined;
    await runAutoPost({ dryRun, force, targetId });
    return;
  }
  if (cmd === "post") {
    const summaryIdx = args.indexOf("--summary");
    const urlIdx = args.indexOf("--url");
    const mediaIdx = args.indexOf("--media");
    const summary = summaryIdx >= 0 ? args[summaryIdx + 1] : "";
    const url = urlIdx >= 0 ? args[urlIdx + 1] : PDM_CANONICAL_GBP_PROFILE.auditUri;
    const mediaUrl = mediaIdx >= 0 ? args[mediaIdx + 1] : undefined;
    if (!summary) {
      throw new Error(
        'Usage: npm run gbp:post -- --summary "Your Google update text" [--url https://...] [--media https://...jpg]'
      );
    }
    await runPost(summary, url, mediaUrl);
    return;
  }

  console.log(
    'Available commands: auth | audit | push [--apply] | posts | autopost [--dry-run] [--force] [--id <slug>] | post --summary "..." | delete-post --name <id>'
  );
}

main().catch((err) => {
  console.error("\n❌", err?.message || err);
  process.exit(1);
});
