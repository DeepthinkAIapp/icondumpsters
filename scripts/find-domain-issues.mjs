#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patterns to search for
const patterns = [
  {
    name: 'HTTP URLs',
    regex: /https?:\/\/www\.icondumpsters\.com/g,
    description: 'URLs starting with http:// or https://www.icondumpsters.com'
  },
  {
    name: 'HTTP without www',
    regex: /http:\/\/icondumpsters\.com/g,
    description: 'URLs starting with http://icondumpsters.com (should be https)'
  },
  {
    name: 'Relative www references',
    regex: /www\.icondumpsters\.com/g,
    description: 'References to www.icondumpsters.com without protocol'
  }
];

// Directories to exclude
const excludeDirs = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
  '.vercel'
];

// File extensions to scan
const includeExtensions = [
  '.tsx', '.ts', '.js', '.jsx', '.md', '.txt', '.json', '.xml', '.html'
];

function shouldScanFile(filePath) {
  const ext = path.extname(filePath);
  return includeExtensions.includes(ext);
}

function shouldScanDirectory(dirName) {
  return !excludeDirs.includes(dirName) && !dirName.startsWith('.');
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];

    lines.forEach((line, index) => {
      patterns.forEach(pattern => {
        const matches = line.match(pattern.regex);
        if (matches) {
          issues.push({
            line: index + 1,
            pattern: pattern.name,
            description: pattern.description,
            matches: matches,
            content: line.trim()
          });
        }
      });
    });

    return issues;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dirPath, relativePath = '') {
  const issues = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativeItemPath = path.join(relativePath, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        if (shouldScanDirectory(item)) {
          issues.push(...scanDirectory(fullPath, relativeItemPath));
        }
      } else if (shouldScanFile(item)) {
        const fileIssues = scanFile(fullPath);
        if (fileIssues.length > 0) {
          issues.push({
            file: relativeItemPath,
            issues: fileIssues
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return issues;
}

function main() {
  console.log('🔍 Scanning repository for domain issues...\n');
  
  // Start from the parent directory of scripts (repository root)
  const repoRoot = path.resolve(__dirname, '..');
  const issues = scanDirectory(repoRoot);
  
  if (issues.length === 0) {
    console.log('✅ No domain issues found! All URLs are properly configured.');
    return;
  }
  
  console.log(`❌ Found ${issues.length} files with domain issues:\n`);
  
  issues.forEach(fileIssue => {
    console.log(`📁 ${fileIssue.file}:`);
    fileIssue.issues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.pattern}`);
      console.log(`  ${issue.description}`);
      console.log(`  Content: ${issue.content}`);
      console.log(`  Matches: ${issue.matches.join(', ')}`);
      console.log('');
    });
  });
  
  console.log('💡 Summary of issues found:');
  const summary = {};
  issues.forEach(fileIssue => {
    fileIssue.issues.forEach(issue => {
      summary[issue.pattern] = (summary[issue.pattern] || 0) + issue.matches.length;
    });
  });
  
  Object.entries(summary).forEach(([pattern, count]) => {
    console.log(`  ${pattern}: ${count} occurrences`);
  });
  
  console.log('\n🔧 To fix these issues, update the URLs to use https://icondumpsters.com');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
