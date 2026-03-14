import Script from "next/script";

interface ImageObjectSchemaProps {
    url: string;
    caption: string;
    author?: string;
    datePublished?: string;
}

export default function ImageObjectSchema({ url, caption, author = "Power Digital Media", datePublished }: ImageObjectSchemaProps) {
    const baseUrl = "https://powerdigitalmedia.org";
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

    const schema = {
        "@context": "https://schema.org/",
        "@type": "ImageObject",
        "url": fullUrl,
        "contentUrl": fullUrl,
        "caption": caption,
        "author": {
            "@type": "Organization",
            "name": author
        },
        "datePublished": datePublished || new Date().toISOString().split('T')[0]
    };

    return (
        <Script
            id={`image-schema-${url.replace(/[^a-zA-Z0-9]/g, '')}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
