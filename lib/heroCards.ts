import type { StaticImageData } from 'next/image';

// Remove faulty image imports as they are not valid image files and cause errors
// import PlaceholderImage from '@/public/img/hero/placeholder.svg';
// import PlaceholderLogo from '@/public/img/hero/placeholder-logo.svg';
// import PlaceholderThumb from '@/public/img/hero/placeholder-thumb.png';

export type HeroCardVariant = 'snapshot' | 'partnership' | 'event' | 'why';

export interface HeroCardData {
  id: string;
  variant: HeroCardVariant;
  title: string;
  body?: string;
  logo?: StaticImageData;   // partnership - Keep type for future use
  stat?: string;            // partnership highlight (e.g. "↓35% latency")
  date?: string;            // event
  location?: string;        // event
  thumb?: StaticImageData;  // event - Keep type for future use
}

// Placeholder Data - Replace with real data and image imports later
export const heroCardsData: HeroCardData[] = [
  // Snapshot Card (Always injected at index 0 by the component)
  {
    id: 'snapshot',
    variant: 'snapshot',
    title: 'High Performance AI For Enterprise',
    body: 'The fastest, highest accuracy, low latency inference to power serious production AI applications.',
    // illustrative SVG handled by gradient in component
  },
  // Partnership Card Example
  {
    id: 'partner-acme',
    variant: 'partnership',
    title: 'Acme Corp sees 35% drop in voice agent latency with Maitai',
    // logo: PlaceholderLogo, // Removed - Handled by gradient
    stat: '↓35% latency',
  },
  // Event Card Example
  {
    id: 'event-webinar-q3',
    variant: 'event',
    title: 'LlamaCon 2025: Meet us at the Groq booth!',
    date: 'April 29, 2025',
    location: 'San Francisco',
    // thumb: PlaceholderThumb, // Removed - Handled by gradient
  },
  // Why Card Example (Content TBD)
  {
    id: 'why-maitai',
    variant: 'why',
    title: 'Why Maitai? Unmatched Reliability.',
    body: 'Placeholder text explaining the core value proposition. More details to come after CEO workshop.',
    // illustrative SVG handled by gradient in component
  },
   // Another Event Card Example
   {
    id: 'event-conference-ny',
    variant: 'event',
    title: 'AI Dev Summit New York',
    date: 'November 15, 2024',
    location: 'Javits Center, NYC',
    // thumb: PlaceholderThumb, // Removed - Handled by gradient
  },
];
