import Hero from "@/components/Hero";
import { Button } from '@/components/ui/button';
import Metrics from '@/components/Metrics';
import FeaturesGrid from '@/components/FeaturesGrid';
import QuickStart from '@/components/QuickStart';
import { ComplianceSection } from "@/components/ComplianceSection";
import PartnersMarquee from "@/components/PartnersMarquee";

export default function HomePage() {
  return (
    <>
      <main className="pt-16">
        <Hero />
        <Metrics />
        <FeaturesGrid />
        <QuickStart />
        <PartnersMarquee />
        <ComplianceSection />
      </main>
    </>
  );
} 