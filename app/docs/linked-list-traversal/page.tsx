import { ArrowLeft, ArrowRight, Code2, Link2, MonitorPlay, Zap, AlignLeft } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { LinkedListTraversalLab } from '@/components/LinkedListTraversalLab';

export default function LinkedListTraversalPage() {
  const creationCode = `#include <stdio.h>
#include <stdlib.h>

// Self-referential structure
struct Node {
    int data;
    struct Node* next; // Pointer to the next node
};

int main() {
    // 1. Declare node pointers
    struct Node* head;
    struct Node* second;
    struct Node* third;
    struct Node* fourth;

    // 2. Allocate memory dynamically in the Heap
    head = (struct Node*)malloc(sizeof(struct Node));
    second = (struct Node*)malloc(sizeof(struct Node));
    third = (struct Node*)malloc(sizeof(struct Node));
    fourth = (struct Node*)malloc(sizeof(struct Node));

    // 3. Link first and second nodes
    head->data = 7;
    head->next = second;

    // 4. Link second and third nodes
    second->data = 11;
    second->next = third;

    // 5. Link third and fourth nodes
    third->data = 41;
    third->next = fourth;

    // 6. Terminate the list at the fourth node
    fourth->data = 66;
    fourth->next = NULL; // Explicitly mark the end

    return 0;
}`;

  const traversalCode = `void linkedlistTraversal(struct Node* ptr) {
    // Traverse until the pointer hits NULL
    while (ptr != NULL) {
        printf("Element: %d \\n", ptr->data);
        
        // Move the pointer to the next node
        ptr = ptr->next; 
    }
}`;

  return (
    <div id="linked-list-traversal-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
          <Code2 className="h-4 w-4" />
          Data Structures &bull; C Implementation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Creation &amp; Traversal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Learn how to instantiate a Linked List in C by allocating dynamic memory in the Heap, linking nodes together, and traversing the sequence sequentially until <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">NULL</code> is reached.
        </p>
      </div>

      {/* Traversal Concept */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <Link2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Creating Nodes
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Creating a node involves asking the OS for Heap memory using <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">malloc</code>. We typecast the returned void pointer into our <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">struct Node*</code>.
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
            <li>We construct individual nodes first.</li>
            <li>We populate the <code className="font-mono text-xs">data</code> payload using the arrow operator <code className="font-mono text-xs">-&gt;</code>.</li>
            <li>We link the <code className="font-mono text-xs">next</code> pointer to the subsequent node.</li>
          </ul>
        </div>

        <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
            <AlignLeft className="h-5 w-5 text-amber-500" />
            Traversing the Chain
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Since nodes are not contiguous, we can't use an array index to iterate. Instead, we use a temporary pointer <code className="font-mono text-xs bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded border border-amber-200 dark:border-amber-700/50">ptr</code> starting at the <code className="font-mono text-xs">head</code>.
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
            <li>We print the data: <code className="font-mono text-xs">ptr-&gt;data</code>.</li>
            <li>We leap to the next node: <code className="font-mono text-xs text-amber-700 dark:text-amber-400 font-bold">ptr = ptr-&gt;next</code>.</li>
            <li>We stop when <code className="font-mono text-xs">ptr == NULL</code>.</li>
            <li>Time Complexity is <code className="font-mono text-xs font-bold">O(n)</code>.</li>
          </ul>
        </div>
      </div>

      {/* Simulator */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <MonitorPlay className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          Interactive Traversal Simulator
        </h2>
        <LinkedListTraversalLab />
      </section>

      {/* Code Implementations */}
      <section className="mb-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-gray-600" />
            Creation Code Implementation
          </h2>
          <CodeBlock code={creationCode} language="c" title="linked_list_creation.c" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-amber-500" />
            Traversal Function
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This function acts as a standard way to read or output our dynamic chain. The statement <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-bold">ptr = ptr-&gt;next;</code> is the heartbeat of the loop, instructing the pointer to absorb the address of the subsequent element.
          </p>
          <CodeBlock code={traversalCode} language="c" title="traversal_function.c" />
        </div>
      </section>

      {/* Navigation */}
      </div>
  );
}