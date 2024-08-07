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
    <div style={styles.container}>
      <h1 style={styles.title}>Simple Compiler</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Enter code here"
        style={styles.textarea}
      ></textarea>
      <button onClick={handleCompile} style={styles.button}>Compile</button>
      <div style={styles.outputContainer}>
        <div style={styles.tokensContainer}>
          <h3>Tokens:</h3>
          <pre style={styles.pre}>{JSON.stringify(tokens, null, 2)}</pre>
        </div>
        <div style={styles.output}>
          <h3>Output:</h3>
          <pre style={styles.pre}>{output}</pre>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  outputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  tokensContainer: {
    marginBottom: '20px',
  },
  output: {
    marginBottom: '20px',
  },
  pre: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    overflowX: 'auto',
  },
};

export default CodeEditor;
