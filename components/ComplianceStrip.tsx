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
      // COMP-1: Restyle for light mode
      className="py-8 md:py-10 bg-slate-100 text-gray-900" // Updated bg and default text
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
                // COMP-1: Updated border
                className="border border-slate-200 rounded-md p-4 md:p-5 flex flex-col space-y-2 flex-1 min-w-[240px] sm:min-w-[200px] max-w-xs"
              >
                <div className="flex items-center space-x-2.5">
                  {/* COMP-1: Updated dot color */}
                  <span className="block w-2.5 h-2.5 bg-gray-900 rounded-full flex-shrink-0"></span>
                  <h3
                    id={`compliance-card-heading-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                    // Slightly smaller title text
                    // COMP-1: Text color inherited from section
                    className="text-sm md:text-base font-semibold tracking-wide uppercase"
                  >
                    {card.title}
                  </h3>
                </div>
                {/* COMP-1: Updated description text color */}
                <p className="text-xs md:text-sm text-gray-600 leading-snug">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Heading Text */}
          {/* Adjusted text alignment and size */}
          <div className="text-center lg:text-right flex-shrink-0 mt-6 lg:mt-0">
            {/* COMP-1: Updated heading text colors */}
            <h2 id="compliance-heading" className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-1">
              Enterprise-grade security
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-600">
              and data governance
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComplianceStrip;
