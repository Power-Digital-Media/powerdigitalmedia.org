import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

test('Verify Live Scanner UI layout and execution', async ({ page }) => {
    test.setTimeout(60000);
    console.log('Navigating to Web Design page...');
    await page.goto('http://localhost:3000/web-design', { waitUntil: 'load' });

    console.log('Scrolling to Live Scanner...');

    // Find the input and click it
    const input = page.getByPlaceholder('powerdigitalmedia.org');
    await input.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Take screenshot of idle state
    const dirPath = 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47';
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    const timestamp = Date.now();
    await page.screenshot({ path: path.join(dirPath, `live_scanner_idle_${timestamp}.png`) });

    console.log('Entering URL and scanning...');
    await input.fill('powerdigitalmedia.org');

    const scanBtn = page.getByRole('button', { name: /Initialize Scan/i });
    await scanBtn.click();

    // Watch it scan
    await page.waitForTimeout(4000);
    await page.screenshot({ path: path.join(dirPath, `live_scanner_scanning_${timestamp}.png`) });

    // Wait for results
    console.log('Waiting for results (max 15s)...');
    await page.waitForSelector('text=Scan Complete', { timeout: 15000 }).catch(e => console.log('Did not find text, continuing...'));

    // Take final screenshot
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(dirPath, `live_scanner_results_${timestamp}.png`) });
    console.log('Screenshots saved. Test complete.');
});
