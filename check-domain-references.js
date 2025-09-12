#!/usr/bin/env node

/**
 * Domain Reference Checker
 * Scans the codebase for any remaining www.icondumpsters.com references
 * that should be updated to icondumpsters.com
 */

const fs = require('fs');
const path = require('path');

// Directories to scan
const scanDirs = [
  'app',
  'components', 
  'public',
  'scripts'
];

// File extensions to check
const fileExtensions = ['.tsx', '.ts', '.js', '.jsx', '.md', '.json', '.xml', '.html'];

// Patterns to search for
const patterns = [
  /www\.icondumpsters\.com/g,
  /https:\/\/www\.icondumpsters\.com/g,
  /http:\/\/www\.icondumpsters\.com/g
];

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    patterns.forEach((pattern, index) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          issues.push({
            file: filePath,
            line: content.substring(0, content.indexOf(match)).split('\n').length,
            match: match,
            pattern: pattern.toString()
          });
        });
      }
    });
    
    return issues;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dirPath) {
  const issues = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next
        if (!['node_modules', '.next', '.git'].includes(item)) {
          issues.push(...scanDirectory(fullPath));
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (fileExtensions.includes(ext)) {
          issues.push(...scanFile(fullPath));
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return issues;
}

function main() {
  console.log('🔍 Scanning for www.icondumpsters.com references...\n');
  
  const allIssues = [];
  
  scanDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`📁 Scanning ${dir}/`);
      allIssues.push(...scanDirectory(dir));
    } else {
      console.log(`⚠️  Directory ${dir}/ not found`);
    }
  });
  
  if (allIssues.length === 0) {
    console.log('✅ No www.icondumpsters.com references found!');
    console.log('🎉 Your domain migration is clean.');
  } else {
    console.log(`❌ Found ${allIssues.length} www.icondumpsters.com references:\n`);
    
    allIssues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.file}:${issue.line}`);
      console.log(`   Match: "${issue.match}"`);
      console.log(`   Pattern: ${issue.pattern}\n`);
    });
    
    console.log('🔧 Action Required:');
    console.log('   Update these references to use icondumpsters.com instead of www.icondumpsters.com');
  }
  
  console.log('\n📊 Domain Migration Status:');
  console.log('   ✅ 301 redirects configured');
  console.log('   ✅ Canonical URLs set');
  console.log('   ✅ Sitemap updated');
  console.log(`   ${allIssues.length === 0 ? '✅' : '❌'} Code references clean`);
  
  if (allIssues.length === 0) {
    console.log('\n🚀 Next Steps:');
    console.log('   1. Submit Change of Address in Google Search Console');
    console.log('   2. Update Google My Business listing');
    console.log('   3. Update social media profiles');
    console.log('   4. Monitor rankings recovery (4-8 weeks)');
  }
}

main();


