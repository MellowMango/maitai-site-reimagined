'use client'

/**
 * OrchestratorConstellation Component
 * 
 * An interactive hero section that showcases Maitai's AI orchestration capabilities through a 
 * visually engaging constellation visualization with interactive elements that simulate the 
 * platform's key features.
 * 
 * Core Features:
 * 1. Interactive orbital node visualization with real-time metrics
 * 2. Request simulation with intelligent routing
 * 3. Contextual call-to-actions based on active nodes
 * 4. Responsive design with mobile optimizations
 * 5. Animated state transitions and completion feedback
 * 
 * Architecture:
 * - Data model defined in lib/hero-nodes.ts
 * - Metrics simulation via /api/metrics endpoint
 * - Uses Framer Motion and GSAP for animations
 * - Toast notifications for feedback and completion indicators
 * 
 * User Interaction Flow:
 * - Initial load: Auto-play sequence highlights each feature node
 * - Request input: Users can type requests that get intelligently routed to relevant nodes
 * - Node hover/click: Shows detailed information with contextual CTA
 * - Completion: Success badge appears when demo cycle completes
 * 
 * Performance Considerations:
 * - Reduced animations on mobile devices
 * - Throttled network requests for metrics
 * - Hidden elements when overlapping to prevent render conflicts
 * 
 * Accessibility Features:
 * - Keyboard navigation support
 * - ARIA attributes and screen reader support
 * - Visible focus states
 * - Alternative text content
 */

import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { heroNodes, coreNode } from '@/lib/hero-nodes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Enhanced utilities
import { useIsMobile } from '@/hooks/useIsMobile'
import { useVoiceInput } from '@/hooks/useVoiceInput'
import { getColor, findRelevantNode } from '@/lib/hero-utils'

// Constants for SVG layout
const SVG_WIDTH = 960
const SVG_HEIGHT = 580
const CENTER_X = SVG_WIDTH / 2
const CENTER_Y = SVG_HEIGHT / 2
const NODE_RADIUS_DEFAULT = 7
const NODE_RADIUS_ACTIVE = 12
const GLOW_RADIUS = 26

// -- New layer: Live metrics visual state
const getStatusColor = (kpi: string) => {
  const num = parseFloat(kpi.replace('%', ''))
  if (num >= 95) return 'text-green-400'
  if (num >= 85) return 'text-yellow-400'
  return 'text-red-400'
}

/* ------------------------------------------------------------------ */
/*  ⮕  SIDE NAV (Re-added)                                            */
/* ------------------------------------------------------------------ */
const SideNav = ({ 
  hovering, 
  setActiveNode, 
  isMobile 
}: {
  hovering: boolean;
  setActiveNode: (id: string | null) => void;
  isMobile: boolean;
}) => {

  // Map SideNav labels to arbitrary node IDs
  const labelToNodeIdMap: Record<string, string> = {
    applications: 'routing',
    datasets: 'lora',
    models: 'voice',
    runs: 'cost-control',
    monitoring: 'monitoring',
  };

  const handleMouseEnter = (label: string) => {
    if (isMobile) return;
    const lowerLabel = label.toLowerCase(); // Store lowercase label
    const nodeId = labelToNodeIdMap[lowerLabel]; 
    console.log(`Hovering over: ${label}, Lowercase: ${lowerLabel}, Found Node ID: ${nodeId}`); // Log mapping info
    if (nodeId) {
      setActiveNode(nodeId);
    }
  };

  const handleMouseLeave = (label: string) => {
    if (isMobile) return;
    // If the mouse leaves a SideNav item, attempt to deactivate 
    // the corresponding node (if it was the active one).
    // The node's own onMouseLeave with setTimeout will handle the actual deactivation
    // This prevents conflicts if the mouse moves quickly to another SideNav item.
    const nodeId = labelToNodeIdMap[label.toLowerCase()];
    // Intentionally do nothing here - let the node's own mouseleave handle it
    // setActiveNode(null); // Previous incorrect attempt removed
  };

  // Return the motion component for the side navigation
  return (
    <motion.aside
      initial={{ x: -12, opacity: 0.15 }}
      animate={hovering ? { x: 0, opacity: 0.75 } : { x: -12, opacity: 0.15 }}
      transition={{ type: 'spring', stiffness: 190, damping: 32 }}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-5 text-[11px] uppercase tracking-widest text-zinc-600 font-medium select-none"
    >
      {['Applications', 'Datasets', 'Models', 'Runs', 'Monitoring'].map((t) => (
        <span 
          key={t}
          onMouseEnter={() => handleMouseEnter(t)}
          onMouseLeave={() => handleMouseLeave(t)}
          className={`transition-colors cursor-pointer hover:text-zinc-800`}
        >
          {t}
        </span>
      ))}
    </motion.aside>
  );
}

// Rename the main component function and export as default separately
function OrchestratorConstellationComponent() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState<string | null>(null)
  const [autoPlay, setAutoPlay] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [request, setRequest] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const svgRef = useRef<SVGSVGElement | null>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // -- Optional: Enable voice recognition on desktop
  useVoiceInput(setRequest)

  // Narrative start sequence (simulate system awakening)
  useEffect(() => {
    if (isMobile || !autoPlay) return

    let current = 0
    const sequence = () => {
      if (current >= heroNodes.length) {
        setCompleted(true)
        toast.success('System stabilized and optimized.', {
          icon: '🌐',
          position: 'top-right',
        })
        return
      }

      const node = heroNodes[current]
      setActive(node.id)

      setTimeout(() => {
        setActive(null)
        current++
        sequence()
      }, 1800)
    }

    sequence()
  }, [isMobile, autoPlay])

  const stopAuto = () => {
    if (autoPlay) {
      setAutoPlay(false)
      setShowIntro(false)
    }
  }

  const handleNodeClick = (id: string) => {
    stopAuto()
    setActive((prev) => (prev === id ? null : id))
  }

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!request.trim() || isProcessing) return
    stopAuto()
    setIsProcessing(true)

    const nodeId = findRelevantNode(request)
    setTimeout(() => {
      setIsProcessing(false)
      if (nodeId) {
        setActive(nodeId)
        toast.success(`Routed to ${heroNodes.find(n => n.id === nodeId)?.title}`, {
          position: 'top-right',
        })
        setRequest('')
      } else {
        toast.error('No matching node found for your request.')
      }
    }, 500)
  }

  const description =
    heroNodes.find((n) => n.id === active)?.copy ??
    "Maitai's AI infrastructure dynamically heals itself — optimizing routes, correcting latency, and reinforcing security live."

  // Rotate projection 270 degrees counter-clockwise (90 degrees clockwise)
  const to2D = ([x, _y, z]: [number, number, number]) => [
    CENTER_X + z * 80, // New X is based on Z
    CENTER_Y + x * 80, // New Y is based on X
  ]

  // ⏭ Coming next: SVG layer, grid FX, glow effects, and text panels

  return (
    <section className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto flex flex-col md:flex-row gap-10 px-6 lg:px-10">
        {/* Left Panel */}
        <div className="md:w-5/12 z-10">
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            AI Infrastructure That Heals Itself
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={description.substring(0, 16)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-6 text-lg md:text-xl text-gray-700 min-h-[5.5rem]"
            >
              {description}
            </motion.p>
          </AnimatePresence>

          <form
            onSubmit={handleRequestSubmit}
            className="mt-8 flex flex-col gap-6 max-w-md"
          >
            <input
              type="text"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Ask a question or give a command"
              disabled={isProcessing}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:border-maitai-lime focus:ring-maitai-lime outline-none"
            />
            <Button type="submit" disabled={isProcessing} variant="pineapple">
              {isProcessing ? 'Routing...' : 'Run Request'}
            </Button>
          </form>

          <Link href="/demo" className="inline-block mt-4">
            <Button variant="pineapple" size="lg">Get a Demo</Button>
          </Link>
        </div>

        {/* Right Panel — Interactive Constellation */}
        <div
          className="md:w-7/12 h-[560px] relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* SideNav added back */} 
          <SideNav hovering={hovering} setActiveNode={setActive} isMobile={isMobile} />

          {/* Background parallax grid */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            animate={{ opacity: active ? 0.5 : 0.7 }}
            transition={{ duration: 0.3 }}
          />

          {/* SVG Node Graph */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="absolute inset-0 w-full h-full"
            aria-label="Maitai AI Network"
          >
            {/* Connection Lines */}
            {heroNodes.map((n) => {
              const [x, y] = to2D(n.position)
              const [cx, cy] = to2D(coreNode.position)
              const isAct = active === n.id
              return (
                <line
                  key={`line-${n.id}`}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={isAct ? getColor(n.color) : '#999'}
                  strokeWidth={isAct ? 2 : 1}
                  strokeDasharray={isAct ? '0' : '4 4'}
                  opacity={isAct ? 0.9 : 0.4}
                />
              )
            })}

            {/* Nodes */}
            {heroNodes.map((n) => {
              const [x, y] = to2D(n.position)
              const isAct = active === n.id
              return (
                <g
                  key={n.id}
                  onClick={() => handleNodeClick(n.id)}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      stopAuto()
                      setActive(n.id)
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      leaveTimeoutRef.current = setTimeout(() => setActive(null), 100)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: ReactKeyboardEvent) =>
                    ['Enter', ' '].includes(e.key) && handleNodeClick(n.id)
                  }
                >
                  {/* Label */}
                  <foreignObject
                    x={x - 70}
                    y={y - 55} // Adjusted y-offset slightly for larger text
                    width={140}
                    height={52} // Increased height slightly
                    style={{ pointerEvents: 'none' }}
                  >
                    <AnimatePresence>
                      {isAct && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.25 }}
                          className="inline-block rounded bg-zinc-900/95 p-2 text-center text-sm font-medium text-zinc-100 shadow backdrop-blur-sm" // Changed text-xs to text-sm
                        >
                          <span className="block font-semibold">{n.title}</span>
                          <span className={`block mt-0.5 ${getStatusColor(n.kpi)}`}>{n.kpi}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </foreignObject>

                  {/* Node */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isAct ? NODE_RADIUS_ACTIVE : NODE_RADIUS_DEFAULT}
                    fill={getColor(n.color)}
                    opacity={isAct ? 1 : 0.7}
                    filter={isAct ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : ""}
                  />

                  {/* Glow Effect */}
                  {isAct && (
                    <circle
                      cx={x}
                      cy={y}
                      r={GLOW_RADIUS}
                      fill="none"
                      stroke={getColor(n.color)}
                      strokeWidth={2}
                      opacity={0.25}
                    />
                  )}
                </g>
              )
            })}

            {/* Core Node */}
            <defs>
              <radialGradient id="coreGradient" r="65%">
                <stop offset="0%" stopColor="#2EDCB5" />
                <stop offset="100%" stopColor="#21B892" />
              </radialGradient>
            </defs>
            <circle
              id="core-circle"
              cx={CENTER_X}
              cy={CENTER_Y}
              r={24}
              fill="url(#coreGradient)"
              opacity={0.95}
              filter="drop-shadow(0 0 12px rgba(33,184,146,0.6))"
            />
          </svg>

          {/* Completion Badge */}
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-6 right-6 bg-black/80 text-white text-xs py-1 px-3 rounded-full flex items-center gap-2 backdrop-blur"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Stack Fortified
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default OrchestratorConstellationComponent;
