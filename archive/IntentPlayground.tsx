// 'use client'; // Assuming this component is client-side

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import {
//   ReactFlow,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Background,
//   Controls,
//   MiniMap,
//   ReactFlowProvider,
//   Node,
//   Edge,
//   Position,
//   MarkerType
// } from 'reactflow'; 
// // Removed React Flow CSS import as the library is uninstalled
import { yamlToGraph, IntentGraph } from '@/lib/intent-yaml'; // Keep this if intent-yaml is still relevant
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; // Assuming react-hot-toast is installed

// Placeholder: Define a simplified component or return null if React Flow was essential
const IntentPlayground = () => {
  // Comment out or remove React Flow specific state and logic
  // const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [yamlInput, setYamlInput] = useState('');
  // const [graphData, setGraphData] = useState<IntentGraph | null>(null);

  // const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // const handleYamlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setYamlInput(event.target.value);
  // };

  // useEffect(() => {
  //   try {
  //     const graph = yamlToGraph(yamlInput);
  //     setGraphData(graph);
  //     setNodes(graph.nodes);
  //     setEdges(graph.edges);
  //     toast.success('YAML parsed successfully!');
  //   } catch (error: any) {
  //     setNodes([]);
  //     setEdges([]);
  //     if (yamlInput.trim()) { // Only show error if input is not empty
  //       toast.error(`YAML Parsing Error: ${error.message}`);
  //     }
  //   }
  // }, [yamlInput, setNodes, setEdges]);

  // Return null or a placeholder since React Flow is removed
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Intent Playground (Temporarily Disabled)</h3>
      <p className="text-gray-600">This component requires React Flow, which has been removed.</p>
      {/* Optionally keep YAML input/output if useful */}
      {/* <Textarea 
        placeholder="Enter YAML definition..."
        value={yamlInput}
        onChange={handleYamlChange} 
        className="min-h-[150px] font-mono text-sm mb-4"
      /> */}
    </div>
  );

  // Original return statement (commented out):
  // return (
  //   <ReactFlowProvider>
  //     <div className="flex flex-col md:flex-row gap-4 h-[600px]">
  //       <div className="w-full md:w-1/3">
  //         <Textarea
  //           placeholder="Enter YAML definition..."
  //           value={yamlInput}
  //           onChange={handleYamlChange}
  //           className="min-h-[400px] md:min-h-full font-mono text-sm"
  //         />
  //       </div>
  //       <div className="w-full md:w-2/3 h-full border rounded-lg overflow-hidden relative">
  //         <ReactFlow
  //           nodes={nodes}
  //           edges={edges}
  //           onNodesChange={onNodesChange}
  //           onEdgesChange={onEdgesChange}
  //           onConnect={onConnect}
  //           fitView
  //           className="bg-white"
  //         >
  //           <Controls />
  //           <MiniMap />
  //           <Background gap={12} size={1} />
  //         </ReactFlow>
  //       </div>
  //     </div>
  //   </ReactFlowProvider>
  // );
};

export default IntentPlayground; 
