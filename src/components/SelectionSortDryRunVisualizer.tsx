'use client';

import React, { useState } from 'react';
import { Terminal, ArrowRight, ArrowDownUp } from 'lucide-react';

const DRY_RUN_STEPS = [
  {
    pass: 1,
    i: 0,
    startMinIndex: 0,
    finalMinIndex: 2,
    startArray: [3, 5, 2, 13, 12],
    endArray: [2, 5, 3, 13, 12],
    boundaryBefore: -1,
    boundaryAfter: 0,
    swappedIndices: [0, 2],
    explanation: "i = 0. We assume indexOfMin = 0 (value 3).\nInner loop (j) scans from index 1 to 4. It finds 2 at index 2 is smaller than 3, updating indexOfMin to 2.\nSwap A[0] and A[2]."
  },
  {
    pass: 2,
    i: 1,
    startMinIndex: 1,
    finalMinIndex: 2,
    startArray: [2, 5, 3, 13, 12],
    endArray: [2, 3, 5, 13, 12],
    boundaryBefore: 0,
    boundaryAfter: 1,
    swappedIndices: [1, 2],
    explanation: "i = 1. We assume indexOfMin = 1 (value 5).\nInner loop finds 3 at index 2 is smaller, updating indexOfMin to 2.\nSwap A[1] and A[2]."
  },
  {
    pass: 3,
    i: 2,
    startMinIndex: 2,
    finalMinIndex: 2,
    startArray: [2, 3, 5, 13, 12],
    endArray: [2, 3, 5, 13, 12],
    boundaryBefore: 1,
    boundaryAfter: 2,
    swappedIndices: [2], // Swap with itself
    explanation: "i = 2. We assume indexOfMin = 2 (value 5).\nInner loop compares with 13 and 12. None are smaller. indexOfMin remains 2.\nSwap A[2] and A[2] (effectively no change)."
  },
  {
    pass: 4,
    i: 3,
    startMinIndex: 3,
    finalMinIndex: 4,
    startArray: [2, 3, 5, 13, 12],
    endArray: [2, 3, 5, 12, 13],
    boundaryBefore: 2,
    boundaryAfter: 3,
    swappedIndices: [3, 4],
    explanation: "i = 3. We assume indexOfMin = 3 (value 13).\nInner loop finds 12 at index 4 is smaller, updating indexOfMin to 4.\nSwap A[3] and A[4]."
  }
];

export default function SelectionSortDryRunVisualizer() {
  const [activePass, setActivePass] = useState(1);
  const currentStep = DRY_RUN_STEPS.find(s => s.pass === activePass) || DRY_RUN_STEPS[0];

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      <div className="text-center space-y-1 mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
          <Terminal className="w-5 h-5 text-purple-600" /> Dry Run: Code Variable State
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Step-by-step tracing of <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">i</code> and <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">indexOfMin</code></p>
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

          <div className="flex flex-col gap-2 bg-white dark:bg-gray-950 p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-gray-600 dark:text-gray-400">Initial indexOfMin =</span>
              <span className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">{currentStep.startMinIndex}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <span className="font-mono text-sm text-gray-600 dark:text-gray-400">Final indexOfMin =</span>
              <span className="font-mono text-lg font-bold text-amber-600 dark:text-amber-400">{currentStep.finalMinIndex}</span>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-100 dark:border-blue-900/50 h-full flex flex-col justify-center">
             <div className="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider mb-3">Inner Loop Execution</div>
             <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed whitespace-pre-line font-medium">
               {currentStep.explanation}
             </p>
          </div>
        </div>

      </div>

      {/* Array Visualization - Built with responsive scrolling container */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-900/30 rounded-xl p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6 text-center">Array State Transformation</div>
        
        {/* Dynamic w-max mx-auto wrapper prevents cutoffs on mobile */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-max mx-auto px-4">
          
          {/* Start State */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Before Pass</span>
            <div className="flex items-center gap-1">
              {currentStep.startArray.map((val, idx) => (
                <React.Fragment key={`start-${idx}`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold ${idx <= currentStep.boundaryBefore ? 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200' : 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800'}`}>
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
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">After Pass (Swapped)</span>
            <div className="flex items-center gap-1 relative">
              {currentStep.endArray.map((val, idx) => {
                const wasSwapped = currentStep.swappedIndices.includes(idx);
                
                return (
                  <React.Fragment key={`end-${idx}`}>
                    <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold ${wasSwapped ? 'bg-amber-100 border-amber-400 text-amber-700 dark:bg-amber-900/40 dark:border-amber-600 dark:text-amber-400 shadow-md z-10' : idx <= currentStep.boundaryAfter ? 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200' : 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800'}`}>
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
            <div className="w-4 h-4 rounded bg-amber-100 border-amber-400 dark:bg-amber-900/40 dark:border-amber-600 border-2 flex items-center justify-center"><ArrowDownUp className="w-2.5 h-2.5 text-amber-600" /></div>
            Swapped Elements
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
            <div className="w-1 h-4 bg-purple-400 dark:bg-purple-600 rounded-full"></div>
            Sorted Pipe Boundary
          </div>
        </div>

      </div>

    </div>
  );
}
