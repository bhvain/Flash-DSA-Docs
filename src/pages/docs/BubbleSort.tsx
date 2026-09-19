import { 
  ArrowUpCircle, 
  ArrowRightLeft, 
  CheckCircle, 
  Clock,
  TrendingUp,
  LayoutList
} from 'lucide-react';
import { Callout, Summary, Definition } from '@/components/DocBlocks';
import BubbleSortVisualizer from '@/components/BubbleSortVisualizer';


export default function BubbleSortPage() {
  return (
    <div id="bubble-sort-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Bubble Sort Algorithm
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Bubble Sort is one of the simplest sorting techniques. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. 
        </p>
      </div>

      {/* Why is it called Bubble Sort? */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowUpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Why is it called "Bubble" Sort?
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Think of a stone thrown into water—it sinks to the bottom because it is heavy. Conversely, if you release a hydrogen balloon underwater or in the air, it floats up because it is lighter. 
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          In Bubble Sort, the <strong>heaviest (largest) elements sink to the end</strong> of the array in every pass, while the relatively <strong>lighter (smaller) elements "bubble up"</strong> towards the beginning.
        </p>
      </section>

      {/* Core Concept: Passes and Swapping */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowRightLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Core Concept: Passes and Swapping
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The algorithm guarantees that after the <strong>1st pass</strong>, the largest element will be placed at the very end of the array (its correct, sorted position). After the <strong>2nd pass</strong>, the second-largest element takes its place just before the largest, and so on.
        </p>

        <Definition term="Pass">
          A single full traversal through the unsorted portion of the array, comparing adjacent elements from index 0 up to the last unsorted element.
        </Definition>

        <BubbleSortVisualizer />

        <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-4 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Step-by-Step Example</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Suppose we have the array: <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-900 dark:text-gray-100">[7, 9, 2, 11, 17, 4]</code></p>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <strong className="text-xs text-gray-900 dark:text-gray-100 block mb-1">Pass 1:</strong>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Compare 7 and 9. (No swap, 7 &lt; 9)</li>
                <li>Compare 9 and 2. (Swap, 9 &gt; 2) &rarr; <code className="font-mono text-[10px]">[7, 2, 9, 11, 17, 4]</code></li>
                <li>Compare 9 and 11. (No swap)</li>
                <li>Compare 11 and 17. (No swap)</li>
                <li>Compare 17 and 4. (Swap, 17 &gt; 4) &rarr; <code className="font-mono text-[10px]">[7, 2, 9, 11, 4, 17]</code></li>
              </ul>
              <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Result: 17 is sorted at the end. We no longer need to compare the last element in Pass 2.
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <strong className="text-xs text-gray-900 dark:text-gray-100 block mb-1">Subsequent Passes:</strong>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                In Pass 2, we repeat this for the remaining elements, bubbling <code className="font-mono text-gray-800 dark:text-gray-200">11</code> to its spot. Pass 3 bubbles <code className="font-mono text-gray-800 dark:text-gray-200">9</code>, Pass 4 bubbles <code className="font-mono text-gray-800 dark:text-gray-200">7</code>, and Pass 5 bubbles <code className="font-mono text-gray-800 dark:text-gray-200">4</code>. The final remaining element <code className="font-mono text-gray-800 dark:text-gray-200">2</code> is automatically in its correct position.
              </p>
            </div>
          </div>
        </div>

        <Callout type="warning" title="Total Number of Passes">
          If an array has <strong>n</strong> elements, it takes exactly <strong>n - 1</strong> passes to completely sort it. Once n - 1 elements are placed in their correct positions, the single remaining element must inherently be at its correct position.
        </Callout>
      </section>

      {/* Analysis Criteria for Bubble Sort */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <LayoutList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Analysis of Bubble Sort
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600" />
              Time Complexity: O(n²)
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              In the 1st pass we do (n-1) comparisons. In the 2nd pass we do (n-2) comparisons. 
              The total comparisons equal <code className="font-mono">1 + 2 + 3 + ... + (n-1)</code>, which mathematically resolves to <code className="font-mono">n(n-1)/2</code>. Hence, the worst-case time complexity is <strong>O(n²)</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              Stability: Yes
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Bubble Sort is a <strong>Stable</strong> algorithm. If two elements have the same value, they will not swap past each other, retaining their original relative order from the input array.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-rose-600" />
              Adaptive: Can be made Adaptive
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              By default, it is not adaptive. However, we can introduce a flag. If a pass completes without making a single swap, we immediately know the array is sorted. This optimization drops the Best Case Time Complexity to <strong>O(n)</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <ArrowRightLeft className="h-4 w-4 text-purple-600" />
              Recursive: No (Iterative)
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Bubble sort uses standard iterative loops (nested for/while loops) rather than function self-calls, making it a <strong>Non-Recursive</strong> algorithm. It is also an <strong>In-Place</strong> sorting algorithm with an O(1) space complexity.
            </p>
          </div>

        </div>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Bubble Sort pushes the largest elements to the end of the array in each pass, like a heavy stone sinking.',
            'For an array of size n, it strictly requires (n - 1) passes to sort fully.',
            'The time complexity is O(n²) because the total comparisons are n(n-1)/2.',
            'It is Stable and In-Place (O(1) space complexity).',
            'While not adaptive natively, adding a "swap check" flag allows it to achieve O(n) best-case time complexity.'
          ]} 
        />
      </section>

    </div>
  );
}
