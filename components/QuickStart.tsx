'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Using Prism version and atomDark style

// Python code snippet
const pythonCodeSnippet = `
import maitai
import os

def generate_text(messages):
    client = maitai.Maitai(api_key=os.environ['MAITAI_API_KEY'])
    response = client.chat.completions.create(
        ## model="gpt-4-turbo",    <-- Handled in the dashboard
        ## temperature=temperature, <-- Handled in the dashboard
        messages=messages
    )
    return response
`.trim();

// Installation command
const installCommand = `pip install maitai-python`;

export default function QuickStart() {
  return (
    <section className="bg-maitai-mint-cream py-16 md:py-24">
      <motion.div 
        className="container mx-auto px-6 lg:px-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Optional: Lightbulb illustration can go here */}
        {/* <Image src="/path/to/lightbulb.svg" alt="Lightbulb illustration" width={80} height={80} className="mx-auto mb-6" /> */}
        
        <h2 className="text-3xl md:text-4xl font-bold text-maitai-vampire-black mb-4">
          Get Started in Minutes
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Integrate Maitai effortlessly and start enhancing your AI applications with improved reliability and performance today.
        </p>

        {/* Stacked Code Blocks Container */}
        <div className="max-w-2xl mx-auto space-y-6 mb-10">
          {/* Install Command Block */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-left overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono">
              <code>{installCommand}</code>
            </pre>
          </div>

          {/* Python Code Block with Syntax Highlighting */}
          <div className="rounded-lg shadow-lg overflow-hidden">
            <SyntaxHighlighter 
              language="python"
              style={atomDark} 
              customStyle={{
                margin: 0, 
                padding: '1rem', // Adjusted padding
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                textAlign: 'left',
              }}
              codeTagProps={{ style: { fontFamily: 'inherit' } }} 
            >
              {pythonCodeSnippet}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Secondary CTA */}
        <Button 
          variant="outline" 
          className="border-maitai-lagoon text-maitai-lagoon hover:bg-maitai-lagoon hover:text-white transition-colors"
          asChild
        >
          <Link href="https://docs.trymaitai.ai" target="_blank" rel="noopener noreferrer">
            Read the Docs &rarr;
          </Link>
        </Button>
      </motion.div>
    </section>
  );
} 