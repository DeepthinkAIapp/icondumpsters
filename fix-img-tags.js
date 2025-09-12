const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx files
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix incomplete img tags in a file
function fixIncompleteImgTags(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix incomplete img tags
    content = content.replace(/<img\s*\n\s*\n\s*<\/div>/g, '<!-- Image placeholder - removed incomplete img tag -->\n                  </div>');
    content = content.replace(/<img\s*\n\s*\n\s*<h3/g, '<!-- Image placeholder - removed incomplete img tag -->\n                  <h3');
    content = content.replace(/<img\s*\n\s*\n\s*<div/g, '<!-- Image placeholder - removed incomplete img tag -->\n                  <div');
    content = content.replace(/<img\s*\n\s*\n\s*<Link/g, '<!-- Image placeholder - removed incomplete img tag -->\n                <Link');
    content = content.replace(/<img\s*\n\s*\n\s*<\/section>/g, '<!-- Image placeholder - removed incomplete img tag -->\n                </section>');
    
    // Fix incomplete ImageWithFallback tags
    content = content.replace(/<ImageWithFallback\s*\n\s*\n\s*<h3/g, '<!-- Image placeholder - removed incomplete ImageWithFallback -->\n                  <h3');
    
    // If content changed, write it back
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('Starting to fix incomplete img tags...');

const appDir = path.join(__dirname, 'app');
const tsxFiles = findTsxFiles(appDir);

let fixedCount = 0;

tsxFiles.forEach(filePath => {
  if (fixIncompleteImgTags(filePath)) {
    fixedCount++;
  }
});

console.log(`\nCompleted! Fixed ${fixedCount} files.`);
