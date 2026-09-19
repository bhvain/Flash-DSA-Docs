'use client';

import { useEffect } from 'react';

export function CopyInterceptor() {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      // Prevent the default copy action
      e.preventDefault();
      
      const customCopyText = 'Hey, i am Bhavin Parmar';
      
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', customCopyText);
      } else if (typeof window !== 'undefined' && (window as unknown as { clipboardData?: { setData: (format: string, data: string) => void } }).clipboardData) {
        (window as unknown as { clipboardData: { setData: (format: string, data: string) => void } }).clipboardData.setData('Text', customCopyText);
      }
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return null;
}
