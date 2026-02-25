import React from 'react';
import type { GearItem } from '@/data/gear';

interface CollectionSchemaProps {
    items: GearItem[];
    name?: string;
    description?: string;
}

export default function CollectionSchema({ items, name = "The Elite Showroom", description = "Curated hardware for professionals who demand technical excellence." }: CollectionSchemaProps) {
    const baseUrl = 'https://powerdigitalmedia.org';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: name,
        description: description,
        url: `${baseUrl}/showroom`,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: item.name,
                url: `${baseUrl}/showroom/${item.category.replace(/\\s+/g, '-').toLowerCase()}/${item.id}`,
                image: item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`,
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
