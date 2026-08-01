import { ArrowLeft, ArrowRight, Code2, PlayCircle, Hash } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';


export default function LinkedListInsertionCodePage() {
  const insertAtFirstCode = `struct Node * insertAtFirst(struct Node *head, int data) {
    // 1. Allocate memory for new node
    struct Node * ptr = (struct Node *) malloc(sizeof(struct Node));
    
    // 2. Set the data
    ptr->data = data;
    
    // 3. Point next of new node to current head
    ptr->next = head;
    
    // 4. Return new node as the new head
    return ptr;
}`;

  const insertAtIndexCode = `struct Node * insertAtIndex(struct Node *head, int data, int index) {
    // 1. Allocate memory for new node
    struct Node * ptr = (struct Node *) malloc(sizeof(struct Node));
    struct Node * p = head;
    int i = 0;
    
    // 2. Traverse to the node just before the insertion index (index - 1)
    while (i != index - 1) {
        p = p->next;
        i++;
    }
    
    // 3. Set the data
    ptr->data = data;
    
    // 4. Point next of new node to next of p
    ptr->next = p->next;
    
    // 5. Point next of p to the new node
    p->next = ptr;
    
    // 6. Return the unchanged head
    return head;
}`;

  const insertAtEndCode = `struct Node * insertAtEnd(struct Node *head, int data) {
    // 1. Allocate memory for new node
    struct Node * ptr = (struct Node *) malloc(sizeof(struct Node));
    
    // 2. Set the data
    ptr->data = data;
    
    struct Node * p = head;
    
    // 3. Traverse until we reach the last node (where next is NULL)
    while (p->next != NULL) {
        p = p->next;
    }
    
    // 4. Point next of the last node to our new node
    p->next = ptr;
    
    // 5. Set next of our new node to NULL (as it's now the last node)
    ptr->next = NULL;
    
    // 6. Return the unchanged head
    return head;
}`;

  const insertAfterNodeCode = `struct Node * insertAfterNode(struct Node *head, struct Node *prevNode, int data) {
    // 1. Allocate memory for new node
    struct Node * ptr = (struct Node *) malloc(sizeof(struct Node));
    
    // 2. Set the data
    ptr->data = data;
    
    // 3. Point next of new node to next of prevNode
    ptr->next = prevNode->next;
    
    // 4. Point next of prevNode to our new node
    prevNode->next = ptr;
    
    // 5. Return the unchanged head
    return head;
}`;

  return (
    <div id="linked-list-insertion-code-page" className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
          <Code2 className="h-4 w-4" />
          Data Structures &bull; C Implementation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Insertion Code in C
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Let's implement the 4 cases of Linked List insertion using C programming. 
          We'll write dedicated functions for each case, allocating memory dynamically using <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">malloc</code>.
        </p>
      </div>

      <div className="space-y-12 mb-12">
        {/* Case 1: Insert at Beginning */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-sm">1</span>
              Insert at Beginning
            </h2>
            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(1)
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This function takes the current head and the data to insert. It creates a new node, points its <code className="font-mono text-xs">next</code> to the current head, and returns the new node (which becomes the new head of the linked list).
          </p>
          <CodeBlock code={insertAtFirstCode} language="c" title="insertAtFirst.c" />
        </section>

        {/* Case 2: Insert In Between */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-sm">2</span>
              Insert at Index
            </h2>
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(n)
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            To insert at a specific index, we traverse the list to find the node <em>just before</em> the desired insertion point (at <code className="font-mono text-xs">index - 1</code>). We then break the chain and rewire the <code className="font-mono text-xs">next</code> pointers to insert our new node. Note: This specific implementation works for <code className="font-mono text-xs">index &gt; 0</code>.
          </p>
          <CodeBlock code={insertAtIndexCode} language="c" title="insertAtIndex.c" />
        </section>

        {/* Case 3: Insert At End */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 text-sm">3</span>
              Insert at End
            </h2>
            <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(n)
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We traverse the list until the pointer <code className="font-mono text-xs">p-&gt;next</code> is <code className="font-mono text-xs">NULL</code>, which indicates the last node. Then, we point that last node's <code className="font-mono text-xs">next</code> to our newly created node, and terminate the list by setting the new node's <code className="font-mono text-xs">next</code> to <code className="font-mono text-xs">NULL</code>.
          </p>
          <CodeBlock code={insertAtEndCode} language="c" title="insertAtEnd.c" />
        </section>

        {/* Case 4: Insert After Node */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-sm">4</span>
              Insert After Given Node
            </h2>
            <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(1)
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If we already have a pointer to the previous node (<code className="font-mono text-xs">prevNode</code>), we don't need to traverse! We simply wire the new node's <code className="font-mono text-xs">next</code> to <code className="font-mono text-xs">prevNode-&gt;next</code>, and then point <code className="font-mono text-xs">prevNode-&gt;next</code> to our new node.
          </p>
          <CodeBlock code={insertAfterNodeCode} language="c" title="insertAfterNode.c" />
        </section>
      </div>

      {/* Navigation */}

    </div>
  );
}