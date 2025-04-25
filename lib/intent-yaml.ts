import yaml from 'js-yaml';

export type IntentNode = {
  id: string;
  label: string;
  type: 'data' | 'embed' | 'finetune' | 'deploy';
};

export type IntentEdge = { id: string; source: string; target: string };

export type IntentGraph = { nodes: IntentNode[]; edges: IntentEdge[] };

/**
 * Minimal YAML → graph mapper.
 * Expects YAML like:
 *   data: my-dataset
 *   embed: text-embedding-ada-002
 *   finetune: gpt-3.5-turbo
 *   deploy: production
 */
export function yamlToGraph(raw: string): IntentGraph {
  const doc = yaml.load(raw) as Record<string, string>;
  if (typeof doc !== 'object' || !doc) throw new Error('Invalid YAML');
  const steps = ['data', 'embed', 'finetune', 'deploy'] as const;

  const nodes = steps
    .filter((k) => k in doc)
    .map<IntentNode>((k) => ({
      id: k,
      label: doc[k]!,
      type: k,
    }));

  const edges = nodes.slice(1).map<IntentEdge>((n, i) => ({
    id: `${nodes[i].id}-${n.id}`,
    source: nodes[i].id,
    target: n.id,
  }));

  return { nodes, edges };
} 