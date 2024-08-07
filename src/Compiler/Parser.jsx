export function parser(tokens) {
    let current = 0;
  
    function walk() {
      if (current >= tokens.length) {
        throw new Error(`Unexpected end of input`);
      }
  
      let token = tokens[current];
  
      // Handle literals
      if (token.type === 'Literal') {
        current++;
        return {
          type: 'Literal',
          value: token.value
        };
      }
  
      // Handle string literals
      if (token.type === 'String') {
        current++;
        return {
          type: 'StringLiteral',
          value: token.value
        };
      }
  
      // Handle identifiers
      if (token.type === 'Identifier') {
        current++;
        return {
          type: 'Identifier',
          name: token.value
        };
      }
  
      // Handle import declarations
      if (token.type === 'Keyword' && token.value === 'import') {
        current++;
        const source = walk();
        const fromKeyword = tokens[current];
        if (!fromKeyword || fromKeyword.type !== 'Keyword' || fromKeyword.value !== 'from') {
          throw new Error(`Unexpected token: ${fromKeyword ? fromKeyword.value : 'end of input'}`);
        }
        current++;
        const module = walk();
        const semicolon = tokens[current];
        if (!semicolon || semicolon.type !== 'Punctuation' || semicolon.value !== ';') {
          throw new Error(`Unexpected token: ${semicolon ? semicolon.value : 'end of input'}`);
        }
        current++;
        return {
          type: 'ImportDeclaration',
          source: source,
          module: module
        };
      }
  
      // Handle let declarations
      if (token.type === 'Keyword' && token.value === 'let') {
        current++;
        const identifier = walk(); // Expecting an identifier next
        const assignment = tokens[current];
        if (!assignment || assignment.type !== 'Operator' || assignment.value !== '=') {
          throw new Error(`Unexpected token: ${assignment ? assignment.value : 'end of input'}`);
        }
        current++;
        const value = walk(); // Expecting a literal or identifier next
        const semicolon = tokens[current];
        if (!semicolon || semicolon.type !== 'Punctuation' || semicolon.value !== ';') {
          throw new Error(`Unexpected token: ${semicolon ? semicolon.value : 'end of input'}`);
        }
        current++;
        return {
          type: 'VariableDeclaration',
          declarations: [
            {
              id: identifier,
              init: value
            }
          ]
        };
      }
  
      // Handle binary expressions (e.g., a + b)
      if (token.type === 'Identifier' || token.type === 'Literal') {
        const left = walk(); // Get the left-hand side
        const operator = tokens[current];
        if (!operator || operator.type !== 'Operator') {
          throw new Error(`Unexpected token: ${operator ? operator.value : 'end of input'}`);
        }
        current++;
        const right = walk(); // Get the right-hand side
        return {
          type: 'BinaryExpression',
          operator: operator.value,
          left: left,
          right: right
        };
      }
  
      throw new Error(`Unexpected token: "${token ? token.value : 'end of input'}"`);
    }
  
    const ast = {
      type: 'Program',
      body: []
    };
  
    while (current < tokens.length) {
      ast.body.push(walk());
    }
  
    return ast;
  }
  