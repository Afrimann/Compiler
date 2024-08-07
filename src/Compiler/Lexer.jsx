export function lexer(input) {
    const tokenTypes = [
      { regex: /^\s+/, type: null }, // Whitespace (ignored)
      { regex: /^\d+/, type: 'Literal' }, // Number literals
      { regex: /^"([^"\\]*(\\.[^"\\]*)*)"/, type: 'String' }, // String literals with double quotes
      { regex: /^==|^!=|^===|^!==|^<=|^>=|^[<>=]/, type: 'Operator' }, // Comparison operators
      { regex: /^[-+*/=]/, type: 'Operator' }, // Arithmetic and assignment operators
      { regex: /^[;]/, type: 'Punctuation' }, // Semicolon
      { regex: /^[()]/, type: 'Punctuation' }, // Parentheses
      { regex: /^(import|from|export|const|let|var|function|if|else)\b/, type: 'Keyword' }, // Keywords
      { regex: /^\w+/, type: 'Identifier' } // Identifiers (variable names, etc.)
    ];
  
    const tokens = [];
    let position = 0;
  
    while (position < input.length) {
      let match = null;
  
      for (const tokenType of tokenTypes) {
        match = tokenType.regex.exec(input.slice(position));
        if (match && match.index === 0) { // Ensure match starts at the current position
          // If the token type is valid, push it to the tokens array
          if (tokenType.type) {
            tokens.push({ type: tokenType.type, value: match[0] });
          }
          position += match[0].length; // Move the position forward
          break; // Move to the next character in the input
        }
      }
  
      // If no matches were found, throw an error
      if (!match) {
        throw new Error(`Unexpected token: "${input[position]}" at position ${position}`);
      }
    }
  
    return tokens;
  }
  