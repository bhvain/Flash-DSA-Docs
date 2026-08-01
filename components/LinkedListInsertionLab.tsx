'use client';

import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Link2, GitMerge } from 'lucide-react';

type Node = {
  id: string;
  data: number;
  address: string;
};

export function LinkedListInsertionLab() {
  const initialNodes = [
    { id: '1', data: 7, address: '0x100A' },
    { id: '2', data: 11, address: '0x2F4C' },
    { id: '3', data: 41, address: '0x88D3' },
  ];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [newValue, setNewValue] = useState<number>(99);
  const [targetIndex, setTargetIndex] = useState<number>(1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>(['Ready to simulate insertions.']);

  const generateRandomAddress = () => {
    return '0x' + Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
  };

  const addLog = (msg: string) => {
    setExecutionLogs(prev => [msg, ...prev.slice(0, 19)]);
  };

  const handleReset = () => {
    setNodes([...initialNodes]);
    setExecutionLogs(['List reset to initial state.']);
    setIsExecuting(false);
  };

  const createNewNode = () => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      data: newValue,
      address: generateRandomAddress(),
    };
  };

  // Case 1: Insert at Beginning O(1)
  const handleInsertAtBeginning = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    addLog(`=== Case 1: Insert At Beginning (O(1)) ===`);
    
    const newNode = createNewNode();
    addLog(`Created new node: ptr (${newNode.address}) with data ${newNode.data}`);
    
    await new Promise(r => setTimeout(r, 800));
    
    addLog(`Linkage: ptr->next = head (${nodes.length > 0 ? nodes[0].address : 'NULL'})`);
    addLog(`Linkage: head = ptr`);
    
    setNodes([newNode, ...nodes]);
    
    await new Promise(r => setTimeout(r, 400));
    addLog(`Insertion complete.`);
    setIsExecuting(false);
  };

  // Case 2: Insert In Between (At Index) O(n)
  const handleInsertInBetween = async () => {
    if (isExecuting) return;
    
    // Bounds checking
    if (targetIndex <= 0 || targetIndex >= nodes.length) {
      addLog(`Error: Index ${targetIndex} is out of bounds for "In Between" insertion.`);
      return;
    }
    
    setIsExecuting(true);
    addLog(`=== Case 2: Insert In Between at index ${targetIndex} (O(n)) ===`);
    
    const newNode = createNewNode();
    addLog(`Created new node: ptr (${newNode.address}) with data ${newNode.data}`);
    
    await new Promise(r => setTimeout(r, 600));
    
    addLog(`Traversing to node just before index ${targetIndex}...`);
    
    // Simulate traversal delay
    for (let i = 0; i < targetIndex; i++) {
      addLog(`p is at index ${i} (${nodes[i].address})`);
      await new Promise(r => setTimeout(r, 600));
    }
    
    const pNode = nodes[targetIndex - 1];
    const nextNode = nodes[targetIndex];
    
    addLog(`Linkage: ptr->next = p->next (${nextNode.address})`);
    addLog(`Linkage: p->next = ptr (${newNode.address})`);
    
    const newNodes = [...nodes];
    newNodes.splice(targetIndex, 0, newNode);
    setNodes(newNodes);
    
    await new Promise(r => setTimeout(r, 400));
    addLog(`Insertion complete.`);
    setIsExecuting(false);
  };

  // Case 3: Insert At End O(n)
  const handleInsertAtEnd = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    addLog(`=== Case 3: Insert At End (O(n)) ===`);
    
    if (nodes.length === 0) {
       addLog(`List is empty, delegating to Insert at Beginning.`);
       setIsExecuting(false);
       handleInsertAtBeginning();
       return;
    }
    
    const newNode = createNewNode();
    addLog(`Created new node: ptr (${newNode.address}) with data ${newNode.data}`);
    
    await new Promise(r => setTimeout(r, 600));
    addLog(`Traversing to the last node...`);
    
    // Simulate traversal
    for (let i = 0; i < nodes.length; i++) {
      addLog(`p is at index ${i}`);
      await new Promise(r => setTimeout(r, 400));
    }
    
    const lastNode = nodes[nodes.length - 1];
    addLog(`Reached last node: ${lastNode.address}`);
    addLog(`Linkage: p->next = ptr (${newNode.address})`);
    addLog(`Linkage: ptr->next = NULL`);
    
    setNodes([...nodes, newNode]);
    
    await new Promise(r => setTimeout(r, 400));
    addLog(`Insertion complete.`);
    setIsExecuting(false);
  };

  // Case 4: Insert After Node O(1)
  const handleInsertAfterNode = async () => {
    if (isExecuting) return;
    
    if (targetIndex < 0 || targetIndex >= nodes.length) {
      addLog(`Error: Target node index ${targetIndex} is out of bounds.`);
      return;
    }
    
    setIsExecuting(true);
    addLog(`=== Case 4: Insert After Given Node at index ${targetIndex} (O(1)) ===`);
    addLog(`Given pointer 'q' pointing directly to index ${targetIndex} (${nodes[targetIndex].address})`);
    
    const newNode = createNewNode();
    addLog(`Created new node: ptr (${newNode.address}) with data ${newNode.data}`);
    
    await new Promise(r => setTimeout(r, 800));
    
    const nextNodeAddr = targetIndex + 1 < nodes.length ? nodes[targetIndex + 1].address : 'NULL';
    
    addLog(`No traversal needed!`);
    addLog(`Linkage: ptr->next = q->next (${nextNodeAddr})`);
    addLog(`Linkage: q->next = ptr (${newNode.address})`);
    
    const newNodes = [...nodes];
    newNodes.splice(targetIndex + 1, 0, newNode);
    setNodes(newNodes);
    
    await new Promise(r => setTimeout(r, 400));
    addLog(`Insertion complete.`);
    setIsExecuting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full mb-2">
            <GitMerge className="h-3.5 w-3.5" />
            Insertion Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Linked List Insertion
          </h3>
        </div>

        <button
          onClick={handleReset}
          disabled={isExecuting}
          className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset List
        </button>
      </div>

      {/* Visualizer */}
      <div className="bg-gray-50 dark:bg-gray-900/60 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max pb-4 pt-4">
          <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg p-2 font-mono text-sm font-bold border border-gray-300 dark:border-gray-700">
            <span className="text-[10px] text-gray-500 mb-1">HEAD</span>
            <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          
          {nodes.length === 0 ? (
            <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-mono text-gray-500">
              NULL
            </div>
          ) : (
            nodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <div className="flex flex-col border border-purple-300 dark:border-purple-700/50 bg-white dark:bg-gray-950 rounded-xl shadow-sm transition-all relative">
                  {/* Index / Target Badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-500 font-bold">
                    idx:{idx}
                  </div>

                  {/* Address */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-100 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap">
                    {node.address}
                  </div>
                  
                  {/* Node Structure */}
                  <div className="flex h-12 w-24 divide-x divide-purple-200 dark:divide-purple-800 mt-1">
                    <div className="flex-1 flex items-center justify-center font-mono font-bold text-gray-900 dark:text-gray-100 bg-purple-50/50 dark:bg-purple-950/20 rounded-l-xl">
                      {node.data}
                    </div>
                    <div className="w-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-r-xl">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Link Arrow */}
                <div className="flex items-center text-purple-400 dark:text-purple-600">
                  <div className="h-0.5 w-4 bg-purple-400 dark:bg-purple-600"></div>
                  <ArrowRight className="h-4 w-4 -ml-1" />
                </div>
              </React.Fragment>
            ))
          )}
          
          {nodes.length > 0 && (
            <div className="flex flex-col border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-2 items-center justify-center">
               <span className="text-xs font-mono font-bold text-gray-500">NULL</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Inputs */}
        <div className="lg:col-span-1 space-y-4 bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Data Value
            </label>
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Target Index (For Case 2 & 4)
            </label>
            <input
              type="number"
              value={targetIndex}
              onChange={(e) => setTargetIndex(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-2">
          <button
            onClick={handleInsertAtBeginning}
            disabled={isExecuting}
            className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-left flex items-center justify-between disabled:opacity-50"
          >
            <span>1. Insert At Beginning</span>
            <span className="bg-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-mono">O(1)</span>
          </button>
          
          <button
            onClick={handleInsertInBetween}
            disabled={isExecuting}
            className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-left flex items-center justify-between disabled:opacity-50"
          >
            <span>2. Insert In Between (Index {targetIndex})</span>
            <span className="bg-amber-800 px-1.5 py-0.5 rounded text-[10px] font-mono">O(n)</span>
          </button>

          <button
            onClick={handleInsertAtEnd}
            disabled={isExecuting}
            className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors text-left flex items-center justify-between disabled:opacity-50"
          >
            <span>3. Insert At End</span>
            <span className="bg-rose-800 px-1.5 py-0.5 rounded text-[10px] font-mono">O(n)</span>
          </button>

          <button
            onClick={handleInsertAfterNode}
            disabled={isExecuting}
            className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-left flex items-center justify-between disabled:opacity-50"
          >
            <span>4. Insert After Node (Index {targetIndex})</span>
            <span className="bg-blue-800 px-1.5 py-0.5 rounded text-[10px] font-mono">O(1)</span>
          </button>
        </div>

        {/* Execution Logs */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Execution Trace
          </div>
          <div className="bg-gray-950 text-gray-200 font-mono text-[10px] p-3.5 rounded-xl border border-gray-800 space-y-1 h-[216px] overflow-y-auto flex-1">
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
