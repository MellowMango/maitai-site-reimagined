'use client';

import React from 'react';
import Link from 'next/link'; // Import Link for the CTA

export default function QuickStart() {
  const codeSnippet = `
# Install Maitai Serve CLI
npm install -g @maitai/serve

# Log in to your Maitai account
maitai login

# Deploy your model (e.g., ONNX)
maitai deploy ./my-model.onnx --name awesome-ai
  `.trim();

  return (
    <section className="bg-teal-50 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-maitai-vampire-black sm:text-4xl font-greycliff">
          Get Started in Minutes
        </h2>
        <p className="mt-4 text-lg leading-8 text-[#090F0D] font-greycliff">
          Integrate Maitai&apos;s robust AI serving capabilities into your workflow with just a few commands.
        </p>

        {/* Code Block */}
        <div className="mt-10 flex justify-center">
          <pre className="rounded-lg bg-gray-900 p-6 text-left overflow-x-auto shadow-lg w-full lg:w-auto">
            <code className="text-sm text-[#F2FBF9] font-mono whitespace-pre">
              {codeSnippet}
            </code>
          </pre>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href="https://docs.maitai.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-maitai-lime px-5 py-2.5 text-sm font-semibold text-maitai-vampire-black shadow-sm hover:bg-maitai-lime/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitai-lime transition-colors"
          >
            Read the Docs
            <span aria-hidden="true" className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
