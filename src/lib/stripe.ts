import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
        throw new Error("❌ CRITICAL: STRIPE_SECRET_KEY is missing in production environment.");
    }
}

export const stripe = new Stripe(secretKey || "sk_test_placeholder", {
    apiVersion: '2023-10-16' as any, // Stable API version
    typescript: true,
});
