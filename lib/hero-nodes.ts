/**
 * Hero Nodes Data Module
 * 
 * Defines the data structure and content for the interactive hero constellation visualization.
 * The data represents the features of the Maitai Orchestrator displayed as nodes orbiting
 * around a central core in the hero section.
 * 
 * This module provides:
 * - Type definitions for node data
 * - Node content for specific features (intelligent routing, monitoring, etc.)
 * - Core node definition
 * - Helper function for orbital animation calculations
 */

// Types for node data
/**
 * HeroNode Interface
 * 
 * Defines the structure for interactive orbital nodes in the hero visualization.
 * 
 * @property {string} id - Unique identifier for the node
 * @property {string} title - Display title for the feature
 * @property {string} kpi - Key Performance Indicator to highlight feature value
 * @property {string} copy - Descriptive text shown in tooltips/info panels
 * @property {[number, number, number]} position - Initial 3D coordinates for orbit calculation
 * @property {string} color - Tailwind color class or hex value
 * @property {string} [progress] - Progress percentage for the node's completion status
 * @property {string} [ctaText] - Call-to-action button text specific to this node
 * @property {string} [ctaHref] - Link destination for the call-to-action button
 * @property {string[]} [keywords] - Keywords that trigger this node in the request input
 */
export interface HeroNode {
  id: string;
  title: string;
  kpi: string;  // Key Performance Indicator
  copy: string; // Tooltip/description text
  position: [number, number, number]; // Initial 3D position (for orbit calculation)
  color: string; // Tailwind color class or hex
  progress?: string; // Progress percentage
  ctaText?: string; // CTA text
  ctaHref?: string; // CTA link
  keywords?: string[]; // Keywords that trigger this node
}

// Constellation node data
/**
 * Hero Nodes Array
 * 
 * Collection of nodes representing Maitai Orchestrator features.
 * Nodes are positioned in a circular pattern around the core node,
 * with positions specified in 3D coordinates that create a circle
 * when viewed from above (in the X-Z plane).
 * 
 * Features represented:
 * - Intelligent Routing (East position)
 * - LoRA Swap (Northeast position)
 * - Proactive Monitoring (North position)
 * - Cost Control (Northwest position)
 * - Real-time Voice (West position)
 */
export const heroNodes: HeroNode[] = [
  {
    id: 'routing',
    title: 'Intelligent Routing',
    kpi: '99.8% accuracy',
    copy: 'Picks best model per call in <40 ms.',
    position: [2, 0, 0], // East position (0° on circle)
    color: 'text-maitai-lime',
    progress: '98%',
    ctaText: 'See Routing Docs',
    ctaHref: '/docs/routing',
    keywords: ['route', 'routes', 'routing', 'pick', 'select', 'model', 'send', 'request']
  },
  {
    id: 'lora',
    title: 'LoRA Swap',
    kpi: '95% smaller fine-tunes',
    copy: 'Hot-load domain LoRAs with zero downtime.',
    position: [1.4, 0, 1.4], // Northeast position (45° on circle)
    color: 'text-maitai-lagoon',
    progress: '85%',
    ctaText: 'Try LoRA Swap',
    ctaHref: '/docs/lora-swap',
    keywords: ['lora', 'fine-tune', 'finetune', 'customize', 'domain', 'training', 'swap']
  },
  {
    id: 'monitoring',
    title: 'Proactive Monitoring',
    kpi: '24/7 threat watch',
    copy: 'Detects drift, spikes alerts instantly.',
    position: [0, 0, 2], // North position (90° on circle)
    color: 'text-maitai-pineapple',
    progress: '92%',
    ctaText: 'View Monitoring',
    ctaHref: '/docs/monitoring',
    keywords: ['monitor', 'alert', 'watch', 'security', 'threats', 'detect', 'warning']
  },
  {
    id: 'cost-control',
    title: 'Cost Control',
    kpi: '40-70% savings',
    copy: 'Auto-throttles tokens & switches providers.',
    position: [-1.4, 0, 1.4], // Northwest position (135° on circle)
    color: 'text-maitai-rum',
    progress: '78%',
    ctaText: 'Calculate Savings',
    ctaHref: '/pricing',
    keywords: ['cost', 'price', 'saving', 'savings', 'budget', 'token', 'tokens', 'bill', 'billing']
  },
  {
    id: 'voice',
    title: 'Real-time Voice',
    kpi: '<50ms latency',
    copy: 'Natural conversation—no awkward gaps.',
    position: [-2, 0, 0], // West position (180° on circle)
    color: 'text-purple-500',
    progress: '94%',
    ctaText: 'Book Latency Test',
    ctaHref: '/demo/voice',
    keywords: ['voice', 'audio', 'speak', 'speech', 'call', 'talk', 'conversation', 'sound']
  },
];

// Central core data
/**
 * Core Node
 * 
 * The central node representing the Maitai Orchestrator itself.
 * Positioned at the center of the constellation (0,0,0).
 * 
 * Note: This uses a modified version of the HeroNode type, 
 * as it doesn't require a KPI value.
 */
export const coreNode: Omit<HeroNode, 'id' | 'kpi'> & { id: string } = {
  id: 'core',
  title: 'Maitai Orchestrator',
  copy: 'The central AI orchestration layer that connects and optimizes your entire AI stack.',
  position: [0, 0, 0] as [number, number, number],
  color: 'text-maitai-lime',
};

// Function to calculate positions along a circle for animation
/**
 * Orbital Position Calculator
 * 
 * Calculates new positions for nodes as they orbit around the central core.
 * Creates a smooth circular motion with slight wobble for visual interest.
 * 
 * @param {HeroNode} node - The node to calculate position for
 * @param {number} time - Current animation time value
 * @param {number} radius - Orbit radius (default: 3)
 * @param {number} speed - Orbital speed factor (default: 0.5)
 * @param {number} centerY - Y-axis center point (default: 0)
 * @returns {[number, number, number]} - New 3D position coordinates
 */
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