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
  activeElementIndex: number | null;
  comparingIndex: number | null;
  message: string;
};

const INITIAL_VALUES = [7, 2, 91, 77, 3];

function generateHistory(initialValues: number[]): HistoryStep[] {
  const history: HistoryStep[] = [];
  const arr = initialValues.map((v, i) => ({ id: `id-${v}`, value: v }));
  
  history.push({
    array: [...arr],
    sortedBoundary: 0,
    activeElementIndex: null,
    comparingIndex: null,
    message: "Initial state. The first element (7) is considered a sorted array of size 1.",
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    history.push({
      array: [...arr],
      sortedBoundary: i - 1,
      activeElementIndex: i,
      comparingIndex: null,
      message: `Pass ${i}: We want to insert ${key.value} into the sorted portion (left of the line).`,
    });

    while (j >= 0) {
      history.push({
        array: [...arr],
        sortedBoundary: i - 1, // Boundary hasn't officially grown until insertion is done
        activeElementIndex: j + 1,
        comparingIndex: j,
        message: `Comparing ${key.value} with ${arr[j].value}...`,
      });

      if (arr[j].value > key.value) {
        // Shift right
        arr[j + 1] = arr[j];
        // We visually represent the shift by placing the key in the gap
        arr[j] = key; 
        
        history.push({
          array: [...arr],
          sortedBoundary: i - 1,
          activeElementIndex: j,
          comparingIndex: null,
          message: `${arr[j + 1].value} is greater than ${key.value}, so it shifts one step to the right.`,
        });
        j--;
      } else {
        history.push({
          array: [...arr],
          sortedBoundary: i - 1,
          activeElementIndex: j + 1,
          comparingIndex: j,
          message: `${arr[j].value} is smaller, so ${key.value} has found its correct position!`,
        });
        break;
      }
    }
    
    arr[j + 1] = key;
    history.push({
        array: [...arr],
        sortedBoundary: i,
        activeElementIndex: null,
        comparingIndex: null,
        message: `${key.value} is now inserted. The sorted boundary grows.`,
    });
  }
  
  history.push({
    array: [...arr],
    sortedBoundary: arr.length - 1,
    activeElementIndex: null,
    comparingIndex: null,
    message: "Array is fully sorted!",
  });
  
  return history;
}

export default function InsertionSortVisualizer() {
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
      }, 1000); // 1000ms per step to allow reading
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
      <div className="relative flex flex-row items-end h-32 gap-2 sm:gap-4 w-full justify-center">
        {currentStep.array.map((item, index) => {
          
          let bgColor = "bg-gray-50 dark:bg-gray-900";
          let borderColor = "border-gray-200 dark:border-gray-800";
          let textColor = "text-gray-500 dark:text-gray-500";
          let isSorted = index <= currentStep.sortedBoundary;

          // Base coloring for sorted vs unsorted
          if (isSorted) {
            bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
            borderColor = "border-emerald-200 dark:border-emerald-900";
            textColor = "text-emerald-700 dark:text-emerald-400";
          }

          // Override for active and comparing elements
          if (index === currentStep.activeElementIndex) {
            bgColor = "bg-amber-400 dark:bg-amber-500";
            borderColor = "border-amber-500 dark:border-amber-400";
            textColor = "text-amber-950 dark:text-amber-950";
          } else if (index === currentStep.comparingIndex) {
            bgColor = "bg-blue-100 dark:bg-blue-900/40";
            borderColor = "border-blue-300 dark:border-blue-700";
            textColor = "text-blue-700 dark:text-blue-300";
          }

          // Calculate height proportionally
          const height = `${Math.max(2.5, item.value * 0.08)}rem`;
          
          // Draw a visual separator line for the sorted boundary
          const isBoundary = index === currentStep.sortedBoundary && stepIndex !== history.length - 1;

          return (
            <React.Fragment key={item.id}>
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: index === currentStep.activeElementIndex ? 1.05 : 1, 
                  opacity: 1,
                  y: index === currentStep.activeElementIndex ? -10 : 0
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
              {isBoundary && (
                <div className="h-full w-px bg-gray-400 dark:bg-gray-600 border-r border-dashed border-gray-400 dark:border-gray-600 mx-1 flex flex-col justify-end items-center pb-2">
                   <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 -rotate-90 origin-bottom whitespace-nowrap mb-8">
                     Sorted Boundary
                   </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Message Output */}
      <div className="w-full text-center px-4 bg-gray-50 dark:bg-gray-900/50 py-3 rounded-lg border border-gray-100 dark:border-gray-800">
        <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 min-h-[1.5rem]">
          {currentStep.message}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 bg-white dark:bg-gray-950 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
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
          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors mx-2 shadow-sm"
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

    </div>
  );
}
