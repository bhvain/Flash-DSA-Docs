'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/docs';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-full pb-8 pt-8 pr-4 pl-4 md:pl-8 border-r border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30">
      <div className="space-y-8">
        {navItems.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item, i) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.active ? item.href : '#'}
                    className={cn(
                      "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                        : item.active
                          ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100"
                          : "text-gray-400 cursor-not-allowed dark:text-gray-600"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("h-4 w-4", isActive ? "text-blue-600 dark:text-blue-400" : item.active ? "text-gray-500 dark:text-gray-400" : "text-gray-300 dark:text-gray-600")} />
                      <span>{item.title}</span>
                    </div>
                    {!item.active && (
                      <span className="text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">Soon</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
