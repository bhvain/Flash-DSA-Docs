import { 
  Code2, 
  Settings2,
  Terminal,
  Cpu
} from 'lucide-react';
import { Callout, Summary, Definition } from '@/components/DocBlocks';
import { CodeBlock } from '@/components/CodeBlock';
import AdaptiveBubbleSortVisualizer from '@/components/AdaptiveBubbleSortVisualizer';


export default function BubbleSortCodePage() {
  return (
    <div id="bubble-sort-code" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Bubble Sort Implementation (C)
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Translating the theoretical logic of Bubble Sort into C code is straightforward. We use two nested loops: an outer loop for the passes, and an inner loop for the adjacent element comparisons. We will also look at an optimized "Adaptive" variant.
        </p>
      </div>

      {/* Basic Structure */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Terminal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Standard Bubble Sort
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          The standard implementation requires strictly <code>n - 1</code> passes to sort an array. During each pass, we do comparisons and swap adjacent elements if they are out of order.
        </p>

        <Callout type="info" title="The Comparison Formula: (n - 1 - i)">
          Why do we loop until <code>n - 1 - i</code> in the inner loop?<br/><br/>
          In pass 0 (i=0), we make <code>n-1</code> comparisons.<br/>
          In pass 1 (i=1), the largest element is already at the end, so we make 1 less comparison: <code>n-2</code> comparisons.<br/>
          In pass 2 (i=2), two elements are sorted at the end, so we make <code>n-3</code> comparisons.<br/>
          This simplifies mathematically to exactly: <code>n - 1 - i</code>.
        </Callout>

        <CodeBlock 
          title="bubblesort.c"
          language="c"
          code={`void bubbleSort(int *A, int n) {
    int temp;
    // Outer loop for the number of passes (n-1 passes)
    for (int i = 0; i < n - 1; i++) {
        
        // Inner loop for comparison in each pass
        for (int j = 0; j < n - 1 - i; j++) {
            
            // Check if the current element is greater than the next element
            if (A[j] > A[j + 1]) {
                // Swap them
                temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
            }
        }
    }
}`}
        />
      </section>

      {/* Adaptive Bubble Sort */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Settings2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Adaptive Bubble Sort
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          By default, Bubble Sort is <strong>not adaptive</strong>. It will blindly execute all <code>n - 1</code> passes even if the array is given to it completely sorted. We can optimize it to return early by keeping track of whether any swaps occurred during a pass.
        </p>

        <Definition term="The isSorted Flag">
          A variable that acts as a tripwire. We set <code>isSorted = 1 (true)</code> at the start of a pass. If we ever swap an element, we trip the wire and set <code>isSorted = 0 (false)</code>. If a pass finishes and the wire wasn't tripped, the array is perfectly sorted and we can exit the function instantly!
        </Definition>

        <AdaptiveBubbleSortVisualizer />

        <CodeBlock 
          title="adaptive_bubblesort.c"
          language="c"
          code={`void bubbleSortAdaptive(int *A, int n) {
    int temp;
    int isSorted;
    
    for (int i = 0; i < n - 1; i++) {
        printf("Working on pass number %d\\n", i + 1);
        isSorted = 1; // Assume it's sorted at the start of the pass
        
        for (int j = 0; j < n - 1 - i; j++) {
            if (A[j] > A[j + 1]) {
                // Swap needed!
                temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
                
                // Trip the wire - it wasn't perfectly sorted
                isSorted = 0; 
            }
        }
        
        // If no swaps occurred in this entire pass, array is fully sorted!
        if (isSorted) {
            return;
        }
    }
}`}
        />
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'The outer loop manages the passes (running exactly n - 1 times).',
            'The inner loop manages adjacent comparisons, running (n - 1 - i) times per pass.',
            'Standard Bubble Sort takes O(n²) time regardless of the input array\'s initial state.',
            'Adaptive Bubble Sort introduces an isSorted flag to break out early.',
            'With the adaptive flag, sorting an already-sorted array takes only 1 pass, achieving O(n) best-case time complexity.'
          ]} 
        />
      </section>

    </div>
  );
}
