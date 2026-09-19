import { 
  Code2, 
  Terminal, 
  Layers, 
  Calculator, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Bug,
  AlertTriangle,
  HardDrive,
  Scale,
  Zap
} from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { Callout, Summary, Definition, ComplexityTable } from '@/components/DocBlocks';
import CountSortDryRunVisualizer from '@/components/CountSortDryRunVisualizer';

const COMPLETE_COUNTSORT_C_CODE = `#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

// Utility function to print an array
void printArray(int *A, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", A[i]);
    }
    printf("\\n");
}

// Function to find the maximum element in array A
int maximum(int A[], int n) {
    int max = INT_MIN; // Initialize with the smallest possible integer
    for (int i = 0; i < n; i++) {
        if (max < A[i]) {
            max = A[i];
        }
    }
    return max;
}

// Count Sort Function
void countSort(int *A, int n) {
    int i, j;

    // Step 1: Find the maximum element in A
    int max = maximum(A, n);

    // Step 2: Dynamically create the auxiliary count array of size (max + 1)
    // We need indices from 0 to max, which requires (max + 1) slots
    int *count = (int *) malloc((max + 1) * sizeof(int));

    // Step 3: Initialize all elements of count array to 0
    // (Crucial: Initialize count[i], NOT A[i]!)
    for (i = 0; i < max + 1; i++) {
        count[i] = 0;
    }

    // Step 4: Increment the corresponding index in the count array
    for (i = 0; i < n; i++) {
        count[A[i]] = count[A[i]] + 1; // Or count[A[i]]++;
    }

    // Step 5: Copy sorted elements back into original array A
    i = 0; // Pointer/counter for auxiliary count array
    j = 0; // Pointer/counter for original array A

    while (i <= max) {
        if (count[i] > 0) {
            A[j] = i;              // Copy index value to array A
            count[i] = count[i] - 1; // Decrement frequency counter
            j++;                   // Move to next position in array A
        } else {
            i++;                   // Move to next index in count array
        }
    }

    // Step 6: Free dynamically allocated heap memory to prevent memory leaks
    free(count);
}

int main() {
    // Test Case 1: Video Lecture Example (with duplicates)
    int A[] = {3, 1, 9, 7, 1, 2, 4};
    int n = 7;

    printf("=== Test Case 1: Video Lecture Array ===\\n");
    printf("Original Array: ");
    printArray(A, n);

    countSort(A, n);

    printf("Sorted Array:   ");
    printArray(A, n);

    // Test Case 2: VS Code Video Demonstration
    int B[] = {9, 1, 4, 14, 4, 15, 6};
    int nB = 7;

    printf("\\n=== Test Case 2: VS Code Video Array ===\\n");
    printf("Original Array: ");
    printArray(B, nB);

    countSort(B, nB);

    printf("Sorted Array:   ");
    printArray(B, nB);

    return 0;
}`;

export default function CountSortCodePage() {
  return (
    <div id="count-sort-code-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Code2 className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            C Implementation &amp; Dry Run
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Count Sort in C: Code, Memory &amp; Complexity
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Explore the exact C implementation of <strong>Count Sort</strong> developed in Video 60 (<code className="font-mono">60_count_sort.c</code>). We dissect dynamic memory allocation with <code className="font-mono">malloc</code>, two-pointer array reconstruction, the mathematical derivation of <strong>O(m + n)</strong> runtime, and the common pitfalls encountered when coding this algorithm.
        </p>
      </div>

      {/* Interactive Code Dry Run Simulator */}
      <section className="mb-12">
        <CountSortDryRunVisualizer />
      </section>

      {/* Complete C Code Block */}
      <section className="mb-12 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Complete Clean C Implementation (60_count_sort.c)
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-500">C99 / GCC / Clang Compatible</span>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          This is the complete, self-contained C source code reproducing the video demonstration, equipped with defensive memory management and test cases for both lecture examples.
        </p>

        <CodeBlock
          code={COMPLETE_COUNTSORT_C_CODE}
          language="c"
          filename="60_count_sort.c"
        />
      </section>

      {/* Deep-Dive Loop Breakdown */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Loop-by-Loop Algorithmic Breakdown
          </h2>
        </div>

        <div className="space-y-4">
          
          {/* Loop 1: Find Max */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                1. Loop 1: Finding Maximum Value
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                Time: O(n)
              </span>
            </div>
            <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded text-gray-800 dark:text-gray-200 overflow-x-auto">
{`int max = INT_MIN;
for (int i = 0; i < n; i++) {
    if (max < A[i]) max = A[i];
}`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              We iterate across array <code className="font-mono">A</code> of length <code className="font-mono">n</code>. We start with <code className="font-mono">INT_MIN</code> from <code className="font-mono">&lt;limits.h&gt;</code> to safely compare against any integer. Total iterations: exactly <code className="font-mono">n</code> steps.
            </p>
          </div>

          {/* Loop 2: Allocation & Zeroing */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                2. Loop 2: Zero-Initializing Count Array
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                Time: O(m)
              </span>
            </div>
            <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded text-gray-800 dark:text-gray-200 overflow-x-auto">
{`int *count = (int *) malloc((max + 1) * sizeof(int));
for (i = 0; i < max + 1; i++) {
    count[i] = 0;
}`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Because C heap memory from <code className="font-mono">malloc</code> contains uninitialized garbage values, we must explicitly zero-out each index from <code className="font-mono">0</code> to <code className="font-mono">max</code>. Total iterations: <code className="font-mono">max + 1 = m + 1</code> steps, which is <code className="font-mono">O(m)</code>.
            </p>
          </div>

          {/* Loop 3: Frequency Mapping */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                3. Loop 3: Frequency Tallying
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                Time: O(n)
              </span>
            </div>
            <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded text-gray-800 dark:text-gray-200 overflow-x-auto">
{`for (i = 0; i < n; i++) {
    count[A[i]] = count[A[i]] + 1;
}`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              We traverse the input array once. For each element <code className="font-mono">A[i]</code>, we perform an <code className="font-mono">O(1)</code> direct lookup and increment at index <code className="font-mono">count[A[i]]</code>. Total iterations: exactly <code className="font-mono">n</code> steps.
            </p>
          </div>

          {/* Loop 4: Reconstruction */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                4. Loop 4: Two-Pointer Reconstruction
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Time: O(m + n)
              </span>
            </div>
            <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded text-gray-800 dark:text-gray-200 overflow-x-auto">
{`i = 0; j = 0;
while (i <= max) {
    if (count[i] > 0) {
        A[j] = i;
        count[i]--;
        j++;
    } else {
        i++;
    }
}`}
            </pre>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Pointer <code className="font-mono">i</code> advances from <code className="font-mono">0</code> to <code className="font-mono">max</code> (<code className="font-mono">m + 1</code> increments in total). Pointer <code className="font-mono">j</code> advances exactly <code className="font-mono">n</code> times (once for every element written into <code className="font-mono">A</code>). Because each iteration either decrements a count or advances <code className="font-mono">i</code>, the while loop executes in exactly <code className="font-mono">(m + 1) + n</code> steps: <code className="font-mono font-bold">O(m + n)</code>!
            </p>
          </div>

        </div>
      </section>

      {/* Time Complexity Derivation */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Scale className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Mathematical Complexity Derivation: Why O(m + n)?
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Summing the runtimes of all four sequential loops gives:
        </p>

        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/40 font-mono text-xs sm:text-sm space-y-2">
          <div className="text-gray-700 dark:text-gray-300">
            Total Time T(n, m) = T(Loop 1) + T(Loop 2) + T(Loop 3) + T(Loop 4)
          </div>
          <div className="text-purple-700 dark:text-purple-400 font-bold">
            T(n, m) = O(n) + O(m) + O(n) + O(m + n) = O(2m + 3n) = <strong>O(m + n)</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              When m is O(n) &rarr; Linear O(n)
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              As explained by the instructor in the video, in standard algorithmic theory, when <code className="font-mono">n</code> is very large and the range of values <code className="font-mono">m</code> is small or bounded (<code className="font-mono">m &le; n</code>), the <code className="font-mono">m</code> term is negligible. Thus, <code className="font-mono">O(m + n)</code> collapses to <strong>O(n)</strong>—the fastest achievable sorting time.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              When m &gt;&gt; n &rarr; Dominated by O(m)
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              If an array has only <code className="font-mono">n = 5</code> elements but contains <code className="font-mono">max = 1,000,000</code>, the loops over <code className="font-mono">m</code> take 1,000,000 operations while the <code className="font-mono">n</code> loops take only 5. The runtime is completely dominated by <code className="font-mono">m</code>, making Count Sort worse than <code className="font-mono">O(n log n)</code> algorithms!
            </p>
          </div>
        </div>
      </section>

      {/* Instructor's Mistakes & Debugging Notes from Video */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Bug className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Instructor's Live Debugging Notes &amp; Classic Pitfalls
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          During the live coding in the video lecture, the instructor made and resolved several realistic bugs that every developer encounters. Studying these errors is deeply educational:
        </p>

        <div className="space-y-3">
          
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Mistake 1: Zeroing A[i] instead of count[i]
            </div>
            <p className="leading-relaxed">
              In the video, the instructor initially typed <code className="font-mono bg-white dark:bg-gray-900 px-1 py-0.5 rounded">A[i] = 0;</code> during initialization. This accidentally wiped the entire input array before counting! The fix was to initialize <code className="font-mono bg-white dark:bg-gray-900 px-1 py-0.5 rounded font-bold">count[i] = 0;</code> up to <code className="font-mono">&lt; max + 1</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Mistake 2: Missing &lt;stdlib.h&gt; header
            </div>
            <p className="leading-relaxed">
              When calling <code className="font-mono bg-white dark:bg-gray-900 px-1 py-0.5 rounded">malloc()</code>, GCC throws an implicit declaration warning or error if <code className="font-mono">&lt;stdlib.h&gt;</code> is omitted. Always include <code className="font-mono">&lt;stdlib.h&gt;</code> for memory allocation and <code className="font-mono">&lt;limits.h&gt;</code> for <code className="font-mono">INT_MIN</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <div className="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Mistake 3: The Off-By-One Buffer Overflow (max vs max + 1)
            </div>
            <p className="leading-relaxed">
              If the maximum element is <code className="font-mono">15</code>, allocating an array of size <code className="font-mono">15</code> only gives indices <code className="font-mono">0..14</code>! Attempting to write <code className="font-mono">count[15]++</code> causes an illegal out-of-bounds write. You <strong>must allocate size (max + 1)</strong> so index <code className="font-mono">max</code> is valid.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <div className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Good Practice: free(count)
            </div>
            <p className="leading-relaxed">
              Because <code className="font-mono">count</code> was allocated on the heap using <code className="font-mono">malloc</code>, always invoke <code className="font-mono">free(count);</code> before exiting the function to prevent memory leaks in production servers.
            </p>
          </div>

        </div>
      </section>

      {/* Summary */}
      <Summary
        title="Implementation Summary: Count Sort in C"
        points={[
          "Count Sort is cleanly implemented with 4 sequential linear passes: find max, zero count, populate tally, and rewrite into A.",
          "Auxiliary array size MUST be (max + 1) to accommodate the zero-based index for the maximum value.",
          "Memory must be allocated on the heap via malloc and freed cleanly via free() to avoid leaks.",
          "Total execution time is strictly O(m + n). When m <= n, this delivers unmatched O(n) sorting throughput.",
          "Zero element comparisons are performed, bypassing the decision tree lower bound of comparison-based sorts."
        ]}
      />

    </div>
  );
}
