import Link from 'next/link';
import { BookOpen, Code2 } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto gap-4">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-50 hidden sm:inline-block">Flash DSA Docs</span>
        </Link>
        <div className="flex-1 flex justify-center md:justify-end">
          <SearchModal />
        </div>
        <div className="flex items-center justify-end space-x-4 shrink-0">
          <Link href="/docs/introduction" className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors hidden md:inline-block">
            Documentation
          </Link>
          <div className="flex items-center space-x-2">
            <a href="https://github.com/bhvain" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <span className="sr-only">GitHub</span>
              <Code2 className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
