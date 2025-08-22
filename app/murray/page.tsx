'use client';

export default function MurrayPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Dumpster Rental Murray, UT
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Professional dumpster rental services in Murray, Utah. Get same-day delivery for 15-30 yard roll-off dumpsters.
        </p>
        
        <div className="bg-gray-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Icon Dumpsters in Murray?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Same-day delivery to Murray and surrounding areas</li>
            <li>Competitive pricing with no hidden fees</li>
            <li>Flexible rental periods (1-30 days)</li>
            <li>Professional customer service</li>
            <li>Local knowledge of Murray regulations</li>
            <li>Multiple dumpster sizes available</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Murray Service Areas</h2>
          <p className="text-gray-600 mb-4">We serve all of Murray and surrounding communities:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Murray Areas:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Downtown Murray</li>
                <li>• Murray Park Area</li>
                <li>• Murray Highlands</li>
                <li>• Murray East</li>
                <li>• Murray West</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Nearby Cities:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Midvale</li>
                <li>• Sandy</li>
                <li>• South Salt Lake</li>
                <li>• Taylorsville</li>
                <li>• West Valley City</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
