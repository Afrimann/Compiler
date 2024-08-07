export class IRNode {
    constructor(type, value) {
      this.type = type; // e.g., 'Assignment', 'BinaryOperation', 'FunctionCall', etc.
      this.value = value; // The value associated with the node
    }
  }
  