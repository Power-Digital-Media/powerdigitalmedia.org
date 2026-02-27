const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        }
    });

    page.on('pageerror', err => {
        console.log('PAGE ERROR:', err.message);
    });

    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'load' });

    // Wait a couple of seconds to ensure hydration completes
    await new Promise(r => setTimeout(r, 2000));

    await browser.close();
    console.log('Done.');
})();
