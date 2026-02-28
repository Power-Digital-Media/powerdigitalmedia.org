const fs = require('fs');

const files = ['TechStack.tsx', 'Portfolio.tsx', 'LeadArchitect.tsx', 'Hero.tsx', 'Contact.tsx'];

files.forEach(f => {
    const p = 'e:\\\\AntiGravity\\\\First Project\\\\Power Digital Media\\\\power-digital-media-web\\\\src\\\\components\\\\sections\\\\' + f;
    if (fs.existsSync(p)) {
        let code = fs.readFileSync(p, 'utf8');
        code = code.replace(/import \{ m \} from "framer-motion";\n?/g, '');
        code = code.replace(/import \{ motion \} from "framer-motion";\n?/g, '');
        code = code.replace(/import \{ useScroll, useTransform \} from "framer-motion";\n?/g, '');
        code = code.replace(/<m\./g, '<');
        code = code.replace(/<\/m\./g, '</');
        code = code.replace(/<motion\./g, '<');
        code = code.replace(/<\/motion\./g, '</');
        code = code.replace(/\s+initial=\{[^}]+\}/g, '');
        code = code.replace(/\s+whileInView=\{[^}]+\}/g, '');
        code = code.replace(/\s+viewport=\{[^}]+\}/g, '');
        code = code.replace(/\s+transition=\{[^}]+\}/g, '');
        code = code.replace(/\s+animate=\{[^}]+\}/g, '');
        code = code.replace(/\s+whileHover=\{[^}]+\}/g, '');
        code = code.replace(/\s+exit=\{[^}]+\}/g, '');
        fs.writeFileSync(p, code);
        console.log('Stripped framer-motion from ' + f);
    }
});
