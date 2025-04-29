import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Code, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Reusable Code Snippet component with highlighting and copy button
const CodeSnippet = ({ code }: { code: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  // Basic highlighting - assumes a simple theme
  const highlightedCode = code
    .replace(/import|def|return/g, '<span class="text-purple-400">$&</span>') // Keywords
    .replace(/maitai|Maitai|client|chat|completions|create|messages|api_key|os|environ/g, '<span class="text-blue-400">$&</span>') // Objects/methods
    .replace(/("gpt-4-turbo")|('.*?')/g, '<span class="text-emerald-400">$&</span>') // Strings
    .replace(/##.*|<--.*$/gm, '<span class="text-gray-500">$&</span>'); // Comments

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 1500); // Reset icon after 1.5s
    });
  }, [code]);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative group">
        <pre className="bg-gray-900 rounded-lg p-4 md:p-6 text-sm overflow-x-auto text-left font-mono text-gray-300 whitespace-pre pr-12">
          <code dangerouslySetInnerHTML={{ __html: highlightedCode.trim() }} />
        </pre>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-900 text-white border-gray-700">
            {hasCopied ? 'Copied!' : 'Copy code'}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

const DocsAndCode = () => {
  // Split code into two parts
  const importCode = `import maitai`;
  const functionCode = `
def generate_text(messages):
    client = Maitai(api_key=os.environ['MAITAI_API_KEY'])
    response = client.chat.completions.create(
        ## model="gpt-4-turbo",    <-- Handled in the dashboard
        ## temperature=temperature, <-- Handled in the dashboard
        messages=messages
    )
  `;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Simple To Start
            </h2>
            <p className="text-lg text-gray-600">
              We made it easy to start getting faster, reliable inference.
              Integrate Maitai with just a few lines of code.
            </p>
            <div>
              <Button asChild variant="outline">
                <Link href="https://docs.trymaitai.ai" target="_blank" rel="noopener noreferrer">
                  See Our Docs
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Snippets (Stacked) */}
          <div className="w-full space-y-4">
            <CodeSnippet code={importCode} />
            <CodeSnippet code={functionCode} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocsAndCode; 