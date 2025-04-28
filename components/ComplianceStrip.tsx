import React from 'react';
import { cn } from '@/lib/utils';

// Data for the compliance cards based on the image
const complianceCards = [
  {
    title: 'SOC2 TYPE II',
    description: "Enterprise level security for the world's largest companies.",
  },
  {
    title: 'GDPR',
    description: 'We protect your data wherever you are in the world.',
  },
  {
    title: 'CCPA',
    description: 'We ensure policies and processes comply with your requirements.',
  },
];

const ComplianceStrip = () => {
  return (
    <section
      aria-labelledby="compliance-heading"
      // Using dark purple tones from brand guidelines for the gradient
      className="py-8 md:py-10 bg-gradient-to-r from-[#200F34] to-[#31174F] text-white"
    >
      <div className="container mx-auto px-4">
        {/* Main horizontal layout: flex row, wrap items, justify center/between */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">

          {/* Flex container for the cards, allows wrapping on smaller screens */}
          {/* Use flex-wrap to allow cards to stack if needed */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 md:gap-6 lg:gap-8">
            {/* Map through the cards */}
            {complianceCards.map((card) => (
              <div
                key={card.title}
                // Reduced padding, set a flex-basis/max-width for better wrapping control
                className="border border-gray-600 rounded-md p-4 md:p-5 flex flex-col space-y-2 flex-1 min-w-[240px] sm:min-w-[200px] max-w-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="block w-2.5 h-2.5 bg-white rounded-full flex-shrink-0"></span>
                  <h3
                    id={`compliance-card-heading-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                    // Slightly smaller title text
                    className="text-sm md:text-base font-semibold tracking-wide uppercase"
                  >
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-snug">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Heading Text */}
          {/* Adjusted text alignment and size */}
          <div className="text-center lg:text-right flex-shrink-0 mt-6 lg:mt-0">
            <h2 id="compliance-heading" className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-100 mb-1">
              Enterprise-grade security
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-400">
              and data governance
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComplianceStrip;
