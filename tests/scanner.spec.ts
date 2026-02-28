import { test, expect } from '@playwright/test';

test('LiveScanner Responsive Height', async ({ page }) => {
    // Navigate to web design page in mobile emulation
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/web-design');
    await page.waitForLoadState('networkidle');

    // Scroll smoothly down a few times towards bottom scanner 
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);

    // Idle 
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47/live_scanner_idle_fixed_sticky2.png', fullPage: false });

    // Try starting scan to see height 
    await page.fill('input[placeholder="powerdigitalmedia.org"]', 'powerdigitalmedia.org');
    await page.click('button:has-text("Initialize Scan")');
    await page.waitForTimeout(1000);
    // Scanning state
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47/live_scanner_scanning_fixed.png', fullPage: false });

    // Wait for results
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47/live_scanner_results_fixed.png', fullPage: false });
});
