const fs = require('fs');

const FILE_PATH = 'e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const regex1 = /({[^}]*slug: "elite-audio-protocol-podcasting-gear-jackson"[\s\S]*?)(\n    },)/;
content = content.replace(regex1, '$1,\n        relatedGearIds: ["shure-sm7b", "rode-caster-pro-2", "shure-mv7-plus", "rode-procaster"]$2');

const regex2 = /({[^}]*slug: "vram-bottleneck-protocol-rtx-5090-deployment"[\s\S]*?)(\n    },)/g;
content = content.replace(regex2, '$1,\n        relatedGearIds: ["nvidia-rtx-5090", "amd-rx-9070-xt", "msi-rtx-4090", "corsair-dominator-titanium-2026"]$2');

const regex3 = /({[^}]*slug: "tactile-control-protocol-stream-deck-plus"[\s\S]*?)(\n    \n\];)/g;
content = content.replace(regex3, '$1,\n        relatedGearIds: ["elgato-stream-deck-plus", "focusrite-scarlett-2i2", "obsbot-tiny-2", "elgato-wave-3"]$2');
// Also handle case if it's not the very last item:
const regex3b = /({[^}]*slug: "tactile-control-protocol-stream-deck-plus"[\s\S]*?)(\n    },)/g;
content = content.replace(regex3b, '$1,\n        relatedGearIds: ["elgato-stream-deck-plus", "focusrite-scarlett-2i2", "obsbot-tiny-2", "elgato-wave-3"]$2');


fs.writeFileSync(FILE_PATH, content);
console.log('Update complete.');
