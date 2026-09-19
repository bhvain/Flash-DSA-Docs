import { 
  Users, 
  ArrowRightLeft, 
  CheckCircle, 
  Clock,
  TrendingUp,
  LayoutList,
  Info
} from 'lucide-react';
import { Callout, Summary, Definition } from '@/components/DocBlocks';
import InsertionSortVisualizer from '@/components/InsertionSortVisualizer';
import LalitaStoryVisualizer from '@/components/LalitaStoryVisualizer';


export default function InsertionSortPage() {
  return (
    <div id="insertion-sort-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Insertion Sort Algorithm
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Insertion sort is an intuitive sorting algorithm that builds the final sorted array one item at a time. It works exactly how you might sort a hand of playing cards, or how you would naturally insert a new person into a sorted line.
        </p>
      </div>

      {/* Intuitive Example */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The School Assembly Line Analogy
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Imagine a school assembly line. A group of students is already standing in a line, sorted by how much pocket money they have (in increasing order). 
        </p>

        <Callout type="info" title="Lalita Joins the Line">
          Now, Lalita wants to join the line. She has <strong>₹8,000</strong>. 
          <br /><br />
          If she had ₹18,000, she could just stand at the very back without disturbing anyone. But because she has ₹8,000, she needs to find her exact spot in the middle of the already-sorted line.
          <br /><br />
          <strong>The Procedure:</strong><br/>
          Lalita goes to the person at the very back of the line and asks, <em>"How much money do you have?"</em> 
          <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
            <li>He has ₹12,000. Since he has more, she asks him to step back one spot.</li>
            <li>She asks the next person. She has ₹10,000. She also steps back.</li>
            <li>She asks the next person. He has ₹9,000. He steps back.</li>
            <li>She asks the next person. He has ₹6,000. Since ₹6,000 is less than ₹8,000, Lalita knows she belongs directly behind him!</li>
          </ul>
        </Callout>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Lalita successfully inserted herself into the sorted array. The array was sorted before she arrived, and it remained sorted after she found her place. This is the core mechanic of <strong>Insertion Sort</strong>.
        </p>

        <LalitaStoryVisualizer />
      </section>

      {/* Core Concept: The Boundary Line */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowRightLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Core Concept: The Sorted Boundary
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          In a computer program, we don't just insert one element into a sorted array. We start with a completely unsorted array and sort it entirely. To do this, we draw an imaginary <strong>boundary line</strong>.
        </p>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li><strong>Left Side (Sorted):</strong> Initially, we just assume the very first element (Index 0) is a sorted array of size 1.</li>
          <li><strong>Right Side (Unsorted):</strong> All remaining elements.</li>
          <li><strong>The Loop:</strong> We pick the first element from the unsorted side and insert it into its correct position on the sorted side. The boundary line moves one step to the right. We repeat this until the unsorted side is empty.</li>
        </ul>

        <InsertionSortVisualizer />
        
      </section>

      {/* Analysis Criteria */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <LayoutList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Analysis of Insertion Sort
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600" />
              Time Complexity: O(n²)
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              In the worst case (e.g., an array sorted in reverse order), every new element must be compared to all previously sorted elements. The total comparisons equal <code className="font-mono">1 + 2 + 3 + ... + (n-1)</code>, resulting in a worst-case time complexity of <strong>O(n²)</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-rose-600" />
              Adaptive: Yes (By Nature)
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Unlike Bubble Sort, which required a manual flag to become adaptive, Insertion Sort is adaptive <em>by design</em>. If the array is already sorted, the inner loop immediately breaks after 1 comparison per element. The best-case time complexity is <strong>O(n)</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              Stability: Yes
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Insertion Sort is a <strong>Stable</strong> algorithm. When inserting an element, if it encounters an element with the exact same value, it will safely park itself behind it, maintaining the original relative order.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <Info className="h-4 w-4 text-purple-600" />
              Intermediate Results
            </strong>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              In Bubble Sort, the intermediate results are useful (the absolute largest elements are locked at the end). In Insertion Sort, the intermediate result is <strong>not globally useful</strong>. It only guarantees that the first <em>k</em> elements are sorted relative to each other, not in their final global positions.
            </p>
          </div>

        </div>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Insertion Sort works by dividing the array into a "Sorted" left section and an "Unsorted" right section.',
            'Elements are picked from the unsorted section and shifted into their correct position in the sorted section (like placing a card in your hand).',
            'It strictly requires (n - 1) passes to sort an array.',
            'It is Adaptive by nature. An already-sorted array triggers the O(n) best-case execution instantly without needing extra code.',
            'The intermediate array states are not globally useful because newly inserted elements can still shift older elements around.'
          ]} 
        />
      </section>

    </div>
  );
}
