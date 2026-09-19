'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, AlertTriangle, Sparkles, ArrowDown, CornerDownRight, CheckCircle2 } from 'lucide-react';

export default function QuickSortWorstVsBestVisualizer() {
  const [activeTab, setActiveTab] = useState<'worst' | 'best'>('worst');
  const [worstStep, setWorstStep] = useState(1);
  const [bestLevel, setBestLevel] = useState(0);

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Worst-Case vs. Best-Case Partitioning Visualizer
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Compare degenerate linear recursion (O(n²)) against optimal balanced recursion (O(n log n)).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('worst')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'worst'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Worst Case: O(n²)
          </button>
          <button
            onClick={() => setActiveTab('best')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'best'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Best Case: O(n log n)
          </button>
        </div>
      </div>

      {activeTab === 'worst' ? (
        /* WORST CASE SECTION */
        <div className="space-y-6">
          <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl p-4">
            <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider mb-1">
              Why Sorted Array Triggers Worst-Case O(n²)
            </h4>
            <p className="text-xs text-rose-950/80 dark:text-rose-300/80 leading-relaxed">
              When the array <code className="font-mono bg-rose-100/80 dark:bg-rose-900/50 px-1 rounded">[1, 2, 4, 8, 12]</code> is already sorted and we pick <code className="font-mono">A[low]</code> as the pivot, the pivot is already the smallest element. Every partition produces an <strong>empty left subarray</strong> and an <strong>(n - 1) right subarray</strong>, requiring <code className="font-mono">n - 1</code> recursive levels!
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Recursive Partition Pass: {worstStep} of 4
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setWorstStep(s)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    worstStep === s
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Skewed Tree Visualization */}
          <div className="bg-gray-50/70 dark:bg-gray-900/40 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <div className="w-max mx-auto px-4 min-w-fit space-y-4">
              
              {/* Level 1 */}
              <div className={`p-3 rounded-xl border transition-all ${
                worstStep === 1
                  ? 'bg-white dark:bg-gray-950 border-rose-500 shadow-md ring-2 ring-rose-300 dark:ring-rose-900'
                  : 'bg-white/60 dark:bg-gray-950/60 border-gray-200 dark:border-gray-800 opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-gray-500 w-16">Level 1:</span>
                  <div className="flex items-center gap-1">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs flex items-center justify-center border border-purple-300 dark:border-purple-800">
                      1
                    </span>
                    <span className="text-xs text-gray-400">|</span>
                    <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 p-1 rounded-lg border border-rose-200 dark:border-rose-900/40">
                      {[2, 4, 8, 12].map(v => (
                        <span key={v} className="w-7 h-7 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono font-bold text-xs flex items-center justify-center border border-gray-200 dark:border-gray-700">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 ml-auto">Work: k₁·(5) comparisons</span>
                </div>
              </div>

              {/* Level 2 */}
              <div className={`ml-8 p-3 rounded-xl border transition-all ${
                worstStep === 2
                  ? 'bg-white dark:bg-gray-950 border-rose-500 shadow-md ring-2 ring-rose-300 dark:ring-rose-900'
                  : 'bg-white/60 dark:bg-gray-950/60 border-gray-200 dark:border-gray-800 opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-gray-500 w-16">Level 2:</span>
                  <div className="flex items-center gap-1">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs flex items-center justify-center border border-purple-300 dark:border-purple-800">
                      2
                    </span>
                    <span className="text-xs text-gray-400">|</span>
                    <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 p-1 rounded-lg border border-rose-200 dark:border-rose-900/40">
                      {[4, 8, 12].map(v => (
                        <span key={v} className="w-7 h-7 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono font-bold text-xs flex items-center justify-center border border-gray-200 dark:border-gray-700">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 ml-auto">Work: k₁·(4) comparisons</span>
                </div>
              </div>

              {/* Level 3 */}
              <div className={`ml-16 p-3 rounded-xl border transition-all ${
                worstStep === 3
                  ? 'bg-white dark:bg-gray-950 border-rose-500 shadow-md ring-2 ring-rose-300 dark:ring-rose-900'
                  : 'bg-white/60 dark:bg-gray-950/60 border-gray-200 dark:border-gray-800 opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-gray-500 w-16">Level 3:</span>
                  <div className="flex items-center gap-1">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs flex items-center justify-center border border-purple-300 dark:border-purple-800">
                      4
                    </span>
                    <span className="text-xs text-gray-400">|</span>
                    <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 p-1 rounded-lg border border-rose-200 dark:border-rose-900/40">
                      {[8, 12].map(v => (
                        <span key={v} className="w-7 h-7 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono font-bold text-xs flex items-center justify-center border border-gray-200 dark:border-gray-700">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 ml-auto">Work: k₁·(3) comparisons</span>
                </div>
              </div>

              {/* Level 4 */}
              <div className={`ml-24 p-3 rounded-xl border transition-all ${
                worstStep === 4
                  ? 'bg-white dark:bg-gray-950 border-rose-500 shadow-md ring-2 ring-rose-300 dark:ring-rose-900'
                  : 'bg-white/60 dark:bg-gray-950/60 border-gray-200 dark:border-gray-800 opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-gray-500 w-16">Level 4:</span>
                  <div className="flex items-center gap-1">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs flex items-center justify-center border border-purple-300 dark:border-purple-800">
                      8
                    </span>
                    <span className="text-xs text-gray-400">|</span>
                    <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 p-1 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
                      <span className="w-7 h-7 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-mono font-bold text-xs flex items-center justify-center border border-emerald-300">
                        12
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 ml-auto">Work: k₁·(2) comparisons</span>
                </div>
              </div>

            </div>
          </div>

          {/* Math Derivation Box */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Total Arithmetic Sum:
            </h5>
            <p className="font-mono text-xs text-gray-800 dark:text-gray-200">
              T(n) = (n) + (n - 1) + (n - 2) + ... + 2 + 1 = <strong className="text-rose-600 dark:text-rose-400">n(n + 1)/2 ≈ O(n²)</strong>
            </p>
          </div>
        </div>
      ) : (
        /* BEST CASE SECTION */
        <div className="space-y-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-4">
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-1">
              Balanced Binary Tree (Tree Height = log₂ n)
            </h4>
            <p className="text-xs text-emerald-950/80 dark:text-emerald-300/80 leading-relaxed">
              When each partition lands right at the midpoint, an array of size <code className="font-mono">n = 16</code> splits evenly into sub-problems of size 8 &amp; 7, then 4 &amp; 3, and so on. The recursion tree has depth <code className="font-mono">h = log₂ 16 = 4</code> levels, and each level processes <code className="font-mono">O(n)</code> total elements!
            </p>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Highlight Recursion Level: Level {bestLevel} (Height: log₂ 16 = 4)
            </span>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setBestLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    bestLevel === lvl
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Level {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Balanced Tree Diagram */}
          <div className="bg-gray-50/70 dark:bg-gray-900/40 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <div className="w-max mx-auto px-4 min-w-fit space-y-4 text-center">
              
              {/* Level 0 */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                bestLevel === 0
                  ? 'bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                  : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800'
              }`}>
                <span className="font-mono text-xs font-bold text-gray-900 dark:text-gray-100">
                  1 Subarray of size 16 → Work = 1 × (k₁·16) = <strong className="text-emerald-700 dark:text-emerald-300">k₁·n</strong>
                </span>
              </div>

              <div className="text-gray-400 flex justify-center">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Level 1 */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                bestLevel === 1
                  ? 'bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                  : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800'
              }`}>
                <div className="flex items-center justify-center gap-4">
                  <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-900">Subarray (size 8)</span>
                  <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-900">Subarray (size 7)</span>
                </div>
                <span className="block font-mono text-[11px] text-gray-600 dark:text-gray-400 mt-1.5">
                  2 Subarrays of size ≈ n/2 → Work = 2 × (k₁·n/2) = <strong className="text-emerald-700 dark:text-emerald-300">k₁·n</strong>
                </span>
              </div>

              <div className="text-gray-400 flex justify-center">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Level 2 */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                bestLevel === 2
                  ? 'bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                  : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900">size 4</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900">size 3</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900">size 3</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900">size 3</span>
                </div>
                <span className="block font-mono text-[11px] text-gray-600 dark:text-gray-400 mt-1.5">
                  4 Subarrays of size ≈ n/4 → Work = 4 × (k₁·n/4) = <strong className="text-emerald-700 dark:text-emerald-300">k₁·n</strong>
                </span>
              </div>

              <div className="text-gray-400 flex justify-center">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Level 3 */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                bestLevel === 3
                  ? 'bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                  : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800'
              }`}>
                <span className="font-mono text-xs font-bold text-gray-900 dark:text-gray-100">
                  8 Subarrays of size 1 (Base Case) → Work = 8 × (k₁·n/8) = <strong className="text-emerald-700 dark:text-emerald-300">k₁·n</strong>
                </span>
              </div>

            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Total Work Across log₂ n Levels:
            </h5>
            <p className="font-mono text-xs text-gray-800 dark:text-gray-200">
              Total Time = (Height of Tree) × (Work per Level) = (log₂ n) × (k₁·n) = <strong className="text-emerald-600 dark:text-emerald-400">O(n log n)</strong>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
