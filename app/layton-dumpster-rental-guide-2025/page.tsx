import { Metadata } from 'next';
import ArticleSchema from '../components/ArticleSchema';

export const metadata: Metadata = {
  title: 'Dumpster Rental Layton | Fast Delivery & Affordable Rates | 2025 Guide',
  description: 'Get reliable dumpster rental in Layton, UT. Same-day delivery, competitive pricing, and professional service. 10-40 yard dumpsters available. Call (801) 555-0123 for instant quote!',
  keywords: 'dumpster rental layton, layton dumpster rental, roll-off dumpster layton, construction dumpster layton, waste disposal layton',
  openGraph: {
    title: 'Dumpster Rental Layton | Fast Delivery & Affordable Rates',
    description: 'Professional dumpster rental services in Layton, UT. Same-day delivery, competitive pricing, and reliable waste disposal solutions.',
    type: 'article',
    publishedTime: '2025-01-15T08:00:00.000Z',
    authors: ['Layton Dumpster Rental Team'],
    tags: ['dumpster rental', 'layton', 'waste disposal', 'construction', 'utah'],
  },
};

export default function LaytonDumpsterRentalGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleSchema
        title="Dumpster Rental Layton: Complete Guide for 2025"
        description="Comprehensive guide to dumpster rental services in Layton, UT. Learn about pricing, sizes, permits, and best practices for waste disposal."
        publishedTime="2025-01-15T08:00:00.000Z"
        modifiedTime="2025-01-15T08:00:00.000Z"
        authorName="Layton Dumpster Rental Team"
        imageUrl="/images/dumpster500x200-1.jpeg"
      />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dumpster Rental Layton: Complete Guide for 2025
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Professional dumpster rental services in Layton, Utah. Get same-day delivery, competitive pricing, and reliable waste disposal solutions for your next project.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>Published: January 15, 2025</span>
            <span className="mx-2">•</span>
            <span>Updated: January 15, 2025</span>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#why-choose" className="hover:underline">Why Choose Layton Dumpster Rental?</a></li>
            <li><a href="#dumpster-sizes" className="hover:underline">Dumpster Sizes Available</a></li>
            <li><a href="#pricing-guide" className="hover:underline">Pricing Guide</a></li>
            <li><a href="#permit-requirements" className="hover:underline">Permit Requirements</a></li>
            <li><a href="#popular-projects" className="hover:underline">Popular Projects in Layton</a></li>
            <li><a href="#best-practices" className="hover:underline">Best Practices</a></li>
            <li><a href="#environmental-impact" className="hover:underline">Environmental Impact</a></li>
            <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <section id="why-choose" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Layton Dumpster Rental?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Same-Day Delivery</h3>
              <p className="text-gray-600">Get your dumpster delivered within hours of your order. Perfect for urgent projects and last-minute cleanups.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Pricing</h3>
              <p className="text-gray-600">Transparent pricing with no hidden fees. Get the best value for your money with our affordable rates.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Service</h3>
              <p className="text-gray-600">Experienced team with years of service in the Layton area. We know the local regulations and requirements.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">Choose your delivery and pickup dates. We work around your schedule, not ours.</p>
            </div>
          </div>
        </section>

        <section id="dumpster-sizes" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Dumpster Sizes Available</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">10 Yard</h3>
              <p className="text-gray-600 mb-4">Perfect for small cleanups and renovations</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Kitchen remodel</li>
                <li>• Garage cleanup</li>
                <li>• Small deck removal</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">15 Yard</h3>
              <p className="text-gray-600 mb-4">Ideal for medium-sized projects</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bathroom renovation</li>
                <li>• Basement cleanup</li>
                <li>• Roof replacement</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">20 Yard</h3>
              <p className="text-gray-600 mb-4">Great for larger renovations</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Whole house cleanup</li>
                <li>• Large deck removal</li>
                <li>• Commercial projects</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">30-40 Yard</h3>
              <p className="text-gray-600 mb-4">For major construction projects</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• New construction</li>
                <li>• Major demolition</li>
                <li>• Large commercial jobs</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="pricing-guide" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing Guide</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">10 Yard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 Days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$299</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Small cleanups</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">15 Yard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 Days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$399</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medium projects</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">20 Yard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 Days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$499</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Large renovations</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">30 Yard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 Days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$699</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Major projects</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">*Prices include delivery, pickup, and disposal. Additional days available for $25/day.</p>
        </section>

        <section id="permit-requirements" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Permit Requirements in Layton</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              In Layton, dumpster permits are generally not required for residential properties when the dumpster is placed on private property. However, there are some important considerations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Dumpsters must be placed on private property (driveway, yard, etc.)</li>
              <li>If placing on the street or sidewalk, a permit is required from the city</li>
              <li>Commercial properties may require additional permits</li>
              <li>Always check with Layton City Hall for specific requirements</li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Contact Information</h4>
              <p className="text-blue-800">Layton City Hall: (801) 336-3900</p>
              <p className="text-blue-800">Address: 437 N Wasatch Dr, Layton, UT 84041</p>
            </div>
          </div>
        </section>

        <section id="popular-projects" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Projects in Layton</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Home Renovations</h3>
              <p className="text-gray-600 mb-3">Layton's growing community often needs home updates and renovations. Our dumpsters are perfect for:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Kitchen and bathroom remodels</li>
                <li>Basement finishing projects</li>
                <li>Deck and patio construction</li>
                <li>Roof replacement debris</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Cleanups</h3>
              <p className="text-gray-600 mb-3">Spring cleaning and property maintenance in Layton:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Yard waste and landscaping debris</li>
                <li>Garage and attic cleanouts</li>
                <li>Old furniture and appliance removal</li>
                <li>Construction material disposal</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="best-practices" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices for Dumpster Rental</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Loading Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Break down large items to maximize space</li>
                <li>Load heavy items at the bottom</li>
                <li>Distribute weight evenly</li>
                <li>Don't overfill beyond the fill line</li>
                <li>Keep the dumpster accessible for pickup</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What Not to Include</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Hazardous materials (paint, chemicals)</li>
                <li>Electronics and appliances</li>
                <li>Medical waste</li>
                <li>Food waste</li>
                <li>Liquids</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="environmental-impact" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Environmental Impact</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              We're committed to responsible waste disposal and environmental protection in Layton. Our services include:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Recycling Programs</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Construction material recycling</li>
                  <li>Metal and wood processing</li>
                  <li>Concrete and asphalt recycling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Proper Disposal</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Licensed disposal facilities</li>
                  <li>Environmental compliance</li>
                  <li>Waste reduction strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How quickly can I get a dumpster delivered?</h3>
              <p className="text-gray-600">We offer same-day delivery for orders placed before 2 PM. Next-day delivery is available for orders placed after 2 PM.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I need the dumpster longer than 7 days?</h3>
              <p className="text-gray-600">Additional days are available for $25 per day. Just let us know when you need the dumpster picked up.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer commercial dumpster services?</h3>
              <p className="text-gray-600">Yes, we provide dumpster rental services for commercial projects in Layton. Contact us for custom pricing and scheduling.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I place the dumpster on the street?</h3>
              <p className="text-gray-600">Street placement requires a permit from Layton City Hall. We recommend placing the dumpster on your private property when possible.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept cash, check, and all major credit cards. Payment is due upon delivery.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white p-8 rounded-lg text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-6">Get your dumpster delivered to Layton today!</p>
          <div className="space-y-4">
            <p className="text-2xl font-bold">Call (801) 555-0123</p>
            <p className="text-lg">or</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Instant Quote
            </button>
          </div>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/salt-lake-city-dumpster-rental-guide-2025" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Dumpster Rental Salt Lake City</h3>
              <p className="text-gray-600 text-sm">Complete guide to dumpster rental in Salt Lake City</p>
            </a>
            <a href="/farmington-dumpster-rental-guide-2025" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Dumpster Rental Farmington</h3>
              <p className="text-gray-600 text-sm">Professional dumpster services in Farmington</p>
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}
