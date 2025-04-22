"use client";

import Link from "next/link";
import Image from "next/image"; // Using Next/Image instead of <img> for optimization
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    // Add passive: true for potentially better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check on mount
    handleScroll(); // Run check on mount
    // Cleanup listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define navigation items array for easier mapping
  const navigation = [
    { name: 'Features', href: '/#features' }, // Assuming Features section is on homepage
    { name: 'Pricing', href: '/#pricing' }, // Assuming Pricing section is on homepage
    { name: 'Docs', href: 'https://docs.trymaitai.ai', external: true }, // External link
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-md" : "bg-transparent"} // Revert to direct bg change
      `}
    >
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Image // Using Next/Image
            src={scrolled ? "/logos/logo-black-resized.svg" : "/logos/logo-all-white.svg"} // Use correct logos for each state
            alt="Maitai Logo"
            width={120} // Specify width
            height={32} // Specify height (h-8 = 32px)
            className="h-8 w-auto" // Keep height class for consistency if needed
            priority // Prioritize logo loading
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="space-x-8 hidden md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`
                font-semibold transition-colors duration-200
                ${scrolled
                  ? "text-maitai-vampire-black hover:text-maitai-lime"
                  : "text-white hover:text-maitai-pineapple"}
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="flex items-center space-x-4">
          {/* Get a Demo Button */}
          <Link
            href="#" // Placeholder href
            className={`
              px-4 py-2 rounded-lg font-medium transition
              bg-maitai-pineapple hover:bg-maitai-pineapple/90
              ${scrolled ? "text-maitai-vampire-black" : "text-maitai-vampire-black"} // Always black text
            `}
          >
            Get a Demo
          </Link>
          {/* Start Trial Button */}
          <Link
            href="#" // Placeholder href
            className={`
              px-4 py-2 rounded-lg font-medium border-2 transition
              ${scrolled
                ? "border-maitai-lime text-maitai-lime hover:bg-maitai-lime/10"
                : "border-white text-white hover:bg-white/10"}
            `}
          >
            Start Trial
          </Link>
        </div>

        {/* Add Mobile Menu Toggle Here if needed */} 

      </div>
    </header>
  );
}
