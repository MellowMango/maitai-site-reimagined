import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github } from 'lucide-react'; // Placeholder social icons

const FOOTER_LINKS = {
  Product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Demo', href: '/demo' }, // Assuming a demo page exists
  ],
  Company: [
    { name: 'About Us', href: '/about' }, // Placeholder
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' }, // Placeholder
  ],
  Resources: [
    { name: 'Documentation', href: 'https://docs.trymaitai.ai' },
    { name: 'Blog', href: '/blog' }, // Placeholder
    { name: 'Support', href: '/support' }, // Placeholder
  ],
};

export default function Footer() {
  return (
    <footer className="bg-maitai-vampire-black text-gray-300">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Social */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" legacyBehavior>
              <Image
                src="/logos/logo-all-white.svg" // Use correct white logo filename
                alt="Maitai Logo"
                width={120}
                height={28}
              />
            </Link>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
              {/* Add actual social links later */}
            </div>
          </div>

          {/* Columns 2-4: Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="md:col-span-1">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-400 hover:text-white hover:underline"
                      legacyBehavior>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partner & Integrations Logos Section */}
        <div className="mt-12 pt-8 border-t border-gray-700/50 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
            Partners & Integrations
          </p>
          <div className="flex justify-center items-center flex-wrap gap-x-10 gap-y-6">
            {/* Add partner logos using next/image */}
            {/* TODO: Adjust width/height/layout as needed for visual balance */} 
            <Image src="/partner-companies/groq_seeklogo.png" alt="Groq Logo" width={80} height={24} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/partner-companies/meta_logo.png" alt="Meta Logo" width={80} height={24} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/partner-companies/Companies-1.png" alt="Partner Logo 1" width={80} height={24} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/partner-companies/Companies-2.png" alt="Partner Logo 2" width={80} height={24} className="opacity-70 hover:opacity-100 transition-opacity" />
            {/* Add more logos as needed */}
          </div>
        </div>

        {/* Compliance Badges Section */}
        {/* TODO: Compliance icons (SOC2.png, HIPAA.png, CCPA.png) are dark grey and may not be visible on the dark footer background. Consider using lighter versions or adding a contrasting background strip. */}
        <div className="mt-8 pt-8 border-t border-gray-700/50 flex justify-center items-center gap-x-6 gap-y-4">
          <Image 
            src="/compliance-icons/SOC2.png" 
            alt="SOC 2 Compliant"
            height={24} 
            width={60} // Adjust width based on aspect ratio or use layout fill
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image 
            src="/compliance-icons/HIPAA.png" 
            alt="HIPAA Compliant"
            height={24} 
            width={60} // Adjust width based on aspect ratio or use layout fill
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image 
            src="/compliance-icons/CCPA.png" 
            alt="CCPA Compliant"
            height={24} 
            width={60} // Adjust width based on aspect ratio or use layout fill
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          {/* Add GDPR badge here if/when available */}
        </div>

      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8">
        <div className="container mx-auto px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Maitai Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 