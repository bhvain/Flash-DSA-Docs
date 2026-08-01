import { Clock, TrendingUp, Cpu, HardDrive, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TimeComplexityDocs() {
  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Data Structures</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Time Complexity & Big O Notation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Learn how to analyze and compare the efficiency of algorithms as their input size scales up.
        </p>
      </div>

      <div className="space-y-12">
        {/* Story 1 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
            The Intuition: Jio vs. Hard Disk
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Imagine you want a game from a friend's house 5km away. You have two ways to get it:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Method 1: Internet</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Send it online. For a 250KB file, it takes 2 seconds. For a 1MB file, it takes 4 seconds. If you try to send 60GB over a 1GB/day Jio plan, it will take forever.</p>
              <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-semibold">
                Time depends on file size <span className="text-blue-600 ml-1">O(n)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mr-4">
                  <HardDrive className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Method 2: Physical Visit</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Drive there, copy to a Hard Disk, drive back. It takes the same 30 minutes whether you copy 250KB or 60GB.</p>
              <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-semibold">
                Time is constant <span className="text-purple-600 ml-1">O(1)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Conclusion</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              As the size of the input changes, the time it takes to get the output changes. Time complexity is answering the question: <strong>"How does the runtime of my algorithm scale as the input size increases?"</strong>
            </p>
          </div>
        </div>

        {/* Big O Notation */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
            Big O Notation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Big O notation mathematically describes the complexity of an algorithm. To find the Big O of an equation, we look for the <strong>most impactful (highest order) term</strong> and ignore constants.
          </p>

          <div className="space-y-4 font-mono text-sm">
            <div className="bg-gray-900 dark:bg-gray-950 text-gray-300 p-4 rounded-xl flex flex-col gap-2 shadow-sm">
              <div className="flex text-gray-400">
                <span className="w-24 shrink-0">Algorithm 2:</span>
                <span>T = k1 + k2 + k3 + k4</span>
              </div>
              <div className="flex">
                <span className="w-24 shrink-0 text-white">Equation:</span>
                <span className="text-white">T = C * n<sup className="text-[10px]">0</sup></span>
              </div>
              <div className="flex text-green-400 font-bold">
                <span className="w-24 shrink-0">Big O:</span>
                <span>O(1)  // Constant Time</span>
              </div>
            </div>

            <div className="bg-gray-900 dark:bg-gray-950 text-gray-300 p-4 rounded-xl flex flex-col gap-2 shadow-sm">
              <div className="flex text-gray-400">
                <span className="w-24 shrink-0">Algorithm 1:</span>
                <span>T = L1 + (n / L2)</span>
              </div>
              <div className="flex">
                <span className="w-24 shrink-0 text-white">Equation:</span>
                <span className="text-white">T = L1 * n<sup className="text-[10px]">0</sup> + L2' * n<sup className="text-[10px]">1</sup></span>
              </div>
              <div className="flex text-green-400 font-bold">
                <span className="w-24 shrink-0">Big O:</span>
                <span>O(n)  // Linear Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Example */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
            Evaluating Algorithms: Shubham vs. Rohan
          </h2>
          
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-800 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">Input Size (N)</th>
                  <th className="px-6 py-4">Shubham's Algo</th>
                  <th className="px-6 py-4">Rohan's Algo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-600 dark:text-gray-400">
                <tr className="bg-white dark:bg-gray-950">
                  <td className="px-6 py-4 font-semibold">10 elements</td>
                  <td className="px-6 py-4 text-green-600 font-bold">90 ms (Winner)</td>
                  <td className="px-6 py-4">122 ms</td>
                </tr>
                <tr className="bg-white dark:bg-gray-950">
                  <td className="px-6 py-4 font-semibold">70 elements</td>
                  <td className="px-6 py-4 text-green-600 font-bold">110 ms (Winner)</td>
                  <td className="px-6 py-4">124 ms</td>
                </tr>
                <tr className="bg-white dark:bg-gray-950">
                  <td className="px-6 py-4 font-semibold">110 elements</td>
                  <td className="px-6 py-4">180 ms</td>
                  <td className="px-6 py-4 text-green-600 font-bold">121 ms (Winner)</td>
                </tr>
                <tr className="bg-blue-50/50 dark:bg-blue-900/20">
                  <td className="px-6 py-4 font-semibold text-blue-900 dark:text-blue-300">1000 elements</td>
                  <td className="px-6 py-4 text-red-500 font-bold">2000 ms (Crashed)</td>
                  <td className="px-6 py-4 text-green-600 font-bold">800 ms (Winner)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Shubham's algorithm performed better on small datasets. However, when building scalable systems in a product-based company, we prioritize algorithms like Rohan's that handle <strong>large inputs</strong> optimally.
          </p>
        </div>

        {/* Industry vs Math */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl flex gap-4 items-start">
          <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg shrink-0 mt-1">
            <AlertTriangle className="h-5 w-5 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="text-amber-900 dark:text-amber-300 font-bold mb-2">Industry vs. Mathematical Definition</h4>
            <p className="text-amber-900/80 dark:text-amber-200 text-sm leading-relaxed mb-3">
              Mathematically, Big O is just an upper bound. If an algorithm is strictly <code>O(n)</code>, mathematically it is also <code>O(n²)</code> and <code>O(n³)</code>. 
            </p>
            <p className="text-amber-900/80 dark:text-amber-200 text-sm leading-relaxed">
              <strong>In industry / interviews</strong>, when asked for Big O (or "order of"), you are expected to provide the <em>tightest</em> upper bound (the minimum bounding order).
            </p>
          </div>
        </div>
      </div>

      </div>
  );
}