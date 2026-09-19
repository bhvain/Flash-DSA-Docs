import { 
  Code2, 
  Terminal, 
  Layers, 
  GitFork, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Bug,
  AlertTriangle,
  HardDrive,
  Copy,
  Scale
} from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { Callout, Summary, Definition, AlgorithmSteps, ComplexityTable } from '@/components/DocBlocks';
import MergeSortCodeVisualizer from '@/components/MergeSortCodeVisualizer';


const COMPLETE_MERGESORT_C_CODE = `#include <stdio.h>

// Utility function to print elements of an array
void printArray(int *A, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }
    printf("\\n");
}

// Subarray Merge Procedure: Combines sorted halves A[low..mid] & A[mid+1..high]
void merge(int A[], int low, int mid, int high) {
    int i = low;        // Pointer to start of left sorted subarray
    int j = mid + 1;    // Pointer to start of right sorted subarray
    int k = low;        // Pointer to start of auxiliary array B
    int B[100];         // Auxiliary buffer (size at least high + 1)

    // Step 1: Compare elements from both halves and place smaller into B
    while (i <= mid && j <= high) {
        if (A[i] <= A[j]) {
            B[k] = A[i];
            i++;
            k++;
        } else {
            B[k] = A[j];
            j++;
            k++;
        }
    }

    // Step 2: Copy any remaining elements from the left subarray
    while (i <= mid) {
        B[k] = A[i];
        i++;
        k++;
    }

    // Step 3: Copy any remaining elements from the right subarray
    while (j <= high) {
        B[k] = A[j];
        j++;
        k++;
    }

    // Step 4: CRITICAL - Copy all sorted elements from B back into original array A
    for (int idx = low; idx <= high; idx++) {
        A[idx] = B[idx];
    }
}

// Recursive Merge Sort function
void mergeSort(int A[], int low, int high) {
    int mid;

    // Base condition: Array must contain at least 2 elements to split
    if (low < high) {
        // Integer division to determine halfway split point
        mid = (low + high) / 2;

        mergeSort(A, low, mid);       // Recursively divide and sort left half
        mergeSort(A, mid + 1, high);   // Recursively divide and sort right half
        merge(A, low, mid, high);     // Conquer: Merge both sorted halves
    }
}

int main() {
    // Test Case 1: Standard Unsorted Array
    int A[] = {9, 14, 4, 8, 7, 5, 6};
    int n = 7;

    printf("Original Array (A):\\n");
    printArray(A, n);

    mergeSort(A, 0, n - 1);

    printf("\\nSorted Array (A):\\n");
    printArray(A, n);

    // Test Case 2: Array with Duplicate & Repeated Values
    int B[] = {9, 1, 4, 14, 4, 15, 6};
    int nB = 7;

    printf("\\nArray with Duplicates Before Sort:\\n");
    printArray(B, nB);

    mergeSort(B, 0, nB - 1);

    printf("Array with Duplicates After Sort:\\n");
    printArray(B, nB);

    return 0;
}`;

export default function MergeSortCodePage() {
  return (
    <div id="merge-sort-code-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Code2 className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            C Implementation &amp; Code Walkthrough
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Merge Sort: Complete C Code &amp; Implementation
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Explore the canonical, production-ready C implementation of recursive Merge Sort. This guide breaks down the auxiliary buffer logic, the critical boundary conditions in the <code className="font-mono text-purple-600 dark:text-purple-400 font-bold">merge()</code> subroutine, integer division splitting, and the mandatory copy-back sequence.
        </p>
      </div>

      {/* Program Architecture Overview */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Cpu className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Program Architecture &amp; Function Breakdown
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The complete Merge Sort program in C is structured into three clear modular components:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 font-mono">
                printArray(int *A, int n)
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Iterates through the array and prints formatted elements to <code className="font-mono text-[11px]">stdout</code> for convenient before-and-after verification.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 font-mono">
                merge(A, low, mid, high)
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              The core combining engine. Merges two adjacent sorted segments <code className="font-mono text-[11px]">A[low..mid]</code> and <code className="font-mono text-[11px]">A[mid+1..high]</code> via auxiliary buffer <code className="font-mono text-[11px]">B[]</code> and copies back.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 font-mono">
                mergeSort(A, low, high)
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              The divide-and-conquer coordinator. Recursively calculates <code className="font-mono text-[11px]">mid = (low + high) / 2</code>, sorts both halves, and invokes <code className="font-mono text-[11px]">merge()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Complete C Source Code */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Terminal className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Complete C Source Code (<code className="font-mono text-purple-600 dark:text-purple-400 text-sm">mergesort.c</code>)
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Below is the complete, self-contained C code that compiles with standard C compilers (such as <code className="font-mono text-purple-600 dark:text-purple-400">gcc mergesort.c -o mergesort</code>):
        </p>

        <CodeBlock code={COMPLETE_MERGESORT_C_CODE} language="c" />

        <Callout type="info" title="Compilation & Execution Command">
          <div className="font-mono text-xs space-y-1">
            <p className="text-gray-700 dark:text-gray-300">$ gcc -Wall -O2 mergesort.c -o mergesort</p>
            <p className="text-gray-700 dark:text-gray-300">$ ./mergesort</p>
          </div>
        </Callout>
      </section>

      {/* Interactive Simulator Section */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Interactive C Execution Simulator &amp; Bug Inspector
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Step through the live C execution, watch pointers <code className="font-mono text-purple-600 dark:text-purple-400 font-bold">i, j, k</code> advance, inspect the auxiliary staging buffer <code className="font-mono text-purple-600 dark:text-purple-400 font-bold">B[]</code>, and test common bug toggles to see why subtle code mistakes break the algorithm:
        </p>

        <MergeSortCodeVisualizer />
      </section>

      {/* Deep Dive 1: The merge() Subroutine */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Deep Dive: The <code className="font-mono text-purple-600 dark:text-purple-400 text-lg">merge()</code> Subroutine Explained
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The <code className="font-mono text-purple-600 dark:text-purple-400">merge(int A[], int low, int mid, int high)</code> function combines two already-sorted adjacent portions of the same array <code className="font-mono">A[]</code>. Let us examine its four fundamental phases:
        </p>

        <div className="space-y-4">
          
          {/* Phase 1 */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[11px]">
                Phase 1
              </span>
              Pointer Configuration &amp; Auxiliary Buffer
            </h3>
            <pre className="p-3 bg-gray-900 text-gray-300 rounded-lg text-xs font-mono overflow-x-auto">
{`int i = low;        // Start of left subarray A[low..mid]
int j = mid + 1;    // Start of right subarray A[mid+1..high]
int k = low;        // Start of auxiliary buffer B
int B[100];         // Buffer sized to safely hold (high + 1) elements`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Pointer <code className="font-mono">i</code> begins at the start of the left segment (<code className="font-mono">low</code>), pointer <code className="font-mono">j</code> begins at the start of the right segment (<code className="font-mono">mid + 1</code>), and pointer <code className="font-mono">k</code> begins at <code className="font-mono">low</code> in the auxiliary buffer <code className="font-mono">B[]</code>.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px]">
                Phase 2
              </span>
              Synchronous Comparison Loop (<code className="font-mono text-purple-600">&le;</code> Boundary)
            </h3>
            <pre className="p-3 bg-gray-900 text-gray-300 rounded-lg text-xs font-mono overflow-x-auto">
{`while (i <= mid && j <= high) {
    if (A[i] <= A[j]) {
        B[k] = A[i];
        i++;
        k++;
    } else {
        B[k] = A[j];
        j++;
        k++;
    }
}`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Both subarrays are traversed synchronously. We compare <code className="font-mono">A[i]</code> with <code className="font-mono">A[j]</code> and place the smaller value into <code className="font-mono">B[k]</code>. Using <code className="font-mono">A[i] &le; A[j]</code> guarantees <strong>algorithmic stability</strong> by choosing the left element on ties.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[11px]">
                Phase 3
              </span>
              Exhausting Residual Elements (Cleanup Loops)
            </h3>
            <pre className="p-3 bg-gray-900 text-gray-300 rounded-lg text-xs font-mono overflow-x-auto">
{`// Flush remaining left elements
while (i <= mid) {
    B[k] = A[i];
    i++;
    k++;
}

// Flush remaining right elements
while (j <= high) {
    B[k] = A[j];
    j++;
    k++;
}`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              When one subarray is fully consumed, the other subarray may still contain remaining unvisited elements. Since each subarray was already sorted, all residual elements can be copied directly into <code className="font-mono">B[]</code> without any comparisons.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
            <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px]">
                Phase 4
              </span>
              The Mandatory Copy-Back Loop (<code className="font-mono">A[idx] = B[idx]</code>)
            </h3>
            <pre className="p-3 bg-gray-900 text-gray-300 rounded-lg text-xs font-mono overflow-x-auto">
{`for (int idx = low; idx <= high; idx++) {
    A[idx] = B[idx];
}`}
            </pre>
            <p className="text-xs text-emerald-950/90 dark:text-emerald-200/90 leading-relaxed">
              <strong>Crucial Step:</strong> The newly sorted sequence is currently sitting in the temporary auxiliary buffer <code className="font-mono font-bold">B[]</code>. We must copy every element from index <code className="font-mono font-bold">low</code> through <code className="font-mono font-bold">high</code> back into the original array <code className="font-mono font-bold">A[]</code> so subsequent recursive levels can observe the sorted subarrays!
            </p>
          </div>

        </div>
      </section>

      {/* Deep Dive 2: The mergeSort() Driver */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <GitFork className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Deep Dive: The Recursive <code className="font-mono text-purple-600 dark:text-purple-400 text-lg">mergeSort()</code> Coordinator
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The recursive driver is concise, consisting of a base condition check, a midpoint division, two recursive calls, and a merge call:
        </p>

        <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-300 font-mono text-xs shadow-inner space-y-2">
          <pre className="overflow-x-auto leading-relaxed">
{`void mergeSort(int A[], int low, int high) {
    int mid;

    if (low < high) {                 // 1. Base Condition: At least 2 elements required
        mid = (low + high) / 2;       // 2. Integer Division: Splitting index in C
        
        mergeSort(A, low, mid);       // 3. Recurse on Left Subarray A[low..mid]
        mergeSort(A, mid + 1, high);   // 4. Recurse on Right Subarray A[mid+1..high]
        merge(A, low, mid, high);     // 5. Conquer: Merge both sorted subarrays
    }
}`}
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              1. Base Condition: <code className="font-mono text-purple-600">low &lt; high</code>
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              When an array has only 1 element (<code className="font-mono">low == high</code>) or is empty (<code className="font-mono">low &gt; high</code>), <code className="font-mono">low &lt; high</code> evaluates to <strong>FALSE</strong>. The function returns immediately without recursion or merging, since 1-element arrays are inherently sorted.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-blue-600" />
              2. Integer Division: <code className="font-mono text-blue-600">mid = (low + high) / 2</code>
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              In C, dividing two integers performs mathematical truncation (floor division).
              For an odd-length array spanning indices <code className="font-mono">0..4</code> (5 elements): <code className="font-mono">(0 + 4) / 2 = 2</code>, splitting cleanly into <code className="font-mono">0..2</code> (3 elements) and <code className="font-mono">3..4</code> (2 elements).
            </p>
          </div>
        </div>
      </section>

      {/* Dry Run Analysis */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Execution Dry Run: Array <code className="font-mono text-purple-600">[9, 14, 4, 8, 7, 5, 6]</code> (<code className="font-mono">n = 7</code>)
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Let us trace the complete recursive execution on the 7-element unsorted array <code className="font-mono font-bold text-purple-600">A = [9, 14, 4, 8, 7, 5, 6]</code> with initial call <code className="font-mono font-bold text-purple-600">mergeSort(A, 0, 6)</code>:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px] font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3">Call / Operation</th>
                <th className="p-3">Indices (<code className="font-mono">l, m, h</code>)</th>
                <th className="p-3">Action Description</th>
                <th className="p-3">Subarray State After Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300 font-sans">
              <tr className="bg-white dark:bg-gray-950">
                <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">mergeSort(A, 0, 6)</td>
                <td className="p-3 font-mono">low=0, mid=3, high=6</td>
                <td className="p-3">Splits into Left <code className="font-mono">A[0..3]</code> and Right <code className="font-mono">A[4..6]</code>.</td>
                <td className="p-3 font-mono">[9, 14, 4, 8 | 7, 5, 6]</td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-900/30">
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">mergeSort(A, 0, 3)</td>
                <td className="p-3 font-mono">low=0, mid=1, high=3</td>
                <td className="p-3">Splits Left into <code className="font-mono">A[0..1]</code> and <code className="font-mono">A[2..3]</code>.</td>
                <td className="p-3 font-mono">[9, 14 | 4, 8]</td>
              </tr>
              <tr className="bg-white dark:bg-gray-950">
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">mergeSort(A, 0, 1)</td>
                <td className="p-3 font-mono">low=0, mid=0, high=1</td>
                <td className="p-3">Splits into atomic leaves <code className="font-mono">A[0..0]</code> and <code className="font-mono">A[1..1]</code>.</td>
                <td className="p-3 font-mono">[9] and [14] (Base Cases)</td>
              </tr>
              <tr className="bg-emerald-50/30 dark:bg-emerald-950/20">
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">merge(A, 0, 0, 1)</td>
                <td className="p-3 font-mono">l=0, m=0, h=1</td>
                <td className="p-3">Merges [9] and [14] into sorted pair <code className="font-mono">[9, 14]</code>.</td>
                <td className="p-3 font-mono text-emerald-700 dark:text-emerald-300 font-bold">A[0..1] = [9, 14]</td>
              </tr>
              <tr className="bg-white dark:bg-gray-950">
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">mergeSort(A, 2, 3)</td>
                <td className="p-3 font-mono">low=2, mid=2, high=3</td>
                <td className="p-3">Splits into atomic leaves <code className="font-mono">A[2..2]</code> ([4]) and <code className="font-mono">A[3..3]</code> ([8]).</td>
                <td className="p-3 font-mono">[4] and [8] (Base Cases)</td>
              </tr>
              <tr className="bg-emerald-50/30 dark:bg-emerald-950/20">
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">merge(A, 2, 2, 3)</td>
                <td className="p-3 font-mono">l=2, m=2, h=3</td>
                <td className="p-3">Merges [4] and [8] into sorted pair <code className="font-mono">[4, 8]</code>.</td>
                <td className="p-3 font-mono text-emerald-700 dark:text-emerald-300 font-bold">A[2..3] = [4, 8]</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/40">
                <td className="p-3 font-mono font-bold text-emerald-700 dark:text-emerald-300">merge(A, 0, 1, 3)</td>
                <td className="p-3 font-mono">l=0, m=1, h=3</td>
                <td className="p-3">Merges <code className="font-mono">[9, 14]</code> and <code className="font-mono">[4, 8]</code> into <code className="font-mono">[4, 8, 9, 14]</code>.</td>
                <td className="p-3 font-mono text-emerald-700 dark:text-emerald-300 font-bold">A[0..3] = [4, 8, 9, 14]</td>
              </tr>
              <tr className="bg-white dark:bg-gray-950">
                <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">mergeSort(A, 4, 6)</td>
                <td className="p-3 font-mono">low=4, mid=5, high=6</td>
                <td className="p-3">Right half recursively sorts into <code className="font-mono">[5, 6, 7]</code>.</td>
                <td className="p-3 font-mono text-amber-700 dark:text-amber-300 font-bold">A[4..6] = [5, 6, 7]</td>
              </tr>
              <tr className="bg-purple-100/70 dark:bg-purple-950/60 font-bold">
                <td className="p-3 font-mono text-purple-900 dark:text-purple-200">merge(A, 0, 3, 6)</td>
                <td className="p-3 font-mono">l=0, m=3, h=6</td>
                <td className="p-3">Final conquer: Merges <code className="font-mono">[4, 8, 9, 14]</code> and <code className="font-mono">[5, 6, 7]</code>.</td>
                <td className="p-3 font-mono text-purple-900 dark:text-purple-200">A[0..6] = [4, 5, 6, 7, 8, 9, 14]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Pitfalls & Debugging Guide */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Bug className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Common Pitfalls &amp; Debugging Guide
          </h2>
        </div>

        <div className="space-y-4">
          
          {/* Trap 1 */}
          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 space-y-2">
            <h3 className="text-xs font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Pitfall 1: Using <code className="font-mono">&lt;</code> Instead of <code className="font-mono">&le;</code> in Loop Conditions
            </h3>
            <p className="text-xs text-rose-950/90 dark:text-rose-200/90 leading-relaxed">
              <strong>The Bug:</strong> Writing <code className="font-mono">while (i &lt; mid &amp;&amp; j &lt; high)</code> instead of <code className="font-mono">while (i &le; mid &amp;&amp; j &le; high)</code>.
              <br />
              <strong>The Consequence:</strong> The loop terminates prematurely before inspecting the boundary elements <code className="font-mono">A[mid]</code> and <code className="font-mono">A[high]</code>, leaving values stranded and resulting in an unsorted or truncated output.
            </p>
          </div>

          {/* Trap 2 */}
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
            <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Pitfall 2: Forgetting the Copy-Back Step (<code className="font-mono">A[i] = B[i]</code>)
            </h3>
            <p className="text-xs text-amber-950/90 dark:text-amber-200/90 leading-relaxed">
              <strong>The Bug:</strong> Omitting the final <code className="font-mono">for (int idx = low; idx &le; high; idx++) A[idx] = B[idx];</code> loop at the end of <code className="font-mono">merge()</code>.
              <br />
              <strong>The Consequence:</strong> The sorted elements remain trapped inside the temporary stack buffer <code className="font-mono">B[]</code>. When the function returns, <code className="font-mono">B[]</code> is deallocated from the call frame, leaving the original array <code className="font-mono">A[]</code> completely untouched and unsorted!
            </p>
          </div>

          {/* Trap 3 */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-purple-600" />
              Pitfall 3: Static Array Buffer Sizing &amp; Dynamic Allocation in C
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              In standard C, declaring <code className="font-mono">int B[100];</code> works well for demonstration inputs with up to 100 elements. For arbitrary input sizes, dynamic memory allocation using <code className="font-mono">malloc</code> should be used:
            </p>
            <pre className="p-3 bg-gray-900 text-gray-300 rounded-lg text-xs font-mono overflow-x-auto">
{`// Dynamic allocation alternative for arbitrary size arrays:
int *B = (int *)malloc((high + 1) * sizeof(int));
// ... perform merge operations ...
// ... copy back from B to A ...
free(B); // Prevent memory leaks!`}
            </pre>
          </div>

        </div>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Merge Sort is structured into two main functions: the recursive divide-and-conquer driver mergeSort(A, low, high) and the linear combining subroutine merge(A, low, mid, high).',
            'The base condition `low < high` ensures recursion halts when subarrays reach 1 element (which are inherently sorted).',
            'Integer division mid = (low + high) / 2 cleanly partitions arrays of any size in C without needing floating-point functions.',
            'The merge procedure uses three indices: i = low, j = mid + 1, and k = low, comparing elements from both halves into auxiliary buffer B[].',
            'All loop boundary conditions in merge() MUST use `<=` (i <= mid && j <= high) to avoid omitting boundary elements.',
            'The copy-back loop (for i = low; i <= high; i++) A[i] = B[i] is strictly mandatory to reflect merged results back into array A.',
            'Merge Sort handles duplicate elements stably when using <= in the comparison step (A[i] <= A[j]).',
            'Guaranteed O(n log n) runtime across all datasets with O(n) auxiliary space.'
          ]} 
        />
      </section>

    </div>
  );
}
