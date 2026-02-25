import React from "react";

type BreadcrumbItem = {
    name: string;
    url: string; // absolute URL
};

export default function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    // Guard: Google expects at least 2 items for breadcrumbs to be useful
    if (!items || items.length < 2) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: it.name,
            item: it.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
