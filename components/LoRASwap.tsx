'use client';

import * as React from 'react';
import { loraChips } from '@/lib/lora-chips';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Placeholder Waveform component - replace with actual SVG animation
const AnimatedWaveform = () => (
  <div className="flex items-center justify-center space-x-1 h-4">
    <motion.span className="block w-1 h-full bg-maitai-lagoon" animate={{ scaleY: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: 'bottom' }} />
    <motion.span className="block w-1 h-full bg-maitai-lagoon" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} style={{ transformOrigin: 'bottom' }} />
    <motion.span className="block w-1 h-full bg-maitai-lagoon" animate={{ scaleY: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} style={{ transformOrigin: 'bottom' }} />
  </div>
);

// Function to highlight keywords in transcript
const HighlightedTranscript: React.FC<{ text: string }> = ({ text }) => {
    const keywords = ["Dr. Patel", "APR", "autopay", "zoning permit"]; // Add more keywords as needed
    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                keywords.some(keyword => new RegExp(`^${keyword}$`, 'i').test(part)) ? (
                    <span key={index} className="text-maitai-lagoon font-semibold">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};

export default function LoRASwap() {
  const [activeId, setActiveId] = React.useState<string>(loraChips[0].id);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false); // State for waveform
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const chipData = loraChips.find((c) => c.id === activeId);
    if (!chipData) return;

    const { mp3Src } = chipData;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
      audioRef.current = null;
      setIsPlaying(false); // Reset playing state
    }
    
    const timer = setTimeout(() => {
        const el = new Audio(mp3Src);
        
        const onPlay = () => setIsPlaying(true);
        const onEnded = () => setIsPlaying(false);
        const onPause = () => setIsPlaying(false); // Handle manual pause too
        
        el.addEventListener('play', onPlay);
        el.addEventListener('playing', onPlay); // Some browsers use this
        el.addEventListener('ended', onEnded);
        el.addEventListener('pause', onPause);
        
        el.play().catch((error) => {
            console.warn('Audio autoplay might be blocked:', error);
            setIsPlaying(false); // Ensure state is false if play fails
        });
        audioRef.current = el;

        // Cleanup listeners when audio element changes
        const cleanupListeners = () => {
            el.removeEventListener('play', onPlay);
            el.removeEventListener('playing', onPlay);
            el.removeEventListener('ended', onEnded);
            el.removeEventListener('pause', onPause);
        };
        
        // Store cleanup function in ref (a bit hacky, but works)
        (audioRef as any).current.cleanupListeners = cleanupListeners;

    }, 50);

    // Analytics (update if needed)
    if (typeof window !== 'undefined' && 'analytics' in window) {
      // Using Segment example
      (window as any).analytics.track('lora_swap', { 
        id: activeId, 
        label: chipData.label 
      });
    } else if (typeof window !== 'undefined' && 'dataLayer' in window) {
      // Fallback to dataLayer if analytics not present
      if (Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({
          event: 'lora_swap',
          lora_id: activeId,
          lora_label: chipData.label
        });
      } else {
        console.warn('dataLayer is not an array. Analytics event not sent.');
      }
    }
    
    return () => {
      clearTimeout(timer);
      // Cleanup listeners from the *previous* audio element if it exists
      if (audioRef.current && (audioRef as any).current.cleanupListeners) {
        (audioRef as any).current.cleanupListeners();
      }
    }; 

  }, [activeId]);

  React.useEffect(() => { // Unmount cleanup
      return () => {
          if (audioRef.current) {
              if ((audioRef as any).current.cleanupListeners) {
                 (audioRef as any).current.cleanupListeners(); // Cleanup listeners on unmount
              }
              audioRef.current.pause();
              audioRef.current.removeAttribute('src');
              audioRef.current = null;
              setIsPlaying(false);
          }
      };
  }, []);
  
  const handlePreload = (src: string) => {
    const p = new Audio(); 
    p.src = src;
  };
  
  const activeChip = loraChips.find((c) => c.id === activeId);
  if (!activeChip) {
      return <div className="w-full max-w-xl mx-auto rounded-lg bg-white p-6 shadow-md">Loading...</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto rounded-lg bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-xl border border-gray-200/50">
      <ToggleGroup.Root
        type="single"
        value={activeId}
        onValueChange={(val: string) => val && setActiveId(val)}
        aria-label="Select LoRA Example"
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {loraChips.map((chip) => (
          <ToggleGroup.Item
            key={chip.id}
            value={chip.id}
            onPointerEnter={() => handlePreload(chip.mp3Src)}
            onFocus={() => handlePreload(chip.mp3Src)}
            aria-label={`Select ${chip.label} example`}
            className={cn(
                `px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium transition-all duration-150 ease-in-out`,
                `focus:outline-none focus:ring-2 focus:ring-maitai-lime focus:ring-offset-2`,
                `data-[state=on]:bg-maitai-lime data-[state=on]:border-maitai-lime data-[state=on]:text-maitai-lagoon data-[state=on]:font-semibold`,
                `data-[state=off]:text-gray-600 data-[state=off]:hover:bg-maitai-mint-cream/60 data-[state=off]:hover:border-gray-400 data-[state=off]:hover:shadow-[0_2px_6px_rgba(0,0,0,.05)]`
            )}
          >
            {chip.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>

      {/* Transcript & Waveform */}
      <div className="min-h-[6rem] flex flex-col items-center justify-center text-center px-4 space-y-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={activeChip.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-base md:text-lg text-gray-700 leading-relaxed"
          >
            <HighlightedTranscript text={activeChip.transcript} />
          </motion.p>
        </AnimatePresence>

        {/* Animated Waveform */} 
        <div className="h-4"> {/* Container to prevent layout shift */} 
          {isPlaying && <AnimatedWaveform />} 
        </div>
      </div>
    </div>
  );
} 