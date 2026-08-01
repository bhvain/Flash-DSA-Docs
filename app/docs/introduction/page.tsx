import { Info, AlertTriangle, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function IntroductionDocs() {
  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Getting Started</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Introduction to DSA & Memory
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          A comprehensive overview of data structures, algorithms, and how C/C++ programs utilize memory via the Stack and Heap.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* Course Overview */}
        <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6">
          <h3 className="flex items-center text-blue-800 dark:text-blue-300 font-bold mb-4 text-lg">
            <Info className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Course Overview
          </h3>
          <ul className="space-y-3 text-blue-900/80 dark:text-blue-200">
            <li className="flex items-start">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></span>
              <span><strong>Placement Focused:</strong> Covers topics optimally for technical interviews, skipping unnecessary depths of overly long theoretical topics.</span>
            </li>
            <li className="flex items-start">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></span>
              <span><strong>Recommended Languages:</strong> C and C++ (Java is also perfectly fine). Avoid Python or JavaScript for beginner placement prep as lower-level languages build a stronger foundation for memory management.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
            Core Definitions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-950 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Data Structure</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                An arrangement of data in main memory (RAM) for efficient usage. They act as the ingredients for developing efficient algorithms.
              </p>
              <div className="text-xs font-semibold text-gray-500 bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 inline-block px-2.5 py-1 rounded-md">
                Examples: Arrays, Linked Lists, Trees
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-950 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Algorithm</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                A sequence of logical steps taken to solve a given problem. It is how you process the data structures to achieve a result.
              </p>
              <div className="text-xs font-semibold text-gray-500 bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 inline-block px-2.5 py-1 rounded-md">
                Example: Steps to sort an array
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Other Important Terms</h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-start p-5 bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800">
              <Database className="h-6 w-6 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Database</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Collection of information in permanent storage (Hard Disk) designed for faster retrieval, updation, and deletion compared to flat files.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-5 bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800">
              <Database className="h-6 w-6 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Data Warehouse</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Management of huge amounts of historical (legacy) data for analytics. It's kept separate from main production databases to preserve performance.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
            Memory Layout of C Programs
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Understanding memory is the main reason we use C/C++. When a program runs, it is loaded into the Main Memory (RAM) and divided into several specific segments.
          </p>

          {/* Visual Memory Layout */}
          <div className="max-w-md mx-auto my-10 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col font-mono text-sm">
            <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 p-3 text-center border-b border-gray-200 dark:border-gray-800 font-bold text-gray-500 text-xs tracking-widest uppercase">
              High Address
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 text-center border-b border-gray-200 dark:border-gray-800 text-blue-800 dark:text-blue-300 font-bold">
              Stack
              <span className="block text-xs mt-1 text-blue-600/70 dark:text-blue-400/70 font-normal">Grows downwards ↓</span>
            </div>
            <div className="bg-white dark:bg-gray-950 p-8 text-center border-b border-gray-200 dark:border-gray-800 text-gray-400 border-dashed border-y-2">
              Free Memory
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 text-center border-b border-gray-200 dark:border-gray-800 text-purple-800 dark:text-purple-300 font-bold">
              Heap
              <span className="block text-xs mt-1 text-purple-600/70 dark:text-purple-400/70 font-normal">Grows upwards ↑</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 text-center border-b border-gray-200 dark:border-gray-800 text-green-800 dark:text-green-300 font-semibold">
              Uninitialized Data (BSS)
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 text-center border-b border-gray-200 dark:border-gray-800 text-emerald-800 dark:text-emerald-300 font-semibold">
              Initialized Data
            </div>
            <div className="bg-gray-800 p-4 text-center text-gray-200 font-semibold">
              Code Segment (Text)
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 p-3 text-center font-bold text-gray-500 text-xs tracking-widest uppercase">
              Low Address
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-100 text-blue-600 mr-3 text-xs">1</span>
                The Stack
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 font-bold">•</span>
                  Used for function calls and local variables.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 font-bold">•</span>
                  Creates an <strong>Activation Record (Stack Frame)</strong> every time a function is called.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 font-bold">•</span>
                  When a function returns, its frame is automatically destroyed and memory is freed.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="flex items-center justify-center h-6 w-6 rounded-md bg-purple-100 text-purple-600 mr-3 text-xs">2</span>
                The Heap
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 font-bold">•</span>
                  Used for <strong>Dynamic Memory Allocation</strong>.
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 font-bold">•</span>
                  Memory requested explicitly using <code>malloc()</code> (C) or <code>new</code> (C++).
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 font-bold">•</span>
                  Requires manual deallocation (<code>free()</code> or <code>delete</code>) when you are done.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-2xl flex gap-4 items-start">
            <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="text-amber-900 dark:text-amber-300 font-bold mb-1">Memory Leaks</h4>
              <p className="text-amber-900/80 dark:text-amber-200 text-sm leading-relaxed">
                If you request memory from the Heap and forget to release it, that space remains occupied. In large applications or loops, this causes the program to consume all available RAM and crash. Always free dynamically allocated memory!
              </p>
            </div>
          </div>
        </div>

      </div>

      </div>
  );
}