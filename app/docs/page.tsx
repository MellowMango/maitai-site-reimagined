import React from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

export default function DocsPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Documentation</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dive deep into Maitai&apos;s features, APIs, and best practices. Find everything you need to integrate and optimize AI in your applications.
          </p>
          <div className="mt-10">
            <Link 
              href="https://docs.trymaitai.ai"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 rounded-md bg-maitai-rum px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-rum"
            >
              Go to Docs Site
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
