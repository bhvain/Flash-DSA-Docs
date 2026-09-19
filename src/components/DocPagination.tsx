import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { navItems } from '@/config/docs';

export function DocPagination() {
  const { pathname } = useLocation();

  // Find section and item info
  const allItemsWithSection = navItems.flatMap(section =>
    section.items.map(item => ({ ...item, sectionTitle: section.title }))
  );

  const currentIndex = allItemsWithSection.findIndex(item => item.href === pathname);

  if (currentIndex === -1) {
    return null;
  }

  const prev = currentIndex > 0 ? allItemsWithSection[currentIndex - 1] : null;
  const next = currentIndex < allItemsWithSection.length - 1 ? allItemsWithSection[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-300 dark:border-gray-800/80 mt-6 mb-2">
      {prev ? (
        <Link
          to={prev.href}
          className="group flex flex-col min-h-[44px] justify-center p-4 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-purple-400 dark:hover:border-purple-800 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-all duration-200 shadow-2xs"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-purple-700 dark:text-purple-400" />
            <span>Previous</span>
          </div>
          <span className="text-sm font-extrabold text-gray-950 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
            {prev.title}
          </span>
          <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 mt-0.5">
            {prev.sectionTitle}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          to={next.href}
          className="group flex flex-col min-h-[44px] justify-center items-end text-right p-4 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-purple-400 dark:hover:border-purple-800 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-all duration-200 shadow-2xs sm:col-start-2"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
            <span>Next</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-purple-700 dark:text-purple-400" />
          </div>
          <span className="text-sm font-extrabold text-gray-950 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
            {next.title}
          </span>
          <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 mt-0.5">
            {next.sectionTitle}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}

