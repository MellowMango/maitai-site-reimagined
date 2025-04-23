'use client';

import React, { useState } from 'react';
import { heroNodes, coreNode } from '@/lib/hero-nodes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// This is a temporary static SVG implementation
// Will be replaced with the Three.js version as per sprint plan

export default function OrchestratorConstellation() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 500;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  
  // Convert 3D positions to 2D for the SVG
  const convertPosition = (position: [number, number, number]): [number, number] => {
    const scale = 80; // Scale factor for visibility
    return [
      centerX + position[0] * scale,
      centerY + position[2] * scale // Using z as y for 2D projection
    ];
  };
  
  // Helper function to safely get a node position
  const getNodePosition = (id: string | null): [number, number, number] => {
    if (!id) return [0, 0, 0];
    const node = heroNodes.find(n => n.id === id);
    return node ? node.position : [0, 0, 0];
  };
  
  // Get color value from Tailwind class
  const getColor = (colorClass: string): string => {
    // Simple mapping of classes to hex colors
    const colorMap: Record<string, string> = {
      'text-maitai-lime': '#21B892',
      'text-maitai-lagoon': '#255D70',
      'text-maitai-pineapple': '#FFDB6A',
      'text-maitai-rum': '#EA5F40',
      'text-purple-500': '#8B5CF6',
    };
    
    return colorMap[colorClass] || '#21B892'; // Default to lime
  };
  
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans">
            AI Infrastructure That Heals Itself
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Maitai's orchestration layer builds resilience into your AI stack, optimizing performance and eliminating vulnerabilities in real-time.
          </p>
        </div>
        
        <div className="relative h-[500px] w-full">
          {/* Fake grid background */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #777 1px, transparent 1px), linear-gradient(to bottom, #777 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>
          
          {/* SVG Constellation */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="absolute inset-0"
            role="img"
            aria-labelledby="constellation-title"
          >
            <title id="constellation-title">Maitai Orchestrator Constellation</title>
            
            {/* Connection lines */}
            {heroNodes.map(node => {
              const corePos = convertPosition(coreNode.position);
              const nodePos = convertPosition(node.position);
              
              return (
                <line
                  key={`line-${node.id}`}
                  x1={corePos[0]}
                  y1={corePos[1]}
                  x2={nodePos[0]}
                  y2={nodePos[1]}
                  stroke={activeNode === node.id ? getColor(node.color) : "#aaa"}
                  strokeWidth={activeNode === node.id ? 2 : 1}
                  strokeDasharray={activeNode === node.id ? "none" : "4,4"}
                  opacity={activeNode === node.id ? 0.8 : 0.4}
                />
              );
            })}
            
            {/* Orbital nodes */}
            {heroNodes.map(node => {
              const [x, y] = convertPosition(node.position);
              const isActive = activeNode === node.id;
              
              return (
                <g key={node.id} 
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 12 : 8}
                    fill={getColor(node.color)}
                    opacity={isActive ? 1 : 0.7}
                    filter={isActive ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none"}
                  />
                  
                  {/* Add a glow effect for active nodes */}
                  {isActive && (
                    <circle
                      cx={x}
                      cy={y}
                      r={20}
                      fill="none"
                      stroke={getColor(node.color)}
                      opacity={0.3}
                      strokeWidth={2}
                    />
                  )}
                </g>
              );
            })}
            
            {/* Central core */}
            <circle
              cx={centerX}
              cy={centerY}
              r={20}
              fill={getColor(coreNode.color)}
              opacity={0.9}
              filter="drop-shadow(0 0 15px rgba(33, 184, 146, 0.6))"
            >
              <animate 
                attributeName="r" 
                values="20;22;20" 
                dur="3s" 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="opacity" 
                values="0.9;1;0.9" 
                dur="3s" 
                repeatCount="indefinite" 
              />
            </circle>
          </svg>
          
          {/* Tooltip for active node */}
          {activeNode && (
            <div 
              className="absolute bg-white rounded-lg shadow-lg p-4 max-w-xs transition-opacity duration-200 border border-gray-200"
              style={{
                left: convertPosition(getNodePosition(activeNode))[0],
                top: convertPosition(getNodePosition(activeNode))[1] + 20,
                transform: 'translateX(-50%)',
                zIndex: 10
              }}
            >
              <div className="font-bold text-lg">
                {heroNodes.find(n => n.id === activeNode)?.title}
              </div>
              <div className="text-maitai-lime font-semibold my-1">
                {heroNodes.find(n => n.id === activeNode)?.kpi}
              </div>
              <p className="text-gray-700 text-sm">
                {heroNodes.find(n => n.id === activeNode)?.copy}
              </p>
            </div>
          )}
          
          {/* CTA Dock */}
          <div className="absolute bottom-4 right-4 flex flex-col sm:flex-row gap-3">
            <Link href="/demo">
              <Button size="lg" variant="pineapple">
                Get a Demo
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-maitai-lagoon text-maitai-lagoon hover:bg-maitai-lagoon/10">
              Watch 90-sec Overview
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 