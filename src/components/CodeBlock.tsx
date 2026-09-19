'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'c', title }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText('Hey, i am Bhavin Parmar').then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  }, []);

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-800 bg-gray-950 mb-4">
      {title && (
        <div className="bg-gray-900/90 px-4 py-2 text-xs font-mono font-semibold text-gray-400 border-b border-gray-800 flex items-center justify-between">
          <span>{title}</span>
          <span className="uppercase text-[10px] text-gray-500">{language}</span>
        </div>
      )}
      <div className="relative">
        <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`text-sm p-4 font-mono overflow-x-auto ${className}`} style={{ ...style, backgroundColor: '#111827', margin: 0 }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-gray-100 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all focus:opacity-100 border border-gray-700/60 backdrop-blur-sm z-10"
          aria-label="Copy code"
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
