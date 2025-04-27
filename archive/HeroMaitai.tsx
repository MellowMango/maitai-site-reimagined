'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { heroPhrases, heroPanels } from '@/lib/heroCopy';
import HeroPanel from './HeroPanel';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const SWITCH = 3000; // Cycle interval in milliseconds

export default function HeroMaitai() {
  const [idx, setIdx] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Stop cycling automatically if the user prefers reduced motion
    if (reduced) return;

    const intervalId = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % heroPhrases.length);
    }, SWITCH);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [reduced]); // Dependency array includes reduced motion preference

  return (
    // Ensure section takes up space and clips children
    <section className="relative w-full h-[480px] bg-dot-grid overflow-hidden">
      {/* Animated Headline */}
      <h1 className="absolute z-10 top-4 left-4 font-semibold text-2xl text-neutral-950">
        Run Better AI —\u00a0{/* Non-breaking space */}
        <AnimatePresence mode="wait">
          <motion.span
            key={idx} // Key ensures animation runs on index change
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
            aria-live="polite" // Accessibility: announce changes
          >
            {heroPhrases[idx]}
          </motion.span>
        </AnimatePresence>
      </h1>

      {/* Floating Panels */}
      <AnimatePresence>
        {heroPanels.map((panel, index) => (
          <HeroPanel
            key={panel.key} // Unique key for each panel
            panel={panel}
            isActive={index === idx} // Pass active state based on current index
            reduced={reduced} // Pass reduced motion preference
          />
        ))}
      </AnimatePresence>
    </section>
  );
} 