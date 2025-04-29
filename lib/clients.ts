import { StaticImageData } from 'next/image';

// Define individual item types
type LogoClient = {
  type: 'logo';
  name: string;
  logoUrl: string | StaticImageData; // Allow static imports
  span?: number; // Optional grid span (e.g., 1 or 2)
};

type QuoteClient = {
  type: 'quote';
  quote: string;
  name: string;
  title: string;
  company: string;
  blogUrl?: string; // Optional: Link to specific blog post/case study
  bgColor?: string; // e.g., 'bg-cyan-100'
  textColor?: string; // e.g., 'text-cyan-900'
  span?: number;
};

type ImageClient = {
  type: 'image';
  name: string;
  company: string;
  imageUrl: string | StaticImageData; // Allow static imports
  blogUrl?: string; // Optional: Link to specific blog post/case study
  span?: number;
};

// Union type for grid items
export type ClientGridItem = LogoClient | QuoteClient | ImageClient;

// Placeholder Data (replace with real client data and import actual images)
// TODO: Update blogUrl fields below with actual links when available.
export const clientData: ClientGridItem[] = [ // Reduced to a single row (4 items total width on lg)
  {
    type: 'image',
    name: 'Will Bodewes',
    company: 'CEO, Phonely', 
    imageUrl: '/img/clients/phonely/will-bodewes-headshot.png', // Updated image path
    blogUrl: '/blog/phonely-story', // Placeholder specific link
    span: 1,
  },
  {
    type: 'logo',
    name: 'Phonely',
    logoUrl: '/img/clients/phonely/PhonelyLogo.png', // Use actual Phonely logo path
    span: 1,
  },
  {
    type: 'quote',
    quote: 'Through Maitai, our customers are able to get access to custom fine-tuned models running on the fastest infrastructure in a matter of minutes, not months. This has allowed enterprises running on Phonely to scale to tens of thousands of calls per day with lower latency and higher accuracy than any closed-source model.',
    name: 'Will Bodewes',
    title: 'CEO, Phonely',
    company: 'Phonely',
    blogUrl: '/blog/clients/phonely-story', // Placeholder specific link
    bgColor: 'bg-teal-100', // Example color change
    textColor: 'text-teal-900',
    span: 2, // Example span - spans 2 columns
  },
  // --- End of First Row (4 columns total) ---

  /* // --- Placeholder for Second Row --- 
  {
    type: 'logo',
    name: 'Client E',
    logoUrl: '/img/clients/placeholder-logo.svg',
    span: 1,
  },
  {
    type: 'image',
    name: 'Person D',
    company: 'Company D',
    imageUrl: '/img/clients/placeholder-person-4.jpg',
    span: 1,
  },
   {
    type: 'logo',
    name: 'Client F',
    logoUrl: '/img/clients/placeholder-logo.svg',
    span: 1,
  },
   {
    type: 'logo',
    name: 'Client G',
    logoUrl: '/img/clients/placeholder-logo.svg',
    span: 1,
  },
  */

  /* // --- Placeholder for Third Row --- 
   {
    type: 'quote',
    quote: 'Another amazing quote about Maitai.',
    name: 'Person E',
    title: 'Lead Engineer',
    company: 'Company E',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-900',
    span: 2,
  },
  {
    type: 'logo',
    name: 'Client H',
    logoUrl: '/img/clients/placeholder-logo.svg',
    span: 1,
  },
  {
    type: 'image',
    name: 'Person F',
    company: 'Company F',
    imageUrl: '/img/clients/placeholder-person-5.jpg',
    span: 1,
  },
 */

  // Add more rows as needed following the pattern

];
