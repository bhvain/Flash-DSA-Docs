import { ArrowLeft, ArrowRight, Code2, Scissors, Calculator, TerminalSquare } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';

export default function TimeComplexityPracticeDocs() {
  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Algorithm Analysis</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Time Complexity: Rules & Practice
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Learn the fundamental rules for calculating time complexity by dropping terms, and practice evaluating code snippets.
        </p>
      </div>

      <div className="space-y-12">
        {/* Rules */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mr-3">
              <Scissors className="h-5 w-5" />
            </div>
            3 Rules to Calculate Time Complexity
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            When analyzing an algorithm mathematically, you will often end up with complex polynomial equations. Use these rules to simplify them to their Big O representation:
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">1. Drop the Non-Dominant Terms</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                As <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">n</code> approaches infinity, smaller terms become insignificant compared to the largest term. Always keep only the highest-order term.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 px-3 py-2 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300">
                O(N² + N) &rarr; <span className="font-bold text-blue-600">O(N²)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">2. Drop the Constants</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                Constants do not affect the <em>growth rate</em> of the algorithm. Whether an algorithm takes <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">N</code> steps or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">2N</code> steps, it scales linearly. Drop the multiplier constants.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 px-3 py-2 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300">
                O(2N) &rarr; <span className="font-bold text-blue-600">O(N)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">3. Break Code into Fragments</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                If your code has multiple sequential loops, calculate their complexity individually and add them up, then apply Rules 1 and 2.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 px-3 py-2 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300">
                O(N) + O(N) = O(2N) &rarr; <span className="font-bold text-blue-600">O(N)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Problems */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mr-3">
              <TerminalSquare className="h-5 w-5" />
            </div>
            Practice Problems
          </h2>

          <div className="space-y-8">
            
            {/* Problem 1 */}
            <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                Problem 1: Sequential Loops
              </div>
              <div className="p-5">
                <CodeBlock code={`int sum = 0;
int product = 1;

for (int i = 0; i < N; i++) {
  sum += array[i];
}

for (int i = 0; i < N; i++) {
  product *= array[i];
}`} />
                <details className="group cursor-pointer">
                  <summary className="font-bold text-gray-900 dark:text-gray-100 mb-1 select-none flex items-center outline-none">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-open:rotate-90" />
                    Show Analysis & Answer
                  </summary>
                  <div className="pl-6 mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      Break it into fragments: Constants + Loop 1 + Loop 2.<br/>
                      Total = <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">O(1) + O(N) + O(N) = O(2N)</code>.<br/>
                      Drop the constant multiplier.
                    </p>
                    <div className="inline-block px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-sm">
                      Answer: O(N)
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                Problem 2: Nested Loops
              </div>
              <div className="p-5">
                <CodeBlock code={`for (int i = 0; i < N; i++) {
  for (int j = 0; j < N; j++) {
    printf("%d, %d\\n", i, j);
  }
}`} />
                <details className="group cursor-pointer">
                  <summary className="font-bold text-gray-900 dark:text-gray-100 mb-1 select-none flex items-center outline-none">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-open:rotate-90" />
                    Show Analysis & Answer
                  </summary>
                  <div className="pl-6 mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      For every single iteration of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">i</code> (which runs N times), the inner loop runs N times.<br/>
                      Total runs = <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">N * N = N²</code>.
                    </p>
                    <div className="inline-block px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-sm">
                      Answer: O(N²)
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                Problem 3: Tricky Prime Check
              </div>
              <div className="p-5">
                <CodeBlock code={`int isPrime(int n) {
  if (n <= 1) return 0;
  for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) return 0;
  }
  return 1;
}`} />
                <details className="group cursor-pointer">
                  <summary className="font-bold text-gray-900 dark:text-gray-100 mb-1 select-none flex items-center outline-none">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-open:rotate-90" />
                    Show Analysis & Answer
                  </summary>
                  <div className="pl-6 mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      The loop runs as long as <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">i * i &lt;= n</code>, which means it runs until <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">i &lt;= &radic;n</code>. Thus, the loop executes approximately <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&radic;n</code> times.
                    </p>
                    <div className="inline-block px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-sm">
                      Answer: O(&radic;N)
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Problem 4 */}
            <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                Problem 4: Constant Input Trap
              </div>
              <div className="p-5">
                <CodeBlock code={`void checkNumber(int n) {
  for (int i = 0; i < 10000; i++) {
    // some operations
  }
}`} />
                <details className="group cursor-pointer">
                  <summary className="font-bold text-gray-900 dark:text-gray-100 mb-1 select-none flex items-center outline-none">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-open:rotate-90" />
                    Show Analysis & Answer
                  </summary>
                  <div className="pl-6 mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      No matter how large <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">n</code> is, the loop always runs exactly 10,000 times. Because the runtime does not depend on the input size <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">n</code>, the time complexity is constant. Don't let large hardcoded numbers trick you!
                    </p>
                    <div className="inline-block px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-sm">
                      Answer: O(1)
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Problem 5 */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                Problem 5: Random Recursive Call
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Consider the recursive algorithm below, where <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">random(int n)</code> spends one unit of time to return a random integer evenly distributed in the range <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">[0, n]</code>. What is the asymptotic time complexity <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">T(n)</code>?
                </p>
                <CodeBlock code={`int random(int a) {
  int num = (rand() % (a + 1));
  return num;
}

int function(int n) {
  int i;
  if (n <= 0) {
    return 0;
  } else {
    i = random(n - 1);
    printf("this\\n");
    return function(i) + function(n - 1 - i);
  }
}`} language="c" />
                <details className="group cursor-pointer">
                  <summary className="font-bold text-gray-900 dark:text-gray-100 mb-1 select-none flex items-center outline-none">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-open:rotate-90" />
                    Show Analysis & Answer
                  </summary>
                  <div className="pl-6 mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      Even though the split is random, notice the sizes of the subproblems: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">i</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">n - 1 - i</code>. The sum of the inputs to the recursive calls is exactly <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">n - 1</code>. This means the algorithm recursively processes exactly <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">n</code> items, one at a time, regardless of how the split happens. For example, if you trace <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">T(6)</code>, you will find exactly 6 calls to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">printf</code>.
                    </p>
                    <div className="inline-block px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-sm">
                      Answer: O(N)
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Problem 6 */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                Problem 6: Identifying Equivalent Complexities
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Which of the following are equivalent to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded font-bold text-gray-900 dark:text-gray-100">O(N)</code>?
                </p>
                <ol className="list-[upper-alpha] list-inside space-y-2 text-sm text-gray-800 dark:text-gray-200 mb-6 font-mono bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <li>O(N + P) where P &lt; N/9</li>
                  <li>O(9N - k) where k is a constant</li>
                  <li>O(N + 8log N)</li>
                  <li>O(N + M²)</li>
                </ol>
                <details className="group cursor-pointer">
                  <summary className="font-bold text-gray-900 dark:text-gray-100 mb-1 select-none flex items-center outline-none">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-open:rotate-90" />
                    Show Analysis & Answer
                  </summary>
                  <div className="pl-6 mt-2">
                    <ul className="list-disc text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 space-y-1">
                      <li><strong>A:</strong> Equivalent. P is dominated by N, so we can drop it.</li>
                      <li><strong>B:</strong> Equivalent. Drop the constant <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">k</code>, then drop the constant multiplier <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">9</code>.</li>
                      <li><strong>C:</strong> Equivalent. <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">log N</code> grows slower than <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">N</code>, so it is a non-dominant term and can be dropped.</li>
                      <li><strong>D:</strong> Not equivalent. We don't know the relationship between <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">M</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">N</code>. <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">M</code> is a separate input size, so we cannot drop it.</li>
                    </ul>
                    <div className="inline-block px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-sm">
                      Answer: A, B, and C
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Problem 7 */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                Problem 7: Binary Search Tree Sum
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  The following code sums the values of all the nodes in a balanced binary search tree. What is its runtime?
                </p>
                <CodeBlock code={`int sum(Node node) {
  if (node == NULL) {
    return 0;
  }
  return sum(node.left) + node.value + sum(node.right);
}`} language="c" />
                <details className="group cursor-pointer">
                  <summary className="font-bold text-gray-900 dark:text-gray-100 mb-1 select-none flex items-center outline-none">
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-open:rotate-90" />
                    Show Analysis & Answer
                  </summary>
                  <div className="pl-6 mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      The code performs a constant amount of work for each node (checking if it is NULL, reading its value, and adding). Since the function is called exactly once for each node in the tree, the runtime is directly proportional to the number of nodes.
                    </p>
                    <div className="inline-block px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-sm">
                      Answer: O(N) where N is the number of nodes
                    </div>
                  </div>
                </details>
              </div>
            </div>

          </div>
        </div>

      </div>

      </div>
  );
}