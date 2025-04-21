'use client';
import Image from 'next/image';

export default function ContinuousImprovementAnimation() {
  return (
    <div className="flex justify-center my-8"> 
      <Image
        src="/illustrations/Site v1 Assets/performance/continuously-improving-v2.png"
        alt="Continuously Improving Accuracy Chart"
        width={520} 
        height={440} 
        priority 
      />
    </div>
  );
}
