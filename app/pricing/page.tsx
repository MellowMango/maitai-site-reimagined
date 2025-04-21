'use client';

import React, { useState } from 'react';
import DemoModal from '../components/DemoModal';
import { CheckIcon } from '@heroicons/react/20/solid'; // Import CheckIcon

const tiers = [
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '#',
    priceMonthly: '$250',
    priceSuffix: '/ mo per app',
    subPrice: '$0.02 / request after the first 25 k',
    description: 'Get fast, reliable AI performance with custom models, fallback strategies, and real-time observability. Ideal for teams that need uptime, speed, and 24/7 support built-in.',
    features: [
      'Custom models on the fastest compute',
      'Model fallback strategies',
      'Realtime autocorrections & observability',
      '24/7 support',
    ],
    buttonText: 'Get Started',
    mostPopular: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: 'Custom',
    priceSuffix: '', // No suffix needed for Custom
    subPrice: '', // No sub-price for Custom
    description: 'Built for scale, compliance, and control—includes everything in Pro plus custom SLAs, legal support, and advanced governance. Perfect for high-traffic apps that demand white-glove reliability.',
    features: [
      'Everything from Pro',
      'Custom-built governance',
      'Custom SLAs and deployment options',
      'Dedicated legal, compliance, and onboarding support',
      'Advanced observability integrations',
      'High-traffic scaling support',
    ],
    buttonText: 'Contact Us',
    mostPopular: false, // Or true if you want to highlight it
  },
];

export default function PricingPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleButtonClick = (tierName: string) => {
    // You could potentially pass the tier name to the modal if needed
    console.log(`Button clicked for tier: ${tierName}`);
    setDemoModalOpen(true);
  };

  return (
    <>
      <div className="bg-maitai-mint-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-maitai-rum">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-maitai-vampire-black sm:text-5xl">
              Flexible and transparent pricing for established & growing teams
            </p>
          </div>
          {/* Removed subheadline - integrated into main headline */}

          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 ${tierIdx === 0 ? 'lg:rounded-r-none' : ''} ${tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : ''}`}
              >
                <div>
                  <h3 id={tier.id} className="text-base font-semibold leading-7 text-maitai-rum">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                    {tier.priceSuffix && (
                      <span className="text-base font-semibold leading-7 text-gray-600">{tier.priceSuffix}</span>
                    )}
                  </div>
                  {tier.subPrice && (
                     <p className="mt-1 text-sm leading-6 text-gray-500">{tier.subPrice}</p>
                  )}
                  <p className="mt-6 text-base leading-7 text-gray-600">{tier.description}</p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-maitai-lime" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleButtonClick(tier.name)}
                  aria-describedby={tier.id}
                  className="mt-8 block rounded-md bg-maitai-rum px-3.5 py-2.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-rum"
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal open={demoModalOpen} setOpen={setDemoModalOpen} />
    </>
  );
}
