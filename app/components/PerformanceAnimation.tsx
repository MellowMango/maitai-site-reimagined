'use client';
import Image from 'next/image';

export default function PerformanceAnimation() {
  return (
    <div className="flex justify-center my-8">
      <Image
        src="/illustrations/Site v1 Assets/performance/tps-graph-v2.png"
        alt="Tokens Per Second Comparison Chart"
        width={520}
        height={440}
        priority
      />
    </div>
  );
}
