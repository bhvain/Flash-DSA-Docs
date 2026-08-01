import { Code2, Hash } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';


export const metadata = {
  title: 'Linked List Deletion Code | Flash DSA Docs',
  description: 'C programming implementations for deleting nodes in a linked list.',
};

export default function LinkedListDeletionCodePage() {
  const deleteFirstCode = `struct Node * deleteFirst(struct Node * head) {
    // 1. Create a pointer pointing to head
    struct Node * ptr = head;
    
    // 2. Move head to the next node
    head = head->next;
    
    // 3. Free the original head
    free(ptr);
    
    // 4. Return new head
    return head;
}`;

  const deleteAtIndexCode = `struct Node * deleteAtIndex(struct Node * head, int index) {
    struct Node * p = head;
    struct Node * q = head->next;
    
    // 1. Traverse to the node just before the target index
    for (int i = 0; i < index - 1; i++) {
        p = p->next;
        q = q->next;
    }
    
    // 2. Bypass node q
    p->next = q->next;
    
    // 3. Free node q
    free(q);
    
    return head;
}`;

  const deleteAtLastCode = `struct Node * deleteAtLast(struct Node * head) {
    struct Node * p = head;
    struct Node * q = head->next;
    
    // 1. Traverse until q is the last node
    while (q->next != NULL) {
        p = p->next;
        q = q->next;
    }
    
    // 2. Disconnect the last node
    p->next = NULL;
    
    // 3. Free the last node
    free(q);
    
    return head;
}`;

  const deleteByValueCode = `struct Node * deleteByValue(struct Node * head, int value) {
    struct Node * p = head;
    struct Node * q = head->next;
    
    // Handle case where head itself holds the value
    if (head->data == value) {
        head = head->next;
        free(p);
        return head;
    }
    
    // 1. Traverse to find the value
    while (q->data != value && q->next != NULL) {
        p = p->next;
        q = q->next;
    }
    
    // 2. If value is found, bypass and free
    if (q->data == value) {
        p->next = q->next;
        free(q);
    }
    
    return head;
}`;

  const fullProgramCode = `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node * next;
};

void linkedListTraversal(struct Node * ptr) {
    while (ptr != NULL) {
        printf("Element: %d\\n", ptr->data);
        ptr = ptr->next;
    }
}

// ... include your deletion functions here ...

int main() {
    struct Node * head;
    struct Node * second;
    struct Node * third;
    struct Node * fourth;

    // Allocate memory for nodes in the linked list in Heap
    head = (struct Node *)malloc(sizeof(struct Node));
    second = (struct Node *)malloc(sizeof(struct Node));
    third = (struct Node *)malloc(sizeof(struct Node));
    fourth = (struct Node *)malloc(sizeof(struct Node));

    // Link first and second nodes
    head->data = 4;
    head->next = second;

    // Link second and third nodes
    second->data = 3;
    second->next = third;

    // Link third and fourth nodes
    third->data = 8;
    third->next = fourth;

    // Terminate the list at the third node
    fourth->data = 1;
    fourth->next = NULL;

    printf("Linked list before deletion:\\n");
    linkedListTraversal(head);

    // Call any of the deletion functions here
    // head = deleteFirst(head);
    // head = deleteAtIndex(head, 2);
    // head = deleteAtLast(head);
    head = deleteByValue(head, 8);

    printf("Linked list after deletion:\\n");
    linkedListTraversal(head);

    return 0;
}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
          <Code2 className="h-4 w-4" />
          Data Structures &bull; C Implementation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Deletion Code in C
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Let's implement the 4 cases of Linked List deletion using C programming. 
          Remember to always <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">free()</code> the memory of the node you remove!
        </p>
      </div>

      <div className="space-y-12 mb-12">
        {/* Case 1 */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 text-sm">1</span>
              Delete First Node
            </h2>
            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(1)
            </div>
          </div>
          <CodeBlock code={deleteFirstCode} language="c" title="deleteFirst.c" />
        </section>

        {/* Case 2 */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 text-sm">2</span>
              Delete at Index
            </h2>
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(n)
            </div>
          </div>
          <CodeBlock code={deleteAtIndexCode} language="c" title="deleteAtIndex.c" />
        </section>

        {/* Case 3 */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 text-sm">3</span>
              Delete Last Node
            </h2>
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(n)
            </div>
          </div>
          <CodeBlock code={deleteAtLastCode} language="c" title="deleteAtLast.c" />
        </section>

        {/* Case 4 */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 text-sm">4</span>
              Delete by Value
            </h2>
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full w-fit">
              Time: O(n)
            </div>
          </div>
          <CodeBlock code={deleteByValueCode} language="c" title="deleteByValue.c" />
        </section>
        {/* Full Program */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-sm">
                <Code2 className="h-4 w-4" />
              </span>
              Full Program (deletion.c)
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Here is the complete code to test the linked list deletion functions. We create a linked list, display it before deletion, call our deletion function, and display it after deletion.
          </p>
          <CodeBlock code={fullProgramCode} language="c" title="deletion.c" />
        </section>
      </div>


    </div>
  );
}
