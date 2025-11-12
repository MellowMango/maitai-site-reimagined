'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BadgeDollarSign, Camera, Mic, MessageSquare } from 'lucide-react'; // Added Mic, MessageSquare
import { cn } from '@/lib/utils';
import { IfVoice, IfText, IfBoth } from '@/archive/FocusModeWrappers'; // Import wrappers

// Define features for different modes
const voiceFeatures = [
  { icon: Mic, title: 'Real-time Transcription', description: 'Accurate speech-to-text for voice interactions.', iconColor: 'text-maitai-lagoon' },
  { icon: Zap, title: 'Low Latency Voice', description: 'Optimized pipelines for instant voice responses.', iconColor: 'text-maitai-lagoon' },
  { icon: ShieldCheck, title: 'Voice Reliability', description: 'Ensure consistent voice AI performance.', iconColor: 'text-maitai-lagoon' },
  { icon: Camera, title: 'Voice Observability', description: 'Monitor voice quality and interaction flow.', iconColor: 'text-maitai-lagoon' },
];

const textFeatures = [
  { icon: MessageSquare, title: 'Intent Recognition', description: 'Understand user intent from text input.', iconColor: 'text-maitai-ocean' },
  { icon: BadgeDollarSign, title: 'Token Optimization', description: 'Reduce costs with efficient text generation.', iconColor: 'text-maitai-ocean' },
  { icon: ShieldCheck, title: 'Text Reliability', description: 'Maintain quality in text-based AI outputs.', iconColor: 'text-maitai-ocean' },
  { icon: Camera, title: 'Text Observability', description: 'Track text generation performance.', iconColor: 'text-maitai-ocean' },
];

const bothFeatures = [
  { icon: ShieldCheck, title: 'Robustness', description: 'Ensure consistent AI performance across voice and text.', iconColor: 'text-maitai-pineapple' },
  { icon: Zap, title: 'Speed', description: 'Low latency responses for both voice and text modes.', iconColor: 'text-maitai-pineapple' },
  { icon: BadgeDollarSign, title: 'Cost-Effectiveness', description: 'Optimize models and resources for multimodal AI.', iconColor: 'text-maitai-pineapple' },
  { icon: Camera, title: 'Observability', description: 'Gain complete visibility into voice and text AI behavior.', iconColor: 'text-maitai-pineapple' },
];

// Helper to render a grid for a specific feature set
const FeatureGridRenderer = ({ features }: { features: typeof bothFeatures }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
    {features.map((feature, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 flex gap-4 items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex-shrink-0">
          <feature.icon className={cn("h-8 w-8", feature.iconColor)} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-maitai-vampire-black mb-2">
            {feature.title}
          </h3>
          <p className="text-base text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
);

export function FeaturesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Intro Block - Conditionally render based on mode */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-maitai-pineapple mb-2">
            Everything You Need
          </p>
          <IfVoice>
            <h2 className="text-3xl md:text-4xl font-bold text-maitai-vampire-black mb-4">Voice Features</h2>
            <p className="text-lg text-gray-600">Tools for building reliable, high-performance voice AI applications.</p>
          </IfVoice>
          <IfText>
            <h2 className="text-3xl md:text-4xl font-bold text-maitai-vampire-black mb-4">Text Features</h2>
            <p className="text-lg text-gray-600">Tools for building reliable, high-performance text-based AI.</p>
          </IfText>
          {/* IfBoth will show when mode is 'both' only */}
          {/* <IfBoth>
            <h2 className="text-3xl md:text-4xl font-bold text-maitai-vampire-black mb-4">Core Features</h2>
            <p className="text-lg text-gray-600">Maitai provides the tools for deploying reliable voice and text AI applications.</p>
          </IfBoth> */}
        </div>

        {/* Features Grid - Conditionally render based on mode */}
        {/* Note: IfVoice renders for 'voice' and 'both', IfText renders for 'text' and 'both' */}
        <IfVoice>
          <FeatureGridRenderer features={voiceFeatures} />
        </IfVoice>
        <IfText>
          <FeatureGridRenderer features={textFeatures} />
        </IfText>
        {/* If we only wanted to show the 'bothFeatures' when mode is explicitly 'both', we'd use IfBoth */}
        {/* <IfBoth>
          <FeatureGridRenderer features={bothFeatures} />
        </IfBoth> */}

      </div>
    </section>
  );
}

export default FeaturesGrid; 
