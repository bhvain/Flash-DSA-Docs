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
  compareIndices: number[];
  isSwapping: boolean;
  sortedIndices: number[];
  message: string;
};

const INITIAL_VALUES = [7, 9, 2, 11, 17, 4];

function generateHistory(initialValues: number[]): HistoryStep[] {
  const history: HistoryStep[] = [];
  const arr = initialValues.map((v, i) => ({ id: `id-${v}-${i}`, value: v }));
  const n = arr.length;
  const sorted: number[] = [];

  history.push({
    array: [...arr],
    compareIndices: [],
    isSwapping: false,
    sortedIndices: [...sorted],
    message: "Initial array ready for Bubble Sort.",
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison step
      history.push({
        array: [...arr],
        compareIndices: [j, j + 1],
        isSwapping: false,
        sortedIndices: [...sorted],
        message: `Comparing ${arr[j].value} and ${arr[j + 1].value}.`,
      });

      if (arr[j].value > arr[j + 1].value) {
        // Swap step
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        history.push({
          array: [...arr],
          compareIndices: [j, j + 1],
          isSwapping: true,
          sortedIndices: [...sorted],
          message: `${temp.value} is greater than ${arr[j].value}, so we swap them!`,
        });
      } else {
        // No swap step
        history.push({
          array: [...arr],
          compareIndices: [j, j + 1],
          isSwapping: false,
          sortedIndices: [...sorted],
          message: `${arr[j].value} is smaller, so they are in the correct relative order.`,
        });
      }
    }
    sorted.push(n - i - 1);
    history.push({
      array: [...arr],
      compareIndices: [],
      isSwapping: false,
      sortedIndices: [...sorted],
      message: `Pass ${i + 1} complete. ${arr[n - i - 1].value} has bubbled to its correct sorted position.`,
    });
  }
  
  sorted.push(0); // The first element is intrinsically sorted
  history.push({
    array: [...arr],
    compareIndices: [],
    isSwapping: false,
    sortedIndices: [...sorted],
    message: "Array is fully sorted!",
  });

  return history;
}

export default function BubbleSortVisualizer() {
  const history = useMemo(() => generateHistory(INITIAL_VALUES), []);
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
      }, 800); // 800ms per step
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
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center space-y-8 my-6">
      
      {/* Visualizer Stage */}
      <div className="flex flex-row items-end h-32 gap-2 sm:gap-4 w-full justify-center">
        {currentStep.array.map((item, index) => {
          
          let bgColor = "bg-white dark:bg-gray-900";
          let borderColor = "border-gray-200 dark:border-gray-700";
          let textColor = "text-gray-800 dark:text-gray-200";

          if (currentStep.sortedIndices.includes(index)) {
            bgColor = "bg-emerald-500 dark:bg-emerald-600";
            borderColor = "border-emerald-600 dark:border-emerald-500";
            textColor = "text-white";
          } else if (currentStep.compareIndices.includes(index)) {
            if (currentStep.isSwapping) {
              bgColor = "bg-rose-500 dark:bg-rose-600";
              borderColor = "border-rose-600 dark:border-rose-500";
              textColor = "text-white";
            } else {
              bgColor = "bg-amber-400 dark:bg-amber-500";
              borderColor = "border-amber-500 dark:border-amber-400";
              textColor = "text-amber-950 dark:text-amber-950";
            }
          }

          // Calculate height proportionally to value for visual emphasis
          const height = `${Math.max(2.5, item.value * 0.4)}rem`;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{ height }}
              className={`w-10 sm:w-14 flex items-center justify-center rounded-t-lg border-2 ${bgColor} ${borderColor} ${textColor} font-bold text-lg shadow-sm`}
            >
              {item.value}
            </motion.div>
          );
        })}
      </div>

      {/* Message Output */}
      <div className="w-full text-center px-4">
        <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 h-6">
          {currentStep.message}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800">
        <button 
          onClick={handleReset} 
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
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
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors mx-2 shadow-sm"
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
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${(stepIndex / (history.length - 1)) * 100}%` }}
        />
      </div>

    </div>
  );
}
