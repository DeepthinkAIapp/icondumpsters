const fs = require('fs');
const path = require('path');

function fixIncompleteImgTags(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      fixIncompleteImgTags(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Pattern to match incomplete img tags
      // This matches: <img followed by optional whitespace and newlines, then </div>
      const imgPattern = /<img\s*\n\s*\n\s*<\/div>/g;
      
      if (imgPattern.test(content)) {
        // Replace incomplete img tags with just the closing div
        content = content.replace(imgPattern, '</div>');
        modified = true;
        console.log(`Fixed incomplete img tag in: ${fullPath}`);
      }
      
      // Also check for single line incomplete img tags
      const singleLinePattern = /<img\s*$/gm;
      if (singleLinePattern.test(content)) {
        // Remove lines that are just incomplete img tags
        const lines = content.split('\n');
        const newLines = [];
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim() === '<img' || line.trim() === '<img ') {
            // Skip this line and the next empty lines until we hit a non-empty line
            while (i + 1 < lines.length && lines[i + 1].trim() === '') {
              i++;
            }
            continue;
          }
          newLines.push(line);
        }
        
        content = newLines.join('\n');
        modified = true;
        console.log(`Fixed single line incomplete img tag in: ${fullPath}`);
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

// Start fixing from the app directory
const appDir = path.join(__dirname, 'iconmain', 'app');
if (fs.existsSync(appDir)) {
  console.log('Fixing incomplete img tags...');
  fixIncompleteImgTags(appDir);
  console.log('Done fixing incomplete img tags!');
} else {
  console.log('App directory not found. Make sure you\'re running this from the correct location.');
}
