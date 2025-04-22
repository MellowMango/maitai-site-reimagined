'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'; // Example icons

const metrics = [
  {
    id: 1,
    icon: ShieldCheckIcon,
    value: '99.9%',
    label: 'Threat Detection Accuracy',
  },
  {
    id: 2,
    icon: ClockIcon,
    value: '< 50ms',
    label: 'Average Response Time',
  },
  {
    id: 3,
    icon: ChartBarIcon,
    value: '70%',
    label: 'Operational Cost Reduction',
  },
  // Add more metrics if needed
];

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

export default function MetricsStrip() {
  return (
    <section className="bg-maitai-vampire-black py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Enable horizontal scrolling on smaller screens */}
        <div className="scrollbar-hide overflow-x-auto pb-4 -mb-4">
           {/* Use grid for layout, flowing horizontally */}
          <div className="grid grid-flow-col auto-cols-[15rem] gap-8 md:auto-cols-fr md:grid-flow-row md:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-6 text-center text-white"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
                custom={index} // Stagger animation slightly if needed
              >
                <metric.icon className="h-10 w-10 mb-4 text-maitai-pineapple" aria-hidden="true" />
                <div className="text-4xl font-bold">{metric.value}</div>
                <div className="mt-1 text-sm text-gray-300">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper class to hide scrollbar (add to globals.css if needed)
/*
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none; 
    scrollbar-width: none; 
}
*/
