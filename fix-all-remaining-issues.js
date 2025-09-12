const fs = require('fs');
const path = require('path');

// List of all cities
const cities = [
    "american-fork", "bountiful", "centerville", "clearfield", "cottonwood-heights",
    "downtown-salt-lake", "draper", "eagle-mountain", "fairpark", "farmington",
    "glendale", "herriman", "holladay", "kaysville", "kearns", "layton", "lehi",
    "magna", "midvale", "millcreek", "north-salt-lake", "ogden", "orem", "park-city",
    "pleasant-grove", "poplar-grove", "provo", "riverton", "roy", "sandy",
    "saratoga-springs", "south-jordan", "south-salt-lake", "sugar-house", "syracuse",
    "taylorsville", "tooele", "west-jordan", "west-valley-city", "woods-cross"
];

console.log('Fixing all remaining encoding issues...');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Fix all remaining encoding patterns with exact matches
        const fixes = [
            // Fix the specific button text patterns
            { pattern: /🏠"– Read Complete Guide â†'/g, replacement: '📖 Read Complete Guide →' },
            { pattern: /🏠"ž Call Now:/g, replacement: '📞 Call Now:' },
            
            // Fix any remaining corrupted patterns
            { pattern: /🏠"–/g, replacement: '📖' },
            { pattern: /🏠"ž/g, replacement: '📞' },
            { pattern: /🏠"‹/g, replacement: '📋' },
            { pattern: /â†'/g, replacement: '→' },
            
            // Fix emoji patterns
            { pattern: /ðŸ"–/g, replacement: '📖' },
            { pattern: /ðŸ"ž/g, replacement: '📞' },
            { pattern: /ðŸ"‹/g, replacement: '📋' },
            { pattern: /ðŸšš/g, replacement: '🚚' },
            { pattern: /ðŸš€/g, replacement: '🚀' },
            { pattern: /ðŸŒ±/g, replacement: '🌱' },
            { pattern: /â€¢/g, replacement: '•' },
            { pattern: /âš ï¸/g, replacement: '⚠️' },
            { pattern: /ðŸ/g, replacement: '🏠' },
            { pattern: /ðŸ/g, replacement: '🏢' },
            
            // Fix specific heading patterns
            { pattern: /🏠 Residential Projects/g, replacement: '🏠 Residential Projects' },
            { pattern: /🏠 Commercial Projects/g, replacement: '🏢 Commercial Projects' },
            { pattern: /🏠 Need a Permit\?/g, replacement: '⚠️ Need a Permit?' },
            { pattern: /🏠 Simple 4-Step Process/g, replacement: '📋 Simple 4-Step Process' },
            { pattern: /🏠 Important Regulations/g, replacement: '⚠️ Important Regulations' }
        ];
        
        // Apply all fixes
        fixes.forEach(fix => {
            content = content.replace(fix.pattern, fix.replacement);
        });
        
        // Clean up any empty img tags or broken image references
        content = content.replace(/<img[^>]*src=""[^>]*>/g, '');
        content = content.replace(/<img[^>]*\s*\/>/g, '');
        content = content.replace(/<div className="mb-6">\s*<\/div>/g, '');
        content = content.replace(/<div className="mb-8">\s*<img[^>]*\s*\/>\s*<\/div>/g, '');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

function fixAllRemainingIssues(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      fixAllRemainingIssues(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Pattern 1: Fix img attributes that are missing the opening <img tag
      // This matches: src="..." followed by alt="..." and other attributes, then />
      const imgAttributesPattern = /(\s+)(src="[^"]*"\s+alt="[^"]*"[^/>]*\/>)/g;
      
      if (imgAttributesPattern.test(content)) {
        content = content.replace(imgAttributesPattern, '$1<img$2');
        modified = true;
        console.log(`Fixed img attributes pattern in: ${fullPath}`);
      }
      
      // Pattern 2: Fix cases where src is on a separate line
      const multiLineImgPattern = /(\s+)(src="[^"]*"\s*\n\s*alt="[^"]*"[^/>]*\/>)/g;
      
      if (multiLineImgPattern.test(content)) {
        content = content.replace(multiLineImgPattern, '$1<img$2');
        modified = true;
        console.log(`Fixed multi-line img pattern in: ${fullPath}`);
      }
      
      // Pattern 3: Fix cases where className is before src
      const classNameFirstPattern = /(\s+)(className="[^"]*"\s+src="[^"]*"[^/>]*\/>)/g;
      
      if (classNameFirstPattern.test(content)) {
        content = content.replace(classNameFirstPattern, '$1<img$2');
        modified = true;
        console.log(`Fixed className-first pattern in: ${fullPath}`);
      }
      
      // Pattern 4: Fix cases with multiple attributes in different orders
      const complexPattern = /(\s+)((?:src|alt|className|style|onError|loading|decoding)="[^"]*"\s+(?:(?:src|alt|className|style|onError|loading|decoding)="[^"]*"\s+)*\/>)/g;
      
      if (complexPattern.test(content)) {
        content = content.replace(complexPattern, '$1<img$2');
        modified = true;
        console.log(`Fixed complex img pattern in: ${fullPath}`);
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

// Process all city files
cities.forEach(city => {
    // Regular city pages
    fixFile(`iconmain/app/${city}/page.tsx`);
    fixFile(`app/${city}/page.tsx`);
    
    // City guide pages
    fixFile(`iconmain/app/${city}-dumpster-rental-guide-2025/page.tsx`);
    fixFile(`app/${city}-dumpster-rental-guide-2025/page.tsx`);
});

// Start fixing from the app directory
const appDir = path.join(__dirname, 'iconmain', 'app');
if (fs.existsSync(appDir)) {
  console.log('Fixing all remaining img tag issues...');
  fixAllRemainingIssues(appDir);
  console.log('Done fixing all remaining issues!');
} else {
  console.log('App directory not found. Make sure you\'re running this from the correct location.');
}

console.log('All remaining encoding fixes completed!');
