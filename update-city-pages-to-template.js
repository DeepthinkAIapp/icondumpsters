const fs = require('fs');
const path = require('path');

// Import city data from the existing cityData.ts file
const cityDataPath = './iconmain/app/config/cityData.ts';
let cityData = {};

// Function to extract city data from the TypeScript file
function extractCityData() {
  try {
    const content = fs.readFileSync(cityDataPath, 'utf8');
    
    // Extract the cityData object content
    const cityDataMatch = content.match(/export const cityData: Record<string, CityData> = \{([\s\S]*?)\};/);
    
    if (cityDataMatch) {
      const cityDataContent = cityDataMatch[1];
      
      // Parse each city entry
      const cityMatches = cityDataContent.match(/'([^']+)':\s*\{([\s\S]*?)\},/g);
      
      cityMatches.forEach(match => {
        const cityKeyMatch = match.match(/'([^']+)':/);
        if (cityKeyMatch) {
          const cityKey = cityKeyMatch[1];
          
          // Extract city name from the content
          const cityNameMatch = match.match(/cityName:\s*'([^']+)'/);
          if (cityNameMatch) {
            const cityName = cityNameMatch[1];
            
            // Create a simplified city data structure for the template
            cityData[cityKey] = {
              cityName: cityName,
              citySlug: cityKey,
              state: 'UT',
              phoneNumber: '801-918-6000',
              latitude: '40.7608', // Default SLC coordinates
              longitude: '-111.8910',
              landmarks: [
                {
                  name: `${cityName} City Hall`,
                  address: 'City Hall Address',
                  url: `https://www.${cityKey}.utah.gov/`,
                },
                {
                  name: `${cityName} Park`,
                  address: 'Local Park Address',
                  url: `https://www.google.com/maps/search/${cityName}%20Park`,
                },
              ],
              businessDistricts: [
                {
                  name: `${cityName} Central`,
                  description: 'Major retail and dining district',
                  link: `/${cityKey}`,
                },
                {
                  name: `${cityName} East`,
                  description: 'Residential and commercial mix',
                  link: `/${cityKey}`,
                },
                {
                  name: `${cityName} West`,
                  description: 'Industrial and commercial area',
                  link: `/${cityKey}`,
                },
              ],
              permitInfo: {
                cityName: cityName,
                phoneNumber: '801-918-6000',
                requirements: `Contact ${cityName} for permit requirements and applications. We can help guide you through the process.`,
              },
              contentSections: {
                overview: `Icon Dumpsters provides reliable dumpster rental services throughout ${cityName}, Utah. Whether you're tackling a home renovation, construction project, or major cleanup, we have the right dumpster size for your needs.`,
                residentialServices: [
                  'Home renovations and remodeling',
                  'Basement cleanouts',
                  'Garage organization',
                  'Yard waste removal',
                  'Estate cleanouts',
                ],
                commercialServices: [
                  'Construction and demolition',
                  'Office renovations',
                  'Retail store cleanouts',
                  'Industrial waste removal',
                  'Event cleanup',
                ],
                whyChooseUs: `When you need reliable dumpster rental services in ${cityName}, Icon Dumpsters stands out as your trusted local partner. Our commitment to excellence and deep understanding of ${cityName}'s unique needs makes us the preferred choice for residents and businesses alike.`,
                dumpsterSizes: [
                  {
                    size: '15 Yard',
                    description: 'Perfect for small to medium projects',
                    useCases: ['Kitchen remodel', 'Bathroom renovation', 'Garage cleanout', 'Small construction'],
                  },
                  {
                    size: '20 Yard',
                    description: 'Great for medium to large projects',
                    useCases: ['Full home renovation', 'Large construction', 'Commercial projects', 'Major cleanouts'],
                  },
                  {
                    size: '30 Yard',
                    description: 'For major projects and construction',
                    useCases: ['Large construction', 'Commercial demolition', 'Major renovations', 'Industrial projects'],
                  },
                ],
                localInfo: `${cityName} is home to several popular attractions and landmarks. Whether you're working on a project near these areas or just exploring the city, we're here to help with your dumpster rental needs.`,
                serviceAreas: `We provide dumpster rental services throughout ${cityName}, including areas near popular attractions and business districts. Our same-day delivery ensures you get your dumpster when and where you need it.`,
              },
            };
          }
        }
      });
      
      console.log(`✅ Extracted data for ${Object.keys(cityData).length} cities from cityData.ts`);
    }
  } catch (error) {
    console.error('❌ Error reading cityData.ts:', error.message);
    console.log('Using fallback city data...');
    
    // Fallback data for key cities
    cityData = {
      'salt-lake-city': {
        cityName: 'Salt Lake City',
        citySlug: 'salt-lake-city',
        state: 'UT',
        phoneNumber: '801-918-6000',
        latitude: '40.7608',
        longitude: '-111.8910',
        landmarks: [
          { name: 'Temple Square', address: '50 W North Temple, Salt Lake City, UT 84150', url: 'https://www.templesquare.com/' },
          { name: 'Utah State Capitol', address: '350 State St, Salt Lake City, UT 84103', url: 'https://utahstatecapitol.utah.gov/' },
          { name: 'Liberty Park', address: '600 E 900 S, Salt Lake City, UT 84105' }
        ],
        businessDistricts: [
          { name: 'Downtown Salt Lake City', description: 'Central business district with offices, restaurants, and entertainment', link: 'https://www.downtownslc.org/' },
          { name: 'Sugar House', description: 'Historic shopping district with local businesses and restaurants', link: 'https://www.sugarhousechamber.org/' }
        ],
        permitInfo: {
          cityName: 'Salt Lake City',
          phoneNumber: '801-535-6000',
          requirements: 'Permits may be required for street placement. Contact Salt Lake City for specific requirements.'
        },
        contentSections: {
          overview: 'Icon Dumpsters provides professional dumpster rental services throughout Salt Lake City and the surrounding Salt Lake Valley. We offer fast delivery, competitive pricing, and reliable waste management solutions for both residential and commercial projects.',
          residentialServices: [
            'Home renovations and remodeling',
            'Kitchen and bathroom updates',
            'Basement finishing projects',
            'Garage and attic cleanouts',
            'Yard waste and landscaping cleanup',
            'Moving and estate cleanouts'
          ],
          commercialServices: [
            'Construction and demolition projects',
            'Retail space renovations',
            'Office building updates',
            'Restaurant remodeling',
            'Industrial facility cleanouts',
            'Property management services'
          ],
          whyChooseUs: 'We are the trusted choice for dumpster rental in Salt Lake City because of our local expertise, reliable service, and competitive pricing. Our team understands the unique needs of Salt Lake City projects and local regulations.',
          dumpsterSizes: [
            {
              size: '15-yard',
              description: 'Perfect for small to medium projects',
              useCases: ['Kitchen remodels', 'Bathroom updates', 'Garage cleanouts', 'Small deck removal']
            },
            {
              size: '20-yard',
              description: 'Ideal for medium-sized projects',
              useCases: ['Full home remodels', 'Large deck removal', 'Major landscaping', 'Estate cleanouts']
            },
            {
              size: '30-yard',
              description: 'Best for large construction projects',
              useCases: ['Commercial renovations', 'Major demolition', 'Large estate cleanouts', 'Multi-family projects']
            }
          ],
          localInfo: 'Salt Lake City is the capital and most populous city in Utah, known for its beautiful mountain views, outdoor recreation opportunities, and strong economy. The city has a mix of historic architecture and modern development, making it a great place for both residential and commercial projects.',
          serviceAreas: 'We serve all of Salt Lake City including Downtown, Sugar House, Rose Park, Glendale, Poplar Grove, and surrounding areas. Our service extends throughout the Salt Lake Valley for your convenience.'
        }
      }
    };
  }
}

// Function to generate city page content using the template
function generateCityPage(cityKey, cityData) {
  const { cityName, citySlug, state, phoneNumber, latitude, longitude, landmarks, businessDistricts, permitInfo, contentSections } = cityData;
  
  return `import { Metadata } from 'next';
import CityPageTemplate from '../components/CityPageTemplate';

export const metadata: Metadata = {
  title: '${cityName} Dumpster Rental - Professional Dumpster Services in ${cityName}, ${state} | (${phoneNumber})',
  description: 'Professional dumpster rental services in ${cityName}, ${state}. Fast delivery, competitive pricing, and reliable waste management solutions. Call ${phoneNumber} for instant quotes.',
  keywords: '${cityName} dumpster rental, dumpster rental ${cityName} ${state}, ${cityName} ${state} dumpster, roll-off dumpster ${cityName}, construction dumpster ${cityName}, waste management ${cityName}',
  openGraph: {
    title: '${cityName} Dumpster Rental - Professional Dumpster Services in ${cityName}, ${state} | (${phoneNumber})',
    description: 'Professional dumpster rental services in ${cityName}, ${state}. Fast delivery, competitive pricing, and reliable waste management solutions.',
    url: 'https://icondumpsters.com/${citySlug}',
    siteName: 'Icon Dumpsters',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '${cityName} Dumpster Rental - Professional Dumpster Services in ${cityName}, ${state}',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${cityName} Dumpster Rental - Professional Dumpster Services in ${cityName}, ${state} | (${phoneNumber})',
    description: 'Professional dumpster rental services in ${cityName}, ${state}. Fast delivery, competitive pricing, and reliable waste management solutions.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://icondumpsters.com/${citySlug}',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-UT',
    'geo.placename': '${cityName}, ${state}',
    'geo.position': '${latitude};${longitude}',
    'ICBM': '${latitude}, ${longitude}',
  },
};

export default function ${cityName.replace(/\s+/g, '')}DumpsterRental() {
  const cityData = {
    cityName: '${cityName}',
    citySlug: '${citySlug}',
    state: '${state}',
    phoneNumber: '${phoneNumber}',
    latitude: '${latitude}',
    longitude: '${longitude}',
    landmarks: ${JSON.stringify(landmarks, null, 2)},
    businessDistricts: ${JSON.stringify(businessDistricts, null, 2)},
    permitInfo: ${JSON.stringify(permitInfo, null, 2)},
    contentSections: ${JSON.stringify(contentSections, null, 2)}
  };

  return <CityPageTemplate {...cityData} />;
}`;
}

// Function to update city pages
function updateCityPages() {
  console.log('Starting city page updates...');
  
  // First extract city data
  extractCityData();
  
  const appDir = './iconmain/app';
  
  // Get all city directories
  const cityDirs = fs.readdirSync(appDir).filter(dir => {
    return dir.includes('-dumpster-rental-guide-2025') || 
           (dir.includes('-dumpster-rental-') && !dir.includes('[') && !dir.includes('calculator'));
  });
  
  console.log(`Found ${cityDirs.length} city directories to update`);
  
  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  
  cityDirs.forEach(cityDir => {
    const cityKey = cityDir.replace('-dumpster-rental-guide-2025', '').replace('-dumpster-rental-', '');
    
    if (cityData[cityKey]) {
      const pagePath = path.join(appDir, cityDir, 'page.tsx');
      const newContent = generateCityPage(cityKey, cityData[cityKey]);
      
      try {
        fs.writeFileSync(pagePath, newContent);
        console.log(`✅ Updated: ${cityDir}/page.tsx`);
        updatedCount++;
      } catch (error) {
        console.error(`❌ Error updating ${cityDir}:`, error.message);
        errorCount++;
      }
    } else {
      console.log(`⚠️  No data found for: ${cityKey} (${cityDir})`);
      skippedCount++;
    }
  });
  
  console.log(`\n🎉 City page updates completed!`);
  console.log(`✅ Updated: ${updatedCount} pages`);
  console.log(`⚠️  Skipped: ${skippedCount} pages (no data available)`);
  console.log(`❌ Errors: ${errorCount} pages`);
  
  if (skippedCount > 0) {
    console.log(`\nCities that need data added to cityData.ts:`);
    cityDirs.forEach(cityDir => {
      const cityKey = cityDir.replace('-dumpster-rental-guide-2025', '').replace('-dumpster-rental-', '');
      if (!cityData[cityKey]) {
        console.log(`  - ${cityKey}`);
      }
    });
  }
  
  console.log(`\nNext steps:`);
  console.log(`1. Add missing city data to cityData.ts for skipped cities`);
  console.log(`2. Run this script again to update remaining cities`);
  console.log(`3. Test your updated pages`);
}

// Run the update
updateCityPages();
