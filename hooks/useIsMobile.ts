import { useState, useEffect } from 'react';

/**
 * Mobile Detection Hook
 * 
 * Custom hook that detects if the current viewport is mobile-sized.
 * Used to optimize the UI and interactions for different device types.
 * 
 * @returns {boolean} - True if the viewport width is less than 768px
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    
    // Set initial state
    onResize()
    
    // Add listener
    window.addEventListener('resize', onResize)
    
    // Clean up listener
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}; 