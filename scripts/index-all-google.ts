import { google } from 'googleapis';
import { blogPosts } from '../src/data/blogPosts';
import { projects } from '../src/data/projects';
import { CENTRAL_MS_LOCATIONS } from '../src/data/locations';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const HOST = 'powerdigitalmedia.org';
const serviceAccountKeyString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKeyString) {
    console.error('❌ GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    process.exit(1);
}

const credentials = JSON.parse(serviceAccountKeyString);

const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
});

const indexing = google.indexing({
    version: 'v3',
    auth: auth,
});

const STATIC_URLS = [
    `https://${HOST}/`,
    `https://${HOST}/estimate`,
    `https://${HOST}/contractors`,
    `https://${HOST}/pindrop`,
    `https://${HOST}/pincam`,
    `https://${HOST}/site-intelligence`,
    `https://${HOST}/web-design`,
    `https://${HOST}/local-seo`,
    `https://${HOST}/custom-applications`,
    `https://${HOST}/marketing`,
    `https://${HOST}/our-work`,
    `https://${HOST}/reviews`,
    `https://${HOST}/about`,
    `https://${HOST}/free-audit`,
    `https://${HOST}/book`,
    `https://${HOST}/contact`,
    `https://${HOST}/blog`,
    `https://${HOST}/site-manager`,
    `https://${HOST}/lead-leak-check`,
    `https://${HOST}/business-solutions`,
    `https://${HOST}/founders100`,
    `https://${HOST}/community`,
    `https://${HOST}/privacy`,
    `https://${HOST}/terms`,
    `https://${HOST}/refund-policy`,
];

const LOCATION_URLS = CENTRAL_MS_LOCATIONS.map(
    (loc) => `https://${HOST}/locations/${loc.slug}`
);
const PORTFOLIO_URLS = projects.map(
    (project) => `https://${HOST}/portfolio/${project.id}`
);
const BLOG_URLS = blogPosts.map((post) => `https://${HOST}/blog/${post.slug}`);

const URL_LIST = [
    ...STATIC_URLS,
    ...LOCATION_URLS,
    ...PORTFOLIO_URLS,
    ...BLOG_URLS,
];

async function run() {
    console.log(
        `🚀 Starting Force-Index All Sequence. Found ${URL_LIST.length} total URLs to submit...`
    );

    for (let i = 0; i < URL_LIST.length; i++) {
        const url = URL_LIST[i];
        console.log(
            `[${i + 1}/${URL_LIST.length}] Pinging Google Indexing API for: ${url}`
        );
        try {
            const response = await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED',
                },
            });
            console.log(`   ✅ Success! Status: ${response.status}`);
        } catch (err: any) {
            console.error(`   ❌ Failed:`, err.message);
        }

        // 100ms throttle to prevent hitting request rate limits
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log('🎉 Force-Index All Sequence completed successfully!');
}

run();
