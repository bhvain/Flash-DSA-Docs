'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, StepForward, StepBack, RotateCcw, ArrowDown, ArrowUp } from 'lucide-react';

interface TraceStep {
  array: number[];
  i: number;
  j: number;
  pivotIndex: number;
  low: number;
  high: number;
  message: string;
  actionType: 'init' | 'move_i' | 'move_j' | 'swap_ij' | 'crossed' | 'swap_pivot' | 'done';
}

const INITIAL_ARRAY = [2, 4, 3, 9, 1, 4, 8, 7, 5, 6];

function generatePartitionTrace(arrInput: number[]): TraceStep[] {
  const steps: TraceStep[] = [];
  const A = [...arrInput];
  const low = 0;
  const high = A.length - 1;
  const pivot = A[low];

  let i = low + 1;
  let j = high;

  steps.push({
    array: [...A],
    i,
    j,
    pivotIndex: low,
    low,
    high,
    message: `Start Partition: Set Pivot = A[low] = ${pivot}. Initialize pointer i = low + 1 = ${i}, and pointer j = high = ${j}.`,
    actionType: 'init'
  });

  let done = false;

  while (!done) {
    // Increment i while A[i] <= pivot and i <= high
    while (i <= high && A[i] <= pivot) {
      steps.push({
        array: [...A],
        i,
        j,
        pivotIndex: low,
        low,
        high,
        message: `A[${i}] (${A[i]}) <= Pivot (${pivot}). Increment i to ${i + 1}.`,
        actionType: 'move_i'
      });
      i++;
    }

    steps.push({
      array: [...A],
      i: Math.min(i, high),
      j,
      pivotIndex: low,
      low,
      high,
      message: i <= high 
        ? `Found A[${i}] (${A[i]}) > Pivot (${pivot}). Pointer i stops here.`
        : `Pointer i reached the end of the array.`,
      actionType: 'move_i'
    });

    // Decrement j while A[j] > pivot and j >= low
    while (j >= low && A[j] > pivot) {
      steps.push({
        array: [...A],
        i: Math.min(i, high),
        j,
        pivotIndex: low,
        low,
        high,
        message: `A[${j}] (${A[j]}) > Pivot (${pivot}). Decrement j to ${j - 1}.`,
        actionType: 'move_j'
      });
      j--;
    }

    steps.push({
      array: [...A],
      i: Math.min(i, high),
      j: Math.max(j, low),
      pivotIndex: low,
      low,
      high,
      message: `Found A[${j}] (${A[j]}) <= Pivot (${pivot}). Pointer j stops here.`,
      actionType: 'move_j'
    });

    if (i < j) {
      steps.push({
        array: [...A],
        i,
        j,
        pivotIndex: low,
        low,
        high,
        message: `Since i < j (${i} < ${j}), swap A[i] (${A[i]}) and A[j] (${A[j]}).`,
        actionType: 'swap_ij'
      });

      const temp = A[i];
      A[i] = A[j];
      A[j] = temp;

      steps.push({
        array: [...A],
        i,
        j,
        pivotIndex: low,
        low,
        high,
        message: `Swapped! Array is now [${A.join(', ')}]. Now continuing pointer scans.`,
        actionType: 'swap_ij'
      });
    } else {
      done = true;
      steps.push({
        array: [...A],
        i: Math.min(i, high),
        j,
        pivotIndex: low,
        low,
        high,
        message: `Pointers crossed! (j = ${j} <= i = ${i}). Stop the loop.`,
        actionType: 'crossed'
      });
    }
  }

  // Swap pivot (A[low]) with A[j]
  steps.push({
    array: [...A],
    i: Math.min(i, high),
    j,
    pivotIndex: low,
    low,
    high,
    message: `Final Swap: Swap Pivot A[low] (${A[low]}) with A[j] (${A[j]}).`,
    actionType: 'swap_pivot'
  });

  const temp = A[low];
  A[low] = A[j];
  A[j] = temp;

  steps.push({
    array: [...A],
    i: Math.min(i, high),
    j,
    pivotIndex: j, // new location of pivot
    low,
    high,
    message: `Partition Complete! Pivot (${pivot}) is locked at index ${j}. All elements to the left are <= ${pivot}, and all elements to the right are > ${pivot}. Returning partitionIndex = ${j}.`,
    actionType: 'done'
  });

  return steps;
}

export default function QuickSortPartitionVisualizer() {
  const [steps, setSteps] = useState<TraceStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generated = generatePartitionTrace(INITIAL_ARRAY);
    setSteps(generated);
  }, []);

  const currentStep = steps[currentStepIndex] || null;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1200);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length]);

  if (!currentStep) return null;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
    setIsPlaying(false);
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStepIndex === steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Interactive Partitioning Procedure (Step-by-Step)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Array: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">[2, 4, 3, 9, 1, 4, 8, 7, 5, 6]</code> with Pivot = 2
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2.5 py-1 rounded-full">
          Step {currentStepIndex + 1} of {steps.length}
        </div>
      </div>

      {/* Visual Canvas - Mobile Responsive overflow container */}
      <div className="bg-gray-50/70 dark:bg-gray-900/40 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="w-max mx-auto px-4 min-w-fit flex flex-col items-center">
          
          {/* Array Elements with i and j pointers */}
          <div className="flex items-center gap-2 sm:gap-3 py-6">
            {currentStep.array.map((val, idx) => {
              const isPivot = idx === currentStep.pivotIndex;
              const isI = idx === currentStep.i && currentStep.actionType !== 'done';
              const isJ = idx === currentStep.j && currentStep.actionType !== 'done';
              const isLocked = currentStep.actionType === 'done' && isPivot;

              return (
                <div key={idx} className="flex flex-col items-center gap-2 w-11 sm:w-14">
                  
                  {/* Top Pointer (i) */}
                  <div className="h-6 flex items-center justify-center">
                    {isI && (
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white flex items-center gap-0.5 shadow-sm">
                        i <ArrowDown className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Array Box */}
                  <motion.div
                    layout
                    className={`w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border-2 font-mono font-bold text-base sm:text-lg transition-all ${
                      isLocked
                        ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg ring-4 ring-emerald-300 dark:ring-emerald-900 scale-105 z-10'
                        : isPivot
                        ? 'bg-purple-100 border-purple-500 text-purple-900 dark:bg-purple-950/60 dark:border-purple-500 dark:text-purple-300 ring-2 ring-purple-400/50'
                        : isI && isJ
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-900 dark:bg-indigo-950/60 dark:border-indigo-500 dark:text-indigo-200'
                        : isI
                        ? 'bg-blue-100 border-blue-500 text-blue-900 dark:bg-blue-950/60 dark:border-blue-500 dark:text-blue-200'
                        : isJ
                        ? 'bg-amber-100 border-amber-500 text-amber-900 dark:bg-amber-950/60 dark:border-amber-500 dark:text-amber-200'
                        : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {val}
                  </motion.div>

                  {/* Bottom Pointer (j) & Index */}
                  <div className="h-6 flex items-center justify-center">
                    {isJ && (
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-amber-600 text-white flex items-center gap-0.5 shadow-sm">
                        j <ArrowUp className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono font-semibold text-gray-400 dark:text-gray-500">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Explanation Banner */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 min-h-[64px] flex items-center justify-center text-center">
        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
          {currentStep.message}
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            onClick={handleReset}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg border border-gray-200 dark:border-gray-800 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-30 transition-colors"
            title="Step Back"
          >
            <StepBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Play Simulation
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-30 transition-colors"
            title="Step Forward"
          >
            <StepForward className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 mx-auto sm:mx-0">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-purple-100 border border-purple-500"></span> Pivot
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-100 border border-blue-500"></span> Pointer i (&gt; pivot)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-500"></span> Pointer j (&le; pivot)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Partitioned Spot
          </span>
        </div>
      </div>

    </div>
  );
}
