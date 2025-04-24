import { heroNodes } from './hero-nodes'; // Assuming heroNodes is in the same directory or adjust path

/**
 * Color Mapping Utility
 * 
 * Converts Tailwind color class names to hex color values for SVG usage.
 * 
 * @param {string} cls - Tailwind color class name
 * @returns {string} - Hex color code
 */
export const getColor = (cls: string): string =>
  ({
    'text-maitai-lime': '#21B892',
    'text-maitai-lagoon': '#255D70',
    'text-maitai-pineapple': '#FFDB6A',
    'text-maitai-rum': '#EA5F40',
    'text-purple-500': '#8B5CF6',
  }[cls] ?? '#21B892');

/**
 * Request-to-Node Routing
 * 
 * Analyzes user input to determine the most relevant node based on keyword matching.
 * Used by the request input feature to simulate intelligent request routing.
 * 
 * @param {string} input - The user's request text
 * @returns {string|null} - The ID of the most relevant node or null if no match
 */
export const findRelevantNode = (input: string): string | null => {
  if (!input.trim()) return null;
  
  const lowercaseInput = input.toLowerCase();
  
  // Find node with the most keyword matches
  let bestMatch = { nodeId: null as string | null, matches: 0 };
  
  heroNodes.forEach(node => {
    // Ensure node has keywords before attempting to filter
    if (!node.keywords || !Array.isArray(node.keywords)) return;
    
    const matches = node.keywords.filter(keyword => 
      typeof keyword === 'string' && lowercaseInput.includes(keyword.toLowerCase())
    ).length;
    
    if (matches > bestMatch.matches) {
      bestMatch = { nodeId: node.id, matches };
    }
  });
  
  return bestMatch.nodeId;
}; 