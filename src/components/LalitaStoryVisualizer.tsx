'use client';

import React from 'react';
import { User, ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';

export default function LalitaStoryVisualizer() {
  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 my-6 space-y-8 overflow-x-auto">
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Visualizing Lalita's Insertion</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Step-by-step breakdown of the assembly line analogy.</p>
      </div>

      {/* Step 1: Initial State */}
      <div className="flex flex-col space-y-2 w-max px-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">1. Lalita arrives at the end of the line</div>
        <div className="flex items-end gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
          {/* Sorted Line */}
          <div className="flex gap-2">
            {[6000, 9000, 10000, 12000].map((amount) => (
              <div key={amount} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-center mb-2">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">₹{amount / 1000}K</span>
              </div>
            ))}
          </div>
          
          <div className="w-px h-24 bg-gray-300 dark:bg-gray-700 border-r border-dashed border-gray-300 mx-4"></div>

          {/* Lalita */}
          <div className="flex flex-col items-center relative">
            <div className="absolute -top-8 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400 text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">
              Lalita needs a spot!
            </div>
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 dark:border-amber-600 rounded-lg flex items-center justify-center mb-2">
              <User className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">₹8K</span>
          </div>
        </div>
      </div>

      {/* Step 2: Comparing */}
      <div className="flex flex-col space-y-2 w-max px-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">2. Comparing and Shifting (₹12K, ₹10K, ₹9K are larger)</div>
        <div className="flex items-end gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 relative">
          <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-center mb-2">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">₹6K</span>
            </div>
            
            {/* The gap where Lalita will go */}
            <div className="w-16 flex flex-col items-center justify-center relative">
              <ArrowDown className="w-6 h-6 text-amber-500 animate-bounce absolute -top-4" />
            </div>

            {/* Shifted Elements */}
            {[9000, 10000, 12000].map((amount) => (
              <div key={amount} className="flex flex-col items-center relative">
                <div className="absolute -top-6 flex items-center text-rose-500 text-[10px] font-bold">
                  Shift <ArrowRight className="w-3 h-3 ml-1" />
                </div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-center mb-2 opacity-50">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">₹{amount / 1000}K</span>
              </div>
            ))}
          </div>

          {/* Lalita comparing */}
          <div className="absolute top-4 left-[120px] flex flex-col items-center z-10">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 dark:border-amber-600 rounded-lg flex items-center justify-center mb-2 shadow-lg">
              <User className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">₹8K</span>
          </div>
        </div>
      </div>

      {/* Step 3: Final State */}
      <div className="flex flex-col space-y-2 w-max px-2">
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">3. Insertion Complete (Array remains sorted)</div>
        <div className="flex items-end gap-2 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900">
          {[6000, 8000, 9000, 10000, 12000].map((amount) => (
            <div key={amount} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-2 border-2 ${amount === 8000 ? 'bg-amber-100 border-amber-400 dark:bg-amber-900/40 dark:border-amber-600' : 'bg-emerald-100 border-emerald-300 dark:bg-emerald-900/40 dark:border-emerald-700'}`}>
                <User className={`w-8 h-8 ${amount === 8000 ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-500'}`} />
              </div>
              <span className={`text-xs font-bold ${amount === 8000 ? 'text-amber-700' : 'text-emerald-700 dark:text-emerald-500'}`}>₹{amount / 1000}K</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
