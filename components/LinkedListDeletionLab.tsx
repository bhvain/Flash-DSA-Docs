'use client';

import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Link2, Trash2 } from 'lucide-react';

type Node = {
  id: string;
  data: number;
  address: string;
};

export function LinkedListDeletionLab() {
  const initialNodes = [
    { id: '1', data: 4, address: '0x1A2B' },
    { id: '2', data: 3, address: '0x2C3D' },
    { id: '3', data: 8, address: '0x4E5F' },
    { id: '4', data: 1, address: '0x6G7H' },
  ];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [targetIndex, setTargetIndex] = useState<number>(2);
  const [targetValue, setTargetValue] = useState<number>(8);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>(['Ready to simulate deletions.']);

  const addLog = (msg: string) => {
    setExecutionLogs(prev => [msg, ...prev.slice(0, 19)]);
  };

  const handleReset = () => {
    setNodes(initialNodes);
    setExecutionLogs(['Reset linked list to initial state.']);
  };

  const deleteFirst = async () => {
    if (nodes.length === 0) {
      addLog("List is empty. Cannot delete.");
      return;
    }
    setIsExecuting(true);
    addLog("Deleting first node...");
    
    await new Promise(r => setTimeout(r, 800));
    const toDelete = nodes[0];
    addLog(`struct node *ptr = head; (ptr points to ${toDelete.address} containing ${toDelete.data})`);
    
    await new Promise(r => setTimeout(r, 1000));
    addLog("head = head->next; (head now points to next node)");
    
    await new Promise(r => setTimeout(r, 1000));
    addLog(`free(ptr); (freed memory at ${toDelete.address})`);
    
    const newNodes = [...nodes];
    newNodes.shift();
    setNodes(newNodes);
    addLog("Successfully deleted the first node. Time Complexity: O(1)");
    setIsExecuting(false);
  };

  const deleteAtIndex = async () => {
    if (nodes.length === 0) {
      addLog("List is empty.");
      return;
    }
    if (targetIndex === 0) {
      return deleteFirst();
    }
    if (targetIndex >= nodes.length) {
      addLog(`Index ${targetIndex} is out of bounds.`);
      return;
    }

    setIsExecuting(true);
    addLog(`Deleting node at index ${targetIndex}...`);
    
    await new Promise(r => setTimeout(r, 800));
    addLog("struct node *p = head;");
    
    let current = 0;
    while (current < targetIndex - 1) {
      await new Promise(r => setTimeout(r, 500));
      addLog(`p = p->next; (traversing, currently at index ${current + 1})`);
      current++;
    }

    const pNode = nodes[targetIndex - 1];
    const qNode = nodes[targetIndex];

    await new Promise(r => setTimeout(r, 1000));
    addLog(`Reached index ${targetIndex - 1} (address ${pNode.address}). struct node *q = p->next; (q points to ${qNode.address})`);
    
    await new Promise(r => setTimeout(r, 1000));
    addLog(`p->next = q->next; (Bypassing node ${qNode.data})`);
    
    await new Promise(r => setTimeout(r, 1000));
    addLog(`free(q); (freed memory at ${qNode.address})`);
    
    const newNodes = [...nodes];
    newNodes.splice(targetIndex, 1);
    setNodes(newNodes);
    addLog(`Successfully deleted node at index ${targetIndex}. Time Complexity: O(n)`);
    
    setIsExecuting(false);
  };

  const deleteLast = async () => {
    if (nodes.length === 0) {
      addLog("List is empty.");
      return;
    }
    if (nodes.length === 1) {
      return deleteFirst();
    }

    setIsExecuting(true);
    addLog("Deleting last node...");
    
    await new Promise(r => setTimeout(r, 800));
    addLog("struct node *p = head; struct node *q = head->next;");
    
    let current = 0;
    while (current < nodes.length - 2) {
      await new Promise(r => setTimeout(r, 400));
      addLog("p = p->next; q = q->next; (traversing...)");
      current++;
    }

    const pNode = nodes[nodes.length - 2];
    const qNode = nodes[nodes.length - 1];

    await new Promise(r => setTimeout(r, 800));
    addLog(`Reached end. q is at ${qNode.address} and q->next is NULL.`);
    
    await new Promise(r => setTimeout(r, 800));
    addLog(`p->next = NULL; (Disconnecting last node)`);
    
    await new Promise(r => setTimeout(r, 800));
    addLog(`free(q); (freed memory at ${qNode.address})`);
    
    const newNodes = [...nodes];
    newNodes.pop();
    setNodes(newNodes);
    addLog("Successfully deleted the last node. Time Complexity: O(n)");
    
    setIsExecuting(false);
  };

  const deleteByValue = async () => {
    if (nodes.length === 0) {
      addLog("List is empty.");
      return;
    }
    if (nodes[0].data === targetValue) {
      return deleteFirst();
    }

    setIsExecuting(true);
    addLog(`Deleting first node with value ${targetValue}...`);
    
    let foundIndex = -1;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].data === targetValue) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex === -1) {
      await new Promise(r => setTimeout(r, 800));
      addLog(`Value ${targetValue} not found in the list.`);
      setIsExecuting(false);
      return;
    }

    await new Promise(r => setTimeout(r, 800));
    addLog("struct node *p = head; struct node *q = head->next;");
    
    let current = 0;
    while (current < foundIndex - 1) {
      await new Promise(r => setTimeout(r, 500));
      addLog("p = p->next; q = q->next; (traversing...)");
      current++;
    }

    const qNode = nodes[foundIndex];

    await new Promise(r => setTimeout(r, 800));
    addLog(`Found value ${targetValue} at address ${qNode.address}.`);
    
    await new Promise(r => setTimeout(r, 800));
    addLog(`p->next = q->next; (Bypassing the node)`);
    
    await new Promise(r => setTimeout(r, 800));
    addLog(`free(q); (freed memory at ${qNode.address})`);
    
    const newNodes = [...nodes];
    newNodes.splice(foundIndex, 1);
    setNodes(newNodes);
    addLog(`Successfully deleted node with value ${targetValue}. Time Complexity: O(n)`);
    
    setIsExecuting(false);
  };


  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm my-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full mb-2">
            <Trash2 className="h-3.5 w-3.5" />
            Linked List Deletion Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Node Deletion Operations
          </h3>
        </div>
        <button
          onClick={handleReset}
          disabled={isExecuting}
          className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset List
        </button>
      </div>

      {/* Visualizer */}
      <div className="bg-gray-50 dark:bg-gray-900/60 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
        <div className="flex items-center min-w-max pb-2">
          <div className="flex flex-col items-center mr-4">
            <div className="text-xs font-mono font-bold text-gray-500 mb-2">Head</div>
            <div className="h-2 w-2 rounded-full bg-rose-500 mb-1"></div>
            <ArrowRight className="h-4 w-4 text-rose-500 rotate-90 sm:rotate-0 sm:ml-2" />
          </div>

          {nodes.length === 0 ? (
            <div className="px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-400 font-mono text-sm">
              NULL (Empty List)
            </div>
          ) : (
            nodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <div className="flex flex-col items-center">
                  <div className="bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm flex flex-col w-28">
                    <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 border-b border-gray-200 dark:border-gray-700 text-center">
                      <span className="text-[10px] font-mono text-gray-500">Address</span>
                      <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{node.address}</div>
                    </div>
                    <div className="flex divide-x divide-gray-200 dark:divide-gray-700">
                      <div className="p-3 w-1/2 flex items-center justify-center bg-blue-50/50 dark:bg-blue-900/20">
                        <span className="font-bold text-lg">{node.data}</span>
                      </div>
                      <div className="p-2 w-1/2 flex items-center justify-center flex-col gap-1 bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Next</span>
                        <Link2 className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    Index {idx}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center px-2">
                  <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-700"></div>
                  <ArrowRight className="h-4 w-4 text-gray-400 -ml-1" />
                </div>
              </React.Fragment>
            ))
          )}
          
          {nodes.length > 0 && (
            <div className="px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-400 font-mono text-sm ml-2">
              NULL
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
            O(1) Operations
          </h4>
          <div className="flex gap-2">
            <button
              onClick={deleteFirst}
              disabled={isExecuting}
              className="flex-1 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete First
            </button>
            <button
              onClick={deleteLast}
              disabled={isExecuting}
              className="flex-1 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete Last
            </button>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
            O(n) Operations
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={targetIndex}
                onChange={(e) => setTargetIndex(parseInt(e.target.value) || 0)}
                className="w-20 px-2.5 py-1.5 text-xs font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100"
                min={0}
                placeholder="Index"
              />
              <button
                onClick={deleteAtIndex}
                disabled={isExecuting}
                className="flex-1 py-1.5 text-xs font-semibold bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors disabled:opacity-50"
              >
                Delete at Index
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(parseInt(e.target.value) || 0)}
                className="w-20 px-2.5 py-1.5 text-xs font-mono bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100"
                placeholder="Value"
              />
              <button
                onClick={deleteByValue}
                disabled={isExecuting}
                className="flex-1 py-1.5 text-xs font-semibold bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors disabled:opacity-50"
              >
                Delete by Value
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Execution Trace
        </div>
        <div className="bg-gray-950 text-gray-200 font-mono text-xs p-3.5 rounded-xl border border-gray-800 space-y-1 h-36 overflow-y-auto">
          {executionLogs.map((log, idx) => (
            <div key={idx} className={idx === 0 ? 'text-rose-400 font-bold' : 'text-gray-400 opacity-70'}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
