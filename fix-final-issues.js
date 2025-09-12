const fs = require('fs');
const path = require('path');

function fixFinalIssues(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      fixFinalIssues(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Fix <imgclassName -> className
      if (content.includes('<imgclassName')) {
        content = content.replace(/<imgclassName/g, 'className');
        modified = true;
        console.log(`Fixed imgclassName in: ${fullPath}`);
      }
      
      // Fix <imgsrc -> src
      if (content.includes('<imgsrc')) {
        content = content.replace(/<imgsrc/g, 'src');
        modified = true;
        console.log(`Fixed imgsrc in: ${fullPath}`);
      }
      
      // Fix <imgalt -> alt
      if (content.includes('<imgalt')) {
        content = content.replace(/<imgalt/g, 'alt');
        modified = true;
        console.log(`Fixed imgalt in: ${fullPath}`);
      }
      
      // Fix <imgloading -> loading
      if (content.includes('<imgloading')) {
        content = content.replace(/<imgloading/g, 'loading');
        modified = true;
        console.log(`Fixed imgloading in: ${fullPath}`);
      }
      
      // Fix <imgonError -> onError
      if (content.includes('<imgonError')) {
        content = content.replace(/<imgonError/g, 'onError');
        modified = true;
        console.log(`Fixed imgonError in: ${fullPath}`);
      }
      
      // Fix <imgdecoding -> decoding
      if (content.includes('<imgdecoding')) {
        content = content.replace(/<imgdecoding/g, 'decoding');
        modified = true;
        console.log(`Fixed imgdecoding in: ${fullPath}`);
      }
      
      // Fix <imgstyle -> style
      if (content.includes('<imgstyle')) {
        content = content.replace(/<imgstyle/g, 'style');
        modified = true;
        console.log(`Fixed imgstyle in: ${fullPath}`);
      }
      
      // Fix <imgwidth -> width
      if (content.includes('<imgwidth')) {
        content = content.replace(/<imgwidth/g, 'width');
        modified = true;
        console.log(`Fixed imgwidth in: ${fullPath}`);
      }
      
      // Fix <imgheight -> height
      if (content.includes('<imgheight')) {
        content = content.replace(/<imgheight/g, 'height');
        modified = true;
        console.log(`Fixed imgheight in: ${fullPath}`);
      }
      
      // Fix <imgfill -> fill
      if (content.includes('<imgfill')) {
        content = content.replace(/<imgfill/g, 'fill');
        modified = true;
        console.log(`Fixed imgfill in: ${fullPath}`);
      }
      
      // Fix <imgsizes -> sizes
      if (content.includes('<imgsizes')) {
        content = content.replace(/<imgsizes/g, 'sizes');
        modified = true;
        console.log(`Fixed imgsizes in: ${fullPath}`);
      }
      
      // Fix <imgpriority -> priority
      if (content.includes('<imgpriority')) {
        content = content.replace(/<imgpriority/g, 'priority');
        modified = true;
        console.log(`Fixed imgpriority in: ${fullPath}`);
      }
      
      // Fix <imgquality -> quality
      if (content.includes('<imgquality')) {
        content = content.replace(/<imgquality/g, 'quality');
        modified = true;
        console.log(`Fixed imgquality in: ${fullPath}`);
      }
      
      // Fix <imgplaceholder -> placeholder
      if (content.includes('<imgplaceholder')) {
        content = content.replace(/<imgplaceholder/g, 'placeholder');
        modified = true;
        console.log(`Fixed imgplaceholder in: ${fullPath}`);
      }
      
      // Fix <imgblurDataURL -> blurDataURL
      if (content.includes('<imgblurDataURL')) {
        content = content.replace(/<imgblurDataURL/g, 'blurDataURL');
        modified = true;
        console.log(`Fixed imgblurDataURL in: ${fullPath}`);
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
  console.log('Fixing final img tag issues...');
  fixFinalIssues(appDir);
  console.log('Done fixing final issues!');
} else {
  console.log('App directory not found. Make sure you\'re running this from the correct location.');
}
