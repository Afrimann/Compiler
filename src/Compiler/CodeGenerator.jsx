export function codeGenerator(node) {
    switch (node.type) {
      case 'Program':
        return node.body.map(codeGenerator).join('\n'); // Generate code for each body node
  
      case 'ImportDeclaration':
        return `import ${node.module.value} from ${node.source.name};`;
  
      case 'Identifier':
        return node.name;
  
      case 'StringLiteral':
        return node.value;
  
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }
  