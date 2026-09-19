'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  HardDrive, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Scale, 
  Zap, 
  Sliders,
  TrendingDown,
  Info
} from 'lucide-react';

export default function CountSortMemoryVisualizer() {
  const [arraySizeN, setArraySizeN] = useState<number>(8);
  const [maxValueM, setMaxValueM] = useState<number>(10);
  const [activePreset, setActivePreset] = useState<'ideal' | 'sparse' | 'extreme'>('ideal');

  const handlePreset = (type: 'ideal' | 'sparse' | 'extreme') => {
    setActivePreset(type);
    if (type === 'ideal') {
      setArraySizeN(100);
      setMaxValueM(50);
    } else if (type === 'sparse') {
      setArraySizeN(6);
      setMaxValueM(500);
    } else if (type === 'extreme') {
      setArraySizeN(10);
      setMaxValueM(100000);
    }
  };

  const countArraySlots = maxValueM + 1;
  const memoryBytes = countArraySlots * 4; // assuming 4-byte 32-bit int
  const memoryFormatted = 
    memoryBytes > 1024 * 1024 
      ? `${(memoryBytes / (1024 * 1024)).toFixed(2)} MB`
      : memoryBytes > 1024
      ? `${(memoryBytes / 1024).toFixed(1)} KB`
      : `${memoryBytes} Bytes`;

  // Estimate utilized slots (at most n slots can be non-zero)
  const utilizedSlots = Math.min(arraySizeN, countArraySlots);
  const wastedSlots = Math.max(0, countArraySlots - utilizedSlots);
  const utilizationPercent = ((utilizedSlots / countArraySlots) * 100).toFixed(1);

  const isMemoryDangerous = maxValueM > 10000;
  const isWastedHeavy = wastedSlots > utilizedSlots * 5;

  return (
    <div id="count-sort-memory-visualizer" className="my-8 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <HardDrive className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              The Space-Time Dilemma
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 dark:text-white mt-1">
            Why Don't We Abandon All Other Algorithms for Count Sort?
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Simulate how the maximum element (<code className="font-mono font-bold">m</code>) impacts auxiliary memory allocation (<code className="font-mono">m + 1</code>) vs input size (<code className="font-mono font-bold">n</code>).
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePreset('ideal')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              activePreset === 'ideal'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
            }`}
          >
            Ideal (Dense)
          </button>
          <button
            onClick={() => handlePreset('sparse')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              activePreset === 'sparse'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
            }`}
          >
            Sparse (Wasted)
          </button>
          <button
            onClick={() => handlePreset('extreme')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              activePreset === 'extreme'
                ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
            }`}
          >
            Catastrophic (Outlier)
          </button>
        </div>
      </div>

      {/* Sliders Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-gray-200 dark:border-gray-800">
        {/* Input Elements (n) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-gray-700 dark:text-gray-300">Input Array Size (n elements):</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 text-sm">{arraySizeN}</span>
          </div>
          <input
            type="range"
            min="2"
            max="500"
            value={arraySizeN}
            onChange={(e) => {
              setActivePreset('ideal');
              setArraySizeN(parseInt(e.target.value, 10));
            }}
            className="w-full accent-blue-600 h-2 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
          />
          <p className="text-[11px] text-gray-500">
            Number of actual integer numbers you want to sort.
          </p>
        </div>

        {/* Max Value (m) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-gray-700 dark:text-gray-300">Maximum Element Value (m):</span>
            <span className="font-mono text-purple-600 dark:text-purple-400 text-sm">{maxValueM.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="5"
            max="2000"
            step="5"
            value={maxValueM > 2000 ? 2000 : maxValueM}
            onChange={(e) => {
              setActivePreset('ideal');
              setMaxValueM(parseInt(e.target.value, 10));
            }}
            className="w-full accent-purple-600 h-2 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
          />
          <p className="text-[11px] text-gray-500">
            Determines auxiliary array allocation: <code className="font-mono">malloc((m + 1) * sizeof(int))</code>.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-6 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block">
            Auxiliary Slots
          </span>
          <span className="text-lg font-mono font-black text-gray-900 dark:text-gray-100 mt-1 block">
            {countArraySlots.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-500">
            Indices 0 to {maxValueM}
          </span>
        </div>

        <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block">
            RAM Allocated
          </span>
          <span className={`text-lg font-mono font-black mt-1 block ${
            isMemoryDangerous ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-gray-100'
          }`}>
            {memoryFormatted}
          </span>
          <span className="text-[10px] text-gray-500">
            4 bytes per int slot
          </span>
        </div>

        <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block">
            Slot Utilization
          </span>
          <span className={`text-lg font-mono font-black mt-1 block ${
            parseFloat(utilizationPercent) > 40
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-amber-600 dark:text-amber-400'
          }`}>
            {utilizationPercent}%
          </span>
          <span className="text-[10px] text-gray-500">
            {utilizedSlots} active / {countArraySlots} total
          </span>
        </div>

        <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block">
            Time Complexity
          </span>
          <span className="text-lg font-mono font-black text-purple-700 dark:text-purple-400 mt-1 block">
            O(m + n)
          </span>
          <span className="text-[10px] text-gray-500">
            {maxValueM <= arraySizeN ? 'Effectively O(n)' : 'Dominated by O(m)'}
          </span>
        </div>
      </div>

      {/* Visual Memory Bar */}
      <div className="pt-6 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Count Array Memory Allocation Map
          </span>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Productive Slots ({utilizedSlots})
            </span>
            <span className="flex items-center gap-1 font-semibold text-gray-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-gray-300 dark:bg-gray-700 inline-block" /> Wasted Empty Zeros ({wastedSlots})
            </span>
          </div>
        </div>

        {/* Bar */}
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex shadow-inner">
          <motion.div
            layout
            style={{ width: `${Math.max(1, Math.min(100, parseFloat(utilizationPercent)))}%` }}
            className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-black text-white px-1 overflow-hidden"
          >
            {parseFloat(utilizationPercent) > 10 ? `${utilizationPercent}%` : ''}
          </motion.div>
          <motion.div
            layout
            style={{ width: `${100 - Math.max(1, Math.min(100, parseFloat(utilizationPercent)))}%` }}
            className="bg-gray-300 dark:bg-gray-700/70 h-full flex items-center justify-end text-[10px] font-mono text-gray-600 dark:text-gray-400 pr-2"
          >
            {wastedSlots > 0 && parseFloat(utilizationPercent) <= 85 ? `${wastedSlots} wasted 0s` : ''}
          </motion.div>
        </div>

        {/* Verdict Callout */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 mt-4 ${
          isMemoryDangerous || isWastedHeavy
            ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
        }`}>
          {isMemoryDangerous || isWastedHeavy ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-extrabold block mb-0.5">
              {isMemoryDangerous || isWastedHeavy
                ? 'High Memory Inefficiency Detected (Poor Fit for Count Sort)'
                : 'Optimal Regime for Count Sort (Superior Linear O(n) Performance)'}
            </span>
            {isMemoryDangerous || isWastedHeavy ? (
              <p>
                The maximum element <code className="font-mono font-bold">m = {maxValueM}</code> is much larger than the array size <code className="font-mono font-bold">n = {arraySizeN}</code>. Count Sort forces the OS to allocate an array of <code className="font-mono">{countArraySlots}</code> integers, even though only <code className="font-mono">{utilizedSlots}</code> slots are ever incremented! For datasets with sparse or unbounded numbers, standard algorithms like <strong>QuickSort</strong> or <strong>Merge Sort</strong> are far more memory-efficient.
              </p>
            ) : (
              <p>
                The maximum element <code className="font-mono font-bold">m = {maxValueM}</code> is proportional to or smaller than <code className="font-mono font-bold">n = {arraySizeN}</code>. Here, memory overhead is negligible, and Count Sort obliterates comparison sorts by executing in true <strong>linear O(n)</strong> time with zero element comparisons!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
