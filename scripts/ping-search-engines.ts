import https from 'https';

const SITEMAP_URL = 'https://powerdigitalmedia.org/sitemap.xml';
const HOST = 'powerdigitalmedia.org';
const KEY = process.env.INDEXNOW_KEY || '4f29e2030638421b8c2576b251211756'; // Fallback or Env
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// List of URLs to submit (Dynamic in production, but we start with key pages)
// In a real scenario, you'd parse sitemap.xml to get new URLs.
// For now, we ping the home and blog root.
const URL_LIST = [
    `https://${HOST}/`,
    `https://${HOST}/blog`,
    `https://${HOST}/showroom`,
    `https://${HOST}/web-design`,
    `https://${HOST}/podcasting`,
    `https://${HOST}/production`
];

function pingGoogle() {
    console.log('🌐 Pinging Google...');
    https.get(`https://www.google.com/ping?sitemap=${SITEMAP_URL}`, (res) => {
        console.log(`✅ Google Response: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`❌ Google Ping Failed: ${e.message}`);
    });
}

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
pingGoogle();
pingIndexNow();
