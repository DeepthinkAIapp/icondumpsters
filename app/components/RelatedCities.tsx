import Link from 'next/link';

interface RelatedCitiesProps {
  currentCity?: string;
  county?: string;
}

export default function RelatedCities({ currentCity, county }: RelatedCitiesProps) {
  // Define related cities based on county or proximity
  const getRelatedCities = () => {
    if (county) {
      switch (county.toLowerCase()) {
        case 'salt lake county':
          return [
            { name: 'Salt Lake City', url: '/salt-lake-city', description: 'Utah\'s capital city' },
            { name: 'West Valley City', url: '/west-valley-city', description: 'Second largest city in Utah' },
            { name: 'West Jordan', url: '/west-jordan', description: 'Growing suburban community' },
            { name: 'Sandy', url: '/sandy', description: 'Family-friendly city with great amenities' },
            { name: 'Murray', url: '/murray', description: 'Central location with easy access' },
            { name: 'Taylorsville', url: '/taylorsville', description: 'Convenient suburban location' }
          ];
        
        case 'utah county':
          return [
            { name: 'Provo', url: '/provo', description: 'Home to BYU and beautiful mountains' },
            { name: 'Orem', url: '/orem', description: 'Family-oriented community' },
            { name: 'Lehi', url: '/lehi', description: 'Tech hub with Silicon Slopes' },
            { name: 'American Fork', url: '/american-fork', description: 'Historic city with modern amenities' },
            { name: 'Spanish Fork', url: '/spanish-fork', description: 'Gateway to southern Utah County' },
            { name: 'Springville', url: '/springville', description: 'Art city with small-town charm' }
          ];
        
        case 'davis county':
          return [
            { name: 'Layton', url: '/layton', description: 'Major commercial and residential hub' },
            { name: 'Bountiful', url: '/bountiful', description: 'Historic city with mountain views' },
            { name: 'Kaysville', url: '/kaysville', description: 'Family-friendly community' },
            { name: 'Farmington', url: '/farmington', description: 'Home to Lagoon amusement park' },
            { name: 'Clearfield', url: '/clearfield', description: 'Near Hill Air Force Base' },
            { name: 'Centerville', url: '/centerville', description: 'Quiet residential community' }
          ];
        
        case 'weber county':
          return [
            { name: 'Ogden', url: '/ogden', description: 'Historic railroad city' },
            { name: 'Roy', url: '/roy', description: 'Near Hill Air Force Base' },
            { name: 'Clearfield', url: '/clearfield', description: 'Military community' },
            { name: 'Layton', url: '/layton', description: 'Major commercial center' },
            { name: 'Kaysville', url: '/kaysville', description: 'Family-oriented community' },
            { name: 'Bountiful', url: '/bountiful', description: 'Historic city with amenities' }
          ];
        
        default:
          return [
            { name: 'Salt Lake City', url: '/salt-lake-city', description: 'Utah\'s capital city' },
            { name: 'Provo', url: '/provo', description: 'Home to BYU' },
            { name: 'West Valley City', url: '/west-valley-city', description: 'Second largest city' },
            { name: 'Sandy', url: '/sandy', description: 'Family-friendly community' },
            { name: 'Orem', url: '/orem', description: 'University city' },
            { name: 'Layton', url: '/layton', description: 'Major commercial hub' }
          ];
      }
    }
    
    // Default related cities for any location
    return [
      { name: 'Salt Lake City', url: '/salt-lake-city', description: 'Utah\'s capital city' },
      { name: 'Provo', url: '/provo', description: 'Home to BYU' },
      { name: 'West Valley City', url: '/west-valley-city', description: 'Second largest city' },
      { name: 'Sandy', url: '/sandy', description: 'Family-friendly community' },
      { name: 'Orem', url: '/orem', description: 'University city' },
      { name: 'Layton', url: '/layton', description: 'Major commercial hub' }
    ];
  };

  const relatedCities = getRelatedCities().filter(city => city.name !== currentCity);

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {county ? `Other Cities in ${county}` : 'Nearby Cities We Serve'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCities.slice(0, 6).map((city, index) => (
          <Link 
            key={index}
            href={city.url}
            className="group block p-6 border border-gray-200 rounded-lg hover:border-[#4e37a8] hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#4e37a8] mb-2">
              {city.name} Dumpster Rental
            </h3>
            <p className="text-gray-600 text-sm">
              {city.description}
            </p>
            <div className="mt-3 text-[#4e37a8] font-medium text-sm group-hover:underline">
              View Services →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
