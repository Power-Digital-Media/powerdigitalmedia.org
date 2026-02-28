const fs = require('fs');

function processFile(path, croUpdate) {
    if (!fs.existsSync(path)) return;
    let code = fs.readFileSync(path, 'utf8');

    // CRO Fixes
    if (croUpdate) {
        croUpdate(code);
    }

    // AST-safe stripping by splitting tags
    code = code.replace(/import \{ m \} from "framer-motion";\n?/, '');
    code = code.replace(/import \{ motion \} from "framer-motion";\n?/, '');

    // Replace <m.div> tags and strip their props safely
    code = code.replace(/<m\./g, '<');
    code = code.replace(/<\/m\./g, '</');
    code = code.replace(/<motion\./g, '<');
    code = code.replace(/<\/motion\./g, '</');

    // Remove Framer Motion props specifically by matching the known configurations
    const propsToRemove = [
        'initial={{ opacity: 0, x: 30 }}',
        'whileInView={{ opacity: 1, x: 0 }}',
        'viewport={{ once: true }}',
        'transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}',
        'initial={{ opacity: 0, y: 30 }}',
        'whileInView={{ opacity: 1, y: 0 }}',
        'transition={{ delay: 0.1 }}',
        'transition={{ delay: 0.2 }}',
        'transition={{ delay: 0.3 }}',
        'initial={{ opacity: 0, x: -30 }}',
        'initial={{ opacity: 0, scale: 0.95, x: 30 }}',
        'whileInView={{ opacity: 1, scale: 1, x: 0 }}',
        'transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}',
        'initial={{ opacity: 0, scale: 0.95 }}',
        'whileInView={{ opacity: 1, scale: 1 }}',
        'transition={{ duration: 1 }}',
        'transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}',
        'initial={{ opacity: 0, y: 20 }}',
        'transition={{ duration: 0.5, delay: 0.1 * index }}',
        'transition={{ delay: 0.4 }}'
    ];

    propsToRemove.forEach(prop => {
        code = code.split(prop).join('');
    });

    fs.writeFileSync(path, code);
}

// 1. Services
processFile('e:\\\\AntiGravity\\\\First Project\\\\Power Digital Media\\\\power-digital-media-web\\\\src\\\\components\\\\sections\\\\Services.tsx', (code) => {
    // We already passed code by value, so need to just do it inline down there.
});

// Since callback doesn't update the ref, we just do it here:
let sPath = 'e:\\\\AntiGravity\\\\First Project\\\\Power Digital Media\\\\power-digital-media-web\\\\src\\\\components\\\\sections\\\\Services.tsx';
let sCode = fs.readFileSync(sPath, 'utf8');
sCode = sCode.replace('<span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">The Core</span>', '<span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4 block">Content To Fuel The Engine</span>');
sCode = sCode.replace('Complete studio-grade podcasting. From show concept and branding to full RØDECaster-powered production in JACKSON, MS.', 'A fast website is useless if the content is generic. We provide cinematic video and studio podcasting to fill your new digital real estate.');
// Strip framer
sCode = sCode.replace(/import \{ m \} from "framer-motion";\n?/, '');
sCode = sCode.replace(/<m\./g, '<');
sCode = sCode.replace(/<\/m\./g, '</');
let pRemove = [
    'initial={{ opacity: 0, x: 30 }}', 'whileInView={{ opacity: 1, x: 0 }}', 'viewport={{ once: true }}', 'transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}',
    'initial={{ opacity: 0, y: 30 }}', 'whileInView={{ opacity: 1, y: 0 }}', 'transition={{ delay: 0.1 }}', 'transition={{ delay: 0.2 }}', 'transition={{ delay: 0.3 }}',
    'initial={{ opacity: 0, x: -30 }}', 'initial={{ opacity: 0, scale: 0.95, x: 30 }}', 'whileInView={{ opacity: 1, scale: 1, x: 0 }}', 'transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}',
    'initial={{ opacity: 0, scale: 0.95 }}', 'whileInView={{ opacity: 1, scale: 1 }}', 'transition={{ duration: 1 }}', 'transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}'
];
pRemove.forEach(p => { sCode = sCode.split(p).join(''); });
// Clean up multiline gaps
sCode = sCode.replace(/<div\s+className=/g, '<div className=');
fs.writeFileSync(sPath, sCode);


// 2. LeadArchitect
let lPath = 'e:\\\\AntiGravity\\\\First Project\\\\Power Digital Media\\\\power-digital-media-web\\\\src\\\\components\\\\sections\\\\LeadArchitect.tsx';
let lCode = fs.readFileSync(lPath, 'utf8');
lCode = lCode.replace('I don\\'t outsource your brand\\'s infrastructure to junior developers or cheap overseas agencies. When you partner with Power Digital Media, you work directly with me.', 'I don\\'t outsource your brand\\'s infrastructure to junior developers or cheap overseas agencies. When you partner with Power Digital Media, you work directly with me locally in Jackson.');
lCode = lCode.replace('As the Lead Architect, I personally design, deploy, and scale the digital systems that drive your revenue. Whether it\\'s a high - performance web application or a cinematic podcasting studio, you get enterprise - grade execution from the top down.', 'As the Lead Architect, I personally design, deploy, and scale the custom Next.js performance builds that drive your revenue. < strong className = "text-white" > I personally guarantee your new site will score a 95 + on Google PageSpeed, or I will rebuild the architecture for free.</strong > ');
// Strip framer
lCode = lCode.replace(/import \{ m \} from "framer-motion";\n?/, '');
lCode = lCode.replace(/<m\./g, '<');
lCode = lCode.replace(/<\/m\./g, '</');
pRemove = [
    'initial={{ opacity: 0, x: -30 }}', 'whileInView={{ opacity: 1, x: 0 }}', 'viewport={{ once: true }}', 'transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}',
    'initial={{ opacity: 0, scale: 0.95, x: 30 }}', 'whileInView={{ opacity: 1, scale: 1, x: 0 }}', 'transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}',
    'initial={{ opacity: 0, y: 30 }}', 'transition={{ delay: 0.1 }}', 'transition={{ delay: 0.2 }}', 'transition={{ delay: 0.3 }}'
];
pRemove.forEach(p => { lCode = lCode.split(p).join(''); });
fs.writeFileSync(lPath, lCode);
console.log("Processed Services and LeadArchitect");
