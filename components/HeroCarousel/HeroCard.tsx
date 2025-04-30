'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { HeroCardData } from '@/lib/heroCards';
import { cn } from '@/lib/utils';

interface HeroCardProps {
    card: HeroCardData;
}

const HeroCard: React.FC<HeroCardProps> = ({ card }) => {
    // Define base styles for the full-width card container
    const baseCardClasses = "relative w-full h-full flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 text-center rounded-lg overflow-hidden";

    // Define gradient backgrounds per variant
    const getGradientClasses = (variant: HeroCardData['variant']) => {
        switch (variant) {
            case 'snapshot':
                return 'bg-gradient-to-br from-sky-100 to-violet-200 text-gray-800';
            case 'partnership':
                return 'bg-gradient-to-tl from-blue-100 to-emerald-100 text-gray-800';
            case 'event':
                // Darker gradient for potential image overlay later, or better text contrast
                return 'bg-gradient-to-tr from-amber-200 to-rose-300 text-gray-900';
            case 'why':
                return 'bg-gradient-to-bl from-slate-100 to-gray-200 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const renderContent = () => {
        switch (card.variant) {
            case 'snapshot':
                return (
                    <div className={cn(baseCardClasses, getGradientClasses(card.variant))}>
                        {/* Add a subtle overlay for text readability if needed */}
                        {/* <div className="absolute inset-0 bg-black/10 z-0"></div> */}
                        <div className="relative z-10 max-w-2xl space-y-4">
                            <h2 className="text-4xl md:text-6xl font-bold">{card.title}</h2>
                            {card.body && (
                                <p className="text-lg md:text-xl max-w-[60ch] mx-auto opacity-90">{card.body}</p>
                            )}
                        </div>
                    </div>
                );
            case 'partnership':
                return (
                    <div className={cn(baseCardClasses, getGradientClasses(card.variant), "items-start md:items-center")}> {/* Adjust alignment */} 
                        <div className="relative z-10 w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-left">
                             {/* Placeholder for Logo - could be absolutely positioned or in flex */}
                             <div className="w-20 h-20 md:w-24 md:h-24 bg-white/50 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                                <span className="text-xs font-medium text-slate-600">Logo</span>
                             </div>
                            <div className="space-y-2 flex-grow">
                                <h3 className="text-4xl md:text-6xl font-semibold">{card.title}</h3>
                                {card.stat && (
                                    <span className="inline-block bg-blue-200/80 text-blue-900 text-sm font-medium px-3 py-1 rounded">
                                        {card.stat}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'event':
                return (
                    <div className={cn(baseCardClasses, getGradientClasses(card.variant))}>
                         {/* Can add image as background via style prop if needed later */}
                        <div className="relative z-10 max-w-2xl space-y-2">
                            <h3 className="text-4xl md:text-6xl font-semibold">{card.title}</h3>
                             {(card.date || card.location) && (
                                <p className="text-lg md:text-xl font-medium opacity-80">
                                    {card.date}{card.date && card.location && ' • '}{card.location}
                                </p>
                            )}
                            {/* Placeholder for Thumbnail area - could be background or element */}
                            <div className="mt-4 text-xs font-medium text-slate-700">(Event Thumbnail Area)</div>
                        </div>
                    </div>
                );
             case 'why':
                return (
                    <div className={cn(baseCardClasses, getGradientClasses(card.variant))}>
                         <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-bold">{card.title}</h2>
                            {/* Body is intentionally omitted per spec for now */}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // The outer div now receives the gradient and base styling
    return (
         <div className="w-full h-full" role="tabpanel" aria-label={card.title}>
             {renderContent()}
         </div>
    );
};

export default HeroCard;
