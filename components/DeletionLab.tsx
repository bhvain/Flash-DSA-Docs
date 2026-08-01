'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Trash2, AlertCircle, CheckCircle2, ArrowLeft, Terminal, Cpu } from 'lucide-react';

export function DeletionLab() {
  const [capacity, setCapacity] = useState<number>(10);
  const [size, setSize] = useState<number>(5);
  const [array, setArray] = useState<(number | null)[]>([1, 2, 12, 18, 8, null, null, null, null, null]);
  
  const [deleteIndex, setDeleteIndex] = useState<number>(2);

  // Animation states
  const [iPointer, setIPointer] = useState<number | null>(null);
  const [sourcePointer, setSourcePointer] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to test array deletion algorithm');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'Initialized array: {1, 2, 12, 18, 8}',
    'Capacity: 10, Size: 5'
  ]);

  const addLog = (msg: string) => {
    setExecutionLogs(prev => [msg, ...prev.slice(0, 7)]);
  };

  const handleReset = () => {
    setCapacity(10);
    setSize(5);
    setArray([1, 2, 12, 18, 8, null, null, null, null, null]);
    setIPointer(null);
    setSourcePointer(null);
    setIsExecuting(false);
    setStatusMessage('Array reset to initial state: {1, 2, 12, 18, 8}');
    addLog('Reset array to default state: {1, 2, 12, 18, 8}');
  };

  // Step-by-step C indDeletion algorithm simulation
  const runDeletion = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    addLog(`=== Called indDeletion(arr, size=${size}, index=${deleteIndex}) ===`);

    // 1. Out of bounds check
    if (deleteIndex < 0 || deleteIndex >= size) {
      addLog(`❌ INVALID INDEX ERROR: index (${deleteIndex}) out of bounds (0 to ${size - 1}). Return -1`);
      setStatusMessage(`Deletion Failed: Target index ${deleteIndex} is out of bounds!`);
      setIsExecuting(false);
      return;
    }

    if (size <= 0) {
      addLog(`❌ UNDERFLOW ERROR: size is 0. Nothing to delete!`);
      setStatusMessage('Deletion Failed: Array underflow (array is empty)!');
      setIsExecuting(false);
      return;
    }

    const removedValue = array[deleteIndex];
    setStatusMessage(`Deleting element arr[${deleteIndex}] = ${removedValue}. Left shifting subsequent elements...`);
    const tempArr = [...array];

    // 2. Left Shift Loop: for (int i = index; i < size - 1; i++) arr[i] = arr[i + 1];
    for (let i = deleteIndex; i < size - 1; i++) {
      setIPointer(i);
      setSourcePointer(i + 1);
      const valToMove = tempArr[i + 1];
      addLog(`Loop i=${i}: arr[${i}] = arr[${i + 1}] (${valToMove})`);
      setStatusMessage(`Copying arr[${i + 1}] (${valToMove}) into arr[${i}]...`);

      tempArr[i] = valToMove;
      setArray([...tempArr]);
      await new Promise(r => setTimeout(r, 750));
    }

    // Clear the last element position in our UI view
    tempArr[size - 1] = null;
    setArray([...tempArr]);

    addLog(`Finished left-shifting. Deleted value ${removedValue} successfully.`);

    // 3. Update size in main caller
    const newSize = size - 1;
    setSize(newSize);
    addLog(`Caller main(): size -= 1 (New size = ${newSize})`);
    setStatusMessage(`Successfully deleted element at index ${deleteIndex}! New active size = ${newSize}.`);

    setIPointer(null);
    setSourcePointer(null);
    setIsExecuting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full mb-2">
            <Trash2 className="h-3.5 w-3.5" />
            Array Deletion Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            C Array Deletion Memory Simulator
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
            <span>Contiguous Memory Buffer (<code className="font-mono">int arr[100]</code>)</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 px-2 py-0.5 rounded font-bold">
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
              const isSource = sourcePointer === idx;
              const isTargetInitial = idx === deleteIndex && isExecuting && iPointer === null;

              return (
                <div
                  key={idx}
                  className={`relative p-2.5 rounded-xl border text-center transition-all duration-300 ${
                    isI
                      ? 'bg-amber-300 dark:bg-amber-600 border-amber-500 text-gray-950 scale-105 shadow-md z-10'
                      : isSource
                        ? 'bg-purple-300 dark:bg-purple-600 border-purple-500 text-gray-950 scale-105 shadow-md z-10'
                        : isTargetInitial
                          ? 'bg-rose-200 dark:bg-rose-900/80 border-rose-500 text-rose-950 scale-105 animate-pulse'
                          : isUsed
                            ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 font-bold'
                            : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-400 opacity-40'
                  }`}
                >
                  <div className="text-[10px] font-mono text-gray-400 mb-1">
                    Index {idx}
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold">
                    {val !== null ? val : '-'}
                  </div>

                  <div className="mt-1 h-3 flex items-center justify-center text-[9px] font-mono font-bold">
                    {isI && <span className="bg-amber-800 text-white px-1 rounded">arr[i]</span>}
                    {isSource && <span className="bg-purple-800 text-white px-1 rounded">arr[i+1]</span>}
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
          Deletion Parameters
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Target Index to Delete (<code className="font-mono">index</code>)
            </label>
            <input
              type="number"
              value={deleteIndex}
              onChange={(e) => setDeleteIndex(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
              min={0}
              max={capacity - 1}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { setDeleteIndex(0); }}
              className="px-2.5 py-2 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
            >
              First (Index 0)
            </button>
            <button
              onClick={() => { setDeleteIndex(2); }}
              className="px-2.5 py-2 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
            >
              Middle (Index 2)
            </button>
          </div>

          <div>
            <button
              onClick={runDeletion}
              disabled={isExecuting}
              className="w-full px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[38px]"
            >
              <Trash2 className="h-4 w-4" /> Run <code className="font-mono">indDeletion()</code>
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="mt-3 text-xs font-mono p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span className="truncate">{statusMessage}</span>
        </div>
      </div>

      {/* Execution Logs */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Step-by-Step Deletion Execution Trace
        </div>
        <div className="bg-gray-950 text-gray-200 font-mono text-xs p-3.5 rounded-xl border border-gray-800 space-y-1 max-h-36 overflow-y-auto">
          {executionLogs.map((log, idx) => (
            <div key={idx} className={idx === 0 ? 'text-rose-400 font-bold' : 'text-gray-400'}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
