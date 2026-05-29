const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const logoPath = path.join(__dirname, '..', 'public', 'power-logo.webp');

if (!fs.existsSync(logoPath)) {
  console.error("Logo file not found at: " + logoPath);
  process.exit(1);
}

// Read into buffer to prevent file lock
const inputBuffer = fs.readFileSync(logoPath);

sharp(inputBuffer)
  .resize(150) // Resize to exactly 150px width for mobile Retina display density
  .webp({ quality: 85 })
  .toBuffer()
  .then(outputBuffer => {
    fs.writeFileSync(logoPath, outputBuffer);
    console.log("Successfully resized and optimized logo from buffer. New size: " + (outputBuffer.length / 1024).toFixed(2) + " KB");
  })
  .catch(err => {
    console.error("Error resizing logo:", err);
  });
