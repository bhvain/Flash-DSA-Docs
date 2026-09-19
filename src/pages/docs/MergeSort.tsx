import { 
  GitFork, 
  Layers, 
  ArrowLeftRight, 
  Clock, 
  ShieldCheck, 
  HardDrive, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  LayoutList
} from 'lucide-react';
import { Callout, Summary, Definition, AlgorithmSteps, ComplexityTable } from '@/components/DocBlocks';
import TwoArrayMergeVisualizer from '@/components/TwoArrayMergeVisualizer';
import SingleArrayMergeVisualizer from '@/components/SingleArrayMergeVisualizer';
import MergeSortTreeVisualizer from '@/components/MergeSortTreeVisualizer';


export default function MergeSortTheoryPage() {
  return (
    <div id="merge-sort-theory-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <GitFork className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            Divide and Conquer Algorithms
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Merge Sort: Theory, Processors &amp; Recursion
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Merge Sort is one of the most powerful and reliable comparison sorting algorithms. It follows the <strong>Divide-and-Conquer</strong> paradigm: recursively breaking an unsorted array down into atomic single-element subarrays, and then systematically <strong>merging</strong> those sorted pieces back together to form the final sorted array in guaranteed <strong>O(n log n)</strong> time.
        </p>
      </div>

      {/* Core Philosophy: Divide and Conquer */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The Divide and Conquer Paradigm
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Sorting an entire array of size <code className="font-mono text-purple-600 dark:text-purple-400">n = 100</code> is difficult. But sorting an array of size <code className="font-mono text-purple-600 dark:text-purple-400">n = 1</code> is trivial—<strong>an array of 1 element is inherently sorted!</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              1. Divide (Split)
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Find the middle index <code className="font-mono font-bold">mid = (low + high) / 2</code> and divide the array into two equal halves: <code className="font-mono">A[low..mid]</code> and <code className="font-mono">A[mid+1..high]</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              2. Conquer (Base Case)
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Recursively divide until subarrays have only 1 element (<code className="font-mono">low &ge; high</code>). Single elements require zero sorting effort.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              3. Combine (Merge)
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Merge adjacent sorted subarrays back together in linear time <code className="font-mono font-bold">O(n)</code> into a single sorted array.
            </p>
          </div>
        </div>

        <Definition term="Merge Operation">
          The core engine of Merge Sort: taking two sorted lists or subarrays and combining them into a single sorted list by making sequential linear comparisons of their smallest unmerged elements.
        </Definition>
      </section>

      {/* Part 1: The Two-Array Merge Processor */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowLeftRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Part 1: The Merge Processor (Merging 2 Sorted Arrays into a 3rd)
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Before implementing full Merge Sort, we must understand the fundamental <strong>Merge Processor</strong>. Suppose we are given two independently sorted arrays: Array <code className="font-mono text-blue-600 dark:text-blue-400 font-bold">A</code> of size <code className="font-mono">m</code> and Array <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">B</code> of size <code className="font-mono">n</code>. We want to combine them into Array <code className="font-mono text-purple-600 dark:text-purple-400 font-bold">C</code> of size <code className="font-mono">m + n</code> in sorted order.
        </p>

        {/* Algorithm Steps for 2 Arrays */}
        <AlgorithmSteps
          steps={[
            {
              title: "1. Pointer Initialization",
              description: "Initialize three indices: pointer i = 0 for Array A, pointer j = 0 for Array B, and pointer k = 0 for the destination Array C.",
              pointerState: "i = 0, j = 0, k = 0"
            },
            {
              title: "2. Synchronous Comparison Loop",
              description: "While both arrays have unvisited elements (i < m && j < n), compare A[i] with B[j]. Place the smaller element into C[k], then advance pointer k and the pointer of the selected array.",
              codeSnippet: "if (A[i] <= B[j]) { C[k++] = A[i++]; } else { C[k++] = B[j++]; }"
            },
            {
              title: "3. Emptying Remaining Elements in Array A",
              description: "If Array B finishes first (j == n), copy all remaining elements of Array A directly into Array C without further comparisons (since Array A is already sorted).",
              codeSnippet: "while (i < m) { C[k++] = A[i++]; }"
            },
            {
              title: "4. Emptying Remaining Elements in Array B",
              description: "If Array A finishes first (i == m), copy all remaining elements of Array B directly into Array C.",
              codeSnippet: "while (j < n) { C[k++] = B[j++]; }"
            }
          ]}
        />

        {/* C Code for 2-Array Merge */}
        <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-300 font-mono text-xs shadow-inner space-y-2">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
            <span className="font-bold text-purple-400">Two-Array Merge Function</span>
            <span>C Implementation</span>
          </div>
          <pre className="overflow-x-auto leading-relaxed pt-1">
{`void mergeTwoArrays(int A[], int B[], int C[], int m, int n) {
    int i = 0, j = 0, k = 0;

    // Step 1: Compare and merge until one array is exhausted
    while (i < m && j < n) {
        if (A[i] <= B[j]) {
            C[k] = A[i];
            i++;
            k++;
        } else {
            C[k] = B[j];
            j++;
            k++;
        }
    }

    // Step 2: Copy remaining elements from Array A (if any)
    while (i < m) {
        C[k] = A[i];
        i++;
        k++;
    }

    // Step 3: Copy remaining elements from Array B (if any)
    while (j < n) {
        C[k] = B[j];
        j++;
        k++;
    }
}`}
          </pre>
        </div>

        {/* Visualizer for 2-Array Merge */}
        <TwoArrayMergeVisualizer />

        <Callout type="info" title="Linear Time Merging O(m + n)">
          Because every iteration places at least one element into <code className="font-mono">C</code> and each element is processed exactly once, merging two sorted arrays of sizes <code className="font-mono">m</code> and <code className="font-mono">n</code> takes exactly <strong>O(m + n)</strong> linear time.
        </Callout>
      </section>

      {/* Part 2: Merging in a Single Array with an Auxiliary Buffer */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Part 2: Merging Within a Single Array: <code className="font-mono text-purple-600 dark:text-purple-400">merge(A, low, mid, high)</code>
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          In recursive Merge Sort, we do not operate on separate independent arrays. Instead, we have a <strong>single array <code className="font-mono">A[]</code></strong> containing two adjacent contiguous sub-segments that are already sorted:
        </p>

        <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1.5 pl-2 font-medium">
          <li><strong>Left Subarray:</strong> <code className="font-mono text-blue-600 dark:text-blue-400">A[low ... mid]</code> is sorted.</li>
          <li><strong>Right Subarray:</strong> <code className="font-mono text-amber-600 dark:text-amber-400">A[mid + 1 ... high]</code> is sorted.</li>
        </ul>

        <div className="p-4 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20 space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
          <h4 className="font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider text-[11px]">
            Why Do We Need an Auxiliary Array B[]?
          </h4>
          <p>
            If we attempted to write merged elements directly back into <code className="font-mono">A[]</code> while still comparing, we would overwrite unread elements from <code className="font-mono">A[]</code>! Therefore, we use a temporary auxiliary array <code className="font-mono">int B[high + 1]</code> as a staging buffer to collect the merged sequence, and then copy the sorted results back into <code className="font-mono">A[low ... high]</code>.
          </p>
        </div>

        {/* Algorithm Steps for Single Array Merge */}
        <AlgorithmSteps
          steps={[
            {
              title: "1. Pointer Configuration",
              description: "Set pointer i = low (start of left subarray), pointer j = mid + 1 (start of right subarray), and pointer k = low (start of auxiliary array B).",
              pointerState: "i = low, j = mid + 1, k = low"
            },
            {
              title: "2. Compare Subarrays",
              description: "While i <= mid and j <= high: compare A[i] and A[j]. Place the smaller into B[k++], incrementing the corresponding pointer.",
              codeSnippet: "if (A[i] < A[j]) { B[k++] = A[i++]; } else { B[k++] = A[j++]; }"
            },
            {
              title: "3. Leftover Cleanup",
              description: "Flush remaining elements from left (while i <= mid) or right (while j <= high) into B[k++].",
              codeSnippet: "while (i <= mid) B[k++] = A[i++]; \nwhile (j <= high) B[k++] = A[j++];"
            },
            {
              title: "4. Copy-Back Loop",
              description: "Copy all merged elements from the auxiliary buffer B[low..high] back into the original array A[low..high].",
              codeSnippet: "for (int i = low; i <= high; i++) { A[i] = B[i]; }"
            }
          ]}
        />

        {/* C Code for Single Array Merge */}
        <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-300 font-mono text-xs shadow-inner space-y-2">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
            <span className="font-bold text-purple-400">Canonical Subarray Merge Function</span>
            <span>C Implementation</span>
          </div>
          <pre className="overflow-x-auto leading-relaxed pt-1">
{`void merge(int A[], int low, int mid, int high) {
    int i = low;
    int j = mid + 1;
    int k = low;
    int B[100]; // Auxiliary array of size at least (high + 1)

    // 1. Compare elements from left and right sorted halves
    while (i <= mid && j <= high) {
        if (A[i] < A[j]) {
            B[k] = A[i];
            i++;
            k++;
        } else {
            B[k] = A[j];
            j++;
            k++;
        }
    }

    // 2. Copy remaining elements from left half
    while (i <= mid) {
        B[k] = A[i];
        i++;
        k++;
    }

    // 3. Copy remaining elements from right half
    while (j <= high) {
        B[k] = A[j];
        j++;
        k++;
    }

    // 4. Copy sorted elements from B back to A
    for (int idx = low; idx <= high; idx++) {
        A[idx] = B[idx];
    }
}`}
          </pre>
        </div>

        {/* Single Array Visualizer */}
        <SingleArrayMergeVisualizer />
      </section>

      {/* Part 3: The Complete Recursive Merge Sort Algorithm */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <GitFork className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Part 3: The Recursive Merge Sort Algorithm
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          With the <code className="font-mono text-purple-600 dark:text-purple-400">merge()</code> processor complete, the main recursive function <code className="font-mono text-purple-600 dark:text-purple-400">mergeSort(A, low, high)</code> is remarkably elegant and compact:
        </p>

        {/* C Code for Recursive MergeSort */}
        <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-300 font-mono text-xs shadow-inner space-y-2">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
            <span className="font-bold text-purple-400">Recursive MergeSort Driver</span>
            <span>C Implementation</span>
          </div>
          <pre className="overflow-x-auto leading-relaxed pt-1">
{`void mergeSort(int A[], int low, int high) {
    int mid;
    
    // Base Condition: Only proceed if array has 2 or more elements
    if (low < high) {
        mid = (low + high) / 2;         // Integer division (e.g., (0 + 3)/2 = 1)
        
        mergeSort(A, low, mid);         // Divide & sort left half
        mergeSort(A, mid + 1, high);     // Divide & sort right half
        merge(A, low, mid, high);       // Conquer: Merge both sorted halves
    }
}`}
          </pre>
        </div>

        {/* Detailed Dry Run Box */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
            Execution Dry Run on Array <code className="font-mono text-purple-600">[7, 1, 2, 8]</code> (low = 0, high = 3):
          </h3>

          <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl space-y-1 border border-gray-200 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-gray-100">1. Top Level Call: <code className="font-mono">mergeSort(A, 0, 3)</code></span>
              <p className="text-gray-600 dark:text-gray-400">
                <code className="font-mono">low &lt; high (0 &lt; 3)</code> is true &rarr; <code className="font-mono">mid = (0 + 3)/2 = 1</code>.
                <br />
                Spawns: <code className="font-mono text-blue-600">mergeSort(A, 0, 1)</code> and <code className="font-mono text-amber-600">mergeSort(A, 2, 3)</code>.
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl space-y-1 border border-gray-200 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-gray-100">2. Left Subtree: <code className="font-mono">mergeSort(A, 0, 1)</code></span>
              <p className="text-gray-600 dark:text-gray-400">
                <code className="font-mono">low &lt; high (0 &lt; 1)</code> &rarr; <code className="font-mono">mid = (0 + 1)/2 = 0</code>.
                <br />
                Calls <code className="font-mono">mergeSort(A, 0, 0)</code> (Base case: 1 element [7] &rarr; returns).
                <br />
                Calls <code className="font-mono">mergeSort(A, 1, 1)</code> (Base case: 1 element [1] &rarr; returns).
                <br />
                Calls <code className="font-mono text-emerald-600 font-bold">merge(A, 0, 0, 1)</code> &rarr; Combines [7] and [1] into <strong>[1, 7]</strong>.
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl space-y-1 border border-gray-200 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-gray-100">3. Right Subtree: <code className="font-mono">mergeSort(A, 2, 3)</code></span>
              <p className="text-gray-600 dark:text-gray-400">
                <code className="font-mono">low &lt; high (2 &lt; 3)</code> &rarr; <code className="font-mono">mid = (2 + 3)/2 = 2</code>.
                <br />
                Calls <code className="font-mono">mergeSort(A, 2, 2)</code> (Base case: [2] &rarr; returns).
                <br />
                Calls <code className="font-mono">mergeSort(A, 3, 3)</code> (Base case: [8] &rarr; returns).
                <br />
                Calls <code className="font-mono text-emerald-600 font-bold">merge(A, 2, 2, 3)</code> &rarr; Combines [2] and [8] into <strong>[2, 8]</strong>.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl space-y-1 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-medium">
              <span className="font-bold">4. Final Combination: <code className="font-mono">merge(A, 0, 1, 3)</code></span>
              <p>
                Combines sorted left half <code className="font-mono">[1, 7]</code> and sorted right half <code className="font-mono">[2, 8]</code>.
                <br />
                Output array: <strong className="font-mono">[1, 2, 7, 8]</strong>. Array is completely sorted!
              </p>
            </div>
          </div>
        </div>

        {/* Tree Visualizer */}
        <MergeSortTreeVisualizer />
      </section>

      {/* Part 4: Algorithm Analysis & Complexity Table */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Algorithm Analysis: Time, Space &amp; Stability
          </h2>
        </div>

        <ComplexityTable
          rows={[
            {
              operation: "Best Case Time",
              bestCase: "O(n log n)",
              averageCase: "O(n log n)",
              worstCase: "O(n log n)",
              spaceComplexity: "O(n)",
              notes: "Array splits evenly down to 1-element arrays. log₂ n tree levels with O(n) work per level."
            },
            {
              operation: "Average Case Time",
              bestCase: "O(n log n)",
              averageCase: "O(n log n)",
              worstCase: "O(n log n)",
              spaceComplexity: "O(n)",
              notes: "Independent of element ordering. Always performs symmetrical binary splits."
            },
            {
              operation: "Worst Case Time",
              bestCase: "O(n log n)",
              averageCase: "O(n log n)",
              worstCase: "O(n log n)",
              spaceComplexity: "O(n)",
              notes: "Unlike QuickSort (which degenerates to O(n²)), Merge Sort is guaranteed O(n log n) even on reverse sorted data!"
            },
            {
              operation: "Merge Function",
              bestCase: "O(n)",
              averageCase: "O(n)",
              worstCase: "O(n)",
              spaceComplexity: "O(n)",
              notes: "A single linear scan merging two halves of total size n."
            }
          ]}
        />

        {/* Characteristics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Stability: STABLE
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Merge Sort is <strong>Stable</strong>. When duplicate elements are compared (<code className="font-mono">A[i] &le; A[j]</code>), the element from the left subarray is always chosen first, strictly preserving initial relative order.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-amber-600" />
              Space: Out-of-Place
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Merge Sort requires <strong>O(n) auxiliary space</strong> for the temporary merge buffer <code className="font-mono">B[]</code>, plus <code className="font-mono">O(log n)</code> call stack space for recursion.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-purple-600" />
              Adaptability: Non-Adaptive
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Standard Merge Sort performs the exact same splits and comparisons regardless of whether the array is already sorted or unsorted (<code className="font-mono">O(n log n)</code> in all cases).
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Merge Sort operates on the Divide-and-Conquer paradigm: recursively divide array until 1-element base cases, then merge upwards.',
            'The 2-Array Merge Processor merges sorted Array A (size m) and Array B (size n) into Array C (size m+n) in O(m+n) linear time.',
            'The Subarray Merge function merge(A, low, mid, high) uses an auxiliary array B[] to merge adjacent sorted segments A[low..mid] and A[mid+1..high], then copies back to A.',
            'Recursive mergeSort(A, low, high) calculates mid = (low + high)/2, recursively calls itself on left and right halves, and merges them.',
            'Base condition low < high automatically terminates when subarrays have 1 element (which are already sorted).',
            'Time complexity is GUARANTEED O(n log n) in all cases (Best, Average, and Worst).',
            'Merge Sort is Stable, but requires O(n) auxiliary memory.'
          ]} 
        />
      </section>

    </div>
  );
}
