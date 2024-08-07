import { IRNode } from './IRNode.jsx';

export function optimize(irNodes) {
  const optimizedNodes = [];

  irNodes.forEach(node => {
    if (node.type === 'BinaryOperation' && 
        typeof node.value.left === 'number' && 
        typeof node.value.right === 'number') {
      // Perform constant folding
      const result = eval(`${node.value.left} ${node.value.operator} ${node.value.right}`);
      optimizedNodes.push(new IRNode('Literal', result));
    } else {
      optimizedNodes.push(node); // No optimization applied
    }
  });

  return optimizedNodes; // Return the optimized IR nodes
}
