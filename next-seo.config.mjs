// Default SEO configuration for next-seo
// See https://github.com/garmeeh/next-seo for more options

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Maitai - AI-Powered Security', // Default title
  titleTemplate: '%s | Maitai', // Template for page titles
  description: 'Maitai provides cutting-edge AI solutions for enterprise security.', // Default description
  // canonical: 'https://trymaitai.ai', // Optional: Your canonical URL
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // url: 'https://trymaitai.ai',
    siteName: 'Maitai',
    title: 'Maitai: Run Better AI — Automatically.',
    description: 'Maitai auto‑detects issues, optimizes tokens, and reroutes models in real time for text and voice AI.',
    images: [
      {
        url: '/img/index/Social Preview-5.png', // Updated URL 
        width: 1200,
        height: 630,
        alt: 'Maitai - AI Infrastructure that Heals Itself', // Updated Alt Text
      },
    ],
  },
  // twitter: {
  //   handle: '@trymaitai', // Optional: Your Twitter handle
  //   site: '@trymaitai',   // Optional: Your Twitter handle
  //   cardType: 'summary_large_image',
  // },
};

export default defaultSEOConfig; 