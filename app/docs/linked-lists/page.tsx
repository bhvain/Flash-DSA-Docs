import { ArrowLeft, ArrowRight, Database, Link2, PlusCircle, AlertTriangle, Hospital, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';
import { LinkedListLab } from '@/components/LinkedListLab';

export default function LinkedListsPage() {
  return (
    <div id="linked-lists-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
          <Database className="h-4 w-4" />
          Data Structures &bull; Dynamic Memory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Linked Lists
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Break free from the constraints of contiguous memory. Learn how Linked Lists use dynamic memory allocation and pointers to create flexible, chain-like data structures that can grow or shrink on demand.
        </p>
      </div>

      {/* The Hospital Analogy */}
      <div className="mb-10 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Hospital className="h-5 w-5 text-indigo-500" />
          The Hospital Analogy
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Imagine a city with multiple hospitals doing Full Body Checkups (FBC). If Hospital 1 (H1) runs out of consecutive empty beds, a patient might be sent to an empty bed in H2, and another to H3. 
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Instead of keeping all patients in the exact same room (like an <strong>Array</strong>), the doctor tells each patient: <em>"Here is a piece of paper. It has the address of the hospital bed where the next patient is located."</em> By following these addresses one by one, the doctor can visit all the patients, even though they are scattered across the city. This forms a <strong>Linked List</strong>.
        </p>
      </div>

      {/* Core Concepts */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Memory Allocation */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/60 p-2 rounded-lg text-blue-700 dark:text-blue-300">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Dynamic Allocation</h2>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Unlike arrays which often live in the Stack (or are allocated as one large block in the Heap), Linked List nodes are allocated individually in the Heap using <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">malloc()</code>.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            This means memory addresses are <strong>non-contiguous</strong> (e.g., node 1 at <code className="font-mono text-xs">0x1000</code>, node 2 at <code className="font-mono text-xs">0x4F2A</code>). The array formula <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">Base + i * Size</code> does not work here!
          </p>
        </div>

        {/* Node Structure */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/60 p-2 rounded-lg text-purple-700 dark:text-purple-300">
              <Link2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">The Node Structure</h2>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            In C, we use a <em>self-referential structure</em>. Each block of memory (Node) contains two compartments:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
            <li><strong>Data:</strong> The actual value being stored (e.g., <code className="font-mono text-xs">int</code>).</li>
            <li><strong>Pointer to Next:</strong> A pointer holding the memory address of the next node.</li>
          </ul>
        </div>
      </div>

      {/* Simulator */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Interactive Node Simulator
        </h2>
        <LinkedListLab />
      </section>

      {/* Pros and Cons */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Linked Lists vs. Arrays</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Advantages */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-6 rounded-2xl">
            <h3 className="text-emerald-800 dark:text-emerald-300 font-bold mb-4 flex items-center gap-2">
              <PlusCircle className="h-5 w-5" /> Advantages
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-emerald-900 dark:text-emerald-200">
                <span className="font-bold">&bull;</span>
                <span><strong>Dynamic Size:</strong> Can grow or shrink indefinitely as long as there is heap memory available. No need to pre-allocate capacity.</span>
              </li>
              <li className="flex gap-2 text-sm text-emerald-900 dark:text-emerald-200">
                <span className="font-bold">&bull;</span>
                <span><strong>Fast Insert/Delete:</strong> Once you are at a position, inserting or deleting is <code className="font-mono font-bold">O(1)</code>. Just break the chain hook and reconnect it. No shifting required!</span>
              </li>
              <li className="flex gap-2 text-sm text-emerald-900 dark:text-emerald-200">
                <span className="font-bold">&bull;</span>
                <span><strong>Memory Utilization:</strong> You don't need large contiguous blocks of free memory; it utilizes fragmented free space effectively.</span>
              </li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-6 rounded-2xl">
            <h3 className="text-rose-800 dark:text-rose-300 font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Disadvantages
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-rose-900 dark:text-rose-200">
                <span className="font-bold">&bull;</span>
                <span><strong>No Random Access:</strong> You cannot instantly jump to index 5. You must traverse the list from the Head node, making searching <code className="font-mono font-bold">O(n)</code>.</span>
              </li>
              <li className="flex gap-2 text-sm text-rose-900 dark:text-rose-200">
                <span className="font-bold">&bull;</span>
                <span><strong>Extra Memory Overhead:</strong> Every single element requires extra space to store the pointer to the next node.</span>
              </li>
              <li className="flex gap-2 text-sm text-rose-900 dark:text-rose-200">
                <span className="font-bold">&bull;</span>
                <span><strong>Cache Unfriendly:</strong> Because nodes are scattered across memory, they don't benefit from CPU caching as much as contiguous arrays do.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      </div>
  );
}