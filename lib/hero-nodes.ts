// Types for node data
export interface HeroNode {
  id: string;
  title: string;
  kpi: string;  // Key Performance Indicator
  copy: string; // Tooltip/description text
  position: [number, number, number]; // Initial 3D position (for orbit calculation)
  color: string; // Tailwind color class or hex
}

// Constellation node data
export const heroNodes: HeroNode[] = [
  {
    id: 'routing',
    title: 'Intelligent Routing',
    kpi: '99.8% accuracy',
    copy: 'Routes requests to the optimal model based on content, requirements, and real-time performance.',
    position: [2, 0, 0], // East position (0° on circle)
    color: 'text-maitai-lime',
  },
  {
    id: 'lora',
    title: 'LoRA Swap',
    kpi: '95% smaller fine-tunes',
    copy: 'Hot-swap model customizations without redeploying your entire infrastructure.',
    position: [1.4, 0, 1.4], // Northeast position (45° on circle)
    color: 'text-maitai-lagoon',
  },
  {
    id: 'monitoring',
    title: 'Proactive Monitoring',
    kpi: '24/7 threat detection',
    copy: 'Continuously analyzes request and response patterns to detect and prevent anomalies.',
    position: [0, 0, 2], // North position (90° on circle)
    color: 'text-maitai-pineapple',
  },
  {
    id: 'cost-control',
    title: 'Cost Control',
    kpi: '40-70% savings',
    copy: 'Automatically optimizes token usage and ensures you only pay for what you need.',
    position: [-1.4, 0, 1.4], // Northwest position (135° on circle)
    color: 'text-maitai-rum',
  },
  {
    id: 'voice',
    title: 'Real-time Voice',
    kpi: '<50ms latency',
    copy: 'Ultra-low latency voice processing for natural, real-time conversations.',
    position: [-2, 0, 0], // West position (180° on circle)
    color: 'text-purple-500',
  },
];

// Central core data
export const coreNode = {
  id: 'core',
  title: 'Maitai Orchestrator',
  copy: 'The central AI orchestration layer that connects and optimizes your entire AI stack.',
  position: [0, 0, 0],
  color: 'text-maitai-lime',
};

// Function to calculate positions along a circle for animation
export const calculateOrbitPosition = (
  node: HeroNode, 
  time: number, 
  radius: number = 3, 
  speed: number = 0.5,
  centerY: number = 0
): [number, number, number] => {
  // Extract the angle from the original position
  const originalPos = node.position;
  const originalAngle = Math.atan2(originalPos[2], originalPos[0]);
  
  // Calculate new position with slight wobble
  const wobble = Math.sin(time * 2) * 0.1;
  const angle = originalAngle + time * speed;
  
  return [
    Math.cos(angle) * (radius + wobble),
    centerY,
    Math.sin(angle) * (radius + wobble)
  ];
}; 