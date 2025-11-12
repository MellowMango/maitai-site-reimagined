'use client';

import React from 'react';
// Removed unused imports: dynamic, motion, Image, Button, Link
import OrchestratorConstellation from '@/archive/OrchestratorConstellation';

// Removed feature flag logic

// Renamed the main functional component for clarity, will be default exported below
function HeroSection() {
  // Always render the Orchestrator Constellation
  return <OrchestratorConstellation />;
}

export default HeroSection; 
