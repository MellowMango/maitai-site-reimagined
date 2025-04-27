'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // Using next/image for optimization
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { phrases, panels } from '@/lib/heroCopy'; // Assuming icon filenames match pngs
import { cn } from '@/lib/utils';

const ASSET_ROOT = '/hero-flow-assets'; // Corrected asset path

// Map phrase index to panel key (assuming order matches)
const phraseToPanelKey = ['latency', 'precision', 'omni']; // Adjust if order differs

const HeroActively = () => {
  const [step, setStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const startTimer = () => {
    // Clear existing timer if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Start new timer
    intervalRef.current = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % phrases.length);
    }, 3000);
  };

  useEffect(() => {
    if (!isHovering && !prefersReducedMotion) {
      startTimer();
    }

    // Cleanup timer on unmount or when hovering starts/prefersReducedMotion changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, prefersReducedMotion]); // Rerun effect if hover state or motion preference changes

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      setIsHovering(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    if (!prefersReducedMotion) {
      setIsHovering(false);
      // Restart timer immediately
      startTimer();
    }
  };

  // --- Reduced Motion Fallback ---
  if (prefersReducedMotion) {
    return (
      <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-20">
        {/* Static Headline */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-maitai-vampire-black leading-tight">
             Run Better AI with <br />
             <span className="text-maitai-lagoon">{phrases[0]}</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Animation paused due to system preference.
          </p>
        </div>
         {/* Placeholder for static representation if needed */}
        <div className="hidden md:flex items-center justify-center h-64 bg-gray-100 rounded-lg text-gray-500">
           Static Visual Area
        </div>
      </div>
    );
  }

  // --- Animated Version ---
  const currentPanelKey = phraseToPanelKey[step];
  const currentPanel = panels.find((p) => p.key === currentPanelKey);

  return (
    <div 
      className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-20" // Use grid for two columns
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Column: Animated Headline */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-maitai-vampire-black leading-tight">
           Run Better AI with <br />
           {/* Animated phrase container */}
           <span className="inline-block h-16 md:h-20 overflow-hidden align-bottom">
             <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={step} // Key change triggers animation
                  className="block text-maitai-lagoon"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {phrases[step]}
                </motion.span>
              </AnimatePresence>
           </span>
        </h1>
         {/* Optional: Add subheadline or other static text here */}
         {/* <p className="mt-4 text-lg text-gray-600">Subheadline text...</p> */}
      </div>

      {/* Right Column: Animated Panels Container */}
      {/* This container defines the area where panels will be absolutely positioned */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center md:justify-start">
         {/* Add subtle background or visual elements if desired */}
         {/* <div className="absolute inset-0 bg-gray-50 rounded-lg -z-10"></div> */}

        <AnimatePresence initial={false}>
          {currentPanel && (
            <motion.div
              key={currentPanel.key}
              className="absolute bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex flex-col items-center text-center w-64" // Fixed width example, adjust as needed
              style={{ 
                // Use style for dynamic positioning from data if needed, or use fixed positions
                // left: `${currentPanel.x}px`, 
                // top: `${currentPanel.y}px`,
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                // Example fixed position: Center slightly offset
                x: "-40%", 
                y: "-50%"
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: "-50%", // Center adjusted for element width
                y: "-50%",
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              <Image
                // Confirm exact filenames in public/hero-actively-assets/
                src={`${ASSET_ROOT}/${currentPanel.icon.replace('.svg', '.png')}`} 
                alt={currentPanel.label}
                width={48} // Slightly larger icon
                height={48}
                className="mb-3 object-contain"
              />
              <span className="text-base font-semibold text-maitai-vampire-black">
                {currentPanel.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroActively; 