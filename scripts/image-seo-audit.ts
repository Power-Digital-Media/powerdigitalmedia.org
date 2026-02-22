import fs from 'fs';
import path from 'path';

function processDirectory(dirPath: string) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let hasChanges = false;

    // Improved regex to safely inject attributes before the closing tag without duplicating or breaking syntax.
    content = content.replace(/<(Image|img)([^>]+)>/g, (match, tag, attrs) => {
        let newAttrs = attrs;
        let modified = false;

        // Skip if it looks like a severely malformed tag already to be safe
        if (newAttrs.includes('aria-description="An official') || newAttrs.includes('data-caption="Power')) {
            return match;
        }

        // Cleanup any stray formatting
        if (!newAttrs.includes('alt=')) {
            newAttrs += ` alt="Power Digital Media"`;
            modified = true;
        }

        if (!newAttrs.includes('title=')) {
            newAttrs += ` title="Power Digital Media Asset"`;
            modified = true;
        }

        if (!newAttrs.includes('aria-description=')) {
            newAttrs += ` aria-description="An official Power Digital Media structured image asset."`;
            modified = true;
        }

        if (!newAttrs.includes('data-caption=')) {
            newAttrs += ` data-caption="Power Digital Media Portfolio & Assets"`;
            modified = true;
        }

        if (modified) {
            hasChanges = true;
            // Ensure proper closing syntax if it's supposed to be self-closing
            // A <Image ... /> or <img ... />
            let closingChar = '>';
            if (newAttrs.trim().endsWith('/')) {
                // If it already ends with /, we just insert before the slash
                newAttrs = newAttrs.trim().slice(0, -1) + ' /';
            } else if (tag === 'Image' || tag === 'img') {
                newAttrs += ' /';
            }
            return `<${tag}${newAttrs}>`;
        }
        return match;
    });

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated images safely in ${filePath}`);
    }
}

const srcDir = path.join(__dirname, '../src');
processDirectory(srcDir);
console.log("Safe Image SEO pass completed.");
