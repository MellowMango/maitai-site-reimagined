'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'; // Using Heroicons for icons

interface InteractiveCodeBlockProps {
  codeString: string;
  language: string;
}

export default function InteractiveCodeBlock({ codeString, language }: InteractiveCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="relative group w-full max-w-2xl mx-auto bg-[#282c34] rounded-lg overflow-hidden shadow-lg my-4">
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{ margin: 0, padding: '1.5rem 1rem', fontSize: '0.9rem' }}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 p-1.5 rounded transition-colors duration-200 
                    ${isCopied 
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500 group-hover:opacity-100 opacity-0'}`}
        aria-label={isCopied ? 'Copied!' : 'Copy code'}
      >
        {isCopied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <ClipboardIcon className="h-4 w-4" />
        )}
      </button>
      {isCopied && (
        <span className="absolute top-10 right-2 text-xs text-green-400 bg-gray-700 px-1 py-0.5 rounded">Copied!</span>
      )}
    </div>
  );
}
