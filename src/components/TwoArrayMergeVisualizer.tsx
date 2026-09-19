'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface MergeStep {
  i: number;
  j: number;
  k: number;
  arrayA: number[];
  arrayB: number[];
  arrayC: (number | null)[];
  description: string;
  codeHighlight: string;
  comparing: boolean;
  chosen: 'A' | 'B' | 'none';
  status: string;
}

const PRESETS = [
  {
    name: 'Standard Mix',
    arrayA: [7, 9, 18, 19, 22],
    arrayB: [1, 6, 9, 11],
  },
  {
    name: 'Interleaved',
    arrayA: [7, 8, 12],
    arrayB: [1, 2, 11],
  },
  {
    name: 'Disjoint Ranges',
    arrayA: [2, 4, 5],
    arrayB: [40, 50, 80],
  },
];

export default function TwoArrayMergeVisualizer() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [steps, setSteps] = useState<MergeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);

  // Generate all simulation steps for the chosen preset
  const generateSteps = (A: number[], B: number[]) => {
    const generated: MergeStep[] = [];
    const m = A.length;
    const n = B.length;
    let i = 0;
    let j = 0;
    let k = 0;
    const C: (number | null)[] = new Array(m + n).fill(null);

    // Initial state
    generated.push({
      i,
      j,
      k,
      arrayA: [...A],
      arrayB: [...B],
      arrayC: [...C],
      description: `Initialized pointers i = 0 (Array A), j = 0 (Array B), and k = 0 (Array C). Both input arrays are sorted.`,
      codeHighlight: 'init',
      comparing: false,
      chosen: 'none',
      status: 'Ready to begin merging',
    });

    // Main comparison loop
    while (i < m && j < n) {
      // Comparison step
      generated.push({
        i,
        j,
        k,
        arrayA: [...A],
        arrayB: [...B],
        arrayC: [...C],
        description: `Comparing A[${i}] (${A[i]}) with B[${j}] (${B[j]}).`,
        codeHighlight: 'compare',
        comparing: true,
        chosen: 'none',
        status: `Evaluating: Is A[${i}] (${A[i]}) <= B[${j}] (${B[j]})?`,
      });

      if (A[i] <= B[j]) {
        C[k] = A[i];
        generated.push({
          i: i + 1,
          j,
          k: k + 1,
          arrayA: [...A],
          arrayB: [...B],
          arrayC: [...C],
          description: `A[${i}] (${A[i]}) is smaller or equal. Place ${A[i]} into C[${k}], then advance pointer i to ${i + 1} and pointer k to ${k + 1}.`,
          codeHighlight: 'copyA',
          comparing: false,
          chosen: 'A',
          status: `C[${k}] = ${A[i]} placed. Advanced i & k.`,
        });
        i++;
        k++;
      } else {
        C[k] = B[j];
        generated.push({
          i,
          j: j + 1,
          k: k + 1,
          arrayA: [...A],
          arrayB: [...B],
          arrayC: [...C],
          description: `B[${j}] (${B[j]}) is smaller. Place ${B[j]} into C[${k}], then advance pointer j to ${j + 1} and pointer k to ${k + 1}.`,
          codeHighlight: 'copyB',
          comparing: false,
          chosen: 'B',
          status: `C[${k}] = ${B[j]} placed. Advanced j & k.`,
        });
        j++;
        k++;
      }
    }

    // Cleanup loop for remaining elements in A
    while (i < m) {
      C[k] = A[i];
      generated.push({
        i: i + 1,
        j,
        k: k + 1,
        arrayA: [...A],
        arrayB: [...B],
        arrayC: [...C],
        description: `Array B is exhausted. Copying remaining element A[${i}] (${A[i]}) directly into C[${k}].`,
        codeHighlight: 'cleanupA',
        comparing: false,
        chosen: 'A',
        status: `Direct copy: C[${k}] = A[${i}] (${A[i]}).`,
      });
      i++;
      k++;
    }

    // Cleanup loop for remaining elements in B
    while (j < n) {
      C[k] = B[j];
      generated.push({
        i,
        j: j + 1,
        k: k + 1,
        arrayA: [...A],
        arrayB: [...B],
        arrayC: [...C],
        description: `Array A is exhausted. Copying remaining element B[${j}] (${B[j]}) directly into C[${k}].`,
        codeHighlight: 'cleanupB',
        comparing: false,
        chosen: 'B',
        status: `Direct copy: C[${k}] = B[${j}] (${B[j]}).`,
      });
      j++;
      k++;
    }

    // Final completed step
    generated.push({
      i,
      j,
      k,
      arrayA: [...A],
      arrayB: [...B],
      arrayC: [...C],
      description: `Merging complete! Array C now contains all ${m + n} elements in perfectly sorted order in O(m + n) linear time.`,
      codeHighlight: 'done',
      comparing: false,
      chosen: 'none',
      status: 'Merge Completed Successfully!',
    });

    return generated;
  };

  useEffect(() => {
    const selected = PRESETS[presetIndex];
    const generated = generateSteps(selected.arrayA, selected.arrayB);
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [presetIndex]);

  // Autoplay timer
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
    arrayA: [],
    arrayB: [],
    arrayC: [],
    description: '',
    codeHighlight: '',
    comparing: false,
    chosen: 'none',
    status: '',
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div id="two-array-merge-visualizer" className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Two-Array Merge Processor (A + B &rarr; C)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Compare elements at pointers <span className="font-bold text-blue-600 dark:text-blue-400">i</span> and <span className="font-bold text-emerald-600 dark:text-emerald-400">j</span>, placing the smaller into <span className="font-bold text-purple-600 dark:text-purple-400">C[k]</span>.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl flex-wrap">
          {PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => {
                setPresetIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                presetIndex === idx
                  ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Narrative / Step Explanation Card */}
      <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            Step {currentStepIndex + 1} of {steps.length} &bull; {currentStep.status}
          </span>
          <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
            i = {currentStep.i}, j = {currentStep.j}, k = {currentStep.k}
          </span>
        </div>
        <p className="text-xs text-purple-950/80 dark:text-purple-200/90 leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      {/* Visual Canvas for Arrays */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        
        {/* Array Canvas (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-6 bg-gray-50/60 dark:bg-gray-900/40 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
          
          {/* Array A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                Sorted Array A (size m = {currentStep.arrayA.length})
              </span>
              <span className="text-[11px] font-mono text-gray-400">Pointer i = {currentStep.i}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {currentStep.arrayA.map((val, idx) => {
                const isCurrentI = idx === currentStep.i;
                const isPast = idx < currentStep.i;
                const isComparing = currentStep.comparing && isCurrentI;

                return (
                  <div key={`A-${idx}`} className="flex flex-col items-center gap-1 shrink-0 w-12 sm:w-14">
                    {/* Top Pointer Indicator */}
                    <div className="h-5 flex items-center justify-center">
                      {isCurrentI && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-xs animate-bounce">
                          i &darr;
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                        isComparing
                          ? 'bg-blue-100 dark:bg-blue-900/90 border-blue-500 dark:border-blue-400 text-blue-950 dark:text-white scale-105 shadow-md ring-2 ring-blue-400 dark:ring-blue-500'
                          : isPast
                          ? 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 opacity-50'
                          : 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/80 text-blue-950 dark:text-blue-100 shadow-2xs'
                      }`}
                    >
                      <span>{val}</span>
                      <span className={`text-[9px] font-normal ${
                        isComparing
                          ? 'text-blue-700 dark:text-blue-200 font-bold'
                          : isPast
                          ? 'text-gray-400 dark:text-gray-600'
                          : 'text-blue-600/80 dark:text-blue-300/80'
                      }`}>A[{idx}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Array B */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Sorted Array B (size n = {currentStep.arrayB.length})
              </span>
              <span className="text-[11px] font-mono text-gray-400">Pointer j = {currentStep.j}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {currentStep.arrayB.map((val, idx) => {
                const isCurrentJ = idx === currentStep.j;
                const isPast = idx < currentStep.j;
                const isComparing = currentStep.comparing && isCurrentJ;

                return (
                  <div key={`B-${idx}`} className="flex flex-col items-center gap-1 shrink-0 w-12 sm:w-14">
                    {/* Top Pointer Indicator */}
                    <div className="h-5 flex items-center justify-center">
                      {isCurrentJ && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white shadow-xs animate-bounce">
                          j &darr;
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                        isComparing
                          ? 'bg-emerald-100 dark:bg-emerald-900/90 border-emerald-500 dark:border-emerald-400 text-emerald-950 dark:text-white scale-105 shadow-md ring-2 ring-emerald-400 dark:ring-emerald-500'
                          : isPast
                          ? 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 opacity-50'
                          : 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100 shadow-2xs'
                      }`}
                    >
                      <span>{val}</span>
                      <span className={`text-[9px] font-normal ${
                        isComparing
                          ? 'text-emerald-700 dark:text-emerald-200 font-bold'
                          : isPast
                          ? 'text-gray-400 dark:text-gray-600'
                          : 'text-emerald-600/80 dark:text-emerald-300/80'
                      }`}>B[{idx}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Array C */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                Target Merged Array C (size m + n = {currentStep.arrayC.length})
              </span>
              <span className="text-[11px] font-mono text-gray-400">Pointer k = {currentStep.k}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {currentStep.arrayC.map((val, idx) => {
                const isCurrentK = idx === currentStep.k;
                const isFilled = val !== null;
                const isJustPlaced = idx === currentStep.k - 1;

                return (
                  <div key={`C-${idx}`} className="flex flex-col items-center gap-1 shrink-0 w-12 sm:w-14">
                    {/* Top Pointer Indicator */}
                    <div className="h-5 flex items-center justify-center">
                      {isCurrentK && (
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-purple-600 text-white shadow-xs">
                          k &darr;
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                        isJustPlaced
                          ? 'bg-purple-100 dark:bg-purple-900/90 border-purple-500 dark:border-purple-400 text-purple-950 dark:text-white ring-2 ring-purple-400 dark:ring-purple-500 shadow-md scale-105'
                          : isFilled
                          ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800/80 text-purple-950 dark:text-purple-100 shadow-2xs'
                          : 'bg-gray-100/60 dark:bg-gray-900/60 border-2 border-dashed border-gray-300 dark:border-gray-800 text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      <span>{val !== null ? val : '·'}</span>
                      <span className={`text-[9px] font-normal ${
                        isJustPlaced
                          ? 'text-purple-700 dark:text-purple-200 font-bold'
                          : isFilled
                          ? 'text-purple-600/80 dark:text-purple-300/80'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}>C[{idx}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Live Code Tracker (Right 4 Cols) */}
        <div className="lg:col-span-4 bg-gray-900 rounded-2xl p-4 text-xs font-mono text-gray-300 space-y-2 border border-gray-800 shadow-inner">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[11px] text-gray-400 font-sans">
            <span className="font-bold text-purple-400">Merge Processor Logic</span>
            <span>C Snippet</span>
          </div>

          <div className="space-y-1 pt-1 leading-relaxed text-[11px]">
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'init' ? 'bg-purple-900/60 text-purple-200 font-bold border-l-2 border-purple-400 pl-2' : ''}`}>
              i = 0; j = 0; k = 0;
            </div>
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'compare' ? 'bg-purple-900/60 text-purple-200 font-bold border-l-2 border-purple-400 pl-2' : ''}`}>
              while (i &lt; m &amp;&amp; j &lt; n) &#123;
            </div>
            <div className={`p-1 rounded pl-3 ${currentStep.codeHighlight === 'copyA' ? 'bg-blue-900/60 text-blue-200 font-bold border-l-2 border-blue-400 pl-4' : ''}`}>
              &nbsp;&nbsp;if (A[i] &lt;= B[j]) &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;C[k++] = A[i++];<br />
              &nbsp;&nbsp;&#125;
            </div>
            <div className={`p-1 rounded pl-3 ${currentStep.codeHighlight === 'copyB' ? 'bg-emerald-900/60 text-emerald-200 font-bold border-l-2 border-emerald-400 pl-4' : ''}`}>
              &nbsp;&nbsp;else &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;C[k++] = B[j++];<br />
              &nbsp;&nbsp;&#125;
            </div>
            <div>&#125;</div>
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'cleanupA' ? 'bg-amber-900/60 text-amber-200 font-bold border-l-2 border-amber-400 pl-2' : ''}`}>
              while (i &lt; m) C[k++] = A[i++];
            </div>
            <div className={`p-1 rounded ${currentStep.codeHighlight === 'cleanupB' ? 'bg-amber-900/60 text-amber-200 font-bold border-l-2 border-amber-400 pl-2' : ''}`}>
              while (j &lt; n) C[k++] = B[j++];
            </div>
          </div>
        </div>

      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        
        {/* Play / Step Buttons */}
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
            onClick={handlePrev}
            disabled={currentStepIndex === 0 || isPlaying}
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex >= steps.length - 1 || isPlaying}
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
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
