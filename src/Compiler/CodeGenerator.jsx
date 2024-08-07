export function codeGenerator(irNodes) {
    const output = [];
  
    irNodes.forEach(node => {
      switch (node.type) {
        case 'DeclareVariable':
          output.push(`let ${node.value};`);
          break;
  
        case 'BinaryOperation':
          output.push(`result = ${node.value.left} ${node.value.operator} ${node.value.right};`);
          break;
  
        case 'Identifier':
          output.push(`console.log(${node.value});`); // Example usage
          break;
  
        case 'StringLiteral':
          output.push(`console.log("${node.value}");`); // Example usage
          break;
  
        // Handle other IR node types...
  
        default:
          throw new Error(`Unknown IR node type: ${node.type}`);
      }
    });
  
    return output.join('\n');
  }
  