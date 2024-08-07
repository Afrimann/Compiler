export function parser(tokens) {
    let position = 0;
  
    function parseStatement() {
      const token = tokens[position];
  
      console.log(`Parsing statement starting with token: ${JSON.stringify(token)}`);
  
      switch (token.type) {
        case 'Keyword':
          if (['var', 'const', 'let'].includes(token.value)) {
            return parseVariableDeclaration();
          } else if (token.value === 'if') {
            return parseIfStatement();
          }
          // Add more cases for other keywords as needed
          break;
  
        default:
          throw new Error(`Unexpected token: ${token.value}`);
      }
    }
  
    function parseVariableDeclaration() {
      const kind = tokens[position].value;
      position++; // Move past 'var', 'const', or 'let'
      const identifierToken = tokens[position];
  
      if (identifierToken.type !== 'Identifier') {
        throw new Error(`Expected identifier after '${kind}'`);
      }
  
      position++; // Move past the identifier
      const nextToken = tokens[position];
  
      // Optional: Handle initialization (e.g., var x = 5;)
      let initializer = null;
      if (nextToken && nextToken.type === 'Operator' && nextToken.value === '=') {
        position++; // Move past '='
        initializer = parseExpression(); // Parse the expression after '='
      }
  
      if (tokens[position] && tokens[position].value === ';') {
        position++; // Move past ';'
      } else {
        throw new Error(`Expected ';' after variable declaration`);
      }
  
      return {
        type: 'VariableDeclaration',
        kind,
        declarations: [
          {
            id: { type: 'Identifier', name: identifierToken.value },
            init: initializer,
          },
        ],
      };
    }
  
    function parseIfStatement() {
      position++; // Move past 'if'
      const test = parseExpression(); // Parse the condition inside parentheses
  
      if (tokens[position] && tokens[position].value === '{') {
        position++; // Move past '{'
      } else {
        throw new Error(`Expected '{' after 'if' condition`);
      }
  
      const consequent = parseBlock();
  
      let alternate = null;
      if (tokens[position] && tokens[position].value === 'else') {
        position++; // Move past 'else'
        if (tokens[position] && tokens[position].value === '{') {
          position++; // Move past '{'
          alternate = parseBlock();
        } else {
          throw new Error(`Expected '{' after 'else'`);
        }
      }
  
      return {
        type: 'IfStatement',
        test,
        consequent,
        alternate,
      };
    }
  
    function parseBlock() {
      const body = [];
  
      while (tokens[position] && tokens[position].value !== '}') {
        body.push(parseStatement());
      }
  
      if (tokens[position] && tokens[position].value === '}') {
        position++; // Move past '}'
      } else {
        throw new Error(`Expected '}' at the end of block`);
      }
  
      return {
        type: 'BlockStatement',
        body,
      };
    }
  
    function parseExpression() {
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
  