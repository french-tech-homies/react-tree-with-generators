interface Employee {
  name: string;
  role: string;
  age: number;
}
interface TreeNode {
  data: Employee;
  parent?: TreeNode;
  children: TreeNode[];
}

export class TreeWithGenerators {
  root: TreeNode;
  size = 0;
  constructor(employee: Employee) {
    this.root = {
      data: employee,
      children: []
    };
    this.size++;
  }

  *traverseBFS() {
    const queue: TreeNode[] = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        yield node;
        if (node.children.length > 0) {
          queue.push(...node.children);
        }
      }
    }
  }

  *traverseDFS() {
    const stack: TreeNode[] = [];
    stack.push(this.root);
    while (stack.length > 0) {
      const node = stack.pop();
      if (node) {
        yield node;
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
    let count = 0;

    const parent = [...this.traverseBFS()].find(({ data }) => {
      count++;
      return data.name === toEmployee.name && data.role === toEmployee.role;
    });
    console.log('count', count);
    if (parent) {
      child.parent = parent;
      parent.children.push(child);
      this.size++;
    } else {
      throw new Error('Unable to add node to non existing parent');
    }
  }

  remove(employee: Employee, fromEmployee: Employee) {
    const child = [...this.traverseBFS()].find(
      ({ data, parent }) =>
        parent &&
        parent.data.name === fromEmployee.name &&
        parent.data.role === fromEmployee.role &&
        data.name === employee.name &&
        data.role === employee.role
    );

    if (child) {
      if (child.parent) {
        const idx = child.parent.children.indexOf(child);
        child.parent.children.splice(idx, 1);
        this.size--;
      } else {
        throw new Error('Unable to find parent');
      }
    } else {
      throw new Error('Unable to find node');
    }
  }
}
