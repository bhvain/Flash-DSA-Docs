'use client';

import * as React from 'react';
import { Search as SearchIcon, X, FileText, CornerDownLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { navItems } from '@/config/docs';
import { cn } from '@/lib/utils';

// Flatten nav items to create a search index
const searchIndex = navItems.flatMap((section) => 
  section.items.map((item) => ({
    title: item.title,
    href: item.href,
    section: section.title,
    icon: item.icon
  }))
);

export function SearchModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();

  const openSearch = () => {
    setQuery('');
    setSelectedIndex(0);
    setIsOpen(true);
  };

  const closeSearch = () => {
    setQuery('');
    setSelectedIndex(0);
    setIsOpen(false);
  };

  const filteredResults = React.useMemo(() => {
    if (!query) return searchIndex;
    return searchIndex.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.section.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Handle Cmd+K to open search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => {
          if (open) {
            setQuery('');
            setSelectedIndex(0);
          }
          return !open;
        });
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Handle keyboard navigation within the modal
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          router.push(filteredResults[selectedIndex].href);
          closeSearch();
        }
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, router]);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button 
        onClick={openSearch}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700/80 transition-all px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 w-full sm:w-64 shadow-sm"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden sm:inline-block flex-1 text-left">Search docs...</span>
        <span className="inline-block sm:hidden flex-1 text-left">Search...</span>
        <kbd className="hidden sm:inline-block font-sans text-[10px] font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded ml-2 shadow-sm">⌘K</kbd>
      </button>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeSearch}
      />
      <div className="fixed left-[50%] top-[10%] z-50 w-full max-w-xl translate-x-[-50%] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col max-h-[80vh]">
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-4 py-4">
          <SearchIcon className="h-5 w-5 text-gray-400 shrink-0" />
          <input 
            autoFocus
            className="flex-1 bg-transparent border-none outline-none px-4 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            placeholder="Search documentation..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="hidden sm:inline-block font-sans text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded mr-2">ESC</kbd>
          <button onClick={closeSearch} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-2 flex-1">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 px-4">
              <SearchIcon className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">No results found</p>
              <p className="text-sm text-gray-500 mt-1">We couldn't find anything matching "{query}"</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, idx) => {
                const Icon = result.icon || FileText;
                const isSelected = idx === selectedIndex;
                return (
                  <Link
                    key={result.href}
                    href={result.href}
                    onClick={closeSearch}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors group",
                      isSelected 
                        ? "bg-blue-50 dark:bg-blue-900/30" 
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    )}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-md shrink-0 transition-colors",
                      isSelected 
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" 
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className={cn(
                        "text-sm font-medium truncate transition-colors",
                        isSelected 
                          ? "text-blue-700 dark:text-blue-300" 
                          : "text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      )}>
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {result.section}
                      </div>
                    </div>
                    {isSelected && (
                      <CornerDownLeft className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 hidden sm:block" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        {filteredResults.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <kbd className="font-sans font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded shadow-sm">↵</kbd>
              <span>to select</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="font-sans font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded shadow-sm">↓</kbd>
              <kbd className="font-sans font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded shadow-sm">↑</kbd>
              <span>to navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="font-sans font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded shadow-sm">ESC</kbd>
              <span>to close</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

