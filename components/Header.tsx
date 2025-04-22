'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react'; // For mobile menu icon
import { cn } from '@/lib/utils';

// Import shadcn components
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose // Import SheetClose for closing on link click
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: 'Features', href: '/#features' }, // Example internal link
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://docs.trymaitai.ai' }, // External link
  { name: 'Careers', href: '/careers' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // Mobile menu state is now handled by the Sheet component
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust scroll threshold if needed
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use correct logo filenames based on public/logos/
  const logoSrc = isScrolled ? '/logos/logo-all-white.svg' : '/logos/logo-black-resized.svg';

  // Outer header controls fixed position and base styles
  const headerBaseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out';

  // Inner div controls the pill effect and content alignment
  const innerDivClasses = cn(
    'flex items-center justify-between h-16',
    'transition-all duration-300 ease-in-out',
    isScrolled
      ? 'bg-maitai-vampire-black/90 backdrop-blur-sm rounded-full max-w-fit mx-auto px-4 shadow-lg mt-2 border border-gray-700/50' // Scrolled: Pill effect
      : 'container mx-auto px-6 lg:px-8' // Not Scrolled: Standard container
  );

  return (
    <header className={headerBaseClasses}>
      {/* Apply padding only when scrolled to allow pill effect */}
      <div className={innerDivClasses}>
        {/* Logo - Always inverse */}
        <Link href="/" className="flex-shrink-0 pl-2 pr-4"> {/* Added padding around logo inside pill */}
          <Image
            src={logoSrc}
            alt="Maitai Logo"
            width={100}
            height={24}
            priority
          />
        </Link>

        {/* Desktop Navigation - Always white text */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8"> {/* Adjusted spacing */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={cn(
                'text-sm font-medium transition-colors hover:text-maitai-lime',
                // Re-introduce conditional text color
                isScrolled ? 'text-white' : 'text-maitai-vampire-black'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Single CTA Button - Changes variant on scroll */}
        <div className="hidden lg:flex items-center pl-4 pr-2"> {/* Added padding around button inside pill */}
          <Button
            size="pill" // Use new pill size
            variant={isScrolled ? 'lightPill' : 'darkPill'} // Conditional variant
          >
            Get a Demo
          </Button>
        </div>

        {/* Mobile Menu Button & Sheet */}
        <div className="lg:hidden"> {/* Mobile doesn't get pill effect, just trigger */}
          <Sheet>
            <SheetTrigger asChild>
              {/* Apply conditional color to icon */}
              <Button variant="ghost" size="icon" aria-label="Toggle menu" className={cn(
                'focus-visible:ring-white/50',
                 isScrolled ? 'text-white hover:bg-white/10' : 'text-maitai-vampire-black hover:bg-black/10'
              )}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            {/* Sheet content remains standard */}
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 pt-8">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-lg text-maitai-vampire-black hover:text-maitai-lime"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
                {/* Mobile CTA - Use standard variants */}
                <div className="flex flex-col space-y-3 pt-6 border-t">
                  <SheetClose asChild>
                    {/* Use pineapple variant for consistency in mobile menu? Or a standard one? */}
                    <Button variant="pineapple">
                      Get a Demo
                    </Button>
                  </SheetClose>
                  {/* Maybe remove second CTA or use outline? */}
                  {/* <SheetClose asChild>
                    <Button variant="limeOutline">
                      Start Trial
                    </Button>
                  </SheetClose> */}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 