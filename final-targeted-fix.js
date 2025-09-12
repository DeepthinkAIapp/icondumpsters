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

console.log('Applying final targeted encoding fixes...');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Fix the specific patterns found in the files
        const fixes = [
            // Fix button text patterns
            { pattern: /🏠"– Read Complete Guide â†'/g, replacement: '📖 Read Complete Guide →' },
            { pattern: /🏠"ž Call Now:/g, replacement: '📞 Call Now:' },
            
            // Fix individual corrupted characters
            { pattern: /🏠"–/g, replacement: '📖' },
            { pattern: /🏠"ž/g, replacement: '📞' },
            { pattern: /â†'/g, replacement: '→' },
            
            // Clean up empty divs and broken image tags
            { pattern: /<div className="mb-6">\s*<\/div>/g, replacement: '' },
            { pattern: /<div className="mb-8">\s*<img[^>]*\s*\/>\s*<\/div>/g, replacement: '' },
            { pattern: /<img[^>]*src=""[^>]*>/g, replacement: '' },
            { pattern: /<img[^>]*\s*\/>/g, replacement: '' },
            { pattern: /<div className="mb-8">\s*<\/div>/g, replacement: '' }
        ];
        
        // Apply all fixes
        fixes.forEach(fix => {
            content = content.replace(fix.pattern, fix.replacement);
        });
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
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

console.log('Final targeted encoding fixes completed!');

