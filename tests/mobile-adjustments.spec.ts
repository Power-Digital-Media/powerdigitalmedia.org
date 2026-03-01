import { test, expect } from '@playwright/test';

test('Mobile layout adjustments in Web Design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/web-design');
    await page.waitForLoadState('networkidle');

    // Screenshot 1: Hero collision zone fix
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47/fixed_mobile_hero_spacing.png', fullPage: false });

    // Scroll smoothly down a few times 
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);

    // Screenshot 2: The expanded Architecture Component
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/ed245d3a-4456-4fa0-b780-e943e4ff2d47/fixed_mobile_slider_bounds.png', fullPage: false });

});
