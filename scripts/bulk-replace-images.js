import fs from 'fs/promises';
import path from 'path';

async function replaceInDir(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await replaceInDir(fullPath);
        } else if (entry.isFile() && /\.(tsx|ts|jsx|js|css|json|md)$/i.test(entry.name)) {
            let content = await fs.readFile(fullPath, 'utf8');
            let updated = false;

            // Simple regex replacement for typical paths
            // Avoid changing external URLs if possible, but for our static images it's fine.
            // Also need to be careful with ogImage / images which might be full URLs
            const updatedContent = content.replace(/\.(png|jpg|jpeg)(["')?])/gi, '.webp$2');

            if (content !== updatedContent) {
                await fs.writeFile(fullPath, updatedContent, 'utf8');
                console.log(`Updated references in: ${fullPath}`);
            }
        }
    }
}

const srcDir = path.join(process.cwd(), 'src');
replaceInDir(srcDir).then(() => console.log('✅ Bulk replacement complete.'));
