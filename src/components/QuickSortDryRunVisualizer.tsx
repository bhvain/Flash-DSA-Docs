'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitFork, CheckCircle, ArrowRight, CornerDownRight, RefreshCw } from 'lucide-react';

interface RecursionNode {
  callId: string;
  low: number;
  high: number;
  subArray: number[];
  pivotChosen: number;
  partitionIndex: number;
  resultingArray: number[];
  description: string;
  isBaseCase?: boolean;
}

const RECURSION_STEPS: {
  step: number;
  title: string;
  activeNode: string;
  currentArray: number[];
  activeSubarrayRange: [number, number];
  pivotIndex: number;
  codeSnippet: string;
  explanation: string;
}[] = [
  {
    step: 1,
    title: "Root Call: quickSort(A, 0, 4)",
    activeNode: "root",
    currentArray: [3, 5, 2, 13, 12],
    activeSubarrayRange: [0, 4],
    pivotIndex: 0,
    codeSnippet: "partition(A, 0, 4) -> returns 1",
    explanation: "low = 0, high = 4. Pivot = A[0] = 3. Pointer i searches for > 3 (stops at 5), pointer j searches for <= 3 (stops at 2). They swap (5 <-> 2). Pointers cross. Final swap replaces pivot 3 with 2. 3 settles at index 1."
  },
  {
    step: 2,
    title: "Left Subtree: quickSort(A, 0, 0)",
    activeNode: "left-root",
    currentArray: [2, 3, 5, 13, 12],
    activeSubarrayRange: [0, 0],
    pivotIndex: 0,
    codeSnippet: "if (low < high) -> 0 < 0 is FALSE",
    explanation: "low = 0, high = 0. Range has only 1 element ([2]). Base condition (low < high) fails. This subarray is already sorted. Return immediately."
  },
  {
    step: 3,
    title: "Right Subtree: quickSort(A, 2, 4)",
    activeNode: "right-root",
    currentArray: [2, 3, 5, 13, 12],
    activeSubarrayRange: [2, 4],
    pivotIndex: 2,
    codeSnippet: "partition(A, 2, 4) -> returns 2",
    explanation: "low = 2, high = 4. Subarray is [5, 13, 12]. Pivot = A[2] = 5. Pointer i stops at 13 (>5), pointer j stops at 5 (<=5). Pointers cross immediately. Swap pivot 5 with itself at index 2. 5 settles at index 2."
  },
  {
    step: 4,
    title: "Right-Right Subtree: quickSort(A, 3, 4)",
    activeNode: "right-right",
    currentArray: [2, 3, 5, 13, 12],
    activeSubarrayRange: [3, 4],
    pivotIndex: 3,
    codeSnippet: "partition(A, 3, 4) -> returns 4",
    explanation: "low = 3, high = 4. Subarray is [13, 12]. Pivot = A[3] = 13. Pointer i stops at end, pointer j stops at 12 (<=13). Pointers cross. Swap pivot 13 with 12 at index 4. 13 settles at index 4."
  },
  {
    step: 5,
    title: "Final Subarray: quickSort(A, 3, 3)",
    activeNode: "right-right-left",
    currentArray: [2, 3, 5, 12, 13],
    activeSubarrayRange: [3, 3],
    pivotIndex: 3,
    codeSnippet: "if (low < high) -> 3 < 3 is FALSE",
    explanation: "Single element [12]. Base case reached. All recursive calls return up the call stack. The entire array is fully sorted: [2, 3, 5, 12, 13]!"
  }
];

export default function QuickSortDryRunVisualizer() {
  const [activeStep, setActiveStep] = useState(1);
  const current = RECURSION_STEPS[activeStep - 1];

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Divide-and-Conquer Recursion Tree Tracing
            </h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tracking recursive <code className="font-mono text-purple-600 dark:text-purple-400">quickSort(A, low, high)</code> on <code className="font-mono">[3, 5, 2, 13, 12]</code>
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {RECURSION_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeStep === s.step
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Tree Flow Chart */}
        <div className="lg:col-span-5 bg-gray-50/80 dark:bg-gray-900/40 rounded-xl p-4 border border-gray-200 dark:border-gray-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>Recursion Stack</span>
            <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 font-bold">low &lt; high Check</span>
          </h4>

          {/* Root */}
          <div className={`p-3 rounded-lg border text-xs font-mono transition-all ${
            current.activeNode === 'root'
              ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 ring-2 ring-purple-300 shadow-sm'
              : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
          }`}>
            <div className="font-bold flex items-center justify-between">
              <span>quickSort(A, 0, 4)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-200/60 dark:bg-purple-900/60">pIndex = 1</span>
            </div>
          </div>

          <div className="pl-4 border-l-2 border-dashed border-gray-300 dark:border-gray-700 space-y-3 ml-4">
            
            {/* Left Branch */}
            <div className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
              current.activeNode === 'left-root'
                ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 ring-2 ring-purple-300 shadow-sm'
                : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <span>quickSort(A, 0, 0)</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">Base Case</span>
              </div>
            </div>

            {/* Right Branch */}
            <div className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
              current.activeNode === 'right-root'
                ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 ring-2 ring-purple-300 shadow-sm'
                : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}>
              <div className="font-bold flex items-center justify-between">
                <span>quickSort(A, 2, 4)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-200/60 dark:bg-purple-900/60">pIndex = 2</span>
              </div>
            </div>

            <div className="pl-4 border-l-2 border-dashed border-gray-300 dark:border-gray-700 space-y-2 ml-4">
              <div className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                current.activeNode === 'right-right'
                  ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 ring-2 ring-purple-300 shadow-sm'
                  : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}>
                <div className="font-bold flex items-center justify-between">
                  <span>quickSort(A, 3, 4)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-200/60 dark:bg-purple-900/60">pIndex = 4</span>
                </div>
              </div>

              <div className={`p-2 rounded-lg border text-xs font-mono transition-all ${
                current.activeNode === 'right-right-left'
                  ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 ring-2 ring-purple-300 shadow-sm'
                  : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span>quickSort(A, 3, 3)</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">Base Case</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: State of Array & Step Details */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Visual Array State */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-3">
              Array State in Memory:
            </span>
            <div className="w-max mx-auto px-2 min-w-fit flex items-center gap-2">
              {current.currentArray.map((val, idx) => {
                const inActiveRange = idx >= current.activeSubarrayRange[0] && idx <= current.activeSubarrayRange[1];
                const isPivot = idx === current.pivotIndex;

                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <motion.div
                      layout
                      className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 font-mono font-bold text-base transition-all ${
                        inActiveRange
                          ? isPivot
                            ? 'bg-purple-100 border-purple-500 text-purple-900 dark:bg-purple-950/80 dark:border-purple-500 dark:text-purple-200 ring-2 ring-purple-400/60 scale-105'
                            : 'bg-white border-blue-400 text-blue-900 dark:bg-gray-900 dark:border-blue-500 dark:text-blue-200 shadow-sm'
                          : 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-900/30 dark:border-gray-800/80 dark:text-gray-600'
                      }`}
                    >
                      {val}
                    </motion.div>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Card */}
          <div className="p-4 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-900 dark:text-purple-300">
                {current.title}
              </h4>
              <span className="text-xs font-mono font-bold bg-white dark:bg-gray-950 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                {current.codeSnippet}
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
              {current.explanation}
            </p>
          </div>

          {/* Step Button Controller */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Previous Call
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Call {activeStep} of {RECURSION_STEPS.length}
            </span>
            <button
              onClick={() => setActiveStep(Math.min(RECURSION_STEPS.length, activeStep + 1))}
              disabled={activeStep === RECURSION_STEPS.length}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white disabled:opacity-30 hover:bg-purple-700 transition-colors"
            >
              Next Call
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
