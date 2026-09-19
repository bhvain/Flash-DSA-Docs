'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';

const INITIAL_STATE = [
  { id: '6-red', value: 6, color: 'border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30' },
  { id: '1-gray', value: 1, color: 'border-gray-400 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800' },
  { id: '2-gray', value: 2, color: 'border-gray-400 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800' },
  { id: '6-blue', value: 6, color: 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30' },
];

const SORTED_STATE = [
  { id: '1-gray', value: 1, color: 'border-gray-400 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800' },
  { id: '2-gray', value: 2, color: 'border-gray-400 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800' },
  { id: '6-red', value: 6, color: 'border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30' },
  { id: '6-blue', value: 6, color: 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30' },
];

export default function StabilityVisualizer() {
  const [isSorted, setIsSorted] = useState(false);

  const currentArray = isSorted ? SORTED_STATE : INITIAL_STATE;

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center space-y-6 mt-4">
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Interactive Stability Demo</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Notice how the red 6 stays before the blue 6 after sorting.</p>
      </div>

      <div className="flex items-center justify-center h-20 gap-3">
        {currentArray.map((item) => (
          <motion.div
            key={item.id}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border-2 font-bold text-xl shadow-sm ${item.color}`}
          >
            {item.value}
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setIsSorted(!isSorted)}
        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
      >
        {isSorted ? (
          <>
            <RotateCcw className="w-4 h-4" /> Reset Order
          </>
        ) : (
          <>
            Sort Array <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
