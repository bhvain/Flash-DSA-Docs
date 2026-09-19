'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Terminal, 
  Code2, 
  Bug, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  GitFork,
  Cpu
} from 'lucide-react';

interface VisualStep {
  stepIndex: number;
  callStack: string[];
  currentFunction: string;
  low: number;
  mid: number;
  high: number;
  i: number;
  j: number;
  k: number;
  arrayA: number[];
  arrayB: (number | null)[];
  activeLeftRange?: [number, number];
  activeRightRange?: [number, number];
  comparingIndices?: [number, number];
  copiedToIndex?: number;
  copyBackIndex?: number;
  codeLine: string;
  explanation: string;
  actionType: 'call' | 'base' | 'split' | 'compare' | 'copyLeft' | 'copyRight' | 'cleanup' | 'copyback' | 'return';
}

const PRESET_ARRAYS = [
  { name: 'Standard Unsorted [9, 14, 4, 8, 7, 5, 6]', array: [9, 14, 4, 8, 7, 5, 6] },
  { name: 'With Duplicates [9, 1, 4, 14, 4, 15, 6]', array: [9, 1, 4, 14, 4, 15, 6] },
  { name: 'Small Even Array [7, 15, 2, 8]', array: [7, 15, 2, 8] },
  { name: 'Reverse Sorted [12, 10, 8, 6, 4]', array: [12, 10, 8, 6, 4] },
];

export default function MergeSortCodeVisualizer() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [currentArray, setCurrentArray] = useState<number[]>(PRESET_ARRAYS[0].array);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(900);
  const [simulationMode, setSimulationMode] = useState<'normal' | 'bug_strictly_less' | 'bug_no_copyback'>('normal');

  // Generator for Merge Sort Steps
  const steps: VisualStep[] = useMemo(() => {
    const generated: VisualStep[] = [];
    const A = [...currentArray];
    const n = A.length;
    const B: (number | null)[] = new Array(n).fill(null);
    const callStack: string[] = [];

    // Helper to push step
    const addStep = (params: {
      currentFunction: string;
      low: number;
      mid: number;
      high: number;
      i: number;
      j: number;
      k: number;
      codeLine: string;
      explanation: string;
      actionType: VisualStep['actionType'];
      comparingIndices?: [number, number];
      copiedToIndex?: number;
      copyBackIndex?: number;
      activeLeftRange?: [number, number];
      activeRightRange?: [number, number];
    }) => {
      generated.push({
        stepIndex: generated.length + 1,
        callStack: [...callStack],
        arrayA: [...A],
        arrayB: [...B],
        ...params,
      });
    };

    // Simulated merge subroutine
    const simMerge = (low: number, mid: number, high: number) => {
      callStack.push(`merge(A, ${low}, ${mid}, ${high})`);
      let i = low;
      let j = mid + 1;
      let k = low;

      addStep({
        currentFunction: `merge(A, low=${low}, mid=${mid}, high=${high})`,
        low,
        mid,
        high,
        i,
        j,
        k,
        activeLeftRange: [low, mid],
        activeRightRange: [mid + 1, high],
        codeLine: 'initMerge',
        explanation: `merge(A, ${low}, ${mid}, ${high}): Initialized pointers i = low (${low}), j = mid + 1 (${mid + 1}), k = low (${low}). Auxiliary array B is ready.`,
        actionType: 'call',
      });

      // Comparison loop boundary
      const leftBound = simulationMode === 'bug_strictly_less' ? mid - 1 : mid;
      const rightBound = simulationMode === 'bug_strictly_less' ? high - 1 : high;

      while (i <= leftBound && j <= rightBound) {
        addStep({
          currentFunction: `merge(A, ${low}, ${mid}, ${high})`,
          low,
          mid,
          high,
          i,
          j,
          k,
          activeLeftRange: [low, mid],
          activeRightRange: [mid + 1, high],
          comparingIndices: [i, j],
          codeLine: 'compare',
          explanation: `Comparing A[${i}] (${A[i]}) and A[${j}] (${A[j]}).`,
          actionType: 'compare',
        });

        if (A[i] <= A[j]) {
          B[k] = A[i];
          addStep({
            currentFunction: `merge(A, ${low}, ${mid}, ${high})`,
            low,
            mid,
            high,
            i: i + 1,
            j,
            k: k + 1,
            activeLeftRange: [low, mid],
            activeRightRange: [mid + 1, high],
            copiedToIndex: k,
            codeLine: 'copyLeft',
            explanation: `A[${i}] (${A[i]}) <= A[${j}] (${A[j]}). Copied A[${i}] into B[${k}]. Incremented i and k.`,
            actionType: 'copyLeft',
          });
          i++;
          k++;
        } else {
          B[k] = A[j];
          addStep({
            currentFunction: `merge(A, ${low}, ${mid}, ${high})`,
            low,
            mid,
            high,
            i,
            j: j + 1,
            k: k + 1,
            activeLeftRange: [low, mid],
            activeRightRange: [mid + 1, high],
            copiedToIndex: k,
            codeLine: 'copyRight',
            explanation: `A[${j}] (${A[j]}) < A[${i}] (${A[i]}). Copied A[${j}] into B[${k}]. Incremented j and k.`,
            actionType: 'copyRight',
          });
          j++;
          k++;
        }
      }

      // Cleanup left remaining
      while (i <= leftBound) {
        B[k] = A[i];
        addStep({
          currentFunction: `merge(A, ${low}, ${mid}, ${high})`,
          low,
          mid,
          high,
          i: i + 1,
          j,
          k: k + 1,
          activeLeftRange: [low, mid],
          activeRightRange: [mid + 1, high],
          copiedToIndex: k,
          codeLine: 'cleanupLeft',
          explanation: `Right subarray completed. Copying leftover A[${i}] (${A[i]}) to B[${k}].`,
          actionType: 'cleanup',
        });
        i++;
        k++;
      }

      // Cleanup right remaining
      while (j <= rightBound) {
        B[k] = A[j];
        addStep({
          currentFunction: `merge(A, ${low}, ${mid}, ${high})`,
          low,
          mid,
          high,
          i,
          j: j + 1,
          k: k + 1,
          activeLeftRange: [low, mid],
          activeRightRange: [mid + 1, high],
          copiedToIndex: k,
          codeLine: 'cleanupRight',
          explanation: `Left subarray completed. Copying leftover A[${j}] (${A[j]}) to B[${k}].`,
          actionType: 'cleanup',
        });
        j++;
        k++;
      }

      // Copy back loop from B to A (unless bug simulation is active)
      if (simulationMode !== 'bug_no_copyback') {
        for (let idx = low; idx <= high; idx++) {
          A[idx] = B[idx] as number;
          addStep({
            currentFunction: `merge(A, ${low}, ${mid}, ${high})`,
            low,
            mid,
            high,
            i,
            j,
            k,
            copyBackIndex: idx,
            codeLine: 'copyBack',
            explanation: `Copying sorted value B[${idx}] (${B[idx]}) back into original array A[${idx}].`,
            actionType: 'copyback',
          });
        }
      } else {
        addStep({
          currentFunction: `merge(A, ${low}, ${mid}, ${high})`,
          low,
          mid,
          high,
          i,
          j,
          k,
          codeLine: 'skipCopyBack',
          explanation: `[BUG TRIGGERED] Skipped copying elements from buffer B back into A! Array A remains unchanged in memory.`,
          actionType: 'return',
        });
      }

      callStack.pop();
    };

    // Recursive mergeSort
    const simMergeSort = (low: number, high: number) => {
      callStack.push(`mergeSort(A, ${low}, ${high})`);

      if (low < high) {
        const mid = Math.floor((low + high) / 2);

        addStep({
          currentFunction: `mergeSort(A, low=${low}, high=${high})`,
          low,
          mid,
          high,
          i: low,
          j: mid + 1,
          k: low,
          codeLine: 'calcMid',
          explanation: `mergeSort(A, ${low}, ${high}): low < high (${low} < ${high}) is TRUE. Calculated mid = (${low} + ${high}) / 2 = ${mid}.`,
          actionType: 'split',
        });

        // Left recursion
        simMergeSort(low, mid);

        // Right recursion
        simMergeSort(mid + 1, high);

        // Merge call
        simMerge(low, mid, high);
      } else {
        addStep({
          currentFunction: `mergeSort(A, low=${low}, high=${high})`,
          low,
          mid: low,
          high,
          i: low,
          j: low,
          k: low,
          codeLine: 'baseCase',
          explanation: `mergeSort(A, ${low}, ${high}): low >= high (${low} >= ${high}). Array of length 1 is already sorted. Returning immediately.`,
          actionType: 'base',
        });
      }

      callStack.pop();
    };

    // Initial state
    generated.push({
      stepIndex: 1,
      callStack: ['main()'],
      currentFunction: 'main()',
      low: 0,
      mid: Math.floor((n - 1) / 2),
      high: n - 1,
      i: 0,
      j: 0,
      k: 0,
      arrayA: [...A],
      arrayB: [...B],
      codeLine: 'mainStart',
      explanation: `Program starts in main(). Initial array size n = ${n}. Calling mergeSort(A, 0, ${n - 1}).`,
      actionType: 'call',
    });

    simMergeSort(0, n - 1);

    // Done step
    generated.push({
      stepIndex: generated.length + 1,
      callStack: ['main() -> return 0;'],
      currentFunction: 'main() completed',
      low: 0,
      mid: Math.floor((n - 1) / 2),
      high: n - 1,
      i: 0,
      j: 0,
      k: 0,
      arrayA: [...A],
      arrayB: [...B],
      codeLine: 'mainDone',
      explanation: `Merge Sort complete! Array A is now fully sorted. printArray(A, n) outputs the result.`,
      actionType: 'return',
    });

    return generated;
  }, [currentArray, simulationMode]);

  // Handle Preset Change
  const handlePresetSelect = (idx: number) => {
    setSelectedPreset(idx);
    setCurrentArray(PRESET_ARRAYS[idx].array);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Handle Custom Input
  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = customInput
      .split(/[\s,]+/)
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));

    if (parsed.length >= 2 && parsed.length <= 10) {
      setCurrentArray(parsed);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  };

  // Playback timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, playbackSpeed]);

  const step = steps[currentStepIndex] || steps[0];

  return (
    <div id="merge-sort-code-visualizer" className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Interactive C Execution Simulator: <code className="font-mono text-purple-600 dark:text-purple-400 text-xs">mergeSort() &amp; merge()</code>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Step through C code line by line, inspect variable bindings, pointer movements ($i, j, k$), auxiliary buffer $B[]$, and call stack recursion.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl flex-wrap">
          <button
            onClick={() => { setSimulationMode('normal'); setCurrentStepIndex(0); setIsPlaying(false); }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              simulationMode === 'normal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Normal (Correct)
          </button>

          <button
            onClick={() => { setSimulationMode('bug_strictly_less'); setCurrentStepIndex(0); setIsPlaying(false); }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              simulationMode === 'bug_strictly_less'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400'
            }`}
            title="Demonstrates what breaks when using `<` instead of `<=` in while loops"
          >
            <Bug className="w-3.5 h-3.5" /> Bug: Using &lt; instead of &le;
          </button>

          <button
            onClick={() => { setSimulationMode('bug_no_copyback'); setCurrentStepIndex(0); setIsPlaying(false); }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              simulationMode === 'bug_no_copyback'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
            title="Demonstrates what happens if you forget to copy merged elements from B back to A"
          >
            <Bug className="w-3.5 h-3.5" /> Bug: Missing Copy-Back
          </button>
        </div>
      </div>

      {/* Preset and Custom Input Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-gray-50/70 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-200 dark:border-gray-800 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Preset Array:</span>
          {PRESET_ARRAYS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => handlePresetSelect(idx)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedPreset === idx && customInput === ''
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {p.name.split('[')[0].trim()}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <form onSubmit={handleApplyCustom} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="e.g. 8, 3, 5, 1"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs w-32 sm:w-36 focus:ring-1 focus:ring-purple-500 font-mono"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Narrative Status Card */}
      <div className={`p-4 rounded-xl mb-6 border transition-all ${
        simulationMode !== 'normal'
          ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200'
          : 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/40 text-purple-950 dark:text-purple-200'
      }`}>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
            {simulationMode !== 'normal' ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Bug Simulation Active &bull; Step {currentStepIndex + 1} of {steps.length}
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                Execution Step {currentStepIndex + 1} of {steps.length}
              </>
            )}
          </span>
          <span className="text-xs font-mono font-bold">
            low = {step.low}, mid = {step.mid}, high = {step.high}
          </span>
        </div>
        <p className="text-xs leading-relaxed opacity-90">
          {step.explanation}
        </p>
      </div>

      {/* Main Visual Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        
        {/* Left 8 Cols: Array & Memory Buffers */}
        <div className="lg:col-span-8 space-y-6 bg-gray-50/60 dark:bg-gray-900/40 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
          
          {/* Main Array A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Original Array <code className="font-mono text-purple-600 dark:text-purple-400">A[]</code>
                {step.activeLeftRange && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-normal">
                    Left: [{step.activeLeftRange[0]}..{step.activeLeftRange[1]}]
                  </span>
                )}
                {step.activeRightRange && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-normal">
                    Right: [{step.activeRightRange[0]}..{step.activeRightRange[1]}]
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-gray-400">n = {step.arrayA.length}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {step.arrayA.map((val, idx) => {
                const isI = idx === step.i && step.actionType !== 'copyback' && step.actionType !== 'return';
                const isJ = idx === step.j && step.actionType !== 'copyback' && step.actionType !== 'return';
                const isComparing = step.comparingIndices?.includes(idx);
                const isCopyingBack = step.copyBackIndex === idx;
                const isInSubarray = idx >= step.low && idx <= step.high;

                return (
                  <div key={`A-${idx}`} className="flex flex-col items-center gap-1 shrink-0 w-11 sm:w-13">
                    {/* Top Pointer Flag */}
                    <div className="h-5 flex items-center justify-center">
                      {isCopyingBack ? (
                        <span className="text-[9px] font-mono font-extrabold px-1 py-0.2 rounded bg-emerald-600 text-white animate-bounce">
                          &darr; A[i]=B[i]
                        </span>
                      ) : isI ? (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                          i &darr;
                        </span>
                      ) : isJ ? (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-amber-600 text-white shadow-xs">
                          j &darr;
                        </span>
                      ) : null}
                    </div>

                    {/* Array Cell */}
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                        isCopyingBack
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400 scale-105 shadow-md'
                          : isComparing
                          ? 'bg-purple-100 dark:bg-purple-950 border-purple-500 text-purple-900 dark:text-purple-200 ring-2 ring-purple-300 scale-105'
                          : isI
                          ? 'bg-blue-100 dark:bg-blue-950 border-blue-500 text-blue-950 dark:text-blue-200 shadow-xs'
                          : isJ
                          ? 'bg-amber-100 dark:bg-amber-950 border-amber-500 text-amber-950 dark:text-amber-200 shadow-xs'
                          : isInSubarray
                          ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200'
                          : 'bg-gray-100/50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 text-gray-400 opacity-50'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[8px] text-gray-400 font-normal">A[{idx}]</span>
                    </div>

                    {/* Index Subtext */}
                    <div className="h-4 flex items-center justify-center text-[9px] text-gray-400 font-mono">
                      {idx === step.low && idx === step.high ? 'l,h' : idx === step.low ? 'low' : idx === step.high ? 'high' : idx === step.mid ? 'mid' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Auxiliary Buffer Array B */}
          <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                Auxiliary Buffer <code className="font-mono text-purple-700 dark:text-purple-300">B[]</code>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-normal">
                  (Temporary staging area of size {step.arrayB.length})
                </span>
              </span>
              <span className="text-[11px] font-mono text-gray-400">Pointer k = {step.k}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {step.arrayB.map((val, idx) => {
                const isK = idx === step.k && step.actionType !== 'copyback' && step.actionType !== 'return';
                const isCopiedHere = step.copiedToIndex === idx;
                const isCopyingFromHere = step.copyBackIndex === idx;

                return (
                  <div key={`B-${idx}`} className="flex flex-col items-center gap-1 shrink-0 w-11 sm:w-13">
                    {/* Top Pointer Flag */}
                    <div className="h-5 flex items-center justify-center">
                      {isK && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-purple-600 text-white shadow-xs">
                          k &darr;
                        </span>
                      )}
                    </div>

                    {/* Buffer Cell */}
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                        isCopyingFromHere
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                          : isCopiedHere
                          ? 'bg-purple-200 dark:bg-purple-900 border-purple-600 text-purple-950 dark:text-white ring-2 ring-purple-400 scale-105 shadow-sm'
                          : val !== null
                          ? 'bg-purple-100/60 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200'
                          : 'bg-dashed bg-gray-100/40 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800 text-gray-400 opacity-60'
                      }`}
                    >
                      <span>{val !== null ? val : '·'}</span>
                      <span className="text-[8px] text-gray-400 font-normal">B[{idx}]</span>
                    </div>

                    <div className="h-4" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulated Terminal Output */}
          <div className="p-3 bg-gray-950 rounded-xl border border-gray-800 font-mono text-[11px] text-gray-300 space-y-1">
            <div className="flex items-center justify-between text-gray-500 border-b border-gray-800 pb-1 text-[10px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-emerald-400" />
                Console Output (stdout)
              </span>
              <span>gcc 59_mergesort.c</span>
            </div>
            <div className="pt-1 text-gray-400">
              $ ./a.out
            </div>
            <div>
              Original Array:&nbsp;
              <span className="text-gray-300">
                {currentArray.join(' ')}
              </span>
            </div>
            {step.actionType === 'return' && currentStepIndex === steps.length - 1 ? (
              <div className="text-emerald-400 font-bold">
                Sorted Array:&nbsp;
                <span>{step.arrayA.join(' ')}</span>
              </div>
            ) : (
              <div className="text-gray-500 italic">
                [Sorting in progress... Current A[]: {step.arrayA.join(' ')}]
              </div>
            )}
          </div>

        </div>

        {/* Right 4 Cols: Active Code & Call Stack */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active C Code Pane */}
          <div className="bg-gray-900 rounded-2xl p-4 text-xs font-mono text-gray-300 space-y-2 border border-gray-800 shadow-inner">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
              <span className="font-bold text-purple-400 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> Active C Execution
              </span>
              <span className="text-[10px] text-gray-500">C99</span>
            </div>

            <div className="space-y-1 text-[11px] leading-relaxed max-h-64 overflow-y-auto pr-1">
              {/* Function mergeSort snippet */}
              <div className="text-gray-500 font-sans text-[10px] uppercase font-bold pt-1">{'// --- mergeSort() ---'}</div>
              <div className={`p-1 rounded ${step.codeLine === 'baseCase' ? 'bg-amber-900/60 text-amber-200 font-bold border-l-2 border-amber-400 pl-2' : ''}`}>
                if (low &lt; high) &#123;
              </div>
              <div className={`p-1 rounded pl-3 ${step.codeLine === 'calcMid' ? 'bg-purple-900/60 text-purple-200 font-bold border-l-2 border-purple-400 pl-4' : ''}`}>
                &nbsp;&nbsp;mid = (low + high) / 2;
              </div>
              <div className="pl-3 text-gray-400">
                &nbsp;&nbsp;mergeSort(A, low, mid);
              </div>
              <div className="pl-3 text-gray-400">
                &nbsp;&nbsp;mergeSort(A, mid + 1, high);
              </div>
              <div className="pl-3 text-gray-400">
                &nbsp;&nbsp;merge(A, low, mid, high);
              </div>
              <div>&#125;</div>

              {/* Function merge snippet */}
              <div className="text-gray-500 font-sans text-[10px] uppercase font-bold pt-2">{'// --- merge() ---'}</div>
              <div className={`p-1 rounded ${step.codeLine === 'initMerge' ? 'bg-purple-900/60 text-purple-200 font-bold border-l-2 border-purple-400 pl-2' : ''}`}>
                i = low; j = mid + 1; k = low;
              </div>
              <div className={`p-1 rounded ${step.codeLine === 'compare' ? 'bg-purple-900/60 text-purple-200 font-bold border-l-2 border-purple-400 pl-2' : ''}`}>
                while (i &lt;= mid &amp;&amp; j &lt;= high) &#123;
              </div>
              <div className={`p-1 rounded pl-3 ${step.codeLine === 'copyLeft' ? 'bg-blue-900/60 text-blue-200 font-bold border-l-2 border-blue-400 pl-4' : ''}`}>
                &nbsp;&nbsp;if (A[i] &lt;= A[j]) B[k++] = A[i++];
              </div>
              <div className={`p-1 rounded pl-3 ${step.codeLine === 'copyRight' ? 'bg-amber-900/60 text-amber-200 font-bold border-l-2 border-amber-400 pl-4' : ''}`}>
                &nbsp;&nbsp;else B[k++] = A[j++];
              </div>
              <div>&#125;</div>
              <div className={`p-1 rounded ${step.codeLine === 'cleanupLeft' ? 'bg-blue-900/60 text-blue-200 font-bold border-l-2 border-blue-400 pl-2' : ''}`}>
                while (i &lt;= mid) B[k++] = A[i++];
              </div>
              <div className={`p-1 rounded ${step.codeLine === 'cleanupRight' ? 'bg-amber-900/60 text-amber-200 font-bold border-l-2 border-amber-400 pl-2' : ''}`}>
                while (j &lt;= high) B[k++] = A[j++];
              </div>
              <div className={`p-1 rounded ${step.codeLine === 'copyBack' ? 'bg-emerald-900/60 text-emerald-200 font-bold border-l-2 border-emerald-400 pl-2' : ''}`}>
                for (int i=low; i&lt;=high; i++) A[i] = B[i];
              </div>
              {step.codeLine === 'skipCopyBack' && (
                <div className="p-1 rounded bg-rose-900/80 text-rose-200 font-bold border-l-2 border-rose-400 pl-2">
                  {'// [BUG: MISSING COPY BACK]'}
                </div>
              )}
            </div>
          </div>

          {/* Call Stack Visualizer */}
          <div className="bg-gray-900 rounded-2xl p-4 text-xs font-mono text-gray-300 space-y-2 border border-gray-800 shadow-inner">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
              <span className="font-bold text-purple-400 flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" /> Call Stack (LIFO)
              </span>
              <span className="text-[10px] text-gray-500">Depth: {step.callStack.length}</span>
            </div>

            <div className="space-y-1.5 pt-1 max-h-40 overflow-y-auto">
              {step.callStack.length === 0 ? (
                <div className="text-gray-500 text-center py-2 italic text-[11px]">Stack Empty</div>
              ) : (
                step.callStack.map((call, idx) => (
                  <div
                    key={idx}
                    className={`p-1.5 rounded text-[11px] border-l-2 ${
                      idx === step.callStack.length - 1
                        ? 'bg-purple-900/70 border-purple-400 text-purple-200 font-bold shadow-xs'
                        : 'bg-gray-800/40 border-gray-600 text-gray-400'
                    }`}
                  >
                    {call}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Control Buttons & Playback Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Play Simulation
              </>
            )}
          </button>

          <button
            onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
            disabled={currentStepIndex === 0 || isPlaying}
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentStepIndex((p) => Math.min(steps.length - 1, p + 1))}
            disabled={currentStepIndex >= steps.length - 1 || isPlaying}
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Speed:</span>
          {[
            { label: '0.5x', speed: 1400 },
            { label: '1x', speed: 900 },
            { label: '2x', speed: 450 },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setPlaybackSpeed(s.speed)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                playbackSpeed === s.speed
                  ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
