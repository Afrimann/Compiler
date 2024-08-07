import React, { useState } from 'react';
import { lexer } from '../Compiler/Lexer.jsx';
import { parser } from '../Compiler/Parser.jsx';
import { codeGenerator } from '../Compiler/CodeGenerator.jsx';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [tokens, setTokens] = useState([]);
  const [output, setOutput] = useState('');

  const handleCompile = () => {
    try {
      const lexedTokens = lexer(code); // Tokenize the input code
      setTokens(lexedTokens); // Update the state with the tokens

      const ast = parser(lexedTokens); // Parse the tokens into an AST
      const generatedCode = codeGenerator(ast); // Generate code from the AST
      setOutput(generatedCode); // Update the output state with the generated code
    } catch (error) {
      setOutput(`Error: ${error.message}`); // Display errors
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Enter code here"
      ></textarea>
      <button onClick={handleCompile}>Compile</button>
      <div>
        <h3>Tokens:</h3>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
