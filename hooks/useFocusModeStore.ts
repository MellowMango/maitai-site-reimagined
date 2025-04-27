'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FocusMode = 'voice' | 'text' | 'both';

interface FocusModeState {
  mode: FocusMode;
  setMode: (mode: FocusMode) => void;
  isHydrated: boolean; // To track store hydration, preventing mismatches
  _setHydrated: () => void; // Internal action to set hydration status
}

export const useFocusModeStore = create<FocusModeState>()(
  persist(
    (set) => ({
      mode: 'both', // Default mode
      isHydrated: false, // Start as not hydrated
      setMode: (newMode) => set({ mode: newMode }),
      _setHydrated: () => set({ isHydrated: true }), // Action to mark as hydrated
    }),
    {
      name: 'maitai-focus-mode-storage', // Name of the item in storage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({ mode: state.mode }), // Only persist the mode
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._setHydrated(); // Mark as hydrated once rehydration is done
        }
      },
      skipHydration: typeof window === 'undefined', // Skip hydration on the server
    }
  )
);

// Custom hook to read the URL param and initialize/update the store client-side
// This hook should be used within the component that renders the ModeToggle
// or at a higher level in the component tree (e.g., Layout)

/*
import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useInitializeFocusModeFromUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode, isHydrated } = useFocusModeStore();

  // Effect 1: Read from URL on initial load (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) { // Ensure client-side and store is hydrated
      const focusParam = searchParams.get('focus') as FocusMode | null;
      if (focusParam && ['voice', 'text', 'both'].includes(focusParam) && focusParam !== mode) {
        setMode(focusParam);
      }
    }
  }, [searchParams, setMode, mode, isHydrated]); // Add mode and isHydrated dependency

  // Effect 2: Update URL when mode changes in store
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) { // Ensure client-side and store is hydrated
        const currentFocusParam = searchParams.get('focus');
        if (mode !== currentFocusParam) {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('focus', mode);
            // Use replace to avoid adding to browser history
            router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
        }
    }
  }, [mode, searchParams, router, pathname, isHydrated]); // Add isHydrated dependency
}

// Custom hook to safely access the mode, respecting hydration
export function useSafeFocusMode(): FocusMode {
    const { mode, isHydrated } = useFocusModeStore();
    // Return default mode until hydration is complete to avoid mismatches
    return isHydrated ? mode : 'both';
}
*/
// Note: The hooks `useInitializeFocusModeFromUrl` and `useSafeFocusMode` are commented out here.
// They should be uncommented and potentially moved to their own file (e.g., hooks/useFocusModeSync.ts)
// or kept here and exported. They need to be called from a client component. 