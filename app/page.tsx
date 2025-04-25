import Hero from "@/components/Hero";
import { Button } from '@/components/ui/button';
import Metrics from '@/components/Metrics';
import FeaturesGrid from '@/components/FeaturesGrid';
import QuickStart from '@/components/QuickStart';
import { ComplianceSection } from "@/components/ComplianceSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import InteractiveDemos from '@/components/InteractiveDemos';

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col">
        <Hero />
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