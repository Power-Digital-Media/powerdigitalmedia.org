const fs = require('fs');
const content = fs.readFileSync('e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts', 'utf-8');
console.log('Audio:', content.includes('"shure-sm7b", "rode-caster-pro-2", "shure-mv7-plus", "rode-procaster"'));
console.log('PC:', content.includes('"nvidia-rtx-5090", "amd-rx-9070-xt", "msi-rtx-4090", "corsair-dominator-titanium-2026"'));
console.log('Tactile:', content.includes('"elgato-stream-deck-plus", "focusrite-scarlett-2i2", "obsbot-tiny-2", "elgato-wave-3"'));
