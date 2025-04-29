'use client';

import { Button } from '@/components/ui/button';
// import { ModeToggle } from '@/components/ModeToggle'; // Removed

// NEW Imports for Landing Page Sections (CONCRETE-06-FULL)
import HeroCarousel from '@/components/HeroCarousel/HeroCarousel';
import PerformanceSection from '@/components/PerformanceSection/PerformanceSection';
import ComplianceStrip from '@/components/ComplianceStrip';
import BlogEventsCTA from '@/components/BlogEventsCTA';
import FeatureScroller from '@/components/FeatureScroller/FeatureScroller';
import SignUpBanner from '@/components/SignUpBanner';
import DocsAndCode from '@/components/DocsAndCode';
import ClientGrid from '@/components/ClientGrid';

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col">
        {/* ModeToggle container removed */}
        {/* <div className="container mx-auto px-6 lg:px-10 py-8 flex justify-center">
          <ModeToggle />
        </div> */}

        <HeroCarousel />
        <PerformanceSection />
        <ComplianceStrip />
        <BlogEventsCTA />
        <FeatureScroller />
        <SignUpBanner />
        <DocsAndCode />
        <ClientGrid />
      </main>
    </>
  );
} 