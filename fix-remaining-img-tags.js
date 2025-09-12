const fs = require('fs');
const path = require('path');

const filesToFix = [
  'app/eagle-mountain-dumpster-rental-guide-2025/page.tsx',
  'app/eagle-mountain/page.tsx',
  'app/fairpark-dumpster-rental-guide-2025/page.tsx',
  'app/fairpark/page.tsx',
  'app/farmington-dumpster-rental-guide-2025/page.tsx'
];

filesToFix.forEach(filePath => {
  try {
    const fullPath = path.join('iconmain', filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix incomplete img tags
    content = content.replace(/<img\s*\n\s*>/g, '{/* Image placeholder - removed incomplete img tag */}');
    content = content.replace(/<img\s*>/g, '{/* Image placeholder - removed incomplete img tag */}');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
});

console.log('All files processed.');
