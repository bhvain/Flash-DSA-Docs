import { ArrowLeft, ArrowRight, Code2, CheckCircle2, ShieldAlert, Trash2, Zap, Cpu, Terminal, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { DeletionLab } from '@/components/DeletionLab';

export default function ArrayDeletionPage() {
  const fullCodeVideo11 = `#include <stdio.h>

// Traversal Function: Visits and prints each element from index 0 to n - 1
void display(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Index Deletion Function (Preserves Element Order by Left Shifting)
void indDeletion(int arr[], int size, int index) {
    // Loop runs from target 'index' up to 'size - 2'
    // arr[i] = arr[i + 1] brings the next right-side element into position i
    for (int i = index; i < size - 1; i++) {
        arr[i] = arr[i + 1];
    }
}

int main() {
    int arr[100] = {7, 8, 12, 27, 88}; // Capacity = 100, Used Size = 5
    int size = 5, index = 0;

    printf("Array BEFORE deletion:\\n");
    display(arr, size);

    // Call deletion function to shift elements left
    indDeletion(arr, size, index);

    // IMPORTANT: Decrement size in caller main() since 1 element was removed
    size -= 1;

    printf("\\nArray AFTER deleting element at index %d:\\n", index);
    display(arr, size);

    return 0;
}`;

  const robustDeletionCode = `#include <stdio.h>

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Robust Deletion with Guard Clauses & Return Status
int indDeletionSafe(int arr[], int size, int index) {
    // 1. Boundary Check: Ensure index lies within valid array range [0, size - 1]
    if (index < 0 || index >= size) {
        printf("Error: Index %d is out of bounds!\\n", index);
        return -1; // Deletion Failed
    }

    // 2. Left Shift Loop
    for (int i = index; i < size - 1; i++) {
        arr[i] = arr[i + 1];
    }

    return 1; // Deletion Succeeded
}

int main() {
    int arr[100] = {1, 2, 12, 18, 8};
    int size = 5;

    printf("Original Array:\\n");
    display(arr, size);

    // Test 1: Valid Deletion at index 2 (element 12)
    int targetIndex = 2;
    if (indDeletionSafe(arr, size, targetIndex) == 1) {
        size -= 1; // Decrement size upon success
        printf("\\nAfter deleting index %d:\\n", targetIndex);
        display(arr, size);
    }

    // Test 2: Invalid Deletion at out-of-bound index 10
    int invalidIndex = 10;
    if (indDeletionSafe(arr, size, invalidIndex) == -1) {
        printf("Skipped size decrement due to invalid deletion.\\n");
    }

    return 0;
}`;

  return (
    <div id="array-deletion-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
          <Trash2 className="h-4 w-4" />
          Data Structures &bull; Array Deletion
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Deletion in Array in C
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Mastering element deletion in contiguous C memory arrays (`11_deletion.c`). Learn why holes/voids are prohibited, how left-shifting (`arr[i] = arr[i + 1]`) works, and why `size -= 1` must be updated in caller scope.
        </p>
      </div>

      {/* Core Concept Callout */}
      <div className="mb-10 bg-gradient-to-br from-rose-50/60 to-orange-50/40 dark:from-rose-950/20 dark:to-orange-950/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          Why Voids/Holes are Not Acceptable in Arrays
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Arrays are defined as a <strong>contiguous collection of elements in memory</strong>. If element at index 2 (memory address 20) is removed, leaving index 2 empty while indices 0, 1, 3, 4 contain data breaks the continuous address guarantee! We must shift all right-side elements leftward to close the gap completely.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-rose-200 dark:border-rose-900/60">
            <span className="font-bold text-rose-600 dark:text-rose-400 uppercase text-[11px] block mb-1">
              1. Left-Shift Formula
            </span>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We iterate <code className="font-mono">for (int i = index; i &lt; size - 1; i++)</code> and assign <code className="font-mono">arr[i] = arr[i + 1]</code> to copy elements one step left.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-orange-200 dark:border-orange-900/60">
            <span className="font-bold text-orange-600 dark:text-orange-400 uppercase text-[11px] block mb-1">
              2. Updating `size -= 1`
            </span>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              <code className="font-mono">indDeletion</code> shifts values in memory. The main caller function MUST perform <code className="font-mono">size -= 1</code> to shrink the active element count.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-purple-200 dark:border-purple-900/60">
            <span className="font-bold text-purple-600 dark:text-purple-400 uppercase text-[11px] block mb-1">
              3. Time Complexity
            </span>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Worst case (deleting index 0): <code className="font-mono">O(n)</code>. Best case (deleting last element): <code className="font-mono">O(1)</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Code Analysis */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Code2 className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          Line-by-Line Code Breakdown (`11_deletion.c`)
        </h2>

        <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4 text-xs text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-bold font-mono text-rose-600 dark:text-rose-400 text-sm block mb-1">
              Step 1: The Left-Shift Loop (`for (int i = index; i &lt; size - 1; i++)`)
            </span>
            <p className="leading-relaxed mb-2">
              Suppose <code className="font-mono">arr = &#123;1, 2, 12, 18, 8&#125;</code> (<code className="font-mono">size = 5</code>) and we delete element at <code className="font-mono">index = 2</code> (value 12):
            </p>
            <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-gray-600 dark:text-gray-400 pl-2">
              <li>Iteration 1 (i = 2): arr[2] = arr[3] (18 moved into index 2)</li>
              <li>Iteration 2 (i = 3): arr[3] = arr[4] (8 moved into index 3)</li>
              <li>Loop stops at i = 3 because <code className="font-mono">3 &lt; (5 - 1)</code> is false for i = 4.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Terminal className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Full Implementation
        </h2>
        <CodeBlock code={fullCodeVideo11} language="c" title="11_deletion.c" />
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          Robust Implementation (Boundary Checks)
        </h2>
        <CodeBlock code={robustDeletionCode} language="c" title="robust_deletion.c" />
      </section>

      <section className="mb-10">
        <DeletionLab />
      </section>
    </div>
  );
}