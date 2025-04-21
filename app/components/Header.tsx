'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogPanel } from '@headlessui/react'; // Keep for potential mobile menu/modal
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Keep for potential mobile menu
import DemoModal from './DemoModal'; // Import the modal component

// TODO: Update navigation links as per brief
const navigation = [
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: '#' }, // TODO: Add external docs link
  { name: 'Careers', href: '/careers' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false); // State for demo modal

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Maitai</span>
              {/* Use the primary logo - Assuming logo-black-resized.svg is the primary */}
              <Image 
                className="h-8 w-auto" // Adjust size as needed
                src="/logos/logo-black-resized.svg" 
                alt="Maitai Logo" 
                width={100} // Intrinsic width
                height={32} // Intrinsic height (adjust based on actual logo aspect ratio)
                priority 
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-maitai-rum">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* Update button onClick to open modal */}
            <button 
               type="button"
               onClick={() => setDemoModalOpen(true)} // Open modal
               className="rounded-md bg-maitai-rum px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-rum"
            >
              Get a Demo
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dialog */}
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Maitai</span>
                <Image
                  className="h-8 w-auto"
                  src="/logos/logo-black-resized.svg"
                  alt="Maitai Logo"
                  width={100}
                  height={32}
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)} // Close menu on click
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {/* Mobile CTA Button - Update onClick */}
                  <button 
                    type="button"
                    onClick={() => { 
                      setMobileMenuOpen(false); // Close mobile menu
                      setDemoModalOpen(true); // Open demo modal
                    }}
                    className="w-full rounded-md bg-maitai-rum px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-rum"
                  >
                    Get a Demo
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Render the Demo Modal */}
      <DemoModal open={demoModalOpen} setOpen={setDemoModalOpen} />
    </>
  );
}
