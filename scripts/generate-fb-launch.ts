import fs from 'fs';
import path from 'path';

/**
 * 🚀 FACEBOOK LAUNCH KIT GENERATOR
 * Generates the initial "Hello World" post for the new Facebook Page.
 */

const LAUNCH_POST = `
🔥 SYSTEM ONLINE: POWER DIGITAL MEDIA

We don't just talk about the future of production; we build it. 
From Jackson, MS to the global stage, we are redefining the digital landscape.

👇 LATEST INTEL:
AMD's 2026 Innovations: Unpacking the Future of Compute
The Ryzen 9 9950X3D2 is here. Read the full forensic analysis on our blog.

🔗 https://powerdigitalmedia.org/blog/amds-2026-innovations-unpacking-the-future-of-compute

#PowerDigital #JacksonMS #ProductionStudio #Ryzen9000 #DaVinciResolve
`;

const CAPTION_PATH = path.join(process.cwd(), 'facebook-launch-caption.txt');

console.log("🚀 Generating Facebook Launch Kit...");
fs.writeFileSync(CAPTION_PATH, LAUNCH_POST.trim());
console.log(`✅ Launch caption generated at: ${CAPTION_PATH}`);
console.log("👉 Next Step: Upload 'facebook_cover_2026.png' and 'power_profile_social.png' to Facebook.");
