'use client';

import dynamic from 'next/dynamic';

// Dynamically import the LatencyRace component with no SSR to avoid webGL issues during SSR
const LatencyRace = dynamic(() => import('@/archive/sprint-11A/LatencyRace'), { ssr: false });

export default function LatencyRaceWrapper() {
  // Feature flag for UI demos from sprint docs
  const showUiDemos = process.env.NEXT_PUBLIC_SHOW_UI_DEMOS !== 'false';
  
  if (!showUiDemos) {
    return null;
  }
  
  return <LatencyRace />;
} 
