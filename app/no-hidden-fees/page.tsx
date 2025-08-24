import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No Hidden Fees | Icon Dumpsters',
  description: 'What you see is what you pay. Learn exactly what is included in our dumpster rental pricing and how we avoid surprise fees.',
  alternates: { canonical: '/no-hidden-fees' },
};

export default function NoHiddenFeesPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
          <a href="/" className="text-[#4e37a8] hover:underline">Home</a>
          <span className="mx-2">/</span>
          <span>No Hidden Fees</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">No Hidden Fees</h1>
        <p className="text-lg text-gray-700 mb-6">Every quote clearly lists what is included and what could add cost (overweight, special waste, extended rental). No last‑minute surprises.</p>
        <div className="space-y-2 text-gray-700">
          <p>Included: delivery, pickup, standard rental period, landfill fees within allowance.</p>
          <p>We’ll tell you up front if your project needs special handling (concrete, dirt, roofing).</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/#quote-form" className="inline-block bg-[#4e37a8] text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">Get Free Quote</a>
          <a href="tel:801-918-6000" className="inline-block border-2 border-[#4e37a8] text-[#4e37a8] px-6 py-3 rounded-lg font-semibold hover:bg-[#4e37a8] hover:text-white">Call (801) 918-6000</a>
        </div>
      </div>
    </div>
  );
}


