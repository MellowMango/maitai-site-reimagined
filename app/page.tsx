import Hero from "@/components/Hero";
import { Button } from '@/components/ui/button';
import Metrics from '@/components/Metrics';
import FeaturesGrid from '@/components/FeaturesGrid';
import QuickStart from '@/components/QuickStart';
import { ComplianceSection } from "@/components/ComplianceSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import PortalScrub from '@/components/PortalScrub';

export default function HomePage() {
  // Feature flag to show interactive UI demos
  const showUiDemos = process.env.NEXT_PUBLIC_SHOW_UI_DEMOS === 'true';

  return (
    <>
      <main className="flex flex-col">
        <Hero />
        <Metrics />
        <FeaturesGrid />
        <QuickStart />

        {/* Conditionally render PortalScrub */}
        {showUiDemos && <PortalScrub />}

        <PartnersMarquee />
        {/* <ComplianceSection /> */ /* Temporarily commented out as it might be removed/reworked? */}
      </main>
    </>
  );
} 