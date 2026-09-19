'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ArrowRight, CheckCircle2, ChevronRight, Hash } from 'lucide-react';

const DRY_RUN_STEPS = [
  {
    pass: 1,
    i: 1,
    key: 54,
    startArray: [12, 54, 65, 7, 23, 9],
    endArray: [12, 54, 65, 7, 23, 9],
    boundaryBefore: 0,
    boundaryAfter: 1,
    shifts: [],
    explanation: "key = A[1] = 54. j = 0. Compare A[0] (12) with key (54). Since 12 is not greater than 54, the while loop doesn't run. No shifting needed. 54 stays at A[1]."
  },
  {
    pass: 2,
    i: 2,
    key: 65,
    startArray: [12, 54, 65, 7, 23, 9],
    endArray: [12, 54, 65, 7, 23, 9],
    boundaryBefore: 1,
    boundaryAfter: 2,
    shifts: [],
    explanation: "key = A[2] = 65. j = 1. Compare A[1] (54) with key (65). 54 is not greater than 65. Loop doesn't run. 65 is already in the correct place."
  },
  {
    pass: 3,
    i: 3,
    key: 7,
    startArray: [12, 54, 65, 7, 23, 9],
    endArray: [7, 12, 54, 65, 23, 9],
    boundaryBefore: 2,
    boundaryAfter: 3,
    shifts: [65, 54, 12],
    explanation: "key = A[3] = 7. j starts at 2. \n• 65 > 7, shift 65 right.\n• 54 > 7, shift 54 right.\n• 12 > 7, shift 12 right.\nLoop ends (j = -1). Insert key (7) at A[0]."
  },
  {
    pass: 4,
    i: 4,
    key: 23,
    startArray: [7, 12, 54, 65, 23, 9],
    endArray: [7, 12, 23, 54, 65, 9],
    boundaryBefore: 3,
    boundaryAfter: 4,
    shifts: [65, 54],
    explanation: "key = A[4] = 23. j starts at 3.\n• 65 > 23, shift 65 right.\n• 54 > 23, shift 54 right.\n• 12 < 23, stop shifting.\nInsert key (23) at A[2]."
  },
  {
    pass: 5,
    i: 5,
    key: 9,
    startArray: [7, 12, 23, 54, 65, 9],
    endArray: [7, 9, 12, 23, 54, 65],
    boundaryBefore: 4,
    boundaryAfter: 5,
    shifts: [65, 54, 23, 12],
    explanation: "key = A[5] = 9. j starts at 4.\n• 65, 54, 23, and 12 are all greater than 9. They all shift right one spot.\n• 7 < 9, stop shifting.\nInsert key (9) at A[1]."
  }
];

export default function InsertionSortDryRunVisualizer() {
  const [activePass, setActivePass] = useState(1);
  const currentStep = DRY_RUN_STEPS.find(s => s.pass === activePass)!;

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 my-6 font-sans">
      
      <div className="text-center space-y-1 mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
          <Terminal className="w-5 h-5 text-purple-600" /> Dry Run: Code Variable State
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Step-by-step tracing of variables <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">i</code>, <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">key</code>, and <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">j</code></p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {DRY_RUN_STEPS.map((step) => (
          <button
            key={step.pass}
            onClick={() => setActivePass(step.pass)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activePass === step.pass ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'}`}
          >
            Pass {step.pass}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Variables Panel */}
        <div className="col-span-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800 space-y-4">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">Variables in Memory</div>
          
          <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="font-mono text-sm text-gray-600 dark:text-gray-400">int i =</span>
            <span className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400">{currentStep.i}</span>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
            <span className="font-mono text-sm text-gray-600 dark:text-gray-400">int key = A[i] =</span>
            <span className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">{currentStep.key}</span>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="font-mono text-sm text-gray-600 dark:text-gray-400">int j = i - 1 =</span>
            <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">{currentStep.i - 1}</span>
          </div>
        </div>

        {/* Action Panel */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-100 dark:border-blue-900/50 h-full flex flex-col justify-center">
             <div className="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider mb-3">While Loop Execution</div>
             <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed whitespace-pre-line font-medium">
               {currentStep.explanation}
             </p>
          </div>

        </div>

      </div>

      {/* Array Visualization */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6 text-center">Array State Transformation</div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-max mx-auto px-4">
          
          {/* Start State */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Before Pass</span>
            <div className="flex items-center gap-1">
              {currentStep.startArray.map((val, idx) => (
                <React.Fragment key={`start-${idx}`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold ${idx === currentStep.i ? 'bg-emerald-100 border-emerald-400 text-emerald-700 dark:bg-emerald-900/40 dark:border-emerald-600 dark:text-emerald-400' : idx <= currentStep.boundaryBefore ? 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200' : 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800'}`}>
                    {val}
                  </div>
                  {idx === currentStep.boundaryBefore && (
                    <div className="w-1 h-14 bg-gray-400 dark:bg-gray-600 rounded-full mx-1"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center text-gray-400">
             <ArrowRight className="w-6 h-6" />
          </div>

          {/* End State */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">After Pass</span>
            <div className="flex items-center gap-1">
              {currentStep.endArray.map((val, idx) => {
                const wasShifted = currentStep.shifts.includes(val);
                const isKey = val === currentStep.key;
                
                return (
                  <React.Fragment key={`end-${idx}`}>
                    <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold ${isKey ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-110 z-10 transition-transform' : wasShifted ? 'bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900/40 dark:border-blue-600 dark:text-blue-400' : idx <= currentStep.boundaryAfter ? 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200' : 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800'}`}>
                      {val}
                    </div>
                    {idx === currentStep.boundaryAfter && idx !== currentStep.endArray.length - 1 && (
                      <div className="w-1 h-14 bg-purple-400 dark:bg-purple-600 rounded-full mx-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
            <div className="w-4 h-4 rounded bg-emerald-100 border-emerald-400 dark:bg-emerald-900/40 dark:border-emerald-600 border-2"></div>
            Key Element (A[i])
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
            <div className="w-4 h-4 rounded bg-blue-100 border-blue-400 dark:bg-blue-900/40 dark:border-blue-600 border-2"></div>
            Shifted Right
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
            <div className="w-1 h-4 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            Sorted Boundary
          </div>
        </div>

      </div>

    </div>
  );
}
