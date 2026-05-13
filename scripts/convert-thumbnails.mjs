/**
 * Convert podcast thumbnail SVGs → optimized WebP
 * SVGs contain embedded raster data, so sharp can handle them.
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename } from 'path';

const SRC = 'public/images/Thumbnail Cards SVG';
const DEST = 'public/images/thumbnails';

await mkdir(DEST, { recursive: true });

const files = (await readdir(SRC)).filter(f => f.endsWith('.svg'));

for (const file of files) {
    const slug = basename(file, ' Thumbnail.svg')
        .toLowerCase()
        .replace(/\s+/g, '-');
    const outPath = join(DEST, `${slug}.webp`);
    try {
        await sharp(join(SRC, file), { density: 150 })
            .resize(580, 326, { fit: 'cover' })
            .webp({ quality: 85 })
            .toFile(outPath);
        const { size } = await sharp(outPath).metadata().then(() =>
            import('fs/promises').then(fs => fs.stat(outPath))
        );
        console.log(`✓ ${slug}.webp  (${(size / 1024).toFixed(0)} KB)`);
    } catch (err) {
        console.error(`✗ ${file}: ${err.message}`);
    }
}
console.log('\nDone.');
