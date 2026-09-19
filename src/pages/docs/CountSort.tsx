import { 
  Calculator, 
  Layers, 
  ArrowLeftRight, 
  Clock, 
  ShieldCheck, 
  HardDrive, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Scale,
  Zap,
  Cpu,
  Info
} from 'lucide-react';
import { Callout, Summary, Definition, AlgorithmSteps, ComplexityTable } from '@/components/DocBlocks';
import CountSortVisualizer from '@/components/CountSortVisualizer';
import CountSortMemoryVisualizer from '@/components/CountSortMemoryVisualizer';

export default function CountSortTheoryPage() {
  return (
    <div id="count-sort-theory-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Non-Comparison Sorting Algorithms
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Count Sort: The Intuitive Linear Time Algorithm
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Count Sort (Counting Sort) is one of the fastest sorting algorithms in computer science. Unlike Bubble Sort, Selection Sort, Merge Sort, or QuickSort, Count Sort <strong>never compares two elements against each other</strong>. Instead, it exploits integer indexing to tally element frequencies in an auxiliary array, achieving an astonishing <strong>linear time complexity of O(m + n)</strong>.
        </p>
      </div>

      {/* The Nursery Metaphor & Non-Comparison Paradigm */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The Philosophy: Why It Feels "Simple Enough for Nursery"
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          In our video lecture, the instructor humorously remarked that <em>"some of you will write in the comments that count sort should be taught in nursery because it is so easy, and it is not their fault!"</em>.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Think about how a 4-year-old child sorts numbered toy blocks from 1 to 9: they don't calculate partitions or execute recursive divide-and-conquer merges. They simply count: <em>"I have two 1s, one 2, one 3, one 4, one 7, and one 9"</em>, and then line them up in that exact order! That direct counting process is the entire mathematical core of Count Sort.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Comparison-Based Sorting
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Algorithms like QuickSort, Merge Sort, and HeapSort sort by asking <code className="font-mono">is A[i] &lt; A[j]?</code>. Mathematically, any comparison sort is bound by a decision-tree lower bound of <strong>&Omega;(n log n)</strong>. You cannot sort faster than <code className="font-mono">n log n</code> with comparisons alone.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Non-Comparison Sorting (Count Sort)
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Count Sort breaks through the <code className="font-mono">n log n</code> barrier by treating element values directly as <strong>array memory addresses (indices)</strong>. Since RAM offers <code className="font-mono">O(1)</code> direct address lookup, it sorts in <strong>O(n)</strong> linear time without a single comparative test!
            </p>
          </div>
        </div>

        <Definition term="Non-Comparison Sorting">
          A class of sorting algorithms (including Counting Sort, Radix Sort, and Bucket Sort) that sort collections without comparing elements pairwise. Instead, they use keys as direct indexes into memory buckets or frequency tables to achieve sub-O(n log n) performance.
        </Definition>
      </section>

      {/* Step-by-Step Algorithm Mechanics */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The 4-Step Count Sort Algorithm
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Suppose we are given an unsorted array <code className="font-mono font-bold text-blue-600 dark:text-blue-400">A</code> of size <code className="font-mono">n = 7</code> from the video lecture:
        </p>

        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 flex items-center justify-center gap-2 font-mono font-bold text-sm">
          <span>A = [</span>
          <span className="px-2 py-1 bg-white dark:bg-gray-950 rounded border">3</span>
          <span className="px-2 py-1 bg-amber-100 dark:bg-amber-950/60 rounded border border-amber-300">1</span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-950/60 rounded border border-purple-300">9</span>
          <span className="px-2 py-1 bg-white dark:bg-gray-950 rounded border">7</span>
          <span className="px-2 py-1 bg-amber-100 dark:bg-amber-950/60 rounded border border-amber-300">1</span>
          <span className="px-2 py-1 bg-white dark:bg-gray-950 rounded border">2</span>
          <span className="px-2 py-1 bg-white dark:bg-gray-950 rounded border">4</span>
          <span>]</span>
        </div>

        <AlgorithmSteps
          steps={[
            {
              title: "Step 1: Identify the Maximum Element (m)",
              description: "Scan through array A linearly to find the largest value, max = 9. This tells us how many distinct index buckets we need."
            },
            {
              title: "Step 2: Allocate & Initialize Auxiliary Count Array",
              description: "Allocate an auxiliary array named 'count' of size (max + 1) = 10, with valid indices from 0 through 9. Initialize all 10 slots to 0: count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]."
            },
            {
              title: "Step 3: Frequency Mapping (Tallying)",
              description: "Iterate pointer i across A[0..n-1]. For each element A[i], increment count[A[i]] by 1. For example, encountering 1 twice updates count[1] to 2. At the end of the pass, count = [0, 2, 1, 1, 1, 0, 0, 1, 0, 1]."
            },
            {
              title: "Step 4: Sorted Reconstruction",
              description: "Traverse count array from index i = 0 to max. While count[i] > 0, write value i into A[j], decrement count[i]--, and advance j++. When count[i] hits 0, advance i++. Array A is now fully sorted!"
            }
          ]}
        />
      </section>

      {/* Interactive Visualizer Component */}
      <section className="mb-12">
        <CountSortVisualizer />
      </section>

      {/* Detailed Walkthrough of the Video Example */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowLeftRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Deep-Dive Walkthrough: The Frequency Array
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          What does the auxiliary <code className="font-mono">count</code> array really represent? It is a <strong>direct histogram of occurrences</strong>. Notice how each index corresponds to a possible integer value in the input:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-gray-200 dark:border-gray-800">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold">Index (Value)</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[0]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">[1]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[2]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[3]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[4]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[5]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[6]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[7]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono">[8]</th>
                <th className="p-2.5 border border-gray-200 dark:border-gray-800 font-extrabold font-mono bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">[9]</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-mono">
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-bold bg-gray-50 dark:bg-gray-950">count[i] (Frequency)</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-400">0</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-black bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">2</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-bold">1</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-bold">1</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-bold">1</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-400">0</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-400">0</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-bold">1</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-400">0</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-black bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">1</td>
              </tr>
              <tr className="text-[11px] text-gray-600 dark:text-gray-400">
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-semibold bg-gray-50 dark:bg-gray-950">Meaning</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">No 0s</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-bold text-amber-700 dark:text-amber-400">Two 1s</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">One 2</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">One 3</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">One 4</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">No 5s</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">No 6s</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">One 7</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800">No 8s</td>
                <td className="p-2.5 border border-gray-200 dark:border-gray-800 font-bold text-purple-700 dark:text-purple-400">One 9</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Because array indices are inherently ordered (0, 1, 2, ..., 9), sequentially unrolling these non-zero counts back into array <code className="font-mono">A</code> automatically produces:
          <br />
          <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-2 inline-block">
            A = [1, 1, 2, 3, 4, 7, 9] (Sorted!)
          </code>
        </p>

        <Callout type="info" title="Zero Extra Array Required for Output">
          Notice that we write the sorted elements directly back into the <strong>original array A</strong>! We do not need a third output array. The only extra memory required is the auxiliary <code className="font-mono">count</code> array of size <code className="font-mono">max + 1</code>.
        </Callout>
      </section>

      {/* The Central Question: Why not abandon all other sorts? */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <HardDrive className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The Space Catch: Why Can't We Use Count Sort For Everything?
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          If Count Sort achieves lightning-fast linear time <code className="font-mono font-bold">O(n)</code>, why don't software engineers delete QuickSort and Merge Sort forever?
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The video lecture answers this directly: <strong>Count Sort trades space for speed</strong>. The auxiliary space requirement is not bounded by the number of elements (<code className="font-mono">n</code>), but rather by the <strong>magnitude of the maximum element (<code className="font-mono">m</code>)</strong>.
        </p>

        {/* Interactive Memory Visualizer */}
        <CountSortMemoryVisualizer />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> When Count Sort is Invincible
            </span>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Sorting human ages (values guaranteed between 0 and 120).</li>
              <li>Sorting student test percentiles (values between 0 and 100).</li>
              <li>Sorting ASCII characters or byte streams (values 0 to 255).</li>
              <li>When <code className="font-mono">m &le; n</code>: Auxiliary memory is microscopic and execution is faster than QuickSort!</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> When Count Sort Fails Disastrously
            </span>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Sorting <code className="font-mono">[3, 5, 2000000000]</code>: You would need an 8 Gigabyte array for just 3 numbers!</li>
              <li>Floating-point numbers (<code className="font-mono">3.14159</code>) cannot be used as direct C array indices.</li>
              <li>Negative numbers (<code className="font-mono">-5</code>) require finding the minimum element and shifting by an offset.</li>
              <li>Unbounded or sparse datasets where <code className="font-mono">m &gt;&gt; n</code>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Complexity Reference Table */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Complexity &amp; Structural Characteristics
          </h2>
        </div>

        <ComplexityTable
          data={[
            {
              case: "Best Case Time",
              complexity: "O(m + n)",
              notes: "Requires traversing A of size n to tally frequencies, and count array of size m to reconstruct."
            },
            {
              case: "Average Case Time",
              complexity: "O(m + n)",
              notes: "Uniformly takes O(m + n) steps regardless of initial ordering (best, average, and worst are identical)."
            },
            {
              case: "Worst Case Time",
              complexity: "O(m + n)",
              notes: "Becomes linear O(n) if m = O(n), but can degrade if m is exponentially larger than n."
            },
            {
              case: "Auxiliary Space",
              complexity: "O(m)",
              notes: "Allocates dynamically: malloc((max + 1) * sizeof(int))."
            },
            {
              case: "In-Place?",
              complexity: "No",
              notes: "Requires an auxiliary count array of size max + 1."
            },
            {
              case: "Stability",
              complexity: "Non-Stable (Simple) / Stable (Prefix Sum)",
              notes: "The simple video version overwrites values directly; the classic prefix-sum variant is stable."
            }
          ]}
        />
      </section>

      {/* Summary Component */}
      <Summary
        title="Key Takeaways: Count Sort"
        points={[
          "Count Sort is a non-comparison sorting algorithm that uses array indices as direct memory buckets for frequencies.",
          "Time complexity is strictly O(m + n), where n is the input array size and m is the maximum element.",
          "When m is in the same ballpark as n (m = O(n)), Count Sort achieves pure linear O(n) performance, shattering the O(n log n) comparison limit.",
          "The main tradeoff is extra auxiliary memory: allocating (max + 1) integers can cause catastrophic memory waste if elements are sparse or huge.",
          "Ideal for dense integer ranges like ages, letter grades, character counts, and fixed-range keys."
        ]}
      />

    </div>
  );
}
