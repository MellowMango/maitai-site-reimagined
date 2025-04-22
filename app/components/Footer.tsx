import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const footerNavigation = {
  product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Integrations', href: '#' },
    { name: 'Docs', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Contact Us', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Support Center', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Security', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-maitai-mint-cream py-16 lg:py-24" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
          <div className="space-y-8 md:col-span-2 lg:col-span-2">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Maitai</span>
              <Image
                src="/logos/logo-black-resized.svg"
                alt="Maitai Logo - Color"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            {/* Placeholder for Social Icons */}
            <div className="flex space-x-6">
              <div className="h-6 w-6 bg-gray-400 rounded"></div>
              <div className="h-6 w-6 bg-gray-400 rounded"></div>
              <div className="h-6 w-6 bg-gray-400 rounded"></div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:col-span-2 md:grid-cols-3 lg:col-span-3 lg:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-maitai-vampire-black font-greycliff">Product</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.product.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-gray-900 hover:text-maitai-rum">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-maitai-vampire-black font-greycliff">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-gray-900 hover:text-maitai-rum">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-maitai-vampire-black font-greycliff">Resources</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-gray-900 hover:text-maitai-rum">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Maitai Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
