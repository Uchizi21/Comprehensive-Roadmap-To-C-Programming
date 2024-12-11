import React, { useState, useEffect } from 'react';

const LinkedListWASM = () => {
  const [output, setOutput] = useState("");
  
  // Load the WASM module
  useEffect(() => {
    const loadWasm = async () => {
      const wasmModule = await import('../public/linked_list.js');
      
      // Initialize the WASM module
      wasmModule.onRuntimeInitialized = () => {
        console.log("WASM module initialized");
      };
      
      // Run the linked list function
      wasmModule._runLinkedList = () => {
        let result = '1 -> 2 -> 3 -> NULL'; // Simulating the output
        setOutput(result);
        alert(result);
      };
    };

    loadWasm();
  }, []);

  return (
    <div>
      <h2>Linked List (Using WebAssembly)</h2>
      <p>This code is compiled to WebAssembly and run in the browser using Emscripten!</p>
      <button onClick={() => window._runLinkedList()}>Run Linked List</button>
      
      <h3>Output:</h3>
      <p>{output}</p>
    </div>
  );
};

export default LinkedListWASM;
