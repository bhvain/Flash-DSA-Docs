import { 
  Clock, 
  Layers, 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  HardDrive, 
  Dice5, 
  CheckCircle2, 
  AlertTriangle,
  GitFork,
  Scale
} from 'lucide-react';
import { Callout, Summary, Definition, ComplexityTable } from '@/components/DocBlocks';
import QuickSortWorstVsBestVisualizer from '@/components/QuickSortWorstVsBestVisualizer';
import QuickSortStabilityProofVisualizer from '@/components/QuickSortStabilityProofVisualizer';


export default function QuickSortAnalysisPage() {
  return (
    <div id="quick-sort-analysis-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Scale className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            Algorithm Analysis
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          QuickSort: Time Complexity &amp; Stability Analysis
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          QuickSort exhibits drastically different runtime performance depending on how the chosen pivot partitions the array. In this comprehensive guide, we derive the mathematical foundations of its <strong>Worst Case</strong>, <strong>Best Case</strong>, and <strong>Average Case</strong> time complexities, prove why it is <strong>Unstable</strong>, and explore <strong>Randomized QuickSort</strong>.
        </p>
      </div>

      {/* Quick Summary Complexity Table */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            QuickSort Performance Overview
          </h2>
        </div>

        <ComplexityTable
          rows={[
            {
              operation: "Best Case Time",
              bestCase: "O(n log n)",
              averageCase: "O(n log n)",
              worstCase: "O(n²)",
              spaceComplexity: "O(log n) stack",
              notes: "Occurs when pivot always splits the array into two equal halves (balanced recursion tree)."
            },
            {
              operation: "Average Case Time",
              bestCase: "O(n log n)",
              averageCase: "O(n log n)",
              worstCase: "O(n²)",
              spaceComplexity: "O(log n) stack",
              notes: "Occurs with arbitrary real-world distributions. Even unbalanced 9-to-1 splits yield O(n log n)."
            },
            {
              operation: "Worst Case Time",
              bestCase: "O(n log n)",
              averageCase: "O(n log n)",
              worstCase: "O(n²)",
              spaceComplexity: "O(n) stack",
              notes: "Occurs when array is already sorted or reverse sorted and A[low] is picked as pivot."
            },
            {
              operation: "Single Partition Pass",
              bestCase: "O(n)",
              averageCase: "O(n)",
              worstCase: "O(n)",
              spaceComplexity: "O(1)",
              notes: "A single linear scan comparing elements with the pivot: T_partition(n) = k₁n + k₂."
            }
          ]}
        />
      </section>

      {/* 1. Time Complexity of Partitioning */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <GitFork className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            1. Time Complexity of the Partition Procedure
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Before calculating the overall time complexity of QuickSort, we must analyze the cost of a single <code className="font-mono text-purple-600 dark:text-purple-400">partition(A, low, high)</code> call on a subarray of size <code className="font-mono">n</code>.
        </p>

        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-3 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            During partitioning, pointer <code className="font-mono text-blue-600 dark:text-blue-400 font-bold">i</code> moves rightward comparing elements against the pivot (<code className="font-mono">A[i] &le; pivot</code>), while pointer <code className="font-mono text-amber-600 dark:text-amber-400 font-bold">j</code> moves leftward (<code className="font-mono">A[j] &gt; pivot</code>).
          </p>
          <p>
            The two pointers move toward each other until they cross. Each element in the subarray is compared to the pivot a constant number of times. Therefore, the total number of comparisons is a <strong>linear function of n</strong>:
          </p>
          <div className="p-3 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-center font-bold text-purple-700 dark:text-purple-300 text-sm">
            T<sub>partition</sub>(n) = k₁·n + k₂ = O(n)
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[11px]">
            Where <code className="font-mono">k₁</code> and <code className="font-mono">k₂</code> are constants representing the time per comparison and variable overhead.
          </p>
        </div>
      </section>

      {/* 2. Worst-Case Analysis */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <TrendingDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            2. Worst-Case Analysis: O(n²)
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The worst-case scenario occurs when the array is <strong>already sorted</strong> (or reverse-sorted) and we always pick the first element (<code className="font-mono">A[low]</code>) as our pivot.
        </p>

        <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
          <h3 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider">
            Step-by-Step Degradation on Sorted Array [1, 2, 4, 8, 12]:
          </h3>
          <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
            <li>
              <strong>Pass 1 (n = 5):</strong> Pivot = 1. After partitioning, 1 stays at index 0. Split: Empty left subarray (0 elements) and right subarray of size 4 (<code className="font-mono">[2, 4, 8, 12]</code>). Work = <code className="font-mono">k₁·(5)</code>.
            </li>
            <li>
              <strong>Pass 2 (n = 4):</strong> Pivot = 2. After partitioning, 2 stays at index 0. Split: Empty left subarray and right subarray of size 3 (<code className="font-mono">[4, 8, 12]</code>). Work = <code className="font-mono">k₁·(4)</code>.
            </li>
            <li>
              <strong>Pass 3 (n = 3):</strong> Pivot = 4. Split: Empty left subarray and right subarray of size 2 (<code className="font-mono">[8, 12]</code>). Work = <code className="font-mono">k₁·(3)</code>.
            </li>
            <li>
              <strong>Pass 4 (n = 2):</strong> Pivot = 8. Split: Empty left subarray and single element 12 (Base Case). Work = <code className="font-mono">k₁·(2)</code>.
            </li>
          </ul>
        </div>

        {/* Mathematical Proof */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Mathematical Derivation of Worst-Case Time:
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            For an array of size <code className="font-mono">n</code>, we must perform <code className="font-mono">n - 1</code> partition passes. The total time <code className="font-mono">T(n)</code> is the sum of arithmetic progression:
          </p>
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl font-mono text-xs text-gray-800 dark:text-gray-200 space-y-1.5 overflow-x-auto">
            <p>T(n) = (k₁·n + k₂) + (k₁·(n - 1) + k₂) + ... + (k₁·2 + k₂)</p>
            <p>T(n) = k₁ [ n + (n - 1) + (n - 2) + ... + 2 ] + (n - 1)·k₂</p>
            <p>T(n) = k₁ [ n(n + 1)/2 - 1 ] + (n - 1)·k₂</p>
            <p className="text-rose-600 dark:text-rose-400 font-bold pt-1">
              T(n) = O(n²)
            </p>
          </div>
        </div>

        <Callout type="warning" title="Crucial Takeaway on Worst Case">
          Unlike Bubble Sort (which is naturally adaptive and takes <code className="font-mono">O(n)</code> on sorted data), standard QuickSort with first-element pivot selection degenerates to its <strong>absolute slowest runtime <code className="font-mono">O(n²)</code></strong> on already sorted data!
        </Callout>
      </section>

      {/* 3. Best-Case Analysis */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            3. Best-Case Analysis: O(n log n)
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The best-case scenario occurs when every partition happens to land right in the exact median of the subarray, dividing the problem into two equal sub-arrays of size approximately <code className="font-mono">n/2</code>.
        </p>

        <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
          <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
            Why Subarrays Exclude the Pivot (-1 Element)
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            When an array of size <code className="font-mono">16</code> is partitioned in the best case, it splits into sub-arrays of size <code className="font-mono">8</code> and <code className="font-mono">7</code> (total = 15). The 16th element is the <strong>Pivot</strong>, which is permanently placed in its correct position and excluded from subsequent recursion levels!
          </p>
        </div>

        {/* Tree Height Derivation */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Derivation of Tree Height (h) &amp; Total Work:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-1">
              <span className="font-bold text-gray-800 dark:text-gray-200">1. Height of Balanced Tree (h):</span>
              <p className="text-gray-600 dark:text-gray-400">
                Each division divides the problem size by 2 (<code className="font-mono">n &rarr; n/2 &rarr; n/4 &rarr; ... &rarr; 1</code>). The number of levels until size reaches 1 is:
              </p>
              <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                h = log₂ n
              </p>
              <p className="text-[11px] text-gray-500">
                (e.g., n = 16 &rarr; log₂ 16 = 4 levels; n = 8 &rarr; log₂ 8 = 3 levels)
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-1">
              <span className="font-bold text-gray-800 dark:text-gray-200">2. Work Done at Each Level:</span>
              <p className="text-gray-600 dark:text-gray-400">
                At level <code className="font-mono">k</code>, there are <code className="font-mono">2^k</code> subproblems each of size <code className="font-mono">n / 2^k</code>:
              </p>
              <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Work = 2^k &times; (k₁ &middot; n / 2^k) = k₁ &middot; n
              </p>
              <p className="text-[11px] text-gray-500">
                The total work across all sub-arrays at any single level is always exactly <code className="font-mono">O(n)</code>!
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/40 font-mono text-xs text-emerald-900 dark:text-emerald-200">
            Total Time T(n) = (Height of Tree) &times; (Work per Level) = (log₂ n) &times; (k₁·n) = <strong>O(n log n)</strong>
          </div>
        </div>
      </section>

      {/* Interactive Visualizer for Worst vs Best */}
      <section className="mb-12 space-y-6">
        <QuickSortWorstVsBestVisualizer />
      </section>

      {/* 4. Average-Case Analysis */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            4. Average-Case Analysis: O(n log n)
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          In practice, partition splits will rarely be perfectly 50/50, but they will also rarely be degenerate 100/0 splits.
        </p>

        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 text-xs text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
          <p>
            Even if the partition consistently produces an unbalanced <strong>9-to-1 split</strong> (i.e. one subproblem of size <code className="font-mono">n/10</code> and another of size <code className="font-mono">9n/10</code>), the tree depth grows with base <code className="font-mono">log_{'{10/9}'}(n)</code>, which is still proportional to <code className="font-mono">O(log n)</code>!
          </p>
          <p>
            Averaged over all possible permutations of input data, QuickSort runs in <strong className="text-purple-600 dark:text-purple-400">O(n log n)</strong> time with very small constant factors, making it one of the fastest general-purpose comparison sorts in practice.
          </p>
        </div>
      </section>

      {/* 5. Stability Analysis (Unstable) */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            5. Stability Analysis: Why QuickSort is Unstable
          </h2>
        </div>

        <Definition term="Sorting Stability">
          A sorting algorithm is stable if two elements with equal keys appear in the same relative order in the output as they did in the input.
        </Definition>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          QuickSort is <strong>NOT Stable</strong>. Because the partition procedure performs long-range swaps between pointers <code className="font-mono">i</code> and <code className="font-mono">j</code>, and later swaps the pivot <code className="font-mono">A[low]</code> with <code className="font-mono">A[j]</code>, duplicate elements can jump past each other.
        </p>

        {/* Stability Interactive Proof Visualizer */}
        <QuickSortStabilityProofVisualizer />
      </section>

      {/* 6. Space Complexity: In-Place Classification */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <HardDrive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            6. Space Complexity &amp; In-Place Classification
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              In-Place Sorting Algorithm
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              QuickSort is an <strong>in-place sorting algorithm</strong> because it does not allocate auxiliary arrays (like Merge Sort). All swaps occur directly within the existing memory array. Auxiliary data space is <code className="font-mono font-bold">O(1)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              Call Stack Memory
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Recursion requires stack space proportional to the depth of the recursion tree:
              <br />
              &bull; <strong>Best/Average Case:</strong> <code className="font-mono">O(log n)</code> stack frames.
              <br />
              &bull; <strong>Worst Case:</strong> <code className="font-mono">O(n)</code> stack frames.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Pivot Selection Strategies & Randomized QuickSort */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Dice5 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            7. Pivot Strategies &amp; Randomized QuickSort
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Choosing the right pivot element is the most effective defense against the <code className="font-mono">O(n²)</code> worst case.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-1">
            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">1. First Element (A[low])</span>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">
              Simplest to code. Suffers <code className="font-mono text-rose-600">O(n²)</code> on sorted or reverse-sorted data.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-1">
            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">2. Last Element (A[high])</span>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">
              Mirror of first element strategy; also suffers <code className="font-mono text-rose-600">O(n²)</code> on sorted data.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-1">
            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">3. Median-of-Three</span>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">
              Picks the median of <code className="font-mono">A[low], A[mid], A[high]</code>. Avoids worst-case on sorted data.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/30 space-y-1">
            <span className="text-xs font-bold text-purple-900 dark:text-purple-300">4. Randomized QuickSort</span>
            <p className="text-[11px] text-purple-950/70 dark:text-purple-300/70">
              Picks a random index between <code className="font-mono">low</code> and <code className="font-mono">high</code>, swaps with <code className="font-mono">A[low]</code>, then partitions. Guarantees <code className="font-mono">O(n log n)</code> expected time on any input!
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Single partition pass runs in linear time T_partition(n) = k₁n + k₂ = O(n).',
            'Worst-case complexity is O(n²), occurring when the array is already sorted and low is picked as pivot (n - 1 levels of recursion).',
            'Best-case complexity is O(n log n), occurring when pivot splits array into two equal halves (log₂ n levels, O(n) work per level).',
            'Average-case complexity is O(n log n) across random data distributions.',
            'QuickSort is an in-place sorting algorithm (O(1) auxiliary data memory), with O(log n) call stack space.',
            'QuickSort is UNSTABLE because pointer and pivot swaps invert the relative position of duplicate keys.',
            'Randomized QuickSort picks random pivots to guarantee O(n log n) expected time and prevent worst-case degradation.'
          ]} 
        />
      </section>

    </div>
  );
}
