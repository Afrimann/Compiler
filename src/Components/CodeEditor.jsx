import React, { useState } from 'react';
import { lexer } from '../Compiler/Lexer.jsx';
import { parser } from '../Compiler/Parser.jsx';
import { semanticAnalyzer } from '../Compiler/SemanticAnalyzer.jsx';
import { irGenerator } from '../Compiler/IRGenerator.jsx';
import { optimize } from '../Compiler/Optimizer.jsx';
import { codeGenerator } from '../Compiler/CodeGenerator.jsx';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [tokens, setTokens] = useState([]);
  const [output, setOutput] = useState('');

  const handleCompile = () => {
    try {
      const lexedTokens = lexer(code); // Tokenize the input code
      console.log('Lexed Tokens:', lexedTokens);
      setTokens(lexedTokens); // Update the state with the tokens

      const ast = parser(lexedTokens); // Parse the tokens into an AST
      console.log('Parsed AST:', ast);
      semanticAnalyzer(ast); // Check for semantic issues

      const irNodes = irGenerator(ast); // Generate IR from the AST
      const optimizedIR = optimize(irNodes); // Optimize the IR
      const generatedCode = codeGenerator(optimizedIR); // Generate code from the IR

      setOutput(generatedCode); // Update the output state with the generated code
    } catch (error) {
      console.error('Compilation Error:', error);
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
