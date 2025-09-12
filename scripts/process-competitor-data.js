const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'dumpster_competitor_data.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV data
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = parseCSVLine(lines[i]);
      if (values.length >= headers.length) {
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index] ? values[index].trim() : '';
        });
        data.push(row);
      }
    }
  }
  
  return data;
}

// Handle CSV parsing with proper quote handling
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// Process the data
const rawData = parseCSV(csvContent);

// Clean and structure the data
const processedData = rawData.map(row => {
  // Clean up the data
  const cleanRow = {};
  
  // Basic info
  cleanRow.industry = row.industry || 'Unknown';
  cleanRow.url = row.url || '';
  cleanRow.company_name = row.company_name || 'Unknown Company';
  cleanRow.title = row.title || '';
  cleanRow.phone = row.phone || 'N/A';
  cleanRow.email = row.email || 'N/A';
  
  // About and services
  cleanRow.about_us = row.about_us || '';
  cleanRow.services = row.services || '';
  cleanRow.service_areas = row.service_areas || '';
  cleanRow.pricing_info = row.pricing_info || '';
  
  // Social media
  cleanRow.social_media = row.social_media || '';
  
  // Company details
  cleanRow.year_established = row.year_established || 'N/A';
  cleanRow.certifications = row.certifications || 'N/A';
  cleanRow.specializations = row.specializations || '';
  
  // Calculate some metrics
  cleanRow.has_phone = cleanRow.phone !== 'N/A' && cleanRow.phone.length > 0;
  cleanRow.has_email = cleanRow.email !== 'N/A' && cleanRow.email.length > 0;
  cleanRow.has_social_media = cleanRow.social_media.length > 0;
  cleanRow.has_about_us = cleanRow.about_us.length > 0;
  cleanRow.service_area_count = cleanRow.service_areas.split(',').filter(area => area.trim().length > 0).length;
  
  // Extract domain from URL
  try {
    if (cleanRow.url) {
      const url = new URL(cleanRow.url.startsWith('http') ? cleanRow.url : `https://${cleanRow.url}`);
      cleanRow.domain = url.hostname;
    } else {
      cleanRow.domain = 'Unknown';
    }
  } catch {
    cleanRow.domain = 'Invalid URL';
  }
  
  return cleanRow;
}).filter(row => row.company_name !== 'Unknown Company' && row.url);

// Generate analytics
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
    has_both: 0
  },
  established_years: {},
  top_domains: {},
  specializations: {}
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
    if (competitor.social_media.includes('facebook')) analytics.social_media_presence.facebook++;
    if (competitor.social_media.includes('instagram')) analytics.social_media_presence.instagram++;
    if (competitor.social_media.includes('twitter')) analytics.social_media_presence.twitter++;
    if (competitor.social_media.includes('linkedin')) analytics.social_media_presence.linkedin++;
    if (competitor.social_media.includes('youtube')) analytics.social_media_presence.youtube++;
  }
  
  // Contact info
  if (competitor.has_phone) analytics.contact_info.has_phone++;
  if (competitor.has_email) analytics.contact_info.has_email++;
  if (competitor.has_phone && competitor.has_email) analytics.contact_info.has_both++;
  
  // Established years
  if (competitor.year_established && competitor.year_established !== 'N/A') {
    analytics.established_years[competitor.year_established] = (analytics.established_years[competitor.year_established] || 0) + 1;
  }
  
  // Top domains
  analytics.top_domains[competitor.domain] = (analytics.top_domains[competitor.domain] || 0) + 1;
  
  // Specializations
  if (competitor.specializations) {
    competitor.specializations.split('|').forEach(spec => {
      const cleanSpec = spec.trim();
      if (cleanSpec) {
        analytics.specializations[cleanSpec] = (analytics.specializations[cleanSpec] || 0) + 1;
      }
    });
  }
});

// Sort analytics for better display
Object.keys(analytics.service_areas).forEach(key => {
  analytics.service_areas[key] = { count: analytics.service_areas[key], percentage: ((analytics.service_areas[key] / processedData.length) * 100).toFixed(1) };
});

Object.keys(analytics.specializations).forEach(key => {
  analytics.specializations[key] = { count: analytics.specializations[key], percentage: ((analytics.specializations[key] / processedData.length) * 100).toFixed(1) };
});

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
      hasPhone: ((analytics.contact_info.has_phone / processedData.length) * 100).toFixed(1),
      hasEmail: ((analytics.contact_info.has_email / processedData.length) * 100).toFixed(1),
      hasSocialMedia: ((Object.values(analytics.social_media_presence).reduce((a, b) => a + b, 0) / processedData.length) * 100).toFixed(1)
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

console.log(`✅ Processed ${processedData.length} competitors`);
console.log(`📊 Analytics generated for ${Object.keys(analytics.industries).length} industries`);
console.log(`📁 Data saved to: ${outputPath}`);
console.log(`\n📈 Summary:`);
console.log(`- Total Competitors: ${finalData.summary.totalCompetitors}`);
console.log(`- Industries: ${finalData.summary.totalIndustries}`);
console.log(`- Service Areas: ${finalData.summary.totalServiceAreas}`);
console.log(`- Data Quality - Phone: ${finalData.summary.dataQuality.hasPhone}%`);
console.log(`- Data Quality - Email: ${finalData.summary.dataQuality.hasEmail}%`);
console.log(`- Data Quality - Social Media: ${finalData.summary.dataQuality.hasSocialMedia}%`);
