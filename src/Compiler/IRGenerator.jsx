import { IRNode } from './IRNode.jsx';

export function irGenerator(ast) {
  const irNodes = [];

  function traverse(node) {
    switch (node.type) {
      case 'VariableDeclaration':
        node.declarations.forEach(declaration => {
          irNodes.push(new IRNode('DeclareVariable', declaration.id.name));
          // Optionally initialize the variable
        });
        break;

      case 'BinaryExpression':
        const leftIR = traverse(node.left);
        const rightIR = traverse(node.right);
        irNodes.push(new IRNode('BinaryOperation', {
          operator: node.operator,
          left: leftIR,
          right: rightIR,
        }));
        break;

      case 'Identifier':
        irNodes.push(new IRNode('Identifier', node.name));
        break;

      case 'String':
        irNodes.push(new IRNode('StringLiteral', node.value));
        break;

      // Add cases for other AST node types...

      default:
        throw new Error(`Unknown AST node type: ${node.type}`);
    }
  }

  ast.body.forEach(traverse);
  return irNodes; // Return the IR nodes
}
