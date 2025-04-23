'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SectionWrapper } from '@/components/SectionWrapper';
import benchmarkData from '@/lib/benchmarks.json';
import * as THREE from 'three';

// TODO: Define Scene components (Spheres, PulseLines)
// TODO: Define HUD component
// TODO: Define Fallback component

// Sphere component for reuse
function RaceSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Pulse Line component
function PulseLines({ 
  count, 
  startPosition, 
  endPosition 
}: { 
  count: number;
  startPosition: [number, number, number];
  endPosition: [number, number, number];
}) {
  const linesRef = useRef<THREE.Group>(null);
  const lines = Array.from({ length: Math.min(count, 50) });
  
  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line: THREE.Object3D, i: number) => {
        // Calculate progress (0 to 1) for this line
        const offset = i / lines.length;
        const progress = (clock.getElapsedTime() * 0.5 + offset) % 1;
        
        // Position the line between start and end, based on progress
        const x = startPosition[0] + (endPosition[0] - startPosition[0]) * progress;
        const y = startPosition[1] + (endPosition[1] - startPosition[1]) * progress;
        const z = startPosition[2] + (endPosition[2] - startPosition[2]) * progress;
        
        line.position.set(x, y, z);
        
        // Pulse opacity based on position (fade in/out at ends)
        const opacityFactor = Math.sin(progress * Math.PI);
        
        // Type guard to ensure we're dealing with a mesh with a material that has opacity
        if (line instanceof THREE.Mesh && line.material instanceof THREE.Material && 'opacity' in line.material) {
          line.material.opacity = opacityFactor * 0.8;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#21B892" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

// HUD component for displaying metrics
const HUDOverlay = ({ 
  concurrentRequests 
}: { 
  concurrentRequests: number 
}) => {
  // Calculate latencies based on concurrent requests
  const maitaiLatency = Math.min(
    benchmarkData.maitai.baseLatency + (concurrentRequests * benchmarkData.loadImpactFactor),
    benchmarkData.maitai.maxLatency
  ).toFixed(1);
  
  const competitorLatency = Math.min(
    benchmarkData.competitor.baseLatency + (concurrentRequests * benchmarkData.loadImpactFactor * 3),
    benchmarkData.competitor.maxLatency
  ).toFixed(1);

  return (
    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded p-3 text-white space-y-2">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-maitai-lime mr-2"></div>
        <span>Maitai: <strong>{maitaiLatency} ms</strong></span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
        <span>Competitor: <strong>{competitorLatency} ms</strong></span>
      </div>
    </div>
  );
};

const LatencyRaceScene = ({ concurrentRequests }: { concurrentRequests: number }) => {
  // Start and end positions
  const startPos: [number, number, number] = [-2, 0, 0];
  const endPos: [number, number, number] = [2, 0, 0];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Left Sphere (Maitai) */}
      <RaceSphere position={startPos} color="#21B892" />
      
      {/* Right Sphere (Competitor) */}
      <RaceSphere position={endPos} color="#888" />
      
      {/* Animated pulse lines */}
      <PulseLines 
        count={Math.max(5, Math.min(50, Math.floor(concurrentRequests / 20)))} 
        startPosition={startPos} 
        endPosition={endPos} 
      />
    </>
  );
};

// Fallback component when WebGL is not available
const FallbackComponent = () => (
  <div className="h-[400px] flex flex-col md:flex-row items-center justify-center bg-gray-100 rounded-lg p-4">
    <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
      <picture>
        <source srcSet="/textures/latency-race-fallback.webp" type="image/webp" />
        <source srcSet="/textures/latency-race-fallback.png" type="image/png" />
        <img 
          src="/textures/latency-race-fallback.png" 
          alt="Maitai processes requests up to 5x faster than competitors" 
          className="max-w-full h-auto rounded shadow-md mx-auto" 
        />
      </picture>
    </div>
    <div className="md:w-1/2 text-center md:text-left">
      <h3 className="text-xl font-bold mb-2">Latency Comparison</h3>
      <p className="mb-4">Maitai processes requests up to 5x faster than competitors, with 80% less latency under high load.</p>
      <div className="flex justify-center md:justify-start space-x-8 mt-6">
        <div className="text-center">
          <div className="w-4 h-4 rounded-full bg-maitai-lime mx-auto mb-2"></div>
          <p className="font-semibold">Maitai</p>
          <p className="text-lg font-bold">~24ms</p>
        </div>
        <div className="text-center">
          <div className="w-4 h-4 rounded-full bg-gray-400 mx-auto mb-2"></div>
          <p className="font-semibold">Competitor</p>
          <p className="text-lg font-bold">~85ms</p>
        </div>
      </div>
    </div>
  </div>
);

const LatencyRace = () => {
  const [concurrentRequests, setConcurrentRequests] = useState(50);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // WebGL detection helper
  const handleCreated = ({ gl }: { gl: THREE.WebGLRenderer }) => {
    if (!gl.capabilities.isWebGL2) {
      setWebGLSupported(false);
    }
  };

  // Decide whether to show fallback
  const shouldShowFallback = !webGLSupported || prefersReducedMotion;

  return (
    <SectionWrapper backgroundColor="bg-gray-50">
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-8">
        Real-time Latency Comparison
      </h2>
      
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden bg-gray-900 shadow-lg">
        {shouldShowFallback ? (
          <FallbackComponent />
        ) : (
          <>
            <Suspense fallback={
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Loading 3D Scene...</p>
                </div>
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 6] }} onCreated={handleCreated}>
                <LatencyRaceScene concurrentRequests={concurrentRequests} />
              </Canvas>
            </Suspense>
            
            {/* HUD overlay */}
            <HUDOverlay concurrentRequests={concurrentRequests} />
          </>
        )}
      </div>
      
      <div className="mt-6 max-w-2xl mx-auto">
        <label htmlFor="concurrentRequestsSlider" className="block text-sm font-medium text-gray-700 mb-2">
          Simulated Concurrent Requests: {concurrentRequests}
        </label>
        <input
          type="range"
          id="concurrentRequestsSlider"
          min="10"
          max="1000"
          step="10"
          value={concurrentRequests}
          onChange={(e) => setConcurrentRequests(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          aria-label="Simulated Concurrent Requests"
        />
        <p className="text-sm text-gray-600 mt-2">
          Adjust the slider to see how Maitai maintains low latency even under high load compared to competitors.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default LatencyRace; 