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
      // Check if scrolled past the threshold (e.g., 50px)
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoSrc = isScrolled ? '/logos/primary.svg' : '/logos/primary-inverse.svg';
  // Define text color based on scroll state for reuse
  const textColorClass = isScrolled ? 'text-gray-900' : 'text-white'; 

  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out',
    isScrolled ? 'bg-white shadow-md' : 'bg-transparent',
    textColorClass // Apply text color class to header for inherited elements like mobile trigger
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logoSrc}
            alt="Maitai Logo"
            width={100} // Adjust size as needed
            height={24} // Adjust size as needed
            priority // Load logo eagerly
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={cn(
                'text-sm font-medium transition-colors hover:text-maitai-lime',
                textColorClass // Use the dynamic text color class
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button 
            size="sm" 
            className="bg-maitai-pineapple hover:bg-maitai-pineapple/90 text-maitai-vampire-black"
          >
            Get a Demo
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={cn(
              'border-maitai-lime text-maitai-lime hover:bg-maitai-lime/10 hover:text-maitai-lime',
              isScrolled ? 'border-maitai-lime' : 'border-white text-white hover:text-white' // Adjust outline button for transparent header
            )}
          >
            Start Trial
          </Button>
        </div>

        {/* Mobile Menu Button & Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className={cn("h-6 w-6", textColorClass)} /> 
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 pt-8"> {/* Increased spacing and padding */}
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.name}> {/* Wrap link in SheetClose */}
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-lg text-gray-900 hover:text-maitai-lime" // Larger text for mobile
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
                {/* Mobile CTAs */}
                <div className="flex flex-col space-y-3 pt-6 border-t">
                  <SheetClose asChild>
                    <Button className="bg-maitai-pineapple hover:bg-maitai-pineapple/90 text-maitai-vampire-black">
                      Get a Demo
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="outline" className="border-maitai-lime text-maitai-lime hover:bg-maitai-lime/10">
                      Start Trial
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 