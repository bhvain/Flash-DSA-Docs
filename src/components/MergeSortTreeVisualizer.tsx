'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitFork, ArrowDown, ArrowUp, Sparkles, RotateCcw, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface TreeStep {
  stepNum: number;
  title: string;
  actionType: 'divide' | 'base' | 'merge' | 'complete';
  desc: string;
  callStack: string[];
  activeNodeIds: string[];
  treeState: {
    id: string;
    label: string;
    values: number[];
    isMerged?: boolean;
    isActive?: boolean;
    isBase?: boolean;
  }[];
}

const TREE_PRESET_1: TreeStep[] = [
  {
    stepNum: 1,
    title: "1. Initial Call: mergeSort(A, 0, 3)",
    actionType: "divide",
    desc: "Start with full array [7, 1, 2, 8] (low = 0, high = 3). Calculate mid = (0 + 3)/2 = 1. Split into two halves: Left A[0..1] and Right A[2..3].",
    callStack: ["mergeSort(A, 0, 3) [mid = 1]"],
    activeNodeIds: ["root"],
    treeState: [
      { id: "root", label: "A[0..3]", values: [7, 1, 2, 8], isActive: true },
    ]
  },
  {
    stepNum: 2,
    title: "2. Recurse Left: mergeSort(A, 0, 1)",
    actionType: "divide",
    desc: "Process left subarray [7, 1] (low = 0, high = 1). Calculate mid = (0 + 1)/2 = 0. Split into A[0..0] and A[1..1].",
    callStack: [
      "mergeSort(A, 0, 3) [waiting]",
      "mergeSort(A, 0, 1) [mid = 0]"
    ],
    activeNodeIds: ["left-branch"],
    treeState: [
      { id: "root", label: "A[0..3]", values: [7, 1, 2, 8] },
      { id: "left-branch", label: "A[0..1]", values: [7, 1], isActive: true },
    ]
  },
  {
    stepNum: 3,
    title: "3. Base Cases: mergeSort(A, 0, 0) & mergeSort(A, 1, 1)",
    actionType: "base",
    desc: "Subarrays of size 1: [7] and [1]. Since low >= high, the base condition (low < high) is FALSE. Single elements are already sorted!",
    callStack: [
      "mergeSort(A, 0, 3) [waiting]",
      "mergeSort(A, 0, 1) [waiting]",
      "mergeSort(A, 0, 0) [Base: Return]",
      "mergeSort(A, 1, 1) [Base: Return]"
    ],
    activeNodeIds: ["leaf-0", "leaf-1"],
    treeState: [
      { id: "root", label: "A[0..3]", values: [7, 1, 2, 8] },
      { id: "left-branch", label: "A[0..1]", values: [7, 1] },
      { id: "leaf-0", label: "A[0..0]", values: [7], isBase: true, isActive: true },
      { id: "leaf-1", label: "A[1..1]", values: [1], isBase: true, isActive: true },
    ]
  },
  {
    stepNum: 4,
    title: "4. Merge Left Halves: merge(A, 0, 0, 1)",
    actionType: "merge",
    desc: "Merge sorted atomic elements [7] and [1] into subarray A[0..1]. Result is now sorted: [1, 7]. mergeSort(A, 0, 1) completes.",
    callStack: [
      "mergeSort(A, 0, 3) [waiting]",
      "merge(A, 0, 0, 1) -> Returns [1, 7]"
    ],
    activeNodeIds: ["left-branch"],
    treeState: [
      { id: "root", label: "A[0..3]", values: [7, 1, 2, 8] },
      { id: "left-branch", label: "A[0..1] Merged", values: [1, 7], isMerged: true, isActive: true },
      { id: "leaf-0", label: "A[0..0]", values: [7], isBase: true },
      { id: "leaf-1", label: "A[1..1]", values: [1], isBase: true },
    ]
  },
  {
    stepNum: 5,
    title: "5. Recurse Right: mergeSort(A, 2, 3)",
    actionType: "divide",
    desc: "Process right subarray [2, 8] (low = 2, high = 3). Calculate mid = (2 + 3)/2 = 2. Split into A[2..2] ([2]) and A[3..3] ([8]).",
    callStack: [
      "mergeSort(A, 0, 3) [waiting]",
      "mergeSort(A, 2, 3) [mid = 2]"
    ],
    activeNodeIds: ["right-branch"],
    treeState: [
      { id: "root", label: "A[0..3]", values: [7, 1, 2, 8] },
      { id: "left-branch", label: "A[0..1] Merged", values: [1, 7], isMerged: true },
      { id: "right-branch", label: "A[2..3]", values: [2, 8], isActive: true },
      { id: "leaf-0", label: "A[0..0]", values: [7], isBase: true },
      { id: "leaf-1", label: "A[1..1]", values: [1], isBase: true },
    ]
  },
  {
    stepNum: 6,
    title: "6. Base Cases & Merge Right: merge(A, 2, 2, 3)",
    actionType: "merge",
    desc: "Atomic leaves [2] and [8] hit base cases, then merge together into [2, 8]. mergeSort(A, 2, 3) completes.",
    callStack: [
      "mergeSort(A, 0, 3) [waiting]",
      "merge(A, 2, 2, 3) -> Returns [2, 8]"
    ],
    activeNodeIds: ["right-branch", "leaf-2", "leaf-3"],
    treeState: [
      { id: "root", label: "A[0..3]", values: [7, 1, 2, 8] },
      { id: "left-branch", label: "A[0..1] Merged", values: [1, 7], isMerged: true },
      { id: "right-branch", label: "A[2..3] Merged", values: [2, 8], isMerged: true, isActive: true },
      { id: "leaf-0", label: "A[0..0]", values: [7], isBase: true },
      { id: "leaf-1", label: "A[1..1]", values: [1], isBase: true },
      { id: "leaf-2", label: "A[2..2]", values: [2], isBase: true },
      { id: "leaf-3", label: "A[3..3]", values: [8], isBase: true },
    ]
  },
  {
    stepNum: 7,
    title: "7. Final Conquer: merge(A, 0, 1, 3)",
    actionType: "complete",
    desc: "Final merge combining sorted left half [1, 7] and sorted right half [2, 8] back into A[0..3] -> [1, 2, 7, 8]. The entire array is sorted!",
    callStack: [
      "merge(A, 0, 1, 3) -> Finished!"
    ],
    activeNodeIds: ["root"],
    treeState: [
      { id: "root", label: "A[0..3] FINAL SORTED", values: [1, 2, 7, 8], isMerged: true, isActive: true },
      { id: "left-branch", label: "A[0..1] Merged", values: [1, 7], isMerged: true },
      { id: "right-branch", label: "A[2..3] Merged", values: [2, 8], isMerged: true },
      { id: "leaf-0", label: "A[0..0]", values: [7], isBase: true },
      { id: "leaf-1", label: "A[1..1]", values: [1], isBase: true },
      { id: "leaf-2", label: "A[2..2]", values: [2], isBase: true },
      { id: "leaf-3", label: "A[3..3]", values: [8], isBase: true },
    ]
  }
];

export default function MergeSortTreeVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = TREE_PRESET_1[currentStepIndex];

  const getNode = (id: string) => step.treeState.find((n) => n.id === id);

  return (
    <div id="merge-sort-tree-visualizer" className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <GitFork className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Merge Sort Recursion Tree &amp; Call Stack
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Visualizing top-down divide (<code className="font-mono text-blue-600">mid = (l+h)/2</code>) followed by bottom-up conquer (<code className="font-mono text-emerald-600">merge()</code>).
          </p>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-1.5 self-center">
          {TREE_PRESET_1.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                currentStepIndex === idx
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Card */}
      <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-xl p-4 mb-6">
        <h4 className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-1">
          {step.title}
        </h4>
        <p className="text-xs text-purple-950/80 dark:text-purple-200/90 leading-relaxed">
          {step.desc}
        </p>
      </div>

      {/* Visual Canvas (Tree & Stack) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Tree Layout (8 cols) */}
        <div className="lg:col-span-8 bg-gray-50/60 dark:bg-gray-900/40 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center gap-6 overflow-x-auto">
          
          {/* Level 0: Root Node */}
          {getNode("root") && (
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Level 0: Initial Array</span>
              <div
                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  getNode("root")?.isActive
                    ? 'bg-purple-100 dark:bg-purple-950/80 border-purple-500 ring-2 ring-purple-300 shadow-md scale-105'
                    : getNode("root")?.isMerged
                    ? 'bg-emerald-100/70 dark:bg-emerald-950/70 border-emerald-500'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                }`}
              >
                <span className="text-[11px] font-mono font-bold text-gray-700 dark:text-gray-300">
                  {getNode("root")?.label}
                </span>
                <div className="flex items-center gap-1.5">
                  {getNode("root")?.values.map((v, i) => (
                    <span key={i} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-mono font-bold text-xs text-gray-800 dark:text-gray-200">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Connectors to Level 1 */}
          {(getNode("left-branch") || getNode("right-branch")) && (
            <div className="flex items-center justify-around w-full max-w-sm text-gray-400 text-xs">
              <span className="flex items-center gap-1">&swarr; Divide Left</span>
              <span className="flex items-center gap-1">Divide Right &searr;</span>
            </div>
          )}

          {/* Level 1: Left and Right Halves */}
          <div className="flex items-center justify-around w-full max-w-md gap-4">
            
            {/* Left Branch */}
            {getNode("left-branch") ? (
              <div
                className={`p-2.5 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                  getNode("left-branch")?.isActive
                    ? 'bg-blue-100 dark:bg-blue-950/80 border-blue-500 ring-2 ring-blue-300 shadow-md scale-105'
                    : getNode("left-branch")?.isMerged
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-gray-600 dark:text-gray-400">
                  {getNode("left-branch")?.label}
                </span>
                <div className="flex items-center gap-1">
                  {getNode("left-branch")?.values.map((v, i) => (
                    <span key={i} className="w-7 h-7 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-mono font-bold text-xs">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-24 h-14 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl opacity-30" />
            )}

            {/* Right Branch */}
            {getNode("right-branch") ? (
              <div
                className={`p-2.5 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                  getNode("right-branch")?.isActive
                    ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 ring-2 ring-amber-300 shadow-md scale-105'
                    : getNode("right-branch")?.isMerged
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-gray-600 dark:text-gray-400">
                  {getNode("right-branch")?.label}
                </span>
                <div className="flex items-center gap-1">
                  {getNode("right-branch")?.values.map((v, i) => (
                    <span key={i} className="w-7 h-7 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-mono font-bold text-xs">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-24 h-14 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl opacity-30" />
            )}

          </div>

          {/* Level 2: Atomic Base Cases */}
          {getNode("leaf-0") && (
            <div className="w-full flex flex-col items-center gap-1 pt-2 border-t border-gray-200 dark:border-gray-800">
              <span className="text-[10px] uppercase font-bold text-gray-400">Level 2: Atomic Base Cases (1 element each)</span>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-2">
                {[
                  { id: "leaf-0", name: "A[0]" },
                  { id: "leaf-1", name: "A[1]" },
                  { id: "leaf-2", name: "A[2]" },
                  { id: "leaf-3", name: "A[3]" },
                ].map(({ id, name }) => {
                  const node = getNode(id);
                  if (!node) {
                    return <div key={id} className="w-12 h-12 border border-dashed border-gray-300 dark:border-gray-800 rounded-lg opacity-20" />;
                  }
                  return (
                    <div
                      key={id}
                      className={`p-2 rounded-lg border-2 flex flex-col items-center gap-0.5 transition-all ${
                        node.isActive
                          ? 'bg-purple-100 dark:bg-purple-950 border-purple-500 shadow-md ring-2 ring-purple-300 scale-105'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <span className="text-[9px] font-mono text-gray-400">{name}</span>
                      <span className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono font-bold text-xs text-purple-700 dark:text-purple-300">
                        {node.values[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Call Stack & Recurrence Tracker (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Call Stack */}
          <div className="bg-gray-900 rounded-2xl p-4 text-xs font-mono text-gray-300 space-y-2 border border-gray-800 shadow-inner">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
              <span className="font-bold text-purple-400">Call Stack Tracker</span>
              <span>LIFO Stack</span>
            </div>

            <div className="space-y-1.5 pt-1">
              {step.callStack.map((call, idx) => (
                <div
                  key={idx}
                  className={`p-1.5 rounded text-[11px] border-l-2 ${
                    idx === step.callStack.length - 1
                      ? 'bg-purple-900/60 border-purple-400 text-purple-200 font-bold'
                      : 'bg-gray-800/40 border-gray-600 text-gray-400'
                  }`}
                >
                  {call}
                </div>
              ))}
            </div>
          </div>

          {/* Recurrence Relation Note */}
          <div className="bg-gray-50 dark:bg-gray-900/60 rounded-xl p-3.5 border border-gray-200 dark:border-gray-800 space-y-1 text-xs">
            <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Divide-and-Conquer Recurrence:
            </span>
            <p className="font-mono text-xs text-purple-700 dark:text-purple-300 pt-1">
              T(n) = 2T(n/2) + O(n)
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              By Master Theorem (Case 2): <strong className="text-emerald-600 dark:text-emerald-400">O(n log n)</strong> across all scenarios.
            </p>
          </div>

        </div>

      </div>

      {/* Stepper Footer Controls */}
      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Step {currentStepIndex + 1} of {TREE_PRESET_1.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
            disabled={currentStepIndex === 0}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentStepIndex((p) => Math.min(TREE_PRESET_1.length - 1, p + 1))}
            disabled={currentStepIndex === TREE_PRESET_1.length - 1}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white disabled:opacity-30 hover:bg-purple-700 transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>

    </div>
  );
}
