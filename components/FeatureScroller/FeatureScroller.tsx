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
  // Ref to store observer instance for cleanup
  const observerRef = useRef<IntersectionObserver | null>(null);

  // FEAT-1: Implement scroll spy logic using IntersectionObserver
  useEffect(() => {
    const featureContentElements = features.map(f => document.getElementById(`feature-content-${f.id}`)).filter(el => el !== null);

    if (featureContentElements.length === 0) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        // Option 1: Update if intersecting at all (simplest)
        // if (entry.isIntersecting) {
        //    const featureId = entry.target.id.replace('feature-content-', '');
        //    setActiveFeatureId(featureId);
        // }

        // Option 2: Update if intersecting more than a threshold (e.g., 50%)
        // Useful if sections are tall
        if (entry.intersectionRatio >= 0.5) { // Adjust threshold as needed
           const featureId = entry.target.id.replace('feature-content-', '');
           setActiveFeatureId(featureId);
        }
      });
    };

    // Adjust rootMargin to trigger slightly before/after exact center if needed
    // top: negative moves trigger line up, bottom: positive moves trigger line down
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '0px 0px -40% 0px', // Trigger when element is ~center viewport vertically
      threshold: 0.5 // Trigger callback when 50% is visible
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    featureContentElements.forEach(el => {
      if (el) observerRef.current?.observe(el);
    });

    // Cleanup function
    return () => {
      observerRef.current?.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleFeatureClick = (id: string) => {
    // Stop the observer temporarily to prevent flickering during scroll
    observerRef.current?.disconnect();
    
    setActiveFeatureId(id);
    const element = document.getElementById(`feature-content-${id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Re-observe after a short delay once scrolling likely finished
    setTimeout(() => {
       const featureContentElements = features.map(f => document.getElementById(`feature-content-${f.id}`)).filter(el => el !== null);
       featureContentElements.forEach(el => {
         if (el) observerRef.current?.observe(el);
       });
    }, 1000); // Adjust delay if needed
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
                      'w-full flex items-center text-left p-3 md:p-4 rounded-md transition-colors duration-200 font-medium',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-maitai-lagoon',
                      activeFeatureId === feature.id
                        ? 'bg-maitai-lagoon/10 text-maitai-lagoon'
                        : 'text-gray-500 hover:bg-gray-200/60 hover:text-gray-700'
                    )}
                  >
                    {/* Animated Indicator Dot */}
                    <motion.span 
                      variants={{
                        inactive: { opacity: 0, width: 0, marginRight: 0 },
                        active: { opacity: 1, width: '0.5rem', marginRight: '0.75rem' }
                      }}
                      initial="inactive" // Start in inactive state without animating initially
                      animate={activeFeatureId === feature.id ? 'active' : 'inactive'}
                      transition={{ duration: 0.2, ease: 'easeInOut' }} // Smooth transition
                      className="inline-block h-2 bg-maitai-lagoon rounded-full flex-shrink-0" // Base styles (height, bg, rounded, shrink)
                      aria-hidden="true"
                    />
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
