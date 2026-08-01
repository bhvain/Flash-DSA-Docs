'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, RotateCcw, Link2, Database, LayoutTemplate } from 'lucide-react';

type Node = {
  id: string;
  data: number;
  address: string;
};

export function LinkedListLab() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', data: 7, address: '0x100A' },
    { id: '2', data: 11, address: '0x2F4C' },
    { id: '3', data: 18, address: '0x99B2' },
  ]);

  const [newValue, setNewValue] = useState<number>(42);
  const [insertIndex, setInsertIndex] = useState<number>(1);
  const [deleteIndex, setDeleteIndex] = useState<number>(1);

  // We'll generate random hex addresses to simulate non-contiguous heap memory
  const generateRandomAddress = () => {
    return '0x' + Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
  };

  const handleReset = () => {
    setNodes([
      { id: '1', data: 7, address: '0x100A' },
      { id: '2', data: 11, address: '0x2F4C' },
      { id: '3', data: 18, address: '0x99B2' },
    ]);
  };

  const insertNode = () => {
    if (insertIndex < 0 || insertIndex > nodes.length) return;
    
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      data: newValue,
      address: generateRandomAddress(),
    };
    
    const newNodes = [...nodes];
    newNodes.splice(insertIndex, 0, newNode);
    setNodes(newNodes);
  };

  const deleteNode = () => {
    if (deleteIndex < 0 || deleteIndex >= nodes.length) return;
    
    const newNodes = [...nodes];
    newNodes.splice(deleteIndex, 1);
    setNodes(newNodes);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full mb-2">
            <Link2 className="h-3.5 w-3.5" />
            Dynamic Memory Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Linked List Visualization
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset List
        </button>
      </div>

      {/* Linked List Visualizer */}
      <div className="bg-gray-50 dark:bg-gray-900/60 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
        <div className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
          Non-Contiguous Heap Memory
        </div>
        
        <div className="flex items-center gap-2 min-w-max pb-4">
          <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg p-2 font-mono text-sm font-bold border border-gray-300 dark:border-gray-700">
            <span className="text-[10px] text-gray-500 mb-1">HEAD</span>
            <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          
          {nodes.length === 0 ? (
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-mono text-gray-500">
              NULL
            </div>
          ) : (
            nodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <div className="flex flex-col border border-purple-300 dark:border-purple-700/50 bg-white dark:bg-gray-950 rounded-xl shadow-sm hover:shadow-md transition-shadow relative group">
                  {/* Address Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-100 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap">
                    {node.address}
                  </div>
                  
                  {/* Node Structure */}
                  <div className="flex h-16 w-28 divide-x divide-purple-200 dark:divide-purple-800 mt-1">
                    <div className="flex-1 flex items-center justify-center font-mono font-bold text-lg text-gray-900 dark:text-gray-100 bg-purple-50/50 dark:bg-purple-950/20 rounded-l-xl">
                      {node.data}
                    </div>
                    <div className="w-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-r-xl">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                  
                  {/* Indices for reference */}
                  <div className="text-[10px] font-mono text-center py-1 text-gray-400 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-xl border-t border-purple-100 dark:border-purple-900/30">
                    Index {idx}
                  </div>
                </div>
                
                {/* Link Arrow */}
                <div className="flex items-center text-purple-400 dark:text-purple-600">
                  <div className="h-0.5 w-6 bg-purple-400 dark:bg-purple-600"></div>
                  <ArrowRight className="h-5 w-5 -ml-1" />
                </div>
              </React.Fragment>
            ))
          )}
          
          {nodes.length > 0 && (
            <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-mono text-gray-500">
              NULL
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Insertion Panel */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> Insert Node
          </h4>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-[10px] font-semibold text-gray-500 mb-1">Value (Data)</label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-semibold text-gray-500 mb-1">At Index</label>
              <input
                type="number"
                value={insertIndex}
                min={0}
                max={nodes.length}
                onChange={(e) => setInsertIndex(parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
            </div>
            <button
              onClick={insertNode}
              className="px-3 py-1.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors h-[34px]"
            >
              Insert
            </button>
          </div>
        </div>

        {/* Deletion Panel */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-200 dark:border-rose-900/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-3 flex items-center gap-1.5">
            <Trash2 className="h-4 w-4" /> Delete Node
          </h4>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-[10px] font-semibold text-gray-500 mb-1">From Index</label>
              <input
                type="number"
                value={deleteIndex}
                min={0}
                max={nodes.length > 0 ? nodes.length - 1 : 0}
                onChange={(e) => setDeleteIndex(parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg"
              />
            </div>
            <button
              onClick={deleteNode}
              disabled={nodes.length === 0}
              className="px-3 py-1.5 text-sm font-semibold bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-lg transition-colors h-[34px] w-full max-w-[100px]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      
      {/* Array vs Linked List Comparison Note */}
      <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-xl text-xs text-gray-700 dark:text-gray-300">
        <p className="font-bold flex items-center gap-2 mb-2">
          <LayoutTemplate className="h-4 w-4 text-blue-500" />
          The Linked List Advantage
        </p>
        <p>Notice how inserting or deleting a node doesn't require shifting all subsequent elements like it does in an array. We simply create a new node anywhere in memory (generating a random address) and update the pointers (arrows) to weave it into the chain.</p>
      </div>
    </div>
  );
}
