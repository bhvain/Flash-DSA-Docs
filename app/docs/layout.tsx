import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { DocPagination } from '@/components/DocPagination';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950 font-sans transition-colors overflow-hidden">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        <aside className="hidden md:block w-72 shrink-0 h-full overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="flex-1 h-full overflow-y-auto px-6 py-8 md:px-10 md:py-10 text-gray-900 dark:text-gray-100 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <div className="max-w-4xl mx-auto w-full pb-4">
            <DocPagination />
          </div>
        </main>
      </div>
    </div>
  );
}

