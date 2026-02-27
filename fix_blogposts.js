const fs = require('fs');
const FILE_PATH = "e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts";
let content = fs.readFileSync(FILE_PATH, 'utf8');

// 1. We need to extract the new post we mistakenly inserted at line 15.
// We know it starts right after `relatedGearIds?: string[`
// and ends right before `];\n    // SEO Enhancement Fields` (or similar).

const badStartStr = "    relatedGearIds?: string[    {";
const badEndStr = ",\n];\n    // SEO Enhancement Fields";

if (content.includes(badStartStr) && content.includes(badEndStr)) {
    // Extract the post content so we don't lose it
    const postStartOffset = content.indexOf(badStartStr) + "    relatedGearIds?: string[".length;
    const postEndOffset = content.indexOf(badEndStr);
    const postText = content.substring(postStartOffset, postEndOffset);

    // Now fix the top part. We replace the whole bad chunk with the proper closing.
    const part1 = content.substring(0, content.indexOf(badStartStr));
    const fixedTop = part1 + "    relatedGearIds?: string[];\\n    // SEO Enhancement Fields" + content.substring(postEndOffset + badEndStr.length);

    // Now let's find the correct ending array bracket.
    // The correct place is at the end of the file. `\n];`

    const correctEndStr = "\\n];";
    const lastBracketIndex = fixedTop.lastIndexOf(correctEndStr);

    if (lastBracketIndex !== -1) {
        const finalContent = fixedTop.substring(0, lastBracketIndex) +
            ",\\n    " + postText.trim() + "\\n];" +
            fixedTop.substring(lastBracketIndex + correctEndStr.length);
        fs.writeFileSync(FILE_PATH, finalContent);
        console.log("Successfully fixed the file.");
    } else {
        console.log("Could not find the last bracket.");
    }

} else {
    // Maybe we just need to do a regex approach if exact match fails
    console.log("Could not find the exact bad string format. Doing regex fallback...");
    // Let's restore the interface the easiest way:
    let fixed = content.replace(/relatedGearIds\?: string\[[\s\S]*?,\n\];/m, "relatedGearIds?: string[];");
    fs.writeFileSync(FILE_PATH, fixed);
    console.log("Applied fallback regex fix. Post needs to be added manually now.");
}
