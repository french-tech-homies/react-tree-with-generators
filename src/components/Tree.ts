export interface Employee {
  name: string;
  role: string;
  age: number;
}
export interface TreeNode {
  data: Employee;
  parent?: TreeNode;
  children: TreeNode[];
}

export class Tree {
  root: TreeNode;
  constructor(employee: Employee) {
    this.root = {
      data: employee,
      children: []
    };
  }

  traverseBFS(callback: (node: TreeNode) => void) {
    const queue: TreeNode[] = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        callback(node);
        if (node.children.length > 0) {
          queue.push(...node.children);
        }
      }
    }
  }

  traverseDFS(callback: (node: TreeNode) => void) {
    const stack: TreeNode[] = [];
    stack.push(this.root);
    while (stack.length > 0) {
      const node = stack.pop();
      if (node) {
        callback(node);
        if (node.children) {
          stack.push(...node.children);
        }
      }
    }
  }

  add(employee: Employee, toEmployee: Employee) {
    const child: TreeNode = {
      data: employee,
      children: []
    };
    let parent: TreeNode | undefined;
    let count = 0;
    this.traverseBFS(node => {
      count++;
      const { data } = node;
      if (data.name === toEmployee.name && data.role === toEmployee.role) {
        parent = node;
      }
    });
    console.log('count tree callback', count);
    if (parent) {
      child.parent = parent;
      parent.children.push(child);
    } else {
      throw new Error('Unable to add node to non existing parent');
    }
  }

  remove(employee: Employee, fromEmployee: Employee) {
    let child: TreeNode | undefined;
    this.traverseBFS(node => {
      const { data, parent } = node;
      if (
        parent &&
        parent.data.name === fromEmployee.name &&
        parent.data.role === fromEmployee.role &&
        data.name === employee.name &&
        data.role === employee.role
      ) {
        child = node;
      }
    });
    if (child) {
      if (child.parent) {
        const idx = child.parent.children.indexOf(child);
        child.parent.children.splice(idx, 1);
      } else {
        throw new Error('Unable to find parent');
      }
    } else {
      throw new Error('Unable to find node');
    }
  }
}
