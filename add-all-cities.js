const fs = require('fs');
const path = require('path');

// List of all city slugs that need to be added
const citiesToAdd = [
  'american-fork',
  'bountiful', 
  'centerville',
  'clearfield',
  'cottonwood-heights',
  'downtown-salt-lake',
  'eagle-mountain',
  'fairpark',
  'farmington',
  'glendale',
  'herriman',
  'holladay',
  'kaysville',
  'kearns',
  'layton',
  'lehi',
  'magna',
  'midvale',
  'millcreek',
  'north-salt-lake',
  'ogden',
  'orem',
  'park-city',
  'pleasant-grove',
  'poplar-grove',
  'provo',
  'riverton',
  'roy',
  'saratoga-springs',
  'south-jordan',
  'south-salt-lake',
  'sugar-house',
  'syracuse',
  'taylorsville',
  'tooele',
  'west-valley-city',
  'woods-cross',
  'bluffdale'
];

// City data template
const cityTemplate = (citySlug, cityName, phoneNumber, latitude, longitude) => `  '${citySlug}': {
    cityName: '${cityName}',
    citySlug: '${citySlug}',
    state: 'UT',
    phoneNumber: '${phoneNumber}',
    latitude: '${latitude}',
    longitude: '${longitude}',
    landmarks: [
      {
        name: '${cityName} City Hall',
        address: 'City Hall Address',
        url: 'https://www.${citySlug.replace('-', '')}.utah.gov/',
      },
      {
        name: '${cityName} Park',
        address: 'Local Park Address',
        url: 'https://www.google.com/maps/search/${encodeURIComponent(cityName + ' Park')}',
      },
    ],
    businessDistricts: [
      {
        name: '${cityName} Central',
        description: 'Major retail and dining district',
        link: '/dumpster-rental',
      },
      {
        name: '${cityName} East',
        description: 'Residential and commercial mix',
        link: '/dumpster-rental',
      },
      {
        name: '${cityName} West',
        description: 'Industrial and commercial area',
        link: '/dumpster-rental',
      },
    ],
    permitInfo: {
      cityName: '${cityName}',
      phoneNumber: '${phoneNumber}',
      requirements: 'Contact ${cityName} for permit requirements and applications. We can help guide you through the process.',
    },
    contentSections: {
      overview: 'Icon Dumpsters provides reliable dumpster rental services throughout ${cityName}, Utah. Whether you\\'re tackling a home renovation, construction project, or major cleanup, we have the right dumpster size for your needs.',
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
      whyChooseUs: 'When you need reliable dumpster rental services in ${cityName}, Icon Dumpsters stands out as your trusted local partner. Our commitment to excellence and deep understanding of ${cityName}\\'s unique needs makes us the preferred choice for residents and businesses alike.',
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
      localInfo: '${cityName} is home to several popular attractions and landmarks. Whether you\\'re working on a project near these areas or just exploring the city, we\\'re here to help with your dumpster rental needs.',
      serviceAreas: 'We provide dumpster rental services throughout ${cityName}, including areas near popular attractions and business districts. Our same-day delivery ensures you get your dumpster when and where you need it.',
    },
  },`;

// City name mappings
const cityNames = {
  'american-fork': 'American Fork',
  'bountiful': 'Bountiful',
  'centerville': 'Centerville',
  'clearfield': 'Clearfield',
  'cottonwood-heights': 'Cottonwood Heights',
  'downtown-salt-lake': 'Downtown Salt Lake',
  'eagle-mountain': 'Eagle Mountain',
  'fairpark': 'Fairpark',
  'farmington': 'Farmington',
  'glendale': 'Glendale',
  'herriman': 'Herriman',
  'holladay': 'Holladay',
  'kaysville': 'Kaysville',
  'kearns': 'Kearns',
  'layton': 'Layton',
  'lehi': 'Lehi',
  'magna': 'Magna',
  'midvale': 'Midvale',
  'millcreek': 'Millcreek',
  'north-salt-lake': 'North Salt Lake',
  'ogden': 'Ogden',
  'orem': 'Orem',
  'park-city': 'Park City',
  'pleasant-grove': 'Pleasant Grove',
  'poplar-grove': 'Poplar Grove',
  'provo': 'Provo',
  'riverton': 'Riverton',
  'roy': 'Roy',
  'saratoga-springs': 'Saratoga Springs',
  'south-jordan': 'South Jordan',
  'south-salt-lake': 'South Salt Lake',
  'sugar-house': 'Sugar House',
  'syracuse': 'Syracuse',
  'taylorsville': 'Taylorsville',
  'tooele': 'Tooele',
  'west-valley-city': 'West Valley City',
  'woods-cross': 'Woods Cross',
  'bluffdale': 'Bluffdale'
};

// Default coordinates (you can update these with actual coordinates)
const defaultCoords = {
  'american-fork': ['40.3769', '-111.7958'],
  'bountiful': ['40.8894', '-111.8808'],
  'centerville': ['40.9180', '-111.8722'],
  'clearfield': ['41.1108', '-112.0261'],
  'cottonwood-heights': ['40.6197', '-111.8102'],
  'downtown-salt-lake': ['40.7608', '-111.8910'],
  'eagle-mountain': ['40.3141', '-112.0069'],
  'fairpark': ['40.7608', '-111.8910'],
  'farmington': ['40.9805', '-111.8874'],
  'glendale': ['40.7608', '-111.8910'],
  'herriman': ['40.5141', '-112.0329'],
  'holladay': ['40.6688', '-111.8247'],
  'kaysville': ['41.0352', '-111.9386'],
  'kearns': ['40.6599', '-112.0093'],
  'layton': ['41.0602', '-111.9711'],
  'lehi': ['40.3916', '-111.8508'],
  'magna': ['40.7091', '-112.1016'],
  'midvale': ['40.6110', '-111.8995'],
  'millcreek': ['40.6895', '-111.8291'],
  'north-salt-lake': ['40.8486', '-111.9069'],
  'ogden': ['41.2230', '-111.9738'],
  'orem': ['40.2969', '-111.6946'],
  'park-city': ['40.6461', '-111.4980'],
  'pleasant-grove': ['40.3641', '-111.7385'],
  'poplar-grove': ['40.7608', '-111.8910'],
  'provo': ['40.2338', '-111.6585'],
  'riverton': ['40.5219', '-111.9391'],
  'roy': ['41.1616', '-112.0263'],
  'saratoga-springs': ['40.3491', '-111.9047'],
  'south-jordan': ['40.5622', '-111.9297'],
  'south-salt-lake': ['40.7608', '-111.8910'],
  'sugar-house': ['40.7608', '-111.8910'],
  'syracuse': ['41.0894', '-112.0647'],
  'taylorsville': ['40.6677', '-111.9388'],
  'tooele': ['40.5308', '-112.2983'],
  'west-valley-city': ['40.6916', '-112.0011'],
  'woods-cross': ['40.8716', '-111.8927'],
  'bluffdale': ['40.4897', '-111.9388']
};

// Read the current cityData.ts file
const cityDataPath = path.join(__dirname, 'iconmain', 'app', 'config', 'cityData.ts');
let cityDataContent = fs.readFileSync(cityDataPath, 'utf8');

// Generate city data for each missing city
let newCityData = '';
citiesToAdd.forEach(citySlug => {
  const cityName = cityNames[citySlug];
  const coords = defaultCoords[citySlug] || ['40.7608', '-111.8910']; // Default to SLC if not found
  newCityData += cityTemplate(citySlug, cityName, '801-918-6000', coords[0], coords[1]) + '\n';
});

// Insert the new cities before the closing brace
const insertIndex = cityDataContent.lastIndexOf('  // Continue with more cities...');
if (insertIndex !== -1) {
  cityDataContent = cityDataContent.replace(
    '  // Continue with more cities...',
    newCityData + '  // Continue with more cities...'
  );
} else {
  // If the comment isn't found, insert before the closing brace
  const lastBraceIndex = cityDataContent.lastIndexOf('};');
  cityDataContent = cityDataContent.slice(0, lastBraceIndex) + newCityData + cityDataContent.slice(lastBraceIndex);
}

// Write the updated content back to the file
fs.writeFileSync(cityDataPath, cityDataContent, 'utf8');

console.log('Successfully added all cities to cityData.ts');
console.log('Cities added:', citiesToAdd.length);
