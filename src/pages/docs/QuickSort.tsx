import { 
  Zap, 
  GitFork, 
  Users, 
  ArrowLeftRight, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  LayoutList,
  CheckCircle2
} from 'lucide-react';
import { Callout, Summary, Definition, AlgorithmSteps, ComplexityTable } from '@/components/DocBlocks';
import AssemblyPartitionVisualizer from '@/components/AssemblyPartitionVisualizer';
import QuickSortPartitionVisualizer from '@/components/QuickSortPartitionVisualizer';


export default function QuickSortTheoryPage() {
  return (
    <div id="quick-sort-theory-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Zap className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            Divide and Conquer Sorting
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          QuickSort: Theory &amp; Partitioning
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          QuickSort is a highly efficient, comparison-based, in-place sorting algorithm that uses the <strong>Divide-and-Conquer</strong> paradigm. Instead of sorting elements by incremental comparisons across the entire array, it selects a <strong>Pivot</strong> element and <strong>Partitions</strong> the array around it.
        </p>
      </div>

      {/* The Intuitive School Assembly Analogy */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The School Assembly Analogy
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Imagine a school morning assembly where students standing in a row must be arranged in ascending order of height. The students are standing randomly across numbered positions (0 to 4).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs">
            <h3 className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-2">
              The Class Teacher (Ms. QuickSort)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Ms. QuickSort oversees the whole operation. Instead of attempting to sort all children at once, she delegates a focused sub-task to her staff (the P.T. Teachers): <em>&quot;Take the 1st student at index 0 as reference, partition the rest around her, and report back the box number where she ends up!&quot;</em>
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs">
            <h3 className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-2">
              The P.T. Teacher (The Partition Function)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              The P.T. Teacher uses two pointers: <code className="font-mono text-purple-600">i</code> (scanning forward from left for someone taller than reference) and <code className="font-mono text-purple-600">j</code> (scanning backward from right for someone shorter). Whenever both are found, they swap. Once pointers cross, the reference student is swapped into index <code className="font-mono text-purple-600">j</code>.
            </p>
          </div>
        </div>

        {/* Assembly Interactive Visualizer */}
        <AssemblyPartitionVisualizer />
      </section>

      {/* Partitioning Procedure in Depth */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowLeftRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The Two-Pointer Partitioning Algorithm
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Partitioning is the engine that drives QuickSort. The goal of <code className="font-mono text-purple-600 dark:text-purple-400">partition(A, low, high)</code> is to place the <strong>pivot element</strong> at its exact sorted position, such that:
        </p>

        <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1.5 pl-2 font-medium">
          <li>All elements to the <strong>left</strong> of the pivot are <strong>less than or equal to</strong> the pivot.</li>
          <li>All elements to the <strong>right</strong> of the pivot are <strong>greater than</strong> the pivot.</li>
        </ul>

        <Definition term="Pivot Element">
          The reference element chosen from the array around which elements are partitioned. In our canonical standard implementation, we choose <code className="font-mono">A[low]</code> (the first element of the subarray) as the pivot.
        </Definition>

        {/* Step-by-Step Logic */}
        <AlgorithmSteps
          steps={[
            {
              title: "Initialize Pointers",
              description: "Set pivot = A[low]. Set pointer i = low + 1 (to scan from left) and pointer j = high (to scan from right).",
              pointerState: "pivot = A[low], i = low + 1, j = high"
            },
            {
              title: "Forward Scan (Pointer i)",
              description: "Increment i while A[i] <= pivot. Stop pointer i as soon as an element strictly greater than the pivot (A[i] > pivot) is found.",
              codeSnippet: "while (A[i] <= pivot) { i++; }"
            },
            {
              title: "Backward Scan (Pointer j)",
              description: "Decrement j while A[j] > pivot. Stop pointer j as soon as an element less than or equal to the pivot (A[j] <= pivot) is found.",
              codeSnippet: "while (A[j] > pivot) { j--; }"
            },
            {
              title: "Swap Violations (if i < j)",
              description: "If pointers have not crossed (i < j), swap A[i] and A[j]. This places the smaller element on the left and the larger on the right. Then resume scanning.",
              codeSnippet: "if (i < j) { swap(A[i], A[j]); }"
            },
            {
              title: "Final Pivot Placement (Pointers Crossed)",
              description: "When j <= i, the scan is complete. Swap the original pivot element A[low] with A[j]. Return j as the partitionIndex.",
              codeSnippet: "swap(A[low], A[j]); return j;"
            }
          ]}
        />

        {/* Numerical Interactive Partition Visualizer */}
        <QuickSortPartitionVisualizer />

        <Callout type="tip" title="Why is the Pivot Permanently Positioned?">
          Once an element has all values &le; pivot on its left and all values &gt; pivot on its right, it is sitting in its <strong>exact final position</strong> in the sorted array. It will <strong>never need to move again</strong> during any subsequent step or recursive call!
        </Callout>
      </section>

      {/* The Divide and Conquer Recursion Strategy */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <GitFork className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Divide and Conquer Architecture
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Once <code className="font-mono text-purple-600">partition()</code> returns the index <code className="font-mono text-purple-600">pIndex</code> where the pivot has settled, Ms. QuickSort divides the remaining unsorted elements into two distinct subarrays:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-1">
              Left Subarray: <code className="font-mono text-purple-600">quickSort(A, low, pIndex - 1)</code>
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Contains elements strictly to the left of the pivot. If <code className="font-mono">low &ge; pIndex - 1</code>, it has 0 or 1 element and is already sorted (Base case).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-1">
              Right Subarray: <code className="font-mono text-purple-600">quickSort(A, pIndex + 1, high)</code>
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Contains elements strictly to the right of the pivot. If <code className="font-mono">pIndex + 1 &ge; high</code>, it has 0 or 1 element and is already sorted (Base case).
            </p>
          </div>
        </div>

        <Callout type="info" title="In-Place Operations">
          Notice that we never allocate secondary temporary arrays. All pointer adjustments and swaps occur directly within the original array memory buffer <code className="font-mono">A[]</code>.
        </Callout>
      </section>

      {/* Analysis Criteria */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <LayoutList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Algorithm Analysis
          </h2>
        </div>

        <ComplexityTable
          rows={[
            {
              operation: "QuickSort Time Complexity",
              bestCase: "O(n log n)",
              averageCase: "O(n log n)",
              worstCase: "O(n²)",
              spaceComplexity: "O(log n) stack",
              notes: "Worst case O(n²) occurs when the pivot is always the smallest or largest element (e.g., already sorted array)."
            },
            {
              operation: "Partition Function",
              bestCase: "O(n)",
              averageCase: "O(n)",
              worstCase: "O(n)",
              spaceComplexity: "O(1)",
              notes: "Each single partitioning pass makes one linear pass over the subarray."
            }
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5 text-xs">
              <ShieldCheck className="h-4 w-4 text-rose-600" />
              Stability: Unstable
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              QuickSort is <strong>not stable</strong>. Long-distance swaps between pointers <code className="font-mono">i</code> and <code className="font-mono">j</code> or swapping the pivot with <code className="font-mono">A[j]</code> can invert the relative order of duplicate elements.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Clock className="h-4 w-4 text-emerald-600" />
              In-Place vs Auxiliary Space
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              QuickSort operates <strong>in-place</strong> on the input array, requiring only <code className="font-mono">O(1)</code> extra variable memory. However, recursion requires <code className="font-mono">O(log n)</code> stack memory on average.
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'QuickSort uses Divide-and-Conquer to partition an array around a chosen Pivot element.',
            'The 2-pointer Partition algorithm scans from left (i) and right (j) to place elements <= pivot on left and > pivot on right.',
            'Once i and j cross, swapping pivot A[low] with A[j] locks the pivot into its final, permanent sorted position.',
            'QuickSort is then called recursively on the left subarray (low to pIndex-1) and right subarray (pIndex+1 to high).',
            'Average-case time complexity is O(n log n), while worst-case is O(n²) when the array is already sorted and low is picked as pivot.'
          ]} 
        />
      </section>

    </div>
  );
}
