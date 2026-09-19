import { 
  Code2, 
  Settings2,
  Terminal,
  Cpu,
  ArrowDownUp
} from 'lucide-react';
import { Callout, Summary, Definition } from '@/components/DocBlocks';
import { CodeBlock } from '@/components/CodeBlock';
import InsertionSortDryRunVisualizer from '@/components/InsertionSortDryRunVisualizer';


export default function InsertionSortCodePage() {
  return (
    <div id="insertion-sort-code" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Insertion Sort Implementation (C)
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Translating the theoretical logic of Insertion Sort into C code is highly intuitive. We use a <code>for</code> loop to iterate through the unsorted portion (the passes), and an inner <code>while</code> loop to shift the sorted elements out of the way until we find the perfect spot for our <code>key</code>.
        </p>
      </div>

      {/* Basic Structure */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Terminal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The C Code Structure
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The algorithm maintains the sorted boundary automatically via indices. The variable <code>i</code> acts as our boundary. Everything to the left of <code>i</code> is sorted. Everything from <code>i</code> onwards is unsorted.
        </p>

        <CodeBlock 
          title="insertionsort.c"
          language="c"
          code={`void insertionSort(int *A, int n) {
    int key, j;
    
    // Loop for passes, from index 1 to n-1
    for (int i = 1; i <= n - 1; i++) {
        key = A[i];      // The element we want to insert
        j = i - 1;       // Start comparing with the element directly to its left
        
        // Loop to shift elements to the right to make space for the key
        // Condition 1: j >= 0 (Don't go out of bounds past index 0)
        // Condition 2: A[j] > key (If the current element is larger than the key, it must shift)
        while (j >= 0 && A[j] > key) {
            A[j + 1] = A[j]; // Shift element one step ahead
            j--;             // Move to the next element on the left
        }
        
        // We found the correct spot! Place the key.
        A[j + 1] = key;
    }
}`}
        />

        <Callout type="info" title="Why A[j + 1] = key?">
          When the <code>while</code> loop terminates, <code>j</code> points to an element that is <strong>smaller</strong> than our key (or <code>-1</code> if we shifted everything). Because <code>j</code> is pointing to an element smaller than the key, the key must go directly <em>after</em> it. Therefore, we place the key at index <code>j + 1</code>.
        </Callout>

      </section>

      {/* Dry Run Visualizer */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Settings2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Interactive Code Dry Run
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The best way to understand an algorithm is to act like a computer and trace the variables. Let's trace the execution of the code above on the array <code>[12, 54, 65, 7, 23, 9]</code>.
        </p>

        <InsertionSortDryRunVisualizer />

      </section>

      {/* Ascending vs Descending */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <ArrowDownUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Ascending vs Descending Order
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Changing the sort direction in Insertion Sort is incredibly simple. It entirely depends on the comparison inside the <code>while</code> loop.
        </p>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <li><strong>Ascending Order:</strong> <code>while (j &gt;= 0 && A[j] &gt; key)</code><br/><span className="ml-5 text-xs text-gray-500">Shift elements if they are <em>greater</em> than the key.</span></li>
          <li><strong>Descending Order:</strong> <code>while (j &gt;= 0 && A[j] &lt; key)</code><br/><span className="ml-5 text-xs text-gray-500">Shift elements if they are <em>smaller</em> than the key.</span></li>
        </ul>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'The outer loop index i starts at 1 and goes up to n-1. It represents the sorted boundary.',
            'The key variable temporarily holds the value we are trying to insert, preventing it from being overwritten during shifts.',
            'The inner while loop runs backwards (j--) to compare the key against the sorted elements.',
            'The condition j >= 0 prevents the code from checking index -1, which would cause an out-of-bounds error.',
            'Flipping the > operator to < in the while loop changes the sorting from Ascending to Descending.'
          ]} 
        />
      </section>

    </div>
  );
}
