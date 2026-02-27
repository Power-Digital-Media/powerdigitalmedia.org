import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function getDirSize(dirPath: string) {
    let size = 0;
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            size += getDirSize(fullPath);
        } else if (fullPath.endsWith('.webp')) {
            size += fs.statSync(fullPath).size;
        }
    });
    return size;
}

const diffOutput = execSync('git diff --stat HEAD public/').toString();
const lines = diffOutput.split('\n');
let originalSize = 0;

for (const line of lines) {
    // Regex to match "Bin 123456 -> 0 bytes"
    const match = line.match(/Bin\s+(\d+)\s+->\s+0\s+bytes/);
    if (match) {
        originalSize += parseInt(match[1], 10);
    }
}

const publicDir = path.join(process.cwd(), 'public');
const compressedSize = getDirSize(publicDir);

const savings = originalSize - compressedSize;
const savingsMB = (savings / (1024 * 1024)).toFixed(2);
const originalMB = (originalSize / (1024 * 1024)).toFixed(2);
const compressedMB = (compressedSize / (1024 * 1024)).toFixed(2);

console.log(`Original total size (PNG/JPG): ${originalMB} MB`);
console.log(`Compressed total size (WEBP):  ${compressedMB} MB`);
console.log(`Total space saved:             ${savingsMB} MB`);
console.log(`Reduction:                     ${((savings / originalSize) * 100).toFixed(2)}%`);
