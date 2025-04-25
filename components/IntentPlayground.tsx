'use client';

import * as React from 'react';
// Use dynamic import for Monaco Editor to potentially reduce initial bundle size
import Editor from '@monaco-editor/react';
import ReactFlow, {
  Background, Controls, MiniMap, ReactFlowProvider, Node, Edge, Position, MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { yamlToGraph, IntentGraph } from '@/lib/intent-yaml';
import { motion } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';

// --- styling utils ------------------------------------------------------
const paneClasses =
  'h-[520px] w-full overflow-hidden rounded-lg shadow-lg border border-gray-200/80 bg-white';

// Updated default YAML
const defaultYaml = `data: support-tickets-q1
embed: text-embedding-lagoon-002
finetune: maitai-llama-3.1-8b
deploy: production`;

// Map graph nodes/edges to React Flow nodes/edges
const graphToFlow = (graph: IntentGraph): { nodes: Node[]; edges: Edge[] } => {
    const initialNodes: Node[] = graph.nodes.map((n, i) => ({
        id: n.id,
        // Simple linear positioning for now
        position: { x: 150, y: 50 + i * 100 }, 
        data: { label: `${n.type}: ${n.label}` }, // Combine type and label
        type: 'default', // Could use custom nodes later
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: { 
            background: '#f8fafc', // slate-50
            border: '1px solid #cbd5e1', // slate-300
            borderRadius: '6px', 
            padding: '10px 15px', 
            fontSize: '13px',
            minWidth: 180,
            textAlign: 'center',
        },
    }));

    const initialEdges: Edge[] = graph.edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { strokeWidth: 1.5, stroke: '#94a3b8' }, // slate-400
    }));

    return { nodes: initialNodes, edges: initialEdges };
};

// --- main component -----------------------------------------------------
export default function IntentPlayground() {
  const [yamlText, setYamlText] = React.useState<string>(defaultYaml);
  const [debouncedYaml] = useDebounce(yamlText, 300);
  const [flowData, setFlowData] = React.useState<{ nodes: Node[]; edges: Edge[] } | null>(null);
  const [parseError, setParseError] = React.useState<string | null>(null);

  // Parse YAML -> graph -> Flow data
  React.useEffect(() => {
    try {
      const graph = yamlToGraph(debouncedYaml);
      const flow = graphToFlow(graph);
      setFlowData(flow);
      setParseError(null); // Clear error on successful parse
    } catch (e: any) {
      setParseError(e.message || 'YAML parse error');
      setFlowData(null); // Clear graph on error
    }
  }, [debouncedYaml]);

  return (
    <section className="my-16 md:my-24">
      {/* Updated Header */}
      <header className="text-center mb-10"> {/* Increased bottom margin */} 
        <h2 className="text-3xl md:text-4xl font-semibold text-maitai-vampire-black">
          Visualize Your AI Workflow
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Edit the YAML on the left to describe your pipeline &mdash; Maitai instantly
          plots the steps on the right. The default fine-tune model is&nbsp;
          <strong className="font-semibold text-maitai-lime">maitai-llama-3.1-8b</strong>.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* ── YAML Editor ───────────────────────────── */}
        <div className={cn(paneClasses, 'bg-gray-900 text-gray-100')}>
          <Editor
            height="100%"
            defaultLanguage="yaml"
            theme="vs-dark" // Use a dark theme for the editor
            value={yamlText}
            onChange={(value) => setYamlText(value || '')} // Ensure value is always string
            options={{
              minimap: { enabled: false },
              fontFamily: `'Fira Code', Menlo, Monaco, 'Courier New', monospace`, // Corrected font family string
              fontSize: 13,
              lineNumbers: 'on',
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true, // Adjust layout on container resize
              tabSize: 2,
              insertSpaces: true,
              padding: { top: 12, bottom: 12 },
            }}
            aria-label="YAML intent specification editor"
          />
        </div>

        {/* ── Graph Pane ────────────────────────────── */}
        <div className={cn(paneClasses, 'relative')} role="img" aria-label="Visual intent flow">
          <ReactFlowProvider>
            {flowData ? (
              <ReactFlow
                nodes={flowData.nodes}
                edges={flowData.edges}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                proOptions={{ hideAttribution: true }} // Hide React Flow attribution
                className="bg-gradient-to-br from-slate-50 to-gray-100"
              >
                <Background gap={16} size={1} color="#e2e8f0" /> {/* slate-200 */} 
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Controls showInteractive={false} />
              </ReactFlow>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} // Fade in error message
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
                  <strong className="font-bold">Parse Error!</strong>
                  <span className="block sm:inline ml-2">{parseError ?? 'Invalid YAML format.'}</span>
                </div>
              </motion.div>
            )}
          </ReactFlowProvider>
        </div>
      </div>
    </section>
  );
} 