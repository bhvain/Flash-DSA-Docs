'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Link2, ArrowRight, Terminal } from 'lucide-react';

type Node = {
  id: string;
  data: number;
  address: string;
};

export function LinkedListTraversalLab() {
  const [nodes] = useState<Node[]>([
    { id: '1', data: 7, address: '0x100A' },
    { id: '2', data: 11, address: '0x2F4C' },
    { id: '3', data: 41, address: '0x88D3' },
    { id: '4', data: 66, address: '0x99B2' },
  ]);

  const [ptrIndex, setPtrIndex] = useState<number | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>(['Ready for traversal...']);

  const addLog = (msg: string) => {
    setExecutionLogs(prev => [msg, ...prev]);
  };

  const handleReset = () => {
    setPtrIndex(null);
    setIsExecuting(false);
    setExecutionLogs(['Reset complete. Ready for traversal...']);
  };

  const runTraversal = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setPtrIndex(null);
    
    addLog(`=== Starting linkedlistTraversal(head) ===`);
    
    let currentIdx = 0;
    
    while (currentIdx < nodes.length) {
      setPtrIndex(currentIdx);
      addLog(`ptr = ${nodes[currentIdx].address}`);
      addLog(`Checking: while (ptr != NULL) -> TRUE`);
      
      await new Promise(r => setTimeout(r, 800));
      
      addLog(`Printing: Element ${nodes[currentIdx].data}`);
      
      await new Promise(r => setTimeout(r, 600));
      
      addLog(`Executing: ptr = ptr->next`);
      currentIdx++;
      
      await new Promise(r => setTimeout(r, 600));
    }
    
    setPtrIndex(nodes.length); // points to NULL
    addLog(`ptr = NULL`);
    addLog(`Checking: while (ptr != NULL) -> FALSE`);
    addLog(`=== Traversal Complete ===`);
    
    setIsExecuting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full mb-2">
            <Link2 className="h-3.5 w-3.5" />
            Traversal Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Linked List Traversal
          </h3>
        </div>

        <button
          onClick={handleReset}
          disabled={isExecuting}
          className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* Linked List Visualizer */}
      <div className="bg-gray-50 dark:bg-gray-900/60 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto relative">
        
        <div className="flex items-center gap-2 min-w-max pb-12 pt-6">
          <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg p-2 font-mono text-sm font-bold border border-gray-300 dark:border-gray-700 relative">
            <span className="text-[10px] text-gray-500 mb-1">HEAD</span>
            <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            {ptrIndex === 0 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                <div className="h-3 w-0.5 bg-amber-500 mb-1"></div>
                <div className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300 shadow-sm">
                  ptr
                </div>
              </div>
            )}
          </div>
          
          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div className={`flex flex-col border ${ptrIndex === idx ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/20 shadow-md transform -translate-y-1' : 'border-purple-300 dark:border-purple-700/50 bg-white dark:bg-gray-950'} rounded-xl transition-all duration-300 relative`}>
                
                {/* Pointer Badge */}
                {ptrIndex === idx && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <div className="h-3 w-0.5 bg-amber-500 mb-1"></div>
                    <div className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300 shadow-sm">
                      ptr
                    </div>
                  </div>
                )}

                {/* Address Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-100 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap">
                  {node.address}
                </div>
                
                {/* Node Structure */}
                <div className="flex h-16 w-28 divide-x divide-purple-200 dark:divide-purple-800 mt-1">
                  <div className={`flex-1 flex items-center justify-center font-mono font-bold text-lg ${ptrIndex === idx ? 'text-amber-700 dark:text-amber-400' : 'text-gray-900 dark:text-gray-100'} bg-purple-50/50 dark:bg-purple-950/20 rounded-l-xl`}>
                    {node.data}
                  </div>
                  <div className="w-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-r-xl">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  </div>
                </div>
              </div>
              
              {/* Link Arrow */}
              <div className="flex items-center text-purple-400 dark:text-purple-600">
                <div className="h-0.5 w-6 bg-purple-400 dark:bg-purple-600"></div>
                <ArrowRight className="h-5 w-5 -ml-1" />
              </div>
            </React.Fragment>
          ))}
          
          <div className={`relative flex items-center justify-center px-4 py-2 border-2 border-dashed ${ptrIndex === nodes.length ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/20 text-amber-600' : 'border-gray-300 dark:border-gray-700 text-gray-500'} rounded-xl text-sm font-mono transition-colors`}>
            NULL
            {ptrIndex === nodes.length && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                <div className="h-3 w-0.5 bg-amber-500 mb-1"></div>
                <div className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300 shadow-sm">
                  ptr
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls & Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <button
            onClick={runTraversal}
            disabled={isExecuting}
            className="w-full px-4 py-3 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Play className="h-5 w-5" /> Start Traversal
          </button>
          
          <div className="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-900 text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800">
            <div className="font-bold mb-2 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Console Output
            </div>
            <div className="space-y-1 h-32 overflow-y-auto">
              {nodes.map((n, i) => (
                <div key={i} className={`transition-opacity ${ptrIndex !== null && ptrIndex > i ? 'opacity-100' : 'opacity-0'}`}>
                  Element {n.data}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Execution Logs */}
        <div className="flex flex-col">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Execution Trace
          </div>
          <div className="bg-gray-950 text-gray-200 font-mono text-[10px] p-3.5 rounded-xl border border-gray-800 space-y-1 h-44 overflow-y-auto flex-1">
            {executionLogs.map((log, idx) => (
              <div key={idx} className={idx === 0 ? 'text-purple-400 font-bold' : 'text-gray-400'}>
                &gt; {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
