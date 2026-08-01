'use client';

import React, { useState } from 'react';
import { Database, Plus, Trash2, Edit3, Play, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';

export function ArrayADTSimulator() {
  const [totalSize, setTotalSize] = useState<number>(8);
  const [usedSize, setUsedSize] = useState<number>(3);
  const [heapArray, setHeapArray] = useState<(number | null)[]>([12, 25, 42, null, null, null, null, null]);
  const [heapAddress] = useState<string>('0x7ff0042a');
  
  // Input fields state
  const [inputIdx, setInputIdx] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(99);
  
  const [logs, setLogs] = useState<string[]>([
    'Initialized struct myArray marks at Stack address 0x7fff56a',
    'Called createArray(&marks, 8, 3): Allocated 8 * sizeof(int) = 32 bytes on Heap at 0x7ff0042a',
    'Populated 3 active elements: [12, 25, 42]'
  ]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 7)]);
  };

  // Re-create Array constructor
  const handleCreateArray = (newTotal: number, newUsed: number) => {
    const t = Math.max(1, Math.min(16, newTotal));
    const u = Math.max(0, Math.min(t, newUsed));
    
    const newArr: (number | null)[] = Array(t).fill(null);
    for (let i = 0; i < u; i++) {
      newArr[i] = Math.floor(Math.random() * 90) + 10;
    }
    
    setTotalSize(t);
    setUsedSize(u);
    setHeapArray(newArr);
    addLog(`createArray(&marks, ${t}, ${u}): Heap buffer dynamically re-allocated (${t * 4} bytes).`);
  };

  // Set Value at Index
  const handleSetVal = () => {
    if (inputIdx < 0 || inputIdx >= usedSize) {
      addLog(`[Error] Invalid index ${inputIdx}. Index must be between 0 and used_size - 1 (${usedSize - 1}).`);
      return;
    }
    const updated = [...heapArray];
    updated[inputIdx] = inputValue;
    setHeapArray(updated);
    addLog(`setVal: (marks.ptr)[${inputIdx}] = ${inputValue}`);
  };

  // Insert Element at Index (shifting elements right)
  const handleInsert = () => {
    if (usedSize >= totalSize) {
      addLog(`[Error] Overflow! used_size (${usedSize}) equals total_size (${totalSize}). Reserve more space!`);
      return;
    }
    if (inputIdx < 0 || inputIdx > usedSize) {
      addLog(`[Error] Cannot insert at index ${inputIdx}. Valid range: 0 to ${usedSize}.`);
      return;
    }

    const updated = [...heapArray];
    // Shift elements right
    for (let i = usedSize; i > inputIdx; i--) {
      updated[i] = updated[i - 1];
    }
    updated[inputIdx] = inputValue;
    setHeapArray(updated);
    setUsedSize(usedSize + 1);
    addLog(`insert: Shifted elements right from index ${inputIdx}. Inserted ${inputValue}. New used_size = ${usedSize + 1}.`);
  };

  // Delete Element at Index (shifting elements left)
  const handleDelete = () => {
    if (usedSize === 0) {
      addLog(`[Error] Underflow! Array is empty.`);
      return;
    }
    if (inputIdx < 0 || inputIdx >= usedSize) {
      addLog(`[Error] Cannot delete index ${inputIdx}. Valid active index range: 0 to ${usedSize - 1}.`);
      return;
    }

    const deletedVal = heapArray[inputIdx];
    const updated = [...heapArray];
    // Shift elements left
    for (let i = inputIdx; i < usedSize - 1; i++) {
      updated[i] = updated[i + 1];
    }
    updated[usedSize - 1] = null;
    setHeapArray(updated);
    setUsedSize(usedSize - 1);
    addLog(`delete: Deleted value ${deletedVal} at index ${inputIdx}. Shifted elements left. New used_size = ${usedSize - 1}.`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 sm:my-8 font-sans w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full mb-2">
            <Database className="h-3.5 w-3.5" />
            Interactive C Memory Simulator
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Array ADT Memory Visualizer
          </h3>
        </div>

        {/* Preset configuration buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCreateArray(8, 3)}
            className="w-full sm:w-auto justify-center px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reset (Size 8, Used 3)
          </button>
        </div>
      </div>

      {/* Memory Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-6">
        {/* Stack Memory Representation */}
        <div className="lg:col-span-4 bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-blue-200 dark:border-blue-900/40">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
              Stack Memory
            </span>
            <span className="text-[10px] font-mono bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded truncate">
              struct myArray marks
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 bg-white dark:bg-gray-950 rounded border border-blue-100 dark:border-blue-900/50 flex justify-between items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">total_size:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                {totalSize}
              </span>
            </div>

            <div className="p-2.5 bg-white dark:bg-gray-950 rounded border border-blue-100 dark:border-blue-900/50 flex justify-between items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">used_size:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                {usedSize}
              </span>
            </div>

            <div className="p-2.5 bg-white dark:bg-gray-950 rounded border border-blue-100 dark:border-blue-900/50 flex justify-between items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 shrink-0">ptr (base addr):</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded flex items-center gap-1 text-[11px] truncate">
                {heapAddress} <ArrowRight className="h-3 w-3 shrink-0" />
              </span>
            </div>
          </div>
        </div>

        {/* Heap Memory Buffer */}
        <div className="lg:col-span-8 bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Heap Memory Buffer (<code className="font-mono">{totalSize * 4} Bytes</code>)
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              Active: {usedSize} / Reserved: {totalSize}
            </span>
          </div>

          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 min-w-[280px] mb-1">
              {heapArray.map((val, idx) => {
                const isOccupied = idx < usedSize;
                return (
                  <div
                    key={idx}
                    className={`relative p-2 rounded-lg border text-center transition-all duration-200 ${
                      isOccupied
                        ? 'bg-emerald-100/90 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 shadow-sm'
                        : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 opacity-60'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-gray-400 dark:text-gray-500 mb-0.5">
                      Idx {idx}
                    </div>
                    <div className="font-mono font-bold text-xs sm:text-sm">
                      {val !== null ? val : '-'}
                    </div>
                    {isOccupied && (
                      <div className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Active
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0"></span> Used Slots (<code className="font-mono">used_size</code>)
            </span>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700 inline-block shrink-0"></span> Reserved Capacity (<code className="font-mono">total_size</code>)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Operations Form */}
      <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
          Execute Array ADT Operations
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Index (<code className="font-mono">i</code>)
            </label>
            <input
              type="number"
              value={inputIdx}
              onChange={(e) => setInputIdx(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
              min={0}
              max={totalSize - 1}
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Value (<code className="font-mono">val</code>)
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="sm:col-span-6 flex flex-wrap gap-2 pt-1 sm:pt-0">
            <button
              onClick={handleSetVal}
              className="flex-1 sm:flex-initial justify-center px-3.5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm min-h-[38px]"
            >
              <Edit3 className="h-3.5 w-3.5" /> setVal()
            </button>
            <button
              onClick={handleInsert}
              className="flex-1 sm:flex-initial justify-center px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm min-h-[38px]"
            >
              <Plus className="h-3.5 w-3.5" /> insert()
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 sm:flex-initial justify-center px-3.5 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm min-h-[38px]"
            >
              <Trash2 className="h-3.5 w-3.5" /> delete()
            </button>
          </div>
        </div>
      </div>

      {/* Execution Console Logs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Play className="h-3 w-3" /> Console &amp; Memory Operations Log
          </span>
        </div>
        <div className="bg-gray-950 text-gray-200 font-mono text-xs p-3.5 rounded-xl border border-gray-800 space-y-1.5 max-h-40 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className={index === 0 ? 'text-emerald-400 font-bold break-all sm:break-normal' : 'text-gray-400 break-all sm:break-normal'}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
