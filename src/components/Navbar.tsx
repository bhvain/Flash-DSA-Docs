import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              aria-label="Open Navigation Menu"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px]"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-50 hidden sm:inline-block">Flash Algorithms Docs</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <a href="https://github.com/bhvain" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <span className="sr-only">GitHub</span>
            <Code2 className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
