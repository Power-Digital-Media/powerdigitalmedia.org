module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/amazon/paapi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAmazonProduct",
    ()=>fetchAmazonProduct
]);
// In-memory token cache
let tokenCache = null;
async function getAccessToken(clientId, clientSecret) {
    // Check cache first
    if (tokenCache && Date.now() < tokenCache.expiresAt) {
        return tokenCache.token;
    }
    const tokenUrl = 'https://api.amazon.com/auth/o2/token';
    const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'advertising::campaign_management' // Standard scope for Creators/Advertising
    });
    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: params
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Creators API Token Error:', errorText);
            throw new Error(`Token exchange failed: ${response.status}`);
        }
        const data = await response.json();
        const expiresIn = data.expires_in || 3600;
        // Cache token (subtract 60s for safety)
        tokenCache = {
            token: data.access_token,
            expiresAt: Date.now() + expiresIn * 1000 - 60000
        };
        return data.access_token;
    } catch (error) {
        console.error('Auth Error:', error);
        throw error;
    }
}
async function fetchAmazonProduct(asin) {
    const config = {
        clientId: '333hmld7a435j7h666an5hcvao',
        clientSecret: '1l22915mokvel7fk5hj8v6s6fnbl5d4roj8vrjckk7b6gt1dpap9',
        partnerTag: 'powerdigital1-20'
    };
    try {
        // 1. Get OAuth Token
        const accessToken = await getAccessToken(config.clientId, config.clientSecret);
        // 2. Fetch Product Data
        // Note: Using the v2/GetItems endpoint for Creators
        const endpoint = 'https://api.amazon.com/product-advertising-api/v1/getitems';
        const payload = {
            ItemIds: [
                asin
            ],
            Resources: [
                'Offers.Listings.Price',
                'Images.Primary.Large',
                'ItemInfo.Title',
                'ItemInfo.ProductInfo',
                'ItemInfo.ExternalIds'
            ],
            PartnerTag: config.partnerTag,
            PartnerType: 'Associates',
            Marketplace: 'www.amazon.com'
        };
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Host': 'api.amazon.com'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            console.warn(`Creators API Fetch Failed [${response.status}]:`, await response.text());
            return null;
        }
        const data = await response.json();
        if (data.ItemsResult?.Items?.length > 0) {
            const item = data.ItemsResult.Items[0];
            return {
                asin: item.ASIN,
                title: item.ItemInfo?.Title?.DisplayValue,
                price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'N/A',
                image: item.Images?.Primary?.Large?.URL,
                liveLink: item.DetailPageURL
            };
        }
        return null;
    } catch (error) {
        console.error('Creators API Error:', error);
        return null;
    }
}
}),
"[project]/src/app/api/amazon/product/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$amazon$2f$paapi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/amazon/paapi.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const asin = searchParams.get('asin');
    if (!asin) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'ASIN is required'
        }, {
            status: 400
        });
    }
    try {
        const product = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$amazon$2f$paapi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAmazonProduct"])(asin);
        if (!product || !product.ItemsResult) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(product);
    } catch (error) {
        console.error('API Route Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Internal Server Error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__46019a78._.js.map