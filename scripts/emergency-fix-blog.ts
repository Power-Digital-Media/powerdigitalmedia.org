
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/blogPosts.ts');
const backupPath = path.join(process.cwd(), 'src/data/blogPosts.ts.bak');

function fixIndentation() {
    console.log(`Reading ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Regex to find content blocks: content: `...`
    // We capture the opening `content: \``, the body, and the closing backtick.
    // We do NOT require a comma immediately after, to handle newlines/whitespace.
    const regex = /(content:\s*`)([\s\S]*?)(`)/g;

    let matchCount = 0;
    const fixedContent = content.replace(regex, (match, prefix, body, suffix) => {
        matchCount++;
        // Fix the body
        const lines = body.split('\n');
        const fixedLines = lines.map(line => {
            // Preserve code block fences but strip indentation
            if (line.trim().startsWith('```')) {
                return line.trim();
            }
            // Preserve empty lines
            if (line.trim().length === 0) return '';

            // Strip all leading whitespace for normal lines to preventing MD code block rendering
            return line.trimStart();
        });

        return prefix + fixedLines.join('\n') + suffix;
    });

    if (matchCount === 0) {
        console.error("ERROR: No content blocks matched! Regex might be wrong.");
    } else if (fixedContent === content) {
        console.log(`Matched ${matchCount} blocks, but no changes were needed (already fixed?).`);
    } else {
        fs.writeFileSync(filePath, fixedContent);
        console.log(`Success! Updated ${matchCount} blog posts.`);
    }
}

fixIndentation();
