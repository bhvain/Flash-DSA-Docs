'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Search, AlertCircle, Terminal, Cpu } from 'lucide-react';

export function SearchLab() {
  const [activeTab, setActiveTab] = useState<'linear' | 'binary'>('linear');
  const [searchTarget, setSearchTarget] = useState<number>(56);
  
  // Unsorted array for linear search
  const unsortedArray = [4, 8, 10, 12, 15, 2, 79, 56, 1, 99];
  // Sorted array for binary search
  const sortedArray = [1, 3, 5, 8, 14, 32, 56, 64, 73, 123, 225, 444];

  const currentArray = activeTab === 'linear' ? unsortedArray : sortedArray;

  // Animation states
  const [iPointer, setIPointer] = useState<number | null>(null);
  const [binaryPointers, setBinaryPointers] = useState<{ low: number; high: number; mid: number } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to test search algorithm');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>(['Waiting for search execution...']);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);

  const addLog = (msg: string) => {
    setExecutionLogs(prev => [msg, ...prev.slice(0, 9)]);
  };

  const handleReset = () => {
    setIPointer(null);
    setBinaryPointers(null);
    setIsExecuting(false);
    setFoundIndex(null);
    setStatusMessage('Reset buffer ready for new search');
    addLog('Reset search state.');
  };

  const handleTabChange = (tab: 'linear' | 'binary') => {
    if (isExecuting) return;
    setActiveTab(tab);
    setSearchTarget(tab === 'linear' ? 12 : 64);
    handleReset();
    setExecutionLogs([`Switched to ${tab === 'linear' ? 'Linear' : 'Binary'} Search mode.`]);
  };

  const runLinearSearch = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setFoundIndex(null);
    addLog(`=== Called linearSearch(arr, size=${unsortedArray.length}, element=${searchTarget}) ===`);
    
    let found = false;
    for (let i = 0; i < unsortedArray.length; i++) {
      setIPointer(i);
      addLog(`Checking index ${i} (value: ${unsortedArray[i]})`);
      setStatusMessage(`Comparing target ${searchTarget} with arr[${i}] (${unsortedArray[i]})...`);
      
      await new Promise(r => setTimeout(r, 600));
      
      if (unsortedArray[i] === searchTarget) {
        addLog(`✅ MATCH! arr[${i}] == ${searchTarget}. Return ${i}`);
        setStatusMessage(`Element ${searchTarget} found at index ${i}!`);
        setFoundIndex(i);
        found = true;
        break;
      }
    }
    
    if (!found) {
      addLog(`❌ Element ${searchTarget} not found in the array. Return -1`);
      setStatusMessage(`Search complete. Element ${searchTarget} not found.`);
    }
    
    setIsExecuting(false);
  };

  const runBinarySearch = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setFoundIndex(null);
    addLog(`=== Called binarySearch(arr, size=${sortedArray.length}, element=${searchTarget}) ===`);
    
    let low = 0;
    let high = sortedArray.length - 1;
    let found = false;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      setBinaryPointers({ low, high, mid });
      addLog(`State: low=${low}, high=${high}, mid=${mid}`);
      setStatusMessage(`Calculated mid = (${low} + ${high}) / 2 = ${mid}. Checking arr[${mid}] (${sortedArray[mid]})...`);
      
      await new Promise(r => setTimeout(r, 1200));
      
      if (sortedArray[mid] === searchTarget) {
        addLog(`✅ MATCH! arr[${mid}] == ${searchTarget}. Return ${mid}`);
        setStatusMessage(`Element ${searchTarget} found at index ${mid}!`);
        setFoundIndex(mid);
        found = true;
        break;
      }
      
      if (sortedArray[mid] < searchTarget) {
        addLog(`arr[mid] (${sortedArray[mid]}) < ${searchTarget}. Adjusting low to mid + 1 (${mid + 1})`);
        low = mid + 1;
      } else {
        addLog(`arr[mid] (${sortedArray[mid]}) > ${searchTarget}. Adjusting high to mid - 1 (${mid - 1})`);
        high = mid - 1;
      }
      
      await new Promise(r => setTimeout(r, 600));
    }
    
    if (!found) {
      setBinaryPointers(null);
      addLog(`❌ low (${low}) > high (${high}). Element ${searchTarget} not found. Return -1`);
      setStatusMessage(`Search complete. Element ${searchTarget} not found.`);
    }
    
    setIsExecuting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 font-sans w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full mb-2">
            <Search className="h-3.5 w-3.5" />
            Search Algorithm Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Linear vs Binary Search Interactive Lab
          </h3>
        </div>

        <button
          onClick={handleReset}
          disabled={isExecuting}
          className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset State
        </button>
      </div>

      <div className="flex gap-2 mb-4 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-max">
        <button
          onClick={() => handleTabChange('linear')}
          disabled={isExecuting}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'linear' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
        >
          Linear Search
        </button>
        <button
          onClick={() => handleTabChange('binary')}
          disabled={isExecuting}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'binary' ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
        >
          Binary Search
        </button>
      </div>

      {/* Array Display */}
      <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {activeTab === 'linear' ? 'Unsorted Array (Size 10)' : 'Sorted Array (Size 12)'}
          </span>
          {activeTab === 'binary' && binaryPointers && (
            <div className="flex gap-3 text-[10px] font-mono font-bold bg-white dark:bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800">
              <span className="text-indigo-600 dark:text-indigo-400">Low: {binaryPointers.low}</span>
              <span className="text-amber-600 dark:text-amber-500">Mid: {binaryPointers.mid}</span>
              <span className="text-emerald-600 dark:text-emerald-400">High: {binaryPointers.high}</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto pb-2">
          <div className={`flex gap-2 min-w-max`}>
            {currentArray.map((val, idx) => {
              const isFound = foundIndex === idx;
              let highlightClass = 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300';
              let badge = null;

              if (activeTab === 'linear') {
                if (iPointer === idx) {
                  highlightClass = 'bg-amber-200 dark:bg-amber-900/60 border-amber-400 text-amber-900 dark:text-amber-100 scale-105 shadow-md';
                  badge = <span className="bg-amber-600 text-white px-1.5 rounded">i</span>;
                }
              } else {
                if (binaryPointers) {
                  const { low, high, mid } = binaryPointers;
                  if (idx >= low && idx <= high) {
                    highlightClass = 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100';
                  } else {
                    highlightClass = 'bg-gray-100 dark:bg-gray-900 border-gray-100 dark:border-gray-900 text-gray-400 opacity-40';
                  }
                  
                  if (idx === mid) {
                    highlightClass = 'bg-amber-200 dark:bg-amber-900/60 border-amber-400 text-amber-900 dark:text-amber-100 scale-105 shadow-md';
                    badge = <span className="bg-amber-600 text-white px-1 rounded">mid</span>;
                  } else if (idx === low) {
                    badge = <span className="bg-indigo-600 text-white px-1 rounded">low</span>;
                  } else if (idx === high) {
                    badge = <span className="bg-emerald-600 text-white px-1 rounded">high</span>;
                  }
                }
              }

              if (isFound) {
                highlightClass = 'bg-green-200 dark:bg-green-900/60 border-green-500 text-green-900 dark:text-green-100 scale-110 shadow-lg';
                badge = <span className="bg-green-600 text-white px-1.5 rounded text-[8px] uppercase">Found</span>;
              }

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col items-center justify-center min-w-[3rem] h-[4rem] rounded-xl border transition-all duration-300 ${highlightClass}`}
                >
                  <div className="absolute top-1 text-[9px] font-mono opacity-60">
                    {idx}
                  </div>
                  <div className="mt-3 font-mono text-sm font-bold">
                    {val}
                  </div>
                  <div className="absolute -bottom-2 h-4 flex items-center justify-center text-[9px] font-mono font-bold">
                    {badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Form */}
      <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Element to Search
            </label>
            <input
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <button
              onClick={activeTab === 'linear' ? runLinearSearch : runBinarySearch}
              disabled={isExecuting}
              className="w-full px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[38px]"
            >
              <Play className="h-4 w-4" /> Run {activeTab === 'linear' ? 'Linear' : 'Binary'} Search
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-xs font-mono p-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="truncate font-bold">{statusMessage}</span>
        </div>
      </div>

      {/* Execution Logs */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Execution Trace
        </div>
        <div className="bg-gray-950 text-gray-200 font-mono text-xs p-3.5 rounded-xl border border-gray-800 space-y-1 max-h-40 overflow-y-auto">
          {executionLogs.map((log, idx) => (
            <div key={idx} className={idx === 0 ? 'text-indigo-400 font-bold' : 'text-gray-400'}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
