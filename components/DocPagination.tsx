'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { navItems } from '@/config/docs';

export function DocPagination() {
  const pathname = usePathname();

  // Flatten the navigation structure to a single array of items
  const allItems = navItems.flatMap(section => section.items);
  
  const currentIndex = allItems.findIndex(item => item.href === pathname);
  
  if (currentIndex === -1) {
    return null;
  }

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800 mt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Previous: {prev.title}
        </Link>
      ) : (
        <div className="w-full sm:w-auto" />
      )}
      
      {next ? (
        <Link
          href={next.href}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-purple-600 bg-purple-600 text-white hover:bg-purple-700 text-xs font-semibold transition-colors"
        >
          Next: {next.title} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="w-full sm:w-auto" />
      )}
    </div>
  );
}
