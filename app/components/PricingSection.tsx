'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const tiers = [
  {
    name: 'Pro',
    id: 'tier-developer',
    href: '#',
    price: { monthly: '$250', annually: '$2500' }, // Placeholder annual
    priceSuffix: '/mo per app',
    description: 'For teams building production-grade AI applications.',
    features: [
      '25 k requests included per app',
      '$0.02 / request thereafter',
      'Real-time observability dashboard',
      'Email & chat support',
    ],
    mostPopular: false,
  },
  {
    name: 'Custom',
    id: 'tier-team',
    href: '#',
    price: { monthly: 'Contact Us', annually: 'Contact Us' },
    description: 'Tailored solutions for specific enterprise needs.',
    features: [
      'Unlimited API calls',
      'Custom SLAs & governance',
      'Dedicated support manager',
      'Volume discounts',
      'On-premise deployment option',
    ],
    mostPopular: true,
  },
  // Add Enterprise tier if needed
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function PricingSection() {
  // Basic state for monthly/annual toggle - could be added later
  // const [frequency, setFrequency] = useState('monthly');

  return (
    <section id="pricing" className="bg-maitai-mint-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-maitai-rum font-greycliff">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-maitai-vampire-black sm:text-5xl font-greycliff">
            Simple, transparent pricing
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-900 font-greycliff">
          Choose the plan that best fits your needs. Scale up or down anytime.
        </p>

        {/* Pricing Grid */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-maitai-lime shadow-lg' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8 xl:p-10 bg-white'
              )}
            >
              <h3 id={tier.id} className="text-lg font-semibold leading-8 text-black font-greycliff">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-900">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                {tier.priceSuffix && (
                  <span className="text-sm font-semibold leading-6 text-gray-600">{tier.priceSuffix}</span>
                )}
                {!tier.priceSuffix && tier.price.monthly !== 'Contact Us' && (
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                )}
              </p>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-maitai-lime text-white shadow-sm hover:bg-maitai-lime/90 focus-visible:outline-maitai-lime'
                    : 'text-maitai-lime ring-1 ring-inset ring-maitai-lime hover:ring-maitai-lime/80 focus-visible:outline-maitai-lime hover:bg-maitai-lime/10',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                {tier.price.monthly === 'Contact Us' ? 'Contact Sales' : tier.mostPopular ? 'Get started' : 'Select plan'}
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-900 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-maitai-lime" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
