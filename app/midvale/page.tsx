'use client';

import Image from "next/image";
import ImageWithFallback from "../components/ImageWithFallback";
import DumpsterCalculator from "../components/DumpsterCalculator";
import QuoteForm from "../components/QuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dumpster Rental Midvale, UT | Icon Dumpsters - Same Day Delivery",
  description: "Professional dumpster rental in Midvale, Utah. Get same-day delivery for 15-30 yard roll-off dumpsters. Serving Midvale and Salt Lake County. Call (801) 918-6000 for free quote!",
  keywords: "dumpster rental midvale ut, midvale dumpster rental, roll-off dumpster midvale, construction dumpster midvale utah, midvale waste disposal, dumpster rental near me midvale",
  openGraph: {
    title: "Dumpster Rental Midvale, UT | Icon Dumpsters",
    description: "Professional dumpster rental services in Midvale, Utah. Same-day delivery, competitive pricing, and reliable service.",
    url: "https://www.icondumpsters.com/midvale",
    siteName: "Icon Dumpsters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental Midvale, UT | Icon Dumpsters",
    description: "Professional dumpster rental services in Midvale, Utah. Same-day delivery and competitive pricing.",
  },
  alternates: {
    canonical: "https://www.icondumpsters.com/midvale",
  },
};

export default function MidvalePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Dumpster Rental Midvale, UT
        </h1>
        <p className="text-lg text-gray-600">
          Professional dumpster rental services in Midvale, Utah. Get same-day delivery for 15-30 yard roll-off dumpsters.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Icon Dumpsters in Midvale?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Same-day delivery to Midvale and surrounding areas</li>
            <li>Competitive pricing with no hidden fees</li>
            <li>Flexible rental periods (1-30 days)</li>
            <li>Professional customer service</li>
            <li>Local knowledge of Midvale regulations</li>
            <li>Multiple dumpster sizes available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
