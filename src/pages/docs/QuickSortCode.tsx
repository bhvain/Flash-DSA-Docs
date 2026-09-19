import { 
  Code2, 
  Terminal, 
  Layers, 
  GitFork, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { Callout, Summary, Definition } from '@/components/DocBlocks';
import QuickSortDryRunVisualizer from '@/components/QuickSortDryRunVisualizer';


const QUICKSORT_C_CODE = `#include <stdio.h>

// Helper function to print an array
void printArray(int *A, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }
    printf("\\n");
}

// Partitioning procedure
int partition(int A[], int low, int high) {
    int pivot = A[low];
    int i = low + 1;
    int j = high;
    int temp;

    do {
        // Find element greater than pivot from left
        while (A[i] <= pivot) {
            i++;
        }

        // Find element less than or equal to pivot from right
        while (A[j] > pivot) {
            j--;
        }

        // Swap out-of-order elements if pointers have not crossed
        if (i < j) {
            temp = A[i];
            A[i] = A[j];
            A[j] = temp;
        }
    } while (i < j);

    // Swap pivot A[low] with A[j]
    temp = A[low];
    A[low] = A[j];
    A[j] = temp;

    return j; // Return the partition index where pivot settled
}

// Recursive QuickSort function
void quickSort(int A[], int low, int high) {
    int partitionIndex; // Index of pivot after partition

    // Base condition: at least 2 elements required to sort
    if (low < high) {
        partitionIndex = partition(A, low, high);
        quickSort(A, low, partitionIndex - 1);  // Sort left subarray
        quickSort(A, partitionIndex + 1, high); // Sort right subarray
    }
}

int main() {
    // Input Array: 3, 5, 2, 13, 12
    int A[] = {3, 5, 2, 13, 12};
    int n = 5;

    printf("Original Array:\\n");
    printArray(A, n);

    quickSort(A, 0, n - 1);

    printf("\\nSorted Array:\\n");
    printArray(A, n);

    // Array with duplicates and larger values:
    int B[] = {9, 4, 4, 8, 7, 5, 6, 2, 45};
    int nB = 9;
    printf("\\nArray with duplicates before sort:\\n");
    printArray(B, nB);

    quickSort(B, 0, nB - 1);

    printf("Array with duplicates after sort:\\n");
    printArray(B, nB);

    return 0;
}`;

export default function QuickSortCodePage() {
  return (
    <div id="quick-sort-code-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Code2 className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            C Implementation
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          QuickSort: Code &amp; Implementation (C)
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Explore the clean, modular C implementation of QuickSort. Learn how the <code className="font-mono text-purple-600 dark:text-purple-400">partition()</code> procedure iteratively swaps elements in-place and how <code className="font-mono text-purple-600 dark:text-purple-400">quickSort()</code> recursively sorts the resulting subarrays.
        </p>
      </div>

      {/* Complete C Source Code */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Complete C Code
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            quicksort.c
          </span>
        </div>

        <CodeBlock code={QUICKSORT_C_CODE} language="c" />

        {/* Expected Terminal Output */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-900 text-gray-100 p-4 font-mono text-xs shadow-sm">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-800 text-gray-400 text-[11px]">
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Original Array:</p>
            <p className="text-amber-400">3 5 2 13 12</p>
            <p className="text-gray-400 mt-2">Sorted Array:</p>
            <p className="text-emerald-400 font-bold">2 3 5 12 13</p>
            <p className="text-gray-400 mt-3">Array with duplicates before sort:</p>
            <p className="text-amber-400">9 4 4 8 7 5 6 2 45</p>
            <p className="text-gray-400 mt-1">Array with duplicates after sort:</p>
            <p className="text-emerald-400 font-bold">2 4 4 5 6 7 8 9 45</p>
          </div>
        </div>
      </section>

      {/* Code Architecture Breakdown */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Detailed Function Breakdown
          </h2>
        </div>

        <div className="space-y-4">
          
          {/* 1. partition function */}
          <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 font-mono">
                1. int partition(int A[], int low, int high)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                Core Engine
              </span>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              The partition function performs the heavy lifting in QuickSort:
            </p>

            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li>
                <strong>Pointers Initialization:</strong> <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">pivot = A[low]</code>, <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">i = low + 1</code>, and <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">j = high</code>.
              </li>
              <li>
                <strong>Inner Scans:</strong> The loop <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">while(A[i] &lt;= pivot) i++</code> moves <code className="font-mono">i</code> forward until it finds an element strictly greater than the pivot. Meanwhile, <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">while(A[j] &gt; pivot) j--</code> moves <code className="font-mono">j</code> backward until it finds an element less than or equal to the pivot.
              </li>
              <li>
                <strong>Swap Check (<code className="font-mono">if (i &lt; j)</code>):</strong> If the pointers have not crossed, we swap <code className="font-mono">A[i]</code> and <code className="font-mono">A[j]</code> to place the smaller element on the left and larger on the right.
              </li>
              <li>
                <strong>Final Swap &amp; Return:</strong> When <code className="font-mono">i &gt;= j</code>, pointers have crossed. We swap <code className="font-mono">A[low]</code> (the pivot) with <code className="font-mono">A[j]</code>. We then return <code className="font-mono">j</code> as the final settled index of the pivot.
              </li>
            </ul>
          </div>

          {/* 2. quickSort function */}
          <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 font-mono">
                2. void quickSort(int A[], int low, int high)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                Recursive Coordinator
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              QuickSort coordinates the divide-and-conquer steps:
            </p>

            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
              <li>
                <strong>Base Condition (<code className="font-mono">if (low &lt; high)</code>):</strong> Ensures the recursion stops when a subarray has 1 or 0 elements (which are already sorted by definition).
              </li>
              <li>
                <strong>Partitioning:</strong> Calls <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">partitionIndex = partition(A, low, high)</code> to fix the pivot in place.
              </li>
              <li>
                <strong>Recursive Calls:</strong>
                <div className="pl-6 pt-1 space-y-1 font-mono text-[11px] text-purple-700 dark:text-purple-400">
                  <p>quickSort(A, low, partitionIndex - 1);  // Left branch</p>
                  <p>quickSort(A, partitionIndex + 1, high); // Right branch</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <Callout type="warning" title="Why A[low] is swapped with A[j] (and not A[i])?">
          When the search loop terminates, pointer <code className="font-mono">j</code> has decremented to an element that is <strong>&le; pivot</strong>, and pointer <code className="font-mono">i</code> has advanced to an element that is <strong>&gt; pivot</strong>. Since <code className="font-mono">j</code> has crossed <code className="font-mono">i</code> (<code className="font-mono">j &le; i</code>), <code className="font-mono">A[j]</code> is guaranteed to be on the &quot;left/smaller&quot; side. Swapping <code className="font-mono">A[low]</code> with <code className="font-mono">A[j]</code> safely places the pivot between the smaller and larger partitions!
        </Callout>
      </section>

      {/* Interactive Dry Run & Recursion Tree Visualizer */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <GitFork className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Interactive Recursion Tree &amp; Dry Run
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Step through each recursive call on the sample array <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-900 dark:text-gray-100">[3, 5, 2, 13, 12]</code> to see how the call stack executes and how the array transforms in memory:
        </p>

        <QuickSortDryRunVisualizer />
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'The partition function uses a do-while loop to scan from both ends with i and j pointers.',
            'Inner while loops increment i for values <= pivot and decrement j for values > pivot.',
            'When i < j, out-of-place elements A[i] and A[j] are swapped in memory.',
            'When i >= j, the pointers cross, and swapping pivot A[low] with A[j] puts the pivot in its final sorted index.',
            'quickSort uses the base condition low < high to terminate recursion on 0- or 1-element subarrays.'
          ]} 
        />
      </section>

    </div>
  );
}
