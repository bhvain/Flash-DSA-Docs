'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Layers, ArrowDown, ArrowUp, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SingleMergeStep {
  i: number;
  j: number;
  k: number;
  low: number;
  mid: number;
  high: number;
  arrayA: number[];
  arrayB: (number | null)[];
  description: string;
  codeHighlight: string;
  comparing: boolean;
  phase: 'init' | 'compare' | 'cleanup' | 'copyback' | 'done';
  status: string;
  copyBackIndex?: number;
}

const PRESETS = [
  {
    name: 'Example 1: [7, 15 | 2, 8, 10]',
    array: [7, 15, 2, 8, 10],
    low: 0,
    mid: 1,
    high: 4,
  },
  {
    name: 'Example 2: [7, 8, 11 | 1, 2, 3]',
    array: [7, 8, 11, 1, 2, 3],
    low: 0,
    mid: 2,
    high: 5,
  },
  {
    name: 'Example 3: [12, 30 | 5, 18, 40]',
    array: [12, 30, 5, 18, 40],
    low: 0,
    mid: 1,
    high: 4,
  },
];

export default function SingleArrayMergeVisualizer() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [steps, setSteps] = useState<SingleMergeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);

  const generateSteps = (initialA: number[], low: number, mid: number, high: number) => {
    const generated: SingleMergeStep[] = [];
    const A = [...initialA];
    const B: (number | null)[] = new Array(high + 1).fill(null);
    let i = low;
    let j = mid + 1;
    let k = low;

    // 1. Initial State
    generated.push({
      i,
      j,
      k,
      low,
      mid,
      high,
      arrayA: [...A],
      arrayB: [...B],
      description: `Subarrays A[${low}..${mid}] (${JSON.stringify(A.slice(low, mid + 1))}) and A[${mid + 1}..${high}] (${JSON.stringify(A.slice(mid + 1, high + 1))}) are individually sorted. Initialized i = low (${low}), j = mid + 1 (${mid + 1}), k = low (${low}).`,
      codeHighlight: 'init',
      comparing: false,
      phase: 'init',
      status: `Pointers ready: i = ${i}, j = ${j}, k = ${k}`,
    });

    // 2. Comparison Loop
    while (i <= mid && j <= high) {
      generated.push({
        i,
        j,
        k,
        low,
        mid,
        high,
        arrayA: [...A],
        arrayB: [...B],
        description: `Comparing left element A[${i}] (${A[i]}) with right element A[${j}] (${A[j]}).`,
        codeHighlight: 'compare',
        comparing: true,
        phase: 'compare',
        status: `Evaluating: A[${i}] (${A[i]}) < A[${j}] (${A[j]})?`,
      });

      if (A[i] < A[j]) {
        B[k] = A[i];
        generated.push({
          i: i + 1,
          j,
          k: k + 1,
          low,
          mid,
          high,
          arrayA: [...A],
          arrayB: [...B],
          description: `A[${i}] (${A[i]}) is smaller. Store in auxiliary array B[${k}] = ${A[i]}. Increment i & k.`,
          codeHighlight: 'copyLeft',
          comparing: false,
          phase: 'compare',
          status: `Stored B[${k}] = ${A[i]}. Advanced i & k.`,
        });
        i++;
        k++;
      } else {
        B[k] = A[j];
        generated.push({
          i,
          j: j + 1,
          k: k + 1,
          low,
          mid,
          high,
          arrayA: [...A],
          arrayB: [...B],
          description: `A[${j}] (${A[j]}) is smaller. Store in auxiliary array B[${k}] = ${A[j]}. Increment j & k.`,
          codeHighlight: 'copyRight',
          comparing: false,
          phase: 'compare',
          status: `Stored B[${k}] = ${A[j]}. Advanced j & k.`,
        });
        j++;
        k++;
      }
    }

    // 3. Cleanup Left
    while (i <= mid) {
      B[k] = A[i];
      generated.push({
        i: i + 1,
        j,
        k: k + 1,
        low,
        mid,
        high,
        arrayA: [...A],
        arrayB: [...B],
        description: `Right subarray exhausted. Copying remaining left element A[${i}] (${A[i]}) into B[${k}].`,
        codeHighlight: 'cleanupLeft',
        comparing: false,
        phase: 'cleanup',
        status: `Left cleanup: B[${k}] = A[${i}].`,
      });
      i++;
      k++;
    }

    // 4. Cleanup Right
    while (j <= high) {
      B[k] = A[j];
      generated.push({
        i,
        j: j + 1,
        k: k + 1,
        low,
        mid,
        high,
        arrayA: [...A],
        arrayB: [...B],
        description: `Left subarray exhausted. Copying remaining right element A[${j}] (${A[j]}) into B[${k}].`,
        codeHighlight: 'cleanupRight',
        comparing: false,
        phase: 'cleanup',
        status: `Right cleanup: B[${k}] = A[${j}].`,
      });
      j++;
      k++;
    }

    // 5. Copy Back from B to A
    for (let cIdx = low; cIdx <= high; cIdx++) {
      A[cIdx] = B[cIdx] as number;
      generated.push({
        i,
        j,
        k,
        low,
        mid,
        high,
        arrayA: [...A],
        arrayB: [...B],
        description: `Copying sorted element B[${cIdx}] (${B[cIdx]}) back into the original array A[${cIdx}].`,
        codeHighlight: 'copyBack',
        comparing: false,
        phase: 'copyback',
        status: `Copy back: A[${cIdx}] = B[${cIdx}] (${B[cIdx]}).`,
        copyBackIndex: cIdx,
      });
    }

    // 6. Complete
    generated.push({
      i,
      j,
      k,
      low,
      mid,
      high,
      arrayA: [...A],
      arrayB: [...B],
      description: `Merge complete! Subarray A[${low}..${high}] is now completely merged and sorted in-place.`,
      codeHighlight: 'done',
      comparing: false,
      phase: 'done',
      status: 'Subarray Merged & Sorted Successfully!',
    });

    return generated;
  };

  useEffect(() => {
    const selected = PRESETS[presetIndex];
    const gen = generateSteps(selected.array, selected.low, selected.mid, selected.high);
    setSteps(gen);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [presetIndex]);

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

  const currentStep = steps[currentStepIndex] || {
    i: 0,
    j: 0,
    k: 0,
    low: 0,
    mid: 0,
    high: 0,
    arrayA: [],
    arrayB: [],
    description: '',
    codeHighlight: '',
    comparing: false,
    phase: 'init',
    status: '',
  };

  return (
    <div id="single-array-merge-visualizer" className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Single-Array Subarray Merge: <code className="font-mono text-purple-600 dark:text-purple-400 text-xs">merge(A, low, mid, high)</code>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Merges two sorted adjacent halves <span className="font-mono text-blue-600 dark:text-blue-400">A[low..mid]</span> and <span className="font-mono text-amber-600 dark:text-amber-400">A[mid+1..high]</span> using auxiliary array <span className="font-mono text-purple-600 dark:text-purple-400">B[]</span>.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl flex-wrap">
          {PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setPresetIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                presetIndex === idx
                  ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {p.name.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Card */}
      <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            Step {currentStepIndex + 1} of {steps.length} &bull; {currentStep.status}
          </span>
          <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
            low={currentStep.low}, mid={currentStep.mid}, high={currentStep.high}
          </span>
        </div>
        <p className="text-xs text-purple-950/80 dark:text-purple-200/90 leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      {/* Visual Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        
        {/* Canvas Left (8 cols) */}
        <div className="lg:col-span-8 space-y-6 bg-gray-50/60 dark:bg-gray-900/40 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
          
          {/* Original Array A with Halfway Split */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Original Array A[]
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-normal">
                  Left: [{currentStep.low}..{currentStep.mid}]
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-normal">
                  Right: [{currentStep.mid + 1}..{currentStep.high}]
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {currentStep.arrayA.map((val, idx) => {
                const isLeftHalf = idx <= currentStep.mid;
                const isCurrentI = idx === currentStep.i && currentStep.phase !== 'copyback' && currentStep.phase !== 'done';
                const isCurrentJ = idx === currentStep.j && currentStep.phase !== 'copyback' && currentStep.phase !== 'done';
                const isCopyingHere = currentStep.copyBackIndex === idx;

                return (
                  <div key={`A-${idx}`} className="flex flex-col items-center gap-1 shrink-0 w-12 sm:w-14">
                    {/* Top Pointer */}
                    <div className="h-5 flex items-center justify-center">
                      {isCurrentI && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                          i &darr;
                        </span>
                      )}
                      {isCurrentJ && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-amber-600 text-white shadow-xs">
                          j &darr;
                        </span>
                      )}
                      {isCopyingHere && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white shadow-xs animate-bounce">
                          &darr; A[i]=B[i]
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                        isCopyingHere
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400 shadow-md'
                          : isCurrentI
                          ? 'bg-blue-100 dark:bg-blue-950 border-blue-500 text-blue-950 dark:text-blue-200 shadow-md'
                          : isCurrentJ
                          ? 'bg-amber-100 dark:bg-amber-950 border-amber-500 text-amber-950 dark:text-amber-200 shadow-md'
                          : isLeftHalf
                          ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-gray-800 dark:text-gray-200'
                          : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[9px] text-gray-400 font-normal">A[{idx}]</span>
                    </div>

                    {/* Partition divider note */}
                    {idx === currentStep.mid && (
                      <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400">
                        mid
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Auxiliary Array B */}
          <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                Auxiliary Array B[] (Buffer of size high + 1)
              </span>
              <span className="text-[11px] font-mono text-gray-400">Pointer k = {currentStep.k}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {currentStep.arrayB.map((val, idx) => {
                const isCurrentK = idx === currentStep.k && currentStep.phase !== 'copyback' && currentStep.phase !== 'done';
                const isFilled = val !== null;
                const isCopyingFrom = currentStep.copyBackIndex === idx;

                return (
                  <div key={`B-${idx}`} className="flex flex-col items-center gap-1 shrink-0 w-12 sm:w-14">
                    {/* Top Pointer */}
                    <div className="h-5 flex items-center justify-center">
                      {isCurrentK && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-purple-600 text-white shadow-xs">
                          k &darr;
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                        isCopyingFrom
                          ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400'
                          : isFilled
                          ? 'bg-purple-100/70 dark:bg-purple-950/70 border-purple-400 dark:border-purple-700 text-purple-950 dark:text-purple-200'
                          : 'bg-dashed bg-gray-100/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-800 text-gray-400'
                      }`}
                    >
                      <span>{val !== null ? val : '·'}</span>
                      <span className="text-[9px] text-gray-400 font-normal">B[{idx}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Live Code Box (Right 4 cols) */}
        <div className="lg:col-span-4 bg-gray-900 rounded-2xl p-4 text-xs font-mono text-gray-300 space-y-2 border border-gray-800 shadow-inner">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
            <span className="font-bold text-purple-400">merge(A, low, mid, high)</span>
            <span>C Function</span>
          </div>

          <div className="space-y-1 pt-1 leading-relaxed text-[11px]">
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'init' ? 'bg-purple-900/60 text-purple-200 font-bold border-l-2 border-purple-400 pl-2' : ''}`}>
              i = low; j = mid + 1; k = low;
            </div>
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'compare' ? 'bg-purple-900/60 text-purple-200 font-bold border-l-2 border-purple-400 pl-2' : ''}`}>
              while (i &lt;= mid &amp;&amp; j &lt;= high) &#123;
            </div>
            <div className={`p-1 rounded pl-3 ${currentStep.codeHighlight === 'copyLeft' ? 'bg-blue-900/60 text-blue-200 font-bold border-l-2 border-blue-400 pl-4' : ''}`}>
              &nbsp;&nbsp;if (A[i] &lt; A[j]) B[k++] = A[i++];
            </div>
            <div className={`p-1 rounded pl-3 ${currentStep.codeHighlight === 'copyRight' ? 'bg-amber-900/60 text-amber-200 font-bold border-l-2 border-amber-400 pl-4' : ''}`}>
              &nbsp;&nbsp;else B[k++] = A[j++];
            </div>
            <div>&#125;</div>
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'cleanupLeft' ? 'bg-blue-900/60 text-blue-200 font-bold border-l-2 border-blue-400 pl-2' : ''}`}>
              while (i &lt;= mid) B[k++] = A[i++];
            </div>
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'cleanupRight' ? 'bg-amber-900/60 text-amber-200 font-bold border-l-2 border-amber-400 pl-2' : ''}`}>
              while (j &lt;= high) B[k++] = A[j++];
            </div>
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'copyBack' ? 'bg-emerald-900/60 text-emerald-200 font-bold border-l-2 border-emerald-400 pl-2' : ''}`}>
              for (int i=low; i&lt;=high; i++) A[i]=B[i];
            </div>
          </div>
        </div>

      </div>

      {/* Control Buttons */}
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
                <Play className="w-3.5 h-3.5" /> Play
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
            { label: '0.5x', speed: 1500 },
            { label: '1x', speed: 1000 },
            { label: '2x', speed: 500 },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setPlaybackSpeed(s.speed)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold ${
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
