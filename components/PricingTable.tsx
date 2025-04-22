import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PlanCardProps {
  title: string;
  price: string;
  priceDetail?: string;
  ctaLabel: string;
  bullets: string[];
  isEnterprise?: boolean;
}

const PlanCard = ({ title, price, priceDetail, ctaLabel, bullets, isEnterprise = false }: PlanCardProps) => (
  <div className={`flex h-full flex-col rounded-lg border p-6 shadow-sm ${isEnterprise ? 'border-maitai-lime bg-maitai-mint-cream' : 'bg-white'}`}>
    <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-4xl font-bold tracking-tight">{price}</span>
      {priceDetail && <span className="ml-1 text-sm font-medium text-gray-500">{priceDetail}</span>}
    </div>
    <p className="mt-5 text-gray-500">Includes:</p>
    <ul role="list" className="mt-6 flex-1 space-y-4">
      {bullets.map((bullet, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-maitai-lime" aria-hidden="true" />
          <span className="ml-3 text-base text-gray-700">{bullet}</span>
        </li>
      ))}
    </ul>
    <Link href="/demo" passHref legacyBehavior>
      <Button
        asChild
        variant={isEnterprise ? 'default' : 'outline'}
        className={`mt-8 w-full ${isEnterprise ? 'bg-maitai-lime hover:bg-maitai-lime/90 text-white' : 'border-maitai-lagoon text-maitai-lagoon hover:bg-maitai-lagoon/10 hover:text-maitai-lagoon'}`}
      >
        <a>{ctaLabel}</a>
      </Button>
    </Link>
  </div>
);


export function PricingTable() {
  const professionalPlan = {
    title: "Professional",
    price: "$250",
    priceDetail: "/mo per app + $0.02/req after 25k",
    ctaLabel: "Get Started",
    bullets: [
      "Custom models on fastest compute",
      "Model fallback",
      "Real‑time autocorrections",
      "Observability",
      "24/7 support",
    ],
  };

  const enterprisePlan = {
    title: "Enterprise",
    price: "Custom",
    ctaLabel: "Contact Us",
    bullets: [
      "Everything in Professional",
      "Custom SLAs",
      "Legal & compliance",
      "Advanced governance",
      "High‑traffic scaling",
      "Dedicated support",
    ],
  };

  return (
    <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 lg:gap-8 items-start">
        <PlanCard {...professionalPlan} />
        <PlanCard {...enterprisePlan} isEnterprise={true} />
    </div>
  );
} 