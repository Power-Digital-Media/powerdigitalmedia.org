import fs from 'fs';
import { google } from 'googleapis';
import { GEAR_COLLECTION } from '../src/data/gear';
import { blogPosts } from '../src/data/blogPosts';

const HOST = 'powerdigitalmedia.org';
const credentialsPath = 'C:/Users/User/Downloads/power-digital-media-indexing-f25dae9fad9c.json';

if (!fs.existsSync(credentialsPath)) {
    console.error('❌ Credentials file not found at:', credentialsPath);
    process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing({
    version: 'v3',
    auth: auth
});

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

async function run() {
    console.log(`🚀 Starting Force-Index All Sequence. Found ${URL_LIST.length} total URLs to submit...`);
    
    for (let i = 0; i < URL_LIST.length; i++) {
        const url = URL_LIST[i];
        console.log(`[${i + 1}/${URL_LIST.length}] Pinging Google Indexing API for: ${url}`);
        try {
            const response = await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED'
                }
            });
            console.log(`   ✅ Success! Status: ${response.status}`);
        } catch (err: any) {
            console.error(`   ❌ Failed:`, err.message);
        }
        
        // 100ms throttle to prevent hitting request rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('🎉 Force-Index All Sequence completed successfully!');
}

run();
