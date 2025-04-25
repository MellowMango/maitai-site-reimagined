'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  animate,
  motionValue
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import Image from 'next/image';
import { captions } from '@/lib/portal-captions';
import { cn } from '@/lib/utils'; // Assuming cn utility exists
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrows
// import useIsMobile from '@/hooks/useIsMobile'; // Placeholder for mobile logic

// --- Constants ----------------------------------------------------------
const CARD_W      = 560; // Increased card width
const CARD_H      = 350; // Adjusted height proportionally (approx 16:10)
const GAP         = 32;  // Increased gap slightly
const HERO_COUNT  = captions.length;
const TOTAL_WIDTH = HERO_COUNT * CARD_W + (HERO_COUNT - 1) * GAP;
// No need for DRAG_RANGE as it's calculated dynamically in useMemo

// --- Types --------------------------------------------------------------
type Caption = typeof captions[number];

// --- Helpers ------------------------------------------------------------
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// --- Component ----------------------------------------------------------
export default function PortalScrub() {
  const [hasMounted, setHasMounted] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [currentActiveIndex, setCurrentActiveIndex] = React.useState(0); // State for progress dots
  // const isMobile = useIsMobile();
  const isMobile = false;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Create opacity motion values ONCE using useMemo
  const captionOpacities = React.useMemo<MotionValue<number>[]>(() => {
    return captions.map((_, index) => motionValue(index === 0 ? 1 : 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once

  // Set mounted state and initial container width
  React.useEffect(() => {
    setHasMounted(true);
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // Update container width on resize (optional but good practice)
  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Derive active index based on center of viewport
  const activeIndex = useTransform(x, (latest) => {
    if (!hasMounted) return 0; // Avoid calculation before mount
    const viewportCenter = -latest + containerWidth / 2;
    const index = Math.floor(viewportCenter / (CARD_W + GAP));
    return clamp(index, 0, HERO_COUNT - 1);
  });

  // Subscribe to activeIndex changes for progress dots
  React.useEffect(() => {
    // Set initial value
    setCurrentActiveIndex(activeIndex.get());
    // Subscribe to changes
    const unsubscribe = activeIndex.on("change", setCurrentActiveIndex);
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [activeIndex]);

  // Effect to UPDATE caption opacities based on x and containerWidth
  React.useEffect(() => {
    const updateOpacities = (latestX: number) => {
      if (!hasMounted || containerWidth === 0) {
        // Ensure initial state matches memoized values if effect runs early
        captionOpacities.forEach((mv, index) => mv.set(index === 0 ? 1 : 0));
        return;
      }

      captionOpacities.forEach((mv, index) => {
        const cardCenterX = -(index * (CARD_W + GAP)) + CARD_W / 2;
        const viewportCenter = -latestX + containerWidth / 2;
        const distance = Math.abs(cardCenterX - viewportCenter);
        const opacity = Math.max(0, 1 - distance / (CARD_W * 0.75));
        mv.set(Math.pow(opacity, 3));
      });
    };

    // Initial update in case x changes before mount somehow (unlikely but safe)
    updateOpacities(x.get());

    // Subscribe to x changes
    const unsubscribeX = x.on("change", updateOpacities);

    // Update opacities immediately if containerWidth changes
    updateOpacities(x.get()); 

    return () => {
      unsubscribeX();
    };
    // Depend on hasMounted and containerWidth to re-run calculation logic
  }, [x, hasMounted, containerWidth, captionOpacities]);

  // Snap on drag end (desktop only)
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (isMobile) return; // Drag disabled on mobile

    const offsetX   = info.offset.x;
    const velocityX = info.velocity.x;
    const currentX  = x.get();

    // Predict target based on velocity
    const predictedTarget = currentX + offsetX + velocityX * 0.3; // Adjust multiplier for desired flick strength

    const snapIndex = clamp(Math.round(-predictedTarget / (CARD_W + GAP)), 0, HERO_COUNT - 1);
    const snapX     = -(snapIndex * (CARD_W + GAP));

    x.stop();
    // Use spring animation for smoother snap
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Linter incorrectly flags animate signature
    animate(x, snapX, {
      type: 'spring',
      stiffness: 260,
      damping: 30,
      mass: 0.5,
    });
  };

  // Calculate dynamic drag constraints based on container width
  const dragConstraints = React.useMemo(() => {
    if (!hasMounted || isMobile || containerWidth === 0) return undefined;
    const centeringPadding = (containerWidth - CARD_W) / 2;
    const rightConstraint = Math.max(centeringPadding, 0); // Ensure right doesn't go beyond start
    const leftConstraint = -(TOTAL_WIDTH - containerWidth + centeringPadding + GAP); // Adjust for centering and gap
    console.log("Constraints:", {left: Math.min(leftConstraint, 0), right: rightConstraint})
    return { left: Math.min(leftConstraint, 0), right: rightConstraint };
  }, [hasMounted, isMobile, containerWidth]);

  // --- Mobile Scroll Handling ------------------------------------------
  // Add scroll snapping for mobile if isMobile is true
  React.useEffect(() => {
    if (isMobile && containerRef.current) {
      const container = containerRef.current.querySelector('.scroll-container');
      if (container) {
        // TODO: Implement scroll listener to update activeIndex if needed
        // or use IntersectionObserver for active state
      }
    }
  }, [isMobile]);

  const navigate = (direction: 'prev' | 'next') => {
    const targetIndex = clamp(currentActiveIndex + (direction === 'prev' ? -1 : 1), 0, HERO_COUNT - 1);
    const snapX = -(targetIndex * (CARD_W + GAP));

    if (isMobile && containerRef.current) {
      const scrollContainer = containerRef.current.querySelector('.scroll-container');
      const targetScrollLeft = targetIndex * (CARD_W + GAP);
      scrollContainer?.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    } else {
      // @ts-ignore
      animate(x, snapX, { type: 'spring', stiffness: 300, damping: 40, mass: 1 });
    }
  };

  const canGoPrev = currentActiveIndex > 0;
  const canGoNext = currentActiveIndex < HERO_COUNT - 1;

  return (
    <section
      aria-label="Maitai portal storyboard"
      className="relative w-full py-16 flex flex-col items-center bg-gradient-to-b from-white to-maitai-mint-cream/30"
      ref={containerRef}
    >
      {/* Optional: Film-strip track styling */}
      <div className="absolute top-1/2 left-0 w-full h-2.5 bg-maitai-mint-cream/50 -translate-y-1/2 shadow-inner z-0" />

      {/* Main container with relative positioning for arrows */}
      <div className="relative w-full max-w-7xl px-4"> 
        {/* Horizontal track container */}
        <div
          className={cn(
            'relative w-full',
            isMobile ? 'overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide' : 'overflow-hidden cursor-grab active:cursor-grabbing',
            'scroll-container'
          )}
          style={{ height: CARD_H + 20 }} // Ensure container fits scaled images
        >
          <motion.div
            className="relative flex w-max"
             // Center align: Calculate padding based on current container width
            style={{ 
              ...(isMobile ? {} : { x }),
              paddingLeft: hasMounted ? `calc(50% - ${CARD_W / 2}px)` : '0px',
              paddingRight: hasMounted ? `calc(50% - ${CARD_W / 2}px)` : '0px',
            }}
            drag={isMobile ? false : 'x'}
            dragConstraints={dragConstraints}
            dragElastic={0.03} // Reduced elasticity
            onDragEnd={handleDragEnd}
          >
            {captions.map((cap, i) => (
              <motion.figure
                key={cap.id}
                className={cn(
                  'relative flex-shrink-0 snap-center group select-none', // Added select-none
                  isMobile ? 'scroll-snap-align-center' : ''
                )}
                style={{ width: CARD_W, marginRight: i === HERO_COUNT - 1 ? 0 : GAP }}
                whileHover={!isMobile ? { scale: 1.02 } : {}} // Slightly reduced hover scale
                whileTap={!isMobile ? { scale: 0.98, boxShadow: '0px 5px 15px rgba(0,0,0,0.1)' } : {}}
              >
                <Image
                  src={`portal-simlified-demo/${cap.id}.png`}
                  alt={`Portal Step: ${cap.text}`}
                  width={CARD_W}
                  height={CARD_H}
                  priority={i < 3}
                  draggable={false} // Prevent native image drag
                  className="rounded-xl shadow-xl object-contain border border-gray-200/80 bg-white pointer-events-none" // Added pointer-events-none
                  unoptimized
                />
              </motion.figure>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows (Desktop Only for now) */} 
        {!isMobile && (
          <>
            <button
              onClick={() => navigate('prev')}
              disabled={!canGoPrev}
              aria-label="Previous step"
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-md transition-opacity duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-maitai-lime focus:ring-offset-2',
                canGoPrev ? 'opacity-100 hover:scale-105' : 'opacity-30 cursor-not-allowed'
              )}
              style={{ marginLeft: 'max(1rem, calc(50% - 380px))' }} // Position arrows nicely
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={() => navigate('next')}
              disabled={!canGoNext}
              aria-label="Next step"
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-md transition-opacity duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-maitai-lime focus:ring-offset-2',
                canGoNext ? 'opacity-100 hover:scale-105' : 'opacity-30 cursor-not-allowed'
              )}
              style={{ marginRight: 'max(1rem, calc(50% - 380px))' }} // Position arrows nicely
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Captions */} 
      <div className="relative mt-6 h-8 w-full max-w-lg text-center overflow-hidden"> 
        {captions.map((cap, idx) => (
          <motion.div
            key={cap.id}
            style={{ opacity: captionOpacities[idx] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="inline-block bg-gray-100/80 backdrop-blur-sm text-gray-800 text-[15px] font-medium px-4 py-1.5 rounded-full shadow-sm border border-gray-200/50">
              {cap.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress dots */} 
      <div className="mt-5 flex justify-center gap-3"> 
        {captions.map((_, idx) => {
          const isActive = idx === currentActiveIndex;
          return (
            <button // Changed to simple button, motion not strictly needed here
              key={`dot-${idx}`}
              onClick={() => {
                const targetIndex = idx;
                const snapX = -(targetIndex * (CARD_W + GAP));
                if (isMobile && containerRef.current) {
                   const scrollContainer = containerRef.current.querySelector('.scroll-container');
                   const targetScrollLeft = targetIndex * (CARD_W + GAP);
                   scrollContainer?.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
                } else {
                   // @ts-ignore
                   animate(x, snapX, { type: 'spring', stiffness: 300, damping: 40 });
                }
              }}
              aria-label={`Jump to step ${idx + 1}`}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-maitai-lime focus:ring-offset-2',
                isActive ? 'scale-150 bg-maitai-lime' : 'bg-gray-300 hover:bg-gray-400'
              )}
            />
          );
        })}
      </div>
      {/* TODO: Add Lottie Sparkle on drag end/snap */}
      {/* TODO: Add ARIA live region for captions */}
      {/* TODO: Add Keyboard navigation */}
    </section>
  );
} 