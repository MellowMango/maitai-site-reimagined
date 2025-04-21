import React from 'react';
import Link from 'next/link';

// TODO: Define actual links
const footerNavigation = {
  features: [
    { name: 'Overview', href: '/#features' },
    // Add more feature links if needed
  ],
  pricing: [
    { name: 'Plans', href: '/pricing' },
    // Add more pricing links if needed
  ],
  company: [
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '#' }, // TODO: Add contact link/method
    // Add more company links if needed
  ],
  resources: [
    { name: 'Docs', href: '#' }, // TODO: Add external docs link
    { name: 'Status', href: '#' }, // TODO: Add status page link
    // Add more resource links if needed
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Optional: Logo/Description Column */}
          <div className="space-y-8">
            {/* <Image className="h-7" src="/logos/logo-black-resized.svg" alt="Maitai" width={100} height={28} /> */}
            <p className="text-sm leading-6 text-gray-600">
              AI With An Immune System.
            </p>
            {/* Optional: Social Links */}
          </div>

          {/* Link Columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Features</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.features.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Pricing</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.pricing.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Maitai Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
