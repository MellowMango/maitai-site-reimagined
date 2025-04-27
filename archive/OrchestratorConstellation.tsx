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
import { useIsMobile } from '@/hooks/useIsMobile'
import { useVoiceInput } from '@/hooks/useVoiceInput'
import { getColor, findRelevantNode } from '@/lib/hero-utils'
import HeroActively from './HeroActively'

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

  const description = "Maitai auto\u2011detects issues, optimizes tokens, and reroutes models in real time.";

  // Rotate projection 270 degrees counter-clockwise (90 degrees clockwise)
  const to2D = ([x, _y, z]: [number, number, number]) => [
    CENTER_X + z * 80, // New X is based on Z
    CENTER_Y + x * 80, // New Y is based on X
  ]

  // ⏭ Coming next: SVG layer, grid FX, glow effects, and text panels

  return (
    <section className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto px-6 lg:px-10">
        <HeroActively />
      </div>
    </section>
  )
}

export default OrchestratorConstellationComponent;
