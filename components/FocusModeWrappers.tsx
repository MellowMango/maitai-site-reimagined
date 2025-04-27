'use client';

import React from 'react';
import { useFocusModeStore } from '@/hooks/useFocusModeStore';

// Helper hook to safely access the mode, respecting hydration
function useSafeFocusMode() {
  const { mode, isHydrated } = useFocusModeStore();
  // Return default ('both') until store is hydrated to avoid mismatches
  return isHydrated ? mode : 'both';
}

interface ConditionalFocusProps {
  children: React.ReactNode;
}

export function IfVoice({ children }: ConditionalFocusProps) {
  const mode = useSafeFocusMode();
  const shouldRender = mode === 'voice' || mode === 'both';
  return shouldRender ? <>{children}</> : null;
}

export function IfText({ children }: ConditionalFocusProps) {
  const mode = useSafeFocusMode();
  const shouldRender = mode === 'text' || mode === 'both';
  return shouldRender ? <>{children}</> : null;
}

export function IfBoth({ children }: ConditionalFocusProps) {
  const mode = useSafeFocusMode();
  const shouldRender = mode === 'both';
  return shouldRender ? <>{children}</> : null;
} 