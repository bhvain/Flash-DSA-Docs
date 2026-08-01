import { ArrowLeft, ArrowRight, Code2, CheckCircle2, ShieldAlert, Plus, Zap, Cpu, Terminal, Play, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { InsertionLab } from '@/components/InsertionLab';

export default function ArrayInsertionPage() {
  const fullCodeVideo10 = `#include <stdio.h>

// Traversal Function: Visits and prints each element from index 0 to n - 1
void display(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Index Insertion Function (Preserves Element Order)
int indInsertion(int arr[], int size, int element, int capacity, int index) {
    // 1. Overflow Check: Cannot insert if used size is equal to or exceeds capacity
    if (size >= capacity) {
        return -1; // Return -1 to signal insertion failure
    }

    // 2. Reverse Shifting Loop: Shift elements right starting from the end
    // We move backwards (from size - 1 down to index) so elements aren't overwritten!
    for (int i = size - 1; i >= index; i--) {
        arr[i + 1] = arr[i];
    }

    // 3. Insert target element at specified index
    arr[index] = element;

    // 4. Return 1 to indicate successful insertion
    return 1;
}

int main() {
    int arr[100] = {7, 8, 12, 27, 88}; // Capacity = 100, initialized with 5 elements
    int size = 5, element = 45, index = 3;

    printf("Array BEFORE insertion:\\n");
    display(arr, size);

    // Call insertion function
    int result = indInsertion(arr, size, element, 100, index);

    // Check return value to see if insertion succeeded
    if (result == 1) {
        size += 1; // IMPORTANT: Update size variable in caller function!
        printf("\\nInsertion Successful! Array AFTER insertion:\\n");
        display(arr, size);
    } else {
        printf("\\nInsertion Failed due to Overflow or Invalid Index!\\n");
    }

    return 0;
}`;

  const quizChallengeSolution = `#include <stdio.h>

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int indInsertion(int arr[], int size, int element, int capacity, int index) {
    if (size >= capacity) {
        return -1;
    }
    for (int i = size - 1; i >= index; i--) {
        arr[i + 1] = arr[i];
    }
    arr[index] = element;
    return 1;
}

int main() {
    int arr[5] = {1, 2, 6, 78}; // Capacity = 5, Used Size = 4
    int size = 4, element = 45, capacity = 5, index = 1;

    printf("Original Array (Size = %d):\\n", size);
    display(arr, size);

    // Test 1: First Insertion (Succeeds because size < capacity)
    int result = indInsertion(arr, size, element, capacity, index);
    if (result == 1) {
        size += 1;
        printf("Test 1 Result: Insertion Successful!\\n");
        display(arr, size);
    } else {
        printf("Test 1 Result: Insertion Failed!\\n");
    }

    // Test 2: Second Insertion Attempt (Fails because size 5 >= capacity 5)
    int result2 = indInsertion(arr, size, 99, capacity, 2);
    if (result2 == 1) {
        size += 1;
        printf("Test 2 Result: Insertion Successful!\\n");
        display(arr, size);
    } else {
        printf("\\nTest 2 Result: Insertion Failed! Array is at full capacity (Overflow).\\n");
    }

    return 0;
}`;

  const sortedInsertionCode = `#include <stdio.h>

// Sorted Insertion: Finds position automatically & shifts
int sortedInsertion(int arr[], int size, int element, int capacity) {
    if (size >= capacity) return -1;

    int i = size - 1;
    // Shift elements that are greater than the key to one position ahead
    while (i >= 0 && arr[i] > element) {
        arr[i + 1] = arr[i];
        i--;
    }

    arr[i + 1] = element; // Insert key
    return 1;
}

int main() {
    int arr[100] = {1, 2, 3, 5, 67, 889}; // Sorted array
    int size = 6, capacity = 100, element = 20;

    printf("Sorted Array Before:\\n");
    for(int i=0; i<size; i++) printf("%d ", arr[i]);

    if (sortedInsertion(arr, size, element, capacity) == 1) {
        size++;
        printf("\\nSorted Array After inserting %d:\\n", element);
        for(int i=0; i<size; i++) printf("%d ", arr[i]);
        printf("\\n");
    }
    return 0;
}`;

  return (
    <div id="array-insertion-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
          <Plus className="h-4 w-4" />
          Data Structures &bull; Array Insertion
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Insertion in Array in C
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Detailed analysis of array insertion in C (`10_Insertion.c`), understanding the reverse shifting loop, managing memory bounds (`capacity` vs. `size`), overflow handling, return codes, and solving the Quiz Challenge.
        </p>
      </div>

      {/* Core Insights Box */}
      <div className="mb-10 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Key Takeaways from Array Insertion
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[11px] block mb-1">
              1. Reverse Loop Shifting
            </span>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We shift elements starting from <code className="font-mono">i = size - 1</code> down to <code className="font-mono">index</code>. Starting from the right prevents overwriting adjacent elements!
            </p>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Terminal className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Full Implementation
        </h2>
        <CodeBlock code={fullCodeVideo10} language="c" title="10_insertion.c" />
      </section>

      <section className="mb-10">
        <InsertionLab />
      </section>
    </div>
  );
}