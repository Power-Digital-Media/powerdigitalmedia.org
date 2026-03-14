const fs = require('fs');
let data = fs.readFileSync('e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts', 'utf-8');
data = data.split('content: \\`').join('content: `');
data = data.split('        \\`\n    }').join('        `\n    }');
fs.writeFileSync('e:\\AntiGravity\\First Project\\Power Digital Media\\power-digital-media-web\\src\\data\\blogPosts.ts', data);
console.log('Fixed backticks.');
