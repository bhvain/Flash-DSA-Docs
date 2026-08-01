import { ArrowLeft, ArrowRight, Code2, Database, Layout, Play, Plus, Trash2, Search, ShieldAlert, Zap, CheckCircle2, Cpu } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { ArrayOperationsSimulator } from '@/components/ArrayOperationsSimulator';

export default function ArrayOperationsPage() {
  const traversalCode = `#include <stdio.h>

// Traversal Function: Visits each element from index 0 to size - 1
void display(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[100] = {7, 8, 12, 27, 88}; // Capacity = 100
    int size = 5;                       // Used Size = 5

    printf("Array elements: ");
    display(arr, size); // Traversal call
    return 0;
}`;

  const insertionCode = `#include <stdio.h>

// Order-Preserving Insertion
int indInsertion(int arr[], int size, int element, int capacity, int index) {
    // Overflow Check: Cannot insert if array is full
    if (size >= capacity) {
        return -1; // Insertion failed
    }

    // Shift elements to the right to create a gap at target index
    for (int i = size - 1; i >= index; i--) {
        arr[i + 1] = arr[i];
    }

    // Place element at target index
    arr[index] = element;
    return 1; // Insertion successful
}

int main() {
    int arr[100] = {7, 8, 12, 27, 88};
    int size = 5, capacity = 100, element = 45, index = 3;

    int result = indInsertion(arr, size, element, capacity, index);
    if (result == 1) {
        size += 1; // Remember to update used size!
        printf("Insertion Successful!\\n");
    } else {
        printf("Insertion Failed due to Overflow!\\n");
    }
    return 0;
}`;

  const deletionCode = `#include <stdio.h>

// Order-Preserving Deletion
void indDeletion(int arr[], int size, int index) {
    // Shift elements to the left starting from index + 1
    for (int i = index; i < size - 1; i++) {
        arr[i] = arr[i + 1];
    }
}

int main() {
    int arr[100] = {7, 8, 12, 27, 88};
    int size = 5, index = 2;

    indDeletion(arr, size, index);
    size -= 1; // Remember to update used size!

    printf("Element at index %d deleted successfully.\\n", index);
    return 0;
}`;

  const searchCode = `#include <stdio.h>

// Linear Search (Unsorted or Sorted) - O(n)
int linearSearch(int arr[], int size, int element) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == element) {
            return i; // Target index
        }
    }
    return -1; // Not found
}

// Binary Search (Requires Sorted Array) - O(log n)
int binarySearch(int arr[], int size, int element) {
    int low = 0;
    int high = size - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == element) {
            return mid; // Found at mid
        }
        if (arr[mid] < element) {
            low = mid + 1;  // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}

int main() {
    // Sorted array for binary search demonstration
    int arr[] = {1, 3, 5, 10, 28, 42, 67, 89};
    int size = sizeof(arr) / sizeof(int);
    int element = 28;

    int searchIndex = binarySearch(arr, size, element);
    printf("Element %d found at index %d via Binary Search.\\n", element, searchIndex);
    return 0;
}`;

  return (
    <div id="array-operations-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          <Code2 className="h-4 w-4" />
          Data Structures &bull; Arrays Part 2
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Array Operations &amp; Complexity
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Master the core array operations — <strong>Traversal</strong>, <strong>Insertion</strong>, <strong>Deletion</strong>, and <strong>Searching</strong> (Linear &amp; Binary Search) along with memory bounds, shift logic, and runtime complexity.
        </p>
      </div>

      {/* Core Concepts Card: Capacity vs Size */}
      <div className="mb-10 bg-gradient-to-br from-indigo-50/50 to-blue-50/30 dark:from-indigo-950/20 dark:to-blue-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          The Fundamental Distinction: Capacity vs. Used Size
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
          When allocating an array in C (e.g. <code className="font-mono bg-white dark:bg-gray-900 px-1.5 py-0.5 rounded border">int arr[100];</code>), two distinct concepts govern memory usage:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 shadow-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[11px] block mb-1">
              1. Capacity (Total Allocated Space)
            </span>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The maximum number of elements the reserved continuous memory block can hold. Defined during initial allocation (e.g. <code className="font-mono">capacity = 100</code>).
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-sm">
            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[11px] block mb-1">
              2. Used Size (Active Elements)
            </span>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The actual count of elements currently populated in active use (e.g. <code className="font-mono">used_size = 5</code>). Operations run strictly up to <code className="font-mono">used_size - 1</code>.
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-indigo-100/60 dark:bg-indigo-950/80 rounded-xl text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
          <span>
            <strong>Real-World Analogy:</strong> Reserving a 100-seat train compartment when only 5 friends board. You own all 100 seats so nobody else sits there, but you only iterate through the 5 occupied seats.
          </span>
        </div>
      </div>

      {/* Operation 1: Traversal */}
      <section id="traversal-section" className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2 rounded-xl">
            <Play className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              1. Traversal Operation
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Visiting every element in the array once
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          <strong>Traversal</strong> means visiting every active array element exactly once (from index <code className="font-mono">0</code> to <code className="font-mono">used_size - 1</code>) to perform an action such as printing values, accumulating sums, or setting values.
        </p>

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between font-mono font-bold text-gray-900 dark:text-gray-100">
            <span>Traversal Complexity</span>
            <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">O(n) Time</span>
          </div>
          <p>
            Because we execute the loop body once for each active item, traversing an array of $n$ elements takes $O(n)$ time complexity.
          </p>
        </div>

        <CodeBlock code={traversalCode} language="c" title="09_Traversal.c" />
      </section>

      {/* Operation 2: Insertion */}
      <section id="insertion-section" className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              2. Insertion Operation
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Adding new elements at a specified index
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          Inserting an element into an array requires evaluating two strategies depending on whether relative element order must be maintained:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-gray-950 border border-emerald-200 dark:border-emerald-900/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[11px] flex items-center justify-between">
              <span>Case 1: Order Preserved (Shifting)</span>
              <span className="font-mono bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">Worst: O(n)</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Elements from <code className="font-mono">used_size - 1</code> down to target <code className="font-mono">index</code> are shifted right by 1 position to create a gap before placing the new element.
            </p>
            <ul className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li><strong>Best Case ($O(1)$):</strong> Insert at end (<code className="font-mono">index = used_size</code>). Zero shifts.</li>
              <li><strong>Worst Case ($O(n)$):</strong> Insert at index <code className="font-mono">0</code>. Must shift all $n$ items right.</li>
            </ul>
          </div>

          <div className="p-4 bg-white dark:bg-gray-950 border border-emerald-200 dark:border-emerald-900/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[11px] flex items-center justify-between">
              <span>Case 2: Order Unimportant (Fast Swap)</span>
              <span className="font-mono bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">O(1) Constant</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If array element order does not matter, move the item at target <code className="font-mono">index</code> to the end (<code className="font-mono">used_size</code>) and overwrite target <code className="font-mono">index</code> directly.
            </p>
            <ul className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li><strong>Runtime:</strong> Constant time $O(1)$ irrespective of array length.</li>
            </ul>
          </div>
        </div>

        {/* Overflow Alert */}
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
          <div>
            <strong>Overflow Condition:</strong> If <code className="font-mono font-bold">used_size &gt;= capacity</code>, insertion fails! You cannot cross the allocated memory boundary without reallocating a larger array.
          </div>
        </div>

        <CodeBlock code={insertionCode} language="c" title="10_Insertion.c" />
      </section>

      {/* Operation 3: Deletion */}
      <section id="deletion-section" className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 p-2 rounded-xl">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              3. Deletion Operation
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Removing an element at a target index
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          Deleting an element operates as the reverse of insertion. After target removal, active slots must be adjusted to maintain contiguity:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-gray-950 border border-rose-200 dark:border-rose-900/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 uppercase text-[11px] flex items-center justify-between">
              <span>Order Preserved (Left Shift)</span>
              <span className="font-mono bg-rose-50 dark:bg-rose-950 px-1.5 py-0.5 rounded">Worst: O(n)</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Elements from <code className="font-mono">index + 1</code> up to <code className="font-mono">used_size - 1</code> are shifted left by 1 slot to close the gap. Finally, decrement <code className="font-mono">used_size</code>.
            </p>
            <ul className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li><strong>Best Case ($O(1)$):</strong> Delete last element (<code className="font-mono">used_size - 1</code>). Zero shifts.</li>
              <li><strong>Worst Case ($O(n)$):</strong> Delete index <code className="font-mono">0</code>. Must shift $n-1$ items left.</li>
            </ul>
          </div>

          <div className="p-4 bg-white dark:bg-gray-950 border border-rose-200 dark:border-rose-900/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 uppercase text-[11px] flex items-center justify-between">
              <span>Unsorted / Fast (Last Element Overwrite)</span>
              <span className="font-mono bg-rose-50 dark:bg-rose-950 px-1.5 py-0.5 rounded">O(1) Constant</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If order is not required, overwrite target <code className="font-mono">index</code> with the last element (<code className="font-mono">arr[used_size - 1]</code>) and decrement <code className="font-mono">used_size</code>.
            </p>
            <ul className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li><strong>Underflow Check:</strong> Cannot delete if <code className="font-mono font-bold">used_size == 0</code>.</li>
            </ul>
          </div>
        </div>

        <CodeBlock code={deletionCode} language="c" title="11_Deletion.c" />
      </section>

      {/* Operation 4: Searching */}
      <section id="searching-section" className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-2 rounded-xl">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              4. Searching Algorithms: Linear vs Binary Search
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Locating an element in an array efficiently
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          Finding whether an element exists in an array depends on whether the array is <strong>unsorted</strong> or <strong>sorted</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Linear Search Card */}
          <div className="p-5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                Linear Search
              </h3>
              <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded">
                O(n) Time
              </span>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span><strong>Precondition:</strong> Works on both unsorted and sorted arrays.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span><strong>Mechanism:</strong> Sequentially compares target element with index 0, 1, 2... up to $n-1$.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span><strong>Worst Case:</strong> $O(n)$ when element is at the end or not present.</span>
              </li>
            </ul>
          </div>

          {/* Binary Search Card */}
          <div className="p-5 bg-white dark:bg-gray-950 border border-indigo-200 dark:border-indigo-900/60 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                Binary Search (Divide &amp; Conquer)
              </h3>
              <span className="font-mono text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                O(log n) Time
              </span>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span><strong>CRITICAL REQUIREMENT:</strong> Array MUST be strictly sorted!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span><strong>Mechanism:</strong> Calculates <code className="font-mono">mid = (low + high) / 2</code> and eliminates half the array in each iteration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span><strong>Efficiency:</strong> In an array of 1,000,000 elements, Binary Search takes at most 20 comparisons ($\log_2(1,000,000) \approx 20$) vs. 1,000,000 for Linear Search!</span>
              </li>
            </ul>
          </div>
        </div>

        <CodeBlock code={searchCode} language="c" title="12_Linear_Vs_Binary_Search.c" />
      </section>

      {/* Interactive Simulator */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Interactive Array Operations Sandbox
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Test Traversal, Order-Preserving Insertion, Deletion, Linear Search, and Binary Search with step-by-step memory pointer visualizations.
        </p>

        <ArrayOperationsSimulator />
      </section>

      {/* Summary Matrix Table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Complexity Summary Matrix
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3">Operation</th>
                <th className="p-3">Best Case</th>
                <th className="p-3">Worst Case</th>
                <th className="p-3">Pre-requisite / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-950">
              <tr>
                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Traversal</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-bold">O(n)</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-bold">O(n)</td>
                <td className="p-3">Visits every active slot from 0 to used_size - 1.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Insertion (Sorted / Order)</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">O(1)</td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400 font-bold">O(n)</td>
                <td className="p-3">Best case is at end. Worst case at index 0 requires shifting $n$ elements right. Requires <code className="font-mono text-[11px]">used_size &lt; capacity</code>.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Insertion (Unsorted / Fast)</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">O(1)</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">O(1)</td>
                <td className="p-3">Swap target index element to end. Constant time.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Deletion (Sorted / Order)</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">O(1)</td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400 font-bold">O(n)</td>
                <td className="p-3">Best case is last slot. Worst case at index 0 requires shifting $n-1$ elements left. Requires <code className="font-mono text-[11px]">used_size &gt; 0</code>.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Linear Search</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">O(1)</td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400 font-bold">O(n)</td>
                <td className="p-3">Works on unsorted or sorted arrays. Inspects index 0, 1, 2 sequentially.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">Binary Search</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">O(1)</td>
                <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">O(log n)</td>
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">Array MUST be sorted! Divide and conquer halves search space each step.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      </div>
  );
}