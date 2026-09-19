import { 
  Clock, 
  HardDrive, 
  ArrowDownUp, 
  Database,
  Zap,
  Network
} from 'lucide-react';
import { Callout, Summary, Definition } from '@/components/DocBlocks';
import StabilityVisualizer from '@/components/StabilityVisualizer';


export default function SortingAnalysisCriteriaPage() {
  return (
    <div id="sorting-analysis-criteria" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Analysis Criteria for Sorting Algorithms
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Before diving into specific sorting algorithms like Bubble Sort, Merge Sort, or Quick Sort, we must establish a framework for comparing them. There is no single "best" algorithm; instead, we analyze them based on six key criteria to determine the right tool for a specific problem.
        </p>
      </div>

      {/* 1. Time Complexity */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            1. Time Complexity
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Time complexity measures how the runtime of an algorithm scales as the size of the input dataset grows. If an algorithm performs well with 10 elements but struggles heavily with 1,000 elements, its time complexity is poor.
        </p>

        <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 text-sm text-blue-800 dark:text-blue-200">
          When comparing algorithms, an algorithm with <code className="font-mono font-bold bg-white dark:bg-gray-900 px-1.5 py-0.5 rounded">O(n log n)</code> time complexity is vastly superior to one with <code className="font-mono font-bold bg-white dark:bg-gray-900 px-1.5 py-0.5 rounded">O(n²)</code> complexity for large inputs.
        </div>
      </section>

      {/* 2. Space Complexity & In-Place Sorting */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <HardDrive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            2. Space Complexity & In-Place Sorting
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Space complexity refers to the amount of <strong>extra memory</strong> an algorithm requires to execute. Ideally, the memory usage should not grow proportionally with the input size.
        </p>

        <Definition term="In-Place Sorting Algorithm">
          An algorithm that uses a constant amount of extra memory (O(1)), regardless of the input size. It sorts the array by rearranging and swapping elements directly within the original array without creating auxiliary arrays.
        </Definition>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          For example, if you are given an array of size 9 or 9,000, an in-place algorithm will still only require a tiny, constant amount of additional memory (e.g., a single temporary variable for swapping).
        </p>
      </section>

      {/* 3. Stability */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowDownUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            3. Stability
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Stability is a critical concept when sorting complex objects or records.
        </p>

        <Definition term="Stable Sorting Algorithm">
          A sorting algorithm is considered <strong>stable</strong> if it preserves the relative order of identical elements from the input array in the sorted output array.
        </Definition>

        <Callout type="info" title="Bhavin's VIP Store Example">
          Imagine a store where customers are prioritized by a "VIP Rank" (Rank 1 being the highest priority).<br/><br/>
          <strong>Arrival Order:</strong> Abhishek (Rank 1), Elvish (Rank 1), Faizaan (Rank 2), Bakshi (Rank 3).<br/><br/>
          If we sort these customers solely by their Rank, both Abhishek and Elvish share Rank 1. 
          A <strong>stable</strong> algorithm guarantees that Abhishek will still appear <em>before</em> Elvish in the final sorted line, because Abhishek arrived first in the original input. An unstable algorithm might swap them.
        </Callout>

        <StabilityVisualizer />
      </section>

      {/* 4. Internal vs External */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Database className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            4. Internal vs. External Sorting
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              Internal Sorting
            </strong>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All the data being sorted is small enough to be completely loaded into the system's main memory (RAM). The algorithm operates entirely within memory.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              External Sorting
            </strong>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The dataset is too massive to fit into RAM all at once. The algorithm must read and write data in chunks from slower external storage (like a Hard Drive or Database) iteratively.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Adaptability */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Zap className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            5. Adaptive Sorting
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          In real-world scenarios, data is often partially sorted. An <strong>Adaptive</strong> sorting algorithm is one that takes advantage of existing order in its input. If you pass an already sorted (or nearly sorted) array to an adaptive algorithm, it will recognize this and complete its execution significantly faster than its worst-case time complexity.
        </p>
      </section>

      {/* 6. Recursive vs Non-Recursive */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Network className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            6. Recursive vs. Non-Recursive
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          This criteria simply describes the underlying programming approach used to implement the algorithm:
        </p>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li><strong>Recursive:</strong> The algorithm calls itself repeatedly on smaller sub-problems (e.g., Merge Sort, Quick Sort).</li>
          <li><strong>Non-Recursive (Iterative):</strong> The algorithm relies purely on loops (like <code className="font-mono text-xs">for</code> or <code className="font-mono text-xs">while</code>) without self-referential function calls.</li>
        </ul>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Time Complexity evaluates the algorithm\'s speed as the dataset grows.',
            'In-Place algorithms operate with O(1) space complexity by swapping elements directly, rather than allocating new arrays.',
            'Stable algorithms maintain the original relative order of identical elements—crucial for multi-key sorting (Bhavin\'s VIP Example).',
            'Internal sorting happens purely in RAM, while External sorting manages data loaded sequentially from disk.',
            'Adaptive algorithms perform faster when the input data is already partially sorted.',
            'Algorithms can be implemented using either iterative loops (Non-Recursive) or function self-calls (Recursive).'
          ]} 
        />
      </section>

    </div>
  );
}
