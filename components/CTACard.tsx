'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';

interface CTACardProps {
  href: string;
  // gradientClasses: string; // Replaced with specific colors
  baseColor: string; // e.g., "#EA5F40"
  highlightColor: string; // e.g., "#FFA658"
  focusRingColor: string; // e.g., "focus-visible:ring-[#EA5F40]"
  children: React.ReactNode; // The text like "Explore our Blog"
}

const CTACard: React.FC<CTACardProps> = ({
  href,
  baseColor,
  highlightColor,
  focusRingColor,
  children,
}) => {
  // Track mouse X and Y position as percentages (0-100)
  const mouseXPercent = useMotionValue(50);
  const mouseYPercent = useMotionValue(50);

  // Transform percentages into a background-position string for fallback/non-JS
  const backgroundPos = useTransform(
    [mouseXPercent, mouseYPercent],
    ([x, y]) => `${x}% ${y}%`
  );
  
  // Dynamically construct the radial gradient string
  const radialGradient = useTransform(
    [mouseXPercent, mouseYPercent],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${highlightColor} 0%, ${baseColor} 80%)`
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    
    const percentX = Math.max(0, Math.min(100, (relativeX / width) * 100));
    const percentY = Math.max(0, Math.min(100, (relativeY / height) * 100));
    
    mouseXPercent.set(percentX);
    mouseYPercent.set(percentY);
  };

  const handleMouseLeave = () => {
    // Reset to center when mouse leaves
    mouseXPercent.set(50);
    mouseYPercent.set(50);
  };

  return (
    <motion.div
      className={cn(
        // Remove flex-1 and max-w, handle in parent
        "rounded-lg overflow-hidden relative h-full", // Added h-full here too
        "bg-[length:200%_200%]" // Keep large size for effect
        // Removed gradientClasses
      )}
      style={{
         backgroundImage: radialGradient, // Use dynamic radial gradient
         backgroundPosition: backgroundPos // Still needed for positioning the large gradient
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -2,
        scale: 1.02,
      }}
      transition={{ 
         duration: 0.15, ease: "easeOut"
      }}
    >
      <Link
        href={href}
        className={cn(
          'group relative flex items-center justify-between p-8 md:p-10 lg:p-12 h-full',
          'text-white',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
          focusRingColor 
        )}
        legacyBehavior={false}
      >
        <span className="text-xl md:text-2xl lg:text-3xl font-semibold z-10 text-left">
          {children}
        </span>
        <ArrowRight className="h-6 w-6 text-white opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 flex-shrink-0 ml-4" />
      </Link>
    </motion.div>
  );
};

export default CTACard; 