import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
    console.error('❌ Error: STRIPE_SECRET_KEY is missing from .env.local');
    process.exit(1);
}

const stripe = new Stripe(secretKey, {
    apiVersion: '2023-10-16' as any,
});

const variableMapping: Record<string, string[]> = {
    'Podcast - Broadcaster Entry': ['NEXT_PUBLIC_STRIPE_PRICE_POD_BROADCASTER'],
    'Podcast - Growth Engine': ['NEXT_PUBLIC_STRIPE_PRICE_POD_GROWTH'],
    'Podcast - Syndication Suite': ['NEXT_PUBLIC_STRIPE_PRICE_POD_SYNDICATION'],
    'Identity Build': ['NEXT_PUBLIC_STRIPE_PRICE_WEB_IDENTITY'],
    'Design - Growth Build': ['NEXT_PUBLIC_STRIPE_PRICE_WEB_GROWTH'],
    'Design - Enterprise Build': ['NEXT_PUBLIC_STRIPE_PRICE_WEB_ENTERPRISE'],
    'Design - Build & Manage (Hosting/Updates)': ['NEXT_PUBLIC_STRIPE_PRICE_MANAGEMENT'],
    'Production - Field Acquisition': ['NEXT_PUBLIC_STRIPE_PRICE_PROD_FIELD'],
    'Production - Live Broadcast': ['NEXT_PUBLIC_STRIPE_PRICE_PROD_LIVE'],
    'Production - Production Protocol': ['NEXT_PUBLIC_STRIPE_PRICE_PROD_PROTOCOL'],
    'Production - Authority Package': ['NEXT_PUBLIC_STRIPE_PRICE_PROD_AUTHORITY'],
    'Growth - Micro-Growth (SEO/Thumbs)': ['NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_MICRO'],
    'Growth - Social Velocity': ['NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_VELOCITY'],
    'Growth - Tech Deployment': ['NEXT_PUBLIC_STRIPE_PRICE_TECH', 'NEXT_PUBLIC_STRIPE_PRICE_GROWTH_STRATEGY'],
    'Growth - Elite Audit': ['NEXT_PUBLIC_STRIPE_PRICE_AUDIT'],
    'Growth - Branding Protocol': ['NEXT_PUBLIC_STRIPE_PRICE_BRANDING'],
    'Lifecycle - Estate Installment': ['NEXT_PUBLIC_STRIPE_PRICE_INSTALLMENT_BESPOKE'],
    'Lifecycle - Estate Management': ['NEXT_PUBLIC_STRIPE_RECURRING_BESPOKE'],
};

async function syncAll() {
    console.log('🤖 Syncing FULL Stripe Catalog (Scanning for all 19 items)...\n');

    try {
        const prices = await stripe.prices.list({
            limit: 100,
            expand: ['data.product'],
            active: true
        });

        console.log('--- COPY AND PASTE INTO NETLIFY ---');

        const foundProducts = new Set();

        prices.data.forEach((price) => {
            const product = price.product as Stripe.Product;
            foundProducts.add(product.name);
            const envKeys = variableMapping[product.name];

            if (envKeys) {
                envKeys.forEach(key => console.log(`${key}=${price.id}`));
            } else {
                console.log(`⚠️ UNMAPPED_PRODUCT=${product.name} (ID: ${price.id})`);
            }
        });

        console.log('\n--- Status Check ---');
        console.log(`Total Products Identified: ${foundProducts.size}`);

        const missing = Object.keys(variableMapping).filter(p => !foundProducts.has(p));
        if (missing.length > 0) {
            console.log('❌ Missing from Stripe Account:');
            missing.forEach(p => console.log(`   - ${p}`));
        } else {
            console.log('✅ All 18 known products found and mapped.');
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

syncAll();
