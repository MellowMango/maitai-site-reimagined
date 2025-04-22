'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BadgeDollarSign, Camera } from 'lucide-react'; // Icons for features
import { cn } from '@/lib/utils';

// Feature data - can be expanded or moved to a content file later
const features = [
  {
    icon: ShieldCheck,
    title: 'Robustness',
    description: 'Ensure consistent and reliable AI performance, preventing unexpected failures and maintaining output quality.',
    iconColor: 'text-maitai-lagoon', // Example color
  },
  {
    icon: Zap,
    title: 'Speed',
    description: 'Experience ultra-low latency responses thanks to optimized models deployed on cutting-edge hardware.',
    iconColor: 'text-maitai-lagoon',
  },
  {
    icon: BadgeDollarSign,
    title: 'Cost-Effectiveness',
    description: 'Achieve better outcomes with models optimized for your specific tasks, reducing wasted compute and resources.',
    iconColor: 'text-maitai-lagoon',
  },
  {
    icon: Camera,
    title: 'Observability',
    description: "Gain complete visibility into your AI's performance and behavior with real-time monitoring and actionable alerts.",
    iconColor: 'text-maitai-lagoon',
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white"> {/* Or another background if preferred */}
      <div className="container mx-auto px-6 lg:px-8">
        {/* Intro Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-maitai-pineapple mb-2">
            Everything You Need
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-maitai-vampire-black mb-4">
            Features
          </h2>
          <p className="text-lg text-gray-600">
            Maitai provides the tools and infrastructure for deploying reliable, high-performance AI applications with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 flex gap-4 items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay
            >
              <div className="flex-shrink-0">
                <feature.icon className={cn("h-8 w-8", feature.iconColor)} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-maitai-vampire-black mb-2"> {/* Adjusted font weight per spec */}
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed"> {/* Adjusted line height per spec */}
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid; 