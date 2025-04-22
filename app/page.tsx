import Hero from "@/components/Hero";
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Metrics from '@/components/Metrics';
import FeaturesGrid from '@/components/FeaturesGrid';
import QuickStart from '@/components/QuickStart';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <FeaturesGrid />
      <QuickStart />
      {/* Other sections will go here */}
      {/* <div className=\"container mx-auto py-10\"> */}
      {/*   <h1 className=\"text-3xl font-bold\">Welcome to Maitai</h1> */}
      {/*   <p>Site rebuild in progress...</p> */}
      {/* </div> */}
    </>
  );
} 