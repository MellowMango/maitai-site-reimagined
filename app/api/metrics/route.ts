/**
 * Metrics API Route
 * 
 * Simulates real-time metrics for the Maitai Orchestrator UI.
 * Returns mock data for demo purposes that will later be replaced with real metrics.
 * 
 * Endpoint: GET /api/metrics?node={nodeId}
 * 
 * Parameters:
 * - node (optional): The ID of the node to get metrics for (e.g., 'routing', 'lora')
 *                    If omitted, returns default health metrics
 * 
 * Response Format:
 * {
 *   value: number,   // The metric value (percentage or ms)
 *   unit: string,    // The unit for the metric (%, ms, etc.)
 *   label: string    // Human-readable label for the metric
 * }
 * 
 * Usage Example:
 * fetch('/api/metrics?node=routing')
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 * 
 * Notes:
 * - Values are randomized within reasonable ranges for each metric type
 * - In production, this would connect to actual monitoring services
 * - Metrics are skewed to showcase expected performance characteristics
 */
import { NextResponse } from 'next/server';

/**
 * GET Handler for Metrics
 * 
 * Processes requests for node-specific or overall system metrics.
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {NextResponse} - JSON response with metric data
 */
export const GET = (request: Request) => {
  // Get the node ID from the request URL
  const url = new URL(request.url);
  const nodeId = url.searchParams.get('node');
  
  // Generate a random base value between 85-100
  const baseValue = Math.floor(85 + Math.random() * 15);
  
  /**
   * Metrics Configuration
   * 
   * Defines the behavior and characteristics of metrics for each node type.
   * Each metric has custom value ranges and units appropriate to its function.
   */
  const metrics = {
    routing: {
      value: Math.min(99.8, baseValue + 5), // Skew higher for routing
      unit: '%',
      label: 'Routing Accuracy'
    },
    lora: {
      value: baseValue - 5, // Skew lower for LoRA (it's newer tech)
      unit: '%',
      label: 'Size Reduction'
    },
    monitoring: {
      value: baseValue + 2,
      unit: '%',
      label: 'Threat Detection'
    },
    'cost-control': {
      value: 40 + Math.floor(Math.random() * 30), // Range 40-70
      unit: '%',
      label: 'Cost Savings'
    },
    voice: {
      value: 30 + Math.floor(Math.random() * 20), // Range 30-50 
      unit: 'ms',
      label: 'Voice Latency'
    },
    default: {
      value: baseValue,
      unit: '%',
      label: 'Overall Health'
    }
  };
  
  // Return the appropriate metrics or default
  return NextResponse.json(nodeId && nodeId in metrics 
    ? metrics[nodeId as keyof typeof metrics] 
    : metrics.default
  );
}; 