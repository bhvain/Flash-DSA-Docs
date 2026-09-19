'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, RotateCcw, ArrowRight, ArrowLeft, ArrowDownUp, CheckCircle2 } from 'lucide-react';

interface Student {
  name: string;
  height: number;
  id: string;
}

const INITIAL_STUDENTS: Student[] = [
  { name: 'Lavina (Pivot)', height: 160, id: 'lavina' },
  { name: 'Student 1', height: 175, id: 's1' },
  { name: 'Student 2', height: 150, id: 's2' },
  { name: 'Student 3', height: 180, id: 's3' },
  { name: 'Student 4', height: 155, id: 's4' },
];

const STEPS = [
  {
    stepNumber: 0,
    title: "1. The Task Delegation",
    desc: "The Class Teacher gives a single task to the P.T. Teacher: Take the 1st student at index 0 (Lavina, height 160cm) as reference (Pivot). Place all students shorter than Lavina on her left, and all students taller than Lavina on her right.",
    students: [
      { name: 'Lavina (Pivot)', height: 160, id: 'lavina' },
      { name: 'Student 1', height: 175, id: 's1' },
      { name: 'Student 2', height: 150, id: 's2' },
      { name: 'Student 3', height: 180, id: 's3' },
      { name: 'Student 4', height: 155, id: 's4' },
    ],
    i: 1,
    j: 4,
    pivotIndex: 0,
    highlightAction: "Pointers initialized: i starts from index 1 (searching forward for someone taller than 160cm), j starts from index 4 (searching backward for someone shorter than 160cm)."
  },
  {
    stepNumber: 1,
    title: "2. Finding First Violations",
    desc: "Pointer i inspects index 1 (175cm > 160cm) → Found someone taller! Pointer j inspects index 4 (155cm < 160cm) → Found someone shorter!",
    students: [
      { name: 'Lavina (Pivot)', height: 160, id: 'lavina' },
      { name: 'Student 1', height: 175, id: 's1' },
      { name: 'Student 2', height: 150, id: 's2' },
      { name: 'Student 3', height: 180, id: 's3' },
      { name: 'Student 4', height: 155, id: 's4' },
    ],
    i: 1,
    j: 4,
    pivotIndex: 0,
    highlightAction: "Both pointers found targets. Since i < j (1 < 4), swap Student at index 1 (175cm) with Student at index 4 (155cm)."
  },
  {
    stepNumber: 2,
    title: "3. First Swap",
    desc: "Student at index 1 and Student at index 4 have swapped places. Now 155cm is on the left, and 175cm is on the right.",
    students: [
      { name: 'Lavina (Pivot)', height: 160, id: 'lavina' },
      { name: 'Student 4', height: 155, id: 's4' },
      { name: 'Student 2', height: 150, id: 's2' },
      { name: 'Student 3', height: 180, id: 's3' },
      { name: 'Student 1', height: 175, id: 's1' },
    ],
    i: 1,
    j: 4,
    pivotIndex: 0,
    highlightAction: "Swap complete. Now pointers continue searching."
  },
  {
    stepNumber: 3,
    title: "4. Advancing Pointers & Crossing",
    desc: "Pointer i advances: skips 150cm (<=160), stops at index 3 (180cm > 160cm, i=3). Pointer j moves backwards: skips 180cm (>160), stops at index 2 (150cm <= 160cm, j=2).",
    students: [
      { name: 'Lavina (Pivot)', height: 160, id: 'lavina' },
      { name: 'Student 4', height: 155, id: 's4' },
      { name: 'Student 2', height: 150, id: 's2' },
      { name: 'Student 3', height: 180, id: 's3' },
      { name: 'Student 1', height: 175, id: 's1' },
    ],
    i: 3,
    j: 2,
    pivotIndex: 0,
    highlightAction: "Notice that j <= i (j=2, i=3). The pointers have crossed! We must STOP moving pointers."
  },
  {
    stepNumber: 4,
    title: "5. Swapping Pivot with j",
    desc: "Because the pointers crossed, we do NOT swap A[i] and A[j]. Instead, we swap the Pivot (Lavina at index 0) with the student at index j (index 2).",
    students: [
      { name: 'Student 2', height: 150, id: 's2' },
      { name: 'Student 4', height: 155, id: 's4' },
      { name: 'Lavina (Pivot)', height: 160, id: 'lavina' },
      { name: 'Student 3', height: 180, id: 's3' },
      { name: 'Student 1', height: 175, id: 's1' },
    ],
    i: 3,
    j: 2,
    pivotIndex: 2,
    highlightAction: "Lavina is now locked at index 2! Everyone to her left (150cm, 155cm) is shorter, and everyone to her right (180cm, 175cm) is taller. Partitioning is complete!"
  }
];

export default function AssemblyPartitionVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = STEPS[currentStepIndex];

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 my-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Users className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              The School Assembly Story: Partitioning Analogy
            </h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Visualizing how the P.T. Teacher arranges students around reference student "Lavina" (Pivot).
          </p>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-1.5 self-center">
          {STEPS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                currentStepIndex === idx
                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300 dark:ring-purple-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Card */}
      <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-bold text-purple-950 dark:text-purple-300 mb-1">
          {currentStep.title}
        </h4>
        <p className="text-xs text-purple-900/80 dark:text-purple-300/80 leading-relaxed">
          {currentStep.desc}
        </p>
      </div>

      {/* Visual Interactive Arena - Responsive horizontal scrolling */}
      <div className="bg-gray-50/70 dark:bg-gray-900/40 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="w-max mx-auto px-4 min-w-fit">
          <div className="flex items-end gap-3 sm:gap-6 h-52 pb-2">
            {currentStep.students.map((student, idx) => {
              const isPivot = idx === currentStep.pivotIndex;
              const isIPointer = idx === currentStep.i && currentStepIndex < 4;
              const isJPointer = idx === currentStep.j && currentStepIndex < 4;
              const isLockedPivot = isPivot && currentStepIndex === 4;

              // Height scaling (150cm -> 80px, 180cm -> 150px)
              const barHeight = `${((student.height - 140) / 45) * 110 + 40}px`;

              return (
                <div key={student.id} className="flex flex-col items-center gap-1.5 w-16 sm:w-20">
                  
                  {/* Pointer indicators */}
                  <div className="h-6 flex items-center justify-center gap-1">
                    {isIPointer && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                        i
                      </span>
                    )}
                    {isJPointer && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-600 text-white shadow-xs">
                        j
                      </span>
                    )}
                    {isLockedPivot && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Fixed
                      </span>
                    )}
                  </div>

                  {/* Student Figure Card */}
                  <motion.div
                    layout
                    style={{ height: barHeight }}
                    className={`w-full rounded-t-xl border-2 flex flex-col justify-between items-center p-2 text-center transition-all ${
                      isLockedPivot
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-300 shadow-md ring-2 ring-emerald-400/50'
                        : isPivot
                        ? 'bg-purple-100 border-purple-500 text-purple-900 dark:bg-purple-950/60 dark:border-purple-500 dark:text-purple-300 ring-2 ring-purple-400/50'
                        : isIPointer || isJPointer
                        ? 'bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950/40 dark:border-blue-500 dark:text-blue-200'
                        : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold leading-tight truncate w-full">
                      {student.name.split(' ')[0]}
                    </span>
                    <span className="font-mono text-xs font-extrabold">
                      {student.height}cm
                    </span>
                  </motion.div>

                  {/* Ground Position Index */}
                  <div className="w-full text-center py-1 rounded bg-gray-200 dark:bg-gray-800 text-[10px] font-mono font-bold text-gray-700 dark:text-gray-300">
                    Pos {idx}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          <strong className="text-purple-600 dark:text-purple-400 mr-1">Current State:</strong> 
          {currentStep.highlightAction}
        </p>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentStepIndex(Math.min(STEPS.length - 1, currentStepIndex + 1))}
            disabled={currentStepIndex === STEPS.length - 1}
            className="px-3 py-1 text-xs font-semibold rounded-lg bg-purple-600 text-white disabled:opacity-30 hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-purple-100 border border-purple-500"></span>
          <span>Pivot Reference</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-50 border border-blue-400"></span>
          <span>Pointer Target (i / j)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-500"></span>
          <span>Permanently Positioned</span>
        </div>
      </div>

    </div>
  );
}
