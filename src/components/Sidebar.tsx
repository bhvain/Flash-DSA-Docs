import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  X, 
  GraduationCap, 
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/docs';

// Define the grouping structure for nested categories
const superGroups = [
  {
    title: 'Core Algorithms',
    sections: ['Algorithms']
  }
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const activeSection = navItems.find(section => 
        section.items.some(item => item.href === currentPath)
      );
      if (activeSection) {
        initial[activeSection.title] = true;
      }
    }
    return initial;
  });
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  // Set the current page as last visited if valid
  useEffect(() => {
    if (pathname && pathname !== '/' && pathname !== '/docs') {
      const validHrefs = navItems.flatMap((section) => section.items.map((item) => item.href));
      if (validHrefs.includes(pathname)) {
        localStorage.setItem('lastVisitedDoc', pathname);
      }
    }
  }, [pathname]);

  // Auto-expand the active section on mount / pathname change
  useEffect(() => {
    const activeSection = navItems.find(section => 
      section.items.some(item => item.href === pathname)
    );
    if (activeSection) {
      setExpandedSections(prev => ({
        ...prev,
        [activeSection.title]: true
      }));
    }
  }, [pathname]);

  // Smooth scroll active sidebar item into view automatically on pathname change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeLinkRef.current) {
        activeLinkRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, expandedSections]);

  // Toggle expanded state for a category section
  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  // Helper to highlight matching text when filtering
  const renderHighlightedText = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, idx) => 
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={idx} className="bg-purple-150 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col h-full bg-gray-50/50 dark:bg-gray-950/20 select-none">
      
      {/* Search Filter Panel */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800/60 shrink-0 bg-white dark:bg-gray-950/40 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Sidebar Links list */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {superGroups.map((group, groupIdx) => {
          // Filter section matching search queries
          const matchingSections = navItems.filter(section => 
            group.sections.includes(section.title) && (
              section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              section.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
            )
          );

          if (matchingSections.length === 0) return null;

          return (
            <div key={groupIdx} className="space-y-3">
              {/* Higher-level Category Label */}
              <div className="flex items-center gap-2 px-3">
                <GraduationCap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
                  {group.title}
                </h4>
              </div>

              {/* Nested Categories (Sections) */}
              <div className="space-y-1.5">
                {matchingSections.map((section, secIdx) => {
                  const isExpanded = expandedSections[section.title] || searchQuery.length > 0;
                  const isParentOfActive = section.items.some(item => item.href === pathname);

                  // Filter leaf items matching current search terms
                  const filteredItems = section.items.filter(item => 
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    section.title.toLowerCase().includes(searchQuery.toLowerCase())
                  );

                  return (
                    <div 
                      key={secIdx} 
                      className={cn(
                        "rounded-xl border transition-all duration-150 overflow-hidden",
                        isParentOfActive 
                          ? "border-purple-300 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/5" 
                          : "border-transparent bg-transparent"
                      )}
                    >
                      {/* Section Toggle Button */}
                      <button
                        onClick={() => toggleSection(section.title)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 min-h-[44px] md:min-h-[38px] text-xs font-bold transition-colors text-left",
                          isParentOfActive
                            ? "text-purple-800 dark:text-purple-300"
                            : "text-gray-800 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-100"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isParentOfActive 
                              ? "bg-purple-600 dark:bg-purple-400" 
                              : "bg-gray-400 dark:bg-gray-700"
                          )} />
                          {renderHighlightedText(section.title, searchQuery)}
                        </span>
                        <ChevronDown className={cn(
                          "h-3.5 w-3.5 text-gray-500 transition-transform duration-200",
                          isExpanded ? "transform rotate-180" : ""
                        )} />
                      </button>

                      {/* Expansion list of category items */}
                      {isExpanded && (
                        <div className="px-2 pb-2 pt-0.5 space-y-0.5 border-t border-gray-200/60 dark:border-gray-800/30">
                          {filteredItems.map((item, itemIdx) => {
                            const isActive = pathname === item.href;
                            const IconComponent = item.icon;

                            return (
                              <Link
                                key={itemIdx}
                                ref={isActive ? activeLinkRef : null}
                                to={item.active ? item.href : '#'}
                                className={cn(
                                  "group flex items-center justify-between rounded-lg px-3 py-2.5 min-h-[44px] md:min-h-[36px] text-xs font-bold transition-all duration-150 border-l-2",
                                  isActive 
                                    ? "bg-purple-100 border-purple-600 text-purple-950 shadow-2xs dark:bg-purple-950/30 dark:border-purple-400 dark:text-purple-100 font-extrabold" 
                                    : "border-transparent text-gray-700 hover:bg-gray-200/60 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-900/60 dark:hover:text-gray-100 font-semibold"
                                )}
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  <IconComponent className={cn(
                                    "h-3.5 w-3.5 shrink-0",
                                    isActive 
                                      ? "text-purple-700 dark:text-purple-400" 
                                      : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200"
                                  )} />
                                  <span className="truncate">
                                    {renderHighlightedText(item.title, searchQuery)}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
