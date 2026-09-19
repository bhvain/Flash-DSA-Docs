import { 
  Code2, 
  Settings2,
  Terminal,
  Cpu
} from 'lucide-react';
import { Callout, Summary } from '@/components/DocBlocks';
import { CodeBlock } from '@/components/CodeBlock';
import SelectionSortDryRunVisualizer from '@/components/SelectionSortDryRunVisualizer';


export default function SelectionSortCodePage() {
  return (
    <div id="selection-sort-code" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Selection Sort Implementation (C)
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Writing the C code for Selection Sort is directly mapped to the theory. We use an outer loop to track the current boundary of the sorted array, and an inner loop to find the minimum element in the remaining unsorted portion. Finally, we perform exactly one swap per pass.
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
          In this implementation, we use an integer variable called <code>indexOfMin</code> to keep track of where the smallest element is located. Once the inner loop finishes scanning, we swap the element at <code>indexOfMin</code> with the element at the boundary <code>i</code>.
        </p>

        <CodeBlock 
          title="selectionsort.c"
          language="c"
          code={`void selectionSort(int *A, int n) {
    int indexOfMin, temp;
    
    // Outer loop for the passes: runs n-1 times
    for (int i = 0; i < n - 1; i++) {
        // Assume the first unsorted element is the minimum
        indexOfMin = i;
        
        // Inner loop: search the rest of the array for a smaller element
        for (int j = i + 1; j < n; j++) {
            if (A[j] < A[indexOfMin]) {
                // Update the index of the minimum element
                indexOfMin = j;
            }
        }
        
        // Swap the found minimum element with the first unsorted element (at index i)
        temp = A[i];
        A[i] = A[indexOfMin];
        A[indexOfMin] = temp;
    }
}`}
        />

        <Callout type="info" title="The Swapping Logic">
          Notice how the swap operation is completely <em>outside</em> the inner <code>j</code> loop. We don't swap elements wildly while searching. We just remember the index (<code>indexOfMin</code>) and perform a single 3-step swap using a <code>temp</code> variable at the very end of the pass.
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
          Let's trace how the variables <code>i</code> and <code>indexOfMin</code> behave during execution using the array <code>[3, 5, 2, 13, 12]</code> demonstrated in the video.
        </p>

        <SelectionSortDryRunVisualizer />

      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'The outer loop index i runs from 0 to n - 2, representing exactly n - 1 passes.',
            'The variable indexOfMin starts at i at the beginning of every pass.',
            'The inner loop j starts at i + 1 and runs to the end of the array to find the true minimum.',
            'A single swap occurs at the end of each pass, exchanging A[i] with A[indexOfMin].',
            'If the element at i is already the minimum, it swaps with itself, resulting in no change.'
          ]} 
        />
      </section>

    </div>
  );
}
