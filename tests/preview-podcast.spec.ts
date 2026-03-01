import { test, expect } from '@playwright/test';

test('Podcast Page Preview', async ({ page }) => {
    // Helper function to scroll to bottom and back up
    const scrollPage = async () => {
        for (let i = 0; i < 6; i++) {
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await page.waitForTimeout(500);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
    };

    // Desktop View
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/production');
    await page.waitForLoadState('networkidle');
    await scrollPage();
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47/production_desktop_preview.png', fullPage: true });

    // Mobile View
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/production');
    await page.waitForLoadState('networkidle');
    await scrollPage();
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47/production_mobile_preview.png', fullPage: true });
});
