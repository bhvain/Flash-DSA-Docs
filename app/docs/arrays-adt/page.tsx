import { ArrowLeft, ArrowRight, Database, Cpu, Layout, Layers, AlertTriangle, Code2, TerminalSquare, CheckCircle2, Monitor } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { ArrayADTSimulator } from '@/components/ArrayADTSimulator';

export default function ArraysADTDocs() {
  const cImplementationCode = `#include <stdio.h>
#include <stdlib.h>

struct myArray {
    int total_size;
    int used_size;
    int *ptr;
};

void createArray(struct myArray * a, int tSize, int uSize) {
    // (*a).total_size = tSize;
    // (*a).used_size = uSize;
    // (*a).ptr = (int *)malloc(tSize * sizeof(int));
    
    a->total_size = tSize;
    a->used_size = uSize;
    a->ptr = (int *)malloc(tSize * sizeof(int));
}

void setVal(struct myArray * a) {
    for (int i = 0; i < a->used_size; i++) {
        printf("Enter element %d: ", i);
        scanf("%d", &(a->ptr)[i]);
    }
}

void show(struct myArray * a) {
    for (int i = 0; i < a->used_size; i++) {
        printf("%d\\n", (a->ptr)[i]);
    }
}

int main() {
    struct myArray marks;
    createArray(&marks, 10, 2);
    
    printf("Running setVal now...\\n");
    setVal(&marks);
    
    printf("Running show now...\\n");
    show(&marks);
    
    return 0;
}`;

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="mb-10 font-sans">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
          <Link href="/docs/introduction" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Data Structures</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">Arrays & ADT</span>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 mb-6">
          Arrays as Abstract Data Types (ADT)
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Master the concept of Abstract Data Types (ADT), compare primitive vs custom data types, explore the memory layout of custom structures in Stack &amp; Heap, and inspect a full C implementation.
        </p>
      </div>

      <div className="space-y-12 font-sans">
        {/* Abstract Data Type Analogy */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg mr-3">
              <Cpu className="h-5 w-5" />
            </div>
            The &quot;PC Build&quot; Analogy for ADT
          </h2>
          
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Imagine your friend wants to build a PC for gaming and streaming. You give them a <strong>blueprint</strong>: &quot;Buy an MSI B450 motherboard, an AMD Ryzen processor, and a GTX 1050 Ti graphics card.&quot;
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              With this blueprint, they know the <em>minimal required components</em>. They can go to any store, buy different brands of RAM or cables, but as long as they follow the blueprint, they will build a working PC capable of gaming and streaming.
            </p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-3">What is an Abstract Data Type (ADT)?</h3>
            <p className="text-indigo-900/80 dark:text-indigo-200 leading-relaxed mb-4">
              An <strong>Abstract Data Type (ADT)</strong> consists of two main pillars:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">1. Set of Values</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">The data fields or variables stored inside the structure (e.g., array elements, capacity).</span>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">2. Set of Operations</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">The functions/methods allowed on that data (e.g., get, set, insert, search).</span>
              </div>
            </div>
            <p className="text-indigo-900/80 dark:text-indigo-200 leading-relaxed">
              An ADT specifies <em>what</em> the data structure does, while leaving the exact coding implementation (C struct, C++ class, Java object) hidden from the user.
            </p>
          </div>
        </div>

        {/* Primitive vs Custom ADT */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 p-1.5 rounded-lg mr-3">
              <Layers className="h-5 w-5" />
            </div>
            Primitive Types vs Custom ADTs
          </h2>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6">
            <p className="text-purple-900/80 dark:text-purple-200 leading-relaxed mb-4">
              Consider the primitive <code className="bg-purple-100 dark:bg-purple-900/50 px-1.5 py-0.5 rounded font-mono text-purple-900 dark:text-purple-100 font-bold">int</code> data type:
            </p>
            <div className="bg-white dark:bg-gray-950 p-4 rounded-xl border border-purple-200 dark:border-purple-800 font-mono text-sm mb-4 text-purple-950 dark:text-purple-100">
              int a = 9, b = 12;<br />
              int sum = a + b; // sum = 21
            </div>
            <p className="text-purple-900/80 dark:text-purple-200 leading-relaxed">
              When you write <code className="font-mono font-bold">a + b</code>, the CPU executes binary bit-level additions, carrying bits in registers. You don&apos;t worry about register gates or bitwise operations because the implementation details are <strong>abstracted</strong> from you (&quot;Eat the mangoes, don&apos;t count the kernels&quot;).
            </p>
          </div>
        </div>

        {/* MyArray ADT Structure */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 p-1.5 rounded-lg mr-3">
              <Layout className="h-5 w-5" />
            </div>
            Designing the Custom Array ADT (<code className="text-blue-600 dark:text-blue-400">MyArray</code>)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            To build a flexible Array ADT in C, we create a custom structure storing three critical fields:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 block">Field 1</span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2"><code className="font-mono">total_size</code></h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Total memory capacity reserved in Heap (e.g., reserving space for 20 elements).
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 block">Field 2</span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2"><code className="font-mono">used_size</code></h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                The actual number of elements currently populated in the array (e.g., using 5 slots).
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 block">Field 3</span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2"><code className="font-mono">int *ptr</code></h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Base address pointer pointing to the dynamically allocated buffer on the Heap.
              </p>
            </div>
          </div>
        </div>

        {/* Stack vs Heap Memory Diagram */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
            <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg mr-3">
              <Database className="h-5 w-5" />
            </div>
            Stack vs Heap Memory Layout
          </h2>
          
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              When <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">struct myArray marks;</code> is declared in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">main()</code>, the structure instance sits on the <strong>Stack</strong>, while the actual data buffer is dynamically requested on the <strong>Heap</strong> using <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">malloc()</code>:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
              {/* Stack Side */}
              <div className="bg-white dark:bg-gray-950 p-4 sm:p-5 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center justify-between gap-2">
                  <span>Stack Memory (main frame)</span>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-mono truncate">struct myArray</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded border border-blue-100 dark:border-blue-900 flex justify-between items-center gap-2">
                    <span className="text-gray-500">total_size:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">10</span>
                  </div>
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded border border-blue-100 dark:border-blue-900 flex justify-between items-center gap-2">
                    <span className="text-gray-500">used_size:</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">2</span>
                  </div>
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded border border-blue-100 dark:border-blue-900 flex justify-between items-center gap-2">
                    <span className="text-gray-500">ptr:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 text-[11px] truncate">0x7ff001 ➔</span>
                  </div>
                </div>
              </div>

              {/* Heap Side */}
              <div className="bg-white dark:bg-gray-950 p-4 sm:p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 shadow-sm min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center justify-between gap-2">
                  <span>Heap Memory</span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono truncate">malloc(10 * 4)</span>
                </div>
                <div className="overflow-x-auto pb-1">
                  <div className="grid grid-cols-5 gap-1.5 font-mono text-xs text-center min-w-[240px]">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded border border-emerald-300 dark:border-emerald-700">
                      <div className="text-[9px] text-gray-400">Idx 0</div>
                      <div className="font-bold text-emerald-800 dark:text-emerald-200">15</div>
                    </div>
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded border border-emerald-300 dark:border-emerald-700">
                      <div className="text-[9px] text-gray-400">Idx 1</div>
                      <div className="font-bold text-emerald-800 dark:text-emerald-200">42</div>
                    </div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 opacity-60">
                      <div className="text-[9px] text-gray-400">Idx 2</div>
                      <div className="text-gray-400">-</div>
                    </div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 opacity-60">
                      <div className="text-[9px] text-gray-400">...</div>
                      <div className="text-gray-400">-</div>
                    </div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 opacity-60">
                      <div className="text-[9px] text-gray-400">Idx 9</div>
                      <div className="text-gray-400">-</div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
                  2 occupied slots (<code className="font-mono">used_size = 2</code>), 8 extra reserved slots ready for fast insertion without immediately reallocating.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* C Implementation Code */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg mr-3">
              <TerminalSquare className="h-5 w-5" />
            </div>
            Full C Implementation Code
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Here is the complete C program building the custom array ADT with constructor-like creation, value input, and display functions:
          </p>

          <CodeBlock code={cImplementationCode} language="c" />

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 mt-4">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center text-sm">
              <CheckCircle2 className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" /> Key Code Notes:
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-blue-900/80 dark:text-blue-200 leading-relaxed">
              <li><code className="font-mono bg-blue-100 dark:bg-blue-900/60 px-1 rounded">a-&gt;ptr</code> is equivalent to writing <code className="font-mono bg-blue-100 dark:bg-blue-900/60 px-1 rounded">(*a).ptr</code> (dereferencing the structure pointer).</li>
              <li><code className="font-mono bg-blue-100 dark:bg-blue-900/60 px-1 rounded">(a-&gt;ptr)[i]</code> accesses the i-th integer element in the heap block using array indexing.</li>
              <li>Always pass the structure address <code className="font-mono bg-blue-100 dark:bg-blue-900/60 px-1 rounded">&amp;marks</code> to pass by reference so memory mutations persist across functions.</li>
            </ul>
          </div>
        </div>

        {/* Interactive ADT Memory Simulator */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg mr-3">
              <Monitor className="h-5 w-5" />
            </div>
            Interactive Array ADT Sandbox
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Test the Array ADT methods live in your browser! See how <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">createArray</code>, <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">setVal</code>, <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">insert</code>, and <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">delete</code> affect both Stack structure pointers and Heap memory buffers.
          </p>

          <ArrayADTSimulator />
        </div>

        {/* Development Environment & Compiler Setup */}
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Code2 className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Setting Up Your C Environment (<code className="font-mono text-sm text-indigo-600 dark:text-indigo-400">08_ArrayADT.c</code>)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            To run this code locally on your workstation, follow the standard developer setup:
          </p>
          <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">1. IDE &amp; Compiler:</span>
              <span>Install <strong>Visual Studio Code</strong> and download the <strong>MinGW-w64 GCC Compiler</strong> (or use Code::Blocks on Windows).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">2. Directory Organization:</span>
              <span>Keep your source files structured clearly in a <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">Code/</code> directory (e.g. <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">08_ArrayADT.c</code>) matching your course sequence.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">3. Compilation Command:</span>
              <span className="font-mono bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200">gcc 08_ArrayADT.c -o 08_ArrayADT &amp;&amp; ./08_ArrayADT</span>
            </li>
          </ul>
        </div>

        {/* The Scam of Arrays */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            The &quot;Scam&quot; of Arrays: Insertion &amp; Deletion
          </h2>
          <p className="text-amber-900/80 dark:text-amber-200 leading-relaxed mb-4">
            While getting and setting values is lightning fast (<code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">O(1)</code>), inserting or deleting an element in the middle of an array is costly.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-amber-900/80 dark:text-amber-200">
            <li><strong>Insertion:</strong> To insert &apos;5&apos; at index 2, you must shift all elements from index 2 to the end one spot to the right to make space.</li>
            <li><strong>Deletion:</strong> If you delete index 0, you must shift every single remaining element one spot to the left to close the gap.</li>
          </ul>
          <p className="text-amber-900/80 dark:text-amber-200 leading-relaxed mt-4 font-semibold">
            In the worst-case scenario (e.g., inserting at the beginning), you have to shift <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">N</code> elements. Therefore, Insertion and Deletion take <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded text-red-600 dark:text-red-400">O(N)</code> time.
          </p>
        </div>

      </div>

      {/* Navigation */}
      </div>
  );
}