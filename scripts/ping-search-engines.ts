import https from 'https';
import { google } from 'googleapis';
import { GEAR_COLLECTION } from '../src/data/gear';
import { blogPosts } from '../src/data/blogPosts';

const HOST = 'powerdigitalmedia.org';
const KEY = process.env.INDEXNOW_KEY || '4f29e2030638421b8c2576b251211756';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// IndexNow URLs (Sitemap full scan)
const STATIC_URLS = [
    `https://${HOST}/`,
    `https://${HOST}/blog`,
    `https://${HOST}/showroom`,
    `https://${HOST}/web-design`,
    `https://${HOST}/custom-applications`,
    `https://${HOST}/marketing`,
    `https://${HOST}/community`
];

const DYNAMIC_URLS = GEAR_COLLECTION.map(item => `https://${HOST}/showroom/${item.category.toLowerCase()}/${item.id}`);
const BLOG_URLS = blogPosts.map(post => `https://${HOST}/blog/${post.slug}`);
const URL_LIST = [...STATIC_URLS, ...DYNAMIC_URLS, ...BLOG_URLS];

// 1. Bing / Yahoo IndexNow Ping
function pingIndexNow() {
    console.log('🌐 Pinging IndexNow (Bing/Yandex)...');

    const data = JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: URL_LIST
    });

    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = https.request(options, (res) => {
        console.log(`✅ IndexNow Response Status: ${res.statusCode}`);
        let responseData = '';
        res.on('data', (d) => {
            responseData += d;
        });
        res.on('end', () => {
            console.log('IndexNow Response:', responseData);
        });
    });

    req.on('error', (error) => {
        console.error(`❌ IndexNow Ping Failed: ${error.message}`);
    });

    req.write(data);
    req.end();
}

// 2. Google Indexing API Ping (Forces crawl on core and new pages)
async function pingGoogleIndexing() {
    console.log('🌐 Pinging Google Indexing API...');
    const serviceAccountKeyString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKeyString) {
        console.log('⚠️ GOOGLE_SERVICE_ACCOUNT_KEY env var is not set. Skipping Google Indexing API pings.');
        return;
    }

    try {
        const credentials = JSON.parse(serviceAccountKeyString);
        const auth = new google.auth.JWT({
            email: credentials.client_email,
            key: credentials.private_key,
            scopes: ['https://www.googleapis.com/auth/indexing']
        });

        const indexing = google.indexing({
            version: 'v3',
            auth: auth
        });

        // Filter blog posts published in the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentBlogUrls = blogPosts
            .filter(post => new Date(post.date) >= oneWeekAgo)
            .map(post => `https://${HOST}/blog/${post.slug}`);

        const googleUrlsToPing = [
            `https://${HOST}/`,
            `https://${HOST}/community`,
            `https://${HOST}/web-design`,
            `https://${HOST}/custom-applications`,
            `https://${HOST}/marketing`,
            ...recentBlogUrls
        ];

        console.log(`📋 Found ${googleUrlsToPing.length} URLs to submit to Google Indexing API:`);
        for (const url of googleUrlsToPing) {
            console.log(`   - ${url}`);
        }

        for (const url of googleUrlsToPing) {
            try {
                const response = await indexing.urlNotifications.publish({
                    requestBody: {
                        url: url,
                        type: 'URL_UPDATED'
                    }
                });
                console.log(`   ✅ Google Indexing API Success: ${url} (Status: ${response.status})`);
            } catch (err: any) {
                console.error(`   ❌ Google Indexing API Failed for ${url}:`, err.message);
            }
        }
    } catch (err: any) {
        console.error('❌ Google Indexing API Authentication Failed:', err.message);
    }
}

// Execute Sequence
async function run() {
    console.log('🚀 Starting SEO Ping Sequence...');
    await pingGoogleIndexing();
    pingIndexNow();
}

run();
