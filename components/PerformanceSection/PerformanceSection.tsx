'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToggleTabs from './ToggleTabs';
import MetricCard from './MetricCard';
import { metricsData } from '@/lib/metrics';
import { cn } from '@/lib/utils';

// Define the tabs configuration
const performanceTabs = [
    { value: 'text', label: '⌨️ Text' },
    { value: 'voice', label: '☎️ Voice' },
];

const gridFadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const PerformanceSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof metricsData>('text'); // Default to 'text'

    const handleTabChange = (value: string) => {
        if (value === 'text' || value === 'voice') {
            setActiveTab(value as keyof typeof metricsData);
        }
    };

    const currentMetrics = metricsData[activeTab];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 md:mb-6">
                    Performance
                </h2>
                {/* Subtitle if needed */}
                {/* <p className="text-lg text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
                    Placeholder for a sentence about performance benchmarks.
                </p> */}

                <ToggleTabs
                    defaultValue={activeTab}
                    onValueChange={handleTabChange}
                    tabs={performanceTabs}
                />

                <AnimatePresence mode="wait"> { /* mode="wait" ensures exit animation completes first */}
                    <motion.div
                        key={activeTab} // Ensure animation triggers on tab change
                        variants={gridFadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
                    >
                        {currentMetrics.map((metric) => (
                            <MetricCard key={metric.id} metric={metric} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PerformanceSection;
