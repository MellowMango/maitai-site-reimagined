'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import components that might use client-only features or need SSR disabled
const PortalScrub = dynamic(() => import('@/components/PortalScrub')); // ssr: false not needed if component itself is client-side
const LoRASwap = dynamic(() => import('@/components/LoRASwap'), { ssr: false }); // Keep ssr: false here as it uses Audio
// Import IntentPlayground normally as it's already a client component
import IntentPlayground from '@/components/IntentPlayground';

export default function InteractiveDemos() {
  // Feature flag to show interactive UI demos
  const showUiDemos = process.env.NEXT_PUBLIC_SHOW_UI_DEMOS === 'true';

  if (!showUiDemos) {
    return null; // Don't render anything if the flag is off
  }

  return (
    <>
      {/* Render PortalScrub */}
      <PortalScrub />

      {/* Render LoRASwap Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-maitai-mint-cream/30">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-semibold text-maitai-vampire-black mb-10">
            Zero-Latency LoRA Hot-Swap
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Instantly switch between specialized AI models trained for different industries. Hear the difference.
          </p>
          <LoRASwap />
        </div>
      </section>

      {/* Render IntentPlayground Section */}
      <section className="py-16 md:py-24 bg-white"> {/* Simple white background for contrast */} 
        <div className="container mx-auto px-6 lg:px-8">
          <IntentPlayground />
        </div>
      </section>
    </>
  );
} 