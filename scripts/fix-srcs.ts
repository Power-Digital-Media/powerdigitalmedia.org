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

    // Fix src="images..." -> src="/images..."
    const brokenSrcRegex = /src="([^"\/]+)"/g;

    // We only want to prepend / if it's a structural asset (images, blog-images, hero-bg)
    // and not a http absolute URL, next/image base64, etc.
    content = content.replace(brokenSrcRegex, (match, srcValue) => {
        if (
            srcValue.startsWith('images') ||
            srcValue.startsWith('blog-') ||
            srcValue.startsWith('hero-') ||
            srcValue.startsWith('power-logo') ||
            srcValue.startsWith('projects') ||
            srcValue.startsWith('features')
        ) {
            hasChanges = true;
            return `src="/${srcValue.replace(/_/g, '/')}"`; // Also replacing _ if they got mangled? No, _ weren't touched.
        }
        return match;
    });

    // We also need to fix missing slashes within the path, e.g. "imagescaptures..." -> "/images/captures..."
    // Let's just do targeted replaces for known bad paths first.
    // The previous script removed ALL slashes. So "/images/studio-session.png" -> "imagesstudio-session.png". This is bad.

    // Let's rely on git to revert the bad changes instead!
    // Much safer to `git checkout -- .` and rethink the regex, or just apply the SEO pass properly using AST or a better regex.
}

