const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.startsWith('lh-report') && f.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`\n========================================`);
    console.log(`REPORT: ${file}`);
    console.log(`========================================`);
    
    const lcpElement = data.audits['largest-contentful-paint-element'];
    if (lcpElement && lcpElement.details && lcpElement.details.items) {
      console.log('LCP Element:');
      lcpElement.details.items.forEach(item => {
        console.log(`  * Node: ${item.node?.nodeLabel || 'unknown'}`);
        console.log(`  * Selector: ${item.node?.selector || 'unknown'}`);
        console.log(`  * Snippet: ${item.node?.snippet || 'unknown'}`);
      });
    } else {
      console.log('No LCP element details found.');
    }
  } catch (err) {
    console.error(`Error parsing ${file}:`, err.message);
  }
});
