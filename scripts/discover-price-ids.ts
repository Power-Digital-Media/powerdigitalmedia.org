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

async function discoverPrices() {
    console.log('🔍 Discovering Stripe Price IDs for your Product Catalog...\n');

    try {
        // Fetch all prices and include product details
        const prices = await stripe.prices.list({
            limit: 100,
            expand: ['data.product'],
            active: true
        });

        if (prices.data.length === 0) {
            console.log('⚠️ No active prices found in your Stripe account.');
            return;
        }

        console.log('--- Price ID Mapping (Use these in your Netlify Environment) ---\n');

        const mapping: Record<string, string> = {};

        prices.data.forEach((price) => {
            const product = price.product as Stripe.Product;
            const productName = product.name;
            const priceId = price.id;
            const amount = price.unit_amount ? (price.unit_amount / 100).toFixed(2) : '0.00';
            const currency = price.currency.toUpperCase();
            const interval = price.type === 'recurring' ? `(${price.recurring?.interval})` : '(one-time)';

            console.log(`📦 Product: ${productName}`);
            console.log(`   Price ID: ${priceId}`);
            console.log(`   Amount: ${amount} ${currency} ${interval}`);
            console.log('----------------------------------------------------');
        });

        console.log('\n✅ Task: Match the Price IDs above to the keys in your walkthrough report.');
    } catch (error: any) {
        console.error('❌ Failed to fetch data from Stripe:', error.message);
    }
}

discoverPrices();
