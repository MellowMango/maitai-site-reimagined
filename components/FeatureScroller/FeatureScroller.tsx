'use client';

import React, { useState, useRef, useEffect } from 'react';
import { features, Feature } from '@/lib/features'; // Import features data
import { cn } from '@/lib/utils';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'; // Import framer-motion for scroll animations

const FeatureScroller = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(
    features.length > 0 ? features[0].id : null
  );
  const featureContainerRef = useRef<HTMLDivElement>(null);

  // TODO: Implement scroll spy logic using useScroll or IntersectionObserver
  // For now, we just have a placeholder state

  const handleFeatureClick = (id: string) => {
    setActiveFeatureId(id);
    // TODO: Implement smooth scroll to the corresponding element in the right panel
    const element = document.getElementById(`feature-content-${id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Add a section title if desired */}
        {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Core Features</h2> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 relative">

          {/* Left Column: Sticky Feature List */}
          <div className="lg:sticky lg:top-24 h-fit order-last lg:order-first">
            <ul className="space-y-1">
              {features.map((feature) => (
                <li key={feature.id}>
                  <button
                    onClick={() => handleFeatureClick(feature.id)}
                    className={cn(
                      'w-full text-left p-3 md:p-4 rounded-md transition-colors duration-200 font-medium',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-maitai-lagoon',
                      activeFeatureId === feature.id
                        ? 'bg-maitai-lagoon/10 text-maitai-lagoon' // Active state style
                        : 'text-gray-500 hover:bg-gray-200/60 hover:text-gray-700' // Default state style
                    )}
                  >
                    {feature.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Feature Content Area */}
          <div ref={featureContainerRef} className="lg:col-span-2 space-y-16 scroll-mt-24">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                id={`feature-content-${feature.id}`} // ID for scrolling to
                className="min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg p-8 shadow"
                // Add scroll margin if needed, e.g., scroll-m-24
              >
                {/* Placeholder Content - Replace with actual image/component later */}
                <div className="text-center">
                   <h3 className="text-2xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
                   <p className="text-gray-600 max-w-md mx-auto">{feature.description}</p>
                   {/* Placeholder for image/graphic */}
                   <div className="mt-6 text-sm text-gray-500">(Feature Visualization Area {index + 1})</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureScroller;
