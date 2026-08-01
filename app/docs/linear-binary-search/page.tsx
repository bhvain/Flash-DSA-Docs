import { ArrowLeft, ArrowRight, Code2, CheckCircle2, ShieldAlert, Search, Zap, Cpu, Terminal, Layers } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { SearchLab } from '@/components/SearchLab';

export default function LinearBinarySearchPage() {
  const linearSearchCode = `#include <stdio.h>

// Linear Search (Unsorted or Sorted Array)
// Time Complexity: O(n)
int linearSearch(int arr[], int size, int element) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == element) {
            return i; // Element found, return index
        }
    }
    return -1; // Element not found
}

int main() {
    int arr[] = {4, 8, 10, 12, 15, 2, 79, 56, 1, 99};
    int size = sizeof(arr) / sizeof(int);
    int element = 56;
    
    int searchIndex = linearSearch(arr, size, element);
    
    if (searchIndex != -1) {
        printf("The element %d was found at index %d \\n", element, searchIndex);
    } else {
        printf("The element %d was not found in the array \\n", element);
    }
    
    return 0;
}`;

  const binarySearchCode = `#include <stdio.h>

// Binary Search (Strictly requires a SORTED Array)
// Time Complexity: O(log n)
int binarySearch(int arr[], int size, int element) {
    int low = 0;
    int high = size - 1;
    
    // Keep searching until low and high converge
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents overflow vs (low + high) / 2
        
        if (arr[mid] == element) {
            return mid; // Element found
        }
        
        if (arr[mid] < element) {
            low = mid + 1; // Target is in the right half
        } else {
            high = mid - 1; // Target is in the left half
        }
    }
    
    return -1; // Element not found
}

int main() {
    // Sorted array for binary search
    int arr[] = {1, 3, 5, 8, 14, 32, 56, 64, 73, 123, 225, 444};
    int size = sizeof(arr) / sizeof(int);
    int element = 64;
    
    int searchIndex = binarySearch(arr, size, element);
    
    if (searchIndex != -1) {
        printf("The element %d was found at index %d \\n", element, searchIndex);
    } else {
        printf("The element %d was not found in the array \\n", element);
    }
    
    return 0;
}`;

  return (
    <div id="linear-binary-search-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
          <Search className="h-4 w-4" />
          Data Structures &bull; Array Searching
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Linear &amp; Binary Search
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Master the two fundamental searching algorithms. Learn when to use the straightforward <strong>Linear Search</strong> vs the highly efficient <strong>Binary Search</strong>, how they operate conceptually, and their C implementations.
        </p>
      </div>

      {/* Core Concepts */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Linear Search */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Layers className="h-24 w-24 text-gray-900 dark:text-gray-100" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Linear Search</h2>
          <div className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded inline-block">
            O(n) Time Complexity
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A simple approach that visits every element from index <code className="font-mono text-xs">0</code> to <code className="font-mono text-xs">n-1</code> sequentially until the target is found.
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
            <li>Works on <strong>unsorted</strong> and sorted arrays.</li>
            <li>Best Case: <code className="font-mono text-xs">O(1)</code> (First element matches).</li>
            <li>Worst Case: <code className="font-mono text-xs">O(n)</code> (Element not found or is the last element).</li>
          </ul>
        </div>

        {/* Binary Search */}
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Zap className="h-24 w-24 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">Binary Search</h2>
          <div className="text-sm font-mono text-indigo-700 dark:text-indigo-300 mb-4 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-1 rounded inline-block">
            O(log n) Time Complexity
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A "divide and conquer" algorithm. It compares the target with the middle element and halves the search space repeatedly.
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
            <li><strong className="text-indigo-600 dark:text-indigo-400">CRITICAL:</strong> Array <strong>MUST be sorted</strong>.</li>
            <li>Uses <code className="font-mono text-xs">low</code>, <code className="font-mono text-xs">mid</code>, and <code className="font-mono text-xs">high</code> pointers.</li>
            <li>Extremely efficient for large datasets.</li>
          </ul>
        </div>
      </div>

      {/* Simulator */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Interactive Search Simulator
        </h2>
        <SearchLab />
      </section>

      {/* Binary Search Concept Analogy */}
      <div className="mb-12 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-amber-500" />
          The Book Analogy for Binary Search
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Imagine searching for page <strong>238</strong> in a 1,000-page book. You don't flip through pages 1, 2, 3... sequentially (Linear Search). Instead, you open the book roughly in the middle (e.g., page 500). Since 238 is less than 500, you ignore the entire right half of the book. You then open the middle of the left half (page 250). Since 238 is still less, you halve it again. This rapid <em>converging</em> is precisely how Binary Search achieves its <code className="font-mono font-bold">O(log n)</code> speed.
        </p>
      </div>

      {/* Code Implementations */}
      <section className="mb-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-gray-600" />
            Linear Search Implementation
          </h2>
          <CodeBlock code={linearSearchCode} language="c" title="linear_search.c" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Binary Search Implementation
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Notice how we use a <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">while (low &lt;= high)</code> loop and adjust the boundaries based on comparisons with the <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">mid</code> value. If <code className="font-mono">low &gt; high</code>, the pointers have crossed, meaning the element does not exist.
          </p>
          <CodeBlock code={binarySearchCode} language="c" title="binary_search.c" />
        </div>
      </section>

      {/* Navigation */}
      </div>
  );
}