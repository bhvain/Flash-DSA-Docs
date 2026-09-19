import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, BookOpen } from 'lucide-react';
import { navItems } from '@/config/docs';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { DocPagination } from '@/components/DocPagination';
import { cn } from '@/lib/utils';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function DocLayoutContainer({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Close mobile sidebar and reset content scroll on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  // Determine categories and breadcrumbs for current pathname
  let activeSection = '';
  let activeItemTitle = 'Documentation';
  for (const section of navItems) {
    const item = section.items.find((i) => i.href === pathname);
    if (item) {
      activeSection = section.title;
      activeItemTitle = item.title;
      break;
    }
  }

  // Dynamic Title Update for Client Navigation
  useEffect(() => {
    if (activeItemTitle && activeItemTitle !== 'Documentation') {
      document.title = `${activeItemTitle} | Flash DSA Docs`;
    } else {
      document.title = 'Flash DSA Docs | Data Structures & Algorithms';
    }
  }, [pathname, activeItemTitle]);

  // Parse headers dynamically on route/content changes
  useEffect(() => {
    // Small timeout to allow content hydration
    const timer = setTimeout(() => {
      if (!contentRef.current) return;

      const headingElements = contentRef.current.querySelectorAll('h2, h3');
      const parsedHeadings: HeadingItem[] = [];
      const idMap = new Map<string, number>();

      headingElements.forEach((el) => {
        const heading = el as HTMLElement;
        let text = heading.innerText.trim();
        // Exclude any existing anchor text from parsing if already present
        if (text.endsWith('#')) {
          text = text.slice(0, -1).trim();
        }

        if (!text) return;

        // Generate unique URL-safe slug ID
        let baseId = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        // Prevent ID collisions
        if (idMap.has(baseId)) {
          const count = idMap.get(baseId)! + 1;
          idMap.set(baseId, count);
          baseId = `${baseId}-${count}`;
        } else {
          idMap.set(baseId, 0);
        }

        // Apply dynamic anchor configuration
        heading.id = baseId;
        heading.classList.add('group', 'flex', 'items-center', 'scroll-mt-20');

        // Ensure clean injection of the '#' link
        const existingAnchor = heading.querySelector('.heading-anchor');
        if (existingAnchor) {
          existingAnchor.remove();
        }

        const anchor = document.createElement('a');
        anchor.className = 'heading-anchor opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-purple-600 dark:text-purple-400 font-normal select-none no-underline';
        anchor.href = `#${baseId}`;
        anchor.textContent = '#';
        anchor.title = `Link to ${text}`;
        heading.appendChild(anchor);

        parsedHeadings.push({
          id: baseId,
          text,
          level: heading.tagName.toLowerCase() === 'h2' ? 2 : 3,
        });
      });

      setHeadings(parsedHeadings);

      // Scroll observer to track active header section
      if (headingElements.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            // Find entries that are intersecting
            const visibleEntries = entries.filter((entry) => entry.isIntersecting);
            if (visibleEntries.length > 0) {
              // Highlight the first visible heading
              setActiveHeadingId(visibleEntries[0].target.id);
            }
          },
          {
            rootMargin: '-80px 0px -60% 0px',
            threshold: 0,
          }
        );

        headingElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
      }
    }, 20);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className="flex-1 w-full flex flex-col h-full overflow-hidden relative">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex-1 w-full flex flex-row overflow-hidden relative">
        {/* Desktop Sidebar Panel */}
        <aside className="hidden md:block w-72 shrink-0 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-800">
          <Sidebar />
        </aside>

        {/* Mobile Drawer Menu Sheet */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm z-50 transition-opacity md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-200 md:hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  DSA Academy
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar />
              </div>
            </div>
          </>
        )}

        {/* Main reading content pane */}
        <main ref={mainRef} className="flex-1 h-full overflow-y-auto overflow-x-hidden min-w-0 px-4 pt-4 pb-16 md:px-8 md:pt-8 md:pb-16 text-gray-900 dark:text-gray-100 flex flex-col">
          <div className="flex-1 max-w-5xl lg:max-w-6xl w-full mx-auto flex flex-col">
            {/* Automatic Breadcrumbs for Desktop view */}
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 mb-6 font-semibold">
              <Link
                to="/docs/sorting-introduction"
                className="hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
              >
                Docs
              </Link>
              {activeSection && (
                <>
                  <ChevronRight className="h-3 w-3 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{activeSection}</span>
                </>
              )}
              {activeItemTitle && (
                <>
                  <ChevronRight className="h-3 w-3 text-gray-500" />
                  <span className="text-gray-950 dark:text-gray-100 font-bold">{activeItemTitle}</span>
                </>
              )}
            </div>

            {/* Injected Content Body */}
            <div ref={contentRef} className="flex-1 pb-4">
              {children}
            </div>

            {/* Standard Footer Pagination */}
            <div className="mt-auto">
              <DocPagination />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
