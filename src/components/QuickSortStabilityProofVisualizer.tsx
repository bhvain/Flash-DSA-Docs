'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowRight, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface StabilityStep {
  stepNum: number;
  title: string;
  desc: string;
  array: { val: number; tag: '2A' | '2B' | 'none'; color: string }[];
  iIndex?: number;
  jIndex?: number;
  pivotIndex: number;
  statusText: string;
}

const STABILITY_STEPS: StabilityStep[] = [
  {
    stepNum: 1,
    title: "Initial Array: 2 identical keys",
    desc: "We have two duplicate elements with value 2. Notice their initial order: 2A (Indigo) is at index 0, and 2B (Rose) is at index 4.",
    array: [
      { val: 2, tag: '2A', color: 'indigo' },
      { val: 8, tag: 'none', color: 'gray' },
      { val: 9, tag: 'none', color: 'gray' },
      { val: 12, tag: 'none', color: 'gray' },
      { val: 2, tag: '2B', color: 'rose' },
    ],
    iIndex: 1,
    jIndex: 4,
    pivotIndex: 0,
    statusText: "Pivot is 2A at index 0. Pointer i starts at index 1, Pointer j starts at index 4."
  },
  {
    stepNum: 2,
    title: "Pointer Scans",
    desc: "Pointer i searches for an element > pivot (stops at index 1 with value 8). Pointer j searches for an element <= pivot (stops at index 4 with value 2B).",
    array: [
      { val: 2, tag: '2A', color: 'indigo' },
      { val: 8, tag: 'none', color: 'gray' },
      { val: 9, tag: 'none', color: 'gray' },
      { val: 12, tag: 'none', color: 'gray' },
      { val: 2, tag: '2B', color: 'rose' },
    ],
    iIndex: 1,
    jIndex: 4,
    pivotIndex: 0,
    statusText: "Both targets found: A[1] = 8 (> 2) and A[4] = 2B (<= 2). Since i < j (1 < 4), swap A[1] and A[4]."
  },
  {
    stepNum: 3,
    title: "First Swap (A[i] with A[j])",
    desc: "8 and 2B swap places. 2B moves to index 1, and 8 moves to index 4.",
    array: [
      { val: 2, tag: '2A', color: 'indigo' },
      { val: 2, tag: '2B', color: 'rose' },
      { val: 9, tag: 'none', color: 'gray' },
      { val: 12, tag: 'none', color: 'gray' },
      { val: 8, tag: 'none', color: 'gray' },
    ],
    iIndex: 1,
    jIndex: 4,
    pivotIndex: 0,
    statusText: "Swap complete. Now pointers continue searching."
  },
  {
    stepNum: 4,
    title: "Advancing Pointers & Crossing",
    desc: "Pointer i advances until > 2 (stops at index 2 with value 9). Pointer j retreats until <= 2 (stops at index 1 with value 2B).",
    array: [
      { val: 2, tag: '2A', color: 'indigo' },
      { val: 2, tag: '2B', color: 'rose' },
      { val: 9, tag: 'none', color: 'gray' },
      { val: 12, tag: 'none', color: 'gray' },
      { val: 8, tag: 'none', color: 'gray' },
    ],
    iIndex: 2,
    jIndex: 1,
    pivotIndex: 0,
    statusText: "Pointers have crossed! j (index 1) <= i (index 2). Stop the pointer scan."
  },
  {
    stepNum: 5,
    title: "Final Pivot Swap with A[j]",
    desc: "Swap Pivot A[low] (2A at index 0) with A[j] (2B at index 1).",
    array: [
      { val: 2, tag: '2B', color: 'rose' },
      { val: 2, tag: '2A', color: 'indigo' },
      { val: 9, tag: 'none', color: 'gray' },
      { val: 12, tag: 'none', color: 'gray' },
      { val: 8, tag: 'none', color: 'gray' },
    ],
    pivotIndex: 1,
    statusText: "ORDER INVERTED! 2B (Rose) now appears BEFORE 2A (Indigo). QuickSort is UNSTABLE!"
  }
];

export default function QuickSortStabilityProofVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STABILITY_STEPS[currentStep];

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            Stability Proof: Why QuickSort is Unstable
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tracking two identical keys <span className="font-bold text-indigo-600 dark:text-indigo-400">2<sub className="font-mono">A</sub></span> and <span className="font-bold text-rose-600 dark:text-rose-400">2<sub className="font-mono">B</sub></span> across the partition procedure.
          </p>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-1.5 self-center">
          {STABILITY_STEPS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                currentStep === idx
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Card */}
      <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl p-4 mb-6">
        <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider mb-1">
          {step.title}
        </h4>
        <p className="text-xs text-rose-950/80 dark:text-rose-300/80 leading-relaxed">
          {step.desc}
        </p>
      </div>

      {/* Visual Canvas - Horizontal Responsive */}
      <div className="bg-gray-50/70 dark:bg-gray-900/40 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="w-max mx-auto px-4 min-w-fit flex flex-col items-center">
          <div className="flex items-center gap-2 sm:gap-4 py-4">
            {step.array.map((item, idx) => {
              const isI = idx === step.iIndex && currentStep < 4;
              const isJ = idx === step.jIndex && currentStep < 4;
              const isPivot = idx === step.pivotIndex;

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 w-14 sm:w-16">
                  
                  {/* Top Pointer */}
                  <div className="h-5 flex items-center justify-center">
                    {isI && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                        i
                      </span>
                    )}
                  </div>

                  {/* Element Box */}
                  <motion.div
                    layout
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center rounded-xl border-2 font-mono font-bold text-base transition-all ${
                      item.tag === '2A'
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-950 dark:bg-indigo-950/70 dark:border-indigo-500 dark:text-indigo-200 ring-2 ring-indigo-400/50 shadow-md'
                        : item.tag === '2B'
                        ? 'bg-rose-100 border-rose-500 text-rose-950 dark:bg-rose-950/70 dark:border-rose-500 dark:text-rose-200 ring-2 ring-rose-400/50 shadow-md'
                        : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span>{item.val}</span>
                    {item.tag !== 'none' && (
                      <span className="text-[10px] uppercase font-bold tracking-tight opacity-80">
                        {item.tag}
                      </span>
                    )}
                  </motion.div>

                  {/* Bottom Pointer */}
                  <div className="h-5 flex items-center justify-center">
                    {isJ && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-600 text-white shadow-xs">
                        j
                      </span>
                    )}
                    {isPivot && currentStep === 4 && (
                      <span className="text-[9px] font-extrabold px-1 py-0.5 rounded bg-emerald-600 text-white">
                        Pivot
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-gray-400">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          <strong className="text-rose-600 dark:text-rose-400 mr-1">Status:</strong>
          {step.statusText}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(STABILITY_STEPS.length - 1, currentStep + 1))}
            disabled={currentStep === STABILITY_STEPS.length - 1}
            className="px-3 py-1 text-xs font-semibold rounded-lg bg-rose-600 text-white disabled:opacity-30 hover:bg-rose-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Callout box inside visualizer */}
      {currentStep === 4 && (
        <div className="mt-4 p-3.5 bg-rose-100/70 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl flex items-center gap-2.5 text-xs text-rose-900 dark:text-rose-200 font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>
            <strong>Definitive Proof:</strong> In the original input, <code className="font-bold">2A</code> appeared at index 0 and <code className="font-bold">2B</code> appeared at index 4. In the partitioned result, <code className="font-bold">2B</code> precedes <code className="font-bold">2A</code>. Because relative order of duplicates is not preserved, QuickSort is <strong>UNSTABLE</strong>.
          </span>
        </div>
      )}

    </div>
  );
}
