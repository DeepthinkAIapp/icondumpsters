import { Metadata } from 'next'
import ImageWithFallback from '../../components/ImageWithFallback'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home Renovation Waste Disposal Guide: Complete 2025 Guide',
  description: 'Master home renovation waste disposal with our comprehensive guide. Learn about dumpster rental, waste sorting, recycling tips, and cost-effective disposal strategies for your renovation project.',
  keywords: 'home renovation waste disposal, renovation dumpster rental, construction waste management, home improvement waste, renovation cleanup, waste disposal guide',
  openGraph: {
    title: 'Home Renovation Waste Disposal Guide: Complete 2025 Guide',
    description: 'Master home renovation waste disposal with our comprehensive guide. Learn about dumpster rental, waste sorting, recycling tips, and cost-effective disposal strategies for your renovation project.',
    type: 'article',
    url: 'https://iconmain.com/blog/home-renovation-waste-disposal-guide',
    images: [
      {
        url: '/images/blog/home-renovation-waste-disposal.jpg',
        width: 1200,
        height: 630,
        alt: 'Home renovation waste disposal guide with dumpster rental tips'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Renovation Waste Disposal Guide: Complete 2025 Guide',
    description: 'Master home renovation waste disposal with our comprehensive guide. Learn about dumpster rental, waste sorting, recycling tips, and cost-effective disposal strategies for your renovation project.',
    images: ['/images/blog/home-renovation-waste-disposal.jpg']
  },
  canonical: 'https://iconmain.com/blog/home-renovation-waste-disposal-guide',
  robots: 'index, follow'
}

export default function HomeRenovationWasteDisposalGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4e37a8] via-purple-700 to-[#4e37a8] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Home Renovation Waste Disposal Guide
          </h1>
          <p className="text-xl text-purple-100 leading-relaxed">
            Complete guide to managing waste during home renovations, including dumpster rental, 
            waste sorting, and eco-friendly disposal methods.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <nav className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <a href="#planning" className="block text-purple-600 hover:text-purple-800 transition-colors">
                  1. Planning Your Waste Disposal Strategy
                </a>
                <a href="#waste-types" className="block text-purple-600 hover:text-purple-800 transition-colors">
                  2. Understanding Different Types of Renovation Waste
                </a>
                <a href="#dumpster-rental" className="block text-purple-600 hover:text-purple-800 transition-colors">
                  3. Dumpster Rental for Home Renovations
                </a>
              </div>
              <div>
                <a href="#waste-sorting" className="block text-purple-600 hover:text-purple-800 transition-colors">
                  4. Waste Sorting and Recycling Strategies
                </a>
                <a href="#cost-management" className="block text-purple-600 hover:text-purple-800 transition-colors">
                  5. Cost Management and Budgeting
                </a>
                <a href="#safety-compliance" className="block text-purple-600 hover:text-purple-800 transition-colors">
                  6. Safety and Compliance Considerations
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* Article Content */}
        <div className="prose max-w-none">
          <section id="planning">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Planning Your Waste Disposal Strategy</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Before you start swinging a hammer, it's crucial to plan your waste disposal strategy. 
              A well-thought-out plan can save you time, money, and headaches throughout your renovation project.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Start by assessing the scope of your renovation and estimating the amount of waste you'll generate. 
              This will help you determine the right dumpster size and disposal methods for your specific project.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Pro Tip</h3>
              <p className="text-blue-800">
                Always overestimate your waste volume by 20-30%. It's better to have a slightly larger dumpster 
                than to run out of space mid-project and need additional pickups.
              </p>
            </div>
          </section>

          <section id="waste-types" className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Different Types of Renovation Waste</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Not all renovation waste is created equal. Understanding the different categories will help you 
              dispose of materials properly and potentially save money through recycling and reuse.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">General Construction Debris</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Drywall and plaster
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Wood scraps and lumber
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Concrete and masonry
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Insulation materials
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hazardous Materials</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Lead paint (pre-1978 homes)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Asbestos-containing materials
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Chemical solvents and adhesives
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mercury-containing devices
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="dumpster-rental" className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dumpster Rental for Home Renovations</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Choosing the right dumpster size and rental duration is crucial for efficient waste management. 
              Here's what you need to know about dumpster rental for home renovations.
            </p>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                <h3 className="text-2xl font-bold">Dumpster Size Guide for Home Renovations</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold text-purple-900">10-15 Yard</h4>
                      <p className="text-sm text-purple-700">Small renovations</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Perfect for bathroom remodels, small kitchen updates, or single-room projects
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold text-purple-900">20-30 Yard</h4>
                      <p className="text-sm text-purple-700">Medium renovations</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ideal for kitchen remodels, basement finishing, or multi-room projects
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold text-purple-900">40 Yard</h4>
                      <p className="text-sm text-purple-700">Large renovations</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Best for whole-house renovations, additions, or major structural changes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="waste-sorting" className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Waste Sorting and Recycling Strategies</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Proper waste sorting can significantly reduce disposal costs and environmental impact. 
              Many renovation materials can be recycled or reused, saving you money while helping the planet.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-8">
              <h3 className="text-xl font-semibold text-green-900 mb-3">Recycling Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
                <div>
                  <h4 className="font-semibold mb-2">Metals</h4>
                  <p>Copper, aluminum, steel - often have scrap value</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Wood</h4>
                  <p>Untreated lumber can be reused or chipped for mulch</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Concrete</h4>
                  <p>Can be crushed and reused as aggregate</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Appliances</h4>
                  <p>Many contain valuable metals and components</p>
                </div>
              </div>
            </div>
          </section>

          <section id="cost-management" className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost Management and Budgeting</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Understanding the costs associated with waste disposal will help you budget effectively 
              and avoid unexpected expenses during your renovation project.
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Typical Waste Disposal Costs</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">10-15 Yard Dumpster</span>
                  <span className="text-lg font-semibold text-purple-600">$300 - $500</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">20-30 Yard Dumpster</span>
                  <span className="text-lg font-semibold text-purple-600">$400 - $700</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">40 Yard Dumpster</span>
                  <span className="text-lg font-semibold text-purple-600">$600 - $900</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-700">Additional Pickup (if needed)</span>
                  <span className="text-lg font-semibold text-purple-600">$150 - $300</span>
                </div>
              </div>
            </div>
          </section>

          <section id="safety-compliance" className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety and Compliance Considerations</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Safety should always be your top priority when handling renovation waste. Understanding 
              local regulations and proper handling procedures will keep you and your family safe.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-red-900 mb-4">⚠️ Safety First</h3>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Always wear appropriate PPE (gloves, safety glasses, dust masks)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Never attempt to remove asbestos or lead paint without professional help
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Check local regulations for hazardous waste disposal requirements
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Keep children and pets away from construction waste areas
                </li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 bg-gradient-to-r from-[#4e37a8] to-purple-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Renovation?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Get expert advice on dumpster rental and waste disposal for your home renovation project.
            </p>
            <div className="space-x-4">
              <Link 
                href="/contact" 
                className="inline-block bg-white text-[#4e37a8] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/blog" 
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#4e37a8] transition-colors"
              >
                View More Articles
              </Link>
            </div>
          </section>
        </div>

        {/* Related Articles */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/complete-dumpster-rental-guide-2025" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    Complete Guide to Dumpster Rental in 2025
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Everything you need to know about dumpster rental, from choosing the right size to understanding costs.
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/blog/construction-waste-management-2025" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    Construction Waste Management Strategies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Learn effective strategies for managing construction waste on any project scale.
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/blog/commercial-dumpster-rental-business-solutions" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    Commercial Dumpster Rental Solutions
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Business-focused waste management solutions for commercial renovation projects.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
