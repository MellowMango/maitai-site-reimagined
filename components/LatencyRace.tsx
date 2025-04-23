import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';

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

const LatencyRaceScene = () => {
  // Two static spheres: left and right
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* Left Sphere (Maitai) */}
      <RaceSphere position={[-2, 0, 0]} color="#21B892" />
      {/* Right Sphere (Competitor) */}
      <RaceSphere position={[2, 0, 0]} color="#888" />
      {/* TODO: Add animated pulse line between spheres */}
    </>
  );
};

const LatencyRace = () => {
  const [concurrentRequests, setConcurrentRequests] = useState(50); // Default value
  const [webGLSupported, setWebGLSupported] = useState(true); // Assume supported initially

  // TODO: Add WebGL detection logic (e.g., in useEffect)
  // TODO: Add prefers-reduced-motion detection

  // TODO: Load benchmark data from lib/benchmarks.json

  // TODO: Implement fallback rendering
  // if (!webGLSupported || prefersReducedMotion) {
  //   return <FallbackComponent />;
  // }

  return (
    // Using a standard section temporarily until SectionWrapper is implemented
    <section aria-labelledby="latency-race-title" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
       <h2 id="latency-race-title" className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-8">
           Real-time Latency Comparison
       </h2>
       <div className="relative h-[400px] w-full rounded-lg overflow-hidden bg-gray-900">
           <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading 3D Scene...</div>}> {/* Basic Suspense for model/texture loading */}
           <Canvas camera={{ position: [0, 0, 6] }} onCreated={({ gl }) => {
               // Basic check if context exists
               if (!gl.getContext()) {
               setWebGLSupported(false);
               }
           }}>
               <LatencyRaceScene /* pass concurrentRequests etc. as props */ />
           </Canvas>
           </Suspense>
           {/* TODO: Add HUD overlay here */}
           {/* <HUDComponent benchmarkData={...} /> */}
       </div>
       <div className="mt-6">
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
       </div>
     </div>
    </section>
  );
};

export default LatencyRace; 