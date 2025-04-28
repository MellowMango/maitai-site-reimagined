export interface Feature {
  id: string;
  title: string;
  description?: string; // Placeholder for potential future use
  // Add imageSrc or Component later for the right panel visualization
}

export const features: Feature[] = [
  {
    id: 'custom-fine-tuning',
    title: 'Custom Fine-Tuning',
    description: 'Models continuously learn from your data for peak accuracy.'
  },
  {
    id: 'voice-text-ready',
    title: 'Voice & Text Ready',
    description: 'Deploy agents optimized for both spoken and written interactions.'
  },
  {
    id: 'low-latency-inference',
    title: 'Low Latency Inference',
    description: 'Ultra-fast response times powered by cutting-edge hardware.'
  },
  {
    id: 'high-throughput',
    title: 'High Throughput',
    description: 'Handle large volumes of requests efficiently and reliably.'
  },
  {
    id: 'real-time-autocorrections',
    title: 'Real-time Autocorrections',
    description: 'Automatically detect and fix AI output faults before they cause issues.'
  },
  {
    id: 'continuous-monitoring',
    title: 'Continuous Monitoring',
    description: 'Live visibility into your AI\'s performance, health, and behavior.'
  },
  {
    id: 'actionable-ai-alerts',
    title: 'Actionable AI Alerts',
    description: 'Get notified immediately via integrations like PagerDuty if performance dips.'
  },
  {
    id: 'response-resiliency',
    title: 'Response Resiliency',
    description: 'Ensure consistent user experiences with automatic model fallback.'
  },
  {
    id: 'simple-api-integration',
    title: 'Simple API Integration',
    description: 'Get started quickly with minimal code changes using our straightforward API.'
  },
];
