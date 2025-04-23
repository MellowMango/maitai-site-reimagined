'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { heroNodes, coreNode } from '@/lib/hero-nodes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// This is a temporary static SVG implementation
// Will be replaced with the Three.js version as per sprint plan

export default function OrchestratorConstellation() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [autoPlayActive, setAutoPlayActive] = useState<boolean>(true);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollRef = useRef<number>(0);
  
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
  
  // Helper to get the position for a tooltip
  const getTooltipPosition = (id: string | null): { left: number, top: number } => {
    const position = getNodePosition(id);
    const [x, y] = convertPosition(position);
    return {
      left: x,
      top: y + 20
    };
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
  
  // Get the descriptive copy for the active node or default
  const getActiveCopy = () => {
    if (!activeNode) {
      return "Maitai's orchestration layer builds resilience into your AI stack, optimizing performance and eliminating vulnerabilities in real-time.";
    }
    
    const node = heroNodes.find(n => n.id === activeNode);
    return node?.copy || "Maitai's orchestration layer builds resilience into your AI stack, optimizing performance and eliminating vulnerabilities in real-time.";
  };
  
  // Setup auto-play timeline
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create timeline with GSAP
    const tl = gsap.timeline({ 
      repeat: 0, 
      defaults: { ease: "power1.inOut" },
      onComplete: () => {
        // Only loop if user hasn't interacted
        if (!userInteracted) {
          // Wait a bit before restarting
          setTimeout(() => {
            if (!userInteracted) {
              tl.restart();
            }
          }, 3000);
        }
      }
    });
    
    // Start with core pulse
    tl.to("#core-circle", { 
      r: 25, 
      opacity: 1, 
      duration: 1, 
      repeat: 1, 
      yoyo: true 
    });
    
    // Highlight each node in sequence
    heroNodes.forEach((node, i) => {
      // Highlight the node
      tl.to(`#node-${node.id}`, { 
        r: 12, 
        opacity: 1, 
        duration: 0.5 
      });
      
      // Set active node for copy
      tl.call(() => setActiveNode(node.id));
      
      // Highlight the connection line
      tl.to(`#line-${node.id}`, {
        opacity: 0.8,
        strokeDasharray: "none",
        strokeWidth: 2,
        duration: 0.3
      }, "<");
      
      // Show glow
      tl.to(`#glow-${node.id}`, {
        opacity: 0.3,
        duration: 0.3
      }, "<");
      
      // Hold for a moment
      tl.to({}, { duration: 1 });
      
      // Return to normal
      tl.to(`#node-${node.id}`, {
        r: 8,
        opacity: 0.7,
        duration: 0.5
      });
      
      tl.to(`#line-${node.id}`, {
        opacity: 0.4,
        strokeDasharray: "4,4",
        strokeWidth: 1,
        duration: 0.3
      }, "<");
      
      tl.to(`#glow-${node.id}`, {
        opacity: 0,
        duration: 0.3
      }, "<");
      
      // Clear active node unless it's the last one
      if (i < heroNodes.length - 1) {
        tl.call(() => setActiveNode(null));
      }
    });
    
    // End with CTA bounce
    tl.to(".cta-button", { 
      y: -6, 
      repeat: 1, 
      yoyo: true, 
      duration: 0.4 
    });
    
    timelineRef.current = tl;
    
    // Play timeline on mount using requestIdleCallback for performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (timelineRef.current && !userInteracted) {
          timelineRef.current.play();
        }
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        if (timelineRef.current && !userInteracted) {
          timelineRef.current.play();
        }
      }, 200);
    }
    
    // Setup scroll listener for parallax
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      
      // Simple parallax effect on grid
      if (svgRef.current) {
        const grid = document.getElementById('grid-background');
        if (grid) {
          const translateY = scrollRef.current * 0.1;
          grid.style.transform = `translateY(${translateY}px)`;
        }
        
        // Scale core slightly based on scroll
        const core = document.getElementById('core-circle');
        if (core) {
          const scrollProgress = Math.min(scrollRef.current / 500, 1);
          const scale = 1 + scrollProgress * 0.05;
          core.style.transform = `scale(${scale})`;
        }
        
        // If user scrolls, pause the auto animation
        if (scrollRef.current > 100 && autoPlayActive) {
          setAutoPlayActive(false);
          setUserInteracted(true);
          if (timelineRef.current) {
            timelineRef.current.pause();
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [userInteracted]);
  
  // Handle user interaction
  const handleNodeInteraction = (nodeId: string) => {
    // Pause timeline when user interacts
    if (autoPlayActive) {
      setAutoPlayActive(false);
      setUserInteracted(true);
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    }
    
    setActiveNode(nodeId);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        // User is navigating with keyboard
        setAutoPlayActive(false);
        setUserInteracted(true);
        if (timelineRef.current) {
          timelineRef.current.pause();
        }
      }
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        // Find the next node
        const currentIndex = activeNode ? heroNodes.findIndex(n => n.id === activeNode) : -1;
        const nextIndex = (currentIndex + 1) % heroNodes.length;
        setActiveNode(heroNodes[nextIndex].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        // Find the previous node
        const currentIndex = activeNode ? heroNodes.findIndex(n => n.id === activeNode) : 0;
        const prevIndex = (currentIndex - 1 + heroNodes.length) % heroNodes.length;
        setActiveNode(heroNodes[prevIndex].id);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeNode]);
  
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Left column for text and CTA */}
          <div className="w-full md:w-5/12 text-left mb-12 md:mb-0 md:pt-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans">
              AI Infrastructure That Heals Itself
            </h1>
            
            {/* Fixed height container for description to prevent layout shift */}
            <div className="h-24 mt-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeNode || 'default'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-lg md:text-xl text-gray-700"
                >
                  {getActiveCopy()}
                </motion.p>
              </AnimatePresence>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8">
              <Link href="/demo">
                <Button 
                  size="lg" 
                  variant="pineapple" 
                  className="cta-button"
                  onClick={() => {
                    // Track click via GTM (would use actual GTM helper in production)
                    if (typeof window !== 'undefined' && 'dataLayer' in window) {
                      (window as any).dataLayer.push({
                        event: 'hero_cta_click',
                        label: 'demo'
                      });
                    }
                  }}
                >
                  Get a Demo
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right column for animation */}
          <div className="w-full md:w-7/12 relative h-[500px]">
            {/* Grid background with parallax */}
            <div 
              id="grid-background"
              className="absolute inset-0 opacity-[0.06] pointer-events-none transition-transform"
              style={{
                backgroundImage: 'linear-gradient(to right, #777 1px, transparent 1px), linear-gradient(to bottom, #777 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            ></div>
            
            {/* SVG Constellation */}
            <svg 
              ref={svgRef}
              width="100%" 
              height="100%" 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="absolute inset-0"
              role="img"
              aria-labelledby="constellation-title"
            >
              <title id="constellation-title">Maitai Orchestrator Constellation</title>
              
              {/* Particle flow visualization */}
              <g className="particles">
                {Array.from({ length: 30 }).map((_, i) => {
                  const direction = i % 2 === 0 ? 1 : -1;
                  const startX = centerX + (Math.random() * 200 - 100);
                  const startY = centerY + (Math.random() * 200 - 100);
                  const speed = 2 + Math.random() * 8;
                  
                  return (
                    <circle
                      key={`particle-${i}`}
                      cx={startX}
                      cy={startY}
                      r={1 + Math.random() * 1.5}
                      fill={getColor("text-maitai-lime")}
                      opacity={0.3 + Math.random() * 0.3}
                    >
                      <animate
                        attributeName="opacity"
                        values="0;0.6;0"
                        dur={`${speed}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 5}s`}
                      />
                      <animate
                        attributeName="cx"
                        values={`${startX};${centerX};${centerX + direction * 150}`}
                        dur={`${speed}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 5}s`}
                      />
                      <animate
                        attributeName="cy"
                        values={`${startY};${centerY};${startY + (Math.random() * 40 - 20)}`}
                        dur={`${speed}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 5}s`}
                      />
                    </circle>
                  );
                })}
              </g>
              
              {/* Connection lines */}
              {heroNodes.map(node => {
                const corePos = convertPosition(coreNode.position as [number, number, number]);
                const nodePos = convertPosition(node.position);
                
                return (
                  <line
                    id={`line-${node.id}`}
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
                  <g 
                    key={node.id} 
                    onMouseEnter={() => handleNodeInteraction(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className="cursor-pointer"
                    role="button"
                    aria-pressed={isActive}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleNodeInteraction(node.id);
                      }
                    }}
                  >
                    <circle
                      id={`node-${node.id}`}
                      cx={x}
                      cy={y}
                      r={isActive ? 12 : 8}
                      fill={getColor(node.color)}
                      opacity={isActive ? 1 : 0.7}
                      filter={isActive ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none"}
                    />
                    
                    {/* Add a glow effect for active nodes */}
                    <circle
                      id={`glow-${node.id}`}
                      cx={x}
                      cy={y}
                      r={20}
                      fill="none"
                      stroke={getColor(node.color)}
                      opacity={isActive ? 0.3 : 0}
                      strokeWidth={2}
                    />
                    
                    {/* Add focus outline for keyboard navigation */}
                    <circle
                      cx={x}
                      cy={y}
                      r={16}
                      fill="none"
                      stroke="#FFDB6A"
                      opacity={0}
                      strokeWidth={2}
                      className="focus-outline"
                      style={{ opacity: 0 }}
                    />
                  </g>
                );
              })}
              
              {/* Central core with pulsating animation */}
              <circle
                id="core-circle"
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
            <div className="absolute inset-0 pointer-events-none">
              <AnimatePresence>
                {activeNode && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-200"
                    style={{
                      left: getTooltipPosition(activeNode).left,
                      top: getTooltipPosition(activeNode).top,
                      transform: 'translateX(-50%)',
                      zIndex: 10
                    }}
                    aria-live="polite"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backup static buttons for accessibility and SEO */}
      <div className="sr-only">
        <a href="/demo">Get a Demo</a>
      </div>
    </section>
  );
} 