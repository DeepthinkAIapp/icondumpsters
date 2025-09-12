const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'dumpster_competitor_data.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Advanced CSV parser that handles multi-line entries and complex data
function parseAdvancedCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  let currentRow = [];
  let inQuotes = false;
  let currentField = '';
  let lineIndex = 0;
  
  // Process each line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines
    if (line.trim() === '') continue;
    
    // Check if this looks like a new record (starts with industry)
    if (line.startsWith('dumpster_rentals,') || line.startsWith('construction_services,') || 
        line.startsWith('junk_removal,') || line.startsWith('contractors,')) {
      
      // Save previous row if it exists
      if (currentRow.length > 0) {
        data.push(createRowObject(headers, currentRow));
      }
      
      // Start new row
      currentRow = parseCSVLine(line);
      continue;
    }
    
    // This is a continuation of the previous field
    if (currentRow.length > 0) {
      // Append to the last field
      const lastFieldIndex = currentRow.length - 1;
      if (lastFieldIndex >= 0) {
        currentRow[lastFieldIndex] += ' ' + line.trim();
      }
    }
  }
  
  // Don't forget the last row
  if (currentRow.length > 0) {
    data.push(createRowObject(headers, currentRow));
  }
  
  return data;
}

// Parse a single CSV line with proper quote handling
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Create row object from headers and values
function createRowObject(headers, values) {
  const row = {};
  headers.forEach((header, index) => {
    row[header] = values[index] || '';
  });
  return row;
}

// Enhanced data cleaning and processing
function processCompetitorData(rawData) {
  return rawData.map(row => {
    const processed = {};
    
    // Basic info with enhanced cleaning
    processed.industry = cleanText(row.industry) || 'Unknown';
    processed.url = cleanUrl(row.url);
    processed.company_name = extractCompanyName(row);
    processed.title = cleanText(row.title);
    processed.phone = extractPhoneNumber(row.phone);
    processed.email = extractEmail(row.email);
    
    // About and services with better cleaning
    processed.about_us = cleanLongText(row.about_us);
    processed.services = cleanServices(row.services);
    processed.service_areas = cleanServiceAreas(row.service_areas);
    processed.pricing_info = cleanLongText(row.pricing_info);
    
    // Social media with better parsing
    processed.social_media = cleanSocialMedia(row.social_media);
    
    // Company details
    processed.year_established = cleanText(row.year_established);
    processed.certifications = cleanText(row.certifications);
    processed.specializations = cleanSpecializations(row.specializations);
    
    // Enhanced metrics
    processed.has_phone = processed.phone !== 'N/A' && processed.phone.length > 0;
    processed.has_email = processed.email !== 'N/A' && processed.email.length > 0;
    processed.has_social_media = processed.social_media.length > 0;
    processed.has_about_us = processed.about_us.length > 0;
    processed.service_area_count = processed.service_areas.split(',').filter(area => area.trim().length > 0).length;
    
    // Extract domain from URL
    processed.domain = extractDomain(processed.url);
    
    // Calculate quality score
    processed.quality_score = calculateQualityScore(processed);
    
    return processed;
  }).filter(row => row.company_name && row.company_name !== 'Unknown Company' && row.url);
}

// Helper functions for data cleaning
function cleanText(text) {
  if (!text || text === 'N/A') return '';
  return text.toString().trim().replace(/\s+/g, ' ');
}

function cleanUrl(url) {
  if (!url || url === 'N/A') return '';
  const cleaned = url.toString().trim();
  return cleaned.startsWith('http') ? cleaned : `https://${cleaned}`;
}

function extractCompanyName(row) {
  // Try to get company name from company_name field first
  if (row.company_name && row.company_name !== 'N/A' && row.company_name.trim()) {
    return cleanText(row.company_name);
  }
  
  // Extract from title
  if (row.title && row.title !== 'N/A') {
    const title = cleanText(row.title);
    // Remove common suffixes
    const cleaned = title
      .replace(/\s*\|\s*.*$/, '') // Remove everything after |
      .replace(/\s*-\s*.*$/, '') // Remove everything after -
      .replace(/\s*Dumpster.*$/i, '') // Remove "Dumpster" suffix
      .replace(/\s*Rental.*$/i, '') // Remove "Rental" suffix
      .trim();
    
    if (cleaned.length > 3) return cleaned;
  }
  
  // Extract from URL
  if (row.url && row.url !== 'N/A') {
    try {
      const url = new URL(row.url.startsWith('http') ? row.url : `https://${row.url}`);
      const domain = url.hostname.replace('www.', '');
      const name = domain.split('.')[0];
      return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    } catch (e) {
      // Fallback to domain extraction
      const domain = row.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
      const name = domain.split('.')[0];
      return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
  }
  
  return 'Unknown Company';
}

function extractPhoneNumber(phone) {
  if (!phone || phone === 'N/A') return 'N/A';
  
  // Clean and format phone number
  const cleaned = phone.toString().replace(/[^\d\-\(\)\s]/g, '').trim();
  
  // Check if it looks like a phone number
  const digits = cleaned.replace(/\D/g, '');
  if (digits.length >= 10) {
    return cleaned;
  }
  
  return 'N/A';
}

function extractEmail(email) {
  if (!email || email === 'N/A') return 'N/A';
  
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = email.toString().match(emailRegex);
  return match ? match[0] : 'N/A';
}

function cleanLongText(text) {
  if (!text || text === 'N/A') return '';
  
  return text.toString()
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, 500); // Limit length
}

function cleanServices(services) {
  if (!services || services === 'N/A') return '';
  
  const cleaned = services.toString()
    .replace(/Services:\s*/g, '')
    .replace(/Waste_Types:\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleaned;
}

function cleanServiceAreas(areas) {
  if (!areas || areas === 'N/A') return '';
  
  return areas.toString()
    .split(',')
    .map(area => area.trim())
    .filter(area => area.length > 0)
    .join(', ');
}

function cleanSocialMedia(social) {
  if (!social || social === 'N/A') return '';
  
  const platforms = [];
  const socialText = social.toString().toLowerCase();
  
  if (socialText.includes('facebook')) platforms.push('Facebook');
  if (socialText.includes('instagram')) platforms.push('Instagram');
  if (socialText.includes('twitter')) platforms.push('Twitter');
  if (socialText.includes('linkedin')) platforms.push('LinkedIn');
  if (socialText.includes('youtube')) platforms.push('YouTube');
  
  return platforms.join(', ');
}

function cleanSpecializations(specs) {
  if (!specs || specs === 'N/A') return '';
  
  return specs.toString()
    .split('|')
    .map(spec => spec.trim())
    .filter(spec => spec.length > 0)
    .join(', ');
}

function extractDomain(url) {
  if (!url) return 'Unknown';
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'Invalid URL';
  }
}

function calculateQualityScore(competitor) {
  let score = 0;
  
  if (competitor.has_phone) score += 25;
  if (competitor.has_email) score += 25;
  if (competitor.has_social_media) score += 20;
  if (competitor.has_about_us) score += 15;
  if (competitor.service_area_count > 5) score += 10;
  if (competitor.specializations.length > 0) score += 5;
  
  return Math.min(score, 100);
}

// Generate enhanced analytics
function generateEnhancedAnalytics(processedData) {
  const analytics = {
    total_competitors: processedData.length,
    industries: {},
    service_areas: {},
    certifications: {},
    social_media_presence: {
      facebook: 0,
      instagram: 0,
      twitter: 0,
      linkedin: 0,
      youtube: 0
    },
    contact_info: {
      has_phone: 0,
      has_email: 0,
      has_both: 0,
      has_neither: 0
    },
    established_years: {},
    top_domains: {},
    specializations: {},
    quality_scores: {
      excellent: 0, // 80-100
      good: 0,      // 60-79
      fair: 0,      // 40-59
      poor: 0       // 0-39
    }
  };
  
  processedData.forEach(competitor => {
    // Industry breakdown
    analytics.industries[competitor.industry] = (analytics.industries[competitor.industry] || 0) + 1;
    
    // Service areas
    if (competitor.service_areas) {
      competitor.service_areas.split(',').forEach(area => {
        const cleanArea = area.trim();
        if (cleanArea) {
          analytics.service_areas[cleanArea] = (analytics.service_areas[cleanArea] || 0) + 1;
        }
      });
    }
    
    // Certifications
    if (competitor.certifications && competitor.certifications !== 'N/A') {
      analytics.certifications[competitor.certifications] = (analytics.certifications[competitor.certifications] || 0) + 1;
    }
    
    // Social media presence
    if (competitor.social_media) {
      if (competitor.social_media.includes('Facebook')) analytics.social_media_presence.facebook++;
      if (competitor.social_media.includes('Instagram')) analytics.social_media_presence.instagram++;
      if (competitor.social_media.includes('Twitter')) analytics.social_media_presence.twitter++;
      if (competitor.social_media.includes('LinkedIn')) analytics.social_media_presence.linkedin++;
      if (competitor.social_media.includes('YouTube')) analytics.social_media_presence.youtube++;
    }
    
    // Contact info
    if (competitor.has_phone && competitor.has_email) {
      analytics.contact_info.has_both++;
    } else if (competitor.has_phone) {
      analytics.contact_info.has_phone++;
    } else if (competitor.has_email) {
      analytics.contact_info.has_email++;
    } else {
      analytics.contact_info.has_neither++;
    }
    
    // Established years
    if (competitor.year_established && competitor.year_established !== 'N/A') {
      analytics.established_years[competitor.year_established] = (analytics.established_years[competitor.year_established] || 0) + 1;
    }
    
    // Top domains
    analytics.top_domains[competitor.domain] = (analytics.top_domains[competitor.domain] || 0) + 1;
    
    // Specializations
    if (competitor.specializations) {
      competitor.specializations.split(',').forEach(spec => {
        const cleanSpec = spec.trim();
        if (cleanSpec) {
          analytics.specializations[cleanSpec] = (analytics.specializations[cleanSpec] || 0) + 1;
        }
      });
    }
    
    // Quality scores
    if (competitor.quality_score >= 80) analytics.quality_scores.excellent++;
    else if (competitor.quality_score >= 60) analytics.quality_scores.good++;
    else if (competitor.quality_score >= 40) analytics.quality_scores.fair++;
    else analytics.quality_scores.poor++;
  });
  
  // Add percentages to service areas and specializations
  Object.keys(analytics.service_areas).forEach(key => {
    analytics.service_areas[key] = { 
      count: analytics.service_areas[key], 
      percentage: ((analytics.service_areas[key] / processedData.length) * 100).toFixed(1) 
    };
  });
  
  Object.keys(analytics.specializations).forEach(key => {
    analytics.specializations[key] = { 
      count: analytics.specializations[key], 
      percentage: ((analytics.specializations[key] / processedData.length) * 100).toFixed(1) 
    };
  });
  
  return analytics;
}

// Process the data
console.log('🔄 Processing competitor data with enhanced parser...');
const rawData = parseAdvancedCSV(csvContent);
console.log(`📊 Parsed ${rawData.length} raw records`);

const processedData = processCompetitorData(rawData);
console.log(`✅ Processed ${processedData.length} competitors`);

const analytics = generateEnhancedAnalytics(processedData);

// Create the final data structure
const finalData = {
  competitors: processedData,
  analytics: analytics,
  summary: {
    totalCompetitors: processedData.length,
    totalIndustries: Object.keys(analytics.industries).length,
    totalServiceAreas: Object.keys(analytics.service_areas).length,
    lastUpdated: new Date().toISOString(),
    dataQuality: {
      hasPhone: ((analytics.contact_info.has_phone + analytics.contact_info.has_both) / processedData.length * 100).toFixed(1),
      hasEmail: ((analytics.contact_info.has_email + analytics.contact_info.has_both) / processedData.length * 100).toFixed(1),
      hasSocialMedia: ((Object.values(analytics.social_media_presence).reduce((a, b) => a + b, 0) / processedData.length) * 100).toFixed(1),
      qualityDistribution: analytics.quality_scores
    }
  }
};

// Write the processed data to a JSON file
const outputPath = path.join(__dirname, '..', 'iconmain', 'data', 'competitor-data.json');
const dataDir = path.dirname(outputPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));

console.log(`\n🎉 Enhanced processing complete!`);
console.log(`📁 Data saved to: ${outputPath}`);
console.log(`\n📈 Enhanced Summary:`);
console.log(`- Total Competitors: ${finalData.summary.totalCompetitors}`);
console.log(`- Industries: ${finalData.summary.totalIndustries}`);
console.log(`- Service Areas: ${finalData.summary.totalServiceAreas}`);
console.log(`- Data Quality - Phone: ${finalData.summary.dataQuality.hasPhone}%`);
console.log(`- Data Quality - Email: ${finalData.summary.dataQuality.hasEmail}%`);
console.log(`- Data Quality - Social Media: ${finalData.summary.dataQuality.hasSocialMedia}%`);
console.log(`\n🏆 Quality Distribution:`);
console.log(`- Excellent (80-100): ${analytics.quality_scores.excellent}`);
console.log(`- Good (60-79): ${analytics.quality_scores.good}`);
console.log(`- Fair (40-59): ${analytics.quality_scores.fair}`);
console.log(`- Poor (0-39): ${analytics.quality_scores.poor}`);

// Show sample of processed data
console.log(`\n📋 Sample Processed Competitors:`);
processedData.slice(0, 3).forEach((comp, index) => {
  console.log(`${index + 1}. ${comp.company_name}`);
  console.log(`   URL: ${comp.url}`);
  console.log(`   Phone: ${comp.phone}`);
  console.log(`   Quality Score: ${comp.quality_score}/100`);
  console.log(`   Service Areas: ${comp.service_area_count}`);
  console.log('');
});
