'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-maitai-vampire-black to-[#1E2A27] text-white py-20 md:py-32">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 lg:px-8">
        {/* Left Column: Text Content & CTAs */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans">
            AI With An Immune System
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
            Protect your AI applications from threats and ensure reliable performance with Maitai's proactive security layer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="pineapple" size="lg">
              Get a Demo
            </Button>
            <Button variant="limeOutline" size="lg">
              Start Trial
            </Button>
          </div>
        </div>

        {/* Right Column: Animated Image */}
        <motion.div
          className="flex justify-center lg:justify-end order-first lg:order-last"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src="/animations/immune-system.svg"
            alt="Abstract illustration representing an AI immune system"
            width={500}
            height={500}
            className="rounded-lg object-contain max-w-full h-auto"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero; 