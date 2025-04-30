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
      id: 'text-throughput',
      title: 'High Throughput & Low Latency',
      subhead: 'Scales efficiently under load',
      chart: '/performance/tps-graph-v2.png',
    },
    {
      id: 'text-improvement',
      title: 'Continuously Improving Accuracy',
      subhead: 'Fine-tuned models outperform base LLMs',
      chart: '/performance/continuously-improving-v2.png',
    },
  ],
  voice: [
    {
      id: 'voice-ttft-comparison',
      title: 'Faster Time-To-First-Token (TTFT)',
      subhead: 'Significantly lower latency than legacy systems',
      chart: TTFTComparison,
    },
    {
      id: 'voice-accuracy-iterations',
      title: 'Accuracy Across Iterations',
      subhead: 'Surpassing GPT-4o with fine-tuning',
      chart: AccuracyChart,
    },
  ],
};
