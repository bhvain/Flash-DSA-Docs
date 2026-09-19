'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Check, X, ShieldAlert, ShieldCheck } from 'lucide-react';

const PRESETS = {
  sorted: [1, 2, 3, 4, 5, 6],
  unsorted: [3, 1, 2, 4, 5, 6]
};

export default function AdaptiveBubbleSortVisualizer() {
  const [currentPreset, setCurrentPreset] = useState<'sorted' | 'unsorted'>('sorted');
  const [array, setArray] = useState(PRESETS['sorted'].map(v => ({ id: `id-${v}`, value: v })));
  const [comparing, setComparing] = useState<number[]>([]);
  const [isSortedFlag, setIsSortedFlag] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState("Select an array and click 'Run Pass 1' to test adaptability.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [passComplete, setPassComplete] = useState(false);

  const loadPreset = (type: 'sorted' | 'unsorted') => {
    if (isPlaying) return;
    setCurrentPreset(type);
    setArray(PRESETS[type].map(v => ({ id: `id-${v}`, value: v })));
    setComparing([]);
    setIsSortedFlag(null);
    setStatusMessage("Array loaded. Click 'Run Pass 1'.");
    setPassComplete(false);
  };

  const runSimulation = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setPassComplete(false);
    setIsSortedFlag(true);
    setStatusMessage("Pass 1 started: Assuming array is sorted (isSorted = true).");
    
    let currentArray = [...array];
    let swappedInPass = false;

    for (let j = 0; j < currentArray.length - 1; j++) {
      await new Promise(r => setTimeout(r, 1000));
      setComparing([j, j + 1]);
      setStatusMessage(`Comparing ${currentArray[j].value} and ${currentArray[j+1].value}...`);
      
      await new Promise(r => setTimeout(r, 800));
      if (currentArray[j].value > currentArray[j+1].value) {
        setStatusMessage(`Swap needed! Setting isSorted = false.`);
        setIsSortedFlag(false);
        swappedInPass = true;
        
        // Swap visually
        const temp = currentArray[j];
        currentArray[j] = currentArray[j + 1];
        currentArray[j + 1] = temp;
        setArray([...currentArray]);
        
        await new Promise(r => setTimeout(r, 800));
      } else {
        setStatusMessage(`No swap needed. isSorted remains ${swappedInPass ? 'false' : 'true'}.`);
      }
    }
    
    await new Promise(r => setTimeout(r, 1000));
    setComparing([]);
    setPassComplete(true);
    
    if (!swappedInPass) {
      setStatusMessage("Pass 1 completed with NO swaps! The array is already sorted. We can safely stop here (O(n) time).");
    } else {
      setStatusMessage("Pass 1 completed with swaps. isSorted became false, meaning we must continue to Pass 2.");
    }
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center space-y-6 my-6">
      
      <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 border-b border-gray-100 dark:border-gray-900 pb-4">
        <div className="flex gap-2">
          <button 
            onClick={() => loadPreset('sorted')}
            disabled={isPlaying}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentPreset === 'sorted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
          >
            Sorted Array
          </button>
          <button 
            onClick={() => loadPreset('unsorted')}
            disabled={isPlaying}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentPreset === 'unsorted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
          >
            Slightly Unsorted
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm font-bold border transition-colors ${isSortedFlag === true ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900' : isSortedFlag === false ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900' : 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-500'}`}>
            Flag: isSorted = {isSortedFlag === null ? 'null' : isSortedFlag ? '1 (true)' : '0 (false)'}
            {isSortedFlag === true && <ShieldCheck className="w-4 h-4" />}
            {isSortedFlag === false && <ShieldAlert className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Visualizer Stage */}
      <div className="flex flex-row items-end h-28 gap-3 sm:gap-4 w-full justify-center">
        {array.map((item, index) => {
          let bgColor = "bg-gray-100 dark:bg-gray-800";
          let borderColor = "border-gray-200 dark:border-gray-700";
          let textColor = "text-gray-800 dark:text-gray-200";

          if (comparing.includes(index)) {
            bgColor = "bg-amber-400 dark:bg-amber-500";
            borderColor = "border-amber-500 dark:border-amber-400";
            textColor = "text-amber-950 dark:text-amber-950";
          }

          if (passComplete && isSortedFlag === true) {
            bgColor = "bg-emerald-500 dark:bg-emerald-600";
            borderColor = "border-emerald-600 dark:border-emerald-500";
            textColor = "text-white";
          }

          const height = `${Math.max(3, item.value * 0.8)}rem`;

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ height }}
              className={`w-12 sm:w-16 flex items-center justify-center rounded-t-xl border-2 ${bgColor} ${borderColor} ${textColor} font-bold text-xl shadow-sm`}
            >
              {item.value}
            </motion.div>
          );
        })}
      </div>

      {/* Message Output */}
      <div className="w-full text-center px-4 bg-gray-50 dark:bg-gray-900/50 py-3 rounded-lg border border-gray-100 dark:border-gray-800">
        <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 min-h-[1.5rem]">
          {statusMessage}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button 
          onClick={runSimulation} 
          disabled={isPlaying || passComplete}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-sm disabled:opacity-50 font-semibold text-sm"
        >
          <Play className="w-4 h-4 fill-current" />
          Run Pass 1
        </button>
        <button 
          onClick={() => loadPreset(currentPreset)} 
          disabled={isPlaying}
          className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-white rounded-full transition-colors disabled:opacity-50"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
