'use client';

import { useEffect, useState } from 'react';

// Simple hook to check the user's system preference for reduced motion.
// Returns true if reduced motion is preferred, false otherwise.
export default function usePrefersReducedMotion() {
  // Initialize state based on the current preference (or default to false if window/matchMedia isn't available SSR)
  const [prefers, setPrefers] = useState(
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    // Ensure this only runs client-side
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Update state immediately if the preference changed between SSR/initial CSR
    setPrefers(mediaQuery.matches);

    // Define a handler to update state when the preference changes
    const handler = (event: MediaQueryListEvent) => setPrefers(event.matches);

    // Add the event listener
    mediaQuery.addEventListener('change', handler);

    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handler);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return prefers;
} 