'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming Button is in ui

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-VampireBlack to-[#1E2A27] text-white py-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center px-4">
        {/* Left Column: Text Content & CTAs */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Experience the <span className="text-Lime">Future of Trading</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Trade smarter, faster, and more securely with MaiTai's
            state-of-the-art decentralized exchange platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="pineapple" size="lg" asChild>
              <a href="#">Get Started</a>
            </Button>
            <Button variant="limeOutline" size="lg" asChild>
              <a href="#">Learn More</a>
            </Button>
          </div>
        </div>

        {/* Right Column: Animated Image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/hero-graphic.png"
            alt="MaiTai Platform Interface"
            width={600}
            height={400}
            className="rounded-lg shadow-xl object-contain max-w-full h-auto"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero; 