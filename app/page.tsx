'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import DemoModal from './components/DemoModal'; // Ensure DemoModal is imported
import MetricsStrip from './components/MetricsStrip'; // Import MetricsStrip
import QuickStart from './components/QuickStart'; // Import QuickStart
import PricingSection from './components/PricingSection'; // Import PricingSection
import { ShieldCheckIcon, BoltIcon, BanknotesIcon, CpuChipIcon } from '@heroicons/react/24/outline'; 

export default function HomePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleDemoClick = () => {
    setDemoModalOpen(true);
  };

  const features = [
    {
      name: 'Robustness',
      description: 'AI Immune System detects and neutralizes threats, ensuring reliable performance even with corrupted inputs.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Speed',
      description: 'Optimized inference pipelines deliver low-latency results without sacrificing accuracy.',
      icon: BoltIcon,
    },
    {
      name: 'Cost-Effectiveness',
      description: 'Efficient resource utilization reduces compute costs, making advanced AI more accessible.',
      icon: BanknotesIcon,
    },
    {
      name: 'Observability & Control',
      description: 'Real-time monitoring and fine-grained controls provide insight and allow for immediate intervention.',
      icon: CpuChipIcon, 
    },
  ];

  return (
    <div className="bg-maitai-mint-cream overflow-hidden"> {/* Added overflow-hidden for animation */}
      {/* Demo Modal Triggered by State */}
      <DemoModal open={demoModalOpen} setOpen={setDemoModalOpen} />

      {/* Hero Section - Updated Layout */}
      {/* Apply standard padding py-16 lg:py-24 */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        {/* Standardize grid gap gap-8 lg:gap-12 */}
        <div className="lg:grid lg:grid-cols-2 gap-8 lg:gap-x-12 lg:items-center">
          {/* Left Column: Text Content & CTAs */}
          <div className="text-center lg:text-left">
            <h1 className="font-greycliff text-4xl font-bold tracking-tight text-maitai-vampire-black sm:text-5xl lg:text-6xl">
              AI With An Immune System
            </h1>
            {/* Updated text contrast & Hero subhead copy */}
            <p className="mt-6 text-lg leading-8 font-greycliff text-gray-900 max-w-xl mx-auto lg:mx-0">
              Stop babysitting unreliable AI—Maitai delivers robust, low‑latency inference with built‑in observability.
            </p>
            <div className="mt-10 flex flex-col items-center gap-y-4 sm:flex-row sm:justify-center lg:justify-start sm:gap-x-4">
              <button
                type="button"
                onClick={handleDemoClick}
                className="w-full sm:w-auto rounded-lg bg-maitai-pineapple px-5 py-2.5 text-sm font-semibold text-maitai-vampire-black shadow-sm hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-pineapple"
              >
                Get a Demo
              </button>
              <a
                href="#" // TODO: Link to Start Trial page/flow
                className="w-full sm:w-auto rounded-lg px-5 py-2.5 text-sm font-semibold text-maitai-lime shadow-sm ring-1 ring-inset ring-maitai-lime hover:bg-maitai-lime/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-lime"
              >
                Start Trial
              </a>
            </div>
          </div>

          {/* Right Column: Visual Placeholder with Animation */}
          <motion.div
            className="mt-16 h-80 lg:mt-0 lg:h-full" // Adjust height as needed
            initial={{ opacity: 0, x: 50 }} // Start invisible and slightly to the right
            animate={{ opacity: 1, x: 0 }} // Fade in and slide to final position
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="h-full w-full bg-gradient-to-br from-maitai-lagoon/20 to-maitai-lime/20 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 italic">[Hero Illustration Placeholder]</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Strip Section */}
      <MetricsStrip />

      {/* Features Section */}
      {/* Apply standard padding py-16 lg:py-24 */}
      <section id="features" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            {/* Added micro-heading */}
            <h2 className="text-base font-semibold leading-7 text-maitai-lagoon font-pineapple uppercase tracking-wider">Everything you need</h2>
            <h2 className="text-base font-semibold leading-7 text-maitai-lagoon">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-maitai-vampire-black sm:text-4xl font-greycliff">
              Everything you need for reliable AI
            </p>
            {/* Updated text contrast */}
            <p className="mt-6 text-lg leading-8 text-gray-900">
              Stop babysitting unreliable AI. Maitai provides the core infrastructure and tools to ensure your models perform reliably, efficiently, and securely in production.
            </p>
          </div>

          {/* Updated Feature Grid Layout */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            {/* Standardize grid gap gap-8 lg:gap-12 */}
            <dl className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {features.map((feature) => (
                <div key={feature.name} className="rounded-lg bg-white p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {feature.icon && <feature.icon className="h-8 w-8 flex-none text-maitai-lagoon" aria-hidden="true" />}
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-900">
                    <p className="flex-auto">{feature.description}</p>
                    {/* Optional: Add a 'Learn more' link here if needed */}
                    {/* <p className="mt-6">
                      <a href="#" className="text-sm font-semibold leading-6 text-maitai-lagoon">Learn more <span aria-hidden="true">→</span></a>
                    </p> */}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <QuickStart />

      {/* Pricing Section */}
      <PricingSection />

    </div>
  );
}
