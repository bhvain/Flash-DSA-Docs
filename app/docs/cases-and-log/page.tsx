import { ArrowLeft, ArrowRight, Activity, Target, HelpCircle, HardDrive, Cpu, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CasesAndLogDocs() {
  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2">Algorithm Analysis</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Algorithm Cases, Log & Space
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Learn how algorithms perform in their best, worst, and expected scenarios, understand the intuition behind Log(n), and explore Space Complexity.
        </p>
      </div>

      <div className="space-y-12">
        {/* Cases */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mr-3">
              <Activity className="h-5 w-5" />
            </div>
            Best, Worst, and Expected Cases
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            In the life of an algorithm, sometimes it gets "lucky" (finds the answer immediately), and sometimes it is extremely "unlucky" (has to work till the very end). We evaluate algorithms based on these scenarios.
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2 text-green-700">Best Case</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                The minimum time required for program execution. If you are linearly searching an array and the element is at the very first index, the algorithm finishes in 1 comparison.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-semibold inline-block">
                Linear Search Best Case: <span className="text-green-600 ml-1">O(1)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2 text-red-700">Worst Case</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                The maximum time required for program execution. If you are searching an array and the element is at the very end, or not present at all, the algorithm must check every single element. <strong>We focus on the Worst Case the most</strong> because it tells us the algorithm's guaranteed performance limit.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-950 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-semibold inline-block">
                Linear Search Worst Case: <span className="text-red-600 ml-1">O(n)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2 text-blue-700">Average / Expected Case</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                The average time required across all possible inputs. Calculated mathematically as: <br/>
                <code>(Sum of all possible run times) / (Total number of possibilities)</code><br/>
                While precise calculations can be complex for intricate algorithms, for linear search it mathematically averages out to <span className="font-mono">O(n)</span>.
              </p>
            </div>
          </div>
        </div>

        {/* The Intuition of Log(n) */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mr-3">
              <Target className="h-5 w-5" />
            </div>
            Binary Search & The Intuition of Log(n)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Imagine a "cunning" algorithm (Binary Search) looking for a number in a <strong>sorted array</strong>. Instead of checking one-by-one, it checks the middle element. If the target is smaller, it discards the right half. It keeps <strong>halving</strong> the array until it finds the number.
          </p>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-5 rounded-xl mb-6 shadow-sm">
            <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">What is Log(n)?</h4>
            <p className="text-purple-900/80 dark:text-purple-200 text-sm leading-relaxed mb-3">
              The question "How many times can you halve a number <code className="font-mono bg-purple-100 dark:bg-purple-900/40 px-1 rounded">n</code> until it becomes 1?" is exactly what Logarithm base 2 represents.
            </p>
            <ul className="list-disc pl-5 text-sm text-purple-900/80 dark:text-purple-200 space-y-1">
              <li>How many times can you halve 8? (8 &rarr; 4 &rarr; 2 &rarr; 1). Answer: <strong>3 times</strong>. So, Log₂(8) = 3.</li>
              <li>How many times can you halve 16? (16 &rarr; 8 &rarr; 4 &rarr; 2 &rarr; 1). Answer: <strong>4 times</strong>. So, Log₂(16) = 4.</li>
              <li>How many times can you halve 100? Approx 6-7 times. Log₂(100) ≈ 6.64.</li>
            </ul>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Even for a massive array size, you can only halve it so many times. This means <strong>O(log n) grows incredibly slowly</strong>, making it a highly desirable time complexity for scalable systems.
          </p>
        </div>

        {/* Space Complexity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center">
            <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg mr-3">
              <HardDrive className="h-5 w-5" />
            </div>
            Space Complexity
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Time is not the only resource. If an algorithm fills up your RAM, it's not a good algorithm. Space complexity measures how memory consumption grows with the input size.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-4 rounded-xl shadow-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-3 shrink-0"></div>
              <div>
                <strong className="text-gray-900 dark:text-gray-100 block mb-1">Creating Data Structures</strong>
                <span className="text-sm text-gray-600 dark:text-gray-400">If your algorithm creates a new array of size <code>n</code>, its space complexity is <strong className="text-emerald-700 dark:text-emerald-400">O(n)</strong>.</span>
              </div>
            </li>
            <li className="flex items-start bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-4 rounded-xl shadow-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 mr-3 shrink-0"></div>
              <div>
                <strong className="text-gray-900 dark:text-gray-100 block mb-1">Recursive Call Stacks</strong>
                <span className="text-sm text-gray-600 dark:text-gray-400">If a function (like calculating factorial) calls itself recursively <code>n</code> times, it creates <code>n</code> activation records (Stack Frames) in memory simultaneously. Therefore, its space complexity is also <strong className="text-emerald-700 dark:text-emerald-400">O(n)</strong>.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Interview Tip */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl flex gap-4 items-start">
          <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg shrink-0 mt-1">
            <HelpCircle className="h-5 w-5 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="text-amber-900 dark:text-amber-300 font-bold mb-2">Interview Q: Why not measure in seconds?</h4>
            <p className="text-amber-900/80 dark:text-amber-200 text-sm leading-relaxed">
              If an interviewer asks, <em>"Why do we use asymptotic notations instead of just calculating how many seconds an algorithm takes to run?"</em>
            </p>
            <p className="text-amber-900/80 dark:text-amber-200 text-sm leading-relaxed mt-2">
              <strong>Answer:</strong> Hardware differences. A powerful supercomputer with 32GB RAM and an i9 processor will execute an algorithm much faster than a Raspberry Pi. Asymptotic analysis measures the <strong>growth rate</strong> (how the time scales relative to input size), which remains mathematically consistent regardless of the underlying hardware device.
            </p>
          </div>
        </div>

      </div>

      </div>
  );
}