'use client';

import { useEffect, useState } from 'react';

type FocusMode = 'voice' | 'text' | 'both';

// Simple store placeholder for the archived focus-mode wrappers.
// Defaults to 'both' and marks hydration once the client mounts.
export function useFocusModeStore() {
  const [mode] = useState<FocusMode>('both');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return { mode, isHydrated };
}
