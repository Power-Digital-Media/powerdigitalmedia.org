import React from 'react';
import type { GearItem } from '@/data/gear';

interface ProductSchemaProps {
    product: GearItem;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
    const baseUrl = 'https://powerdigitalmedia.org';
    const imageUrl = product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`;

    // Affiliate Logic
    const AFFILIATE_ID = 'powerdigital1-20';
    const affiliateLink = product.amazonLink?.trim()
        ? product.amazonLink.trim()
        : product.asin
            ? `https://www.amazon.com/dp/${product.asin.trim()}?tag=${AFFILIATE_ID}`
            : `https://www.amazon.com/s?k=${encodeURIComponent(product.name)}&tag=${AFFILIATE_ID}`;

    const productPageUrl = `${baseUrl}/showroom/${product.category.replace(/\s+/g, '-').toLowerCase()}/${product.id}`;

    const schema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        url: productPageUrl,
        image: [imageUrl],
        description: product.description,
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: product.brand,
        },
        ...(product.technicalSpecs?.length
            ? {
                additionalProperty: product.technicalSpecs.map((s) => ({
                    '@type': 'PropertyValue',
                    name: 'Key Spec',
                    value: s,
                })),
            }
            : {}),
        offers: {
            '@type': 'Offer',
            url: affiliateLink,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
