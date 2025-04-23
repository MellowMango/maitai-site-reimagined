'use client';

import React from 'react';

// Data extracted from the provided image
const complianceItems = [
  {
    name: 'SOC TYPE II',
    description: "Enterprise level security for the world's largest companies."
  },
  {
    name: 'GDPR',
    description: "We protect your data wherever you are in the world."
  },
  {
    name: 'CCPA',
    description: "We ensure policies and processes comply with your requirements."
  },
];

export function ComplianceSection() {
  return (
    <section className="bg-maitai-vampire-black py-16 md:py-24 text-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 leading-tight">
          Enterprise-grade security <br className="hidden md:inline" /> and data governance
        </h2>

        {/* Compliance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {complianceItems.map((item) => (
            <div 
              key={item.name} 
              className="border border-gray-700 rounded-lg p-6 bg-gradient-to-br from-gray-900/30 to-maitai-vampire-black/30 shadow-lg"
            >
              <div className="flex items-center mb-3">
                {/* Simple white circle icon */}
                <span className="inline-block h-2.5 w-2.5 bg-white rounded-full mr-3 flex-shrink-0"></span>
                <h3 className="text-lg font-semibold text-white tracking-wide">
                  {item.name}
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        {/* Note: GDPR currently uses text from image, actual compliance status/details should be verified. */}
      </div>
    </section>
  );
} 