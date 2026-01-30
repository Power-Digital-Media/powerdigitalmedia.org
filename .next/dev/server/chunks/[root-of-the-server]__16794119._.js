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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/amazon/paapi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAmazonProduct",
    ()=>fetchAmazonProduct
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
async function fetchAmazonProduct(asin) {
    const config = {
        accessKey: process.env.AMAZON_API_KEY || '',
        secretKey: process.env.AMAZON_API_SECRET || '',
        associateTag: ("TURBOPACK compile-time value", "powerdigital1-20") || '',
        region: 'us-east-1',
        host: 'webservices.amazon.com'
    };
    if (!config.accessKey || !config.secretKey) {
        throw new Error('Amazon API credentials missing');
    }
    console.log(`PA-API Sync: Key[${config.accessKey.substring(0, 4)}...] Len[${config.accessKey.length}] Secret[${config.secretKey.substring(0, 4)}...] Len[${config.secretKey.length}]`);
    const payload = JSON.stringify({
        ItemIds: [
            asin
        ],
        ItemIdType: 'ASIN',
        Resources: [
            'Images.Primary.Large',
            'ItemInfo.Title',
            'Offers.Listings.Price'
        ],
        PartnerTag: config.associateTag,
        PartnerType: 'Associates',
        Marketplace: 'www.amazon.com'
    });
    const datetime = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
    const date = datetime.substr(0, 8);
    const method = 'POST';
    const uri = '/paapi5/get-items';
    const target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';
    const contentType = 'application/json; charset=utf-8';
    // 1. Canonical Request
    const hashedPayload = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(payload).digest('hex');
    const canonicalHeaders = `host:${config.host}\nx-amz-date:${datetime}\nx-amz-target:${target}\n`;
    const signedHeaders = 'host;x-amz-date;x-amz-target';
    const canonicalRequest = `${method}\n${uri}\n\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;
    // 2. String to Sign
    const credentialScope = `${date}/${config.region}/ProductAdvertisingAPI/aws4_request`;
    const hashedCanonicalRequest = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(canonicalRequest).digest('hex');
    const stringToSign = `AWS4-HMAC-SHA256\n${datetime}\n${credentialScope}\n${hashedCanonicalRequest}`;
    // 3. Signing Key
    const kDate = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', `AWS4${config.secretKey}`).update(date).digest();
    const kRegion = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', kDate).update(config.region).digest();
    const kService = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', kRegion).update('ProductAdvertisingAPI').digest();
    const kSigning = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', kService).update('aws4_request').digest();
    // 4. Signature
    const signature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', kSigning).update(stringToSign).digest('hex');
    const authorizationHeader = `AWS4-HMAC-SHA256 Credential=${config.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    const response = await fetch(`https://${config.host}${uri}`, {
        method,
        headers: {
            'Content-Type': contentType,
            'Content-Encoding': 'amz-1.0',
            'X-Amz-Date': datetime,
            'X-Amz-Target': target,
            'Authorization': authorizationHeader,
            'Host': config.host
        },
        body: payload
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Amazon API Error Response:', errorText);
        throw new Error(`Amazon API returned ${response.status}`);
    }
    const json = await response.json();
    console.log('Amazon API Success Response:', JSON.stringify(json, null, 2));
    return json;
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
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$amazon$2f$paapi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAmazonProduct"])(asin);
        // Extract relevant info from PA-API response
        const item = data.ItemsResult?.Items?.[0];
        if (!item) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        const price = item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'N/A';
        const title = item.ItemInfo?.Title?.DisplayValue || '';
        const isAvailable = !!item.Offers?.Listings?.[0]?.Price;
        const liveLink = item.DetailPageURL || '';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            asin,
            price,
            title,
            isAvailable,
            liveLink
        });
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

//# sourceMappingURL=%5Broot-of-the-server%5D__16794119._.js.map