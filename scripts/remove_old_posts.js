const fs = require('fs');

const filePath = 'e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const slugsToRemove = [
    'audio-engineering-series-elite-podcasting-gear',
    'vram-bottleneck-rtx-5090-mandatory',
    'tactile-control-workflow-accelerators'
];

for (const slug of slugsToRemove) {
    // This regex looks for the { starting the object with the slug, and matches everything up to the next { slug: or the end of the array ];
    // A simpler way: we'll match the entire object block by finding { slug: "..." ... }
    const regex = new RegExp(`\\{\\s*slug:\\s*"${slug}"[\\s\\S]*?\\}\\s*(?=(,|\\n\\];))`);
    content = content.replace(regex, '');
    // Clean up trailing commas
    content = content.replace(/,\s*,/g, ',');
    content = content.replace(/,\s*\];/g, '\n];');
    console.log("Removed:", slug);
}

fs.writeFileSync(filePath, content);
