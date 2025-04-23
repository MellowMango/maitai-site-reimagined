'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Feature flag for the new Orchestrator Constellation
const SHOW_CONSTELLATION = process.env.NEXT_PUBLIC_SHOW_CONSTELLATION !== 'false';

// Dynamically import the OrchestratorConstellation component with no SSR for WebGL support
const OrchestratorConstellation = dynamic(
  () => import('@/components/OrchestratorConstellation'),
  { ssr: false }
);

export function Hero() {
  // If the feature flag is enabled, use the new constellation component
  if (SHOW_CONSTELLATION) {
    return <OrchestratorConstellation />;
  }
  
  // Otherwise, use the original Hero component
  return (
    // Updated background to light radial gradient and adjusted text/padding
    <section className="relative overflow-hidden bg-gradient-radial from-green-50 via-blue-50 to-neutral-50 text-maitai-vampire-black py-24 md:py-36">
      {/* Optional: Add absolute positioned decorative elements here if needed */}
      <div className="container relative z-10 mx-auto grid lg:grid-cols-1 gap-12 items-center px-6 lg:px-8"> {/* Changed to single column for text focus */}
        {/* Text Content & CTAs - Centered */}
        <motion.div 
          className="space-y-6 text-center max-w-3xl mx-auto" // Centered text content
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans">
            AI With An Immune System
          </h1>
          {/* Adjusted text color for light background */}
          <p className="text-lg md:text-xl text-gray-700">
            Protect your AI applications from threats and ensure reliable performance with Maitai's proactive security layer.
          </p>
          {/* Wrap Buttons with Link */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="pineapple" size="lg">
                Get a Demo
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-maitai-lagoon text-maitai-lagoon hover:bg-maitai-lagoon/10">
                Start Trial
              </Button>
            </Link>
          </div>
          {/* YC Badge */}
          <div className="pt-6 flex justify-center">
            <Image 
              src="/logos/Backed by YC.png" 
              alt="Backed by Y Combinator S24"
              width={114} // Adjust width/height as needed based on original image size
              height={32}
              priority={false} // Not critical LCP content
            />
          </div>
        </motion.div>

        {/* Removed the right column/image */}
      </div>
    </section>
  );
}

export default Hero; 