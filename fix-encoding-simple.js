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

console.log('Fixing encoding issues in all city pages...');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Fix common encoding issues
        content = content.replace(/🏠 /g, '🏠');
        content = content.replace(/🏠 /g, '🏢');
        content = content.replace(/ðŸ"–/g, '📖');
        content = content.replace(/â†'/g, '→');
        content = content.replace(/Ã¢Å¡Â Ã¯Â¸Â/g, '⚠️');
        content = content.replace(/🏠 â€œÅ¾/g, '📞');
        content = content.replace(/🏠 â€œâ€¹/g, '📋');
        content = content.replace(/🏠 â€œ¢/g, '💰');
        content = content.replace(/🏠 â€œ¨â€🏠"§/g, '👨‍🔧');
        content = content.replace(/🏠š€/g, '🚀');
        content = content.replace(/🏠"ž/g, '📞');
        content = content.replace(/🏠"‹/g, '📋');
        
        // Fix button text
        content = content.replace(/ðŸ"– Read Complete Guide â†'/g, '📖 Read Complete Guide →');
        content = content.replace(/8Ϋ"- Read Complete Guide â†'/g, '📖 Read Complete Guide →');
        
        // Remove duplicate images (keep only first occurrence)
        const imageMatches = content.match(/src="\/images\/IMG_0350\.jpg"[^>]*>/g);
        if (imageMatches && imageMatches.length > 1) {
            let firstFound = false;
            content = content.replace(/src="\/images\/IMG_0350\.jpg"[^>]*>/g, (match) => {
                if (!firstFound) {
                    firstFound = true;
                    return match;
                }
                return '';
            });
        }
        
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

console.log('Encoding fixes completed!');
