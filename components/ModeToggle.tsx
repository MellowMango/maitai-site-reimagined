'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useFocusModeStore, FocusMode } from '@/hooks/useFocusModeStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming cn utility exists as per shadcn setup

// --- Helper Hooks (Moved from store file) ---

function useInitializeFocusModeFromUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // Get the raw setter to avoid depending on the mode value itself in Effect 1
  const setMode = useFocusModeStore((state) => state.setMode);
  const isHydrated = useFocusModeStore((state) => state.isHydrated);

  // Effect 1: Read from URL on initial load/hydration or external URL change
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) {
      const focusParam = searchParams.get('focus') as FocusMode | null;
      const currentMode = useFocusModeStore.getState().mode; // Get current mode directly

      if (focusParam && ['voice', 'text', 'both'].includes(focusParam)) {
        // Only set mode if the valid URL param is different from the current store mode
        if (focusParam !== currentMode) {
          console.log(`Initializing/Syncing mode from URL param: ${focusParam}`);
          setMode(focusParam);
        }
      } 
      // Optional: Handle case where param is invalid/missing - maybe set default 'both' if needed?
      // else if (currentMode !== 'both' && !focusParam) { ... }
    }
    // Depend only on searchParams and hydration status for initialization
  }, [searchParams, isHydrated, setMode]); 

  // Effect 2: Update URL when mode changes internally in the store
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) {
      const currentMode = useFocusModeStore.getState().mode;
      const currentFocusParam = searchParams.get('focus');

      // Only update URL if the mode is different from the current URL param
      if (currentMode !== currentFocusParam) {
        console.log(`Updating URL param to sync with state: ${currentMode}`);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('focus', currentMode);
        // Use replace to avoid adding to browser history
        router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
      }
    }
    // Depend on the mode itself (via a subscription) and hydration status for updating URL
    // Zustand's hook automatically subscribes, so we just need isHydrated and stable references.
    // We add a listener directly to the store to avoid depending on 'mode' value here.
    const unsubscribe = useFocusModeStore.subscribe((state, prevState) => {
        if (state.isHydrated && state.mode !== prevState.mode) {
            const currentFocusParam = new URLSearchParams(window.location.search).get('focus');
            if (state.mode !== currentFocusParam) {
                console.log(`Updating URL param via subscription to: ${state.mode}`);
                const newParams = new URLSearchParams(window.location.search);
                newParams.set('focus', state.mode);
                router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
            }
        }
    });

    return unsubscribe; // Clean up subscription
    
  }, [isHydrated, router, pathname]); // Removed mode, searchParams dependencies here
}

function useSafeFocusMode(): FocusMode {
  const { mode, isHydrated } = useFocusModeStore();
  // Return default ('both') until store is hydrated from localStorage
  return isHydrated ? mode : 'both';
}

// --- ModeToggle Component ---

export function ModeToggle() {
  // Initialize store based on URL param
  // This hook needs to run within a component wrapped in <Suspense>
  // or handle the case where searchParams might be null initially.
  // Alternatively, place this hook call in the Page/Layout component.
  useInitializeFocusModeFromUrl();

  const currentMode = useSafeFocusMode();
  const { setMode, isHydrated } = useFocusModeStore();

  const handleModeChange = (newMode: FocusMode) => {
    if (isHydrated) {
      setMode(newMode);
      // Placeholder for analytics
      console.log(`Analytics: mode_toggle triggered, mode: ${newMode}`);
      // Example: analytics.track('mode_toggle', { mode: newMode });
    }
  };

  // Prevent rendering/interaction until the store is hydrated
  // to avoid hydration mismatches and ensure correct initial state.
  if (!isHydrated) {
    // Optional: Render a placeholder or null during hydration
    return <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md"></div>; // Simple placeholder
  }

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <Button
        variant={currentMode === 'voice' ? 'pineapple' : 'outline'} // Use primary variant for active
        size="sm"
        onClick={() => handleModeChange('voice')}
        className={cn(
          "rounded-r-none",
          currentMode !== 'voice' && "border-maitai-lagoon text-maitai-lagoon hover:bg-maitai-lagoon/10"
        )}
        aria-pressed={currentMode === 'voice'}
      >
        Voice
      </Button>
      <Button
        variant={currentMode === 'text' ? 'pineapple' : 'outline'}
        size="sm"
        onClick={() => handleModeChange('text')}
        className={cn(
          "rounded-none border-l-0 border-r-0", // Remove horizontal borders where buttons meet
          currentMode !== 'text' && "border-maitai-lagoon text-maitai-lagoon hover:bg-maitai-lagoon/10"
        )}
        aria-pressed={currentMode === 'text'}
      >
        Text
      </Button>
      <Button
        variant={currentMode === 'both' ? 'pineapple' : 'outline'}
        size="sm"
        onClick={() => handleModeChange('both')}
        className={cn(
          "rounded-l-none",
          currentMode !== 'both' && "border-maitai-lagoon text-maitai-lagoon hover:bg-maitai-lagoon/10"
        )}
        aria-pressed={currentMode === 'both'}
      >
        Both
      </Button>
    </div>
  );
} 