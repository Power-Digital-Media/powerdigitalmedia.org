/**
 * Batch PNG → WebP Converter
 * Uses sharp to convert all PNG files in public/ to WebP at quality 80.
 * Deletes originals after successful conversion.
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public');

async function findPngs(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findPngs(fullPath));
    } else if (extname(entry.name).toLowerCase() === '.png') {
      results.push(fullPath);
    }
  }
  return results;
}

async function convert() {
  const pngs = await findPngs(PUBLIC_DIR);
  console.log(`Found ${pngs.length} PNG files to convert.\n`);

  let converted = 0;
  let totalSaved = 0;

  for (const pngPath of pngs) {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    const originalStat = await stat(pngPath);
    const originalSize = originalStat.size;

    try {
      await sharp(pngPath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      const newStat = await stat(webpPath);
      const newSize = newStat.size;
      const saved = originalSize - newSize;
      const pct = ((saved / originalSize) * 100).toFixed(1);
      totalSaved += saved;

      console.log(`✅ ${basename(pngPath)} → ${basename(webpPath)}  |  ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB  (${pct}% smaller)`);

      // Delete the original PNG
      await unlink(pngPath);
      converted++;
    } catch (err) {
      console.error(`❌ FAILED: ${basename(pngPath)} — ${err.message}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Converted: ${converted}/${pngs.length} files`);
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log(`========================================`);
}

convert().catch(console.error);
