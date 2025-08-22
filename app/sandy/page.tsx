'use client';

import Image from "next/image";
import ImageWithFallback from "../components/ImageWithFallback";
import DumpsterCalculator from "../components/DumpsterCalculator";
import QuoteForm from "../components/QuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dumpster Rental Sandy, UT | Icon Dumpsters - Same Day Delivery",
  description: "Professional dumpster rental in Sandy, Utah. Get same-day delivery for 15-30 yard roll-off dumpsters. Serving Sandy and Salt Lake County. Call (801) 918-6000 for free quote!",
  keywords: "dumpster rental sandy ut, sandy dumpster rental, roll-off dumpster sandy, construction dumpster sandy utah, sandy waste disposal, dumpster rental near me sandy",
  openGraph: {
    title: "Dumpster Rental Sandy, UT | Icon Dumpsters",
    description: "Professional dumpster rental services in Sandy, Utah. Same-day delivery, competitive pricing, and reliable service.",
    url: "https://www.icondumpsters.com/sandy",
    siteName: "Icon Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental Sandy, UT | Icon Dumpsters",
    description: "Professional dumpster rental services in Sandy, Utah. Same-day delivery and competitive pricing.",
  },
  alternates: {
    canonical: "https://www.icondumpsters.com/sandy",
  },
};

export default function SandyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Dumpster Rental Sandy, UT
        </h1>
        <p className="text-lg text-gray-600">
          Professional dumpster rental services in Sandy, Utah. Get same-day delivery for 15-30 yard roll-off dumpsters.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Icon Dumpsters in Sandy?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Same-day delivery to Sandy and surrounding areas</li>
            <li>Competitive pricing with no hidden fees</li>
            <li>Flexible rental periods (1-30 days)</li>
            <li>Professional customer service</li>
            <li>Local knowledge of Sandy regulations</li>
            <li>Multiple dumpster sizes available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
