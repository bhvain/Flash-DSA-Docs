'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Calculator,
  Sparkles,
  Info,
  RefreshCw
} from 'lucide-react';

interface VisualStep {
  stepIndex: number;
  phase: 'init' | 'finding_max' | 'allocating' | 'counting' | 'reconstructing' | 'completed';
  phaseTitle: string;
  codeLine: string;
  explanation: string;
  arrayA: number[];
  countArray: number[];
  maxVal: number;
  pointerI: number | null; // index in A (phase counting) or in count (phase reconstructing)
  pointerJ: number | null; // index in A (phase reconstructing)
  activeElementVal: number | null;
  highlightedCountIdx: number | null;
  highlightedAIdx: number | null;
}

const PRESET_ARRAYS = [
  { name: "Video Lecture Example [3, 1, 9, 7, 1, 2, 4]", array: [3, 1, 9, 7, 1, 2, 4] },
  { name: "VS Code Demo [9, 1, 4, 14, 4, 15, 6]", array: [9, 1, 4, 14, 4, 15, 6] },
  { name: "Small Duplicates [4, 2, 2, 5, 1, 3, 1]", array: [4, 2, 2, 5, 1, 3, 1] },
  { name: "Dense Range [2, 0, 3, 1, 2, 1]", array: [2, 0, 3, 1, 2, 1] },
];

export default function CountSortVisualizer() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [currentArray, setCurrentArray] = useState<number[]>(PRESET_ARRAYS[0].array);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(800);

  // Generate complete step-by-step history
  const steps: VisualStep[] = useMemo(() => {
    const generated: VisualStep[] = [];
    const A = [...currentArray];
    const n = A.length;

    // Step 0: Initial state
    generated.push({
      stepIndex: 0,
      phase: 'init',
      phaseTitle: 'Initial Input Array',
      codeLine: 'void countSort(int *A, int n)',
      explanation: `Received unsorted array A of size n = ${n}. Next step: find the maximum element to know the size of the auxiliary count array.`,
      arrayA: [...A],
      countArray: [],
      maxVal: 0,
      pointerI: null,
      pointerJ: null,
      activeElementVal: null,
      highlightedCountIdx: null,
      highlightedAIdx: null,
    });

    // Step 1: Find Max
    let max = -Infinity;
    for (let i = 0; i < n; i++) {
      if (A[i] > max) max = A[i];
    }

    generated.push({
      stepIndex: generated.length,
      phase: 'finding_max',
      phaseTitle: 'Step 1: Determine Maximum Element',
      codeLine: 'int max = maximum(A, n); // Returns ' + max,
      explanation: `Scanned array A. The maximum value is ${max}. Therefore, count array indices must span from 0 to ${max} (Total size = max + 1 = ${max + 1}).`,
      arrayA: [...A],
      countArray: [],
      maxVal: max,
      pointerI: null,
      pointerJ: null,
      activeElementVal: max,
      highlightedCountIdx: null,
      highlightedAIdx: null,
    });

    // Step 2: Allocate count array and initialize to 0
    const count = new Array(max + 1).fill(0);
    generated.push({
      stepIndex: generated.length,
      phase: 'allocating',
      phaseTitle: 'Step 2: Allocate & Initialize Count Array',
      codeLine: 'int *count = (int *) malloc((max + 1) * sizeof(int)); for(i=0; i<=max; i++) count[i] = 0;',
      explanation: `Created auxiliary array 'count' of size ${max + 1} (indices 0..${max}). All frequencies initialized to 0.`,
      arrayA: [...A],
      countArray: [...count],
      maxVal: max,
      pointerI: null,
      pointerJ: null,
      activeElementVal: null,
      highlightedCountIdx: null,
      highlightedAIdx: null,
    });

    // Step 3: Frequency Counting Phase
    for (let i = 0; i < n; i++) {
      const val = A[i];
      count[val]++;
      generated.push({
        stepIndex: generated.length,
        phase: 'counting',
        phaseTitle: 'Phase 1: Frequency Mapping (Tallying)',
        codeLine: `count[A[i]]++; // A[${i}] = ${val}, increment count[${val}] to ${count[val]}`,
        explanation: `At A[${i}] = ${val}: increment frequency at count[${val}]. Value ${val} has now been recorded ${count[val]} time(s).`,
        arrayA: [...A],
        countArray: [...count],
        maxVal: max,
        pointerI: i,
        pointerJ: null,
        activeElementVal: val,
        highlightedCountIdx: val,
        highlightedAIdx: i,
      });
    }

    // Step 4: Reconstruction Phase
    let i = 0; // index for count array
    let j = 0; // index for given array A
    const workingA = [...A];

    generated.push({
      stepIndex: generated.length,
      phase: 'reconstructing',
      phaseTitle: 'Phase 2: Begin Array Reconstruction',
      codeLine: 'int i = 0, j = 0; while (i <= max) { ... }',
      explanation: `Frequency tally complete! Pointer i will scan count[0..${max}], and pointer j will overwrite A[0..${n - 1}] in sorted order.`,
      arrayA: [...workingA],
      countArray: [...count],
      maxVal: max,
      pointerI: 0,
      pointerJ: 0,
      activeElementVal: null,
      highlightedCountIdx: 0,
      highlightedAIdx: 0,
    });

    while (i <= max) {
      if (count[i] > 0) {
        workingA[j] = i;
        count[i]--;
        generated.push({
          stepIndex: generated.length,
          phase: 'reconstructing',
          phaseTitle: 'Phase 2: Writing Sorted Element into A',
          codeLine: `A[j] = i; count[i]--; j++; // Placed ${i} at A[${j}], remaining count[${i}] = ${count[i]}`,
          explanation: `count[${i}] > 0 (remaining: ${count[i] + 1}): Copied index value ${i} into A[${j}]. Decremented count[${i}] to ${count[i]}, advanced j to ${j + 1}.`,
          arrayA: [...workingA],
          countArray: [...count],
          maxVal: max,
          pointerI: i,
          pointerJ: j,
          activeElementVal: i,
          highlightedCountIdx: i,
          highlightedAIdx: j,
        });
        j++;
      } else {
        i++;
        if (i <= max) {
          generated.push({
            stepIndex: generated.length,
            phase: 'reconstructing',
            phaseTitle: 'Phase 2: Advance Count Pointer',
            codeLine: 'else i++; // count[i] is 0, moving to next index',
            explanation: `count at index ${i - 1} is now 0. Advancing pointer i to inspect count[${i}].`,
            arrayA: [...workingA],
            countArray: [...count],
            maxVal: max,
            pointerI: i,
            pointerJ: j,
            activeElementVal: null,
            highlightedCountIdx: i,
            highlightedAIdx: j < n ? j : null,
          });
        }
      }
    }

    // Step 5: Completed
    generated.push({
      stepIndex: generated.length,
      phase: 'completed',
      phaseTitle: 'Sorting Complete',
      codeLine: '// Array is fully sorted in O(m + n) time!',
      explanation: `All non-zero frequencies have been drained in ascending sequence. Array A is now fully sorted!`,
      arrayA: [...workingA],
      countArray: [...count],
      maxVal: max,
      pointerI: null,
      pointerJ: null,
      activeElementVal: null,
      highlightedCountIdx: null,
      highlightedAIdx: null,
    });

    return generated;
  }, [currentArray]);

  // Autoplay timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length, playbackSpeed]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handlePresetChange = (idx: number) => {
    setSelectedPreset(idx);
    setCurrentArray(PRESET_ARRAYS[idx].array);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const parsed = customInput
      .split(/[\s,]+/)
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x) && x >= 0);

    if (parsed.length < 2) {
      alert("Please enter at least 2 non-negative integers.");
      return;
    }
    if (Math.max(...parsed) > 20) {
      alert("For crisp visual rendering, please keep values between 0 and 20.");
      return;
    }

    setCurrentArray(parsed);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const stepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div id="count-sort-visualizer" className="my-8 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-6 shadow-sm">
      {/* Header & Preset Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Calculator className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Interactive Simulation
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 dark:text-white mt-1">
            Count Sort Two-Phase Execution Engine
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Step through Phase 1 (Frequency Tally) and Phase 2 (Sorted Reconstruction into A)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PRESET_ARRAYS.map((preset, idx) => (
            <button
              key={preset.name}
              id={`preset-btn-${idx}`}
              onClick={() => handlePresetChange(idx)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                selectedPreset === idx
                  ? 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500 shadow-2xs'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-emerald-400'
              }`}
            >
              {preset.name.split('[')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Custom input form */}
      <form onSubmit={handleCustomSubmit} className="flex flex-wrap items-center gap-2 pt-4 pb-2">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Custom Array:</span>
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="e.g. 3, 1, 9, 7, 1, 2, 4 (max 20)"
          className="px-3 py-1 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-56 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
        />
        <button
          type="submit"
          id="custom-array-submit-btn"
          className="px-3 py-1 text-xs font-bold rounded-lg bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 transition-colors"
        >
          Load Custom
        </button>
      </form>

      {/* Main Visualizer Canvas */}
      <div className="mt-4 space-y-6">
        
        {/* Current Phase Indicator Banner */}
        <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide rounded-full ${
              currentStep.phase === 'counting' 
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                : currentStep.phase === 'reconstructing'
                ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                : currentStep.phase === 'completed'
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
            }`}>
              {currentStep.phaseTitle}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Step {currentStep.stepIndex + 1} of {steps.length}
            </span>
          </div>

          <div className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 shadow-2xs">
            {currentStep.codeLine}
          </div>
        </div>

        {/* Array A Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Array A (Input / Working Buffer)
              </span>
              <span className="text-[11px] text-gray-500 font-mono">
                [size n = {currentStep.arrayA.length}]
              </span>
            </div>
            {currentStep.phase === 'reconstructing' && currentStep.pointerJ !== null && (
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Active Write Pointer: j = {currentStep.pointerJ}
              </span>
            )}
            {currentStep.phase === 'counting' && currentStep.pointerI !== null && (
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                Active Read Pointer: i = {currentStep.pointerI} (Value: {currentStep.arrayA[currentStep.pointerI]})
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            {currentStep.arrayA.map((val, idx) => {
              const isTargetA = currentStep.highlightedAIdx === idx;
              const isReadPointer = currentStep.phase === 'counting' && currentStep.pointerI === idx;
              const isWritePointer = currentStep.phase === 'reconstructing' && currentStep.pointerJ === idx;
              const isWrittenAlready = currentStep.phase === 'reconstructing' && currentStep.pointerJ !== null && idx < currentStep.pointerJ;

              return (
                <div key={`array-a-${idx}`} className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-gray-600 dark:text-gray-400 mb-1">
                    i={idx}
                  </span>
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-sm font-extrabold font-mono border-2 transition-all ${
                      isWritePointer
                        ? 'border-blue-500 bg-blue-500/15 text-blue-700 dark:text-blue-300 scale-105 shadow-md ring-2 ring-blue-400'
                        : isReadPointer
                        ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 scale-105 shadow-md ring-2 ring-amber-400'
                        : isWrittenAlready
                        ? 'border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
                        : isTargetA
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                        : 'border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {val}
                  </motion.div>
                  <span className="text-[10px] font-bold mt-1 text-center h-4">
                    {isReadPointer && <span className="text-amber-600 dark:text-amber-400">↑ i</span>}
                    {isWritePointer && <span className="text-blue-600 dark:text-blue-400">↑ j</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Count Array Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Auxiliary Count Array (Frequency Map)
              </span>
              <span className="text-[11px] text-gray-500 font-mono">
                [indices 0..{currentStep.maxVal}, size = {currentStep.maxVal + 1}]
              </span>
            </div>
            {currentStep.phase === 'reconstructing' && currentStep.pointerI !== null && (
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                Inspecting count[i={currentStep.pointerI}]
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/10 overflow-x-auto">
            {currentStep.countArray.length === 0 ? (
              <div className="py-4 text-center w-full text-xs text-gray-500 italic">
                Count array will be allocated after finding max = {currentStep.maxVal}
              </div>
            ) : (
              currentStep.countArray.map((countVal, idx) => {
                const isTargetCount = currentStep.highlightedCountIdx === idx;
                const isCountActivePointer = currentStep.phase === 'reconstructing' && currentStep.pointerI === idx;

                return (
                  <div key={`count-arr-${idx}`} className="flex flex-col items-center">
                    <span className={`text-[10px] font-mono font-extrabold mb-1 ${
                      isTargetCount ? 'text-purple-600 dark:text-purple-300' : 'text-gray-500'
                    }`}>
                      [{idx}]
                    </span>
                    <motion.div
                      layout
                      animate={{
                        scale: isTargetCount ? 1.08 : 1,
                      }}
                      className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-xs sm:text-sm font-black font-mono border-2 transition-all ${
                        isCountActivePointer
                          ? 'border-purple-500 bg-purple-600 text-white shadow-md ring-2 ring-purple-400'
                          : isTargetCount
                          ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200'
                          : countVal > 0
                          ? 'border-purple-300 dark:border-purple-800 bg-white dark:bg-gray-900 text-purple-700 dark:text-purple-300 font-extrabold'
                          : 'border-gray-200 dark:border-gray-800 bg-gray-100/60 dark:bg-gray-900/40 text-gray-400 dark:text-gray-600'
                      }`}
                    >
                      {countVal}
                    </motion.div>
                    <span className="text-[10px] font-bold mt-1 text-center h-4">
                      {isCountActivePointer && <span className="text-purple-600 dark:text-purple-400">↑ i</span>}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Narrative Explanation Box */}
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-gray-100 block mb-0.5">
              Live Walkthrough Commentary
            </span>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentStep.explanation}
            </p>
          </div>
        </div>

        {/* Controls and Timeline Slider */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          
          {/* Playback Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="count-sort-reset-btn"
              onClick={resetSimulation}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              id="count-sort-prev-btn"
              onClick={stepBackward}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Step Backward"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              id="count-sort-play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Play
                </>
              )}
            </button>

            <button
              id="count-sort-next-btn"
              onClick={stepForward}
              disabled={currentStepIndex === steps.length - 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Step Forward"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline Slider */}
          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="text-[11px] font-mono text-gray-500 whitespace-nowrap">
              {currentStepIndex + 1} / {steps.length}
            </span>
            <input
              type="range"
              min="0"
              max={steps.length - 1}
              value={currentStepIndex}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentStepIndex(parseInt(e.target.value, 10));
              }}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg"
            />
          </div>

          {/* Speed selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-gray-500">Speed:</span>
            {[
              { label: '0.5x', speed: 1200 },
              { label: '1x', speed: 800 },
              { label: '2x', speed: 400 },
            ].map((sp) => (
              <button
                key={sp.label}
                onClick={() => setPlaybackSpeed(sp.speed)}
                className={`px-2 py-1 text-[11px] font-bold rounded-md border ${
                  playbackSpeed === sp.speed
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 border-transparent'
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
