import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choose Your Dumpster Size | Icon Dumpsters',
  description: 'Learn how to choose between 15, 20, and 30-yard roll-off dumpsters based on project scope, debris type, and space.',
  alternates: { canonical: '/choose-dumpster-size' },
};

export default function ChooseDumpsterSizePage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
          <a href="/" className="text-[#4e37a8] hover:underline">Home</a>
          <span className="mx-2">/</span>
          <span>Choose Dumpster Size</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Dumpster Size</h1>
        <p className="text-lg text-gray-700 mb-6">Compare sizes, capacities, and best uses to pick the right dumpster for your project.</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>15-yard: small cleanouts, bathroom/kitchen remodels</li>
          <li>20-yard: medium renovations, roofing, basement cleanouts</li>
          <li>30-yard: major construction, whole-home cleanouts</li>
        </ul>
      </div>
    </div>
  );
}


