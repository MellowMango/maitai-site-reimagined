'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

const metrics = [
  {
    icon: ShieldCheck,
    value: '99.9%',
    label: 'Threat Accuracy',
  },
  {
    icon: Clock,
    value: '< 50ms',
    label: 'Response Latency',
  },
  {
    icon: Server,
    value: '99.9%',
    label: 'SLA Uptime',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger delay between cards
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Metrics() {
  return (
    <section
      className="bg-maitai-vampire-black py-16 md:py-20 text-white"
      role="region"
      aria-label="Performance metrics"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Optional: Add a title or intro here if needed */}
        {/* <h2 className="text-center text-3xl font-bold mb-12">Key Metrics</h2> */}
        
        <motion.div
          className="flex overflow-x-auto space-x-6 md:space-x-8 py-4 snap-x snap-mandatory scrollbar-hide" // Horizontal scroll, snap, hide scrollbar
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={cn(
                'flex-shrink-0 w-60 md:w-72 p-6 rounded-lg shadow-lg',
                'bg-gray-900/60 backdrop-blur-sm', // Slightly lighter dark card background
                'snap-center' // Snap card to center
              )}
              variants={cardVariants}
              // No need for individual whileInView here, handled by container stagger
            >
              <metric.icon className="h-8 w-8 mb-4 text-maitai-lime" strokeWidth={1.5} />
              <p className="text-3xl md:text-4xl font-semibold mb-2">{metric.value}</p>
              <p className="text-sm text-gray-400">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Helper style to hide scrollbars (optional, place in globals.css if preferred)
/*
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
}
*/ 