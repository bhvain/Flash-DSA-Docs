import { 
  Crosshair, 
  ArrowRightLeft, 
  CheckCircle, 
  Clock,
  TrendingUp,
  LayoutList,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { Callout, Summary, Definition } from '@/components/DocBlocks';
import SelectionSortVisualizer from '@/components/SelectionSortVisualizer';


export default function SelectionSortPage() {
  return (
    <div id="selection-sort-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Selection Sort Algorithm
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Selection sort is a highly intuitive and straightforward sorting algorithm. Its name comes directly from its basic philosophy: it repeatedly <strong>selects</strong> the minimum element from the unsorted portion of the array and places it in its correct sorted position.
        </p>
      </div>

      {/* Intuitive Example */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Crosshair className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The Basic Philosophy
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Imagine a boundary line (or a "stick") that separates your array into two parts: a <strong>sorted left side</strong> and an <strong>unsorted right side</strong>. 
        </p>

        <Callout type="info" title="The Selection Process">
          <ul className="list-disc list-inside space-y-2">
            <li>Initially, the entire array is on the right (unsorted) side of the stick.</li>
            <li>You scan through all the unsorted elements to find the absolute minimum value.</li>
            <li>Once you find the minimum element, you swap it with the very first element of the unsorted section.</li>
            <li>The stick moves one step to the right, because that minimum element is now safely sorted!</li>
            <li>Repeat this process until the stick reaches the end of the array.</li>
          </ul>
        </Callout>

      </section>

      {/* Visualizer Section */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowRightLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Interactive Visualization
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Let's trace how Selection Sort works on the array <code>[8, 0, 7, 1, 3]</code>. Watch how it finds the minimum in each pass before making exactly one swap.
        </p>

        <SelectionSortVisualizer />
        
      </section>

      {/* Analysis Criteria */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <LayoutList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Analysis of Selection Sort
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600" />
              Time Complexity: O(n²)
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              To find the minimum, it must compare every element. In the first pass, it does <code>n-1</code> comparisons. In the second, <code>n-2</code>, and so on. Total comparisons: <code>1 + 2 + ... + (n-1) = n(n-1)/2</code>. This results in an <strong>O(n²)</strong> time complexity in all cases.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              Minimum Swaps: O(n)
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              This is Selection Sort's superpower! It makes at most <strong>n-1 swaps</strong>. It never does useless swaps; it only swaps when an element is taking its final position. This makes it useful when memory writing operations are costly.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-rose-600" />
              Adaptive: No
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Even if the array is already perfectly sorted, Selection Sort is oblivious. It will still scan the entire remaining array every pass just to verify that the first element is indeed the minimum. It cannot take advantage of existing order.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Stability: No
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Selection Sort is <strong>Not Stable</strong>. Swapping elements across long distances can disrupt the relative order of duplicate elements.
            </p>
          </div>

        </div>

        {/* Visual Proof of Instability */}
        <div className="mt-4 p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
          <h4 className="text-sm font-bold text-red-900 dark:text-red-400 mb-4 flex items-center gap-2">
             Visual Proof: Why it is Unstable
          </h4>
          <p className="text-xs text-red-800 dark:text-red-300 mb-4">
             Consider an array with duplicate 8s: <code>[8(black), 8(green), 7, 1]</code>. 
             In the first pass, the minimum is <code>1</code>. The algorithm swaps <code>1</code> with the first element (<code>8(black)</code>).
          </p>
          
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-fit flex items-center gap-4 mx-auto w-max">
              <div className="flex gap-1">
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-800 text-gray-800 font-bold bg-white text-xs">8</div>
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-emerald-600 text-emerald-600 font-bold bg-white text-xs">8</div>
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-300 text-gray-600 font-bold bg-gray-100 text-xs">7</div>
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-300 text-gray-600 font-bold bg-gray-100 text-xs">1</div>
              </div>

              <div className="text-gray-400 text-sm font-bold">→</div>

              <div className="flex gap-1">
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-300 text-gray-600 font-bold bg-gray-100 text-xs">1</div>
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-emerald-600 text-emerald-600 font-bold bg-white text-xs">8</div>
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-300 text-gray-600 font-bold bg-gray-100 text-xs">7</div>
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-gray-800 text-gray-800 font-bold bg-white text-xs">8</div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-red-800 dark:text-red-300 mt-4 text-center">
             The original relative order was <strong>(Black 8, then Green 8)</strong>.<br/> 
             After just one swap, the order is now <strong>(Green 8, then Black 8)</strong>. Order was destroyed!
          </p>
        </div>

      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Selection Sort finds the minimum element and places it at the beginning of the unsorted array.',
            'It takes exactly n-1 passes to sort an array.',
            'It makes O(n²) comparisons, making it inefficient for large arrays.',
            'It makes a maximum of O(n) swaps, which is its primary advantage.',
            'It is neither Adaptive nor Stable.'
          ]} 
        />
      </section>

    </div>
  );
}
