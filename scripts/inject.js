const fs = require('fs');
const path = require('path');

const mds = [
    { file: 'C:\\Users\\User\\.gemini\\antigravity\\brain\\7cc798f2-e575-4bf1-b54d-a3a4888dd46e\\post-1-audio.md', hero: 'audio_post_hero.png', og: 'audio_post_og.png', gear: ["shure-sm7b", "rode-caster-pro-2", "shure-mv7-plus", "rode-procaster"] },
    { file: 'C:\\Users\\User\\.gemini\\antigravity\\brain\\7cc798f2-e575-4bf1-b54d-a3a4888dd46e\\post-2-pc.md', hero: 'pc_post_hero.png', og: 'pc_post_og.png', gear: ["nvidia-rtx-5090", "amd-rx-9070-xt", "msi-rtx-4090", "corsair-dominator-titanium-2026"] },
    { file: 'C:\\Users\\User\\.gemini\\antigravity\\brain\\7cc798f2-e575-4bf1-b54d-a3a4888dd46e\\post-3-tactile.md', hero: 'tactile_post_hero.png', og: 'tactile_post_og.png', gear: ["elgato-stream-deck-plus", "focusrite-scarlett-2i2", "obsbot-tiny-2", "elgato-wave-3"] }
];

let blogPostsStr = fs.readFileSync('e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts', 'utf-8');

for (let item of mds) {
    const raw = fs.readFileSync(item.file, 'utf-8');

    // Frontmatter
    const fmMatch = raw.match(/---[\r\n]+([\s\S]*?)[\r\n]+---/);
    console.log(item.hero, fmMatch ? 'Found FM' : 'No FM');
    if (!fmMatch) continue;
    const fm = fmMatch[1];

    let fmData = {};
    fm.split('\n').forEach(line => {
        const i = line.indexOf(':');
        if (i !== -1) {
            const k = line.substring(0, i).trim();
            const v = line.substring(i + 1).trim().replace(/^"|"$/g, '');
            fmData[k] = v;
        }
    });

    // Content and SD
    let content = raw.substring(fmMatch[0].length).trim();
    let sdJson = {};
    const sdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (sdMatch) {
        sdJson = JSON.parse(sdMatch[1]);
        content = content.replace(sdMatch[0], '').trim();
    }

    // Build object string
    const objStr = `,\n    {
        slug: "${fmData.slug}",
        title: "${fmData.title}",
        excerpt: "${fmData.meta_description}",
        date: "${fmData.date}",
        category: "${fmData.category}",
        image: "/images/blog/${item.hero}",
        ogImage: "/images/blog/${item.og}",
        relatedGearIds: ${JSON.stringify(item.gear)},
        author: {
            name: "Power Digital Media",
            role: "Hardware Authority"
        },
        seoTitle: "${fmData.title} | Power Digital",
        metaDescription: "${fmData.meta_description}",
        keywords: ["${fmData.primary_topic}", "${fmData.secondary_entity_mention}", "Jackson MS"],
        structuredData: [${JSON.stringify(sdJson, null, 2)}],
        content: \\\`
${content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(/\r/g, '')}
        \\\`
    }`;

    // Inject before ];
    const insertTag = '];';
    const lastIdx = blogPostsStr.lastIndexOf(insertTag);
    if (lastIdx !== -1) {
        blogPostsStr = blogPostsStr.substring(0, lastIdx) + objStr + '\n' + blogPostsStr.substring(lastIdx);
    }
}

fs.writeFileSync('e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts', blogPostsStr);
console.log('Injected successfully');
