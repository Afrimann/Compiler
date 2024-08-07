export function parser(tokens) {
    let position = 0;
  
    function parseStatement() {
      const token = tokens[position];
  
      switch (token.type) {
        case 'Keyword':
          if (token.value === 'var') {
            position++; // Move past the 'var' token
            const identifierToken = tokens[position];
  
            if (identifierToken.type === 'Identifier') {
              position++; // Move past the identifier
              const nextToken = tokens[position];
  
              // Optional: Handle initialization (e.g., var x = 5;)
              let initializer = null;
              if (nextToken && nextToken.type === 'Operator' && nextToken.value === '=') {
                position++; // Move past '='
                initializer = parseExpression(); // Parse the expression after '='
              }
  
              return {
                type: 'VariableDeclaration',
                declarations: [
                  {
                    id: { type: 'Identifier', name: identifierToken.value },
                    init: initializer,
                  },
                ],
              };
            }
            throw new Error(`Expected identifier after 'var'`);
          }
          break;
  
        // Add cases for other statement types...
  
        default:
          throw new Error(`Unexpected token: ${token.value}`);
      }
    }
  
    function parseExpression() {
      // Simplified for demonstration purposes
      const token = tokens[position];
  
      if (token.type === 'Literal' || token.type === 'Identifier') {
        position++;
        return { type: token.type, value: token.value };
      }
      
      throw new Error(`Expected expression but found ${token.value}`);
    }
  
    const ast = {
      type: 'Program',
      body: [],
    };
  
    while (position < tokens.length) {
      const statement = parseStatement();
      if (statement) {
        ast.body.push(statement);
      }
    }
  
    return ast;
  }
  