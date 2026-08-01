import { ArrowLeft, ArrowRight, BarChart3, TrendingDown, TrendingUp, AlertCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function AsymptoticNotationsDocs() {
  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Algorithm Analysis</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Asymptotic Notations
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          To compare one algorithm with another algorithm formally, we use asymptotic notations. There are three primary notations: Big O, Big Omega (Ω), and Big Theta (Θ).
        </p>
      </div>

      <div className="space-y-12">
        {/* Big O Notation */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mr-3">
              <TrendingUp className="h-5 w-5" />
            </div>
            Big O Notation (Upper Bound)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Big O describes the <strong>Upper Bound</strong> of an algorithm. It guarantees that the function will not grow faster than a certain rate for large inputs.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5 rounded-xl font-mono text-sm mb-4 text-gray-800 dark:text-gray-200 shadow-sm">
            A function <span className="font-bold text-blue-600">f(n)</span> is said to be <span className="font-bold text-blue-600">O(g(n))</span> if and only if there exist positive constants <span className="font-bold text-purple-600">c</span> and <span className="font-bold text-purple-600">n₀</span> such that:
            <br/><br/>
            <span className="bg-white dark:bg-gray-950 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-800 shadow-sm inline-block font-bold">
              0 ≤ f(n) ≤ c · g(n)
            </span>
            <br/><br/>
            for all n ≥ n₀.
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            <strong>What this means:</strong> For large values of <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">n</code>, the function <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">c·g(n)</code> will always stay <em>above</em> your algorithm's runtime <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">f(n)</code>. It bounds the algorithm from the top.
          </p>
        </div>

        {/* Big Omega Notation */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mr-3">
              <TrendingDown className="h-5 w-5" />
            </div>
            Big Omega (Ω) Notation (Lower Bound)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Big Omega describes the <strong>Lower Bound</strong> of an algorithm. It guarantees that the algorithm will take at least a certain amount of time for large inputs.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5 rounded-xl font-mono text-sm mb-4 text-gray-800 dark:text-gray-200 shadow-sm">
            A function <span className="font-bold text-blue-600">f(n)</span> is said to be <span className="font-bold text-blue-600">Ω(g(n))</span> if and only if there exist positive constants <span className="font-bold text-purple-600">c</span> and <span className="font-bold text-purple-600">n₀</span> such that:
            <br/><br/>
            <span className="bg-white dark:bg-gray-950 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-800 shadow-sm inline-block font-bold">
              0 ≤ c · g(n) ≤ f(n)
            </span>
            <br/><br/>
            for all n ≥ n₀.
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            <strong>What this means:</strong> The function <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">c·g(n)</code> stays <em>below</em> your algorithm's runtime <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">f(n)</code>. Your algorithm will never be faster than this lower limit.
          </p>
        </div>

        {/* Big Theta Notation */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-green-100 text-green-600 p-1.5 rounded-lg mr-3">
              <BarChart3 className="h-5 w-5" />
            </div>
            Big Theta (Θ) Notation (Tight Bound)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Big Theta describes the <strong>Tight Bound</strong>. If a function is bounded from above AND below by the same type of function, we use Big Theta. It gives you the best, most accurate picture of the runtime.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5 rounded-xl font-mono text-sm mb-4 text-gray-800 dark:text-gray-200 shadow-sm">
            A function <span className="font-bold text-blue-600">f(n)</span> is said to be <span className="font-bold text-blue-600">Θ(g(n))</span> if there exist positive constants <span className="font-bold text-purple-600">c₁</span>, <span className="font-bold text-purple-600">c₂</span>, and <span className="font-bold text-purple-600">n₀</span> such that:
            <br/><br/>
            <span className="bg-white dark:bg-gray-950 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-800 shadow-sm inline-block font-bold">
              0 ≤ c₁ · g(n) ≤ f(n) ≤ c₂ · g(n)
            </span>
            <br/><br/>
            for all n ≥ n₀.
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            <strong>What this means:</strong> <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">f(n)</code> is sandwiched between <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">c₁·g(n)</code> (lower bound) and <code className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-1 rounded">c₂·g(n)</code> (upper bound). <br/>
            A function is <strong>Θ(g(n))</strong> if and only if it is both <strong>O(g(n))</strong> and <strong>Ω(g(n))</strong>.
          </p>
        </div>

        {/* Interview Tips */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg shrink-0 mr-4">
              <AlertCircle className="h-6 w-6 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="text-amber-900 dark:text-amber-300 font-bold text-lg">Interview Tip: "Order of"</h3>
          </div>
          <p className="text-amber-900/90 dark:text-amber-200 text-sm leading-relaxed mb-4">
            Mathematically, if an algorithm's exact time complexity is <code className="font-bold text-amber-800 dark:text-amber-300">n²</code>, it is <code className="font-bold text-amber-800 dark:text-amber-300">O(n²)</code>, but it is also valid to call it <code className="font-bold text-amber-800 dark:text-amber-300">O(n³)</code> or <code className="font-bold text-amber-800 dark:text-amber-300">O(n⁴)</code> since those are also upper bounds.
          </p>
          <p className="text-amber-900/90 dark:text-amber-200 text-sm leading-relaxed">
            However, when an interviewer asks for the <strong>"order of"</strong> or the <strong>"time complexity"</strong>, they expect the tightest bound. Therefore, you should always report your answer in <strong>Big Theta (Θ)</strong> (often colloquially referred to by interviewers simply as Big O). This shows you understand exact scaling and tight bounds.
          </p>
        </div>

        {/* Common Runtimes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg mr-3">
              <HelpCircle className="h-5 w-5" />
            </div>
            Common Time Complexities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Here are the most common time complexities encountered in algorithms, ordered from best (fastest) to worst (slowest):
          </p>
          
          <div className="flex flex-wrap gap-3 items-center font-mono text-sm font-semibold">
            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 shadow-sm">O(1)</span>
            <span className="text-gray-400">{'<'}</span>
            <span className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">O(log n)</span>
            <span className="text-gray-400">{'<'}</span>
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm">O(n)</span>
            <span className="text-gray-400">{'<'}</span>
            <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm">O(n log n)</span>
            <span className="text-gray-400">{'<'}</span>
            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800 shadow-sm">O(n²)</span>
            <span className="text-gray-400">{'<'}</span>
            <span className="bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-800 shadow-sm">O(2ⁿ)</span>
            <span className="text-gray-400">{'<'}</span>
            <span className="bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 shadow-sm">O(n!)</span>
          </div>
        </div>

      </div>

      </div>
  );
}