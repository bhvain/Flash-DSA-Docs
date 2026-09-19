'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Bug, 
  CheckCircle2, 
  Cpu, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface DryRunStep {
  lineNum: number;
  code: string;
  vars: {
    i: number | string;
    j: number | string;
    max: number;
    currentAction: string;
  };
  arrayState: number[];
  countState: number[];
  terminalLog: string;
}

const C_CODE_LINES = [
  'void countSort(int *A, int n) {',
  '    int i, j;',
  '    int max = maximum(A, n);',
  '    int *count = (int *) malloc((max + 1) * sizeof(int));',
  '    for (i = 0; i < max + 1; i++) {',
  '        count[i] = 0;',
  '    }',
  '    for (i = 0; i < n; i++) {',
  '        count[A[i]] = count[A[i]] + 1;',
  '    }',
  '    i = 0; j = 0;',
  '    while (i <= max) {',
  '        if (count[i] > 0) {',
  '            A[j] = i;',
  '            count[i] = count[i] - 1;',
  '            j++;',
  '        } else {',
  '            i++;',
  '        }',
  '    }',
  '    free(count);',
  '}'
];

const INITIAL_ARRAY = [9, 1, 4, 14, 4, 15, 6];

export default function CountSortDryRunVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);

  // Generate deterministic dry run for the video's VS Code test case [9, 1, 4, 14, 4, 15, 6]
  const steps: DryRunStep[] = [
    {
      lineNum: 2,
      code: 'int max = maximum(A, n);',
      vars: { i: '-', j: '-', max: 15, currentAction: 'Find maximum element in A' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [],
      terminalLog: 'Invoked countSort(A, 7). Maximum value evaluated to 15.',
    },
    {
      lineNum: 3,
      code: 'int *count = (int *) malloc((max + 1) * sizeof(int));',
      vars: { i: '-', j: '-', max: 15, currentAction: 'Dynamic memory allocation' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: new Array(16).fill(0),
      terminalLog: 'malloc allocated 16 integer slots (indices 0..15) for count array.',
    },
    {
      lineNum: 4,
      code: 'for (i = 0; i < max + 1; i++) count[i] = 0;',
      vars: { i: '0..15', j: '-', max: 15, currentAction: 'Zero-initialize count array' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: new Array(16).fill(0),
      terminalLog: 'count array indices 0 through 15 wiped to 0.',
    },
    {
      lineNum: 8,
      code: 'count[A[0]]++ -> count[9] becomes 1',
      vars: { i: 0, j: '-', max: 15, currentAction: 'Tally A[0]=9' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
      terminalLog: 'Encountered 9 at A[0]. Incremented count[9] -> 1.',
    },
    {
      lineNum: 8,
      code: 'count[A[1]]++ -> count[1] becomes 1',
      vars: { i: 1, j: '-', max: 15, currentAction: 'Tally A[1]=1' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
      terminalLog: 'Encountered 1 at A[1]. Incremented count[1] -> 1.',
    },
    {
      lineNum: 8,
      code: 'count[A[2]]++ -> count[4] becomes 1',
      vars: { i: 2, j: '-', max: 15, currentAction: 'Tally A[2]=4' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0],
      terminalLog: 'Encountered 4 at A[2]. Incremented count[4] -> 1.',
    },
    {
      lineNum: 8,
      code: 'count[A[3]]++ -> count[14] becomes 1',
      vars: { i: 3, j: '-', max: 15, currentAction: 'Tally A[3]=14' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0],
      terminalLog: 'Encountered 14 at A[3]. Incremented count[14] -> 1.',
    },
    {
      lineNum: 8,
      code: 'count[A[4]]++ -> count[4] becomes 2 (Duplicate!)',
      vars: { i: 4, j: '-', max: 15, currentAction: 'Tally duplicate A[4]=4' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [0,1,0,0,2,0,0,0,0,1,0,0,0,0,1,0],
      terminalLog: 'Encountered 4 again at A[4]. count[4] increments from 1 -> 2.',
    },
    {
      lineNum: 8,
      code: 'count[A[5]]++ & count[A[6]]++ tally 15 and 6',
      vars: { i: 6, j: '-', max: 15, currentAction: 'Tally A[5]=15, A[6]=6' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [0,1,0,0,2,0,1,0,0,1,0,0,0,0,1,1],
      terminalLog: 'Completed frequency count! Non-zeros: 1(x1), 4(x2), 6(x1), 9(x1), 14(x1), 15(x1).',
    },
    {
      lineNum: 10,
      code: 'i = 0; j = 0;',
      vars: { i: 0, j: 0, max: 15, currentAction: 'Initialize two pointers' },
      arrayState: [9, 1, 4, 14, 4, 15, 6],
      countState: [0,1,0,0,2,0,1,0,0,1,0,0,0,0,1,1],
      terminalLog: 'Reconstruction begins: i=0 points to count, j=0 points to A.',
    },
    {
      lineNum: 13,
      code: 'count[1] > 0 -> A[0] = 1; count[1] = 0; j = 1;',
      vars: { i: 1, j: 1, max: 15, currentAction: 'Write 1 into A[0]' },
      arrayState: [1, 1, 4, 14, 4, 15, 6],
      countState: [0,0,0,0,2,0,1,0,0,1,0,0,0,0,1,1],
      terminalLog: 'count[1] was 1: wrote 1 into A[0]. count[1] now 0, advanced j to 1.',
    },
    {
      lineNum: 13,
      code: 'count[4] > 0 -> A[1] = 4; count[4] = 1; j = 2;',
      vars: { i: 4, j: 2, max: 15, currentAction: 'Write 1st 4 into A[1]' },
      arrayState: [1, 4, 4, 14, 4, 15, 6],
      countState: [0,0,0,0,1,0,1,0,0,1,0,0,0,0,1,1],
      terminalLog: 'count[4] was 2: wrote 4 into A[1]. count[4] now 1, advanced j to 2.',
    },
    {
      lineNum: 13,
      code: 'count[4] > 0 -> A[2] = 4; count[4] = 0; j = 3;',
      vars: { i: 4, j: 3, max: 15, currentAction: 'Write 2nd 4 into A[2]' },
      arrayState: [1, 4, 4, 14, 4, 15, 6],
      countState: [0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1],
      terminalLog: 'count[4] was 1: wrote 4 into A[2]. count[4] now 0, advanced j to 3.',
    },
    {
      lineNum: 13,
      code: 'count[6] > 0 -> A[3] = 6; count[6] = 0; j = 4;',
      vars: { i: 6, j: 4, max: 15, currentAction: 'Write 6 into A[3]' },
      arrayState: [1, 4, 4, 6, 4, 15, 6],
      countState: [0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1],
      terminalLog: 'count[6] was 1: wrote 6 into A[3]. count[6] now 0, advanced j to 4.',
    },
    {
      lineNum: 13,
      code: 'count[9] > 0 -> A[4] = 9; count[9] = 0; j = 5;',
      vars: { i: 9, j: 5, max: 15, currentAction: 'Write 9 into A[4]' },
      arrayState: [1, 4, 4, 6, 9, 15, 6],
      countState: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      terminalLog: 'count[9] was 1: wrote 9 into A[4]. count[9] now 0, advanced j to 5.',
    },
    {
      lineNum: 13,
      code: 'count[14] > 0 -> A[5] = 14; count[14] = 0; j = 6;',
      vars: { i: 14, j: 6, max: 15, currentAction: 'Write 14 into A[5]' },
      arrayState: [1, 4, 4, 6, 9, 14, 6],
      countState: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      terminalLog: 'count[14] was 1: wrote 14 into A[5]. count[14] now 0, advanced j to 6.',
    },
    {
      lineNum: 13,
      code: 'count[15] > 0 -> A[6] = 15; count[15] = 0; j = 7;',
      vars: { i: 15, j: 7, max: 15, currentAction: 'Write 15 into A[6]' },
      arrayState: [1, 4, 4, 6, 9, 14, 15],
      countState: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      terminalLog: 'count[15] was 1: wrote 15 into A[6]. count[15] now 0, advanced j to 7.',
    },
    {
      lineNum: 20,
      code: 'free(count); return 0;',
      vars: { i: 16, j: 7, max: 15, currentAction: 'Execution Finished' },
      arrayState: [1, 4, 4, 6, 9, 14, 15],
      countState: new Array(16).fill(0),
      terminalLog: 'Sorted Output: 1 4 4 6 9 14 15. Memory cleanly deallocated.',
    }
  ];

  const activeStep = steps[currentStep];

  return (
    <div id="count-sort-dry-run-visualizer" className="my-8 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Code Simulation Engine
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 dark:text-white mt-1">
            Line-by-Line C Code Dry Run
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Simulating video test case: <code className="font-mono font-bold">int A[] = &#123;9, 1, 4, 14, 4, 15, 6&#125;;</code>
          </p>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(0)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-40 transition-colors"
            title="Previous Line"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold px-2">
            {currentStep + 1} / {steps.length}
          </span>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-40 transition-colors"
            title="Next Line"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        
        {/* Left Column: Code Window */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>60_count_sort.c</span>
            <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
              Active Line: {activeStep.lineNum + 1}
            </span>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#0d1117] text-gray-200 font-mono text-xs p-4 overflow-x-auto shadow-inner">
            {C_CODE_LINES.map((line, idx) => {
              const isCurrentLine = idx === activeStep.lineNum;
              return (
                <div
                  key={idx}
                  className={`flex items-center py-0.5 px-2 rounded-sm transition-colors ${
                    isCurrentLine
                      ? 'bg-blue-600/30 border-l-2 border-blue-400 text-blue-200 font-bold'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="w-7 select-none text-gray-600 text-[10px] text-right pr-3">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              );
            })}
          </div>

          {/* Terminal Console Output */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Runtime Event Log</span>
            </div>
            <p className="font-mono text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950 p-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
              &gt; {activeStep.terminalLog}
            </p>
          </div>
        </div>

        {/* Right Column: Registers & Live State */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* CPU Variables Table */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                CPU Registers / Local Stack
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <span className="text-[10px] text-gray-500 font-extrabold uppercase">Pointer i</span>
                <span className="text-sm font-mono font-bold block text-purple-600 dark:text-purple-400 mt-0.5">
                  {activeStep.vars.i}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <span className="text-[10px] text-gray-500 font-extrabold uppercase">Pointer j</span>
                <span className="text-sm font-mono font-bold block text-blue-600 dark:text-blue-400 mt-0.5">
                  {activeStep.vars.j}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <span className="text-[10px] text-gray-500 font-extrabold uppercase">max (m)</span>
                <span className="text-sm font-mono font-bold block text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {activeStep.vars.max}
                </span>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 text-xs">
              <span className="font-extrabold text-purple-900 dark:text-purple-300 block mb-0.5">
                Current Operation:
              </span>
              <span className="text-gray-700 dark:text-gray-300 font-mono text-[11px]">
                {activeStep.vars.currentAction}
              </span>
            </div>
          </div>

          {/* Live Array A */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-2xs">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-2">
              Array A State
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeStep.arrayState.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-gray-400">[{idx}]</span>
                  <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 flex items-center justify-center font-mono font-bold text-xs">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Non-zero Count Array Slots */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-2xs">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400 block mb-2">
              Active Count Array Frequencies
            </span>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {activeStep.countState.map((countVal, idx) => {
                if (countVal === 0) return null;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/40 text-xs font-mono"
                  >
                    <span className="font-bold text-purple-700 dark:text-purple-300">count[{idx}]</span>
                    <span className="font-black px-1.5 py-0.5 rounded bg-purple-200 dark:bg-purple-900/60 text-purple-900 dark:text-purple-100">
                      {countVal}
                    </span>
                  </div>
                );
              })}
              {activeStep.countState.every((c) => c === 0) && (
                <div className="text-xs text-gray-500 italic py-2 text-center">
                  All frequency slots currently 0.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
