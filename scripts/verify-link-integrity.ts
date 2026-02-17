
import { blogPosts } from '../src/data/blogPosts';
import { GEAR_COLLECTION } from '../src/data/gear';

function verifyLinks() {
    console.log(`Verifying links for ${blogPosts.length} blog posts...`);
    let errors = 0;

    blogPosts.forEach(post => {
        // Check related gear
        if (post.relatedGearIds) {
            post.relatedGearIds.forEach(id => {
                const item = GEAR_COLLECTION.find(g => g.id === id);
                if (!item) {
                    console.error(`ERROR: Blog "${post.title}" references missing Gear ID: ${id}`);
                    errors++;
                }
            });
        }

        // Check for absolute internal URLs
        const absoluteUrlPatterns = [
            /https?:\/\/(www\.)?powerdigitalmedia\.com/g,
            /https?:\/\/(www\.)?powerdigitalshowroom\.com/g,
            /https?:\/\/(www\.)?powerdigitalmedia\.org/g
        ];

        absoluteUrlPatterns.forEach(pattern => {
            if (pattern.test(post.content)) {
                console.error(`ERROR: Blog "${post.title}" contains absolute internal URLs matching ${pattern}. Use relative paths instead.`);
                errors++;
            }
        });
    });

    if (errors === 0) {
        console.log("All validation checks passed: No broken gear links or incorrect absolute URLs found.");
    } else {
        console.error(`Found ${errors} issues.`);
        process.exit(1);
    }
}

verifyLinks();
