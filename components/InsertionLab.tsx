'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Plus, AlertCircle, CheckCircle2, ShieldAlert, ArrowRight, Code2, Terminal } from 'lucide-react';

export function InsertionLab() {
  const [capacity, setCapacity] = useState<number>(10);
  const [size, setSize] = useState<number>(5);
  const [array, setArray] = useState<(number | null)[]>([7, 8, 12, 27, 88, null, null, null, null, null]);
  
  const [insertElement, setInsertElement] = useState<number>(45);
  const [insertIndex, setInsertIndex] = useState<number>(3);

  // Animation states
  const [iPointer, setIPointer] = useState<number | null>(null);
  const [destPointer, setDestPointer] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to test insertion algorithm');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'Initialized array: {7, 8, 12, 27, 88}',
    'Capacity: 10, Size: 5'
  ]);

  const addLog = (msg: string) => {
    setExecutionLogs(prev => [msg, ...prev.slice(0, 7)]);
  };

  const handleReset = () => {
    setCapacity(10);
    setSize(5);
    setArray([7, 8, 12, 27, 88, null, null, null, null, null]);
    setIPointer(null);
    setDestPointer(null);
    setIsExecuting(false);
    setStatusMessage('Array reset to initial state: {7, 8, 12, 27, 88}');
    addLog('Reset array to default state: {7, 8, 12, 27, 88}');
  };

  // Step-by-step C indInsertion algorithm simulation
  const runInsertion = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    addLog(`=== Called indInsertion(arr, size=${size}, element=${insertElement}, capacity=${capacity}, index=${insertIndex}) ===`);

    // 1. Overflow check
    if (size >= capacity) {
      addLog(`❌ OVERFLOW ERROR: size (${size}) >= capacity (${capacity}). Return -1`);
      setStatusMessage('Insertion Failed: Array is at maximum capacity (Overflow)!');
      setIsExecuting(false);
      return;
    }

    if (insertIndex < 0 || insertIndex > size) {
      addLog(`❌ INVALID INDEX ERROR: Target index (${insertIndex}) out of bounds (0 to ${size}). Return -1`);
      setStatusMessage(`Insertion Failed: Target index ${insertIndex} is out of bounds!`);
      setIsExecuting(false);
      return;
    }

    setStatusMessage(`Running reverse loop from i = ${size - 1} down to i = ${insertIndex}...`);
    const tempArr = [...array];

    // 2. Reverse loop: for (int i = size - 1; i >= index; i--) arr[i + 1] = arr[i];
    for (let i = size - 1; i >= insertIndex; i--) {
      setIPointer(i);
      setDestPointer(i + 1);
      const valToShift = tempArr[i];
      addLog(`Loop i=${i}: arr[${i + 1}] = arr[${i}] (${valToShift})`);
      setStatusMessage(`Shifting arr[${i}] (${valToShift}) to arr[${i + 1}]...`);

      tempArr[i + 1] = valToShift;
      setArray([...tempArr]);
      await new Promise(r => setTimeout(r, 700));
    }

    // 3. Place target element
    setIPointer(insertIndex);
    setDestPointer(null);
    tempArr[insertIndex] = insertElement;
    setArray([...tempArr]);
    addLog(`Placed arr[${insertIndex}] = ${insertElement}. Return 1 (Success)`);
    setStatusMessage(`Successfully inserted element ${insertElement} at index ${insertIndex}!`);

    // 4. Update size in caller main()
    const newSize = size + 1;
    setSize(newSize);
    addLog(`Caller main(): size += 1 (New size = ${newSize})`);
    await new Promise(r => setTimeout(r, 600));

    setIPointer(null);
    setDestPointer(null);
    setIsExecuting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full mb-2">
            <Plus className="h-3.5 w-3.5" />
            Video #10 Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            C Array Insertion Memory Simulator
          </h3>
        </div>

        <button
          onClick={handleReset}
          disabled={isExecuting}
          className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset Buffer
        </button>
      </div>

      {/* Array Memory Display */}
      <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <div className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <span>Contiguous Memory Blocks (<code className="font-mono">int arr[100]</code>)</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 px-2 py-0.5 rounded font-bold">
              Size = {size}
            </span>
            <span className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 rounded">
              Capacity = {capacity}
            </span>
          </div>
        </div>

        {/* Cells */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 min-w-[320px]">
            {array.map((val, idx) => {
              const isUsed = idx < size;
              const isI = iPointer === idx;
              const isDest = destPointer === idx;

              return (
                <div
                  key={idx}
                  className={`relative p-2.5 rounded-xl border text-center transition-all duration-300 ${
                    isI
                      ? 'bg-amber-300 dark:bg-amber-600 border-amber-500 text-gray-950 scale-105 shadow-md z-10'
                      : isDest
                        ? 'bg-blue-300 dark:bg-blue-600 border-blue-500 text-gray-950 scale-105 shadow-md z-10'
                        : isUsed
                          ? 'bg-emerald-100/90 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 font-bold'
                          : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-400 opacity-50'
                  }`}
                >
                  <div className="text-[10px] font-mono text-gray-400 mb-1">
                    Index {idx}
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold">
                    {val !== null ? val : '-'}
                  </div>

                  <div className="mt-1 h-3 flex items-center justify-center text-[9px] font-mono font-bold">
                    {isI && <span className="bg-amber-800 text-white px-1 rounded">i</span>}
                    {isDest && <span className="bg-blue-800 text-white px-1 rounded">i+1</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Form */}
      <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
          Insertion Input Parameters
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Element to Insert (<code className="font-mono">element</code>)
            </label>
            <input
              type="number"
              value={insertElement}
              onChange={(e) => setInsertElement(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Target Index (<code className="font-mono">index</code>)
            </label>
            <input
              type="number"
              value={insertIndex}
              onChange={(e) => setInsertIndex(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
              min={0}
              max={capacity}
            />
          </div>

          <div>
            <button
              onClick={runInsertion}
              disabled={isExecuting}
              className="w-full px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[38px]"
            >
              <Play className="h-4 w-4" /> Run <code className="font-mono">indInsertion()</code>
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="mt-3 text-xs font-mono p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="truncate">{statusMessage}</span>
        </div>
      </div>

      {/* Execution Logs */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Step-by-Step Call Log
        </div>
        <div className="bg-gray-950 text-gray-200 font-mono text-xs p-3.5 rounded-xl border border-gray-800 space-y-1 max-h-36 overflow-y-auto">
          {executionLogs.map((log, idx) => (
            <div key={idx} className={idx === 0 ? 'text-emerald-400 font-bold' : 'text-gray-400'}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
