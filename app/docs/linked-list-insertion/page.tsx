import { ArrowLeft, ArrowRight, Code2, GitMerge, FilePlus2, FastForward, Link2, Zap } from 'lucide-react';
import Link from 'next/link';
import { LinkedListInsertionLab } from '@/components/LinkedListInsertionLab';

export default function LinkedListInsertionPage() {
  return (
    <div id="linked-list-insertion-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
          <GitMerge className="h-4 w-4" />
          Data Structures &bull; Linked List Operations
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Linked List Insertion
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Unlike Arrays, Linked Lists don't require shifting elements to make room. Inserting a new node is purely a matter of rewiring the <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">next</code> pointers. Learn the 4 primary cases of linked list insertion.
        </p>
      </div>

      {/* The 4 Cases */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Case 1: At the Beginning */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 p-2 rounded-lg">
              <Zap className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Case 1: At the Beginning</h2>
          </div>
          <div className="mb-3 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded inline-block">
            Time Complexity: O(1)
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Create a new node, point its <code className="font-mono text-xs">next</code> to the current <code className="font-mono text-xs">head</code>, and then update the <code className="font-mono text-xs">head</code> pointer to point to this new node. This is a constant-time operation since we don't traverse the list.
          </p>
        </div>

        {/* Case 2: In Between */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 p-2 rounded-lg">
              <Link2 className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Case 2: In Between (At Index)</h2>
          </div>
          <div className="mb-3 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded inline-block">
            Time Complexity: O(n)
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Traverse the list with a pointer <code className="font-mono text-xs">p</code> until you reach the node just before the insertion index. Point the new node's <code className="font-mono text-xs">next</code> to <code className="font-mono text-xs">p-&gt;next</code>, and then update <code className="font-mono text-xs">p-&gt;next</code> to point to the new node.
          </p>
        </div>

        {/* Case 3: At the End */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 p-2 rounded-lg">
              <FastForward className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Case 3: At the End</h2>
          </div>
          <div className="mb-3 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded inline-block">
            Time Complexity: O(n)
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Traverse the entire list until you reach the last node (where <code className="font-mono text-xs">p-&gt;next == NULL</code>). Point this last node's <code className="font-mono text-xs">next</code> to the new node, and set the new node's <code className="font-mono text-xs">next</code> to <code className="font-mono text-xs">NULL</code>.
          </p>
        </div>

        {/* Case 4: After a Given Node */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 p-2 rounded-lg">
              <FilePlus2 className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Case 4: After a Given Node</h2>
          </div>
          <div className="mb-3 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded inline-block">
            Time Complexity: O(1)
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            If you are <em>already given</em> a pointer <code className="font-mono text-xs">q</code> to a specific node, you don't need to traverse! Point the new node's <code className="font-mono text-xs">next</code> to <code className="font-mono text-xs">q-&gt;next</code>, and update <code className="font-mono text-xs">q-&gt;next</code> to point to the new node. 
          </p>
        </div>

      </div>

      {/* Simulator */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <GitMerge className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          Interactive Insertion Simulator
        </h2>
        <LinkedListInsertionLab />
      </section>

      {/* Navigation */}
      </div>
  );
}