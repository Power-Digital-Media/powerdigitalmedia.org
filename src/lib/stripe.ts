import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === "production") {
    console.warn("⚠️ Warning: STRIPE_SECRET_KEY is missing. Stripe features will fail at runtime.");
}

export const stripe = new Stripe(secretKey, {
    apiVersion: '2026-01-28.clover', // Latest stable API version
    typescript: true,
});
