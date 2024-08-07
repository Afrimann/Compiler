export function semanticAnalyzer(ast) {
    const symbolTable = {};
  
    function checkNode(node) {
      switch (node.type) {
        case 'VariableDeclaration':
          node.declarations.forEach(declaration => {
            const name = declaration.id.name;
            if (symbolTable[name]) {
              throw new Error(`Variable "${name}" is already declared.`);
            }
            symbolTable[name] = declaration.init; // Store the variable with its initial value
          });
          break;
  
        case 'Identifier':
          const identifier = node.name;
          if (!symbolTable[identifier]) {
            throw new Error(`Variable "${identifier}" is not declared.`);
          }
          break;
  
        case 'BinaryExpression':
          checkNode(node.left);
          checkNode(node.right);
          // Here you can add type checking logic based on your language's rules
          break;
  
        // Handle other node types...
        case 'ImportDeclaration':
          // Check import validity if needed
          break;
  
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    }
  
    ast.body.forEach(checkNode); // Traverse the AST for semantic checks
  }
  