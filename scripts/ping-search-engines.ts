import https from 'https';
import { GEAR_COLLECTION } from '../src/data/gear';

const SITEMAP_URL = 'https://powerdigitalmedia.org/sitemap.xml';
const HOST = 'powerdigitalmedia.org';
const KEY = process.env.INDEXNOW_KEY || '4f29e2030638421b8c2576b251211756'; // Fallback or Env
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// List of URLs to submit
// We combine static core pages with dynamic showroom items
const STATIC_URLS = [
    `https://${HOST}/`,
    `https://${HOST}/blog`,
    `https://${HOST}/showroom`,
    `https://${HOST}/web-design`,
    `https://${HOST}/podcasting`,
    `https://${HOST}/production`
];

const DYNAMIC_URLS = GEAR_COLLECTION.map(item => `https://${HOST}/showroom/${item.category.toLowerCase()}/${item.id}`);

const URL_LIST = [...STATIC_URLS, ...DYNAMIC_URLS];



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
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`✅ IndexNow Response: ${res.statusCode}`);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error(`❌ IndexNow Ping Failed: ${error.message}`);
    });

    req.write(data);
    req.end();
}

// Execute
console.log('🚀 Starting SEO Ping Sequence...');
// Google Sitemap Ping is deprecated (404). We rely on GSC and robots.txt now.
pingIndexNow();
