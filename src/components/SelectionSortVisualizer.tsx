'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, StepForward, StepBack, RotateCcw } from 'lucide-react';

type Element = {
  id: string;
  value: number;
};

type HistoryStep = {
  array: Element[];
  sortedBoundary: number;
  comparingIndex: number | null;
  minFoundIndex: number | null;
  message: string;
};

const INITIAL_VALUES = [8, 0, 7, 1, 3];

function generateSelectionSortHistory(initialValues: number[]): HistoryStep[] {
  const history: HistoryStep[] = [];
  const arr = initialValues.map((v, i) => ({ id: `id-${v}`, value: v }));
  
  history.push({
    array: [...arr],
    sortedBoundary: -1,
    comparingIndex: null,
    minFoundIndex: null,
    message: "Initial state. The entire array on the right side of the boundary is unsorted.",
  });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    history.push({
      array: [...arr],
      sortedBoundary: i - 1,
      comparingIndex: null,
      minFoundIndex: minIdx,
      message: `Pass ${i + 1}: Assume the first unsorted element (${arr[minIdx].value}) is the minimum.`,
    });

    for (let j = i + 1; j < arr.length; j++) {
      history.push({
        array: [...arr],
        sortedBoundary: i - 1,
        comparingIndex: j,
        minFoundIndex: minIdx,
        message: `Comparing ${arr[j].value} with the current minimum (${arr[minIdx].value}).`,
      });

      if (arr[j].value < arr[minIdx].value) {
        minIdx = j;
        history.push({
          array: [...arr],
          sortedBoundary: i - 1,
          comparingIndex: j,
          minFoundIndex: minIdx,
          message: `Found a new minimum: ${arr[minIdx].value}!`,
        });
      }
    }

    if (minIdx !== i) {
      history.push({
        array: [...arr],
        sortedBoundary: i - 1,
        comparingIndex: i, 
        minFoundIndex: minIdx, 
        message: `End of pass. Swapping minimum element (${arr[minIdx].value}) with the first unsorted element (${arr[i].value}).`,
      });

      // Swap
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    } else {
      history.push({
        array: [...arr],
        sortedBoundary: i - 1,
        comparingIndex: null,
        minFoundIndex: minIdx,
        message: `End of pass. ${arr[i].value} is already the minimum element. No swap needed.`,
      });
    }

    history.push({
      array: [...arr],
      sortedBoundary: i,
      comparingIndex: null,
      minFoundIndex: null,
      message: `${arr[i].value} is now locked in its sorted position. Boundary moves forward.`,
    });
  }
  
  history.push({
    array: [...arr],
    sortedBoundary: arr.length - 1,
    comparingIndex: null,
    minFoundIndex: null,
    message: "The last element is automatically sorted. Array is fully sorted!",
  });
  
  return history;
}

export default function SelectionSortVisualizer() {
  const history = useMemo(() => generateSelectionSortHistory(INITIAL_VALUES), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = history[stepIndex];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (stepIndex < history.length - 1) {
          setStepIndex(stepIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1200); // 1200ms per step
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, stepIndex, history.length]);

  const handleNext = () => {
    if (stepIndex < history.length - 1) setStepIndex(stepIndex + 1);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (stepIndex === history.length - 1) {
      setStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 flex flex-col items-center space-y-8 my-6 overflow-hidden">
      
      {/* Visualizer Stage - Mobile Responsive Wrapper */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-fit px-4 flex justify-center mx-auto">
          <div className="relative flex flex-row items-end h-32 gap-2 sm:gap-4 pt-6">
            
            {/* The Boundary Line "Stick" */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-purple-500/50 dark:bg-purple-500/50 rounded-full transition-all duration-500 z-0 flex flex-col justify-start items-center"
              style={{ 
                left: currentStep.sortedBoundary >= 0 
                  ? `calc(${(currentStep.sortedBoundary + 1) * (100 / currentStep.array.length)}% - 0.25rem)` 
                  : '0%' 
              }}
            >
              <div className="text-[10px] uppercase font-bold tracking-widest text-purple-600 dark:text-purple-400 whitespace-nowrap -mt-6">
                 Boundary
              </div>
            </div>

            {currentStep.array.map((item, index) => {
              let bgColor = "bg-gray-50 dark:bg-gray-900";
              let borderColor = "border-gray-200 dark:border-gray-800";
              let textColor = "text-gray-500 dark:text-gray-500";
              
              const isSorted = index <= currentStep.sortedBoundary;
              const isMin = index === currentStep.minFoundIndex;
              const isComparing = index === currentStep.comparingIndex;

              if (isSorted) {
                bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
                borderColor = "border-emerald-200 dark:border-emerald-900";
                textColor = "text-emerald-700 dark:text-emerald-400";
              }

              if (isMin) {
                bgColor = "bg-amber-400 dark:bg-amber-500";
                borderColor = "border-amber-500 dark:border-amber-400";
                textColor = "text-amber-950 dark:text-amber-950";
              } else if (isComparing) {
                bgColor = "bg-blue-100 dark:bg-blue-900/40";
                borderColor = "border-blue-300 dark:border-blue-700";
                textColor = "text-blue-700 dark:text-blue-300";
              }

              const height = `${Math.max(2.5, item.value * 0.5)}rem`;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: (isMin || isComparing) ? 1.05 : 1, 
                    opacity: 1,
                    y: isMin ? -10 : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{ height }}
                  className={`w-12 sm:w-16 flex items-center justify-center rounded-t-lg border-2 ${bgColor} ${borderColor} ${textColor} font-bold text-xl shadow-sm z-10`}
                >
                  {item.value}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Message Output */}
      <div className="w-full text-center px-4 bg-gray-50 dark:bg-gray-900/50 py-3 rounded-lg border border-gray-100 dark:border-gray-800">
        <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 min-h-[1.5rem]">
          {currentStep.message}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-white dark:bg-gray-950 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm w-max mx-auto">
        <button 
          onClick={handleReset} 
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 sm:mx-2"></div>
        <button 
          onClick={handlePrev}
          disabled={stepIndex === 0}
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-30 transition-colors"
          title="Step Back"
        >
          <StepBack className="w-5 h-5" />
        </button>
        <button 
          onClick={togglePlay} 
          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors mx-1 sm:mx-2 shadow-sm"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>
        <button 
          onClick={handleNext}
          disabled={stepIndex === history.length - 1}
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-30 transition-colors"
          title="Step Forward"
        >
          <StepForward className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-sm h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${(stepIndex / (history.length - 1)) * 100}%` }}
        />
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 px-4 w-full">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
          <div className="w-3 h-3 rounded bg-amber-400 border-amber-500 border"></div>
          Current Minimum
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
          <div className="w-3 h-3 rounded bg-blue-100 border-blue-400 border"></div>
          Comparing
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
          <div className="w-3 h-3 rounded bg-emerald-100 border-emerald-400 border"></div>
          Sorted
        </div>
      </div>

    </div>
  );
}
