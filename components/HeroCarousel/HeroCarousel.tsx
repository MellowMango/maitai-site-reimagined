'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, wrap } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroCardData, heroCardsData } from '@/lib/heroCards';
import HeroCard from './HeroCard';
import { cn } from '@/lib/utils';

// Extract snapshot card and prepare the final list
const snapshotCard = heroCardsData.find(card => card.variant === 'snapshot');
const otherCards = heroCardsData.filter(card => card.variant !== 'snapshot');
const finalCards = snapshotCard ? [snapshotCard, ...otherCards] : otherCards;

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300, // Slide in from right (1) or left (-1)
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300, // Slide out to right (-1) or left (1)
        opacity: 0
    })
};

// Adjust stiffness and damping for desired spring effect
const transition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
};

const HeroCarousel: React.FC = () => {
    const [[page, direction], setPage] = useState([0, 0]); // [current page index, direction of change]

    // Wrap the index to handle looping
    const cardIndex = wrap(0, finalCards.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const goToPage = (newPage: number) => {
        const newDirection = newPage > page ? 1 : -1;
        setPage([newPage, newDirection]);
    }

    // Optional: Autoplay
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         paginate(1); // Go to next slide
    //     }, 5000); // Change slide every 5 seconds
    //     return () => clearInterval(interval);
    // }, [page]);

    if (!finalCards || finalCards.length === 0) {
        return <div className="text-center py-10">No hero content available.</div>; // Or a loading state
    }

    return (
        <div className="relative w-full max-w-[1600px] mx-auto min-h-[420px] md:min-h-[540px] overflow-hidden flex items-center justify-center px-4 md:px-8">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page} // Re-trigger animation when page changes
                    custom={direction} // Pass direction to variants
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }} // Constrain drag to horizontal
                    dragElastic={1} // Elasticity when dragging past constraints (0 = no elasticity)
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipeThreshold = 100; // Minimum distance for a swipe
                        const swipePower = (offset.x * velocity.x);

                        if (swipePower < -swipeThreshold) { // Swiped left
                            paginate(1);
                        } else if (swipePower > swipeThreshold) { // Swiped right
                            paginate(-1);
                        }
                        // If not swiped far enough, it snaps back due to dragConstraints/Elasticity
                    }}
                    className="absolute w-full h-full"
                >
                    <HeroCard card={finalCards[cardIndex]} />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-10 flex items-center justify-center w-12 h-12 bg-white/50 hover:bg-white/80 rounded-full text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500" // Use brand color for ring
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-10 flex items-center justify-center w-12 h-12 bg-white/50 hover:bg-white/80 rounded-full text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                onClick={() => paginate(1)}
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
                {finalCards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-brand-500",
                            index === cardIndex ? 'bg-brand-600' : 'bg-gray-300 hover:bg-gray-400'
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === cardIndex ? 'true' : 'false'}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
