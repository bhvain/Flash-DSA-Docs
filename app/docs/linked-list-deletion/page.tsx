import { ArrowLeft, ArrowRight, Code2, Link2, MonitorPlay, Zap, AlignLeft, Trash2 } from 'lucide-react';

import { CodeBlock } from '@/components/CodeBlock';
import { LinkedListDeletionLab } from '@/components/LinkedListDeletionLab';

export const metadata = {
  title: 'Linked List Deletion | Flash DSA Docs',
  description: 'Understand how to delete nodes from a linked list: from the beginning, end, and specific positions.',
};

export default function LinkedListDeletionPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold tracking-wider text-sm uppercase">
          <Trash2 className="h-5 w-5" />
          <span>Data Structures</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-gray-50 mb-4">
          Linked List Deletion
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          In this module, we will explore the operations required to remove a node from a linked list. 
          Unlike arrays, linked lists allow for efficient removal without shifting elements, provided you have the right pointers.
        </p>
      </header>

      {/* Simulator Lab */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
          <MonitorPlay className="h-6 w-6 text-indigo-500" />
          Interactive Deletion Simulator
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Use the simulator below to visualize how pointers are rearranged and memory is freed during different deletion scenarios.
        </p>
        <LinkedListDeletionLab />
      </section>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
          <Zap className="h-6 w-6 text-amber-500" />
          The Four Cases of Deletion
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Similar to insertion, deleting a node from a linked list can be categorized into four distinct cases based on the position of the node to be deleted:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2 flex items-center gap-2">
              <span className="bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 w-6 h-6 rounded flex items-center justify-center text-sm">1</span>
              Deleting the First Node
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Removing the head node. You simply move the head pointer to the second node and free the memory of the original head.
            </p>
            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg">
              Time Complexity: <span className="font-bold text-emerald-600 dark:text-emerald-400">O(1)</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 w-6 h-6 rounded flex items-center justify-center text-sm">2</span>
              Deleting a Node in Between
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Removing a node at a given index. You must traverse to the node just before the target index to adjust pointers.
            </p>
            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg">
              Time Complexity: <span className="font-bold text-amber-600 dark:text-amber-400">O(n)</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 w-6 h-6 rounded flex items-center justify-center text-sm">3</span>
              Deleting the Last Node
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Traverse until the second-to-last node, set its next pointer to NULL, and free the last node.
            </p>
            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg">
              Time Complexity: <span className="font-bold text-amber-600 dark:text-amber-400">O(n)</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 w-6 h-6 rounded flex items-center justify-center text-sm">4</span>
              Deleting Node by Value
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Traverse the list to find the first node that contains the given value, then bypass and free it.
            </p>
            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg">
              Time Complexity: <span className="font-bold text-amber-600 dark:text-amber-400">O(n)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case 1 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
          <span className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-base">1</span>
          Case 1: Deleting the First Node
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Deleting the first node is the simplest operation. Since we already have a pointer to the head of the list, 
          we don't need to traverse the list at all.
        </p>

        <div className="pl-4 border-l-4 border-rose-500 bg-rose-50/50 dark:bg-rose-900/10 p-4 rounded-r-lg">
          <p className="text-sm font-semibold text-rose-900 dark:text-rose-200 mb-2">Crucial Step: Memory Deallocation</p>
          <p className="text-sm text-rose-800 dark:text-rose-300">
            In languages like C and C++, you must explicitly free the memory of the deleted node to prevent memory leaks. 
            Store the current head in a temporary pointer, move the head forward, and then <code>free()</code> the temporary pointer.
          </p>
        </div>

        <CodeBlock
          language="c"
          code={`struct Node * deleteFirst(struct Node * head) {
    struct Node * ptr = head;
    head = head->next;
    free(ptr);
    return head;
}`}
        />
      </section>

      {/* Case 2 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
          <span className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-base">2</span>
          Case 2: Deleting a Node in Between
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          To delete a node at a given index, we need to traverse the list using a pointer <code>p</code> until it points to 
          the node <em>just before</em> the node we want to delete. We then create another pointer <code>q</code> pointing to the node to delete.
        </p>

        <CodeBlock
          language="c"
          code={`struct Node * deleteAtIndex(struct Node * head, int index) {
    struct Node * p = head;
    struct Node * q = head->next;
    
    // Traverse to the node before the target
    for (int i = 0; i < index - 1; i++) {
        p = p->next;
        q = q->next;
    }
    
    // Bypass the node q
    p->next = q->next;
    free(q);
    return head;
}`}
        />
      </section>

      {/* Case 3 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
          <span className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-base">3</span>
          Case 3: Deleting the Last Node
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Similar to deleting at an index, we use two pointers <code>p</code> and <code>q</code>. We traverse the list until 
          <code>q-&gt;next</code> is NULL (meaning <code>q</code> is the last node). Then we set <code>p-&gt;next</code> to NULL and free <code>q</code>.
        </p>

        <CodeBlock
          language="c"
          code={`struct Node * deleteAtLast(struct Node * head) {
    struct Node * p = head;
    struct Node * q = head->next;
    
    // Traverse until q is the last node
    while (q->next != NULL) {
        p = p->next;
        q = q->next;
    }
    
    p->next = NULL;
    free(q);
    return head;
}`}
        />
      </section>

      {/* Case 4 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
          <span className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-base">4</span>
          Case 4: Deleting a Node by Value
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          If we are given a value (key) instead of an index, we traverse the list until we find the first node that contains that value.
          We then bypass the node and free it.
        </p>

        <CodeBlock
          language="c"
          code={`struct Node * deleteByValue(struct Node * head, int value) {
    struct Node * p = head;
    struct Node * q = head->next;
    
    // Traverse until we find the value or reach the end
    while (q->data != value && q->next != NULL) {
        p = p->next;
        q = q->next;
    }
    
    if (q->data == value) {
        p->next = q->next;
        free(q);
    }
    return head;
}`}
        />
      </section>

      {/* Pagination */}

    </div>
  );
}
