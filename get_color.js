const fs = require('fs');
const sharp = require('sharp');

async function getColor() {
    const imagePath = 'public/portfolio/Corner_Market_Pharmacy_mobile.webp';
    if (!fs.existsSync(imagePath)) {
        console.log('Image not found');
        return;
    }

    const { data, info } = await sharp(imagePath)
        .raw()
        .toBuffer({ resolveWithObject: true });

    let greens = [];

    for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Find bright, dominant greens
        if (g > r + 30 && g > b + 30 && g > 130) {
            greens.push(`${r},${g},${b}`);
        }
    }

    const counts = {};
    for (const c of greens) {
        counts[c] = (counts[c] || 0) + 1;
    }

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    console.log('Top Greens (R,G,B):');
    sorted.slice(0, 10).forEach(x => console.log(x[0]));
}

getColor();
