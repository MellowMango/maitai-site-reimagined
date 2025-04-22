import { PricingTable } from '@/components/PricingTable';

export default function PricingPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
          Simple, Transparent Pricing
        </h1>
        <PricingTable />
      </div>
    </div>
  );
} 