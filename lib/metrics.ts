import React from 'react'; // Import React for ComponentType

// Removed PNG imports
// import ContinuouslyImprovingImg from '@/public/animations/phonely-case-study/continuously-improving-v2.png';
// import TpsGraphImg from '@/public/animations/phonely-case-study/tps-graph-v2.png';

// Import TSX components for Voice metrics
import AccuracyChart from '@/components/PerformanceSection/charts/AccuracyChart';
import TTFTComparison from '@/components/PerformanceSection/charts/TTFTComparison';

// Allow chart to be a URL string (for images in /public) or a React component
export interface MetricCardData {
  id: string;
  title: string;
  subhead: string;
  chart: string | React.ComponentType; // Changed StaticImageData to string
}

// Updated Data - Using correct URL paths for PNGs and components for TSX
export const metricsData: {
  text: MetricCardData[];
  voice: MetricCardData[];
} = {
  text: [
    {
      id: 'text-improvement',
      title: 'Continuously Improving Accuracy',
      subhead: 'Fine-tuned models outperform base LLMs',
      // Use correct public URL path for the image
      chart: '/performance/continuously-improving-v2.png', // Updated path
    },
    {
      id: 'text-throughput',
      title: 'High Throughput & Low Latency',
      subhead: 'Scales efficiently under load',
      // Use correct public URL path for the image
      chart: '/performance/tps-graph-v2.png', // Updated path
    },
  ],
  voice: [
    {
      id: 'voice-accuracy-iterations',
      title: 'Accuracy Across Iterations',
      subhead: 'Surpassing GPT-4o with fine-tuning',
      chart: AccuracyChart, // Use imported TSX component
    },
    {
      id: 'voice-ttft-comparison',
      title: 'Faster Time-To-First-Token (TTFT)',
      subhead: 'Significantly lower latency than legacy systems',
      chart: TTFTComparison, // Use imported TSX component
    },
  ],
};
