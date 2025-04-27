'use client'; // Required for ModeToggle and its hooks

import HeroMaitai from '@/components/HeroMaitai';
import { Button } from '@/components/ui/button';
import Metrics from '@/components/Metrics';
import FeaturesGrid from '@/components/FeaturesGrid';
import QuickStart from '@/components/QuickStart';
import { ComplianceSection } from "@/components/ComplianceSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import InteractiveDemos from '@/components/InteractiveDemos';
import { ModeToggle } from '@/components/ModeToggle'; // Import the ModeToggle

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col">
        <HeroMaitai />
        <div className="container mx-auto px-6 lg:px-10 py-8 flex justify-center">
          <ModeToggle />
        </div>
        <Metrics />
        <FeaturesGrid />
        <QuickStart />

        <InteractiveDemos />

        <PartnersMarquee />
        {/* <ComplianceSection /> */ /* Temporarily commented out as it might be removed/reworked? */}
      </main>
    </>
  );
} 