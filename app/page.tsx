import Hero from "@/components/Hero";
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Metrics from '@/components/Metrics';
import FeaturesGrid from '@/components/FeaturesGrid';
import QuickStart from '@/components/QuickStart';
import { ComplianceSection } from "@/components/ComplianceSection";
import PartnersMarquee from "@/components/PartnersMarquee";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <Metrics />
        <FeaturesGrid />
        <QuickStart />
        <PartnersMarquee />
        <ComplianceSection />
      </main>
      <Footer />
    </>
  );
} 