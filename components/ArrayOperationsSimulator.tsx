'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Plus, Trash2, Search, ArrowRight, ArrowLeft, Layers, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

export function ArrayOperationsSimulator() {
  const [capacity] = useState<number>(10);
  const [usedSize, setUsedSize] = useState<number>(5);
  const [array, setArray] = useState<(number | null)[]>([7, 8, 9, 10, 15, null, null, null, null, null]);

  // Active operation mode
  const [activeTab, setActiveTab] = useState<'traversal' | 'insertion' | 'deletion' | 'search'>('traversal');

  // Input states
  const [opIndex, setOpIndex] = useState<number>(2);
  const [opValue, setOpValue] = useState<number>(5);
  const [searchTarget, setSearchTarget] = useState<number>(10);
  const [searchType, setSearchType] = useState<'linear' | 'binary'>('linear');
  const [insertMode, setInsertMode] = useState<'order' | 'fast'>('order');
  const [deleteMode, setDeleteMode] = useState<'order' | 'fast'>('order');

  // Animation & highlights
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [secondaryHighlightIdx, setSecondaryHighlightIdx] = useState<number | null>(null);
  const [binaryPointers, setBinaryPointers] = useState<{ low: number; high: number; mid: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    'Initialized array with Capacity = 10, Used Size = 5',
    'Elements: [7, 8, 9, 10, 15]'
  ]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 9)]);
  };

  // Reset array
  const handleReset = () => {
    setUsedSize(5);
    setArray([7, 8, 9, 10, 15, null, null, null, null, null]);
    setHighlightIdx(null);
    setSecondaryHighlightIdx(null);
    setBinaryPointers(null);
    setIsAnimating(false);
    addLog('Reset array to default state: [7, 8, 9, 10, 15]');
  };

  // 1. TRAVERSAL ANIMATION
  const handleRunTraversal = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setBinaryPointers(null);
    addLog('Starting Array Traversal (Visiting index 0 to used_size - 1)...');

    for (let i = 0; i < usedSize; i++) {
      setHighlightIdx(i);
      addLog(`Visited index ${i} ➔ Element = ${array[i]}`);
      await new Promise(r => setTimeout(r, 600));
    }

    setHighlightIdx(null);
    setIsAnimating(false);
    addLog('✓ Traversal completed successfully! Time Complexity: O(n)');
  };

  // 2. INSERTION ANIMATION
  const handleRunInsertion = async () => {
    if (isAnimating) return;

    if (usedSize >= capacity) {
      addLog('❌ OVERFLOW ERROR: Array is full! Size (10) equals Capacity (10). Cannot insert.');
      return;
    }

    if (opIndex < 0 || opIndex > usedSize) {
      addLog(`❌ INVALID INDEX: Cannot insert at index ${opIndex}. Valid range: 0 to ${usedSize}.`);
      return;
    }

    setIsAnimating(true);
    setBinaryPointers(null);

    if (insertMode === 'order') {
      addLog(`Insertion (Order Preserved): Inserting ${opValue} at index ${opIndex}...`);
      const tempArr = [...array];

      // Shift elements right starting from usedSize down to opIndex
      for (let i = usedSize; i > opIndex; i--) {
        setHighlightIdx(i);
        setSecondaryHighlightIdx(i - 1);
        addLog(`Shifting element ${tempArr[i - 1]} from index ${i - 1} ➔ index ${i}`);
        tempArr[i] = tempArr[i - 1];
        setArray([...tempArr]);
        await new Promise(r => setTimeout(r, 600));
      }

      // Place value
      tempArr[opIndex] = opValue;
      setHighlightIdx(opIndex);
      setSecondaryHighlightIdx(null);
      setArray([...tempArr]);
      setUsedSize(prev => prev + 1);
      addLog(`Placed value ${opValue} at index ${opIndex}. Incremented used_size to ${usedSize + 1}.`);
      await new Promise(r => setTimeout(r, 600));

    } else {
      // Fast mode (unsorted): Move element at opIndex to end, insert new value
      addLog(`Insertion (Unsorted/Fast): Swapping element at index ${opIndex} to end (index ${usedSize})...`);
      const tempArr = [...array];

      if (opIndex < usedSize) {
        tempArr[usedSize] = tempArr[opIndex];
        addLog(`Moved existing value ${tempArr[opIndex]} to end slot at index ${usedSize}`);
      }
      tempArr[opIndex] = opValue;
      setHighlightIdx(opIndex);
      setArray([...tempArr]);
      setUsedSize(prev => prev + 1);
      addLog(`Inserted ${opValue} at index ${opIndex} in O(1) time! New used_size = ${usedSize + 1}`);
      await new Promise(r => setTimeout(r, 600));
    }

    setHighlightIdx(null);
    setSecondaryHighlightIdx(null);
    setIsAnimating(false);
  };

  // 3. DELETION ANIMATION
  const handleRunDeletion = async () => {
    if (isAnimating) return;

    if (usedSize === 0) {
      addLog('❌ UNDERFLOW ERROR: Array is empty! Cannot delete.');
      return;
    }

    if (opIndex < 0 || opIndex >= usedSize) {
      addLog(`❌ INVALID INDEX: Cannot delete index ${opIndex}. Active index range: 0 to ${usedSize - 1}.`);
      return;
    }

    setIsAnimating(true);
    setBinaryPointers(null);

    const targetVal = array[opIndex];

    if (deleteMode === 'order') {
      addLog(`Deletion (Order Preserved): Deleting value ${targetVal} at index ${opIndex}...`);
      const tempArr = [...array];

      // Shift elements left
      for (let i = opIndex; i < usedSize - 1; i++) {
        setHighlightIdx(i);
        setSecondaryHighlightIdx(i + 1);
        addLog(`Shifting element ${tempArr[i + 1]} from index ${i + 1} ➔ index ${i}`);
        tempArr[i] = tempArr[i + 1];
        setArray([...tempArr]);
        await new Promise(r => setTimeout(r, 600));
      }

      tempArr[usedSize - 1] = null;
      setArray([...tempArr]);
      setUsedSize(prev => prev - 1);
      addLog(`Cleared index ${usedSize - 1}. Decremented used_size to ${usedSize - 1}.`);
      await new Promise(r => setTimeout(r, 600));

    } else {
      // Fast deletion (Unsorted)
      addLog(`Deletion (Unsorted/Fast): Replacing index ${opIndex} with last active element (${array[usedSize - 1]})...`);
      const tempArr = [...array];
      tempArr[opIndex] = tempArr[usedSize - 1];
      tempArr[usedSize - 1] = null;
      setHighlightIdx(opIndex);
      setArray([...tempArr]);
      setUsedSize(prev => prev - 1);
      addLog(`Replaced index ${opIndex} in O(1) constant time. New used_size = ${usedSize - 1}.`);
      await new Promise(r => setTimeout(r, 600));
    }

    setHighlightIdx(null);
    setSecondaryHighlightIdx(null);
    setIsAnimating(false);
  };

  // 4. SEARCH ANIMATION
  const handleRunSearch = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (searchType === 'linear') {
      addLog(`Linear Search: Searching for key ${searchTarget} from index 0 to ${usedSize - 1}...`);
      let found = false;

      for (let i = 0; i < usedSize; i++) {
        setHighlightIdx(i);
        addLog(`Checking index ${i}: Value = ${array[i]}`);
        if (array[i] === searchTarget) {
          addLog(`✓ TARGET FOUND! ${searchTarget} is at index ${i}. Time Complexity: O(n)`);
          found = true;
          break;
        }
        await new Promise(r => setTimeout(r, 600));
      }

      if (!found) {
        addLog(`❌ TARGET NOT FOUND: ${searchTarget} is not present in the array.`);
        setHighlightIdx(null);
      }
    } else {
      // Binary Search (Requires sorted array)
      addLog(`Binary Search: Sorting active array first to enable Binary Search...`);
      
      // Ensure active portion is sorted
      const activePortion = array.slice(0, usedSize).filter((v): v is number => v !== null).sort((a, b) => a - b);
      const sortedArray: (number | null)[] = Array(capacity).fill(null);
      activePortion.forEach((val, i) => { sortedArray[i] = val; });
      setArray(sortedArray);

      await new Promise(r => setTimeout(r, 500));

      let low = 0;
      let high = usedSize - 1;
      let found = false;

      addLog(`Starting Binary Search for key ${searchTarget} (low=0, high=${high})...`);

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        setBinaryPointers({ low, high, mid });
        setHighlightIdx(mid);

        const midVal = sortedArray[mid];
        addLog(`low=${low}, high=${high}, mid=${mid} (Value at mid = ${midVal})`);
        await new Promise(r => setTimeout(r, 1000));

        if (midVal === searchTarget) {
          addLog(`✓ TARGET FOUND! Key ${searchTarget} found at index ${mid}! Time Complexity: O(log n)`);
          found = true;
          break;
        } else if (midVal! < searchTarget) {
          addLog(`${midVal} < ${searchTarget} ➔ Target must be in right half. Set low = mid + 1 (${mid + 1})`);
          low = mid + 1;
        } else {
          addLog(`${midVal} > ${searchTarget} ➔ Target must be in left half. Set high = mid - 1 (${mid - 1})`);
          high = mid - 1;
        }
      }

      if (!found) {
        addLog(`❌ TARGET NOT FOUND: ${searchTarget} does not exist in array (low > high).`);
        setHighlightIdx(null);
        setBinaryPointers(null);
      }
    }

    setIsAnimating(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 sm:my-8 font-sans w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full mb-2">
            <Zap className="h-3.5 w-3.5" />
            Interactive Array Operations Lab
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Array Operations &amp; Time Complexity Visualizer
          </h3>
        </div>

        <button
          onClick={handleReset}
          disabled={isAnimating}
          className="w-full sm:w-auto justify-center px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset Array
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setActiveTab('traversal')}
          className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'traversal'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Play className="h-4 w-4" /> Traversal
        </button>
        <button
          onClick={() => setActiveTab('insertion')}
          className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'insertion'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Plus className="h-4 w-4" /> Insertion
        </button>
        <button
          onClick={() => setActiveTab('deletion')}
          className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'deletion'
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
              : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Trash2 className="h-4 w-4" /> Deletion
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'search'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Search className="h-4 w-4" /> Searching
        </button>
      </div>

      {/* Array Canvas & Memory Slots */}
      <div className="bg-gray-50 dark:bg-gray-900/60 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Array Buffer
            </span>
            <span className="text-xs font-mono text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
              Used: {usedSize} / Capacity: {capacity}
            </span>
          </div>
          {usedSize >= capacity && (
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" /> Overflow Condition
            </span>
          )}
        </div>

        {/* Pointer indicators for binary search */}
        {binaryPointers && (
          <div className="flex justify-between items-center text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 p-2 rounded-lg mb-3">
            <span>Low: Index {binaryPointers.low}</span>
            <span className="font-bold underline">Mid: Index {binaryPointers.mid}</span>
            <span>High: Index {binaryPointers.high}</span>
          </div>
        )}

        {/* Array Cells */}
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 min-w-[320px]">
            {array.map((val, idx) => {
              const isUsed = idx < usedSize;
              const isHighlight = highlightIdx === idx;
              const isSecondary = secondaryHighlightIdx === idx;
              const isMid = binaryPointers?.mid === idx;
              const isLow = binaryPointers?.low === idx;
              const isHigh = binaryPointers?.high === idx;

              return (
                <div
                  key={idx}
                  className={`relative p-2.5 rounded-xl border text-center transition-all duration-300 ${
                    isHighlight
                      ? 'bg-amber-300 dark:bg-amber-600 border-amber-500 text-gray-950 scale-105 shadow-md z-10'
                      : isSecondary
                        ? 'bg-blue-200 dark:bg-blue-800 border-blue-400 text-gray-900 dark:text-gray-100 scale-105'
                        : isUsed
                          ? 'bg-emerald-100/90 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 shadow-sm'
                          : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 opacity-60'
                  }`}
                >
                  <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mb-1">
                    Idx {idx}
                  </div>
                  <div className="font-mono font-bold text-sm sm:text-base">
                    {val !== null ? val : '-'}
                  </div>

                  {/* Badges for pointers */}
                  <div className="mt-1 flex flex-wrap justify-center gap-0.5">
                    {isLow && <span className="text-[8px] bg-indigo-200 text-indigo-900 px-1 rounded font-bold">L</span>}
                    {isMid && <span className="text-[8px] bg-amber-200 text-amber-900 px-1 rounded font-bold">M</span>}
                    {isHigh && <span className="text-[8px] bg-indigo-200 text-indigo-900 px-1 rounded font-bold">H</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Operation Controls according to Tab */}
      <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
        {activeTab === 'traversal' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Array Traversal
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Visit each element from index <code className="font-mono">0</code> to <code className="font-mono">{usedSize - 1}</code> exactly once.
                </p>
              </div>
              <button
                onClick={handleRunTraversal}
                disabled={isAnimating || usedSize === 0}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[38px]"
              >
                <Play className="h-4 w-4" /> Run Traversal
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="font-bold text-blue-600 dark:text-blue-400">Time Complexity:</span>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded font-mono">O(n)</code> (Requires visiting all active elements)
            </div>
          </div>
        )}

        {activeTab === 'insertion' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Array Insertion
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Insert a new element at the designated index.
                </p>
              </div>

              {/* Mode Select */}
              <div className="flex items-center gap-2 text-xs bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setInsertMode('order')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    insertMode === 'order'
                      ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Preserve Order (Shifting)
                </button>
                <button
                  onClick={() => setInsertMode('fast')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    insertMode === 'fast'
                      ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Unsorted / Fast (Swap)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Insert Index (<code className="font-mono">0</code> to <code className="font-mono">{usedSize}</code>)
                </label>
                <input
                  type="number"
                  value={opIndex}
                  onChange={(e) => setOpIndex(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
                  min={0}
                  max={usedSize}
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Element Value
                </label>
                <input
                  type="number"
                  value={opValue}
                  onChange={(e) => setOpValue(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="sm:col-span-4">
                <button
                  onClick={handleRunInsertion}
                  disabled={isAnimating || usedSize >= capacity}
                  className="w-full px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[38px]"
                >
                  <Plus className="h-4 w-4" /> Execute Insertion
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-3 pt-1">
              <span>
                <strong>Best Case:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">O(1)</code> (Insert at end)
              </span>
              <span>
                <strong>Worst Case:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">O(n)</code> (Insert at index 0 requires shifting n elements)
              </span>
            </div>
          </div>
        )}

        {activeTab === 'deletion' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Array Deletion
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Remove an element at the target index.
                </p>
              </div>

              {/* Mode Select */}
              <div className="flex items-center gap-2 text-xs bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setDeleteMode('order')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    deleteMode === 'order'
                      ? 'bg-white dark:bg-gray-900 text-rose-600 dark:text-rose-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Preserve Order (Left Shift)
                </button>
                <button
                  onClick={() => setDeleteMode('fast')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    deleteMode === 'fast'
                      ? 'bg-white dark:bg-gray-900 text-rose-600 dark:text-rose-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Unsorted / Fast (Replace)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Target Delete Index (<code className="font-mono">0</code> to <code className="font-mono">{Math.max(0, usedSize - 1)}</code>)
                </label>
                <input
                  type="number"
                  value={opIndex}
                  onChange={(e) => setOpIndex(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
                  min={0}
                  max={Math.max(0, usedSize - 1)}
                />
              </div>

              <div className="sm:col-span-6">
                <button
                  onClick={handleRunDeletion}
                  disabled={isAnimating || usedSize === 0}
                  className="w-full px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[38px]"
                >
                  <Trash2 className="h-4 w-4" /> Execute Deletion
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-3 pt-1">
              <span>
                <strong>Best Case:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">O(1)</code> (Delete last element)
              </span>
              <span>
                <strong>Worst Case:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">O(n)</code> (Delete index 0 requires shifting n-1 elements)
              </span>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Searching Algorithms
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Locate target element value in the array.
                </p>
              </div>

              {/* Mode Select */}
              <div className="flex items-center gap-2 text-xs bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setSearchType('linear')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    searchType === 'linear'
                      ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Linear Search (Unsorted)
                </button>
                <button
                  onClick={() => setSearchType('binary')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    searchType === 'binary'
                      ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Binary Search (Sorted)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Search Target Key
                </label>
                <input
                  type="number"
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="sm:col-span-6">
                <button
                  onClick={handleRunSearch}
                  disabled={isAnimating || usedSize === 0}
                  className="w-full px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[38px]"
                >
                  <Search className="h-4 w-4" /> Start {searchType === 'linear' ? 'Linear' : 'Binary'} Search
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-3 pt-1">
              {searchType === 'linear' ? (
                <span>
                  <strong>Linear Search:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">O(n)</code> time. Works on unsorted arrays.
                </span>
              ) : (
                <span>
                  <strong>Binary Search:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">O(log n)</code> time. Requires array to be sorted!
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Console Logs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Play className="h-3 w-3" /> Execution Step Log
          </span>
        </div>
        <div className="bg-gray-950 text-gray-200 font-mono text-xs p-3.5 rounded-xl border border-gray-800 space-y-1.5 max-h-44 overflow-y-auto">
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
