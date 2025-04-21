'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DemoModal from './components/DemoModal';
import { ShieldCheckIcon, BoltIcon, BanknotesIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const features = [
    {
      name: 'Robustness',
      description: 'Deploy AI that handles edge cases and unforeseen inputs gracefully.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Speed',
      description: 'Achieve faster inference times without compromising on accuracy.',
      icon: BoltIcon,
    },
    {
      name: 'Cost-Effectiveness',
      description: 'Optimize your AI workloads for lower operational costs.',
      icon: BanknotesIcon,
    },
    {
      name: 'Security',
      description: 'Protect your AI models and data with built-in security measures.',
      icon: LockClosedIcon,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-36">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-maitai-vampire-black sm:text-6xl">
              AI With An Immune System
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stop babysitting unreliable AI. Deploy robust, fast, and cost-effective inference for your apps.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                type="button"
                onClick={() => setDemoModalOpen(true)}
                className="rounded-md bg-maitai-rum px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-rum"
              >
                Get a Demo
              </button>
              <Link href="/docs" className="text-sm font-semibold leading-6 text-maitai-vampire-black">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-maitai-lime">Deploy with confidence</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-maitai-vampire-black sm:text-4xl">
              Everything you need for reliable AI
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Maitai provides the tools and infrastructure to ensure your AI applications are robust, fast, secure, and cost-effective from day one.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-maitai-vampire-black">
                    <feature.icon className="h-5 w-5 flex-none text-maitai-lime" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <DemoModal open={demoModalOpen} setOpen={setDemoModalOpen} />
    </>
  );
}
